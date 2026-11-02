import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";
import defaultQaData from "@/components/quality-assurance/quality-assurance-data.json";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const QA_DOC_ID = "quality-assurance-portal-singleton";

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

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const client = getSanityClient();
    const query = `*[_type == "qualityAssurancePortal" && !(_id in path("drafts.**"))][0]`;
    const doc = await client.fetch(query);

    if (doc && doc.portalData) {
      return NextResponse.json({
        success: true,
        data: doc.portalData,
        lastUpdated: doc._updatedAt || null,
        source: "sanity"
      });
    }
  } catch (err: any) {
    console.error("Error reading Sanity QA data in admin:", err.message);
  }

  // Fallback to local JSON
  try {
    const filePath = path.join(process.cwd(), "src/components/quality-assurance/quality-assurance-data.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      return NextResponse.json({
        success: true,
        data: JSON.parse(fileContent),
        lastUpdated: null,
        source: "local-file"
      });
    }
  } catch (err) {
    console.error("Error reading local QA file:", err);
  }

  return NextResponse.json({
    success: true,
    data: defaultQaData,
    lastUpdated: null,
    source: "static-fallback"
  });
}

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload for Quality Assurance data." },
        { status: 400 }
      );
    }

    // 1. Always persist to local JSON file for instant offline consistency
    try {
      const filePath = path.join(process.cwd(), "src/components/quality-assurance/quality-assurance-data.json");
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not write to local QA data file:", fsErr);
    }

    // 2. Try to sync to Sanity if token is configured
    let sanitySaved = false;
    let sanityError = null;
    const token = process.env.SANITY_WRITE_TOKEN;

    if (token) {
      try {
        const client = getSanityClient();
        const doc = {
          _id: QA_DOC_ID,
          _type: "qualityAssurancePortal",
          title: "Quality Assurance & Accreditation Portal Data",
          lastUpdated: new Date().toISOString(),
          portalData: body,
        };
        await client.createOrReplace(doc);
        sanitySaved = true;
      } catch (sErr: any) {
        console.error("Sanity save error for QA portal:", sErr);
        sanityError = sErr.message;
      }
    }

    return NextResponse.json({
      success: true,
      message: sanitySaved
        ? "Quality Assurance & Accreditation data saved successfully to Sanity and local storage."
        : "Quality Assurance data saved to local storage." + (sanityError ? ` (Sanity sync notice: ${sanityError})` : ""),
      sanitySynced: sanitySaved,
    });
  } catch (err: any) {
    console.error("Error saving quality assurance data:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save quality assurance data." },
      { status: 500 }
    );
  }
}

