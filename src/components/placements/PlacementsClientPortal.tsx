"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Globe2,
  Handshake,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Eye,
  X,
  ChevronLeft,
  Maximize2,
  ArrowRight,
  Layers,
  TableProperties,
  BookOpen
} from "lucide-react";
import { staticPlacementSections } from "./staticData";

const tabs = [
  { text: "Training & Placements", slug: "training-placements", icon: Briefcase, group: "Placements" },
  { text: "Industry Linkages & Employability", slug: "industry-linkages", icon: Handshake, group: "Industry" },
  { text: "Internationalization & Global Outreach", slug: "internationalization", icon: Globe2, group: "Global" },
];

interface PlacementsClientPortalProps {
  activeSlug: string;
}

export default function PlacementsClientPortal({
  activeSlug = "training-placements"
}: PlacementsClientPortalProps) {

  const activeTab = tabs.find(t => t.slug === activeSlug) || tabs[0];

  // Local States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setLightboxIdx(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSlug]);

  // Dynamic section selection
  const sectionData = staticPlacementSections[activeSlug] || {
    title: "",
    content: "",
    images: []
  };

  const stripEmojis = (str: string) => {
    if (!str) return "";
    return str.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '').trim();
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
        const boldContent = match[2].replace(/__/g, '').trim();
        parts.push(
          <strong key={keyCounter++} className="text-[#004225] font-black tracking-tight inline">
            {renderRichString(boldContent)}
          </strong>
        );
      } else if (match[3]) {
        const linkLabel = match[3].replace(/__/g, '').trim();
        parts.push(
          <a
            key={keyCounter++}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-800 font-bold underline-offset-4 transition-colors inline hover:underline"
          >
            {linkLabel}
          </a>
        );
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

      const clean = (s: string) => (s || "").replace(/[*_]+/g, '').trim();
      const norm = (s: string) => (s || "").replace(/[*_\s\.]+/g, '').toLowerCase();
      
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
      const isColStart = n0 === "academicyear" || n0 === "category" || n0 === "programme" || n0 === "year";

      // Intelligent Tables
      const is8ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i+5]) && norm(rawChunks[i+6]) && norm(rawChunks[i+7]);
      const is7ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i+5]) && norm(rawChunks[i+6]);
      const is6ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i+5]);
      const is5ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4;
      const is4ColTable = (isSNo || isColStart) && n1 && n2 && n3;
      const is3ColTable = (isSNo || isColStart) && n1 && n2;
      const is2ColTable = (isSNo || isColStart || n0 === "category") && n1;

      // Ensure we accurately map tables by finding the next '__' bold chunk which indicates end of table headers/content
      const parseTable = (colCount: number) => {
        const headers = [];
        for (let j=0; j<colCount; j++) {
            headers.push(rawChunks[i+j]);
        }
        const rowItems: string[] = [];
        let lookAhead = i + colCount;

        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          // Table terminates on next bold title or section breaks or explicit non-table items
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
        nodes.push({ type: 'table', headers, rows, columns: colCount });
        i = lookAhead;
      };

      if (is8ColTable && (norm(rawChunks[i+7]).includes("notyetplaced") || norm(rawChunks[i+7]).includes("document"))) {
        parseTable(8);
        continue;
      }
      if (is7ColTable && (norm(rawChunks[i+6]).includes("viewdocument"))) {
          parseTable(7);
          continue;
      }
      if (is6ColTable && (norm(rawChunks[i+5]).includes("placementdrive"))) {
          parseTable(6);
          continue;
      }
      if (is5ColTable && (norm(rawChunks[i+4]).includes("highestpackage") || norm(rawChunks[i+4]).includes("studentsplaced"))) {
        parseTable(5);
        continue;
      }
      if (is4ColTable) {
        // Need stricter check for 4-col
        if (norm(rawChunks[i+3]).includes("studentsinterned") || norm(rawChunks[i+3]).includes("purpose")) {
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

      // Link rendering
      if (chunk.startsWith("Link:")) {
         nodes.push({ type: 'link', text: chunk.replace("Link:", "").trim() });
         i++;
         continue;
      }

      nodes.push({ type: 'paragraph', text: chunk });
      i++;
    }

    let hasBoostedFirstHeader = false;

    return nodes.map((node, idx) => {
      if (node.type === 'link') {
         const fileUrl = node.text;
         const fileName = fileUrl.split('/').pop() || "View Document";
         return (
             <a key={idx} href={fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 mt-4 mb-6 bg-emerald-50 text-emerald-800 font-bold rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200 group w-fit">
                <BookOpen className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
                {decodeURIComponent(fileName)}
             </a>
         );
      }

      if (node.type === 'table') {
        return (
          <div key={idx} className="my-12 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] select-text animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#004225] via-[#02542f] to-[#085e36] text-white">
                    {node.headers.map((h: string, hIdx: number) => {
                      const lowerH = h.toLowerCase().replace(/[^a-z]/g, '');
                      const isSno = lowerH === 'sno' || lowerH === 'slno' || lowerH === 's';
                      const isTotal = lowerH === 'total' || lowerH === 'link' || lowerH === 'highestpackage' || lowerH === 'placement%';
                      
                      return (
                        <th 
                          key={hIdx} 
                          className={`px-6 py-5 font-outfit text-[11px] md:text-xs uppercase tracking-widest font-black border-r border-white/5 last:border-0 \${
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
                      className="group transition-all duration-200 hover:bg-emerald-50/20"
                    >
                      {row.map((cell, cIdx) => {
                        const headerText = node.headers[cIdx] || "";
                        const lowerH = headerText.toLowerCase().replace(/[^a-z]/g, '');
                        const isSno = lowerH === 'sno' || lowerH === 'slno' || lowerH === 's';
                        const isTotal = lowerH === 'total' || lowerH === 'highestpackage' || lowerH === 'placement%';
                        const isEmpty = cell === "—" || cell.trim() === "";

                        // If cell contains a link, render a beautiful button
                        if (cell.toLowerCase().includes("view pdf") || cell.toLowerCase().includes("view document")) {
                             return (
                                 <td key={cIdx} className="px-6 py-5 text-center">
                                      {isEmpty ? "—" : (
                                         <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer border border-emerald-200/50">
                                             <Eye className="w-3.5 h-3.5" />
                                             Document
                                         </span>
                                      )}
                                 </td>
                             );
                        }

                        return (
                          <td 
                            key={cIdx} 
                            className={`px-6 py-5 text-slate-600 text-xs md:text-[14px] font-medium leading-relaxed transition-colors duration-200 \${
                              isSno ? 'text-center w-[80px]' : isTotal ? 'text-right' : 'text-left'
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
        const cleanTitle = stripEmojis(p.replace(/__/g, '').trim())
          .replace(/^(?:(?:\d+(?:\.\d+)*|[IVXLCDM]+|[a-zA-Z])[\.\)]\s+)+/i, '')
          .trim();
        
        const isBigTitle = /^[IVX\d]+\./.test(p.replace(/__/g, '').trim()) || cleanTitle.toUpperCase() === cleanTitle;

        if (isBigTitle) {
          if (!hasBoostedFirstHeader) {
            hasBoostedFirstHeader = true;
            return (
              <h3 key={idx} className="font-outfit text-3xl md:text-4xl font-black text-[#004225] tracking-tight mt-2 mb-10 flex items-center gap-4 leading-tight animate-fadeIn">
                <span className="h-10 w-2 rounded-full bg-gradient-to-b from-[#004225] to-[#08723c] shrink-0"></span>
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
          <h4 key={idx} className="font-outfit text-sm md:text-base font-black text-slate-800 mt-8 mb-3 uppercase tracking-wider border-l-4 border-emerald-100 pl-3">
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
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 group-hover:bg-[#004225] transition-all duration-300 ring-4 ring-emerald-400/10" />
                </div>
                <span className="flex-1 font-medium">{renderRichString(item)}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-slate-600 leading-[1.8] text-[15px] md:text-base mb-6 font-medium text-justify">
          {renderRichString(p)}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Dynamic Header */}
      <div className="relative bg-[#004225] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-center gap-3 text-emerald-300/80 font-medium text-sm tracking-widest uppercase mb-6 animate-fadeIn">
            <span className="w-8 h-[2px] bg-emerald-400/50 rounded-full"></span>
            St. Ann's College
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white font-outfit tracking-tight mb-6 max-w-3xl leading-[1.1] animate-slideUp">
            Placements & Industry Linkages
          </h1>
          <p className="text-emerald-100/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed animate-slideUp" style={{animationDelay: '100ms'}}>
            Explore training, placement statistics, industrial collaborations, and international global outreach initiatives.
          </p>
        </div>
      </div>

      {/* Main Content Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden relative z-40">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between font-outfit"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  {React.createElement(activeTab.icon, { className: "w-5 h-5 text-[#004225]" })}
                </div>
                <span className="font-bold text-slate-800 tracking-tight text-lg">{activeTab.text}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 \${mobileMenuOpen ? "rotate-180" : ""}`} />
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden divide-y divide-slate-50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.slug === activeSlug;
                  return (
                    <Link
                      key={tab.slug}
                      href={`/placements/\${tab.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 transition-colors \${
                        isActive ? "bg-emerald-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className={`p-2 rounded-xl transition-colors \${isActive ? "bg-[#004225] text-white" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`font-outfit font-semibold \${isActive ? "text-[#004225]" : "text-slate-600"}`}>
                        {tab.text}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-32 bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 backdrop-blur-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-4">Navigation Hub</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.slug === activeSlug;
                  return (
                    <Link
                      key={tab.slug}
                      href={`/placements/\${tab.slug}`}
                      className={`group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 \${
                        isActive 
                          ? "bg-[#004225] shadow-md shadow-emerald-900/10 scale-[1.02]" 
                          : "hover:bg-slate-50 hover:scale-[1.01]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl transition-all duration-300 \${
                          isActive 
                            ? "bg-white/20 text-white shadow-inner" 
                            : "bg-white text-slate-400 shadow-sm border border-slate-200/50 group-hover:text-[#004225]"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`font-outfit font-bold tracking-wide transition-colors \${
                          isActive ? "text-white" : "text-slate-600 group-hover:text-[#004225]"
                        }`}>
                          {tab.text}
                        </span>
                      </div>
                      {isActive && <ChevronRight className="w-5 h-5 text-white/70 animate-pulse" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Dynamic Content Pane */}
          <div className="flex-1 max-w-4xl min-w-0">
            <div className="bg-white rounded-[32px] md:p-12 p-6 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-200/60 relative overflow-hidden">
              {/* Premium Background Monogram */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-widest font-outfit mb-8">
                  {React.createElement(activeTab.icon, { className: "w-4 h-4" })}
                  {activeTab.group}
                </div>
                
                <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-p:font-sans">
                  {renderContentBody(sectionData.content)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
