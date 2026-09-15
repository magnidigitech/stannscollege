"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Check,
  AlertCircle,
  RefreshCw,
  Eye,
  Loader2,
  Save,
  Users2,
  Building,
  GraduationCap,
  Calendar,
  Layers,
  Phone,
  Scale,
  Landmark,
  Archive,
  BarChart3
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function MandatoryDisclosuresManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<
    "aicte_anu" | "cce_apsche" | "aishe_nirf" | "compliance_finance" | "rti" | "reports_archives"
  >("aicte_anu");

  // Modal State for generic Table Item (Year, Title, FileUrl, AssetId)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // PDF Preview Modal
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/mandatory-disclosures");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load mandatory disclosures data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading disclosures.");
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
      const res = await fetch("/api/admin/mandatory-disclosures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save records in Sanity.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save records.");
    } finally {
      setSaving(false);
    }
  };

  // Upload PDF Handler
  const handleFileUpload = async (file: File, fieldName: string = "fileUrl") => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "file");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setEditingItem((prev: any) => ({
          ...prev,
          [fieldName]: json.url,
          assetId: json.assetId,
        }));
      } else {
        alert(json.error || "Failed to upload PDF file to Sanity.");
      }
    } catch (err: any) {
      alert(err.message || "Error during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Generic Add Item to array
  const openAddModal = (type: string, initialFields: any) => {
    setModalType(type);
    setEditingItem({ _key: `key_${Date.now()}`, ...initialFields });
    setEditIndex(null);
    setModalOpen(true);
  };

  // Generic Edit Item in array
  const openEditModal = (type: string, item: any, index: number) => {
    setModalType(type);
    setEditingItem({ ...item });
    setEditIndex(index);
    setModalOpen(true);
  };

  // Generic Save from Modal into data state
  const handleSaveModal = () => {
    if (!editingItem || !modalType) return;
    setData((prev: any) => {
      const currentList = Array.isArray(prev[modalType]) ? [...prev[modalType]] : [];
      if (editIndex !== null) {
        currentList[editIndex] = editingItem;
      } else {
        currentList.push(editingItem);
      }
      return { ...prev, [modalType]: currentList };
    });
    setModalOpen(false);
    setEditingItem(null);
    setEditIndex(null);
  };

  // Generic Delete Item from array
  const handleDeleteItem = (type: string, index: number) => {
    if (!confirm("Are you sure you want to remove this record? (Remember to click 'Save Changes' to apply to live site)")) return;
    setData((prev: any) => {
      const currentList = Array.isArray(prev[type]) ? [...prev[type]] : [];
      currentList.splice(index, 1);
      return { ...prev, [type]: currentList };
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-500 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#002147]" />
        <p className="text-sm font-semibold">Loading Mandatory Disclosures from Sanity CMS...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-200">
        <p className="font-bold">Error loading disclosures:</p>
        <p className="text-xs mt-1">{error || "No data received."}</p>
        <button onClick={fetchData} className="mt-4 px-4 py-2 bg-[#002147] text-white rounded-xl text-xs font-bold">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100/70 text-blue-900 font-bold">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-800">
              Live Sanity Data Sync
            </span>
          </div>
          <h2 className="font-outfit text-2xl font-black text-[#002147] mt-1">
            Mandatory Disclosures & Compliance Manager
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Add, edit, or delete year-wise regulatory tables, accreditation PDFs, RTI committee members, and audit reports.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all text-xs font-bold flex items-center gap-1.5"
            title="Reload from Sanity"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleSaveToSanity}
            disabled={saving}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
              saveSuccess
                ? "bg-emerald-600 text-white"
                : "bg-[#002147] hover:bg-blue-900 text-white"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving to Sanity...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-4 w-4" />
                <span>Saved & Published!</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes to Sanity</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs">
          <Check className="h-4 w-4 shrink-0" />
          <span>All Mandatory Disclosures updates successfully synced with Sanity CMS!</span>
        </div>
      )}

      {/* Section Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60">
        {[
          { id: "aicte_anu", label: "1. AICTE & ANU Affiliations", icon: ShieldCheck },
          { id: "cce_apsche", label: "2. CCE & APSCHE Orders", icon: Landmark },
          { id: "aishe_nirf", label: "3. AISHE & NIRF Reports", icon: BarChart3 },
          { id: "compliance_finance", label: "4. Compliance & Finance", icon: Scale },
          { id: "rti", label: "5. RTI Committee & Docs", icon: Users2 },
          { id: "reports_archives", label: "6. Annual Reports & Archives", icon: Archive },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-white text-[#002147] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================================================================ */}
      {/* TAB 1: AICTE, UGC, & ANU Affiliations                            */}
      {/* ================================================================ */}
      {activeTab === "aicte_anu" && (
        <div className="flex flex-col gap-8">
          {/* AICTE Approvals Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  AICTE Approvals (Extension of Approval - EoA)
                </h3>
                <p className="text-slate-500 text-xs">Year-wise Technical Education approval orders</p>
              </div>
              <button
                onClick={() => openAddModal("aicteApprovals", { year: "2026–2027", title: "AICTE Approval / EoA", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add Academic Year Row
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Document Title</th>
                    <th className="py-2.5 px-4">PDF URL / File</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.aicteApprovals || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">{row.title}</td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">{row.fileUrl}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg" title="Preview PDF">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEditModal("aicteApprovals", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg" title="Edit row">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("aicteApprovals", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg" title="Delete row">
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

          {/* ANU Affiliation Orders (UG & PG) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  ANU Affiliation Orders (UG & PG)
                </h3>
                <p className="text-slate-500 text-xs">University affiliation orders categorized by UG and PG</p>
              </div>
              <button
                onClick={() => openAddModal("anuAffiliations", { programmeType: "ug", year: "2026–2027", title: "UG Affiliation Order", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add Affiliation Order
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Level</th>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Title</th>
                    <th className="py-2.5 px-4">PDF URL</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.anuAffiliations || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${row.programmeType?.toLowerCase() === "ug" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"}`}>
                          {row.programmeType?.toUpperCase() || "UG"}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">{row.title}</td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">{row.fileUrl}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEditModal("anuAffiliations", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("anuAffiliations", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 2: CCE & APSCHE Orders                                       */}
      {/* ================================================================ */}
      {activeTab === "cce_apsche" && (
        <div className="flex flex-col gap-8">
          {/* CCE Orders Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  Commissionerate of Collegiate Education (CCE / CHE) Orders
                </h3>
                <p className="text-slate-500 text-xs">Orders, communications, and proceedings from CCE AP</p>
              </div>
              <button
                onClick={() => openAddModal("cceOrders", { year: "2026–2027", title: "CCE Orders / Proceedings", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add CCE Order Row
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Document / Communication</th>
                    <th className="py-2.5 px-4">PDF URL</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.cceOrders || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">{row.title}</td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">{row.fileUrl}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEditModal("cceOrders", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("cceOrders", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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

          {/* APSCHE Orders Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  APSCHE Orders & Communications
                </h3>
                <p className="text-slate-500 text-xs">State council higher education orders and communications</p>
              </div>
              <button
                onClick={() => openAddModal("apscheOrders", { year: "2025–2026", title: "APSCHE Orders / Communications", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add APSCHE Order Row
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Document / Communication</th>
                    <th className="py-2.5 px-4">PDF URL</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.apscheOrders || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">{row.title}</td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">{row.fileUrl}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEditModal("apscheOrders", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("apscheOrders", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 3: AISHE & NIRF Reports                                      */}
      {/* ================================================================ */}
      {activeTab === "aishe_nirf" && (
        <div className="flex flex-col gap-8">
          {/* AISHE Reports */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  AISHE Certificates & Reports
                </h3>
                <p className="text-slate-500 text-xs">All-India Survey on Higher Education submissions</p>
              </div>
              <button
                onClick={() => openAddModal("aisheReports", { sNo: (data.aisheReports?.length || 0) + 1, year: "2025–2026", title: "AISHE Certificate / Report", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add AISHE Row
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4 w-16">S. No.</th>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Document Title</th>
                    <th className="py-2.5 px-4">PDF URL</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.aisheReports || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.sNo || idx + 1}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">{row.title}</td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">{row.fileUrl}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEditModal("aisheReports", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("aisheReports", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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

          {/* NIRF Submissions Table (3 PDFs per row) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  NIRF Submissions (College, Management & Overall Data)
                </h3>
                <p className="text-slate-500 text-xs">National Institutional Ranking Framework data uploads</p>
              </div>
              <button
                onClick={() => openAddModal("nirfSubmissions", { year: "2026–27", collegeDataUrl: "/documents/DefaultFile_1.pdf", managementDataUrl: "/documents/DefaultFile_1.pdf", overallDataUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add NIRF Academic Year
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">College Data PDF</th>
                    <th className="py-2.5 px-4">Management Data PDF</th>
                    <th className="py-2.5 px-4">Overall Data PDF</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.nirfSubmissions || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.collegeDataUrl, title: `NIRF ${row.year} - College Data` })} className="text-blue-700 hover:underline flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View College Data
                        </button>
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.managementDataUrl, title: `NIRF ${row.year} - Management Data` })} className="text-indigo-700 hover:underline flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View Mgmt Data
                        </button>
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.overallDataUrl, title: `NIRF ${row.year} - Overall Data` })} className="text-emerald-700 hover:underline flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View Overall Data
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => openEditModal("nirfSubmissions", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("nirfSubmissions", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 4: Regulatory Compliance & Financial Transparency            */}
      {/* ================================================================ */}
      {activeTab === "compliance_finance" && (
        <div className="flex flex-col gap-8">
          {/* Financial Transparency Documents */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  Financial Transparency Documents (Budgets, Audits, Policies, Fee Structure)
                </h3>
                <p className="text-slate-500 text-xs">Manage financial statements, AFRC fee orders, and scholarship documents</p>
              </div>
              <button
                onClick={() => openAddModal("financialDocuments", { code: "custom", title: "Financial Document", description: "Official financial declaration document", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add Document
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.financialDocuments || []).map((doc: any, idx: number) => (
                <div key={doc._key || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                        {doc.code}
                      </span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPreviewPdf({ url: doc.fileUrl, title: doc.title })} className="p-1 hover:bg-slate-200 text-slate-600 rounded">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => openEditModal("financialDocuments", doc, idx)} className="p-1 hover:bg-blue-100 text-blue-700 rounded">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDeleteItem("financialDocuments", idx)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-2">{doc.title}</h4>
                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">{doc.description}</p>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {doc.fileUrl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Compliance Documents */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  Regulatory Compliance Documents
                </h3>
                <p className="text-slate-500 text-xs">AICTE, UGC, APSCHE, and other compliance records</p>
              </div>
              <button
                onClick={() => openAddModal("regulatoryComplianceDocs", { code: "other", title: "Compliance Document", description: "Statutory compliance disclosure", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add Compliance Doc
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.regulatoryComplianceDocs || []).map((doc: any, idx: number) => (
                <div key={doc._key || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        {doc.code}
                      </span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPreviewPdf({ url: doc.fileUrl, title: doc.title })} className="p-1 hover:bg-slate-200 text-slate-600 rounded">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => openEditModal("regulatoryComplianceDocs", doc, idx)} className="p-1 hover:bg-blue-100 text-blue-700 rounded">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDeleteItem("regulatoryComplianceDocs", idx)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-2">{doc.title}</h4>
                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">{doc.description}</p>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {doc.fileUrl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 5: RTI Committee & Documents                                 */}
      {/* ================================================================ */}
      {activeTab === "rti" && (
        <div className="flex flex-col gap-8">
          {/* RTI Committee Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  RTI Committee Members & Authorities
                </h3>
                <p className="text-slate-500 text-xs">Designated Public Information Officers (PIO) and Appellate Authority</p>
              </div>
              <button
                onClick={() => openAddModal("rtiMembers", { sNo: (data.rtiMembers?.length || 0) + 1, name: "", designation: "", role: "Member", mobile: "" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add RTI Authority
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4 w-14">S. No.</th>
                    <th className="py-2.5 px-4">Name</th>
                    <th className="py-2.5 px-4">Designation</th>
                    <th className="py-2.5 px-4">Role in RTI Committee</th>
                    <th className="py-2.5 px-4">Mobile No</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.rtiMembers || []).map((mem: any, idx: number) => (
                    <tr key={mem._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{mem.sNo || idx + 1}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{mem.name}</td>
                      <td className="py-2.5 px-4">{mem.designation}</td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {mem.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-700">{mem.mobile}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => openEditModal("rtiMembers", mem, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("rtiMembers", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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

          {/* RTI Documents */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  RTI Official Documents & Office Orders
                </h3>
                <p className="text-slate-500 text-xs">Government Gazette notification and college constitution orders</p>
              </div>
              <button
                onClick={() => openAddModal("rtiDocuments", { title: "RTI Document", description: "Official RTI notification", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add RTI Document
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.rtiDocuments || []).map((doc: any, idx: number) => (
                <div key={doc._key || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">{doc.title}</h4>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPreviewPdf({ url: doc.fileUrl, title: doc.title })} className="p-1 hover:bg-slate-200 text-slate-600 rounded">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => openEditModal("rtiDocuments", doc, idx)} className="p-1 hover:bg-blue-100 text-blue-700 rounded">
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDeleteItem("rtiDocuments", idx)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs mt-1">{doc.description}</p>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {doc.fileUrl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 6: Annual Reports & Disclosure Archives                      */}
      {/* ================================================================ */}
      {activeTab === "reports_archives" && (
        <div className="flex flex-col gap-8">
          {/* Year-wise Annual Reports */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  Year-wise Annual Reports
                </h3>
                <p className="text-slate-500 text-xs">Official institutional annual reports by academic session</p>
              </div>
              <button
                onClick={() => openAddModal("annualReports", { year: "2026–2027", title: "Annual Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add Annual Report
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Report Title</th>
                    <th className="py-2.5 px-4">PDF URL</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.annualReports || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">{row.title}</td>
                      <td className="py-2.5 px-4 text-slate-500 max-w-xs truncate">{row.fileUrl}</td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEditModal("annualReports", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("annualReports", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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

          {/* Disclosure Archives (Multi-Column) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-outfit font-black text-slate-900 text-lg">
                  Historical Disclosure Archives (6-Column Record)
                </h3>
                <p className="text-slate-500 text-xs">Past years' mandatory disclosures, compliance docs, annual reports, statutory reports, and policies</p>
              </div>
              <button
                onClick={() => openAddModal("disclosureArchives", {
                  year: "2026–2027",
                  mandatoryDisclosuresUrl: "/documents/DefaultFile_1.pdf",
                  complianceDocumentsUrl: "/documents/DefaultFile_1.pdf",
                  annualReportUrl: "/documents/DefaultFile_1.pdf",
                  statutoryReportsUrl: "/documents/DefaultFile_1.pdf",
                  policiesUrl: "/documents/DefaultFile_1.pdf"
                })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add Archive Year Row
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002147] text-white uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="py-2.5 px-4">Academic Year</th>
                    <th className="py-2.5 px-4">Mandatory Disclosures</th>
                    <th className="py-2.5 px-4">Compliance Docs</th>
                    <th className="py-2.5 px-4">Annual Report</th>
                    <th className="py-2.5 px-4">Statutory Reports</th>
                    <th className="py-2.5 px-4">Policies</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {(data.disclosureArchives || []).map((row: any, idx: number) => (
                    <tr key={row._key || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.year}</td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.mandatoryDisclosuresUrl, title: `Archive ${row.year} - Disclosures` })} className="text-blue-700 hover:underline">
                          View
                        </button>
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.complianceDocumentsUrl, title: `Archive ${row.year} - Compliance` })} className="text-blue-700 hover:underline">
                          View
                        </button>
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.annualReportUrl, title: `Archive ${row.year} - Annual Report` })} className="text-blue-700 hover:underline">
                          View
                        </button>
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.statutoryReportsUrl, title: `Archive ${row.year} - Statutory Reports` })} className="text-blue-700 hover:underline">
                          View
                        </button>
                      </td>
                      <td className="py-2.5 px-4">
                        <button onClick={() => setPreviewPdf({ url: row.policiesUrl, title: `Archive ${row.year} - Policies` })} className="text-blue-700 hover:underline">
                          View
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => openEditModal("disclosureArchives", row, idx)} className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteItem("disclosureArchives", idx)} className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg">
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
        </div>
      )}

      {/* ================================================================ */}
      {/* GENERIC EDIT / ADD MODAL                                         */}
      {/* ================================================================ */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl flex flex-col gap-4 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <h3 className="font-outfit font-black text-lg text-[#002147]">
              {editIndex !== null ? "Edit Record" : "Add New Record"}
            </h3>

            <div className="flex flex-col gap-3.5 text-xs font-semibold text-slate-700">
              {/* Year input if exists */}
              {editingItem.year !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="e.g. 2026–2027"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Title input if exists */}
              {editingItem.title !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Document Title / Name</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Extension of Approval (EoA)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Programme Type if ANU */}
              {editingItem.programmeType !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Programme Level (UG or PG)</label>
                  <select
                    value={editingItem.programmeType || "ug"}
                    onChange={(e) => setEditingItem({ ...editingItem, programmeType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  >
                    <option value="ug">Undergraduate (UG)</option>
                    <option value="pg">Postgraduate (PG)</option>
                  </select>
                </div>
              )}

              {/* Description if exists */}
              {editingItem.description !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* RTI Specific: Name, Designation, Role, Mobile */}
              {editingItem.name !== undefined && (
                <>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Official Name</label>
                    <input
                      type="text"
                      value={editingItem.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Designation</label>
                    <input
                      type="text"
                      value={editingItem.designation || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">RTI Role</label>
                    <input
                      type="text"
                      value={editingItem.role || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                      placeholder="e.g. Public Information Officer (PIO)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Mobile Contact</label>
                    <input
                      type="text"
                      value={editingItem.mobile || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, mobile: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                </>
              )}

              {/* Standard PDF File Upload / URL */}
              {editingItem.fileUrl !== undefined && (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                  <label className="block text-slate-600 font-bold uppercase text-[10px]">Attach PDF Document</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all shrink-0">
                      <Upload className="h-3.5 w-3.5 text-blue-700" />
                      <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "fileUrl")}
                        disabled={isUploading}
                      />
                    </label>
                    <input
                      type="text"
                      value={editingItem.fileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="/documents/... or https://cdn.sanity.io/..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* NIRF Specific: 3 PDFs */}
              {editingItem.collegeDataUrl !== undefined && (
                <div className="flex flex-col gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">College Data PDF URL</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-2.5 py-1.5 bg-slate-100 text-xs font-bold rounded-lg shrink-0">
                        Upload
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "collegeDataUrl")} />
                      </label>
                      <input type="text" value={editingItem.collegeDataUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, collegeDataUrl: e.target.value })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Management Data PDF URL</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-2.5 py-1.5 bg-slate-100 text-xs font-bold rounded-lg shrink-0">
                        Upload
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "managementDataUrl")} />
                      </label>
                      <input type="text" value={editingItem.managementDataUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, managementDataUrl: e.target.value })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Overall Data PDF URL</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-2.5 py-1.5 bg-slate-100 text-xs font-bold rounded-lg shrink-0">
                        Upload
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "overallDataUrl")} />
                      </label>
                      <input type="text" value={editingItem.overallDataUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, overallDataUrl: e.target.value })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs" />
                    </div>
                  </div>
                </div>
              )}

              {/* Archive Specific: 5 URLs */}
              {editingItem.mandatoryDisclosuresUrl !== undefined && (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-500">Archive URLs</span>
                  <input type="text" placeholder="Mandatory Disclosures PDF URL" value={editingItem.mandatoryDisclosuresUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, mandatoryDisclosuresUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg" />
                  <input type="text" placeholder="Compliance Documents PDF URL" value={editingItem.complianceDocumentsUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, complianceDocumentsUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg" />
                  <input type="text" placeholder="Annual Report PDF URL" value={editingItem.annualReportUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, annualReportUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg" />
                  <input type="text" placeholder="Statutory Reports PDF URL" value={editingItem.statutoryReportsUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, statutoryReportsUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg" />
                  <input type="text" placeholder="Policies PDF URL" value={editingItem.policiesUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, policiesUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg" />
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white text-xs font-bold shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={!!previewPdf}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
          onClose={() => setPreviewPdf(null)}
        />
      )}
    </div>
  );
}
