import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";

const DEFAULT_PASSWORD = "Stannsf@2026";
const PROJECT_ID = "fhjwqub5";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + PROJECT_ID).digest("hex");
}

const DEFAULT_HASH = hashPassword(DEFAULT_PASSWORD);

function getSanityClient() {
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

export async function POST(req: NextRequest) {
  try {
    const { phone, password } = await req.json();

    if (!phone?.trim() || !password) {
      return NextResponse.json(
        { success: false, error: "Phone number and password are required." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const inputHash = hashPassword(password);

    // Look up profile by phone number
    const profile = await client.fetch(
      `*[_type == "facultyProfile" && contactNumber == $phone][0] {
        _id,
        facultyName,
        "slug": slug.current,
        designation,
        department,
        facultyId,
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
        publications,
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
        metaTitle,
        metaDescription,
        metaKeywords,
        imageAltText,
        displayOrder,
        featuredFaculty,
        showOnWebsite,
        passwordHash,
        "profilePhotoUrl": profilePhoto.asset->url,
        "cvPdfUrl": cvPdf.asset->url,
        "facultyProfilePdfUrl": facultyProfilePdf.asset->url
      }`,
      { phone: phone.trim() }
    );

    if (profile) {
      // ── Existing profile: verify password ──────────────────────────
      const storedHash = profile.passwordHash || DEFAULT_HASH;
      if (inputHash !== storedHash) {
        return NextResponse.json(
          { success: false, error: "Incorrect password. Please try again." },
          { status: 401 }
        );
      }
      // Strip the hash before sending to client
      const { passwordHash: _omit, ...safeProfile } = profile;
      return NextResponse.json({ success: true, isNew: false, profile: safeProfile });
    } else {
      // ── No profile: only default password can create one ──────────
      if (inputHash !== DEFAULT_HASH) {
        return NextResponse.json(
          {
            success: false,
            error: "No profile found for this number. Use the default password to create a new profile.",
          },
          { status: 401 }
        );
      }
      return NextResponse.json({
        success: true,
        isNew: true,
        profile: { contactNumber: phone.trim() },
      });
    }
  } catch (err: any) {
    console.error("[faculty-auth]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error." },
      { status: 500 }
    );
  }
}
