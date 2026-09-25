import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { DEFAULT_FACULTY_POLICY_DOCS } from "@/components/faculty/staticData";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    token: token || undefined,
    useCdn: true,
  });
}

export const dynamic = "force-dynamic";

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
    console.error("Failed to fetch public faculty policy documents:", err);
    return NextResponse.json({ success: true, documents: DEFAULT_FACULTY_POLICY_DOCS });
  }
}
