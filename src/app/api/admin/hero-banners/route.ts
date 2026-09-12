import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const COOKIE_NAME = "stanns_admin_session";

function checkAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminSessionToken(token) !== null;
}

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    throw new Error("SANITY_WRITE_TOKEN environment variable is not configured.");
  }
  return createClient({
    projectId: "fhjwqub5",
    dataset: "production",
    apiVersion: "2024-03-01",
    token,
    useCdn: false,
  });
}

export interface HeroBannerAdminItem {
  _id?: string;
  title?: string;
  displayOrder: number;
  linkUrl?: string;
  imageUrl: string;
  assetId?: string;
}

/**
 * GET /api/admin/hero-banners
 * Fetches all hero banners ordered by displayOrder asc
 */
export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const client = getSanityClient();
    const query = `*[_type == "homeBanner" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
      _id,
      title,
      displayOrder,
      "linkUrl": coalesce(linkUrl, cta1Link, ""),
      "imageUrl": image.asset->url,
      "assetId": image.asset._ref
    }`;
    const banners = await client.fetch(query);

    return NextResponse.json({
      success: true,
      banners: Array.isArray(banners) ? banners : [],
    });
  } catch (err: any) {
    console.error("Error fetching hero banners:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load hero banners from Sanity." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/hero-banners
 * Supports:
 *  1. Bulk update / reorder: { banners: HeroBannerAdminItem[] }
 *  2. Create or update single banner: { banner: HeroBannerAdminItem }
 */
export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const client = getSanityClient();

    // 1. Bulk save / reorder all banners
    if (Array.isArray(body.banners)) {
      const banners: HeroBannerAdminItem[] = body.banners;
      const transaction = client.transaction();

      for (let i = 0; i < banners.length; i++) {
        const b = banners[i];
        const orderNum = i + 1;

        if (b._id && !b._id.startsWith("new-")) {
          // Update existing
          const patchData: any = {
            title: b.title || `Banner ${orderNum}`,
            displayOrder: orderNum,
            linkUrl: (b.linkUrl || "").trim(),
          };
          if (b.assetId) {
            patchData.image = {
              _type: "image",
              asset: { _type: "reference", _ref: b.assetId },
            };
          }
          transaction.patch(b._id, (p) =>
            p
              .set(patchData)
              .unset(["tagline", "desc", "cta1Text", "cta1Link", "cta2Text", "cta2Link"])
          );
        } else if (b.assetId) {
          // Create new
          const newDoc = {
            _type: "homeBanner",
            title: b.title || `Banner ${orderNum}`,
            displayOrder: orderNum,
            linkUrl: (b.linkUrl || "").trim(),
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: b.assetId },
            },
          };
          transaction.create(newDoc);
        }
      }

      await transaction.commit();

      return NextResponse.json({
        success: true,
        message: `Successfully saved ${banners.length} hero banners.`,
      });
    }

    // 2. Single banner create or update
    if (body.banner) {
      const b: HeroBannerAdminItem = body.banner;

      if (!b.assetId && !b.imageUrl) {
        return NextResponse.json(
          { success: false, error: "A valid banner image is required." },
          { status: 400 }
        );
      }

      if (b._id && !b._id.startsWith("new-")) {
        // Patch existing
        const patchData: any = {
          title: b.title || `Banner ${b.displayOrder || 1}`,
          displayOrder: Number(b.displayOrder) || 1,
          linkUrl: (b.linkUrl || "").trim(),
        };
        if (b.assetId) {
          patchData.image = {
            _type: "image",
            asset: { _type: "reference", _ref: b.assetId },
          };
        }

        const updated = await client
          .patch(b._id)
          .set(patchData)
          .unset(["tagline", "desc", "cta1Text", "cta1Link", "cta2Text", "cta2Link"])
          .commit();

        return NextResponse.json({
          success: true,
          banner: updated,
          message: "Banner updated successfully.",
        });
      } else {
        // Create new
        const newDoc: any = {
          _type: "homeBanner",
          title: b.title || `Banner ${b.displayOrder || 1}`,
          displayOrder: Number(b.displayOrder) || 1,
          linkUrl: (b.linkUrl || "").trim(),
          image: {
            _type: "image",
            asset: { _type: "reference", _ref: b.assetId },
          },
        };

        const created = await client.create(newDoc);

        return NextResponse.json({
          success: true,
          banner: created,
          message: "New banner created successfully.",
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload. Provide either 'banners' array or 'banner' object." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("Error saving hero banner:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save banner in Sanity." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/hero-banners?id=...
 * Deletes a hero banner document from Sanity
 */
export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Banner ID is required for deletion." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    await client.delete(id);

    return NextResponse.json({
      success: true,
      message: `Banner ${id} deleted successfully.`,
    });
  } catch (err: any) {
    console.error("Error deleting hero banner:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete banner from Sanity." },
      { status: 500 }
    );
  }
}
