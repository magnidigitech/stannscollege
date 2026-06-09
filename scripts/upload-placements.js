const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const DEFAULT_TOKEN = "skIDM4mir0HhVshaJJ0gsm2bjOLItYJiS9Rs169u6B3YGZ4ohE4ihJRGkh6VPS3p11l5Y26posS8WE34mPhCHPfg23P8dDr7KJJYWai4recB0SXMsQ66QYWcjc0XHZEuKMKkL3Ac0aoQL9dyqnEY1127e2NdCx3lVJBZcfXJWevlgOdZIzu4";

const token = process.env.SANITY_WRITE_TOKEN || DEFAULT_TOKEN;

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: token,
  useCdn: false,
});

const BASE_DIR = "/Users/venkatavivek/stanns/7.Placements & Industry Linkages";
const ANNUAL_REPORTS_DIR = path.join(BASE_DIR, "I. Training & Placements/2.Annual Reprots");
const MOUS_2024_2025_DIR = path.join(BASE_DIR, "II Industry Linakges & Employability/MOUS 2024-2025");
const MOUS_2025_2026_DIR = path.join(BASE_DIR, "II Industry Linakges & Employability/MOUS 2025-2026");

const annualReportsMapping = {
  "2023-2024": path.join(ANNUAL_REPORTS_DIR, "T&P Annual Report 2023-2024.pdf"),
  "2024-2025": path.join(ANNUAL_REPORTS_DIR, "T & P Annual Report 2024-2025.pdf"),
  "2025-2026": path.join(ANNUAL_REPORTS_DIR, "T & P Annual Report 2025-2026.pdf"),
};

async function uploadFileAsset(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Local file does not exist: ${filePath}`);
    return null;
  }

  console.log(`📤 Uploading file: ${path.basename(filePath)}...`);
  try {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("file", stream, {
      filename: path.basename(filePath),
    });
    console.log(`✅ Uploaded asset: ${asset._id} -> ${asset.url}`);
    return asset;
  } catch (err) {
    console.error(`❌ Failed to upload asset for ${filePath}:`, err.message);
    return null;
  }
}

async function scanAndUploadMoUs(dirPath) {
  const mapping = {};
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️ Warning: MoU directory not found: ${dirPath}`);
    return mapping;
  }
  const files = fs.readdirSync(dirPath);
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith(".pdf"));
  console.log(`Found ${pdfFiles.length} PDFs in ${path.basename(dirPath)}`);

  for (const filename of pdfFiles) {
    const match = filename.match(/^(\d+)/);
    if (!match) {
      console.warn(`⚠️ Warning: Could not match SNo for file: ${filename}`);
      continue;
    }
    const sNo = parseInt(match[1], 10);
    const filePath = path.join(dirPath, filename);
    const asset = await uploadFileAsset(filePath);
    if (asset && asset.url) {
      mapping[sNo] = asset.url;
    }
  }
  return mapping;
}

function cleanMarkdown(text) {
  let cleaned = text.replace(/!\[\]\(media\/[^)]+\)\{[^}]+\}/g, "");
  cleaned = cleaned.replace(/!\[\]\(media\/[^)]+\)/g, "");
  cleaned = cleaned.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  cleaned = cleaned.replace(/^[•\t]\s*/gm, "- ");
  return cleaned.trim();
}

function parseGridTable(contentLines) {
  const rows = [];
  let headers = [];
  let currentRow = null;
  let lastLineWasSeparator = true;

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i].trim();

    const isSeparator = line.includes("+") && (line.includes("-") || line.includes("="));
    if (isSeparator) {
      lastLineWasSeparator = true;
      continue;
    }

    if (line.startsWith("|")) {
      const cells = line.split("|").map(c => c.trim()).slice(1, -1);
      
      const isHeader = cells.some(c => c.toLowerCase().includes("s. no") || c.toLowerCase().includes("s.no") || c.toLowerCase().includes("academic year") || c.toLowerCase().includes("academic\nyear"));
      if (isHeader) {
        headers = cells.map(c => c.replace(/\*/g, "").trim());
        lastLineWasSeparator = true;
        continue;
      }

      if (lastLineWasSeparator) {
        if (currentRow) {
          if (!currentRow[0] && rows.length > 0) {
            currentRow[0] = rows[rows.length - 1][0];
          }
          rows.push(currentRow);
        }
        currentRow = cells.map(c => c.replace(/\\/g, "").trim());
        lastLineWasSeparator = false;
      } else {
        if (currentRow) {
          for (let col = 0; col < cells.length; col++) {
            if (cells[col]) {
              currentRow[col] = (currentRow[col] + " " + cells[col].replace(/\\/g, "")).trim();
            }
          }
        }
      }
    }
  }

  if (currentRow) {
    if (!currentRow[0] && rows.length > 0) {
      currentRow[0] = rows[rows.length - 1][0];
    }
    rows.push(currentRow);
  }

  return { headers, rows };
}

function convertAllTablesToParagraphs(content, mous_2024_2025 = {}, mous_2025_2026 = {}, isMoU = false) {
  const lines = content.split("\n");
  const outputLines = [];
  let i = 0;
  let tableCount = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Grid Table
    if (trimmed.startsWith("+---") || trimmed.startsWith("+===")) {
      const tableLines = [];
      while (i < lines.length) {
        const currentLine = lines[i];
        const currentTrimmed = currentLine.trim();
        if (currentTrimmed.startsWith("|") || currentTrimmed.startsWith("+") || currentTrimmed.startsWith(":") || currentTrimmed.startsWith("=")) {
          tableLines.push(currentLine);
          i++;
        } else {
          break;
        }
      }

      const parsed = parseGridTable(tableLines);
      if (parsed.headers.length > 0 && parsed.rows.length > 0) {
        const chunks = [];
        parsed.headers.forEach(h => chunks.push(`__${h}__`));
        
        parsed.rows.forEach(row => {
          if (isMoU) {
            const sNo = parseInt(row[0], 10);
            const mapping = tableCount === 0 ? mous_2025_2026 : mous_2024_2025;
            const fileUrl = mapping[sNo];
            if (fileUrl) {
              row[row.length - 1] = `[View PDF](${fileUrl})`;
            } else {
              row[row.length - 1] = "—";
            }
          }
          row.forEach(cell => {
            chunks.push(cell || "—");
          });
        });
        
        outputLines.push("");
        outputLines.push(chunks.join("\n\n"));
        outputLines.push("");
        tableCount++;
      } else {
        outputLines.push(...tableLines);
      }
      continue;
    }

    // 2. Simple Table (Pandoc style)
    if (/^\s*-{10,}\s*$/.test(line) && i + 2 < lines.length) {
      let underHeaderIdx = -1;
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        if (/^\s*(-+\s+)+-+\s*$/.test(lines[j])) {
          underHeaderIdx = j;
          break;
        }
      }

      if (underHeaderIdx !== -1) {
        let bottomIdx = -1;
        for (let j = underHeaderIdx + 1; j < lines.length; j++) {
          if (/^\s*-{10,}\s*$/.test(lines[j])) {
            bottomIdx = j;
            break;
          }
        }

        if (bottomIdx !== -1) {
          const headerLines = lines.slice(i + 1, underHeaderIdx);
          const underHeaderLine = lines[underHeaderIdx];
          const bodyLines = lines.slice(underHeaderIdx + 1, bottomIdx);

          const columnSpans = [];
          const regex = /-+/g;
          let match;
          while ((match = regex.exec(underHeaderLine)) !== null) {
            columnSpans.push({
              start: match.index,
              end: match.index + match[0].length
            });
          }

          const headers = columnSpans.map(() => "");
          headerLines.forEach(hLine => {
            columnSpans.forEach((span, colIdx) => {
              const text = hLine.substring(span.start, span.end).trim();
              if (text) {
                headers[colIdx] = (headers[colIdx] + " " + text).trim();
              }
            });
          });

          const rows = [];
          let currentRow = null;

          bodyLines.forEach(bLine => {
            const trimmedBLine = bLine.trim();
            if (!trimmedBLine) {
              if (currentRow) {
                if (!currentRow[0] && rows.length > 0) {
                  currentRow[0] = rows[rows.length - 1][0];
                }
                rows.push(currentRow);
                currentRow = null;
              }
              return;
            }

            const cells = columnSpans.map((span, colIdx) => {
              const nextSpan = columnSpans[colIdx + 1];
              const endIdx = nextSpan ? nextSpan.start : bLine.length;
              return bLine.substring(span.start, endIdx).trim();
            });

            if (!currentRow) {
              currentRow = cells;
            } else {
              for (let colIdx = 0; colIdx < cells.length; colIdx++) {
                if (cells[colIdx]) {
                  currentRow[colIdx] = (currentRow[colIdx] + " " + cells[colIdx]).trim();
                }
              }
            }
          });

          if (currentRow) {
            if (!currentRow[0] && rows.length > 0) {
              currentRow[0] = rows[rows.length - 1][0];
            }
            rows.push(currentRow);
          }

          const chunks = [];
          headers.forEach(h => chunks.push(`__${h.replace(/\*\*/g, "").trim()}__`));
          rows.forEach(row => {
            row.forEach(cell => {
              chunks.push(cell.replace(/\*\*/g, "").trim() || "—");
            });
          });

          outputLines.push("");
          outputLines.push(chunks.join("\n\n"));
          outputLines.push("");

          i = bottomIdx + 1;
          continue;
        }
      }
    }

    outputLines.push(line);
    i++;
  }

  return outputLines.join("\n");
}

const sectionsDefinition = [
  // Group 1
  {
    id: "about-cell",
    title: "About Training & Placement Cell",
    content: `__About Training & Placement Cell__

The Training & Placement Cell at St. Ann's College for Women acts as a vital bridge between academic learning and corporate expectations. The cell is dedicated to enhancing the employability of students by equipping them with industry-relevant skills and providing them with excellent placement opportunities in reputed organizations.

With a structured approach to career progression, the cell organizes training programs, workshops, pre-placement talks, and campus recruitment drives throughout the academic year. Under the guidance of our Principal, Sr. Sandhya T, and Placement Officer, Dr. J. Pratapa Reddy, the cell ensures that every student gets the necessary exposure and guidance to achieve their career goals.

__Core Objectives:__

- To provide career counseling and guidance to students for higher studies and employment opportunities.
- To organize on-campus and off-campus recruitment drives in collaboration with leading corporate houses and industries.
- To establish MoUs with government bodies, industries, and professional placement agencies for internships and training.
- To conduct systematic training in soft skills, communication, quantitative aptitude, and logical reasoning.
- To assist students in building professional resumes and developing confident interview-facing skills.`
  },
  {
    id: "annual-reports",
    title: "Annual Reports",
    file: "I. Training & Placements/2.Annual Reprots/Annual Reports of TP.md"
  },
  {
    id: "placement-statistics",
    title: "Placement Statistics",
    file: "I. Training & Placements/3.Placeemtns Statistics/Placement Statistics.md"
  },
  {
    id: "recruitment-drives",
    title: "Campus Recruitment Drives",
    file: "I. Training & Placements/4.Campus Placement Drvies.md"
  },
  {
    id: "skill-development",
    title: "Skill Development Initiatives",
    file: "I. Training & Placements/5.Skill Development Initiatives.md"
  },
  {
    id: "soft-skills",
    title: "Soft Skills & Personality Development",
    file: "I. Training & Placements/6.Soft Skills & Personality Development.md"
  },
  {
    id: "internships-exposure",
    title: "Internships & Industry Exposure",
    file: "I. Training & Placements/7.Internships & Industry Exposure.md"
  },
  {
    id: "competitive-coaching",
    title: "Competitive Exam Coaching",
    files: [
      "I. Training & Placements/8.Competitive Exam Coaching.md",
      "I. Training & Placements/8.Competitive Examination Achievements Table format.md"
    ]
  },
  {
    id: "career-guidance",
    title: "Career Guidance & Counselling",
    file: "I. Training & Placements/9.Career Guidance.md"
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Development",
    file: "I. Training & Placements/10.Entrepreneurship Development.md"
  },
  {
    id: "placement-partnerships",
    title: "Industry Linkages / Placement Partnerships",
    file: "I. Training & Placements/11.Industry Linkages.md"
  },
  {
    id: "capacity-building",
    title: "Capacity Building & Skill Enhancement",
    file: "I. Training & Placements/12.Capacity Building.md"
  },
  {
    id: "alumni-support",
    title: "Alumni Career Support",
    file: "I. Training & Placements/13.Alumni Career Support.md"
  },
  {
    id: "training-calendar",
    title: "Training Calendar / Activity Gallery",
    file: "I. Training & Placements/14.Training Calendar.md"
  },
  
  // Group 2
  {
    id: "industry-partnerships",
    title: "Industry Partnerships",
    file: "II Industry Linakges & Employability/1.Industry Partnerships.md"
  },
  {
    id: "internships-apprenticeships",
    title: "Internships & Apprenticeships",
    file: "II Industry Linakges & Employability/2.Internships & Apprenticeships.md"
  },
  {
    id: "mous-agreements",
    title: "MoUs / Agreements",
    file: "II Industry Linakges & Employability/3.MoU agreemetns 2025-2026 & 2024-2025 - Copy.md"
  },
  {
    id: "mou-activities",
    title: "MoU Activities",
    file: "II Industry Linakges & Employability/4.MoU Activites  2025-2026 & 2024-2025.md"
  },
  {
    id: "csr-initiatives",
    title: "CSR Initiatives",
    file: "II Industry Linakges & Employability/5.CSR Initiatvies.md"
  },
  {
    id: "industry-placement-partnerships",
    title: "Placement Partnerships",
    file: "II Industry Linakges & Employability/6.Placement Partnerships.md"
  },
  {
    id: "certifications",
    title: "Professional Certification Programmes",
    file: "II Industry Linakges & Employability/7.Professional Certification Programmes.md"
  },
  {
    id: "expert-lectures",
    title: "Industry Expert Lectures",
    file: "II Industry Linakges & Employability/8.Industry Expert Lectures.md"
  },
  {
    id: "industrial-visits",
    title: "Industrial Visits",
    file: "II Industry Linakges & Employability/9.Industrial Visits.md"
  },
  {
    id: "skill-training",
    title: "Skill-Based Training Programmes",
    file: "II Industry Linakges & Employability/10.Skill Based Training Programmes.md"
  },
  {
    id: "employability-activities",
    title: "Employability Enhancement Activities",
    file: "II Industry Linakges & Employability/11.Employability Enhancement Activities.md"
  },
  
  // Group 3
  {
    id: "international-collaborations",
    title: "International Collaborations",
    file: "III Internationalization & Global Outreach/1.International Collaborations.md"
  },
  {
    id: "internationalization-policy",
    title: "Internationalization Policy",
    file: "III Internationalization & Global Outreach/2.Internation Policy.md"
  },
  {
    id: "accreditations-memberships",
    title: "International Accreditations & Memberships",
    file: "III Internationalization & Global Outreach/3.International Accreditations & Memberships.md"
  },
  {
    id: "global-alumni",
    title: "Global Alumni & Outreach Engagement",
    file: "III Internationalization & Global Outreach/4.GLobal LAumni & Outreach ENgangement.md"
  },
  {
    id: "global-research",
    title: "Global Research Collaborations",
    file: "III Internationalization & Global Outreach/5.Global Research Colloborations.md"
  },
  {
    id: "student-faculty-exchange",
    title: "Student Exchange / Faculty Exchange",
    file: "III Internationalization & Global Outreach/6.Studetn Exchange.md"
  },
  {
    id: "webinars-conferences",
    title: "International Webinars & Conferences",
    file: "III Internationalization & Global Outreach/7.Intenrational Webinars & Conferences.md"
  },
  {
    id: "cross-cultural-learning",
    title: "Cross-Cultural Learning Activities",
    file: "III Internationalization & Global Outreach/8.Cross-Cultural Learning Activities.md"
  }
];

async function run() {
  console.log("=========================================");
  console.log("🚀 STARTING PLACEMENTS & INDUSTRY LINKAGES MIGRATION");
  console.log("=========================================");

  // 1. Upload Annual Reports
  console.log("\n📁 Uploading Annual Reports...");
  const uploadedAnnualReports = {};
  for (const [year, filePath] of Object.entries(annualReportsMapping)) {
    const asset = await uploadFileAsset(filePath);
    if (asset && asset.url) {
      uploadedAnnualReports[year] = asset.url;
    }
  }

  // 2. Upload MoUs
  console.log("\n📁 Uploading 2024-2025 MoUs...");
  const mous_2024_2025 = await scanAndUploadMoUs(MOUS_2024_2025_DIR);
  
  console.log("\n📁 Uploading 2025-2026 MoUs...");
  const mous_2025_2026 = await scanAndUploadMoUs(MOUS_2025_2026_DIR);

  // 3. Process and push each of the 33 sections
  console.log("\n⚡ Processing and publishing all 33 sections to Sanity...");

  for (const s of sectionsDefinition) {
    let finalContent = "";
    if (s.content) {
      finalContent = s.content;
    } else if (s.file) {
      const fullPath = path.join(BASE_DIR, s.file);
      const content = fs.readFileSync(fullPath, "utf8");
      const isMoU = s.file.includes("MoU agreemetns") || s.file.includes("MoU Activites");
      finalContent = convertAllTablesToParagraphs(content, mous_2024_2025, mous_2025_2026, isMoU);
    } else if (s.files) {
      const compiled = s.files.map(f => fs.readFileSync(path.join(BASE_DIR, f), "utf8")).join("\n\n");
      finalContent = convertAllTablesToParagraphs(compiled, mous_2024_2025, mous_2025_2026, false);
    }

    // Replace annual report names with Sanity URLs in markdown text
    finalContent = finalContent.replace(/\/documents\/placements\/T & P Annual Report 2024-2025\.pdf/g, uploadedAnnualReports["2024-2025"] || "#");
    finalContent = finalContent.replace(/\/documents\/placements\/T & P Annual Report 2025-2026\.pdf/g, uploadedAnnualReports["2025-2026"] || "#");
    finalContent = finalContent.replace(/\/documents\/placements\/T&P Annual Report 2023-2024\.pdf/g, uploadedAnnualReports["2023-2024"] || "#");
    finalContent = finalContent.replace(/T & P Annual Report 2024-2025\.pdf/g, uploadedAnnualReports["2024-2025"] || "#");
    finalContent = finalContent.replace(/T & P Annual Report 2025-2026\.pdf/g, uploadedAnnualReports["2025-2026"] || "#");
    finalContent = finalContent.replace(/T&P Annual Report 2023-2024\.pdf/g, uploadedAnnualReports["2023-2024"] || "#");

    const doc = {
      _id: `placement-section-${s.id}`,
      _type: "placementSection",
      id: s.id,
      title: s.title,
      content: cleanMarkdown(finalContent)
    };

    try {
      console.log(`Pushing section [${s.id}] "${s.title}" to Sanity...`);
      const res = await client.createOrReplace(doc);
      console.log(`⚡ Published document: ${res._id}`);
    } catch (err) {
      console.error(`❌ Failed to publish section [${s.id}]:`, err.message);
    }
  }

  console.log("\n=========================================");
  console.log("🎉 PLACEMENTS & INDUSTRY LINKAGES MIGRATION COMPLETED!");
  console.log("=========================================");
}

run();
