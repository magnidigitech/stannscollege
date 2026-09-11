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
} from "lucide-react";
import { getNotices } from "@/lib/sanity";

function isNoticeNew(dateStr?: string): boolean {
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

  const now = Date.now();
  const diffMs = now - noticeTime;
  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;

  return diffMs <= twoWeeksMs && diffMs >= -twoWeeksMs;
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

  const filteredNotices = notices.filter((n) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.description && n.description.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "all" ||
      (n.category && n.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
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
              {filteredNotices.map((n, idx) => (
                <div
                  key={n._id || idx}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Icon or New Badge: strictly for 2 weeks from date of publishing */}
                    <div className="shrink-0 mt-0.5">
                      {isNoticeNew(n.date) ? (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          NEW
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

                      <h2 className="font-outfit text-sm sm:text-base font-bold text-slate-800 group-hover:text-[#002147] transition-colors leading-snug">
                        {n.title}
                      </h2>

                      {n.description && (
                        <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                          {n.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action: Web Links or Download PDF */}
                  <div className="shrink-0 flex flex-wrap items-center gap-2">
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

                    {/* Render all documents if array exists, else single fallback */}
                    {Array.isArray(n.documents) && n.documents.length > 0 ? (
                      n.documents.map((doc: any, dIdx: number) => (
                        <a
                          key={doc._key || dIdx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-[#002147] border border-rose-200 hover:border-[#002147] text-rose-800 hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 group/btn"
                        >
                          <FileText className="h-3.5 w-3.5 text-rose-600 group-hover/btn:text-white transition-colors" />
                          <span>{doc.title || "Download Circular"}</span>
                          <Download className="h-3.5 w-3.5 text-rose-600 group-hover/btn:text-white transition-colors" />
                        </a>
                      ))
                    ) : (n.pdfUrl || n.fileUrl) ? (
                      <a
                        href={n.pdfUrl || n.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-[#002147] border border-rose-200 hover:border-[#002147] text-rose-800 hover:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 group/btn"
                      >
                        <FileText className="h-3.5 w-3.5 text-rose-600 group-hover/btn:text-white transition-colors" />
                        <span>Download Circular</span>
                        <Download className="h-3.5 w-3.5 text-rose-600 group-hover/btn:text-white transition-colors" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
