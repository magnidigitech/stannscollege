import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    token: token || undefined,
    useCdn: false,
  });
}

function checkAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const session = verifyAdminSessionToken(token);
  return !!session;
}

/**
 * GET /api/admin/alumni/gallery
 * Returns all alumni gallery albums with populated image URLs and asset IDs
 */
export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Active admin session required." },
      { status: 401 }
    );
  }

  try {
    const client = getSanityClient();
    const query = `*[_type == "alumniGallery" && !(_id in path("drafts.**"))] | order(eventDate desc, _createdAt desc, order asc) {
      _id,
      folderName,
      "slug": slug.current,
      eventDate,
      order,
      images[] {
        _key,
        "url": asset->url,
        "assetId": asset->_id,
        caption
      }
    }`;

    const albums = await client.fetch(query);
    return NextResponse.json({
      success: true,
      albums: albums || [],
    });
  } catch (err: any) {
    console.error("Error fetching alumni gallery in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch albums." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/alumni/gallery
 * Creates or updates an alumniGallery album document
 */
export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Active admin session required." },
      { status: 401 }
    );
  }

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { success: false, error: "SANITY_WRITE_TOKEN is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const client = getSanityClient();

    const folderName = body.folderName?.trim() || "Alumni Album";
    const eventDate = body.eventDate || null;
    const slugValue = body.slug?.trim() || folderName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const order = Number(body.order) || 1;

    const cleanedImages = Array.isArray(body.images)
      ? body.images.map((img: any, idx: number) => {
          const item: any = {
            _key: img._key || `img_${Date.now()}_${idx}`,
            caption: img.caption || "",
          };
          if (img.assetId) {
            item.asset = {
              _type: "reference",
              _ref: img.assetId,
            };
          }
          return item;
        }).filter((img: any) => img.asset)
      : [];

    const docToSave: any = {
      _type: "alumniGallery",
      folderName,
      eventDate,
      slug: { _type: "slug", current: slugValue },
      order,
      images: cleanedImages,
    };

    if (body._id && !body._id.startsWith("new-")) {
      docToSave._id = body._id;
    }

    const result = await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Alumni gallery album saved successfully!",
      album: result,
    });
  } catch (err: any) {
    console.error("Error saving alumni gallery in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save album." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/alumni/gallery?id=<id>
 * Deletes an alumniGallery album document
 */
export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Active admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Album ID is required for deletion." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    await client.delete(id);

    return NextResponse.json({
      success: true,
      message: "Album deleted successfully.",
    });
  } catch (err: any) {
    console.error("Error deleting alumni gallery album in admin API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete album." },
      { status: 500 }
    );
  }
}
