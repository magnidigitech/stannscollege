import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  UG_PROGRAMMES_INTAKE,
  PG_PROGRAMMES_INTAKE,
  UG_ELIGIBILITY_CRITERIA,
  PG_ELIGIBILITY_CRITERIA,
  ADMISSION_DOCUMENTS,
  ADMISSION_DESK_INFO,
  ADMISSION_YEARLY_RECORDS,
} from "@/components/admissions/staticData";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const ADMISSIONS_DOC_ID = "admissions-portal-singleton";

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

const DEFAULT_ADMISSIONS_DATA = {
  ugProgrammes: UG_PROGRAMMES_INTAKE,
  pgProgrammes: PG_PROGRAMMES_INTAKE,
  ugEligibility: UG_ELIGIBILITY_CRITERIA,
  pgEligibility: PG_ELIGIBILITY_CRITERIA,
  documents: ADMISSION_DOCUMENTS,
  deskInfo: ADMISSION_DESK_INFO,
  yearlyRecords: ADMISSION_YEARLY_RECORDS,
};

/**
 * GET /api/admin/admissions
 * Returns current admissions data from Sanity or fallback static defaults
 */
export async function GET() {
  try {
    const client = getSanityClient();
    const query = `*[_type == "admissionsPortal" && !(_id in path("drafts.**"))][0]`;
    const doc = await client.fetch(query);

    if (doc && doc.portalData) {
      return NextResponse.json({
        success: true,
        data: doc.portalData,
        lastUpdated: doc._updatedAt || null,
      });
    }

    // Return default structured data if not yet saved in Sanity
    return NextResponse.json({
      success: true,
      data: DEFAULT_ADMISSIONS_DATA,
      lastUpdated: null,
    });
  } catch (err: any) {
    console.error("Error fetching admissions data:", err);
    return NextResponse.json({
      success: true,
      data: DEFAULT_ADMISSIONS_DATA,
      error: err.message,
    });
  }
}

/**
 * POST /api/admin/admissions
 * Updates the admissions singleton in Sanity
 */
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
        { success: false, error: "Invalid admissions payload" },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const doc = {
      _id: ADMISSIONS_DOC_ID,
      _type: "admissionsPortal",
      title: "Admissions Portal Data",
      lastUpdated: new Date().toISOString(),
      portalData: body,
    };

    const result = await client.createOrReplace(doc);

    return NextResponse.json({
      success: true,
      data: result.portalData,
      message: "Admissions data updated successfully in Sanity.",
    });
  } catch (err: any) {
    console.error("Error saving admissions data to Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save admissions data" },
      { status: 500 }
    );
  }
}
