"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Phone,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Eye,
} from "lucide-react";
import fallbackData from "@/components/announcements-data.json";

export interface AnnouncementItem {
  id: string;
  text: string;
  link?: string;
  dotColor?: "sky" | "amber" | "emerald" | "rose" | "purple";
  isActive: boolean;
}

export interface PhoneNumberItem {
  label: string;
  number: string;
}

export interface AnnouncementTickerData {
  enabled: boolean;
  badgeText: string;
  speedSeconds: number;
  phoneNumbers: PhoneNumberItem[];
  announcements: AnnouncementItem[];
}

export function AnnouncementTickerManager() {
  const [data, setData] = useState<AnnouncementTickerData>(fallbackData as AnnouncementTickerData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: string; text: string }>({ type: "", text: "" });

  const fetchData = async () => {
    setLoading(true);
    setStatusMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin/announcements");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err: any) {
      console.error("Error loading announcements:", err);
      setStatusMsg({ type: "error", text: "Could not load latest announcements from database." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatusMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      if (json.success) {
        setStatusMsg({ type: "success", text: "Announcements & Ticker settings updated successfully!" });
        setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
      } else {
        throw new Error(json.error || "Failed to save announcements");
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save announcements." });
    } finally {
      setSaving(false);
    }
  };

  const handleAddAnnouncement = () => {
    const newItem: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      text: "",
      link: "",
      dotColor: "sky",
      isActive: true,
    };
    setData((prev) => ({
      ...prev,
      announcements: [...prev.announcements, newItem],
    }));
  };

  const handleRemoveAnnouncement = (id: string) => {
    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== id),
    }));
  };

  const handleUpdateAnnouncement = (id: string, field: keyof AnnouncementItem, value: any) => {
    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.announcements.length) return;
    const list = [...data.announcements];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    setData((prev) => ({ ...prev, announcements: list }));
  };

  const handleAddPhone = () => {
    setData((prev) => ({
      ...prev,
      phoneNumbers: [...(prev.phoneNumbers || []), { label: "Call Us", number: "" }],
    }));
  };

  const handleRemovePhone = (index: number) => {
    setData((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
    }));
  };

  const handleUpdatePhone = (index: number, field: keyof PhoneNumberItem, value: string) => {
    setData((prev) => {
      const list = [...prev.phoneNumbers];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, phoneNumbers: list };
    });
  };

  const getDotClass = (color?: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-400 shadow-amber-400/50";
      case "emerald":
        return "bg-emerald-400 shadow-emerald-400/50";
      case "rose":
        return "bg-rose-400 shadow-rose-400/50";
      case "purple":
        return "bg-purple-400 shadow-purple-400/50";
      case "sky":
      default:
        return "bg-sky-400 shadow-sky-400/50";
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#002147]" />
        <p className="text-sm font-bold text-slate-600">Loading website announcement settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Header Toolbar Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#002147] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            WEBSITE HEADER CONTROLS
          </span>
          <h2 className="font-outfit text-2xl md:text-3xl font-black text-[#002147] tracking-tight mt-1 flex items-center gap-2">
            <Bell className="w-7 h-7 text-amber-500" />
            <span>Top Announcement Ticker Bar</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Configure the live scrolling announcement ticker bar displayed at the very top of all website pages, emergency alerts, and helpline telephone numbers.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Reload from server"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002147] hover:bg-[#00387a] text-white font-black text-xs md:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Save className="h-4 w-4 text-amber-400" />}
            <span>{saving ? "Saving Changes..." : "Save to Database"}</span>
          </button>
        </div>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between gap-3 shadow-xs ${
            statusMsg.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-900"
              : "bg-red-50 border border-red-300 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMsg.text}</span>
          </div>
        </div>
      )}

      {/* ── LIVE INTERACTIVE PREVIEW ── */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">Live Header Preview</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            {data.enabled ? "Ticker is Live on Website" : "Ticker is Disabled / Hidden"}
          </span>
        </div>

        {data.enabled ? (
          <div
            className="w-full h-10 border border-white/10 rounded-xl overflow-hidden px-4 flex items-center justify-between text-xs"
            style={{ backgroundColor: "#000080" }}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shrink-0">
                {data.badgeText || "ANNOUNCEMENTS"}
              </span>
              <div className="truncate text-slate-200 text-xs font-medium flex items-center gap-4">
                {data.announcements
                  .filter((a) => a.isActive)
                  .map((a, i) => (
                    <span key={a.id || i} className="inline-flex items-center gap-2 shrink-0">
                      <span>{a.text}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${getDotClass(a.dotColor)} shrink-0`} />
                    </span>
                  ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300 shrink-0 text-[11px] font-semibold hidden sm:flex">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{data.phoneNumbers?.[0]?.number || "0863-2236470"}</span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-800/80 text-center text-xs text-slate-400 italic">
            Ticker is currently switched OFF. Enable it below to show on the website.
          </div>
        )}
      </div>

      {/* ── GENERAL SETTINGS: TOGGLE, BADGE & SPEED ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="font-outfit text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#002147]" />
          <span>General Ticker Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
          {/* Enable / Disable Ticker Bar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800">Announcement Bar</p>
              <p className="text-[11px] text-slate-500">Show ticker at top of website</p>
            </div>
            <button
              type="button"
              onClick={() => setData((prev) => ({ ...prev, enabled: !prev.enabled }))}
              className={`p-1 rounded-xl transition-colors cursor-pointer ${
                data.enabled ? "text-emerald-600 hover:text-emerald-700" : "text-slate-400 hover:text-slate-500"
              }`}
            >
              {data.enabled ? <ToggleRight className="w-9 h-9" /> : <ToggleLeft className="w-9 h-9" />}
            </button>
          </div>

          {/* Badge Text */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Badge Label Text
            </label>
            <input
              type="text"
              value={data.badgeText}
              onChange={(e) => setData((prev) => ({ ...prev, badgeText: e.target.value }))}
              placeholder="ANNOUNCEMENTS"
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
            />
          </div>

          {/* Scrolling Speed */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ticker Loop Speed ({data.speedSeconds || 32}s)
            </label>
            <input
              type="range"
              min="15"
              max="60"
              step="1"
              value={data.speedSeconds || 32}
              onChange={(e) => setData((prev) => ({ ...prev, speedSeconds: Number(e.target.value) }))}
              className="w-full cursor-pointer accent-[#002147]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
              <span>Fast (15s)</span>
              <span>Normal (32s)</span>
              <span>Slow (60s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HELPLINE PHONE NUMBERS ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <h3 className="font-outfit text-base font-bold text-slate-900">Header Helpline Phone Numbers</h3>
          </div>
          <button
            type="button"
            onClick={handleAddPhone}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Phone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.phoneNumbers?.map((p, idx) => (
            <div key={idx} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-28 shrink-0">
                <input
                  type="text"
                  placeholder="e.g. Call Us"
                  value={p.label}
                  onChange={(e) => handleUpdatePhone(idx, "label", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-bold"
                />
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="e.g. 0863-2236470"
                  value={p.number}
                  onChange={(e) => handleUpdatePhone(idx, "number", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-bold text-[#002147]"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemovePhone(idx)}
                className="text-slate-400 hover:text-rose-600 p-1.5 cursor-pointer"
                title="Remove Phone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKER ANNOUNCEMENTS LIST ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-outfit text-base font-bold text-slate-900">Announcement Messages</h3>
            <p className="text-xs text-slate-500">Each announcement will scroll across the header banner in order.</p>
          </div>
          <button
            type="button"
            onClick={handleAddAnnouncement}
            className="px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#00387a] text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Announcement</span>
          </button>
        </div>

        {data.announcements.length === 0 ? (
          <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
            <p className="text-xs text-slate-500 font-semibold mb-2">No announcements configured yet.</p>
            <button
              type="button"
              onClick={handleAddAnnouncement}
              className="px-4 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              + Add First Announcement
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.announcements.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`p-4 rounded-2xl border transition-all space-y-3 ${
                  item.isActive ? "bg-white border-slate-200 shadow-2xs" : "bg-slate-50/70 border-slate-200 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUpdateAnnouncement(item.id, "isActive", !item.isActive)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        item.isActive
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-200 text-slate-600 border-slate-300"
                      }`}
                    >
                      {item.isActive ? "Active on Ticker" : "Hidden / Inactive"}
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 hover:text-[#002147] disabled:opacity-20 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === data.announcements.length - 1}
                      className="p-1 hover:text-[#002147] disabled:opacity-20 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveAnnouncement(item.id)}
                      className="p-1 hover:text-rose-600 ml-1 cursor-pointer"
                      title="Delete Announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Announcement Text Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Announcement Message Text *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Admissions are officially open for UG & PG programs for 2026-27."
                    value={item.text}
                    onChange={(e) => handleUpdateAnnouncement(item.id, "text", e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 focus:bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  {/* Optional Target Link */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      Optional Target Link (Page URL or External)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /admissions or https://cets.apsche.ap.gov.in"
                      value={item.link || ""}
                      onChange={(e) => handleUpdateAnnouncement(item.id, "link", e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 focus:bg-white rounded-lg border border-slate-200 text-xs font-medium"
                    />
                  </div>

                  {/* Dot Color */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      Separator Bullet Dot Color
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { label: "Sky", value: "sky", bg: "bg-sky-400" },
                        { label: "Amber", value: "amber", bg: "bg-amber-400" },
                        { label: "Emerald", value: "emerald", bg: "bg-emerald-400" },
                        { label: "Rose", value: "rose", bg: "bg-rose-400" },
                        { label: "Purple", value: "purple", bg: "bg-purple-400" },
                      ].map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() => handleUpdateAnnouncement(item.id, "dotColor", col.value)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            item.dotColor === col.value
                              ? "bg-slate-900 text-white ring-2 ring-slate-900"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${col.bg}`} />
                          <span>{col.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementTickerManager;
