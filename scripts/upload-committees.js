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

const COMMITTEES_DIR = "/Users/venkatavivek/stanns/Committees Documents";
const DEFAULT_REPORT_25_26 = "/Users/venkatavivek/stanns/public/documents/committees/college-committees-2025-2026.pdf";
const DEFAULT_REPORT_24_25 = "/Users/venkatavivek/stanns/public/documents/committees/college-committees-2024-2025.pdf";

const defaultCommittees = [
  { sNo: 1, name: "Admissions Committee", hasReport: true },
  { sNo: 2, name: "Alumni Committee", hasReport: true },
  { sNo: 3, name: "Anti-Drug Committee", hasReport: true },
  { sNo: 4, name: "Anti-Ragging Committee", hasReport: true },
  { sNo: 5, name: "Attendance Committee", hasReport: true },
  { sNo: 6, name: "Awards & Medals Committee", hasReport: true },
  { sNo: 7, name: "College Development Committee", hasReport: true },
  { sNo: 8, name: "College Publications & Promotions Committee", hasReport: true },
  { sNo: 9, name: "Cultural & Co-Curricular Activities Committee", hasReport: true },
  { sNo: 10, name: "Discipline Committee", hasReport: true },
  { sNo: 11, name: "Eco Club", hasReport: true },
  { sNo: 12, name: "Entrepreneurship Development / Innovation & Start-Up Centre", hasReport: true },
  { sNo: 13, name: "EOC (Equal Opportunity Cell) & SC/ST/OBC/Minority Cell", hasReport: false },
  { sNo: 14, name: "Examinations Committee", hasReport: true },
  { sNo: 15, name: "Finance & Scholarships Committee", hasReport: true },
  { sNo: 16, name: "Grievance Redressal Committee", hasReport: true },
  { sNo: 17, name: "Institutional Innovation Council / Institution-Industry Cell", hasReport: false },
  { sNo: 18, name: "Intellectual Property Rights (IPR)", hasReport: true },
  { sNo: 19, name: "Internal Compliance Committee (ICC) / Anti Sexual Harassment Committee", hasReport: false },
  { sNo: 20, name: "Internships & Competitive Examinations Coaching Committee", hasReport: false },
  { sNo: 21, name: "IQAC (Institutional Quality Assurance Cell)", hasReport: true },
  { sNo: 22, name: "Library Committee", hasReport: true },
  { sNo: 23, name: "Literary Committee", hasReport: true },
  { sNo: 24, name: "Mentor & Mentee Committee", hasReport: true },
  { sNo: 25, name: "Mother Gnanamma Outreach Committee", hasReport: true },
  { sNo: 26, name: "NCC Unit", hasReport: true },
  { sNo: 27, name: "NSS Unit", hasReport: true },
  { sNo: 28, name: "Parents Association Committee", hasReport: true },
  { sNo: 29, name: "Press & Media Committee", hasReport: true },
  { sNo: 30, name: "Quantum Innovation Centre (QIC)", hasReport: true },
  { sNo: 31, name: "Red Ribbon Club", hasReport: true },
  { sNo: 32, name: "Research & Development Cell", hasReport: true },
  { sNo: 33, name: "RTI (Right to Information)", hasReport: true },
  { sNo: 34, name: "Seminars Committee", hasReport: true },
  { sNo: 35, name: "Sports & Games Committee", hasReport: true },
  { sNo: 36, name: "Students Counselling Committee", hasReport: true },
  { sNo: 37, name: "Timetables Committee", hasReport: true },
  { sNo: 38, name: "Tours & Travels Committee", hasReport: true },
  { sNo: 39, name: "Training & Placement Cell", hasReport: true },
  { sNo: 40, name: "Universal Human Values (UHV) Cell", hasReport: true },
  { sNo: 41, name: "Women Empowerment Cell", hasReport: true },
  { sNo: 42, name: "Qunatumn Innovation Centre (QIC)", hasReport: true }
];

async function uploadFileAsset(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Local file does not exist: ${filePath}`);
    return null;
  }

  console.log(`📤 Uploading file: ${path.basename(filePath)}...`);
  try {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("file", stream, {
      filename: path.basename(filePath),
    });
    console.log(`✅ Uploaded asset: ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.error(`❌ Failed to upload asset for ${filePath}:`, err.message);
    return null;
  }
}

async function run() {
  console.log("=========================================");
  console.log("🚀 STARTING COMMITTEES CONSTITUTION ORDER & ACTIVITIES MIGRATION");
  console.log("=========================================");

  if (!fs.existsSync(COMMITTEES_DIR)) {
    console.error(`❌ Directory not found: ${COMMITTEES_DIR}`);
    process.exit(1);
  }

  // Upload default activity reports to link
  console.log("Uploading default activities report files first...");
  const reportAsset25_26 = await uploadFileAsset(DEFAULT_REPORT_25_26);
  const reportAsset24_25 = await uploadFileAsset(DEFAULT_REPORT_24_25);

  if (!reportAsset25_26) {
    console.error("❌ Critical: Failed to upload default 2025-2026 activities report. Aborting.");
    process.exit(1);
  }

  // Read all files in the directory
  const files = fs.readdirSync(COMMITTEES_DIR);
  // Filter for pdf files
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith(".pdf"));

  console.log(`Found ${pdfFiles.length} constitution order PDF files.`);

  for (const filename of pdfFiles) {
    // Match the starting number to find sNo
    const match = filename.match(/^(\d+)/);
    if (!match) {
      console.warn(`⚠️ Warning: Could not extract sNo from file name: ${filename}`);
      continue;
    }

    const sNo = parseInt(match[1], 10);
    const committeeInfo = defaultCommittees.find(c => c.sNo === sNo);

    if (!committeeInfo) {
      console.warn(`⚠️ Warning: No committee metadata found for sNo ${sNo} (File: ${filename})`);
      continue;
    }

    console.log(`\n📂 Processing sNo ${sNo}: ${committeeInfo.name} (${filename})`);
    
    const filePath = path.join(COMMITTEES_DIR, filename);
    const assetId = await uploadFileAsset(filePath);

    if (!assetId) {
      console.error(`❌ Skipping document creation for ${committeeInfo.name} because upload failed.`);
      continue;
    }

    // Set activitiesReports array
    let activitiesList = [];
    if (committeeInfo.hasReport) {
      if (sNo === 1) {
        // Admissions Committee: add two reports to test multi-report popup
        activitiesList = [
          {
            _type: "file",
            _key: "admissions-report-2025-2026",
            title: "Activities & Reports 2025–2026",
            asset: {
              _type: "reference",
              _ref: reportAsset25_26
            }
          },
          {
            _type: "file",
            _key: "admissions-report-2024-2025",
            title: "Activities & Reports 2024–2025",
            asset: {
              _type: "reference",
              _ref: reportAsset24_25
            }
          }
        ];
        console.log(`  🔗 Linking multiple reports for Admissions Committee to test choice view`);
      } else {
        // All other committees: add single default report
        activitiesList = [
          {
            _type: "file",
            _key: `report-25-26-${sNo}`,
            title: "Activities & Reports 2025–2026",
            asset: {
              _type: "reference",
              _ref: reportAsset25_26
            }
          }
        ];
      }
    }

    const docPayload = {
      _id: `committee-${sNo}`,
      _type: "committee",
      sNo: sNo,
      name: committeeInfo.name,
      constitutionOrder: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    };

    if (activitiesList.length > 0) {
      docPayload.activitiesReports = activitiesList;
    }

    try {
      const res = await client.createOrReplace(docPayload);
      console.log(`⚡ Published committee document! ID: ${res._id}`);
    } catch (err) {
      console.error(`❌ Failed to write document for ${committeeInfo.name}:`, err.message);
    }
  }

  console.log("\n=========================================");
  console.log("🎉 COMMITTEES CONSTITUTION ORDER & ACTIVITIES UPLOAD COMPLETED!");
  console.log("=========================================");
}

run();
