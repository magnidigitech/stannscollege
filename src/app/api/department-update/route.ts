import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const DEFAULT_PASSWORDS: Record<string, string> = {
  "department-of-commerce": "commerce@2026",
  "department-of-bca": "bca@2026",
  "department-of-computer-science": "computerscience@2026",
  "department-of-artificial-intelligence": "ai@2026",
  "department-of-computer-science-applications": "computerscience@2026",
  "department-of-computer-applications-bca": "bca@2026",
  "department-of-computer-science-cs-artificial-intelligence": "ai@2026",
  "department-of-mathematics": "mathematics@2026",
  "department-of-physics": "physics@2026",
  "department-of-statistics": "statistics@2026",
  "department-of-biotechnology": "biotechnology@2026",
  "department-of-microbiology": "microbiology@2026",
  "department-of-botany": "botany@2026",
  "department-of-chemistry": "chemistry@2026",
  "department-of-english": "english@2026",
  "department-of-telugu-wing": "telugu@2026",
  "department-of-sanskrit-hindi-wing": "sanskirthindi@2026",
  "department-of-oriental-languages": "orientallanguages@2026",
  "department-of-oriental-languages-telugu-sanskrit-hindi": "orientallanguages@2026",
  "department-of-mca": "mca@2026",
  "department-of-mba": "mba@2026",
  "publications": "publications@2026",
  "events": "events@2026",
  "notices": "notices@2026",
};

const MASTER_PASSWORD = "Stannsf@2026";

function getDepartmentPassword(deptId: string): string {
  try {
    const filePath = path.join(process.cwd(), "src/components/academics/academics-data.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(fileContent);
      if (json.departmentPasswords && json.departmentPasswords[deptId]) {
        return json.departmentPasswords[deptId];
      }
    }
  } catch (err) {
    console.error("Error reading department passwords from file:", err);
  }
  return DEFAULT_PASSWORDS[deptId] || MASTER_PASSWORD;
}

const PROJECT_ID = "fhjwqub5";

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

async function uploadAsset(client: any, file: File): Promise<{ id: string; url: string }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type || "image/jpeg",
  });
  return { id: asset._id, url: asset.url };
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

function addKeysToObj(obj: any) {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (let item of obj) {
      if (item && typeof item === "object") {
        if (!item._key) {
          item._key = crypto.randomUUID();
        }
        addKeysToObj(item);
      }
    }
  } else {
    for (let k in obj) {
      if (typeof obj[k] === "object") {
        addKeysToObj(obj[k]);
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = formData.get("password") as string;
    const selectedDeptId = formData.get("selectedDeptId") as string;
    const departmentDataStr = formData.get("departmentData") as string;

    if (!selectedDeptId || !password) {
      return NextResponse.json({ success: false, error: "Department and password required." }, { status: 400 });
    }

    const expectedPassword = getDepartmentPassword(selectedDeptId);
    if (password !== expectedPassword && password !== MASTER_PASSWORD) {
      return NextResponse.json({ success: false, error: "Incorrect password for this department. Access denied." }, { status: 401 });
    }

    let departmentData: Record<string, any> = {};
    try {
      departmentData = JSON.parse(departmentDataStr);
    } catch {
      return NextResponse.json({ success: false, error: "Malformed payload." }, { status: 400 });
    }

    const client = getWriteClient();

    // ── Process photo gallery file uploads ───────────────────────────
    const gallery = Array.isArray(departmentData.gallery) ? departmentData.gallery : [];
    
    for (let i = 0; i < gallery.length; i++) {
      const fileKey = `galleryImage_${i}`;
      const imageFile = formData.get(fileKey) as File | null;
      
      if (imageFile && imageFile.size > 0) {
        // Upload the new image file to Sanity
        const uploaded = await uploadAsset(client, imageFile);
        gallery[i].image = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploaded.id,
          },
        };
      }
    }

    // Set updated gallery array back into the document data
    departmentData.gallery = gallery;

    // ── Deduplicate faculty members array
    const cleanFacultyMap = new Map<string, any>();
    const normNameClean = (n: string) => (n || "").toLowerCase().replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s*/gi, "").replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim();
    for (const m of (Array.isArray(departmentData.facultyMembers) ? departmentData.facultyMembers : [])) {
      if (!m || !m.name?.trim()) continue;
      const empId = (m.employeeId || "").trim().toUpperCase();
      const nName = normNameClean(m.name);
      let matchKey: string | null = null;
      if (empId && cleanFacultyMap.has(`EMP:${empId}`)) matchKey = `EMP:${empId}`;
      else if (nName && cleanFacultyMap.has(`NAME:${nName}`)) matchKey = `NAME:${nName}`;
      else {
        for (const [k, v] of cleanFacultyMap.entries()) {
          const vEmp = (v.employeeId || "").trim().toUpperCase();
          const vName = normNameClean(v.name);
          if ((empId && vEmp && empId === vEmp) || (nName && vName && nName === vName)) {
            matchKey = k;
            break;
          }
        }
      }
      if (matchKey) {
        const exist = cleanFacultyMap.get(matchKey);
        cleanFacultyMap.set(matchKey, { ...exist, ...m, imageUrl: m.imageUrl || exist.imageUrl, photoAssetId: m.photoAssetId || exist.photoAssetId });
      } else {
        cleanFacultyMap.set(empId ? `EMP:${empId}` : `NAME:${nName}`, m);
      }
    }
    const facultyMembers = Array.from(cleanFacultyMap.values());
    const deptCanonicalName = selectedDeptId.replace("department-of-", "").replace(/-/g, " ");

    for (let i = 0; i < facultyMembers.length; i++) {
      const member = facultyMembers[i];
      if (!member || !member.name?.trim()) continue;

      const photoKey = `facultyPhoto_${i}`;
      const photoFile = formData.get(photoKey) as File | null;
      let uploadedPhoto: { id: string; url: string } | null = null;

      if (photoFile && photoFile.size > 0) {
        try {
          uploadedPhoto = await uploadAsset(client, photoFile);
          member.imageUrl = uploadedPhoto.url;
          member.photoAssetId = uploadedPhoto.id;
        } catch (err: any) {
          console.warn(`[department-update] Failed to upload photo for ${member.name}:`, err.message);
        }
      }

      // Upsert into central faculty collection in Sanity: facultyProfileNew
      try {
        const autoSlug = generateSlug(member.name);
        const docId = member._id || `facultyProfile-${autoSlug || Date.now()}`;
        const profileDoc: Record<string, any> = {
          _id: docId,
          _type: "facultyProfileNew",
          facultyName: member.name.trim(),
          slug: { _type: "slug", current: member.slug || autoSlug || `faculty-${Date.now()}` },
          staffType: member.staffType || "teaching",
          designation: member.designation?.trim() || "Faculty Member",
          department: member.department?.trim() || deptCanonicalName,
          facultyId: member.employeeId?.trim() || member.facultyId?.trim() || "",
          gender: member.gender || "Female",
          dateOfBirth: member.dateOfBirth || null,
          dateOfJoining: member.dateOfJoining?.trim() || "",
          rejoiningDate: member.rejoiningDate?.trim() || "",
          employmentType: member.employmentType || "Regular",
          officialEmail: member.email?.trim() || member.officialEmail?.trim() || "",
          contactNumber: member.phone?.trim() || member.contactNumber?.trim() || "",
          officeLocation: member.officeLocation?.trim() || "",
          highestQualification: member.qualification?.trim() || member.highestQualification?.trim() || "",
          totalExperience: member.experience?.toString() || member.totalExperience?.toString() || "",
          teachingExperience: member.teachingExperience?.toString() || "",
          industryExperience: member.industryExperience?.toString() || "",
          frsId: member.frsId?.trim() || "",
          aicteId: member.aicteId?.trim() || "",
          shortBio: member.shortBio || "",
          careerObjective: member.careerObjective || "",
          teachingPhilosophy: member.teachingPhilosophy || "",
          areaOfExpertise: Array.isArray(member.areaOfExpertise)
            ? member.areaOfExpertise
            : member.specialization ? [member.specialization] : [],
          languagesKnown: Array.isArray(member.languagesKnown)
            ? member.languagesKnown
            : member.languages ? member.languages.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
          researchAreas: Array.isArray(member.researchAreas)
            ? member.researchAreas
            : member.researchInterests ? [member.researchInterests] : [],
          researchInterests: member.researchInterests || (Array.isArray(member.researchAreas) ? member.researchAreas.join(", ") : ""),
          booksPublished: Array.isArray(member.booksPublished)
            ? member.booksPublished
            : member.booksSummary ? [member.booksSummary] : [],
          linkedinUrl: member.linkedinUrl?.trim() || "",
          googleScholarUrl: member.googleScholarUrl?.trim() || "",
          orcidId: member.orcidId?.trim() || "",
          scopusId: member.scopusId?.trim() || "",
          researchGateUrl: member.researchGateUrl?.trim() || "",
          personalWebsite: member.personalWebsite?.trim() || "",
          showOnWebsite: member.showOnWebsite !== undefined ? Boolean(member.showOnWebsite) : true,
        };

        if (uploadedPhoto) {
          profileDoc.profilePhoto = {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: uploadedPhoto.id,
            },
          };
        } else if (member.photoAssetId) {
          profileDoc.profilePhoto = {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: member.photoAssetId,
            },
          };
        }

        await client.createOrReplace(profileDoc as any);
      } catch (err: any) {
        console.warn(`[department-update] Failed to sync faculty member "${member.name}":`, err.message);
      }
    }

    departmentData.facultyMembers = facultyMembers;

    // Ensure all array items have unique keys before submitting
    addKeysToObj(departmentData);

    // Write to Sanity CMS
    await client.createOrReplace(departmentData as any);

    return NextResponse.json({
      success: true,
      message: `Successfully published department changes to Sanity CMS!`,
    });
  } catch (err: any) {
    console.error("[department-update] API error:", err);
    return NextResponse.json({ success: false, error: err.message || "Server error." }, { status: 500 });
  }
}
