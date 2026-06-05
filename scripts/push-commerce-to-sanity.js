const { createClient } = require("@sanity/client");
const crypto = require("crypto");

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const DEFAULT_TOKEN = "sk2B6oq7TV44M3rCRTu17hThjlyGyarJzispWzZsPMcc6LUgrAcxlKKYnJPiSPCizWCGIkwCCYmXTwzDHZaVTxrDkyhFAyxNnStQZj6wCcxo0z1aaz4tnH8vgMPApmF5Z8u7rXN87IVVPA1rYJPX4VoDSDF4ekCdENzvyRLSraWWowOhBKOw";

const token = process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

if (!process.env.SANITY_WRITE_TOKEN) {
  console.warn("⚠️ WARNING: SANITY_WRITE_TOKEN environment variable not set. Using default token.");
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: token,
  useCdn: false,
});

const commerceData = {
  _id: "department-of-commerce",
  _type: "department",
  name: "Department of Commerce",
  slug: {
    _type: "slug",
    current: "department-of-commerce",
  },
  established: "1997-98",
  tagline: "Commerce Wonder World – Emphasizing Holistic Student Development",
  description: "The Department of Commerce was established in the academic year 1997–98 in response to the growing demand for commerce education. It initially offered the B.Com (General) programme and later introduced the restructured curriculum in 1999–2000, aligning with evolving academic and industry needs. The department is committed to delivering quality education with a strong practical orientation, preparing students for careers in business, finance, entrepreneurship, and research.",
  vision: "To achieve academic excellence with a strong commitment to providing quality education in commerce, management, and related fields, while fostering a holistic approach towards life, environment, and global competitiveness.",
  mission: [
    "To empower students with knowledge, skills, and practical training",
    "To nurture entrepreneurial spirit and enhance employability",
    "To promote learning through doing methodologies",
    "To develop socially responsible individuals with global outlook",
    "To prepare students to meet modern challenges with confidence and competence",
  ],
  programmes: [
    {
      title: "B.Com Honours (General)",
      intake: "20 (14 Convener + 6 Management)",
      duration: "3 Years (6 Semesters)",
    },
    {
      title: "B.Com Honours (Comp Apps)",
      intake: "80 (56 Convener + 24 Management)",
      duration: "3 Years (6 Semesters)",
    },
  ],
  valueAddedCourses: [
    {
      sNo: 1,
      title: "Tally & GST Accounting",
      duration: "40 Hours",
      agency: "Nitya Computers",
    },
    {
      sNo: 2,
      title: "Income Tax Practice",
      duration: "---",
      agency: "Tax Consultant",
    },
    {
      sNo: 3,
      title: "Banking & Financial Services",
      duration: "---",
      agency: "Bank Officials",
    },
    {
      sNo: 4,
      title: "Digital Marketing & E-Commerce",
      duration: "---",
      agency: "Industry Trainer",
    },
    {
      sNo: 5,
      title: "Entrepreneurship Development Programme",
      duration: "---",
      agency: "ED Cell",
    },
  ],
  mous: [
    {
      title: "ABC Chartered Accountants Firm",
      type: "MoU",
      duration: "3 Years",
      purpose: "GST & Accounting Training",
    },
  ],
  bestPractices: [
    {
      title: "1. GST & Accounting Practical Training",
      category: "Skill-Oriented Learning Initiative",
      objectives: [
        "Provide hands-on training in GST & accounting practices",
        "Enhance employability in accounting, taxation, and finance",
        "Bridge gap between theoretical knowledge and industry requirements",
      ],
      practice: [
        "Training in GST concepts, billing, and return filing procedures",
        "Hands-on sessions using accounting software such as Tally",
        "Workshops by practicing accountants and tax consultants",
      ],
      success: [
        "Students gaining practical competency in GST & accounting",
        "Increased placement opportunities in accounting firms",
      ],
    },
    {
      title: "2. Entrepreneurship & Small Business Development",
      category: "Entrepreneurial Mindset",
      objectives: [
        "Develop entrepreneurial mindset among students",
        "Promote self-employment and local business initiatives",
        "Build leadership and managerial skills",
      ],
      practice: [
        "Business plan competitions and startup idea presentations",
        "Workshops on small business management and digital marketing",
        "Interaction with local entrepreneurs and women business owners",
      ],
      success: [
        "Students presenting innovative business ideas",
        "Alumni initiating small business ventures",
      ],
    },
    {
      title: "3. Financial Literacy & Community Outreach Programme",
      category: "Social Responsibility",
      objectives: [
        "Promote financial awareness in rural communities",
        "Educate students on practical financial management",
        "Encourage social responsibility",
      ],
      practice: [
        "Conducting financial literacy camps in nearby villages",
        "Awareness programmes on savings, budgeting, and digital payments",
        "Student participation in outreach and extension activities",
      ],
      success: [
        "Increased awareness among community participants",
        "Active student involvement in outreach programmes",
      ],
    },
  ],
  activities: [
    {
      label: "Academic Enrichment",
      desc: "Seminars, guest lectures, and workshops on accounting, taxation, and finance.",
    },
    {
      label: "Skill Development",
      desc: "Tally & GST training sessions, and interview preparation workshops.",
    },
    {
      label: "Student-Centric",
      desc: "Business quizzes, debates, commerce exhibitions and project displays.",
    },
    {
      label: "Extension & Outreach",
      desc: "Financial literacy programmes and consumer awareness campaigns in rural areas.",
    },
    {
      label: "Industry Interaction",
      desc: "Industrial visits, internships and interaction sessions with entrepreneurs.",
    },
  ],
  infrastructure: [
    "Commerce Lab / Computer Lab",
    "ICT-enabled classrooms",
    "Library resources (books, journals)",
    "Internet & digital learning facilities",
  ],
  careerOpps: [
    "Accounting & Taxation",
    "Banking & Finance",
    "Entrepreneurship",
    "Higher Education (M.Com, MBA, CA, etc.)",
  ],
};

function addKeysToObj(obj) {
  if (!obj || typeof obj !== "object") return;
  
  if (Array.isArray(obj)) {
    for (let item of obj) {
      if (item && typeof item === "object") {
        if (!item._key) {
          item._key = crypto.randomBytes(6).toString("hex");
        }
        addKeysToObj(item);
      }
    }
  } else {
    for (let k in obj) {
      if (typeof obj[k] === "object") {
        addKeysToObj(obj[k]);
      }
    }
  }
}

async function run() {
  console.log("Pushing Department of Commerce content to Sanity...");
  try {
    // Add unique _key to array items for Sanity compliance
    addKeysToObj(commerceData);

    const res = await client.createOrReplace(commerceData);
    console.log("✅ Success! Published Department of Commerce. ID:", res._id);
  } catch (err) {
    console.error("❌ Failed to push Department of Commerce:", err.message);
    process.exit(1);
  }
}

run();
