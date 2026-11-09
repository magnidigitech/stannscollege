"use client";

import React, { useState } from "react";
import { GraduationCap, BookOpen, ClipboardList, CheckCircle, FileText, Download } from "lucide-react";
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

  const features = [
    "Flexibility to explore multiple disciplines under Single Major framework",
    "Single Major with One Minor structure from A.Y. 2023–24 aligned with NEP 2020",
    "Skill-oriented courses, community service projects & semester-long internships",
    "Enhanced career opportunities, corporate placements and academic progression"
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Category A: Academic Programmes
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Undergraduate Programmes (UG)
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        St. Ann’s College for Women offers diverse UG and PG programmes for academic and professional excellence. UG programmes follow the <span className="text-[#002147] font-bold">Single Major system from 2023–2024</span>, aligned with the National Education Policy (NEP 2020).
      </p>

      {/* Programme Structure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col gap-3 hover:border-[#002147]/20 transition-all">
          <div className="h-10 w-10 rounded-2xl bg-[#002147]/5 flex items-center justify-center text-[#002147] border border-[#002147]/10">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-base font-bold text-[#002147]">Major Discipline</h3>
          <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
            Core specialization chosen by the student as their primary area of deep theoretical and practical study (15 Major courses totaling 60 credits).
          </p>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col gap-3 hover:border-[#002147]/20 transition-all">
          <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-base font-bold text-slate-800">Minor Discipline</h3>
          <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
            Complementary discipline chosen to enhance interdisciplinary perspectives, cross-domain competence, and broadened career options (6 courses totaling 24 credits).
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-3xl p-6 md:p-8">
        <h3 className="font-outfit text-lg font-bold text-[#002147] mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-600" /> Key Academic Features
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium text-xs md:text-sm leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-[#002147] mt-2 flex-shrink-0"></span>
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Programme Intake & Admission Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#002147] flex items-center justify-center text-white">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[#002147]">Undergraduate Programmes (UG) Intake & Seat Matrix</h3>
              <p className="text-xs text-slate-500 font-medium">11 Single Major Honours Programmes with approved government and university quotas</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full">
            11 Programmes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center w-14">S. No.</th>
                <th className="py-4 px-5 font-bold uppercase tracking-wider min-w-[220px]">Name of the Programme</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center bg-[#002147]/5 text-[#002147]">Sanctioned Intake</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">Convener Quota Seats</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">Management Quota Seats</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">EWS Quota Seats</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">View Documents</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-center">Brochure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {intakeData.map((item) => (
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
