"use client";

import { Clock, FileText, LayoutGrid, ListOrdered, ExternalLink } from "lucide-react";

export function Timetables() {
  const years = ["2023-2024", "2024-2025", "2025-2026", "2026-2027", "2027-2028", "2029-2030"];

  const handleViewPdf = (type: string, year: string, category: string) => {
    alert(`Requesting ${type} Timetable for ${category} in ${year}`);
  };

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-[#002147]" /> Curriculum & Academic Planning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Timetables
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The institution prepares and publishes well-organized timetables to ensure smooth and efficient conduct of academic activities.
      </p>

      {/* Section 1: Detailed Timetables */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-[#002147]/[0.02] flex items-center gap-3">
          <div className="h-8 w-8 bg-indigo-50 rounded-lg text-indigo-600 flex items-center justify-center border border-indigo-100">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <h3 className="font-outfit text-base font-black text-[#002147]">UG & PG Programmes – Timetables</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] md:text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider">
                <th rowSpan={2} className="py-4 px-4 border-r border-slate-100 text-center align-middle w-24">Year</th>
                <th colSpan={2} className="py-2.5 px-4 border-b border-r border-slate-100 text-center">UG Programmes</th>
                <th colSpan={2} className="py-2.5 px-4 border-b border-slate-100 text-center">PG Programmes</th>
              </tr>
              <tr className="bg-slate-50/40 text-slate-500 border-b border-slate-100 font-bold">
                <th className="py-2 px-4 border-r border-slate-100 text-center text-indigo-700 bg-indigo-50/30">Odd Sem (I, III, V)</th>
                <th className="py-2 px-4 border-r border-slate-100 text-center text-indigo-700 bg-indigo-50/10">Even Sem (II, IV, VI)</th>
                <th className="py-2 px-4 border-r border-slate-100 text-center text-teal-700 bg-teal-50/30">Odd Sem (I, III)</th>
                <th className="py-2 px-4 text-center text-teal-700 bg-teal-50/10">Even Sem (II, IV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {years.map((year) => (
                <tr key={year} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-4 text-center border-r border-slate-100 font-black text-slate-800 text-xs bg-slate-50/20">{year}</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button onClick={() => handleViewPdf("Detailed", year, "UG Odd Sem")} className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                      <FileText className="h-2.5 w-2.5" /> PDF
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button onClick={() => handleViewPdf("Detailed", year, "UG Even Sem")} className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                      <FileText className="h-2.5 w-2.5" /> PDF
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button onClick={() => handleViewPdf("Detailed", year, "PG Odd Sem")} className="inline-flex items-center gap-1 text-teal-600 hover:underline">
                      <FileText className="h-2.5 w-2.5" /> PDF
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={() => handleViewPdf("Detailed", year, "PG Even Sem")} className="inline-flex items-center gap-1 text-teal-600 hover:underline">
                      <FileText className="h-2.5 w-2.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Central Timetables */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-[#002147]/[0.02] flex items-center gap-3">
          <div className="h-8 w-8 bg-purple-50 rounded-lg text-purple-600 flex items-center justify-center border border-purple-100">
            <ListOrdered className="h-4 w-4" />
          </div>
          <h3 className="font-outfit text-base font-black text-[#002147]">UG & PG Programmes – Central Timetables</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] md:text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider">
                <th rowSpan={2} className="py-4 px-4 border-r border-slate-100 text-center align-middle w-24">Year</th>
                <th colSpan={2} className="py-2.5 px-4 border-b border-slate-100 text-center bg-[#002147]/5 text-[#002147]">Central Timetable Documents</th>
              </tr>
              <tr className="bg-slate-50/40 text-slate-500 border-b border-slate-100 font-bold">
                <th className="py-2 px-4 border-r border-slate-100 text-center">Odd Semesters</th>
                <th className="py-2 px-4 text-center">Even Semesters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {years.map((year) => (
                <tr key={year} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-4 text-center border-r border-slate-100 font-black text-slate-800 text-xs bg-slate-50/20">{year}</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button onClick={() => handleViewPdf("Central", year, "Odd Sem")} className="inline-flex items-center gap-1.5 text-[#002147] font-bold hover:underline bg-[#002147]/5 hover:bg-[#002147]/10 px-3 py-1 rounded-full">
                      <FileText className="h-3 w-3" /> View PDF
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={() => handleViewPdf("Central", year, "Even Sem")} className="inline-flex items-center gap-1.5 text-[#002147] font-bold hover:underline bg-[#002147]/5 hover:bg-[#002147]/10 px-3 py-1 rounded-full">
                      <FileText className="h-3 w-3" /> View PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
