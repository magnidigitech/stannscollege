"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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

// Sidebar categories matching the 14 sections grouped into 3 clean categories (A, B, C)
const INFRASTRUCTURE_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "academic-infra",
    title: "A. Academic & Learning Spaces",
    sectionId: "campus-buildings",
    items: [
      { text: "1. Campus & Buildings", id: "campus-buildings" },
      { text: "2. Classrooms", id: "classrooms" },
      { text: "3. Library & Information Centre", id: "library" },
      { text: "4. ICT & Digital Infrastructure", id: "ict-digital" },
      { text: "5. Laboratories", id: "laboratories" },
      { text: "6. Skill Development Centre", id: "skill-development" },
    ]
  },
  {
    catSlug: "student-amenities",
    title: "B. Student Amenities & Living",
    sectionId: "hostel",
    items: [
      { text: "7. Hostel", id: "hostel" },
      { text: "8. Canteen", id: "canteen" },
      { text: "9. Health Centre", id: "health-centre" },
      { text: "10. Sports, Games & Gym", id: "sports-games" },
      { text: "11. Cultural & Recreation Facilities", id: "cultural-recreation" },
    ]
  },
  {
    catSlug: "safety-sustainability",
    title: "C. Campus Environment & Access",
    sectionId: "safety-security",
    items: [
      { text: "12. Safety, Security & Disaster Mgmt", id: "safety-security" },
      { text: "13. Green Campus & Sustainability", id: "green-campus" },
      { text: "14. Barrier-Free & Inclusive Access", id: "inclusive-access" },
    ]
  }
];

interface InfrastructureClientPortalProps {
  activeSlug?: string;
}

export default function InfrastructureClientPortal({
  activeSlug = "campus-buildings"
}: InfrastructureClientPortalProps) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string>(activeSlug);
  const [showAllGallery, setShowAllGallery] = useState<boolean>(false);

  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  // Sync currentTab when activeSlug prop changes
  useEffect(() => {
    if (activeSlug && activeSlug !== currentTab) {
      setCurrentTab(activeSlug);
      setShowAllGallery(false);
    }
  }, [activeSlug]);

  // Find active section data
  const currentSection = useMemo(() => {
    return (
      INFRASTRUCTURE_SECTIONS.find((s) => s.slug === currentTab) ||
      INFRASTRUCTURE_SECTIONS[0]
    );
  }, [currentTab]);

  const handleTabChange = (slug: string) => {
    setCurrentTab(slug);
    setShowAllGallery(false);
    router.push(`/infrastructure/${slug}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const SectionIcon = ICON_MAP[currentSection.iconName] || Building2;

  // Filter images for 6-preview with view more
  const displayedGalleryImages = showAllGallery
    ? currentSection.images
    : currentSection.images.slice(0, 6);

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
                activeId={currentTab}
                onItemClick={(id) => handleTabChange(id)}
              />
            </aside>

            {/* Right: Data Elements / Subpage Content */}
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
                      This section provides comprehensive details regarding academic learning spaces, specialized laboratories, digital infrastructure, student residential amenities, sports facilities, safety systems, and green campus initiatives.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* ACTIVE SUBPAGE SECTION CONTAINER                             */}
                {/* ============================================================ */}
                <section
                  key={currentSection.id}
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
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
                      <SectionIcon className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        {currentSection.title}
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      {currentSection.subtitle}
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
                          <SectionIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            {currentSection.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">{currentSection.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        {currentSection.description}
                      </p>

                      {/* Subsections: bullet features, tables, links */}
                      {currentSection.subsections &&
                        currentSection.subsections.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex flex-col gap-3 pt-4 border-t border-slate-100"
                          >
                            <h5 className="font-outfit text-sm sm:text-base font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
                              <span>{sub.title}</span>
                            </h5>

                            {sub.description && (
                              <div className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed space-y-2 whitespace-pre-line text-justify">
                                {sub.description}
                              </div>
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

                            {/* Full-Width Balanced Data Tables (Zero Empty Space on Right) */}
                            {sub.table && (
                              <div className="w-full rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs overflow-hidden mt-3">
                                <table className="w-full border-collapse text-left font-sans text-xs">
                                  <thead>
                                    <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold border-b border-[#001733]">
                                      {sub.table.headers.map((h, hIdx) => {
                                        const totalCols = sub.table?.headers.length || 2;
                                        const isFirst = hIdx === 0;
                                        const isLast = hIdx === totalCols - 1;
                                        const isSno = isFirst && (h.toLowerCase().includes("s. no") || h.toLowerCase().includes("s.no") || h.toLowerCase().includes("sl"));

                                        let colWidth = "w-auto";
                                        if (isSno) colWidth = "w-16 sm:w-20 text-center";
                                        else if (totalCols === 2) {
                                          colWidth = isFirst ? "w-1/2" : "w-1/2 text-right sm:text-left";
                                        } else if (totalCols === 3) {
                                          if (isFirst) colWidth = "w-16 sm:w-24 text-center";
                                          else if (isLast) colWidth = "w-44 sm:w-56 text-right";
                                          else colWidth = "w-auto";
                                        }

                                        return (
                                          <th
                                            key={hIdx}
                                            className={`py-3.5 px-4 sm:px-6 ${colWidth} ${
                                              isLast && totalCols <= 3 ? "text-right" : "text-left"
                                            }`}
                                          >
                                            {h}
                                          </th>
                                        );
                                      })}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                    {sub.table.rows.map((row, rIdx) => {
                                      const totalCols = row.length;
                                      return (
                                        <tr
                                          key={rIdx}
                                          className="hover:bg-blue-50/50 transition-colors"
                                        >
                                          {row.map((cell, cIdx) => {
                                            const isFirst = cIdx === 0;
                                            const isLast = cIdx === totalCols - 1;
                                            const headerText = sub.table?.headers[cIdx]?.toLowerCase() || "";
                                            const isUrl = typeof cell === "string" && cell.startsWith("http");
                                            const isTotal = headerText.includes("total") || headerText.includes("details");

                                            return (
                                              <td
                                                key={cIdx}
                                                className={`py-3.5 px-4 sm:px-6 ${
                                                  isFirst ? "font-bold text-slate-900" : ""
                                                } ${isLast && totalCols <= 3 ? "text-right" : "text-left"}`}
                                              >
                                                {isUrl ? (
                                                  <a
                                                    href={cell}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-[#002147] hover:text-white font-bold text-xs transition-all border border-blue-100 shadow-2xs"
                                                  >
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    <span>Open Portal</span>
                                                  </a>
                                                ) : isTotal && isLast ? (
                                                  <span className="font-extrabold text-blue-900 text-[13px]">
                                                    {cell}
                                                  </span>
                                                ) : (
                                                  cell
                                                )}
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      );
                                    })}
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

                    {/* Section Photo Gallery Grid (6 Photos + View More) */}
                    {currentSection.images && currentSection.images.length > 0 && (
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
                                Photo Gallery — {currentSection.title.replace(/^\d+\.\s*/, "")}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                Visual facility showcase &amp; infrastructure records
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-black uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-lg tracking-wider self-start sm:self-auto">
                            {currentSection.images.length} Photos Available
                          </span>
                        </div>

                        {/* Responsive 3-column Grid (6 initial frames or all expanded) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 pt-1">
                          {displayedGalleryImages.map((imgSrc, imgIdx) => (
                            <div
                              key={imgIdx}
                              onClick={() => openLightbox(currentSection.images, imgIdx, currentSection.title)}
                              className="group relative rounded-xl overflow-hidden bg-slate-100 cursor-pointer aspect-[4/3] shadow-2xs border border-slate-200/80 hover:shadow-md hover:scale-[1.02] transition-all duration-300 select-none"
                            >
                              <img
                                src={imgSrc}
                                alt={`${currentSection.title} photo ${imgIdx + 1}`}
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

                        {/* View More / Show Less Toggle Button */}
                        {currentSection.images.length > 6 && (
                          <div className="flex justify-center pt-3 border-t border-slate-100 mt-2">
                            <button
                              type="button"
                              onClick={() => setShowAllGallery(!showAllGallery)}
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 hover:bg-[#004225] hover:text-white border border-emerald-200/90 transition-all shadow-2xs hover:shadow hover:scale-105 active:scale-95 cursor-pointer select-none"
                            >
                              <Eye className="h-4 w-4" />
                              <span>
                                {showAllGallery
                                  ? "Show Less Photos"
                                  : `View More Photos (+${currentSection.images.length - 6} more)`}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  showAllGallery ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>

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
