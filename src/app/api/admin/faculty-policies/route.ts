import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import { DEFAULT_FACULTY_POLICY_DOCS } from "@/components/faculty/staticData";

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
 * GET /api/admin/faculty-policies
 */
export async function GET() {
  try {
    const client = getSanityClient();
    const query = `*[_type == "facultyPolicyDocument" && !(_id in path("drafts.**"))] | order(displayOrder asc, _createdAt asc)`;
    const docs = await client.fetch(query);

    if (Array.isArray(docs) && docs.length > 0) {
      const formatted = docs.map((d: any) => ({
        id: d.documentId || d._id,
        _id: d._id,
        title: d.title,
        subtitle: d.subtitle || "",
        category: d.category || "recruitment",
        year: d.year || "2025–2026",
        fileUrl: d.fileUrl || "/documents/DefaultFile_1.pdf",
        certificatesUrl: d.certificatesUrl || "",
        displayOrder: d.displayOrder || 0,
      }));
      return NextResponse.json({ success: true, documents: formatted });
    }

    return NextResponse.json({ success: true, documents: DEFAULT_FACULTY_POLICY_DOCS });
  } catch (err: any) {
    console.error("Failed to fetch faculty policy documents from Sanity:", err);
    return NextResponse.json({ success: true, documents: DEFAULT_FACULTY_POLICY_DOCS });
  }
}

/**
 * POST /api/admin/faculty-policies
 */
export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const doc = body.document;
    if (!doc || !doc.title) {
      return NextResponse.json({ success: false, error: "Document title is required" }, { status: 400 });
    }

    const client = getSanityClient();
    const docId = doc._id || `policy-${(doc.id || doc.title).toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

    const sanityDoc = {
      _id: docId,
      _type: "facultyPolicyDocument",
      documentId: doc.id || docId,
      title: doc.title.trim(),
      subtitle: doc.subtitle?.trim() || "",
      category: doc.category || "recruitment",
      year: doc.year?.trim() || "2025–2026",
      fileUrl: doc.fileUrl?.trim() || "/documents/DefaultFile_1.pdf",
      certificatesUrl: doc.certificatesUrl?.trim() || "",
      displayOrder: typeof doc.displayOrder === "number" ? doc.displayOrder : 10,
    };

    const saved = await client.createOrReplace(sanityDoc);

    return NextResponse.json({
      success: true,
      document: {
        id: saved.documentId || saved._id,
        _id: saved._id,
        title: saved.title,
        subtitle: saved.subtitle,
        category: saved.category,
        year: saved.year,
        fileUrl: saved.fileUrl,
        certificatesUrl: saved.certificatesUrl,
        displayOrder: saved.displayOrder,
      },
      message: `Document "${saved.title}" saved successfully.`,
    });
  } catch (err: any) {
    console.error("Failed to save faculty policy document in Sanity:", err);
    return NextResponse.json({ success: false, error: err.message || "Save failed" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/faculty-policies
 */
export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Document ID required" }, { status: 400 });
    }

    const client = getSanityClient();
    await client.delete(id);

    return NextResponse.json({ success: true, message: "Document deleted successfully." });
  } catch (err: any) {
    console.error("Failed to delete faculty policy document from Sanity:", err);
    return NextResponse.json({ success: false, error: err.message || "Delete failed" }, { status: 500 });
  }
}
