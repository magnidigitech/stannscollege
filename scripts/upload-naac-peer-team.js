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

// Paths to old site asset directories
const OLD_SITE_NAAC_DIR = path.join(__dirname, "../stannscollegeforwomen.org/public_html/naacpeerteam");
const CERTIFICATE_PDF_PATH = path.join(__dirname, "../stannscollegeforwomen.org/public_html/latestnews2024/NAAC CERTIFICATE.pdf");
const FALLBACK_CERTIFICATE_IMG_PATH = path.join(__dirname, "../public/documents/6.NAAC Certficates/NAAC Certficates/NAAC Certtifcate 1.jpeg");
const GALLERY_DIR = path.join(OLD_SITE_NAAC_DIR, "images/gallery");

// 16 Department Videos mapping
const VIDEOS_LIST = [
  { title: "AP STATE SKILL CENTER", file: "AP STATE SKILL CENTER.mp4" },
  { title: "BIOTECHNOLOGY", file: "BIOTECHNOLGY.mp4" },
  { title: "BOTANY", file: "BOTANY.mp4" },
  { title: "CHEMISTRY", file: "CHEMISTRY.mp4" },
  { title: "COMMERCE", file: "COMMERCE.mp4" },
  { title: "COMPUTER SCIENCE", file: "COMPUTER SCIENCE.mp4" },
  { title: "MATHEMATICS", file: "MATHEMATICS.mp4" },
  { title: "MBA", file: "MBA.mp4" },
  { title: "MCA", file: "MCA.mp4" },
  { title: "MICROBIOLOGY", file: "MICROBIOLOGY.mp4" },
  { title: "OTHER ACTIVITIES", file: "OTHER ACTIVITIES.mp4" },
  { title: "PG-LIBRARY", file: "PG-LIBRARY.mp4" },
  { title: "PHYSICS", file: "PHYSICS.mp4" },
  { title: "SPORTS & GAMES", file: "SPORTS & GAMES.mp4" },
  { title: "STATISTICS", file: "STATISTICS.mp4" },
  { title: "UG-LIBRARY", file: "UG-LIBRARY.mp4" }
];

async function uploadPdf() {
  if (!fs.existsSync(CERTIFICATE_PDF_PATH)) {
    console.error(`❌ PDF File not found: ${CERTIFICATE_PDF_PATH}`);
    return null;
  }

  // Check if PDF asset already exists in Sanity
  try {
    console.log("Checking if Certificate PDF already exists in Sanity...");
    const existing = await client.fetch(`*[_type == "sanity.fileAsset" && originalFilename == "NAAC_CERTIFICATE.pdf"][0]._id`);
    if (existing) {
      console.log(`✅ PDF already exists in Sanity! Reusing Asset ID: ${existing}`);
      return { _id: existing };
    }
  } catch (err) {
    console.log("⚠️ Failed to check for existing PDF asset, uploading...");
  }

  console.log(`Uploading Certificate PDF to Sanity...`);
  try {
    const asset = await client.assets.upload("file", fs.createReadStream(CERTIFICATE_PDF_PATH), {
      filename: "NAAC_CERTIFICATE.pdf",
      contentType: "application/pdf"
    });
    console.log(`✅ Uploaded PDF successfully! Asset ID: ${asset._id}`);
    return asset;
  } catch (err) {
    console.error("❌ Failed to upload PDF:", err.message);
    return null;
  }
}

async function uploadCertificateImage() {
  if (!fs.existsSync(FALLBACK_CERTIFICATE_IMG_PATH)) {
    console.error(`❌ Fallback Certificate Image not found: ${FALLBACK_CERTIFICATE_IMG_PATH}`);
    return null;
  }

  // Check if image preview asset already exists in Sanity
  try {
    console.log("Checking if Certificate Image preview already exists in Sanity...");
    const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == "NAAC_CERTIFICATE_PREVIEW.jpeg"][0]._id`);
    if (existing) {
      console.log(`✅ Certificate Image preview already exists in Sanity! Reusing Asset ID: ${existing}`);
      return { _id: existing };
    }
  } catch (err) {
    console.log("⚠️ Failed to check for existing certificate image asset, uploading...");
  }

  console.log(`Uploading Certificate Image preview to Sanity...`);
  try {
    const asset = await client.assets.upload("image", fs.createReadStream(FALLBACK_CERTIFICATE_IMG_PATH), {
      filename: "NAAC_CERTIFICATE_PREVIEW.jpeg",
      contentType: "image/jpeg"
    });
    console.log(`✅ Uploaded certificate image successfully! Asset ID: ${asset._id}`);
    return asset;
  } catch (err) {
    console.error("❌ Failed to upload certificate image:", err.message);
    return null;
  }
}

async function uploadGalleryImages() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(`❌ Gallery directory not found: ${GALLERY_DIR}`);
    return [];
  }

  const files = fs.readdirSync(GALLERY_DIR)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
    });

  console.log(`Found ${files.length} images in gallery directory.`);

  // Upload all images
  const filesToUpload = files;

  // Fetch already uploaded gallery images to skip duplication
  const existingMap = {};
  try {
    console.log("Checking for already uploaded gallery images in Sanity...");
    const existingAssets = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename in $filesToUpload] { _id, originalFilename }`,
      { filesToUpload }
    );
    existingAssets.forEach(asset => {
      existingMap[asset.originalFilename] = asset._id;
    });
    console.log(`Found ${existingAssets.length} already uploaded gallery images.`);
  } catch (err) {
    console.log("⚠️ Failed to query existing gallery images, will attempt full uploads...");
  }

  const imageAssets = [];
  const filesNeedUpload = filesToUpload.filter(file => !existingMap[file]);
  console.log(`- ${filesToUpload.length - filesNeedUpload.length} images already exist in Sanity and will be reused.`);
  console.log(`- ${filesNeedUpload.length} images will be uploaded.`);

  // Load existing image assets into list
  filesToUpload.forEach(file => {
    if (existingMap[file]) {
      imageAssets.push({
        _key: crypto.randomBytes(6).toString("hex"),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: existingMap[file]
        },
        caption: `NAAC Peer Team Visit - Photo ${file.replace(/\.[^/.]+$/, "")}`
      });
    }
  });

  const BATCH_SIZE = 5;
  for (let i = 0; i < filesNeedUpload.length; i += BATCH_SIZE) {
    const batch = filesNeedUpload.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (file) => {
      const filePath = path.join(GALLERY_DIR, file);
      try {
        const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
          filename: file,
          contentType: "image/jpeg"
        });
        console.log(`  Uploaded [${i + batch.indexOf(file) + 1}/${filesNeedUpload.length}]: ${file}`);
        return {
          _key: crypto.randomBytes(6).toString("hex"),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id
          },
          caption: `NAAC Peer Team Visit - Photo ${file.replace(/\.[^/.]+$/, "")}`
        };
      } catch (err) {
        console.error(`  ❌ Failed to upload image ${file}:`, err.message);
        return null;
      }
    });

    const results = await Promise.all(promises);
    results.forEach(res => {
      if (res) imageAssets.push(res);
    });
  }

  console.log(`✅ Loaded ${imageAssets.length} gallery images in total.`);
  return imageAssets;
}

async function main() {
  console.log("======================================================");
  console.log("🚀 STARTING SANITY NAAC PEER TEAM SEED/MIGRATION");
  console.log("======================================================\n");

  const pdfAsset = await uploadPdf();
  const imageAsset = await uploadCertificateImage();
  const galleryAssets = await uploadGalleryImages();

  // Map videos
  const videos = VIDEOS_LIST.map(vid => ({
    _key: crypto.randomBytes(6).toString("hex"),
    title: vid.title,
    videoUrl: `/videos/naac/${vid.file}`
  }));

  const naacPeerTeamDoc = {
    _id: "naac-peer-team-visit",
    _type: "naacPeerTeam",
    title: "NAAC Peer Team Visit",
    description: "The National Assessment and Accreditation Council (NAAC) Peer Team visited St. Ann’s College for Women, Gorantla, Guntur to assess the institutional performance, academic standards, quality infrastructure, and overall educational impact. Explore our accreditation documents, photo archives, and video presentations highlighting our department capabilities and campus infrastructure.",
    videos: videos,
    gallery: galleryAssets
  };

  if (pdfAsset) {
    naacPeerTeamDoc.certificatePdf = {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: pdfAsset._id
      }
    };
  }

  if (imageAsset) {
    naacPeerTeamDoc.certificateImage = {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageAsset._id
      }
    };
  }

  console.log("\nPublishing/Updating NAAC Peer Team document in Sanity...");
  try {
    const result = await client.createOrReplace(naacPeerTeamDoc);
    console.log(`\x1b[32m%s\x1b[0m`, `⚡ Successfully published NAAC Peer Team Visit data! ID: ${result._id}`);
  } catch (err) {
    console.error("❌ Failed to publish NAAC Peer Team document:", err.message);
    process.exit(1);
  }

  console.log("\n=============================================");
  console.log("🎉 NAAC PEER TEAM SEEDED SUCCESSFULLY!");
  console.log("💡 Note: You can copy the mp4 videos from the old site folder: ");
  console.log("   stannscollegeforwomen.org/public_html/naacpeerteam/videos/");
  console.log("   into your repository public directory: ");
  console.log("   public/videos/naac/");
  console.log("   so that the local videos play seamlessly on the site.");
  console.log("=============================================");
}

main().catch((err) => {
  console.error("❌ Critical migration failure:", err);
  process.exit(1);
});
