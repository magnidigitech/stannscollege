import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";
import fallbackData from "@/components/announcements-data.json";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const DOC_ID = "site-announcements-singleton";

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

export async function GET() {
  try {
    const client = getSanityClient();
    const doc = await client.fetch(`*[_id == $id][0]`, { id: DOC_ID });
    if (doc && doc.data) {
      return NextResponse.json({ success: true, data: doc.data });
    }
  } catch (err: any) {
    console.warn("Could not fetch announcements from Sanity, using fallback:", err.message);
  }

  return NextResponse.json({ success: true, data: fallbackData });
}

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Announcement data payload is required." },
        { status: 400 }
      );
    }

    // 1. Sync to local JSON fallback
    try {
      const jsonPath = path.join(process.cwd(), "src", "components", "announcements-data.json");
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
    } catch (writeErr) {
      console.warn("Failed to write announcements-data.json fallback:", writeErr);
    }

    // 2. Persist to Sanity singleton
    const client = getSanityClient();
    await client.createOrReplace({
      _id: DOC_ID,
      _type: "announcementsPortal",
      data: data,
    });

    return NextResponse.json({
      success: true,
      message: "Announcements saved successfully.",
      data,
    });
  } catch (err: any) {
    console.error("Error saving announcements:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save announcements." },
      { status: 500 }
    );
  }
}
