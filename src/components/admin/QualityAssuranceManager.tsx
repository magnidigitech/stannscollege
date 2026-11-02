"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileText,
  Award,
  Users,
  MessageSquare,
  BarChart3,
  Calendar,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  FolderPlus,
  Files,
  X,
  Copy,
  Info
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import {
  QualityAssuranceData,
  AqarYearReport,
  NaacCycleReport,
  Criterion,
  Section,
  Metric,
  DocumentEntry,
  SubDocument,
  SteeringCommitteeMember,
  CriterionConvenorGroup,
  QualityMeetingDoc,
  QualityAuditDoc,
  QualityFeedbackDoc,
  QualitySurveyDoc
} from "@/types/quality-assurance";

export function QualityAssuranceManager() {
  const [data, setData] = useState<QualityAssuranceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active top-level management tab
  const [activeTab, setActiveTab] = useState<"aqar" | "naac" | "iqac" | "audits" | "feedback">("aqar");

  // Selection states
  const [selectedAqarYear, setSelectedAqarYear] = useState<string>("2023-2024");
  const [selectedNaacCycle, setSelectedNaacCycle] = useState<string>("cycle-1");
  const [selectedCriterionId, setSelectedCriterionId] = useState<number>(1);

  // Modal states for creating/editing items
  const [addYearModalOpen, setAddYearModalOpen] = useState(false);
  const [addCycleModalOpen, setAddCycleModalOpen] = useState(false);
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalPayload, setModalPayload] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  // PDF Preview
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  // Expanded sections tracking
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["1.1", "2.1", "3.1", "4.1", "5.1", "6.1", "7.1"]));

  const toggleSection = (secKey: string, secNum?: string) => {
    const next = new Set(expandedSections);
    const isOpen = next.has(secKey) || (secNum ? next.has(secNum) : false);
    if (isOpen) {
      next.delete(secKey);
      if (secNum) next.delete(secNum);
    } else {
      next.add(secKey);
    }
    setExpandedSections(next);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/quality-assurance");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        if (json.data.aqarReports?.length) {
          setSelectedAqarYear(json.data.aqarReports[0].year);
        }
        if (json.data.naacCycles?.length) {
          setSelectedNaacCycle(json.data.naacCycles[0].cycleId);
        }
      } else {
        setError(json.error || "Failed to load Quality Assurance data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading Quality Assurance data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/quality-assurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save records.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload file helper via /api/admin/upload
  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", file.type.startsWith("image/") ? "image" : "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      } else {
        alert(json.error || "Upload failed.");
        return null;
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // =========================================================================
  // AQAR SPECIFIC HELPERS
  // =========================================================================
  const currentAqarReport = data?.aqarReports?.find((r) => r.year === selectedAqarYear);

  const handleAddAqarYear = (newYear: string, label: string, status: "Published" | "In Progress" | "Draft", cloneFromYear?: string) => {
    if (!data) return;
    if (data.aqarReports.some((r) => r.year === newYear)) {
      alert("An AQAR report for this Academic Year already exists.");
      return;
    }

    let criteriaToUse: Criterion[] = [];
    if (cloneFromYear) {
      const source = data.aqarReports.find((r) => r.year === cloneFromYear);
      if (source) {
        criteriaToUse = JSON.parse(JSON.stringify(source.criteria));
      }
    }

    if (criteriaToUse.length === 0 && data.aqarReports[0]) {
      // Empty template
      criteriaToUse = data.aqarReports[0].criteria.map((c) => ({
        id: c.id,
        title: c.title,
        sections: c.sections.map((s) => ({
          number: s.number,
          title: s.title,
          metrics: s.metrics.map((m) => ({
            number: m.number,
            title: m.title,
            documents: []
          }))
        }))
      }));
    }

    const newReport: AqarYearReport = {
      year: newYear,
      label: label || `AQAR ${newYear}`,
      status,
      fullReportPdfUrl: "",
      criteria: criteriaToUse
    };

    const updated = {
      ...data,
      aqarReports: [newReport, ...data.aqarReports]
    };

    setData(updated);
    setSelectedAqarYear(newYear);
    setAddYearModalOpen(false);
  };

  const handleDeleteAqarYear = (yearToDelete: string) => {
    if (!data) return;
    if (data.aqarReports.length <= 1) {
      alert("Cannot delete the only remaining AQAR report.");
      return;
    }
    if (!confirm(`Are you sure you want to delete AQAR report for academic year ${yearToDelete}? This action will remove all associated criteria data.`)) {
      return;
    }

    const filtered = data.aqarReports.filter((r) => r.year !== yearToDelete);
    setData({
      ...data,
      aqarReports: filtered
    });
    setSelectedAqarYear(filtered[0].year);
  };

  // =========================================================================
  // NAAC SPECIFIC HELPERS
  // =========================================================================
  const currentNaacCycle = data?.naacCycles?.find((c) => c.cycleId === selectedNaacCycle);

  const handleAddNaacCycle = (cycleId: string, cycleName: string, grade: string, status: "Accredited" | "In Progress" | "Upcoming", validity: string) => {
    if (!data) return;
    if (data.naacCycles.some((c) => c.cycleId === cycleId)) {
      alert("A NAAC Cycle with this ID already exists.");
      return;
    }

    // Use cycle-1 criteria structure as template
    const template = data.naacCycles[0]?.criteria?.map((c) => ({
      id: c.id,
      title: c.title,
      sections: c.sections.map((s) => ({
        number: s.number,
        title: s.title,
        metrics: s.metrics.map((m) => ({
          number: m.number,
          title: m.title,
          documents: []
        }))
      }))
    })) || [];

    const newCycle: NaacCycleReport = {
      cycleId,
      cycleName,
      grade,
      status,
      validity,
      ssrPdfUrl: "",
      certificatePdfUrl: "",
      criteria: template
    };

    const updated = {
      ...data,
      naacCycles: [...data.naacCycles, newCycle]
    };

    setData(updated);
    setSelectedNaacCycle(cycleId);
    setAddCycleModalOpen(false);
  };

  const handleDeleteNaacCycle = (cycleId: string) => {
    if (!data) return;
    if (data.naacCycles.length <= 1) {
      alert("Cannot delete the only remaining NAAC cycle.");
      return;
    }
    if (!confirm(`Are you sure you want to delete NAAC cycle '${cycleId}'?`)) return;

    const filtered = data.naacCycles.filter((c) => c.cycleId !== cycleId);
    setData({
      ...data,
      naacCycles: filtered
    });
    setSelectedNaacCycle(filtered[0].cycleId);
  };

  // =========================================================================
  // METRIC & DOCUMENT MUTATIONS (for active AQAR or NAAC)
  // =========================================================================
  const getActiveCriteriaList = (): Criterion[] => {
    if (activeTab === "aqar") return currentAqarReport?.criteria || [];
    if (activeTab === "naac") return currentNaacCycle?.criteria || [];
    return [];
  };

  const updateActiveCriteriaList = (newCriteria: Criterion[]) => {
    if (!data) return;
    if (activeTab === "aqar") {
      const updatedReports = data.aqarReports.map((r) =>
        r.year === selectedAqarYear ? { ...r, criteria: newCriteria } : r
      );
      setData({ ...data, aqarReports: updatedReports });
    } else if (activeTab === "naac") {
      const updatedCycles = data.naacCycles.map((c) =>
        c.cycleId === selectedNaacCycle ? { ...c, criteria: newCriteria } : c
      );
      setData({ ...data, naacCycles: updatedCycles });
    }
  };

  // Add Document to Metric
  const handleAddDocumentToMetric = (critId: number, secNum: string, metricNum: string, label: string, docUrl: string) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              return {
                ...m,
                documents: [
                  ...m.documents,
                  {
                    label,
                    documentUrl: docUrl,
                    subDocuments: [],
                    _key: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
                  }
                ]
              };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  // Add SubDocument to Document
  const handleAddSubDocument = (critId: number, secNum: string, metricNum: string, docIndex: number, subDoc: SubDocument) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              const docs = [...m.documents];
              const targetDoc = docs[docIndex];
              if (!targetDoc) return m;
              docs[docIndex] = {
                ...targetDoc,
                subDocuments: [...(targetDoc.subDocuments || []), { ...subDoc, _key: `sub_${Date.now()}` }]
              };
              return { ...m, documents: docs };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  // Delete Document from Metric
  const handleDeleteDocument = (critId: number, secNum: string, metricNum: string, docIndex: number) => {
    if (!confirm("Are you sure you want to remove this document entry?")) return;
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              return {
                ...m,
                documents: m.documents.filter((_, idx) => idx !== docIndex)
              };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  // Delete SubDocument
  const handleDeleteSubDocument = (critId: number, secNum: string, metricNum: string, docIndex: number, subIndex: number) => {
    const criteria = getActiveCriteriaList();
    const updated = criteria.map((c) => {
      if (c.id !== critId) return c;
      return {
        ...c,
        sections: c.sections.map((s) => {
          if (s.number !== secNum) return s;
          return {
            ...s,
            metrics: s.metrics.map((m) => {
              if (m.number !== metricNum) return m;
              const docs = [...m.documents];
              const targetDoc = docs[docIndex];
              if (!targetDoc) return m;
              docs[docIndex] = {
                ...targetDoc,
                subDocuments: (targetDoc.subDocuments || []).filter((_, sIdx) => sIdx !== subIndex)
              };
              return { ...m, documents: docs };
            })
          };
        })
      };
    });
    updateActiveCriteriaList(updated);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 text-[#002147] animate-spin" />
        <p className="text-sm font-bold text-slate-500">Loading Quality Assurance Portal Data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-3xl text-red-700 flex items-center gap-3">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <p className="font-semibold text-sm">{error || "Could not load data."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-sans select-none">
      {/* Top Banner Toolbar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-8 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase mb-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Quality Assurance &amp; Accreditation Management
            </div>
            <h2 className="font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Quality Assurance &amp; IQAC Manager
            </h2>
            <p className="mt-1 text-indigo-100/80 text-xs md:text-sm max-w-2xl font-normal leading-relaxed">
              Full administrative control for AQAR reports by academic year, NAAC accreditation cycles, IQAC steering committees, statutory audits, and stakeholder feedback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/quality-assurance/iqac"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Public View
            </a>
            <button
              onClick={fetchData}
              disabled={loading || saving}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 active:scale-95"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving Changes..." : "Save to Sanity & Database"}
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Check className="h-4 w-4" /> All Quality Assurance changes saved successfully!
          </div>
        )}
      </div>

      {/* Main Module Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/60 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("aqar")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "aqar"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <FileText className="h-4 w-4" /> AQAR Reports ({data.aqarReports?.length || 0} Years)
        </button>

        <button
          onClick={() => setActiveTab("naac")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "naac"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> NAAC Accreditation ({data.naacCycles?.length || 0} Cycles)
        </button>

        <button
          onClick={() => setActiveTab("iqac")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "iqac"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Users className="h-4 w-4" /> Steering Committee &amp; Convenors
        </button>

        <button
          onClick={() => setActiveTab("audits")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "audits"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Award className="h-4 w-4" /> Audits &amp; Meetings
        </button>

        <button
          onClick={() => setActiveTab("feedback")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${
            activeTab === "feedback"
              ? "bg-[#002147] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Feedback &amp; Surveys
        </button>
      </div>

      {/* =========================================================================
          TAB 1: AQAR REPORTS MANAGEMENT
      ========================================================================= */}
      {activeTab === "aqar" && (
        <div className="flex flex-col gap-6">
          {/* Top Selection & Group Add Toolbar */}
          <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm shrink-0">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select AQAR Academic Year
                </label>
                <div className="relative mt-1">
                  <select
                    value={selectedAqarYear}
                    onChange={(e) => setSelectedAqarYear(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pr-10 text-sm font-black text-slate-800 cursor-pointer focus:outline-none focus:border-[#002147]"
                  >
                    {data.aqarReports?.map((r) => (
                      <option key={r.year} value={r.year}>
                        {r.label} ({r.status})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAddYearModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all border border-indigo-200/60"
              >
                <FolderPlus className="h-4 w-4" /> + Add New Academic AQAR Report
              </button>

              <button
                onClick={() => handleDeleteAqarYear(selectedAqarYear)}
                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all border border-rose-200/60"
                title="Delete This Academic Year Report"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Current Year Details & Full Report PDF Card */}
          {currentAqarReport && (
            <div className="bg-slate-50 border border-slate-200/70 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-outfit text-base font-black text-slate-800">
                    {currentAqarReport.label}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    currentAqarReport.status === "Published" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {currentAqarReport.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Full Report Document: {currentAqarReport.fullReportPdfUrl || "None uploaded"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer shadow-2xs">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Full PDF</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await handleFileUpload(file);
                      if (url) {
                        const updated = data.aqarReports.map((r) =>
                          r.year === selectedAqarYear ? { ...r, fullReportPdfUrl: url } : r
                        );
                        setData({ ...data, aqarReports: updated });
                      }
                    }}
                  />
                </label>
                {currentAqarReport.fullReportPdfUrl && (
                  <button
                    onClick={() => setPreviewPdf({ url: currentAqarReport.fullReportPdfUrl!, title: currentAqarReport.label })}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:text-indigo-800"
                    title="View PDF"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Criteria Pills Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {currentAqarReport?.criteria?.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCriterionId(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  selectedCriterionId === c.id
                    ? "bg-[#002147] text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c.id <= 7 ? `Crit ${c.id}` : c.title.split(" - ")[0]}
              </button>
            ))}
          </div>

          {/* Sections & Metrics Viewer for Selected Criterion */}
          {(() => {
            const crit = currentAqarReport?.criteria?.find((c) => c.id === selectedCriterionId);
            if (!crit) return null;

            return (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <h3 className="font-outfit text-lg md:text-xl font-black text-slate-900">
                    {crit.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">
                    {crit.sections?.length || 0} Key Sections
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {crit.sections?.map((sec, secIdx) => {
                    const sectionKey = `aqar_sec_${crit.id}_${sec.number}_${secIdx}`;
                    const isOpen = expandedSections.has(sectionKey) || expandedSections.has(sec.number);
                    return (
                    <div key={sectionKey} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
                      <div
                        onClick={() => toggleSection(sectionKey, sec.number)}
                        className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between cursor-pointer border-b border-slate-200/60"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">
                            {sec.number}
                          </span>
                          <h4 className="font-outfit text-sm font-bold text-slate-800">
                            {sec.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-semibold">
                            {sec.metrics?.length || 0} Metrics
                          </span>
                          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </div>

                      {isOpen && (
                        <div className="p-4 md:p-6 flex flex-col gap-6 bg-white">
                          {sec.metrics?.map((metric, metricIdx) => {
                            const metricKey = `metric_${sectionKey}_${metric.number}_${metricIdx}`;
                            return (
                            <div key={metricKey} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/30 flex flex-col gap-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                  <span className="text-xs font-black text-indigo-600 block">Metric {metric.number}</span>
                                  <h5 className="font-outfit text-sm font-bold text-slate-800 mt-0.5">{metric.title}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setModalType("add-doc");
                                      setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number });
                                      setEditItemModalOpen(true);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all"
                                  >
                                    <Plus className="h-3.5 w-3.5" /> Add Document
                                  </button>
                                </div>
                              </div>

                              {/* Documents under Metric */}
                              {metric.documents?.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">No supporting documents uploaded for this metric yet.</p>
                              ) : (
                                <div className="flex flex-col gap-3">
                                  {metric.documents?.map((doc, dIdx) => {
                                    const docKey = `doc_${metricKey}_${doc.label || dIdx}_${dIdx}`;
                                    return (
                                    <div key={docKey} className="p-3 bg-white border border-slate-200/60 rounded-xl flex flex-col gap-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-4 w-4 text-slate-400" />
                                          <span className="text-xs font-bold text-slate-800">{doc.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {doc.documentUrl && (
                                            <button
                                              onClick={() => setPreviewPdf({ url: doc.documentUrl, title: doc.label })}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Preview"
                                            >
                                              <Eye className="h-3.5 w-3.5" />
                                            </button>
                                          )}
                                          <button
                                            onClick={() => {
                                              setModalType("add-subdoc");
                                              setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number, docIndex: dIdx });
                                              setEditItemModalOpen(true);
                                            }}
                                            className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 rounded border border-slate-200"
                                          >
                                            + Sub-File
                                          </button>
                                          <button
                                            onClick={() => handleDeleteDocument(crit.id, sec.number, metric.number, dIdx)}
                                            className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                                            title="Delete Document"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Sub-documents table */}
                                      {doc.subDocuments && doc.subDocuments.length > 0 && (
                                        <div className="mt-2 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5">
                                          {doc.subDocuments.map((sub, sIdx) => (
                                            <div key={`sub_${docKey}_${sub.name || sIdx}_${sIdx}`} className="flex items-center justify-between text-xs py-1 px-2 bg-slate-50 rounded-lg">
                                              <span className="font-medium text-slate-700 truncate max-w-[280px]">
                                                {sub.name} {sub.year ? `(${sub.year})` : ""}
                                              </span>
                                              <div className="flex items-center gap-2">
                                                <button
                                                  onClick={() => setPreviewPdf({ url: sub.url, title: sub.name })}
                                                  className="text-indigo-600 hover:underline text-[10px] font-bold"
                                                >
                                                  View
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteSubDocument(crit.id, sec.number, metric.number, dIdx, sIdx)}
                                                  className="text-rose-500 hover:text-rose-700 text-[10px]"
                                                >
                                                  Remove
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          TAB 2: NAAC CYCLES MANAGEMENT
      ========================================================================= */}
      {activeTab === "naac" && (
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select NAAC Accreditation Cycle
                </label>
                <div className="relative mt-1">
                  <select
                    value={selectedNaacCycle}
                    onChange={(e) => setSelectedNaacCycle(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 pr-10 text-sm font-black text-slate-800 cursor-pointer focus:outline-none focus:border-[#002147]"
                  >
                    {data.naacCycles?.map((c) => (
                      <option key={c.cycleId} value={c.cycleId}>
                        {c.cycleName} - {c.grade || c.status}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAddCycleModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all border border-indigo-200/60"
              >
                <FolderPlus className="h-4 w-4" /> + Add New NAAC Cycle
              </button>

              <button
                onClick={() => handleDeleteNaacCycle(selectedNaacCycle)}
                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all border border-rose-200/60"
                title="Delete This NAAC Cycle"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Current Cycle Details */}
          {currentNaacCycle && (
            <div className="bg-slate-50 border border-slate-200/70 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-outfit text-base font-black text-slate-800">
                    {currentNaacCycle.cycleName}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {currentNaacCycle.grade || currentNaacCycle.status}
                  </span>
                  <span className="text-xs text-slate-500">Validity: {currentNaacCycle.validity || "—"}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Accreditation Date: {currentNaacCycle.accreditationDate || "—"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer shadow-2xs">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload SSR PDF</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await handleFileUpload(file);
                      if (url) {
                        const updated = data.naacCycles.map((c) =>
                          c.cycleId === selectedNaacCycle ? { ...c, ssrPdfUrl: url } : c
                        );
                        setData({ ...data, naacCycles: updated });
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Criteria Pills Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {currentNaacCycle?.criteria?.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCriterionId(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  selectedCriterionId === c.id
                    ? "bg-[#002147] text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c.id <= 7 ? `Crit ${c.id}` : c.title.split(" - ")[0]}
              </button>
            ))}
          </div>

          {/* Sections and Metrics for Selected NAAC Criterion */}
          {(() => {
            const crit = currentNaacCycle?.criteria?.find((c) => c.id === selectedCriterionId);
            if (!crit) return null;

            return (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <h3 className="font-outfit text-lg md:text-xl font-black text-slate-900">
                    {crit.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">
                    {crit.sections?.length || 0} Key Sections
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {crit.sections?.map((sec, secIdx) => {
                    const sectionKey = `naac_sec_${crit.id}_${sec.number}_${secIdx}`;
                    const isOpen = expandedSections.has(sectionKey) || expandedSections.has(sec.number);
                    return (
                    <div key={sectionKey} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
                      <div
                        onClick={() => toggleSection(sectionKey, sec.number)}
                        className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between cursor-pointer border-b border-slate-200/60"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black">
                            {sec.number}
                          </span>
                          <h4 className="font-outfit text-sm font-bold text-slate-800">
                            {sec.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-semibold">
                            {sec.metrics?.length || 0} Metrics
                          </span>
                          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </div>

                      {isOpen && (
                        <div className="p-4 md:p-6 flex flex-col gap-6 bg-white">
                          {sec.metrics?.map((metric, metricIdx) => {
                            const metricKey = `metric_${sectionKey}_${metric.number}_${metricIdx}`;
                            return (
                            <div key={metricKey} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/30 flex flex-col gap-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <div>
                                  <span className="text-xs font-black text-indigo-600 block">Metric {metric.number}</span>
                                  <h5 className="font-outfit text-sm font-bold text-slate-800 mt-0.5">{metric.title}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setModalType("add-doc");
                                      setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number });
                                      setEditItemModalOpen(true);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all"
                                  >
                                    <Plus className="h-3.5 w-3.5" /> Add Document
                                  </button>
                                </div>
                              </div>

                              {/* Documents under Metric */}
                              {metric.documents?.length === 0 ? (
                                <p className="text-xs text-slate-400 italic">No supporting documents uploaded for this metric yet.</p>
                              ) : (
                                <div className="flex flex-col gap-3">
                                  {metric.documents?.map((doc, dIdx) => {
                                    const docKey = `doc_${metricKey}_${doc.label || dIdx}_${dIdx}`;
                                    return (
                                    <div key={docKey} className="p-3 bg-white border border-slate-200/60 rounded-xl flex flex-col gap-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-4 w-4 text-slate-400" />
                                          <span className="text-xs font-bold text-slate-800">{doc.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {doc.documentUrl && (
                                            <button
                                              onClick={() => setPreviewPdf({ url: doc.documentUrl, title: doc.label })}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Preview"
                                            >
                                              <Eye className="h-3.5 w-3.5" />
                                            </button>
                                          )}
                                          <button
                                            onClick={() => {
                                              setModalType("add-subdoc");
                                              setModalPayload({ critId: crit.id, secNum: sec.number, metricNum: metric.number, docIndex: dIdx });
                                              setEditItemModalOpen(true);
                                            }}
                                            className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 rounded border border-slate-200"
                                          >
                                            + Sub-File
                                          </button>
                                          <button
                                            onClick={() => handleDeleteDocument(crit.id, sec.number, metric.number, dIdx)}
                                            className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                                            title="Delete Document"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Sub-documents table */}
                                      {doc.subDocuments && doc.subDocuments.length > 0 && (
                                        <div className="mt-2 pl-4 border-l-2 border-indigo-100 flex flex-col gap-1.5">
                                          {doc.subDocuments.map((sub, sIdx) => (
                                            <div key={`sub_${docKey}_${sub.name || sIdx}_${sIdx}`} className="flex items-center justify-between text-xs py-1 px-2 bg-slate-50 rounded-lg">
                                              <span className="font-medium text-slate-700 truncate max-w-[280px]">
                                                {sub.name} {sub.year ? `(${sub.year})` : ""}
                                              </span>
                                              <div className="flex items-center gap-2">
                                                <button
                                                  onClick={() => setPreviewPdf({ url: sub.url, title: sub.name })}
                                                  className="text-indigo-600 hover:underline text-[10px] font-bold"
                                                >
                                                  View
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteSubDocument(crit.id, sec.number, metric.number, dIdx, sIdx)}
                                                  className="text-rose-500 hover:text-rose-700 text-[10px]"
                                                >
                                                  Remove
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          TAB 3: IQAC STEERING COMMITTEE & CONVENORS
      ========================================================================= */}
      {activeTab === "iqac" && (
        <div className="flex flex-col gap-8">
          {/* Steering Committee Table */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-outfit text-xl font-black text-slate-900">
                  IQAC Steering Committee Members
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Core executive body responsible for quality assurance monitoring and institutional benchmarks.
                </p>
              </div>
              <button
                onClick={() => {
                  setModalType("add-sc-member");
                  setModalPayload({});
                  setEditItemModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all self-start sm:self-auto"
              >
                <Plus className="h-4 w-4" /> Add Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Criterion / Representation</th>
                    <th className="py-3 px-3">Name of the Member</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Designation</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.steeringCommittee?.map((m, idx) => (
                    <tr key={m.id || idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-indigo-700">{m.criterion}</td>
                      <td className="py-3 px-3 font-bold">{m.name}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{m.role}</td>
                      <td className="py-3 px-3 text-slate-500">{m.designation}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove member '${m.name}'?`)) {
                              const updated = data.steeringCommittee.filter((_, i) => i !== idx);
                              setData({ ...data, steeringCommittee: updated });
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Criterion-Wise Convenors & Members */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">
              Criterion-wise Convenors &amp; Working Teams
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.criterionConvenors?.map((team, tIdx) => (
                <div key={team.criterionId} className="p-5 border border-slate-200/70 rounded-2xl bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-3">
                      <h4 className="font-outfit font-black text-sm text-[#002147]">
                        {team.criterionTitle}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {team.members?.length || 0} Members
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {team.members?.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-white rounded-xl border border-slate-100">
                          <div>
                            <span className="font-bold text-slate-800">{m.name}</span>
                            <span className="text-slate-400 text-[10px] ml-2">({m.designation})</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.role === "Convenor" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"
                          }`}>
                            {m.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: AUDITS & STATUTORY MEETINGS
      ========================================================================= */}
      {activeTab === "audits" && (
        <div className="flex flex-col gap-8">
          {/* Statutory Audits */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-outfit text-xl font-black text-slate-900">
                  Academic &amp; Administrative Audits (AAA)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Green, Energy, Environment, Academic and Administrative audit reports.
                </p>
              </div>
              <button
                onClick={() => {
                  setModalType("add-audit");
                  setModalPayload({});
                  setEditItemModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all"
              >
                <Plus className="h-4 w-4" /> Add Audit Report
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.auditReports?.map((audit, idx) => (
                <div key={audit.id || idx} className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col justify-between group hover:bg-white hover:border-indigo-100 transition-all shadow-2xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {audit.type} Audit • {audit.academicYear}
                    </span>
                    <h5 className="font-outfit font-black text-slate-800 text-sm mt-2">{audit.title}</h5>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setPreviewPdf({ url: audit.fileUrl, title: audit.title })}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      <Eye className="h-3.5 w-3.5" /> Preview PDF
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete audit '${audit.title}'?`)) {
                          const updated = data.auditReports.filter((_, i) => i !== idx);
                          setData({ ...data, auditReports: updated });
                        }
                      }}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Meetings & Minutes */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-outfit text-xl font-black text-slate-900">
                  IQAC Meetings &amp; Action Taken Reports (ATRs)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official records of quality resolutions, minutes, and follow-up compliance documents.
                </p>
              </div>
              <button
                onClick={() => {
                  setModalType("add-meeting");
                  setModalPayload({});
                  setEditItemModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all"
              >
                <Plus className="h-4 w-4" /> Add Meeting Record
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.meetingsAndAtrs?.map((m, idx) => (
                <div key={m.id || idx} className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                      {m.type} • {m.date || "Record"}
                    </span>
                    <h5 className="font-outfit font-black text-slate-800 text-sm mt-0.5">{m.title}</h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewPdf({ url: m.fileUrl, title: m.title })}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:text-indigo-800"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove meeting record '${m.title}'?`)) {
                          const updated = data.meetingsAndAtrs.filter((_, i) => i !== idx);
                          setData({ ...data, meetingsAndAtrs: updated });
                        }
                      }}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-rose-500 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: FEEDBACK & SURVEYS
      ========================================================================= */}
      {activeTab === "feedback" && (
        <div className="flex flex-col gap-8">
          {/* Stakeholder Feedback */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">
              Stakeholder Feedback System &amp; Action Taken Reports
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.feedbackSystem?.map((fb, idx) => (
                <div key={fb.id || idx} className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                      Stakeholder Feedback • {fb.academicYear}
                    </span>
                    <h5 className="font-outfit font-black text-slate-800 text-base mt-1">{fb.stakeholder} Feedback</h5>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={() => setPreviewPdf({ url: fb.fileUrl, title: `${fb.stakeholder} Feedback` })}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      View Report
                    </button>
                    {fb.atrFileUrl && (
                      <button
                        onClick={() => setPreviewPdf({ url: fb.atrFileUrl!, title: `${fb.stakeholder} ATR` })}
                        className="text-xs font-bold text-emerald-600 hover:underline"
                      >
                        View ATR
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Surveys & Evaluations */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">
              Institutional Surveys &amp; Result Evaluations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.surveysAndEvaluations?.map((srv, idx) => (
                <div key={srv.id || idx} className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                      {srv.category} • {srv.academicYear}
                    </span>
                    <h5 className="font-outfit font-black text-slate-800 text-sm mt-1">{srv.title}</h5>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={() => setPreviewPdf({ url: srv.fileUrl, title: srv.title })}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      View Evaluation PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS
      ========================================================================= */}

      {/* Modal: Add New Academic AQAR Report */}
      {addYearModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">Add New Academic AQAR Report</h3>
              <button onClick={() => setAddYearModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleAddAqarYear(
                  fd.get("year") as string,
                  fd.get("label") as string,
                  fd.get("status") as any,
                  fd.get("cloneYear") as string
                );
              }}
              className="flex flex-col gap-4 text-xs font-bold text-slate-700"
            >
              <div>
                <label className="block mb-1">Academic Year (e.g. 2025-2026)</label>
                <input
                  name="year"
                  required
                  placeholder="2025-2026"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Display Label</label>
                <input
                  name="label"
                  required
                  defaultValue="AQAR 2025–2026 (In Progress)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select name="status" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="In Progress">In Progress</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Initialize Criteria Structure</label>
                <select name="cloneYear" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="2023-2024">Clone Structure from 2023–2024</option>
                  <option value="">Fresh Standard Template (Empty Documents)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddYearModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black"
                >
                  Create AQAR Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New NAAC Cycle */}
      {addCycleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">Add New NAAC Accreditation Cycle</h3>
              <button onClick={() => setAddCycleModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleAddNaacCycle(
                  fd.get("cycleId") as string,
                  fd.get("cycleName") as string,
                  fd.get("grade") as string,
                  fd.get("status") as any,
                  fd.get("validity") as string
                );
              }}
              className="flex flex-col gap-4 text-xs font-bold text-slate-700"
            >
              <div>
                <label className="block mb-1">Cycle ID (e.g. cycle-2)</label>
                <input
                  name="cycleId"
                  required
                  defaultValue="cycle-2"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Cycle Name</label>
                <input
                  name="cycleName"
                  required
                  defaultValue="Cycle 2 (Upcoming)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Grade / Goal</label>
                <input
                  name="grade"
                  defaultValue="Target: A+ Grade"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select name="status" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                  <option value="Upcoming">Upcoming</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Accredited">Accredited</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Validity (e.g. 2029 - 2034)</label>
                <input
                  name="validity"
                  defaultValue="2029 - 2034"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddCycleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black"
                >
                  Create NAAC Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generic Item Add/Edit Modal (Document, Subdoc, Steering Committee Member) */}
      {editItemModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-outfit font-black text-slate-900 text-lg">
                {modalType === "add-doc" && "Add Document to Metric"}
                {modalType === "add-subdoc" && "Add Sub-Document"}
                {modalType === "add-sc-member" && "Add Steering Committee Member"}
                {modalType === "add-audit" && "Add Quality Audit Record"}
                {modalType === "add-meeting" && "Add Meeting / ATR Record"}
              </h3>
              <button onClick={() => setEditItemModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sub-form: Add Document */}
            {modalType === "add-doc" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  handleAddDocumentToMetric(
                    modalPayload.critId,
                    modalPayload.secNum,
                    modalPayload.metricNum,
                    fd.get("label") as string,
                    fd.get("documentUrl") as string
                  );
                  setEditItemModalOpen(false);
                }}
                className="flex flex-col gap-4 text-xs font-bold text-slate-700"
              >
                <div>
                  <label className="block mb-1">Document Label</label>
                  <input
                    name="label"
                    required
                    placeholder="e.g. Upload relevant supporting document"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Document URL</label>
                  <div className="flex gap-2">
                    <input
                      name="documentUrl"
                      id="doc-url-input"
                      placeholder="https://... or upload PDF"
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 font-semibold"
                    />
                    <label className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl cursor-pointer hover:bg-indigo-100 inline-flex items-center gap-1 font-bold">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await handleFileUpload(file);
                          if (url) {
                            const inp = document.getElementById("doc-url-input") as HTMLInputElement;
                            if (inp) inp.value = url;
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditItemModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black">
                    Add Document
                  </button>
                </div>
              </form>
            )}

            {/* Sub-form: Add Sub-Document */}
            {modalType === "add-subdoc" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  handleAddSubDocument(
                    modalPayload.critId,
                    modalPayload.secNum,
                    modalPayload.metricNum,
                    modalPayload.docIndex,
                    {
                      name: fd.get("name") as string,
                      year: fd.get("year") as string,
                      url: fd.get("url") as string
                    }
                  );
                  setEditItemModalOpen(false);
                }}
                className="flex flex-col gap-4 text-xs font-bold text-slate-700"
              >
                <div>
                  <label className="block mb-1">File Description / Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Departmental Meeting Minutes"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Academic Year / Subtitle (Optional)</label>
                  <input
                    name="year"
                    placeholder="e.g. 2023-24 or Academic Calendar"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">File URL</label>
                  <div className="flex gap-2">
                    <input
                      name="url"
                      id="subdoc-url-input"
                      required
                      placeholder="https://... or upload PDF"
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 font-semibold"
                    />
                    <label className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl cursor-pointer hover:bg-indigo-100 inline-flex items-center gap-1 font-bold">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await handleFileUpload(file);
                          if (url) {
                            const inp = document.getElementById("subdoc-url-input") as HTMLInputElement;
                            if (inp) inp.value = url;
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditItemModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black">
                    Add Sub-Document
                  </button>
                </div>
              </form>
            )}

            {/* Sub-form: Add Steering Committee Member */}
            {modalType === "add-sc-member" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const newMember: SteeringCommitteeMember = {
                    id: `sc_${Date.now()}`,
                    criterion: fd.get("criterion") as string,
                    name: fd.get("name") as string,
                    role: fd.get("role") as string,
                    designation: fd.get("designation") as string,
                  };
                  setData({
                    ...data,
                    steeringCommittee: [...data.steeringCommittee, newMember]
                  });
                  setEditItemModalOpen(false);
                }}
                className="flex flex-col gap-4 text-xs font-bold text-slate-700"
              >
                <div>
                  <label className="block mb-1">Representation / Category</label>
                  <input
                    name="criterion"
                    required
                    placeholder="e.g. IQAC, Management, Academician, Alumni, Student"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Member Full Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Dr. Sr. Sandhya Thumma"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Role in IQAC</label>
                  <input
                    name="role"
                    required
                    placeholder="e.g. Chairperson, Coordinator, Member"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Designation &amp; Department</label>
                  <input
                    name="designation"
                    required
                    placeholder="e.g. Principal, Dept. MBA"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditItemModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black">
                    Add Member
                  </button>
                </div>
              </form>
            )}

            {/* Sub-form: Add Audit Record */}
            {modalType === "add-audit" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const newAudit: QualityAuditDoc = {
                    id: `aud_${Date.now()}`,
                    title: fd.get("title") as string,
                    academicYear: fd.get("academicYear") as string,
                    type: fd.get("type") as any,
                    fileUrl: fd.get("fileUrl") as string,
                  };
                  setData({
                    ...data,
                    auditReports: [...data.auditReports, newAudit]
                  });
                  setEditItemModalOpen(false);
                }}
                className="flex flex-col gap-4 text-xs font-bold text-slate-700"
              >
                <div>
                  <label className="block mb-1">Audit Type</label>
                  <select name="type" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                    <option value="Academic">Academic Audit</option>
                    <option value="Administrative">Administrative Audit</option>
                    <option value="Green">Green &amp; Eco Audit</option>
                    <option value="Energy">Energy Audit</option>
                    <option value="Environment">Environmental Audit</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Report Title</label>
                  <input
                    name="title"
                    required
                    placeholder="e.g. Internal Academic Audit Report"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Academic Year</label>
                  <input
                    name="academicYear"
                    required
                    defaultValue="2023–2024"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Report File URL</label>
                  <div className="flex gap-2">
                    <input
                      name="fileUrl"
                      id="audit-file-url"
                      required
                      placeholder="https://... or upload PDF"
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 font-semibold"
                    />
                    <label className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl cursor-pointer hover:bg-indigo-100 inline-flex items-center gap-1 font-bold">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await handleFileUpload(file);
                          if (url) {
                            const inp = document.getElementById("audit-file-url") as HTMLInputElement;
                            if (inp) inp.value = url;
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditItemModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black">
                    Add Audit Report
                  </button>
                </div>
              </form>
            )}

            {/* Sub-form: Add Meeting Record */}
            {modalType === "add-meeting" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const newMeeting: QualityMeetingDoc = {
                    id: `meet_${Date.now()}`,
                    title: fd.get("title") as string,
                    date: fd.get("date") as string,
                    type: fd.get("type") as any,
                    fileUrl: fd.get("fileUrl") as string,
                  };
                  setData({
                    ...data,
                    meetingsAndAtrs: [...data.meetingsAndAtrs, newMeeting]
                  });
                  setEditItemModalOpen(false);
                }}
                className="flex flex-col gap-4 text-xs font-bold text-slate-700"
              >
                <div>
                  <label className="block mb-1">Record Type</label>
                  <select name="type" className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold">
                    <option value="Minutes">Minutes of Statutory Meetings</option>
                    <option value="ATR">Action Taken Report (ATR)</option>
                    <option value="Resolution">Resolution Document</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Meeting Title</label>
                  <input
                    name="title"
                    required
                    placeholder="e.g. Minutes of IQAC Meeting #3"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">Academic Year / Date</label>
                  <input
                    name="date"
                    required
                    defaultValue="2024–2025"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block mb-1">File URL</label>
                  <div className="flex gap-2">
                    <input
                      name="fileUrl"
                      id="meeting-file-url"
                      required
                      placeholder="https://... or upload PDF"
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 font-semibold"
                    />
                    <label className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl cursor-pointer hover:bg-indigo-100 inline-flex items-center gap-1 font-bold">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await handleFileUpload(file);
                          if (url) {
                            const inp = document.getElementById("meeting-file-url") as HTMLInputElement;
                            if (inp) inp.value = url;
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setEditItemModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black">
                    Add Record
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal for PDFs */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={true}
          onClose={() => setPreviewPdf(null)}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
        />
      )}
    </div>
  );
}

export default QualityAssuranceManager;

