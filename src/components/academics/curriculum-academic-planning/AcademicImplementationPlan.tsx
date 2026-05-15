"use client";

import { CheckCircle, Map, FileText, ExternalLink, BookCheck } from "lucide-react";

export function AcademicImplementationPlan() {
  const entries = [
    "Subject-wise teaching plans and lesson plans",
    "Allocation of teaching workload and schedules",
    "Integration of ICT-enabled teaching methods",
    "Monitoring of syllabus completion",
    "Continuous evaluation of teaching-learning processes",
  ];

  const handleViewPdf = (item: string) => {
    alert(`Viewing PDF document for: ${item}`);
  };

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Map className="h-4 w-4 text-[#002147]" /> Curriculum & Academic Planning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Academic Implementation Plan (AIP)
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The Academic Implementation Plan (AIP) serves as a systematic roadmap for effective curriculum delivery throughout the academic year. It ensures structured planning, monitoring, and continuous improvement in the teaching–learning process.
      </p>

      {/* Details Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-2">
        <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02] flex items-center gap-3">
          <div className="h-8 w-8 bg-teal-50 rounded-lg border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm">
            <BookCheck className="h-4 w-4" />
          </div>
          <h3 className="font-outfit text-base font-black text-[#002147]">AIP Implementation & Monitoring Documents</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {entries.map((text, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <span className="h-7 w-7 rounded-xl bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-400 shrink-0">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-sans text-xs md:text-sm font-bold text-slate-700 leading-snug">
                  {text}
                </span>
              </div>
              <button
                onClick={() => handleViewPdf(text)}
                className="w-fit flex items-center gap-1.5 text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full text-xs font-bold transition-all"
              >
                <FileText className="h-3 w-3" /> View PDF <ExternalLink className="h-2.5 w-2.5 opacity-60" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-2xl p-5 flex items-center gap-3 mt-2">
        <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0" />
        <p className="text-slate-700 font-semibold text-xs md:text-sm leading-snug">
          Ensures consistency, quality, and accountability in academic delivery across the college.
        </p>
      </div>
    </div>
  );
}
