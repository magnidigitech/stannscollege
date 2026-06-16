const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
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

// Fallback token if not found
const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const PDF_DIR = path.join(__dirname, "../Stategic Plans PDF");

const docxAndPdfs = {
  yearsPlan: {
    pdf: "Institutional Strategic Framework  2024-2030.pdf",
    title: "Institutional Strategic Framework 2024-2030 (Years Plan)",
    formUrl: "https://www.google.com/search?q=%23"
  },
  deploy2526: {
    pdf: "Annual Plan Deployment Report  2025-2026.pdf",
    title: "Annual Deployment Plan 2025-2026",
    formUrl: "https://www.google.com/search?q=%23"
  },
  deploy2425: {
    pdf: "Annual Plan Deployment Report  2024-2025.pdf",
    title: "Annual Deployment Plan 2024-2025",
    formUrl: "https://www.google.com/search?q=%23"
  }
};

async function uploadPdf(filename) {
  const filePath = path.join(PDF_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ PDF File not found: ${filePath}`);
    throw new Error(`File not found: ${filename}`);
  }

  console.log(`Uploading ${filename} to Sanity...`);
  try {
    const asset = await client.assets.upload("file", fs.createReadStream(filePath), {
      filename: filename,
      contentType: "application/pdf"
    });
    console.log(`✅ Uploaded successfully! Asset ID: ${asset._id}`);
    return asset;
  } catch (err) {
    console.error(`❌ Failed to upload PDF ${filename}:`, err.message);
    throw err;
  }
}

async function main() {
  console.log("======================================================");
  console.log("🚀 STARTING SANITY STRATEGIC DOCUMENTS SEED/MIGRATION");
  console.log("======================================================\n");

  let yearsPlanAsset, deploy2526Asset, deploy2425Asset;
  try {
    yearsPlanAsset = await uploadPdf(docxAndPdfs.yearsPlan.pdf);
    deploy2526Asset = await uploadPdf(docxAndPdfs.deploy2526.pdf);
    deploy2425Asset = await uploadPdf(docxAndPdfs.deploy2425.pdf);
  } catch (err) {
    console.error("❌ Seeding halted due to file upload error.");
    process.exit(1);
  }

  const strategicPlanDoc = {
    _id: "strategic-plan-2024-2030",
    _type: "strategicPlan",
    title: "Strategic Plans & Future Directions",
    executiveSummary: "St. Ann’s College for Women, Guntur, envisions a transformative future rooted in academic excellence, innovation, women empowerment, social responsibility, and nation-building. Guided by the values of the Congregation of the Sisters of St. Ann and aligned with the aspirations of Viksit Bharat @2047 and Swarna Andhra @2047, the institution is committed to nurturing globally competent, ethically grounded, and socially responsible women leaders.",
    googleFormUrl: "https://www.google.com/search?q=%23",
    studentFeedbackFormUrl: "https://www.google.com/search?q=%23",
    facultyFeedbackFormUrl: "https://www.google.com/search?q=%23",
    parentFeedbackFormUrl: "https://www.google.com/search?q=%23",
    alumniFeedbackFormUrl: "https://www.google.com/search?q=%23",
    documents: [
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: docxAndPdfs.yearsPlan.title,
        file: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: yearsPlanAsset._id
          }
        },
        googleFormUrl: docxAndPdfs.yearsPlan.formUrl
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: docxAndPdfs.deploy2526.title,
        file: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: deploy2526Asset._id
          }
        },
        googleFormUrl: docxAndPdfs.deploy2526.formUrl
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: docxAndPdfs.deploy2425.title,
        file: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: deploy2425Asset._id
          }
        },
        googleFormUrl: docxAndPdfs.deploy2425.formUrl
      }
    ]
  };

  console.log("Publishing/Updating Strategic Plan document in Sanity...");
  try {
    const result = await client.createOrReplace(strategicPlanDoc);
    console.log(`\x1b[32m%s\x1b[0m`, `⚡ Successfully published Strategic Development Plan with PDFs! ID: ${result._id}`);
  } catch (err) {
    console.error("❌ Failed to publish Strategic Plan document:", err.message);
    process.exit(1);
  }

  console.log("\n=============================================");
  console.log("🎉 STRATEGIC PLAN AND DOCUMENTS SEEDED SUCCESSFULLY!");
  console.log("=============================================");
}

main().catch((err) => {
  console.error("❌ Critical migration failure:", err);
  process.exit(1);
});
