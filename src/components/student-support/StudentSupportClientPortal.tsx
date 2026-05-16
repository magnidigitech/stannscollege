"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Search, 
  ChevronDown, 
  FileText, 
  ChevronRight,
  FileDown,
  HeartHandshake,
  Trophy,
  GraduationCap,
  Compass,
  Sprout,
  Flame,
  Heart,
  Flag
} from "lucide-react";
import { staticSupportSections } from "./staticData";

// Definition of the structural groupings and configurations for URL slugs
const tabs = [
  // Category 1: Student Support Services
  { text: "Mentor–Mentee System", slug: "mentor-mentee", icon: Users, group: "Student Support Services" },
  { text: "Student Counselling", slug: "student-counselling", icon: HeartHandshake, group: "Student Support Services" },
  { text: "Grievance Redressal Cell", slug: "grievance-redressal", icon: ShieldCheck, group: "Student Support Services" },
  { text: "Internal Complaints (ICC)", slug: "internal-complaints", icon: FileText, group: "Student Support Services" },
  { text: "Anti-Ragging Committee", slug: "anti-ragging", icon: ShieldCheck, group: "Student Support Services" },
  { text: "Parent Association", slug: "parent-association", icon: Users, group: "Student Support Services" },
  { text: "Women Empowerment Cell", slug: "women-empowerment", icon: Sparkles, group: "Student Support Services" },

  // Category 2: Student Achievements
  { text: "Academic Achievements", slug: "academic-achievements", icon: GraduationCap, group: "Student Achievements" },
  { text: "Sports & Cultural Achievements", slug: "sports-cultural-achievements", icon: Trophy, group: "Student Achievements" },
  { text: "Sports Infrastructure", slug: "sports-infrastructure", icon: Trophy, group: "Student Achievements" },

  // Category 3: Capacity Building
  { text: "Capacity Building & Skills", slug: "capacity-building", icon: Compass, group: "Skill Enhancement" },

  // Category 4: Extension Activities
  { text: "NSS Activities", slug: "nss-activities", icon: Flag, group: "Extension Activities" },
  { text: "NCC Activities", slug: "ncc-activities", icon: Flag, group: "Extension Activities" },
  { text: "Mother Gnanamma Outreach", slug: "mother-gnanamma", icon: Heart, group: "Extension Activities" },
  { text: "Eco Club & Environment", slug: "environmental-social", icon: Sprout, group: "Extension Activities" },
  { text: "Red Ribbon Club", slug: "red-ribbon-club", icon: Flame, group: "Extension Activities" },
];

interface StudentSupportClientPortalProps {
  initialSections?: any[];
  activeSlug: string;
}

export default function StudentSupportClientPortal({ 
  initialSections = [], 
  activeSlug = "mentor-mentee" 
}: StudentSupportClientPortalProps) {
  
  const router = useRouter();
  const activeTab = tabs.find(t => t.slug === activeSlug) || tabs[0];

  // Local states for layout responsiveness and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reset search queries when jumping slugs
  useEffect(() => {
    setSearchQuery("");
    setMobileMenuOpen(false);
  }, [activeSlug]);

  // Retrieve Section details with preloaded fallbacks
  const getSectionContent = (slug: string) => {
    // Match dynamic overrides if existing
    const dynamic = initialSections?.find((s: any) => s.slug === slug);
    if (dynamic) {
      return {
        title: dynamic.title,
        content: dynamic.content,
        isStatic: false
      };
    }

    // Retrieve the high-fidelity static payload from our harvested records
    const fallback = staticSupportSections[slug];
    
    // Append PDF associations explicitly to corresponding sections for Native PDF view overlays!
    let files: any[] = [];
    if (slug === "anti-ragging") {
      files = [{ name: "Download Comprehensive Anti-Ragging Policy (PDF)", url: "/documents/policies/student-support/anti-ragging-policy.pdf" }];
    } else if (slug === "grievance-redressal") {
      files = [{ name: "Download Grievance Redressal Mechanism Policy (PDF)", url: "/documents/policies/student-support/grievance-redressal-policy.pdf" }];
    } else if (slug === "internal-complaints") {
      files = [{ name: "Download Internal Complaints Committee (ICC) POSH Policy (PDF)", url: "/documents/policies/student-support/icc-policy.pdf" }];
    } else if (slug === "women-empowerment") {
      files = [{ name: "Download Women Empowerment Cell Policy 2026 (PDF)", url: "/documents/policies/student-support/women-empowerment-cell-policy-2026.pdf" }];
    } else if (slug === "academic-achievements") {
      files = [
        { name: "Download Outgoing Batch Academic Toppers (PDF)", url: "/documents/policies/student-support/outgoing-batch-academic-toppers-2025.pdf" },
        { name: "Download Competitive Exams Achievement Statistics (PDF)", url: "/documents/policies/student-support/competitive-examination-achievements.pdf" }
      ];
    }

    return {
      title: fallback?.title || activeTab.text,
      content: fallback?.content || "",
      files,
      isStatic: true
    };
  };

  const currentSection = useMemo(() => getSectionContent(activeSlug), [activeSlug, initialSections]);

  // Helper: Enhanced Robust Regex Tokenizer to hydrate BOTH links and bold markdown wrappers!
  const renderRichString = (str: string) => {
    if (!str) return "";
    
    // Upgraded regex supporting dotAll [\s\S] matching to capture multi-line wrapped bold content
    const tokenRegex = /(\*\*|__)([\s\S]+?)\1|\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    let keyCounter = 0;
    
    while ((match = tokenRegex.exec(str)) !== null) {
      if (match.index > lastIdx) {
        parts.push(str.substring(lastIdx, match.index));
      }
      
      if (match[1]) {
        // Bold Marker matched (strip stray internal underscores if leaked)
        const boldContent = match[2].replace(/__/g, '').trim();
        parts.push(
          <strong key={keyCounter++} className="text-[#002147] font-black tracking-tight inline">
            {renderRichString(boldContent)}
          </strong>
        );
      } else if (match[3]) {
        // Link matched
        const linkLabel = match[3].replace(/__/g, '').trim();
        parts.push(
          <a 
            key={keyCounter++} 
            href={match[4]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:text-indigo-800 font-bold underline-offset-4 transition-colors inline hover:underline"
          >
            {linkLabel}
          </a>
        );
      }
      lastIdx = tokenRegex.lastIndex;
    }
    
    if (lastIdx < str.length) {
      parts.push(str.substring(lastIdx));
    }
    
    return parts.length > 0 ? parts : str;
  };

  // Universal Emoji Stripping utility
  const stripEmojis = (str: string) => {
    if (!str) return "";
    return str.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '').trim();
  };

  // 4. INTELLIGENT TEXT LAYOUT COMPILER
  const renderContentBody = (text: string) => {
    if (!text) return null;

    const rawChunks = text.split("\n\n").map(c => c.trim()).filter(Boolean);
    const nodes: any[] = [];
    
    let i = 0;
    while (i < rawChunks.length) {
      const chunk = rawChunks[i];

      // Skip placeholder markers
      if (chunk.includes("[Embedded Image Removed]") || chunk.includes("[Refer to Detailed")) {
        i++;
        continue;
      }

      // HEURISTIC: TABLE COMPOSITION SCANNER (Committee & Achievement Tables)
      const clean = (s: string) => (s || "").replace(/[*_]+/g, '').trim();
      const norm = (s: string) => (s || "").replace(/[*_\s\.]+/g, '').toLowerCase();

      const n0 = norm(chunk);
      const n1 = norm(rawChunks[i+1] || "");
      const n2 = norm(rawChunks[i+2] || "");
      const n3 = norm(rawChunks[i+3] || "");
      const n4 = norm(rawChunks[i+4] || "");

      // Standardised Serial Number Header triggers
      const isSNo = n0.startsWith("sno") || n0.startsWith("slno") || n0 === "s";

      // Smart 5-Column detection
      const is5ColTable = isSNo && n1 === "name" && n2 === "qualification";

      // Smart 4-Column detection
      const isCommitteeTableStart = 
        (isSNo && n1 === "name" && n2 === "designation") ||
        (isSNo && n1.includes("nameofthemember")) ||
        (n0 === "name" && n1 === "designation" && n2.includes("departmentrole")) ||
        (n0 === "academicyear" && n1 === "programme" && n2.includes("nameofthestudent"));

      // Smart 3-Column detection
      const is3ColTable = 
        (isSNo && n1 === "particulars" && n2 === "total") ||
        (isSNo && n1 === "name" && n2 === "link");
      
      const isSafetyHelplines = 
        n0 === "service" && n1 === "helplinenumber";

      if (is5ColTable) {
        const headers = [chunk, rawChunks[i+1], rawChunks[i+2], rawChunks[i+3], rawChunks[i+4]];
        const rowItems: string[] = [];
        let lookAhead = i + 5;
        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          if (nextVal.startsWith("__") && nextVal.endsWith("__") && nextVal.length > 4) break;
          if (nextClean === "Committee Activities" || nextClean === "Important Links" || nextClean.startsWith("View PDF") || nextClean.includes("Gallery")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }
        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += 5) {
          const slice = rowItems.slice(r, r + 5);
          if (slice.length > 0) {
            while (slice.length < 5) slice.push("—");
            rows.push(slice);
          }
        }
        nodes.push({ type: 'table', headers, rows, columns: 5 });
        i = lookAhead;
        continue;
      }

      if (isSafetyHelplines) {
        // 2-column Safety Helplines
        const headers = [chunk, rawChunks[i+1]];
        const rowItems: string[] = [];
        let lookAhead = i + 2;
        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          if (clean(nextVal).includes("Important Links") || clean(nextVal).startsWith("Committee Activities") || nextVal.startsWith("__")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }
        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += 2) {
          if (rowItems[r] && rowItems[r+1]) {
            rows.push([rowItems[r], rowItems[r+1]]);
          }
        }
        nodes.push({ type: 'table', headers, rows, columns: 2 });
        i = lookAhead;
        continue;
      }

      if (isCommitteeTableStart) {
        const headers = [chunk, rawChunks[i+1], rawChunks[i+2], rawChunks[i+3]];
        const rowItems: string[] = [];
        let lookAhead = i + 4;
        
        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          if (nextVal.startsWith("__") && nextVal.endsWith("__") && nextVal.length > 4) break;
          if (nextClean === "Committee Activities" || nextClean === "Important Links" || nextClean.startsWith("View PDF") || nextClean.startsWith("Photo Galley") || nextClean.startsWith("Photos")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }

        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += 4) {
          const rowSlice = rowItems.slice(r, r + 4);
          if (rowSlice.length > 0) {
            while (rowSlice.length < 4) rowSlice.push("—");
            rows.push(rowSlice);
          }
        }

        nodes.push({ type: 'table', headers, rows, columns: 4 });
        i = lookAhead;
        continue;
      }

      if (is3ColTable) {
        const headers = [chunk, rawChunks[i+1], rawChunks[i+2]];
        const rowItems: string[] = [];
        let lookAhead = i + 3;

        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          if (nextVal.startsWith("__") && nextVal.endsWith("__") && nextVal.length > 4) break;
          if (nextClean.includes("Access Platforms") || nextClean.includes("Open Access") || nextClean.startsWith("View PDF") || nextClean.includes("Gallery")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }

        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += 3) {
          const slice = rowItems.slice(r, r + 3);
          if (slice.length > 0) {
            while (slice.length < 3) slice.push("—");
            rows.push(slice);
          }
        }

        nodes.push({ type: 'table', headers, rows, columns: 3 });
        i = lookAhead;
        continue;
      }

      // Default grouping
      nodes.push({ type: 'paragraph', text: chunk });
      i++;
    }

    let hasBoostedFirstHeader = false;

    return nodes.map((node, idx) => {
      if (node.type === 'table') {
        return (
          <div key={idx} className="my-12 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] select-text animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#002147] via-[#0a2a57] to-[#153c73] text-white">
                    {node.headers.map((h: string, hIdx: number) => {
                      const lowerH = h.toLowerCase().replace(/[^a-z]/g, '');
                      const isSno = lowerH === 'sno' || lowerH === 'slno' || lowerH === 's';
                      const isTotal = lowerH === 'total' || lowerH === 'link';
                      
                      return (
                        <th 
                          key={hIdx} 
                          className={`px-8 py-5.5 font-outfit text-[11px] md:text-xs uppercase tracking-widest font-black border-r border-white/5 last:border-0 ${
                            isSno ? 'text-center' : isTotal ? 'text-right' : 'text-left'
                          }`}
                        >
                          {renderRichString(h)}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70">
                  {node.rows.map((row: string[], rIdx: number) => (
                    <tr
                      key={rIdx}
                      className="group transition-all duration-200 hover:bg-indigo-50/20"
                    >
                      {row.map((cell, cIdx) => {
                        const headerText = node.headers[cIdx] || "";
                        const lowerH = headerText.toLowerCase().replace(/[^a-z]/g, '');
                        const isSno = lowerH === 'sno' || lowerH === 'slno' || lowerH === 's';
                        const isTotal = lowerH === 'total';
                        const isLink = lowerH === 'link';
                        const isEmpty = cell === "—" || cell.trim() === "";

                        return (
                          <td 
                            key={cIdx} 
                            className={`px-8 py-5 text-slate-600 text-xs md:text-[14px] font-medium leading-relaxed transition-colors duration-200 ${
                              isSno ? 'text-center w-[80px] md:w-[100px]' : isTotal || isLink ? 'text-right' : 'text-left'
                            }`}
                          >
                            {isSno ? (
                              <div className="flex justify-center">
                                <span className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-2 text-[11px] font-black font-outfit rounded-lg bg-slate-100 text-slate-500 border border-slate-200/20 transition-all duration-300 shadow-sm group-hover:bg-[#002147]/10 group-hover:text-[#002147] group-hover:border-[#002147]/20 group-hover:scale-105">
                                  {cell.trim()}
                                </span>
                              </div>
                            ) : isTotal ? (
                              <span className="font-outfit font-extrabold text-slate-900 text-[14px] md:text-[15px] tracking-tight transition-colors duration-200 group-hover:text-[#002147] tabular-nums">
                                {isEmpty ? <span className="text-slate-300 font-normal">—</span> : renderRichString(cell)}
                              </span>
                            ) : (
                              <span className={isEmpty ? "text-slate-300 font-normal" : "text-slate-700 font-semibold tracking-tight transition-colors duration-200 group-hover:text-slate-900"}>
                                {isEmpty ? "—" : renderRichString(cell)}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }


      const p = node.text;

      // Formatting A: Check if Title Card (Text wrapped in double underscores)
      if (p.startsWith("__") && p.endsWith("__") && p.length > 4) {
        const cleanTitle = stripEmojis(p.replace(/__/g, '').trim())
          .replace(/^(?:(?:\d+(?:\.\d+)*|[IVXLCDM]+|[a-zA-Z])[\.\)]\s+)+/i, '')
          .trim();
        
        // Check if Roman numerals or Chapters for larger breakout boxes
        const isBigTitle = /^[IVX\d]+\./.test(p.replace(/__/g, '').trim()) || cleanTitle.toUpperCase() === cleanTitle;
        if (isBigTitle) {
          if (!hasBoostedFirstHeader) {
            hasBoostedFirstHeader = true;
            return (
              <h3 key={idx} className="font-outfit text-3xl md:text-4xl font-black text-[#002147] tracking-tight mt-2 mb-10 flex items-center gap-4 leading-tight">
                <span className="h-10 w-2 rounded-full bg-gradient-to-b from-[#002147] to-indigo-600 shrink-0"></span>
                {cleanTitle}
              </h3>
            );
          }
          return (
            <h3 key={idx} className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight mt-12 mb-6 pt-8 border-t border-slate-150 flex items-center gap-3">
              <span className="h-6 w-1.5 rounded-full bg-[#002147] shadow-sm shrink-0"></span>
              {cleanTitle}
            </h3>
          );
        }
        return (
          <h4 key={idx} className="font-outfit text-base md:text-lg font-black text-slate-800 mt-8 mb-3 uppercase tracking-wider border-l-4 border-indigo-100 pl-3">
            {cleanTitle}
          </h4>
        );
      }

      // Formatting B: Unordered Bullet Lists
      if (p.startsWith("- ") || p.startsWith("* ")) {
        // Stitch orphaned multiline bullet elements together cleanly
        const rawLines = p.split("\n").map((l: string) => l.trim()).filter(Boolean);
        const lines: string[] = [];
        for (const line of rawLines) {
          if (line.startsWith("-") || line.startsWith("*")) {
            lines.push(line.replace(/^[-*]\s*/, "").trim());
          } else {
            if (lines.length > 0) {
              lines[lines.length - 1] += " " + line;
            } else {
              lines.push(line);
            }
          }
        }

        return (
          <ul key={idx} className="space-y-3 my-6 pl-1">
            {lines.map((l: string, lIdx: number) => {
              const boldSplit = l.indexOf(" – ");
              const colonSplit = l.indexOf(": ");
              const splitIdx = boldSplit !== -1 ? boldSplit : colonSplit;
              
              if (splitIdx > 0 && splitIdx < 35) {
                const splitChar = boldSplit !== -1 ? " – " : ": ";
                const label = l.substring(0, splitIdx).replace(/__/g, '').trim();
                const desc = l.substring(splitIdx + splitChar.length).trim();
                return (
                  <li key={lIdx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    <span className="h-2 w-2 rounded bg-indigo-500 mt-2 shrink-0"></span>
                    <span>
                      <strong className="text-[#002147] font-black mr-1.5 tracking-tight border-b border-indigo-50">{label}:</strong>
                      {renderRichString(desc)}
                    </span>
                  </li>
                );
              }
              return (
                <li key={lIdx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                  <span className="h-2 w-2 rounded bg-indigo-500 mt-2 shrink-0"></span>
                  <span>{renderRichString(l)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Formatting C: Ordered Numbered Lists
      if (/^\d+\.\s+/.test(p)) {
        const lines = p.split(/\n(?=\d+\.\s)/).map((l: string) => l.trim()).filter(Boolean);
        if (lines.length > 1) {
          return (
            <ol key={idx} className="space-y-3 my-6 pl-1 flex flex-col">
              {lines.map((l: string, lIdx: number) => {
                const val = l.replace(/^\d+\.\s*/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    <span className="flex items-center justify-center h-5 w-5 rounded bg-[#002147]/5 border border-[#002147]/10 text-[#002147] text-[10px] font-black shrink-0 mt-0.5">
                      {lIdx + 1}
                    </span>
                    <span>{renderRichString(val)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }
      }

      // Image Renderer
      if (p.startsWith("<img")) {
        const srcMatch = p.match(/src="(.*?)"/);
        const src = srcMatch ? srcMatch[1] : "";
        return (
          <div key={idx} className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img src={src} alt="Content" className="w-full h-auto object-cover" />
          </div>
        );
      }

      // Default: Standard paragraphs
      return (
        <p key={idx} className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed mb-5 text-justify">
          {renderRichString(p)}
        </p>
      );
    });
  };

  // Organize Tabs by parent category groups
  const tabGroups = useMemo(() => {
    const groups: Record<string, typeof tabs> = {};
    tabs.forEach(t => {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });
    return groups;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 font-sans">
      
      {/* Beautiful Main Prestigous Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#053d79] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-xl mb-12 select-none">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Users className="h-[500px] w-[500px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-4 animate-fadeIn">
          <span className="inline-flex items-center gap-2 font-black text-xs md:text-sm uppercase tracking-widest bg-white/15 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full w-fit text-blue-100">
            <Sparkles className="h-4 w-4 animate-pulse text-yellow-300" /> Academic Ecosystem & Support
          </span>
          <h1 className="font-outfit text-4xl md:text-6xl font-black tracking-tight leading-none">
            Student Support Services
          </h1>
          <p className="text-blue-100/80 font-semibold text-base md:text-xl mt-2 max-w-3xl leading-relaxed">
            Enabling transformative growth through specialized guidance committees, counseling frameworks, merit recognition pathways, and dynamic extension camps.
          </p>
        </div>
      </div>

      {/* Mobile Menu Selector for smaller screen viewports */}
      <div className="md:hidden mb-6 relative select-none">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between text-[#002147] font-black shadow-sm active:scale-[0.98] transition-all"
        >
          <span className="flex items-center gap-3">
            <activeTab.icon className="h-5 w-5 shrink-0 text-indigo-600" />
            {activeTab.text}
          </span>
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 shadow-xl rounded-2xl z-30 p-2 flex flex-col gap-1 max-h-96 overflow-y-auto animate-fadeInUp">
            {Object.entries(tabGroups).map(([grp, items]) => (
              <div key={grp} className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 px-3 pt-3 pb-1">{grp}</span>
                {items.map((t) => (
                  <Link 
                    key={t.slug} 
                    href={`/student-support/${t.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSlug === t.slug ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <t.icon className={`h-4 w-4 ${activeSlug === t.slug ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {t.text}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Navigation and Content Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
        
        {/* High-Fidelity Desktop Sticky Sidebar Menu */}
        <div className="hidden md:flex flex-col gap-6 sticky top-24 select-none">
          <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 max-h-[80vh] overflow-y-auto no-scrollbar">
            
            {Object.entries(tabGroups).map(([grp, items]) => (
              <div key={grp} className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest font-black text-indigo-950/40 px-3 pt-1">
                  {grp}
                </span>
                {items.map((t) => {
                  const isActive = activeSlug === t.slug;
                  return (
                    <Link 
                      key={t.slug}
                      href={`/student-support/${t.slug}`}
                      className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-[13px] transition-all ${isActive 
                        ? 'bg-gradient-to-r from-[#002147] to-[#083b75] text-white shadow-md shadow-indigo-100' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#002147]'}`}
                    >
                      <span className={`flex items-center justify-center h-6 w-6 rounded-lg shrink-0 border transition-colors duration-300 ${isActive ? 'bg-white/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-slate-500 group-hover:bg-[#002147]/5 group-hover:text-[#002147]'}`}>
                        <t.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-snug">{t.text}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Compliancy Operational Badge Widget */}
          <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-[2.5rem] text-white flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white/5 h-32 w-32 rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <span className="bg-indigo-500/20 border border-indigo-400/20 text-indigo-200 px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-black w-fit">Regulatory</span>
              <h4 className="font-outfit text-base font-bold leading-tight">UGC & NAAC Certified</h4>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed">Supporting files, policies and compliance documents audited continuously for quality control.</p>
            </div>
          </div>
        </div>

        {/* Active Viewing Pane */}
        <div className="md:col-span-3 flex flex-col gap-8 animate-fadeIn">
          
          {/* Header Bar for Content Panel */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 bg-[#002147]/5 border border-[#002147]/10 rounded-2xl text-[#002147] flex items-center justify-center shadow-xs">
                <activeTab.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-outfit text-2xl md:text-3xl font-black text-[#002147] tracking-tight leading-none capitalize">
                  {currentSection.title || activeTab.text}
                </h2>
                <p className="text-slate-400 font-bold text-[10px] md:text-xs mt-1.5 uppercase tracking-widest flex items-center gap-1">
                  <span>{activeTab.group}</span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                  <span className="text-slate-600 font-black">Current Segment</span>
                </p>
              </div>
            </div>
          </div>

          {/* Embed & Policy Files Section (Display at the top if policies exist!) */}
          {currentSection.files && currentSection.files.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-50/50 to-transparent border border-indigo-100 rounded-[2rem] p-6 flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <FileDown className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-outfit font-black text-sm md:text-base text-slate-800">Institutional Policy Framework</h4>
                  <p className="text-slate-500 text-[11px] font-semibold">Mandatory official documentations associated with this segment.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSection.files.map((f: any, idx: number) => (
                  <a 
                    key={idx}
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md p-4 rounded-xl group transition-all active:scale-[0.99]"
                  >
                    <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-800 transition-colors leading-snug pr-2">
                      {f.name}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Beautiful Main Text Layout Canvas Container */}
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-6 md:p-10 shadow-xs select-text selection:bg-indigo-100 selection:text-indigo-950">
            {renderContentBody(currentSection.content)}
          </div>

        </div>
      </div>
    </div>
  );
}
