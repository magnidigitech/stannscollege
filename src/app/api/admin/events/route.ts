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
 * GET /api/admin/events
 * Fetch all events directly from Sanity
 */
export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const events = await client.fetch(`*[_type == "event" && !(_id in path("drafts.**"))] | order(eventDate desc, date desc, _createdAt desc) {
      _id,
      title,
      startDate,
      eventDate,
      eventEndDate,
      date,
      organizer,
      location,
      description,
      link,
      linkLabel,
      isNew,
      displayOrder,
      "pdfUrl": pdfFile.asset->url,
      "bannerUrl": coalesce(banner.asset->url, image.asset->url, null),
      documents[]{
        title,
        "url": asset->url,
        "originalFilename": asset->originalFilename
      }
    }`);

    return NextResponse.json({ success: true, events: events || [] });
  } catch (err: any) {
    console.error("Failed to fetch events from Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/events
 * Create or update an event in Sanity
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
    const { event } = body;

    if (!event || !event.title) {
      return NextResponse.json(
        { success: false, error: "Event title is required." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const docId = event._id || `event-${Date.now()}`;

    const docToSave: { _id: string; _type: string; [key: string]: any } = {
      _id: docId,
      _type: "event",
      title: event.title.trim(),
      date: event.date?.trim() || "",
      startDate: event.startDate || null,
      eventDate: event.eventDate || null,
      eventEndDate: event.eventEndDate || null,
      organizer: event.organizer?.trim() || "",
      location: event.location?.trim() || "",
      description: event.description?.trim() || "",
      link: event.link?.trim() || null,
      linkLabel: event.linkLabel?.trim() || null,
      isNew: Boolean(event.isNew),
      displayOrder: Number(event.displayOrder) || 10,
    };

    const savedDoc = await client.createOrReplace(docToSave);

    return NextResponse.json({
      success: true,
      message: "Event saved successfully to Sanity.",
      event: savedDoc,
    });
  } catch (err: any) {
    console.error("Failed to save event to Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save event" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/events
 * Delete an event from Sanity by ID
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
        { success: false, error: "Event ID is required for deletion." },
        { status: 400 }
      );
    }

    const client = getSanityClient();

    // Also delete any draft if it exists
    const transaction = client.transaction();
    transaction.delete(id);
    transaction.delete(`drafts.${id}`);
    await transaction.commit();

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully from Sanity.",
      deletedId: id,
    });
  } catch (err: any) {
    console.error("Failed to delete event from Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete event" },
      { status: 500 }
    );
  }
}
