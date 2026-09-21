"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  FileText,
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
  Users,
  Trophy,
  Flag,
  Compass,
  MessageSquare,
  ExternalLink,
  Calendar,
  X,
  Search,
  UploadCloud,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  Scale
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { STUDENT_SUPPORT_DATA } from "@/components/student-support/staticData";

const DEFAULT_PDF = "/documents/DefaultFile_1.pdf";

interface DocRecord {
  title: string;
  fileUrl: string;
  year?: string;
  subtitle?: string;
}

export function StudentSupportManager() {
  const [data, setData] = useState<any>(STUDENT_SUPPORT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main Section Tab: "welfare" | "sports" | "outreach" | "capacity" | "laurels"
  const [activeSection, setActiveSection] = useState<
    "welfare" | "sports" | "outreach" | "capacity" | "laurels"
  >("welfare");

  // Sub-tab for Section A Welfare Cells
  const [activeWelfareCell, setActiveWelfareCell] = useState<string>("anti-ragging");

  // Modal State for Add / Edit Annual Report
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>(""); // "annual-report" | "core-doc" | "sports-report" | "outreach-report" | "capacity-report" | "laurel-report"
  const [editingDoc, setEditingDoc] = useState<DocRecord>({
    title: "",
    fileUrl: "",
    year: "",
    subtitle: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF Preview State
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/student-support");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setData(STUDENT_SUPPORT_DATA);
      }
    } catch (err: any) {
      setError(err.message || "Network error loading student support data.");
      setData(STUDENT_SUPPORT_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToSanity = async () => {
    if (!data) return;
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/student-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save student support data in Sanity.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload handler for PDF
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please select a valid PDF file.");
      return;
    }

    try {
      setIsUploading(true);
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

      setEditingDoc((prev) => ({
        ...prev,
        fileUrl: json.url,
        title: prev.title ? prev.title : file.name.replace(/\.[^/.]+$/, ""),
      }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Helper to open Add modal
  const openAddModal = (type: string, defaultTitle = "") => {
    setModalType(type);
    setEditingDoc({
      title: defaultTitle,
      fileUrl: "",
      year: "2026–2027",
      subtitle: "Academic Year Report",
    });
    setEditIndex(null);
    setModalOpen(true);
  };

  // Helper to open Edit modal
  const openEditModal = (type: string, doc: DocRecord, index: number) => {
    setModalType(type);
    setEditingDoc({ ...doc });
    setEditIndex(index);
    setModalOpen(true);
  };

  // Helper to save from modal into active state
  const handleSaveModal = () => {
    if (!editingDoc.title.trim()) {
      alert("Please provide a title for the document.");
      return;
    }

    const updated = JSON.parse(JSON.stringify(data));

    if (modalType === "welfare-annual-report") {
      const cellIndex = updated.welfareServices.items.findIndex(
        (c: any) => c.slug === activeWelfareCell
      );
      if (cellIndex !== -1) {
        const cell = updated.welfareServices.items[cellIndex];
        if (!cell.annualReports) cell.annualReports = [];

        if (editIndex !== null) {
          cell.annualReports[editIndex] = editingDoc;
        } else {
          cell.annualReports.unshift(editingDoc);
        }
      }
    } else if (modalType === "sports-report") {
      if (!updated.sportsReports) updated.sportsReports = [];
      if (editIndex !== null) {
        updated.sportsReports[editIndex] = editingDoc;
      } else {
        updated.sportsReports.unshift(editingDoc);
      }
    } else if (modalType === "outreach-report") {
      if (!updated.outreachReports) updated.outreachReports = [];
      if (editIndex !== null) {
        updated.outreachReports[editIndex] = editingDoc;
      } else {
        updated.outreachReports.unshift(editingDoc);
      }
    } else if (modalType === "capacity-report") {
      if (!updated.capacityReports) updated.capacityReports = [];
      if (editIndex !== null) {
        updated.capacityReports[editIndex] = editingDoc;
      } else {
        updated.capacityReports.unshift(editingDoc);
      }
    } else if (modalType === "laurel-report") {
      if (!updated.laurelReports) updated.laurelReports = [];
      if (editIndex !== null) {
        updated.laurelReports[editIndex] = editingDoc;
      } else {
        updated.laurelReports.unshift(editingDoc);
      }
    }

    setData(updated);
    setModalOpen(false);
  };

  // Helper to delete a report from list
  const handleDeleteReport = (type: string, index: number) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    const updated = JSON.parse(JSON.stringify(data));

    if (type === "welfare-annual-report") {
      const cellIndex = updated.welfareServices.items.findIndex(
        (c: any) => c.slug === activeWelfareCell
      );
      if (cellIndex !== -1) {
        updated.welfareServices.items[cellIndex].annualReports.splice(index, 1);
      }
    } else if (type === "sports-report") {
      updated.sportsReports.splice(index, 1);
    } else if (type === "outreach-report") {
      updated.outreachReports.splice(index, 1);
    } else if (type === "capacity-report") {
      updated.capacityReports.splice(index, 1);
    } else if (type === "laurel-report") {
      updated.laurelReports.splice(index, 1);
    }

    setData(updated);
  };

  // Helper to update text fields in active welfare cell
  const handleUpdateWelfareCellField = (field: string, value: string) => {
    const updated = JSON.parse(JSON.stringify(data));
    const cellIndex = updated.welfareServices.items.findIndex(
      (c: any) => c.slug === activeWelfareCell
    );
    if (cellIndex !== -1) {
      updated.welfareServices.items[cellIndex][field] = value;
      setData(updated);
    }
  };

  const currentWelfareCell =
    data?.welfareServices?.items?.find((c: any) => c.slug === activeWelfareCell) ||
    data?.welfareServices?.items?.[0];

  const welfareCellsList = data?.welfareServices?.items || [];

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* =========================================================================
          TOP ACTION HEADER BAR
         ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147] text-white shadow-sm shrink-0">
            <HeartHandshake className="h-6 w-6 text-amber-300" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-outfit font-black text-xl text-[#002147] tracking-tight">
                Student Support Services Manager
              </h2>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                5 Portal Sections
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage committee orders, statutory policies, online complaint forms, and year-wise annual reports.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading || saving}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <a
            href="/student-support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer shadow-2xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Live Portal</span>
          </a>

          <button
            type="button"
            onClick={handleSaveToSanity}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#002147] hover:bg-[#003366] transition-all shadow-sm hover:shadow hover:scale-105 active:scale-95 cursor-pointer"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5 text-amber-300" />}
            <span>{saving ? "Saving Changes..." : "Save All to Sanity"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-xs animate-fadeIn">
          <Check className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Student Support Services data successfully published and synced with Sanity!</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-xs animate-fadeIn">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* =========================================================================
          MAIN SECTION TABS (5 SECTIONS)
         ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 text-xs font-bold">
        {[
          { id: "welfare", label: "A. Support & Welfare (11 Cells)", icon: ShieldCheck },
          { id: "sports", label: "B. Sports & Games", icon: Trophy },
          { id: "outreach", label: "C. Extension & Outreach", icon: Flag },
          { id: "capacity", label: "D. Capacity Building", icon: Compass },
          { id: "laurels", label: "E. Student Laurels", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-[#002147] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION A: SUPPORT & WELFARE CELLS
         ========================================================================= */}
      {activeSection === "welfare" && (
        <div className="space-y-6">
          {/* Sub-Tabs: 11 Cells / Committees */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/90 overflow-x-auto custom-scrollbar">
            {welfareCellsList.map((cell: any) => {
              const isActive = activeWelfareCell === cell.slug;
              return (
                <button
                  key={cell.slug}
                  onClick={() => setActiveWelfareCell(cell.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#1e40af] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span>{cell.number}. {cell.title.split("/")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {currentWelfareCell && (
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              {/* Cell Header Details */}
              <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      Cell #{currentWelfareCell.number}
                    </span>
                    <h3 className="font-outfit font-black text-lg sm:text-xl text-[#002147]">
                      {currentWelfareCell.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {currentWelfareCell.tagline}
                  </p>
                </div>

                {/* Form URL input if present */}
                <div className="flex items-center gap-2 max-w-md w-full">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                      Form:
                    </span>
                    <input
                      type="text"
                      placeholder="Online Google Form URL..."
                      value={currentWelfareCell.formUrl || ""}
                      onChange={(e) => handleUpdateWelfareCellField("formUrl", e.target.value)}
                      className="w-full pl-14 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 1. Core Institutional Documents Box */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 shrink-0">
                      <FileText className="h-3.5 w-3.5" />
                    </span>
                    <h4 className="font-outfit font-extrabold text-blue-900 text-sm uppercase tracking-wider">
                      1. Institutional Committee Orders &amp; Policy Documents (Single Files)
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Committee Order Document */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                          Committee Order
                        </span>
                        {currentWelfareCell.committeePdf && (
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewPdf({
                                url: currentWelfareCell.committeePdf,
                                title: `${currentWelfareCell.title} - Committee Order`,
                              })
                            }
                            className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="h-3 w-3" /> View Current PDF
                          </button>
                        )}
                      </div>
                      <h5 className="font-outfit font-bold text-sm text-slate-800 mt-2">
                        Official Committee Order PDF
                      </h5>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {currentWelfareCell.committeePdf || "No file uploaded (uses default)"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      <input
                        type="text"
                        placeholder="/documents/student-support/..."
                        value={currentWelfareCell.committeePdf || ""}
                        onChange={(e) => handleUpdateWelfareCellField("committeePdf", e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      />
                    </div>
                  </div>

                  {/* Policy / Guidelines Document */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                          Institutional Policy
                        </span>
                        {currentWelfareCell.policyPdf && (
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewPdf({
                                url: currentWelfareCell.policyPdf,
                                title: `${currentWelfareCell.title} - Policy Document`,
                              })
                            }
                            className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="h-3 w-3" /> View Current PDF
                          </button>
                        )}
                      </div>
                      <h5 className="font-outfit font-bold text-sm text-slate-800 mt-2">
                        Policy &amp; Guidelines PDF
                      </h5>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {currentWelfareCell.policyPdf || "No file uploaded (uses default)"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      <input
                        type="text"
                        placeholder="/documents/student-support/..."
                        value={currentWelfareCell.policyPdf || ""}
                        onChange={(e) => handleUpdateWelfareCellField("policyPdf", e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Year-wise Annual Reports & Action Plans */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h4 className="font-outfit font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                        2. Year-wise Annual Reports &amp; Documentation (Newest First)
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Top 3 latest files display on webpage; older files appear in "View All" archive modal.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openAddModal(
                        "welfare-annual-report",
                        `${currentWelfareCell.title.split("/")[0].trim()} Annual Report`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New Annual Report</span>
                  </button>
                </div>

                {/* Reports Table / List */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4">File Path / URL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(currentWelfareCell.annualReports || []).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-slate-400 font-semibold">
                            No annual reports added yet. Click "Add New Annual Report" above.
                          </td>
                        </tr>
                      ) : (
                        (currentWelfareCell.annualReports || []).map((rep: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                                {rep.year}
                              </span>
                              {idx === 0 && (
                                <span className="ml-2 text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                                  Latest
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-800">
                              {rep.title}
                            </td>
                            <td className="py-3 px-4 text-slate-500 truncate max-w-xs">
                              {rep.fileUrl || DEFAULT_PDF}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewPdf({
                                      url: rep.fileUrl || DEFAULT_PDF,
                                      title: rep.title,
                                    })
                                  }
                                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                                  title="View PDF"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    openEditModal("welfare-annual-report", rep, idx)
                                  }
                                  className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                                  title="Edit Report"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteReport("welfare-annual-report", idx)
                                  }
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                                  title="Delete Report"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION B: SPORTS & GAMES
         ========================================================================= */}
      {activeSection === "sports" && (
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-outfit font-black text-xl text-[#002147]">
                  Sports &amp; Games Reports Manager
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add and manage year-wise Annual Sports Activity Reports and physical education records.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openAddModal("sports-report", "Annual Sports Activity Report")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Sports Report</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                  <th className="py-3 px-4">Academic Year</th>
                  <th className="py-3 px-4">Report Title</th>
                  <th className="py-3 px-4">File Path / URL</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {(data?.sportsReports || [
                  { title: "Annual Sports Activity Report 2026–2027", year: "2026–2027", fileUrl: DEFAULT_PDF },
                  { title: "Annual Sports Activity Report 2025–2026", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Annual Sports Activity Report 2024–2025", year: "2024–2025", fileUrl: DEFAULT_PDF },
                ]).map((rep: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                        {rep.year}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal("sports-report", rep, idx)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReport("sports-report", idx)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION C: EXTENSION & OUTREACH
         ========================================================================= */}
      {activeSection === "outreach" && (
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                <Flag className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-outfit font-black text-xl text-[#002147]">
                  Extension &amp; Outreach Reports Manager
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage NSS, NCC, Red Ribbon Club, Mother Gnanamma, Eco Club, and Unnat Bharat Abhiyan reports.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openAddModal("outreach-report", "NSS Activities & Camps Report")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Extension Report</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                  <th className="py-3 px-4">Academic Year</th>
                  <th className="py-3 px-4">Report Title</th>
                  <th className="py-3 px-4">File Path / URL</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {(data?.outreachReports || [
                  { title: "NSS Activities & Community Camps Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "NCC Annual Training & Drills Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Red Ribbon Club (RRC) Awareness Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Mother Gnanamma Outreach Welfare Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Eco Club Environmental & Plantation Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Unnat Bharat Abhiyan (UBA) Rural Report", year: "2025–2026", fileUrl: DEFAULT_PDF },
                ]).map((rep: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                        {rep.year}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal("outreach-report", rep, idx)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReport("outreach-report", idx)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION D: CAPACITY BUILDING
         ========================================================================= */}
      {activeSection === "capacity" && (
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-bold">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-outfit font-black text-xl text-[#002147]">
                  Capacity Building &amp; Skill Development Manager
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage workshops, seminars schedules, and skill enhancement documentation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openAddModal("capacity-report", "Workshops & Seminars Schedule")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Capacity Report</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                  <th className="py-3 px-4">Academic Year</th>
                  <th className="py-3 px-4">Report Title</th>
                  <th className="py-3 px-4">File Path / URL</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {(data?.capacityReports || [
                  { title: "Workshops & Seminars Schedule 2026–2027", year: "2026–2027", fileUrl: "/documents/student-support/Mentor Mentee Action Plan 2026-2027.pdf" },
                  { title: "Skill Enhancement & Training Report 2025–2026", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Capacity Building Annual Summary 2024–2025", year: "2024–2025", fileUrl: DEFAULT_PDF },
                ]).map((rep: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                        {rep.year}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal("capacity-report", rep, idx)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReport("capacity-report", idx)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION E: STUDENT LAURELS
         ========================================================================= */}
      {activeSection === "laurels" && (
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-outfit font-black text-xl text-[#002147]">
                  Student Laurels &amp; Recognitions Manager
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage university ranks, state and national awards documentation archives.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openAddModal("laurel-report", "Student Laurels & University Ranks")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Laurels Record</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                  <th className="py-3 px-4">Academic Year</th>
                  <th className="py-3 px-4">Record Title</th>
                  <th className="py-3 px-4">File Path / URL</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {(data?.laurelReports || [
                  { title: "Student Laurels & University Ranks 2025–2026", year: "2025–2026", fileUrl: DEFAULT_PDF },
                  { title: "Student Laurels & Achievements 2024–2025", year: "2024–2025", fileUrl: DEFAULT_PDF },
                ]).map((rep: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">
                        {rep.year}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{rep.title}</td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{rep.fileUrl || DEFAULT_PDF}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewPdf({ url: rep.fileUrl || DEFAULT_PDF, title: rep.title })}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal("laurel-report", rep, idx)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReport("laurel-report", idx)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT MODAL DRAWER
         ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-amber-300" />
                <h3 className="font-outfit font-black text-base sm:text-lg">
                  {editIndex !== null ? "Edit Document Record" : "Add New Document Record"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Anti-Ragging Annual Report 2026–2027"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Academic Year / Subtitle
                </label>
                <input
                  type="text"
                  value={editingDoc.year || ""}
                  onChange={(e) => setEditingDoc((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="e.g. 2026–2027"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  File Upload (PDF) or Local Path
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingDoc.fileUrl || ""}
                      onChange={(e) => setEditingDoc((prev) => ({ ...prev, fileUrl: e.target.value }))}
                      placeholder="/documents/student-support/... or CDN URL"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#002147] focus:outline-none"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePdfUpload}
                      accept=".pdf"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      {isUploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      <span>Upload PDF</span>
                    </button>
                  </div>
                  {editingDoc.fileUrl && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-600 truncate max-w-xs">{editingDoc.fileUrl}</span>
                      <button
                        type="button"
                        onClick={() => setPreviewPdf({ url: editingDoc.fileUrl, title: editingDoc.title })}
                        className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#002147] hover:bg-[#003366] text-white transition-colors cursor-pointer"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
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
