"use client";

import React, { useState } from "react";
import { ShieldCheck, FileText, Download, CheckCircle, Scale } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function AcademicRegulations() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const regulations = academicsData.academicRegulations;

  const statutoryBodies = [
    { title: "Acharya Nagarjuna University (ANU)", desc: "Affiliating university guidelines, academic calendars, curriculum structures, and evaluation norms." },
    { title: "University Grants Commission (UGC)", desc: "National quality mandates, CBCS/NEP 2020 guidelines, faculty credentials, and credit frameworks." },
    { title: "All India Council for Technical Education (AICTE)", desc: "Technical norms, curriculum benchmarks, and infrastructural ratios for MCA and MBA." },
    { title: "Andhra Pradesh Council of Higher Education (APSCHE)", desc: "State higher education policies, single major regulations, and admission criteria." }
  ];

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

      <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        The College follows the rules, regulations, guidelines and academic norms prescribed by <strong className="text-[#002147]">Acharya Nagarjuna University (ANU)</strong>, <strong className="text-[#002147]">University Grants Commission (UGC)</strong>, <strong className="text-[#002147]">All India Council for Technical Education (AICTE)</strong>, <strong className="text-[#002147]">Andhra Pradesh Council of Higher Education (APSCHE)</strong> and other competent statutory and regulatory authorities, as applicable to the respective programmes and from time to time. The College also follows its approved institutional academic policies and regulations.
      </div>

      {/* Statutory Bodies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statutoryBodies.map((body, idx) => (
          <div key={idx} className="bg-white border border-slate-200/60 p-5 rounded-3xl shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <h4 className="font-outfit text-sm font-bold text-[#002147]">{body.title}</h4>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pl-6">{body.desc}</p>
          </div>
        ))}
      </div>

      {/* Year-wise Academic Regulations */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#002147] flex items-center justify-center text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[#002147]">Year-wise Academic Regulations</h3>
              <p className="text-xs text-slate-500 font-medium">Complete regulatory frameworks, admission policies, and code of conduct</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full">
            Official Decrees
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                <th className="py-4 px-6 w-20 text-center">S. No.</th>
                <th className="py-4 px-6">Academic Year</th>
                <th className="py-4 px-6 text-center">Regulatory Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regulations.map((reg, idx) => (
                <tr key={reg.year} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 text-center font-bold text-slate-400">{idx + 1}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">Academic Regulations ({reg.year})</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(reg.docUrl);
                        setPreviewTitle(`Academic Regulations (${reg.year})`);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
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

