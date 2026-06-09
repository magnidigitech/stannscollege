"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Globe2,
  Handshake,
  ChevronDown,
  ChevronRight,
  Eye,
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { staticPlacementSections } from "./staticData";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

const navigationGroups = [
  {
    title: "Training & Placements",
    icon: Briefcase,
    slugPrefix: "training",
    items: [
      { text: "About Training & Placement Cell", slug: "about-cell" },
      { text: "Annual Reports", slug: "annual-reports" },
      { text: "Placement Statistics", slug: "placement-statistics" },
      { text: "Campus Recruitment Drives", slug: "recruitment-drives" },
      { text: "Skill Development Initiatives", slug: "skill-development" },
      { text: "Soft Skills & Personality Development", slug: "soft-skills" },
      { text: "Internships & Industry Exposure", slug: "internships-exposure" },
      { text: "Competitive Exam Coaching", slug: "competitive-coaching" },
      { text: "Career Guidance & Counselling", slug: "career-guidance" },
      { text: "Entrepreneurship Development", slug: "entrepreneurship" },
      { text: "Industry Linkages / Placement Partnerships", slug: "placement-partnerships" },
      { text: "Capacity Building & Skill Enhancement", slug: "capacity-building" },
      { text: "Alumni Career Support", slug: "alumni-support" },
      { text: "Training Calendar / Activity Gallery", slug: "training-calendar" }
    ]
  },
  {
    title: "Industry Linkages & Employability",
    icon: Handshake,
    slugPrefix: "industry",
    items: [
      { text: "Industry Partnerships", slug: "industry-partnerships" },
      { text: "Internships & Apprenticeships", slug: "internships-apprenticeships" },
      { text: "MoUs / Agreements", slug: "mous-agreements" },
      { text: "MoU Activities", slug: "mou-activities" },
      { text: "CSR Initiatives", slug: "csr-initiatives" },
      { text: "Placement Partnerships", slug: "industry-placement-partnerships" },
      { text: "Professional Certification Programmes", slug: "certifications" },
      { text: "Industry Expert Lectures", slug: "expert-lectures" },
      { text: "Industrial Visits", slug: "industrial-visits" },
      { text: "Skill-Based Training Programmes", slug: "skill-training" },
      { text: "Employability Enhancement Activities", slug: "employability-activities" }
    ]
  },
  {
    title: "Internationalization & Global Outreach",
    icon: Globe2,
    slugPrefix: "global",
    items: [
      { text: "International Collaborations", slug: "international-collaborations" },
      { text: "Internationalization Policy", slug: "internationalization-policy" },
      { text: "International Accreditations & Memberships", slug: "accreditations-memberships" },
      { text: "Global Alumni & Outreach Engagement", slug: "global-alumni" },
      { text: "Global Research Collaborations", slug: "global-research" },
      { text: "Student Exchange / Faculty Exchange", slug: "student-faculty-exchange" },
      { text: "International Webinars & Conferences", slug: "webinars-conferences" },
      { text: "Cross-Cultural Learning Activities", slug: "cross-cultural-learning" }
    ]
  }
];

interface PlacementsClientPortalProps {
  activeSlug: string;
  initialSections?: any[];
}

export default function PlacementsClientPortal({
  activeSlug = "about-cell",
  initialSections = []
}: PlacementsClientPortalProps) {

  // Accordion Expand States
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Training & Placements": true,
    "Industry Linkages & Employability": false,
    "Internationalization & Global Outreach": false
  });

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sections, setSections] = useState<Record<string, any>>(staticPlacementSections);
  
  // Flipbook States
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");

  // Auto-expand group of the active slug
  useEffect(() => {
    const activeGroup = navigationGroups.find(g => g.items.some(item => item.slug === activeSlug));
    if (activeGroup) {
      setExpandedGroups(prev => ({
        ...prev,
        [activeGroup.title]: true
      }));
    }
  }, [activeSlug]);

  // Merge server-side pre-fetched Sanity data with local static fallbacks
  useEffect(() => {
    if (initialSections && initialSections.length > 0) {
      const merged = { ...staticPlacementSections };
      initialSections.forEach((s: any) => {
        if (s.id) {
          merged[s.id] = {
            id: s.id,
            title: s.title || merged[s.id]?.title || "",
            content: s.content || merged[s.id]?.content || ""
          };
        }
      });
      setSections(merged);
    } else {
      setSections(staticPlacementSections);
    }
  }, [initialSections]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSelectedFileUrl(null);
    setSelectedFileTitle("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSlug]);

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  // Find active item and active group definitions
  const activeGroup = navigationGroups.find(g => g.items.some(item => item.slug === activeSlug)) || navigationGroups[0];
  const activeItem = activeGroup.items.find(item => item.slug === activeSlug) || activeGroup.items[0];

  const sectionData = sections[activeSlug] || {
    title: activeItem.text,
    content: ""
  };

  const stripEmojis = (str: string) => {
    if (!str) return "";
    return str.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, "").trim();
  };

  const renderRichString = (str: string) => {
    const sanitized = stripEmojis(str);
    if (!sanitized) return "";

    const tokenRegex = /(\*\*|__)([\s\S]+?)\1|\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    let keyCounter = 0;

    while ((match = tokenRegex.exec(sanitized)) !== null) {
      if (match.index > lastIdx) {
        parts.push(sanitized.substring(lastIdx, match.index));
      }

      if (match[1]) {
        const boldContent = match[2].replace(/__/g, "").trim();
        parts.push(
          <strong key={keyCounter++} className="text-[#004225] font-black tracking-tight inline">
            {renderRichString(boldContent)}
          </strong>
        );
      } else if (match[3]) {
        const linkLabel = match[3].replace(/__/g, "").trim();
        const linkUrl = match[4];
        const isPdf = linkUrl.toLowerCase().endsWith(".pdf") || linkUrl.toLowerCase().includes("/pdf");

        if (isPdf) {
          parts.push(
            <button
              key={keyCounter++}
              onClick={() => {
                setSelectedFileUrl(linkUrl);
                setSelectedFileTitle(linkLabel);
              }}
              className="text-emerald-700 hover:text-emerald-900 font-extrabold underline transition-all inline cursor-pointer text-left hover:scale-[1.01]"
            >
              {linkLabel}
            </button>
          );
        } else {
          parts.push(
            <a
              key={keyCounter++}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-800 font-bold underline transition-colors inline"
            >
              {linkLabel}
            </a>
          );
        }
      }
      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < sanitized.length) {
      parts.push(sanitized.substring(lastIdx));
    }

    return parts.length > 0 ? parts : sanitized;
  };

  const renderContentBody = (text: string) => {
    if (!text) return null;

    const rawChunks = text.split("\n\n").map(c => c.trim()).filter(Boolean);
    const nodes: any[] = [];

    let i = 0;
    while (i < rawChunks.length) {
      const chunk = rawChunks[i];

      const clean = (s: string) => (s || "").replace(/[*_]+/g, "").trim();
      const norm = (s: string) => (s || "").replace(/[*_\s\.]+/g, "").toLowerCase();
      
      const n0 = norm(chunk);
      const n1 = norm(rawChunks[i + 1] || "");
      const n2 = norm(rawChunks[i + 2] || "");
      const n3 = norm(rawChunks[i + 3] || "");
      const n4 = norm(rawChunks[i + 4] || "");

      if (n0 === "photogallery" || n0 === "gallery" || n0 === "photos" || chunk.startsWith("[Embedded") || n0.includes("suggestedwebsiteadditions")) {
        i++;
        continue;
      }

      const isSNo = n0.startsWith("sno") || n0.startsWith("slno") || n0 === "s";
      const isColStart = n0 === "academicyear" || n0 === "category" || n0 === "programme" || n0 === "year" || n0 === "nameofthedepartment";

      // Intelligent Tables
      const is8ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i+5]) && norm(rawChunks[i+6]) && norm(rawChunks[i+7]);
      const is7ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i+5]) && norm(rawChunks[i+6]);
      const is6ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i+5]);
      const is5ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4;
      const is4ColTable = (isSNo || isColStart) && n1 && n2 && n3;
      const is3ColTable = (isSNo || isColStart) && n1 && n2;
      const is2ColTable = (isSNo || isColStart || n0 === "category") && n1;

      const parseTable = (colCount: number) => {
        const headers = [];
        for (let j = 0; j < colCount; j++) {
            headers.push(rawChunks[i+j]);
        }
        const rowItems: string[] = [];
        let lookAhead = i + colCount;

        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          if (nextVal.startsWith("__") && nextVal.endsWith("__") && nextVal.length > 4) break;
          if (nextVal.startsWith("Link:")) break;
          if (nextClean.includes("Services") || nextClean.startsWith("View PDF") || nextClean.includes("Gallery")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }

        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += colCount) {
          const slice = rowItems.slice(r, r + colCount);
          if (slice.length > 0) {
            while (slice.length < colCount) slice.push("—");
            rows.push(slice);
          }
        }
        nodes.push({ type: "table", headers, rows, columns: colCount });
        i = lookAhead;
      };

      if (is8ColTable && (norm(rawChunks[i+7]).includes("notyetplaced") || norm(rawChunks[i+7]).includes("document") || norm(rawChunks[i+7]).includes("years"))) {
        parseTable(8);
        continue;
      }
      if (is7ColTable && (norm(rawChunks[i+6]).includes("viewdocument") || norm(rawChunks[i+6]).includes("document") || norm(rawChunks[i+6]).includes("years"))) {
          parseTable(7);
          continue;
      }
      if (is6ColTable && (norm(rawChunks[i+5]).includes("placementdrive") || norm(rawChunks[i+5]).includes("year") || norm(rawChunks[i+5]).includes("view"))) {
          parseTable(6);
          continue;
      }
      if (is5ColTable && (norm(rawChunks[i+4]).includes("highestpackage") || norm(rawChunks[i+4]).includes("studentsplaced") || norm(rawChunks[i+4]).includes("duration"))) {
        parseTable(5);
        continue;
      }
      if (is4ColTable) {
        if (norm(rawChunks[i+3]).includes("studentsinterned") || norm(rawChunks[i+3]).includes("purpose") || norm(rawChunks[i+3]).includes("duration")) {
            parseTable(4);
            continue;
        }
      }
      if (is3ColTable) {
         if (norm(rawChunks[i+2]).includes("totalselections")) {
            parseTable(3);
            continue;
         }
      }
      if (is2ColTable && n0 === "category" && n1.includes("totalselections")) {
        parseTable(2);
        continue;
      }

      if (chunk.startsWith("Link:")) {
         nodes.push({ type: "link", text: chunk.replace("Link:", "").trim() });
         i++;
         continue;
      }

      nodes.push({ type: "paragraph", text: chunk });
      i++;
    }

    let hasBoostedFirstHeader = false;

    return nodes.map((node, idx) => {
      if (node.type === "link") {
         const fileUrl = node.text;
         const fileName = fileUrl.split("/").pop() || "View Document";
         const cleanName = decodeURIComponent(fileName).replace(/\.[^/.]+$/, "");
         return (
             <button
                key={idx}
                onClick={() => {
                  setSelectedFileUrl(fileUrl);
                  setSelectedFileTitle(cleanName);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 mt-3 mb-6 bg-emerald-50 hover:bg-emerald-100 text-[#004225] font-extrabold rounded-xl transition-all border border-emerald-200/30 group w-fit hover:scale-[1.02] active:scale-[0.98] mr-4 shadow-sm"
             >
                <BookOpen className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
                {cleanName}
             </button>
         );
      }

      if (node.type === "table") {
        return (
          <div key={idx} className="my-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] select-text animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#004225] via-[#02542f] to-[#085e36] text-white">
                    {node.headers.map((h: string, hIdx: number) => {
                      const lowerH = h.toLowerCase().replace(/[^a-z]/g, "");
                      const isSno = lowerH === "sno" || lowerH === "slno" || lowerH === "s";
                      const isTotal = lowerH === "total" || lowerH === "link" || lowerH === "highestpackage" || lowerH === "placement%";
                      
                      return (
                        <th 
                          key={hIdx} 
                          className={`px-6 py-5 font-outfit text-[11px] md:text-xs uppercase tracking-widest font-black border-r border-white/5 last:border-0 ${
                            isSno ? "text-center" : isTotal ? "text-right" : "text-left"
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
                      className="group transition-all duration-200 hover:bg-emerald-50/20"
                    >
                      {row.map((cell, cIdx) => {
                        const headerText = node.headers[cIdx] || "";
                        const lowerH = headerText.toLowerCase().replace(/[^a-z]/g, "");
                        const isSno = lowerH === "sno" || lowerH === "slno" || lowerH === "s";
                        const isTotal = lowerH === "total" || lowerH === "highestpackage" || lowerH === "placement%";
                        const isEmpty = cell === "—" || cell.trim() === "";

                        // Check if the cell has a document link (markdown link format)
                        const linkMatch = cell.match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (linkMatch) {
                          const linkLabel = linkMatch[1];
                          const linkUrl = linkMatch[2];
                          const isPdf = linkUrl.toLowerCase().endsWith(".pdf") || linkUrl.toLowerCase().includes("/pdf");

                          if (isPdf) {
                            return (
                              <td key={cIdx} className="px-6 py-5 text-center">
                                <button
                                  onClick={() => {
                                    setSelectedFileUrl(linkUrl);
                                    setSelectedFileTitle(linkLabel);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg transition-all cursor-pointer hover:scale-[1.03]"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  {linkLabel}
                                </button>
                              </td>
                            );
                          }
                        }

                        return (
                          <td 
                            key={cIdx} 
                            className={`px-6 py-5 text-slate-650 text-xs md:text-[14px] font-semibold leading-relaxed transition-colors duration-200 ${
                              isSno ? "text-center w-[80px]" : isTotal ? "text-right" : "text-left"
                            }`}
                          >
                            {isSno ? (
                              <div className="flex justify-center">
                                <span className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-2 text-[11px] font-black font-outfit rounded-lg bg-slate-100 text-slate-500 border border-slate-200/20 transition-all duration-300 shadow-sm group-hover:bg-[#004225]/10 group-hover:text-[#004225] group-hover:border-[#004225]/20 group-hover:scale-105">
                                  {cell.trim()}
                                </span>
                              </div>
                            ) : isTotal ? (
                              <span className="font-outfit font-extrabold text-slate-900 text-[14px] tracking-tight transition-colors duration-200 group-hover:text-[#004225] tabular-nums">
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

      if (p.startsWith("__") && p.endsWith("__") && p.length > 4) {
        const cleanTitle = stripEmojis(p.replace(/__/g, "").trim())
          .replace(/^(?:(?:\d+(?:\.\d+)*|[IVXLCDM]+|[a-zA-Z])[\.\)]\s+)+/i, "")
          .trim();
        
        const isBigTitle = /^[IVX\d]+\./.test(p.replace(/__/g, "").trim()) || cleanTitle.toUpperCase() === cleanTitle;

        if (isBigTitle) {
          if (!hasBoostedFirstHeader) {
            hasBoostedFirstHeader = true;
            return (
              <h3 key={idx} className="font-outfit text-2xl md:text-3xl font-black text-[#004225] tracking-tight mt-2 mb-8 flex items-center gap-4 leading-tight animate-fadeIn">
                <span className="h-9 w-2 rounded-full bg-gradient-to-b from-[#004225] to-[#08723c] shrink-0"></span>
                {cleanTitle}
              </h3>
            );
          }

          return (
            <h3 key={idx} className="font-outfit text-xl md:text-2xl font-black text-[#004225] tracking-tight mt-12 mb-6 pt-8 border-t border-slate-100 flex items-center gap-3">
              <span className="h-6 w-1.5 rounded-full bg-[#004225] shrink-0"></span>
              {cleanTitle}
            </h3>
          );
        }
        return (
          <h4 key={idx} className="font-outfit text-xs md:text-sm font-black text-slate-800 mt-8 mb-3 uppercase tracking-wider border-l-4 border-emerald-100 pl-3">
            {cleanTitle}
          </h4>
        );
      }

      if (p.startsWith("- ") || p.startsWith("* ")) {
        const rawLines = p.split("\\n").map((l: string) => l.trim()).filter(Boolean);
        const lines: string[] = [];
        for (const line of rawLines) {
          if (line.startsWith("-") || line.startsWith("*")) {
            lines.push(line.replace(/^[-*]\s*/, "").trim());
          } else {
            if (lines.length > 0) {
              lines[lines.length - 1] += " " + line;
            } else {
              lines.push(line.replace(/^[-*]\s*/, "").trim());
            }
          }
        }
        return (
          <ul key={idx} className="space-y-4 my-8 bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100/50">
            {lines.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-4 text-slate-700 leading-relaxed text-[15px] group">
                <div className="mt-1.5 min-w-[20px] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#004225] group-hover:scale-150 group-hover:bg-[#004225] transition-all duration-300 ring-4 ring-emerald-400/10" />
                </div>
                <span className="flex-1 font-semibold text-slate-600">{renderRichString(item)}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-slate-650 leading-[1.8] text-[15px] md:text-[16px] mb-6 font-medium text-justify">
          {renderRichString(p)}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header */}
      <div className="relative bg-[#004225] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        </div>
        <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
          <div className="flex items-center gap-3 text-emerald-350 font-medium text-sm tracking-widest uppercase mb-6 animate-fadeIn">
            <span className="w-8 h-[2px] bg-emerald-400/50 rounded-full"></span>
            St. Ann&apos;s College for Women
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-outfit tracking-tight mb-6 max-w-4xl leading-[1.15] animate-slideUp">
            Placements & Industry Linkages
          </h1>
          <p className="text-emerald-100/80 text-base md:text-lg max-w-3xl font-medium leading-relaxed animate-slideUp">
            Empowering students with career-ready skillsets, dynamic placement opportunities, robust industry tie-ups, and global collaborations.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Mobile Floating Drawer Trigger */}
          <div className="lg:hidden z-40">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 flex items-center justify-between font-outfit"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  {React.createElement(activeGroup.icon, { className: "w-5 h-5 text-[#004225]" })}
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-black tracking-wider text-slate-400">{activeGroup.title}</div>
                  <span className="font-bold text-slate-800 text-base leading-tight">{activeItem.text}</span>
                </div>
              </div>
              <Menu className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Mobile Navigation Full-Screen Slide-over */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />
              
              <div className="relative flex flex-col w-full max-w-xs ml-auto bg-white h-full shadow-2xl animate-slideLeft">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <span className="font-outfit font-black text-slate-800 text-lg">Navigation Hub</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl bg-slate-50">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {navigationGroups.map((group) => {
                    const Icon = group.icon;
                    const isGroupExpanded = !!expandedGroups[group.title];
                    return (
                      <div key={group.title} className="space-y-2">
                        <button
                          onClick={() => toggleGroup(group.title)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl font-outfit font-extrabold text-sm transition-all text-left ${
                            isGroupExpanded ? "bg-emerald-50 text-[#004225]" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{group.title}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isGroupExpanded ? "rotate-180" : ""}`} />
                        </button>

                        {isGroupExpanded && (
                          <div className="pl-4 border-l border-emerald-100/70 space-y-1 mt-1">
                            {group.items.map((item) => {
                              const isActive = item.slug === activeSlug;
                              return (
                                <Link
                                  key={item.slug}
                                  href={`/placements/${item.slug}`}
                                  className={`block py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                                    isActive 
                                      ? "bg-[#004225] text-white" 
                                      : "text-slate-600 hover:text-[#004225] hover:bg-slate-50"
                                  }`}
                                >
                                  {item.text}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Left Accordion Sidebar Navigation */}
          <div className="hidden lg:block w-88 shrink-0">
            <div className="sticky top-28 bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-200/50 backdrop-blur-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-4">Navigation Hub</h3>
              <div className="space-y-4">
                {navigationGroups.map((group) => {
                  const Icon = group.icon;
                  const isExpanded = !!expandedGroups[group.title];
                  const hasActiveChild = group.items.some(item => item.slug === activeSlug);

                  return (
                    <div 
                      key={group.title} 
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded || hasActiveChild 
                          ? "border-emerald-150/40 bg-emerald-50/10" 
                          : "border-slate-100 bg-white"
                      }`}
                    >
                      {/* Accordion Group Trigger */}
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className={`w-full flex items-center justify-between p-4 font-outfit font-black text-[13px] tracking-wide transition-all ${
                          isExpanded 
                            ? "text-[#004225]" 
                            : "text-slate-650 hover:text-[#004225]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl transition-all ${
                            isExpanded || hasActiveChild 
                              ? "bg-[#004225] text-white" 
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-left leading-snug">{group.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 shrink-0 ${isExpanded ? "rotate-180 text-[#004225]" : "text-slate-400"}`} />
                      </button>

                      {/* Accordion Group Submenu Items */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-100/50 space-y-1.5 animate-fadeIn">
                          {group.items.map((item) => {
                            const isActive = item.slug === activeSlug;
                            return (
                              <Link
                                key={item.slug}
                                href={`/placements/${item.slug}`}
                                className={`group/item flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                                  isActive 
                                    ? "bg-[#004225] text-white font-bold shadow-md shadow-emerald-900/10 scale-[1.01]" 
                                    : "hover:bg-slate-50 text-slate-600 hover:text-[#004225]"
                                }`}
                              >
                                <span className={`text-[12.5px] font-semibold leading-normal ${isActive ? "text-white" : "text-slate-600 group-hover/item:text-[#004225]"}`}>
                                  {item.text}
                                </span>
                                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Content Pane */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-[24px] md:p-12 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-200/50 relative overflow-hidden min-h-[500px]">
              {/* Premium Background Accent */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/40 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 select-text">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold text-[10px] md:text-xs uppercase tracking-widest font-outfit mb-8 shadow-sm">
                  {React.createElement(activeGroup.icon, { className: "w-3.5 h-3.5" })}
                  {activeGroup.title}
                </div>
                
                <h2 className="font-outfit text-2xl md:text-4xl font-black text-slate-850 mb-8 leading-tight tracking-tight">
                  {sectionData.title}
                </h2>
                
                <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-p:font-sans">
                  {renderContentBody(sectionData.content)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Flipbook Modal Reader */}
      <FilePreviewModal
        isOpen={!!selectedFileUrl}
        onClose={() => {
          setSelectedFileUrl(null);
          setSelectedFileTitle("");
        }}
        fileUrl={selectedFileUrl || ""}
        title={selectedFileTitle}
      />
    </main>
  );
}
