"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
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
  ShieldCheck,
  Award,
  Globe,
  TrendingUp,
  Image as ImageIcon,
  Users,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function PlacementsManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main Tier Tab: "I", "II", or "III"
  const [activeTier, setActiveTier] = useState<"I" | "II" | "III">("I");

  // Sub-tabs for each Tier
  const [tierISub, setTierISub] = useState<string>("about-cell");
  const [tierIISub, setTierIISub] = useState<string>("industry-engagement");
  const [tierIIISub, setTierIIISub] = useState<string>("international-collaborations");

  // Generic Item Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // PDF / Image Preview Modal State
  const [previewFile, setPreviewFile] = useState<{ url: string; title: string } | null>(null);

  // Filters
  const [recruiterTagFilter, setRecruiterTagFilter] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/placements");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load placements data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading placements.");
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
      const res = await fetch("/api/admin/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save placements data in Sanity.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload File Handler (PDFs or images)
  const handleFileUpload = async (file: File, fieldName: string = "fileUrl", type: "file" | "image" = "file") => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      const fileUrl = json.asset?.url || json.url;

      if (json.success && fileUrl) {
        setEditingItem((prev: any) => ({
          ...prev,
          [fieldName]: fileUrl,
        }));
      } else {
        alert(json.error || "Failed to upload file to Sanity.");
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Open Modal for Create / Edit
  const openModal = (type: string, item: any = null, index: number | null = null) => {
    setModalType(type);
    setEditingItem(item ? { ...item } : getInitialItemData(type));
    setEditIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType("");
    setEditingItem(null);
    setEditIndex(null);
  };

  const getInitialItemData = (type: string) => {
    switch (type) {
      case "recruiter":
        return {
          id: `rec-${Date.now()}`,
          name: "",
          short: "",
          sector: "IT & Digital Services",
          roles: "Graduate Trainee",
          color: "from-blue-900 to-indigo-950",
          tag: "IT Services",
        };
      case "mou":
        return {
          id: `mou-${Date.now()}`,
          title: "",
          department: "Training & Placement Cell",
          year: "2025-2026",
          fileUrl: "",
        };
      case "annualReport":
        return {
          year: "2025–2026",
          title: "Annual Activity Report 2025–2026",
          fileUrl: "",
          isAvailable: true,
        };
      case "skillDomain":
        return {
          number: "01",
          title: "",
          desc: "",
          topics: [],
        };
      case "apssdcArea":
        return {
          title: "",
          desc: "",
        };
      case "companyWiseStat":
        return {
          year: "2026-2027",
          title: "Company-wise Placed Students 2026–2027",
          fileUrl: "",
        };
      case "programmeWiseStat":
        return {
          year: "2026-2027",
          title: "Programme-wise Placement Statistics 2026–2027",
          fileUrl: "",
        };
      case "competitiveExam":
        return {
          exam: "",
          agency: "",
          roles: "",
        };
      default:
        return {};
    }
  };

  const handleSaveModalItem = () => {
    if (!editingItem) return;

    setData((prev: any) => {
      const updated = { ...prev };

      if (modalType === "companyWiseStat") {
        const stats = { ...(updated.statistics || {}) };
        const list = [...(stats.companyWiseStats || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        stats.companyWiseStats = list;
        updated.statistics = stats;
      } else if (modalType === "programmeWiseStat") {
        const stats = { ...(updated.statistics || {}) };
        const list = [...(stats.programmeWiseStats || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        stats.programmeWiseStats = list;
        updated.statistics = stats;
      } else if (modalType === "recruiter") {
        const list = [...(updated.recruiters || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        updated.recruiters = list;
      } else if (modalType === "mou") {
        const list = [...(updated.mous || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        updated.mous = list;
      } else if (modalType === "annualReport") {
        const list = [...(updated.annualReports || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        updated.annualReports = list;
      } else if (modalType === "skillDomain") {
        const list = [...(updated.skillDomains || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        updated.skillDomains = list;
      } else if (modalType === "apssdcArea") {
        const list = [...(updated.apssdcSupportAreas || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        updated.apssdcSupportAreas = list;
      } else if (modalType === "competitiveExam") {
        const list = [...(updated.competitiveExamsList || [])];
        if (editIndex !== null) list[editIndex] = editingItem;
        else list.push(editingItem);
        updated.competitiveExamsList = list;
      }

      return updated;
    });

    closeModal();
  };

  const handleDeleteItem = (type: string, index: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setData((prev: any) => {
      const updated = { ...prev };
      if (type === "companyWiseStat") {
        if (updated.statistics?.companyWiseStats) {
          const stats = { ...updated.statistics };
          stats.companyWiseStats = stats.companyWiseStats.filter((_: any, i: number) => i !== index);
          updated.statistics = stats;
        }
      } else if (type === "programmeWiseStat") {
        if (updated.statistics?.programmeWiseStats) {
          const stats = { ...updated.statistics };
          stats.programmeWiseStats = stats.programmeWiseStats.filter((_: any, i: number) => i !== index);
          updated.statistics = stats;
        }
      } else if (type === "recruiter") {
        updated.recruiters = updated.recruiters.filter((_: any, i: number) => i !== index);
      } else if (type === "mou") {
        updated.mous = updated.mous.filter((_: any, i: number) => i !== index);
      } else if (type === "annualReport") {
        updated.annualReports = updated.annualReports.filter((_: any, i: number) => i !== index);
      } else if (type === "skillDomain") {
        updated.skillDomains = updated.skillDomains.filter((_: any, i: number) => i !== index);
      } else if (type === "apssdcArea") {
        updated.apssdcSupportAreas = updated.apssdcSupportAreas.filter((_: any, i: number) => i !== index);
      } else if (type === "competitiveExam") {
        updated.competitiveExamsList = updated.competitiveExamsList.filter((_: any, i: number) => i !== index);
      }
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
        <Loader2 className="h-10 w-10 text-blue-800 animate-spin" />
        <span className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Live Placements Records...
        </span>
      </div>
    );
  }

  // 3 Primary Tier Categories (Matching Top Bar of Mandatory Disclosures & Sidebar)
  const PRIMARY_TIERS = [
    {
      id: "I",
      letter: "I",
      label: "Training & Placement Cell",
      icon: Briefcase,
      count: 6,
    },
    {
      id: "II",
      letter: "II",
      label: "Industry Linkages",
      icon: Building2,
      count: 2,
    },
    {
      id: "III",
      letter: "III",
      label: "Internalization & Global Outreach",
      icon: Globe,
      count: 1,
    },
  ];

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* ── TOP ACTION BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">
              Sanity Singleton Document: <span className="font-mono text-[11px] text-blue-700 font-extrabold">placements-singleton</span>
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
                <span>Saved &amp; Published!</span>
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
          <span>All Placements &amp; Industry Linkages data have been published to Sanity CDN!</span>
        </div>
      )}

      {/* ── PRIMARY CATEGORY TABS (3 MAIN TIERS) ── */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {PRIMARY_TIERS.map((tier) => {
            const isActive = activeTier === tier.id;
            const Icon = tier.icon;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id as any)}
                className={`flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#002147] text-white border-[#002147] shadow-sm scale-[1.01]"
                    : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-transparent hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                    isActive ? "bg-amber-400 text-slate-900" : "bg-slate-200 text-slate-700"
                  }`}>
                    {tier.letter}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-extrabold leading-tight">{tier.label}</span>
                    <span className={`text-[10px] ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                      {tier.count} Subsections
                    </span>
                  </div>
                </div>
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-amber-300" : "text-blue-900"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TIER I: I. Training & Placement Cell                      */}
      {/* ========================================================= */}
      {activeTier === "I" && (
        <div className="flex flex-col gap-4">
          {/* Sub-tab navigation pills for Tier I */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/70 text-xs">
            {[
              { id: "about-cell", label: "1. About Training & Placement Cell", count: (data?.annualReports?.length || 0) + 1 },
              { id: "placements-recruitment", label: "2. Placements & Recruitment", count: (data?.recruiters?.length || 0) + 4 },
              { id: "apssdc", label: "3. APSSDC", count: data?.apssdcSupportAreas?.length || 0 },
              { id: "skill-development-areas", label: "4. Skill Development Training Areas", count: data?.skillDomains?.length || 11 },
              { id: "internships-industry-exposure", label: "5. Internships & Industry Exposure", count: 3 },
              { id: "competitive-exam-coaching", label: "6. Competitive Exam Coaching", count: data?.competitiveExamsList?.length || 0 },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setTierISub(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  tierISub === sub.id
                    ? "bg-[#002147] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/60"
                }`}
              >
                <span>{sub.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  tierISub === sub.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {sub.count}
                </span>
              </button>
            ))}
          </div>

          {/* 1. About Training & Placement Cell Content */}
          {tierISub === "about-cell" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">I. Training &amp; Placement Cell</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  1. About the Training &amp; Placement Cell
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Configure TPO contact desk details, Vision, Mission, Cell Objectives, Overview Handbook PDF, and Annual Reports archive.
                </p>
              </div>

              {/* TPO Executive Card Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Officer Name</label>
                  <input
                    type="text"
                    value={data.tpoOfficer?.name || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Academic Qualifications</label>
                  <input
                    type="text"
                    value={data.tpoOfficer?.degrees || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, degrees: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Official Designation</label>
                  <input
                    type="text"
                    value={data.tpoOfficer?.designation || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, designation: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Institution Name</label>
                  <input
                    type="text"
                    value={data.tpoOfficer?.institution || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, institution: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Official Mobile Number</label>
                  <input
                    type="text"
                    value={data.tpoOfficer?.mobile || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, mobile: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">College Landline</label>
                  <input
                    type="text"
                    value={data.tpoOfficer?.landline || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, landline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Placement Cell Email</label>
                  <input
                    type="email"
                    value={data.tpoOfficer?.placementEmail || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, placementEmail: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Institution Official Email</label>
                  <input
                    type="email"
                    value={data.tpoOfficer?.institutionEmail || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        tpoOfficer: { ...data.tpoOfficer, institutionEmail: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Cell Vision Statement</label>
                  <textarea
                    rows={3}
                    value={data.aboutOverview?.vision || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutOverview: { ...data.aboutOverview, vision: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Cell Mission Statement</label>
                  <textarea
                    rows={3}
                    value={data.aboutOverview?.mission || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutOverview: { ...data.aboutOverview, mission: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Handbook PDF Attachment */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7 text-red-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Official Handbook Document</span>
                    <span className="text-xs font-bold text-slate-800">
                      {data.aboutOverview?.aboutPdfUrl ? "Training & Placement Cell.pdf" : "No PDF uploaded"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {data.aboutOverview?.aboutPdfUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewFile({
                          url: data.aboutOverview.aboutPdfUrl,
                          title: "About T&P Cell Overview",
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  )}

                  <label className="px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isUploading ? "Uploading..." : "Upload New PDF"}</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setIsUploading(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                            const json = await res.json();
                            if (json.success && json.asset?.url) {
                              setData({
                                ...data,
                                aboutOverview: { ...data.aboutOverview, aboutPdfUrl: json.asset.url },
                              });
                            }
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Annual Reports Table */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-outfit font-bold text-sm text-slate-900">Placement Cell Annual Reports Archive</h4>
                  <button
                    onClick={() => openModal("annualReport")}
                    className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" /> Add Annual Report
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(data.annualReports || []).map((report: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-red-600 block">{report.year}</span>
                        <h5 className="font-bold text-xs text-slate-800 truncate">{report.title}</h5>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {report.fileUrl && (
                          <button
                            onClick={() => setPreviewFile({ url: report.fileUrl, title: report.title })}
                            className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => openModal("annualReport", report, idx)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("annualReport", idx)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Placements & Recruitment Content */}
          {tierISub === "placements-recruitment" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">I. Training &amp; Placement Cell</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  2. Placements &amp; Recruitment
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage Placement Statistics, Company-wise Graphics, Programme-wise PDF Reports, and Corporate Recruiters Carousel.
                </p>
              </div>

              {/* Key Placement Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Highest Package</span>
                  <input
                    type="text"
                    value={data.statistics?.highestPackage || "₹ 8.50 LPA"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        statistics: { ...data.statistics, highestPackage: e.target.value },
                      })
                    }
                    className="mt-1 w-full font-outfit font-black text-base text-blue-900 bg-transparent border-b border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Package</span>
                  <input
                    type="text"
                    value={data.statistics?.averagePackage || "₹ 3.80 LPA"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        statistics: { ...data.statistics, averagePackage: e.target.value },
                      })
                    }
                    className="mt-1 w-full font-outfit font-black text-base text-blue-900 bg-transparent border-b border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Placement Rate</span>
                  <input
                    type="text"
                    value={data.statistics?.placementRate || "85%+"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        statistics: { ...data.statistics, placementRate: e.target.value },
                      })
                    }
                    className="mt-1 w-full font-outfit font-black text-base text-blue-900 bg-transparent border-b border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recruiting Partners</span>
                  <input
                    type="text"
                    value={data.statistics?.recruitingCompaniesCount || "50+"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        statistics: { ...data.statistics, recruitingCompaniesCount: e.target.value },
                      })
                    }
                    className="mt-1 w-full font-outfit font-black text-base text-blue-900 bg-transparent border-b border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Company-wise Infographic & Charts */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-outfit font-black text-sm text-slate-800">
                      Company-wise Placement Summary Visuals (PNG / JPG)
                    </h4>
                    <p className="text-[11px] text-slate-500">Yearly company-wise placed students charts and infographic posters.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal("companyWiseStat")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-200" /> Add Year Visual (PNG/JPG)
                  </button>
                </div>

                {(!data.statistics?.companyWiseStats || data.statistics.companyWiseStats.length === 0) ? (
                  <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs font-semibold">
                    No company-wise visuals added yet. Click &ldquo;Add Year Visual&rdquo; to add one.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.statistics.companyWiseStats.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <ImageIcon className="w-6 h-6 text-emerald-600 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">{item.year}</span>
                            <span className="font-bold text-xs text-slate-800 truncate block" title={item.title}>{item.title}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{item.fileUrl || "No image uploaded"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.fileUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewFile({ url: item.fileUrl, title: item.title })}
                              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                              title="View Image"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openModal("companyWiseStat", item, idx)}
                            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                            title="Edit Title & Year"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <label className="p-1.5 rounded-lg bg-[#002147] hover:bg-blue-950 text-white transition-colors cursor-pointer" title="Replace Graphic">
                            <Upload className="w-3.5 h-3.5 text-amber-300" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  formData.append("type", "image");
                                  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                                  const json = await res.json();
                                  if (json.success && (json.asset?.url || json.url)) {
                                    const updatedStats = [...data.statistics.companyWiseStats];
                                    updatedStats[idx].fileUrl = json.asset?.url || json.url;
                                    setData({
                                      ...data,
                                      statistics: { ...data.statistics, companyWiseStats: updatedStats },
                                    });
                                  }
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem("companyWiseStat", idx)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Programme-wise Placement PDF Reports */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-outfit font-black text-sm text-slate-800">
                      Programme-wise Placement Reports (PDFs)
                    </h4>
                    <p className="text-[11px] text-slate-500">Yearly programme-wise verified PDF statistics and degree breakdowns.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal("programmeWiseStat")}
                    className="px-3 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-red-200" /> Add Year Report (PDF)
                  </button>
                </div>

                {(!data.statistics?.programmeWiseStats || data.statistics.programmeWiseStats.length === 0) ? (
                  <div className="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs font-semibold">
                    No programme-wise PDF reports added yet. Click &ldquo;Add Year Report&rdquo; to add one.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.statistics.programmeWiseStats.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-300 transition-all flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="w-6 h-6 text-red-600 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">{item.year}</span>
                            <span className="font-bold text-xs text-slate-800 truncate block" title={item.title}>{item.title}</span>
                            <span className="text-[10px] text-slate-400 truncate block">{item.fileUrl || "No PDF uploaded"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.fileUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewFile({ url: item.fileUrl, title: item.title })}
                              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                              title="View PDF"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openModal("programmeWiseStat", item, idx)}
                            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                            title="Edit Title & Year"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <label className="p-1.5 rounded-lg bg-[#002147] hover:bg-blue-950 text-white transition-colors cursor-pointer" title="Replace PDF">
                            <Upload className="w-3.5 h-3.5 text-amber-300" />
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const formData = new FormData();
                                  formData.append("file", file);
                                  formData.append("type", "file");
                                  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                                  const json = await res.json();
                                  if (json.success && (json.asset?.url || json.url)) {
                                    const updatedPdfs = [...data.statistics.programmeWiseStats];
                                    updatedPdfs[idx].fileUrl = json.asset?.url || json.url;
                                    setData({
                                      ...data,
                                      statistics: { ...data.statistics, programmeWiseStats: updatedPdfs },
                                    });
                                  }
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem("programmeWiseStat", idx)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recruiters Carousel Manager */}
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-outfit font-black text-sm text-slate-900">Top Recruiters &amp; Corporate Partners</h4>
                    <p className="text-xs text-slate-500">Recruiting partners featured on the interactive slide show carousel.</p>
                  </div>
                  <button
                    onClick={() => openModal("recruiter")}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" /> Add Recruiter
                  </button>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {["all", "IT Services", "Banking & Finance", "Pharma & Science", "EdTech & Analytics"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setRecruiterTagFilter(tag)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        recruiterTagFilter === tag
                          ? "bg-[#002147] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tag === "all" ? "All Domains" : tag}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(data.recruiters || [])
                    .filter((r: any) => recruiterTagFilter === "all" || r.tag === recruiterTagFilter)
                    .map((recruiter: any, idx: number) => (
                      <div
                        key={recruiter.id || idx}
                        className="p-3.5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between gap-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#002147] to-blue-900 text-emerald-300 flex items-center justify-center font-outfit font-black text-xs shrink-0">
                              {recruiter.short || recruiter.name.slice(0, 3).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-black uppercase text-blue-700 block">{recruiter.tag}</span>
                              <h5 className="font-outfit font-bold text-xs text-slate-900 truncate">{recruiter.name}</h5>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => openModal("recruiter", recruiter, idx)}
                              className="p-1 rounded-lg bg-white border border-slate-200 text-slate-700 cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem("recruiter", idx)}
                              className="p-1 rounded-lg bg-white border border-slate-200 text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium border-t border-slate-100 pt-1.5 flex flex-col">
                          <span><strong>Sector:</strong> {recruiter.sector}</span>
                          <span><strong>Roles:</strong> {recruiter.roles}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. APSSDC Content */}
          {tierISub === "apssdc" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">I. Training &amp; Placement Cell</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  3. APSSDC – Skill Development &amp; Employability Support
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage APSSDC collaboration framework, skill hub initiatives, and job mela support programs.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-outfit font-black text-sm text-slate-900">APSSDC Key Support Areas</h4>
                  <button
                    onClick={() => openModal("apssdcArea")}
                    className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" /> Add Support Area
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(data.apssdcSupportAreas || []).map((area: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-outfit font-bold text-xs text-slate-900">{area.title}</h5>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openModal("apssdcArea", area, idx)}
                            className="p-1 rounded-lg bg-white border border-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("apssdcArea", idx)}
                            className="p-1 rounded-lg bg-white border border-slate-200 text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. Skill Development Training Areas Content */}
          {tierISub === "skill-development-areas" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">I. Training &amp; Placement Cell</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  4. Skill Development Training Areas
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage the 11 comprehensive skill training domains, scope descriptions, and curriculum topics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.skillDomains || []).map((domain: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <span className="text-xs font-black text-blue-900">{domain.number}. {domain.title}</span>
                        <button
                          onClick={() => openModal("skillDomain", domain, idx)}
                          className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">{domain.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(domain.topics || []).map((topic: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Internships & Industry Exposure Content */}
          {tierISub === "internships-industry-exposure" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">I. Training &amp; Placement Cell</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  5. Internships &amp; Industry Exposure
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage short-term summer internships, semester-long clinical &amp; digital internships, and industrial visits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-blue-900">Short-Term Internships</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Summer breaks and inter-semester skill-oriented internships providing foundational hands-on industry exposure.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-indigo-900">Semester-Long Internships</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Curriculum-integrated 6-month live industry projects with Datavalley, Ala Hospital, and technology partners.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-emerald-900">Industrial Visits &amp; Tours</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Experiential on-site industrial tours, factory visits, manufacturing plants, and research laboratories.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. Competitive Exam Coaching Content */}
          {tierISub === "competitive-exam-coaching" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">I. Training &amp; Placement Cell</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  6. Competitive Exam Coaching
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage specialized competitive coaching in partnership with Dimensions Coaching Centre and in-house faculty.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-outfit font-black text-sm text-slate-900">Coached Examination Categories</h4>
                  <button
                    onClick={() => openModal("competitiveExam")}
                    className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" /> Add Exam Track
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {(data.competitiveExamsList || []).map((examItem: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-blue-700 uppercase">{examItem.agency}</span>
                          <h5 className="font-outfit font-bold text-xs text-slate-900">{examItem.exam}</h5>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openModal("competitiveExam", examItem, idx)}
                            className="p-1 rounded-lg bg-white border border-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem("competitiveExam", idx)}
                            className="p-1 rounded-lg bg-white border border-slate-200 text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        <strong className="text-slate-800">Target Roles:</strong> {examItem.roles}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TIER II: II. Industry Linkages                            */}
      {/* ========================================================= */}
      {activeTier === "II" && (
        <div className="flex flex-col gap-4">
          {/* Sub-tab navigation pills for Tier II */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/70 text-xs">
            {[
              { id: "industry-engagement", label: "1. Industry & Professional Engagement", count: 2 },
              { id: "mous", label: "2. MoUs – Memoranda of Understanding", count: data?.mous?.length || 0 },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setTierIISub(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  tierIISub === sub.id
                    ? "bg-[#002147] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/60"
                }`}
              >
                <span>{sub.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  tierIISub === sub.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {sub.count}
                </span>
              </button>
            ))}
          </div>

          {/* 1. Industry & Professional Engagement */}
          {tierIISub === "industry-engagement" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">II. Industry Linkages</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  1. Industry &amp; Professional Engagement
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Manage professional certifications, industry expert guest lectures, industrial visits, and corporate linkages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-blue-900">Professional Certifications</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Industry-recognized certification programs integrated into the student learning pathway for enhanced employability.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-indigo-900">Expert Lectures &amp; Talks</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Direct insights from C-suite executives, senior technical architects, and corporate leaders across diverse sectors.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. MoUs – Memoranda of Understanding */}
          {tierIISub === "mous" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">II. Industry Linkages</span>
                  <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                    2. MoUs – Memoranda of Understanding
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Manage signed MoUs, partner organizations, active durations, and official signed PDF documents.
                  </p>
                </div>
                <button
                  onClick={() => openModal("mou")}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Add Signed MoU</span>
                </button>
              </div>

              {/* MoUs List */}
              <div className="flex flex-col gap-3">
                {(data.mous || []).map((mou: any, idx: number) => (
                  <div key={mou.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-outfit font-black text-xs shrink-0">
                        MoU
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">{mou.year} • {mou.department}</span>
                        <h5 className="font-outfit font-bold text-sm text-slate-900 truncate">{mou.title}</h5>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {mou.fileUrl && (
                        <button
                          onClick={() => setPreviewFile({ url: mou.fileUrl, title: mou.title })}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" /> View
                        </button>
                      )}
                      <button
                        onClick={() => openModal("mou", mou, idx)}
                        className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                        title="Edit MoU"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("mou", idx)}
                        className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-red-50 text-red-600 cursor-pointer"
                        title="Delete MoU"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TIER III: III. Internalization & Global Outreach           */}
      {/* ========================================================= */}
      {activeTier === "III" && (
        <div className="flex flex-col gap-4">
          {/* Sub-tab navigation pills for Tier III */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/70 text-xs">
            {[
              { id: "international-collaborations", label: "1. International Collaborations & Global Engagement", count: 2 },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setTierIIISub(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  tierIIISub === sub.id
                    ? "bg-[#002147] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/60"
                }`}
              >
                <span>{sub.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  tierIIISub === sub.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {sub.count}
                </span>
              </button>
            ))}
          </div>

          {/* 1. International Collaborations & Global Engagement Content */}
          {tierIIISub === "international-collaborations" && (
            <div className="flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-blue-900 tracking-wider block">III. Internalization &amp; Global Outreach</span>
                <h3 className="font-outfit font-extrabold text-lg text-slate-900">
                  1. International Collaborations &amp; Global Engagement
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fostering global perspectives through international linkages, cross-cultural learning, faculty/student exchanges, and global research.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-blue-900">Internationalization Policy &amp; Vision</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Aligning institutional educational standards with global requirements and enabling students to compete internationally.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-black uppercase text-indigo-900">Global Alumni &amp; Outreach</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Engaging international alumni chapters across the USA, UK, Australia, and Gulf regions for mentorship and global internships.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GENERIC CRUD MODAL                                        */}
      {/* ========================================================= */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full flex flex-col gap-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h4 className="font-outfit font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
              {editIndex !== null ? "Edit Item" : "Add New Item"}
            </h4>

            {/* Recruiter Modal Form */}
            {modalType === "recruiter" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Company Full Name</label>
                  <input
                    type="text"
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Tata Consultancy Services"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Monogram Short Code</label>
                  <input
                    type="text"
                    value={editingItem.short || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, short: e.target.value.toUpperCase() })}
                    placeholder="e.g. TCS"
                    maxLength={4}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Sector / Domain</label>
                  <input
                    type="text"
                    value={editingItem.sector || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, sector: e.target.value })}
                    placeholder="e.g. IT & Digital Services"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Target Roles</label>
                  <input
                    type="text"
                    value={editingItem.roles || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, roles: e.target.value })}
                    placeholder="e.g. Systems Engineer Trainee"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Category Tag</label>
                  <select
                    value={editingItem.tag || "IT Services"}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="IT Services">IT Services</option>
                    <option value="Banking & Finance">Banking & Finance</option>
                    <option value="Pharma & Science">Pharma & Science</option>
                    <option value="EdTech & Analytics">EdTech & Analytics</option>
                  </select>
                </div>
              </div>
            )}

            {/* MoU Modal Form */}
            {modalType === "mou" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Partner Organization / MoU Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Dimensions Coaching Centre"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Department / Cell</label>
                  <input
                    type="text"
                    value={editingItem.department || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                    placeholder="e.g. Training & Placement Cell"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="e.g. 2025-2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">MoU Document PDF</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem.fileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="PDF File URL"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "fileUrl", "file")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* APSSDC Area Form */}
            {modalType === "apssdcArea" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Support Program Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Industry-Oriented Training Programmes"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Program Scope &amp; Description</label>
                  <textarea
                    rows={3}
                    value={editingItem.desc || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    placeholder="Describe employability training details"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>
            )}

            {/* Company-wise Stat Graphic Modal Form */}
            {modalType === "companyWiseStat" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="e.g. 2026–2027"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Visual Title / Description</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Company-wise Placed Students 2026–2027"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Graphic Image (PNG / JPG)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem.fileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="Image URL or upload"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isUploading ? "Uploading..." : "Upload PNG/JPG"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "fileUrl", "image")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Programme-wise Stat PDF Modal Form */}
            {modalType === "programmeWiseStat" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="e.g. 2026–2027"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Report Title / Description</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Programme-wise Placement Statistics 2026–2027"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Official Report PDF</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem.fileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="PDF File URL or upload"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "fileUrl", "file")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Competitive Exam Form */}
            {modalType === "competitiveExam" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Exam Track Title</label>
                  <input
                    type="text"
                    value={editingItem.exam || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, exam: e.target.value })}
                    placeholder="e.g. Banking Examinations"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Conducting Body / Agency</label>
                  <input
                    type="text"
                    value={editingItem.agency || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, agency: e.target.value })}
                    placeholder="e.g. IBPS / SBI / RBI"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Target Roles &amp; Cadres</label>
                  <input
                    type="text"
                    value={editingItem.roles || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, roles: e.target.value })}
                    placeholder="e.g. Probationary Officers (PO), Clerical Cadres"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Annual Report Modal Form */}
            {modalType === "annualReport" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="e.g. 2025–2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Report Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Annual Activity Report 2025–2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Official Report PDF</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem.fileUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="PDF File URL"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "fileUrl", "file")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Skill Domain Modal Form */}
            {modalType === "skillDomain" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Domain Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Scope Description</label>
                  <textarea
                    rows={3}
                    value={editingItem.desc || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Key Topics (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingItem.topics) ? editingItem.topics.join(", ") : ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        topics: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    placeholder="e.g. Quantitative Aptitude, Logical Reasoning, Mock Interviews"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModalItem}
                className="px-4 py-2 rounded-xl bg-[#002147] hover:bg-blue-950 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instant PDF / Image Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          fileUrl={previewFile.url}
          title={previewFile.title}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
}
