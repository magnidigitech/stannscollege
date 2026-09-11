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
 * GET /api/admin/notices
 * Fetch all notices directly from Sanity
 */
export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const notices = await client.fetch(`*[_type == "notice" && !(_id in path("drafts.**"))] | order(displayOrder asc, date desc, _createdAt desc) {
      _id,
      title,
      date,
      category,
      description,
      linkUrl,
      linkLabel,
      links[]{
        _key,
        title,
        url
      },
      isNew,
      displayOrder,
      "pdfUrl": pdfFile.asset->url,
      "pdfAssetId": pdfFile.asset->_id,
      documents[]{
        _key,
        title,
        "url": coalesce(asset->url, url),
        "originalFilename": asset->originalFilename,
        "assetId": asset->_id
      }
    }`);

    return NextResponse.json({ success: true, notices: notices || [] });
  } catch (err: any) {
    console.error("Failed to fetch notices from Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch notices" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/notices
 * Create or update a notice in Sanity
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
    const { notice } = body;

    if (!notice || !notice.title) {
      return NextResponse.json(
        { success: false, error: "Notice title is required." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const docId = notice._id || `notice-${Date.now()}`;

    // 1. Process multiple links
    const linksList: { _key: string; title: string; url: string }[] = [];
    if (Array.isArray(notice.links)) {
      notice.links.forEach((l: any, idx: number) => {
        if (l && l.url && typeof l.url === "string" && l.url.trim() !== "") {
          linksList.push({
            _key: l._key || `link-${Date.now()}-${idx}`,
            title: l.title?.trim() || l.url.trim(),
            url: l.url.trim(),
          });
        }
      });
    }
    // Backward compatibility fallback for single linkUrl
    if (linksList.length === 0 && notice.linkUrl && notice.linkUrl.trim() !== "") {
      linksList.push({
        _key: "link-primary",
        title: notice.linkLabel?.trim() || notice.linkUrl.trim(),
        url: notice.linkUrl.trim(),
      });
    }

    // 2. Process multiple PDF documents
    const docsList: any[] = [];
    if (Array.isArray(notice.documents)) {
      notice.documents.forEach((d: any, idx: number) => {
        if (d && (d.url?.trim() || d.assetId)) {
          const docEntry: any = {
            _type: "file",
            _key: d._key || `doc-${Date.now()}-${idx}`,
            title: d.title?.trim() || d.originalFilename || `Document ${idx + 1}`,
          };
          if (d.assetId) {
            docEntry.asset = {
              _type: "reference",
              _ref: d.assetId,
            };
          }
          if (d.url?.trim()) {
            docEntry.url = d.url.trim();
          }
          docsList.push(docEntry);
        }
      });
    }

    const docToSave: { _id: string; _type: string; [key: string]: any } = {
      _id: docId,
      _type: "notice",
      title: notice.title.trim(),
      date: notice.date?.trim() || "",
      category: notice.category || "general",
      description: notice.description?.trim() || "",
      linkUrl: linksList[0]?.url || null,
      linkLabel: linksList[0]?.title || null,
      links: linksList.length > 0 ? linksList : undefined,
      documents: docsList.length > 0 ? docsList : undefined,
      pdfFile: docsList[0]?.asset ? { _type: "file", asset: docsList[0].asset } : undefined,
      isNew: notice.isNew !== undefined ? Boolean(notice.isNew) : true,
      displayOrder: Number(notice.displayOrder) || 10,
    };

    const savedDoc = await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Notice saved successfully to Sanity.",
      notice: savedDoc,
    });
  } catch (err: any) {
    console.error("Failed to save notice to Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save notice" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/notices
 * Delete a notice from Sanity by ID
 */
export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Notice ID is required for deletion." },
        { status: 400 }
      );
    }

    const client = getSanityClient();

    const transaction = client.transaction();
    transaction.delete(id);
    transaction.delete(`drafts.${id}`);
    await transaction.commit();

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully from Sanity.",
      deletedId: id,
    });
  } catch (err: any) {
    console.error("Failed to delete notice from Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete notice" },
      { status: 500 }
    );
  }
}
