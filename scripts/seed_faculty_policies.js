const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
if (!process.env.SANITY_WRITE_TOKEN) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

const client = createClient({
  projectId: 'fhjwqub5',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false
});

const DEFAULT_FACULTY_POLICY_DOCS = [
  {
    _id: "faculty-policy-hr-policy",
    _type: "facultyPolicyDocument",
    documentId: "doc-hr-policy",
    title: "Human Resource Policy Document",
    subtitle: "Service Rules, Recruitment Code, Ethics & Faculty Governance",
    category: "recruitment",
    year: "2024–2025",
    fileUrl: "/documents/faculty/Human_Resource_Policy.pdf",
    certificatesUrl: "",
    displayOrder: 1,
  },
  {
    _id: "faculty-policy-fdp-2025-2026",
    _type: "facultyPolicyDocument",
    documentId: "doc-fdp-2025-2026",
    title: "Faculty Development Programme (FDP) Annual Report 2025–2026",
    subtitle: "Institutional FDPs, Pedagogical Workshops & Training Modules",
    category: "fdp",
    year: "2025–2026",
    fileUrl: "/documents/faculty/Faculty_Development_Progra._2025-2026.pdf",
    certificatesUrl: "",
    displayOrder: 2,
  },
  {
    _id: "faculty-policy-fdp-2024-2025",
    _type: "facultyPolicyDocument",
    documentId: "doc-fdp-2024-2025",
    title: "Faculty Development Programme (FDP) Annual Report 2024–2025",
    subtitle: "Comprehensive FDP Activities, Training Logs & Attendance",
    category: "fdp",
    year: "2024–2025",
    fileUrl: "/documents/faculty/Faculty_Dev.Programme_s_2024-25.pdf",
    certificatesUrl: "/documents/faculty/2024-2025_FDPS_&_Seminars_Certifcates.pdf",
    displayOrder: 3,
  },
  {
    _id: "faculty-policy-achievements",
    _type: "facultyPolicyDocument",
    documentId: "doc-achievements",
    title: "Faculty Research, Awards & Publication Register",
    subtitle: "Compendium of faculty honors and journal publications",
    category: "achievements",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 4,
  },
  {
    _id: "faculty-policy-exchange",
    _type: "facultyPolicyDocument",
    documentId: "doc-exchange",
    title: "Academic Mobility & Collaborative Exchange Reports",
    subtitle: "Inter-institutional guest faculty exchange initiatives",
    category: "exchange",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 5,
  },
  {
    _id: "faculty-policy-asar-appraisal",
    _type: "facultyPolicyDocument",
    documentId: "doc-asar-appraisal",
    title: "Faculty Performance Appraisal (ASAR) Guidelines & Form",
    subtitle: "Annual self-appraisal report and API score calculation",
    category: "appraisal",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 6,
  },
  {
    _id: "faculty-policy-welfare",
    _type: "facultyPolicyDocument",
    documentId: "doc-welfare",
    title: "Institutional Faculty Welfare Schemes & Benefit Circulars",
    subtitle: "Maternity, medical, provident fund, and financial support policies",
    category: "welfare",
    year: "2025–2026",
    fileUrl: "/documents/DefaultFile_1.pdf",
    certificatesUrl: "",
    displayOrder: 7,
  },
];

async function seed() {
  console.log("Checking existing policy docs...");
  const existing = await client.fetch('*[_type == "facultyPolicyDocument"]');
  console.log("Existing documents count:", existing.length);
  for (const doc of DEFAULT_FACULTY_POLICY_DOCS) {
    const res = await client.createOrReplace(doc);
    console.log("Seeded/Updated:", res.title, "->", res._id);
  }
  console.log("All faculty policy documents seeded successfully into Sanity!");
}

seed().catch(console.error);
