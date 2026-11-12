"use client";

import React, { useState, useMemo } from "react";
import { MonitorPlay, FileText, ChevronDown, BarChart3, Layers } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function IlmsSystem() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const ilmsData = academicsData.ilms;

  // Extract all available years from reports or use default range starting from 2023–2024
  const availableYears = useMemo(() => {
    const rawYears = (ilmsData?.reports || []).map((r: any) => r.year);
    const unique = Array.from(new Set(rawYears)).filter(Boolean) as string[];
    const fallbackYears = ["2026–2027", "2025–2026", "2024–2025", "2023–2024"];
    const merged = Array.from(new Set([...unique, ...fallbackYears]));
    // Sort descending by year
    return merged.sort((a, b) => b.localeCompare(a));
  }, [ilmsData]);

  // Default to 2025–2026 or the first available year
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    return availableYears.includes("2025–2026") ? "2025–2026" : availableYears[0] || "2025–2026";
  });

  // Filter reports by selected academic year; if empty for a year, provide the 10 standard slots
  const filteredReports = useMemo(() => {
    const matched = (ilmsData?.reports || []).filter((r: any) => r.year === selectedYear);
    if (matched.length > 0) return matched;

    // Standard 10 document metrics template
    const defaultTemplates = [
      "ILMS Annual Report",
      "ILMS Usage Statistics / Analytics Report",
      "Course-wise ILMS / Digital Resource Details",
      "Faculty Participation / Usage Report",
      "Sample Digital Learning Resources",
      "Sample Digital Learning Activities / Assessments",
      "ILMS Orientation / Capacity-Building Record",
      "Student Usage / Feedback Analysis",
      "ILMS Screenshots / System Evidence",
      "IQAC Review / Quality Enhancement Record"
    ];

    return defaultTemplates.map((title, idx) => ({
      sNo: idx + 1,
      title,
      year: selectedYear,
      docUrl: "/documents/DefaultFile_1.pdf"
    }));
  }, [ilmsData, selectedYear]);

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <MonitorPlay className="h-4 w-4 text-[#002147]" /> Academic Regulations &amp; Resources
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          ILMS – Integrated Learning Management System
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Key Academic Support through ILMS (3x3 Grid with Highlighted Names) */}
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="font-outfit text-xl sm:text-2xl font-black text-[#002147]">
            Key Academic Support through ILMS
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            The ILMS facilitates nine specialized academic functions to enhance teaching-learning and student engagement:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ilmsData.functions.map((fn, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-slate-200/90 hover:border-[#002147] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all group flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="h-8 w-8 rounded-xl bg-[#002147] text-white font-outfit font-black text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h4 className="font-outfit text-sm sm:text-[15px] font-black text-[#002147] leading-snug group-hover:text-blue-900 transition-colors">
                  {fn.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-11">
                {fn.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ILMS Usage and Quality Enhancement (4-Step Process without Arrow Marks) */}
      <div className="bg-gradient-to-br from-[#002147] via-[#002b5c] to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-md border-2 border-[#001733] relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-2">
          <h3 className="font-outfit text-xl sm:text-2xl font-black text-white">
            ILMS Usage and Quality Enhancement
          </h3>
          <p className="text-blue-100/90 text-xs sm:text-sm font-normal leading-relaxed max-w-3xl">
            The College encourages the appropriate use of ILMS as part of its continuous efforts to enhance the quality of teaching and learning. The College periodically reviews the use of digital learning resources and maintains relevant records as part of its academic and quality-assurance processes.
          </p>
        </div>

        {/* 4-Step Process Cards (Clean Text, No Arrow Marks) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {ilmsData.qualityCycle.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-2xl flex items-center gap-3.5 hover:bg-white/15 transition-all shadow-inner"
            >
              <span className="h-8 w-8 rounded-xl bg-white/20 text-white font-outfit font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                0{idx + 1}
              </span>
              <span className="font-outfit text-xs sm:text-sm font-black text-white tracking-wide">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reports & Evidence Table with Year Dropdown Selector */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        {/* Table Title Banner with Academic Year Dropdown on the right */}
        <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <BarChart3 className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                Reports &amp; Evidence
              </h3>
            </div>
          </div>

          {/* Academic Year Dropdown Selector (Beside Heading, Replacing Document Badge) */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider hidden sm:inline">
              Academic Year:
            </span>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-white text-[#002147] font-outfit font-black text-xs sm:text-sm pl-4 pr-9 py-2 rounded-xl border border-white/30 shadow-md cursor-pointer hover:bg-slate-50 transition-all outline-none"
              >
                {availableYears.map((yr) => (
                  <option key={yr} value={yr} className="text-slate-800 font-bold">
                    {yr}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-[#002147] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Option 1 Styled Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                <th className="py-3.5 px-5 min-w-[300px] text-[#002147] font-black border-r border-slate-200">Document / Evidence</th>
                <th className="py-3.5 px-4 text-center font-bold text-slate-700">View / Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((row: any, idx: number) => (
                <tr
                  key={row.sNo || idx}
                  className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}
                >
                  <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">
                    {row.sNo || idx + 1}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">
                    {row.title}
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.docUrl);
                        setPreviewTitle(`${row.title} (${selectedYear})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Document Preview"}
      />
    </div>
  );
}
