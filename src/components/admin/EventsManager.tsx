"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  Info,
  RefreshCw,
} from "lucide-react";
import { getEventLifecycle } from "@/lib/events";

interface EventItem {
  _id?: string;
  title: string;
  date?: string;
  startDate?: string;
  eventDate?: string;
  eventEndDate?: string;
  organizer?: string;
  location?: string;
  description?: string;
  link?: string;
  linkLabel?: string;
  pdfUrl?: string;
  bannerUrl?: string;
  isNew?: boolean;
  displayOrder?: number;
}

export default function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "conducted">("all");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Modal State for Delete Confirmation
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Success Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  // 1. Fetch Events from API
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        throw new Error(data.error || "Failed to load events");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load events from Sanity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Form State
  const [formData, setFormData] = useState<EventItem>({
    title: "",
    date: "",
    startDate: "",
    eventDate: "",
    eventEndDate: "",
    organizer: "",
    location: "",
    description: "",
    link: "",
    linkLabel: "",
    isNew: false,
    displayOrder: 10,
  });

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      date: "",
      startDate: new Date().toISOString().split("T")[0],
      eventDate: new Date().toISOString().split("T")[0],
      eventEndDate: "",
      organizer: "",
      location: "",
      description: "",
      link: "",
      linkLabel: "",
      isNew: true,
      displayOrder: 10,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: EventItem) => {
    setEditingEvent(evt);
    setFormData({
      _id: evt._id,
      title: evt.title || "",
      date: evt.date || "",
      startDate: evt.startDate || "",
      eventDate: evt.eventDate || "",
      eventEndDate: evt.eventEndDate || "",
      organizer: evt.organizer || "",
      location: evt.location || "",
      description: evt.description || "",
      link: evt.link || "",
      linkLabel: evt.linkLabel || "",
      isNew: evt.isNew || false,
      displayOrder: evt.displayOrder || 10,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Save Event (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError("Please enter an event title.");
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      const payload = {
        event: {
          ...formData,
          _id: editingEvent?._id || undefined,
        },
      };

      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save event.");
      }

      showNotification(
        editingEvent ? "Event updated successfully in Sanity!" : "New event created successfully in Sanity!"
      );
      setIsModalOpen(false);
      fetchEvents();
    } catch (err: any) {
      setFormError(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Delete Event
  const handleDelete = async () => {
    if (!eventToDelete?._id) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(eventToDelete._id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete event.");
      }

      showNotification("Event deleted permanently from Sanity & the website.");
      setEventToDelete(null);
      fetchEvents();
    } catch (err: any) {
      alert(`Delete error: ${err.message || "Failed to delete event"}`);
    } finally {
      setDeleting(false);
    }
  };

  // Filtered Events List
  const filteredEvents = events.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.organizer?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q);

    const lifecycle = getEventLifecycle(item);
    const isUpcoming = lifecycle.status === "upcoming";

    if (statusFilter === "upcoming") return matchesSearch && isUpcoming;
    if (statusFilter === "conducted") return matchesSearch && !isUpcoming;
    return matchesSearch;
  });

  const totalUpcoming = events.filter((e) => getEventLifecycle(e).status === "upcoming").length;
  const totalConducted = events.length - totalUpcoming;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-600 text-white py-3 px-5 rounded-2xl shadow-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-md flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              Live Website Management
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Events &amp; Activities Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Create, update, or remove campus workshops, celebrations, and academic conferences.
            All modifications sync directly with Sanity and are immediately reflected on the Home Page and Events Calendar.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={fetchEvents}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            title="Refresh events from Sanity"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#002147] to-[#0a3d78] hover:from-[#002d5f] hover:to-[#0f4d96] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#002147]/20 flex items-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sky-300" />
            <span>Add New Event</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Recorded</p>
            <p className="text-xl font-black text-slate-900 leading-none mt-1">{events.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Scheduled</p>
            <p className="text-xl font-black text-emerald-700 leading-none mt-1">{totalUpcoming}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conducted Events</p>
            <p className="text-xl font-black text-slate-800 leading-none mt-1">{totalConducted}</p>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events, organizers, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "all" ? "bg-[#002147] text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("upcoming")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "upcoming" ? "bg-emerald-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Upcoming ({totalUpcoming})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("conducted")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "conducted" ? "bg-indigo-600 text-white shadow-2xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Conducted ({totalConducted})
          </button>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-8 h-8 border-3 border-[#002147] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-500">Loading events from Sanity...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center text-rose-700">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-rose-600" />
          <p className="text-xs font-bold">{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-3 px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
          >
            Retry
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-800">No events match your criteria</h4>
          <p className="text-xs text-slate-400 mt-1">Try clearing your search query or status filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((evt) => {
            const lifecycle = getEventLifecycle(evt);
            const isUpcoming = lifecycle.status === "upcoming";

            return (
              <div
                key={evt._id}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="shrink-0 mt-0.5">
                    {isUpcoming ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Upcoming
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                        Conducted
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {evt.date && (
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          📅 {evt.date}
                        </span>
                      )}
                      {evt.organizer && (
                        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                          <Users className="w-3 h-3 inline mr-1" />
                          {evt.organizer}
                        </span>
                      )}
                      {evt.location && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {evt.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-outfit text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#002147] transition-colors leading-snug">
                      {evt.title}
                    </h3>

                    {evt.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    )}

                    {evt.link && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-sky-600 font-semibold">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="underline truncate">{evt.linkLabel || evt.link}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(evt)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventToDelete(evt)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200/60"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODAL: ADD / EDIT EVENT ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => !saving && setIsModalOpen(false)} />

          <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <Calendar className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-outfit text-base font-bold leading-tight">
                    {editingEvent ? "Edit Campus Event" : "Create New Campus Event"}
                  </h3>
                  <p className="text-[11px] text-sky-200/80">
                    Saves directly to Sanity production dataset
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={saving}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-slate-50/50">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1">
                  Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Symposium on Artificial Intelligence & Ethics"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
              </div>

              {/* Date Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Display Date Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 16 September 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Event Date (Takes Place)
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Start Date (Visible From)
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>
              </div>

              {/* Organizer & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Organized by / Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Department of Computer Science & IQAC"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Main Auditorium Hall"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Event Description / Overview
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide details about the session schedule, chief guests, themes, and student participation guidelines..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
              </div>

              {/* External Registration / Portal Link */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-black text-sky-900 uppercase tracking-wider">
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                  <span>External Portal / Registration Link (Optional)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Link URL (https://...)
                    </label>
                    <input
                      type="url"
                      placeholder="https://forms.gle/..."
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Link Label / Button Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Register for Workshop"
                      value={formData.linkLabel}
                      onChange={(e) => setFormData({ ...formData, linkLabel: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#002147] hover:bg-[#002d5f] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Sanity...</span>
                    </>
                  ) : (
                    <span>{editingEvent ? "Update Event" : "Save Event"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: DELETE CONFIRMATION ── */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => !deleting && setEventToDelete(null)} />

          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 mx-auto">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>

            <h3 className="text-base font-bold text-slate-900 text-center">
              Delete this Event?
            </h3>
            <p className="text-xs text-slate-500 text-center mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-800">&ldquo;{eventToDelete.title}&rdquo;</span>?
              This action will permanently delete the event from Sanity and remove it from the live website.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Event</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
