"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { INFRASTRUCTURE_SECTIONS, INFRASTRUCTURE_SUBTEXT, InfrastructureSectionItem } from "./staticData";

// Icon resolver helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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
  Accessibility
};

// Sidebar categories matching Mandatory Disclosures structure (A, B, C)
const INFRASTRUCTURE_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "academic-infra",
    title: "A. Academic & Learning Spaces",
    sectionId: "sec-campus-buildings",
    items: [
      { text: "1. Campus & Buildings", id: "sec-campus-buildings" },
      { text: "2. Classrooms", id: "sec-classrooms" },
      { text: "3. Library & Information Centre", id: "sec-library" },
      { text: "4. ICT & Digital Infrastructure", id: "sec-ict-digital" },
      { text: "5. Laboratories", id: "sec-laboratories" },
      { text: "6. Skill Development Centre", id: "sec-skill-development" },
    ]
  },
  {
    catSlug: "student-amenities",
    title: "B. Student Amenities & Living",
    sectionId: "sec-hostel",
    items: [
      { text: "7. Hostel", id: "sec-hostel" },
      { text: "8. Canteen", id: "sec-canteen" },
      { text: "9. Health Centre", id: "sec-health-centre" },
      { text: "10. Sports, Games & Gym", id: "sec-sports-games" },
      { text: "11. Cultural & Recreation Facilities", id: "sec-cultural-recreation" },
    ]
  },
  {
    catSlug: "safety-sustainability",
    title: "C. Campus Environment & Access",
    sectionId: "sec-safety-security",
    items: [
      { text: "12. Safety, Security & Disaster Mgmt", id: "sec-safety-security" },
      { text: "13. Green Campus & Sustainability", id: "sec-green-campus" },
      { text: "14. Barrier-Free & Inclusive Access", id: "sec-inclusive-access" },
    ]
  }
];

const ALL_SECTION_IDS = INFRASTRUCTURE_SECTIONS.map((s) => `sec-${s.slug}`);

interface InfrastructureClientPortalProps {
  activeSlug?: string;
}

export default function InfrastructureClientPortal({
  activeSlug = "campus-buildings"
}: InfrastructureClientPortalProps) {
  const initialId = activeSlug && activeSlug !== "overview" ? `sec-${activeSlug}` : "sec-campus-buildings";
  const [activeSectionId, setActiveSectionId] = useState<string>(initialId);

  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  // Scroll to active section if slug provided
  useEffect(() => {
    if (activeSlug && activeSlug !== "overview") {
      const targetId = `sec-${activeSlug}`;
      setActiveSectionId(targetId);
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [activeSlug]);

  // Scroll listener for dynamic sidebar active indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      for (let i = ALL_SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(ALL_SECTION_IDS[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(ALL_SECTION_IDS[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === "Escape") setLightboxData(null);
      if (e.key === "ArrowRight") {
        setLightboxData((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxData((prev) =>
          prev
            ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData]);

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightboxData({ images, index, title });
  };

  const nextSlide = () => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      index: (lightboxData.index + 1) % lightboxData.images.length
    });
  };

  const prevSlide = () => {
    if (!lightboxData) return;
    setLightboxData({
      ...lightboxData,
      index: (lightboxData.index - 1 + lightboxData.images.length) % lightboxData.images.length
    });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: Navigation Sidebar */}
            <aside className="lg:col-span-3">
              <AboutSidebar
                categories={INFRASTRUCTURE_SIDEBAR_CATEGORIES}
                bannerTitle="Campus Infrastructure"
                bannerSubtitle="Sections on this Page"
                activeId={activeSectionId}
                onItemClick={(id) => {
                  setActiveSectionId(id);
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            </aside>

            {/* Right: Data Elements / Sections */}
            <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
              <div className="flex flex-col gap-4">

                {/* Sub-text Box */}
                <SubtextBox>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <strong className="text-blue-900 font-bold">
                      {INFRASTRUCTURE_SUBTEXT.institution}
                    </strong>
                    , {INFRASTRUCTURE_SUBTEXT.overview.replace(/^[^\,]+,\s*/, "")}
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      This section provides comprehensive information regarding academic learning spaces, specialized laboratories, digital infrastructure, student residential amenities, sports facilities, safety systems, and green campus initiatives.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* 14 INFRASTRUCTURE SECTIONS                                   */}
                {/* ============================================================ */}
                {INFRASTRUCTURE_SECTIONS.map((sec) => {
                  const Icon = ICON_MAP[sec.iconName] || Building2;
                  return (
                    <section
                      key={sec.id}
                      id={`sec-${sec.slug}`}
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                      style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                    >
                      {/* Full-Width Section Header Banner */}
                      <div
                        className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                        style={{
                          backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                          borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-indigo-300 shrink-0" />
                          <h2
                            className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                            style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                          >
                            {sec.title}
                          </h2>
                        </div>
                        <p
                          className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                          style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                        >
                          {sec.subtitle}
                        </p>
                      </div>

                      {/* Section Content Body */}
                      <div
                        className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200"
                        style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                      >
                        {/* Primary Narrative & Features Card */}
                        <div
                          className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 shrink-0">
                              <Icon className="h-5 w-5" />
                            </span>
                            <div>
                              <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                {sec.title}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">{sec.subtitle}</p>
                            </div>
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {sec.description}
                          </p>

                          {/* Subsections: bullet features, tables, links */}
                          {sec.subsections &&
                            sec.subsections.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex flex-col gap-3 pt-3 border-t border-slate-100"
                              >
                                <h5 className="font-outfit text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
                                  <span>{sub.title}</span>
                                </h5>

                                {sub.description && (
                                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                                    {sub.description}
                                  </p>
                                )}

                                {/* Bullet Feature Cards */}
                                {sub.items && sub.items.length > 0 && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    {sub.items.map((itemStr, iIdx) => {
                                      const colonIdx = itemStr.indexOf(" – ");
                                      const altColonIdx = itemStr.indexOf(": ");
                                      const splitIdx = colonIdx !== -1 ? colonIdx : altColonIdx;

                                      if (splitIdx > 0 && splitIdx < 50) {
                                        const splitChar = colonIdx !== -1 ? " – " : ": ";
                                        const label = itemStr.substring(0, splitIdx).trim();
                                        const desc = itemStr.substring(splitIdx + splitChar.length).trim();
                                        return (
                                          <div
                                            key={iIdx}
                                            className="flex items-start gap-3 bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs select-none"
                                          >
                                            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                                              <CheckCircle2 className="h-3.5 w-3.5" />
                                            </span>
                                            <div className="text-xs text-slate-800 leading-snug">
                                              <strong className="text-blue-900 font-bold block mb-0.5">
                                                {label}
                                              </strong>
                                              <span className="font-medium text-slate-600">{desc}</span>
                                            </div>
                                          </div>
                                        );
                                      }

                                      return (
                                        <div
                                          key={iIdx}
                                          className="flex items-start gap-3 bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs select-none"
                                        >
                                          <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          </span>
                                          <span className="text-xs font-bold text-slate-800 leading-snug">
                                            {itemStr}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* Data Tables */}
                                {sub.table && (
                                  <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs mt-2">
                                    <table className="w-full text-left border-collapse text-xs">
                                      <thead>
                                        <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold border-b border-[#001733]">
                                          {sub.table.headers.map((h, hIdx) => (
                                            <th
                                              key={hIdx}
                                              className={`py-3.5 px-6 ${hIdx === 0 ? "w-20" : ""}`}
                                            >
                                              {h}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                        {sub.table.rows.map((row, rIdx) => (
                                          <tr
                                            key={rIdx}
                                            className="hover:bg-blue-50/50 transition-colors"
                                          >
                                            {row.map((cell, cIdx) => (
                                              <td
                                                key={cIdx}
                                                className={`py-3.5 px-6 ${
                                                  cIdx === 0
                                                    ? "font-bold text-slate-900"
                                                    : cIdx === row.length - 1 && sub.table?.headers[cIdx]?.toLowerCase().includes("total")
                                                    ? "font-extrabold text-blue-900"
                                                    : ""
                                                }`}
                                              >
                                                {cell}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}

                                {/* Links / Portals */}
                                {sub.links && (
                                  <div className="flex flex-wrap gap-2.5 pt-2">
                                    {sub.links.map((link, lIdx) => (
                                      <a
                                        key={lIdx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl font-bold text-xs transition-all border border-blue-100/80 cursor-pointer shadow-2xs group"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5 text-blue-600 group-hover:text-white" />
                                        <span>{link.title}</span>
                                        {link.note && (
                                          <span className="text-[10px] opacity-75 font-normal">
                                            ({link.note})
                                          </span>
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>

                        {/* Section Photo Gallery Grid */}
                        {sec.images && sec.images.length > 0 && (
                          <div
                            className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                            style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100/60 text-emerald-700 shrink-0">
                                  <Eye className="h-5 w-5" />
                                </span>
                                <div>
                                  <h4 className="font-outfit text-emerald-800 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                    Photo Gallery — {sec.title.replace(/^\d+\.\s*/, "")}
                                  </h4>
                                  <p className="text-xs text-slate-500 font-medium">
                                    Visual facility showcase &amp; infrastructure records
                                  </p>
                                </div>
                              </div>
                              <span className="text-[11px] font-black uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-lg tracking-wider self-start sm:self-auto">
                                {sec.images.length} Photos
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 pt-1">
                              {sec.images.map((imgSrc, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={() => openLightbox(sec.images, imgIdx, sec.title)}
                                  className="group relative rounded-xl overflow-hidden bg-slate-100 cursor-pointer aspect-[4/3] shadow-2xs border border-slate-200/80 hover:shadow-md hover:scale-[1.02] transition-all duration-300 select-none"
                                >
                                  <img
                                    src={imgSrc}
                                    alt={`${sec.title} frame ${imgIdx + 1}`}
                                    className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <div className="flex items-center justify-between w-full text-white">
                                      <span className="text-[11px] font-bold tracking-wide truncate pr-1">
                                        Frame #{imgIdx + 1}
                                      </span>
                                      <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0">
                                        <Maximize2 className="h-3 w-3" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}

              </div>
            </main>

          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FULLSCREEN LIGHTBOX MODAL                                    */}
      {/* ============================================================ */}
      {lightboxData && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-lg flex flex-col animate-fadeIn select-none">
          {/* Header Bar */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 text-white bg-slate-950/80 relative z-50">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs">
                {lightboxData.index + 1}
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                  {lightboxData.title}
                </span>
                <p className="text-sm font-bold text-white -mt-0.5">
                  Photo {lightboxData.index + 1} of {lightboxData.images.length}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLightboxData(null)}
              className="h-10 w-10 rounded-full border border-white/20 hover:border-white/50 bg-white/5 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Slide Stage */}
          <div className="flex-1 flex items-center justify-between px-4 sm:px-8 relative overflow-hidden">
            <button
              onClick={prevSlide}
              className="h-14 w-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center z-10 transition-all hover:scale-105 backdrop-blur-md cursor-pointer hidden sm:flex"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-12">
              <img
                src={lightboxData.images[lightboxData.index]}
                alt="Enlarged photo"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10 animate-zoomIn"
              />
            </div>

            <button
              onClick={nextSlide}
              className="h-14 w-14 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center z-10 transition-all hover:scale-105 backdrop-blur-md cursor-pointer hidden sm:flex"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="p-4 border-t border-white/10 flex justify-center gap-4 sm:hidden bg-slate-950/80">
            <button
              onClick={prevSlide}
              className="px-6 py-2.5 bg-white/10 text-white rounded-xl text-xs font-bold cursor-pointer active:scale-95"
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer active:scale-95"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
