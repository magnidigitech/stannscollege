"use client";

import React, { useState } from "react";
import { Newspaper, Calendar, Eye, Download, X, ExternalLink, Filter, ChevronDown } from "lucide-react";

export interface NewsletterItem {
  _id: string;
  title: string;
  academicYear: string;
  month: string;
  pdfUrl?: string;
  displayOrder?: number;
}

interface NewslettersSectionProps {
  newsletters: NewsletterItem[];
}

export default function NewslettersSection({ newsletters }: NewslettersSectionProps) {
  const years = Array.from(new Set(newsletters.map((n) => n.academicYear))).filter(Boolean).sort().reverse();
  const [selectedYear, setSelectedYear] = useState<string>(years[0] || "2025-2026");
  const [activePdfModal, setActivePdfModal] = useState<{ title: string; pdfUrl: string } | null>(null);

  const filteredNewsletters = newsletters.filter((n) => n.academicYear === selectedYear);

  return (
    <section className="py-16 bg-white border-b border-slate-200/60 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <Newspaper className="h-3.5 w-3.5 text-indigo-500" /> Monthly Bulletins
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              The St. Ann&apos;s Chronicle (Newsletters)
            </h2>
            <p className="font-sans text-xs md:text-sm text-slate-500 font-semibold max-w-2xl">
              Monthly updates documenting campus happenings, academic seminars, departmental workshops, NSS/NCC drives, and sports triumphs.
            </p>
          </div>

          {/* Academic Year Select Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Filter className="absolute left-3.5 h-4 w-4 text-indigo-600 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-sm transition-all cursor-pointer min-w-[210px]"
              >
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

        {/* Monthly Newsletters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredNewsletters.map((item) => (
            <div
              key={item._id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:bg-white hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    <Calendar className="h-3 w-3 text-indigo-500" /> {item.month}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    {item.academicYear}
                  </span>
                </div>

                <h4 className="font-outfit text-base font-black text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h4>
                <p className="font-sans text-xs text-slate-500 font-medium mt-1">
                  Official monthly news issue for campus events and achievements.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2">
                {item.pdfUrl ? (
                  <>
                    <button
                      onClick={() => setActivePdfModal({ title: item.title, pdfUrl: item.pdfUrl! })}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] text-white py-2 text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Issue
                    </button>
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shrink-0"
                      title="Download PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic">Processing PDF...</span>
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
            <div className="flex items-center justify-between bg-[#002147] px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-indigo-300">
                  <Newspaper className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-outfit text-base font-black leading-tight text-white">
                    {activePdfModal.title}
                  </h3>
                  <p className="font-sans text-xs text-indigo-200 font-semibold">
                    St. Ann&apos;s Chronicle Monthly Issue Viewer
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
