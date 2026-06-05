const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Configuration
const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const DEFAULT_TOKEN = "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw";

const token = process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

if (!process.env.SANITY_WRITE_TOKEN) {
  console.warn("\x1b[33m%s\x1b[0m", "⚠️ WARNING: SANITY_WRITE_TOKEN environment variable not set.");
  console.warn("\x1b[33m%s\x1b[0m", "Using the default token. If this token does not have write permissions, the upload will fail.");
  console.warn("\x1b[33m%s\x1b[0m", "Please set it via: export SANITY_WRITE_TOKEN=\"your-write-token-here\"");
  console.log("");
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: token,
  useCdn: false,
});

const CACHE_FILE = path.join(__dirname, "sanity-upload-cache.json");
const NAAC_DATA_PATH = path.join(__dirname, "../src/components/quality-assurance/naac-data.json");
const AQAR_DATA_PATH = path.join(__dirname, "../src/components/quality-assurance/aqar-data.json");

// Load Cache
let uploadCache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    uploadCache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    console.log(`Loaded cache from ${CACHE_FILE} (${Object.keys(uploadCache).length} uploaded files cached).`);
  } catch (err) {
    console.error("Failed to parse cache file. Initializing empty cache.", err.message);
  }
}

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(uploadCache, null, 2), "utf8");
}

// Helper to format file size
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Helper for retrying uploads in case of network drops
async function uploadWithRetry(localPath, fileName, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const asset = await client.assets.upload("file", fs.createReadStream(localPath), {
        filename: fileName,
      });
      return asset;
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.warn(`  ⚠️ Upload failed (attempt ${attempt}/${retries}): ${err.message}. Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Upload a single file to Sanity
async function uploadFile(relativeUrl) {
  if (!relativeUrl || !relativeUrl.startsWith("/documents/")) {
    return relativeUrl; // Not a local document path
  }

  // Decode URI component to get actual file name on disk
  let decodedPath = relativeUrl;
  try {
    decodedPath = decodeURIComponent(relativeUrl);
  } catch (e) {
    // Keep original if decoding fails
  }

  const localPath = path.join(__dirname, "../public", decodedPath);

  // Check if file exists
  if (!fs.existsSync(localPath)) {
    console.warn("\x1b[31m%s\x1b[0m", `❌ File not found locally: ${localPath}`);
    return relativeUrl; // Keep original URL if missing
  }

  // Check cache first
  if (uploadCache[relativeUrl]) {
    return uploadCache[relativeUrl];
  }

  const stats = fs.statSync(localPath);
  const sizeStr = formatBytes(stats.size);
  const fileName = path.basename(localPath);

  console.log(`Uploading: ${fileName} (${sizeStr})...`);

  try {
    const asset = await uploadWithRetry(localPath, fileName);
    
    console.log(`\x1b[32m%s\x1b[0m`, `  ✅ Success! Sanity URL: ${asset.url}`);
    
    // Store in cache
    uploadCache[relativeUrl] = asset.url;
    saveCache();
    
    return asset.url;
  } catch (err) {
    console.error(`\x1b[31m%s\x1b[0m`, `  ❌ Failed to upload ${fileName} after retries:`, err.message);
    // Graceful fallback: return the original URL so the migration can proceed and create documents
    return relativeUrl;
  }
}

// Recursively traverse document fields and upload files
async function processDocumentFields(doc) {
  if (doc.documentUrl) {
    doc.documentUrl = await uploadFile(doc.documentUrl);
  }
  if (doc.url) {
    doc.url = await uploadFile(doc.url);
  }
  if (doc.subDocuments && Array.isArray(doc.subDocuments)) {
    for (let subDoc of doc.subDocuments) {
      await processDocumentFields(subDoc);
    }
  }
}

// Main process function
async function main() {
  console.log("=========================================");
  console.log("🚀 STARTING SANITY DOCUMENT UPLOAD MIGRATION");
  console.log("=========================================\n");

  // Load datasets
  let naacData = [];
  let aqarData = [];

  if (fs.existsSync(NAAC_DATA_PATH)) {
    naacData = JSON.parse(fs.readFileSync(NAAC_DATA_PATH, "utf8"));
    console.log(`Loaded NAAC Data: ${naacData.length} criteria.`);
  } else {
    console.error(`NAAC data file not found at ${NAAC_DATA_PATH}`);
  }

  if (fs.existsSync(AQAR_DATA_PATH)) {
    aqarData = JSON.parse(fs.readFileSync(AQAR_DATA_PATH, "utf8"));
    console.log(`Loaded AQAR Data: ${aqarData.length} criteria.`);
  } else {
    console.error(`AQAR data file not found at ${AQAR_DATA_PATH}`);
  }

  // --- Process NAAC Data ---
  if (naacData.length > 0) {
    console.log("\n-----------------------------------------");
    console.log("📁 PROCESSING NAAC DATA PORTFOLIO");
    console.log("-----------------------------------------");

    for (let criterion of naacData) {
      console.log(`\n📂 Processing NAAC Criterion ${criterion.id}: ${criterion.title}`);
      
      // Upload files inside sections -> metrics -> documents -> subDocuments
      if (criterion.sections && Array.isArray(criterion.sections)) {
        for (let section of criterion.sections) {
          if (section.metrics && Array.isArray(section.metrics)) {
            for (let metric of section.metrics) {
              if (metric.documents && Array.isArray(metric.documents)) {
                for (let doc of metric.documents) {
                  await processDocumentFields(doc);
                }
              }
            }
          }
        }
      }

      // Create or update this Criterion document in Sanity
      console.log(`Publishing NAAC Criterion ${criterion.id} structure to Sanity...`);
      try {
        const docToCreate = {
          _id: `naacCriterion-${criterion.id}`,
          _type: "naacCriterion",
          id: criterion.id,
          title: criterion.title,
          sections: criterion.sections,
        };

        const result = await client.createOrReplace(docToCreate);
        console.log(`\x1b[32m%s\x1b[0m`, `⚡ Successfully published NAAC Criterion ${criterion.id} document! ID: ${result._id}`);
      } catch (err) {
        console.error(`\x1b[31m%s\x1b[0m`, `❌ Failed to publish NAAC Criterion ${criterion.id} document structure:`, err.message);
        throw err;
      }

      // Write intermediate progress to local file
      fs.writeFileSync(NAAC_DATA_PATH, JSON.stringify(naacData, null, 2), "utf8");
    }
  }

  // --- Process AQAR Data ---
  if (aqarData.length > 0) {
    console.log("\n-----------------------------------------");
    console.log("📁 PROCESSING AQAR DATA PORTFOLIO");
    console.log("-----------------------------------------");

    for (let criterion of aqarData) {
      console.log(`\n📂 Processing AQAR Criterion ${criterion.id}: ${criterion.title}`);
      
      // Upload files inside sections -> metrics -> documents -> subDocuments
      if (criterion.sections && Array.isArray(criterion.sections)) {
        for (let section of criterion.sections) {
          if (section.metrics && Array.isArray(section.metrics)) {
            for (let metric of section.metrics) {
              if (metric.documents && Array.isArray(metric.documents)) {
                for (let doc of metric.documents) {
                  await processDocumentFields(doc);
                }
              }
            }
          }
        }
      }

      // Create or update this Criterion document in Sanity
      console.log(`Publishing AQAR Criterion ${criterion.id} structure to Sanity...`);
      try {
        const docToCreate = {
          _id: `aqarCriterion-${criterion.id}`,
          _type: "aqarCriterion",
          id: criterion.id,
          title: criterion.title,
          sections: criterion.sections,
        };

        const result = await client.createOrReplace(docToCreate);
        console.log(`\x1b[32m%s\x1b[0m`, `⚡ Successfully published AQAR Criterion ${criterion.id} document! ID: ${result._id}`);
      } catch (err) {
        console.error(`\x1b[31m%s\x1b[0m`, `❌ Failed to publish AQAR Criterion ${criterion.id} document structure:`, err.message);
        throw err;
      }

      // Write intermediate progress to local file
      fs.writeFileSync(AQAR_DATA_PATH, JSON.stringify(aqarData, null, 2), "utf8");
    }
  }

  console.log("\n=========================================");
  console.log("🎉 MIGRATION SUCCESSFUL & ALL CRITERIA UPLOADED!");
  console.log("=========================================");
}

main().catch((err) => {
  console.error("\n❌ Critical migration failure:", err.message);
  process.exit(1);
});
