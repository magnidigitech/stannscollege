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

// Category mappings with their local folders
const CATEGORY_MAP = [
  {
    category: "grievance-redressal",
    dir: "../6.Student Support/Greivance COmmittee",
    title: "Grievance Redressal Cell"
  },
  {
    category: "mother-gnanamma",
    dir: "../6.Student Support/MOther Gnanamma outreach Committee",
    title: "Mother Gnanamma Outreach"
  },
  {
    category: "ncc-activities",
    dir: "../6.Student Support/NCC Website pics",
    title: "NCC Activities"
  },
  {
    category: "nss-activities",
    dir: "../6.Student Support/NSS Activities",
    title: "NSS Activities"
  },
  {
    category: "red-ribbon-club",
    dir: "../6.Student Support/Red Ribbon Club",
    title: "Red Ribbon Club"
  },
  {
    category: "women-empowerment",
    dir: "../6.Student Support/Women Empowrment cell",
    title: "Women Empowerment Cell"
  },
  {
    category: "environmental-social",
    dir: "../6.Student Support/Eco CLub",
    title: "Eco Club & Environment"
  },
  {
    category: "student-counselling",
    dir: "../6.Student Support/Parents Meet",
    title: "Student Counselling"
  }
];

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

  const files = fs.readdirSync(fullDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp";
  });

  if (files.length === 0) {
    console.log(`ℹ️ No images found in this directory.`);
    return;
  }

  console.log(`Found ${files.length} images. Checking for duplicates in Sanity...`);

  // Map files to category-specific unique names to avoid collisions in the asset store
  const fileToUniqueName = {};
  const uniqueNames = [];
  files.forEach((file) => {
    // Replace spaces and special chars to make it clean
    const cleanName = file.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${category}_${cleanName}`;
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
    console.warn("⚠️ Failed to check for existing image assets, uploading all files...");
  }

  const imageAssets = [];
  const filesNeedUpload = files.filter((file) => {
    const uniqueName = fileToUniqueName[file];
    return !existingMap[uniqueName];
  });

  console.log(`- ${files.length - filesNeedUpload.length} images already exist in Sanity.`);
  console.log(`- ${filesNeedUpload.length} images need uploading.`);

  // Load existing assets to the category array
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
        caption: `${title} - Photo ${file.replace(/\.[^/.]+$/, "")}`
      });
    }
  });

  // Batch upload remaining files
  const BATCH_SIZE = 5;
  for (let i = 0; i < filesNeedUpload.length; i += BATCH_SIZE) {
    const batch = filesNeedUpload.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (file) => {
      const filePath = path.join(fullDir, file);
      const uniqueName = fileToUniqueName[file];
      try {
        const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
          filename: uniqueName,
        });
        console.log(`  Uploaded [${i + batch.indexOf(file) + 1}/${filesNeedUpload.length}]: ${file}`);
        return {
          _key: crypto.randomBytes(6).toString("hex"),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id
          },
          caption: `${title} - Photo ${file.replace(/\.[^/.]+$/, "")}`
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
