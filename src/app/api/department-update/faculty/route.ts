import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { FACULTY_DATA } from "@/components/faculty/staticData";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";

function getReadClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    token: token || undefined,
    useCdn: false,
  });
}

const DEPT_MAP: Record<string, { name: string; slug: string }> = {
  "department-of-commerce": { name: "Commerce", slug: "commerce" },
  "department-of-computer-science-applications": { name: "Computer Science", slug: "computer-science" },
  "department-of-computer-applications-bca": { name: "Computer Science", slug: "computer-science" },
  "department-of-computer-science-cs-artificial-intelligence": { name: "Computer Science", slug: "computer-science" },
  "department-of-mathematics": { name: "Mathematics", slug: "mathematics" },
  "department-of-physics": { name: "Physics", slug: "physics" },
  "department-of-statistics": { name: "Statistics", slug: "statistics" },
  "department-of-biotechnology": { name: "Biotechnology", slug: "biotechnology" },
  "department-of-microbiology": { name: "Microbiology", slug: "microbiology" },
  "department-of-botany": { name: "Botany", slug: "botany" },
  "department-of-chemistry": { name: "Chemistry", slug: "chemistry" },
  "department-of-english": { name: "English", slug: "english" },
  "department-of-oriental-languages": { name: "Oriental Languages", slug: "oriental-languages" },
  "department-of-oriental-languages-telugu-sanskrit-hindi": { name: "Oriental Languages", slug: "oriental-languages" },
  "department-of-mca": { name: "MCA", slug: "mca" },
  "department-of-mba": { name: "MBA", slug: "mba" },
};

function normalizeName(name: string): string {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s+/gi, "")
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const deptId = searchParams.get("deptId") || "";

    const cleanId = deptId.replace("department-of-", "").replace(/-/g, " ");
    const deptInfo = DEPT_MAP[deptId] || { name: cleanId, slug: deptId };
    const targetDeptLower = (deptInfo.name || cleanId).toLowerCase();

    // 1. Fetch live profiles from Sanity
    let sanityProfiles: any[] = [];
    try {
      const client = getReadClient();
      const query = `*[_type == "facultyProfileNew" && !(_id in path("drafts.**"))] | order(sNo asc) {
        _id,
        "name": facultyName,
        facultyName,
        "slug": slug.current,
        designation,
        department,
        staffType,
        "employeeId": facultyId,
        facultyId,
        "qualification": highestQualification,
        highestQualification,
        "experience": totalExperience,
        totalExperience,
        teachingExperience,
        industryExperience,
        dateOfBirth,
        dateOfJoining,
        rejoiningDate,
        employmentType,
        "email": officialEmail,
        officialEmail,
        "phone": contactNumber,
        contactNumber,
        officeLocation,
        gender,
        frsId,
        aicteId,
        shortBio,
        careerObjective,
        teachingPhilosophy,
        "specialization": areaOfExpertise[0],
        areaOfExpertise,
        languagesKnown,
        researchAreas,
        researchInterests,
        booksPublished,
        awards,
        "imageUrl": profilePhoto.asset->url,
        "photoAssetId": profilePhoto.asset._ref,
        "profilePdfUrl": facultyProfilePdf.asset->url,
        "cvPdfUrl": cvPdf.asset->url,
        linkedinUrl,
        googleScholarUrl,
        orcidId,
        scopusId,
        researchGateUrl,
        personalWebsite,
        showOnWebsite
      }`;
      sanityProfiles = await client.fetch(query);
    } catch (err: any) {
      console.warn("Sanity fetch failed for faculty, using static data:", err.message);
    }

    // Filter sanity profiles for this department
    const matchingSanity = (sanityProfiles || []).filter((p) => {
      const d = (p.department || "").toLowerCase();
      return (
        d.includes(targetDeptLower) ||
        targetDeptLower.includes(d) ||
        d.includes(deptInfo.slug)
      );
    });

    // 2. Load static baseline data from FACULTY_DATA
    const staticDept = (FACULTY_DATA.departments || []).find(
      (d) =>
        d.slug === deptInfo.slug ||
        d.name.toLowerCase().includes(targetDeptLower)
    );

    const staticTeaching = (FACULTY_DATA.teachingFaculty || []).filter((t) => {
      const d = (t.department || "").toLowerCase();
      return d.includes(targetDeptLower) || targetDeptLower.includes(d);
    });

    // 3. Merge: Prioritize Sanity profile, fallback to static teaching & department members
    const memberMap = new Map<string, any>();

    // Seed from static teachingFaculty
    staticTeaching.forEach((m) => {
      const key = normalizeName(m.name);
      memberMap.set(key, {
        name: m.name,
        designation: m.designation || "Lecturer",
        qualification: m.qualification || "Postgraduate",
        experience: m.experience || "—",
        email: m.email || "",
        employeeId: m.employeeId || "",
        dateOfJoining: m.dateOfJoining || "",
        rejoiningDate: m.rejoiningDate || "",
        imageUrl: m.imageUrl || "",
        profilePdfUrl: m.profilePdfUrl || "",
        specialization: m.specialization || "",
        slug: m.slug || "",
      });
    });

    // Merge static dept.members
    if (staticDept && Array.isArray(staticDept.members)) {
      staticDept.members.forEach((m: any) => {
        const key = normalizeName(m.name);
        const existing = memberMap.get(key) || {};
        memberMap.set(key, {
          ...existing,
          name: m.name,
          designation: m.designation || existing.designation || "Lecturer",
          qualification: m.qualification || existing.qualification || "Postgraduate",
          experience: m.experience || existing.experience || "—",
          employeeId: m.employeeId || existing.employeeId || "",
          dateOfJoining: m.dateOfJoining || existing.dateOfJoining || "",
          rejoiningDate: m.rejoiningDate || existing.rejoiningDate || "",
        });
      });
    }

    // Overlay live Sanity profiles (overwrites or adds new)
    matchingSanity.forEach((sp) => {
      const key = normalizeName(sp.name);
      const existing = memberMap.get(key) || {};
      memberMap.set(key, {
        ...existing,
        ...sp,
        _id: sp._id,
        name: sp.name || existing.name,
        designation: sp.designation || existing.designation || "Faculty Member",
        qualification: sp.qualification || existing.qualification || "",
        experience: sp.experience || existing.experience || "",
        email: sp.email || existing.email || "",
        employeeId: sp.employeeId || existing.employeeId || "",
        dateOfJoining: sp.dateOfJoining || existing.dateOfJoining || "",
        imageUrl: sp.imageUrl || existing.imageUrl || "",
        profilePdfUrl: sp.profilePdfUrl || existing.profilePdfUrl || "",
        specialization: sp.specialization || existing.specialization || "",
      });
    });

    const result = Array.from(memberMap.values());

    return NextResponse.json({
      success: true,
      faculty: result,
      department: deptInfo.name,
    });
  } catch (error: any) {
    console.error("Error in department faculty API:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load faculty" },
      { status: 500 }
    );
  }
}
