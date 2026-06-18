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

// Fallback write token (same as other scripts in codebase)
const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

// Alumni folder mappings
const ALUMNI_FOLDERS = [
  {
    dir: "2020 Alumni",
    slug: "2020-alumni",
    title: "2020 Alumni",
    order: 1
  },
  {
    dir: "2022 Alumni",
    slug: "2022-alumni",
    title: "2022 Alumni",
    order: 2
  },
  {
    dir: "2023 Alumni",
    slug: "2023-alumni",
    title: "2023 Alumni",
    order: 3
  },
  {
    dir: "2026 Alumini",
    slug: "2026-alumni",
    title: "2026 Alumni",
    order: 4
  },
  {
    dir: "B.Com Alumanai 2024",
    slug: "bcom-alumni-2024",
    title: "B.Com Alumni 2024",
    order: 5
  },
  {
    dir: "BATCH-2008 Alumni 2025",
    slug: "batch-2008-alumni-2025",
    title: "Batch 2008 Alumni 2025",
    order: 6
  },
  {
    dir: "BCA-1998-2001",
    slug: "bca-1998-2001",
    title: "BCA 1998-2001",
    order: 7
  }
];

async function uploadAlumniFolder(mapping) {
  const { dir, slug, title, order } = mapping;
  const fullDir = path.join(__dirname, "../Photos 2", dir);

  console.log(`\n======================================================`);
  console.log(`📂 Processing Alumni Folder: [${title}]`);
  console.log(`📂 Directory: ${fullDir}`);
  console.log(`======================================================`);

  if (!fs.existsSync(fullDir)) {
    console.warn(`⚠️ Warning: Directory does not exist: ${fullDir}`);
    return;
  }

  const files = fs.readdirSync(fullDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp";
  }).sort(); // Sort so the cover photo and ordering are deterministic

  if (files.length === 0) {
    console.log(`ℹ️ No images found in this directory.`);
    return;
  }

  console.log(`Found ${files.length} images. Checking for duplicates in Sanity...`);

  // Generate unique asset names based on folder and filename to avoid namespace collisions in Sanity
  const fileToUniqueName = {};
  const uniqueNames = [];
  files.forEach((file) => {
    const cleanName = file.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `alumni_gallery_${slug}_${cleanName}`;
    fileToUniqueName[file] = uniqueName;
    uniqueNames.push(uniqueName);
  });

  const existingMap = {};
  try {
    const existingAssets = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename in $uniqueNames] { _id, originalFilename }`,
      { uniqueNames }
    );
    existingAssets.forEach((asset) => {
      existingMap[asset.originalFilename] = asset._id;
    });
    console.log(`Found ${existingAssets.length} images already uploaded in Sanity.`);
  } catch (err) {
    console.warn("⚠️ Failed to query existing assets. Proceeding with upload check for each file...");
  }

  const imageAssets = [];
  const filesNeedUpload = files.filter((file) => {
    const uniqueName = fileToUniqueName[file];
    return !existingMap[uniqueName];
  });

  console.log(`- ${files.length - filesNeedUpload.length} images already exist in Sanity.`);
  console.log(`- ${filesNeedUpload.length} images need uploading.`);

  // Push existing assets into the list preserving the deterministic sorted order
  files.forEach((file) => {
    const uniqueName = fileToUniqueName[file];
    if (existingMap[uniqueName]) {
      imageAssets.push({
        _key: crypto.randomBytes(6).toString("hex"),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: existingMap[uniqueName]
        },
        caption: `${title} - ${file.replace(/\.[^/.]+$/, "")}`
      });
    }
  });

  // Batch upload remaining files
  const BATCH_SIZE = 5;
  for (let i = 0; i < filesNeedUpload.length; i += BATCH_SIZE) {
    const batch = filesNeedUpload.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (file, idx) => {
      const filePath = path.join(fullDir, file);
      const uniqueName = fileToUniqueName[file];
      try {
        const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
          filename: uniqueName,
        });
        console.log(`  Uploaded [${i + idx + 1}/${filesNeedUpload.length}]: ${file}`);
        return {
          _key: crypto.randomBytes(6).toString("hex"),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id
          },
          caption: `${title} - ${file.replace(/\.[^/.]+$/, "")}`
        };
      } catch (err) {
        console.error(`  ❌ Failed to upload: ${file}. Error: ${err.message}`);
        return null;
      }
    });

    const results = await Promise.all(promises);
    results.forEach((res) => {
      if (res) imageAssets.push(res);
    });
  }

  console.log(`Publishing folder gallery document to Sanity...`);
  try {
    const docId = `alumni-gallery-${slug}`;
    const doc = {
      _id: docId,
      _type: "alumniGallery",
      folderName: title,
      slug: {
        _type: "slug",
        current: slug
      },
      order: order,
      images: imageAssets
    };

    const publishedDoc = await client.createOrReplace(doc);
    console.log(`⚡ Successfully published [${title}] gallery! Document ID: ${publishedDoc._id}`);
  } catch (err) {
    console.error(`❌ Failed to publish document for ${title}:`, err.message);
  }
}

async function runMigration() {
  console.log("=============================================");
  console.log("🚀 STARTING ALUMNI GALLERY IMAGES MIGRATION");
  console.log("=============================================");

  if (!fs.existsSync(path.join(__dirname, "../Photos 2"))) {
    console.error("❌ Error: 'Photos 2' folder not found at project root!");
    process.exit(1);
  }

  for (const mapping of ALUMNI_FOLDERS) {
    try {
      await uploadAlumniFolder(mapping);
    } catch (err) {
      console.error(`❌ Unexpected error in folder ${mapping.title}:`, err.message);
    }
  }

  console.log("\n=============================================");
  console.log("🎉 ALUMNI GALLERY MIGRATION COMPLETED!");
  console.log("=============================================");
}

runMigration();
