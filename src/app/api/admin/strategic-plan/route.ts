import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const STRATEGIC_PLAN_DOC_ID = "strategic-plan-2024-2030";

const DEFAULT_FEEDBACK_LINKS = {
  studentFeedbackFormUrl: "https://forms.gle/n6QfA4roPrqtPWjM8",
  facultyFeedbackFormUrl: "https://www.google.com",
  parentFeedbackFormUrl: "https://www.google.com",
  alumniFeedbackFormUrl: "https://www.google.com",
  communityFeedbackFormUrl: "https://www.google.com",
  employerFeedbackFormUrl: "https://www.google.com",
};

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
 * GET /api/admin/strategic-plan
 * Returns current strategic plan feedback form links
 */
export async function GET() {
  try {
    const client = getSanityClient();
    const doc = await client.fetch(
      `*[_type == "strategicPlan" && !(_id in path("drafts.**"))][0]{
        _id,
        title,
        studentFeedbackFormUrl,
        facultyFeedbackFormUrl,
        parentFeedbackFormUrl,
        alumniFeedbackFormUrl,
        communityFeedbackFormUrl,
        employerFeedbackFormUrl
      }`
    );

    const cleanUrl = (url?: string, fallback: string = "https://www.google.com") => {
      if (!url || url === "https://www.google.com/search?q=%23" || url.trim() === "") {
        return fallback;
      }
      return url.trim();
    };

    const links = {
      studentFeedbackFormUrl: cleanUrl(doc?.studentFeedbackFormUrl, DEFAULT_FEEDBACK_LINKS.studentFeedbackFormUrl),
      facultyFeedbackFormUrl: cleanUrl(doc?.facultyFeedbackFormUrl, DEFAULT_FEEDBACK_LINKS.facultyFeedbackFormUrl),
      parentFeedbackFormUrl: cleanUrl(doc?.parentFeedbackFormUrl, DEFAULT_FEEDBACK_LINKS.parentFeedbackFormUrl),
      alumniFeedbackFormUrl: cleanUrl(doc?.alumniFeedbackFormUrl, DEFAULT_FEEDBACK_LINKS.alumniFeedbackFormUrl),
      communityFeedbackFormUrl: cleanUrl(doc?.communityFeedbackFormUrl, DEFAULT_FEEDBACK_LINKS.communityFeedbackFormUrl),
      employerFeedbackFormUrl: cleanUrl(doc?.employerFeedbackFormUrl, DEFAULT_FEEDBACK_LINKS.employerFeedbackFormUrl),
    };

    return NextResponse.json({
      success: true,
      docId: doc?._id || STRATEGIC_PLAN_DOC_ID,
      links,
    });
  } catch (err: any) {
    console.error("Error fetching strategic plan feedback links:", err);
    return NextResponse.json({
      success: true,
      docId: STRATEGIC_PLAN_DOC_ID,
      links: DEFAULT_FEEDBACK_LINKS,
    });
  }
}

/**
 * POST /api/admin/strategic-plan
 * Updates strategic plan feedback form links in Sanity
 */
export async function POST(req: NextRequest) {
  try {
    if (!checkAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in to update links." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      studentFeedbackFormUrl,
      facultyFeedbackFormUrl,
      parentFeedbackFormUrl,
      alumniFeedbackFormUrl,
      communityFeedbackFormUrl,
      employerFeedbackFormUrl,
    } = body;

    const client = getSanityClient();

    // Check if strategicPlan doc exists
    const existing = await client.fetch(
      `*[_type == "strategicPlan" && !(_id in path("drafts.**"))][0]._id`
    );

    const docId = existing || STRATEGIC_PLAN_DOC_ID;

    // Use patch if document exists, or set fields
    await client
      .patch(docId)
      .set({
        studentFeedbackFormUrl: (studentFeedbackFormUrl || "").trim() || DEFAULT_FEEDBACK_LINKS.studentFeedbackFormUrl,
        facultyFeedbackFormUrl: (facultyFeedbackFormUrl || "").trim() || DEFAULT_FEEDBACK_LINKS.facultyFeedbackFormUrl,
        parentFeedbackFormUrl: (parentFeedbackFormUrl || "").trim() || DEFAULT_FEEDBACK_LINKS.parentFeedbackFormUrl,
        alumniFeedbackFormUrl: (alumniFeedbackFormUrl || "").trim() || DEFAULT_FEEDBACK_LINKS.alumniFeedbackFormUrl,
        communityFeedbackFormUrl: (communityFeedbackFormUrl || "").trim() || DEFAULT_FEEDBACK_LINKS.communityFeedbackFormUrl,
        employerFeedbackFormUrl: (employerFeedbackFormUrl || "").trim() || DEFAULT_FEEDBACK_LINKS.employerFeedbackFormUrl,
      })
      .commit();

    return NextResponse.json({
      success: true,
      message: "Feedback form links updated successfully in Sanity!",
      links: {
        studentFeedbackFormUrl,
        facultyFeedbackFormUrl,
        parentFeedbackFormUrl,
        alumniFeedbackFormUrl,
        communityFeedbackFormUrl,
        employerFeedbackFormUrl,
      },
    });
  } catch (err: any) {
    console.error("Error saving strategic plan feedback links to Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save links to Sanity." },
      { status: 500 }
    );
  }
}
