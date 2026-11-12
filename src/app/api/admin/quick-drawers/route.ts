import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const COOKIE_NAME = "stanns_admin_session";

function checkAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminSessionToken(token) !== null;
}

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    throw new Error("SANITY_WRITE_TOKEN environment variable is not configured.");
  }
  return createClient({
    projectId: "fhjwqub5",
    dataset: "production",
    apiVersion: "2024-03-01",
    token,
    useCdn: false,
  });
}

// Fallback Handbooks if Sanity collection has not been seeded yet
const defaultFallbackHandbooks = [
  { year: "2023-2024", title: "Student Handbook (A.Y. 2023–24)", fileUrl: "/documents/admissions/handbooks/handbook 2023-24.pdf", order: 1 },
  { year: "2022-2023", title: "Student Handbook (A.Y. 2022–23)", fileUrl: "/documents/admissions/handbooks/handbook 2022-23.pdf", order: 2 },
  { year: "2021-2022", title: "Student Handbook (A.Y. 2021–22)", fileUrl: "/documents/admissions/handbooks/handbook 2021-22.pdf", order: 3 },
  { year: "2020-2021", title: "Student Handbook (A.Y. 2020–21)", fileUrl: "/documents/admissions/handbooks/handbook 2020-21.pdf", order: 4 },
  { year: "2019-2020", title: "Student Handbook (A.Y. 2019–20)", fileUrl: "/documents/admissions/handbooks/handbook 2019-20.pdf", order: 5 },
  { year: "2018-2019", title: "Student Handbook (A.Y. 2018–19)", fileUrl: "/documents/admissions/handbooks/handbook 2018-19.pdf", order: 6 },
];

// Fallback Brochures
const defaultFallbackBrochures = [
  {
    _id: "brochure-default-1",
    title: "Institutional Overview Brochure",
    subtitle: "Campus Infrastructure & Academic Facilities",
    academicYear: "2025-2026",
    category: "College",
    fileUrl: "/documents/admissions/Pamphlets.jpg",
    coverUrl: "/documents/admissions/Pamphlets.jpg",
    isImage: true,
    description: "Visual roadmap of St. Ann's College facilities, student enrichment wings, laboratory infrastructure, and faculty credentials.",
    displayOrder: 1,
  },
  {
    _id: "brochure-default-2",
    title: "Core Highlights & Admissions Pamphlet",
    subtitle: "Admissions, Placement Records & Faculty Eminence",
    academicYear: "2025-2026",
    category: "Admissions",
    fileUrl: "/documents/admissions/Pamphlets-WA0006.jpg",
    coverUrl: "/documents/admissions/Pamphlets-WA0006.jpg",
    isImage: true,
    description: "Compact flyer detailing admission tracks, top tier recruitment track records, institutional scholarships, and clubs.",
    displayOrder: 2,
  },
  {
    _id: "brochure-default-3",
    title: "Postgraduate (MCA & MBA) Professional Brochure",
    subtitle: "AICTE Recognized Postgraduate Programmes",
    academicYear: "2025-2026",
    category: "PG",
    fileUrl: "/documents/admissions/Prospectus 2025-26.pdf",
    isImage: false,
    description: "Detailed curriculum guide, computational lab infrastructure, live case studies, and corporate internship interfaces.",
    displayOrder: 3,
  },
  {
    _id: "brochure-default-4",
    title: "Undergraduate (UG Honours) Course Guide",
    subtitle: "Single Major with One Minor Curriculum Architecture",
    academicYear: "2025-2026",
    category: "UG",
    fileUrl: "/documents/admissions/Prospectus 2025-26.pdf",
    isImage: false,
    description: "Subject clusters, add-on certificates, interdisciplinary electives, and semester credit structure under ANU Guntur.",
    displayOrder: 4,
  },
];

// Fallback Prospectus
const defaultFallbackProspectus = [
  {
    _id: "prospectus-default-1",
    title: "St. Ann's Comprehensive Prospectus (2025–2026)",
    academicYear: "2025-2026",
    description: "Contains complete degree regulations, fee schedules, code of conduct, faculty statistics, library resources, laboratory facilities, scholarship guidelines, extracurricular clubs, and general institutional policies.",
    fileUrl: "/documents/admissions/Prospectus 2025-26.pdf",
    isCurrent: true,
    displayOrder: 1,
    highlights: [
      "Complete UG & PG Syllabi Outlines",
      "Hostel & Campus Transport Amenities",
      "Code of Conduct & Discipline Norms",
      "Scholarships & Fee Concession Criteria",
      "Faculty Directory & Research Labs",
      "Placement Cell & Career Pipeline",
    ],
  },
  {
    _id: "prospectus-default-2",
    title: "Institutional Prospectus (A.Y. 2024–2025)",
    academicYear: "2024-2025",
    description: "Archived institutional charter, syllabus framework, and governance documentation for compliance reference.",
    fileUrl: "/documents/admissions/Prospectus 2025-26.pdf",
    isCurrent: false,
    displayOrder: 2,
    highlights: [
      "Previous academic session benchmarks",
      "Statutory criteria & course outlines",
    ],
  },
];

/**
 * GET /api/admin/quick-drawers
 * Returns all documents across the 5 side drawer categories:
 * newsletters, magazines, handbooks, brochures, prospectus
 */
export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const client = getSanityClient();

    const [newsletters, magazines, handbooks, brochures, prospectus] = await Promise.all([
      client.fetch(`*[_type == "newsletter" && !(_id in path("drafts.**"))] | order(academicYear desc, displayOrder asc) {
        _id,
        title,
        academicYear,
        month,
        displayOrder,
        "pdfUrl": coalesce(pdfFile.asset->url, ""),
        "assetId": pdfFile.asset._ref
      }`),
      client.fetch(`*[_type == "collegeMagazine" && !(_id in path("drafts.**"))] | order(academicYear desc, displayOrder asc) {
        _id,
        title,
        academicYear,
        displayOrder,
        "pdfUrl": coalesce(pdfFile.asset->url, ""),
        "coverUrl": coalesce(coverImage.asset->url, ""),
        "pdfAssetId": pdfFile.asset._ref,
        "coverAssetId": coverImage.asset._ref
      }`),
      client.fetch(`*[_type == "studentHandbook" && !(_id in path("drafts.**"))] | order(order asc, year desc) {
        _id,
        year,
        title,
        order,
        "fileUrl": coalesce(file.asset->url, ""),
        "assetId": file.asset._ref
      }`),
      client.fetch(`*[_type == "collegeBrochure" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
        _id,
        title,
        subtitle,
        academicYear,
        category,
        description,
        isImage,
        displayOrder,
        "fileUrl": coalesce(file.asset->url, ""),
        "coverUrl": coalesce(coverImage.asset->url, ""),
        "fileAssetId": file.asset._ref,
        "coverAssetId": coverImage.asset._ref
      }`),
      client.fetch(`*[_type == "collegeProspectus" && !(_id in path("drafts.**"))] | order(displayOrder asc, academicYear desc) {
        _id,
        title,
        academicYear,
        description,
        isCurrent,
        displayOrder,
        highlights,
        "fileUrl": coalesce(file.asset->url, ""),
        "assetId": file.asset._ref
      }`),
    ]);

    return NextResponse.json({
      success: true,
      newsletters: Array.isArray(newsletters) ? newsletters : [],
      magazines: Array.isArray(magazines) ? magazines : [],
      handbooks: Array.isArray(handbooks) && handbooks.length > 0 ? handbooks : defaultFallbackHandbooks,
      brochures: Array.isArray(brochures) && brochures.length > 0 ? brochures : defaultFallbackBrochures,
      prospectus: Array.isArray(prospectus) && prospectus.length > 0 ? prospectus : defaultFallbackProspectus,
    });
  } catch (err: any) {
    console.error("Error fetching quick drawers data from Sanity:", err);
    return NextResponse.json({
      success: true,
      newsletters: [],
      magazines: [],
      handbooks: defaultFallbackHandbooks,
      brochures: defaultFallbackBrochures,
      prospectus: defaultFallbackProspectus,
      warning: "Loaded default data (Sanity connection pending or empty).",
    });
  }
}

/**
 * POST /api/admin/quick-drawers
 * Creates a new drawer document in Sanity
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
    const { category, item } = body;

    if (!category || !item) {
      return NextResponse.json(
        { success: false, error: "Missing required category or item payload." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    let doc: any = { _type: category };

    if (category === "newsletter") {
      doc = {
        _type: "newsletter",
        title: item.title || `The St. Ann's Chronicle - ${item.month || ""} ${item.academicYear || ""}`.trim(),
        academicYear: item.academicYear || "",
        month: item.month || "",
        displayOrder: Number(item.displayOrder) || 1,
        ...(item.assetId && {
          pdfFile: { _type: "file", asset: { _type: "reference", _ref: item.assetId } },
        }),
      };
    } else if (category === "collegeMagazine") {
      doc = {
        _type: "collegeMagazine",
        title: item.title || "Annite Horizon College Magazine",
        academicYear: item.academicYear || "",
        displayOrder: Number(item.displayOrder) || 1,
        ...(item.pdfAssetId && {
          pdfFile: { _type: "file", asset: { _type: "reference", _ref: item.pdfAssetId } },
        }),
        ...(item.coverAssetId && {
          coverImage: { _type: "image", asset: { _type: "reference", _ref: item.coverAssetId } },
        }),
      };
    } else if (category === "studentHandbook") {
      doc = {
        _type: "studentHandbook",
        year: item.year || item.academicYear || "",
        title: item.title || `Student Handbook (${item.year || item.academicYear || ""})`,
        order: Number(item.order) || 1,
        ...(item.assetId && {
          file: { _type: "file", asset: { _type: "reference", _ref: item.assetId } },
        }),
      };
    } else if (category === "collegeBrochure") {
      doc = {
        _type: "collegeBrochure",
        title: item.title || "Official College Brochure",
        subtitle: item.subtitle || "",
        academicYear: item.academicYear || "",
        category: item.category || "College",
        description: item.description || "",
        isImage: Boolean(item.isImage),
        displayOrder: Number(item.displayOrder) || 1,
        ...(item.fileAssetId && {
          file: { _type: "file", asset: { _type: "reference", _ref: item.fileAssetId } },
        }),
        ...(item.coverAssetId && {
          coverImage: { _type: "image", asset: { _type: "reference", _ref: item.coverAssetId } },
        }),
      };
    } else if (category === "collegeProspectus") {
      doc = {
        _type: "collegeProspectus",
        title: item.title || "St. Ann's Comprehensive Prospectus",
        academicYear: item.academicYear || "",
        description: item.description || "",
        isCurrent: item.isCurrent !== false,
        displayOrder: Number(item.displayOrder) || 1,
        highlights: Array.isArray(item.highlights) ? item.highlights : [],
        ...(item.assetId && {
          file: { _type: "file", asset: { _type: "reference", _ref: item.assetId } },
        }),
      };
    } else {
      return NextResponse.json(
        { success: false, error: `Invalid category type: ${category}` },
        { status: 400 }
      );
    }

    const created = await client.create(doc);
    return NextResponse.json({ success: true, created });
  } catch (err: any) {
    console.error("Error creating quick drawer item in Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create document in Sanity." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/quick-drawers
 * Updates an existing drawer document in Sanity
 */
export async function PUT(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { category, item } = body;

    if (!category || !item || !item._id) {
      return NextResponse.json(
        { success: false, error: "Missing required document _id or payload." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const patch = client.patch(item._id);

    if (category === "newsletter") {
      patch.set({
        title: item.title,
        academicYear: item.academicYear,
        month: item.month,
        displayOrder: Number(item.displayOrder) || 1,
        ...(item.assetId && {
          pdfFile: { _type: "file", asset: { _type: "reference", _ref: item.assetId } },
        }),
      });
    } else if (category === "collegeMagazine") {
      patch.set({
        title: item.title,
        academicYear: item.academicYear,
        displayOrder: Number(item.displayOrder) || 1,
        ...(item.pdfAssetId && {
          pdfFile: { _type: "file", asset: { _type: "reference", _ref: item.pdfAssetId } },
        }),
        ...(item.coverAssetId && {
          coverImage: { _type: "image", asset: { _type: "reference", _ref: item.coverAssetId } },
        }),
      });
    } else if (category === "studentHandbook") {
      patch.set({
        year: item.year || item.academicYear,
        title: item.title,
        order: Number(item.order) || 1,
        ...(item.assetId && {
          file: { _type: "file", asset: { _type: "reference", _ref: item.assetId } },
        }),
      });
    } else if (category === "collegeBrochure") {
      patch.set({
        title: item.title,
        subtitle: item.subtitle,
        academicYear: item.academicYear,
        category: item.category,
        description: item.description,
        isImage: Boolean(item.isImage),
        displayOrder: Number(item.displayOrder) || 1,
        ...(item.fileAssetId && {
          file: { _type: "file", asset: { _type: "reference", _ref: item.fileAssetId } },
        }),
        ...(item.coverAssetId && {
          coverImage: { _type: "image", asset: { _type: "reference", _ref: item.coverAssetId } },
        }),
      });
    } else if (category === "collegeProspectus") {
      patch.set({
        title: item.title,
        academicYear: item.academicYear,
        description: item.description,
        isCurrent: Boolean(item.isCurrent),
        displayOrder: Number(item.displayOrder) || 1,
        highlights: Array.isArray(item.highlights) ? item.highlights : [],
        ...(item.assetId && {
          file: { _type: "file", asset: { _type: "reference", _ref: item.assetId } },
        }),
      });
    }

    const updated = await patch.commit();
    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    console.error("Error updating quick drawer item in Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update document in Sanity." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/quick-drawers
 * Deletes a document by ID
 */
export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Document ID parameter 'id' is required." },
        { status: 400 }
      );
    }

    // Default mock items cannot be deleted directly from Sanity if they are not in Sanity yet
    if (id.startsWith("brochure-default-") || id.startsWith("prospectus-default-")) {
      return NextResponse.json({ success: true, message: "Default item skipped." });
    }

    const client = getSanityClient();
    await client.delete(id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error("Error deleting quick drawer item in Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete document from Sanity." },
      { status: 500 }
    );
  }
}

