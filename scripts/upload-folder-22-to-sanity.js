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

const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";
const token = SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: "fhjwqub5",
  dataset: "production",
  apiVersion: "2024-03-01",
  token: token,
  useCdn: false,
});

const FOLDER_22 = path.join(__dirname, "../22");

const filesToUpload = [
  { key: "ipr_rep_2526", file: "IPR Cell Activity Report 2025-2026.pdf", title: "IPR Cell Activity Report 2025–2026", year: "2025–2026" },
  { key: "ipr_rep_2425", file: "IPR Cell Acitivity Report 2024-2025.pdf", title: "IPR Cell Activity Report 2024–2025", year: "2024–2025" },
  { key: "ipr_policy", file: "Intellectual Property Rights (IPR ) policy.pdf", title: "Intellectual Property Rights (IPR) Policy" },
  
  { key: "ed_rep_2526", file: "Entrepreneurship Cell Activity Report 2025-2026.pdf", title: "Entrepreneurship Cell Activity Report 2025–2026", year: "2025–2026" },
  { key: "ed_rep_2425", file: "ED Cell Activity Report 2024-2025 (1).pdf", title: "ED Cell Activity Report 2024–2025", year: "2024–2025" },
  { key: "ed_policy", file: "Entrepreurship Policy.pdf", title: "Entrepreneurship Development / Innovation & Start-Up Policy" },
  
  { key: "iic_rep_2526", file: "IIC Annual Activity Report 2025-2026.pdf", title: "IIC Annual Activity Report 2025–2026", year: "2025–2026" },
  { key: "iic_rep_2425", file: "IIC Annual Activity Report 2024-2025.pdf", title: "IIC Annual Activity Report 2024–2025", year: "2024–2025" },
  { key: "iic_policy", file: "Institution Innovation Cell Policy.pdf", title: "Institution Innovation Council (IIC) Policy" }
];

async function uploadPdf(filePath, filename) {
  console.log(`Uploading ${filename} to Sanity...`);
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("file", stream, {
    filename: filename,
    contentType: "application/pdf"
  });
  console.log(`Uploaded ${filename} -> Asset ID: ${asset._id}`);
  return asset;
}

async function main() {
  console.log("=== Starting Sanity Asset Upload for Folder 22 Files ===");
  const uploadedAssets = {};

  for (const item of filesToUpload) {
    const fullPath = path.join(FOLDER_22, item.file);
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      continue;
    }
    const asset = await uploadPdf(fullPath, item.file);
    uploadedAssets[item.key] = {
      ...item,
      assetId: asset._id,
      url: asset.url
    };
  }

  console.log("\n=== Creating / Updating Sanity 'research-singleton' Document ===");
  
  const doc = {
    _id: "research-singleton",
    _type: "research-singleton",
    title: "Research & Innovation",
    lastUpdated: new Date().toISOString(),
    
    iprCell: {
      title: "6. Intellectual Property Rights (IPR) Cell",
      constitutedDate: "1 September 2022",
      description: "The Intellectual Property Rights (IPR) Cell of St. Ann’s College for Women, Gorantla, Guntur, was constituted on 1 September 2022 to create awareness and promote the effective protection of intellectual property among faculty and students. The Cell encourages innovation, creativity, research ethics, academic integrity, and responsible use of intellectual property.\n\nThe IPR Cell provides awareness and guidance on patents, copyrights, trademarks, designs, plagiarism prevention, and related IPR procedures. It also supports research-oriented and innovation-driven academic activities in collaboration with departments and the IQAC.",
      objectives: [
        "Create awareness of Intellectual Property Rights among faculty and students.",
        "Promote creativity, innovation, and original academic contributions.",
        "Provide guidance on patent, copyright, design, and trademark filing procedures.",
        "Encourage ethical research practices and prevent plagiarism.",
        "Facilitate workshops, seminars, and training programmes on IPR and patents.",
        "Support faculty and students in protecting innovative ideas and research outputs.",
        "Foster an innovation-driven and research-oriented academic environment."
      ],
      majorActivities: [
        "Workshops and webinars on Intellectual Property Rights and patent filing.",
        "Expert lectures and FDPs on patents, copyrights, and research ethics.",
        "Awareness programmes on plagiarism and academic integrity.",
        "Guidance on patent and copyright filing procedures.",
        "Innovation, creativity, quiz, and poster-presentation activities.",
        "Student project exhibitions and idea-presentation sessions.",
        "Collaboration with IQAC, departments, experts, and academic institutions.",
        "Maintenance of records and reports of IPR-related activities."
      ],
      expectedOutcomes: [
        "Enhanced awareness of IPR and research ethics.",
        "Greater protection of innovative and creative work.",
        "Promotion of academic integrity and research culture.",
        "Increased student participation in innovation and entrepreneurship.",
        "Strengthening of institutional research and innovation practices."
      ],
      policyDescription: "The institution recognizes Intellectual Property as an important component of academic, research, and innovation development. The IPR Cell facilitates awareness, documentation, protection, and ethical use of intellectual property generated through academic and research activities. Faculty and students are encouraged to protect their original work while maintaining confidentiality and adhering to institutional and ethical standards.",
      policyFileUrl: uploadedAssets["ipr_policy"]?.url || "/documents/research/Intellectual_Property_Rights_IPR_Policy.pdf",
      policyFile: uploadedAssets["ipr_policy"] ? {
        _type: "file",
        asset: { _type: "reference", _ref: uploadedAssets["ipr_policy"].assetId }
      } : undefined,
      activityReports: [
        {
          _key: "ipr_ar_1",
          year: "2025–2026",
          title: "IPR Cell Activity Report 2025–2026",
          fileUrl: uploadedAssets["ipr_rep_2526"]?.url || "/documents/research/IPR_Cell_Activity_Report_2025-2026.pdf",
          file: uploadedAssets["ipr_rep_2526"] ? {
            _type: "file",
            asset: { _type: "reference", _ref: uploadedAssets["ipr_rep_2526"].assetId }
          } : undefined
        },
        {
          _key: "ipr_ar_2",
          year: "2024–2025",
          title: "IPR Cell Activity Report 2024–2025",
          fileUrl: uploadedAssets["ipr_rep_2425"]?.url || "/documents/research/IPR_Cell_Activity_Report_2024-2025.pdf",
          file: uploadedAssets["ipr_rep_2425"] ? {
            _type: "file",
            asset: { _type: "reference", _ref: uploadedAssets["ipr_rep_2425"].assetId }
          } : undefined
        }
      ]
    },

    entrepreneurshipCentre: {
      title: "7. Entrepreneurship Development / Innovation & Start-Up Centre",
      description: "St. Ann’s College for Women, Gorantla, Guntur promotes entrepreneurship, innovation, creativity, leadership, and self-employment among students. The Entrepreneurship Development / Innovation & Start-Up Centre facilitates entrepreneurial learning, skill development, industry interaction, and awareness of start-up opportunities, contributing to employability and women empowerment.",
      vision: "To nurture an entrepreneurial and innovation-oriented environment that empowers women students with creativity, leadership, business skills, and self-employment capabilities.",
      objectives: [
        "Promote entrepreneurial and innovative thinking among students.",
        "Create awareness of start-ups, entrepreneurship, and government support schemes.",
        "Develop leadership, communication, financial literacy, and business management skills.",
        "Encourage innovative ideas, projects, prototypes, and business plans.",
        "Facilitate interaction with entrepreneurs, industry experts, and professionals.",
        "Promote women entrepreneurship and economic empowerment.",
        "Strengthen employability through skill-based and industry-oriented learning."
      ],
      majorActivities: [
        "Entrepreneurship Awareness Programmes",
        "Workshops, seminars, and training programmes",
        "Business idea and business-plan competitions",
        "Skill development and employability programmes",
        "Financial literacy and entrepreneurship awareness",
        "Interaction with entrepreneurs and industry experts",
        "Innovation exhibitions and entrepreneurial activities",
        "Awareness programmes on government schemes and funding opportunities",
        "Add-on and certificate programmes related to entrepreneurship"
      ],
      industryEngagement: "The Centre encourages collaboration with industries, entrepreneurs, professional bodies, and community organizations to provide practical exposure, internships, training, mentoring, and entrepreneurial learning opportunities.",
      womenEntrepreneurship: "As a women’s institution, St. Ann’s encourages students to explore self-employment, entrepreneurship, leadership, financial independence, and innovative career pathways through skill development and entrepreneurship awareness initiatives.",
      expectedOutcomes: [
        "Entrepreneurial mindset and innovative thinking",
        "Leadership and managerial competencies",
        "Creativity and problem-solving skills",
        "Start-up and self-employment awareness",
        "Employability and professional skills",
        "Confidence and economic empowerment among women students"
      ],
      policyDescription: "The Entrepreneurship Development / Innovation & Start-Up Policy of St. Ann’s College for Women, Gorantla, Guntur provides a framework for promoting entrepreneurship, innovation, creativity, and self-employment among students and faculty. The policy encourages entrepreneurial learning, skill development, mentoring, industry interaction, innovative idea development, and start-up awareness. It aims to create a supportive ecosystem that strengthens employability, innovation, leadership, and women entrepreneurship, in alignment with institutional quality enhancement practices.",
      policyFileUrl: uploadedAssets["ed_policy"]?.url || "/documents/research/Entrepreneurship_Policy.pdf",
      policyFile: uploadedAssets["ed_policy"] ? {
        _type: "file",
        asset: { _type: "reference", _ref: uploadedAssets["ed_policy"].assetId }
      } : undefined,
      activityReports: [
        {
          _key: "ed_ar_1",
          year: "2025–2026",
          title: "Entrepreneurship Cell Activity Report 2025–2026",
          fileUrl: uploadedAssets["ed_rep_2526"]?.url || "/documents/research/ED_Cell_Activity_Report_2025-2026.pdf",
          file: uploadedAssets["ed_rep_2526"] ? {
            _type: "file",
            asset: { _type: "reference", _ref: uploadedAssets["ed_rep_2526"].assetId }
          } : undefined
        },
        {
          _key: "ed_ar_2",
          year: "2024–2025",
          title: "ED Cell Activity Report 2024–2025",
          fileUrl: uploadedAssets["ed_rep_2425"]?.url || "/documents/research/ED_Cell_Activity_Report_2024-2025.pdf",
          file: uploadedAssets["ed_rep_2425"] ? {
            _type: "file",
            asset: { _type: "reference", _ref: uploadedAssets["ed_rep_2425"].assetId }
          } : undefined
        }
      ]
    },

    iicCell: {
      title: "8. Institution Innovation Council (IIC) / Institution–Industry Cell",
      description: "The Institution Innovation Council (IIC) / Institution–Industry Cell of St. Ann’s College for Women, Gorantla, Guntur promotes innovation, entrepreneurship, creativity, skill development, and industry-oriented learning among students and faculty. The Cell facilitates industry interaction, expert engagement, innovative projects, start-up awareness, incubation support, and academic–industry collaboration in association with the IQAC and academic departments.",
      objectives: [
        "Promote innovation, creativity, and entrepreneurship",
        "Develop problem-solving and design-thinking skills",
        "Encourage innovative projects and prototypes",
        "Strengthen industry–academia interaction",
        "Promote start-up and incubation awareness",
        "Facilitate research, consultancy, and skill development",
        "Enhance employability and industry readiness"
      ],
      keyActivities: [
        "Innovation and entrepreneurship programmes",
        "Workshops, seminars, FDPs, and expert lectures",
        "Hackathons, idea competitions, and project exhibitions",
        "Industry interaction and industrial visits",
        "Start-up and incubation awareness programmes",
        "Skill development and employability training",
        "Industry-oriented projects and collaborations",
        "MoUs and collaborative initiatives"
      ],
      expectedOutcomes: "The Cell aims to foster an innovative and entrepreneurial mindset, enhance students' creativity, leadership, problem-solving and professional skills, and strengthen industry–academia collaboration and employability.",
      policyDescription: "The Institution has formulated an Institution Innovation Council (IIC) Policy to foster a culture of innovation, entrepreneurship, research, creativity, and industry collaboration. The policy provides a framework for promoting innovative ideas, mentoring, prototype development, start-up awareness, industry interaction, incubation activities, and student participation in innovation-oriented programmes.",
      policyFileUrl: uploadedAssets["iic_policy"]?.url || "/documents/research/Institution_Innovation_Cell_Policy.pdf",
      policyFile: uploadedAssets["iic_policy"] ? {
        _type: "file",
        asset: { _type: "reference", _ref: uploadedAssets["iic_policy"].assetId }
      } : undefined,
      activityReports: [
        {
          _key: "iic_ar_1",
          year: "2025–2026",
          title: "IIC Annual Activity Report 2025–2026",
          fileUrl: uploadedAssets["iic_rep_2526"]?.url || "/documents/research/IIC_Activity_Report_2025-2026.pdf",
          file: uploadedAssets["iic_rep_2526"] ? {
            _type: "file",
            asset: { _type: "reference", _ref: uploadedAssets["iic_rep_2526"].assetId }
          } : undefined
        },
        {
          _key: "iic_ar_2",
          year: "2024–2025",
          title: "IIC Annual Activity Report 2024–2025",
          fileUrl: uploadedAssets["iic_rep_2425"]?.url || "/documents/research/IIC_Activity_Report_2024-2025.pdf",
          file: uploadedAssets["iic_rep_2425"] ? {
            _type: "file",
            asset: { _type: "reference", _ref: uploadedAssets["iic_rep_2425"].assetId }
          } : undefined
        }
      ]
    }
  };

  const result = await client.createOrReplace(doc);
  console.log("\n=== Sanity document successfully saved and published! ===");
  console.log("Document ID:", result._id);
  console.log("Updated at:", result._updatedAt);
}

main().catch((err) => {
  console.error("Upload error:", err);
  process.exit(1);
});
