"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Building2,
  BarChart3,
  Scale,
  Users,
  Archive,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  FileText,
  Upload,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  Link2,
  HeartHandshake,
  Coins,
  Landmark,
  FileCheck2,
  Phone,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function MandatoryDisclosuresManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Tab from A to H
  const [activeTab, setActiveTab] = useState<"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H">("A");

  // Sub-filter for Tab A (Statutory & Regulatory)
  const [tabASub, setTabASub] = useState<"mandatory" | "profile" | "anu" | "aicte" | "ugc" | "cce" | "apsche" | "aishe" | "nirf">("mandatory");
  // ANU sub-tab
  const [anuFilter, setAnuFilter] = useState<"ug" | "pg">("ug");

  // Modal State for generic Table / Card Item
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
      setError(err.message || "Network error while saving.");
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
          [fieldName === "secondFileUrl" ? "secondAssetId" : "assetId"]: json.assetId,
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

  // Open modal to add item
  const openAddModal = (type: string, initialFields: any) => {
    setModalType(type);
    setEditIndex(null);
    setEditingItem({
      _key: `${type}_${Date.now()}`,
      ...initialFields,
    });
    setModalOpen(true);
  };

  // Open modal to edit item
  const openEditModal = (type: string, index: number, item: any) => {
    setModalType(type);
    setEditIndex(index);
    setEditingItem({ ...item });
    setModalOpen(true);
  };

  // Save Modal
  const handleSaveModal = () => {
    if (!data || !modalType || !editingItem) return;
    const updatedArray = [...(data[modalType] || [])];
    if (editIndex !== null && editIndex >= 0) {
      updatedArray[editIndex] = editingItem;
    } else {
      updatedArray.push(editingItem);
    }
    setData({
      ...data,
      [modalType]: updatedArray,
    });
    setModalOpen(false);
    setEditingItem(null);
    setEditIndex(null);
  };

  // Delete item
  const handleDeleteItem = (type: string, index: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    const updatedArray = [...(data[modalType || type] || [])];
    updatedArray.splice(index, 1);
    setData({
      ...data,
      [type]: updatedArray,
    });
  };

  const TABS = [
    {
      id: "A",
      letter: "A",
      label: "Statutory & Regulatory",
      icon: ShieldCheck,
      count:
        (data?.mandatoryDisclosureDocs?.length || 0) +
        1 +
        (data?.anuAffiliations?.length || 0) +
        (data?.aicteApprovals?.length || 0) +
        (data?.ugcDocuments?.length || 0) +
        (data?.cceOrders?.length || 0) +
        (data?.apscheOrders?.length || 0) +
        (data?.aisheReports?.length || 0) +
        (data?.nirfSubmissions?.length || 0),
    },
    { id: "B", letter: "B", label: "Regulatory Compliance", icon: Scale, count: data?.regulatoryComplianceDocs?.length || 0 },
    { id: "C", letter: "C", label: "Right to Information", icon: Users, count: (data?.rtiMembers?.length || 0) + (data?.rtiDocuments?.length || 0) },
    { id: "D", letter: "D", label: "Student Welfare & Grievance", icon: HeartHandshake, count: data?.studentWelfareCards?.length || 0 },
    { id: "E", letter: "E", label: "Financial Transparency", icon: Coins, count: data?.financialDocuments?.length || 0 },
    { id: "F", letter: "F", label: "Governance & Policies", icon: Landmark, count: data?.governanceCards?.length || 0 },
    { id: "G", letter: "G", label: "Reports & Data", icon: BarChart3, count: (data?.annualReports?.length || 0) + (data?.dataStatsCards?.length || 0) },
    { id: "H", letter: "H", label: "Disclosure Archives", icon: Archive, count: data?.disclosureArchives?.length || 0 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <Loader2 className="h-10 w-10 text-blue-800 animate-spin" />
        <span className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Live Sanity Records...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* ── TOP ACTION BAR (REPLACES DUPLICATE HEADER BOX) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              Sanity Singleton Document: <span className="font-mono text-[11px] text-blue-700 font-extrabold">mandatory-disclosures-singleton</span>
            </span>
          </div>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
            Last updated: <strong className="text-slate-700">{data?.lastUpdated || "Live"}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchData}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            title="Reload from Sanity"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleSaveToSanity}
            disabled={saving}
            className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              saveSuccess
                ? "bg-emerald-600 text-white"
                : "bg-[#002147] hover:bg-blue-900 text-white"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Saving to Sanity...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Saved & Published!</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
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
          <span>All Mandatory Disclosures and compliance documents have been published to Sanity CDN!</span>
        </div>
      )}

      {/* ── CLEAN TAB SECTIONING: A TO H ── */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center text-center p-2.5 rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#002147] text-white border-[#002147] shadow-xs scale-[1.01]"
                    : "bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-transparent hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? "bg-amber-400 text-slate-900" : "bg-slate-200 text-slate-700"
                  }`}>
                    {tab.letter}
                  </span>
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-300" : "text-blue-700"}`} />
                </div>
                <span className="text-[11px] font-extrabold leading-tight line-clamp-2">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB A: Statutory & Regulatory                            */}
      {/* ========================================================= */}
      {activeTab === "A" && (
        <div className="flex flex-col gap-4">
          {/* Sub-tab navigation for Tab A */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/70 text-xs">
            {[
              { id: "mandatory", label: "1. Mandatory Disclosure", count: data.mandatoryDisclosureDocs?.length || 0 },
              { id: "profile", label: "2. Institutional Profile & Scope", count: 1 },
              { id: "anu", label: "3. ANU Affiliations (UG/PG)", count: data.anuAffiliations?.length || 0 },
              { id: "aicte", label: "4. AICTE Approvals", count: data.aicteApprovals?.length || 0 },
              { id: "ugc", label: "5. UGC Recognition", count: data.ugcDocuments?.length || 0 },
              { id: "cce", label: "6a. CCE Orders (Table A)", count: data.cceOrders?.length || 0 },
              { id: "apsche", label: "6b. APSCHE Orders (Table B)", count: data.apscheOrders?.length || 0 },
              { id: "aishe", label: "7. AISHE Reports", count: data.aisheReports?.length || 0 },
              { id: "nirf", label: "8. NIRF Submissions", count: data.nirfSubmissions?.length || 0 },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setTabASub(sub.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  tabASub === sub.id
                    ? "bg-[#002147] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/60"
                }`}
              >
                <span>{sub.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  tabASub === sub.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {sub.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mandatory Disclosure Documents Table */}
          {tabASub === "mandatory" && (
            <TableSectionCard
              title="Mandatory Disclosure Documents"
              subtitle="Official prescribed institutional disclosure documents (displayed in Section A.1 on public page)"
              onAdd={() => openAddModal("mandatoryDisclosureDocs", { sNo: (data.mandatoryDisclosureDocs?.length || 0) + 1, title: "New Document", description: "", fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={data.mandatoryDisclosureDocs || []}
                columns={["S.No", "Document Title", "PDF Document", "Redirect Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap text-center">{row.sNo || idx + 1}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("mandatoryDisclosureDocs", idx, row)} onDelete={() => handleDeleteItem("mandatoryDisclosureDocs", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* Institutional Profile & Programme Details Editor */}
          {tabASub === "profile" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-outfit font-black text-slate-900 text-base">
                  2. Institutional Profile &amp; Programme Details
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Configure the summary banner, programmes portal redirect link, and statutory sanctioned strength order PDF.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Section Title</label>
                  <input
                    type="text"
                    value={data.institutionalProfile?.title || ""}
                    onChange={(e) => setData({
                      ...data,
                      institutionalProfile: { ...(data.institutionalProfile || {}), title: e.target.value }
                    })}
                    placeholder="2. Institutional Profile & Programme Details"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={data.institutionalProfile?.subtitle || ""}
                    onChange={(e) => setData({
                      ...data,
                      institutionalProfile: { ...(data.institutionalProfile || {}), subtitle: e.target.value }
                    })}
                    placeholder="Academic programmes, duration, eligibility, and sanctioned intake"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Description Text</label>
                  <textarea
                    rows={3}
                    value={data.institutionalProfile?.description || ""}
                    onChange={(e) => setData({
                      ...data,
                      institutionalProfile: { ...(data.institutionalProfile || {}), description: e.target.value }
                    })}
                    placeholder="Comprehensive information about the institution and its academic programmes..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] leading-relaxed"
                  />
                </div>

                {/* Programmes Redirect Link */}
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px] uppercase tracking-wider">
                    <ExternalLink className="h-3.5 w-3.5 text-blue-700" />
                    <span>Button 1: Academic Programmes Link</span>
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Button Label</label>
                    <input
                      type="text"
                      value={data.institutionalProfile?.programmesBtnLabel || ""}
                      onChange={(e) => setData({
                        ...data,
                        institutionalProfile: { ...(data.institutionalProfile || {}), programmesBtnLabel: e.target.value }
                      })}
                      placeholder="View All Academic Programmes"
                      className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Redirecting Route / Link URL</label>
                    <input
                      type="text"
                      value={data.institutionalProfile?.programmesLink || ""}
                      onChange={(e) => setData({
                        ...data,
                        institutionalProfile: { ...(data.institutionalProfile || {}), programmesLink: e.target.value }
                      })}
                      placeholder="/courses or https://..."
                      className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Sanctioned Order PDF */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[11px] uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5 text-blue-700" />
                    <span>Button 2: Sanctioned Strength Order (PDF)</span>
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Button Label</label>
                    <input
                      type="text"
                      value={data.institutionalProfile?.sanctionedOrderBtnLabel || ""}
                      onChange={(e) => setData({
                        ...data,
                        institutionalProfile: { ...(data.institutionalProfile || {}), sanctionedOrderBtnLabel: e.target.value }
                      })}
                      placeholder="Sanctioned Strength Order (PDF)"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">PDF Document File / URL</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shrink-0">
                        <Upload className="h-3.5 w-3.5" />
                        <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={async (e) => {
                            if (!e.target.files?.[0]) return;
                            setIsUploading(true);
                            try {
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              formData.append("type", "file");
                              const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                              const json = await res.json();
                              if (json.success && json.url) {
                                setData({
                                  ...data,
                                  institutionalProfile: {
                                    ...(data.institutionalProfile || {}),
                                    sanctionedOrderFileUrl: json.url,
                                    sanctionedOrderAssetId: json.assetId,
                                  }
                                });
                              } else {
                                alert(json.error || "Failed to upload PDF");
                              }
                            } catch (err: any) {
                              alert(err.message || "Upload error");
                            } finally {
                              setIsUploading(false);
                            }
                          }}
                          disabled={isUploading}
                        />
                      </label>
                      <input
                        type="text"
                        value={data.institutionalProfile?.sanctionedOrderFileUrl || ""}
                        onChange={(e) => setData({
                          ...data,
                          institutionalProfile: { ...(data.institutionalProfile || {}), sanctionedOrderFileUrl: e.target.value }
                        })}
                        placeholder="/documents/... or https://cdn.sanity.io/..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono text-xs"
                      />
                    </div>
                  </div>
                  {data.institutionalProfile?.sanctionedOrderFileUrl && (
                    <div className="pt-1">
                      <PdfBadge
                        url={data.institutionalProfile.sanctionedOrderFileUrl}
                        label="Preview Sanctioned Order PDF"
                        onPreview={() => setPreviewPdf({
                          url: data.institutionalProfile.sanctionedOrderFileUrl,
                          title: data.institutionalProfile.sanctionedOrderBtnLabel || "Sanctioned Strength Order"
                        })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AICTE Table */}
          {tabASub === "aicte" && (
            <TableSectionCard
              title="AICTE Extension of Approval (EoA) Documents"
              subtitle="Year-wise AICTE approval letters with PDF files and optional portal redirect links"
              onAdd={() => openAddModal("aicteApprovals", { year: "2026–2027", title: "AICTE Approval / EoA", fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={data.aicteApprovals || []}
                columns={["Year", "Document Title", "PDF Document", "Redirecting Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("aicteApprovals", idx, row)} onDelete={() => handleDeleteItem("aicteApprovals", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* UGC Table */}
          {tabASub === "ugc" && (
            <TableSectionCard
              title="UGC Recognition Documents"
              subtitle="UGC Section 2(f) and 12(B) recognition orders and notifications"
              onAdd={() => openAddModal("ugcDocuments", { sNo: (data.ugcDocuments?.length || 0) + 1, title: "UGC Recognition Order", fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={data.ugcDocuments || []}
                columns={["S.No", "Document Title", "PDF Document", "Redirecting Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 w-16">{row.sNo || idx + 1}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("ugcDocuments", idx, row)} onDelete={() => handleDeleteItem("ugcDocuments", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* CCE Table */}
          {tabASub === "cce" && (
            <TableSectionCard
              title="CCE Orders & Proceedings (Table A)"
              subtitle="Commissionerate of Collegiate Education proceedings, staff, and sanction orders"
              onAdd={() => openAddModal("cceOrders", { year: "2025–2026", title: "CCE Order / Proceedings", fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={data.cceOrders || []}
                columns={["Year", "Document / Communication", "PDF Document", "Redirecting Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("cceOrders", idx, row)} onDelete={() => handleDeleteItem("cceOrders", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* APSCHE Table */}
          {tabASub === "apsche" && (
            <TableSectionCard
              title="APSCHE Orders & Communications (Table B)"
              subtitle="Andhra Pradesh State Council of Higher Education orders, fee directives, and admissions approvals"
              onAdd={() => openAddModal("apscheOrders", { year: "2025–2026", title: "APSCHE Order / Communication", fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={data.apscheOrders || []}
                columns={["Year", "Document / Communication", "PDF Document", "Redirecting Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("apscheOrders", idx, row)} onDelete={() => handleDeleteItem("apscheOrders", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* ANU Affiliations */}
          {tabASub === "anu" && (
            <TableSectionCard
              title="Acharya Nagarjuna University (ANU) Affiliations"
              subtitle="Permanent & temporary affiliation orders for UG & PG programmes"
              extraControls={
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setAnuFilter("ug")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      anuFilter === "ug" ? "bg-white text-blue-900 shadow-xs" : "text-slate-600"
                    }`}
                  >
                    UG Programmes
                  </button>
                  <button
                    onClick={() => setAnuFilter("pg")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      anuFilter === "pg" ? "bg-white text-blue-900 shadow-xs" : "text-slate-600"
                    }`}
                  >
                    PG Programmes
                  </button>
                </div>
              }
              onAdd={() => openAddModal("anuAffiliations", { programmeType: anuFilter, year: "2025–2026", title: `${anuFilter.toUpperCase()} Affiliation Order`, fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={(data.anuAffiliations || []).filter((item: any) => (item.programmeType || "ug").toLowerCase() === anuFilter)}
                columns={["Programme", "Academic Year", "Order Title", "PDF Document", "Redirecting Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                        {row.programmeType?.toUpperCase() || "UG"}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons
                        onEdit={() => {
                          const realIdx = (data.anuAffiliations || []).indexOf(row);
                          openEditModal("anuAffiliations", realIdx, row);
                        }}
                        onDelete={() => {
                          const realIdx = (data.anuAffiliations || []).indexOf(row);
                          handleDeleteItem("anuAffiliations", realIdx);
                        }}
                      />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* AISHE Table */}
          {tabASub === "aishe" && (
            <TableSectionCard
              title="AISHE Certificates & Reports"
              subtitle="All India Survey on Higher Education (Ministry of Education, MHRD) Certificates"
              onAdd={() => openAddModal("aisheReports", { sNo: (data.aisheReports?.length || 0) + 1, year: "2024–2025", title: "AISHE Certificate", fileUrl: "", redirectUrl: "" })}
            >
              <DataTable
                items={data.aisheReports || []}
                columns={["S.No", "Year", "Certificate Title", "PDF Document", "Redirecting Link", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 w-16">{row.sNo || idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <LinkBadge url={row.redirectUrl} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("aisheReports", idx, row)} onDelete={() => handleDeleteItem("aisheReports", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}

          {/* NIRF Table */}
          {tabASub === "nirf" && (
            <TableSectionCard
              title="NIRF Submissions & Data Reports"
              subtitle="National Institutional Ranking Framework data uploads (College, Management, Overall)"
              onAdd={() => openAddModal("nirfSubmissions", { year: "2025–2026", collegeDataUrl: "", collegeRedirectUrl: "", managementDataUrl: "", managementRedirectUrl: "", overallDataUrl: "", overallRedirectUrl: "" })}
            >
              <DataTable
                items={data.nirfSubmissions || []}
                columns={["Academic Year", "College Data", "Management Data", "Overall Data", "Actions"]}
                renderRow={(row, idx) => (
                  <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <PdfBadge url={row.collegeDataUrl} label="College PDF" onPreview={() => setPreviewPdf({ url: row.collegeDataUrl, title: `NIRF ${row.year} - College Data` })} />
                        {row.collegeRedirectUrl && <LinkBadge url={row.collegeRedirectUrl} />}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <PdfBadge url={row.managementDataUrl} label="Management PDF" onPreview={() => setPreviewPdf({ url: row.managementDataUrl, title: `NIRF ${row.year} - Management Data` })} />
                        {row.managementRedirectUrl && <LinkBadge url={row.managementRedirectUrl} />}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <PdfBadge url={row.overallDataUrl} label="Overall PDF" onPreview={() => setPreviewPdf({ url: row.overallDataUrl, title: `NIRF ${row.year} - Overall Data` })} />
                        {row.overallRedirectUrl && <LinkBadge url={row.overallRedirectUrl} />}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ActionButtons onEdit={() => openEditModal("nirfSubmissions", idx, row)} onDelete={() => handleDeleteItem("nirfSubmissions", idx)} />
                    </td>
                  </tr>
                )}
              />
            </TableSectionCard>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB B: Regulatory Compliance                             */}
      {/* ========================================================= */}
      {activeTab === "B" && (
        <CardGridSection
          title="Section B: Regulatory Compliance Documents & Portals"
          subtitle="Statutory AICTE, UGC, APSCHE, and other state/central government compliance declarations"
          onAdd={() => openAddModal("regulatoryComplianceDocs", { code: "compliance", title: "New Compliance Declaration", description: "Statutory compliance disclosure description.", fileUrl: "", redirectUrl: "" })}
        >
          {(data.regulatoryComplianceDocs || []).map((doc: any, idx: number) => (
            <div key={doc._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                    {doc.code || "COMPLIANCE"}
                  </span>
                  <ActionButtons onEdit={() => openEditModal("regulatoryComplianceDocs", idx, doc)} onDelete={() => handleDeleteItem("regulatoryComplianceDocs", idx)} />
                </div>
                <h4 className="font-outfit font-extrabold text-sm text-slate-900">{doc.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{doc.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <PdfBadge url={doc.fileUrl} onPreview={() => setPreviewPdf({ url: doc.fileUrl, title: doc.title })} />
                <LinkBadge url={doc.redirectUrl} />
              </div>
            </div>
          ))}
        </CardGridSection>
      )}

      {/* ========================================================= */}
      {/* TAB C: Right to Information (RTI)                        */}
      {/* ========================================================= */}
      {activeTab === "C" && (
        <div className="flex flex-col gap-6">
          {/* RTI Committee Members */}
          <TableSectionCard
            title="1. RTI Committee Members & Designated Authorities"
            subtitle="Designated First Appellate Authority, Public Information Officer (PIO), and Assistant PIO"
            onAdd={() => openAddModal("rtiMembers", { sNo: (data.rtiMembers?.length || 0) + 1, name: "", designation: "", role: "Member", mobile: "" })}
          >
            <DataTable
              items={data.rtiMembers || []}
              columns={["S.No", "Name", "Designation", "Role in RTI Committee", "Mobile Contact", "Actions"]}
              renderRow={(mem, idx) => (
                <tr key={mem._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-900 w-16">{mem.sNo || idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{mem.name}</td>
                  <td className="py-3 px-4 text-slate-600">{mem.designation}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      {mem.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-800 font-bold whitespace-nowrap">{mem.mobile}</td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("rtiMembers", idx, mem)} onDelete={() => handleDeleteItem("rtiMembers", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* RTI Guidelines & Official Documents */}
          <CardGridSection
            title="2. RTI Act Guidelines & Statutory Notifications"
            subtitle="Official gazettes, RTI Act 2005 documents, and institution constitution orders"
            onAdd={() => openAddModal("rtiDocuments", { title: "New RTI Document", description: "Official statutory RTI order.", fileUrl: "", redirectUrl: "" })}
          >
            {(data.rtiDocuments || []).map((doc: any, idx: number) => (
              <div key={doc._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">RTI DOC</span>
                    <ActionButtons onEdit={() => openEditModal("rtiDocuments", idx, doc)} onDelete={() => handleDeleteItem("rtiDocuments", idx)} />
                  </div>
                  <h4 className="font-outfit font-extrabold text-sm text-slate-900">{doc.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{doc.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                  <PdfBadge url={doc.fileUrl} onPreview={() => setPreviewPdf({ url: doc.fileUrl, title: doc.title })} />
                  <LinkBadge url={doc.redirectUrl} />
                </div>
              </div>
            ))}
          </CardGridSection>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB D: Student Welfare & Grievance                       */}
      {/* ========================================================= */}
      {activeTab === "D" && (
        <CardGridSection
          title="Section D: Student Welfare, Safety & Grievance Redressal Cells"
          subtitle="Statutory student-support cells, internal committees, and direct redirecting portal links"
          onAdd={() => openAddModal("studentWelfareCards", { title: "New Welfare Cell", href: "/student-support/", description: "Cell description and functions.", fileUrl: "" })}
        >
          {(data.studentWelfareCards || []).map((card: any, idx: number) => (
            <div key={card._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
                    WELFARE CELL
                  </span>
                  <ActionButtons onEdit={() => openEditModal("studentWelfareCards", idx, card)} onDelete={() => handleDeleteItem("studentWelfareCards", idx)} />
                </div>
                <h4 className="font-outfit font-extrabold text-sm text-slate-900">{card.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{card.description}</p>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-mono text-blue-700 bg-blue-50/80 px-2 py-1 rounded-lg">
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{card.href || "No link assigned"}</span>
                </div>
                {card.fileUrl && (
                  <PdfBadge url={card.fileUrl} label="Attached Policy PDF" onPreview={() => setPreviewPdf({ url: card.fileUrl, title: card.title })} />
                )}
              </div>
            </div>
          ))}
        </CardGridSection>
      )}

      {/* ========================================================= */}
      {/* TAB E: Financial Transparency                            */}
      {/* ========================================================= */}
      {activeTab === "E" && (
        <TableSectionCard
          title="Section E: Financial Transparency Documents & Policy Portals"
          subtitle="Annual budgets, audit statements, fee regulations, AFRC orders, procurement policies, and related financial disclosures"
          onAdd={() => openAddModal("financialDocuments", { sNo: (data.financialDocuments?.length || 0) + 1, code: "finance", title: "New Financial Document", btnLabel: "", description: "Financial disclosure details.", fileUrl: "", secondFileUrl: "", secondBtnLabel: "", redirectUrl: "" })}
        >
          <DataTable
            items={data.financialDocuments || []}
            columns={["S.No", "Title", "Primary PDF", "Second PDF", "Redirect Link", "Actions"]}
            renderRow={(doc, idx) => (
              <tr key={doc._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap text-center">{doc.sNo || idx + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-outfit font-extrabold text-sm text-slate-900">{doc.title}</span>
                    {doc.btnLabel && <span className="text-[10px] text-slate-500 italic">Button: {doc.btnLabel}</span>}
                    {doc.description && <span className="text-xs text-slate-500 line-clamp-2">{doc.description}</span>}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <PdfBadge url={doc.fileUrl} onPreview={() => setPreviewPdf({ url: doc.fileUrl, title: doc.title })} />
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {doc.secondFileUrl ? (
                    <PdfBadge url={doc.secondFileUrl} label={doc.secondBtnLabel || "2nd PDF"} onPreview={() => setPreviewPdf({ url: doc.secondFileUrl, title: doc.secondBtnLabel || doc.title })} />
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <LinkBadge url={doc.redirectUrl} />
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <ActionButtons onEdit={() => openEditModal("financialDocuments", idx, doc)} onDelete={() => handleDeleteItem("financialDocuments", idx)} />
                </td>
              </tr>
            )}
          />
        </TableSectionCard>
      )}

      {/* ========================================================= */}
      {/* TAB F: Governance & Policies                             */}
      {/* ========================================================= */}
      {activeTab === "F" && (
        <CardGridSection
          title="Section F: Governance Structure & Institutional Policies"
          subtitle="Administrative organogram, code of conduct, academic regulations, service rules, and charters"
          onAdd={() => openAddModal("governanceCards", { title: "New Governance Policy", href: "/about/policies", description: "Policy scope and directives.", fileUrl: "" })}
        >
          {(data.governanceCards || []).map((card: any, idx: number) => (
            <div key={card._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-800 border border-indigo-200">
                    GOVERNANCE
                  </span>
                  <ActionButtons onEdit={() => openEditModal("governanceCards", idx, card)} onDelete={() => handleDeleteItem("governanceCards", idx)} />
                </div>
                <h4 className="font-outfit font-extrabold text-sm text-slate-900">{card.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{card.description}</p>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-mono text-blue-700 bg-blue-50/80 px-2 py-1 rounded-lg">
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{card.href || "No link assigned"}</span>
                </div>
                {card.fileUrl && (
                  <PdfBadge url={card.fileUrl} label="Policy Document PDF" onPreview={() => setPreviewPdf({ url: card.fileUrl, title: card.title })} />
                )}
              </div>
            </div>
          ))}
        </CardGridSection>
      )}

      {/* ========================================================= */}
      {/* TAB G: Institutional Reports & Data                      */}
      {/* ========================================================= */}
      {activeTab === "G" && (
        <div className="flex flex-col gap-6">
          {/* Annual Reports */}
          <TableSectionCard
            title="1. Year-wise Annual Reports"
            subtitle="Official institutional annual reports with PDF downloads and web view links"
            onAdd={() => openAddModal("annualReports", { year: "2025–2026", title: "Annual Report 2025–2026", fileUrl: "", redirectUrl: "" })}
          >
            <DataTable
              items={data.annualReports || []}
              columns={["Academic Year", "Report Title", "PDF Document", "Redirecting Link", "Actions"]}
              renderRow={(row, idx) => (
                <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{row.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={row.fileUrl} onPreview={() => setPreviewPdf({ url: row.fileUrl, title: row.title })} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <LinkBadge url={row.redirectUrl} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("annualReports", idx, row)} onDelete={() => handleDeleteItem("annualReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* Institutional Statistics Cards */}
          <CardGridSection
            title="2. Institutional Statistics & Academic Performance Links"
            subtitle="Enrollment figures, academic results, gold medallist lists, and demographic records"
            onAdd={() => openAddModal("dataStatsCards", { title: "New Statistics Card", href: "/academics/", description: "Data and metrics overview.", fileUrl: "" })}
          >
            {(data.dataStatsCards || []).map((card: any, idx: number) => (
              <div key={card._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                      DATA / STATS
                    </span>
                    <ActionButtons onEdit={() => openEditModal("dataStatsCards", idx, card)} onDelete={() => handleDeleteItem("dataStatsCards", idx)} />
                  </div>
                  <h4 className="font-outfit font-extrabold text-sm text-slate-900">{card.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{card.description}</p>
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-700 bg-blue-50/80 px-2 py-1 rounded-lg">
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{card.href || "No link assigned"}</span>
                  </div>
                  {card.fileUrl && (
                    <PdfBadge url={card.fileUrl} label="Data Sheet PDF" onPreview={() => setPreviewPdf({ url: card.fileUrl, title: card.title })} />
                  )}
                </div>
              </div>
            ))}
          </CardGridSection>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB H: Disclosure Archives & Sign-off                    */}
      {/* ========================================================= */}
      {activeTab === "H" && (
        <div className="flex flex-col gap-6">
          {/* Archives Table */}
          <TableSectionCard
            title="1. Historic Disclosure Archives Matrix"
            subtitle="Previous years comprehensive disclosures, compliance documents, statutory audits, and policies"
            onAdd={() => openAddModal("disclosureArchives", { year: "2025–2026", mandatoryDisclosuresUrl: "", complianceDocumentsUrl: "", annualReportUrl: "", statutoryReportsUrl: "", policiesUrl: "" })}
          >
            <DataTable
              items={data.disclosureArchives || []}
              columns={["Year", "Mandatory Disclosures", "Compliance Docs", "Annual Report", "Statutory Reports", "Policies", "Actions"]}
              renderRow={(row, idx) => (
                <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={row.mandatoryDisclosuresUrl} label="Disclosures" onPreview={() => setPreviewPdf({ url: row.mandatoryDisclosuresUrl, title: `Archive ${row.year} - Disclosures` })} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={row.complianceDocumentsUrl} label="Compliance" onPreview={() => setPreviewPdf({ url: row.complianceDocumentsUrl, title: `Archive ${row.year} - Compliance` })} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={row.annualReportUrl} label="Annual Report" onPreview={() => setPreviewPdf({ url: row.annualReportUrl, title: `Archive ${row.year} - Report` })} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={row.statutoryReportsUrl} label="Statutory" onPreview={() => setPreviewPdf({ url: row.statutoryReportsUrl, title: `Archive ${row.year} - Statutory` })} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={row.policiesUrl} label="Policies" onPreview={() => setPreviewPdf({ url: row.policiesUrl, title: `Archive ${row.year} - Policies` })} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("disclosureArchives", idx, row)} onDelete={() => handleDeleteItem("disclosureArchives", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* Periodic Verification Metadata */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="font-outfit text-base font-extrabold text-[#002147] mb-1">
              2. Periodic Verification Sign-off & Page Metadata
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Authorized institutional certification signature and latest review date shown on public pages
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Verified By (Authority)</label>
                <input
                  type="text"
                  value={data.verifiedBy || ""}
                  onChange={(e) => setData({ ...data, verifiedBy: e.target.value })}
                  placeholder="Principal / IQAC Coordinator"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#002147]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Last Updated Date</label>
                <input
                  type="text"
                  value={data.lastUpdated || ""}
                  onChange={(e) => setData({ ...data, lastUpdated: e.target.value })}
                  placeholder="15 September 2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#002147]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* EDIT / ADD MODAL                                          */}
      {/* ========================================================= */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-outfit text-lg font-black text-[#002147]">
                {editIndex !== null ? "Edit Record" : "Add New Record"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              {/* Year */}
              {editingItem.year !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="2025–2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* S.No */}
              {editingItem.sNo !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Serial Number</label>
                  <input
                    type="number"
                    value={editingItem.sNo || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, sNo: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Title */}
              {editingItem.title !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Title / Name</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Document or Policy Title"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Code */}
              {editingItem.code !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Category Code / Key</label>
                  <input
                    type="text"
                    value={editingItem.code || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                    placeholder="e.g. aicte / budget / ugc"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Description */}
              {editingItem.description !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Description / Scope</label>
                  <textarea
                    rows={3}
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    placeholder="Brief description or purpose..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Redirecting Link (href or redirectUrl) */}
              {editingItem.name === undefined && editingItem.mandatoryDisclosuresUrl === undefined && editingItem.collegeDataUrl === undefined && (
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px] uppercase tracking-wider">
                    <ExternalLink className="h-3.5 w-3.5 text-blue-700" />
                    <span>Redirecting Link (Web Page / Portal URL)</span>
                  </div>
                  <input
                    type="text"
                    value={editingItem.redirectUrl || editingItem.href || ""}
                    onChange={(e) => {
                      if (editingItem.href !== undefined) {
                        setEditingItem({ ...editingItem, href: e.target.value });
                      } else {
                        setEditingItem({ ...editingItem, redirectUrl: e.target.value });
                      }
                    }}
                    placeholder="/student-support/... or https://..."
                    className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-500">
                    Entering a link enables direct redirection to this internal portal page or external authority website.
                  </p>
                </div>
              )}

              {/* Standard PDF File Upload / URL */}
              {editingItem.name === undefined && editingItem.mandatoryDisclosuresUrl === undefined && editingItem.collegeDataUrl === undefined && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5 text-blue-700" />
                    <span>PDF Document File / URL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shrink-0">
                      <Upload className="h-3.5 w-3.5" />
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
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Button Label (for financial documents) */}
              {editingItem.btnLabel !== undefined && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Primary Button Label</label>
                  <input
                    type="text"
                    value={editingItem.btnLabel || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, btnLabel: e.target.value })}
                    placeholder="e.g. Annual Budget, Fee Structure..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs"
                  />
                </div>
              )}

              {/* Second File Upload / URL (for financial documents) */}
              {editingItem.secondFileUrl !== undefined && (
                <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold text-[11px] uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5 text-amber-700" />
                    <span>Second PDF Document (Optional)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shrink-0">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload 2nd PDF"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "secondFileUrl")}
                        disabled={isUploading}
                      />
                    </label>
                    <input
                      type="text"
                      value={editingItem.secondFileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, secondFileUrl: e.target.value })}
                      placeholder="/documents/... or https://cdn.sanity.io/..."
                      className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs font-mono"
                    />
                  </div>
                  <div className="mt-1">
                    <label className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-0.5">Second Button Label</label>
                    <input
                      type="text"
                      value={editingItem.secondBtnLabel || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, secondBtnLabel: e.target.value })}
                      placeholder="e.g. Balance Sheet, Audit Report..."
                      className="w-full px-2 py-1.5 bg-white border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* NIRF Specific: 3 PDFs and 3 Redirect Links */}
              {editingItem.collegeDataUrl !== undefined && (
                <div className="flex flex-col gap-3 pt-2 border-t border-slate-200">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">College Data (PDF & Link)</label>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="cursor-pointer px-2.5 py-1.5 bg-[#002147] text-white text-xs font-bold rounded-lg shrink-0">
                        Upload
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "collegeDataUrl")} />
                      </label>
                      <input type="text" placeholder="PDF URL" value={editingItem.collegeDataUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, collegeDataUrl: e.target.value })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" />
                    </div>
                    <input type="text" placeholder="Optional College Redirect URL (e.g. https://...)" value={editingItem.collegeRedirectUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, collegeRedirectUrl: e.target.value })} className="w-full px-2 py-1.5 border border-blue-200 rounded-lg text-xs font-mono bg-blue-50/50" />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Management Data (PDF & Link)</label>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="cursor-pointer px-2.5 py-1.5 bg-[#002147] text-white text-xs font-bold rounded-lg shrink-0">
                        Upload
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "managementDataUrl")} />
                      </label>
                      <input type="text" placeholder="PDF URL" value={editingItem.managementDataUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, managementDataUrl: e.target.value })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" />
                    </div>
                    <input type="text" placeholder="Optional Management Redirect URL (e.g. https://...)" value={editingItem.managementRedirectUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, managementRedirectUrl: e.target.value })} className="w-full px-2 py-1.5 border border-blue-200 rounded-lg text-xs font-mono bg-blue-50/50" />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Overall Data (PDF & Link)</label>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label className="cursor-pointer px-2.5 py-1.5 bg-[#002147] text-white text-xs font-bold rounded-lg shrink-0">
                        Upload
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "overallDataUrl")} />
                      </label>
                      <input type="text" placeholder="PDF URL" value={editingItem.overallDataUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, overallDataUrl: e.target.value })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs font-mono" />
                    </div>
                    <input type="text" placeholder="Optional Overall Redirect URL (e.g. https://...)" value={editingItem.overallRedirectUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, overallRedirectUrl: e.target.value })} className="w-full px-2 py-1.5 border border-blue-200 rounded-lg text-xs font-mono bg-blue-50/50" />
                  </div>
                </div>
              )}

              {/* RTI Member Fields */}
              {editingItem.name !== undefined && editingItem.designation !== undefined && (
                <>
                  <div>
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Officer Name</label>
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
                    <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Role in RTI Committee</label>
                    <input
                      type="text"
                      value={editingItem.role || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
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

              {/* Archive Specific: 5 URLs */}
              {editingItem.mandatoryDisclosuresUrl !== undefined && (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-black uppercase text-slate-500">Archive URLs</span>
                  <input type="text" placeholder="Mandatory Disclosures PDF / Link URL" value={editingItem.mandatoryDisclosuresUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, mandatoryDisclosuresUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg font-mono text-xs" />
                  <input type="text" placeholder="Compliance Documents PDF / Link URL" value={editingItem.complianceDocumentsUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, complianceDocumentsUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg font-mono text-xs" />
                  <input type="text" placeholder="Annual Report PDF / Link URL" value={editingItem.annualReportUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, annualReportUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg font-mono text-xs" />
                  <input type="text" placeholder="Statutory Reports PDF / Link URL" value={editingItem.statutoryReportsUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, statutoryReportsUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg font-mono text-xs" />
                  <input type="text" placeholder="Policies PDF / Link URL" value={editingItem.policiesUrl || ""} onChange={(e) => setEditingItem({ ...editingItem, policiesUrl: e.target.value })} className="px-2 py-1.5 border rounded-lg font-mono text-xs" />
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white text-xs font-bold shadow-xs cursor-pointer"
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

// ─────────────────────────────────────────────────────────────
// Sub-components for clean rendering
// ─────────────────────────────────────────────────────────────

function TableSectionCard({ title, subtitle, extraControls, onAdd, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {extraControls}
          {onAdd && (
            <button
              onClick={onAdd}
              className="px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Record</span>
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function CardGridSection({ title, subtitle, onAdd, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer w-fit"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Card</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

function DataTable({ items, columns, renderRow }: { items: any[]; columns: string[]; renderRow: (item: any, idx: number) => React.ReactNode }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs font-medium">
        No records found. Click &quot;Add Record&quot; to create one.
      </div>
    );
  }
  return (
    <table className="w-full text-left text-xs border-collapse">
      <thead>
        <tr className="bg-slate-100/70 border-b border-slate-200/80 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
          {columns.map((c, i) => (
            <th key={i} className={`py-3 px-4 ${i === columns.length - 1 ? "text-right" : ""}`}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 font-medium">{items.map(renderRow)}</tbody>
    </table>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={onEdit}
        className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-100/70 transition-all cursor-pointer"
        title="Edit Record"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100/70 transition-all cursor-pointer"
        title="Delete Record"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function PdfBadge({ url, label = "View PDF", onPreview }: { url?: string; label?: string; onPreview: () => void }) {
  if (!url || url.trim() === "") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
        <FileText className="h-3 w-3" /> None
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onPreview}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white border border-blue-200/80 text-[11px] font-bold transition-all cursor-pointer w-fit"
    >
      <Eye className="h-3 w-3" />
      <span>{label}</span>
    </button>
  );
}

function LinkBadge({ url }: { url?: string }) {
  if (!url || url.trim() === "") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
        <Link2 className="h-3 w-3" /> None
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200/80 text-[11px] font-bold transition-all cursor-pointer w-fit"
    >
      <ExternalLink className="h-3 w-3" />
      <span className="truncate max-w-[120px]">Redirect Link</span>
    </a>
  );
}
