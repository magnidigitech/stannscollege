const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";

const token = process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: token,
  useCdn: false,
});

async function uploadFile(filePath, filename) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  const stream = fs.createReadStream(filePath);
  try {
    console.log(`Uploading ${filename} to Sanity...`);
    const asset = await client.assets.upload("file", stream, {
      filename: filename,
    });
    console.log(`Uploaded ${filename} -> ${asset.url}`);
    return asset.url;
  } catch (err) {
    console.error(`Error uploading ${filename}:`, err.message);
    return null;
  }
}

async function run() {
  console.log("=== Starting Admissions Upload & Sync to Sanity ===");

  const folder77 = path.join(__dirname, "..", "77");
  const publicAdmissions = path.join(__dirname, "..", "public", "documents", "admissions");

  // Upload PDFs from 77
  const ugReqDocPath = path.join(folder77, "UG Programmes Admission Reuired Documents.pdf");
  const ugAppFormPath = path.join(folder77, "UG Application Form.pdf");
  const pgReqDocPath = path.join(folder77, "PG -Documents Reuired for Admissions.pdf");
  const pgAppFormPath = path.join(folder77, "PG Application Form.pdf");

  const ugReqDocUrl = (await uploadFile(ugReqDocPath, "UG Programmes Admission Reuired Documents.pdf")) || "/documents/admissions/UG Programmes Admission Reuired Documents.pdf";
  const ugAppFormUrl = (await uploadFile(ugAppFormPath, "UG Application Form.pdf")) || "/documents/admissions/UG Application Form.pdf";
  const pgReqDocUrl = (await uploadFile(pgReqDocPath, "PG -Documents Reuired for Admissions.pdf")) || "/documents/admissions/PG -Documents Reuired for Admissions.pdf";
  const pgAppFormUrl = (await uploadFile(pgAppFormPath, "PG Application Form.pdf")) || "/documents/admissions/PG Application Form.pdf";

  // Build Portal Data matching 4.Admissions.docx strictly
  const portalData = {
    ugProgrammes: [
      { sNo: 1, name: "B.Com. Honours-General", sanctionedIntake: 20, convenerQuota: 14, managementQuota: 6, ewsQuota: 2, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 2, name: "B.Com. Honours-Computer Applications", sanctionedIntake: 105, convenerQuota: 74, managementQuota: 31, ewsQuota: 11, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 3, name: "BCA Honours-Computer Applications", sanctionedIntake: 60, convenerQuota: 42, managementQuota: 18, ewsQuota: 6, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 4, name: "B.Sc. Honours -Computer Science", sanctionedIntake: 35, convenerQuota: 25, managementQuota: 10, ewsQuota: 4, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 5, name: "B.Sc. Honours -Artificial Intelligence", sanctionedIntake: 60, convenerQuota: 42, managementQuota: 18, ewsQuota: 6, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 6, name: "B.Sc. Honours -Mathematics", sanctionedIntake: 25, convenerQuota: 18, managementQuota: 7, ewsQuota: 3, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 7, name: "B.Sc. Honours -Physics", sanctionedIntake: 25, convenerQuota: 18, managementQuota: 7, ewsQuota: 3, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 8, name: "B.Sc. Honours -Statistics", sanctionedIntake: 25, convenerQuota: 18, managementQuota: 7, ewsQuota: 3, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 9, name: "B.Sc. Honours-Biotechnology", sanctionedIntake: 25, convenerQuota: 18, managementQuota: 7, ewsQuota: 3, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 10, name: "B.Sc. Honours -Microbiology", sanctionedIntake: 25, convenerQuota: 18, managementQuota: 7, ewsQuota: 3, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 11, name: "B.Sc. Honours-Chemistry", sanctionedIntake: 20, convenerQuota: 14, managementQuota: 6, ewsQuota: 2, aboutDocumentUrl: ugReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" }
    ],
    pgProgrammes: [
      { sNo: 1, name: "MCA – Master of Computer Applications", sanctionedIntake: 60, convenerQuota: 42, managementQuota: 18, ewsQuota: 6, aboutDocumentUrl: pgReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" },
      { sNo: 2, name: "MBA – Master of Business Administration", sanctionedIntake: 60, convenerQuota: 42, managementQuota: 18, ewsQuota: 6, aboutDocumentUrl: pgReqDocUrl, brochureUrl: "/documents/admissions/Prospectus 2025-26.pdf" }
    ],
    ugEligibility: [
      { sNo: 1, programme: "B.Com. Honours – General/Computer Applications", eligibilityCriteria: "Candidates who have passed Intermediate (10+2) or equivalent examination from CEC, MEC, MPC, BiPC or Vocational streams are eligible. A Commerce background is preferred but not mandatory.", streamBadge: "CEC / MEC / MPC / BiPC / Vocational", preferredStream: "Commerce background is preferred but not mandatory" },
      { sNo: 2, programme: "BCA Honours – Computer Applications", eligibilityCriteria: "Candidates who have passed Intermediate (10+2) or equivalent examination from MPC, MEC, CEC, BiPC or relevant Vocational streams are eligible. MPC (Mathematics) students are preferred.", streamBadge: "MPC / MEC / CEC / BiPC / Vocational", preferredStream: "MPC (Mathematics) students are preferred" },
      { sNo: 3, programme: "B.Sc. Honours Computer Science", eligibilityCriteria: "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. MPC students are eligible and preferred.", streamBadge: "10+2 with Mathematics", preferredStream: "MPC students are eligible and preferred" },
      { sNo: 4, programme: "B.Sc. Honours Artificial Intelligence", eligibilityCriteria: "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. MPC students are eligible and preferred.", streamBadge: "10+2 with Mathematics", preferredStream: "MPC students are eligible and preferred" },
      { sNo: 5, programme: "B.Sc. Honours Mathematics", eligibilityCriteria: "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. Primarily suitable for MPC students.", streamBadge: "10+2 with Mathematics", preferredStream: "Primarily suitable for MPC students" },
      { sNo: 6, programme: "B.Sc. Honours – Physics", eligibilityCriteria: "Candidates who have passed Intermediate (10+2) or equivalent examination from MPC or BiPC streams are eligible.", streamBadge: "MPC / BiPC", preferredStream: "MPC or BiPC streams" },
      { sNo: 7, programme: "B.Sc. Honours – Statistics", eligibilityCriteria: "Candidates must have passed Intermediate (10+2) or equivalent examination with Mathematics as a subject. Primarily suitable for MPC students.", streamBadge: "10+2 with Mathematics", preferredStream: "Primarily suitable for MPC students" },
      { sNo: 8, programme: "B.Sc. Honours Microbiology", eligibilityCriteria: "Candidates who have passed Intermediate (10+2) or equivalent examination with BiPC (Biology, Physics and Chemistry) are eligible for admission.", streamBadge: "BiPC (Biology, Physics, Chemistry)", preferredStream: "BiPC stream candidates" },
      { sNo: 9, programme: "B.Sc. Honours Biotechnology", eligibilityCriteria: "Candidates who have passed Intermediate (10+2) or equivalent examination with BiPC (Biology, Physics and Chemistry) are eligible for admission.", streamBadge: "BiPC (Biology, Physics, Chemistry)", preferredStream: "BiPC stream candidates" },
      { sNo: 10, programme: "B.Sc. Honours Chemistry", eligibilityCriteria: "Candidates who have passed Intermediate (10+2) or equivalent examination with MPC (Mathematics, Physics and Chemistry) or BiPC (Biology, Physics and Chemistry) are eligible for admission.", streamBadge: "MPC / BiPC", preferredStream: "MPC or BiPC streams" }
    ],
    pgEligibility: [
      { sNo: 1, programme: "MCA – Master of Computer Applications", eligibilityCriteria: "Candidates must have passed a Bachelor’s Degree of minimum three years duration from a recognized university with Mathematics as a subject at Intermediate (10+2) or Degree level, subject to the eligibility conditions prescribed by the affiliating university and competent authorities.", streamBadge: "3-Year Degree + Maths at 10+2 / Degree Level", preferredStream: "AP ICET Qualified / Recognized Bachelor Degree" },
      { sNo: 2, programme: "MBA – Master of Business Administration", eligibilityCriteria: "Candidates must have passed a Bachelor’s Degree of minimum three years duration from a recognized university, subject to the eligibility conditions prescribed by the affiliating university and competent authorities.", streamBadge: "3-Year Recognized Bachelor Degree", preferredStream: "AP ICET Qualified / Recognized Bachelor Degree" }
    ],
    documents: {
      ugRequiredDocsPdf: ugReqDocUrl,
      ugApplicationFormPdf: ugAppFormUrl,
      pgRequiredDocsPdf: pgReqDocUrl,
      pgApplicationFormPdf: pgAppFormUrl,
      capPortalUrl: "https://cap.apcfss.in/",
      prospectusPdf: "/documents/admissions/Prospectus 2025-26.pdf",
      pamphlet1: "/documents/admissions/Pamphlets.jpg",
      pamphlet2: "/documents/admissions/Pamphlets-WA0006.jpg"
    },
    deskInfo: {
      phoneNumbers: [
        { label: "Landline Office", number: "0863-2236470", tel: "+918632236470" },
        { label: "Mobile Helpline 1", number: "7382104655", tel: "+917382104655" },
        { label: "Mobile Helpline 2", number: "8500656134", tel: "+918500656134" }
      ],
      emails: [
        { label: "Principal / Office", email: "st_anns_coll@yahoo.co.in" },
        { label: "Admissions Desk", email: "stannscollegegnt@gmail.com" }
      ],
      officeHours: "9:00 AM – 4:30 PM (Monday – Saturday)",
      collegeAddress: "St. Ann’s College for Women, Gorantla, Guntur - 522034, Andhra Pradesh, India"
    },
    yearlyRecords: [
      {
        year: "2026-2027",
        affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf",
        affiliationDocTitle: "ANU Affiliation & Approval Orders (2026-2027)",
        sanctionedIntakeDocUrl: ugReqDocUrl,
        sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2026-2027)",
        admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
        admittedStudentsDocTitle: "List of Admitted Students (2026-2027)",
        categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
        categoryAdmissionsDocTitle: "Category-wise Admissions (2026-2027)"
      },
      {
        year: "2025–2026",
        affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf",
        affiliationDocTitle: "ANU Affiliation & Approval Orders (2025–2026)",
        sanctionedIntakeDocUrl: ugReqDocUrl,
        sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2025–2026)",
        admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
        admittedStudentsDocTitle: "List of Admitted Students (2025–2026)",
        categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
        categoryAdmissionsDocTitle: "Category-wise Admissions (2025–2026)"
      },
      {
        year: "2024–2025",
        affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2024-2025.pdf",
        affiliationDocTitle: "ANU Affiliation & Approval Orders (2024–2025)",
        sanctionedIntakeDocUrl: ugReqDocUrl,
        sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2024–2025)",
        admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
        admittedStudentsDocTitle: "List of Admitted Students (2024–2025)",
        categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
        categoryAdmissionsDocTitle: "Category-wise Admissions (2024–2025)"
      },
      {
        year: "2023–2024",
        affiliationDocUrl: "/documents/affiliations/ANU_UG_Affiliation_2023-2024.pdf",
        affiliationDocTitle: "ANU Affiliation & Approval Orders (2023–2024)",
        sanctionedIntakeDocUrl: ugReqDocUrl,
        sanctionedIntakeDocTitle: "Sanctioned Intake Orders (2023–2024)",
        admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
        admittedStudentsDocTitle: "List of Admitted Students (2023–2024)",
        categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
        categoryAdmissionsDocTitle: "Category-wise Admissions (2023–2024)"
      }
    ]
  };

  const doc = {
    _id: "admissions-portal-singleton",
    _type: "admissionsPortal",
    title: "Admissions Portal Master Data",
    lastUpdated: new Date().toISOString(),
    portalData: portalData
  };

  console.log("Saving admissions-portal-singleton to Sanity...");
  const result = await client.createOrReplace(doc);
  console.log("Successfully saved admissions data to Sanity! Document ID:", result._id);
}

run().catch((err) => {
  console.error("Fatal error running admissions upload script:", err);
  process.exit(1);
});
