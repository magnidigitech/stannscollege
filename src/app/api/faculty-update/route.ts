import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";

const DEFAULT_PASSWORD = "Stannsf@2026";
const PROJECT_ID = "fhjwqub5";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + PROJECT_ID).digest("hex");
}

const DEFAULT_HASH = hashPassword(DEFAULT_PASSWORD);

function getWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error("SANITY_WRITE_TOKEN not configured");
  return createClient({
    projectId: PROJECT_ID,
    dataset: "production",
    apiVersion: "2024-03-01",
    token,
    useCdn: false,
  });
}

async function uploadAsset(
  client: ReturnType<typeof getWriteClient>,
  file: File,
  type: "image" | "file"
) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await client.assets.upload(type, buffer, {
    filename: file.name,
    contentType: file.type || (type === "image" ? "image/jpeg" : "application/pdf"),
  });
  return asset._id;
}

function arrayEntries(arr: any[], type: string): any[] {
  return (arr || []).map((entry: any) => ({
    _type: type,
    _key: crypto.randomUUID(),
    ...entry,
  }));
}

export async function POST(req: NextRequest) {
  try {
    // ── Parse multipart form data ─────────────────────────────────────
    const formData = await req.formData();
    const phone = (formData.get("phone") as string)?.trim();
    const password = formData.get("password") as string;
    const newPassword = (formData.get("newPassword") as string) || "";
    const profileDataStr = formData.get("profileData") as string;
    const profilePhoto = formData.get("profilePhoto") as File | null;
    const cvPdf = formData.get("cvPdf") as File | null;
    const facultyProfilePdf = formData.get("facultyProfilePdf") as File | null;

    if (!phone || !password) {
      return NextResponse.json({ success: false, error: "Phone and password required." }, { status: 400 });
    }

    const client = getWriteClient();
    const inputHash = hashPassword(password);

    // ── Re-verify authentication ──────────────────────────────────────
    const existing = await client.fetch(
      `*[_type == "facultyProfile" && contactNumber == $phone][0]{ _id, passwordHash, "profilePhotoRef": profilePhoto.asset->_id, "cvPdfRef": cvPdf.asset->_id, "facultyProfilePdfRef": facultyProfilePdf.asset->_id }`,
      { phone }
    );

    if (existing) {
      const storedHash = existing.passwordHash || DEFAULT_HASH;
      if (inputHash !== storedHash) {
        return NextResponse.json({ success: false, error: "Authentication failed." }, { status: 401 });
      }
    } else {
      if (inputHash !== DEFAULT_HASH) {
        return NextResponse.json({ success: false, error: "Authentication failed." }, { status: 401 });
      }
    }

    // ── Parse profile data ────────────────────────────────────────────
    let profileData: Record<string, any> = {};
    if (profileDataStr) {
      try { profileData = JSON.parse(profileDataStr); } catch { /* ignore */ }
    }

    // ── Upload files to Sanity ────────────────────────────────────────
    const photoAssetId = (profilePhoto && profilePhoto.size > 0)
      ? await uploadAsset(client, profilePhoto, "image")
      : null;

    const cvAssetId = (cvPdf && cvPdf.size > 0)
      ? await uploadAsset(client, cvPdf, "file")
      : null;

    const profilePdfAssetId = (facultyProfilePdf && facultyProfilePdf.size > 0)
      ? await uploadAsset(client, facultyProfilePdf, "file")
      : null;

    // ── Determine password hash ───────────────────────────────────────
    let passwordHash: string;
    if (newPassword.trim()) {
      passwordHash = hashPassword(newPassword.trim());
    } else if (existing?.passwordHash) {
      passwordHash = existing.passwordHash;
    } else {
      passwordHash = DEFAULT_HASH;
    }

    // ── Build slug ────────────────────────────────────────────────────
    const facultyName = profileData.facultyName || `Faculty ${phone}`;
    const slugValue = facultyName
      .toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // ── Build document ────────────────────────────────────────────────
    const doc: Record<string, any> = {
      _type: "facultyProfile",
      facultyName,
      slug: { _type: "slug", current: slugValue },
      designation: profileData.designation || "",
      department: profileData.department || "",
      facultyId: profileData.facultyId || "",
      gender: profileData.gender || "",
      dateOfBirth: profileData.dateOfBirth || undefined,
      dateOfJoining: profileData.dateOfJoining || undefined,
      employmentType: profileData.employmentType || "",
      officialEmail: profileData.officialEmail || "",
      contactNumber: phone,
      officeLocation: profileData.officeLocation || "",
      facultyStatus: profileData.facultyStatus || "active",
      highestQualification: profileData.highestQualification || "",
      totalExperience: profileData.totalExperience || "",
      teachingExperience: profileData.teachingExperience || "",
      industryExperience: profileData.industryExperience || "",
      shortBio: profileData.shortBio || "",
      careerObjective: profileData.careerObjective || "",
      teachingPhilosophy: profileData.teachingPhilosophy || "",
      researchInterests: profileData.researchInterests || "",
      currentAdministrativeRole: profileData.currentAdministrativeRole || "",
      orcidId: profileData.orcidId || "",
      scopusId: profileData.scopusId || "",
      metaTitle: profileData.metaTitle || "",
      metaDescription: profileData.metaDescription || "",
      imageAltText: profileData.imageAltText || "",
      displayOrder: profileData.displayOrder ? Number(profileData.displayOrder) : 999,
      featuredFaculty: profileData.featuredFaculty === true,
      showOnWebsite: profileData.showOnWebsite === true,
      passwordHash,
      // Tag arrays
      areaOfExpertise: Array.isArray(profileData.areaOfExpertise) ? profileData.areaOfExpertise : [],
      languagesKnown: Array.isArray(profileData.languagesKnown) ? profileData.languagesKnown : [],
      researchAreas: Array.isArray(profileData.researchAreas) ? profileData.researchAreas : [],
      metaKeywords: Array.isArray(profileData.metaKeywords) ? profileData.metaKeywords : [],
      // Repeatable arrays
      qualifications: arrayEntries(profileData.qualifications, "qualificationEntry"),
      professionalExperience: arrayEntries(profileData.professionalExperience, "experienceEntry"),
      subjectsHandled: arrayEntries(profileData.subjectsHandled, "subjectEntry"),
      ongoingProjects: arrayEntries(profileData.ongoingProjects, "ongoingProject"),
      completedProjects: arrayEntries(profileData.completedProjects, "completedProject"),
      publications: arrayEntries(profileData.publications, "publicationEntry"),
      booksPublished: arrayEntries(profileData.booksPublished, "bookEntry"),
      patents: arrayEntries(profileData.patents, "patentEntry"),
      conferencesAttended: arrayEntries(profileData.conferencesAttended, "conferenceEntry"),
      seminarsAttended: arrayEntries(profileData.seminarsAttended, "seminarEntry"),
      fdpsAttended: arrayEntries(profileData.fdpsAttended, "fdpEntry"),
      workshopsAttended: arrayEntries(profileData.workshopsAttended, "workshopEntry"),
      awards: arrayEntries(profileData.awards, "awardEntry"),
      departmentResponsibilities: arrayEntries(profileData.departmentResponsibilities, "responsibilityEntry"),
      committeeMemberships: arrayEntries(profileData.committeeMemberships, "committeeEntry"),
      projectsGuided: arrayEntries(profileData.projectsGuided, "projectGuidedEntry"),
      researchScholars: arrayEntries(profileData.researchScholars, "scholarEntry"),
      professionalMemberships: arrayEntries(profileData.professionalMemberships, "membershipEntry"),
    };

    // URL-type fields — omit if empty
    const urlFields: Record<string, string> = {
      linkedinUrl: profileData.linkedinUrl || "",
      googleScholarUrl: profileData.googleScholarUrl || "",
      researchGateUrl: profileData.researchGateUrl || "",
      personalWebsite: profileData.personalWebsite || "",
    };
    for (const [key, val] of Object.entries(urlFields)) {
      if (val.trim()) doc[key] = val.trim();
    }

    // Remove undefined date fields
    if (!doc.dateOfBirth) delete doc.dateOfBirth;
    if (!doc.dateOfJoining) delete doc.dateOfJoining;

    // ── Attach file assets ────────────────────────────────────────────
    if (photoAssetId) {
      doc.profilePhoto = { _type: "image", asset: { _type: "reference", _ref: photoAssetId } };
    }
    if (cvAssetId) {
      doc.cvPdf = { _type: "file", asset: { _type: "reference", _ref: cvAssetId } };
    }
    if (profilePdfAssetId) {
      doc.facultyProfilePdf = { _type: "file", asset: { _type: "reference", _ref: profilePdfAssetId } };
    }

    // ── Create or update ──────────────────────────────────────────────
    let result;
    const action = existing ? "updated" : "created";

    if (existing) {
      result = await client.patch(existing._id).set(doc).commit();
    } else {
      result = await client.create(doc as any);
    }

    return NextResponse.json({
      success: true,
      action,
      slug: slugValue,
      profileUrl: `/faculty/profile/${slugValue}`,
      documentId: result._id,
    });
  } catch (err: any) {
    console.error("[faculty-update]", err);
    return NextResponse.json(
      { success: false, error: err?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
