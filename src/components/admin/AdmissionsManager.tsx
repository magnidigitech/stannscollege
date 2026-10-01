"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  BookOpen,
  Phone,
  Layers,
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
  FileText,
  Building2,
  Calendar,
  Sparkles,
  Info,
  Mail,
  Clock,
  MapPin,
  FileCheck2,
  Download,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function AdmissionsManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Active Main Tab: "A" | "B" | "C" | "D" | "E" | "F"
  const [activeTab, setActiveTab] = useState<"A" | "B" | "C" | "D" | "E" | "F">("A");

  // Sub-tabs for Section A & B: "UG" | "PG"
  const [programTab, setProgramTab] = useState<"UG" | "PG">("UG");

  // Modal editing states
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // File Preview Modal
  const [previewFile, setPreviewFile] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/admissions");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load admissions data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading admissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setError(null);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(json.error || "Failed to save admissions data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error saving data.");
    } finally {
      setSaving(false);
    }
  };

  // Upload file helper to Sanity
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        if (editingItem) {
          setEditingItem({ ...editingItem, [targetField]: json.url });
        } else if (targetField.startsWith("documents.")) {
          const field = targetField.replace("documents.", "");
          setData((prev: any) => ({
            ...prev,
            documents: {
              ...prev.documents,
              [field]: json.url,
            },
          }));
        }
      } else {
        alert(json.error || "Upload failed.");
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 gap-4 text-slate-500 font-sans">
        <Loader2 className="h-8 w-8 animate-spin text-[#002147]" />
        <span className="font-bold text-sm">Loading Admissions Data from Sanity...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-sans text-slate-900 animate-fadeIn">
      {/* ============================================================== */}
      {/* 1. TOP HEADER & CONTROLS                                       */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[#002147] text-amber-400 flex items-center justify-center shadow-md shrink-0">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">
                Admissions Management
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                Live Sanity Sync
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
              Manage Programmes Intake, Eligibility, Admission Policy, Application Forms, Prospectus, and Statutory Registers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admissions"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
          >
            <ExternalLink className="h-4 w-4 text-slate-500" />
            <span>View Live Admissions Page</span>
          </Link>

          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reload</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-black text-xs shadow-md transition-all cursor-pointer ${
              saveSuccess
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-[#002147] hover:bg-[#0a3c74]"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving to Sanity...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 text-amber-400" />
                <span>Save Changes to Sanity</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SECTION TABS (A through F matching doc strictly)             */}
      {/* ============================================================== */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
        {[
          { id: "A", label: "A. Programmes Offered", icon: GraduationCap },
          { id: "B", label: "B. Eligibility Criteria", icon: ClipboardList },
          { id: "C", label: "C. Admission Policy & Process", icon: ShieldCheck },
          { id: "D", label: "D. Prospectus & Brochures", icon: BookOpen },
          { id: "E", label: "E. Admission Desk", icon: Phone },
          { id: "F", label: "F. Admission Information", icon: Layers },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#002147] text-white shadow-sm"
                : "text-slate-600 hover:text-[#002147] hover:bg-white/60"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* TAB A: PROGRAMMES OFFERED                                      */}
      {/* ============================================================== */}
      {activeTab === "A" && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* Sub Switcher */}
          <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setProgramTab("UG")}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  programTab === "UG"
                    ? "bg-[#002147] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                UG Programmes ({data.ugProgrammes?.length || 0})
              </button>
              <button
                onClick={() => setProgramTab("PG")}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  programTab === "PG"
                    ? "bg-[#002147] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                PG Programmes ({data.pgProgrammes?.length || 0})
              </button>
            </div>

            <button
              onClick={() => {
                setModalType(programTab === "UG" ? "addUgProg" : "addPgProg");
                setEditingItem({
                  sNo: (programTab === "UG" ? data.ugProgrammes.length : data.pgProgrammes.length) + 1,
                  name: "",
                  sanctionedIntake: 30,
                  convenerQuota: 21,
                  managementQuota: 9,
                  ewsQuota: 3,
                  aboutDocumentUrl: "",
                  brochureUrl: "",
                });
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add {programTab} Programme</span>
            </button>
          </div>

          {/* Programmes Table */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-black tracking-wider">
                    <th className="py-3.5 px-4 text-center w-12">S.No</th>
                    <th className="py-3.5 px-5">Programme Name</th>
                    <th className="py-3.5 px-4 text-center font-black text-[#002147]">Sanctioned</th>
                    <th className="py-3.5 px-4 text-center">Convener</th>
                    <th className="py-3.5 px-4 text-center">Management</th>
                    <th className="py-3.5 px-4 text-center">EWS</th>
                    <th className="py-3.5 px-4 text-center">Doc URL</th>
                    <th className="py-3.5 px-4 text-center">Brochure URL</th>
                    <th className="py-3.5 px-4 text-center w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {(programTab === "UG" ? data.ugProgrammes : data.pgProgrammes)?.map(
                    (p: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-slate-400">{p.sNo}</td>
                        <td className="py-3 px-5 font-bold text-slate-900">{p.name}</td>
                        <td className="py-3 px-4 text-center font-black text-[#002147] text-base">
                          {p.sanctionedIntake}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold">{p.convenerQuota}</td>
                        <td className="py-3 px-4 text-center font-semibold text-amber-800">{p.managementQuota}</td>
                        <td className="py-3 px-4 text-center font-semibold text-emerald-700">{p.ewsQuota}</td>
                        <td className="py-3 px-4 text-center truncate max-w-[120px]">
                          {p.aboutDocumentUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: p.aboutDocumentUrl, title: p.name + " Document" })}
                              className="text-indigo-600 hover:underline font-bold text-xs"
                            >
                              View PDF
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center truncate max-w-[120px]">
                          {p.brochureUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: p.brochureUrl, title: p.name + " Brochure" })}
                              className="text-emerald-600 hover:underline font-bold text-xs"
                            >
                              View Brochure
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setModalType(programTab === "UG" ? "editUgProg" : "editPgProg");
                                setEditingItem({ ...p });
                                setEditIndex(idx);
                                setModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete programme "${p.name}"?`)) {
                                  const listKey = programTab === "UG" ? "ugProgrammes" : "pgProgrammes";
                                  const updated = data[listKey].filter((_: any, i: number) => i !== idx);
                                  setData({ ...data, [listKey]: updated });
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB B: ELIGIBILITY CRITERIA                                    */}
      {/* ============================================================== */}
      {activeTab === "B" && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* Sub Switcher */}
          <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setProgramTab("UG")}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  programTab === "UG"
                    ? "bg-[#002147] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                UG Eligibility ({data.ugEligibility?.length || 0})
              </button>
              <button
                onClick={() => setProgramTab("PG")}
                className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  programTab === "PG"
                    ? "bg-[#002147] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                PG Eligibility ({data.pgEligibility?.length || 0})
              </button>
            </div>

            <button
              onClick={() => {
                setModalType(programTab === "UG" ? "addUgElig" : "addPgElig");
                setEditingItem({
                  sNo: (programTab === "UG" ? data.ugEligibility.length : data.pgEligibility.length) + 1,
                  programme: "",
                  eligibilityCriteria: "",
                  streamBadge: "",
                  preferredStream: "",
                });
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Eligibility Entry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {(programTab === "UG" ? data.ugEligibility : data.pgEligibility)?.map(
              (item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start justify-between gap-4 shadow-xs"
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#002147] text-white font-bold text-xs">
                        {item.sNo}
                      </span>
                      <h4 className="font-outfit font-black text-base text-[#002147]">
                        {item.programme}
                      </h4>
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed pl-8.5">
                      {item.eligibilityCriteria}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pl-8.5 pt-1">
                      {item.streamBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                          {item.streamBadge}
                        </span>
                      )}
                      {item.preferredStream && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          ✓ {item.preferredStream}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setModalType(programTab === "UG" ? "editUgElig" : "editPgElig");
                        setEditingItem({ ...item });
                        setEditIndex(idx);
                        setModalOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete eligibility entry for "${item.programme}"?`)) {
                          const listKey = programTab === "UG" ? "ugEligibility" : "pgEligibility";
                          const updated = data[listKey].filter((_: any, i: number) => i !== idx);
                          setData({ ...data, [listKey]: updated });
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB C: ADMISSION POLICY & PROCESS (DOCUMENTS & FORMS)           */}
      {/* ============================================================== */}
      {activeTab === "C" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-8 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <h3 className="font-outfit text-xl font-black text-[#002147]">
              Admission Process PDF Attachments &amp; Common Portal Links
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Update the application forms and required documents PDFs uploaded directly to Sanity or file servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. UG Required Documents PDF */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-indigo-700">UG Admissions</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  UG Documents Required PDF
                </h4>
                <p className="text-slate-600 text-xs">Current file URL: {data.documents?.ugRequiredDocsPdf || "None"}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
                {data.documents?.ugRequiredDocsPdf && (
                  <button
                    onClick={() =>
                      setPreviewFile({
                        url: data.documents.ugRequiredDocsPdf,
                        title: "UG Documents Required",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>
                )}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white hover:bg-[#0a3c74] font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.ugRequiredDocsPdf")}
                  />
                </label>
              </div>
            </div>

            {/* 2. UG Application Form PDF */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-amber-700">UG Admissions</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  UG Application Form PDF
                </h4>
                <p className="text-slate-600 text-xs">Current file URL: {data.documents?.ugApplicationFormPdf || "None"}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
                {data.documents?.ugApplicationFormPdf && (
                  <button
                    onClick={() =>
                      setPreviewFile({
                        url: data.documents.ugApplicationFormPdf,
                        title: "UG Application Form",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-bold text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>
                )}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white hover:bg-[#0a3c74] font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.ugApplicationFormPdf")}
                  />
                </label>
              </div>
            </div>

            {/* 3. PG Required Documents PDF */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-indigo-700">PG Admissions</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  PG Documents Required PDF
                </h4>
                <p className="text-slate-600 text-xs">Current file URL: {data.documents?.pgRequiredDocsPdf || "None"}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
                {data.documents?.pgRequiredDocsPdf && (
                  <button
                    onClick={() =>
                      setPreviewFile({
                        url: data.documents.pgRequiredDocsPdf,
                        title: "PG Documents Required",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>
                )}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white hover:bg-[#0a3c74] font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.pgRequiredDocsPdf")}
                  />
                </label>
              </div>
            </div>

            {/* 4. PG Application Form PDF */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-amber-700">PG Admissions</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  PG Application Form PDF
                </h4>
                <p className="text-slate-600 text-xs">Current file URL: {data.documents?.pgApplicationFormPdf || "None"}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
                {data.documents?.pgApplicationFormPdf && (
                  <button
                    onClick={() =>
                      setPreviewFile({
                        url: data.documents.pgApplicationFormPdf,
                        title: "PG Application Form",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-bold text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>
                )}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white hover:bg-[#0a3c74] font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.pgApplicationFormPdf")}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* CAP Portal URL */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
            <label className="text-xs font-black uppercase text-slate-700">AP Degree Admissions / CAP Portal URL</label>
            <input
              type="text"
              value={data.documents?.capPortalUrl || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  documents: { ...data.documents, capPortalUrl: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#002147]"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB D: PROSPECTUS & BROCHURES                                  */}
      {/* ============================================================== */}
      {activeTab === "D" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <h3 className="font-outfit text-xl font-black text-[#002147]">
              College Prospectus &amp; Information Flyers
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Manage Prospectus 2025-26 PDF and Admissions overview pamphlets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prospectus */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-indigo-700">Publication</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  Comprehensive Prospectus PDF
                </h4>
                <p className="text-slate-600 text-xs truncate">{data.documents?.prospectusPdf || "None"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() =>
                    setPreviewFile({
                      url: data.documents.prospectusPdf,
                      title: "Prospectus Preview",
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.prospectusPdf")}
                  />
                </label>
              </div>
            </div>

            {/* Pamphlet 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-amber-700">Flyer 1</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  Overview Pamphlet Image
                </h4>
                <p className="text-slate-600 text-xs truncate">{data.documents?.pamphlet1 || "None"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() =>
                    setPreviewFile({
                      url: data.documents.pamphlet1,
                      title: "Pamphlet 1 Preview",
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-bold text-xs"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.pamphlet1")}
                  />
                </label>
              </div>
            </div>

            {/* Pamphlet 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-black uppercase text-emerald-700">Flyer 2</span>
                <h4 className="font-outfit font-black text-base text-slate-800">
                  Highlights &amp; Placements Flyer
                </h4>
                <p className="text-slate-600 text-xs truncate">{data.documents?.pamphlet2 || "None"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() =>
                    setPreviewFile({
                      url: data.documents.pamphlet2,
                      title: "Pamphlet 2 Preview",
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002147] text-white font-bold text-xs cursor-pointer">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "documents.pamphlet2")}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB E: ADMISSION DESK CONTACTS                                 */}
      {/* ============================================================== */}
      {activeTab === "E" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <h3 className="font-outfit text-xl font-black text-[#002147]">
              Admission Desk Contact Details &amp; Office Hours
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Configure phone helplines, official email addresses, working hours and campus address.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="font-outfit font-bold text-sm text-slate-800">Phone Numbers &amp; Helplines</h4>
              {data.deskInfo?.phoneNumbers?.map((p: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={p.label}
                    onChange={(e) => {
                      const updated = [...data.deskInfo.phoneNumbers];
                      updated[idx].label = e.target.value;
                      setData({ ...data, deskInfo: { ...data.deskInfo, phoneNumbers: updated } });
                    }}
                    placeholder="Label"
                    className="w-1/3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={p.number}
                    onChange={(e) => {
                      const updated = [...data.deskInfo.phoneNumbers];
                      updated[idx].number = e.target.value;
                      updated[idx].tel = "+91" + e.target.value.replace(/[^0-9]/g, "");
                      setData({ ...data, deskInfo: { ...data.deskInfo, phoneNumbers: updated } });
                    }}
                    placeholder="Phone number"
                    className="w-2/3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-outfit font-bold text-sm text-slate-800">Email Channels</h4>
              {data.deskInfo?.emails?.map((e: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={e.label}
                    onChange={(ev) => {
                      const updated = [...data.deskInfo.emails];
                      updated[idx].label = ev.target.value;
                      setData({ ...data, deskInfo: { ...data.deskInfo, emails: updated } });
                    }}
                    placeholder="Label"
                    className="w-1/3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                  <input
                    type="email"
                    value={e.email}
                    onChange={(ev) => {
                      const updated = [...data.deskInfo.emails];
                      updated[idx].email = ev.target.value;
                      setData({ ...data, deskInfo: { ...data.deskInfo, emails: updated } });
                    }}
                    placeholder="Email address"
                    className="w-2/3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-slate-700">Office Working Hours</label>
              <input
                type="text"
                value={data.deskInfo?.officeHours || ""}
                onChange={(e) =>
                  setData({ ...data, deskInfo: { ...data.deskInfo, officeHours: e.target.value } })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-slate-700">College Address</label>
              <input
                type="text"
                value={data.deskInfo?.collegeAddress || ""}
                onChange={(e) =>
                  setData({ ...data, deskInfo: { ...data.deskInfo, collegeAddress: e.target.value } })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB F: ADMISSION INFORMATION (TABLE 3 YEARLY REGISTERS)        */}
      {/* ============================================================== */}
      {activeTab === "F" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 animate-fadeIn">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-outfit text-xl font-black text-[#002147]">
                Table 3: Year-wise Admission Compliance Registers
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                Affiliation documents, Sanctioned intake files, Admitted student rosters &amp; Category admissions records.
              </p>
            </div>

            <button
              onClick={() => {
                setModalType("addYearRecord");
                setEditingItem({
                  year: "2027-2028",
                  affiliationDocUrl: "/documents/DefaultFile_1.pdf",
                  affiliationDocTitle: "Affiliation Orders",
                  sanctionedIntakeDocUrl: "/documents/DefaultFile_1.pdf",
                  sanctionedIntakeDocTitle: "Sanctioned Intake Orders",
                  admittedStudentsDocUrl: "/documents/DefaultFile_1.pdf",
                  admittedStudentsDocTitle: "Admitted Students List",
                  categoryAdmissionsDocUrl: "/documents/DefaultFile_1.pdf",
                  categoryAdmissionsDocTitle: "Category Admissions",
                });
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Academic Year</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[11px] font-black tracking-wider">
                  <th className="py-3.5 px-4">Academic Year</th>
                  <th className="py-3.5 px-4">Affiliation &amp; Approval</th>
                  <th className="py-3.5 px-4">Sanctioned Intake</th>
                  <th className="py-3.5 px-4">Admitted Students</th>
                  <th className="py-3.5 px-4">Category Admissions</th>
                  <th className="py-3.5 px-4 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {data.yearlyRecords?.map((rec: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-black text-[#002147] text-base">{rec.year}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setPreviewFile({ url: rec.affiliationDocUrl, title: rec.affiliationDocTitle })}
                        className="text-indigo-600 hover:underline font-bold text-xs truncate max-w-[140px] block"
                      >
                        {rec.affiliationDocTitle || "View File"}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setPreviewFile({ url: rec.sanctionedIntakeDocUrl, title: rec.sanctionedIntakeDocTitle })}
                        className="text-emerald-600 hover:underline font-bold text-xs truncate max-w-[140px] block"
                      >
                        {rec.sanctionedIntakeDocTitle || "View File"}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setPreviewFile({ url: rec.admittedStudentsDocUrl, title: rec.admittedStudentsDocTitle })}
                        className="text-blue-600 hover:underline font-bold text-xs truncate max-w-[140px] block"
                      >
                        {rec.admittedStudentsDocTitle || "View File"}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setPreviewFile({ url: rec.categoryAdmissionsDocUrl, title: rec.categoryAdmissionsDocTitle })}
                        className="text-amber-800 hover:underline font-bold text-xs truncate max-w-[140px] block"
                      >
                        {rec.categoryAdmissionsDocTitle || "View File"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setModalType("editYearRecord");
                            setEditingItem({ ...rec });
                            setEditIndex(idx);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete academic year record "${rec.year}"?`)) {
                              const updated = data.yearlyRecords.filter((_: any, i: number) => i !== idx);
                              setData({ ...data, yearlyRecords: updated });
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all"
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

      {/* ============================================================== */}
      {/* 3. ITEM EDIT / CREATE MODAL                                    */}
      {/* ============================================================== */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-outfit font-black text-xl text-[#002147]">
              {modalType.includes("Prog")
                ? "Edit Programme Intake"
                : modalType.includes("Elig")
                ? "Edit Eligibility Criteria"
                : "Edit Yearly Record"}
            </h3>

            {/* Form Fields based on modal type */}
            <div className="flex flex-col gap-4 text-xs sm:text-sm font-sans">
              {/* Programme Intake Fields */}
              {modalType.includes("Prog") && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Programme Name</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Total Intake</label>
                      <input
                        type="number"
                        value={editingItem.sanctionedIntake}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, sanctionedIntake: Number(e.target.value) })
                        }
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#002147]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Convener</label>
                      <input
                        type="number"
                        value={editingItem.convenerQuota}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, convenerQuota: Number(e.target.value) })
                        }
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Management</label>
                      <input
                        type="number"
                        value={editingItem.managementQuota}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, managementQuota: Number(e.target.value) })
                        }
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-amber-800"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">EWS</label>
                      <input
                        type="number"
                        value={editingItem.ewsQuota}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, ewsQuota: Number(e.target.value) })
                        }
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Document URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingItem.aboutDocumentUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, aboutDocumentUrl: e.target.value })}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex-1 text-xs"
                      />
                      <label className="px-3 py-2.5 bg-[#002147] text-white rounded-xl text-xs font-bold cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "aboutDocumentUrl")}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Brochure URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingItem.brochureUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, brochureUrl: e.target.value })}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex-1 text-xs"
                      />
                      <label className="px-3 py-2.5 bg-[#002147] text-white rounded-xl text-xs font-bold cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "brochureUrl")}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Eligibility Fields */}
              {modalType.includes("Elig") && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Programme Name</label>
                    <input
                      type="text"
                      value={editingItem.programme}
                      onChange={(e) => setEditingItem({ ...editingItem, programme: e.target.value })}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Eligibility Criteria Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.eligibilityCriteria}
                      onChange={(e) => setEditingItem({ ...editingItem, eligibilityCriteria: e.target.value })}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Stream Badge</label>
                    <input
                      type="text"
                      value={editingItem.streamBadge || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, streamBadge: e.target.value })}
                      placeholder="e.g. CEC / MEC / MPC / BiPC / Vocational"
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Preferred Stream Tag</label>
                    <input
                      type="text"
                      value={editingItem.preferredStream || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, preferredStream: e.target.value })}
                      placeholder="e.g. Commerce background is preferred but not mandatory"
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              {/* Year Record Fields */}
              {modalType.includes("YearRecord") && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Academic Year</label>
                    <input
                      type="text"
                      value={editingItem.year}
                      onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                      placeholder="e.g. 2026-2027"
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Affiliation &amp; Approval Document URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingItem.affiliationDocUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, affiliationDocUrl: e.target.value })}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex-1 text-xs"
                      />
                      <label className="px-3 py-2.5 bg-[#002147] text-white rounded-xl text-xs font-bold cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "affiliationDocUrl")}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700">Sanctioned Intake Document URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingItem.sanctionedIntakeDocUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, sanctionedIntakeDocUrl: e.target.value })}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex-1 text-xs"
                      />
                      <label className="px-3 py-2.5 bg-[#002147] text-white rounded-xl text-xs font-bold cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "sanctionedIntakeDocUrl")}
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (modalType.startsWith("editUgProg")) {
                    const list = [...data.ugProgrammes];
                    list[editIndex!] = editingItem;
                    setData({ ...data, ugProgrammes: list });
                  } else if (modalType.startsWith("addUgProg")) {
                    setData({ ...data, ugProgrammes: [...data.ugProgrammes, editingItem] });
                  } else if (modalType.startsWith("editPgProg")) {
                    const list = [...data.pgProgrammes];
                    list[editIndex!] = editingItem;
                    setData({ ...data, pgProgrammes: list });
                  } else if (modalType.startsWith("addPgProg")) {
                    setData({ ...data, pgProgrammes: [...data.pgProgrammes, editingItem] });
                  } else if (modalType.startsWith("editUgElig")) {
                    const list = [...data.ugEligibility];
                    list[editIndex!] = editingItem;
                    setData({ ...data, ugEligibility: list });
                  } else if (modalType.startsWith("addUgElig")) {
                    setData({ ...data, ugEligibility: [...data.ugEligibility, editingItem] });
                  } else if (modalType.startsWith("editPgElig")) {
                    const list = [...data.pgEligibility];
                    list[editIndex!] = editingItem;
                    setData({ ...data, pgEligibility: list });
                  } else if (modalType.startsWith("addPgElig")) {
                    setData({ ...data, pgEligibility: [...data.pgEligibility, editingItem] });
                  } else if (modalType.startsWith("editYearRecord")) {
                    const list = [...data.yearlyRecords];
                    list[editIndex!] = editingItem;
                    setData({ ...data, yearlyRecords: list });
                  } else if (modalType.startsWith("addYearRecord")) {
                    setData({ ...data, yearlyRecords: [...data.yearlyRecords, editingItem] });
                  }
                  setModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#002147] hover:bg-[#0a3c74] text-white font-bold text-xs transition-all"
              >
                Update Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          fileUrl={previewFile.url}
          title={previewFile.title}
        />
      )}
    </div>
  );
}
export default AdmissionsManager;
