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
 * GET /api/admin/faculty-gallery
 * Fetch all faculty event albums from Sanity
 */
export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const query = `*[_type == "facultyEventAlbum" && !(_id in path("drafts.**"))] | order(date desc, _createdAt desc) {
      _id,
      _type,
      title,
      date,
      year,
      category,
      description,
      "coverImage": coalesce(coverImage.asset->url, coverImageUrl, null),
      media[]{
        id,
        mediaType,
        "url": coalesce(asset->url, url),
        caption,
        thumbnailUrl
      }
    }`;

    const albums = await client.fetch(query);
    return NextResponse.json({ success: true, albums: albums || [] });
  } catch (err: any) {
    console.error("Failed to fetch faculty event albums:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch event albums" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/faculty-gallery
 * Create or update a faculty event album in Sanity
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
    const { album } = body;

    if (!album || !album.title) {
      return NextResponse.json(
        { success: false, error: "Event Title is required." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const docId = album._id || `faculty-event-${Date.now()}`;

    const docToSave: any = {
      _id: docId,
      _type: "facultyEventAlbum",
      title: album.title.trim(),
      date: album.date?.trim() || new Date().toISOString().split("T")[0],
      year: album.year?.trim() || "2025–2026",
      category: album.category?.trim() || "Faculty Development",
      description: album.description?.trim() || "",
      coverImageUrl: album.coverImage || (album.media?.[0]?.url || ""),
      media: (album.media || []).map((m: any, idx: number) => ({
        _key: m.id || `m-${idx}-${Date.now()}`,
        id: m.id || `m-${idx}-${Date.now()}`,
        mediaType: m.mediaType || "photo",
        url: m.url,
        caption: m.caption || "",
        thumbnailUrl: m.thumbnailUrl || "",
      })),
      updatedAt: new Date().toISOString(),
    };

    const result = await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Event album saved successfully to Sanity.",
      album: result,
    });
  } catch (err: any) {
    console.error("Failed to save event album:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save event album to Sanity." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/faculty-gallery?id=xxx
 * Delete a faculty event album from Sanity
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
        { success: false, error: "Album ID is required for deletion." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    await client.delete(id);

    return NextResponse.json({
      success: true,
      message: "Event album deleted successfully from Sanity.",
    });
  } catch (err: any) {
    console.error("Failed to delete event album:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete event album." },
      { status: 500 }
    );
  }
}
