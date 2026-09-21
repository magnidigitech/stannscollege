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
    title: "D. Capacity Building & Skills",
    sectionId: "sec-capacity-building",
    items: [
      { text: "1. Workshops & Skill Seminars", id: "sec-workshops" },
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

interface StudentSupportClientPortalProps {
  activeSlug?: string;
  galleryImages?: Array<{ url: string; caption?: string }>;
  rankHolders?: any[];
  initialSections?: any[];
  studentSupportData?: any;
}

export default function StudentSupportClientPortal({
  activeSlug = "",
}: StudentSupportClientPortalProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-welfare-services");

  // State for View All Archive Modal
  const [archiveModalData, setArchiveModalData] = useState<{
    title: string;
    subtitle?: string;
    docs: SupportDocItem[];
  } | null>(null);
  const [archiveSearchQuery, setArchiveSearchQuery] = useState("");

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

  // Handle escape key for archive modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setArchiveModalData(null);
      }
    };
    if (archiveModalData) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [archiveModalData]);

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
                            <p className="text-xs text-slate-500 font-medium">Committed to a Safe, Respectful and Ragging-Free Campus</p>
                          </div>
                        </div>

                        <a
                          href="https://forms.gle/3Z2c1j7KxW9P4yVw9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Anti-Ragging Complaint Form</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Anti-Ragging Committee works towards maintaining a ragging-free campus and creating awareness among students about the prevention of ragging. The Committee undertakes preventive measures, sensitization programmes and appropriate action in accordance with applicable regulations.
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
                          {[
                            { title: "Anti-Ragging Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/1.Anti Ragging COmmittee.pdf" },
                            { title: "Anti-Ragging Policy & Framework", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/1.Anti Ragging Policy.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("Anti-Ragging Annual Reports & Documentation", [
                        { title: "Annual Report 2026–2027", subtitle: "Official Annual Report", year: "2026–2027", fileUrl: "/documents/student-support/Anti Ragging Report Final 2026-2027.pdf" },
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/Anti Ragging Report 2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/Anti Ragging Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.2 Grievance Redressal Cell */}
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
                            <p className="text-xs text-blue-600/80 font-medium">Fair, Confidential and Time-Bound Redressal</p>
                          </div>
                        </div>

                        <a
                          href="https://forms.gle/4N8p1k6LxW2Q9yVw8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Online Grievance Form</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Grievance Redressal Cell provides an accessible mechanism for students to submit grievances, complaints and suggestions related to academic, administrative and other student-support matters. Grievances are addressed in a fair, confidential and time-bound manner in accordance with institutional and regulatory provisions. The Ombudsperson mechanism is made available as per applicable university/regulatory guidelines.
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
                          {[
                            { title: "Grievance Redressal Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/3.Grievance Reddressal Committee.pdf" },
                            { title: "Grievance Redressal Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/3.Greaivance Reddrassal Policy.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("Grievance Redressal Annual Reports & Documentation", [
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/GRIEVANCE REDRESSAL  Report 2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/GRIEVANCE REDRESSAL Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.3 Internal Complaints Committee (ICC) */}
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
                            <p className="text-xs text-slate-500 font-medium">Prevention of Sexual Harassment &amp; Gender Dignity</p>
                          </div>
                        </div>

                        <a
                          href="https://forms.gle/9V7q2m8RxW4T1yVw7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>ICC Complaint Form</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Internal Complaints Committee promotes a safe and respectful campus environment and addresses complaints relating to sexual harassment in accordance with applicable statutory provisions. The Committee also undertakes awareness and sensitization programmes to promote dignity, equality and a culture of respect.
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
                          {[
                            { title: "ICC Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/4.ICC Committee.pdf" },
                            { title: "ICC & POSH Policy Guidelines", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/2.Internal Complaints Committee (ICC) & POSH Policy.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("ICC Annual Reports & Documentation", [
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/IIC  Report 2025-26.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/IIC Report  2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.4 Women Empowerment Cell */}
                    <div
                      id="sec-women-empowerment"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Sparkles className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            4. Women Empowerment Cell
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Confidence Building, Leadership &amp; Holistic Development</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Women Empowerment Cell works towards the empowerment, confidence-building and holistic development of women students. It organizes awareness programmes, capacity-building activities, counselling support and other initiatives that encourage leadership, self-reliance, safety and equal opportunities.
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
                          {[
                            { title: "Women Empowerment Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/Woment Empowerment COmmittee.pdf" },
                            { title: "Women Empowerment Cell Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/Woment Empowerment Cell Policy 2026.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("WEC Annual Reports & Documentation", [
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/WEC  Report 2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/WEC Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.5 Equal Opportunity / SC, ST & Minority Cell */}
                    <div
                      id="sec-equal-opportunity"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <Users className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            5. Equal Opportunity / SC, ST &amp; Minority Cell
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Inclusive Learning &amp; Social Welfare Facilitation</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Equal Opportunity, SC/ST &amp; Minority Cell promotes an inclusive and equitable learning environment. The Cell facilitates awareness of educational opportunities, scholarships, welfare schemes and institutional support available to eligible students, while encouraging equality, inclusion, dignity and non-discrimination.
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
                          {[
                            { title: "EOC SC/ST Minority Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/6.EOC SC ST Minority COmmittee.pdf" },
                            { title: "EOC SC/ST Minority Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/6.EOC SC ST Minority Policy.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("EOC Annual Reports & Action Plans", [
                        { title: "Action Plan & Report 2026–2027", subtitle: "Action Plan & Report", year: "2026–2027", fileUrl: "/documents/student-support/EOC Report Action Plan 2026-2027.pdf" },
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/EOC Report -2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/EOC Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.6 Student Counselling Cell */}
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
                            <p className="text-xs text-blue-600/80 font-medium">Emotional, Personal &amp; Academic Mental Well-being</p>
                          </div>
                        </div>

                        <a
                          href="https://forms.gle/5K1n3p7TxW9L2yVw6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Request Counselling</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Student Counselling Cell provides students with a supportive space to discuss academic, personal, emotional and career-related concerns. Through counselling and guidance, the Cell assists students in developing self-confidence, coping skills, positive decision-making and healthy interpersonal relationships.
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
                          {[
                            { title: "Student Counselling Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/9.Student Counselling COmmittee.pdf" },
                            { title: "Student Welfare & Wellness Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/9.Student Welfare,Counselling & Welness Polciy.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("Student Counselling Annual Reports & Documentation", [
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/Students COunselling Report 2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/Student COunse Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.7 Mentor–Mentee System */}
                    <div
                      id="sec-mentor-mentee"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <GraduationCap className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            7. Mentor–Mentee System
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Continuous Academic Monitoring, Guidance &amp; Personal Care</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Mentor–Mentee System provides continuous academic and personal guidance to students. Faculty mentors monitor students' academic progress, attendance, participation and overall development, identify areas requiring support and guide students towards appropriate academic, career and welfare resources.
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
                          {[
                            { title: "Mentor & Mentee Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/Mentor & Mentee Committee.pdf" },
                            { title: "Mentor & Mentee Guidelines", subtitle: "Institutional Guidelines", year: "Policy", fileUrl: "/documents/student-support/Mentor & Mentee Committee Guidelines.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Action Plans & Allocations (Newest First) */}
                      {renderYearlyReportsSection("Mentor–Mentee Action Plans & Allocation Reports", [
                        { title: "Action Plan 2026–2027", subtitle: "Official Action Plan", year: "2026–2027", fileUrl: "/documents/student-support/Mentor Mentee Action Plan 2026-2027.pdf" },
                        { title: "Activity Report 2025–2026", subtitle: "Annual Activity Report", year: "2025–2026", fileUrl: "/documents/student-support/Mentor-Mentee Activity Report 2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Annual Summary Report", year: "2024–2025", fileUrl: "/documents/student-support/Mentor-Mentee Annual  Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.8 Parent Association */}
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
                            <p className="text-xs text-blue-600/80 font-medium">Institutional Partnership &amp; Constructive Stakeholder Engagement</p>
                          </div>
                        </div>

                        <a
                          href="https://forms.gle/8X2m4q9VxW1M5yVw5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Parent Feedback Form</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Parent Association facilitates meaningful interaction and collaboration between parents, students and the institution. It provides a platform for communication, feedback and constructive engagement concerning students' academic progress, welfare and overall development, thereby strengthening the partnership between the College and parents.
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
                          {[
                            { title: "Parent Association Committee Order", subtitle: "Official Committee Order", year: "Order", fileUrl: "/documents/student-support/Parents Association COmmittee.pdf" },
                            { title: "Parent Association Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/Parents Association Policy.pdf" },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>

                      {/* 2. Year-wise Annual Reports (Newest First) */}
                      {renderYearlyReportsSection("Parent Association Annual Reports & Documentation", [
                        { title: "Annual Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: "/documents/student-support/Parents Assocaiton Committee Report 2025-2026.pdf" },
                        { title: "Annual Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: "/documents/student-support/Parents Associaiton COmmittee Report 2024-2025.pdf" },
                      ])}
                    </div>

                    {/* A.9 Student Welfare & Scholarships */}
                    <div
                      id="sec-scholarships-welfare"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <Award className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            9. Student Welfare &amp; Financial Support
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Government Scholarships, Freeships &amp; Financial Assistance</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women supports students through scholarships, financial assistance and welfare schemes to promote equitable access to education and student well-being.
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
                          {[
                            { title: "Scholarships, Freeships & Financial Assistance Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: "/documents/student-support/Scholarships,Freeships & Financial Assistance Polciy.pdf" },
                            { title: "Institutional Freeships & Fee Concessions Scheme", subtitle: "Scheme Guidelines", year: "Scheme", fileUrl: DEFAULT_PDF },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>
                    </div>

                    {/* A.10 Support for Divyangjan Students */}
                    <div
                      id="sec-divyangjan-support"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <HeartHandshake className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            10. Accessibility &amp; Support for Divyangjan Students
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Barrier-Free Access &amp; Assistive Educational Support</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The College promotes an inclusive and accessible learning environment by providing appropriate facilities and support for students with disabilities.
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
                          {[
                            { title: "Divyangjan Facilities & Support Policy", subtitle: "Institutional Policy", year: "Policy", fileUrl: DEFAULT_PDF },
                            { title: "Barrier-Free Access Audit & Report", subtitle: "Compliance Audit", year: "Audit", fileUrl: DEFAULT_PDF },
                          ].map((doc, idx) => renderDocCard(doc, idx, "core"))}
                        </div>
                      </div>
                    </div>

                    {/* A.11 Student Feedback & Satisfaction */}
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
                            <p className="text-xs text-slate-500 font-medium">Student Satisfaction Survey (SSS) &amp; Continuous Quality Improvement</p>
                          </div>
                        </div>

                        <a
                          href="https://forms.gle/n6QfA4roPrqtPWjM8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Submit Student Feedback / SSS</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The College collects student feedback and satisfaction responses to identify areas for improvement and strengthen the quality of academic and support services.
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
                      {renderYearlyReportsSection("Student Satisfaction Survey (SSS) & Feedback Reports", [
                        { title: "Student Satisfaction Survey (SSS) Report 2025–2026", subtitle: "Official SSS Analysis", year: "2025–2026", fileUrl: DEFAULT_PDF },
                        { title: "Student Satisfaction Survey (SSS) Report 2024–2025", subtitle: "Official SSS Analysis", year: "2024–2025", fileUrl: DEFAULT_PDF },
                      ])}
                    </div>

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "sec-sports-facilities", title: "1. Sports & Games Facilities", desc: "The College provides appropriate indoor and outdoor sports facilities, playing areas, equipment and physical education resources to encourage regular participation and fitness." },
                        { id: "sec-sports-intramural", title: "2. Intramural Sports", desc: "Students participate in inter-class and inter-department competitions, annual sports meets, individual and team events, and recreational games, fostering healthy competition and team spirit." },
                        { id: "sec-sports-intercollegiate", title: "3. Inter-Collegiate Competitions", desc: "Students are encouraged to participate in inter-collegiate tournaments, university competitions, friendly matches and individual and team events, providing opportunities to develop competitive skills." },
                        { id: "sec-sports-national", title: "4. University / State / National Level", desc: "The College encourages talented students to participate in university, state and national-level competitions, championships and selection trials." },
                        { id: "sec-sports-selfdefense", title: "5. Self-Defense & Personal Safety Training", desc: "Self-defense programmes are organized to develop personal safety awareness, confidence, physical preparedness and basic self-protection skills, particularly among women students." },
                        { id: "sec-sports-fitness", title: "6. Fitness & Wellness", desc: "The College promotes physical fitness, yoga, wellness and regular physical activity as integral components of students' health and holistic development." },
                        { id: "sec-sports-coaching", title: "7. Sports Coaching & Training", desc: "Students are supported through coaching, practice sessions, training camps and skill-development activities, with emphasis on sportsmanship, teamwork, discipline and leadership." },
                        { id: "sec-sports-achievements", title: "8. Sports Achievements", desc: "The achievements of students and teams in sports competitions at university, state and national levels are recognized and showcased." },
                        { id: "sec-sports-events", title: "9. Sports Events & Activities", desc: "The College conducts Annual Sports Meets, special sporting events, fitness activities and National Sports Day programmes to encourage active participation and healthy living." },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          id={item.id}
                          className={`scroll-mt-52 border-2 ${
                            idx % 2 === 1 ? "border-blue-200/90 bg-[#e8f1fd]" : "border-slate-200/90 bg-white"
                          } rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3`}
                        >
                          <div>
                            <h4 className="font-outfit font-extrabold text-blue-700 text-sm md:text-base">
                              {item.title}
                            </h4>
                            <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                          <div className={`pt-2 border-t ${idx % 2 === 1 ? "border-blue-200/60" : "border-slate-100"} flex items-center justify-between text-[11px] text-slate-500 font-semibold`}>
                            <span>Physical Fitness</span>
                            <span className="text-emerald-700 font-bold">Active Campus</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sports Strategic Document Cards (Newest First) */}
                    {renderYearlyReportsSection("Year-wise Sports Activity Reports", [
                      { title: "Annual Sports Activity Report 2026–2027", subtitle: "Official Annual Report", year: "2026–2027", fileUrl: DEFAULT_PDF },
                      { title: "Annual Sports Activity Report 2025–2026", subtitle: "Official Annual Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                      { title: "Annual Sports Activity Report 2024–2025", subtitle: "Official Annual Report", year: "2024–2025", fileUrl: DEFAULT_PDF },
                    ])}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "sec-nss", title: "1. National Service Scheme (NSS)", desc: "The NSS encourages students to engage in community service, social awareness, health and hygiene, environmental protection and civic responsibility through regular activities and special outreach programmes." },
                        { id: "sec-ncc", title: "2. National Cadet Corps (NCC)", desc: "The NCC develops discipline, leadership, teamwork, patriotism and a spirit of service among students through training, camps, drills and community-oriented activities." },
                        { id: "sec-rrc", title: "3. Red Ribbon Club (RRC)", desc: "The Red Ribbon Club promotes awareness on HIV/AIDS prevention, health, hygiene, responsible behaviour and healthy lifestyles through awareness programmes and student-led activities." },
                        { id: "sec-mother-gnanamma", title: "4. Mother Gnanamma Outreach Committee", desc: "The Mother Gnanamma Outreach Committee promotes the values of service, compassion and social responsibility through community-oriented initiatives and outreach programmes for the welfare of society." },
                        { id: "sec-eco-club", title: "5. Eco Club & Environmental Initiatives", desc: "The College promotes environmental sustainability and ecological responsibility through plantation drives, cleanliness campaigns, waste management, conservation activities and environmental awareness programmes." },
                        { id: "sec-uba", title: "6. Community Outreach – Unnat Bharat Abhiyan", desc: "St. Ann’s College for Women promotes community engagement and rural development through Unnat Bharat Abhiyan (UBA). The initiative encourages students and faculty to work with local communities through activities focused on education, health, sanitation, environmental awareness, digital literacy and social development." },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          id={item.id}
                          className={`scroll-mt-52 border-2 ${
                            idx % 2 === 1 ? "border-blue-200/90 bg-[#e8f1fd]" : "border-slate-200/90 bg-white"
                          } rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                                Outreach Wing
                              </span>
                              <span className="text-xs text-slate-400 font-medium">Active Cell</span>
                            </div>
                            <h4 className="font-outfit font-extrabold text-blue-700 text-sm md:text-base group-hover:text-blue-900 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Outreach Strategic Document Cards (Newest First) */}
                    {renderYearlyReportsSection("Extension & Outreach Annual Reports", [
                      { title: "NSS Activities & Community Camps Report", subtitle: "NSS Wing Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                      { title: "NCC Annual Training & Drills Report", subtitle: "NCC Unit Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                      { title: "Red Ribbon Club (RRC) Awareness Report", subtitle: "RRC Unit Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                      { title: "Mother Gnanamma Outreach Welfare Report", subtitle: "Outreach Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                      { title: "Eco Club Environmental & Plantation Report", subtitle: "Eco Club Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                      { title: "Unnat Bharat Abhiyan (UBA) Rural Report", subtitle: "UBA Unit Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                    ])}
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION D: Capacity Building & Skill Enhancement             */}
                {/* ============================================================ */}
                <section
                  id="sec-capacity-building"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec4-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec4-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="h-6 w-6 text-sky-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec4-title, var(--level2-title, #ffffff))" }}
                      >
                        D. Capacity Building &amp; Skill Enhancement
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Workshops, skill-development training programmes, and experiential learning.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <div
                      id="sec-workshops"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <BookOpen className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            1. Workshops &amp; Seminars
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Subject Knowledge, Practical Skills &amp; Professional Competencies</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The College organizes workshops, seminars, training programmes and expert sessions to enhance students' subject knowledge, practical skills, awareness and professional competencies. Programmes are conducted in collaboration with faculty, industry experts, professionals and subject specialists, wherever appropriate.
                      </p>

                      {/* Documents Grid (Newest First) */}
                      {renderYearlyReportsSection("Workshops, Seminars & Skill Training Documentation", [
                        { title: "Workshops & Seminars Schedule 2026–2027", subtitle: "Official Schedule", year: "2026–2027", fileUrl: "/documents/student-support/Mentor Mentee Action Plan 2026-2027.pdf" },
                        { title: "Skill Enhancement & Training Report 2025–2026", subtitle: "Annual Training Summary", year: "2025–2026", fileUrl: DEFAULT_PDF },
                        { title: "Capacity Building Annual Summary 2024–2025", subtitle: "Annual Training Summary", year: "2024–2025", fileUrl: DEFAULT_PDF },
                      ])}
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
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec5-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec5-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
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

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <div
                      id="sec-laurels"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
                          <Trophy className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            1. Student Participation &amp; Laurels
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">University Ranks, State &amp; National Level Recognitions</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women encourages students to actively participate in academic, co-curricular, extracurricular, sports, cultural, research, extension and community activities at various levels. The College provides opportunities for students to develop confidence, leadership, teamwork and professional competencies, while recognizing their achievements at University, State, National and other levels.
                      </p>

                      {/* Documents Grid (Newest First) */}
                      {renderYearlyReportsSection("Student Laurels, University Ranks & Recognitions Archive", [
                        { title: "Student Laurels & University Ranks 2025–2026", subtitle: "Annual Laurels Record", year: "2025–2026", fileUrl: DEFAULT_PDF },
                        { title: "Student Laurels & Achievements 2024–2025", subtitle: "Annual Laurels Record", year: "2024–2025", fileUrl: DEFAULT_PDF },
                      ])}
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
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-500">
                Showing {filteredModalDocs.length} of {archiveModalData.docs.length} documents
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
    </div>
  );
}
