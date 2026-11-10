"use client";

import React, { useState } from "react";
import { MonitorPlay, FileText, CheckCircle, ArrowRight, Sparkles, Layers, BarChart3 } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function IlmsSystem() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const ilmsData = academicsData.ilms;

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

      {/* Main Narrative */}
      <div className="bg-slate-50 border border-slate-200/60 p-6 md:p-8 rounded-3xl flex flex-col gap-4 text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        <p>
          St. Ann’s College for Women promotes the use of digital technologies to strengthen teaching-learning processes and provide students and faculty with convenient access to academic resources. The <strong className="text-[#002147]">Integrated Learning Management System (ILMS)</strong> serves as a digital academic platform for organizing and sharing course-related resources, supporting learning activities, and facilitating academic engagement beyond the conventional classroom.
        </p>
        <p>
          The ILMS complements classroom teaching by providing structured access to digital learning resources and supporting ICT-enabled, learner-centric and blended teaching-learning practices.
        </p>
      </div>

      {/* Key Academic Support through ILMS (9 Functions) */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-outfit text-lg font-bold text-[#002147]">Key Academic Support through ILMS</h3>
          <p className="text-xs text-slate-500 font-medium">The ILMS facilitates 9 specialized digital academic functions across all departments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ilmsData.functions.map((fn, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 p-5 rounded-3xl shadow-sm flex flex-col gap-2 hover:border-[#002147]/20 transition-all">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-[#002147]/10 text-[#002147] font-black text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="font-outfit text-sm font-bold text-slate-800">{fn.title}</h4>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed pl-8">
                {fn.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ILMS Usage and Quality Enhancement (Quality Cycle) */}
      <div className="bg-gradient-to-br from-[#002147] to-indigo-950 text-white rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-emerald-400" /> Continuous Development &amp; Auditing
          </div>
          <h3 className="font-outfit text-xl font-bold">ILMS Usage and Quality Enhancement</h3>
          <p className="text-blue-100/90 text-xs md:text-sm font-normal leading-relaxed max-w-3xl">
            The College encourages the appropriate use of ILMS as part of its continuous efforts to enhance the quality of teaching and learning. The College periodically reviews the use of digital learning resources and maintains relevant records as part of its academic and quality-assurance processes.
          </p>
        </div>

        {/* Quality Cycle Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {ilmsData.qualityCycle.map((step, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xs border border-white/15 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-xl bg-white/20 text-white font-black text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="font-outfit text-xs font-bold text-white tracking-wide">{step}</span>
              </div>
              {idx < ilmsData.qualityCycle.length - 1 && (
                <ArrowRight className="h-4 w-4 text-indigo-300 hidden lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reports & Evidence Table (10 Rows for 2025–2026) */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#002147] flex items-center justify-center text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-base font-bold text-[#002147]">Reports &amp; Evidence (Academic Year 2025–2026)</h3>
              <p className="text-xs text-slate-500 font-medium">Maintained supporting records demonstrating ILMS implementation and academic analytics</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full">
            10 Documents
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                <th className="py-4 px-6 w-16 text-center">S. No.</th>
                <th className="py-4 px-6">Document / Evidence</th>
                <th className="py-4 px-6 text-center">Academic Year</th>
                <th className="py-4 px-6 text-center">View / Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ilmsData.reports.map((row) => (
                <tr key={row.sNo} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 text-center font-bold text-slate-400">{row.sNo}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">{row.title}</td>
                  <td className="py-4 px-6 text-center font-semibold text-slate-600">{row.year}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setPreviewUrl(row.docUrl);
                        setPreviewTitle(`${row.title} (${row.year})`);
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

