"use client";

import React, { useState, useMemo } from "react";
import {
  Newspaper,
  Calendar,
  Download,
  Eye,
  X,
  ExternalLink,
  Filter,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown,
} from "lucide-react";

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
  const years = useMemo(() => {
    return Array.from(new Set(newsletters.map((n) => n.academicYear))).filter(Boolean).sort().reverse();
  }, [newsletters]);

  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortLatestFirst, setSortLatestFirst] = useState<boolean>(true);
  const [activePdfModal, setActivePdfModal] = useState<{ title: string; pdfUrl: string } | null>(null);

  // Month ordering helper for chronological sorting
  const monthOrder: Record<string, number> = {
    june: 1,
    july: 2,
    august: 3,
    september: 4,
    october: 5,
    november: 6,
    december: 7,
    january: 8,
    february: 9,
    march: 10,
    april: 11,
    may: 12,
  };

  // Filter & sort newsletters
  const filteredNewsletters = useMemo(() => {
    let list = newsletters.filter((item) => {
      const matchesYear = selectedYear === "ALL" || item.academicYear === selectedYear;
      const matchesQuery =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.academicYear.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesQuery;
    });

    return list.sort((a, b) => {
      // Sort by academic year first
      if (a.academicYear !== b.academicYear) {
        return sortLatestFirst
          ? b.academicYear.localeCompare(a.academicYear)
          : a.academicYear.localeCompare(b.academicYear);
      }
      // Then by display order or month sequence
      const orderA = a.displayOrder ?? monthOrder[a.month?.toLowerCase()] ?? 99;
      const orderB = b.displayOrder ?? monthOrder[b.month?.toLowerCase()] ?? 99;
      return sortLatestFirst ? orderA - orderB : orderB - orderA;
    });
  }, [newsletters, selectedYear, searchQuery, sortLatestFirst]);

  return (
    <section className="py-14 bg-white border-b border-slate-200/80 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs mb-2.5">
              <Newspaper className="h-3.5 w-3.5 text-[#002147]" /> Monthly Publications
            </span>
            <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002147] tracking-tight">
              The St. Ann&apos;s Chronicle
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 font-normal max-w-xl mt-1.5 leading-relaxed">
              Official monthly bulletins documenting campus happenings, academic seminars, departmental workshops, and student accolades.
            </p>
          </div>

          {/* Action Bar: Search, Year Filter, View Mode */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex items-center min-w-[170px] sm:min-w-[200px]">
              <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147]/10 focus:border-[#002147] shadow-2xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Academic Year Filter */}
            <div className="relative flex items-center">
              <Filter className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2 bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#002147]/10 focus:border-[#002147] shadow-2xs transition-colors cursor-pointer"
              >
                <option value="ALL">All Academic Years</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    AY {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-50/80 border border-slate-200 rounded-xl p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewMode === "table"
                    ? "bg-[#002147] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table View"
                aria-label="Table View"
              >
                <TableIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#002147] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content: Clean Table or Grid */}
        {filteredNewsletters.length === 0 ? (
          <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
            <Newspaper className="h-8 w-8 mx-auto mb-3 text-slate-400" />
            <p className="font-semibold text-sm text-slate-700">No newsletters found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or academic year filter.</p>
          </div>
        ) : viewMode === "table" ? (
          /* =======================================================
             CLEAN, STREAMLINED 3-COLUMN TABLE
             (Issue Month / Year, Newsletter Title, Actions)
             ======================================================= */
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200/80 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th scope="col" className="py-3.5 px-6 w-52 sm:w-56">
                      <button
                        type="button"
                        onClick={() => setSortLatestFirst(!sortLatestFirst)}
                        className="inline-flex items-center gap-1.5 hover:text-slate-900 font-bold uppercase tracking-wider cursor-pointer"
                        title={sortLatestFirst ? "Showing latest first (click for oldest first)" : "Showing oldest first (click for latest first)"}
                      >
                        Month &amp; Year <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </button>
                    </th>
                    <th scope="col" className="py-3.5 px-6">
                      Newsletter Edition / Title
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-right w-44">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredNewsletters.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/80 transition-colors duration-150 group"
                    >
                      {/* Month & Academic Year */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100/90 text-slate-700 border border-slate-200/70">
                          <Calendar className="h-3.5 w-3.5 text-[#002147]" />
                          {item.month} {item.academicYear ? `(${item.academicYear})` : ""}
                        </span>
                      </td>

                      {/* Title & Description */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="h-10 w-10 rounded-xl bg-[#002147]/5 border border-[#002147]/10 flex items-center justify-center text-[#002147] shrink-0 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                            <Newspaper className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-outfit text-sm sm:text-base font-bold text-slate-900 block leading-tight group-hover:text-[#002147] transition-colors">
                              {item.title}
                            </span>
                            <span className="font-sans text-xs text-slate-400 block mt-0.5 font-medium">
                              St. Ann&apos;s College for Women • Monthly Campus Bulletin
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {item.pdfUrl ? (
                          <div className="inline-flex items-center gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setActivePdfModal({
                                  title: item.title,
                                  pdfUrl: item.pdfUrl!,
                                })
                              }
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#002147] bg-[#002147]/5 hover:bg-[#002147] hover:text-white border border-[#002147]/15 transition-all cursor-pointer shadow-2xs active:scale-95"
                              title="Read Newsletter Online"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Read</span>
                            </button>
                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="inline-flex items-center justify-center h-8 w-8 rounded-xl text-slate-500 hover:text-[#002147] hover:bg-slate-100 border border-slate-200 transition-colors"
                              title="Download PDF"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Processing</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="bg-slate-50/60 border-t border-slate-200/80 px-6 py-3 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>
                Showing <strong className="text-slate-700">{filteredNewsletters.length}</strong> of{" "}
                <strong className="text-slate-700">{newsletters.length}</strong> issues
              </span>
              <span className="text-[11px] text-slate-400">
                The St. Ann&apos;s Chronicle • Monthly Institution Publications
              </span>
            </div>
          </div>
        ) : (
          /* =======================================================
             CLEAN & LIGHT GRID CARDS (Optional View)
             ======================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[1920px]:grid-cols-6 gap-5">
            {filteredNewsletters.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/60">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {item.month}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.academicYear}
                    </span>
                  </div>

                  <div className="h-10 w-10 rounded-xl bg-[#002147]/5 border border-[#002147]/10 flex items-center justify-center text-[#002147] mb-3 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                    <Newspaper className="h-5 w-5" />
                  </div>

                  <h3 className="font-outfit text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed">
                    Official monthly issue for campus events and achievements.
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2">
                  {item.pdfUrl ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePdfModal({
                            title: item.title,
                            pdfUrl: item.pdfUrl!,
                          })
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#002147]/5 hover:bg-[#002147] hover:text-white text-[#002147] py-2 text-xs font-bold border border-[#002147]/15 transition-all"
                      >
                        <Eye className="h-3.5 w-3.5" /> Read
                      </button>
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors shrink-0"
                        title="Download PDF"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Processing</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF View Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-[#002147] px-5 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Newspaper className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-outfit text-sm sm:text-base font-bold text-white leading-tight">
                    {activePdfModal.title}
                  </h3>
                  <p className="font-sans text-[11px] text-slate-300 font-normal">
                    St. Ann&apos;s College for Women • The St. Ann&apos;s Chronicle
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activePdfModal.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActivePdfModal(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close reader"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Body iframe */}
            <div className="flex-1 w-full bg-slate-100 relative">
              <iframe
                src={`${activePdfModal.pdfUrl}#toolbar=1`}
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
