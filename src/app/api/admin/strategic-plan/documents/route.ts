import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const COOKIE_NAME = "stanns_admin_session";
const STRATEGIC_PLAN_DOC_ID = "strategic-plan-2024-2030";

const DEFAULT_DOCUMENTS = [
  {
    _key: "doc_default_1",
    title: "Institutional Strategic Framework 2024-2030 (Years Plan)",
    fileUrl: "/documents/Institutional Strategic Framework  2024-2030.pdf",
  },
  {
    _key: "doc_default_2",
    title: "Annual Deployment Plan 2025–2026",
    fileUrl: "/documents/Annual Plan Deployment Report  2025-2026.pdf",
  },
  {
    _key: "doc_default_3",
    title: "Annual Deployment Plan 2024–2025",
    fileUrl: "/documents/Annual Plan Deployment Report  2024-2025.pdf",
  },
  {
    _key: "doc_default_4",
    title: "Annual Deployment Plan 2023–2024",
    fileUrl: "/documents/Annual Plan Deployment Report  2024-2025.pdf",
  },
  {
    _key: "doc_default_5",
    title: "Institutional Strategic Framework 2018–2023",
    fileUrl: "/documents/Institutional Strategic Framework  2024-2030.pdf",
  }
];

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
 * GET /api/admin/strategic-plan/documents
 * Returns the list of strategic plan documents
 */
export async function GET() {
  try {
    const client = getSanityClient();
    const doc = await client.fetch(
      `*[_type == "strategicPlan" && !(_id in path("drafts.**"))][0]{
        _id,
        title,
        documents[] {
          _key,
          title,
          "fileUrl": coalesce(file.asset->url, fileUrl),
          "assetId": file.asset->_id
        }
      }`
    );

    const documents = (doc?.documents && doc.documents.length > 0)
      ? doc.documents
      : DEFAULT_DOCUMENTS;

    return NextResponse.json({
      success: true,
      docId: doc?._id || STRATEGIC_PLAN_DOC_ID,
      documents,
    });
  } catch (err: any) {
    console.error("Error fetching strategic plan documents:", err);
    return NextResponse.json({
      success: true,
      docId: STRATEGIC_PLAN_DOC_ID,
      documents: DEFAULT_DOCUMENTS,
    });
  }
}

/**
 * POST /api/admin/strategic-plan/documents
 * Saves/updates strategic plan documents in Sanity
 */
export async function POST(req: NextRequest) {
  try {
    if (!checkAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Please log in to manage documents." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { documents } = body;

    if (!Array.isArray(documents)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload: documents array is required." },
        { status: 400 }
      );
    }

    const client = getSanityClient();

    // Check if strategicPlan doc exists
    const existing = await client.fetch(
      `*[_type == "strategicPlan" && !(_id in path("drafts.**"))][0]._id`
    );

    const docId = existing || STRATEGIC_PLAN_DOC_ID;

    // Transform documents for Sanity schema
    const sanityDocs = documents.map((d: any, idx: number) => {
      const docObj: any = {
        _key: d._key || `doc_${Date.now()}_${idx}`,
        title: (d.title || "Untitled Document").trim(),
        fileUrl: (d.fileUrl || "").trim(),
      };

      if (d.assetId) {
        docObj.file = {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: d.assetId,
          },
        };
      }

      return docObj;
    });

    // Update Sanity document
    if (existing) {
      await client.patch(docId).set({ documents: sanityDocs }).commit();
    } else {
      await client.createIfNotExists({
        _id: STRATEGIC_PLAN_DOC_ID,
        _type: "strategicPlan",
        title: "Strategic Plans & Future Directions",
        documents: sanityDocs,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Strategic documents updated successfully!",
      documents: sanityDocs,
    });
  } catch (err: any) {
    console.error("Error saving strategic plan documents to Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save documents to Sanity." },
      { status: 500 }
    );
  }
}
