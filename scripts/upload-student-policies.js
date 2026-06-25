const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Load .env variables manually
const envPath = path.join(__dirname, "../.env");
let SANITY_WRITE_TOKEN = "";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      if (key === "SANITY_WRITE_TOKEN") {
        SANITY_WRITE_TOKEN = value;
      }
    }
  });
}

// Fallback write token
const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const baseDir = "/Users/venkatavivek/stanns/public/documents/policies/student-support";

const POLICIES = [
  {
    file: "anti-ragging-policy.pdf",
    title: "Anti-Ragging Committee Policy",
    section: "anti-ragging",
    year: "2025-2026"
  },
  {
    file: "grievance-redressal-policy.pdf",
    title: "Grievance Redressal Mechanism Policy",
    section: "grievance-redressal",
    year: "2025-2026"
  },
  {
    file: "icc-policy.pdf",
    title: "Internal Complaints Committee (ICC) POSH Policy",
    section: "internal-complaints",
    year: "2025-2026"
  },
  {
    file: "women-empowerment-cell-policy-2026.pdf",
    title: "Women Empowerment Cell Policy 2026",
    section: "women-empowerment",
    year: "2025-2026"
  },
  {
    file: "outgoing-batch-academic-toppers-2025.pdf",
    title: "Outgoing Batch Academic Toppers",
    section: "academic-achievements",
    year: "2024-2025"
  },
  {
    file: "competitive-examination-achievements.pdf",
    title: "Competitive Exams Achievement Statistics",
    section: "academic-achievements",
    year: "2024-2025"
  }
];

async function runUpload() {
  console.log("=============================================");
  console.log("🚀 STARTING STUDENT SUPPORT POLICY UPLOADS TO SANITY");
  console.log("=============================================");

  for (const policy of POLICIES) {
    const fullPath = path.join(baseDir, policy.file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ File not found, skipping: ${fullPath}`);
      continue;
    }

    console.log(`\nUploading file: ${policy.file} for ${policy.section}...`);
    try {
      // 1. Upload file asset
      const asset = await client.assets.upload("file", fs.createReadStream(fullPath), {
        filename: policy.file,
        contentType: "application/pdf"
      });
      console.log(`⚡ Uploaded asset successfully! ID: ${asset._id}`);

      // 2. Create studentSupport document
      const doc = {
        _type: "studentSupport",
        title: policy.title,
        academicYear: policy.year,
        section: policy.section,
        pdfFile: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: asset._id
          }
        }
      };

      const createdDoc = await client.create(doc);
      console.log(`⚡ Successfully published document! ID: ${createdDoc._id}`);
    } catch (err) {
      console.error(`❌ Failed to process ${policy.file}:`, err.message);
    }
  }

  console.log("\n=============================================");
  console.log("🎉 STUDENT SUPPORT POLICY UPLOADS COMPLETE!");
  console.log("=============================================");
}

runUpload();
