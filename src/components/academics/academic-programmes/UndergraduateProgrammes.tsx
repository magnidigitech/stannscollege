"use client";

import React, { useState } from "react";
import { GraduationCap, ClipboardList, FileText, Download } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function UndergraduateProgrammes() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const intakeData = academicsData.ugProgrammes;

  const totalSanctioned = intakeData.reduce((acc, item) => acc + (item.sanctionedIntake || 0), 0);
  const totalConvener = intakeData.reduce((acc, item) => acc + (item.convenerQuota || 0), 0);
  const totalManagement = intakeData.reduce((acc, item) => acc + (item.managementQuota || 0), 0);
  const totalEws = intakeData.reduce((acc, item) => acc + (item.ewsQuota || 0), 0);

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Academic Programmes
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Undergraduate Programmes (UG)
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Programme Intake & Admission Table */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
        {/* Table Title Banner */}
        <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <ClipboardList className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                Undergraduate Programmes (UG) Intake &amp; Seat Matrix
              </h3>
              <p className="text-xs text-blue-200/90 font-medium mt-1">
                Single Major Honours Programmes with effect from academic year (A.Y.) 2023 - 2024
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
            {intakeData.length} Programmes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                <th className="py-3.5 px-5 min-w-[220px] text-[#002147] font-black border-r border-slate-200">Name of the Programme</th>
                <th className="py-3.5 px-4 text-center bg-blue-100/90 text-[#002147] font-black border-r border-blue-200">Sanctioned Intake</th>
                <th className="py-3.5 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Convener Quota Seats</th>
                <th className="py-3.5 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Management Quota Seats</th>
                <th className="py-3.5 px-4 text-center text-slate-700 font-bold border-r border-slate-200">EWS Quota Seats</th>
                <th className="py-3.5 px-4 text-center text-slate-700 font-bold border-r border-slate-200">View Documents</th>
                <th className="py-3.5 px-4 text-center text-slate-700 font-bold">Brochure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {intakeData.map((item, idx) => (
                <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                  <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.name}</td>
                  <td className="py-3.5 px-4 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{item.sanctionedIntake}</td>
                  <td className="py-3.5 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{item.convenerQuota}</td>
                  <td className="py-3.5 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{item.managementQuota}</td>
                  <td className="py-3.5 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{item.ewsQuota}</td>
                  <td className="py-3.5 px-4 text-center font-semibold border-r border-slate-100">
                    <button
                      onClick={() => {
                        setPreviewUrl(item.aboutDocumentUrl || "/documents/DefaultFile_1.pdf");
                        setPreviewTitle(`${item.name} - About Document`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold">
                    <button
                      onClick={() => {
                        setPreviewUrl(item.brochureUrl || "/documents/DefaultFile_1.pdf");
                        setPreviewTitle(`${item.name} - Brochure`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#002147] text-white border-t-2 border-[#001733]">
                <td colSpan={2} className="py-4 px-5 font-outfit font-black text-white text-right text-sm tracking-wide">Grand Total</td>
                <td className="py-4 px-4 text-center font-outfit font-black text-amber-300 bg-[#001733] text-base">{totalSanctioned}</td>
                <td className="py-4 px-4 text-center font-outfit font-black text-white text-sm">{totalConvener}</td>
                <td className="py-4 px-4 text-center font-outfit font-black text-white text-sm">{totalManagement}</td>
                <td className="py-4 px-4 text-center font-outfit font-black text-white text-sm">{totalEws}</td>
                <td colSpan={2} className="py-4 px-4 bg-[#001e40]"></td>
              </tr>
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
