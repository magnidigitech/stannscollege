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

// Initial fallback sample history if Sanity hasn't had items entered yet
const fallbackNoticesHistory = [
  {
    _id: "not-1",
    title: "U.G CIA-II Timetable September 2026",
    date: "September 08, 2026",
    category: "examinations",
    description: "Continuous Internal Assessment (CIA-II) schedule for all second and third-year Undergraduate degree candidates.",
    isNew: true,
  },
  {
    _id: "not-2",
    title: "P.G. – R25 Time Table Semester- III (Regular) CIA – I September 2026",
    date: "September 05, 2026",
    category: "examinations",
    description: "Official examination schedule for MCA and MBA Semester-III students under R25 curriculum regulations.",
    isNew: true,
  },
  {
    _id: "not-3",
    title: "U.G – CIA-I Timetable ( R26 Batch) I year",
    date: "September 02, 2026",
    category: "examinations",
    description: "First Continuous Internal Assessment time table for newly admitted 2026-2027 batch undergraduate students.",
    isNew: true,
  },
  {
    _id: "not-4",
    title: "UG CIA-I Timetable R24 & R25 AUG-2026",
    date: "August 25, 2026",
    category: "examinations",
    description: "Schedule of examinations for intermediate semester cohorts across Science, Commerce, and Arts faculties.",
    isNew: true,
  },
  {
    _id: "not-5",
    title: "R-26 Batch 1st year Orientation and Commencement of Classes.",
    date: "August 18, 2026",
    category: "academic",
    description: "Welcome orientation program details, mentor-mentee allocations, and lecture timetable commencement for incoming freshers.",
    isNew: true,
  },
  {
    _id: "not-6",
    title: "P.G ESE- Semester II (Regular) /Semester I(Backlog) Time Table (Regular/ Backlog)",
    date: "July 20, 2026",
    category: "examinations",
    description: "End Semester Examination (ESE) datesheet for postgraduate students, including regular candidates and backlog paper submissions.",
    isNew: false,
  },
  {
    _id: "not-7",
    title: "P.G ESE- Semester IV (Regular) Semester III(Backlog) Time Table June/ July 2026.",
    date: "June 28, 2026",
    category: "examinations",
    description: "Final semester theory and viva-voce examination notification approved by the Controller of Examinations.",
    isNew: false,
  },
  {
    _id: "not-8",
    title: "PG-R25 Semester II (Regular) CIA – II Time Table June 2026",
    date: "June 12, 2026",
    category: "examinations",
    description: "Second internal assessment schedule for second-semester postgraduate classes.",
    isNew: false,
  },
  {
    _id: "not-9",
    title: "Japanese Summer Immersion Program organised in collaboration with Na Ra JAPAN HUB & IKIGAI Club under International Relations Centre",
    date: "May 30, 2026",
    category: "general",
    description: "Special language training, cross-cultural exposure, and corporate internship pathway program in Japan for pre-final year students.",
    isNew: false,
  },
  {
    _id: "not-10",
    title: "P.G. – R24 Semester- IV (Regular) CIA – I Time Table April-2026",
    date: "April 15, 2026",
    category: "examinations",
    description: "Pre-final assessment schedule and project evaluation dates for postgraduate faculties.",
    isNew: false,
  },
  {
    _id: "not-11",
    title: "Admissions Extended for UG & PG Programmes 2026-27",
    date: "May 01, 2026",
    category: "admissions",
    description: "Due to high demand, the deadline for submitting online inquiry forms and merit counseling registration has been extended.",
    isNew: false,
  },
  {
    _id: "not-12",
    title: "Hostel Fee Revision & Room Allotment Circular",
    date: "April 29, 2026",
    category: "student-support",
    description: "Details regarding accommodation fee structures and hostel admission schedule for the upcoming academic calendar.",
    isNew: false,
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
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
                    {/* Icon or New Badge */}
                    <div className="shrink-0 mt-0.5">
                      {n.isNew ? (
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
                            {n.category}
                          </span>
                        )}
                        {n.date && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                            <Calendar className="h-3 w-3" />
                            {n.date}
                          </span>
                        )}
                      </div>

                      <h2 className="font-outfit text-sm sm:text-base font-bold text-slate-800 group-hover:text-[#002147] transition-colors leading-snug">
                        {n.title}
                      </h2>

                      {n.description && (
                        <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                          {n.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action: Download PDF or View */}
                  {(n.pdfUrl || n.fileUrl) ? (
                    <a
                      href={n.pdfUrl || n.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-[#002147] font-bold text-xs shadow-xs transition-all active:scale-95 group/btn"
                    >
                      <FileText className="h-4 w-4 text-indigo-600" />
                      <span>Download Circular (PDF)</span>
                      <Download className="h-3.5 w-3.5 text-indigo-600 group-hover/btn:translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-[#002147] transition-colors">
                      <span>View Notice</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
