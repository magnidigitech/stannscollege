"use client";

import React, { useState, useEffect } from "react";
import { Search, Eye, FileText, Shield, Calendar, Layers, X } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

interface ActivityReport {
  title?: string;
  fileUrl: string;
}

interface Committee {
  sNo: number;
  name: string;
  constitutionOrderUrl?: string | null;
  activitiesReports?: ActivityReport[] | null;
}

interface YearwiseList {
  academicYear: string;
  fileUrl: string;
  order: number;
}

const defaultCommittees: Committee[] = [
  { sNo: 1, name: "Admissions Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 2, name: "Alumni Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 3, name: "Anti-Drug Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 4, name: "Anti-Ragging Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 5, name: "Attendance Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 6, name: "Awards & Medals Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 7, name: "College Development Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 8, name: "College Publications & Promotions Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 9, name: "Cultural & Co-Curricular Activities Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 10, name: "Discipline Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 11, name: "Eco Club", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 12, name: "Entrepreneurship Development / Innovation & Start-Up Centre", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 13, name: "EOC (Equal Opportunity Cell) & SC/ST/OBC/Minority Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: null },
  { sNo: 14, name: "Examinations Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 15, name: "Finance & Scholarships Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 16, name: "Grievance Redressal Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 17, name: "Institutional Innovation Council / Institution-Industry Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: null },
  { sNo: 18, name: "Intellectual Property Rights (IPR)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 19, name: "Internal Compliance Committee (ICC) / Anti Sexual Harassment Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: null },
  { sNo: 20, name: "Internships & Competitive Examinations Coaching Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: null },
  { sNo: 21, name: "IQAC (Institutional Quality Assurance Cell)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 22, name: "Library Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 23, name: "Literary Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 24, name: "Mentor & Mentee Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 25, name: "Mother Gnanamma Outreach Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 26, name: "NCC Unit", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 27, name: "NSS Unit", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 28, name: "Parents Association Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 29, name: "Press & Media Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 30, name: "Quantum Innovation Centre (QIC)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 31, name: "Red Ribbon Club", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 32, name: "Research & Development Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 33, name: "RTI (Right to Information)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 34, name: "Seminars Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 35, name: "Sports & Games Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 36, name: "Students Counselling Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 37, name: "Timetables Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 38, name: "Tours & Travels Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 39, name: "Training & Placement Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 40, name: "Universal Human Values (UHV) Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 41, name: "Women Empowerment Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] },
  { sNo: 42, name: "Qunatumn Innovation Centre (QIC)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReports: [{ title: "Activities & Reports 2025–2026", fileUrl: "/documents/committees/college-committees-2025-2026.pdf" }] }
];

const defaultYearwiseLists: YearwiseList[] = [
  { academicYear: "2025–2026 Committee List", fileUrl: "/documents/committees/college-committees-2025-2026.pdf", order: 1 },
  { academicYear: "2024–2025 Committee List", fileUrl: "/documents/committees/college-committees-2024-2025.pdf", order: 2 },
  { academicYear: "2023–2024 Committee List", fileUrl: "/documents/committees/college-committees-2024-2025.pdf", order: 3 },
  { academicYear: "2022–2023 Committee List", fileUrl: "/documents/committees/college-committees-2024-2025.pdf", order: 4 }
];

export function StatutoryCommittees({
  initialCommittees = [],
  initialYearwiseLists = []
}: {
  initialCommittees?: Committee[];
  initialYearwiseLists?: YearwiseList[];
}) {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [yearwiseLists, setYearwiseLists] = useState<YearwiseList[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Interactive Preview State
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");

  // Multiple Reports Selection Modal State
  const [selectedReportsList, setSelectedReportsList] = useState<ActivityReport[] | null>(null);
  const [selectedReportsTitle, setSelectedReportsTitle] = useState("");

  useEffect(() => {
    if (initialCommittees && initialCommittees.length > 0) {
      // Map to match interface
      const formatted = initialCommittees.map((c: any) => ({
        sNo: c.sNo,
        name: c.name,
        constitutionOrderUrl: c.constitutionOrderUrl,
        activitiesReports: c.activitiesReports
      }));
      setCommittees(formatted);
    } else {
      setCommittees(defaultCommittees);
    }

    if (initialYearwiseLists && initialYearwiseLists.length > 0) {
      setYearwiseLists(initialYearwiseLists);
    } else {
      setYearwiseLists(defaultYearwiseLists);
    }
    setLoading(false);
  }, [initialCommittees, initialYearwiseLists]);

  const filteredCommittees = committees.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenPdf = (url: string, title: string) => {
    setSelectedFileUrl(url);
    setSelectedFileTitle(title);
  };

  const handleViewReports = (row: Committee) => {
    const reports = row.activitiesReports || [];
    if (reports.length === 1) {
      // Single report: Open directly in PDF viewer
      handleOpenPdf(reports[0].fileUrl, `${row.name} - Activities & Reports`);
    } else if (reports.length > 1) {
      // Multiple reports: Open selection popup modal
      setSelectedReportsList(reports);
      setSelectedReportsTitle(`${row.name} - Activities & Reports`);
    }
  };

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* 1. Dark Gradient Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001730] via-[#002147] to-[#0d3b66] p-8 md:p-10 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 backdrop-blur-md border border-indigo-400/20 px-3.5 py-1.5 text-xs font-black text-indigo-300 tracking-wider uppercase w-fit">
              <Shield className="h-3.5 w-3.5" /> Governance & Structure
            </span>
            <h1 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
              College Committees, Cells & Clubs
            </h1>
            <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-3xl mt-1 text-justify">
              St. Ann’s College for Women constitutes various statutory, academic, administrative, co-curricular, student support, extension, and quality assurance committees, cells, clubs, and units for the effective functioning of the institution. These bodies play a significant role in promoting academic excellence, student welfare, discipline, leadership, innovation, research culture, community engagement, and institutional quality enhancement in accordance with the guidelines of UGC, NAAC, APSCHE, and other regulatory authorities.
            </p>
            <p className="text-slate-350 text-xs font-bold leading-relaxed max-w-3xl mt-1 text-justify">
              The Constitution Orders and Activity Reports of the respective committees/cells for the academic years are provided below for reference, transparency, and institutional documentation purposes.
            </p>
          </div>
          <span className="hidden lg:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-indigo-300 backdrop-blur-md shadow-inner">
            <Layers className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* 2. Interactive Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs">
        <div className="relative flex items-center w-full md:max-w-md">
          <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search committees by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 hover:border-indigo-300 focus:border-[#002147] focus:bg-white rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
          />
        </div>
        <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
          Displaying {filteredCommittees.length} of {committees.length} entries
        </span>
      </div>

      {/* 3. Redesigned Table View */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          // Loading Skeleton
          <div className="p-8 flex flex-col gap-4 animate-pulse">
            <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-14 bg-slate-50 rounded-lg w-full"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-[#002147] text-white border-b border-[#001733] select-none font-outfit uppercase tracking-wider text-[10px] md:text-xs">
                  <th className="py-5 px-8 font-black text-center w-[8%]">S. No</th>
                  <th className="py-5 px-8 font-black w-[42%]">Name of the Committee</th>
                  <th className="py-5 px-8 font-black text-center w-[25%]">Constitution Order</th>
                  <th className="py-5 px-8 font-black text-center w-[25%]">Activities / Reports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredCommittees.length > 0 ? (
                  filteredCommittees.map((row) => (
                    <tr
                      key={row.sNo}
                      className="hover:bg-slate-50/80 transition-colors duration-150 group"
                    >
                      <td className="py-5 px-8 font-bold text-slate-400 text-center">
                        {row.sNo}
                      </td>
                      <td className="py-5 px-8 font-bold text-slate-800 group-hover:text-[#002147] transition-colors leading-normal">
                        {row.name}
                      </td>
                      <td className="py-5 px-8 text-center">
                        {row.constitutionOrderUrl ? (
                          <button
                            onClick={() => handleOpenPdf(row.constitutionOrderUrl!, `${row.name} - Constitution Order`)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 px-3.5 py-2 text-[11px] font-black text-indigo-700 transition-all select-none hover:scale-[1.03]"
                          >
                            <Eye className="h-3.5 w-3.5 shrink-0" /> View Order
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-450 italic">Not Available</span>
                        )}
                      </td>
                      <td className="py-5 px-8 text-center">
                        {row.activitiesReports && row.activitiesReports.length > 0 ? (
                          <button
                            onClick={() => handleViewReports(row)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-100/60 px-3.5 py-2 text-[11px] font-black text-emerald-700 transition-all select-none hover:scale-[1.03]"
                          >
                            <Eye className="h-3.5 w-3.5 shrink-0" /> View Reports
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-350 select-none">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-semibold italic">
                      No matching committees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Committee Lists - Year-Wise */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col gap-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
              Committee Lists – Year-wise
            </h4>
            <p className="text-slate-400 text-xs font-semibold mt-1">
              Select specific academic year registers to check historical committee assignments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {yearwiseLists.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between items-start gap-4 hover:border-indigo-300 hover:bg-white hover:shadow-md hover:shadow-indigo-50/10 transition-all group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Academic Catalog</span>
                <h5 className="font-outfit font-black text-slate-800 text-sm group-hover:text-indigo-650 transition-colors">
                  {item.academicYear}
                </h5>
              </div>

              <button
                onClick={() => handleOpenPdf(item.fileUrl, item.academicYear)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] text-white text-xs font-bold py-2.5 px-4 shadow-sm transition-all"
              >
                <Eye className="h-3.5 w-3.5" /> View Lists
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Selection Modal for Multiple Reports */}
      {selectedReportsList && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          {/* Click overlay to close */}
          <div className="absolute inset-0" onClick={() => setSelectedReportsList(null)}></div>
          
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 flex flex-col gap-6 animate-scaleUp z-10">
            {/* Close Button */}
            <button
              onClick={() => setSelectedReportsList(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all active:scale-95 duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col gap-2 pr-8 select-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-[10px] font-black text-emerald-700 tracking-wider uppercase w-fit">
                <Layers className="h-3.5 w-3.5" /> Multiple Reports Available
              </span>
              <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
                {selectedReportsTitle}
              </h3>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                This committee has multiple activity reports filed. Select one below to open it in the interactive reader.
              </p>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {selectedReportsList.map((report, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-4 bg-slate-50 hover:bg-slate-100/85 border border-slate-150 rounded-2xl transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/60 shadow-sm">
                      <FileText className="h-5 w-5" />
                    </span>
                    <span className="font-sans font-bold text-xs md:text-sm text-slate-700 group-hover:text-slate-900 transition-colors leading-snug">
                      {report.title || `Report #${idx + 1}`}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleOpenPdf(report.fileUrl, `${selectedReportsTitle} - ${report.title || `Report #${idx + 1}`}`);
                      setSelectedReportsList(null); // Close the popup
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] text-white text-xs font-bold py-2.5 px-4 shadow-sm transition-all select-none hover:scale-[1.02]"
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Flipbook Modal Reader */}
      <FilePreviewModal
        isOpen={!!selectedFileUrl}
        onClose={() => {
          setSelectedFileUrl(null);
          setSelectedFileTitle("");
        }}
        fileUrl={selectedFileUrl || ""}
        title={selectedFileTitle}
      />
    </div>
  );
}
