"use client";

import { Calendar, CheckCircle, FileText, ExternalLink } from "lucide-react";

export function AcademicCalendar() {
  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027", "2027-2028", "2029-2030"];

  const handleViewPdf = (type: string, year: string, prog: string) => {
    alert(`Viewing PDF for: ${type} - ${prog} (${year})`);
  };

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-[#002147]" /> Curriculum & Academic Planning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Academic Planning & Calendars
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The Academic Calendar provides a comprehensive schedule of all academic activities for Undergraduate and Postgraduate programmes.
      </p>

      {/* Section 1: ANU Academic Calendar */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-100 bg-[#002147]/[0.02] flex flex-col gap-1">
          <h3 className="font-outfit text-base font-black text-[#002147]">ANU Academic Calendar</h3>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">(Affiliated to Acharya Nagarjuna University)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-sans">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Academic Year</th>
                <th className="py-3.5 px-6 text-center">UG Calendar</th>
                <th className="py-3.5 px-6 text-center">PG Calendar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {years.map((year) => (
                <tr key={year} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-6 font-bold text-slate-700">{year}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewPdf("ANU", year, "UG")}
                      className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 hover:underline text-xs font-bold bg-indigo-50 px-3.5 py-1.5 rounded-full transition-all"
                    >
                      <FileText className="h-3 w-3" /> View PDF
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewPdf("ANU", year, "PG")}
                      className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-700 hover:underline text-xs font-bold bg-teal-50 px-3.5 py-1.5 rounded-full transition-all"
                    >
                      <FileText className="h-3 w-3" /> View PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Institutional Academic Implementation Plan (AIP) */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-100 bg-[#002147]/[0.02] flex flex-col gap-1">
          <h3 className="font-outfit text-base font-black text-[#002147]">Institutional Academic Implementation Plan (AIP)</h3>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Detailed internal schedules</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-sans">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Academic Year</th>
                <th className="py-3.5 px-6 text-center">UG Calendar</th>
                <th className="py-3.5 px-6 text-center">PG Calendar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {years.map((year) => (
                <tr key={year} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-6 font-bold text-slate-700">{year}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewPdf("Institutional", year, "UG")}
                      className="inline-flex items-center gap-1.5 text-[#002147] hover:bg-[#002147]/10 text-xs font-bold bg-[#002147]/5 px-3.5 py-1.5 rounded-full transition-all"
                    >
                      <FileText className="h-3 w-3" /> View PDF
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewPdf("Institutional", year, "PG")}
                      className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-800 hover:bg-purple-100 text-xs font-bold bg-purple-50 px-3.5 py-1.5 rounded-full transition-all"
                    >
                      <FileText className="h-3 w-3" /> View PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Statement */}
      <div className="flex items-center gap-3 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl mt-2">
        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
        <p className="text-emerald-800 font-semibold text-xs md:text-sm leading-snug">
          Ensures transparency, effective planning, and timely execution of academic activities.
        </p>
      </div>
    </div>
  );
}
