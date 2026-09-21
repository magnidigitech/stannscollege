import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import { STUDENT_SUPPORT_DATA } from "@/components/student-support/staticData";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const STUDENT_SUPPORT_DOC_ID = "student-support-portal-singleton";

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
 * GET /api/admin/student-support
 * Returns current student support data from Sanity or fallback
 */
export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const query = `*[_type == "studentSupportPortal" && !(_id in path("drafts.**"))][0]`;
    const doc = await client.fetch(query);

    if (doc && doc.portalData) {
      return NextResponse.json({
        success: true,
        data: doc.portalData,
        lastUpdated: doc._updatedAt || null,
      });
    }

    // Return default structured data if not yet saved to Sanity
    return NextResponse.json({
      success: true,
      data: STUDENT_SUPPORT_DATA,
      lastUpdated: null,
    });
  } catch (err: any) {
    console.error("Error fetching student support data:", err);
    return NextResponse.json({
      success: true,
      data: STUDENT_SUPPORT_DATA,
      error: err.message,
    });
  }
}

/**
 * POST /api/admin/student-support
 * Updates the student support singleton in Sanity
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
        { success: false, error: "Invalid student support payload" },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const doc = {
      _id: STUDENT_SUPPORT_DOC_ID,
      _type: "studentSupportPortal",
      title: "Student Support Services Portal Data",
      lastUpdated: new Date().toISOString(),
      portalData: body,
    };

    const result = await client.createOrReplace(doc);

    return NextResponse.json({
      success: true,
      data: result.portalData,
      message: "Student support services updated successfully in Sanity.",
    });
  } catch (err: any) {
    console.error("Error updating student support data:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update student support data in Sanity." },
      { status: 500 }
    );
  }
}
