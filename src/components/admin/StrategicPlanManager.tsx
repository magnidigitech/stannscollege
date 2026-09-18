"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Compass,
  FileText,
  MessageSquare,
  Sparkles,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  UploadCloud,
  Eye,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  X,
  Loader2,
  FolderOpen,
  Users,
  Building,
  HeartHandshake,
  Globe,
  Network,
  Briefcase,
  BookOpen,
  Milestone,
  Check,
  RotateCcw,
  Target,
  GraduationCap,
  Flame,
  Activity,
  Award,
  ShieldCheck,
} from "lucide-react";

export interface StrategicDocumentItem {
  _key: string;
  title: string;
  fileUrl: string;
  assetId?: string;
  isUploading?: boolean;
}

interface FeedbackLinks {
  studentFeedbackFormUrl: string;
  facultyFeedbackFormUrl: string;
  parentFeedbackFormUrl: string;
  alumniFeedbackFormUrl: string;
  communityFeedbackFormUrl: string;
  employerFeedbackFormUrl: string;
}

const DEFAULT_FEEDBACK_LINKS: FeedbackLinks = {
  studentFeedbackFormUrl: "https://forms.gle/n6QfA4roPrqtPWjM8",
  facultyFeedbackFormUrl: "https://www.google.com",
  parentFeedbackFormUrl: "https://www.google.com",
  alumniFeedbackFormUrl: "https://www.google.com",
  communityFeedbackFormUrl: "https://www.google.com",
  employerFeedbackFormUrl: "https://www.google.com",
};

const DEFAULT_EXECUTIVE_SUMMARY =
  "St. Ann’s College for Women, Guntur, envisions a transformative future rooted in academic excellence, innovation, women empowerment, social responsibility, and nation-building. Guided by the values of the Congregation of the Sisters of St. Ann and aligned with the aspirations of Viksit Bharat @2047 and Swarna Andhra @2047, the institution is committed to nurturing globally competent, ethically grounded, and socially responsible women leaders.";

export function StrategicPlanManager() {
  // Active Sub-tab
  const [activeTab, setActiveTab] = useState<"documents" | "feedback" | "executive" | "framework">("documents");

  // --- TAB 1: DOCUMENTS STATE ---
  const [documents, setDocuments] = useState<StrategicDocumentItem[]>([]);
  const [initialDocuments, setInitialDocuments] = useState<StrategicDocumentItem[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsSaving, setDocsSaving] = useState(false);
  const [docsSaveSuccess, setDocsSaveSuccess] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Drawer state for Add or Edit Document
  const [editingDoc, setEditingDoc] = useState<StrategicDocumentItem | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF Preview modal state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // --- TAB 2 & 3: FEEDBACK LINKS & EXECUTIVE SUMMARY STATE ---
  const [feedbackLinks, setFeedbackLinks] = useState<FeedbackLinks>(DEFAULT_FEEDBACK_LINKS);
  const [initialFeedbackLinks, setInitialFeedbackLinks] = useState<FeedbackLinks>(DEFAULT_FEEDBACK_LINKS);
  const [executiveSummary, setExecutiveSummary] = useState<string>(DEFAULT_EXECUTIVE_SUMMARY);
  const [initialExecutiveSummary, setInitialExecutiveSummary] = useState<string>(DEFAULT_EXECUTIVE_SUMMARY);
  const [planTitle, setPlanTitle] = useState<string>("Strategic Plans & Future Directions");
  const [initialPlanTitle, setInitialPlanTitle] = useState<string>("Strategic Plans & Future Directions");

  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackSaving, setFeedbackSaving] = useState(false);
  const [feedbackSaveSuccess, setFeedbackSaveSuccess] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // --- FETCH DOCUMENTS ---
  const fetchDocuments = async () => {
    try {
      setDocsLoading(true);
      setDocsError(null);
      const res = await fetch("/api/admin/strategic-plan/documents");
      const json = await res.json();
      if (json.success && Array.isArray(json.documents)) {
        setDocuments(json.documents);
        setInitialDocuments(json.documents);
      }
    } catch (err: any) {
      console.error("Error fetching documents:", err);
      setDocsError("Failed to load strategic documents from Sanity.");
    } finally {
      setDocsLoading(false);
    }
  };

  // --- FETCH FEEDBACK & EXECUTIVE DATA ---
  const fetchFeedbackData = async () => {
    try {
      setFeedbackLoading(true);
      setFeedbackError(null);
      const res = await fetch("/api/admin/strategic-plan");
      const json = await res.json();
      if (json.success) {
        if (json.links) {
          setFeedbackLinks(json.links);
          setInitialFeedbackLinks(json.links);
        }
        if (json.executiveSummary) {
          setExecutiveSummary(json.executiveSummary);
          setInitialExecutiveSummary(json.executiveSummary);
        } else {
          setExecutiveSummary(DEFAULT_EXECUTIVE_SUMMARY);
          setInitialExecutiveSummary(DEFAULT_EXECUTIVE_SUMMARY);
        }
        if (json.title) {
          setPlanTitle(json.title);
          setInitialPlanTitle(json.title);
        }
      }
    } catch (err: any) {
      console.error("Error fetching feedback data:", err);
      setFeedbackError("Failed to load strategic feedback and vision details.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchFeedbackData();
  }, []);

  // Dirty checks
  const isDocsDirty = JSON.stringify(documents) !== JSON.stringify(initialDocuments);
  const isFeedbackDirty = JSON.stringify(feedbackLinks) !== JSON.stringify(initialFeedbackLinks);
  const isExecutiveDirty =
    executiveSummary !== initialExecutiveSummary || planTitle !== initialPlanTitle;

  // --- SAVE DOCUMENTS ---
  const handleSaveDocuments = async () => {
    try {
      setDocsSaving(true);
      setDocsError(null);
      setDocsSaveSuccess(false);

      const res = await fetch("/api/admin/strategic-plan/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save documents to Sanity.");
      }

      setInitialDocuments(documents);
      setDocsSaveSuccess(true);
      setTimeout(() => setDocsSaveSuccess(false), 5000);
    } catch (err: any) {
      setDocsError(err.message || "An error occurred while saving documents.");
    } finally {
      setDocsSaving(false);
    }
  };

  // --- SAVE FEEDBACK & EXECUTIVE SUMMARY ---
  const handleSaveFeedbackAndSummary = async () => {
    try {
      setFeedbackSaving(true);
      setFeedbackError(null);
      setFeedbackSaveSuccess(false);

      const res = await fetch("/api/admin/strategic-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: planTitle,
          executiveSummary,
          ...feedbackLinks,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to save feedback & summary to Sanity.");
      }

      setInitialFeedbackLinks(feedbackLinks);
      setInitialExecutiveSummary(executiveSummary);
      setInitialPlanTitle(planTitle);
      setFeedbackSaveSuccess(true);
      setTimeout(() => setFeedbackSaveSuccess(false), 5000);
    } catch (err: any) {
      setFeedbackError(err.message || "An error occurred while saving.");
    } finally {
      setFeedbackSaving(false);
    }
  };

  // Reordering helpers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setDocuments((prev) => {
      const updated = [...prev];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === documents.length - 1) return;
    setDocuments((prev) => {
      const updated = [...prev];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  // Delete document
  const handleDeleteDoc = (index: number) => {
    const docToDelete = documents[index];
    if (window.confirm(`Are you sure you want to delete "${docToDelete.title}"?`)) {
      setDocuments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Open modal to add new document
  const handleOpenAddModal = () => {
    setEditingDoc({
      _key: `doc_${Date.now()}`,
      title: "",
      fileUrl: "",
    });
    setIsEditingExisting(false);
    setEditIndex(null);
    setIsDocModalOpen(true);
  };

  // Open modal to edit existing document
  const handleOpenEditModal = (doc: StrategicDocumentItem, index: number) => {
    setEditingDoc({ ...doc });
    setIsEditingExisting(true);
    setEditIndex(index);
    setIsDocModalOpen(true);
  };

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    try {
      setUploadingPdf(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Upload failed");
      }

      setEditingDoc((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          fileUrl: json.url,
          assetId: json.assetId,
          title: prev.title ? prev.title : file.name.replace(/\.[^/.]+$/, ""),
        };
      });
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Save changes from modal
  const handleSaveDocModal = () => {
    if (!editingDoc || !editingDoc.title.trim()) {
      alert("Please provide a title for the document.");
      return;
    }

    if (!editingDoc.fileUrl.trim()) {
      alert("Please upload a PDF file or provide a valid PDF URL.");
      return;
    }

    if (isEditingExisting && editIndex !== null) {
      setDocuments((prev) => {
        const updated = [...prev];
        updated[editIndex] = { ...editingDoc };
        return updated;
      });
    } else {
      // Add new document at the very top (index 0) so it becomes the latest!
      setDocuments((prev) => [editingDoc, ...prev]);
    }

    setIsDocModalOpen(false);
    setEditingDoc(null);
  };

  // Filtered documents list for search
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Feedback form field definitions
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
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#0f172a] p-6 sm:p-8 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-300/30 text-amber-300 shadow-inner">
              <Compass className="h-7 w-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-outfit text-xl sm:text-2xl font-black tracking-tight text-white">
                  Strategic Plan &amp; Framework
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 rounded-full">
                  Unified Console
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Manage all aspects of the Strategic Development Plan: institutional framework PDFs, annual deployment reports, 6 stakeholder survey links, executive vision statement, and priority benchmarks.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/strategic-plans-and-future-directions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Public Page</span>
            </a>

            {activeTab === "documents" && (
              <>
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Document</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveDocuments}
                  disabled={!isDocsDirty || docsSaving}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white transition-all shadow-md active:scale-95 cursor-pointer ${
                    isDocsDirty && !docsSaving
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30 ring-2 ring-emerald-400/50"
                      : "bg-slate-700/60 text-slate-400 cursor-not-allowed opacity-60"
                  }`}
                >
                  {docsSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-white" />
                      <span>Saving to Sanity...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{isDocsDirty ? "Save Documents" : "Documents Saved"}</span>
                    </>
                  )}
                </button>
              </>
            )}

            {(activeTab === "feedback" || activeTab === "executive") && (
              <button
                type="button"
                onClick={handleSaveFeedbackAndSummary}
                disabled={(!isFeedbackDirty && !isExecutiveDirty) || feedbackSaving}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white transition-all shadow-md active:scale-95 cursor-pointer ${
                  (isFeedbackDirty || isExecutiveDirty) && !feedbackSaving
                    ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30 ring-2 ring-emerald-400/50"
                    : "bg-slate-700/60 text-slate-400 cursor-not-allowed opacity-60"
                }`}
              >
                {feedbackSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-white" />
                    <span>Saving to Sanity...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>
                      {isFeedbackDirty || isExecutiveDirty ? "Save Changes" : "All Changes Saved"}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Global Status Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Strategic PDFs: <strong className="text-white">{documents.length}</strong>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">
              Feedback Surveys: <strong className="text-amber-300">6 Active Links</strong>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">
              Alignment: <strong className="text-blue-300">Viksit Bharat &amp; Swarna Andhra 2047</strong>
            </span>
          </div>

          {(isDocsDirty || isFeedbackDirty || isExecutiveDirty) && (
            <span className="inline-flex items-center gap-1.5 text-amber-300 bg-amber-400/10 border border-amber-300/20 px-2.5 py-1 rounded-md text-[11px] font-bold animate-pulse">
              <AlertCircle className="h-3.5 w-3.5" />
              Unsaved changes pending in this section — click &ldquo;Save&rdquo; when finished!
            </span>
          )}
        </div>
      </div>

      {/* SUB-TABS NAVIGATION PILLS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 border border-slate-200/80 rounded-2xl shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("documents")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === "documents"
              ? "bg-[#002147] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <FileText className="h-4 w-4 text-amber-400" />
          <span>Strategic Documents &amp; Reports</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "documents" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            {documents.length}
          </span>
          {isDocsDirty && <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("feedback")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === "feedback"
              ? "bg-[#002147] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <MessageSquare className="h-4 w-4 text-blue-400" />
          <span>Stakeholder Feedback Forms</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "feedback" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            6 Forms
          </span>
          {isFeedbackDirty && <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("executive")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === "executive"
              ? "bg-[#002147] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>Executive Summary &amp; Vision</span>
          {isExecutiveDirty && <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("framework")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === "framework"
              ? "bg-[#002147] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <Milestone className="h-4 w-4 text-purple-400" />
          <span>Priorities &amp; Indicators Reference</span>
        </button>
      </div>

      {/* NOTIFICATIONS */}
      {(docsSaveSuccess || feedbackSaveSuccess) && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold shadow-xs animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Successfully saved to Sanity CMS! All changes are live immediately on the public website.</span>
        </div>
      )}

      {(docsError || feedbackError) && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm font-semibold shadow-xs animate-fadeIn">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span>{docsError || feedbackError}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: STRATEGIC DOCUMENTS & REPORTS */}
      {/* ========================================================================= */}
      {activeTab === "documents" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Controls Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={fetchDocuments}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
                title="Refresh list from Sanity"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${docsLoading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Add Document</span>
              </button>
            </div>
          </div>

          {/* Documents Table / List */}
          {docsLoading ? (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#002147]" />
              <p className="text-sm font-semibold">Loading strategic documents from Sanity...</p>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <FolderOpen className="h-10 w-10 text-slate-300" />
              <p className="text-sm font-semibold">No strategic documents found.</p>
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl"
              >
                <Plus className="h-4 w-4" /> Add your first document
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredDocs.map((doc, idx) => {
                const originalIndex = documents.findIndex((d) => d._key === doc._key);
                const isTop3 = originalIndex < 3;

                return (
                  <div
                    key={doc._key || idx}
                    className={`p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                      isTop3 ? "bg-amber-50/20 hover:bg-amber-50/40" : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Left: Rank, Badge & Title */}
                    <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                      {/* Rank Badge */}
                      <div className="flex flex-col items-center justify-center shrink-0">
                        <span
                          className={`h-9 w-9 rounded-xl flex items-center justify-center font-outfit text-sm font-black shadow-2xs ${
                            isTop3
                              ? "bg-[#002147] text-white ring-2 ring-amber-400/40"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          #{originalIndex + 1}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {isTop3 ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
                              <Sparkles className="h-3 w-3 text-emerald-600" />
                              Live on Main Webpage (Top 3)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md">
                              Archive (View All Modal)
                            </span>
                          )}

                          {doc.fileUrl.startsWith("http") && doc.fileUrl.includes("sanity.io") && (
                            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                              Sanity Asset
                            </span>
                          )}
                        </div>

                        <h4 className="font-outfit font-black text-slate-900 text-base sm:text-lg tracking-tight leading-snug">
                          {doc.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="truncate max-w-xs sm:max-w-md" title={doc.fileUrl}>
                            📄 {doc.fileUrl}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions (Reorder, Preview, Edit, Delete) */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      {/* Reordering */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-2xs p-0.5 mr-1">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(originalIndex)}
                          disabled={originalIndex === 0}
                          className={`p-1.5 rounded-lg transition-colors ${
                            originalIndex === 0
                              ? "text-slate-200 cursor-not-allowed"
                              : "text-slate-600 hover:text-[#002147] hover:bg-slate-100 cursor-pointer"
                          }`}
                          title="Move Up (Boost Priority)"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(originalIndex)}
                          disabled={originalIndex === documents.length - 1}
                          className={`p-1.5 rounded-lg transition-colors ${
                            originalIndex === documents.length - 1
                              ? "text-slate-200 cursor-not-allowed"
                              : "text-slate-600 hover:text-[#002147] hover:bg-slate-100 cursor-pointer"
                          }`}
                          title="Move Down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Preview PDF */}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(doc.fileUrl);
                          setPreviewTitle(doc.title);
                        }}
                        className="p-2 text-slate-600 hover:text-[#002147] hover:bg-indigo-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                        title="Preview PDF"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(doc, originalIndex)}
                        className="p-2 text-slate-600 hover:text-[#002147] hover:bg-indigo-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                        title="Edit Document"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteDoc(originalIndex)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                        title="Delete Document"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STAKEHOLDER FEEDBACK FORMS */}
      {/* ========================================================================= */}
      {activeTab === "feedback" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 shadow-xs">
                <MessageSquare className="h-5 w-5" />
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
                  Enter Google Form or survey URLs for all 6 stakeholder categories. These links connect directly with the feedback action cards on the public page.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchFeedbackData}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${feedbackLoading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleSaveFeedbackAndSummary}
                disabled={feedbackSaving || !isFeedbackDirty}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isFeedbackDirty
                    ? "bg-[#002147] text-white hover:bg-blue-900"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                }`}
              >
                {feedbackSaving ? (
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

          {/* Inputs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {FORM_FIELDS.map((field) => {
              const Icon = field.icon;
              const currentVal = feedbackLinks[field.key];
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
                      onChange={(e) =>
                        setFeedbackLinks((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="flex-1 bg-white border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 transition-all outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: EXECUTIVE SUMMARY & VISION STATEMENT */}
      {/* ========================================================================= */}
      {activeTab === "executive" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Executive Summary &amp; Vision Statement
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize the top institutional vision paragraph and alignment goals displayed on the Strategic Plans public portal.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExecutiveSummary(DEFAULT_EXECUTIVE_SUMMARY)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                title="Reset to official template"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Template</span>
              </button>

              <button
                type="button"
                onClick={handleSaveFeedbackAndSummary}
                disabled={feedbackSaving || !isExecutiveDirty}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isExecutiveDirty
                    ? "bg-[#002147] text-white hover:bg-blue-900"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                }`}
              >
                {feedbackSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Sanity...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Page Main Title
              </label>
              <input
                type="text"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                placeholder="Strategic Plans & Future Directions"
                className="w-full px-4 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Executive Vision &amp; Alignment Statement
              </label>
              <textarea
                rows={5}
                value={executiveSummary}
                onChange={(e) => setExecutiveSummary(e.target.value)}
                placeholder="Enter executive statement..."
                className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] leading-relaxed"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-slate-50 to-emerald-50 border border-amber-200/60">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Eye className="h-4 w-4 text-amber-600" />
              <span>Live Public Page Notch Preview</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {executiveSummary}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: STRATEGIC PRIORITIES & INDICATORS REFERENCE */}
      {/* ========================================================================= */}
      {activeTab === "framework" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 shadow-xs">
                <Milestone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Strategic Framework &amp; Pillars Overview
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reference map of the 4 core sections, 16 focus thrusts, and national/state alignment benchmarks configured on the public portal.
                </p>
              </div>
            </div>

            <a
              href="/strategic-plans-and-future-directions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open Live Strategic Portal</span>
            </a>
          </div>

          {/* 4 Pillars Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2.5 text-blue-700 font-extrabold text-sm uppercase tracking-wider">
                <GraduationCap className="h-5 w-5" />
                <span>1. Institutional Performance Indicators</span>
              </div>
              <ul className="text-xs text-slate-600 font-medium space-y-1.5 pl-2 list-disc list-inside">
                <li>Academic Performance Indicators (Pass %, University Ranks, Progression)</li>
                <li>Research &amp; Innovation Indicators (Publications, Patents, Incubation)</li>
                <li>Societal Impact Indicators (NSS, Rural Outreach, Women Empowerment)</li>
                <li>Institutional Excellence Indicators (NAAC, NIRF, E-Governance, Audits)</li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2.5 text-indigo-700 font-extrabold text-sm uppercase tracking-wider">
                <Milestone className="h-5 w-5" />
                <span>2. Strategic Priorities – 2026–2031</span>
              </div>
              <ul className="text-xs text-slate-600 font-medium space-y-1.5 pl-2 list-disc list-inside">
                <li>a. Academic Priorities (NEP 2020, OBE, AI &amp; Data Analytics)</li>
                <li>b. Infrastructure Priorities (Smart Classrooms, Green Campus, Labs)</li>
                <li>c. Financial Priorities (Resource Mobilization, CSR, Grants)</li>
                <li>d. Global Goals &amp; Internationalization (MoUs, Student Exchange)</li>
                <li>e. Strategic Documents Archive ({documents.length} PDFs Managed in Tab 1)</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-700 font-extrabold text-sm uppercase tracking-wider">
                <Users className="h-5 w-5" />
                <span>3. Stakeholder Engagement &amp; Feedback</span>
              </div>
              <ul className="text-xs text-slate-600 font-medium space-y-1.5 pl-2 list-disc list-inside">
                <li>Student, Faculty, Parent, Alumni, Community &amp; Employer surveys</li>
                <li>Quality Loop: Feedback Collection → Analysis → Review → Action Taken → Continuous Improvement</li>
                <li>Managed via Tab 2 &ldquo;Stakeholder Feedback Forms&rdquo;</li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700 font-extrabold text-sm uppercase tracking-wider">
                <Target className="h-5 w-5" />
                <span>4. Vision for 2047 Alignment</span>
              </div>
              <ul className="text-xs text-slate-600 font-medium space-y-1.5 pl-2 list-disc list-inside">
                <li>Viksit Bharat @2047 (MyGov, MY Bharat, NITI Aayog portals)</li>
                <li>Swarna Andhra @2047 (AP Government &amp; Guntur District portals)</li>
                <li>Signature Initiatives (Women for Viksit Bharat, Digital St. Ann’s 2047, Green Campus)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD / EDIT DOCUMENT MODAL */}
      {/* ========================================================================= */}
      {isDocModalOpen && editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-amber-400" />
                <h3 className="font-outfit font-black text-lg text-white">
                  {isEditingExisting ? "Edit Strategic Document" : "Add New Strategic Document"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDocModalOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Annual Deployment Plan 2026–2027"
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
              </div>

              {/* Upload or File URL */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  PDF Document File <span className="text-red-500">*</span>
                </label>

                {/* Upload Box */}
                <div className="border-2 border-dashed border-slate-300 hover:border-[#002147] rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="doc-pdf-file-upload"
                  />
                  <label
                    htmlFor="doc-pdf-file-upload"
                    className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    {uploadingPdf ? (
                      <>
                        <Loader2 className="h-7 w-7 text-[#002147] animate-spin" />
                        <span className="text-xs font-bold text-slate-700">Uploading PDF to Sanity CDN...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-7 w-7 text-[#002147]" />
                        <span className="text-xs font-bold text-slate-700">
                          Click to browse and upload a PDF file
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Directly uploads into Sanity Asset Pipeline
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Or Manual URL */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Or specify a custom PDF file URL / local document path:
                  </span>
                  <input
                    type="text"
                    placeholder="/documents/... or https://..."
                    value={editingDoc.fileUrl}
                    onChange={(e) => setEditingDoc({ ...editingDoc, fileUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDocModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDocModal}
                className="px-5 py-2 text-xs font-bold text-white bg-[#002147] hover:bg-[#003366] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                {isEditingExisting ? "Update Document" : "Add to List"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PDF PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-amber-400" />
                <h3 className="font-outfit font-black text-sm sm:text-base text-white truncate max-w-xl">
                  {previewTitle}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewUrl(null)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-100">
              <iframe
                src={`${previewUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrategicPlanManager;
