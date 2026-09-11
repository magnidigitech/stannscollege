"use client";

import React, { useState, useEffect } from "react";
import {
  Users, Building, HeartHandshake, Globe, Network, Briefcase,
  ExternalLink, Save, CheckCircle2, AlertCircle, RefreshCw, Sparkles
} from "lucide-react";

interface FeedbackLinks {
  studentFeedbackFormUrl: string;
  facultyFeedbackFormUrl: string;
  parentFeedbackFormUrl: string;
  alumniFeedbackFormUrl: string;
  communityFeedbackFormUrl: string;
  employerFeedbackFormUrl: string;
}

const DEFAULTS: FeedbackLinks = {
  studentFeedbackFormUrl: "https://forms.gle/n6QfA4roPrqtPWjM8",
  facultyFeedbackFormUrl: "https://www.google.com",
  parentFeedbackFormUrl: "https://www.google.com",
  alumniFeedbackFormUrl: "https://www.google.com",
  communityFeedbackFormUrl: "https://www.google.com",
  employerFeedbackFormUrl: "https://www.google.com",
};

export function StrategicPlanFeedbackManager() {
  const [links, setLinks] = useState<FeedbackLinks>(DEFAULTS);
  const [initialLinks, setInitialLinks] = useState<FeedbackLinks>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/strategic-plan");
        const json = await res.json();
        if (json.success && json.links) {
          setLinks(json.links);
          setInitialLinks(json.links);
        }
      } catch (err: any) {
        console.error("Error fetching feedback links:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, []);

  const handleChange = (key: keyof FeedbackLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
    setSaveSuccess(false);
    setErrorMessage(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage(null);
      setSaveSuccess(false);

      const res = await fetch("/api/admin/strategic-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(links),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save links to Sanity.");
      }

      setInitialLinks(links);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const isDirty = JSON.stringify(links) !== JSON.stringify(initialLinks);

  const FORM_FIELDS: {
    key: keyof FeedbackLinks;
    label: string;
    subLabel: string;
    icon: any;
    placeholder: string;
    accentBg: string;
    accentText: string;
  }[] = [
    {
      key: "studentFeedbackFormUrl",
      label: "a. Student Feedback Form",
      subLabel: "Feedback from students on curriculum, teaching, infrastructure & mentoring",
      icon: Users,
      placeholder: "https://forms.gle/...",
      accentBg: "bg-blue-50 border-blue-200",
      accentText: "text-blue-700",
    },
    {
      key: "facultyFeedbackFormUrl",
      label: "b. Faculty Feedback Form",
      subLabel: "Curriculum planning, resources, infrastructure & institutional support",
      icon: Building,
      placeholder: "https://forms.gle/... or https://www.google.com",
      accentBg: "bg-indigo-50 border-indigo-200",
      accentText: "text-indigo-700",
    },
    {
      key: "parentFeedbackFormUrl",
      label: "c. Parent / Guardian Feedback Form",
      subLabel: "Academic support, communication, facilities & student career guidance",
      icon: HeartHandshake,
      placeholder: "https://forms.gle/... or https://www.google.com",
      accentBg: "bg-purple-50 border-purple-200",
      accentText: "text-purple-700",
    },
    {
      key: "alumniFeedbackFormUrl",
      label: "d. Alumni Feedback Form",
      subLabel: "Curriculum relevance, skill readiness, career development & networking",
      icon: Globe,
      placeholder: "https://forms.gle/... or https://www.google.com",
      accentBg: "bg-sky-50 border-sky-200",
      accentText: "text-sky-700",
    },
    {
      key: "communityFeedbackFormUrl",
      label: "e. Stakeholder / Community Feedback Form",
      subLabel: "Extension activities, social impact, women empowerment & community outreach",
      icon: Network,
      placeholder: "https://forms.gle/... or https://www.google.com",
      accentBg: "bg-emerald-50 border-emerald-200",
      accentText: "text-emerald-700",
    },
    {
      key: "employerFeedbackFormUrl",
      label: "f. Employer Feedback Form",
      subLabel: "Technical competency, communication, professional skills & employability",
      icon: Briefcase,
      placeholder: "https://forms.gle/... or https://www.google.com",
      accentBg: "bg-amber-50 border-amber-200",
      accentText: "text-amber-700",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Stakeholder Feedback Form Links
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                Live in Sanity
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter Google Form or survey links for all 6 stakeholder categories. These links update directly in Sanity CMS and reflect live on the website.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Unsaved Links
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isDirty
                ? "bg-[#002147] text-white hover:bg-blue-900"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            }`}
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving to Sanity...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Links to Sanity</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Success! All 6 feedback form links have been updated in Sanity CMS and are live on the website.</span>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Inputs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {FORM_FIELDS.map((field) => {
          const Icon = field.icon;
          const currentVal = links[field.key];
          const hasValidUrl = currentVal && currentVal.startsWith("http");

          return (
            <div
              key={field.key}
              className="border border-slate-200/90 rounded-2xl p-4.5 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg border ${field.accentBg} ${field.accentText}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-extrabold text-slate-800">
                      {field.label}
                    </span>
                  </div>
                  {hasValidUrl && (
                    <a
                      href={currentVal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
                    >
                      Test <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {field.subLabel}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={currentVal || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 transition-all outline-hidden"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
