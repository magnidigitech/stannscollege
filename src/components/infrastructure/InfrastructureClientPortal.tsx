"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Presentation,
  BookOpen,
  Cpu,
  FlaskConical,
  Briefcase,
  Home,
  UtensilsCrossed,
  HeartPulse,
  Dumbbell,
  Music,
  ShieldAlert,
  Leaf,
  Accessibility,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Eye,
  X,
  ChevronLeft,
  Maximize2,
  ArrowRight,
  Layers,
  TableProperties
} from "lucide-react";
import { staticInfrastructureSections } from "./staticData";

// Category Tabs Mapping
const tabs = [
  // Category 1: Academic Infrastructure
  { text: "Campus & Buildings", slug: "campus-buildings", icon: Building2, group: "Academic Blocks" },
  { text: "Classrooms", slug: "classrooms", icon: Presentation, group: "Academic Blocks" },
  { text: "Library", slug: "library", icon: BookOpen, group: "Academic Blocks" },
  { text: "Laboratories", slug: "laboratories", icon: FlaskConical, group: "Academic Blocks" },
  { text: "Skill Development Centre", slug: "skill-development", icon: Briefcase, group: "Academic Blocks" },

  // Category 2: Campus Facilities
  { text: "Hostel", slug: "hostel", icon: Home, group: "Student Support & Living" },
  { text: "Canteen", slug: "canteen", icon: UtensilsCrossed, group: "Student Support & Living" },
  { text: "Health Centre", slug: "health-centre", icon: HeartPulse, group: "Student Support & Living" },
  { text: "Sports, Games & Gym", slug: "sports-games", icon: Dumbbell, group: "Student Support & Living" },
  { text: "Cultural & Recreational", slug: "cultural-recreation", icon: Music, group: "Student Support & Living" },

  // Category 3: Utility & Sustainability
  { text: "ICT & Digital Infra", slug: "ict-digital", icon: Cpu, group: "Administration & Operations" },
  { text: "Safety & Security", slug: "safety-security", icon: ShieldAlert, group: "Administration & Operations" },
  { text: "Green Campus", slug: "green-campus", icon: Leaf, group: "Administration & Operations" },
  { text: "Barrier-Free Access", slug: "inclusive-access", icon: Accessibility, group: "Administration & Operations" },
];

interface InfrastructureClientPortalProps {
  activeSlug: string;
}

export default function InfrastructureClientPortal({
  activeSlug = "overview"
}: InfrastructureClientPortalProps) {

  const isOverview = activeSlug === "overview";
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
  const sectionData = staticInfrastructureSections[activeSlug] || {
    title: "",
    content: "",
    images: []
  };

  // Universal text sanitation utility to cleanly strip all emoji characters from input text
  const stripEmojis = (str: string) => {
    if (!str) return "";
    return str.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '').trim();
  };

  // Enhanced Regex Tokenizer ensuring no inline bold/link markdown escapes display
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
        // Dynamic Bold text highlighting with forest emerald color
        // We also replace raw double-underscores from inside URLs if they leaked
        const boldContent = match[2].replace(/__/g, '').trim();
        parts.push(
          <strong key={keyCounter++} className="text-[#004225] font-black tracking-tight inline">
            {renderRichString(boldContent)}
          </strong>
        );
      } else if (match[3]) {
        // Premium dynamic Link anchors
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

  // Intelligent Content & Adaptive Table Parser Engine
  const renderContentBody = (text: string) => {
    if (!text) return null;

    const rawChunks = text.split("\n\n").map(c => c.trim()).filter(Boolean);
    const nodes: any[] = [];

    let i = 0;
    while (i < rawChunks.length) {
      const chunk = rawChunks[i];

      // 1. Clean chunk values & Ultra-robust normalized table matching helpers
      const clean = (s: string) => (s || "").replace(/[*_]+/g, '').trim();
      const norm = (s: string) => (s || "").replace(/[*_\s\.]+/g, '').toLowerCase();

      const n0 = norm(chunk);
      const n1 = norm(rawChunks[i + 1] || "");
      const n2 = norm(rawChunks[i + 2] || "");
      const n3 = norm(rawChunks[i + 3] || "");
      const n4 = norm(rawChunks[i + 4] || "");

      // Skip standard redundant photo indicators
      if (n0 === "photogallery" || n0 === "gallery" || n0 === "photos" || chunk.startsWith("[Embedded")) {
        i++;
        continue;
      }

      // Standardised Serial Number Header triggers (covers 'sno', 'slno', 'sno.')
      const isSNo = n0.startsWith("sno") || n0.startsWith("slno") || n0 === "s";

      // Intelligent 5-Column Table Engine (Matches "S. No.", "Name", "Qualification", "Designation", "Experience")
      const is5ColTable = isSNo && n1 === "name" && n2 === "qualification";

      // Intelligent 4-Column Table Engine
      const is4ColTable =
        (isSNo && n1 === "name" && n2 === "designation") ||
        (isSNo && n1.includes("nameofthemember")) ||
        (n0 === "name" && n1 === "designation" && n2.includes("departmentrole")) ||
        (n0 === "academicyear" && n1 === "programme" && n2.includes("nameofthestudent"));

      // Intelligent 3-Column Table Engine (Matches "S.No", "Particulars", "Total" or "S.No", "Name", "Link")
      const is3ColTable =
        (isSNo && n1 === "particulars" && n2 === "total") ||
        (isSNo && n1 === "name" && n2 === "link");

      if (is5ColTable) {
        const headers = [chunk, rawChunks[i + 1], rawChunks[i + 2], rawChunks[i + 3], rawChunks[i + 4]];
        const rowItems: string[] = [];
        let lookAhead = i + 5;

        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          // Table terminates on next bold title or section breaks
          if (nextVal.startsWith("__") && nextVal.endsWith("__") && nextVal.length > 4) break;
          if (nextClean.includes("Services") || nextClean.startsWith("View PDF") || nextClean.includes("Gallery")) break;
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

      if (is4ColTable) {
        const headers = [chunk, rawChunks[i + 1], rawChunks[i + 2], rawChunks[i + 3]];
        const rowItems: string[] = [];
        let lookAhead = i + 4;

        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          if (nextVal.startsWith("__") && nextVal.endsWith("__") && nextVal.length > 4) break;
          if (nextClean.includes("Services") || nextClean.startsWith("View PDF") || nextClean.includes("Gallery")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }

        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += 4) {
          const slice = rowItems.slice(r, r + 4);
          if (slice.length > 0) {
            while (slice.length < 4) slice.push("—");
            rows.push(slice);
          }
        }

        nodes.push({ type: 'table', headers, rows, columns: 4 });
        i = lookAhead;
        continue;
      }

      if (is3ColTable) {
        const headers = [chunk, rawChunks[i + 1], rawChunks[i + 2]];
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

      nodes.push({ type: 'paragraph', text: chunk });
      i++;
    }

    // Tracker to make sure only the FIRST Big Heading rendered is boosted in size
    let hasBoostedFirstHeader = false;

    return nodes.map((node, idx) => {
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
                      const isTotal = lowerH === 'total' || lowerH === 'link';

                      return (
                        <th
                          key={hIdx}
                          className={`px-8 py-5.5 font-outfit text-[11px] md:text-xs uppercase tracking-widest font-black border-r border-white/5 last:border-0 ${isSno ? 'text-center' : isTotal ? 'text-right' : 'text-left'
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
                        const isTotal = lowerH === 'total';
                        const isLink = lowerH === 'link';
                        const isEmpty = cell === "—" || cell.trim() === "";

                        return (
                          <td
                            key={cIdx}
                            className={`px-8 py-5 text-slate-600 text-xs md:text-[14px] font-medium leading-relaxed transition-colors duration-200 ${isSno ? 'text-center w-[80px] md:w-[100px]' : isTotal || isLink ? 'text-right' : 'text-left'
                              }`}
                          >
                            {isSno ? (
                              <div className="flex justify-center">
                                <span className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-2 text-[11px] font-black font-outfit rounded-lg bg-slate-100 text-slate-500 border border-slate-200/20 transition-all duration-300 shadow-sm group-hover:bg-[#004225]/10 group-hover:text-[#004225] group-hover:border-[#004225]/20 group-hover:scale-105">
                                  {cell.trim()}
                                </span>
                              </div>
                            ) : isTotal ? (
                              <span className="font-outfit font-extrabold text-slate-900 text-[14px] md:text-[15px] tracking-tight transition-colors duration-200 group-hover:text-[#004225] tabular-nums">
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

      // 1. Heading Detection
      if (p.startsWith("__") && p.endsWith("__") && p.length > 4) {
        const cleanTitle = stripEmojis(p.replace(/__/g, '').trim())
          .replace(/^(?:(?:\d+(?:\.\d+)*|[IVXLCDM]+|[a-zA-Z])[\.\)]\s+)+/i, '')
          .trim();

        const cleanTitleLower = cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
        const activeTabLower = activeTab.text.toLowerCase().replace(/[^a-z0-9]/g, '');
        const sectionTitleLower = (sectionData.title || "").toLowerCase().replace(/[^a-z0-9]/g, '');

        if (cleanTitleLower === activeTabLower ||
          cleanTitleLower === sectionTitleLower ||
          cleanTitleLower.includes(activeTabLower) ||
          activeTabLower.includes(cleanTitleLower) ||
          (sectionTitleLower && (cleanTitleLower.includes(sectionTitleLower) || sectionTitleLower.includes(cleanTitleLower)))) {
          return null;
        }

        const isBigTitle = /^[IVX\d]+\./.test(p.replace(/__/g, '').trim()) || cleanTitle.toUpperCase() === cleanTitle;

        if (isBigTitle) {
          // First heading layout booster (makes first heading standalone Hero size!)
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

      // 2. Unordered Lists Parser
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
          <ul key={idx} className="space-y-3.5 my-6 pl-1">
            {lines.map((l: string, lIdx: number) => {
              const boldSplit = l.indexOf(" – ");
              const colonSplit = l.indexOf(": ");
              const splitIdx = boldSplit !== -1 ? boldSplit : colonSplit;

              if (splitIdx > 0 && splitIdx < 45) {
                const splitChar = boldSplit !== -1 ? " – " : ": ";
                const label = stripEmojis(l.substring(0, splitIdx).replace(/__/g, '').trim());
                const desc = l.substring(splitIdx + splitChar.length).trim();
                return (
                  <li key={lIdx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    <span className="h-2 w-2 rounded bg-emerald-600 mt-2 shrink-0"></span>
                    <span>
                      <strong className="text-[#004225] font-black mr-1.5 tracking-tight border-b border-emerald-50">{label}:</strong>
                      {renderRichString(desc)}
                    </span>
                  </li>
                );
              }
              return (
                <li key={lIdx} className="flex items-start gap-3 text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                  <span className="h-2 w-2 rounded bg-emerald-600 mt-2 shrink-0"></span>
                  <span>{renderRichString(l)}</span>
                </li>
              );
            })}
          </ul>
        );
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

      // Default Paragraph Renderer
      return (
        <p key={idx} className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed mb-5 text-justify">
          {renderRichString(p)}
        </p>
      );
    });
  };

  const openNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % sectionData.images.length);
  };

  const openPrev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + sectionData.images.length) % sectionData.images.length);
  };

  // Pre-group the tabs into their 3 distinct structural groups
  const tabGroups = useMemo(() => {
    const groups: Record<string, typeof tabs> = {};
    tabs.forEach(t => {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });
    return groups;
  }, []);

  // Helper to extract a short textual preview of a section for the overview cards
  const getShortPreview = (content: string) => {
    if (!content) return "Consulting academic facility archives...";
    const sanitized = stripEmojis(content)
      .replace(/[*_]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .split("\n\n")
      .find(c => c.trim().length > 40 && !c.trim().includes("Photo Gallery"));

    const preview = sanitized ? sanitized.trim() : content.substring(0, 100);
    return preview.length > 110 ? preview.substring(0, 110) + "..." : preview;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16 font-sans min-h-screen bg-[#fafcfb]/50 w-full">

      {/* Modern Elite Emerald Header Banner */}
      <div className="bg-gradient-to-br from-[#004225] to-[#0b5f36] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-2xl mb-8 select-none animate-fadeIn">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Building2 className="h-[500px] w-[500px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-2 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 font-black text-[10px] md:text-xs uppercase tracking-widest bg-white/15 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full w-fit text-emerald-50">
            <Layers className="h-3.5 w-3.5 text-emerald-200" /> Campus & Academic Assets
          </span>
          <h1 className="font-outfit text-2xl md:text-4xl font-black tracking-tight leading-none">
            World-Class Infrastructure
          </h1>
          <p className="text-emerald-50/80 font-semibold text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
            Step inside our ultra-modern 25+ acre green campus hosting digitised classroom pods, scientific labs, holistic residencies, and lush sustainable initiatives.
          </p>

          {/* If inside a specific segment, provide a quick Return button back to standard Overview Page */}
          {!isOverview && (
            <Link
              href="/infrastructure"
              className="mt-4 flex items-center gap-2 font-bold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 w-fit px-6 py-3 rounded-xl transition-all active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Grid Overview
            </Link>
          )}
        </div>
      </div>

      {/* -------------------- RENDER CASE 1: DEDICATED LAUNCHPAD DASHBOARD (OVERVIEW) -------------------- */}
      {isOverview ? (
        <div className="flex flex-col gap-14 animate-fadeIn select-none">
          {Object.entries(tabGroups).map(([groupName, items]) => (
            <div key={groupName} className="flex flex-col gap-6">

              {/* Group Categorizer Label */}
              <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#004225] shadow-xs border border-emerald-100">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-outfit text-xl md:text-2xl font-black text-[#004225] tracking-tight uppercase">
                    {groupName}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 tracking-wider -mt-0.5">Institutional Core Blocks</p>
                </div>
              </div>

              {/* Grand Cards Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {items.map((t) => {
                  const data = staticInfrastructureSections[t.slug] || { content: "", images: [] };
                  const firstImg = data.images && data.images.length > 0 ? data.images[0] : null;

                  return (
                    <Link
                      key={t.slug}
                      href={`/infrastructure/${t.slug}`}
                      className="group flex flex-col h-full bg-white border border-slate-200/70 rounded-[2rem] overflow-hidden hover:shadow-2xl shadow-indigo-100/20 hover:-translate-y-1.5 transition-all duration-500"
                    >
                      {/* Photo Thumbnail Header */}
                      <div className="h-48 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                        {firstImg ? (
                          <img
                            src={firstImg}
                            alt={t.text}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-[#004225] flex items-center justify-center opacity-80">
                            <t.icon className="h-12 w-12 text-emerald-200/40" />
                          </div>
                        )}

                        {/* Glass floating Pill tracking images index */}
                        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white tracking-wider flex items-center gap-1.5 border border-white/10">
                          <Eye className="h-3 w-3" />
                          {data.images?.length || 0} Photos
                        </div>
                      </div>

                      {/* Card Narrative Block */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-[#004225]/5 border border-[#004225]/10 flex items-center justify-center text-[#004225]">
                              <t.icon className="h-4.5 w-4.5" />
                            </div>
                            <h3 className="font-outfit font-black text-[#004225] text-lg leading-snug group-hover:text-emerald-700 transition-colors">
                              {t.text}
                            </h3>
                          </div>

                          <p className="text-slate-500 font-semibold text-xs md:text-sm leading-relaxed mt-1">
                            {getShortPreview(data.content)}
                          </p>
                        </div>

                        {/* Bottom Link Action */}
                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-emerald-700 font-black text-xs md:text-[13px] tracking-tight">
                          <span>Explore</span>
                          <div className="h-8 w-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center transform group-hover:translate-x-1.5 transition-all duration-300">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      ) : (

        // -------------------- RENDER CASE 2: DETAILED SUBSECTION SPLIT-PANEL PORTAL --------------------
        <div>
          {/* Mobile Responsive Sticky Top Toggle */}
          <div className="md:hidden mb-6 relative select-none">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between text-[#004225] font-black shadow-sm active:scale-[0.98] transition-all"
            >
              <span className="flex items-center gap-3">
                <activeTab.icon className="h-5 w-5 shrink-0 text-emerald-600" />
                {activeTab.text}
              </span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileMenuOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 shadow-2xl rounded-2xl z-30 p-2 flex flex-col gap-1 max-h-[70vh] overflow-y-auto animate-fadeInUp">
                {/* Explicit Option to Return to Grid Overview */}
                <Link
                  href="/infrastructure"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black text-emerald-700 bg-emerald-50/50 border-b border-emerald-50 mb-2"
                >
                  <Layers className="h-4 w-4 text-emerald-700" />
                  Back to Overview Grid
                </Link>

                {Object.entries(tabGroups).map(([grp, items]) => (
                  <div key={grp} className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 px-3 pt-3 pb-1">{grp}</span>
                    {items.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/infrastructure/${t.slug}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSlug === t.slug ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <t.icon className={`h-4 w-4 ${activeSlug === t.slug ? 'text-emerald-600' : 'text-slate-400'}`} />
                        {t.text}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Layout View */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start animate-fadeIn">

            {/* Sidebar Selectors Panel for Desktop (Floating scroll window) */}
            <div className="hidden md:flex flex-col gap-6 sticky top-24 select-none">
              <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 max-h-[80vh] overflow-y-auto no-scrollbar">

                {/* Back to Overview Hub link button */}
                <Link
                  href="/infrastructure"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs md:text-[13px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100/60 border border-emerald-100 transition-all group mb-2"
                >
                  <Layers className="h-4 w-4 shrink-0 text-emerald-600 group-hover:scale-110 transition-transform" />
                  Overview Dashboard
                </Link>

                {Object.entries(tabGroups).map(([grp, items]) => (
                  <div key={grp} className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-widest font-black text-emerald-950/40 px-3 pt-1">
                      {grp}
                    </span>
                    {items.map((t) => {
                      const isActive = activeSlug === t.slug;
                      return (
                        <Link
                          key={t.slug}
                          href={`/infrastructure/${t.slug}`}
                          className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-[13px] transition-all ${isActive
                            ? 'bg-gradient-to-r from-[#004225] to-[#0a5932] text-white shadow-md shadow-emerald-100'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#004225]'}`}
                        >
                          <span className={`flex items-center justify-center h-6 w-6 rounded-lg shrink-0 border transition-colors duration-300 ${isActive ? 'bg-white/20 border-white/10 text-white' : 'bg-slate-100 border-transparent text-slate-500 group-hover:bg-[#004225]/5 group-hover:text-[#004225]'}`}>
                            <t.icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="leading-snug">{t.text}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* High level auditor compliance stamp */}
              <div className="bg-emerald-950 border border-emerald-900 p-6 rounded-[2.5rem] text-white flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-white/5 h-32 w-32 rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-2">
                  <span className="bg-emerald-500/20 border border-emerald-400/20 text-emerald-200 px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-black w-fit">Facility Audit</span>
                  <h4 className="font-outfit text-base font-bold leading-tight">AICTE & ISO Compliant</h4>
                  <p className="text-emerald-200/60 text-xs font-semibold leading-relaxed">Laboratory safety procedures, structural fire prevention standards, and accessibility channels inspected semi-annually.</p>
                </div>
              </div>
            </div>

            {/* Primary Text canvas view */}
            <div className="md:col-span-3 flex flex-col gap-8 animate-fadeInUp">

              {/* Text & Smart Tables block */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-xs select-text selection:bg-emerald-50 selection:text-[#004225]">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
                  <div className="h-12 w-12 shrink-0 bg-[#004225]/5 border border-[#004225]/10 rounded-xl text-[#004225] flex items-center justify-center shadow-xs">
                    <activeTab.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-outfit text-2xl md:text-3xl font-black text-[#004225] tracking-tight leading-none">
                    {sectionData.title || activeTab.text}
                  </h2>
                </div>
                {sectionData.content ? renderContentBody(sectionData.content) : (
                  <p className="text-slate-400 italic text-sm">Consulting data records...</p>
                )}
              </div>

              {/* Elite photo masonry grid (Renders all images perfectly) */}
              {sectionData.images && sectionData.images.length > 0 && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="h-7 w-7 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Eye className="h-4 w-4" />
                    </div>
                    <h3 className="font-outfit text-xl md:text-2xl font-black text-[#004225] tracking-tight">
                      Photo Gallery
                    </h3>
                    <span className="ml-auto text-[11px] font-black uppercase bg-slate-100 text-slate-500 px-3 py-1 rounded-lg tracking-wider">
                      {sectionData.images.length} Frames
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectionData.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxIdx(idx)}
                        className="group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer aspect-[4/3] shadow-sm border border-slate-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 select-none animate-zoomIn animate-delay-75"
                      >
                        <img
                          src={imgSrc}
                          alt={`${sectionData.title} view ${idx + 1}`}
                          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="flex items-center justify-between w-full text-white">
                            <span className="text-xs font-bold tracking-wide truncate pr-2 capitalize">{activeTab.text} View #{idx + 1}</span>
                            <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300 shrink-0">
                              <Maximize2 className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal Viewer (Native Fullscreen Lightbox) */}
      {lightboxIdx !== null && sectionData.images.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-lg flex flex-col animate-fadeIn select-none">

          {/* Close panel */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 text-white bg-slate-950/80 relative z-50">
            <div className="flex items-center gap-3">
              <activeTab.icon className="h-5 w-5 text-emerald-400" />
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">{sectionData.title}</span>
                <p className="text-sm font-bold -mt-0.5">Asset Frame {lightboxIdx + 1} of {sectionData.images.length}</p>
              </div>
            </div>
            <button
              onClick={() => setLightboxIdx(null)}
              className="h-10 w-10 rounded-full border border-white/20 hover:border-white/50 bg-white/5 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Slides container */}
          <div className="flex-1 flex items-center justify-between px-4 relative overflow-hidden">
            <button
              onClick={openPrev}
              className="h-14 w-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center z-10 transition-all hover:scale-105 backdrop-blur-md cursor-pointer hidden sm:flex"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
              <img
                src={sectionData.images[lightboxIdx]}
                alt="Enlarged slide"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5 animate-zoomIn"
              />
            </div>

            <button
              onClick={openNext}
              className="h-14 w-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center z-10 transition-all hover:scale-105 backdrop-blur-md cursor-pointer hidden sm:flex"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>

          {/* Mobile bottom actions panel */}
          <div className="p-4 border-t border-white/10 flex justify-center gap-4 sm:hidden bg-slate-950/80">
            <button onClick={openPrev} className="px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-black cursor-pointer active:scale-95">Prev</button>
            <button onClick={openNext} className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black cursor-pointer active:scale-95">Next</button>
          </div>

        </div>
      )}

    </div>
  );
}
