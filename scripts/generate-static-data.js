const fs = require("fs");
const path = require("path");

const BASE_DIR = "/Users/venkatavivek/stanns/7.Placements & Industry Linkages";
const OUT_FILE = "/Users/venkatavivek/stanns/src/components/placements/staticData.ts";

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
  let borderCount = 0;

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i].trim();

    const isSeparator = line.includes("+") && (line.includes("-") || line.includes("="));
    if (isSeparator) {
      borderCount++;
      if (currentRow) {
        if (borderCount === 2) {
          headers = currentRow;
        } else {
          if (!currentRow[0] && rows.length > 0) {
            currentRow[0] = rows[rows.length - 1][0];
          }
          rows.push(currentRow);
        }
        currentRow = null;
      }
      continue;
    }

    if (line.startsWith("|")) {
      const cells = line.split("|").map(c => c.trim()).slice(1, -1);
      
      if (!currentRow) {
        currentRow = cells.map(c => c.replace(/\\/g, "").trim());
      } else {
        for (let col = 0; col < cells.length; col++) {
          if (cells[col]) {
            currentRow[col] = (currentRow[col] + " " + cells[col].replace(/\\/g, "")).trim();
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

function getLocalMoUFileMapping(year) {
  const dirName = year === "2025-2026" ? "MOUS 2025-2026" : "MOUS 2024-2025";
  const dirPath = path.join(BASE_DIR, "II Industry Linakges & Employability", dirName);
  const mapping = {};
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(f => {
      if (f.toLowerCase().endsWith(".pdf")) {
        const match = f.match(/^(\d+)/);
        if (match) {
          mapping[parseInt(match[1])] = `/documents/placements/${dirName}/${f}`;
        }
      }
    });
  }
  return mapping;
}

const sections = [
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

function run() {
  console.log("Generating staticData.ts fallbacks...");
  const mous_2024_2025 = getLocalMoUFileMapping("2024-2025");
  const mous_2025_2026 = getLocalMoUFileMapping("2025-2026");

  const results = {};

  for (const s of sections) {
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

    // Replace annual report names with placeholders
    finalContent = finalContent.replace(/\/documents\/placements\/T & P Annual Report 2024-2025\.pdf/g, "/documents/placements/T & P Annual Report 2024-2025.pdf");
    finalContent = finalContent.replace(/\/documents\/placements\/T & P Annual Report 2025-2026\.pdf/g, "/documents/placements/T & P Annual Report 2025-2026.pdf");
    finalContent = finalContent.replace(/\/documents\/placements\/T&P Annual Report 2023-2024\.pdf/g, "/documents/placements/T&P Annual Report 2023-2024.pdf");

    results[s.id] = {
      id: s.id,
      title: s.title,
      content: cleanMarkdown(finalContent)
    };
  }

  const outputCode = `export interface PlacementSection {
  id: string;
  title: string;
  content: string;
}

export const staticPlacementSections: Record<string, PlacementSection> = ${JSON.stringify(results, null, 2)};
`;

  fs.writeFileSync(OUT_FILE, outputCode, "utf8");
  console.log("✅ Successfully generated staticData.ts with 33 sections and fully parsed tables!");
}

run();
