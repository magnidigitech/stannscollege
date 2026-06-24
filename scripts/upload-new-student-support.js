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

// Category mappings with their local folders (relative to __dirname)
const CATEGORY_MAP = [
  {
    category: "anti-ragging",
    dir: "../Anti- Ragging",
    title: "Anti-Ragging Committee"
  },
  {
    category: "seminars-workshops",
    dir: "../Seminars Workshops",
    title: "Seminars & Workshops"
  },
  {
    category: "sports-physical-education",
    dir: "../Sports & Physical Edcuation",
    title: "Sports & Physical Education"
  }
];

// Helper to recursively find all images in a directory
function getImagesRecursive(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getImagesRecursive(filePath, baseDir));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
        // Keep relative path to compute unique filename
        const relativePath = path.relative(baseDir, filePath);
        results.push({
          absolutePath: filePath,
          relativePath: relativePath,
          filename: file
        });
      }
    }
  });
  return results;
}

async function uploadCategoryImages(mapping) {
  const { category, dir, title } = mapping;
  const fullDir = path.join(__dirname, dir);

  console.log(`\n======================================================`);
  console.log(`📂 Processing Category: [${category}]`);
  console.log(`📂 Directory: ${fullDir}`);
  console.log(`======================================================`);

  if (!fs.existsSync(fullDir)) {
    console.warn(`⚠️ Warning: Directory does not exist: ${fullDir}`);
    return;
  }

  const imageFiles = getImagesRecursive(fullDir);

  if (imageFiles.length === 0) {
    console.log(`ℹ️ No images found in this directory.`);
    return;
  }

  console.log(`Found ${imageFiles.length} images (including subdirectories). Checking for duplicates in Sanity...`);

  // Map files to category-specific unique names to avoid collisions in the asset store
  const fileToUniqueName = {};
  const uniqueNames = [];
  imageFiles.forEach((img) => {
    // Replace spaces and special chars in the relative path to make it clean
    const cleanPath = img.relativePath.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${category}_${cleanPath}`;
    fileToUniqueName[img.absolutePath] = uniqueName;
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
    console.warn("⚠️ Failed to check for existing image assets, uploading all files...");
  }

  const imageAssets = [];
  const filesNeedUpload = imageFiles.filter((img) => {
    const uniqueName = fileToUniqueName[img.absolutePath];
    return !existingMap[uniqueName];
  });

  console.log(`- ${imageFiles.length - filesNeedUpload.length} images already exist in Sanity.`);
  console.log(`- ${filesNeedUpload.length} images need uploading.`);

  // Load existing assets to the category array
  imageFiles.forEach((img) => {
    const uniqueName = fileToUniqueName[img.absolutePath];
    if (existingMap[uniqueName]) {
      imageAssets.push({
        _key: crypto.randomBytes(6).toString("hex"),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: existingMap[uniqueName]
        },
        caption: `${title} - Photo ${img.filename.replace(/\.[^/.]+$/, "")}`
      });
    }
  });

  // Batch upload remaining files
  const BATCH_SIZE = 5;
  for (let i = 0; i < filesNeedUpload.length; i += BATCH_SIZE) {
    const batch = filesNeedUpload.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (img) => {
      const uniqueName = fileToUniqueName[img.absolutePath];
      try {
        const asset = await client.assets.upload("image", fs.createReadStream(img.absolutePath), {
          filename: uniqueName,
        });
        console.log(`  Uploaded [${i + batch.indexOf(img) + 1}/${filesNeedUpload.length}]: ${img.relativePath}`);
        return {
          _key: crypto.randomBytes(6).toString("hex"),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id
          },
          caption: `${title} - Photo ${img.filename.replace(/\.[^/.]+$/, "")}`
        };
      } catch (err) {
        console.error(`  ❌ Failed to upload: ${img.relativePath}. Error: ${err.message}`);
        return null;
      }
    });

    const results = await Promise.all(promises);
    results.forEach((res) => {
      if (res) imageAssets.push(res);
    });
  }

  console.log(`Publishing category document to Sanity...`);
  try {
    const docId = `student-support-images-${category}`;
    const doc = {
      _id: docId,
      _type: "studentSupportImages",
      category: category,
      images: imageAssets
    };

    const publishedDoc = await client.createOrReplace(doc);
    console.log(`⚡ Successfully published ${title} images! Document ID: ${publishedDoc._id}`);
  } catch (err) {
    console.error(`❌ Failed to publish document for ${title}:`, err.message);
  }
}

async function runMigration() {
  console.log("=============================================");
  console.log("🚀 STARTING STUDENT SUPPORT IMAGES MIGRATION");
  console.log("=============================================");

  for (const mapping of CATEGORY_MAP) {
    try {
      await uploadCategoryImages(mapping);
    } catch (err) {
      console.error(`❌ Unexpected error on category ${mapping.category}:`, err.message);
    }
  }

  console.log("\n=============================================");
  console.log("🎉 STUDENT SUPPORT IMAGES SEEDED SUCCESSFULLY!");
  console.log("=============================================");
}

runMigration();
