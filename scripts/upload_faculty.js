const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Simple function to load .env variables manually
function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
      if (match) {
        let value = match[2].trim();
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[match[1].trim()] = value;
      }
    });
  }
}

loadEnv();

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN not found in environment or .env file.");
  process.exit(1);
}

// Initialize Sanity Write Client
const client = createClient({
  projectId: 'fhjwqub5',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: token,
  useCdn: false
});

// Helper to slugify names
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove punctuation
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // collapse duplicate hyphens
    .trim();
}

async function upload() {
  const scratchDir = "/Users/venkatavivek/.gemini/antigravity-ide/brain/570d6c9a-4459-447b-b6bf-87d66fd1599d/scratch";
  const facultyPath = path.join(scratchDir, "merged_faculty.json");
  const mappingsPath = path.join(scratchDir, "image_mappings.json");

  if (!fs.existsSync(facultyPath) || !fs.existsSync(mappingsPath)) {
    console.error("Error: Missing merged_faculty.json or image_mappings.json in scratch directory.");
    process.exit(1);
  }

  const facultyList = JSON.parse(fs.readFileSync(facultyPath, 'utf8'));
  const imageMappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));

  console.log(`Starting migration of ${facultyList.length} faculty profiles to Sanity...`);

  for (const faculty of facultyList) {
    const { sNo, name, designation, department, qualification, dateOfJoining, experience } = faculty;
    const slug = slugify(name);
    const docId = `faculty-profile-new-${sNo}`;

    console.log(`\n[${sNo}/${facultyList.length}] Processing ${name}...`);

    let imageAsset = null;
    const imagePath = imageMappings[sNo];

    if (imagePath && fs.existsSync(imagePath)) {
      try {
        console.log(`  Uploading photo: ${path.basename(imagePath)}`);
        imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
          filename: path.basename(imagePath),
          contentType: 'image/jpeg' // or determine dynamically, jpeg/jpg/png is fine
        });
        console.log(`  Photo uploaded successfully. Asset ID: ${imageAsset._id}`);
      } catch (err) {
        console.error(`  Error uploading photo for ${name}:`, err.message);
      }
    } else {
      console.log(`  No photo mapped (or file not found) for S.No ${sNo}`);
    }

    const doc = {
      _id: docId,
      _type: 'facultyProfileNew',
      sNo: sNo,
      staffType: 'teaching',
      facultyName: name,
      slug: {
        _type: 'slug',
        current: slug
      },
      designation: designation,
      department: department,
      highestQualification: qualification,
      dateOfJoining: dateOfJoining,
      totalExperience: experience,
      showOnWebsite: true,
      facultyStatus: 'active',
      displayOrder: sNo
    };

    if (imageAsset) {
      doc.profilePhoto = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      };
    }

    try {
      const result = await client.createOrReplace(doc);
      console.log(`  Published profile document to Sanity. Document ID: ${result._id}`);
    } catch (err) {
      console.error(`  Error publishing profile for ${name}:`, err.message);
    }
  }

  console.log("\nMigration completed successfully!");
}

upload();
