const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Parse .env manually
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value;
  }
});

const token = env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN not found in .env");
  process.exit(1);
}

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const pdfDir = path.join(__dirname, '../Faculty Professional Development');

const filesToMigrate = [
  // Category: professional-development
  {
    filename: "Faculty Dev.Programme s 2024-25 (1).pdf",
    title: "Faculty Development Programmes (FDP) Report 2024-2025",
    category: "professional-development",
    displayOrder: 1,
  },
  {
    filename: "Faculty Development Progra. 2025-2026.pdf",
    title: "Faculty Development Programmes (FDP) Report 2025-2026",
    category: "professional-development",
    displayOrder: 2,
  },
  {
    filename: "FDP Certficates 2024 - 2025.pdf",
    title: "Faculty Development Programme (FDP) Certificates 2024-2025",
    category: "professional-development",
    displayOrder: 3,
  },
  {
    filename: "FDPs Certificates 2025-2026.pdf",
    title: "Faculty Development Programme (FDP) Certificates 2025-2026",
    category: "professional-development",
    displayOrder: 4,
  },

  // Category: seminars-conferences
  {
    filename: "Faculty Seminars Conferece etc 2024-2025.pdf",
    title: "Faculty Seminars & Conferences Report 2024-2025",
    category: "seminars-conferences",
    displayOrder: 1,
  },
  {
    filename: "Faculty -Semianrs Conferences 2025-2026.pdf",
    title: "Faculty Seminars & Conferences Report 2025-2026",
    category: "seminars-conferences",
    displayOrder: 2,
  },
  {
    filename: "Semianrs & Confereces Certifcates 2024 - 2025.pdf",
    title: "Seminars & Conferences Certificates 2024-2025",
    category: "seminars-conferences",
    displayOrder: 3,
  },
  {
    filename: "Semianrs & COnferecnes Certficates  2025 - 2026.pdf",
    title: "Seminars & Conferences Certificates 2025-2026",
    category: "seminars-conferences",
    displayOrder: 4,
  },
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadWithRetry(buffer, filename, maxRetries = 5) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      console.log(`Uploading ${filename} (Attempt ${attempt + 1}/${maxRetries})...`);
      const asset = await client.assets.upload('file', buffer, {
        filename: filename,
        contentType: 'application/pdf',
      });
      return asset;
    } catch (err) {
      attempt++;
      console.error(`Error on upload attempt ${attempt}:`, err.message || err);
      if (attempt >= maxRetries) throw err;
      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(`Waiting ${waitTime}ms before retry...`);
      await delay(waitTime);
    }
  }
}

async function migrate() {
  console.log("Checking existing documents in Sanity...");
  const existingDocs = await client.fetch(`*[_type == "facultyPdfDocument"]{ title }`);
  const existingTitles = new Set(existingDocs.map(d => d.title));
  console.log(`Found ${existingTitles.size} existing documents.`);

  console.log("Starting migration...");
  for (const item of filesToMigrate) {
    if (existingTitles.has(item.title)) {
      console.log(`Skipping: Document "${item.title}" is already uploaded.`);
      continue;
    }

    const filePath = path.join(pdfDir, item.filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: File not found: ${filePath}`);
      continue;
    }

    try {
      const buffer = fs.readFileSync(filePath);
      const asset = await uploadWithRetry(buffer, item.filename);

      console.log(`Uploaded asset ID: ${asset._id}. Creating document...`);

      const doc = {
        _type: 'facultyPdfDocument',
        title: item.title,
        category: item.category,
        pdfFile: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        displayOrder: item.displayOrder,
      };

      const result = await client.create(doc);
      console.log(`Successfully created document: ${result._id} for ${item.title}`);
    } catch (err) {
      console.error(`Failed to migrate ${item.filename} after retries:`, err);
    }
  }
  console.log("Migration complete!");
}

migrate();
