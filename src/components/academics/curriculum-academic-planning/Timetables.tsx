"use client";

import React, { useState } from "react";
import { Clock, FileText, Download, Calendar } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function Timetables() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const ugTimetables = academicsData.timetables.ug;
  const pgTimetables = academicsData.timetables.pg;

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-[#002147]" /> Academic Regulations &amp; Resources
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Time Tables
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* UG Time Tables */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        {/* Table Title Banner */}
        <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <Calendar className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                Undergraduate (UG) Programmes
              </h3>
              <p className="text-xs text-blue-200/90 font-medium mt-1">
                Semester-wise centrally prepared timetables for odd and even semesters
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
            UG Timetables
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                <th className="py-3.5 px-6 min-w-[180px] border-r border-slate-200">Academic Year</th>
                <th className="py-3.5 px-6 text-center border-r border-slate-200">I, III &amp; V Semesters (Odd Semesters)</th>
                <th className="py-3.5 px-6 text-center">II, IV &amp; VI Semesters (Even Semesters)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ugTimetables.map((row, idx) => (
                <tr key={row.year} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                  <td className="py-3.5 px-6 font-bold text-slate-800 border-r border-slate-100">{row.year}</td>
                  <td className="py-3.5 px-6 text-center border-r border-slate-100">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.oddSemUrl);
                        setPreviewTitle(`UG Timetable - I, III & V Semesters (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View / Download
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.evenSemUrl);
                        setPreviewTitle(`UG Timetable - II, IV & VI Semesters (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> View / Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PG Time Tables */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        {/* Table Title Banner */}
        <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <Clock className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                Postgraduate (PG) Programmes (MCA &amp; MBA)
              </h3>
              <p className="text-xs text-blue-200/90 font-medium mt-1">
                Semester-wise timetables for MCA and MBA professional cohorts
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
            PG Timetables
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                <th className="py-3.5 px-6 min-w-[180px] border-r border-slate-200">Academic Year</th>
                <th className="py-3.5 px-6 text-center border-r border-slate-200">I &amp; III Semesters (Odd Semesters)</th>
                <th className="py-3.5 px-6 text-center">II &amp; IV Semesters (Even Semesters)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pgTimetables.map((row, idx) => (
                <tr key={row.year} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                  <td className="py-3.5 px-6 font-bold text-slate-800 border-r border-slate-100">{row.year}</td>
                  <td className="py-3.5 px-6 text-center border-r border-slate-100">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.oddSemUrl);
                        setPreviewTitle(`PG Timetable - I & III Semesters (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View / Download
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.evenSemUrl);
                        setPreviewTitle(`PG Timetable - II & IV Semesters (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> View / Download
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
