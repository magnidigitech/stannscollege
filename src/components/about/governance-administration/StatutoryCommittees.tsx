"use client";

import React, { useState, useEffect } from "react";
import { Search, Eye, FileText, Shield, Award, Calendar, Layers, BookOpen } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getCommittees, getCommitteeYearwiseLists } from "@/lib/sanity";

interface Committee {
  sNo: number;
  name: string;
  constitutionOrderUrl?: string | null;
  activitiesReportsUrl?: string | null;
}

interface YearwiseList {
  academicYear: string;
  fileUrl: string;
  order: number;
}

const defaultCommittees: Committee[] = [
  { sNo: 1, name: "Admissions Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 2, name: "Alumni Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 3, name: "Anti-Drug Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 4, name: "Anti-Ragging Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 5, name: "Attendance Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 6, name: "Awards & Medals Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 7, name: "College Development Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 8, name: "College Publications & Promotions Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 9, name: "Cultural & Co-Curricular Activities Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 10, name: "Discipline Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 11, name: "Eco Club", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 12, name: "Entrepreneurship Development / Innovation & Start-Up Centre", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 13, name: "EOC (Equal Opportunity Cell) & SC/ST/OBC/Minority Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: null },
  { sNo: 14, name: "Examinations Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 15, name: "Finance & Scholarships Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 16, name: "Grievance Redressal Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 17, name: "Institutional Innovation Council / Institution-Industry Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: null },
  { sNo: 18, name: "Intellectual Property Rights (IPR)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 19, name: "Internal Compliance Committee (ICC) / Anti Sexual Harassment Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: null },
  { sNo: 20, name: "Internships & Competitive Examinations Coaching Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: null },
  { sNo: 21, name: "IQAC (Institutional Quality Assurance Cell)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 22, name: "Library Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 23, name: "Literary Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 24, name: "Mentor & Mentee Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 25, name: "Mother Gnanamma Outreach Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 26, name: "NCC Unit", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 27, name: "NSS Unit", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 28, name: "Parents Association Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 29, name: "Press & Media Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 30, name: "Quantum Innovation Centre (QIC)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 31, name: "Red Ribbon Club", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 32, name: "Research & Development Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 33, name: "RTI (Right to Information)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 34, name: "Seminars Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 35, name: "Sports & Games Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 36, name: "Students Counselling Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 37, name: "Timetables Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 38, name: "Tours & Travels Committee", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 39, name: "Training & Placement Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 40, name: "Universal Human Values (UHV) Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 41, name: "Women Empowerment Cell", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" },
  { sNo: 42, name: "Qunatumn Innovation Centre (QIC)", constitutionOrderUrl: "/documents/committees/college-committees-2025-2026.pdf", activitiesReportsUrl: "/documents/committees/college-committees-2025-2026.pdf" }
];

const defaultYearwiseLists: YearwiseList[] = [
  { academicYear: "2025–2026 Committee List", fileUrl: "/documents/committees/college-committees-2025-2026.pdf", order: 1 },
  { academicYear: "2024–2025 Committee List", fileUrl: "/documents/committees/college-committees-2024-2025.pdf", order: 2 },
  { academicYear: "2023–2024 Committee List", fileUrl: "/documents/committees/college-committees-2024-2025.pdf", order: 3 },
  { academicYear: "2022–2023 Committee List", fileUrl: "/documents/committees/college-committees-2024-2025.pdf", order: 4 }
];

export function StatutoryCommittees() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [yearwiseLists, setYearwiseLists] = useState<YearwiseList[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Interactive Preview State
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");

  useEffect(() => {
    async function loadCommittees() {
      try {
        const [fetchedCommittees, fetchedYearwise] = await Promise.all([
          getCommittees(),
          getCommitteeYearwiseLists()
        ]);

        if (fetchedCommittees && fetchedCommittees.length > 0) {
          // Map fetched schema to match internal Interface
          const formatted = fetchedCommittees.map((c: any) => ({
            sNo: c.sNo,
            name: c.name,
            constitutionOrderUrl: c.constitutionOrderUrl,
            activitiesReportsUrl: c.activitiesReportsUrl
          }));
          setCommittees(formatted);
        } else {
          setCommittees(defaultCommittees);
        }

        if (fetchedYearwise && fetchedYearwise.length > 0) {
          setYearwiseLists(fetchedYearwise);
        } else {
          setYearwiseLists(defaultYearwiseLists);
        }
      } catch (err) {
        console.error("Error loading committees from Sanity:", err);
        setCommittees(defaultCommittees);
        setYearwiseLists(defaultYearwiseLists);
      } finally {
        setLoading(false);
      }
    }

    loadCommittees();
  }, []);

  const filteredCommittees = committees.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenPdf = (url: string, title: string) => {
    setSelectedFileUrl(url);
    setSelectedFileTitle(title);
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
                        {row.activitiesReportsUrl ? (
                          <button
                            onClick={() => handleOpenPdf(row.activitiesReportsUrl!, `${row.name} - Activities & Reports`)}
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

      {/* 5. Flipbook Modal Reader */}
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
