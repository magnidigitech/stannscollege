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

const BASE_DIR = "/Users/venkatavivek/stanns/I. Academic Programmes/Programme Document & Brochures";

const programmesList = [
  // UG Programmes
  {
    sNo: 1,
    type: "ug",
    name: "B.Com Honours - General",
    convener: 14,
    management: 6,
    total: 20,
    docFile: "1.B.Com Honours-General.pdf",
    brochureFile: "1.B.Com Honours General  Brochure.png"
  },
  {
    sNo: 2,
    type: "ug",
    name: "B.Com Honours - Computer Applications",
    convener: 56,
    management: 24,
    total: 80,
    docFile: "2.B.Com Honours-Computer Applications.pdf",
    brochureFile: "2.B.Com Honours Computer Applications Brochure.png"
  },
  {
    sNo: 3,
    type: "ug",
    name: "BCA Honours - Computer Applications",
    convener: 42,
    management: 18,
    total: 60,
    docFile: "3.BCA Honours-Computer Applications (1).pdf",
    brochureFile: "3BCA Revsied Brochure.png"
  },
  {
    sNo: 4,
    type: "ug",
    name: "B.Sc Honours - Computer Science",
    convener: 25,
    management: 10,
    total: 35,
    docFile: "4.B.Sc Honours Computer Science (1).pdf",
    brochureFile: "4.B.Sc Computer Scie.Brochuer.png"
  },
  {
    sNo: 5,
    type: "ug",
    name: "B.Sc Honours - Artificial Intelligence",
    convener: 42,
    management: 18,
    total: 60,
    docFile: "5.B.Sc Honours Artifical Intelligence (1).pdf",
    brochureFile: "5.AI Broucher.png"
  },
  {
    sNo: 6,
    type: "ug",
    name: "B.Sc Honours - Mathematics",
    convener: 18,
    management: 7,
    total: 25,
    docFile: "6.B.Sc Honours -Mathematics.pdf",
    brochureFile: "6.Mathematcis Brochure.png"
  },
  {
    sNo: 7,
    type: "ug",
    name: "B.Sc Honours - Physics",
    convener: 18,
    management: 7,
    total: 25,
    docFile: "7.B.Sc Honour physics.pdf",
    brochureFile: "7.Physics Brochure.png"
  },
  {
    sNo: 8,
    type: "ug",
    name: "B.Sc Honours - Statistics",
    convener: 18,
    management: 7,
    total: 25,
    docFile: "8.B.Sc Honours Statistics.pdf",
    brochureFile: "8.Statistics Brocuher.png"
  },
  {
    sNo: 9,
    type: "ug",
    name: "B.Sc Honours - Microbiology",
    convener: 18,
    management: 7,
    total: 25,
    docFile: "10.B.Sc Honurs Microbiology.pdf",
    brochureFile: "10.Microbiology Broucher.png"
  },
  {
    sNo: 10,
    type: "ug",
    name: "B.Sc Honours - Biotechnology",
    convener: 18,
    management: 7,
    total: 25,
    docFile: "9.B.Sc Honour Biotechnology.pdf",
    brochureFile: "9.Biotechnology Broucher.png"
  },
  {
    sNo: 11,
    type: "ug",
    name: "B.Sc Honours - Chemistry",
    convener: 14,
    management: 6,
    total: 20,
    docFile: "12.B.Sc Honours Chemsitry.pdf",
    brochureFile: "12.Chemistry Broucher.png"
  },
  {
    sNo: 12,
    type: "ug",
    name: "B.Sc Honours - Botany",
    convener: 18,
    management: 7,
    total: 25,
    docFile: "11.B,Sc Honours Botany.pdf",
    brochureFile: "11.Botany Broucher.png"
  },

  // PG Programmes
  {
    sNo: 13, // To keep ordering distinct in database
    type: "pg",
    name: "Master of Computer Applications (MCA)",
    convener: 42,
    management: 18,
    total: 60,
    docFile: "PG Porgrammes/1.MCA (Master of Computer Applications).pdf",
    brochureFile: "PG Porgrammes/1 MCA Broucher.png"
  },
  {
    sNo: 14,
    type: "pg",
    name: "Master of Business Administration (MBA)",
    convener: 42,
    management: 18,
    total: 60,
    docFile: "PG Porgrammes/2.Master of Business Administration.pdf",
    brochureFile: "PG Porgrammes/2.MBABroucher.png"
  }
];

async function uploadFileAsset(relativeFilePath) {
  const fullPath = path.join(BASE_DIR, relativeFilePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Warning: Local file does not exist: ${fullPath}`);
    return null;
  }

  console.log(`📤 Uploading file: ${relativeFilePath}...`);
  try {
    const stream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload("file", stream, {
      filename: path.basename(relativeFilePath),
    });
    console.log(`✅ Uploaded asset: ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.error(`❌ Failed to upload asset for ${relativeFilePath}:`, err.message);
    return null;
  }
}

async function run() {
  console.log("=========================================");
  console.log("🚀 STARTING PROGRAMMES ASSET MIGRATION");
  console.log("=========================================");

  for (const prog of programmesList) {
    console.log(`\n📂 Processing: ${prog.name} (S.No: ${prog.sNo})`);

    const docAssetId = await uploadFileAsset(prog.docFile);
    const brochureAssetId = await uploadFileAsset(prog.brochureFile);

    const docPayload = {
      _id: `academicProgramme-${prog.sNo}`,
      _type: "academicProgramme",
      sNo: prog.sNo,
      programmeType: prog.type,
      name: prog.name,
      convenerQuota: prog.convener,
      managementQuota: prog.management,
      totalIntake: prog.total,
    };

    if (docAssetId) {
      docPayload.aboutDocument = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: docAssetId,
        },
      };
    }

    if (brochureAssetId) {
      docPayload.brochure = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: brochureAssetId,
        },
      };
    }

    try {
      const res = await client.createOrReplace(docPayload);
      console.log(`⚡ Published academicProgramme document! ID: ${res._id}`);
    } catch (err) {
      console.error(`❌ Failed to write document for ${prog.name}:`, err.message);
    }
  }

  console.log("\n=========================================");
  console.log("🎉 PROGRAMMES MIGRATION COMPLETED!");
  console.log("=========================================");
}

run();
