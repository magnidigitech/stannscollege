"use client";

import React, { useState } from "react";
import { Scale, FileText } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function AcademicRegulations() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const regulations = academicsData.academicRegulations;

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Scale className="h-4 w-4 text-[#002147]" /> Academic Regulations &amp; Resources
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Academic Regulations
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Year-wise Academic Regulations */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        {/* Table Title Banner */}
        <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <FileText className="h-5 w-5 text-amber-300" />
            </div>
            <h3 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
              Year-wise Academic Regulations
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                <th className="py-3.5 px-4 text-center font-bold text-slate-700">Regulatory Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regulations.map((reg, idx) => (
                <tr
                  key={reg.year}
                  className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}
                >
                  <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">Academic Regulations ({reg.year})</td>
                  <td className="py-3.5 px-4 text-center font-semibold">
                    <button
                      onClick={() => {
                        setPreviewUrl(reg.docUrl);
                        setPreviewTitle(`Academic Regulations (${reg.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View / Download
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
