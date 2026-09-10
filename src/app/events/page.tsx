"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  FileText,
  Download,
  ExternalLink,
  Search,
  ChevronRight,
  Sparkles,
  Filter,
  Clock,
  ArrowRight,
  Users,
  X,
  CheckCircle2,
  Info,
} from "lucide-react";
import { getEvents } from "@/lib/sanity";
import {
  getEventLifecycle,
  getEventDocuments,
  getEventTimestamp,
  fallbackEventsHistory,
  EventDocument,
} from "@/lib/events";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>(fallbackEventsHistory);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Document popup modal for events with documents and details
  const [activeDocModal, setActiveDocModal] = useState<{
    eventTitle: string;
    eventDate?: string;
    organizer?: string;
    description?: string;
    documents: EventDocument[];
  } | null>(null);

  // In-app PDF Viewer Modal state (opens PDF in a popup modal, not in another tab)
  const [viewingPdfModal, setViewingPdfModal] = useState<{
    title: string;
    url: string;
  } | null>(null);

  // Handler for clicking event details / documents: Always open the contents modal
  const handleEventDocClick = (item: any) => {
    const docs = getEventDocuments(item);

    // Open the contents even if only one PDF
    setActiveDocModal({
      eventTitle: item.title,
      eventDate: item.date || item.eventDate,
      organizer: item.organizer,
      description: item.description,
      documents: docs,
    });
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getEvents();
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(fallbackEventsHistory);
        }
      } catch (e) {
        setEvents(fallbackEventsHistory);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Helper to extract Day, Month, Year
  const parseEventDate = (dateStr: string) => {
    if (!dateStr) return { day: "—", month: "EVENT", year: "2026" };

    // Format like "1–7 September 2026" or "5 September 2026" or "9–10 September 2026"
    const rangeMatch = dateStr.match(/^(\d{1,2}(?:[–-]\d{1,2})?)\s+([A-Za-z]+)\s*(\d{4})?/);
    if (rangeMatch) {
      return {
        day: rangeMatch[1],
        month: rangeMatch[2].slice(0, 3).toUpperCase(),
        year: rangeMatch[3] || "2026",
      };
    }

    // Format like "September 08, 2026"
    const monthFirstMatch = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2}(?:[–-]\d{1,2})?),?\s*(\d{4})?/);
    if (monthFirstMatch) {
      return {
        month: monthFirstMatch[1].slice(0, 3).toUpperCase(),
        day: monthFirstMatch[2],
        year: monthFirstMatch[3] || "2026",
      };
    }

    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      const day = dateObj.getDate().toString().padStart(2, "0");
      const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
      const year = dateObj.getFullYear().toString();
      return { day, month, year };
    }

    return { day: "—", month: "SEP", year: "2026" };
  };

  // Filter events by search query, year, and visibility (startDate)
  const filteredEvents = events.filter((evt) => {
    const lifecycle = getEventLifecycle(evt);
    if (!lifecycle.isVisible) return false;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (evt.title && evt.title.toLowerCase().includes(q)) ||
      (evt.description && evt.description.toLowerCase().includes(q)) ||
      (evt.location && evt.location.toLowerCase().includes(q)) ||
      (evt.organizer && evt.organizer.toLowerCase().includes(q));

    const matchesYear =
      selectedYear === "all" ||
      (evt.date && evt.date.includes(selectedYear));

    return matchesSearch && matchesYear;
  });

  return (
    <div className="w-full bg-slate-50/50 min-h-screen selection:bg-[#002147]/10 selection:text-[#002147]">
      {/* ── Page Hero Banner ── */}
      <section className="relative bg-gradient-to-r from-[#001730] via-[#002147] to-[#0d3b66] text-white py-14 sm:py-18 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-sky-200/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Events &amp; Activities</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-sky-200 uppercase tracking-widest mb-3">
              <Calendar className="h-3.5 w-3.5 text-sky-300" />
              Campus Life &amp; Engagements
            </span>
            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Events &amp; Activities
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-200/90 mt-3 leading-relaxed">
              Explore the complete historical and upcoming calendar of academic conferences, skill workshops, cultural galas, sports meets, and community outreach programs at St. Ann&apos;s College for Women.
            </p>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, workshops, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-600 mr-1">Year:</span>
              {["all", "2026", "2025", "2024"].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedYear === year
                      ? "bg-[#002147] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {year === "all" ? "All Years" : year}
                </button>
              ))}
            </div>
          </div>

          {/* Events Timeline / History Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 border-4 border-[#002147] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading events calendar...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
              <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-outfit text-lg font-bold text-slate-800">No events found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try refining your search terms or filter selection to find relevant records.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* ── 1. UPPER SECTION: Conducted Events & Activities (with View Circular / Report) ── */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#002147]">
                      <CheckCircle2 className="h-5 w-5 text-indigo-700" />
                    </div>
                    <div>
                      <h2 className="font-outfit text-xl sm:text-2xl font-black text-slate-900 leading-none">
                        Conducted Events &amp; Activities
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Proceedings, completed workshop records, and published circulars (latest first)
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                    {filteredEvents.filter((evt) => getEventLifecycle(evt).status !== "upcoming").length} Recorded
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredEvents
                    .filter((evt) => getEventLifecycle(evt).status !== "upcoming")
                    .sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a))
                    .map((evt, idx) => {
                      const { day, month, year } = parseEventDate(evt.date);
                      const lifecycle = getEventLifecycle(evt);
                      const docs = getEventDocuments(evt);

                      return (
                        <div
                          key={evt._id || idx}
                          className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 group"
                        >
                          {/* Date Tile */}
                          <div className="shrink-0 w-20 rounded-2xl overflow-hidden border border-slate-200 bg-white flex flex-col text-center shadow-xs group-hover:border-indigo-300 group-hover:shadow-md transition-all">
                            <span className="bg-gradient-to-r from-[#002147] to-[#0a3d78] text-white font-extrabold text-xs py-1 tracking-wider">
                              {month}
                            </span>
                            <span className="text-2xl font-black text-slate-900 py-1 leading-none">
                              {day}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 pb-1.5 border-t border-slate-100">
                              {year}
                            </span>
                          </div>

                          {/* Content Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {lifecycle.status === "new" && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-300 flex items-center gap-1 shadow-2xs">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  NEW (Recently Completed)
                                </span>
                              )}
                              {evt.organizer && (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                                  <Users className="h-3 w-3 text-indigo-600" />
                                  {evt.organizer}
                                </span>
                              )}
                              {evt.location && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                  <MapPin className="h-3 w-3 text-slate-400" />
                                  {evt.location}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                                <Clock className="h-3 w-3" />
                                {evt.date}
                              </span>
                            </div>

                            <h3 className="font-outfit text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#002147] transition-colors">
                              {evt.title}
                            </h3>

                            {evt.description && (
                              <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                                {evt.description}
                              </p>
                            )}
                          </div>

                          {/* Action Button: "Click for more" */}
                          <button
                            type="button"
                            onClick={() => handleEventDocClick(evt)}
                            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-[#002147] hover:text-white border border-indigo-200 text-[#002147] font-bold text-xs shadow-xs transition-all active:scale-95 group/btn cursor-pointer"
                            title="Click for more"
                          >
                            <FileText className="h-4 w-4 text-indigo-600 group-hover/btn:text-white transition-colors" />
                            <span>Click for more</span>
                            {docs.length > 1 ? (
                              <span className="px-1.5 py-0.2 rounded-full bg-indigo-200 group-hover/btn:bg-white/20 text-indigo-900 group-hover/btn:text-white text-[10px] font-black">
                                {docs.length}
                              </span>
                            ) : (
                              <ExternalLink className="h-3.5 w-3.5 text-indigo-600 group-hover/btn:text-white transition-colors" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* ── 2. BOTTOM SECTION: Upcoming Events & Activities ── */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-emerald-200">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="font-outfit text-xl sm:text-2xl font-black text-slate-900 leading-none">
                        Upcoming Events &amp; Activities
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Forthcoming academic and cultural schedules (chronological, oldest date first)
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {filteredEvents.filter((evt) => getEventLifecycle(evt).status === "upcoming").length} Scheduled
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredEvents
                    .filter((evt) => getEventLifecycle(evt).status === "upcoming")
                    .sort((a, b) => getEventTimestamp(a) - getEventTimestamp(b))
                    .map((evt, idx) => {
                      const { day, month, year } = parseEventDate(evt.date);
                      const lifecycle = getEventLifecycle(evt);
                      const docs = getEventDocuments(evt);

                      return (
                        <div
                          key={evt._id || idx}
                          className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 group"
                        >
                          {/* Date Tile */}
                          <div className="shrink-0 w-20 rounded-2xl overflow-hidden border border-slate-200 bg-white flex flex-col text-center shadow-xs group-hover:border-emerald-300 group-hover:shadow-md transition-all">
                            <span className="bg-gradient-to-r from-[#002147] to-[#0a3d78] text-white font-extrabold text-xs py-1 tracking-wider">
                              {month}
                            </span>
                            <span className="text-2xl font-black text-slate-900 py-1 leading-none">
                              {day}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 pb-1.5 border-t border-slate-100">
                              {year}
                            </span>
                          </div>

                          {/* Content Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {evt.organizer && (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                                  <Users className="h-3 w-3 text-indigo-600" />
                                  {evt.organizer}
                                </span>
                              )}
                              {evt.location && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                  <MapPin className="h-3 w-3 text-slate-400" />
                                  {evt.location}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                                <Clock className="h-3 w-3" />
                                {evt.date}
                              </span>
                            </div>

                            <h3 className="font-outfit text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#002147] transition-colors">
                              {evt.title}
                            </h3>

                            {evt.description && (
                              <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                                {evt.description}
                              </p>
                            )}
                          </div>

                          {/* Action Button: "Click for more" */}
                          <button
                            type="button"
                            onClick={() => handleEventDocClick(evt)}
                            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-50 hover:bg-[#002147] hover:text-white border border-emerald-200 text-emerald-900 font-bold text-xs shadow-xs transition-all active:scale-95 group/btn cursor-pointer"
                            title="Click for more"
                          >
                            <FileText className="h-4 w-4 text-emerald-600 group-hover/btn:text-white transition-colors" />
                            <span>Click for more</span>
                            {docs.length > 1 ? (
                              <span className="px-1.5 py-0.2 rounded-full bg-emerald-200 group-hover/btn:bg-white/20 text-emerald-950 group-hover/btn:text-white text-[10px] font-black">
                                {docs.length}
                              </span>
                            ) : (
                              <ExternalLink className="h-3.5 w-3.5 text-emerald-600 group-hover/btn:text-white transition-colors" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------
          DOCUMENT POPUP MODAL (For Events Page)
          When >1 doc: popup showing list of documents.
          ---------------------------------------------------- */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveDocModal(null)}
          />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <FileText className="h-5 w-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold leading-tight">
                    Event Documents &amp; Details
                  </h3>
                  <p className="text-[11px] text-sky-200/80 mt-0.5">
                    St. Ann&apos;s College for Women
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDocModal(null)}
                className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50/50">
              {/* Event Info Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <h4 className="font-outfit text-base font-bold text-slate-900 leading-snug">
                  {activeDocModal.eventTitle}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600">
                  {activeDocModal.eventDate && (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      {activeDocModal.eventDate}
                    </span>
                  )}
                  {activeDocModal.organizer && (
                    <span className="inline-flex items-center gap-1 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                      <Users className="h-3.5 w-3.5 text-indigo-500" />
                      {activeDocModal.organizer}
                    </span>
                  )}
                </div>

                {/* Styled Event Overview / Description Callout */}
                {activeDocModal.description && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      <Info className="h-3 w-3 text-indigo-500" />
                      <span>Event Overview</span>
                    </div>
                    <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/70 border-l-4 border-l-[#002147] text-xs text-slate-700 leading-relaxed shadow-2xs">
                      {activeDocModal.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Documents List */}
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                  <span>Available Documents ({activeDocModal.documents.length})</span>
                  <span className="text-[10px] font-bold text-indigo-600 lowercase tracking-normal">
                    Click to view / download
                  </span>
                </h5>

                {activeDocModal.documents.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeDocModal.documents.map((doc, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() =>
                          setViewingPdfModal({
                            title: doc.title || doc.originalFilename || `Event Document ${idx + 1}`,
                            url: doc.url,
                          })
                        }
                        className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all group/doc cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 group-hover/doc:bg-rose-100 transition-colors">
                            <FileText className="h-5 w-5 text-rose-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover/doc:text-[#002147] truncate">
                              {doc.title || `Document ${idx + 1}`}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {doc.originalFilename || "Click to view PDF document"}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 group-hover/doc:bg-[#002147] text-white font-bold text-xs shadow-xs transition-colors">
                          <span>View PDF</span>
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">No Documents Attached Yet</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                      The official circular and brochure for this event will be published shortly by the organizing department.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveDocModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          IN-APP PDF VIEWER MODAL (Opens PDF in modal, not new tab)
          ---------------------------------------------------- */}
      {viewingPdfModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setViewingPdfModal(null)}
          />

          <div className="relative z-10 w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Top Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white shrink-0">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                  <FileText className="h-4 w-4 text-sky-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-outfit text-sm sm:text-base font-bold truncate">
                    {viewingPdfModal.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-sky-200/80">
                    St. Ann&apos;s College for Women • PDF Viewer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={viewingPdfModal.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/15"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setViewingPdfModal(null)}
                  className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
                  aria-label="Close PDF Viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body with Iframe */}
            <div className="flex-1 w-full h-full bg-slate-100 relative">
              <iframe
                src={`${viewingPdfModal.url}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={viewingPdfModal.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
