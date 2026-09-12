const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Load token from .env
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

const DEFAULT_TOKEN =
  "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const BANNER_DIR = path.join(__dirname, "../Website Herobanner Images 2026");

const BANNERS_META = [
  {
    prefix: 1,
    title: "NAAC Accreditation & Academic Excellence",
    tagline: "Accredited with 'A' Grade in First Cycle",
    desc: "Embark on an extraordinary educational experience that blends character, academic competence, and social compassion.",
    cta1Link: "/about/the-institution/basic-institutional-information",
  },
  {
    prefix: 2,
    title: "St. Ann's College for Women, Gorantla",
    tagline: "29+ Years of Educational Eminence (1997 - 2026)",
    desc: "Empowering young women through world-class holistic education, values, and leadership development.",
    cta1Link: "/about/the-institution/history-of-the-college",
  },
  {
    prefix: 3,
    title: "Vibrant Campus & Community Life",
    tagline: "Nurturing Confident Future Women Leaders",
    desc: "State-of-the-art academic environment fostering innovation, personal mentorship, and community engagement.",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
  },
  {
    prefix: 4,
    title: "Gnanam Block & Infrastructure",
    tagline: "Modern Architectural Learning Facility",
    desc: "Spacious classrooms, dedicated faculty spaces, and smart educational amenities in Gorantla, Guntur.",
    cta1Link: "/about/the-institution/basic-institutional-information",
  },
  {
    prefix: 5,
    title: "Student Empowerment & Development",
    tagline: "Character, Competence & Compassion",
    desc: "Building socially compassionate, industry-ready leaders for modern global communities.",
    cta1Link: "/student-support/student-counselling",
  },
  {
    prefix: 6,
    title: "Advanced Science Laboratories",
    tagline: "Hands-on Research & Experimental Learning",
    desc: "State-of-the-art equipment and specialized laboratory setups across science departments.",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
  },
  {
    prefix: 7,
    title: "State-of-the-Art IT & Computer Labs",
    tagline: "Cutting-Edge Digital Infrastructure",
    desc: "High-speed networks, licensed software tools, and advanced computing terminals for MCA and UG students.",
    cta1Link: "/academics/academic-programmes/undergraduate-programmes",
  },
  {
    prefix: 8,
    title: "NCC & Leadership Training",
    tagline: "Discipline, Duty & National Pride",
    desc: "Instilling patriotism, physical fitness, team synergy, and leadership among cadet students.",
    cta1Link: "/student-support/student-support-services",
  },
  {
    prefix: 9,
    title: "Accreditations & Institutional Recognitions",
    tagline: "AICTE Approved & UGC 2(f) Recognized",
    desc: "Permanently affiliated to Acharya Nagarjuna University with stellar quality certifications.",
    cta1Link: "/naac-peer-team",
  },
  {
    prefix: 10,
    title: "Placement Achievements & Industry Linkages",
    tagline: "Career Opportunities with Global Leaders",
    desc: "Top multinational recruiters and comprehensive career placement training for graduating batches.",
    cta1Link: "/placements/training-placements",
  },
];

async function updateHeroBanners() {
  console.log("=================================================");
  console.log("🚀 UPDATING SANITY HOME HERO BANNERS (1 to 10)");
  console.log("=================================================");

  // 1. Fetch and remove all existing homeBanner documents
  console.log("\n1. Fetching existing homeBanner documents...");
  const existingBanners = await client.fetch('*[_type == "homeBanner"]{_id, title}');
  console.log(`Found ${existingBanners.length} existing banners.`);

  for (const b of existingBanners) {
    try {
      console.log(`Deleting existing banner: ${b._id} (${b.title || "Untitled"})...`);
      await client.delete(b._id);
      console.log(`✅ Deleted: ${b._id}`);
    } catch (err) {
      console.error(`❌ Failed to delete ${b._id}:`, err.message);
    }
  }

  // 2. Read folder files and sort numerically
  console.log("\n2. Scanning Website Herobanner Images 2026 folder...");
  if (!fs.existsSync(BANNER_DIR)) {
    throw new Error(`Directory not found: ${BANNER_DIR}`);
  }

  const allFiles = fs.readdirSync(BANNER_DIR);
  console.log("Files found in folder:", allFiles);

  // Match files by number prefix
  const bannerQueue = [];
  for (const meta of BANNERS_META) {
    const file = allFiles.find((f) => {
      const match = f.match(/^(\d+)\./);
      return match && parseInt(match[1], 10) === meta.prefix;
    });

    if (file) {
      bannerQueue.push({
        ...meta,
        fileName: file,
        filePath: path.join(BANNER_DIR, file),
      });
    } else {
      console.warn(`⚠️ Could not find file with prefix ${meta.prefix}`);
    }
  }

  // Sort strictly by prefix (1 to 10)
  bannerQueue.sort((a, b) => a.prefix - b.prefix);

  console.log(`\nReady to upload ${bannerQueue.length} banners in strict numerical order:`);
  bannerQueue.forEach((b) => console.log(`  #${b.prefix}: ${b.fileName} -> "${b.title}"`));

  // 3. Upload image assets and create documents in Sanity
  console.log("\n3. Uploading image assets and publishing homeBanner documents...");
  for (const item of bannerQueue) {
    console.log(`\n--- [${item.prefix}/10] Processing: ${item.fileName} ---`);
    try {
      const fileStream = fs.createReadStream(item.filePath);
      console.log(`Uploading asset to Sanity...`);
      const imageAsset = await client.assets.upload("image", fileStream, {
        filename: item.fileName,
      });
      console.log(`✅ Asset uploaded! Asset ID: ${imageAsset._id}`);

      const docId = `home-hero-banner-${item.prefix}`;
      const doc = {
        _id: docId,
        _type: "homeBanner",
        title: item.title,
        tagline: item.tagline,
        desc: item.desc,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        cta1Text: "Explore More",
        cta1Link: item.cta1Link || "/about/the-institution/basic-institutional-information",
        cta2Text: "Contact Us",
        cta2Link: "/contact",
        displayOrder: item.prefix,
      };

      console.log(`Creating Sanity document with displayOrder: ${item.prefix}...`);
      await client.createOrReplace(doc);
      console.log(`✅ Published: ${docId} (#${item.prefix}) - ${item.title}`);
    } catch (err) {
      console.error(`❌ Failed to process #${item.prefix} (${item.fileName}):`, err.message);
    }
  }

  // 4. Verify the updated banners from Sanity
  console.log("\n4. Verifying updated homeBanner documents from Sanity...");
  const newBanners = await client.fetch(
    '*[_type == "homeBanner" && !(_id in path("drafts.**"))] | order(displayOrder asc) { _id, title, displayOrder, "imageUrl": image.asset->url }'
  );

  console.log(`\n🎉 Verification Success! ${newBanners.length} banners live in Sanity:`);
  newBanners.forEach((b) => {
    console.log(`  [Order ${b.displayOrder}] ${b.title}`);
    console.log(`    URL: ${b.imageUrl}`);
  });
}

updateHeroBanners().catch((err) => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
