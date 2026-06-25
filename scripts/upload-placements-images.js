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

// Category mapping based on local folders relative to stanns directory
const CATEGORY_MAP = [
  {
    category: "recruitment-drives",
    dirs: [
      "7.Placements & Industry Linakegs Photos/4.Campus Palcemetn Drives",
      "7.Placements & Industry Linakegs Photos/Placements 2025-2026",
      "7.Placements & Industry Linakegs Photos/Placemetns 2024-2025 Images"
    ],
    title: "Campus Recruitment Drives"
  },
  {
    category: "skill-development",
    dirs: [
      "7.Placements & Industry Linakegs Photos/5.SkillDevelopment Initiatives"
    ],
    title: "Skill Development Initiatives"
  },
  {
    category: "soft-skills",
    dirs: [
      "7.Placements & Industry Linakegs Photos/6.Soft Skills & Personality Developemt"
    ],
    title: "Soft Skills & Personality Development"
  },
  {
    category: "internships-exposure",
    dirs: [
      "7.Placements & Industry Linakegs Photos/7.Internships",
      "7.Placements & Industry Linakegs Photos/long Intenship meeting"
    ],
    title: "Internships & Industry Exposure"
  },
  {
    category: "competitive-coaching",
    dirs: [
      "7.Placements & Industry Linakegs Photos/8.Competitive Examiantions COaching"
    ],
    title: "Competitive Exam Coaching"
  },
  {
    category: "industrial-visits",
    dirs: [
      "7.Placements & Industry Linakegs Photos/9.Industrial Visits"
    ],
    title: "Industrial Visits"
  },
  {
    category: "skill-training",
    dirs: [
      "7.Placements & Industry Linakegs Photos/10.Skill Based Training Programmes"
    ],
    title: "Skill-Based Training Programmes"
  },
  {
    category: "industry-partnerships",
    dirs: [
      "7.Placements & Industry Linakegs Photos/11.Industry Linkages"
    ],
    title: "Industry Partnerships"
  },
  {
    category: "capacity-building",
    dirs: [
      "7.Placements & Industry Linakegs Photos/12.Capacity Building & Skill Enhancement"
    ],
    title: "Capacity Building & Skill Enhancement"
  },
  {
    category: "alumni-support",
    dirs: [
      "7.Placements & Industry Linakegs Photos/13.Alumni Career Support"
    ],
    title: "Alumni Career Support"
  }
];

// Base path of stanns workspace
const projectRoot = path.join(__dirname, "..");

// Helper to recursively find all images in a directory
function getImagesRecursive(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    // Ignore hidden files and system files (e.g. .DS_Store)
    if (file.startsWith(".")) return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getImagesRecursive(filePath, baseDir));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
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

// Detect academic year based on filepath and filename
function detectYear(filePath, relativePath) {
  const fullPathToTest = `${filePath} ${relativePath}`;
  
  // 1. Check for explicit year ranges (e.g., 2024-2025, 2025-2026)
  const rangeMatch = fullPathToTest.match(/(\d{4})-(\d{4})/);
  if (rangeMatch) {
    return `${rangeMatch[1]}-${rangeMatch[2]}`;
  }

  // 2. Check for date patterns in name (e.g. 2024-09-18 or 20240918)
  const dateMatch = fullPathToTest.match(/(202\d)[-_]?(0[1-9]|1[0-2])[-_]?([0-2]\d|3[01])/);
  if (dateMatch) {
    const year = parseInt(dateMatch[1]);
    const month = parseInt(dateMatch[2]);
    if (month >= 6) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  }

  // 3. Check for standalone single years
  const singleYearMatch = fullPathToTest.match(/\b(202[4-6])\b/);
  if (singleYearMatch) {
    const year = parseInt(singleYearMatch[1]);
    return `${year}-${year + 1}`;
  }

  return null;
}

async function uploadCategoryImages(mapping) {
  const { category, dirs, title } = mapping;
  
  console.log(`\n======================================================`);
  console.log(`📂 Processing Category: [${category}]`);
  console.log(`======================================================`);

  let imageFiles = [];
  dirs.forEach((relativeDir) => {
    const fullDir = path.join(projectRoot, relativeDir);
    if (fs.existsSync(fullDir)) {
      console.log(`Checking subfolder: ${fullDir}`);
      imageFiles = imageFiles.concat(getImagesRecursive(fullDir));
    } else {
      console.warn(`⚠️ Warning: Subfolder does not exist: ${fullDir}`);
    }
  });

  if (imageFiles.length === 0) {
    console.log(`ℹ️ No images found for category: ${category}`);
    return;
  }

  console.log(`Found ${imageFiles.length} total images. Checking for duplicates in Sanity...`);

  // Map files to category-specific unique names to avoid collisions in the asset store
  const fileToUniqueName = {};
  const uniqueNames = [];
  imageFiles.forEach((img) => {
    // Replace spaces and special chars in the relative path to make it clean
    const cleanPath = img.relativePath.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `placements_${category}_${cleanPath}`;
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
      const year = detectYear(img.absolutePath, img.relativePath);
      const yearPrefix = year ? `[${year}] ` : "";
      imageAssets.push({
        _key: crypto.randomBytes(6).toString("hex"),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: existingMap[uniqueName]
        },
        caption: `${yearPrefix}${title} - Photo ${img.filename.replace(/\.[^/.]+$/, "")}`
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
        
        const year = detectYear(img.absolutePath, img.relativePath);
        const yearPrefix = year ? `[${year}] ` : "";
        return {
          _key: crypto.randomBytes(6).toString("hex"),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id
          },
          caption: `${yearPrefix}${title} - Photo ${img.filename.replace(/\.[^/.]+$/, "")}`
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
    const docId = `placements-images-${category}`;
    const doc = {
      _id: docId,
      _type: "placementsImages",
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
  console.log("🚀 STARTING PLACEMENTS IMAGES MIGRATION");
  console.log("=============================================");

  for (const mapping of CATEGORY_MAP) {
    try {
      await uploadCategoryImages(mapping);
    } catch (err) {
      console.error(`❌ Unexpected error on category ${mapping.category}:`, err.message);
    }
  }

  console.log("\n=============================================");
  console.log("🎉 PLACEMENTS IMAGES SEEDED SUCCESSFULLY!");
  console.log("=============================================");
}

runMigration();
