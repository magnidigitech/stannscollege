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

const handbooks = [
  {
    year: "2025-2026",
    filePath: "/Users/venkatavivek/stanns/Students' Hand Book 2025-2026.pdf",
    order: 1,
    id: "handbook-2025-2026"
  },
  {
    year: "2024-2025",
    filePath: "/Users/venkatavivek/stanns/Students' Hand Book 2024-2025.pdf",
    order: 2,
    id: "handbook-2024-2025"
  },
  {
    year: "2023-2024",
    filePath: "/Users/venkatavivek/stanns/public/documents/admissions/handbooks/handbook 2023-24.pdf",
    order: 3,
    id: "handbook-2023-2024"
  },
  {
    year: "2022-2023",
    filePath: "/Users/venkatavivek/stanns/public/documents/admissions/handbooks/handbook 2022-23.pdf",
    order: 4,
    id: "handbook-2022-2023"
  },
  {
    year: "2021-2022",
    filePath: "/Users/venkatavivek/stanns/public/documents/admissions/handbooks/handbook 2021-22.pdf",
    order: 5,
    id: "handbook-2021-2022"
  },
  {
    year: "2020-2021",
    filePath: "/Users/venkatavivek/stanns/public/documents/admissions/handbooks/handbook 2020-21.pdf",
    order: 6,
    id: "handbook-2020-2021"
  },
  {
    year: "2019-2020",
    filePath: "/Users/venkatavivek/stanns/public/documents/admissions/handbooks/handbook 2019-20.pdf",
    order: 7,
    id: "handbook-2019-2020"
  },
  {
    year: "2018-2019",
    filePath: "/Users/venkatavivek/stanns/public/documents/admissions/handbooks/handbook 2018-19.pdf",
    order: 8,
    id: "handbook-2018-2019"
  }
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
  console.log("🚀 STARTING STUDENT HANDBOOKS ASSET MIGRATION");
  console.log("=========================================");

  for (const hb of handbooks) {
    console.log(`\n📂 Processing: Handbook for ${hb.year} (Order: ${hb.order})`);

    const assetId = await uploadFileAsset(hb.filePath);

    const docPayload = {
      _id: hb.id,
      _type: "studentHandbook",
      year: hb.year,
      order: hb.order,
    };

    if (assetId) {
      docPayload.file = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      };
    }

    try {
      const res = await client.createOrReplace(docPayload);
      console.log(`⚡ Published studentHandbook document! ID: ${res._id}`);
    } catch (err) {
      console.error(`❌ Failed to write document for Handbook ${hb.year}:`, err.message);
    }
  }

  console.log("\n=========================================");
  console.log("🎉 STUDENT HANDBOOKS MIGRATION COMPLETED!");
  console.log("=========================================");
}

run();
