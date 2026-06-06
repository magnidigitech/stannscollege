const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@sanity/client");

// Configuration
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

const PDF_FILE_PATH = "/Users/venkatavivek/stanns/INSTITUTIONAL STRATEGIC FRAMEWORK 2024-2030.docx.pdf";

async function main() {
  console.log("====================================================");
  console.log("🚀 STARTING SANITY STRATEGIC PLAN UPLOAD & MIGRATION");
  console.log("====================================================\n");

  if (!fs.existsSync(PDF_FILE_PATH)) {
    console.error(`❌ PDF File not found at path: ${PDF_FILE_PATH}`);
    process.exit(1);
  }

  console.log("Uploading PDF document file to Sanity...");
  let fileAsset;
  try {
    fileAsset = await client.assets.upload("file", fs.createReadStream(PDF_FILE_PATH), {
      filename: "INSTITUTIONAL STRATEGIC FRAMEWORK 2024-2030.docx.pdf",
    });
    console.log(`✅ File uploaded successfully! Asset ID: ${fileAsset._id}`);
  } catch (err) {
    console.error("❌ Failed to upload PDF file asset:", err.message);
    process.exit(1);
  }

  const strategicPlanDoc = {
    _id: "strategic-plan-2024-2030",
    _type: "strategicPlan",
    title: "Institutional Strategic Framework 2024-2030",
    executiveSummary: "St. Ann's College for Women has developed a comprehensive Institutional Strategic Framework for 2024-2030, charting a detailed roadmap to achieve Autonomous Status by 2029-2030. The plan aligns with national initiatives such as NEP 2020 and Viksit Bharat, utilizing a structured approach to enhance academic quality, research, infrastructure, and women's empowerment.",
    pillars: [
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Academic Excellence & Autonomy Readiness",
        description: "The institution will implement Outcome-Based Education (OBE) across all programs. It also plans to integrate NEP 2020 principles and introduce new interdisciplinary, skill-oriented courses."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Research, Innovation & Faculty Development",
        description: "The college intends to establish a Research & Innovation Cell and increase the number of Ph.D.-qualified faculty by at least 20% by 2028. The target is to produce a minimum of 40 research publications annually in indexed journals."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Student Enrollment, Retention & Success",
        description: "To support holistic student growth, the college will introduce an 'Earn While You Learn' scheme and strengthen its Mentor-Mentee system. The framework sets a goal of achieving a placement rate of 70% or higher and reducing the dropout rate to below 5%."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Infrastructure & Digital Transformation",
        description: "Key initiatives include establishing a Centralized Library and ensuring 100% ICT-enabled smart classrooms by 2027. The plan also details the modernization of laboratories and upgrades to hostel facilities to maintain optimal occupancy."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Industry Linkages & Employability",
        description: "The college plans to integrate mandatory internships and apprenticeships into its academic programs. It will also expand Memorandums of Understanding (MoUs) with industry partners and promote a startup culture through the Entrepreneurship Development & Innovation Support Cell (EDISC)."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Green Campus & Social Responsibility",
        description: "The framework outlines the development of an eco-friendly 'Botanica Campus' and the implementation of annual green audits. The institution aims to secure Green Campus Certification by 2026-2027 and ensure 100% student participation in extension or social activities."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Governance & Quality Assurance",
        description: "The plan mandates a transparent, participatory governance system supported by a 360-degree performance appraisal for faculty and staff. It also empowers the IQAC to conduct regular academic and administrative audits to ensure alignment with NAAC standards."
      }
    ],
    phases: [
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Phase 1: Foundation & Infrastructure (2024-2025)",
        description: "Focuses on basic infrastructure upgrades, such as modernizing laboratories, relocating PG programs to the Gnanam Block, and launching structured admission outreach campaigns."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Phase 2: Quality Enhancement (2025-2026)",
        description: "Concentrates on achieving 100% institution-wide OBE implementation, creating the Centralized Library, and initiating a functional research ecosystem."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Phase 3: Expansion (2026-2027)",
        description: "Emphasizes introducing new academic programs, expanding industry MoUs, upgrading to 100% ICT-enabled classrooms, and boosting student admissions by 15-20%."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Phase 4: Consolidation (2027-2028)",
        description: "Dedicated to achieving targeted research outputs, strengthening governance through the 360-degree appraisal system, and fulfilling NAAC quality benchmarks."
      },
      {
        _key: crypto.randomBytes(6).toString("hex"),
        title: "Phase 5: Autonomy Achievement (2028-2030)",
        description: "The final stage targets the application and attainment of Autonomous Status, achieving Green Campus Certification, and fostering global collaborations."
      }
    ],
    targets: [
      "Increase overall student admissions by 20%.",
      "Maintain a pass percentage of 90% or higher across programs.",
      "Publish 40 to 50 research papers annually.",
      "Maintain at least 20 active MoUs with industry and corporate partners.",
      "Achieve 100% internship coverage for students."
    ],
    documentFile: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: fileAsset._id,
      }
    }
  };

  console.log("Publishing Strategic Plan document to Sanity...");
  try {
    const result = await client.createOrReplace(strategicPlanDoc);
    console.log(`\x1b[32m%s\x1b[0m`, `⚡ Successfully published Strategic Development Plan! ID: ${result._id}`);
  } catch (err) {
    console.error("❌ Failed to publish Strategic Plan document:", err.message);
    process.exit(1);
  }

  console.log("\n=============================================");
  console.log("🎉 STRATEGIC PLAN UPLOADED AND SEEDED SUCCESSFULLY!");
  console.log("=============================================");
}

main().catch((err) => {
  console.error("❌ Critical migration failure:", err);
  process.exit(1);
});
