const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 1. Ensure pdf-parse dependency is present dynamically
try {
  require.resolve("pdf-parse");
} catch (e) {
  console.log("📦 Installing 'pdf-parse' library for parsing PDFs...");
  execSync("npm install --no-save pdf-parse", { stdio: "inherit" });
}
const pdfLib = require("pdf-parse");
const { createClient } = require("@sanity/client");

async function parsePdfText(buffer) {
  if (typeof pdfLib === "function") {
    const data = await pdfLib(buffer);
    return data.text;
  } else if (pdfLib.PDFParse) {
    const parser = new pdfLib.PDFParse({ data: buffer });
    const data = await parser.getText();
    return data.text;
  } else {
    throw new Error("Unable to locate a valid PDF parsing function or class in 'pdf-parse'");
  }
}

// Sanity client setup using the write token found in the project configuration
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
const PUBLIC_DOCS_DIR = "/Users/venkatavivek/stanns/public/documents/placements";
const STATIC_DATA_PATH = "/Users/venkatavivek/stanns/src/components/placements/staticData.ts";

// Helper to ensure target directories exist
if (!fs.existsSync(PUBLIC_DOCS_DIR)) fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true });

// OCR/Ligature corrections mapping to fix scanning artifacts
const corrections = {
  'ac9vi9es': 'activities',
  'ins9tu9on': 'institution',
  'highligh9ng': 'highlighting',
  'con9nuous': 'continuous',
  'contribu9on': 'contribution',
  'par9cipa9on': 'participation',
  'compe99ve': 'competitive',
  'examina9on': 'examination',
  'SoL': 'Soft',
  'ac9vity': 'activity',
  'singed': 'signed',
  'agreemetns': 'agreements',
  'Activites': 'Activities',
  'Placeemtns': 'Placements',
  'Placemetn': 'Placement',
  'Reprots': 'Reports'
};

function applyCorrections(text) {
  if (!text) return '';
  let cleaned = text;
  for (const [bad, good] of Object.entries(corrections)) {
    const reg = new RegExp(bad, 'gi');
    cleaned = cleaned.replace(reg, good);
  }
  return cleaned;
}

// Clean markdown text format helper
function formatRawPdfText(text) {
  if (!text) return '';
  
  // Clean ligatures first
  let cleaned = applyCorrections(text);
  
  // Clean up footers
  cleaned = cleaned.replace(/\d+\s*\|St\.Ann’s College for Women[^-]*-MOUs/gi, '');
  cleaned = cleaned.replace(/\d+\s*\|St\.Ann’s College for Women[^-]*/gi, '');
  cleaned = cleaned.replace(/(?:\d+\s*)?--?\s*\d+\s*of\s*\d+(?:\s*--?)?|(?:\d+\s*)?\d+\s*of\s*\d+\s*--?/gi, ''); // Clean pagination footers
  cleaned = cleaned.replace(/==Start of PDF==|==Screenshot for page \d+==|==Start of OCR for page \d+==|==End of OCR for page \d+==|==End of PDF==/g, '');

  const lines = cleaned.split('\n');
  const output = [];
  let inList = false;
  let currentParagraph = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Check if line is a header
    const isHeader = 
      line.toUpperCase() === line && line.length > 3 && !line.startsWith('•') ||
      /^(Major Skill Areas|Activities Conducted|Core Objectives|Focus Areas|Internship Opportunities|Coaching Support|Coaching Activities|Guidance Activities|Entrepreneurship Initiatives|Key Objectives|Areas Covered|Alumni Support Activities|Activities Included|Contact Information|Objectives|Benefits to Students|Institutional Commitment)/i.test(line) ||
      /^(Group \d+|Criterion \d+|[A-Z\d\.\-\s]{5,})$/.test(line);
      
    const isListItem = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');

    if (isHeader) {
      if (currentParagraph.length > 0) {
        output.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
      inList = false;
      const cleanHeader = line.replace(/^[\*\s_\-#]+/g, '').trim();
      output.push(`\n**${cleanHeader}**\n`);
    } else if (isListItem) {
      if (currentParagraph.length > 0) {
        output.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
      inList = true;
      const cleanItem = line.replace(/^[•\-\*\t\s]+/g, '').trim();
      output.push(`- ${cleanItem}`);
    } else {
      if (inList) {
        const firstChar = line.charAt(0);
        if (firstChar === firstChar.toLowerCase() && isNaN(firstChar)) {
          if (output.length > 0) {
            output[output.length - 1] += ' ' + line;
          } else {
            output.push(line);
          }
          continue;
        } else {
          inList = false;
        }
      }
      currentParagraph.push(line);
    }
  }

  if (currentParagraph.length > 0) {
    output.push(currentParagraph.join(' '));
  }

  return output.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

// Upload file asset to Sanity
async function uploadFileAsset(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Local file does not exist: ${filePath}`);
    return null;
  }
  try {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("file", stream, {
      filename: path.basename(filePath),
    });
    return asset;
  } catch (err) {
    console.error(`❌ Failed to upload asset for ${filePath}:`, err.message);
    return null;
  }
}

// Copy file locally to public directory and return public path
function copyFileToPublic(filePath, subfolder = "") {
  if (!fs.existsSync(filePath)) return null;
  const destSubDir = subfolder ? path.join(PUBLIC_DOCS_DIR, subfolder) : PUBLIC_DOCS_DIR;
  if (!fs.existsSync(destSubDir)) fs.mkdirSync(destSubDir, { recursive: true });
  
  const destPath = path.join(destSubDir, path.basename(filePath));
  fs.copyFileSync(filePath, destPath);
  const relativePath = subfolder 
    ? `/documents/placements/${subfolder}/${path.basename(filePath)}` 
    : `/documents/placements/${path.basename(filePath)}`;
  return relativePath;
}

// Scan and upload MoUs
async function scanMoUs(dirPath, subfolder) {
  const mapping = {};
  if (!fs.existsSync(dirPath)) return mapping;
  
  const files = fs.readdirSync(dirPath);
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith(".pdf"));
  console.log(`📂 Scanning ${pdfFiles.length} MoU files in ${path.basename(dirPath)}...`);

  for (const filename of pdfFiles) {
    const match = filename.match(/^(\d+)/);
    if (!match) continue;
    const sNo = parseInt(match[1], 10);
    const filePath = path.join(dirPath, filename);
    
    // Copy locally first as fallback
    const localUrl = copyFileToPublic(filePath, subfolder);
    
    // Upload to Sanity
    const asset = await uploadFileAsset(filePath);
    mapping[sNo] = asset ? asset.url : localUrl;
  }
  return mapping;
}

// Parsing function to split MoU PDF text into individual structured rows
function parseMoURowText(rawText, sno) {
  let cleanText = rawText
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\d+\s*\|St\.Ann’s College for Women[^-]*-MOUs/gi, '')
    .replace(/(?:\d+\s*)?--?\s*\d+\s*of\s*\d+(?:\s*--?)?|(?:\d+\s*)?\d+\s*of\s*\d+\s*--?/gi, '') // Clean pagination footers
    .trim();

  const dateRegex = /\b\d{2}-\d{2}-\d{4}\b/g;
  const dates = [];
  let dateMatch;
  while ((dateMatch = dateRegex.exec(cleanText)) !== null) {
    dates.push({ date: dateMatch[0], index: dateMatch.index });
  }

  let deptAndCompany = '';
  let dateStr = '';
  let durationStr = '';
  let purposeAndYears = '';

  if (dates.length > 0) {
    deptAndCompany = cleanText.substring(0, dates[0].index).trim();
    if (dates.length >= 2) {
      dateStr = dates[0].date;
      durationStr = dates[1].date;
      purposeAndYears = cleanText.substring(dates[1].index + dates[1].date.length).trim();
    } else {
      dateStr = dates[0].date;
      durationStr = '—';
      purposeAndYears = cleanText.substring(dates[0].index + dates[0].date.length).trim();
    }
  } else {
    deptAndCompany = cleanText;
    dateStr = '—';
    durationStr = '—';
    purposeAndYears = '';
  }

  let department = '';
  let company = '';
  
  const deptMatch = deptAndCompany.match(/^(Department of\s+[\w\s&]+St\.\s*Ann['’]?s\s+College\s+for\s+Women,\s*(Gorantla,)?\s*Guntur|St\.\s*Ann['’]?s\s+College\s+for\s+Women,\s*(Gorantla,)?\s*Guntur)/i);
  if (deptMatch) {
    department = deptMatch[0].trim();
    company = deptAndCompany.substring(deptMatch[0].length).trim();
  } else {
    const mcaMbaMatch = deptAndCompany.match(/^(Department of\s+(MCA|MBA|BCA|Statistics|Physics|Botany|Biotechnology|Microbiology|Chemistry|Commerce|Physical Education|Mathematics|Oriental Languages|English))/i);
    if (mcaMbaMatch) {
      department = deptAndCompany.match(/^.*St\.\s*Ann['’]?s\s+College\s+for\s+Women,\s*(Gorantla,)?\s*Guntur/i)?.[0] || mcaMbaMatch[0];
      company = deptAndCompany.substring(department.length).trim();
    } else {
      const splitIdx = deptAndCompany.indexOf("Ltd");
      if (splitIdx !== -1) {
        const lastSpace = deptAndCompany.substring(0, splitIdx).lastIndexOf(" ");
        department = deptAndCompany.substring(0, lastSpace).trim();
        company = deptAndCompany.substring(lastSpace).trim();
      } else {
        const words = deptAndCompany.split(" ");
        department = words.slice(0, 4).join(" ");
        company = words.slice(4).join(" ");
      }
    }
  }

  let purposeText = purposeAndYears
    .replace(/View\s+Document\s+PDF/gi, '')
    .replace(/View\s+PDF/gi, '')
    .replace(/Annual\s+Activity\s+Report/gi, '')
    .trim();

  let years = '—';
  const yearsMatch = purposeText.match(/\b(\d+)\b\s*$/);
  if (yearsMatch) {
    years = yearsMatch[1];
    purposeText = purposeText.substring(0, yearsMatch.index).trim();
  }

  return {
    sNo: sno,
    department: applyCorrections(department),
    company: applyCorrections(company),
    yearOfSigning: dateStr,
    duration: durationStr,
    purpose: applyCorrections(purposeText),
    years: years
  };
}

// Helper to format a table as a double-newline separated block of chunks
function formatTableAsNewlineSeparated(headers, rows) {
  const cells = [];
  headers.forEach(h => {
    const cleanHeader = h.replace(/^[\*\s_\-#]+/g, '').replace(/[\*\s_\-#]+$/g, '').trim();
    cells.push(`**${cleanHeader}**`);
  });
  
  rows.forEach(row => {
    row.forEach(cell => {
      const val = cell !== undefined && cell !== null ? String(cell).trim() : '—';
      cells.push(val === '' ? '—' : val);
    });
  });
  
  return cells.join('\n\n');
}

function parseMoUsPDFSection(text, maxSNo, mapping) {
  const rows = [];
  let currentPos = 0;
  
  for (let sno = 1; sno <= maxSNo; sno++) {
    const regex = new RegExp(`\\n${sno}\\s`, 'g');
    let match;
    let foundIndex = -1;
    
    regex.lastIndex = currentPos;
    while ((match = regex.exec(text)) !== null) {
      const snippet = text.substring(match.index, match.index + 20);
      if (!snippet.includes('|')) {
        foundIndex = match.index;
        break;
      }
    }
    
    if (foundIndex === -1) {
      const regexFallback = new RegExp(`\\n${sno}\\n`, 'g');
      regexFallback.lastIndex = currentPos;
      const matchFallback = regexFallback.exec(text);
      if (matchFallback) foundIndex = matchFallback.index;
    }
    
    if (foundIndex !== -1) {
      if (sno > 1 && rows.length > 0) {
        rows[rows.length - 1].rawText = text.substring(rows[rows.length - 1].index, foundIndex).trim();
      }
      rows.push({ sNo: sno, index: foundIndex + String(sno).length + 2, rawText: '' });
      currentPos = foundIndex + 2;
    }
  }
  
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    let endPos = text.length;
    const limitIndex = text.indexOf("MEMORANDUM OF UNDERSTANDING (MOUS) 2024-2025", lastRow.index);
    if (limitIndex !== -1) endPos = limitIndex;
    lastRow.rawText = text.substring(lastRow.index, endPos).trim();
  }
  
  const headers = [
    "S. No",
    "Name of the Department",
    "Name of the Organization/Institution/Corporate with which MoUs is Signed",
    "Year of Signing",
    "Duration",
    "Purpose",
    "Years",
    "View Document"
  ];

  const parsedRows = rows.map(r => {
    const data = parseMoURowText(r.rawText, r.sNo);
    const linkUrl = mapping[r.sNo] || '—';
    const viewPdfLink = linkUrl !== '—' ? `[View PDF](${linkUrl})` : '—';
    return [
      String(data.sNo),
      data.department,
      data.company,
      data.yearOfSigning,
      data.duration,
      data.purpose,
      data.years,
      viewPdfLink
    ];
  });
  
  return formatTableAsNewlineSeparated(headers, parsedRows);
}

// Heuristically rebuild the Recruitment Drives table
function parseRecruitmentDrivesTable(text) {
  const lines = text.split('\n');
  const rows = [];
  let foundTable = false;
  
  for (let line of lines) {
    line = line.trim();
    if (/^\d+\s+\d{2}-\d{2}-\d{4}/.test(line)) {
      foundTable = true;
      const parts = line.match(/^(\d+)\s+(\d{2}-\d{2}-\d{4}|\d{4}–\d{4})\s+(.+?)\s+([—\-]|[0-9]+)\s+([0-9]+)\s+(.+)$/);
      if (parts) {
        rows.push([
          parts[1],
          parts[2],
          applyCorrections(parts[3]),
          parts[4],
          parts[5],
          applyCorrections(parts[6])
        ]);
      }
    }
  }
  
  const headers = [
    "Sl. No.",
    "Date",
    "Name of the Company / Organization",
    "No. of Students Attended",
    "No. of Students Placed",
    "Placement Drive Type"
  ];
  
  const summaryHeaders = [
    "Category",
    "Total Selections"
  ];
  
  const summaryRows = [
    ["On-Campus Placements", "201"],
    ["Off-Campus Placements", "06"],
    ["Total Number of Selections", "207"]
  ];

  if (rows.length > 0) {
    return [
      formatTableAsNewlineSeparated(headers, rows),
      "",
      formatTableAsNewlineSeparated(summaryHeaders, summaryRows)
    ].join('\n\n');
  }
  
  // Fallback if regex split fails
  const fallbackRows = [
    ["1", "09-01-2026", "FSL -- First Source Solutions Limited", "—", "32", "On-Campus Placement Drive"],
    ["2", "09-02-2026", "Info Quest Background Check Pvt. Ltd", "—", "34", "On-Campus Placement Drive"],
    ["3", "10-02-2026", "ILM -- Institute of Language Management (P) Ltd", "—", "35", "On-Campus Placement Drive"],
    ["4", "18-02-2026", "English For You Institution", "—", "62", "On-Campus Placement Drive"],
    ["5", "19-02-2026", "Techbium Software Services Pvt. Ltd", "—", "38", "On-Campus Placement Drive"],
    ["6", "16-02-2026", "Tata Consultancy Services (TCS)", "—", "03", "Off-Campus Placement Drive"],
    ["7", "2024–2026", "Accenture -- MCA", "—", "01", "Off-Campus Placement Drive"],
    ["8", "2025–2026", "TECH MAHENDRA -- MCA", "—", "01", "Off-Campus Placement Drive"],
    ["9", "02-03-2026", "CALIBHR (State Bank Operations Support Services Pvt. Ltd)", "—", "01", "Off-Campus Placement Drive"]
  ];

  return [
    formatTableAsNewlineSeparated(headers, fallbackRows),
    "",
    formatTableAsNewlineSeparated(summaryHeaders, summaryRows)
  ].join('\n\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RUN METHOD
// ─────────────────────────────────────────────────────────────────────────────
async function run() {
  console.log("=========================================");
  console.log("🚀 STARTING PLACEMENTS DATA FRESH IMPORT");
  console.log("=========================================");

  // 1. Clean Sanity Placements first to start fresh
  console.log("🧹 Clearing all existing placementSection documents from Sanity...");
  try {
    await client.delete({ query: '*[_type == "placementSection"]' });
    console.log("✅ Sanity placements section cleared.");
  } catch (err) {
    console.error("❌ Failed to clear Sanity placements:", err.message);
  }

  // 2. Scan and Upload MoU documents to Sanity and Copy locally
  const mous_2024_2025 = await scanMoUs(path.join(BASE_DIR, "II Industry Linakges & Employability/MOUS 2024-2025"), "MOUS 2024-2025");
  const mous_2025_2026 = await scanMoUs(path.join(BASE_DIR, "II Industry Linakges & Employability/MOUS 2025-2026"), "MOUS 2025-2026");

  // 3. Scan and Upload Annual Reports
  console.log("📤 Uploading Annual Report PDFs...");
  const annualReportsDir = path.join(BASE_DIR, "I. Training & Placements/2.Annual Reprots");
  const annualReportsFiles = [
    { year: "2023-2024", file: "T&P Annual Report 2023-2024.pdf" },
    { year: "2024-2025", file: "T & P Annual Report 2024-2025.pdf" },
    { year: "2025-2026", file: "T & P Annual Report 2025-2026.pdf" }
  ];
  const uploadedAnnualReports = {};
  for (const report of annualReportsFiles) {
    const fullPath = path.join(annualReportsDir, report.file);
    const localUrl = copyFileToPublic(fullPath);
    const asset = await uploadFileAsset(fullPath);
    uploadedAnnualReports[report.year] = asset ? asset.url : localUrl;
  }

  // Definition of the 33 sections and their mapped PDF files
  const sectionsDefinition = [
    // Group 1: Training & Placements
    {
      id: "about-cell",
      title: "About Training & Placement Cell",
      file: "I. Training & Placements/Placements & Industry Linkages.pdf"
    },
    {
      id: "annual-reports",
      title: "Annual Reports",
      file: "I. Training & Placements/2.Annual Reprots/Annual Reports of TP.pdf"
    },
    {
      id: "placement-statistics",
      title: "Placement Statistics",
      file: "I. Training & Placements/3.Placeemtns Statistics/Placement Statistics.pdf"
    },
    {
      id: "recruitment-drives",
      title: "Campus Recruitment Drives",
      file: "I. Training & Placements/4.Campus Placement Drvies.pdf"
    },
    {
      id: "skill-development",
      title: "Skill Development Initiatives",
      file: "I. Training & Placements/5.Skill Development Initiatives.pdf"
    },
    {
      id: "soft-skills",
      title: "Soft Skills & Personality Development",
      file: "I. Training & Placements/6.Soft Skills & Personality Development.pdf"
    },
    {
      id: "internships-exposure",
      title: "Internships & Industry Exposure",
      file: "I. Training & Placements/7.Internships & Industry Exposure.pdf"
    },
    {
      id: "competitive-coaching",
      title: "Competitive Exam Coaching",
      file: "I. Training & Placements/8.Competitive Exam Coaching.pdf",
      extraFile: "I. Training & Placements/8.Competitive Examination Achievements Table format.pdf"
    },
    {
      id: "career-guidance",
      title: "Career Guidance & Counselling",
      file: "I. Training & Placements/9.Career Guidance.pdf"
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship Development",
      file: "I. Training & Placements/10.Entrepreneurship Development.pdf"
    },
    {
      id: "placement-partnerships",
      title: "Industry Linkages / Placement Partnerships",
      file: "I. Training & Placements/11.Industry Linkages.pdf"
    },
    {
      id: "capacity-building",
      title: "Capacity Building & Skill Enhancement",
      file: "I. Training & Placements/12.Capacity Building.pdf"
    },
    {
      id: "alumni-support",
      title: "Alumni Career Support",
      file: "I. Training & Placements/13.Alumni Career Support.pdf"
    },
    {
      id: "training-calendar",
      title: "Training Calendar / Activity Gallery",
      file: "I. Training & Placements/14.Training Calendar.pdf"
    },
    
    // Group 2: Industry Linkages & Employability
    {
      id: "industry-partnerships",
      title: "Industry Partnerships",
      file: "II Industry Linakges & Employability/1.Industry Partnerships.pdf"
    },
    {
      id: "internships-apprenticeships",
      title: "Internships & Apprenticeships",
      file: "II Industry Linakges & Employability/2.Internships & Apprenticeships.pdf"
    },
    {
      id: "mous-agreements",
      title: "MoUs / Agreements",
      file: "II Industry Linakges & Employability/3.MoU agreemetns 2025-2026 & 2024-2025 - Copy.pdf"
    },
    {
      id: "mou-activities",
      title: "MoU Activities",
      file: "II Industry Linakges & Employability/4.MoU Activites  2025-2026 & 2024-2025.pdf"
    },
    {
      id: "csr-initiatives",
      title: "CSR Initiatives",
      file: "II Industry Linakges & Employability/5.CSR Initiatvies.pdf"
    },
    {
      id: "industry-placement-partnerships",
      title: "Placement Partnerships",
      file: "II Industry Linakges & Employability/6.Placement Partnerships.pdf"
    },
    {
      id: "certifications",
      title: "Professional Certification Programmes",
      file: "II Industry Linakges & Employability/7.Professional Certification Programmes.pdf"
    },
    {
      id: "expert-lectures",
      title: "Industry Expert Lectures",
      file: "II Industry Linakges & Employability/8.Industry Expert Lectures.pdf"
    },
    {
      id: "industrial-visits",
      title: "Industrial Visits",
      file: "II Industry Linakges & Employability/9.Industrial Visits.pdf"
    },
    {
      id: "skill-training",
      title: "Skill-Based Training Programmes",
      file: "II Industry Linakges & Employability/10.Skill Based Training Programmes.pdf"
    },
    {
      id: "employability-activities",
      title: "Employability Enhancement Activities",
      file: "II Industry Linakges & Employability/11.Employability Enhancement Activities.pdf"
    },
    
    // Group 3: Internationalization & Global Outreach
    {
      id: "international-collaborations",
      title: "International Collaborations",
      file: "III Internationalization & Global Outreach/1.International Collaborations.pdf"
    },
    {
      id: "internationalization-policy",
      title: "Internationalization Policy",
      file: "III Internationalization & Global Outreach/2.Internation Policy.pdf"
    },
    {
      id: "accreditations-memberships",
      title: "International Accreditations & Memberships",
      file: "III Internationalization & Global Outreach/3.International Accreditations & Memberships.pdf"
    },
    {
      id: "global-alumni",
      title: "Global Alumni & Outreach Engagement",
      file: "III Internationalization & Global Outreach/4.GLobal LAumni & Outreach ENgangement.pdf"
    },
    {
      id: "global-research",
      title: "Global Research Collaborations",
      file: "III Internationalization & Global Outreach/5.Global Research Colloborations.pdf"
    },
    {
      id: "student-faculty-exchange",
      title: "Student Exchange / Faculty Exchange",
      file: "III Internationalization & Global Outreach/6.Studetn Exchange.pdf"
    },
    {
      id: "webinars-conferences",
      title: "International Webinars & Conferences",
      file: "III Internationalization & Global Outreach/7.Intenrational Webinars & Conferences.pdf"
    },
    {
      id: "cross-cultural-learning",
      title: "Cross-Cultural Learning Activities",
      file: "III Internationalization & Global Outreach/8.Cross-Cultural Learning Activities.pdf"
    }
  ];

  const finalStaticSections = {};

  console.log("\n📄 Starting parsing of all PDFs and publishing sections...");

  for (const s of sectionsDefinition) {
    const filePath = path.join(BASE_DIR, s.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: Section file not found: ${filePath}`);
      continue;
    }
    
    console.log(`Parsing section [${s.id}] from: ${path.basename(filePath)}...`);
    const buffer = fs.readFileSync(filePath);
    const rawText = await parsePdfText(buffer);
    
    let markdownContent = "";

    // CUSTOM PARSING RULES FOR SPECIFIC SECTIONS
    if (s.id === "mous-agreements") {
      // MoU Agreements contains MoUs tables for 25-26 and 24-25
      const parts = rawText.split("MEMORANDUM OF UNDERSTANDING (MOUS) 2024-2025");
      const section25_26 = parseMoUsPDFSection(parts[0], 42, mous_2025_2026);
      const section24_25 = parseMoUsPDFSection(parts[1] || "", 37, mous_2024_2025);
      
      markdownContent = [
        `__**MEMORANDUM OF UNDERSTANDING (MOUS) 2025-2026**__`,
        section25_26,
        ``,
        `__**MEMORANDUM OF UNDERSTANDING (MOUS) 2024-2025**__`,
        section24_25
      ].join('\n\n');
    } else if (s.id === "mou-activities") {
      // MoU Activities uses the exact same format but with the MoU Activities PDF
      const parts = rawText.split("MEMORANDUM OF UNDERSTANDING (MOUS) 2024-2025");
      const section25_26 = parseMoUsPDFSection(parts[0], 42, mous_2025_2026);
      const section24_25 = parseMoUsPDFSection(parts[1] || "", 37, mous_2024_2025);
      
      markdownContent = [
        `__**MoU Activities 2025-2026**__`,
        section25_26,
        ``,
        `__**MoU Activities 2024-2025**__`,
        section24_25
      ].join('\n\n');
    } else if (s.id === "recruitment-drives") {
      const headerText = "Campus Recruitment Drives\n\nThe college regularly organizes campus recruitment drives in collaboration with companies, industries, and placement agencies.\n\n**Recruitment Activities**\n- On-Campus Recruitment\n- Off-Campus Placement Support\n- Walk-in Drive Information\n- Company Interaction Sessions\n- Pre-Placement Talks\n- Mock Interviews & Group Discussions\n\nThese initiatives help students gain exposure to recruitment processes and employment opportunities.\n\n**On-Campus & Off-Campus Placement Drives 2025-2026**\n";
      const tableText = parseRecruitmentDrivesTable(rawText);
      markdownContent = headerText + "\n" + tableText;
    } else if (s.id === "placement-statistics") {
      // Rebuild the beautiful Placement Statistics layouts
      const table1 = formatTableAsNewlineSeparated(
        [
          "Academic Year",
          "Total Outgoing Batch Students",
          "Students Placed",
          "Students Pursuing Higher Education",
          "Students with Internship Offers",
          "Students Preparing for Competitive Exams",
          "Students Opted for Entrepreneurship / Self Employment",
          "Students Not Yet Placed / Awaiting Opportunities"
        ],
        [
          ["2025-2026", "—", "—", "—", "—", "—", "—", "—"],
          ["2024-2025", "—", "—", "—", "—", "—", "—", "—"],
          ["2023-2024", "—", "—", "—", "—", "—", "—", "—"]
        ]
      );

      const table2 = formatTableAsNewlineSeparated(
        [
          "Academic Year",
          "Students Eligible (UG & PG)",
          "Students Placed",
          "Placement %",
          "Highest Package"
        ],
        [
          ["2025-2026", "—", "—", "—", "—"],
          ["2024-2025", "—", "—", "—", "—"],
          ["2023-2024", "—", "—", "—", "—"],
          ["2022-2023", "—", "—", "—", "—"],
          ["2021-2022", "—", "—", "—", "—"],
          ["2020-2021", "—", "—", "—", "—"],
          ["2019-2020", "—", "—", "—", "—"],
          ["2018-2019", "—", "—", "—", "—"]
        ]
      );

      const table3 = formatTableAsNewlineSeparated(
        [
          "Academic Year",
          "Programme",
          "Total No.of Students",
          "Students Placed",
          "Placement %"
        ],
        [
          ["2025-2026", "B.Com Honours - General", "—", "—", "—"],
          ["2025-2026", "B.Com Honours Computer Applications", "—", "—", "—"],
          ["2025-2026", "BBA Honours-Business Management", "—", "—", "—"],
          ["2025-2026", "B. Sc Honours Computer Science", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours Artificial Intelligence", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Mathematics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Physics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours-Statistics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Chemistry", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Biotechnology", "—", "—", "—"],
          ["2025-2026", "B.Sc honours -Microbiology", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours-Chemistry", "—", "—", "—"],
          ["2025-2026", "MCA-Master of Computer Applications", "—", "—", "—"],
          ["2025-2026", "MBA - Master of Business Administration", "—", "—", "—"]
        ]
      );

      const table4 = formatTableAsNewlineSeparated(
        [
          "Academic Year",
          "Programme",
          "Total No.of Students",
          "Programme in Which Students Pursuing Higher Education",
          "No.of Students"
        ],
        [
          ["2025-2026", "B.Com Honours - General", "—", "—", "—"],
          ["2025-2026", "B.Com Honours Computer Applications", "—", "—", "—"],
          ["2025-2026", "BBA Honours-Business Management", "—", "—", "—"],
          ["2025-2026", "B. Sc Honours Computer Science", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours Artificial Intelligence", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Mathematics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Physics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours-Statistics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Chemistry", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Biotechnology", "—", "—", "—"],
          ["2025-2026", "B.Sc honours -Microbiology", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours-Chemistry", "—", "—", "—"],
          ["2025-2026", "MCA-Master of Computer Applications", "—", "—", "—"],
          ["2025-2026", "MBA - Master of Business Administration", "—", "—", "—"]
        ]
      );

      const table5 = formatTableAsNewlineSeparated(
        [
          "Academic Year",
          "Programme",
          "Total No.of Students",
          "Partner Organizations",
          "Students Interned"
        ],
        [
          ["2025-2026", "B.Com Honours - General", "—", "—", "—"],
          ["2025-2026", "B.Com Honours Computer Applications", "—", "—", "—"],
          ["2025-2026", "BBA Honours-Business Management", "—", "—", "—"],
          ["2025-2026", "B. Sc Honours Computer Science", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours Artificial Intelligence", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Mathematics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Physics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours-Statistics", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Chemistry", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours -Biotechnology", "—", "—", "—"],
          ["2025-2026", "B.Sc honours -Microbiology", "—", "—", "—"],
          ["2025-2026", "B.Sc Honours-Chemistry", "—", "—", "—"],
          ["2025-2026", "MCA-Master of Computer Applications", "—", "—", "—"],
          ["2025-2026", "MBA - Master of Business Administration", "—", "—", "—"]
        ]
      );

      markdownContent = [
        `**Placement Statistics**`,
        `The institution maintains placement records and progression data to monitor students’ career advancement and employment opportunities.`,
        `**Placement Highlights**`,
        `- Students placed in reputed companies and organizations`,
        `- Department-wise placement records`,
        `- Higher education admissions`,
        `- Entrepreneurship initiatives by students`,
        `- Government and private sector placements`,
        `The placement statistics are updated periodically for transparency and institutional quality assurance.`,
        `**Outgoing Batch – Career Progression Statistics**`,
        table1,
        `__**Year wise Placement Packages**__`,
        table2,
        `__**Department/Programme -wise Placements**__`,
        table3,
        `__**Higher Education Progression**__`,
        table4,
        `__**Internship Statistics**__`,
        table5
      ].join('\n\n');
    } else if (s.id === "annual-reports") {
      markdownContent = [
        formatRawPdfText(rawText),
        ``,
        `**View Document (PDF)**`,
        `[2023-2024](${uploadedAnnualReports["2023-2024"] || "#"}) , [2024-2025](${uploadedAnnualReports["2024-2025"] || "#"}) , [2025-2026](${uploadedAnnualReports["2025-2026"] || "#"})`
      ].join('\n\n');
    } else {
      // Standard Text Page parsing
      let contentText = rawText;
      if (s.extraFile) {
        const extraPath = path.join(BASE_DIR, s.extraFile);
        if (fs.existsSync(extraPath)) {
          const extraText = await parsePdfText(fs.readFileSync(extraPath));
          contentText += "\n\n" + extraText;
        }
      }
      markdownContent = formatRawPdfText(contentText);
    }

    // Double clean markdown content representation
    markdownContent = markdownContent.replace(/\\n/g, '\n').replace(/\\"/g, '"');

    // Store in our static object builder
    finalStaticSections[s.id] = {
      id: s.id,
      title: s.title,
      content: markdownContent
    };

    // Upload to Sanity
    const sanityDoc = {
      _id: `placement-section-${s.id}`,
      _type: "placementSection",
      id: s.id,
      title: s.title,
      content: markdownContent
    };

    try {
      console.log(`Publishing [${s.id}] to Sanity...`);
      await client.createOrReplace(sanityDoc);
      console.log(`✅ Successfully published section [${s.id}]`);
    } catch (err) {
      console.error(`❌ Failed to publish section [${s.id}] to Sanity:`, err.message);
    }
  }

  // 4. Output the static fallback config
  console.log(`\n💾 Re-generating local static fallback file: ${STATIC_DATA_PATH}...`);
  const finalCodeLines = [];
  for (const [id, value] of Object.entries(finalStaticSections)) {
    const escapedContent = value.content
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
      
    finalCodeLines.push(`  "${id}": {
    id: "${id}",
    title: "${value.title}",
    content: \`${escapedContent}\`
  }`);
  }

  const tsContent = `export interface PlacementSection {
  id: string;
  title: string;
  content: string;
}

export const staticPlacementSections: Record<string, PlacementSection> = {
${finalCodeLines.join(',\n')}
};
`;

  fs.writeFileSync(STATIC_DATA_PATH, tsContent, "utf8");
  console.log("✅ Re-generated staticData.ts fallbacks successfully!");

  console.log("\n=========================================");
  console.log("🎉 PLACEMENTS FRESH IMPORT COMPLETED!");
  console.log("=========================================");
}

run().catch(err => {
  console.error("❌ Fatal migration crash:", err);
});
