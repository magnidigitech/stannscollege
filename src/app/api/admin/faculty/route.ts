import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

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

function generateSlug(text: string): string {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s+/gi, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * GET /api/admin/faculty
 * Fetch all faculty & staff profiles from Sanity
 */
export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const query = `*[_type == "facultyProfileNew" && !(_id in path("drafts.**"))] | order(sNo asc, facultyName asc) {
      _id,
      _type,
      sNo,
      staffType,
      facultyName,
      "slug": slug.current,
      "profilePhotoUrl": profilePhoto.asset->url,
      profilePhoto,
      designation,
      department,
      facultyId,
      frsId,
      aicteId,
      institutionalRole,
      committeeRoles,
      gender,
      dateOfBirth,
      dateOfJoining,
      employmentType,
      officialEmail,
      contactNumber,
      officeLocation,
      facultyStatus,
      highestQualification,
      qualifications,
      totalExperience,
      teachingExperience,
      industryExperience,
      professionalExperience,
      shortBio,
      careerObjective,
      teachingPhilosophy,
      areaOfExpertise,
      languagesKnown,
      subjectsHandled,
      researchAreas,
      researchInterests,
      ongoingProjects,
      completedProjects,
      publications[] {
        publicationTitle,
        journalName,
        publicationType,
        authors,
        year,
        volumeIssuePages,
        doiLink,
        indexing,
        "publicationPdfUrl": publicationPdf.asset->url
      },
      booksPublished,
      patents,
      conferencesAttended,
      seminarsAttended,
      fdpsAttended,
      workshopsAttended,
      awards,
      currentAdministrativeRole,
      departmentResponsibilities,
      committeeMemberships,
      projectsGuided,
      researchScholars,
      professionalMemberships,
      linkedinUrl,
      googleScholarUrl,
      orcidId,
      scopusId,
      researchGateUrl,
      personalWebsite,
      "cvPdfUrl": cvPdf.asset->url,
      "facultyProfilePdfUrl": facultyProfilePdf.asset->url,
      metaTitle,
      metaDescription,
      metaKeywords,
      imageAltText,
      displayOrder,
      featuredFaculty,
      showOnWebsite
    }`;

    const facultyList = await client.fetch(query);
    return NextResponse.json({ success: true, faculty: facultyList || [] });
  } catch (err: any) {
    console.error("Failed to fetch faculty profiles from Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch faculty profiles" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/faculty
 * Create, update, or batch-reorder faculty & staff in Sanity
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
    const client = getSanityClient();

    // 1. Batch Reorder Action
    if (body.action === "reorder" && Array.isArray(body.items)) {
      const transaction = client.transaction();
      for (const item of body.items) {
        if (item._id && typeof item.sNo === "number") {
          transaction.patch(item._id, (p) => p.set({ sNo: item.sNo, displayOrder: item.sNo }));
        }
      }
      await transaction.commit();
      return NextResponse.json({
        success: true,
        message: "Order updated and synced successfully.",
      });
    }

    // 2. Single Document Save / Update
    const { faculty } = body;

    if (!faculty || !faculty.facultyName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Faculty name is required." },
        { status: 400 }
      );
    }

    const docId = faculty._id || `facultyProfile-${Date.now()}`;
    const autoSlug = generateSlug(faculty.facultyName);
    const slugValue = faculty.slug?.trim() || autoSlug || `faculty-${Date.now()}`;

    const docToSave: Record<string, any> = {
      _id: docId,
      _type: "facultyProfileNew",
      facultyName: faculty.facultyName.trim(),
      slug: { _type: "slug", current: slugValue },
      staffType: faculty.staffType || "teaching",
      designation: faculty.designation?.trim() || "Faculty Member",
      department: faculty.department?.trim() || "Commerce",
      facultyId: faculty.facultyId?.trim() || "",
      gender: faculty.gender || "Female",
      dateOfBirth: faculty.dateOfBirth || null,
      dateOfJoining: faculty.dateOfJoining?.trim() || "",
      employmentType: faculty.employmentType || "Regular",
      officialEmail: faculty.officialEmail?.trim() || "",
      contactNumber: faculty.contactNumber?.trim() || "",
      officeLocation: faculty.officeLocation?.trim() || "",
      facultyStatus: faculty.facultyStatus || "active",
      highestQualification: faculty.highestQualification?.trim() || "",
      qualifications: Array.isArray(faculty.qualifications) ? faculty.qualifications : [],
      totalExperience: faculty.totalExperience?.toString() || "",
      teachingExperience: faculty.teachingExperience?.toString() || "",
      industryExperience: faculty.industryExperience?.toString() || "",
      professionalExperience: Array.isArray(faculty.professionalExperience) ? faculty.professionalExperience : [],
      shortBio: faculty.shortBio?.trim() || "",
      careerObjective: faculty.careerObjective?.trim() || "",
      teachingPhilosophy: faculty.teachingPhilosophy?.trim() || "",
      areaOfExpertise: Array.isArray(faculty.areaOfExpertise) ? faculty.areaOfExpertise : [],
      languagesKnown: Array.isArray(faculty.languagesKnown) ? faculty.languagesKnown : [],
      subjectsHandled: Array.isArray(faculty.subjectsHandled) ? faculty.subjectsHandled : [],
      researchAreas: Array.isArray(faculty.researchAreas) ? faculty.researchAreas : [],
      researchInterests: faculty.researchInterests?.trim() || "",
      ongoingProjects: Array.isArray(faculty.ongoingProjects) ? faculty.ongoingProjects : [],
      completedProjects: Array.isArray(faculty.completedProjects) ? faculty.completedProjects : [],
      publications: Array.isArray(faculty.publications) ? faculty.publications : [],
      booksPublished: Array.isArray(faculty.booksPublished) ? faculty.booksPublished : [],
      patents: Array.isArray(faculty.patents) ? faculty.patents : [],
      conferencesAttended: Array.isArray(faculty.conferencesAttended) ? faculty.conferencesAttended : [],
      seminarsAttended: Array.isArray(faculty.seminarsAttended) ? faculty.seminarsAttended : [],
      fdpsAttended: Array.isArray(faculty.fdpsAttended) ? faculty.fdpsAttended : [],
      workshopsAttended: Array.isArray(faculty.workshopsAttended) ? faculty.workshopsAttended : [],
      awards: Array.isArray(faculty.awards) ? faculty.awards : [],
      currentAdministrativeRole: faculty.currentAdministrativeRole?.trim() || "",
      departmentResponsibilities: Array.isArray(faculty.departmentResponsibilities) ? faculty.departmentResponsibilities : [],
      committeeMemberships: Array.isArray(faculty.committeeMemberships) ? faculty.committeeMemberships : [],
      projectsGuided: Array.isArray(faculty.projectsGuided) ? faculty.projectsGuided : [],
      researchScholars: Array.isArray(faculty.researchScholars) ? faculty.researchScholars : [],
      professionalMemberships: Array.isArray(faculty.professionalMemberships) ? faculty.professionalMemberships : [],
      linkedinUrl: faculty.linkedinUrl?.trim() || "",
      googleScholarUrl: faculty.googleScholarUrl?.trim() || "",
      orcidId: faculty.orcidId?.trim() || "",
      scopusId: faculty.scopusId?.trim() || "",
      researchGateUrl: faculty.researchGateUrl?.trim() || "",
      personalWebsite: faculty.personalWebsite?.trim() || "",
      frsId: faculty.frsId?.trim() || "",
      aicteId: faculty.aicteId?.trim() || "",
      institutionalRole: faculty.institutionalRole?.trim() || "",
      committeeRoles: Array.isArray(faculty.committeeRoles) ? faculty.committeeRoles : [],
      metaTitle: faculty.metaTitle?.trim() || `${faculty.facultyName.trim()} | Faculty | St. Ann's College for Women`,
      metaDescription: faculty.metaDescription?.trim() || faculty.shortBio?.trim() || "",
      imageAltText: faculty.imageAltText?.trim() || faculty.facultyName.trim(),
      sNo: typeof faculty.sNo === "number" ? faculty.sNo : 1,
      displayOrder: typeof faculty.displayOrder === "number" ? faculty.displayOrder : typeof faculty.sNo === "number" ? faculty.sNo : 1,
      featuredFaculty: Boolean(faculty.featuredFaculty),
      showOnWebsite: faculty.showOnWebsite !== false,
    };

    // Handle profile photo asset ref if provided
    if (faculty.photoAssetId) {
      docToSave.profilePhoto = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: faculty.photoAssetId,
        },
      };
    } else if (faculty.profilePhoto && typeof faculty.profilePhoto === "object") {
      docToSave.profilePhoto = faculty.profilePhoto;
    }

    // Handle CV PDF asset ref if provided
    if (faculty.cvAssetId) {
      docToSave.cvPdf = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: faculty.cvAssetId,
        },
      };
    }

    // Handle Faculty Profile PDF asset ref if provided
    if (faculty.facultyProfilePdfAssetId) {
      docToSave.facultyProfilePdf = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: faculty.facultyProfilePdfAssetId,
        },
      };
    }

    const savedDoc = await client.createOrReplace(docToSave as any);

    return NextResponse.json({
      success: true,
      faculty: savedDoc,
      message: `Profile for "${faculty.facultyName}" saved successfully.`,
    });
  } catch (err: any) {
    console.error("Failed to save faculty profile in Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save faculty profile." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/faculty
 * Delete a faculty or staff profile from Sanity
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
        { success: false, error: "Faculty document ID is required." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    await client.delete(id);

    return NextResponse.json({
      success: true,
      message: `Profile deleted successfully.`,
    });
  } catch (err: any) {
    console.error("Failed to delete faculty profile in Sanity:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete faculty profile." },
      { status: 500 }
    );
  }
}
