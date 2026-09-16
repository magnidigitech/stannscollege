"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  FileText,
  Upload,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  BookOpen,
  FlaskConical,
  Award,
  Lightbulb,
  Building,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { DEFAULT_RESEARCH_DATA } from "@/lib/sanity";

interface ResearchManagerProps {
  onNotify?: (msg: string, type: "success" | "error" | "info") => void;
}

export function ResearchManager({ onNotify }: ResearchManagerProps) {
  const [data, setData] = useState<any>(DEFAULT_RESEARCH_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/research");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setData(DEFAULT_RESEARCH_DATA);
      }
    } catch (err) {
      console.error("Error loading research data:", err);
      notify("Failed to load live data. Using local defaults.", "error");
      setData(DEFAULT_RESEARCH_DATA);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg: string, type: "success" | "error" | "info" = "info") => {
    if (onNotify) onNotify(msg, type);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        notify("Research & Innovation data saved successfully!", "success");
        if (json.data) setData(json.data);
      } else {
        notify(json.error || "Failed to save data.", "error");
      }
    } catch (err) {
      console.error("Save error:", err);
      notify("Network error while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setFormState((prev: any) => ({
          ...prev,
          [fieldName]: json.url,
          [`${fieldName.replace("Url", "")}AssetId`]: json.assetId || json.id,
        }));
        notify("File uploaded successfully!", "success");
      } else {
        notify(json.error || "File upload failed.", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      notify("Failed to upload file.", "error");
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = (type: string, initialData: any = {}) => {
    setModalType(type);
    setEditingIndex(null);
    setFormState({ ...initialData });
    setModalOpen(true);
  };

  const openEditModal = (type: string, index: number, currentData: any) => {
    setModalType(type);
    setEditingIndex(index);
    setFormState({ ...currentData });
    setModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...data };

    if (modalType === "rdcReports") {
      const list = [...(updated.rdc.activityReports || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `rdc_ar_${Date.now()}` });
      updated.rdc.activityReports = list;
    } else if (modalType === "facilities") {
      const list = [...(updated.infrastructure.facilities || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `inf_${Date.now()}` });
      updated.infrastructure.facilities = list;
    } else if (modalType === "publications") {
      const list = [...(updated.scholarlyContributions.publications || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `pub_${Date.now()}` });
      updated.scholarlyContributions.publications = list;
    } else if (modalType === "paperPresentations") {
      const list = [...(updated.scholarlyContributions.paperPresentations || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `pres_${Date.now()}` });
      updated.scholarlyContributions.paperPresentations = list;
    } else if (modalType === "booksAndChapters") {
      const list = [...(updated.scholarlyContributions.booksAndChapters || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `book_${Date.now()}` });
      updated.scholarlyContributions.booksAndChapters = list;
    } else if (modalType === "activitiesMatrix") {
      const list = [...(updated.patentsAndInnovations.activitiesMatrix || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `act_${Date.now()}` });
      updated.patentsAndInnovations.activitiesMatrix = list;
    } else if (modalType === "iprReports") {
      const list = [...(updated.iprCell.activityReports || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `ipr_ar_${Date.now()}` });
      updated.iprCell.activityReports = list;
    } else if (modalType === "edReports") {
      const list = [...(updated.entrepreneurshipCentre.activityReports || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `ed_ar_${Date.now()}` });
      updated.entrepreneurshipCentre.activityReports = list;
    } else if (modalType === "iicReports") {
      const list = [...(updated.iicCell.activityReports || [])];
      if (editingIndex !== null) list[editingIndex] = formState;
      else list.push({ ...formState, _key: `iic_ar_${Date.now()}` });
      updated.iicCell.activityReports = list;
    }

    setData(updated);
    setModalOpen(false);
    notify("Item updated. Remember to click Save Changes.", "info");
  };

  const handleDeleteItem = (type: string, index: number) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    const updated = { ...data };

    if (type === "rdcReports") updated.rdc.activityReports.splice(index, 1);
    else if (type === "facilities") updated.infrastructure.facilities.splice(index, 1);
    else if (type === "publications") updated.scholarlyContributions.publications.splice(index, 1);
    else if (type === "paperPresentations") updated.scholarlyContributions.paperPresentations.splice(index, 1);
    else if (type === "booksAndChapters") updated.scholarlyContributions.booksAndChapters.splice(index, 1);
    else if (type === "activitiesMatrix") updated.patentsAndInnovations.activitiesMatrix.splice(index, 1);
    else if (type === "iprReports") updated.iprCell.activityReports.splice(index, 1);
    else if (type === "edReports") updated.entrepreneurshipCentre.activityReports.splice(index, 1);
    else if (type === "iicReports") updated.iicCell.activityReports.splice(index, 1);

    setData(updated);
    notify("Item deleted from local state. Click Save Changes to commit.", "info");
  };

  const openPdf = (url?: string, title?: string) => {
    const targetUrl = url && url.trim() !== "" ? url : "/documents/DefaultFile_1.pdf";
    setPreviewPdf({
      url: targetUrl,
      title: title || "Research Document",
    });
  };

  const TAB_ITEMS = [
    { id: 1, name: "1. Research Policy", icon: ShieldCheck },
    { id: 2, name: "2. RDC Cell", icon: FlaskConical },
    { id: 3, name: "3. Infrastructure", icon: Building },
    { id: 4, name: "4. Publications & Books", icon: BookOpen },
    { id: 5, name: "5. Patents & Innovations", icon: Sparkles },
    { id: 6, name: "6. IPR Cell", icon: Award },
    { id: 7, name: "7. ED / Start-Up Centre", icon: Briefcase },
    { id: 8, name: "8. IIC / Industry Cell", icon: Lightbulb },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16 bg-white rounded-3xl border border-slate-200">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="h-8 w-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Loading Research &amp; Innovation Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Bar with Action Buttons */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#002147] to-blue-800 text-white flex items-center justify-center shadow-md shadow-blue-900/10">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-outfit font-black text-xl text-slate-900 tracking-tight">
              Research &amp; Innovation Management
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Manage all 8 sections: RDC, Publications, Innovations, IPR Cell, ED Centre, and IIC Cell
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={saving}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reload</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-950/10 transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70">
        {TAB_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#002147] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-indigo-300" : "text-slate-400"}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: 1. Research Policy                                 */}
      {/* ========================================================= */}
      {activeTab === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-outfit font-black text-slate-900 text-base">
              1. Research Promotion, Ethics &amp; Funding Policy
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              General institutional research philosophy, policy description, and statutory policy PDF document
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Title</label>
              <input
                type="text"
                value={data.researchPolicy?.title || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    researchPolicy: { ...data.researchPolicy, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline / Motto</label>
              <input
                type="text"
                value={data.researchPolicy?.tagline || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    researchPolicy: { ...data.researchPolicy, tagline: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Policy Description</label>
            <textarea
              rows={4}
              value={data.researchPolicy?.description || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  researchPolicy: { ...data.researchPolicy, description: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium leading-relaxed"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <label className="block text-xs font-bold text-slate-800 uppercase">Research Policy Document (PDF)</label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={data.researchPolicy?.policyFileUrl || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    researchPolicy: { ...data.researchPolicy, policyFileUrl: e.target.value },
                  })
                }
                placeholder="/documents/DefaultFile_1.pdf"
                className="flex-1 min-w-[240px] px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => openPdf(data.researchPolicy?.policyFileUrl, "Research Policy Document")}
                className="px-3 py-2 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
              <label className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-300 inline-flex items-center gap-1.5 cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span>Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const fd = new FormData();
                    fd.append("file", file);
                    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                    const j = await res.json();
                    if (j.success && j.url) {
                      setData({
                        ...data,
                        researchPolicy: {
                          ...data.researchPolicy,
                          policyFileUrl: j.url,
                          policyAssetId: j.assetId || j.id,
                        },
                      });
                      notify("Policy PDF uploaded successfully!", "success");
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: 2. RDC Cell                                        */}
      {/* ========================================================= */}
      {activeTab === 2 && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                2. Research &amp; Development Cell (RDC) Overview &amp; Policy
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Vision, Mission, Objectives, and RDC Policy document
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">RDC Overview</label>
              <textarea
                rows={3}
                value={data.rdc?.description || ""}
                onChange={(e) => setData({ ...data, rdc: { ...data.rdc, description: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vision</label>
                <textarea
                  rows={2}
                  value={data.rdc?.vision || ""}
                  onChange={(e) => setData({ ...data, rdc: { ...data.rdc, vision: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Institutional Commitment</label>
                <textarea
                  rows={2}
                  value={data.rdc?.commitment || ""}
                  onChange={(e) => setData({ ...data, rdc: { ...data.rdc, commitment: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
              <label className="block text-xs font-bold text-slate-800 uppercase">RDC Policy Document (PDF)</label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={data.rdc?.rdcPolicyFileUrl || ""}
                  onChange={(e) => setData({ ...data, rdc: { ...data.rdc, rdcPolicyFileUrl: e.target.value } })}
                  className="flex-1 min-w-[240px] px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => openPdf(data.rdc?.rdcPolicyFileUrl, "RDC Policy Document")}
                  className="px-3 py-2 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* RDC Annual Activity Reports Table */}
          <TableSectionCard
            title="RDC Annual Activity Reports"
            subtitle="Annual reports documenting research programmes, webinars, conferences, and achievements"
            onAdd={() => openAddModal("rdcReports", { year: "2026–2027", title: "RDC Activity Report 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.rdc?.activityReports || []}
              columns={["Academic Year", "Report Title", "Document Link / Action", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.fileUrl, item.title)}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("rdcReports", idx, item)} onDelete={() => handleDeleteItem("rdcReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: 3. Infrastructure                                  */}
      {/* ========================================================= */}
      {activeTab === 3 && (
        <CardGridSection
          title="3. Research Infrastructure &amp; Laboratory Facilities"
          subtitle="Departmental labs, DELNET digital resources, ICT facilities, and equipment"
          onAdd={() => openAddModal("facilities", { title: "New Facility", description: "Facility description and resources available." })}
        >
          {(data.infrastructure?.facilities || []).map((fac: any, idx: number) => (
            <div key={fac._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                    FACILITY {idx + 1}
                  </span>
                  <ActionButtons onEdit={() => openEditModal("facilities", idx, fac)} onDelete={() => handleDeleteItem("facilities", idx)} />
                </div>
                <h4 className="font-outfit font-extrabold text-sm text-slate-900">{fac.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{fac.description}</p>
              </div>
            </div>
          ))}
        </CardGridSection>
      )}

      {/* ========================================================= */}
      {/* TAB 4: 4. Publications & Books                            */}
      {/* ========================================================= */}
      {activeTab === 4 && (
        <div className="flex flex-col gap-6">
          {/* 4.1 Year-wise Publications */}
          <TableSectionCard
            title="4.1 Year-wise Faculty &amp; Student Research Publications"
            subtitle="Indexed journals, UGC CARE, Scopus, Web of Science, and peer-reviewed articles"
            onAdd={() => openAddModal("publications", { year: "2026–2027", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.scholarlyContributions?.publications || []}
              columns={["Academic Year", "Faculty Publications", "Student Publications", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.facultyFileUrl, `Faculty Publications (${item.year})`)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Faculty PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.studentFileUrl, `Student Publications (${item.year})`)}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Student PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("publications", idx, item)} onDelete={() => handleDeleteItem("publications", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* 4.2 Paper Presentations */}
          <TableSectionCard
            title="4.2 Year-wise Faculty &amp; Student Paper Presentations"
            subtitle="National and international conferences, symposiums, and seminar presentations"
            onAdd={() => openAddModal("paperPresentations", { year: "2025–2026", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.scholarlyContributions?.paperPresentations || []}
              columns={["Academic Year", "Faculty Presentations", "Student Presentations", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.facultyFileUrl, `Faculty Presentations (${item.year})`)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Faculty PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.studentFileUrl, `Student Presentations (${item.year})`)}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Student PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("paperPresentations", idx, item)} onDelete={() => handleDeleteItem("paperPresentations", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* 4.3 Books and Book Chapters */}
          <TableSectionCard
            title="4.3 Faculty Journals, Books &amp; Book Chapters"
            subtitle="Textbooks, edited volumes, ISBN books, and national/international chapters"
            onAdd={() => openAddModal("booksAndChapters", { year: "2026–2027", title: "Faculty Journals, Books & Book Chapters 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.scholarlyContributions?.booksAndChapters || []}
              columns={["Academic Year", "Title / Description", "Document Link", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.fileUrl, item.title)}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("booksAndChapters", idx, item)} onDelete={() => handleDeleteItem("booksAndChapters", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: 5. Patents & Innovations                           */}
      {/* ========================================================= */}
      {activeTab === 5 && (
        <TableSectionCard
          title="5. Patents / Start-ups / Innovation Activities Matrix"
          subtitle="Annual matrix for Innovation Activities, Start-up Initiatives, and Patent / IPR Awareness"
          onAdd={() => openAddModal("activitiesMatrix", { year: "2026–2027", innovationFileUrl: "/documents/DefaultFile_1.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" })}
        >
          <DataTable
            items={data.patentsAndInnovations?.activitiesMatrix || []}
            columns={["Academic Year", "Innovation Activities", "Start-up Initiatives", "Patent / IPR Awareness", "Actions"]}
            renderRow={(item, idx) => (
              <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    onClick={() => openPdf(item.innovationFileUrl, `Innovation Activities (${item.year})`)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View PDF</span>
                  </button>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    onClick={() => openPdf(item.startupFileUrl, `Start-up Initiatives (${item.year})`)}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View PDF</span>
                  </button>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    onClick={() => openPdf(item.patentIprFileUrl, `Patent / IPR Awareness (${item.year})`)}
                    className="px-3 py-1.5 bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View PDF</span>
                  </button>
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <ActionButtons onEdit={() => openEditModal("activitiesMatrix", idx, item)} onDelete={() => handleDeleteItem("activitiesMatrix", idx)} />
                </td>
              </tr>
            )}
          />
        </TableSectionCard>
      )}

      {/* ========================================================= */}
      {/* TAB 6: 6. IPR Cell                                        */}
      {/* ========================================================= */}
      {activeTab === 6 && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                6. Intellectual Property Rights (IPR) Cell
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Constituted date, objectives, activities, policy document, and reports
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cell Title</label>
                <input
                  type="text"
                  value={data.iprCell?.title || ""}
                  onChange={(e) => setData({ ...data, iprCell: { ...data.iprCell, title: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Constituted Date</label>
                <input
                  type="text"
                  value={data.iprCell?.constitutedDate || ""}
                  onChange={(e) => setData({ ...data, iprCell: { ...data.iprCell, constitutedDate: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
              <textarea
                rows={3}
                value={data.iprCell?.description || ""}
                onChange={(e) => setData({ ...data, iprCell: { ...data.iprCell, description: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium leading-relaxed"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
              <label className="block text-xs font-bold text-slate-800 uppercase">IPR Policy Document (PDF)</label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={data.iprCell?.policyFileUrl || ""}
                  onChange={(e) => setData({ ...data, iprCell: { ...data.iprCell, policyFileUrl: e.target.value } })}
                  className="flex-1 min-w-[240px] px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => openPdf(data.iprCell?.policyFileUrl, "IPR Policy Document")}
                  className="px-3 py-2 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* IPR Annual Activity Reports */}
          <TableSectionCard
            title="IPR Cell Annual Activity Reports"
            subtitle="Workshops, seminars, patent filings, copyright sessions, and awareness records"
            onAdd={() => openAddModal("iprReports", { year: "2025–2026", title: "IPR Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.iprCell?.activityReports || []}
              columns={["Academic Year", "Report Title", "Document Link", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.fileUrl, item.title)}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("iprReports", idx, item)} onDelete={() => handleDeleteItem("iprReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: 7. Entrepreneurship Centre                         */}
      {/* ========================================================= */}
      {activeTab === 7 && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                7. Entrepreneurship Development / Innovation &amp; Start-Up Centre
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Vision, Women Entrepreneurship, Industry engagement, and ED Policy
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Centre Overview</label>
              <textarea
                rows={3}
                value={data.entrepreneurshipCentre?.description || ""}
                onChange={(e) => setData({ ...data, entrepreneurshipCentre: { ...data.entrepreneurshipCentre, description: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium leading-relaxed"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
              <label className="block text-xs font-bold text-slate-800 uppercase">ED / Start-Up Policy Document (PDF)</label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={data.entrepreneurshipCentre?.policyFileUrl || ""}
                  onChange={(e) => setData({ ...data, entrepreneurshipCentre: { ...data.entrepreneurshipCentre, policyFileUrl: e.target.value } })}
                  className="flex-1 min-w-[240px] px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => openPdf(data.entrepreneurshipCentre?.policyFileUrl, "ED Policy Document")}
                  className="px-3 py-2 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* ED Centre Annual Activity Reports */}
          <TableSectionCard
            title="ED Centre Annual Activity Reports"
            subtitle="Business plan competitions, skill development, entrepreneur interactions, and exhibition records"
            onAdd={() => openAddModal("edReports", { year: "2025–2026", title: "ED Centre Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.entrepreneurshipCentre?.activityReports || []}
              columns={["Academic Year", "Report Title", "Document Link", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.fileUrl, item.title)}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("edReports", idx, item)} onDelete={() => handleDeleteItem("edReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 8: 8. IIC / Industry Cell                             */}
      {/* ========================================================= */}
      {activeTab === 8 && (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                8. Institution Innovation Council (IIC) / Institution–Industry Cell
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Objectives, Key Activities, Expected Outcomes, and IIC Policy
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cell Overview</label>
              <textarea
                rows={3}
                value={data.iicCell?.description || ""}
                onChange={(e) => setData({ ...data, iicCell: { ...data.iicCell, description: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-medium leading-relaxed"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-3">
              <label className="block text-xs font-bold text-slate-800 uppercase">IIC Policy Document (PDF)</label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={data.iicCell?.policyFileUrl || ""}
                  onChange={(e) => setData({ ...data, iicCell: { ...data.iicCell, policyFileUrl: e.target.value } })}
                  className="flex-1 min-w-[240px] px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => openPdf(data.iicCell?.policyFileUrl, "IIC Policy Document")}
                  className="px-3 py-2 bg-blue-50 text-blue-800 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* IIC Annual Activity Reports */}
          <TableSectionCard
            title="IIC Annual Activity Reports"
            subtitle="Hackathons, idea competitions, industrial visits, incubation sessions, and MoUs"
            onAdd={() => openAddModal("iicReports", { year: "2025–2026", title: "IIC Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" })}
          >
            <DataTable
              items={data.iicCell?.activityReports || []}
              columns={["Academic Year", "Report Title", "Document Link", "Actions"]}
              renderRow={(item, idx) => (
                <tr key={item._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{item.year}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <button
                      onClick={() => openPdf(item.fileUrl, item.title)}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("iicReports", idx, item)} onDelete={() => handleDeleteItem("iicReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                {editingIndex !== null ? "Edit Item" : "Add New Item"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4 text-xs">
              {/* Common Year field */}
              {formState.year !== undefined && (
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={formState.year || ""}
                    onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                    required
                    placeholder="2026–2027"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Title field */}
              {formState.title !== undefined && (
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Title / Name</label>
                  <input
                    type="text"
                    value={formState.title || ""}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Description field */}
              {formState.description !== undefined && (
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formState.description || ""}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Single File URL */}
              {formState.fileUrl !== undefined && (
                <div className="flex flex-col gap-1.5">
                  <label className="block font-bold text-slate-700 uppercase">Document / File URL (PDF)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formState.fileUrl || ""}
                      onChange={(e) => setFormState({ ...formState, fileUrl: e.target.value })}
                      placeholder="/documents/DefaultFile_1.pdf"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1 cursor-pointer border border-slate-200 shrink-0">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload</span>
                      <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, "fileUrl")} className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {/* Faculty File URL & Student File URL for Publications & Presentations */}
              {formState.facultyFileUrl !== undefined && (
                <div className="flex flex-col gap-1.5">
                  <label className="block font-bold text-slate-700 uppercase">Faculty Document (PDF)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formState.facultyFileUrl || ""}
                      onChange={(e) => setFormState({ ...formState, facultyFileUrl: e.target.value })}
                      placeholder="/documents/DefaultFile_1.pdf"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1 cursor-pointer border border-slate-200 shrink-0">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload</span>
                      <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, "facultyFileUrl")} className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {formState.studentFileUrl !== undefined && (
                <div className="flex flex-col gap-1.5">
                  <label className="block font-bold text-slate-700 uppercase">Student Document (PDF)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formState.studentFileUrl || ""}
                      onChange={(e) => setFormState({ ...formState, studentFileUrl: e.target.value })}
                      placeholder="/documents/DefaultFile_1.pdf"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1 cursor-pointer border border-slate-200 shrink-0">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload</span>
                      <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, "studentFileUrl")} className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {/* Innovation Matrix: 3 PDF fields */}
              {formState.innovationFileUrl !== undefined && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-bold text-slate-700 uppercase">Innovation Activities PDF</label>
                    <input
                      type="text"
                      value={formState.innovationFileUrl || ""}
                      onChange={(e) => setFormState({ ...formState, innovationFileUrl: e.target.value })}
                      placeholder="/documents/DefaultFile_1.pdf"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-bold text-slate-700 uppercase">Start-up Initiatives PDF</label>
                    <input
                      type="text"
                      value={formState.startupFileUrl || ""}
                      onChange={(e) => setFormState({ ...formState, startupFileUrl: e.target.value })}
                      placeholder="/documents/DefaultFile_1.pdf"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-bold text-slate-700 uppercase">Patent / IPR Awareness PDF</label>
                    <input
                      type="text"
                      value={formState.patentIprFileUrl || ""}
                      onChange={(e) => setFormState({ ...formState, patentIprFileUrl: e.target.value })}
                      placeholder="/documents/DefaultFile_1.pdf"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-950/10"
                >
                  {uploading ? "Uploading..." : "Save Item"}
                </button>
              </div>
            </form>
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

// Reusable Helper Components
function TableSectionCard({ title, subtitle, onAdd, children }: { title: string; subtitle?: string; onAdd?: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3.5 py-1.5 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Row</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function CardGridSection({ title, subtitle, onAdd, children }: { title: string; subtitle?: string; onAdd?: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3.5 py-1.5 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all border border-blue-200 inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Item</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function DataTable({ items, columns, renderRow }: { items: any[]; columns: string[]; renderRow: (item: any, idx: number) => React.ReactNode }) {
  if (!items || items.length === 0) {
    return <div className="text-center py-8 text-xs text-slate-400">No records found. Click &quot;Add Row&quot; to insert one.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-[11px] font-black uppercase tracking-wider">
            {columns.map((col, i) => (
              <th key={i} className={`py-3 px-4 ${i === columns.length - 1 ? "text-right" : ""}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{items.map((item, idx) => renderRow(item, idx))}</tbody>
      </table>
    </div>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={onEdit}
        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
        title="Edit item"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        title="Delete item"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
