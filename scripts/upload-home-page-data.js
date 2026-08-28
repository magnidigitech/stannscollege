const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@sanity/client");

// Load write token
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

const DEFAULT_TOKEN = "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const HOME_DIR = path.join(__dirname, "../Home page");

// 1. Upload College Magazines
const MAGAZINES = [
  { file: "2025-2026.pdf", title: "Ann Essence", academicYear: "2025-2026", order: 1 },
  { file: "2024-2025.pdf", title: "Annals of Excellence", academicYear: "2024-2025", order: 2 },
  { file: "2023-2024.pdf", title: "Ann Academia", academicYear: "2023-2024", order: 3 },
  { file: "2022-2023.pdf", title: "Ann Reflections", academicYear: "2022-2023", order: 4 },
  { file: "2019-22.pdf", title: "Ann Silver Splendour", academicYear: "2019-2022", order: 5 },
  { file: "2018-19.pdf", title: "Ann Ecstasy Magazine", academicYear: "2018-2019", order: 6 },
  { file: "2017-18.pdf", title: "Ann Jubilation", academicYear: "2017-2018", order: 7 },
  { file: "2016-17.pdf", title: "Ann Achievements", academicYear: "2016-2017", order: 8 },
];

async function uploadMagazines() {
  console.log("\n=============================================");
  console.log("📚 1. UPLOADING COLLEGE MAGAZINES");
  console.log("=============================================");
  const magDir = path.join(HOME_DIR, "College Magazines");

  for (const item of MAGAZINES) {
    const filePath = path.join(magDir, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      continue;
    }

    try {
      console.log(`Uploading PDF asset: ${item.title} (${item.academicYear})...`);
      const fileAsset = await client.assets.upload("file", fs.createReadStream(filePath), {
        filename: `college_magazine_${item.file.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
      });

      const docId = `college-magazine-${item.academicYear.replace(/[^a-zA-Z0-9]/g, "-")}`;
      const doc = {
        _id: docId,
        _type: "collegeMagazine",
        title: item.title,
        academicYear: item.academicYear,
        pdfFile: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: fileAsset._id,
          },
        },
        displayOrder: item.order,
      };

      await client.createOrReplace(doc);
      console.log(`✅ Published Magazine: ${item.title} (${item.academicYear})`);
    } catch (err) {
      console.error(`❌ Failed magazine ${item.title}:`, err.message);
    }
  }
}

// 2. Upload Newsletters
const NEWSLETTERS_2024_25 = [
  { file: "1.June 2024 News Letter.pdf", month: "June", academicYear: "2024-2025", order: 1 },
  { file: "2.July 2024 News Letter.pdf", month: "July", academicYear: "2024-2025", order: 2 },
  { file: "3.August 2024 News Letter.pdf", month: "August", academicYear: "2024-2025", order: 3 },
  { file: "4.September 2024 News Letter.pdf", month: "September", academicYear: "2024-2025", order: 4 },
  { file: "5.October 2024 News Letter.pdf", month: "October", academicYear: "2024-2025", order: 5 },
  { file: "6.November 2024 News Letter.pdf", month: "November", academicYear: "2024-2025", order: 6 },
  { file: "7.December 2024 News Letter-1.pdf", month: "December", academicYear: "2024-2025", order: 7 },
  { file: "8.January 2025 news letter.pdf", month: "January", academicYear: "2024-2025", order: 8 },
  { file: "9.Febraury 2025 News Letter.pdf", month: "February", academicYear: "2024-2025", order: 9 },
  { file: "10.March 2025 News Letter.pdf", month: "March", academicYear: "2024-2025", order: 10 },
  { file: "11.APril 2025 News letter.pdf", month: "April", academicYear: "2024-2025", order: 11 },
  { file: "12.May 2025 News Letter.pdf", month: "May", academicYear: "2024-2025", order: 12 },
];

const NEWSLETTERS_2025_26 = [
  { file: "1.June 2025 News Letter.pdf", month: "June", academicYear: "2025-2026", order: 1 },
  { file: "2.July 2025 News Letter.pdf", month: "July", academicYear: "2025-2026", order: 2 },
  { file: "AUgust 2025 News letter Issue 03 Print.pdf", month: "August", academicYear: "2025-2026", order: 3 },
  { file: "Septemebr 2025 News Letter Print.pdf", month: "September", academicYear: "2025-2026", order: 4 },
  { file: "October 2025 News Letter Print.pdf", month: "October", academicYear: "2025-2026", order: 5 },
  { file: "Novemebr2025 News letter.pdf", month: "November", academicYear: "2025-2026", order: 6 },
  { file: "News Letter December 2025.pdf", month: "December", academicYear: "2025-2026", order: 7 },
  { file: "January News letter 2026 Final.pdf", month: "January", academicYear: "2025-2026", order: 8 },
  { file: "Febraury News letter 2026(pdfgear.com) (1).pdf", month: "February", academicYear: "2025-2026", order: 9 },
  { file: "March News Letter 2026.pdf", month: "March", academicYear: "2025-2026", order: 10 },
];

async function uploadNewsletters() {
  console.log("\n=============================================");
  console.log("📰 2. UPLOADING ST. ANN'S CHRONICLE NEWSLETTERS");
  console.log("=============================================");

  const allNewsletters = [
    { subDir: "2024-25--NEWS LETTARS", items: NEWSLETTERS_2024_25 },
    { subDir: "2025-26-- NEWS LETTARS", items: NEWSLETTERS_2025_26 },
  ];

  for (const group of allNewsletters) {
    const groupDir = path.join(HOME_DIR, "News letters", group.subDir);
    for (const item of group.items) {
      const filePath = path.join(groupDir, item.file);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File not found: ${filePath}`);
        continue;
      }

      try {
        console.log(`Uploading Newsletter: ${item.month} ${item.academicYear}...`);
        const fileAsset = await client.assets.upload("file", fs.createReadStream(filePath), {
          filename: `newsletter_${item.academicYear}_${item.month}_${item.file.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
        });

        const docId = `newsletter-${item.academicYear.replace(/[^a-zA-Z0-9]/g, "-")}-${item.month.toLowerCase()}`;
        const doc = {
          _id: docId,
          _type: "newsletter",
          title: `The St. Ann's Chronicle - ${item.month} ${item.academicYear}`,
          academicYear: item.academicYear,
          month: item.month,
          pdfFile: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: fileAsset._id,
            },
          },
          displayOrder: item.order,
        };

        await client.createOrReplace(doc);
        console.log(`✅ Published Newsletter: ${item.month} ${item.academicYear}`);
      } catch (err) {
        console.error(`❌ Failed newsletter ${item.month} ${item.academicYear}:`, err.message);
      }
    }
  }
}

// 3. Upload Home Banners & Hero Highlights
async function uploadHomeBanners() {
  console.log("\n=============================================");
  console.log("🖼️ 3. UPLOADING HOME HERO BANNERS & HIGHLIGHTS");
  console.log("=============================================");

  const banners = [
    {
      file: "1.Welocme Slide.png",
      title: "Shaping Visionary Female Leaders",
      tagline: "Society of St. Anne Minority Institution",
      desc: "Embark on an extraordinary educational experience that blends character, academic competence, and social compassion.",
      cta1Text: "Apply For Admissions",
      cta1Link: "/admissions/policy-process",
      cta2Text: "Explore About Us",
      cta2Link: "/about/the-institution/basic-institutional-information",
      order: 1,
    },
    {
      file: "2.NAAC Certificate.png",
      title: "Academic Excellence & Rigour",
      tagline: "Acharya Nagarjuna University Affiliated - Grade A+",
      desc: "Proudly graded A+ by NAAC in Guntur. Discover our meticulously structured undergraduate & postgraduate curricula.",
      cta1Text: "Academic Programmes",
      cta1Link: "/academics/academic-programmes/undergraduate-programmes",
      cta2Text: "NAAC Peer Team Visit",
      cta2Link: "/naac-peer-team",
      order: 2,
    },
    {
      file: "3.MCA Certifciate.png",
      title: "Vibrant Placements & Professional PG Tracks",
      tagline: "AICTE Approved MCA & MBA Programmes",
      desc: "Launch your career with leading multinational corporations. Benefit from professional skill training and robust recruitment cell support.",
      cta1Text: "Placement Highlights",
      cta1Link: "/placements/training-placements",
      cta2Text: "Contact Support",
      cta2Link: "/contact",
      order: 3,
    },
    {
      file: "IMG_20240304_085331.jpg",
      title: "Empowering Women Through Quality Education",
      tagline: "Holistic Student Development",
      desc: "Fostering academic rigor, personal mentorship, and vibrant student community engagement across all departments.",
      cta1Text: "Explore Programmes",
      cta1Link: "/academics/academic-programmes/undergraduate-programmes",
      cta2Text: "Admissions Process",
      cta2Link: "/admissions/policy-process",
      order: 4,
    },
    {
      file: "IMG20250122085524.jpg",
      title: "State-of-the-Art Campus & Infrastructure",
      tagline: "Modern Learning Environment",
      desc: "Equipped with advanced computer networks, science laboratories, ICT classrooms, and extensive library catalogs.",
      cta1Text: "Campus Facilities",
      cta1Link: "/about/the-institution/basic-institutional-information",
      cta2Text: "Student Support",
      cta2Link: "/student-support/student-counselling",
      order: 5,
    },
    {
      file: "WhatsApp Image 2025-12-30 at 10.24.28 AM.jpeg",
      title: "Vibrant Campus Life & Cultural Eminence",
      tagline: "Celebrations & Student Leadership",
      desc: "Celebrating student creativity, leadership forums, sports triumphs, and annual academic conventions.",
      cta1Text: "View Photo Gallery",
      cta1Link: "/about/the-institution/institutional-awards",
      cta2Text: "Contact Support",
      cta2Link: "/contact",
      order: 6,
    },
    {
      file: "IMG20260217130933.jpg",
      title: "Character, Competence & Compassion",
      tagline: "The 3C Institutional Philosophy",
      desc: "Building socially compassionate and industry-ready female leaders for modern global communities.",
      cta1Text: "About St. Ann's",
      cta1Link: "/about/the-institution/history-of-the-college",
      cta2Text: "Our Leadership",
      cta2Link: "/about/the-institution/head-of-the-institution",
      order: 7,
    },
  ];

  for (const b of banners) {
    const filePath = path.join(HOME_DIR, b.file);
    if (!fs.existsSync(filePath)) continue;

    try {
      console.log(`Uploading Banner Image: ${b.title}...`);
      const imageAsset = await client.assets.upload("image", fs.createReadStream(filePath), {
        filename: `banner_${b.file.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
      });

      const docId = `home-banner-${b.order}`;
      const doc = {
        _id: docId,
        _type: "homeBanner",
        title: b.title,
        tagline: b.tagline,
        desc: b.desc,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        cta1Text: b.cta1Text,
        cta1Link: b.cta1Link,
        cta2Text: b.cta2Text,
        cta2Link: b.cta2Link,
        displayOrder: b.order,
      };

      await client.createOrReplace(doc);
      console.log(`✅ Published Home Banner: ${b.title}`);
    } catch (err) {
      console.error(`❌ Failed banner ${b.title}:`, err.message);
    }
  }
}

// 4. Upload Home Photo Gallery
async function uploadHomeGallery() {
  console.log("\n=============================================");
  console.log("📸 4. UPLOADING HOME PHOTO GALLERY");
  console.log("=============================================");

  const files = fs.readdirSync(HOME_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return (ext === ".jpg" || ext === ".jpeg" || ext === ".png") && !f.startsWith("1.Welocme") && !f.startsWith("2.NAAC") && !f.startsWith("3.MCA");
  }).sort();

  console.log(`Found ${files.length} event photos in Home page root.`);

  const imageAssets = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(HOME_DIR, file);
    try {
      console.log(`[${i + 1}/${files.length}] Uploading image asset: ${file}...`);
      const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
        filename: `home_gallery_${file.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
      });
      imageAssets.push({
        _key: crypto.randomBytes(6).toString("hex"),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
        caption: `Campus Event & Celebrations - ${file.replace(/\.[^/.]+$/, "")}`,
      });
    } catch (err) {
      console.error(`❌ Failed image ${file}:`, err.message);
    }
  }

  if (imageAssets.length > 0) {
    try {
      const docId = "home-gallery-main";
      const doc = {
        _id: docId,
        _type: "homeGallery",
        title: "Campus Events & Celebrations Gallery",
        academicYear: "2025-2026",
        category: "campus",
        images: imageAssets,
        displayOrder: 1,
      };

      await client.createOrReplace(doc);
      console.log(`✅ Successfully published Home Photo Gallery document with ${imageAssets.length} images!`);
    } catch (err) {
      console.error("❌ Failed to publish home photo gallery document:", err.message);
    }
  }
}

async function runAll() {
  await uploadMagazines();
  await uploadNewsletters();
  await uploadHomeBanners();
  await uploadHomeGallery();
  console.log("\n=============================================");
  console.log("🎉 ALL HOME PAGE CONTENT SUCCESSFULLY PUBLISHED TO SANITY!");
  console.log("=============================================");
}

runAll();
