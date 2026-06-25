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

const pdfPath = "/Users/venkatavivek/stanns/DefaultFile_1.pdf";
const imagePath = "/Users/venkatavivek/stanns/cbnew2.webp";

async function runSeed() {
  console.log("=============================================");
  console.log("🚀 STARTING SEEDING FOR LITERACY & CULTURAL ACHIEVEMENTS");
  console.log("=============================================");

  if (!fs.existsSync(pdfPath)) {
    console.error(`❌ PDF file not found at: ${pdfPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image file not found at: ${imagePath}`);
    process.exit(1);
  }

  // 1. Upload PDF file
  console.log("Uploading dummy PDF...");
  const pdfAsset = await client.assets.upload("file", fs.createReadStream(pdfPath), {
    filename: "DefaultFile_1.pdf",
    contentType: "application/pdf"
  });
  console.log(`⚡ PDF uploaded successfully! Asset ID: ${pdfAsset._id}`);

  // 2. Create studentSupport documents for academic years
  const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
  for (const year of academicYears) {
    console.log(`Creating studentSupport document for year: ${year}...`);
    const doc = {
      _type: "studentSupport",
      title: `Cultural Achievements Report`,
      academicYear: year,
      section: "literacy-cultural-achievements",
      pdfFile: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: pdfAsset._id
        }
      }
    };
    const createdDoc = await client.create(doc);
    console.log(`⚡ Created document for ${year}! ID: ${createdDoc._id}`);
  }

  // 3. Upload Image file
  console.log("Uploading dummy image...");
  const imgAsset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "cbnew2.webp",
    contentType: "image/webp"
  });
  console.log(`⚡ Image uploaded successfully! Asset ID: ${imgAsset._id}`);

  // 4. Create/Replace studentSupportImages document
  console.log("Creating studentSupportImages document...");
  const imagesDoc = {
    _id: "student-support-images-literacy-cultural-achievements",
    _type: "studentSupportImages",
    category: "literacy-cultural-achievements",
    images: [
      {
        _key: "dummy-image-key-1",
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imgAsset._id
        },
        caption: "Literacy & Cultural Achievements Event"
      }
    ]
  };

  const publishedImagesDoc = await client.createOrReplace(imagesDoc);
  console.log(`⚡ Successfully published images document! ID: ${publishedImagesDoc._id}`);

  console.log("\n=============================================");
  console.log("🎉 SEEDING COMPLETE FOR LITERACY & CULTURAL!");
  console.log("=============================================");
}

runSeed().catch((err) => {
  console.error("❌ Seeding failed:", err.message);
});
