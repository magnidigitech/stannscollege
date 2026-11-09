"use client";

import React, { useState } from "react";
import { GraduationCap, ClipboardList, CheckCircle, FileText, Download, ShieldCheck, Briefcase } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function PostgraduateProgrammes() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const pgIntakeData = academicsData.pgProgrammes;

  const totalSanctioned = pgIntakeData.reduce((acc, item) => acc + (item.sanctionedIntake || 0), 0);
  const totalConvener = pgIntakeData.reduce((acc, item) => acc + (item.convenerQuota || 0), 0);
  const totalManagement = pgIntakeData.reduce((acc, item) => acc + (item.managementQuota || 0), 0);
  const totalEws = pgIntakeData.reduce((acc, item) => acc + (item.ewsQuota || 0), 0);

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Category A: Academic Programmes
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Postgraduate Programmes (PG) – MCA &amp; MBA
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        St. Ann’s College for Women offers professional postgraduate programmes in <span className="text-[#002147] font-bold">MCA (Master of Computer Applications)</span> and <span className="text-[#002147] font-bold">MBA (Master of Business Administration)</span>, approved by AICTE and affiliated to Acharya Nagarjuna University. These programmes are structured to provide advanced technological competence, managerial acumen, and corporate leadership skills.
      </p>

      {/* Highlight Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50/60 to-white border border-blue-100 rounded-3xl shadow-xs">
          <div className="h-10 w-10 rounded-2xl bg-[#002147] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-outfit text-sm font-bold text-[#002147]">AICTE Approved &amp; University Affiliated</h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Standardized statutory curricula strictly compliant with AICTE norms and Acharya Nagarjuna University guidelines.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-emerald-50/60 to-white border border-emerald-100 rounded-3xl shadow-xs">
          <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-outfit text-sm font-bold text-emerald-900">Industry-Aligned Professional Exposure</h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Corporate live project work, managerial internships, specialized software laboratories, and placement training.
            </p>
          </div>
        </div>
      </div>

      {/* Programme Intake & Admission Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#002147] flex items-center justify-center text-white">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[#002147]">Postgraduate Programmes (PG) Intake & Seat Matrix</h3>
              <p className="text-xs text-slate-500 font-medium">Approved annual intake with Convener, Management, and EWS quota distribution</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full">
            2 Programmes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center w-14">S. No.</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider min-w-[260px]">Name of the Programme</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center bg-[#002147]/5 text-[#002147]">Sanctioned Intake</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">Convener Quota Seats</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">Management Quota Seats</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">EWS Quota Seats</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">View Documents</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">Brochure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pgIntakeData.map((item) => (
                <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 text-center font-bold text-slate-400">{item.sNo}</td>
                  <td className="py-4 px-5 font-bold text-slate-800">{item.name}</td>
                  <td className="py-4 px-4 text-center font-bold text-[#002147] bg-[#002147]/[0.03]">{item.sanctionedIntake}</td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">{item.convenerQuota}</td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">{item.managementQuota}</td>
                  <td className="py-4 px-4 text-center font-medium text-slate-600">{item.ewsQuota}</td>
                  <td className="py-4 px-4 text-center font-semibold">
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
                  <td className="py-4 px-4 text-center font-semibold">
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
              <tr className="bg-slate-50/90 border-t-2 border-slate-200">
                <td colSpan={2} className="py-4 px-5 font-black text-[#002147] text-right text-sm">Grand Total</td>
                <td className="py-4 px-4 text-center font-black text-white bg-[#002147] text-sm">{totalSanctioned}</td>
                <td className="py-4 px-4 text-center font-black text-[#002147] text-sm">{totalConvener}</td>
                <td className="py-4 px-4 text-center font-black text-[#002147] text-sm">{totalManagement}</td>
                <td className="py-4 px-4 text-center font-black text-[#002147] text-sm">{totalEws}</td>
                <td colSpan={2} className="py-4 px-4 bg-slate-50/40"></td>
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
