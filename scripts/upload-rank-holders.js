const fs = require("fs");
const path = require("path");
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

const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const RANK_HOLDERS_DATA = [
  { academicYear: "2022–2025", programme: "B.Com (G)", studentName: "Gundala Usha Rani", achievement: "Top 5 University Rank", displayOrder: 1 },
  { academicYear: "2020–2023", programme: "BCA", studentName: "Gunji Kusuma", achievement: "Top 5 University Rank", displayOrder: 2 },
  { academicYear: "2018–2021", programme: "B.Com (G)", studentName: "Pomulapati Ramya", achievement: "Top 5 University Rank", displayOrder: 3 },
  { academicYear: "2015–2018", programme: "BBC", studentName: "K. Anuja", achievement: "Pratibha Puraskar Award", displayOrder: 4 },
  { academicYear: "2015–2018", programme: "BBC", studentName: "V. Bala Sri", achievement: "Pratibha Puraskar Award", displayOrder: 5 },
  { academicYear: "2015–2018", programme: "B.Com (G)", studentName: "K. Pratima", achievement: "Pratibha Puraskar Award", displayOrder: 6 },
  { academicYear: "2015–2018", programme: "MCA", studentName: "Sk. Mastanbi", achievement: "Pratibha Puraskar Award", displayOrder: 7 },
  { academicYear: "2015–2018", programme: "MCA", studentName: "N. Suchandrika", achievement: "Pratibha Puraskar Award", displayOrder: 8 },
  { academicYear: "2014–2017", programme: "MCA", studentName: "S. Ravali", achievement: "Gold Medals", displayOrder: 9 },
  { academicYear: "2014–2017", programme: "B.Com (G)", studentName: "D. Sai Swetha", achievement: "Pratibha Puraskar Award", displayOrder: 10 },
  { academicYear: "2013–2016", programme: "MBC", studentName: "Gayathri Thirumala", achievement: "Pratibha Puraskar Award", displayOrder: 11 },
  { academicYear: "2012–2015", programme: "MCA", studentName: "K. Naga Lakshmi", achievement: "Pratibha Puraskar Award", displayOrder: 12 },
  { academicYear: "2012–2015", programme: "BBC", studentName: "S. Hima Bindu", achievement: "Gold Medal", displayOrder: 13 },
  { academicYear: "2012–2015", programme: "B.Com (G)", studentName: "Y. Satya Vani", achievement: "Pratibha Puraskar Award", displayOrder: 14 },
  { academicYear: "2011–2014", programme: "MBC", studentName: "V. Anitha", achievement: "Pratibha Puraskar Award", displayOrder: 15 },
  { academicYear: "2011–2014", programme: "BBC", studentName: "P. Amala Mary", achievement: "Pratibha Puraskar Award", displayOrder: 16 },
  { academicYear: "2011–2014", programme: "MBC", studentName: "B. Maha Lakshmi", achievement: "Pratibha Puraskar Award", displayOrder: 17 },
  { academicYear: "2011–2014", programme: "MBC", studentName: "V. Sivaparvathi Devi", achievement: "Pratibha Puraskar Award", displayOrder: 18 },
  { academicYear: "2011–2014", programme: "MPC", studentName: "P. Hemalatha", achievement: "Pratibha Puraskar Award", displayOrder: 19 },
  { academicYear: "1998–2001", programme: "BCA", studentName: "G. Neelima", achievement: "University Rank Holder", displayOrder: 20 }
];

async function seedRankHolders() {
  console.log("Checking if rank holders are already uploaded in Sanity...");
  try {
    const existing = await client.fetch(`*[_type == "universityRankHolder"]{ _id }`);
    if (existing.length > 0) {
      console.log(`⚠️ University rank holders already exist in Sanity (${existing.length} records). Skipping seeding to prevent duplicates.`);
      return;
    }
  } catch (err) {
    console.error("Failed to fetch existing records:", err);
  }

  console.log("Seeding university rank holders...");
  for (const doc of RANK_HOLDERS_DATA) {
    try {
      const record = {
        _type: "universityRankHolder",
        academicYear: doc.academicYear,
        programme: doc.programme,
        studentName: doc.studentName,
        achievement: doc.achievement,
        displayOrder: doc.displayOrder
      };
      const res = await client.create(record);
      console.log(`Successfully created record for: ${doc.studentName} (${res._id})`);
    } catch (err) {
      console.error(`Failed to create record for: ${doc.studentName}. Error:`, err);
    }
  }
  console.log("🎉 Seeding completed!");
}

seedRankHolders();
