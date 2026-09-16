"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  FileText,
  HeartHandshake,
  Trophy,
  MessageSquareQuote,
  Calendar,
  Image,
  Phone,
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
  ShieldCheck,
  Award,
  Link2,
  Mail,
  MapPin,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function AlumniManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Tab from 1 to 9
  const [activeTab, setActiveTab] = useState<number>(1);

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
      const res = await fetch("/api/admin/alumni");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load alumni data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading alumni.");
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
      const res = await fetch("/api/admin/alumni", {
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
          assetId: json.assetId,
        }));
      } else {
        alert(json.error || "Failed to upload file to Sanity.");
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
    { id: 1, label: "1. About Alumni", icon: Users, count: 4 },
    { id: 2, label: "2. College Committee", icon: Building2, count: (data?.committeeMembers?.length || 0) + (data?.committeeReports?.length || 0) },
    { id: 3, label: "3. Registered Association", icon: ShieldCheck, count: (data?.associationOfficeBearers?.length || 0) + (data?.statutoryDocuments?.length || 0) },
    { id: 4, label: "4. Contributions Register", icon: HeartHandshake, count: data?.contributionsRegister?.length || 0 },
    { id: 5, label: "5. Alumni Network", icon: Trophy, count: (data?.prideAlumni?.length || 0) + (data?.testimonials?.length || 0) },
    { id: 6, label: "6. Feedback & Connect", icon: MessageSquareQuote, count: 1 },
    { id: 7, label: "7. Events & Reunions", icon: Calendar, count: data?.events?.length || 0 },
    { id: 8, label: "8. Gallery & Media", icon: Image, count: data?.galleryCategories?.length || 0 },
    { id: 9, label: "9. Contact Desk", icon: Phone, count: 1 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <Loader2 className="h-10 w-10 text-blue-800 animate-spin" />
        <span className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Live Alumni Records...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* ── TOP ACTION BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              Sanity Singleton Document: <span className="font-mono text-[11px] text-blue-700 font-extrabold">alumni-singleton</span>
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
          <span>All Alumni module data and document records have been published to Sanity CDN!</span>
        </div>
      )}

      {/* ── 9 SECTIONS TABS ── */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-1.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center text-center p-2 rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#002147] text-white border-[#002147] shadow-xs scale-[1.01]"
                    : "bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-transparent hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-300" : "text-blue-700"}`} />
                  <span className={`px-1 rounded-md text-[9px] font-black ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold leading-tight line-clamp-2">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: 1. About Alumni                                    */}
      {/* ========================================================= */}
      {activeTab === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-outfit font-black text-slate-900 text-base">
              1. About Alumni Engagement, Vision &amp; Objectives
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Core institutional philosophy, guiding principles, and alumni role in college development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-900">Vision</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                To build a vibrant alumni community that contributes to student development, academic excellence and institutional growth.
              </p>
            </div>

            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex flex-col gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-900">Mission</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                To nurture lifelong alumni relationships through meaningful interaction, mentoring, networking and knowledge sharing.
              </p>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 flex flex-col gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">Motto</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium italic">
                “Educate, Enrich &amp; Empower” — Celebrating alumni as lifelong members of the St. Ann’s family.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Objectives &amp; Roles</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Strengthen Alumni–Institution Connect</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Career Guidance &amp; Mentoring</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Student–Alumni Interactions</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Guest Lectures &amp; Knowledge Sharing</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Placement &amp; Professional Networking</li>
              <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Support for Student Development &amp; Scholarships</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: 2. College-Level Alumni Committee                  */}
      {/* ========================================================= */}
      {activeTab === 2 && (
        <div className="flex flex-col gap-6">
          {/* Committee Members Table */}
          <TableSectionCard
            title="2.1 College-Level Alumni Committee Members"
            subtitle="Institutional committee coordinating alumni engagement, mentoring, and student interactions"
            onAdd={() => openAddModal("committeeMembers", { sNo: (data.committeeMembers?.length || 0) + 1, name: "", designation: "", role: "Member" })}
          >
            <DataTable
              items={data.committeeMembers || []}
              columns={["S.No", "Member Name", "Designation / Representation", "Role", "Actions"]}
              renderRow={(mem, idx) => (
                <tr key={mem._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-900 w-16 text-center">{mem.sNo || idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{mem.name}</td>
                  <td className="py-3 px-4 text-slate-700">{mem.designation}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      mem.role === "Chairperson" ? "bg-amber-50 text-amber-900 border-amber-200" :
                      mem.role === "Convener" ? "bg-blue-50 text-blue-900 border-blue-200" :
                      mem.role === "Co-Convener" ? "bg-indigo-50 text-indigo-900 border-indigo-200" :
                      "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      {mem.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("committeeMembers", idx, mem)} onDelete={() => handleDeleteItem("committeeMembers", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* Committee Annual Reports Table */}
          <TableSectionCard
            title="2.2 College-Level Alumni Committee Annual Reports"
            subtitle="Academic year-wise activity and governance reports submitted by the committee"
            onAdd={() => openAddModal("committeeReports", { year: "2025–2026", title: "Annual Alumni Committee Report", fileUrl: "" })}
          >
            <DataTable
              items={data.committeeReports || []}
              columns={["Academic Year", "Annual Alumni Report Title", "PDF Document", "Actions"]}
              renderRow={(rep, idx) => (
                <tr key={rep._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{rep.year}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{rep.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={rep.fileUrl} onPreview={() => setPreviewPdf({ url: rep.fileUrl, title: rep.title })} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("committeeReports", idx, rep)} onDelete={() => handleDeleteItem("committeeReports", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: 3. Registered Alumni Association                   */}
      {/* ========================================================= */}
      {activeTab === 3 && (
        <div className="flex flex-col gap-6">
          {/* Statutory Registration Details Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                3.1 Legal Registration &amp; Governance Framework
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Statutory registration under Andhra Pradesh Societies Registration Act, 2001
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Society Name</span>
                <p className="font-bold text-slate-800 mt-0.5">{data.registrationDetails?.societyName || "St. Ann's College for Women Alumni Association"}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Registration Act</span>
                <p className="font-bold text-slate-800 mt-0.5">{data.registrationDetails?.actName || "AP Societies Registration Act, 2001"}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Registration No.</span>
                <p className="font-extrabold text-blue-950 mt-0.5 font-mono">{data.registrationDetails?.registrationNo || "307 of 2022"}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Registration Date</span>
                <p className="font-bold text-slate-800 mt-0.5">{data.registrationDetails?.registrationDate || "18 September 2022"}</p>
              </div>
            </div>
          </div>

          {/* Office Bearers Table */}
          <TableSectionCard
            title="3.2 Office Bearers of the Alumni Association"
            subtitle="Elected leadership and executive committee members of the registered society"
            onAdd={() => openAddModal("associationOfficeBearers", { sNo: (data.associationOfficeBearers?.length || 0) + 1, name: "", designation: "Member", occupation: "Lecturer" })}
          >
            <DataTable
              items={data.associationOfficeBearers || []}
              columns={["S.No", "Name of the Office Bearer", "Designation", "Occupation / Position", "Actions"]}
              renderRow={(ob, idx) => (
                <tr key={ob._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-900 w-16 text-center">{ob.sNo || idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{ob.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200">
                      {ob.designation}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{ob.occupation}</td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("associationOfficeBearers", idx, ob)} onDelete={() => handleDeleteItem("associationOfficeBearers", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>

          {/* Statutory Documents Table */}
          <TableSectionCard
            title="3.3 Registration &amp; Statutory Documents"
            subtitle="Official society certificate, bylaws, PAN, renewal certificates, and statutory records"
            onAdd={() => openAddModal("statutoryDocuments", { sNo: (data.statutoryDocuments?.length || 0) + 1, documentTitle: "Statutory Document", description: "", fileUrl: "" })}
          >
            <DataTable
              items={data.statutoryDocuments || []}
              columns={["S.No", "Document Title", "PDF Document", "Actions"]}
              renderRow={(doc, idx) => (
                <tr key={doc._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-900 w-16 text-center">{doc.sNo || idx + 1}</td>
                  <td className="py-3 px-4 text-slate-800 font-bold">{doc.documentTitle}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <PdfBadge url={doc.fileUrl} onPreview={() => setPreviewPdf({ url: doc.fileUrl, title: doc.documentTitle })} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <ActionButtons onEdit={() => openEditModal("statutoryDocuments", idx, doc)} onDelete={() => handleDeleteItem("statutoryDocuments", idx)} />
                  </td>
                </tr>
              )}
            />
          </TableSectionCard>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: 4. Alumni Contributions & Support Register          */}
      {/* ========================================================= */}
      {activeTab === 4 && (
        <TableSectionCard
          title="4. Alumni Contributions &amp; Support Register (AY 2026–2027)"
          subtitle="Documented register recording alumni-led workshops, mentoring sessions, and professional support"
          onAdd={() => openAddModal("contributionsRegister", { sNo: (data.contributionsRegister?.length || 0) + 1, date: "14-08-2026", alumniName: "", programmeBatch: "UG", activity: "", natureOfSupport: "Mentoring & Guidance", beneficiaries: "100", fileUrl: "" })}
        >
          <DataTable
            items={data.contributionsRegister || []}
            columns={["S.No", "Date", "Alumni Name", "Programme / Batch", "Activity / Contribution", "Nature of Support", "Beneficiaries", "Supporting Evidence", "Actions"]}
            renderRow={(row, idx) => (
              <tr key={row._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                <td className="py-3 px-4 font-bold text-slate-900 text-center">{row.sNo || idx + 1}</td>
                <td className="py-3 px-4 font-mono whitespace-nowrap text-slate-700">{row.date}</td>
                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.alumniName}</td>
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{row.programmeBatch}</td>
                <td className="py-3 px-4 text-slate-800 min-w-[200px]">{row.activity}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {row.natureOfSupport}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-center font-mono">{row.beneficiaries}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <PdfBadge url={row.fileUrl} label="View Evidence" onPreview={() => setPreviewPdf({ url: row.fileUrl, title: `${row.alumniName} - ${row.activity}` })} />
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <ActionButtons onEdit={() => openEditModal("contributionsRegister", idx, row)} onDelete={() => handleDeleteItem("contributionsRegister", idx)} />
                </td>
              </tr>
            )}
          />
        </TableSectionCard>
      )}

      {/* ========================================================= */}
      {/* TAB 5: 5. Alumni Network                                  */}
      {/* ========================================================= */}
      {activeTab === 5 && (
        <div className="flex flex-col gap-6">
          {/* Google Form Link Configuration */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ExternalLink className="h-4 w-4 text-blue-700" />
              <h3 className="font-outfit font-black text-slate-900 text-base">
                5.1 Google Form Registration &amp; Connect Link
              </h3>
            </div>
            <label className="block text-xs font-bold text-slate-700 uppercase">Live Google Form URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data.googleFormUrl || ""}
                onChange={(e) => setData({ ...data, googleFormUrl: e.target.value })}
                placeholder="https://forms.gle/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
              />
              <a
                href={data.googleFormUrl || "https://forms.gle/7QMzJvrAsYVT3YZd7"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl text-xs font-bold transition-all shrink-0 border border-blue-200 inline-flex items-center gap-1.5"
              >
                <span>Test Link</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Our Alumni - Our Pride */}
          <CardGridSection
            title="5.2 Our Alumni – Our Pride (Distinguished Alumni)"
            subtitle="Showcase celebrating distinguished alumni across business, education, technology, governance, and social service"
            onAdd={() => openAddModal("prideAlumni", { name: "Alumna Name", programmeBatch: "B.Sc – 2005–2008", designation: "Position", organization: "Company / Org", achievement: "Professional achievement summary.", redirectUrl: "" })}
          >
            {(data.prideAlumni || []).map((alumnus: any, idx: number) => (
              <div key={alumnus._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
                      DISTINGUISHED ALUMNA
                    </span>
                    <ActionButtons onEdit={() => openEditModal("prideAlumni", idx, alumnus)} onDelete={() => handleDeleteItem("prideAlumni", idx)} />
                  </div>
                  <h4 className="font-outfit font-extrabold text-sm text-slate-900">{alumnus.name}</h4>
                  <span className="text-[11px] font-bold text-blue-700">{alumnus.designation} • {alumnus.organization}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{alumnus.programmeBatch}</span>
                  <p className="text-slate-600 text-xs leading-relaxed">{alumnus.achievement}</p>
                </div>
              </div>
            ))}
          </CardGridSection>

          {/* Voices of Our Alumni (Testimonials) */}
          <CardGridSection
            title="5.3 Voices of Our Alumni (7 Official Testimonials)"
            subtitle="Reflections, memories, and career stories shared by alumni graduates"
            onAdd={() => openAddModal("testimonials", { title: "New Testimonial", quote: "My journey at St. Ann's was...", alumnaName: "Alumna Name", programmeBatch: "B.Com | 2005–2008" })}
          >
            {(data.testimonials || []).map((test: any, idx: number) => (
              <div key={test._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      TESTIMONIAL {idx + 1}
                    </span>
                    <ActionButtons onEdit={() => openEditModal("testimonials", idx, test)} onDelete={() => handleDeleteItem("testimonials", idx)} />
                  </div>
                  <h4 className="font-outfit font-extrabold text-sm text-slate-900">{test.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed italic">“{test.quote}”</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{test.alumnaName}</span>
                  <span className="text-[11px] font-mono text-slate-500">{test.programmeBatch}</span>
                </div>
              </div>
            ))}
          </CardGridSection>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: 6. Feedback & Institutional Connect                */}
      {/* ========================================================= */}
      {activeTab === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-outfit font-black text-slate-900 text-base">
              6. Alumni Feedback &amp; Quality Enhancement Framework
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Structured feedback channels, action taken records, and alumni institutional support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2">
              <span className="font-bold text-slate-800 uppercase">1. Alumni Feedback</span>
              <p className="text-slate-600 leading-relaxed">
                Collected periodically to understand experiences, suggestions and expectations for continuous institutional development.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2">
              <span className="font-bold text-slate-800 uppercase">2. Suggestions &amp; Outcomes</span>
              <p className="text-slate-600 leading-relaxed">
                Relevant suggestions received from alumni and corresponding action taken reports documented for NAAC &amp; IQAC audits.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2">
              <span className="font-bold text-slate-800 uppercase">3. Quality Enhancement</span>
              <p className="text-slate-600 leading-relaxed">
                Active contribution towards curriculum feedback, mentoring, career readiness, and infrastructure enhancement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: 7. Events & Reunions                               */}
      {/* ========================================================= */}
      {activeTab === 7 && (
        <TableSectionCard
          title="7. Alumni Events, Meets &amp; Batch Reunions"
          subtitle="Annual meets, batch reunions, guest lectures, career guidance, and special alumni days"
          onAdd={() => openAddModal("events", { title: "New Alumni Event", date: "Upcoming", description: "Event description and agenda.", redirectUrl: data.googleFormUrl || "https://forms.gle/7QMzJvrAsYVT3YZd7", fileUrl: "" })}
        >
          <DataTable
            items={data.events || []}
            columns={["Event Title", "Schedule / Frequency", "Description", "Registration / Action", "Actions"]}
            renderRow={(ev, idx) => (
              <tr key={ev._key || idx} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs">
                <td className="py-3 px-4 font-bold text-slate-900">{ev.title}</td>
                <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">{ev.date}</td>
                <td className="py-3 px-4 text-slate-600 max-w-md">{ev.description}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <LinkBadge url={ev.redirectUrl} />
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <ActionButtons onEdit={() => openEditModal("events", idx, ev)} onDelete={() => handleDeleteItem("events", idx)} />
                </td>
              </tr>
            )}
          />
        </TableSectionCard>
      )}

      {/* ========================================================= */}
      {/* TAB 8: 8. Gallery & Media                                 */}
      {/* ========================================================= */}
      {activeTab === 8 && (
        <CardGridSection
          title="8. Alumni Photo &amp; Video Gallery Categories"
          subtitle="Visual media records of annual meets, reunions, interaction sessions, and ceremonies"
          onAdd={() => openAddModal("galleryCategories", { title: "New Gallery Category", description: "Photographs & media records.", count: "Gallery Active" })}
        >
          {(data.galleryCategories || []).map((gal: any, idx: number) => (
            <div key={gal._key || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                    MEDIA CATEGORY
                  </span>
                  <ActionButtons onEdit={() => openEditModal("galleryCategories", idx, gal)} onDelete={() => handleDeleteItem("galleryCategories", idx)} />
                </div>
                <h4 className="font-outfit font-extrabold text-sm text-slate-900">{gal.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{gal.description}</p>
              </div>
            </div>
          ))}
        </CardGridSection>
      )}

      {/* ========================================================= */}
      {/* TAB 9: 9. Contact Information                             */}
      {/* ========================================================= */}
      {activeTab === 9 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col gap-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-outfit font-black text-slate-900 text-base">
              9. Alumni Official Contact Desk Information
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Official institutional address, contact numbers, and email for alumni correspondence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Association Name</label>
              <input
                type="text"
                value={data.contactInfo?.associationName || ""}
                onChange={(e) => setData({ ...data, contactInfo: { ...(data.contactInfo || {}), associationName: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-semibold"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Institution</label>
              <input
                type="text"
                value={data.contactInfo?.institution || ""}
                onChange={(e) => setData({ ...data, contactInfo: { ...(data.contactInfo || {}), institution: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Campus Address</label>
              <input
                type="text"
                value={data.contactInfo?.address || ""}
                onChange={(e) => setData({ ...data, contactInfo: { ...(data.contactInfo || {}), address: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Phone Number</label>
              <input
                type="text"
                value={data.contactInfo?.phone || ""}
                onChange={(e) => setData({ ...data, contactInfo: { ...(data.contactInfo || {}), phone: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-700 font-bold uppercase text-[10px]">Official Email</label>
              <input
                type="email"
                value={data.contactInfo?.email || ""}
                onChange={(e) => setData({ ...data, contactInfo: { ...(data.contactInfo || {}), email: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT / ADD ITEM MODAL ── */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-outfit font-black text-slate-900 text-base">
                {editIndex !== null ? "Edit Record" : "Add New Record"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
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

              {/* Date */}
              {editingItem.date !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Date / Period</label>
                  <input
                    type="text"
                    value={editingItem.date || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="14-08-2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Name / Member / Alumna Name */}
              {(editingItem.name !== undefined || editingItem.alumniName !== undefined || editingItem.alumnaName !== undefined) && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Name</label>
                  <input
                    type="text"
                    value={editingItem.name || editingItem.alumniName || editingItem.alumnaName || ""}
                    onChange={(e) => {
                      if (editingItem.alumniName !== undefined) setEditingItem({ ...editingItem, alumniName: e.target.value });
                      else if (editingItem.alumnaName !== undefined) setEditingItem({ ...editingItem, alumnaName: e.target.value });
                      else setEditingItem({ ...editingItem, name: e.target.value });
                    }}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Designation / Role */}
              {editingItem.designation !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Designation / Representation</label>
                  <input
                    type="text"
                    value={editingItem.designation || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    placeholder="e.g. Principal, President, Lecturer..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.role !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Role in Committee</label>
                  <input
                    type="text"
                    value={editingItem.role || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="e.g. Chairperson, Convener, Member..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Occupation */}
              {editingItem.occupation !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Occupation / Position</label>
                  <input
                    type="text"
                    value={editingItem.occupation || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, occupation: e.target.value })}
                    placeholder="e.g. Lecturer, Banker, Teacher..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Title / Document Title */}
              {(editingItem.title !== undefined || editingItem.documentTitle !== undefined) && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Document / Record Title</label>
                  <input
                    type="text"
                    value={editingItem.title || editingItem.documentTitle || ""}
                    onChange={(e) => {
                      if (editingItem.documentTitle !== undefined) setEditingItem({ ...editingItem, documentTitle: e.target.value });
                      else setEditingItem({ ...editingItem, title: e.target.value });
                    }}
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Programme / Batch */}
              {editingItem.programmeBatch !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Programme / Batch</label>
                  <input
                    type="text"
                    value={editingItem.programmeBatch || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, programmeBatch: e.target.value })}
                    placeholder="e.g. B.Com | 2005–2008"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Activity / Description / Quote / Achievement */}
              {editingItem.activity !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Activity / Contribution</label>
                  <textarea
                    rows={2}
                    value={editingItem.activity || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, activity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.natureOfSupport !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Nature of Support</label>
                  <input
                    type="text"
                    value={editingItem.natureOfSupport || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, natureOfSupport: e.target.value })}
                    placeholder="e.g. Mentoring & Guidance"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.beneficiaries !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Beneficiaries Count</label>
                  <input
                    type="text"
                    value={editingItem.beneficiaries || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, beneficiaries: e.target.value })}
                    placeholder="e.g. 423"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.quote !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Testimonial Quote</label>
                  <textarea
                    rows={3}
                    value={editingItem.quote || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.achievement !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Achievement Summary</label>
                  <textarea
                    rows={2}
                    value={editingItem.achievement || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, achievement: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {editingItem.description !== undefined && (
                <div>
                  <label className="block mb-1 text-slate-600 font-bold uppercase text-[10px]">Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147]"
                  />
                </div>
              )}

              {/* Redirecting Link */}
              {editingItem.redirectUrl !== undefined && (
                <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px] uppercase tracking-wider">
                    <ExternalLink className="h-3.5 w-3.5 text-blue-700" />
                    <span>Redirecting Link (URL / Form Link)</span>
                  </div>
                  <input
                    type="text"
                    value={editingItem.redirectUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, redirectUrl: e.target.value })}
                    placeholder="https://forms.gle/... or /alumni/..."
                    className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                  />
                </div>
              )}

              {/* PDF Document Upload & URL */}
              {editingItem.fileUrl !== undefined && (
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
                      placeholder="/documents/alumni/... or https://cdn.sanity.io/..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#002147] text-xs font-mono"
                    />
                  </div>
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

function TableSectionCard({ title, subtitle, onAdd, children }: any) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="font-outfit font-black text-slate-900 text-base">{title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Record</span>
          </button>
        )}
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
      <span className="truncate max-w-[120px]">Open Link</span>
    </a>
  );
}
