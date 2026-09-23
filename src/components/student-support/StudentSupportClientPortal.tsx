"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  FileText,
  ChevronRight,
  Eye,
  Download,
  Trophy,
  GraduationCap,
  Compass,
  Sprout,
  Flame,
  Heart,
  Flag,
  Users,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Activity,
  BookOpen,
  FileSpreadsheet,
  Milestone,
  Scale,
  Building,
  UserCheck,
  FolderLock,
  Layers,
  Medal,
  Target,
  Search,
  X
} from "lucide-react";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { openPdfViewer, getCleanPdfUrl } from "@/lib/pdf-viewer";
import { STUDENT_SUPPORT_DATA } from "@/components/student-support/staticData";

const DEFAULT_PDF = "/documents/DefaultFile_1.pdf";

const STUDENT_SUPPORT_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "sec-welfare-services",
    title: "A. Support & Welfare Services",
    sectionId: "sec-welfare-services",
    items: [
      { text: "1. Anti-Ragging Committee", id: "sec-anti-ragging" },
      { text: "2. Grievance Redressal Cell", id: "sec-grievance-redressal" },
      { text: "3. Internal Complaints Committee (ICC)", id: "sec-internal-complaints" },
      { text: "4. Women Empowerment Cell", id: "sec-women-empowerment" },
      { text: "5. Equal Opportunity (SC/ST/Minority)", id: "sec-equal-opportunity" },
      { text: "6. Student Counselling Cell", id: "sec-student-counselling" },
      { text: "7. Mentor–Mentee System", id: "sec-mentor-mentee" },
      { text: "8. Parent Association", id: "sec-parent-association" },
      { text: "9. Student Welfare & Scholarships", id: "sec-scholarships-welfare" },
      { text: "10. Support for Divyangjan Students", id: "sec-divyangjan-support" },
      { text: "11. Student Feedback & Satisfaction", id: "sec-student-feedback" },
    ],
  },
  {
    catSlug: "sec-sports-games",
    title: "B. Sports & Games",
    sectionId: "sec-sports-games",
    items: [
      { text: "1. Sports & Games Facilities", id: "sec-sports-facilities" },
      { text: "2. Intramural Competitions", id: "sec-sports-intramural" },
      { text: "3. Inter-Collegiate Tournaments", id: "sec-sports-intercollegiate" },
      { text: "4. University / State / National Level", id: "sec-sports-national" },
      { text: "5. Self-Defense & Safety Training", id: "sec-sports-selfdefense" },
      { text: "6. Fitness, Yoga & Wellness", id: "sec-sports-fitness" },
      { text: "7. Sports Coaching & Training", id: "sec-sports-coaching" },
      { text: "8. Sports Laurels & Achievements", id: "sec-sports-achievements" },
      { text: "9. Annual Sports Meets & Events", id: "sec-sports-events" },
    ],
  },
  {
    catSlug: "sec-extension-outreach",
    title: "C. Extension & Outreach",
    sectionId: "sec-extension-outreach",
    items: [
      { text: "1. National Service Scheme (NSS)", id: "sec-nss" },
      { text: "2. National Cadet Corps (NCC)", id: "sec-ncc" },
      { text: "3. Red Ribbon Club (RRC)", id: "sec-rrc" },
      { text: "4. Mother Gnanamma Outreach", id: "sec-mother-gnanamma" },
      { text: "5. Eco Club & Environment", id: "sec-eco-club" },
      { text: "6. Community Outreach – UBA", id: "sec-uba" },
    ],
  },
  {
    catSlug: "sec-capacity-building",
    title: "D. Workshops & Seminars",
    sectionId: "sec-capacity-building",
    items: [
      { text: "1. Workshops & Seminars", id: "sec-workshops" },
    ],
  },
  {
    catSlug: "sec-student-achievements",
    title: "E. Student Participation & Laurels",
    sectionId: "sec-student-achievements",
    items: [
      { text: "1. Student Laurels & University Ranks", id: "sec-laurels" },
    ],
  },
];

interface SupportDocItem {
  title: string;
  fileUrl?: string;
  subtitle?: string;
  year?: string;
}

interface GalleryPhotoItem {
  id?: string;
  url: string;
  title?: string;
  caption?: string;
  year?: string;
}

interface PhotoGalleryModalState {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  photos: GalleryPhotoItem[];
}

interface StudentSupportClientPortalProps {
  activeSlug?: string;
  galleryImages?: Array<{ url: string; caption?: string }>;
  rankHolders?: any[];
  initialSections?: any[];
  studentSupportData?: any;
  portalData?: any;
}

export default function StudentSupportClientPortal({
  activeSlug = "",
  portalData,
}: StudentSupportClientPortalProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-welfare-services");
  const [portal, setPortal] = useState<any>(portalData || STUDENT_SUPPORT_DATA);

  // Sync when incoming server portalData changes or fetch client-side if missing
  useEffect(() => {
    if (portalData) {
      setPortal(portalData);
    } else {
      fetch("/api/admin/student-support")
        .then((res) => res.json())
        .then((res) => {
          if (res && res.success && res.data) {
            setPortal(res.data);
          }
        })
        .catch(() => {});
    }
  }, [portalData]);

  // State for View All Archive Modal
  const [archiveModalData, setArchiveModalData] = useState<{
    title: string;
    subtitle?: string;
    docs: SupportDocItem[];
  } | null>(null);
  const [archiveSearchQuery, setArchiveSearchQuery] = useState("");

  // State for Photo Gallery Modal & Lightbox
  const [activeGalleryModal, setActiveGalleryModal] = useState<PhotoGalleryModalState | null>(null);
  const [galleryYearFilter, setGalleryYearFilter] = useState<string>("all");
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);

  const normalizeYear = (yr?: string) => {
    if (!yr) return "";
    return yr.replace(/\s+/g, "").replace(/–/g, "-");
  };

  const galleryAvailableYears = React.useMemo(() => {
    if (!activeGalleryModal?.photos) return [];
    const yearsSet = new Set<string>();
    activeGalleryModal.photos.forEach((p) => {
      if (p.year && p.year.trim()) {
        yearsSet.add(p.year.trim());
      }
    });
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [activeGalleryModal]);

  const currentModalPhotos = React.useMemo(() => {
    if (!activeGalleryModal?.photos) return [];
    if (galleryYearFilter === "all") return activeGalleryModal.photos;
    return activeGalleryModal.photos.filter(
      (p) => normalizeYear(p.year) === normalizeYear(galleryYearFilter) || (p.year && p.year.includes(galleryYearFilter))
    );
  }, [activeGalleryModal, galleryYearFilter]);

  const normalizeGalleryPhotos = (rawList: any[]): GalleryPhotoItem[] => {
    if (!Array.isArray(rawList)) return [];
    const photos: GalleryPhotoItem[] = [];
    rawList.forEach((item) => {
      if (!item) return;
      if (Array.isArray(item.images) && item.images.length > 0) {
        item.images.forEach((img: any, idx: number) => {
          photos.push({
            id: img.id || `${item.id || item.title || "grp"}-${idx}`,
            url: img.url,
            title: img.title || item.title || "Photo",
            year: img.year || item.year || "2025–2026",
            caption: img.caption || item.caption || "",
          });
        });
      } else if (item.url) {
        photos.push({
          id: item.id || `photo-${Math.random()}`,
          url: item.url,
          title: item.title || "Photo",
          year: item.year || "2025–2026",
          caption: item.caption || "",
        });
      }
    });
    return photos;
  };

  const openGalleryModal = (title: string, subtitle: string, rawPhotos: any[]) => {
    setGalleryYearFilter("all");
    setGalleryLightboxIndex(null);
    const photos = normalizeGalleryPhotos(rawPhotos);
    setActiveGalleryModal({
      isOpen: true,
      title,
      subtitle,
      photos,
    });
  };

  const welfareItems = portal?.welfareServices?.items || STUDENT_SUPPORT_DATA.welfareServices.items;

  const getCellData = (slug: string) => {
    return (
      welfareItems.find((item: any) => item.slug === slug) ||
      STUDENT_SUPPORT_DATA.welfareServices.items.find((item: any) => item.slug === slug) ||
      {}
    );
  };

  const renderFormButton = (cell: any, defaultLabel: string = "Online Form") => {
    if (!cell?.formUrl || typeof cell.formUrl !== "string" || cell.formUrl.trim() === "") {
      return null;
    }
    const url = cell.formUrl.trim();
    if (url.toLowerCase().endsWith(".pdf")) {
      return (
        <button
          type="button"
          onClick={() => openPdf(url, `${cell.title} - Form`)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>{cell.formLabel || defaultLabel}</span>
          <ExternalLink className="h-3 w-3 opacity-80" />
        </button>
      );
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
      >
        <MessageSquare className="h-3.5 w-3.5" />
        <span>{cell.formLabel || defaultLabel}</span>
        <ExternalLink className="h-3 w-3 opacity-80" />
      </a>
    );
  };

  // Map incoming URL slug to page element id
  const slugToIdMap: Record<string, string> = {
    "anti-ragging": "sec-anti-ragging",
    "grievance-redressal": "sec-grievance-redressal",
    "internal-complaints": "sec-internal-complaints",
    "women-empowerment": "sec-women-empowerment",
    "equal-opportunity": "sec-equal-opportunity",
    "student-counselling": "sec-student-counselling",
    "mentor-mentee": "sec-mentor-mentee",
    "parent-association": "sec-parent-association",
    "scholarships-welfare": "sec-scholarships-welfare",
    "divyangjan-support": "sec-divyangjan-support",
    "student-feedback": "sec-student-feedback",
    "sports-games": "sec-sports-games",
    "sports-facilities": "sec-sports-facilities",
    "sports-competitions": "sec-sports-intramural",
    "sports-achievements": "sec-sports-national",
    "self-defense-safety": "sec-sports-selfdefense",
    "fitness-wellness": "sec-sports-fitness",
    "sports-gallery": "sec-sports-games",
    "nss-activities": "sec-nss",
    "ncc-activities": "sec-ncc",
    "red-ribbon-club": "sec-rrc",
    "mother-gnanamma": "sec-mother-gnanamma",
    "eco-club": "sec-eco-club",
    "environmental-social": "sec-eco-club",
    "unnat-bharat-abhiyan": "sec-uba",
    "workshops-seminars": "sec-workshops",
    "capacity-building": "sec-workshops",
    "student-achievements": "sec-laurels",
    "academic-achievements": "sec-laurels",
  };

  // Only scroll if an explicit non-empty activeSlug was provided
  useEffect(() => {
    if (activeSlug && activeSlug.trim() !== "" && slugToIdMap[activeSlug]) {
      const targetId = slugToIdMap[activeSlug];
      setActiveSectionId(targetId);
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [activeSlug]);

  // Handle escape and arrow keys for modals & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (galleryLightboxIndex !== null) {
          setGalleryLightboxIndex(null);
        } else if (activeGalleryModal) {
          setActiveGalleryModal(null);
        } else if (archiveModalData) {
          setArchiveModalData(null);
        }
      } else if (galleryLightboxIndex !== null && currentModalPhotos.length > 0) {
        if (e.key === "ArrowLeft") {
          setGalleryLightboxIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : currentModalPhotos.length - 1
          );
        } else if (e.key === "ArrowRight") {
          setGalleryLightboxIndex((prev) =>
            prev !== null && prev < currentModalPhotos.length - 1 ? prev + 1 : 0
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryLightboxIndex, activeGalleryModal, archiveModalData, currentModalPhotos]);

  // Scrollspy to automatically highlight sidebar items as user scrolls
  useEffect(() => {
    const allIds = [
      "sec-welfare-services",
      "sec-anti-ragging",
      "sec-grievance-redressal",
      "sec-internal-complaints",
      "sec-women-empowerment",
      "sec-equal-opportunity",
      "sec-student-counselling",
      "sec-mentor-mentee",
      "sec-parent-association",
      "sec-scholarships-welfare",
      "sec-divyangjan-support",
      "sec-student-feedback",
      "sec-sports-games",
      "sec-sports-facilities",
      "sec-sports-intramural",
      "sec-sports-intercollegiate",
      "sec-sports-national",
      "sec-sports-selfdefense",
      "sec-sports-fitness",
      "sec-sports-coaching",
      "sec-sports-achievements",
      "sec-sports-events",
      "sec-extension-outreach",
      "sec-nss",
      "sec-ncc",
      "sec-rrc",
      "sec-mother-gnanamma",
      "sec-eco-club",
      "sec-uba",
      "sec-capacity-building",
      "sec-workshops",
      "sec-student-achievements",
      "sec-laurels",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(allIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPdf = (url?: string, title?: string) => {
    openPdfViewer(url || DEFAULT_PDF, title);
  };

  /**
   * Reusable Strategic Documents-style Document Card with Alternating Backgrounds
   */
  const renderDocCard = (
    doc: SupportDocItem,
    idx: number,
    type: "core" | "yearly" = "core"
  ) => {
    const fileUrl = doc.fileUrl && doc.fileUrl.trim() !== "" ? doc.fileUrl : DEFAULT_PDF;
    const isYearly = type === "yearly";
    // Alternate background: even index = white, odd index = soft blue
    const isAltBg = idx % 2 === 1;

    return (
      <div
        key={idx}
        className={`border-2 ${
          isAltBg
            ? "border-blue-200/90 bg-[#e8f1fd]"
            : "border-slate-200/90 bg-white"
        } rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group relative select-none`}
      >
        <div className="flex items-start gap-3.5">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isAltBg
                ? "bg-white border border-blue-200/80 text-blue-700 group-hover:bg-[#002147] group-hover:text-white"
                : isYearly
                ? "bg-emerald-50 border border-emerald-100 text-emerald-700 group-hover:bg-[#002147] group-hover:text-white"
                : "bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-[#002147] group-hover:text-white"
            } transition-colors duration-200 shadow-2xs`}
          >
            {isYearly ? <Calendar className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </span>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <h5
              className={`font-outfit ${
                isAltBg ? "text-blue-900" : isYearly ? "text-slate-900 group-hover:text-blue-900" : "text-blue-700 group-hover:text-blue-900"
              } font-bold text-sm leading-snug transition-colors`}
            >
              {doc.title}
            </h5>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span
                className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                  isAltBg
                    ? "bg-white text-blue-800 border border-blue-200/80 shadow-2xs"
                    : isYearly
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/70"
                    : "bg-blue-50 text-blue-800 border border-blue-200/70"
                }`}
              >
                {doc.year || (isYearly ? "Annual Report" : "Institutional Doc")}
              </span>
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                {doc.subtitle || "PDF File"}
              </span>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-2 pt-3 border-t ${isAltBg ? "border-blue-200/70" : "border-slate-100"} mt-1`}>
          <button
            type="button"
            onClick={() => openPdf(fileUrl, doc.title)}
            className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold ${
              isAltBg
                ? "text-blue-800 bg-white hover:bg-[#002147] hover:text-white border border-blue-200/80"
                : isYearly
                ? "text-emerald-800 bg-emerald-50/70 hover:bg-[#002147] hover:text-white border border-emerald-200/70"
                : "text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white border border-blue-100/80"
            } px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer shadow-2xs`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View PDF</span>
          </button>
          <a
            href={getCleanPdfUrl(fileUrl, doc.title, true)}
            download
            className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 ${
              isAltBg ? "bg-white hover:bg-slate-100 border border-blue-200/80" : "bg-slate-50 hover:bg-slate-100 border border-slate-200/80"
            } px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer shadow-2xs`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>
    );
  };

  /**
   * Helper to render yearly reports list:
   * Displays top 3 latest files ordered newest first, with a "View More / View All" button if > 3 docs.
   */
  const renderYearlyReportsSection = (
    title: string,
    allDocsNewestFirst: SupportDocItem[]
  ) => {
    const displayedDocs = allDocsNewestFirst.slice(0, 3);
    const hasMore = allDocsNewestFirst.length > 3;

    return (
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-200/70">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
              <Calendar className="h-3.5 w-3.5" />
            </span>
            <h5 className="font-outfit font-extrabold text-slate-800 text-xs md:text-sm uppercase tracking-wider">
              {title}
            </h5>
          </div>

          {/* View More / View All Archive Button */}
          <button
            type="button"
            onClick={() => {
              setArchiveSearchQuery("");
              setArchiveModalData({
                title,
                subtitle: `Complete year-wise archive (${allDocsNewestFirst.length} documents)`,
                docs: allDocsNewestFirst,
              });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-[#002147] hover:text-white border border-blue-200 px-3 py-1 rounded-xl transition-all shadow-2xs cursor-pointer select-none"
            title="View complete document archive"
          >
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            <span>View All ({allDocsNewestFirst.length})</span>
            <ExternalLink className="h-3 w-3 opacity-80" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedDocs.map((doc, idx) => renderDocCard(doc, idx, "yearly"))}
        </div>
      </div>
    );
  };

  const filteredModalDocs = (archiveModalData?.docs || []).filter((doc) => {
    if (!archiveSearchQuery.trim()) return true;
    const q = archiveSearchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      (doc.year && doc.year.toLowerCase().includes(q)) ||
      (doc.subtitle && doc.subtitle.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: Navigation Sidebar */}
            <aside className="lg:col-span-3">
              <AboutSidebar
                categories={STUDENT_SUPPORT_SIDEBAR_CATEGORIES}
                bannerTitle="Student Support Services"
                bannerSubtitle="Sections on this Page"
                activeId={activeSectionId}
                onItemClick={(id) => setActiveSectionId(id)}
              />
            </aside>

            {/* Right: Data Elements / Sections */}
            <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
              <div className="flex flex-col gap-4">

                {/* Sub-text Box */}
                <SubtextBox>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <strong className="text-blue-900 font-bold">
                      St. Ann’s College for Women, Gorantla, Guntur
                    </strong>, is committed to providing a safe, inclusive, supportive and student-friendly campus environment. The institution has established various support systems and welfare mechanisms to address the academic, personal, social and developmental needs of students. These initiatives promote student well-being, equity, dignity, safety, effective grievance redressal and holistic development.
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      This section provides access to important student support cells, statutory committees, welfare schemes, sports &amp; games, extension activities, capacity building programmes and student laurels.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* SECTION A: Student Support & Welfare Services                */}
                {/* ============================================================ */}
                <section
                  id="sec-welfare-services"
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
                      <HeartHandshake className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        A. Student Support &amp; Welfare Services
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Comprehensive student-centric support mechanisms, statutory grievance cells, and welfare initiatives.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* A.1 Anti-Ragging Committee */}
                    {(() => {
                      const cell = getCellData("anti-ragging");
                      const coreDocs = [
                        { title: "Anti-Ragging Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/1.Anti Ragging COmmittee.pdf" },
                        { title: "Anti-Ragging Policy & Framework", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/1.Anti Ragging Policy.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-anti-ragging"
                          className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                <ShieldCheck className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  1. Anti-Ragging Committee
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{cell.tagline || "Committed to a Safe, Respectful and Ragging-Free Campus"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Anti-Ragging Complaint Form")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Anti-Ragging Committee works towards maintaining a ragging-free campus and creating awareness among students about the prevention of ragging. The Committee undertakes preventive measures, sensitization programmes and appropriate action in accordance with applicable regulations."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("Anti-Ragging Annual Reports & Documentation", reports)}
                        </div>
                      );
                    })()}

                    {/* A.2 Grievance Redressal Cell */}
                    {(() => {
                      const cell = getCellData("grievance-redressal");
                      const coreDocs = [
                        { title: "Grievance Redressal Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/3.Grievance Reddressal Committee.pdf" },
                        { title: "Grievance Redressal Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/3.Greaivance Reddrassal Policy.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-grievance-redressal"
                          className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                <Scale className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  2. Grievance Redressal Cell / Ombudsperson
                                </h4>
                                <p className="text-xs text-blue-600/80 font-medium">{cell.tagline || "Fair, Confidential and Time-Bound Redressal"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Online Grievance Submission Form")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Grievance Redressal Cell provides an accessible mechanism for students to submit grievances, complaints and suggestions related to academic, administrative and other student-support matters."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("Grievance Redressal Annual Reports & Documentation", reports)}
                        </div>
                      );
                    })()}

                    {/* A.3 Internal Complaints Committee (ICC) */}
                    {(() => {
                      const cell = getCellData("internal-complaints");
                      const coreDocs = [
                        { title: "ICC Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/4.ICC Committee.pdf" },
                        { title: "ICC & POSH Policy Guidelines", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/2.Internal Complaints Committee (ICC) & POSH Policy.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-internal-complaints"
                          className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                <FolderLock className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  3. Internal Complaints Committee (ICC)
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{cell.tagline || "Prevention of Sexual Harassment & Gender Dignity"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "ICC Confidential Complaint Form")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Internal Complaints Committee promotes a safe and respectful campus environment and addresses complaints relating to sexual harassment in accordance with applicable statutory provisions."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("ICC Annual Reports & Documentation", reports)}
                        </div>
                      );
                    })()}

                    {/* A.4 Women Empowerment Cell */}
                    {(() => {
                      const cell = getCellData("women-empowerment");
                      const coreDocs = [
                        { title: "Women Empowerment Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/Woment Empowerment COmmittee.pdf" },
                        { title: "Women Empowerment Cell Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/Woment Empowerment Cell Policy 2026.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-women-empowerment"
                          className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                <Sparkles className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  4. Women Empowerment Cell
                                </h4>
                                <p className="text-xs text-blue-600/80 font-medium">{cell.tagline || "Confidence Building, Leadership & Holistic Development"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "WEC Registration / Feedback")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Women Empowerment Cell works towards the empowerment, confidence-building and holistic development of women students."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("WEC Annual Reports & Documentation", reports)}
                        </div>
                      );
                    })()}

                    {/* A.5 Equal Opportunity / SC, ST & Minority Cell */}
                    {(() => {
                      const cell = getCellData("equal-opportunity");
                      const coreDocs = [
                        { title: "EOC SC/ST Minority Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/6.EOC SC ST Minority COmmittee.pdf" },
                        { title: "EOC SC/ST Minority Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/6.EOC SC ST Minority Policy.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-equal-opportunity"
                          className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                <Users className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  5. Equal Opportunity / SC, ST &amp; Minority Cell
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{cell.tagline || "Inclusive Learning & Social Welfare Facilitation"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "EOC Support Request")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Equal Opportunity, SC/ST & Minority Cell promotes an inclusive and equitable learning environment."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("EOC Annual Reports & Action Plans", reports)}
                        </div>
                      );
                    })()}

                    {/* A.6 Student Counselling Cell */}
                    {(() => {
                      const cell = getCellData("student-counselling");
                      const coreDocs = [
                        { title: "Student Counselling Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/9.Student Counselling COmmittee.pdf" },
                        { title: "Student Welfare & Wellness Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/9.Student Welfare,Counselling & Welness Polciy.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-student-counselling"
                          className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                <HeartHandshake className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  6. Student Counselling Cell
                                </h4>
                                <p className="text-xs text-blue-600/80 font-medium">{cell.tagline || "Emotional, Personal & Academic Mental Well-being"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Book Counselling Session")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Student Counselling and Wellness Cell provides confidential professional and peer counselling support to help students cope with academic stress, emotional challenges, career dilemmas and personal issues."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("Student Counselling Annual Reports & Documentation", reports)}
                        </div>
                      );
                    })()}

                    {/* A.7 Mentor–Mentee System */}
                    {(() => {
                      const cell = getCellData("mentor-mentee");
                      const coreDocs = [
                        { title: "Mentor & Mentee Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/Mentor & Mentee Committee.pdf" },
                        { title: "Mentor & Mentee Guidelines", subtitle: "Institutional Guidelines", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/Mentor & Mentee Committee Guidelines.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-mentor-mentee"
                          className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                <GraduationCap className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  7. Mentor–Mentee System
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{cell.tagline || "Continuous Academic Monitoring, Guidance & Personal Care"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Mentor Feedback Form")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Mentor–Mentee System provides continuous academic and personal guidance to students. Faculty mentors monitor students' academic progress, attendance, participation and overall development."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Action Plans & Allocations (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("Mentor–Mentee Action Plans & Allocation Reports", reports)}
                        </div>
                      );
                    })()}

                    {/* A.8 Parent Association */}
                    {(() => {
                      const cell = getCellData("parent-association");
                      const coreDocs = [
                        { title: "Parent Association Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: cell.committeePdf || "/documents/student-support/Parents Association COmmittee.pdf" },
                        { title: "Parent Association Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/Parents Association Policy.pdf" },
                      ];
                      const reports = cell.annualReports || [];
                      return (
                        <div
                          id="sec-parent-association"
                          className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                <Users className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  8. Parent Association
                                </h4>
                                <p className="text-xs text-blue-600/80 font-medium">{cell.tagline || "Institutional Partnership & Constructive Stakeholder Engagement"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Parent Feedback Form")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The Parent Association facilitates meaningful interaction and collaboration between parents, students and the institution. It provides a platform for communication, feedback and constructive engagement concerning students' academic progress, welfare and overall development, thereby strengthening the partnership between the College and parents."}
                          </p>

                          {/* 1. Core Orders & Policies */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Orders &amp; Policies
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>

                          {/* 2. Year-wise Annual Reports (Newest First) */}
                          {reports.length > 0 && renderYearlyReportsSection("Parent Association Annual Reports & Documentation", reports)}
                        </div>
                      );
                    })()}

                    {/* A.9 Student Welfare & Scholarships */}
                    {(() => {
                      const cell = getCellData("scholarships-welfare");
                      const coreDocs = [
                        { title: "Scholarships, Freeships & Financial Assistance Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf" },
                        { title: "Institutional Freeships & Fee Concessions Scheme", subtitle: "Scheme Guidelines", year: "Scheme", fileUrl: DEFAULT_PDF },
                      ];
                      return (
                        <div
                          id="sec-scholarships-welfare"
                          className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                <Award className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  9. Student Welfare &amp; Financial Support
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{cell.tagline || "Government Scholarships, Freeships & Financial Assistance"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Scholarship Enquiry / Application")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "St. Ann’s College for Women supports students through scholarships, financial assistance and welfare schemes to promote equitable access to education and student well-being."}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                            {[
                              "Government & Institutional Scholarships",
                              "SC/ST & Minority Scholarships",
                              "Merit Scholarships & Distinctions",
                              "Financial Assistance / Fee Concessions",
                              "Scholarship Guidance Helpdesk",
                              "Student Welfare & Hardship Relief"
                            ].map((title: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5 bg-slate-50/90 px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs select-none"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-xs font-bold text-slate-800 leading-snug">
                                  {title}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Institutional Policy Documents */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Policies &amp; Schemes
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* A.10 Support for Divyangjan Students */}
                    {(() => {
                      const cell = getCellData("divyangjan-support");
                      const coreDocs = [
                        { title: "Divyangjan Facilities & Support Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: cell.policyPdf || DEFAULT_PDF },
                        { title: "Barrier-Free Access Audit & Report", subtitle: "Compliance Audit", year: "Audit", fileUrl: DEFAULT_PDF },
                      ];
                      return (
                        <div
                          id="sec-divyangjan-support"
                          className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                <HeartHandshake className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  10. Accessibility &amp; Support for Divyangjan Students
                                </h4>
                                <p className="text-xs text-blue-600/80 font-medium">{cell.tagline || "Barrier-Free Access & Assistive Educational Support"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Special Assistance Request")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The College promotes an inclusive and accessible learning environment by providing appropriate facilities and support for students with disabilities."}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                            {[
                              "Accessible Campus Infrastructure (Ramps, Handrails)",
                              "Mobility & Assistive Device Support",
                              "Academic & Scribe Support for Exams",
                              "Equal Educational Opportunities & Extra Time",
                              "Campus Sensitisation & Inclusion Programmes"
                            ].map((title: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 rounded-xl border border-blue-200/80 shadow-2xs select-none"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-xs font-bold text-slate-800 leading-snug">
                                  {title}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Institutional Documents */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-blue-900 text-xs md:text-sm uppercase tracking-wider">
                                Institutional Policies &amp; Audits
                              </h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {coreDocs.map((doc, idx) => renderDocCard(doc, idx, "core"))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* A.11 Student Feedback & Satisfaction */}
                    {(() => {
                      const cell = getCellData("student-feedback");
                      const reports = cell.annualReports && cell.annualReports.length > 0 ? cell.annualReports : [
                        { title: "Student Satisfaction Survey (SSS) Report 2025–2026", subtitle: "Official SSS Analysis", year: "2025–2026", fileUrl: DEFAULT_PDF },
                        { title: "Student Satisfaction Survey (SSS) Report 2024–2025", subtitle: "Official SSS Analysis", year: "2024–2025", fileUrl: DEFAULT_PDF },
                      ];
                      return (
                        <div
                          id="sec-student-feedback"
                          className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                          style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                <MessageSquare className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  11. Student Feedback &amp; Satisfaction
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{cell.tagline || "Student Satisfaction Survey (SSS) & Continuous Quality Improvement"}</p>
                              </div>
                            </div>
                            {renderFormButton(cell, "Submit Student Feedback / SSS")}
                          </div>

                          <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                            {cell.description || "The College collects student feedback and satisfaction responses to identify areas for improvement and strengthen the quality of academic and support services."}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                            {[
                              "Student Feedback on Teaching",
                              "Student Satisfaction Survey (SSS)",
                              "Feedback Analysis Reports",
                              "Action Taken / Improvement"
                            ].map((title: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2.5 bg-slate-50/90 px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs select-none"
                              >
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-xs font-bold text-slate-800 leading-snug">
                                  {title}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Year-wise Feedback Documentation (Newest First) */}
                          {renderYearlyReportsSection("Student Satisfaction Survey (SSS) & Feedback Reports", reports)}
                        </div>
                      );
                    })()}

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION B: Sports & Games                                    */}
                {/* ============================================================ */}
                <section
                  id="sec-sports-games"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec2-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec2-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Trophy className="h-6 w-6 text-amber-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec2-title, var(--level2-title, #ffffff))" }}
                      >
                        B. Sports &amp; Games
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec2-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Physical education, sports tournaments, fitness, self-defense and athletic achievements.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {(portal?.sportsAndGames?.pillars || STUDENT_SUPPORT_DATA.sportsAndGames.pillars).map((item: any, idx: number) => {
                        const isAlt = idx % 2 === 1;
                        const staticPillar = STUDENT_SUPPORT_DATA.sportsAndGames.pillars.find((p: any) => p.slug === item.slug);
                        const reports = (item.reports && item.reports.length > 0) ? item.reports : (staticPillar?.reports || []);
                        const gallery = (item.gallery && item.gallery.length > 0) ? item.gallery : (staticPillar?.gallery || []);
                        return (
                          <div
                            key={idx}
                            id={item.id}
                            className={`scroll-mt-52 border-2 ${
                              isAlt ? "border-blue-200/90 bg-[#e8f1fd]" : "border-slate-200/90 bg-white"
                            } rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                                  Sports &amp; Fitness
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                                  Active Programme
                                </span>
                              </div>
                              <h4 className="font-outfit font-extrabold text-blue-700 text-base md:text-lg group-hover:text-blue-900 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-slate-600 text-xs mt-2 leading-relaxed font-medium text-justify">
                                {item.desc}
                              </p>
                            </div>

                            {/* Action Buttons for Each Sports Wing/Pillar */}
                            <div className={`pt-3.5 border-t ${isAlt ? "border-blue-200/70" : "border-slate-100"} flex flex-wrap items-center gap-2.5`}>
                              <button
                                type="button"
                                onClick={() => {
                                  setArchiveSearchQuery("");
                                  setArchiveModalData({
                                    title: `${item.title} - Reports Archive`,
                                    subtitle: `Complete year-wise archive (${reports.length} documents)`,
                                    docs: reports,
                                  });
                                }}
                                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] bg-white hover:bg-[#002147] hover:text-white border border-slate-200/90 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer flex-1"
                              >
                                <FileText className="h-3.5 w-3.5 text-blue-600" />
                                <span>Yearly Reports ({reports.length})</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openGalleryModal(
                                    `${item.title} Photo Gallery`,
                                    `Photographs and activities of ${item.title}`,
                                    gallery
                                  )
                                }
                                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200/80 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer flex-1"
                              >
                                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                <span>Photo Gallery ({gallery.length})</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION C: Extension & Outreach                              */}
                {/* ============================================================ */}
                <section
                  id="sec-extension-outreach"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec3-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec3-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Flag className="h-6 w-6 text-emerald-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec3-title, var(--level2-title, #ffffff))" }}
                      >
                        C. Extension &amp; Outreach Initiatives
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec3-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Community service, social awareness, environmental sustainability and civic engagement.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {(portal?.extensionOutreach?.wings || STUDENT_SUPPORT_DATA.extensionOutreach.wings).map((item: any, idx: number) => {
                        const isAlt = idx % 2 === 1;
                        const staticWing = STUDENT_SUPPORT_DATA.extensionOutreach.wings.find((w: any) => w.slug === item.slug);
                        const reports = (item.reports && item.reports.length > 0) ? item.reports : (staticWing?.reports || []);
                        const gallery = (item.gallery && item.gallery.length > 0) ? item.gallery : (staticWing?.gallery || []);
                        return (
                          <div
                            key={idx}
                            id={item.id}
                            className={`scroll-mt-52 border-2 ${
                              isAlt ? "border-blue-200/90 bg-[#e8f1fd]" : "border-slate-200/90 bg-white"
                            } rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                                  Outreach Wing
                                </span>
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                                  Active Wing
                                </span>
                              </div>
                              <h4 className="font-outfit font-extrabold text-blue-700 text-base md:text-lg group-hover:text-blue-900 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-slate-600 text-xs mt-2 leading-relaxed font-medium text-justify">
                                {item.desc}
                              </p>
                            </div>

                            {/* Action Buttons for Each Outreach Wing */}
                            <div className={`pt-3.5 border-t ${isAlt ? "border-blue-200/70" : "border-slate-100"} flex flex-wrap items-center gap-2.5`}>
                              <button
                                type="button"
                                onClick={() => {
                                  setArchiveSearchQuery("");
                                  setArchiveModalData({
                                    title: `${item.title} - Reports Archive`,
                                    subtitle: `Complete year-wise archive (${reports.length} documents)`,
                                    docs: reports,
                                  });
                                }}
                                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] bg-white hover:bg-[#002147] hover:text-white border border-slate-200/90 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer flex-1"
                              >
                                <FileText className="h-3.5 w-3.5 text-blue-600" />
                                <span>Yearly Reports ({reports.length})</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openGalleryModal(
                                    `${item.title} Photo Gallery`,
                                    `Photographs and activities of ${item.title}`,
                                    gallery
                                  )
                                }
                                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200/80 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer flex-1"
                              >
                                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                <span>Photo Gallery ({gallery.length})</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION D: Workshops & Seminars                              */}
                {/* ============================================================ */}
                <section
                  id="sec-capacity-building"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec4-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec4-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-sky-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec4-title, var(--level2-title, #ffffff))" }}
                        >
                          D. Workshops &amp; Seminars
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Workshops, skill-development training programmes, seminars, and expert sessions.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openGalleryModal(
                          "Workshops & Seminars Photo Gallery",
                          "Hands-on workshops, seminars, technical bootcamps, and expert training sessions",
                          portal?.capacityBuilding?.gallery || STUDENT_SUPPORT_DATA.capacityBuilding.gallery
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      <span>View Photo Gallery</span>
                    </button>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <div
                      id="sec-workshops"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                    >
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        {portal?.capacityBuilding?.description ||
                          "The College organizes workshops, seminars, training programmes and expert sessions to enhance students' subject knowledge, practical skills, awareness and professional competencies. Programmes are conducted in collaboration with faculty, industry experts, professionals and subject specialists, wherever appropriate."}
                      </p>

                      {/* Documents Grid (Newest First) */}
                      {renderYearlyReportsSection(
                        "Workshops, Seminars & Skill Training Documentation",
                        portal?.capacityReports ||
                          portal?.capacityBuilding?.reports ||
                          STUDENT_SUPPORT_DATA.capacityBuilding.reports
                      )}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION E: Student Participation & Laurels                   */}
                {/* ============================================================ */}
                <section
                  id="sec-student-achievements"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec5-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec5-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <Award className="h-6 w-6 text-amber-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec5-title, var(--level2-title, #ffffff))" }}
                        >
                          E. Student Participation &amp; Laurels
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec5-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Recognition of excellence in academic, co-curricular, cultural, and sports competitions.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openGalleryModal(
                          "Student Laurels & University Ranks Gallery",
                          "Gold medalists, university rank holders, youth festivals and state/national awards",
                          portal?.studentAchievements?.gallery || STUDENT_SUPPORT_DATA.studentAchievements.gallery
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      <span>View Photo Gallery</span>
                    </button>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <div
                      id="sec-laurels"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                    >
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        {portal?.studentAchievements?.description ||
                          "St. Ann’s College for Women encourages students to actively participate in academic, co-curricular, extracurricular, sports, cultural, research, extension and community activities at various levels. The College provides opportunities for students to develop confidence, leadership, teamwork and professional competencies, while recognizing their achievements at University, State, National and other levels."}
                      </p>

                      {/* Documents Grid (Newest First) */}
                      {renderYearlyReportsSection(
                        "Student Laurels, University Ranks & Recognitions Archive",
                        portal?.laurelReports ||
                          portal?.studentAchievements?.reports ||
                          STUDENT_SUPPORT_DATA.studentAchievements.reports
                      )}
                    </div>
                  </div>
                </section>

              </div>
            </main>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIEW ALL / ARCHIVE MODAL POPUP
         ========================================================================= */}
      {archiveModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-[#f8fafc] border-2 border-slate-300/80 rounded-3xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div className="bg-[#002147] text-white px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between border-b border-[#001733] shrink-0">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white shadow-xs shrink-0 backdrop-blur-xs">
                  <Calendar className="h-5 w-5 text-amber-300" />
                </span>
                <div>
                  <h3 className="font-outfit font-black text-lg sm:text-xl tracking-tight text-white">
                    {archiveModalData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200/90 font-medium mt-0.5">
                    {archiveModalData.subtitle || "Complete historical archive and records"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setArchiveModalData(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:rotate-90 duration-200"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 sm:p-6 bg-white border-b border-slate-200 shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search archive documents by academic year or title..."
                  value={archiveSearchQuery}
                  onChange={(e) => setArchiveSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-medium transition-all"
                />
              </div>
            </div>

            {/* Modal Scrollable Document Grid */}
            <div className="p-4 sm:p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
              {filteredModalDocs.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <FileText className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">No documents found matching "{archiveSearchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredModalDocs.map((doc, idx) => {
                    const isAlt = idx % 2 === 1;
                    const fileUrl = doc.fileUrl && doc.fileUrl.trim() !== "" ? doc.fileUrl : DEFAULT_PDF;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl p-5 border-2 ${
                          isAlt ? "bg-[#e8f1fd] border-blue-200/90" : "bg-white border-slate-200/90"
                        } shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              isAlt ? "bg-white border border-blue-200/80 text-blue-700" : "bg-emerald-50 border border-emerald-100 text-emerald-700"
                            } font-bold`}
                          >
                            <Calendar className="h-5 w-5" />
                          </span>
                          <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              {doc.year && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                  {doc.year}
                                </span>
                              )}
                              {idx === 0 && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                                  Latest
                                </span>
                              )}
                            </div>
                            <h4
                              className={`font-outfit font-extrabold text-sm leading-snug ${
                                isAlt ? "text-blue-900" : "text-slate-900"
                              }`}
                            >
                              {doc.title}
                            </h4>
                            <p className="text-slate-500 text-[11px] font-semibold">
                              {doc.subtitle || "Official Report Document"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/80 mt-1">
                          <button
                            type="button"
                            onClick={() => openPdf(fileUrl, doc.title)}
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] bg-white hover:bg-[#002147] hover:text-white border border-slate-200/90 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View PDF</span>
                          </button>
                          <a
                            href={getCleanPdfUrl(fileUrl, doc.title, true)}
                            download
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline-block">
                Total Documents:{" "}
                <span className="text-[#002147] font-extrabold">{archiveModalData.docs.length}</span>
              </span>
            </div>

            {/* Modal Body / Table */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
              {(() => {
                const query = archiveSearchQuery.toLowerCase().trim();
                const filtered = archiveModalData.docs.filter(
                  (d) =>
                    !query ||
                    d.title.toLowerCase().includes(query) ||
                    (d.year && d.year.toLowerCase().includes(query)) ||
                    (d.subtitle && d.subtitle.toLowerCase().includes(query))
                );

                if (filtered.length === 0) {
                  return (
                    <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
                      <FileText className="h-12 w-12 text-slate-300" />
                      <p className="text-sm font-bold text-slate-700">
                        No documents matched your search term.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                          <th className="py-3 px-4">Academic Year</th>
                          <th className="py-3 px-4">Document / Report Title</th>
                          <th className="py-3 px-4 text-right">View / Download</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {filtered.map((doc, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200 font-extrabold">
                                {doc.year || "Annual"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                                {doc.title}
                              </p>
                              {doc.subtitle && (
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                  {doc.subtitle}
                                </p>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => openPdf(doc.fileUrl || DEFAULT_PDF, doc.title)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>Open PDF</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-500">
                St. Ann’s College for Women • Official Documentation
              </span>
              <button
                type="button"
                onClick={() => setArchiveModalData(null)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHOTO GALLERY MODAL POPUP (MULTI-YEAR TABS + LIGHTBOX)
         ========================================================================= */}
      {activeGalleryModal?.isOpen && (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActiveGalleryModal(null)}
        >
          <div
            className="bg-[#f8fafc] border-2 border-slate-300/80 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div className="bg-[#002147] text-white px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between border-b border-[#001733] shrink-0">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white shadow-xs shrink-0 backdrop-blur-xs">
                  <Sparkles className="h-5 w-5 text-amber-300" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 text-white px-2.5 py-0.5 rounded-md">
                      {galleryYearFilter === "all" ? "All Academic Years" : `AY ${galleryYearFilter}`}
                    </span>
                    <span className="text-[10px] font-bold text-white/80">
                      {currentModalPhotos.length} {currentModalPhotos.length === 1 ? "Photograph" : "Photographs"}
                    </span>
                  </div>
                  <h3 className="font-outfit font-black text-lg sm:text-xl tracking-tight text-white mt-0.5">
                    {activeGalleryModal.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveGalleryModal(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer hover:rotate-90 duration-200"
                title="Close Gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Subtitle & Year Filter Tabs Bar */}
            <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
              <p className="text-xs text-slate-600 font-medium truncate max-w-xl">
                {activeGalleryModal.subtitle || "Field activities, student initiatives, and event photographs."}
              </p>

              {/* Academic Year Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setGalleryYearFilter("all");
                    setGalleryLightboxIndex(null);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    galleryYearFilter === "all"
                      ? "bg-[#002147] text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  All Photos ({activeGalleryModal.photos.length})
                </button>

                {galleryAvailableYears.map((yr) => {
                  const countForYr = activeGalleryModal.photos.filter(
                    (p) => normalizeYear(p.year) === normalizeYear(yr) || (p.year && p.year.includes(yr))
                  ).length;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => {
                        setGalleryYearFilter(yr);
                        setGalleryLightboxIndex(null);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        galleryYearFilter === yr
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {yr} ({countForYr})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photos Grid */}
            <div className="p-4 sm:p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
              {currentModalPhotos.length === 0 ? (
                <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
                  <Sparkles className="h-12 w-12 text-slate-300" />
                  <p className="text-sm font-bold text-slate-700">
                    No photographs available for the selected filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentModalPhotos.map((photo, idx) => (
                    <div
                      key={photo.id || idx}
                      onClick={() => setGalleryLightboxIndex(idx)}
                      className="group relative cursor-pointer aspect-[4/3] bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col"
                    >
                      {/* Image */}
                      <img
                        src={photo.url}
                        alt={photo.caption || photo.title || `Photo ${idx + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e: any) => {
                          e.currentTarget.src = "/images/infrastructure/cultural-recreation/img-1.jpg";
                        }}
                      />

                      {/* Year Badge */}
                      {photo.year && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg border border-white/20 shadow-xs">
                            {photo.year}
                          </span>
                        </div>
                      )}

                      {/* Hover Info Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                        <h4 className="font-outfit font-bold text-sm leading-snug line-clamp-2 text-white group-hover:text-amber-300 transition-colors">
                          {photo.title || activeGalleryModal.title}
                        </h4>
                        {photo.caption && (
                          <p className="text-[11px] text-slate-300 font-medium line-clamp-2 mt-1">
                            {photo.caption}
                          </p>
                        )}
                        <span className="text-[10px] font-bold text-emerald-300 mt-1.5 flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Click to view full image
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-500">
                Showing {currentModalPhotos.length} of {activeGalleryModal.photos.length} photographs
              </span>
              <button
                type="button"
                onClick={() => setActiveGalleryModal(null)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULLSCREEN LIGHTBOX MODAL
         ========================================================================= */}
      {galleryLightboxIndex !== null && currentModalPhotos[galleryLightboxIndex] && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setGalleryLightboxIndex(null)}
        >
          {/* Top Bar with Title & Close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-xl backdrop-blur-xs">
                {galleryLightboxIndex + 1} / {currentModalPhotos.length}
              </span>
              {currentModalPhotos[galleryLightboxIndex].year && (
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-xl backdrop-blur-xs">
                  {currentModalPhotos[galleryLightboxIndex].year}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setGalleryLightboxIndex(null)}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:rotate-90 duration-200"
              title="Close Preview (Esc)"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Prev Button */}
          {currentModalPhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGalleryLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : currentModalPhotos.length - 1
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-20 backdrop-blur-xs"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronRight className="h-6 w-6 rotate-180" />
            </button>
          )}

          {/* Main Photo Center */}
          <div
            className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentModalPhotos[galleryLightboxIndex].url}
              alt={
                currentModalPhotos[galleryLightboxIndex].caption ||
                currentModalPhotos[galleryLightboxIndex].title ||
                "Photograph"
              }
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              onError={(e: any) => {
                e.currentTarget.src = "/images/infrastructure/cultural-recreation/img-1.jpg";
              }}
            />
            <div className="mt-4 text-center max-w-2xl">
              <h4 className="font-outfit font-black text-base sm:text-lg text-white">
                {currentModalPhotos[galleryLightboxIndex].title || activeGalleryModal?.title}
              </h4>
              {currentModalPhotos[galleryLightboxIndex].caption && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                  {currentModalPhotos[galleryLightboxIndex].caption}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Next Button */}
          {currentModalPhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGalleryLightboxIndex((prev) =>
                  prev !== null && prev < currentModalPhotos.length - 1 ? prev + 1 : 0
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-20 backdrop-blur-xs"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
