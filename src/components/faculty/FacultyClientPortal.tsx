"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Building, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Search, 
  ChevronDown, 
  FileText, 
  ChevronRight,
  FileDown,
  ExternalLink,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Network,
  Lightbulb,
  Activity
} from "lucide-react";
import { staticFacultyMembers, staticFacultySections, FacultyMember } from "./staticData";
import { PortableText } from "@portabletext/react";

// Mappings and Configurations for URL slugs
const tabs = [
  { text: "List of Teaching Staff", slug: "teaching-staff", icon: Users, type: "roster", filter: "teaching" },
  { text: "Faculty Department wise", slug: "department-wise", icon: Building, type: "dept-roster" },
  { text: "List of Non-Teaching Staff", slug: "non-teaching-staff", icon: Network, type: "roster", filter: "non-teaching" },
  { text: "Visiting / Adjunct Professors", slug: "visiting-professors", icon: GraduationCap, type: "section", secKey: "visiting" },
  { text: "Recruitment Policy & Process", slug: "recruitment-policy", icon: ShieldCheck, type: "section", secKey: "recruitment" },
  { text: "Professional Development", slug: "professional-development", icon: Activity, type: "pdf-list", category: "professional-development" },
  { text: "Seminars & Conferences", slug: "seminars-conferences", icon: BookOpen, type: "pdf-list", category: "seminars-conferences" },
  { text: "Faculty Achievements", slug: "faculty-achievements", icon: Award, type: "section", secKey: "achievements" },
  { text: "Faculty Exchange & Sabbaticals", slug: "faculty-exchange", icon: Lightbulb, type: "section", secKey: "exchange" },
  { text: "Consultancy Assignments", slug: "consultancy-assignments", icon: BookOpen, type: "section", secKey: "consultancy" },
  { text: "360° Performance Appraisal", slug: "performance-appraisal", icon: FileText, type: "section", secKey: "appraisal" },
];

interface FacultyClientPortalProps {
  initialMembers: any[];
  initialSections: any[];
  activeSlug: string;
  profileSlugMap?: Record<string, string>;
  initialPdfDocuments?: any[];
}

export default function FacultyClientPortal({ 
  initialMembers = [], 
  initialSections = [], 
  activeSlug = "teaching-staff",
  profileSlugMap = {},
  initialPdfDocuments = []
}: FacultyClientPortalProps) {
  
  const router = useRouter();
  const activeTab = tabs.find(t => t.slug === activeSlug) || tabs[0];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for active collapsible department in Accordion view
  const [openDept, setOpenDept] = useState<string | null>(null);

  // Reset search query when switching tabs
  useEffect(() => {
    setSearchQuery("");
    setMobileMenuOpen(false);
  }, [activeSlug]);

  // 1. COMPUTE MEMBERS (Sanity dynamic with fallback to precise TypeScript static data)
  const mergedMembers = useMemo(() => {
    if (initialMembers && initialMembers.length > 0) {
      return initialMembers.map(m => ({
        sNo: m.sNo,
        name: m.name,
        staffType: m.staffType || "teaching",
        designation: m.designation,
        department: m.department,
        qualification: m.qualification,
        dateOfJoining: m.dateOfJoining,
        experience: m.experience,
        profilePdfUrl: m.profilePdfUrl,
        imageUrl: m.imageUrl,
        slug: m.slug
      }));
    }
    return [];
  }, [initialMembers]);

  // 2. COMPUTE SECTIONS DATA
  const getSectionContent = (key: string) => {
    const matched = initialSections?.find((s: any) => s.category === key);
    if (matched) {
      return {
        title: matched.title,
        content: matched.content, // is PortableText array
        images: matched.images || [],
        files: matched.files || []
      };
    }
    // Fallback to static content string
    const staticData = staticFacultySections[key];
    return {
      title: staticData?.title || activeTab.text,
      content: staticData?.content || "",
      isStatic: true,
      images: [],
      files: key === "appraisal" ? [{ description: "Download Annual Self-Appraisal Report (ASAR) PDF", url: "/Content/5.Faculty/10.Performance Appraisal.pdf" }] : []
    };
  };

  // FILTERED ROSTER DATA
  const filteredMembers = useMemo(() => {
    let list = mergedMembers;
    
    // First filter by type if active tab dictates
    if (activeTab.type === "roster" && activeTab.filter) {
      if (activeTab.filter === "non-teaching") {
        list = list.filter(m => m.staffType === "non-teaching" || m.staffType === "contingent");
      } else {
        list = list.filter(m => m.staffType === activeTab.filter);
      }
    }

    // Next search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.designation.toLowerCase().includes(q) ||
        m.department?.toLowerCase().includes(q) ||
        m.qualification?.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => {
      // Contingent should show at bottom of non-teaching tab
      if (a.staffType === "non-teaching" && b.staffType === "contingent") return -1;
      if (a.staffType === "contingent" && b.staffType === "non-teaching") return 1;
      return a.sNo - b.sNo;
    });
  }, [mergedMembers, activeTab, searchQuery]);

  // GROUPED DEPARTMENTS FOR TAB 2
  const departmentalGroups = useMemo(() => {
    const groups: Record<string, FacultyMember[]> = {};
    
    // Only use "teaching" staff for departmental mapping
    const teachingList = mergedMembers.filter(m => m.staffType === "teaching");
    
    teachingList.forEach(m => {
      const d = m.department?.trim() || "General / Administration";
      if (!groups[d]) groups[d] = [];
      groups[d].push(m);
    });

    // Order groups nicely
    return Object.keys(groups).sort().reduce((acc, key) => {
      acc[key] = groups[key].sort((a, b) => a.sNo - b.sNo);
      return acc;
    }, {} as Record<string, FacultyMember[]>);
  }, [mergedMembers]);

  // Helper: Enhanced Robust Regex Tokenizer to universally hydrate BOTH links and bold markdown wrappers!
  const renderRichString = (str: string) => {
    if (!str) return "";
    
    // Captures BOTH:
    // 1. **bold** or __bold__
    // 2. [label](url)
    const tokenRegex = /(\*\*|__)(.+?)\1|\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    let keyCounter = 0;
    
    while ((match = tokenRegex.exec(str)) !== null) {
      // Add plain text preceding the match
      if (match.index > lastIdx) {
        parts.push(str.substring(lastIdx, match.index));
      }
      
      if (match[1]) {
        // Bold Marker matched
        parts.push(
          <strong key={keyCounter++} className="text-[#002147] font-black tracking-tight inline">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        // Link matched
        parts.push(
          <a 
            key={keyCounter++} 
            href={match[4]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:text-indigo-800 font-bold underline-offset-4 transition-colors inline hover:underline"
          >
            {match[3]}
          </a>
        );
      }
      
      lastIdx = tokenRegex.lastIndex;
    }
    
    // Add remaining trailing text
    if (lastIdx < str.length) {
      parts.push(str.substring(lastIdx));
    }
    
    return parts.length > 0 ? parts : str;
  };

  // Helper: Rich intelligent parser for static markdown fallbacks
  const renderStaticText = (text: string, key: string) => {
    if (!text) return null;

    // 1. Edge-case: Convert Flat Serialised Professional Development strings into a beautiful visual HTML table!
    if (key === "professional-dev" && text.includes("\n\nNo\n\nName of the Faculty")) {
      const parts = text.split("\n\n").map(p => p.trim()).filter(Boolean);
      const noIndex = parts.indexOf("No");
      
      if (noIndex !== -1) {
        const beforeTable = parts.slice(0, noIndex);
        const tableItems = parts.slice(noIndex);
        
        const headers = tableItems.slice(0, 10);
        const rowData = tableItems.slice(10);
        
        const rows: string[][] = [];
        for (let i = 0; i < rowData.length; i += 10) {
          const chunk = rowData.slice(i, i + 10);
          if (chunk.length > 0) rows.push(chunk);
        }
        
        return (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {beforeTable.map((p, i) => {
              if (p.includes("[Refer to")) return null;
              return (
                <h3 key={i} className="font-outfit text-lg md:text-xl font-black text-[#002147] border-b-2 border-slate-100 pb-2 mb-2">
                  {p}
                </h3>
              );
            })}
            
            <div className="overflow-x-auto rounded-3xl border-2 border-slate-100 bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-outfit text-[9px] uppercase tracking-wider font-black text-slate-500">
                    {headers.map((h, idx) => (
                      <th key={idx} className="px-3 py-4 font-black whitespace-nowrap border-r border-slate-100/60 last:border-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50/20 transition-colors text-[11px]">
                      {row.map((cell, cIdx) => {
                        const isNum = cIdx === 0;
                        const isFaculty = cIdx === 1;
                        const isDays = cIdx === 8;
                        return (
                          <td key={cIdx} className={`px-3 py-3 font-semibold border-r border-slate-50 last:border-0 ${
                            isNum ? "text-center font-black text-[#002147] bg-slate-50/30" :
                            isFaculty ? "text-slate-800 font-bold min-w-[140px]" :
                            isDays ? "text-center font-black text-indigo-700 bg-indigo-50/10" :
                            "text-slate-500 leading-tight"
                          }`}>
                            {cell}
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
    }

    // 2. Multi-format pre-processing parser for general institutional text, policies & listings
    const rawChunks = text.split("\n\n").map(c => c.trim()).filter(Boolean);
    const processedNodes: any[] = [];
    
    let scanIndex = 0;
    while (scanIndex < rawChunks.length) {
      const chunk = rawChunks[scanIndex];
      
      // SKIPPER: Detailed documents references
      if (chunk.startsWith("[Refer to")) {
        scanIndex++;
        continue;
      }
      
      // GROUPER A: Full Institutional Header & Seal Box
      if (chunk.toUpperCase().includes("ST.ANN") && chunk.toUpperCase().includes("COLLEGE FOR WOMEN")) {
        const details: string[] = [];
        let emailLine = "";
        let criterionVal = "";
        let metricVal = "";
        
        let lookAhead = scanIndex + 1;
        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          
          if (nextVal.toLowerCase().includes("email:") || nextVal.toLowerCase().includes("website:")) {
            emailLine = nextVal;
          } else if (nextVal.toLowerCase().startsWith("criterion:")) {
            // Next item is usually the value e.g. "VI"
            criterionVal = rawChunks[lookAhead + 1] || "";
            lookAhead++; // skip next item as it's criterion value
          } else if (nextVal.toLowerCase().startsWith("metric:")) {
            metricVal = nextVal.replace(/metric:\s*/i, "").trim();
          } else if (nextVal.toUpperCase().includes("CHAPTER") || nextVal.toUpperCase().includes("APPOINTMENT") || nextVal.includes("APPOINTMENT OF STAFF")) {
            // Hitting document body content
            break;
          } else if (details.length < 7) {
            details.push(nextVal);
          } else {
            break; // Stop infinite loop safely
          }
          lookAhead++;
        }
        
        processedNodes.push({
          type: 'letterhead',
          college: chunk,
          details,
          email: emailLine,
          criterion: criterionVal,
          metric: metricVal
        });
        
        scanIndex = lookAhead;
        continue;
      }
      
      // GROUPER B: Final Authorized Signatory Footer
      if (chunk.toLowerCase().includes("approved by the president") || chunk.toLowerCase().startsWith("approved by the")) {
        const sigLines: string[] = [chunk];
        let lookAhead = scanIndex + 1;
        while (lookAhead < rawChunks.length && lookAhead < scanIndex + 5) {
          sigLines.push(rawChunks[lookAhead]);
          lookAhead++;
        }
        processedNodes.push({
          type: 'signature',
          lines: sigLines
        });
        scanIndex = lookAhead;
        continue;
      }
      
      // DEFAULT: Process as standard node
      processedNodes.push({
        type: 'raw',
        text: chunk
      });
      scanIndex++;
    }

    // 3. Unified Element Renderer
    return processedNodes.map((node, i) => {
      if (node.type === 'letterhead') {
        return (
          <div key={i} className="bg-gradient-to-br from-[#002147] to-[#053d79] p-6 md:p-10 rounded-3xl text-white relative overflow-hidden mb-8 text-center shadow-xl border border-indigo-950 animate-fadeIn">
            <div className="absolute right-0 top-0 opacity-[0.04] transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Award className="h-[400px] w-[400px] text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20 shadow-inner">
                <ShieldCheck className="h-6 w-6 text-indigo-300" />
              </div>
              
              <h3 className="font-outfit text-xl md:text-2xl lg:text-3xl font-black tracking-wide mb-4 text-white uppercase drop-shadow-sm">
                {node.college}
              </h3>
              
              <div className="flex flex-col gap-1 text-slate-200/90 font-semibold text-xs md:text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
                {node.details.map((line: string, idx: number) => (
                  <p key={idx} className={idx === 0 ? "text-indigo-200 font-bold tracking-wider text-[13px] mb-1" : "opacity-80"}>
                    {line}
                  </p>
                ))}
              </div>

              {node.email && (
                <div className="inline-block bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 text-xs text-indigo-100 font-mono tracking-wide mb-8">
                  {renderRichString(node.email)}
                </div>
              )}
              
              {(node.criterion || node.metric) && (
                <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-6 max-w-md mx-auto">
                  {node.criterion && (
                    <div className="flex-1 bg-[#002147]/40 border border-white/10 py-2 px-4 rounded-xl backdrop-blur-sm">
                      <div className="text-[9px] uppercase tracking-widest font-black text-indigo-300">Criterion</div>
                      <div className="font-outfit font-black text-base mt-0.5">{node.criterion}</div>
                    </div>
                  )}
                  {node.metric && (
                    <div className="flex-1 bg-[#002147]/40 border border-white/10 py-2 px-4 rounded-xl backdrop-blur-sm">
                      <div className="text-[9px] uppercase tracking-widest font-black text-indigo-300">Metric</div>
                      <div className="font-outfit font-black text-base mt-0.5">{node.metric}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }

      if (node.type === 'signature') {
        return (
          <div key={i} className="mt-16 mb-6 flex flex-col items-end pr-2 md:pr-4 animate-fadeIn">
            <div className="bg-slate-50 border border-slate-200/80 rounded-[2rem] px-8 py-7 min-w-[260px] text-right relative overflow-hidden shadow-sm">
              <div className="absolute right-0 top-0 w-1 h-full bg-indigo-600"></div>
              
              {node.lines.map((line: string, idx: number) => {
                const isAppr = line.toLowerCase().includes("approved");
                const isName = line.toUpperCase() === line || line.includes("Rev.");
                return (
                  <p key={idx} className={`
                    ${isAppr ? "text-[9px] tracking-widest uppercase text-indigo-600 font-black font-mono mb-4 opacity-90" : ""}
                    ${isName ? "font-outfit text-[16px] md:text-[17px] font-black text-[#002147] mb-1" : "text-slate-500 text-[11px] font-bold font-mono uppercase tracking-wider"}
                  `}>
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        );
      }

      const p = node.text;

      // Check A: Section / Chapter / Roman Numerals Title Card Trigger
      const isAllCaps = p.toUpperCase() === p && p.length > 4;
      const startsWithRoman = /^[IVX]+\.\s*[A-Z]/.test(p);
      const isHeaderLike = p.length < 85 && (isAllCaps || startsWithRoman || (!p.endsWith(".") && !p.includes("\n")));
      
      if (isHeaderLike) {
        if (p.includes("CHAPTER") || startsWithRoman || p.includes("CODE OF CONDUCT")) {
          return (
            <h3 key={i} className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight mt-12 mb-5 pt-8 border-t border-slate-150 flex items-center gap-3 animate-fadeIn">
              <span className="h-6 w-1.5 rounded-full bg-indigo-600 shadow-sm"></span>
              {p}
            </h3>
          );
        }
        return (
          <h4 key={i} className="font-outfit text-base md:text-lg font-black text-slate-800 mt-8 mb-3 uppercase tracking-wider border-l-4 border-indigo-100 pl-3">
            {p}
          </h4>
        );
      }

      // Check B: Bullet Lists
      if (p.startsWith("-") || (p.startsWith("*") && !p.startsWith("*Statutory"))) {
        const listItems = p.split("\n").map((li: string) => li.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
        return (
          <ul key={i} className="list-none pl-1 my-6 space-y-3.5">
            {listItems.map((li: string, idx: number) => {
              const colonSplit = li.indexOf(":");
              const hasCompactLabel = colonSplit > 0 && colonSplit < 35;
              
              if (hasCompactLabel) {
                const label = li.substring(0, colonSplit);
                const desc = li.substring(colonSplit + 1);
                return (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    <span className="h-2 w-2 rounded bg-indigo-500 mt-1.5 shrink-0"></span>
                    <span>
                      <strong className="text-[#002147] font-black mr-1.5 tracking-tight border-b border-indigo-50">{label}:</strong>
                      {renderRichString(desc)}
                    </span>
                  </li>
                );
              }
              
              return (
                <li key={idx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                  <span className="h-2 w-2 rounded bg-indigo-500 mt-1.5 shrink-0"></span>
                  <span>{renderRichString(li)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Check C: Multi-line Numbered Lists embedded within paragraphs
      if (/^\d+\.\s+/.test(p)) {
        const numericItems = p.split(/\n(?=\d+\.)/).map((li: string) => li.trim()).filter(Boolean);
        if (numericItems.length > 1) {
          return (
            <ol key={i} className="space-y-3.5 my-6 pl-1 flex flex-col">
              {numericItems.map((li: string, idx: number) => {
                const val = li.replace(/^\d+\.\s*/, "");
                return (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    <span className="flex items-center justify-center h-5 w-5 rounded-lg bg-[#002147]/5 border border-[#002147]/10 text-[#002147] text-[10px] font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{renderRichString(val)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }
      }

      // Check D: Statutory Citation Block
      if (p.startsWith("*") && p.endsWith("*")) {
        const cleanStr = p.replaceAll("*", "").trim();
        return (
          <div key={i} className="bg-gradient-to-r from-amber-50 to-transparent border-l-4 border-amber-500 p-5 rounded-r-2xl my-6 font-sans">
            <p className="text-amber-900 font-bold text-xs md:text-sm italic leading-relaxed m-0 flex items-start gap-2.5">
              <span className="shrink-0 mt-0.5">📌</span> {cleanStr}
            </p>
          </div>
        );
      }

      // Check E: Contact Detail / Metadata Layouts
      if (p.toLowerCase().includes("email:") || p.toLowerCase().includes("website:")) {
        return (
          <div key={i} className="bg-slate-50 border border-slate-200 p-5 rounded-[1.5rem] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-bold text-[#002147] my-6 shadow-xs font-mono uppercase tracking-wider">
            {p.split("\n").map((l: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 truncate">{renderRichString(l)}</div>
            ))}
          </div>
        );
      }

      // Check F: Highlight key:value paragraphs (e.g. Criterion: VI)
      const firstColon = p.indexOf(":");
      if (firstColon > 2 && firstColon < 25 && !p.includes("\n")) {
        const prop = p.substring(0, firstColon).trim();
        const body = p.substring(firstColon + 1).trim();
        return (
          <div key={i} className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50/50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-xs mr-3 mb-3">
            <span className="text-[#002147] font-black text-[10px] uppercase tracking-wider">{prop}:</span>
            <span className="text-indigo-700 font-black">{body}</span>
          </div>
        );
      }

      // Check G: Image Renderer
      if (p.startsWith("<img")) {
        const srcMatch = p.match(/src="(.*?)"/);
        const src = srcMatch ? srcMatch[1] : "";
        return (
          <div key={i} className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img src={src} alt="Content" className="w-full h-auto object-cover" />
          </div>
        );
      }

      // Standard Paragraph Block
      return (
        <p key={i} className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed mb-5 text-justify">
          {renderRichString(p)}
        </p>
      );
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16 font-sans w-full">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#053d79] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl mb-8">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Users className="h-[500px] w-[500px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 font-black text-[10px] md:text-xs uppercase tracking-widest bg-white/15 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full w-fit text-blue-100">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-yellow-300" /> Core Intellectual Pillars
          </span>
          <h1 className="font-outfit text-2xl md:text-4xl font-black tracking-tight leading-none">
            Faculty & Staff
          </h1>
          <p className="text-blue-100/80 font-semibold text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
            An accomplished assembly of educators, researchers, and administrative specialists fostering empowerment and transforming ambitions into reality.
          </p>
        </div>
      </div>

      {/* Interactive Mobile Selector */}
      <div className="md:hidden mb-6 relative">
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
          <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 shadow-xl rounded-2xl z-30 p-2 flex flex-col gap-1 animate-fadeInUp">
            {tabs.map((t) => (
              <Link 
                key={t.slug} 
                href={`/faculty/${t.slug}`}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeSlug === t.slug ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <t.icon className={`h-4 w-4 ${activeSlug === t.slug ? 'text-indigo-600' : 'text-slate-400'}`} />
                {t.text}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* MAIN DESKTOP GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
        
        {/* SIDEBAR COMPONENT */}
        <div className="hidden md:flex flex-col gap-6 sticky top-24 select-none">
          
          {/* Glassmorphic Pillar Indicator Wrapper */}
          <div className="bg-white border border-slate-200/70 rounded-[2rem] p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 px-4 pt-2 pb-1 inline-block">
              Faculty Sections
            </span>
            {tabs.map((t) => {
              const isActive = activeSlug === t.slug;
              return (
                <Link 
                  key={t.slug}
                  href={`/faculty/${t.slug}`}
                  className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${isActive 
                    ? 'bg-gradient-to-r from-[#002147] to-[#083b75] text-white shadow-md shadow-slate-200' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#002147]'}`}
                >
                  <span className={`flex items-center justify-center h-7 w-7 rounded-xl shrink-0 border transition-colors duration-300 ${isActive ? 'bg-white/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-slate-500 group-hover:bg-[#002147]/5 group-hover:text-[#002147]'}`}>
                    <t.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-snug">{t.text}</span>
                </Link>
              );
            })}
          </div>

          {/* Administrative Badge Widgets */}
          <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-[2rem] text-white flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white/5 h-32 w-32 rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col gap-2">
              <span className="bg-indigo-500/20 border border-indigo-400/20 text-indigo-200 px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-black w-fit">Resource Links</span>
              <h4 className="font-outfit text-lg font-bold leading-tight">IQAC Compliant Operations</h4>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed">Records maintained periodically as per regulatory university standards and guidelines.</p>
            </div>
          </div>

        </div>

        {/* ACTIVE DYNAMIC VIEWING AREA */}
        <div className="md:col-span-3 flex flex-col gap-8">
          
          {/* HEADER FOR CONTENT SECTION */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 shrink-0 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 flex items-center justify-center shadow-sm">
                <activeTab.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-outfit text-2xl md:text-3xl font-black text-[#002147] tracking-tight leading-none capitalize">
                  {activeTab.text}
                </h2>
                <p className="text-slate-400 font-bold text-xs mt-1.5 uppercase tracking-wider">
                  {activeTab.type === "roster" ? "Official Personnel Directory" : activeTab.type === "dept-roster" ? "Organized Groupings" : "Policies & Compliance Details"}
                </p>
              </div>
            </div>

            {/* Search Box shown only on lists */}
            {(activeTab.type === "roster" || activeTab.type === "dept-roster") && (
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search names, roles, dept..."
                  className="w-full bg-white border-2 border-slate-100 focus:border-indigo-600 hover:border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none shadow-sm transition-colors"
                />
              </div>
            )}
          </div>

          {/* RENDER VIEW 1: TABULAR ROSTER VIEW (Teaching & Non-Teaching) */}
          {activeTab.type === "roster" && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              
              <div className="overflow-x-auto rounded-3xl border-2 border-slate-100 bg-white shadow-sm">
                <table className="w-full border-collapse text-left font-sans">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 font-outfit text-[10px] uppercase tracking-widest font-black text-slate-500">
                      <th className="px-3 py-4 text-center w-10">S.No</th>
                      <th className="px-3 py-4 min-w-[160px]">Name</th>
                      <th className="px-3 py-4 min-w-[110px]">Designation</th>
                      {activeTab.filter === "teaching" && <th className="px-3 py-4 min-w-[100px]">Department</th>}
                      <th className="px-3 py-4 min-w-[140px]">Qualification</th>
                      <th className="px-3 py-4 min-w-[100px]">Joined On</th>
                      <th className="px-3 py-4 min-w-[70px] text-center">Exp (Yrs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((m, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors group">
                          <td className="px-3 py-3.5 text-center font-bold text-[#002147] bg-slate-50/30 text-xs">{m.sNo}</td>
                          <td className="px-3 py-3.5">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 text-xs group-hover:text-indigo-700 transition-colors leading-tight">{m.name}</span>
                              {m.staffType === "contingent" && (
                                <span className="inline-block w-fit mt-1 px-2 py-0.5 rounded text-[8px] font-black uppercase bg-amber-50 border border-amber-100 text-amber-800">Contingent</span>
                              )}
                              {(() => {
                                const profileSlug = (m as any).slug || profileSlugMap[m.name?.trim().toLowerCase()];
                                return profileSlug ? (
                                  <Link
                                    href={`/faculty/profile/${profileSlug}`}
                                    className="flex items-center gap-1 text-[9px] font-black text-emerald-600 mt-1 hover:underline uppercase tracking-wide"
                                  >
                                    <ArrowRight className="h-2.5 w-2.5" /> View Profile
                                  </Link>
                                ) : null;
                              })()}
                              {(m as any).profilePdfUrl && (
                                <a 
                                  href={(m as any).profilePdfUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-[9px] font-black text-indigo-600 mt-1 hover:underline uppercase tracking-wide"
                                >
                                  <FileDown className="h-2.5 w-2.5" /> View CV
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-3.5 font-semibold text-slate-600 text-xs leading-tight">{m.designation}</td>
                          {activeTab.filter === "teaching" && (
                            <td className="px-3 py-3.5">
                              <span className="inline-block bg-indigo-50/50 text-indigo-950 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-tight whitespace-nowrap">
                                {m.department || "NA"}
                              </span>
                            </td>
                          )}
                          <td className="px-3 py-3.5 font-semibold text-slate-500 text-xs italic leading-tight">{m.qualification || "NA"}</td>
                          <td className="px-3 py-3.5 font-semibold text-slate-500 text-xs whitespace-nowrap">{m.dateOfJoining}</td>
                          <td className="px-3 py-3.5 text-center font-black text-[#002147] text-xs">{m.experience}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={activeTab.filter === "teaching" ? 7 : 6} className="px-6 py-12 text-center font-semibold text-slate-400 text-sm">
                          No staff members matching search criteria were found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RENDER VIEW 2: DEPARTMENT WISE ACCORDION VIEWER */}
          {activeTab.type === "dept-roster" && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              
              {Object.keys(departmentalGroups).length > 0 ? (
                Object.entries(departmentalGroups).map(([deptName, staff], i) => {
                  // Simple filter logic inside loop for search queries
                  const matchesSearch = staff.filter(m => 
                    !searchQuery || 
                    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.designation.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  if (searchQuery && matchesSearch.length === 0) return null;
                  
                  const isCollapsed = openDept === deptName;
                  
                  return (
                    <div key={i} className="bg-white border-2 border-slate-100 hover:border-slate-200 rounded-3xl shadow-sm transition-all overflow-hidden">
                      
                      {/* Head clicker */}
                      <button 
                        onClick={() => setOpenDept(isCollapsed ? null : deptName)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left group active:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${isCollapsed ? 'bg-indigo-600 text-white' : 'bg-[#002147]/5 text-[#002147] group-hover:bg-indigo-50'}`}>
                            <Building className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-outfit text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors">{deptName}</h3>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">
                              {staff.length} Faculty Member{staff.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isCollapsed ? 'rotate-90 text-indigo-600' : ''}`} />
                      </button>

                      {/* Collapsible Container */}
                      {isCollapsed && (
                        <div className="border-t border-slate-100 p-6 bg-slate-50/30 flex flex-col gap-4 animate-slideDown">
                          <div className="flex flex-col gap-6">
                            {matchesSearch.map((m, idx) => (
                              <div key={idx} className="bg-white border border-slate-200/80 hover:border-emerald-200/50 hover:shadow-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 md:gap-8 transition-all duration-300">
                                {/* Left Side: Faculty Info */}
                                <div className="flex-1 flex flex-col justify-center text-left">
                                  <div className="flex items-center gap-2">
                                    {m.designation.includes("Principal") && (
                                      <span className="bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase">
                                        Leadership
                                      </span>
                                    )}
                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase">
                                      Rank #{m.sNo}
                                    </span>
                                  </div>
                                  
                                  <h4 className="font-outfit text-xl md:text-2xl font-black text-[#002147] mt-2 mb-3 md:mb-4 leading-tight">
                                    {m.name}
                                  </h4>
                                  
                                  <div className="space-y-1.5 md:space-y-2 mt-2 border-t border-slate-100 pt-3 md:pt-4 text-slate-650 text-sm md:text-base font-semibold">
                                    <p>
                                      <span className="font-black text-slate-800">Designation:</span> {m.designation}
                                    </p>
                                    <p>
                                      <span className="font-black text-slate-800">Qualifications:</span> {m.qualification}
                                    </p>
                                    <p>
                                      <span className="font-black text-slate-800">Date of Joining:</span> {m.dateOfJoining}
                                    </p>
                                    <p>
                                      <span className="font-black text-slate-800">Teaching Experience:</span> {m.experience} Years
                                    </p>
                                  </div>
                                </div>

                                {/* Right Side: Framed Image & View Profile Link */}
                                <div className="flex flex-col items-center justify-center gap-3 shrink-0">
                                  <div className="relative p-2 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-inner w-36 h-44 overflow-hidden flex items-center justify-center group/img">
                                    {m.imageUrl ? (
                                      <img 
                                        src={m.imageUrl} 
                                        alt={m.name} 
                                        className="w-full h-full object-cover rounded-xl transition duration-500 group-hover/img:scale-105"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold font-outfit text-xs">
                                        No Photo
                                      </div>
                                    )}
                                  </div>
                                  
                                  <a 
                                    href={m.profilePdfUrl || "/documents/dummy-profile.pdf"}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="font-outfit text-sm font-black text-rose-600 hover:text-rose-800 transition-colors uppercase tracking-wider flex items-center gap-1 hover:underline underline-offset-4"
                                  >
                                    View Profile
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-400 font-bold">No Departments Data Loaded.</div>
              )}

            </div>
          )}

          {/* RENDER VIEW 3: DYNAMIC RICH-TEXT & DOCUMENT VIEW (Tabs 4 to 10) */}
          {activeTab.type === "section" && activeTab.secKey && (() => {
            const section = getSectionContent(activeTab.secKey);
            
            return (
              <div className="flex flex-col gap-8 animate-fadeIn">
                
                {/* Text Section Card */}
                <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                  
                  {/* Header Indicator */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Institutional Policy Documents</span>
                  </div>

                  {/* Content Parser */}
                  <div className="prose max-w-none">
                    {section.isStatic ? (
                      // Render plain text paragraphs gracefully from statically typed fallback data
                      renderStaticText(section.content, activeTab.secKey || "")
                    ) : (
                      // Render PortableText arrays fetched directly from Sanity Studio updates
                      <div className="font-sans leading-relaxed text-slate-600">
                        <PortableText 
                          value={section.content}
                          components={{
                            block: {
                              h1: ({children}) => <h3 className="font-outfit text-2xl font-black text-slate-800 mt-8 mb-4">{children}</h3>,
                              h2: ({children}) => <h4 className="font-outfit text-xl font-black text-[#002147] mt-6 mb-3">{children}</h4>,
                              h3: ({children}) => <h5 className="font-outfit text-lg font-black text-slate-800 mt-4 mb-2">{children}</h5>,
                              normal: ({children}) => <p className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed mb-4">{children}</p>,
                              blockquote: ({children}) => <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-slate-500 bg-indigo-50/30 p-4 rounded-r-lg my-4">{children}</blockquote>,
                            },
                            list: {
                              bullet: ({children}) => <ul className="list-disc pl-6 my-4 space-y-2 text-slate-600 font-semibold text-sm leading-relaxed">{children}</ul>,
                              number: ({children}) => <ol className="list-decimal pl-6 my-4 space-y-2 text-slate-600 font-semibold text-sm leading-relaxed">{children}</ol>,
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* File Attachments Render for Section PDFs */}
                  {section.files && section.files.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col gap-4">
                      <h4 className="font-outfit text-base font-black text-slate-800">Official Downloads & Forms</h4>
                      <div className="flex flex-wrap gap-4">
                        {section.files.map((f: any, i: number) => (
                          <a 
                            key={i} 
                            href={f.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-2xl bg-[#002147] hover:bg-[#083e7a] px-6 py-3 text-sm font-bold text-white hover:-translate-y-0.5 shadow-md transition-all duration-300 active:scale-95"
                          >
                            <FileDown className="h-4 w-4 shrink-0 text-blue-200" />
                            {f.description || "Download Document PDF"}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image Gallery Renderer */}
                  {section.images && section.images.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-100">
                      <h4 className="font-outfit text-base font-black text-slate-800 mb-4">Gallery Highlights & Artifacts</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {section.images.map((img: any, i: number) => (
                          <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[4/3] relative group">
                            <img src={img} alt={`Gallery artifact ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            );
          })()}

          {/* RENDER VIEW 4: FACULTY PDF DOCUMENTS GALLERY VIEW */}
          {activeTab.type === "pdf-list" && (() => {
            const filteredPdfs = initialPdfDocuments.filter(doc => doc.category === (activeTab as any).category);
            
            return (
              <div className="flex flex-col gap-8 animate-fadeIn">
                <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                  
                  {/* Header Indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Official Uploads & PDF Documents</span>
                  </div>

                  {filteredPdfs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredPdfs.map((doc, idx) => (
                        <div key={doc._id || idx} className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md hover:border-indigo-200 transition-all group">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-950 transition-colors">
                                {doc.title || "Untitled Document"}
                              </h4>
                              <span className="inline-block mt-2 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider bg-white border border-slate-200 text-slate-500">
                                {doc.category === "professional-development" ? "Professional Dev" : "Seminars & Conf"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-semibold">Document #{idx + 1}</span>
                            {doc.pdfUrl ? (
                              <a
                                href={doc.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-xl bg-[#002147] hover:bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-all shadow active:scale-95"
                              >
                                <FileDown className="h-3.5 w-3.5" />
                                Download PDF
                              </a>
                            ) : (
                              <span className="text-xs text-rose-500 font-bold">No file uploaded</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-bold text-sm">No PDF documents uploaded yet under this category.</p>
                      <p className="text-slate-400 text-xs mt-1">Updates will be published soon by the administrator.</p>
                    </div>
                  )}

                </div>
              </div>
            );
          })()}

        </div>

      </div>
    </div>
  );
}
