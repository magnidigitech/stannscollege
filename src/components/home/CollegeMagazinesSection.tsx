"use client";

import React, { useState } from "react";
import { BookOpen, Calendar, Download, Eye, X, ExternalLink, Sparkles, Filter, ChevronDown } from "lucide-react";

export interface MagazineItem {
  _id: string;
  title: string;
  academicYear: string;
  pdfUrl?: string;
  coverUrl?: string;
  displayOrder?: number;
}

interface CollegeMagazinesSectionProps {
  magazines: MagazineItem[];
}

export default function CollegeMagazinesSection({ magazines }: CollegeMagazinesSectionProps) {
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [activePdfModal, setActivePdfModal] = useState<{ title: string; pdfUrl: string } | null>(null);

  // Extract unique academic years for filter dropdown
  const years = Array.from(new Set(magazines.map((m) => m.academicYear))).filter(Boolean);

  const filteredMagazines = selectedYear === "ALL" 
    ? magazines 
    : magazines.filter((m) => m.academicYear === selectedYear);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-200/60 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Annual Publications
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              College Magazines & Archival Editions
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-500 font-semibold max-w-2xl">
              Chronicles of academic excellence, creative literature, student accolades, and institution milestones.
            </p>
          </div>

          {/* Academic Year Select Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Filter className="absolute left-3.5 h-4 w-4 text-indigo-600 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-sm transition-all cursor-pointer min-w-[210px]"
              >
                <option value="ALL">All Academic Years ({magazines.length})</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    Academic Year {yr}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMagazines.map((mag) => (
            <div
              key={mag._id}
              className="group bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-[11px] font-black text-indigo-600 uppercase tracking-wider">
                  <Calendar className="h-3 w-3 text-indigo-500" /> {mag.academicYear}
                </span>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-widest">
                  Annual Issue
                </span>
              </div>

              {/* Title & Cover Representation */}
              <div className="flex flex-col gap-3 my-2">
                <div className="h-44 w-full bg-gradient-to-br from-indigo-900 via-[#002147] to-slate-900 rounded-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase">
                      ST. ANN&apos;S COLLEGE
                    </span>
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="z-10">
                    <h3 className="font-outfit text-xl font-black tracking-tight text-white leading-tight">
                      {mag.title}
                    </h3>
                    <p className="font-sans text-[11px] text-indigo-200/80 mt-1 font-semibold">
                      Official Academic Magazine
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-medium text-slate-300 z-10">
                    <span>Year {mag.academicYear}</span>
                    <span className="uppercase text-indigo-300 font-bold">PDF Format</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                {mag.pdfUrl ? (
                  <>
                    <button
                      onClick={() => setActivePdfModal({ title: `${mag.title} (${mag.academicYear})`, pdfUrl: mag.pdfUrl! })}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] text-white py-2.5 text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      <Eye className="h-3.5 w-3.5" /> Read Magazine
                    </button>
                    <a
                      href={mag.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic">Document uploading...</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF View Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-[#002147] px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-indigo-300">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-outfit text-base font-black leading-tight text-white">
                    {activePdfModal.title}
                  </h3>
                  <p className="font-sans text-xs text-indigo-200 font-semibold">
                    St. Ann&apos;s College Official Magazine Reader
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activePdfModal.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 text-xs font-bold transition-all"
                >
                  Open Full Window <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body iframe */}
            <div className="flex-1 w-full bg-slate-100 relative">
              <iframe
                src={`${activePdfModal.pdfUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title={activePdfModal.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
