"use client";

import React, { useState } from "react";
import { Calendar, FileText, Download, CheckCircle, Clock } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function AcademicCalendar() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const ugCalendar = academicsData.academicCalendar.ug;
  const pgCalendar = academicsData.academicCalendar.pg;

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-[#002147]" /> Academic Regulations &amp; Resources
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Academic Calendar
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        The College follows the Academic Calendar prescribed by <strong className="text-[#002147]">Acharya Nagarjuna University (ANU)</strong> for its Undergraduate and Postgraduate programmes. Based on the University schedule, the College prepares its <strong className="text-[#002147]">Annual Institutional Plan (AIP)</strong> to plan and monitor academic, co-curricular, extracurricular and institutional activities.
      </div>

      {/* Table 1: Undergraduate (UG) Programmes */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#002147] flex items-center justify-center text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[#002147]">Undergraduate (UG) Programmes</h3>
              <p className="text-xs text-slate-500 font-medium">ANU Academic Calendar &amp; College Annual Institutional Plan (AIP)</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full">
            UG Schedule
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 font-bold uppercase tracking-wider min-w-[180px]">Academic Year</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">ANU Academic Calendar</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">College Annual Institutional Plan (AIP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ugCalendar.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800">{row.year}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.anuCalendarUrl);
                        setPreviewTitle(`UG ANU Academic Calendar (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View / Download
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.aipUrl);
                        setPreviewTitle(`UG College AIP (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
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

      {/* Table 2: Postgraduate (PG) Programmes */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-700 flex items-center justify-center text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-slate-800">Postgraduate (PG) Programmes</h3>
              <p className="text-xs text-slate-500 font-medium">ANU Academic Calendar &amp; College Annual Institutional Plan (AIP)</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
            PG Schedule
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 font-bold uppercase tracking-wider min-w-[180px]">Academic Year</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">ANU Academic Calendar</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">College Annual Institutional Plan (AIP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pgCalendar.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-800">{row.year}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.anuCalendarUrl);
                        setPreviewTitle(`PG ANU Academic Calendar (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View / Download
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.aipUrl);
                        setPreviewTitle(`PG College AIP (${row.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
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
