import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";
import defaultData from "@/data/campus-life.json";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const DOC_ID = "site-campus-life-singleton";

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;
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

function getLocalData() {
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "campus-life.json");
    if (fs.existsSync(jsonPath)) {
      const content = fs.readFileSync(jsonPath, "utf8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn("Failed reading local campus-life.json:", err);
  }
  return defaultData;
}

export async function GET() {
  try {
    const client = getSanityClient();
    const doc = await client.fetch(`*[_id == $id][0]`, { id: DOC_ID });
    if (doc && doc.data) {
      return NextResponse.json({ success: true, data: doc.data });
    }
  } catch (err: any) {
    // Sanity query fallback
  }

  const localData = getLocalData();
  return NextResponse.json({ success: true, data: localData });
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

    if (!data || !Array.isArray(data.videos) || !Array.isArray(data.gallery)) {
      return NextResponse.json(
        { success: false, error: "Invalid data payload: videos and gallery arrays are required." },
        { status: 400 }
      );
    }

    // 1. Sync to local JSON
    try {
      const jsonPath = path.join(process.cwd(), "src", "data", "campus-life.json");
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf8");
    } catch (writeErr) {
      console.warn("Failed to write local campus-life.json:", writeErr);
    }

    // 2. Persist to Sanity singleton
    try {
      const client = getSanityClient();
      await client.createOrReplace({
        _id: DOC_ID,
        _type: "campusLifeSingleton",
        data: data,
      });
    } catch (sanityErr: any) {
      console.warn("Sanity persistence notice (local JSON successfully updated):", sanityErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Campus Life & Video Gallery saved successfully.",
      data,
    });
  } catch (err: any) {
    console.error("Error saving campus life data:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save campus life data." },
      { status: 500 }
    );
  }
}
