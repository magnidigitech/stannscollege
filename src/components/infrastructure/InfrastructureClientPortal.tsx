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
  Sparkles,
  Calendar,
  Compass,
  Target,
  Award,
  BookMarked,
  FolderArchive,
  Image as ImageIcon
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import {
  INFRASTRUCTURE_SECTIONS,
  INFRASTRUCTURE_SUBTEXT,
  InfrastructureSectionItem,
  LibraryActivityEvent
} from "./staticData";

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
      { text: "4. Computer Labs", id: "ict-digital" },
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
  const [selectedActivityYear, setSelectedActivityYear] = useState<string>("All");
  const [showAllActivities, setShowAllActivities] = useState<boolean>(false);

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
      setShowAllActivities(false);
    }
  }, [activeSlug]);

  // Find active section data
  const currentSection = useMemo(() => {
    return (
      INFRASTRUCTURE_SECTIONS.find((s) => s.slug === currentTab) ||
      INFRASTRUCTURE_SECTIONS[0]
    );
  }, [currentTab]);

  const scrollToSectionHeader = () => {
    if (typeof window === "undefined") return;
    const sectionEl = document.getElementById("infrastructure-active-section");
    if (sectionEl) {
      const header = document.getElementById("main-header");
      const currentHeight = header
        ? header.getBoundingClientRect().height || header.offsetHeight
        : 225;
      const elementPosition = sectionEl.getBoundingClientRect().top + window.pageYOffset;
      const targetScrollY = elementPosition - currentHeight - 16;
      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: "smooth"
      });
    }
  };

  const handleTabChange = (slug: string) => {
    setCurrentTab(slug);
    setShowAllGallery(false);
    setShowAllActivities(false);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/infrastructure/${slug}`);
      setTimeout(() => {
        scrollToSectionHeader();
      }, 50);
    }
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
            
            {/* Left: Navigation Sidebar (Sticky) */}
            <aside className="lg:col-span-3 h-full">
              <AboutSidebar
                categories={INFRASTRUCTURE_SIDEBAR_CATEGORIES}
                bannerTitle="Campus Infrastructure"
                bannerSubtitle="Sections on this Page"
                activeId={currentTab}
                onItemClick={(id) => handleTabChange(id)}
              />
            </aside>

            {/* Right: Data Elements / Subpage Content */}
            <main className="lg:col-span-9 flex flex-col gap-8 mb-16">
              {/* Sub-text Box at Top */}
              <SubtextBox>
                <p className="text-slate-800 font-medium leading-relaxed">
                  <strong className="text-blue-900 font-bold">
                    {INFRASTRUCTURE_SUBTEXT.institution}
                  </strong>
                  , provides a safe, accessible, technology-enabled and student-friendly campus environment that supports teaching, learning, research, skill development, sports and holistic student development. The infrastructure is periodically maintained and upgraded to meet academic and institutional requirements.
                  <span className="block mt-2 text-slate-600 font-medium text-sm">
                    This section provides comprehensive details regarding academic learning spaces, central library, specialized laboratories, student residential amenities, sports facilities, safety systems, and green campus initiatives.
                  </span>
                </p>
              </SubtextBox>

              {/* ============================================================ */}
              {/* ACTIVE SUBPAGE SECTION CONTAINER                             */}
              {/* ============================================================ */}
              <section
                id="infrastructure-active-section"
                key={currentSection.id}
                className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
                style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
              >
                {/* Full-Width Section Header Banner */}
                <div
                  className="text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
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
                  {/* Primary Narrative Card */}
                  <div
                    className="border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                    style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                  >
                    {currentSection.description && currentSection.description.trim().length > 0 && (
                      <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed text-justify whitespace-pre-line">
                        {currentSection.description}
                      </p>
                    )}

                    {/* Subsections rendering (Parts A to L for Library, or specialized sub-items) */}
                    {currentSection.subsections &&
                      currentSection.subsections.map((sub, sIdx) => {
                        return (
                          <div
                            key={sIdx}
                            className={`flex flex-col gap-4 ${
                              sIdx > 0 || (currentSection.description && currentSection.description.trim().length > 0)
                                ? "pt-6 border-t border-slate-100"
                                : ""
                            }`}
                          >
                            {/* Subsection Header */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                              <h4 className="font-outfit text-base sm:text-lg font-black text-blue-900 uppercase tracking-wide flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0"></span>
                                <span>{sub.title}</span>
                              </h4>
                              {sub.subtitle && (
                                <span className="text-xs text-slate-500 font-semibold italic sm:pl-4">
                                  {sub.subtitle}
                                </span>
                              )}
                            </div>

                            {/* Subsection Description */}
                            {sub.description && (
                              <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line text-justify">
                                {sub.description}
                              </p>
                            )}

                            {/* Vision Block */}
                            {sub.vision && (
                              <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white p-4 rounded-xl border border-blue-200/80 shadow-2xs flex items-start gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0 mt-0.5 shadow-xs">
                                  <Compass className="h-4 w-4" />
                                </span>
                                <div>
                                  <span className="text-xs font-black uppercase tracking-wider text-blue-900 block mb-0.5">
                                    Vision
                                  </span>
                                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
                                    &ldquo;{sub.vision}&rdquo;
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Mission Block */}
                            {sub.mission && sub.mission.length > 0 && (
                              <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs uppercase tracking-wider">
                                  <Target className="h-4 w-4 text-blue-600" />
                                  <span>Mission</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                                  {sub.mission.map((mStr, mIdx) => (
                                    <div
                                      key={mIdx}
                                      className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200/70 shadow-2xs text-xs font-semibold text-slate-800 leading-snug"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <span>{mStr}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Objectives Block */}
                            {sub.objectives && sub.objectives.length > 0 && (
                              <div className="flex flex-col gap-2 pt-1">
                                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                                  <Award className="h-4 w-4 text-blue-600" />
                                  <span>Key Objectives</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                  {sub.objectives.map((objStr, oIdx) => (
                                    <div
                                      key={oIdx}
                                      className="flex items-start gap-2.5 bg-slate-50/90 p-3 rounded-xl border border-slate-200/70 shadow-2xs text-xs font-semibold text-slate-800 leading-snug"
                                    >
                                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-blue-800 font-black text-[10px] shrink-0 mt-0.5">
                                        {oIdx + 1}
                                      </span>
                                      <span>{objStr}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Role in Teaching, Learning & Research */}
                            {sub.role && (
                              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100/90 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed text-justify">
                                <strong className="text-blue-900 font-bold block mb-1">
                                  Role in Teaching, Learning &amp; Research:
                                </strong>
                                {sub.role}
                              </div>
                            )}

                            {/* Resource Highlights Strip */}
                            {sub.highlights && (
                              <div className="bg-[#002147] text-white p-4 rounded-xl shadow-xs border border-blue-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                                <div className="flex items-center gap-2.5">
                                  <BookMarked className="h-5 w-5 text-blue-300 shrink-0" />
                                  <span className="text-xs font-black uppercase tracking-wider text-blue-200">
                                    Resource Highlights:
                                  </span>
                                </div>
                                <div className="text-xs font-extrabold text-blue-50 tracking-wide">
                                  {sub.highlights}
                                </div>
                              </div>
                            )}

                            {/* Bullet Item Cards (2-Column Responsive) */}
                            {sub.items && sub.items.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                {sub.items.map((itemStr, iIdx) => {
                                  const colonIdx = itemStr.indexOf(" – ");
                                  const altColonIdx = itemStr.indexOf(": ");
                                  const splitIdx = colonIdx !== -1 ? colonIdx : altColonIdx;

                                  if (splitIdx > 0 && splitIdx < 60) {
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

                            {/* Structured Blocks (for G, F, I, etc.) */}
                            {sub.blocks && sub.blocks.length > 0 && (
                              <div className="space-y-4 pt-1">
                                {sub.blocks.map((block, bIdx) => (
                                  <div
                                    key={bIdx}
                                    className="bg-slate-50/90 p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col gap-3"
                                  >
                                    <h5 className="font-outfit text-sm font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
                                      <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
                                      <span>{block.heading}</span>
                                    </h5>

                                    {block.description && (
                                      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line text-justify">
                                        {block.description}
                                      </p>
                                    )}

                                    {block.points && block.points.length > 0 && (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                        {block.points.map((pStr, pIdx) => (
                                          <div
                                            key={pIdx}
                                            className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200/70 text-xs font-medium text-slate-800 leading-snug"
                                          >
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>{pStr}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {block.links && block.links.length > 0 && (
                                      <div className="flex flex-wrap gap-2.5 pt-1">
                                        {block.links.map((link, lIdx) => (
                                          <a
                                            key={lIdx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl font-bold text-xs transition-all border border-blue-200/80 shadow-2xs group"
                                          >
                                            <ExternalLink className="h-3.5 w-3.5 text-blue-600 group-hover:text-white" />
                                            <span>{link.title}</span>
                                            {link.note && (
                                              <span className="text-[10px] opacity-75 font-normal ml-1">
                                                — {link.note}
                                              </span>
                                            )}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Digital Resource Policy Points */}
                            {sub.policyPoints && sub.policyPoints.length > 0 && (
                              <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 flex flex-col gap-2.5">
                                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                                  Digital Resource Access &amp; Usage Guidelines:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {sub.policyPoints.map((polStr, polIdx) => (
                                    <div
                                      key={polIdx}
                                      className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200/70 text-xs font-medium text-slate-800 leading-snug"
                                    >
                                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-blue-800 font-bold text-[10px] shrink-0 mt-0.5">
                                        {polIdx + 1}
                                      </span>
                                      <span>{polStr}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Major Library Activities List */}
                            {sub.activitiesList && sub.activitiesList.length > 0 && (
                              <div className="flex flex-col gap-2.5 pt-1">
                                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                                  Major Library Activities &amp; Initiatives:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {sub.activitiesList.map((actName, actIdx) => (
                                    <span
                                      key={actIdx}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 font-bold text-xs border border-blue-100 shadow-2xs"
                                    >
                                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                                      <span>{actName}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* ======================================================== */}
                            {/* PART K: ACTIVITY-WISE EVENT GALLERY                      */}
                            {/* ======================================================== */}
                            {sub.activityEvents && sub.activityEvents.length > 0 && (
                              <div className="mt-4 flex flex-col gap-4 border-2 border-blue-100 rounded-2xl p-5 bg-gradient-to-b from-blue-50/40 to-white shadow-xs">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
                                  <div className="flex items-center gap-2.5">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0">
                                      <ImageIcon className="h-4 w-4" />
                                    </span>
                                    <div>
                                      <h5 className="font-outfit text-sm sm:text-base font-extrabold text-blue-950 uppercase tracking-wide">
                                        Activity &amp; Event Gallery
                                      </h5>
                                      <p className="text-[11px] text-slate-500 font-semibold">
                                        Latest activity photo documentation &amp; literary programmes
                                      </p>
                                    </div>
                                  </div>

                                  {/* Academic Year Filter Pills */}
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {["All", "2025–2026", "2024–2025", "2023–2024"].map((year) => (
                                      <button
                                        key={year}
                                        type="button"
                                        onClick={() => setSelectedActivityYear(year)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                          selectedActivityYear === year
                                            ? "bg-[#002147] text-white shadow-xs"
                                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                        }`}
                                      >
                                        {year}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Activity Cards (Latest-first, top 3 visible or all expanded) */}
                                {(() => {
                                  const filteredEvents = sub.activityEvents.filter(
                                    (ev) =>
                                      selectedActivityYear === "All" ||
                                      ev.academicYear === selectedActivityYear
                                  );

                                  const displayedEvents = showAllActivities
                                    ? filteredEvents
                                    : filteredEvents.slice(0, 3);

                                  return (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {displayedEvents.map((ev, evIdx) => (
                                          <div
                                            key={ev.id}
                                            className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden"
                                          >
                                            {/* Thumbnail Media Preview */}
                                            {ev.images && ev.images.length > 0 && (
                                              <div
                                                onClick={() => openLightbox(ev.images, 0, ev.title)}
                                                className="relative aspect-[16/10] bg-slate-100 cursor-pointer group overflow-hidden"
                                              >
                                                <img
                                                  src={ev.images[0]}
                                                  alt={ev.title}
                                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                  loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                                                  <span className="text-white text-[11px] font-bold inline-flex items-center gap-1">
                                                    <Maximize2 className="h-3 w-3" />
                                                    View {ev.images.length} Photos
                                                  </span>
                                                </div>
                                                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                                                  {ev.academicYear}
                                                </span>
                                              </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                                              <div className="space-y-1">
                                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                                                  <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                                    {ev.category}
                                                  </span>
                                                  <span>{ev.dateStr}</span>
                                                </div>
                                                <h6 className="font-outfit font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                                                  {ev.title}
                                                </h6>
                                                <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">
                                                  {ev.description}
                                                </p>
                                              </div>

                                              {/* Thumbnails Row */}
                                              {ev.images && ev.images.length > 1 && (
                                                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                                                  {ev.images.slice(0, 3).map((thumb, tIdx) => (
                                                    <div
                                                      key={tIdx}
                                                      onClick={() => openLightbox(ev.images, tIdx, ev.title)}
                                                      className="h-10 w-14 rounded-md overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 hover:opacity-80 transition-opacity"
                                                    >
                                                      <img
                                                        src={thumb}
                                                        alt="Thumbnail"
                                                        className="h-full w-full object-cover"
                                                      />
                                                    </div>
                                                  ))}
                                                  {ev.images.length > 3 && (
                                                    <span className="text-[10px] font-bold text-slate-400 pl-1">
                                                      +{ev.images.length - 3} more
                                                    </span>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>

                                      {/* View More / Show Less Toggle Button */}
                                      {filteredEvents.length > 3 && (
                                        <div className="flex justify-center pt-2">
                                          <button
                                            type="button"
                                            onClick={() => setShowAllActivities(!showAllActivities)}
                                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-blue-50 text-blue-900 hover:bg-[#002147] hover:text-white border border-blue-200 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                                          >
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>
                                              {showAllActivities
                                                ? "Show Fewer Activities"
                                                : `View More Activities (+${filteredEvents.length - 3} more)`}
                                            </span>
                                            <ChevronDown
                                              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                                showAllActivities ? "rotate-180" : ""
                                              }`}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            )}

                            {/* Full-Width Balanced Data Tables */}
                            {sub.table && (
                              <div className="w-full rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs overflow-hidden mt-2">
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

                            {/* Standalone Links / Portals */}
                            {sub.links && (
                              <div className="flex flex-wrap gap-2.5 pt-1">
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
                        );
                      })}
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
