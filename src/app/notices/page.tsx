"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  FileText,
  Download,
  ExternalLink,
  Search,
  ChevronRight,
  Filter,
  Calendar,
  Sparkles,
  ArrowRight,
  Mail,
  Image as ImageIcon,
  Eye,
  X,
  Info,
} from "lucide-react";
import { getNotices } from "@/lib/sanity";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

// Client-approved Starburst NEW badge matching the official circulars / events layout
const StarburstNewBadge = () => (
  <span className="relative inline-flex items-center justify-center shrink-0 w-7 h-7 sm:w-8 sm:h-8 select-none my-0.5 animate-pulse drop-shadow-xs">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.22)]">
      <polygon
        points="50,0 61,24 85,15 79,40 100,50 79,60 85,85 61,76 50,100 39,76 15,85 21,60 0,50 21,40 15,15 39,24"
        fill="#FFE600"
        stroke="#EAB308"
        strokeWidth="3.5"
      />
    </svg>
    <span className="absolute font-black text-[9px] sm:text-[10px] text-[#DC2626] tracking-tighter leading-none font-sans scale-95">
      NEW
    </span>
  </span>
);

function isNoticeNew(dateStr?: string, newUntil?: string, isNewFlag?: boolean): boolean {
  if (isNewFlag === false) return false;

  const now = Date.now();

  // 1. If explicit "newUntil" expiry date is specified
  if (newUntil && typeof newUntil === "string" && newUntil.trim() !== "") {
    const val = newUntil.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [year, month, day] = val.split("-").map(Number);
      const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999).getTime();
      return now <= endOfDay;
    }
    const t = Date.parse(val);
    if (!isNaN(t)) {
      const d = new Date(t);
      d.setHours(23, 59, 59, 999);
      return now <= d.getTime();
    }
  }

  // 2. Fallback: 2-week active window from published date
  if (!dateStr) return false;

  let noticeTime = Date.parse(dateStr);
  if (isNaN(noticeTime)) {
    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1").trim();
    noticeTime = Date.parse(cleaned);
  }

  if (isNaN(noticeTime)) {
    const parts = dateStr.match(/(\d{1,2})[-/ ]([A-Za-z]+|\d{1,2})[-/ ](\d{4})/);
    if (parts) {
      noticeTime = Date.parse(`${parts[2]} ${parts[1]}, ${parts[3]}`);
    }
  }

  if (isNaN(noticeTime)) return false;

  const diffMs = now - noticeTime;
  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;

  return diffMs <= twoWeeksMs && diffMs >= -twoWeeksMs;
}

// Helper: Parse date strings or timestamps into numeric milliseconds for sorting (latest first)
function parseNoticeDateToTimestamp(dateStr?: string, createdAt?: string): number {
  if (dateStr) {
    let t = Date.parse(dateStr);
    if (!isNaN(t)) return t;

    // Clean ordinal suffixes (e.g. "20th September 2026" -> "20 September 2026")
    const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1").trim();
    t = Date.parse(cleaned);
    if (!isNaN(t)) return t;

    const months: Record<string, number> = {
      jan: 0, january: 0,
      feb: 1, february: 1,
      mar: 2, march: 2,
      apr: 3, april: 3,
      may: 4,
      jun: 5, june: 5,
      jul: 6, july: 6,
      aug: 7, august: 7,
      sep: 8, sept: 8, september: 8,
      oct: 9, october: 9,
      nov: 10, november: 10,
      dec: 11, december: 11,
    };
    const parts = cleaned.match(/(\d{1,2})[-/ ]([A-Za-z]+|\d{1,2})[-/ ](\d{4})/);
    if (parts) {
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[3], 10);
      const monthPart = parts[2].toLowerCase();
      if (months[monthPart] !== undefined) {
        return new Date(year, months[monthPart], day).getTime();
      } else {
        const month = parseInt(parts[2], 10) - 1;
        return new Date(year, month, day).getTime();
      }
    }
  }
  if (createdAt) {
    const ct = Date.parse(createdAt);
    if (!isNaN(ct)) return ct;
  }
  return 0;
}

// Official Notices (Extracted from NOTICES (1).docx)
const fallbackNoticesHistory = [
  {
    _id: "notice-ug-phase1-allotment-sep-2026",
    title: "UG I Year – Phase I Seat Allotment",
    date: "7 September 2026",
    category: "admissions",
    description:
      "UG I Year Phase I Seat Allotment was released by the concerned Higher Education authorities. Students allotted seats at St. Ann’s College for Women are advised to complete the prescribed admission and registration formalities within the notified schedule.",
    linkUrl: "https://cap.apcfss.in",
    linkLabel: "APCFSS Portal (https://cap.apcfss.in)",
    links: [
      {
        title: "APCFSS Portal (https://cap.apcfss.in)",
        url: "https://cap.apcfss.in",
      },
    ],
  },
  {
    _id: "notice-mca-mba-seat-allotment-sep-2026",
    title: "MCA & MBA – Seat Allotment",
    date: "9 September 2026",
    category: "admissions",
    description:
      "MCA & MBA seat allotment was released through AP ICET Admissions. Candidates allotted seats at St. Ann’s College for Women, Gorantla, Guntur (College Code: AANG) are advised to complete the required admission formalities.",
    linkUrl: "https://cets.apsche.ap.gov.in",
    linkLabel: "AP ICET Admissions Portal",
    links: [
      {
        title: "AP ICET Admissions Portal",
        url: "https://cets.apsche.ap.gov.in",
      },
    ],
  },
  {
    _id: "notice-commencement-mca-mba-classes-sep-2026",
    title: "Commencement of MCA & MBA Classes",
    date: "16 September 2026",
    category: "academic",
    description:
      "Classes for MCA & MBA First Year – Batch Y27 will commence from 16 September 2026. Students are requested to report to the College on time and attend classes regularly.",
  },
  {
    _id: "notice-nypunyam-portal-registration-sep-2026",
    title: "UG & PG Student Registration – Nypunyam Portal",
    date: "11 September 2026",
    category: "academic",
    description:
      "All UG & PG students are required to complete their Nypunyam Portal registration and resume-related formalities on or before 20 September 2026, as per the instructions issued by Commissioner of Higher Education (CHE), Acharya Nagarjuna University (ANU), APSSDC and other concerned authorities.\n\nStudents who complete the registration process are required to complete/update their Resume Templates in the Nypunyam Portal as per the prescribed instructions.\n\n📌 Registration & Resume Completion Deadline: 20 September 2026\n\nStudents are advised to regularly check the College Website and Official Notices for further instructions and updates.",
    linkUrl: "https://nypunyam.apssdc.in",
    linkLabel: "Nypunyam Portal (APSSDC)",
    links: [
      {
        title: "Nypunyam Portal (APSSDC)",
        url: "https://nypunyam.apssdc.in",
      },
    ],
  },
];

const categories = [
  { label: "All Notices", value: "all" },
  { label: "Examinations & Timetables", value: "examinations" },
  { label: "Academic", value: "academic" },
  { label: "Admissions", value: "admissions" },
  { label: "Student Welfare", value: "student-support" },
  { label: "General Circulars", value: "general" },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>(fallbackNoticesHistory);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewModalFile, setPreviewModalFile] = useState<{ url: string; title: string } | null>(null);

  // Active Notice Details Modal
  const [activeNoticeModal, setActiveNoticeModal] = useState<{
    title: string;
    date?: string;
    category?: string;
    description?: string;
    imageUrl?: string;
    newUntil?: string;
    isNew?: boolean;
    links?: { title: string; url: string }[];
    documents?: { title: string; url: string; originalFilename?: string; fileType?: "pdf" | "image" }[];
  } | null>(null);

  // Handler for clicking notice details: Opens the notice popup modal with full details, links, flyer and documents
  const handleNoticeClick = (item: any) => {
    const links: { title: string; url: string }[] = [];
    if (item.linkUrl) {
      links.push({
        title: item.linkLabel || item.linkUrl,
        url: item.linkUrl,
      });
    }
    if (Array.isArray(item.links)) {
      item.links.forEach((l: any) => {
        if (l?.url && !links.some((existing) => existing.url === l.url)) {
          links.push({
            title: l.title || l.url,
            url: l.url,
          });
        }
      });
    }

    const documents: { title: string; url: string; originalFilename?: string; fileType?: "pdf" | "image" }[] = [];
    if (item.pdfUrl || item.fileUrl) {
      documents.push({
        title: item.pdfTitle || "Official Circular (PDF)",
        url: item.pdfUrl || item.fileUrl,
        originalFilename: "Official_Circular.pdf",
        fileType: "pdf",
      });
    }
    if (Array.isArray(item.documents)) {
      item.documents.forEach((d: any) => {
        if (d?.url && !documents.some((existing) => existing.url === d.url)) {
          const isImg =
            d.fileType === "image" ||
            d.mimeType?.startsWith("image/") ||
            /\.(jpe?g|png|webp|gif|svg)$/i.test(d.url || d.originalFilename || "");
          documents.push({
            title: d.title || d.originalFilename || (isImg ? "Attached Notice Image" : "Notice Document"),
            url: d.url,
            originalFilename: d.originalFilename,
            fileType: isImg ? "image" : "pdf",
          });
        }
      });
    }

    setActiveNoticeModal({
      title: item.title,
      date: item.date,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      newUntil: item.newUntil,
      isNew: item.isNew,
      links,
      documents,
    });
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getNotices();
        if (data && data.length > 0) {
          setNotices(data);
        } else {
          // If no notices in Sanity yet, use fallback history
          setNotices(fallbackNoticesHistory);
        }
      } catch (e) {
        setNotices(fallbackNoticesHistory);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredNotices = notices
    .filter((n) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.description && n.description.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "all" ||
        (n.category && n.category.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const isNewA = isNoticeNew(a.date, a.newUntil, a.isNew);
      const isNewB = isNoticeNew(b.date, b.newUntil, b.isNew);

      // 1. Primary: NEW notices at the top
      if (isNewA && !isNewB) return -1;
      if (!isNewA && isNewB) return 1;

      // 2. Secondary: latest dates first
      const timeA = parseNoticeDateToTimestamp(a.date, a._createdAt);
      const timeB = parseNoticeDateToTimestamp(b.date, b._createdAt);
      return timeB - timeA;
    });

  return (
    <div className="w-full bg-slate-50/50 min-h-screen selection:bg-[#002147]/10 selection:text-[#002147]">
      {/* ── Page Hero Banner ── */}
      <section className="relative bg-gradient-to-r from-[#001730] via-[#002147] to-[#0d3b66] text-white py-14 sm:py-18 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-sky-200/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Notices &amp; Circulars</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 uppercase tracking-widest mb-3">
              <Bell className="h-3.5 w-3.5 text-rose-300" />
              Official College Circulars
            </span>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Notices &amp; Circulars
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-200/90 mt-3 leading-relaxed">
              Official institutional notifications, university examination schedules, timetable releases, circulars, and academic announcements for students and faculty.
            </p>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notices, timetables, circulars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.value
                      ? "bg-[#002147] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notices History List */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 border-4 border-[#002147] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading notices &amp; circulars...</p>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
              <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-outfit text-lg font-bold text-slate-800">No notices found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search query or category filter.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {filteredNotices.map((n, idx) => {
                const isNew = isNoticeNew(n.date, n.newUntil, n.isNew);
                const isFirstStandard =
                  idx > 0 &&
                  !isNew &&
                  isNoticeNew(filteredNotices[idx - 1].date, filteredNotices[idx - 1].newUntil, filteredNotices[idx - 1].isNew);

                return (
                <React.Fragment key={n._id || idx}>
                  {isFirstStandard && (
                    <div className="px-5 py-2.5 bg-slate-100/90 border-y border-slate-200/80 flex items-center justify-between select-none">
                      <span className="font-outfit text-xs font-black text-slate-700 tracking-wider uppercase">
                        Earlier Circulars &amp; Notices
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
                        General Archive
                      </span>
                    </div>
                  )}
                  <div
                    className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Icon or New Badge: active until newUntil date or 2-week window */}
                    <div className="shrink-0 mt-0.5">
                      {isNew ? (
                        <span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10.5px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                          <span className="absolute -inset-0.5 rounded-md bg-rose-400/50 blur-xs animate-ping pointer-events-none" />
                          <span className="relative w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span className="relative">NEW</span>
                        </span>
                      ) : (
                        <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#002147] transition-colors">
                          <Mail className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {n.category && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 uppercase tracking-wider">
                            {n.category.replace(/-/g, " ")}
                          </span>
                        )}
                        {n.date && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <Calendar className="h-3 w-3 text-rose-600" />
                            {n.date}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <h2
                          onClick={() => handleNoticeClick(n)}
                          className={`font-outfit text-sm sm:text-base leading-snug transition-colors cursor-pointer inline ${
                            isNew
                              ? "font-bold text-[#002147] animate-[pulse_2.5s_ease-in-out_infinite] hover:text-rose-600"
                              : "font-bold text-slate-800 hover:text-[#002147]"
                          }`}
                        >
                          {n.title}
                        </h2>
                        <button
                          type="button"
                          onClick={() => handleNoticeClick(n)}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold bg-rose-50 hover:bg-[#002147] text-rose-800 hover:text-white border border-rose-200 hover:border-[#002147] transition-all duration-200 shadow-2xs cursor-pointer align-baseline group/btn select-none"
                          title="Click for more"
                        >
                          <FileText className="h-3 w-3 shrink-0 text-rose-600 group-hover/btn:text-white transition-colors" />
                          <span>Click for more</span>
                        </button>
                      </div>

                      {n.description && (
                        <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                          {n.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action: Web Links, Poster Flyer, or Documents */}
                  <div className="shrink-0 flex flex-wrap items-center gap-2">
                    {/* Click for More Details Button */}
                    <button
                      type="button"
                      onClick={() => handleNoticeClick(n)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-[#002147] border border-rose-200 hover:border-[#002147] text-rose-800 hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer group/more"
                      title="View full notice details, documents & links"
                    >
                      <FileText className="h-3.5 w-3.5 text-rose-600 group-hover/more:text-white transition-colors" />
                      <span>Click for more</span>
                    </button>

                    {/* Notice Poster / Flyer (Option C) */}
                    {n.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewModalFile({
                            title: `${n.title} - Poster`,
                            url: n.imageUrl,
                          })
                        }
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 border border-emerald-200 text-emerald-800 hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer group/poster"
                      >
                        <ImageIcon className="h-3.5 w-3.5 text-emerald-600 group-hover/poster:text-white transition-colors" />
                        <span>View Poster</span>
                        <Eye className="h-3.5 w-3.5 text-emerald-600 group-hover/poster:text-white transition-colors" />
                      </button>
                    )}

                    {/* Render all links if array exists, else single fallback */}
                    {Array.isArray(n.links) && n.links.length > 0 ? (
                      n.links.map((link: any, lIdx: number) => (
                        <a
                          key={link._key || lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-[#002147] border border-sky-200 hover:border-[#002147] text-[#002147] hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 group/btn"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-sky-600 group-hover/btn:text-white transition-colors" />
                          <span>{link.title || "Visit Portal"}</span>
                        </a>
                      ))
                    ) : n.linkUrl ? (
                      <a
                        href={n.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-[#002147] border border-sky-200 hover:border-[#002147] text-[#002147] hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 group/btn"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-sky-600 group-hover/btn:text-white transition-colors" />
                        <span>{n.linkLabel || "Visit Portal"}</span>
                      </a>
                    ) : null}

                    {/* Render all documents (PDFs & Images) */}
                    {Array.isArray(n.documents) && n.documents.length > 0 ? (
                      n.documents.map((doc: any, dIdx: number) => {
                        const isDocImg =
                          doc.fileType === "image" ||
                          doc.mimeType?.startsWith("image/") ||
                          /\.(jpe?g|png|webp|gif|svg)$/i.test(doc.url || doc.originalFilename || "");
                        return (
                          <div key={doc._key || dIdx} className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewModalFile({
                                  title: doc.title || (isDocImg ? "Notice Image" : "Official Circular"),
                                  url: doc.url,
                                })
                              }
                              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer group/btn ${
                                isDocImg
                                  ? "bg-emerald-50 hover:bg-emerald-600 border-emerald-200 text-emerald-800 hover:text-white"
                                  : "bg-rose-50 hover:bg-[#002147] border-rose-200 hover:border-[#002147] text-rose-800 hover:text-white"
                              }`}
                            >
                              {isDocImg ? (
                                <ImageIcon className="h-3.5 w-3.5 text-emerald-600 group-hover/btn:text-white transition-colors" />
                              ) : (
                                <FileText className="h-3.5 w-3.5 text-rose-600 group-hover/btn:text-white transition-colors" />
                              )}
                              <span>{doc.title || (isDocImg ? "View Image" : "View Circular")}</span>
                              <Eye className="h-3.5 w-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                            <a
                              href={doc.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shadow-2xs"
                              title="Download Attachment"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        );
                      })
                    ) : (n.pdfUrl || n.fileUrl) ? (
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewModalFile({
                              title: n.title || "Official Circular",
                              url: n.pdfUrl || n.fileUrl,
                            })
                          }
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-[#002147] border border-rose-200 hover:border-[#002147] text-rose-800 hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer group/btn"
                        >
                          <FileText className="h-3.5 w-3.5 text-rose-600 group-hover/btn:text-white transition-colors" />
                          <span>View Circular</span>
                          <Eye className="h-3.5 w-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                        </button>
                        <a
                          href={n.pdfUrl || n.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 shadow-2xs"
                          title="Download Circular"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
                </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── NOTICE DETAILS & DOCUMENTS POPUP MODAL ── */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveNoticeModal(null)}
          />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                  <Bell className="h-3.5 w-3.5 text-rose-300" />
                </div>
                <div>
                  <h3 className="font-outfit text-sm sm:text-base font-bold leading-tight">
                    Notice Details &amp; Circular
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-sky-200/80 leading-tight">
                    St. Ann&apos;s College for Women • Official Notice Board
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10 shrink-0"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50/50">
              {/* Notice Info Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
                {/* 1. Notice Title */}
                <h4 className="font-outfit text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeNoticeModal.title}
                </h4>

                {/* 2. Tags: Date, Category, NEW badge */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  {isNoticeNew(activeNoticeModal.date, activeNoticeModal.newUntil, activeNoticeModal.isNew) && <StarburstNewBadge />}
                  {activeNoticeModal.date && (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                      <Calendar className="h-3.5 w-3.5 text-rose-600" />
                      {activeNoticeModal.date}
                    </span>
                  )}
                  {activeNoticeModal.category && (
                    <span className="inline-flex items-center gap-1 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider text-[10px]">
                      {activeNoticeModal.category.replace(/-/g, " ")}
                    </span>
                  )}
                </div>

                {/* 3. Description / Notice Content */}
                {activeNoticeModal.description && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      <Info className="h-3 w-3 text-indigo-500" />
                      <span>Official Notice Announcement</span>
                    </div>
                    <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/70 border-l-4 border-l-[#002147] text-xs sm:text-[13px] text-slate-700 leading-relaxed shadow-2xs whitespace-pre-line">
                      {activeNoticeModal.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Notice Poster / Circular Flyer (Option C) */}
              {activeNoticeModal.imageUrl && (
                <div className="bg-white rounded-2xl p-4 border border-emerald-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-900">
                      <ImageIcon className="h-4 w-4 text-emerald-600" />
                      <span>Official Notice Poster / Circular Flyer</span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewModalFile({
                          title: `${activeNoticeModal.title} - Poster`,
                          url: activeNoticeModal.imageUrl!,
                        })
                      }
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Enlarge Poster</span>
                    </button>
                  </div>
                  <div
                    onClick={() =>
                      setPreviewModalFile({
                        title: `${activeNoticeModal.title} - Poster`,
                        url: activeNoticeModal.imageUrl!,
                      })
                    }
                    className="relative rounded-xl overflow-hidden border border-emerald-200 bg-slate-900/5 hover:bg-slate-900/10 transition-all cursor-pointer group/poster flex items-center justify-center max-h-96"
                  >
                    <img
                      src={activeNoticeModal.imageUrl}
                      alt={activeNoticeModal.title}
                      className="w-full h-auto max-h-96 object-contain group-hover:scale-[1.01] transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-[1px]">
                      <Eye className="h-4 w-4" />
                      <span>Click to Zoom &amp; Pan Poster</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECTION FOR LINKS ── */}
              {activeNoticeModal.links && activeNoticeModal.links.length > 0 && (
                <div>
                  <h5 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5 text-sky-600" />
                      <span>Official Links &amp; Portals ({activeNoticeModal.links.length})</span>
                    </span>
                    <span className="text-[10px] font-bold text-sky-600 lowercase tracking-normal">
                      Click to visit portal
                    </span>
                  </h5>

                  <div className="space-y-2">
                    {activeNoticeModal.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all group/link cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 group-hover/link:bg-sky-100 transition-colors">
                            <ExternalLink className="h-5 w-5 text-sky-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/link:text-[#002147] truncate">
                              {link.title || link.url}
                            </p>
                            <p className="text-[11px] text-sky-600 underline font-mono truncate">
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] group-hover/link:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors">
                          <span>Open Link</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECTION FOR DOCUMENTS & PDFS ── */}
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-rose-600" />
                    <span>Attached Documents &amp; Circulars ({activeNoticeModal.documents?.length || 0})</span>
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 lowercase tracking-normal">
                    Click to view / download
                  </span>
                </h5>

                {activeNoticeModal.documents && activeNoticeModal.documents.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeNoticeModal.documents.map((doc, idx) => {
                      const isDocImg = doc.fileType === "image" || /\.(jpe?g|png|webp|gif|svg)$/i.test(doc.url || doc.originalFilename || "");
                      return (
                        <div
                          key={idx}
                          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-rose-50/40 border border-slate-200 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all group/doc"
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-3">
                            <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                              isDocImg ? "bg-emerald-50 border-emerald-100 group-hover/doc:bg-emerald-100" : "bg-rose-50 border-rose-100 group-hover/doc:bg-rose-100"
                            }`}>
                              {isDocImg ? (
                                <ImageIcon className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <FileText className="h-5 w-5 text-rose-600" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/doc:text-[#002147] truncate">
                                {doc.title || `Document ${idx + 1}`}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                {doc.originalFilename || (isDocImg ? "Click to view image attachment" : "Click to view PDF document")}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewModalFile({
                                  title: doc.title || (isDocImg ? "Notice Image" : "Notice Document PDF"),
                                  url: doc.url,
                                })
                              }
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white font-bold text-xs shadow-xs transition-colors cursor-pointer ${
                                isDocImg ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-[#002147]"
                              }`}
                            >
                              <span>{isDocImg ? "View Image" : "View PDF"}</span>
                              {isDocImg ? <ImageIcon className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                            </button>
                            <a
                              href={doc.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                              title="Download Attachment"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center">
                    <FileText className="h-9 w-9 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-700">Digital Announcement</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
                      Official circular published online. No downloadable PDF attachment required.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-app Document & Image Preview Modal */}
      <FilePreviewModal
        isOpen={!!previewModalFile}
        onClose={() => setPreviewModalFile(null)}
        fileUrl={previewModalFile?.url || ""}
        title={previewModalFile?.title || "Document Preview"}
      />
    </div>
  );
}
