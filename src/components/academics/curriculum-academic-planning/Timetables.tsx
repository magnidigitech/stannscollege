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

      <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        The College publishes centrally prepared semester-wise class timetables for UG and PG programmes to ensure systematic scheduling and effective implementation of academic activities.
      </div>

      {/* UG Time Tables */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#002147] flex items-center justify-center text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[#002147]">Undergraduate (UG) Programmes</h3>
              <p className="text-xs text-slate-500 font-medium">Semester-wise centrally prepared timetables for odd and even semesters</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full">
            UG Timetables
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 font-bold uppercase tracking-wider min-w-[180px]">Academic Year</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">I, III &amp; V Semesters (Odd Semesters)</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">II, IV &amp; VI Semesters (Even Semesters)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ugTimetables.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800">{row.year}</td>
                  <td className="py-4 px-6 text-center">
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
                  <td className="py-4 px-6 text-center">
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
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-700 flex items-center justify-center text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-slate-800">Postgraduate (PG) Programmes</h3>
              <p className="text-xs text-slate-500 font-medium">Semester-wise timetables for MCA and MBA professional cohorts</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
            PG Timetables
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 font-bold uppercase tracking-wider min-w-[180px]">Academic Year</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">I &amp; III Semesters (Odd Semesters)</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">II &amp; IV Semesters (Even Semesters)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pgTimetables.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800">{row.year}</td>
                  <td className="py-4 px-6 text-center">
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
                  <td className="py-4 px-6 text-center">
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
