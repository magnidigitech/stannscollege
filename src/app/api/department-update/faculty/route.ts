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
  "department-of-bca": { name: "Computer Science", slug: "computer-science" },
  "department-of-computer-science": { name: "Computer Science", slug: "computer-science" },
  "department-of-artificial-intelligence": { name: "Computer Science", slug: "computer-science" },
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
  "department-of-telugu-wing": { name: "Oriental Languages", slug: "oriental-languages" },
  "department-of-sanskrit-hindi-wing": { name: "Oriental Languages", slug: "oriental-languages" },
  "department-of-oriental-languages": { name: "Oriental Languages", slug: "oriental-languages" },
  "department-of-oriental-languages-telugu-sanskrit-hindi": { name: "Oriental Languages", slug: "oriental-languages" },
  "department-of-mca": { name: "MCA", slug: "mca" },
  "department-of-mba": { name: "MBA", slug: "mba" },
};

function normalizeName(name: string): string {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s*/gi, "")
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findExistingKey(map: Map<string, any>, empId: string, name: string): string | null {
  const normEmpId = (empId || "").trim().toUpperCase();
  const normName = normalizeName(name);

  if (normEmpId && map.has(`EMP:${normEmpId}`)) return `EMP:${normEmpId}`;
  if (normName && map.has(`NAME:${normName}`)) return `NAME:${normName}`;

  for (const [key, val] of map.entries()) {
    const valEmpId = (val.employeeId || "").trim().toUpperCase();
    const valNormName = normalizeName(val.name);
    if (normEmpId && valEmpId && normEmpId === valEmpId) {
      return key;
    }
    if (normName && valNormName && normName === valNormName) {
      return key;
    }
  }

  return null;
}

function upsertMember(map: Map<string, any>, m: any) {
  const normEmpId = (m.employeeId || "").trim().toUpperCase();
  const normName = normalizeName(m.name);
  const existingKey = findExistingKey(map, normEmpId, m.name);

  if (existingKey) {
    const existing = map.get(existingKey)!;
    map.set(existingKey, {
      ...existing,
      ...m,
      name: m.name || existing.name,
      employeeId: m.employeeId || existing.employeeId || "",
      designation: m.designation || existing.designation || "Lecturer",
      qualification: m.qualification || existing.qualification || "Postgraduate",
      experience: m.experience || existing.experience || "—",
      imageUrl: m.imageUrl || existing.imageUrl || "",
      photoAssetId: m.photoAssetId || existing.photoAssetId,
      profilePdfUrl: m.profilePdfUrl || existing.profilePdfUrl || "",
      specialization: m.specialization || existing.specialization || "",
      email: m.email || existing.email || "",
      dateOfJoining: m.dateOfJoining || existing.dateOfJoining || "",
      rejoiningDate: m.rejoiningDate || existing.rejoiningDate || "",
    });
  } else {
    const newKey = normEmpId ? `EMP:${normEmpId}` : `NAME:${normName}`;
    map.set(newKey, {
      name: m.name,
      designation: m.designation || "Lecturer",
      qualification: m.qualification || "Postgraduate",
      experience: m.experience || "—",
      email: m.email || "",
      employeeId: m.employeeId || "",
      dateOfJoining: m.dateOfJoining || "",
      rejoiningDate: m.rejoiningDate || "",
      imageUrl: m.imageUrl || "",
      photoAssetId: m.photoAssetId || null,
      profilePdfUrl: m.profilePdfUrl || "",
      specialization: m.specialization || "",
      slug: m.slug || "",
    });
  }
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
      upsertMember(memberMap, m);
    });

    // Merge static dept.members
    if (staticDept && Array.isArray(staticDept.members)) {
      staticDept.members.forEach((m: any) => {
        upsertMember(memberMap, m);
      });
    }

    // Overlay live Sanity profiles (overwrites or adds new, preserving images)
    matchingSanity.forEach((sp) => {
      upsertMember(memberMap, {
        ...sp,
        _id: sp._id,
        name: sp.name,
        designation: sp.designation,
        qualification: sp.qualification,
        experience: sp.experience,
        email: sp.email,
        employeeId: sp.employeeId,
        dateOfJoining: sp.dateOfJoining,
        imageUrl: sp.imageUrl,
        photoAssetId: sp.photoAssetId,
        profilePdfUrl: sp.profilePdfUrl,
        specialization: sp.specialization,
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
