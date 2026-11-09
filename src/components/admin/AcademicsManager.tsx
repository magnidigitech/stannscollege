"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Upload,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  Building,
  Lightbulb,
  Award,
  Sparkles,
  ShieldCheck,
  Download,
  X,
  ChevronRight,
  Info,
  CheckCircle2,
  Search,
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import defaultAcademicsData from "@/components/academics/academics-data.json";

interface Programme {
  sNo: number;
  name: string;
  intake: number;
  convenerQuota: number;
  managementQuota: number;
  ewsQuota: number;
  aboutDocumentUrl: string;
  brochureUrl: string;
}

interface CalendarEntry {
  sNo: number;
  academicYear: string;
  title: string;
  viewUrl: string;
  downloadUrl: string;
}

interface TimetableEntry {
  sNo: number;
  semester: string;
  department: string;
  programme: string;
  title: string;
  docUrl: string;
}

interface SyllabusEntry {
  sNo: number;
  programme: string;
  major?: string;
  specialization?: string;
  totalCredits: number;
  docUrl: string;
}

interface RegulationEntry {
  sNo: number;
  year: string;
  title: string;
  docUrl: string;
}

interface IlmsEntry {
  sNo: number;
  metric: string;
  description: string;
  documentUrl: string;
}

export function AcademicsManager() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Active Main Tab: "A" | "B" | "C" | "D" | "E" | "F" | "G"
  const [activeTab, setActiveTab] = useState<"A" | "B" | "C" | "D" | "E" | "F" | "G">("A");

  // Tab A Sub-tab: "UG" | "PG"
  const [programTab, setProgramTab] = useState<"UG" | "PG">("UG");

  // Tab B Sub-tab: "calendars" | "timetables" | "syllabus" | "regulations" | "ilms"
  const [resourceSubTab, setResourceSubTab] = useState<"calendars" | "timetables" | "syllabus" | "regulations" | "ilms">("calendars");
  const [calendarType, setCalendarType] = useState<"ug" | "pg" | "aip">("ug");
  const [timetableSemester, setTimetableSemester] = useState<"odd" | "even">("odd");
  const [syllabusType, setSyllabusType] = useState<"ug" | "pg">("ug");

  // Filter search
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal Editing States
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
      const res = await fetch("/api/admin/academics");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setData(defaultAcademicsData);
      }
    } catch (err: any) {
      console.warn("Using fallback data due to fetch error:", err.message);
      setData(defaultAcademicsData);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await fetch("/api/admin/academics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setError(json.error || "Failed to save academics data.");
      }
    } catch (err: any) {
      setError(err.message || "Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Upload file helper (PDFs, images) to Sanity
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (file.type.startsWith("image/")) {
        formData.append("type", "image");
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        if (editingItem) {
          setEditingItem({ ...editingItem, [targetField]: json.url });
        }
      } else {
        alert(json.error || "File upload failed.");
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Modal Handlers
  const openEditModal = (type: string, item: any, index: number) => {
    setModalType(type);
    setEditingItem({ ...item });
    setEditIndex(index);
    setModalOpen(true);
  };

  const openAddModal = (type: string) => {
    setModalType(type);
    setEditIndex(null);
    if (type === "ugProgramme" || type === "pgProgramme") {
      const list = type === "ugProgramme" ? data?.ugProgrammes : data?.pgProgrammes;
      setEditingItem({
        sNo: (list?.length || 0) + 1,
        name: "",
        intake: 60,
        convenerQuota: 42,
        managementQuota: 18,
        ewsQuota: 6,
        aboutDocumentUrl: "",
        brochureUrl: "",
      });
    } else if (type === "calendar") {
      setEditingItem({
        sNo: 1,
        academicYear: "2025-2026",
        title: "Academic Calendar",
        viewUrl: "",
        downloadUrl: "",
      });
    } else if (type === "timetable") {
      setEditingItem({
        sNo: 1,
        semester: "Semester I",
        department: "Department of Commerce",
        programme: "B.Com Honours",
        title: "Time Table",
        docUrl: "",
      });
    } else if (type === "syllabus") {
      setEditingItem({
        sNo: 1,
        programme: "B.Sc Honours",
        major: "Computer Science",
        totalCredits: 126,
        docUrl: "",
      });
    } else if (type === "regulation") {
      setEditingItem({
        sNo: 1,
        year: "2024-2025",
        title: "Academic Regulations",
        docUrl: "",
      });
    } else if (type === "ilms") {
      setEditingItem({
        sNo: 1,
        metric: "ILMS 4.2.1",
        description: "Library Automation System",
        documentUrl: "",
      });
    }
    setModalOpen(true);
  };

  const saveModalItem = () => {
    if (!editingItem) return;

    if (modalType === "ugProgramme") {
      const updated = [...(data?.ugProgrammes || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({ ...data, ugProgrammes: updated });
    } else if (modalType === "pgProgramme") {
      const updated = [...(data?.pgProgrammes || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({ ...data, pgProgrammes: updated });
    } else if (modalType === "calendar") {
      const targetGroup = calendarType;
      const updated = [...(data?.academicCalendar?.[targetGroup] || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({
        ...data,
        academicCalendar: {
          ...data.academicCalendar,
          [targetGroup]: updated,
        },
      });
    } else if (modalType === "timetable") {
      const targetGroup = timetableSemester;
      const updated = [...(data?.timetables?.[targetGroup] || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({
        ...data,
        timetables: {
          ...data.timetables,
          [targetGroup]: updated,
        },
      });
    } else if (modalType === "syllabus") {
      const targetGroup = syllabusType === "ug" ? "ugSingleMajor" : "pgSyllabus";
      const updated = [...(data?.curriculumSyllabus?.[targetGroup] || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({
        ...data,
        curriculumSyllabus: {
          ...data.curriculumSyllabus,
          [targetGroup]: updated,
        },
      });
    } else if (modalType === "regulation") {
      const updated = [...(data?.academicRegulations || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({ ...data, academicRegulations: updated });
    } else if (modalType === "ilms") {
      const updated = [...(data?.ilms?.reportsEvidence || [])];
      if (editIndex !== null) {
        updated[editIndex] = editingItem;
      } else {
        updated.push(editingItem);
      }
      setData({
        ...data,
        ilms: {
          ...data.ilms,
          reportsEvidence: updated,
        },
      });
    }

    setModalOpen(false);
    setEditingItem(null);
  };

  const deleteItem = (type: string, index: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    if (type === "ugProgramme") {
      const updated = data.ugProgrammes.filter((_: any, i: number) => i !== index);
      setData({ ...data, ugProgrammes: updated });
    } else if (type === "pgProgramme") {
      const updated = data.pgProgrammes.filter((_: any, i: number) => i !== index);
      setData({ ...data, pgProgrammes: updated });
    } else if (type === "calendar") {
      const updated = data.academicCalendar[calendarType].filter((_: any, i: number) => i !== index);
      setData({
        ...data,
        academicCalendar: { ...data.academicCalendar, [calendarType]: updated },
      });
    } else if (type === "timetable") {
      const updated = data.timetables[timetableSemester].filter((_: any, i: number) => i !== index);
      setData({
        ...data,
        timetables: { ...data.timetables, [timetableSemester]: updated },
      });
    } else if (type === "syllabus") {
      const targetGroup = syllabusType === "ug" ? "ugSingleMajor" : "pgSyllabus";
      const updated = data.curriculumSyllabus[targetGroup].filter((_: any, i: number) => i !== index);
      setData({
        ...data,
        curriculumSyllabus: { ...data.curriculumSyllabus, [targetGroup]: updated },
      });
    } else if (type === "regulation") {
      const updated = data.academicRegulations.filter((_: any, i: number) => i !== index);
      setData({ ...data, academicRegulations: updated });
    } else if (type === "ilms") {
      const updated = data.ilms.reportsEvidence.filter((_: any, i: number) => i !== index);
      setData({
        ...data,
        ilms: { ...data.ilms, reportsEvidence: updated },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
        <Loader2 className="w-10 h-10 text-[#002147] animate-spin" />
        <p className="text-slate-600 font-medium">Loading Academics Portal Data...</p>
      </div>
    );
  }

  // Filtered programmes for Tab A
  const activeProgrammes: Programme[] =
    programTab === "UG" ? data?.ugProgrammes || [] : data?.pgProgrammes || [];

  const filteredProgrammes = activeProgrammes.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics calculation for Tab A
  const totalSanctioned = activeProgrammes.reduce((acc, p) => acc + (Number(p.intake) || 0), 0);
  const totalConvener = activeProgrammes.reduce((acc, p) => acc + (Number(p.convenerQuota) || 0), 0);
  const totalManagement = activeProgrammes.reduce((acc, p) => acc + (Number(p.managementQuota) || 0), 0);
  const totalEws = activeProgrammes.reduce((acc, p) => acc + (Number(p.ewsQuota) || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn font-sans pb-16">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#002147] via-[#003875] to-[#002147] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Live Portal Sync
            </span>
            <span className="bg-white/10 text-blue-100 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
              7 Academic Categories
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
            Academics &amp; Programmes Management
          </h1>
          <p className="text-blue-100/90 text-sm leading-relaxed">
            Manage undergraduate and postgraduate programmes, intake quotas, academic calendars, semester timetables, curriculum syllabus, regulations, and institutional learning resources.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <Link
            href="/academics"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 border border-white/20 shadow-sm"
          >
            <ExternalLink className="w-4 h-4" /> Preview Live
          </Link>
          <button
            onClick={fetchData}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 border border-white/20 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs transition flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-900" /> Saved to Sanity!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save All Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save Alerts */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-semibold">
            All Academics data has been synchronized and saved successfully to Sanity CMS and local storage.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Main 7 Sections Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { key: "A", label: "A. Programmes", icon: GraduationCap, badge: "UG & PG" },
          { key: "B", label: "B. Regulations & Resources", icon: BookOpen, badge: "Syllabus/Calendars" },
          { key: "C", label: "C. Departments", icon: Building, badge: "13 Depts" },
          { key: "D", label: "D. Teaching & Learning", icon: Lightbulb, badge: "Sub-Pages" },
          { key: "E", label: "E. Examination", icon: Award, badge: "CIA & Results" },
          { key: "F", label: "F. Academic Enrichment", icon: Sparkles, badge: "VAC & Skills" },
          { key: "G", label: "G. Quality & Outcomes", icon: ShieldCheck, badge: "POs & Audits" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition shrink-0 border ${
                isActive
                  ? "bg-[#002147] text-white border-[#002147] shadow-md shadow-blue-950/10"
                  : "bg-white text-slate-600 hover:text-[#002147] hover:bg-slate-50 border-slate-200/80"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SECTION A: ACADEMIC PROGRAMMES (UG & PG)                                 */}
      {/* ========================================================================= */}
      {activeTab === "A" && (
        <div className="space-y-6">
          {/* Sub Navigation: UG vs PG */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setProgramTab("UG")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                  programTab === "UG"
                    ? "bg-[#002147] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Undergraduate (UG) ({data?.ugProgrammes?.length || 0})
              </button>
              <button
                onClick={() => setProgramTab("PG")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                  programTab === "PG"
                    ? "bg-[#002147] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Award className="w-4 h-4" /> Postgraduate (PG) ({data?.pgProgrammes?.length || 0})
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search programme..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#002147] w-48 sm:w-64"
                />
              </div>
              <button
                onClick={() => openAddModal(programTab === "UG" ? "ugProgramme" : "pgProgramme")}
                className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Programme
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Programmes</span>
              <p className="text-2xl font-black text-[#002147] mt-1">{activeProgrammes.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sanctioned Intake</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{totalSanctioned}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Convener Quota</span>
              <p className="text-2xl font-black text-blue-600 mt-1">{totalConvener}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Management &amp; EWS</span>
              <p className="text-2xl font-black text-amber-600 mt-1">{totalManagement + totalEws}</p>
            </div>
          </div>

          {/* Programmes Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#002147] text-white uppercase text-[11px] tracking-wider">
                    <th className="py-4 px-4 font-bold text-center w-12">S.No</th>
                    <th className="py-4 px-6 font-bold">Name of Programme</th>
                    <th className="py-4 px-4 font-bold text-center">Intake</th>
                    <th className="py-4 px-4 font-bold text-center">Convener</th>
                    <th className="py-4 px-4 font-bold text-center">Management</th>
                    <th className="py-4 px-4 font-bold text-center">EWS</th>
                    <th className="py-4 px-4 font-bold text-center">Document</th>
                    <th className="py-4 px-4 font-bold text-center">Brochure</th>
                    <th className="py-4 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProgrammes.map((prog, idx) => (
                    <tr key={prog.sNo || idx} className="hover:bg-slate-50/80 transition group">
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">{prog.sNo}</td>
                      <td className="py-3.5 px-6 font-bold text-slate-800">
                        {prog.name}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black text-[#002147]">{prog.intake}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-600">{prog.convenerQuota}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-600">{prog.managementQuota}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-600">{prog.ewsQuota}</td>
                      <td className="py-3.5 px-4 text-center">
                        {prog.aboutDocumentUrl ? (
                          <button
                            onClick={() =>
                              setPreviewFile({
                                url: prog.aboutDocumentUrl,
                                title: `${prog.name} - Syllabus Document`,
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px] transition"
                          >
                            <FileText className="w-3 h-3" /> View PDF
                          </button>
                        ) : (
                          <span className="text-slate-300 italic text-[11px]">Not linked</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {prog.brochureUrl ? (
                          <button
                            onClick={() =>
                              setPreviewFile({
                                url: prog.brochureUrl,
                                title: `${prog.name} - Brochure`,
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition"
                          >
                            <Eye className="w-3 h-3" /> View Brochure
                          </button>
                        ) : (
                          <span className="text-slate-300 italic text-[11px]">Not linked</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              openEditModal(
                                programTab === "UG" ? "ugProgramme" : "pgProgramme",
                                prog,
                                idx
                              )
                            }
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Programme"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              deleteItem(
                                programTab === "UG" ? "ugProgramme" : "pgProgramme",
                                idx
                              )
                            }
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Programme"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProgrammes.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        No programmes found matching &quot;{searchQuery}&quot;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION B: REGULATIONS & RESOURCES                                        */}
      {/* ========================================================================= */}
      {activeTab === "B" && (
        <div className="space-y-6">
          {/* Sub Navigation */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            {[
              { id: "calendars", label: "Academic Calendars & AIP", icon: Calendar },
              { id: "timetables", label: "Semester Time Tables", icon: Clock },
              { id: "syllabus", label: "Curriculum & Syllabus", icon: BookOpen },
              { id: "regulations", label: "Academic Regulations", icon: Award },
              { id: "ilms", label: "ILMS Library Evidence", icon: FileText },
            ].map((sub) => {
              const Icon = sub.icon;
              const isActive = resourceSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setResourceSubTab(sub.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                    isActive
                      ? "bg-[#002147] text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-view: Calendars */}
          {resourceSubTab === "calendars" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  {(["ug", "pg", "aip"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setCalendarType(t)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                        calendarType === t ? "bg-white text-[#002147] shadow-xs" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {t === "aip" ? "AIP Plans" : `${t.toUpperCase()} Calendars`}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => openAddModal("calendar")}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Calendar
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-12 text-center">S.No</th>
                      <th className="py-3 px-4">Academic Year</th>
                      <th className="py-3 px-6">Document Title</th>
                      <th className="py-3 px-4 text-center">PDF Preview</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.academicCalendar?.[calendarType] || []).map((cal: CalendarEntry, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">{cal.sNo || idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-[#002147]">{cal.academicYear}</td>
                        <td className="py-3 px-6 font-semibold text-slate-800">{cal.title}</td>
                        <td className="py-3 px-4 text-center">
                          {cal.viewUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: cal.viewUrl, title: cal.title })}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"
                            >
                              <FileText className="w-3 h-3" /> View PDF
                            </button>
                          ) : (
                            <span className="text-slate-300 italic">No PDF</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal("calendar", cal, idx)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem("calendar", idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

          {/* Sub-view: Timetables */}
          {resourceSubTab === "timetables" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  {(["odd", "even"] as const).map((sem) => (
                    <button
                      key={sem}
                      onClick={() => setTimetableSemester(sem)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                        timetableSemester === sem ? "bg-white text-[#002147] shadow-xs" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {sem.toUpperCase()} Semester Time Tables
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => openAddModal("timetable")}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Time Table
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-12 text-center">S.No</th>
                      <th className="py-3 px-4">Semester</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-6">Programme Title</th>
                      <th className="py-3 px-4 text-center">Document</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.timetables?.[timetableSemester] || []).map((tt: TimetableEntry, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">{tt.sNo || idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-[#002147]">{tt.semester}</td>
                        <td className="py-3 px-4 font-semibold text-slate-600">{tt.department}</td>
                        <td className="py-3 px-6 font-bold text-slate-800">{tt.programme || tt.title}</td>
                        <td className="py-3 px-4 text-center">
                          {tt.docUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: tt.docUrl, title: `${tt.programme} - Time Table` })}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"
                            >
                              <FileText className="w-3 h-3" /> View PDF
                            </button>
                          ) : (
                            <span className="text-slate-300 italic">No PDF</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal("timetable", tt, idx)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem("timetable", idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

          {/* Sub-view: Syllabus */}
          {resourceSubTab === "syllabus" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setSyllabusType("ug")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      syllabusType === "ug" ? "bg-white text-[#002147] shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    UG Single Major (126 Credits)
                  </button>
                  <button
                    onClick={() => setSyllabusType("pg")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      syllabusType === "pg" ? "bg-white text-[#002147] shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    PG Professional Syllabus
                  </button>
                </div>
                <button
                  onClick={() => openAddModal("syllabus")}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Syllabus Record
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-12 text-center">S.No</th>
                      <th className="py-3 px-6">Programme</th>
                      <th className="py-3 px-4">Major / Specialization</th>
                      <th className="py-3 px-4 text-center">Credits</th>
                      <th className="py-3 px-4 text-center">Syllabus PDF</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.curriculumSyllabus?.[syllabusType === "ug" ? "ugSingleMajor" : "pgSyllabus"] || []).map(
                      (syl: SyllabusEntry, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 text-center text-slate-400 font-bold">{syl.sNo || idx + 1}</td>
                          <td className="py-3 px-6 font-bold text-slate-800">{syl.programme}</td>
                          <td className="py-3 px-4 font-semibold text-slate-600">{syl.major || syl.specialization || "—"}</td>
                          <td className="py-3 px-4 text-center font-black text-[#002147]">{syl.totalCredits}</td>
                          <td className="py-3 px-4 text-center">
                            {syl.docUrl ? (
                              <button
                                onClick={() => setPreviewFile({ url: syl.docUrl, title: `${syl.programme} Syllabus` })}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"
                              >
                                <FileText className="w-3 h-3" /> View Syllabus
                              </button>
                            ) : (
                              <span className="text-slate-300 italic">No PDF</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditModal("syllabus", syl, idx)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteItem("syllabus", idx)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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
          )}

          {/* Sub-view: Regulations */}
          {resourceSubTab === "regulations" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-outfit text-base font-black text-slate-800">
                  Year-wise Academic Regulations &amp; Frameworks
                </h3>
                <button
                  onClick={() => openAddModal("regulation")}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Regulation
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-12 text-center">S.No</th>
                      <th className="py-3 px-4">Academic Year</th>
                      <th className="py-3 px-6">Regulation Title</th>
                      <th className="py-3 px-4 text-center">Document</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.academicRegulations || []).map((reg: RegulationEntry, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">{reg.sNo || idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-[#002147]">{reg.year}</td>
                        <td className="py-3 px-6 font-semibold text-slate-800">{reg.title}</td>
                        <td className="py-3 px-4 text-center">
                          {reg.docUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: reg.docUrl, title: reg.title })}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"
                            >
                              <FileText className="w-3 h-3" /> View Regulation
                            </button>
                          ) : (
                            <span className="text-slate-300 italic">No PDF</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal("regulation", reg, idx)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem("regulation", idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

          {/* Sub-view: ILMS */}
          {resourceSubTab === "ilms" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-outfit text-base font-black text-slate-800">
                  ILMS (Integrated Learning Management System) Reports &amp; Evidence
                </h3>
                <button
                  onClick={() => openAddModal("ilms")}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Evidence Metric
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-12 text-center">S.No</th>
                      <th className="py-3 px-4">Metric No</th>
                      <th className="py-3 px-6">Description</th>
                      <th className="py-3 px-4 text-center">Evidence Document</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.ilms?.reportsEvidence || []).map((il: IlmsEntry, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">{il.sNo || idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-[#002147]">{il.metric}</td>
                        <td className="py-3 px-6 font-semibold text-slate-800">{il.description}</td>
                        <td className="py-3 px-4 text-center">
                          {il.documentUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: il.documentUrl, title: `${il.metric} - Evidence` })}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"
                            >
                              <FileText className="w-3 h-3" /> View Evidence
                            </button>
                          ) : (
                            <span className="text-slate-300 italic">No Document</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal("ilms", il, idx)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem("ilms", idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION C: DEPARTMENTS                                                    */}
      {/* ========================================================================= */}
      {activeTab === "C" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                13 Academic Departments
              </span>
              <h3 className="font-outfit text-xl font-black text-slate-900">
                Department Content &amp; Staff Administration
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Academic departments have their dedicated self-service update portal where Department Heads can upload annual reports, faculty profiles, and departmental achievements.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/academics/departments/update"
                target="_blank"
                className="px-5 py-3 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                <Edit2 className="w-4 h-4" /> Open Department Update Portal
              </Link>
            </div>
          </div>

          {/* Department Directory Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "1", name: "Department of Commerce", slug: "department-of-commerce" },
              { id: "2", name: "Dept. of Computer Science & Applications", slug: "department-of-computer-science-applications" },
              { id: "3", name: "Department of Mathematics", slug: "department-of-mathematics" },
              { id: "4", name: "Department of Physics", slug: "department-of-physics" },
              { id: "5", name: "Department of Statistics", slug: "department-of-statistics" },
              { id: "6", name: "Department of Biotechnology", slug: "department-of-biotechnology" },
              { id: "7", name: "Department of Microbiology", slug: "department-of-microbiology" },
              { id: "8", name: "Department of Botany", slug: "department-of-botany" },
              { id: "9", name: "Department of Chemistry", slug: "department-of-chemistry" },
              { id: "10", name: "Department of English", slug: "department-of-english" },
              { id: "11", name: "Department of Oriental Languages", slug: "department-of-oriental-languages" },
              { id: "12", name: "Department of MCA", slug: "department-of-mca" },
              { id: "13", name: "Department of MBA", slug: "department-of-mba" },
            ].map((dept) => (
              <div
                key={dept.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 hover:border-[#002147]/40 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#002147] font-black text-xs flex items-center justify-center shrink-0">
                    {dept.id}
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs truncate">{dept.name}</h4>
                </div>
                <Link
                  href={`/academics/departments/${dept.slug}`}
                  target="_blank"
                  className="p-1.5 text-slate-400 hover:text-[#002147] hover:bg-slate-100 rounded-lg transition shrink-0"
                  title="View Public Page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTIONS D to G: SUB-PAGES MANAGEMENT                                     */}
      {/* ========================================================================= */}
      {(["D", "E", "F", "G"].includes(activeTab)) && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {activeTab === "D" && "Teaching & Learning Framework"}
                  {activeTab === "E" && "Examination & Evaluation Systems"}
                  {activeTab === "F" && "Enrichment & Extension Programmes"}
                  {activeTab === "G" && "Quality Framework & Outcome Audits"}
                </span>
                <h3 className="font-outfit text-xl font-black text-slate-900 mt-2">
                  {activeTab === "D" && "Section D: Teaching & Learning Sub-Pages"}
                  {activeTab === "E" && "Section E: Examination & Evaluation Sub-Pages"}
                  {activeTab === "F" && "Section F: Academic Enrichment Sub-Pages"}
                  {activeTab === "G" && "Section G: Academic Quality & Outcomes Sub-Pages"}
                </h3>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed max-w-3xl">
              Each sub-page in this section has a dedicated standalone URL with verified statutory documents, policy frameworks, and evidence matrices. Click below to inspect or preview any sub-page.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {activeTab === "D" &&
                [
                  { title: "Teaching-Learning Practices", slug: "teaching-learning/teaching-learning-practices" },
                  { title: "Innovative Teaching Practices", slug: "teaching-learning/innovative-teaching-practices" },
                  { title: "Experiential & Participative Learning", slug: "teaching-learning/experiential-participative-learning" },
                  { title: "ICT-Enabled Teaching", slug: "teaching-learning/ict-enabled-teaching" },
                  { title: "Student-Centric Learning", slug: "teaching-learning/student-centric-learning" },
                ].map((item) => (
                  <div key={item.slug} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <Link
                      href={`/academics/${item.slug}`}
                      target="_blank"
                      className="p-1.5 text-blue-600 hover:bg-white rounded-lg transition shrink-0 shadow-xs"
                      title="Open Subpage"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}

              {activeTab === "E" &&
                [
                  { title: "Examination System", slug: "examination-evaluation/examination-system" },
                  { title: "Continuous Internal Assessment (CIA)", slug: "examination-evaluation/continuous-internal-assessment" },
                  { title: "University Examinations", slug: "examination-evaluation/university-examinations" },
                  { title: "Results & Performance", slug: "examination-evaluation/results-performance" },
                  { title: "Examination Regulations", slug: "examination-evaluation/examination-regulations" },
                ].map((item) => (
                  <div key={item.slug} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <Link
                      href={`/academics/${item.slug}`}
                      target="_blank"
                      className="p-1.5 text-blue-600 hover:bg-white rounded-lg transition shrink-0 shadow-xs"
                      title="Open Subpage"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}

              {activeTab === "F" &&
                [
                  { title: "Value-Added Courses (VAC)", slug: "academic-enrichment/value-added-courses" },
                  { title: "Certificate Programmes", slug: "academic-enrichment/certificate-courses" },
                  { title: "Skill Development Programmes", slug: "academic-enrichment/skill-development-programmes" },
                  { title: "Guest Lectures & Workshops", slug: "academic-enrichment/guest-lectures-workshops" },
                  { title: "Seminars & Conferences", slug: "academic-enrichment/seminars-conferences" },
                  { title: "Academic Collaborations", slug: "academic-enrichment/academic-collaborations" },
                ].map((item) => (
                  <div key={item.slug} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <Link
                      href={`/academics/${item.slug}`}
                      target="_blank"
                      className="p-1.5 text-blue-600 hover:bg-white rounded-lg transition shrink-0 shadow-xs"
                      title="Open Subpage"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}

              {activeTab === "G" &&
                [
                  { title: "Programme Outcomes (POs)", slug: "academic-quality-outcomes/programme-outcomes" },
                  { title: "Programme Specific Outcomes (PSOs)", slug: "academic-quality-outcomes/programme-specific-outcomes" },
                  { title: "Course Outcomes (COs)", slug: "academic-quality-outcomes/course-outcomes" },
                  { title: "CO–PO/PSO Mapping", slug: "academic-quality-outcomes/co-po-pso-mapping" },
                  { title: "Attainment of Outcomes", slug: "academic-quality-outcomes/attainment-of-outcomes" },
                  { title: "Academic & Administrative Audit (AAA)", slug: "academic-quality-outcomes/academic-audit" },
                ].map((item) => (
                  <div key={item.slug} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <Link
                      href={`/academics/${item.slug}`}
                      target="_blank"
                      className="p-1.5 text-blue-600 hover:bg-white rounded-lg transition shrink-0 shadow-xs"
                      title="Open Subpage"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT / ADD MODAL DIALOG                                                   */}
      {/* ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black font-outfit text-slate-900">
                  {editIndex !== null ? "Edit Record" : "Add New Record"}
                </h3>
                <span className="text-xs text-slate-400 font-medium capitalize">
                  {modalType.replace(/([A-Z])/g, " $1")}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PROGRAMME EDIT FIELDS */}
            {(modalType === "ugProgramme" || modalType === "pgProgramme") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Programme Name
                  </label>
                  <input
                    type="text"
                    value={editingItem?.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#002147]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Total Intake
                    </label>
                    <input
                      type="number"
                      value={editingItem?.intake || 0}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, intake: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Convener Quota
                    </label>
                    <input
                      type="number"
                      value={editingItem?.convenerQuota || 0}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          convenerQuota: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Mgmt Quota
                    </label>
                    <input
                      type="number"
                      value={editingItem?.managementQuota || 0}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          managementQuota: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      EWS Quota
                    </label>
                    <input
                      type="number"
                      value={editingItem?.ewsQuota || 0}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, ewsQuota: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                    />
                  </div>
                </div>

                {/* About Document PDF Upload / URL */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Syllabus / About Document (PDF)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Paste PDF URL or upload below..."
                      value={editingItem?.aboutDocumentUrl || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, aboutDocumentUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "aboutDocumentUrl")}
                      />
                    </label>
                  </div>
                </div>

                {/* Brochure Upload / URL */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Brochure (Image or PDF)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Paste Brochure URL or upload below..."
                      value={editingItem?.brochureUrl || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, brochureUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload Flyer"}</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "brochureUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* CALENDAR EDIT FIELDS */}
            {modalType === "calendar" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={editingItem?.academicYear || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, academicYear: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    placeholder="e.g. 2025-2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    value={editingItem?.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    placeholder="e.g. Academic Calendar - Odd Semester"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Calendar PDF URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.viewUrl || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          viewUrl: e.target.value,
                          downloadUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "viewUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TIMETABLE EDIT FIELDS */}
            {modalType === "timetable" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Semester
                    </label>
                    <input
                      type="text"
                      value={editingItem?.semester || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, semester: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="e.g. Semester I"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={editingItem?.department || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="e.g. Department of Commerce"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Programme Title
                  </label>
                  <input
                    type="text"
                    value={editingItem?.programme || editingItem?.title || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        programme: e.target.value,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Time Table PDF URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.docUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, docUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "docUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SYLLABUS EDIT FIELDS */}
            {modalType === "syllabus" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Programme
                  </label>
                  <input
                    type="text"
                    value={editingItem?.programme || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, programme: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    placeholder="e.g. B.Sc Honours"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Major / Specialization
                    </label>
                    <input
                      type="text"
                      value={editingItem?.major || editingItem?.specialization || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          major: e.target.value,
                          specialization: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Total Credits
                    </label>
                    <input
                      type="number"
                      value={editingItem?.totalCredits || 126}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          totalCredits: parseInt(e.target.value) || 126,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Syllabus PDF URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.docUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, docUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "docUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* REGULATION EDIT FIELDS */}
            {modalType === "regulation" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={editingItem?.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    placeholder="e.g. 2024-2025"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Regulation Title
                  </label>
                  <input
                    type="text"
                    value={editingItem?.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    placeholder="e.g. Choice Based Credit System (CBCS) Regulations"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Regulation Document PDF URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.docUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, docUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "docUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ILMS EDIT FIELDS */}
            {modalType === "ilms" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Metric No
                  </label>
                  <input
                    type="text"
                    value={editingItem?.metric || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, metric: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    placeholder="e.g. ILMS 4.2.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Metric Description
                  </label>
                  <input
                    type="text"
                    value={editingItem?.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Evidence Document PDF URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.documentUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, documentUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "documentUrl")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveModalItem}
                disabled={isUploading}
                className="px-6 py-2.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-bold text-xs transition shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                <Check className="w-4 h-4" /> Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={true}
          fileUrl={previewFile.url}
          title={previewFile.title}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
}

export default AcademicsManager;
