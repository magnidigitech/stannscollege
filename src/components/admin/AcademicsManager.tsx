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

  Key,

  Copy,

  EyeOff,

  Lock,

  RotateCcw,

} from "lucide-react";

import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

import defaultAcademicsData from "@/components/academics/academics-data.json";

interface AcademicDepartmentConfig {

  id: string;

  slug: string;

  name: string;

  defaultPass: string;

  aliases?: string[];

}

const ACADEMIC_DEPARTMENTS_LIST: AcademicDepartmentConfig[] = [

  { id: "1", slug: "department-of-commerce", name: "Department of Commerce", defaultPass: "commerce@2026" },

  { id: "2", slug: "department-of-computer-science-applications", name: "Dept. of Computer Science & Applications", defaultPass: "computerscience@2026", aliases: ["department-of-computer-applications-bca", "department-of-computer-science-cs-artificial-intelligence"] },

  { id: "3", slug: "department-of-mathematics", name: "Department of Mathematics", defaultPass: "mathematics@2026" },

  { id: "4", slug: "department-of-physics", name: "Department of Physics", defaultPass: "physics@2026" },

  { id: "5", slug: "department-of-statistics", name: "Department of Statistics", defaultPass: "statistics@2026" },

  { id: "6", slug: "department-of-biotechnology", name: "Department of Biotechnology", defaultPass: "biotechnology@2026" },

  { id: "7", slug: "department-of-microbiology", name: "Department of Microbiology", defaultPass: "microbiology@2026" },

  { id: "8", slug: "department-of-botany", name: "Department of Botany", defaultPass: "botany@2026" },

  { id: "9", slug: "department-of-chemistry", name: "Department of Chemistry", defaultPass: "chemistry@2026" },

  { id: "10", slug: "department-of-english", name: "Department of English", defaultPass: "english@2026" },

  { id: "11", slug: "department-of-oriental-languages", name: "Department of Oriental Languages", defaultPass: "orientallanguages@2026", aliases: ["department-of-oriental-languages-telugu-sanskrit-hindi"] },

  { id: "12", slug: "department-of-mca", name: "Department of MCA", defaultPass: "mca@2026" },

  { id: "13", slug: "department-of-mba", name: "Department of MBA", defaultPass: "mba@2026" },

];

interface Programme {
  sNo: number;
  name: string;
  intake?: number;
  sanctionedIntake?: number;
  convenerQuota: number;
  managementQuota: number;
  ewsQuota: number;
  aboutDocumentUrl: string;
  brochureUrl: string;
}

interface CalendarEntry {
  sNo?: number;
  year?: string;
  academicYear?: string;
  anuCalendarUrl?: string;
  aipUrl?: string;
  title?: string;
  viewUrl?: string;
  downloadUrl?: string;
}

interface TimetableEntry {
  sNo?: number;
  year?: string;
  academicYear?: string;
  oddSemUrl?: string;
  evenSemUrl?: string;
  semester?: string;
  department?: string;
  programme?: string;
  title?: string;
  docUrl?: string;
}

interface SyllabusEntry {
  sNo?: number;
  programme?: string;
  title?: string;
  major?: string;
  specialization?: string;
  totalCredits?: number;
  docUrl: string;
}

interface RegulationEntry {
  sNo?: number;
  year: string;
  title?: string;
  docUrl: string;
}

interface IlmsEntry {

  sNo: number;

  title: string;

  year: string;

  docUrl: string;

}

export interface AcademicsManagerProps {

  initialTab?: "A" | "B" | "C" | "D" | "E" | "F" | "G";

  currentTab?: "A" | "B" | "C" | "D" | "E" | "F" | "G";

  onTabChange?: (tab: "A" | "B" | "C" | "D" | "E" | "F" | "G") => void;

}

export function AcademicsManager({

  initialTab = "A",

  currentTab,

  onTabChange,

}: AcademicsManagerProps = {}) {

  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [saving, setSaving] = useState<boolean>(false);

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  // Active Main Tab: "A" | "B" | "C" | "D" | "E" | "F" | "G"

  const [activeTab, setActiveTab] = useState<"A" | "B" | "C" | "D" | "E" | "F" | "G">(

    currentTab || initialTab || "A"

  );

  useEffect(() => {

    if (currentTab && currentTab !== activeTab) {

      setActiveTab(currentTab);

    }

  }, [currentTab]);

  // Tab A Sub-tab: "UG" | "PG"

  const [programTab, setProgramTab] = useState<"UG" | "PG">("UG");

  // Tab B Sub-tab: "calendars" | "timetables" | "syllabus" | "regulations" | "ilms"

  const [resourceSubTab, setResourceSubTab] = useState<"calendars" | "timetables" | "syllabus" | "regulations" | "ilms">("calendars");

  const [calendarType, setCalendarType] = useState<"ug" | "pg">("ug");

  const [timetableType, setTimetableType] = useState<"ug" | "pg">("ug");

  const [timetableSemester, setTimetableSemester] = useState<"odd" | "even">("odd");

  const [syllabusType, setSyllabusType] = useState<"ug" | "pg">("ug");

  const [ilmsYear, setIlmsYear] = useState<string>("2025–2026");

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

  // Department Password Management States

  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const [copiedDept, setCopiedDept] = useState<string | null>(null);

  const [deptSearch, setDeptSearch] = useState<string>("");

  const [passwordSaving, setPasswordSaving] = useState<boolean>(false);

  const [passwordSaveSuccess, setPasswordSaveSuccess] = useState<boolean>(false);

  const handlePasswordChange = (deptSlug: string, newPassword: string, aliases?: string[]) => {

    setData((prev: any) => {

      const currentPasswords = { ...(prev?.departmentPasswords || {}) };

      currentPasswords[deptSlug] = newPassword;

      if (aliases && aliases.length > 0) {

        aliases.forEach((alias) => {

          currentPasswords[alias] = newPassword;

        });

      }

      return {

        ...prev,

        departmentPasswords: currentPasswords,

      };

    });

  };

  const handleResetPassword = (deptSlug: string, defaultPassword: string, aliases?: string[]) => {

    handlePasswordChange(deptSlug, defaultPassword, aliases);

  };

  const handleResetAllPasswords = () => {

    if (!window.confirm("Are you sure you want to reset all department passwords to their default 'departmentname@2026' pattern?")) {

      return;

    }

    const resetMap: Record<string, string> = {};

    ACADEMIC_DEPARTMENTS_LIST.forEach((d) => {

      resetMap[d.slug] = d.defaultPass;

      if (d.aliases) {

        d.aliases.forEach((alias) => {

          resetMap[alias] = d.defaultPass;

        });

      }

    });

    setData((prev: any) => ({

      ...prev,

      departmentPasswords: resetMap,

    }));

  };

  const handleSavePasswordsDirectly = async () => {

    setPasswordSaving(true);

    setPasswordSaveSuccess(false);

    setError(null);

    try {

      const res = await fetch("/api/admin/academics", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data),

      });

      const json = await res.json();

      if (json.success) {

        setPasswordSaveSuccess(true);

        setTimeout(() => setPasswordSaveSuccess(false), 4000);

      } else {

        setError(json.error || "Failed to save department passwords.");

      }

    } catch (err: any) {

      setError(err.message || "Network error while saving department passwords.");

    } finally {

      setPasswordSaving(false);

    }

  };

  const handleCopyPassword = (deptSlug: string, pass: string) => {

    if (typeof navigator !== "undefined" && navigator.clipboard) {

      navigator.clipboard.writeText(pass);

      setCopiedDept(deptSlug);

      setTimeout(() => setCopiedDept(null), 2500);

    }

  };

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

        const mergedData = { ...json.data };

        if (!mergedData.departmentPasswords) {

          const defaultPassMap: Record<string, string> = {};

          ACADEMIC_DEPARTMENTS_LIST.forEach((d) => {

            defaultPassMap[d.slug] = d.defaultPass;

            if (d.aliases) d.aliases.forEach((a) => (defaultPassMap[a] = d.defaultPass));

          });

          mergedData.departmentPasswords = defaultPassMap;

        }

        setData(mergedData);

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
    const populated = { ...item };
    if (type === "ugProgramme" || type === "pgProgramme") {
      populated.sanctionedIntake = populated.sanctionedIntake ?? populated.intake ?? 0;
      populated.intake = populated.sanctionedIntake;
    }
    setEditingItem(populated);
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
        sanctionedIntake: 60,
        intake: 60,
        convenerQuota: 42,
        managementQuota: 18,
        ewsQuota: 6,
        aboutDocumentUrl: "",
        brochureUrl: "",
      });

    } else if (type === "calendar") {
      setEditingItem({
        sNo: (data?.academicCalendar?.[calendarType]?.length || 0) + 1,
        year: "2026–2027",
        anuCalendarUrl: "",
        aipUrl: "",
      });
    } else if (type === "timetable") {
      setEditingItem({
        sNo: (data?.timetables?.[timetableSemester]?.length || 0) + 1,
        year: "2026–2027",
        oddSemUrl: "",
        evenSemUrl: "",
      });
    } else if (type === "syllabus") {
      const targetGroup = syllabusType === "ug" ? "ugSingleMajor" : "pgSyllabus";
      setEditingItem({
        sNo: (data?.curriculumSyllabus?.[targetGroup]?.length || 0) + 1,
        title: "",
        docUrl: "",
      });
    } else if (type === "regulation") {
      setEditingItem({
        sNo: (data?.academicRegulations?.length || 0) + 1,
        year: "2026–27",
        docUrl: "",
      });

    } else if (type === "ilms") {

      setEditingItem({

        sNo: (data?.ilms?.reports?.filter((r: any) => r.year === ilmsYear).length || 0) + 1,

        title: "",

        year: ilmsYear,

        docUrl: "/documents/DefaultFile_1.pdf",

      });

    }

    setModalOpen(true);

  };

  const saveModalItem = () => {

    if (!editingItem) return;

    if (modalType === "ugProgramme") {
      const normalized = {
        ...editingItem,
        sanctionedIntake: editingItem?.sanctionedIntake ?? editingItem?.intake ?? 0,
        intake: editingItem?.sanctionedIntake ?? editingItem?.intake ?? 0,
      };
      const updated = [...(data?.ugProgrammes || [])];
      if (editIndex !== null) {
        updated[editIndex] = normalized;
      } else {
        updated.push(normalized);
      }
      setData({ ...data, ugProgrammes: updated });
    } else if (modalType === "pgProgramme") {
      const normalized = {
        ...editingItem,
        sanctionedIntake: editingItem?.sanctionedIntake ?? editingItem?.intake ?? 0,
        intake: editingItem?.sanctionedIntake ?? editingItem?.intake ?? 0,
      };
      const updated = [...(data?.pgProgrammes || [])];
      if (editIndex !== null) {
        updated[editIndex] = normalized;
      } else {
        updated.push(normalized);
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

      const updated = [...(data?.ilms?.reports || [])];

      if (editIndex !== null) {

        updated[editIndex] = editingItem;

      } else {

        updated.push(editingItem);

      }

      setData({

        ...data,

        ilms: {

          ...data.ilms,

          reports: updated,

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

      const updated = data.ilms.reports.filter((_: any, i: number) => i !== index);

      setData({

        ...data,

        ilms: { ...data.ilms, reports: updated },

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

  const totalSanctioned = activeProgrammes.reduce((acc, p) => acc + (Number(p.sanctionedIntake || p.intake) || 0), 0);

  const totalConvener = activeProgrammes.reduce((acc, p) => acc + (Number(p.convenerQuota) || 0), 0);

  const totalManagement = activeProgrammes.reduce((acc, p) => acc + (Number(p.managementQuota) || 0), 0);

  const totalEws = activeProgrammes.reduce((acc, p) => acc + (Number(p.ewsQuota) || 0), 0);

  return (

    <div className="space-y-4 animate-fadeIn font-sans pb-6">

      {/* Top Header Card */}

      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-[#002147] text-amber-400 flex items-center justify-center shadow-md shrink-0">

            <GraduationCap className="h-7 w-7" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">

                Academics &amp; Programmes Management

              </h2>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">

                Live Sanity Sync

              </span>

            </div>

            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">

              Manage undergraduate and postgraduate programmes, regulations, syllabus, calendar, departments, and learning resources.

            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">

          <Link

            href="/academics"

            target="_blank"

            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"

          >

            <ExternalLink className="h-4 w-4 text-slate-500" />

            <span>Preview Live</span>

          </Link>

          <button

            onClick={fetchData}

            disabled={saving}

            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"

          >

            <RefreshCw className={`h-4 w-4 ${saving ? "animate-spin" : ""}`} />

            <span>Refresh</span>

          </button>

          <button

            onClick={handleSaveAll}

            disabled={saving}

            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 font-black text-xs shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"

          >

            {saving ? (

              <>

                <Loader2 className="w-4 h-4 animate-spin" />

                <span>Saving...</span>

              </>

            ) : saveSuccess ? (

              <>

                <Check className="w-4 h-4 text-emerald-900" />

                <span>Saved to Sanity!</span>

              </>

            ) : (

              <>

                <Save className="w-4 h-4" />

                <span>Save All Changes</span>

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

          {/* Programmes Table */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse text-xs">

                <thead>

                  <tr className="bg-[#002147] text-white uppercase text-[11px] tracking-wider">

                    <th className="py-3.5 px-3 text-center w-14 font-bold border-r border-blue-900/60">S. NO.</th>

                    <th className="py-3.5 px-5 font-black border-r border-blue-900/60">NAME OF THE PROGRAMME</th>

                    <th className="py-3.5 px-4 text-center bg-blue-800/80 text-amber-300 font-black border-r border-blue-900/60">SANCTIONED INTAKE</th>

                    <th className="py-3.5 px-4 font-bold text-center border-r border-blue-900/60">CONVENER QUOTA SEATS</th>

                    <th className="py-3.5 px-4 font-bold text-center border-r border-blue-900/60">MANAGEMENT QUOTA SEATS</th>

                    <th className="py-3.5 px-4 font-bold text-center border-r border-blue-900/60">EWS QUOTA SEATS</th>

                    <th className="py-3.5 px-4 font-bold text-center border-r border-blue-900/60">VIEW DOCUMENTS</th>

                    <th className="py-3.5 px-4 font-bold text-center border-r border-blue-900/60">BROCHURE</th>

                    <th className="py-3.5 px-4 font-bold text-right">ACTIONS</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredProgrammes.map((prog, idx) => (

                    <tr key={prog.sNo || idx} className="hover:bg-slate-50/80 transition group">

                      <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{prog.sNo || idx + 1}</td>

                      <td className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-100">

                        {prog.name}

                      </td>

                      <td className="py-3.5 px-4 text-center font-black text-[#002147] bg-blue-50/60 border-r border-slate-100 text-sm">

                        {prog.sanctionedIntake ?? prog.intake ?? 0}

                      </td>

                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">{prog.convenerQuota}</td>

                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">{prog.managementQuota}</td>

                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">{prog.ewsQuota}</td>

                      <td className="py-3.5 px-4 text-center border-r border-slate-100">

                        {prog.aboutDocumentUrl ? (

                          <button

                            onClick={() =>

                              setPreviewFile({

                                url: prog.aboutDocumentUrl,

                                title: `${prog.name} - Programme Regulations & Syllabus`,

                              })

                            }

                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"

                          >

                            <FileText className="h-3.5 w-3.5" /> View

                          </button>

                        ) : (

                          <span className="text-slate-300 italic text-xs">No File</span>

                        )}

                      </td>

                      <td className="py-3.5 px-4 text-center border-r border-slate-100">

                        {prog.brochureUrl ? (

                          <button

                            onClick={() =>

                              setPreviewFile({

                                url: prog.brochureUrl,

                                title: `${prog.name} - Brochure`,

                              })

                            }

                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"

                          >

                            <Download className="h-3.5 w-3.5" /> View

                          </button>

                        ) : (

                          <span className="text-slate-300 italic text-xs">No File</span>

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  {(["ug", "pg"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setCalendarType(t)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                        calendarType === t
                          ? "bg-white text-[#002147] shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {t.toUpperCase()} Calendars
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
                      <th className="py-3 px-6 text-center">ANU Academic Calendar</th>
                      <th className="py-3 px-6 text-center">College Annual Institutional Plan (AIP)</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.academicCalendar?.[calendarType] || []).map((cal: any, idx: number) => {
                      const yr = cal.year || cal.academicYear || "";
                      const anuUrl = cal.anuCalendarUrl || cal.viewUrl || "";
                      const aipUrl = cal.aipUrl || "";

                      return (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 text-center text-slate-400 font-bold">{cal.sNo || idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-[#002147]">{yr}</td>
                          <td className="py-3 px-6 text-center">
                            {anuUrl ? (
                              <button
                                onClick={() => setPreviewFile({ url: anuUrl, title: `${calendarType.toUpperCase()} ANU Academic Calendar (${yr})` })}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs"
                              >
                                <FileText className="w-3.5 h-3.5" /> View / Download
                              </button>
                            ) : (
                              <span className="text-slate-300 italic">No PDF</span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            {aipUrl ? (
                              <button
                                onClick={() => setPreviewFile({ url: aipUrl, title: `${calendarType.toUpperCase()} College AIP (${yr})` })}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs"
                              >
                                <Download className="w-3.5 h-3.5" /> View / Download
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
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteItem("calendar", idx)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-view: Timetables */}

          {resourceSubTab === "timetables" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  {(["ug", "pg"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimetableType(t)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                        timetableType === t
                          ? "bg-white text-[#002147] shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {t.toUpperCase()} Timetables
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => openAddModal("timetable")}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Timetable
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-12 text-center">S.No</th>
                      <th className="py-3 px-4">Academic Year</th>
                      <th className="py-3 px-6 text-center">I, III &amp; V Semesters (Odd Semesters)</th>
                      <th className="py-3 px-6 text-center">II, IV &amp; VI Semesters (Even Semesters)</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.timetables?.[timetableType] || []).map((tt: any, idx: number) => {
                      const yr = tt.year || tt.academicYear || "";
                      const oddUrl = tt.oddSemUrl || "";
                      const evenUrl = tt.evenSemUrl || "";

                      return (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 text-center text-slate-400 font-bold">{tt.sNo || idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-[#002147]">{yr}</td>
                          <td className="py-3 px-6 text-center">
                            {oddUrl ? (
                              <button
                                onClick={() => setPreviewFile({ url: oddUrl, title: `${timetableType.toUpperCase()} Odd Sem Timetable (${yr})` })}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs"
                              >
                                <FileText className="w-3.5 h-3.5" /> View / Download
                              </button>
                            ) : (
                              <span className="text-slate-300 italic">No PDF</span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            {evenUrl ? (
                              <button
                                onClick={() => setPreviewFile({ url: evenUrl, title: `${timetableType.toUpperCase()} Even Sem Timetable (${yr})` })}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs"
                              >
                                <Download className="w-3.5 h-3.5" /> View / Download
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
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteItem("timetable", idx)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
                      <th className="py-3 px-6">Major Discipline / Programme Title</th>
                      <th className="py-3 px-4 text-center">Syllabus PDF Document</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.curriculumSyllabus?.[syllabusType === "ug" ? "ugSingleMajor" : "pgSyllabus"] || []).map(
                      (syl: SyllabusEntry, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 text-center text-slate-400 font-bold">{syl.sNo || idx + 1}</td>
                          <td className="py-3 px-6 font-bold text-slate-800">{syl.title || syl.programme}</td>
                          <td className="py-3 px-4 text-center">
                            {syl.docUrl ? (
                              <button
                                onClick={() => setPreviewFile({ url: syl.docUrl, title: `${syl.title || syl.programme || "Curriculum"} Syllabus` })}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs"
                              >
                                <FileText className="w-3.5 h-3.5" /> View / Download
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
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteItem("syllabus", idx)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                                title="Delete"
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
                      <th className="py-3 px-6 text-center">Regulatory Document</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(data?.academicRegulations || []).map((reg: RegulationEntry, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">{reg.sNo || idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-[#002147]">{reg.year}</td>
                        <td className="py-3 px-6 text-center">
                          {reg.docUrl ? (
                            <button
                              onClick={() => setPreviewFile({ url: reg.docUrl, title: reg.title || `Academic Regulations (${reg.year})` })}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs"
                            >
                              <FileText className="w-3.5 h-3.5" /> View / Download
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
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem("regulation", idx)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                              title="Delete"
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                <div>

                  <h3 className="font-outfit text-base font-black text-slate-800">

                    ILMS (Integrated Learning Management System) Reports &amp; Evidence

                  </h3>

                  <p className="text-xs text-slate-500 font-medium">

                    Filter by Academic Year to view, edit, add, or upload supporting compliance documents.

                  </p>

                </div>

                <div className="flex items-center gap-2 flex-wrap">

                  {/* Academic Year Selector */}

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">

                    {["2026–2027", "2025–2026", "2024–2025", "2023–2024"].map((yr) => (

                      <button

                        key={yr}

                        onClick={() => setIlmsYear(yr)}

                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${

                          ilmsYear === yr

                            ? "bg-[#002147] text-white shadow-xs"

                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"

                        }`}

                      >

                        {yr}

                      </button>

                    ))}

                  </div>

                  <button

                    onClick={() => openAddModal("ilms")}

                    className="px-4 py-2 bg-[#002147] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"

                  >

                    <Plus className="w-4 h-4" /> Add Document

                  </button>

                </div>

              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">

                <table className="w-full text-left text-xs border-collapse">

                  <thead>

                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">

                      <th className="py-3 px-4 w-12 text-center">S.No</th>

                      <th className="py-3 px-6">Document / Evidence Title</th>

                      <th className="py-3 px-4 text-center">Academic Year</th>

                      <th className="py-3 px-4 text-center">Document</th>

                      <th className="py-3 px-4 text-right">Actions</th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {(() => {

                      const allReports = data?.ilms?.reports || [];

                      const yearReports = allReports

                        .map((item: any, globalIdx: number) => ({ item, globalIdx }))

                        .filter(({ item }: any) => item.year === ilmsYear);

                      if (yearReports.length === 0) {

                        return (

                          <tr>

                            <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">

                              No documents recorded for academic year {ilmsYear}. Click &ldquo;Add Document&rdquo; above.

                            </td>

                          </tr>

                        );

                      }

                      return yearReports.map(({ item, globalIdx }: any, rowIdx: number) => (

                        <tr key={globalIdx} className="hover:bg-slate-50/80">

                          <td className="py-3 px-4 text-center text-slate-400 font-bold">{item.sNo || rowIdx + 1}</td>

                          <td className="py-3 px-6 font-bold text-[#002147]">{item.title}</td>

                          <td className="py-3 px-4 text-center font-semibold text-slate-600">{item.year}</td>

                          <td className="py-3 px-4 text-center">

                            {item.docUrl ? (

                              <button

                                onClick={() => setPreviewFile({ url: item.docUrl, title: `${item.title} (${item.year})` })}

                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"

                              >

                                <FileText className="w-3 h-3" /> View Document

                              </button>

                            ) : (

                              <span className="text-slate-300 italic">No Document</span>

                            )}

                          </td>

                          <td className="py-3 px-4 text-right">

                            <div className="flex items-center justify-end gap-1.5">

                              <button

                                onClick={() => openEditModal("ilms", item, globalIdx)}

                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"

                                title="Edit Document"

                              >

                                <Edit2 className="w-3.5 h-3.5" />

                              </button>

                              <button

                                onClick={() => deleteItem("ilms", globalIdx)}

                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"

                                title="Delete Document"

                              >

                                <Trash2 className="w-3.5 h-3.5" />

                              </button>

                            </div>

                          </td>

                        </tr>

                      ));

                    })()}

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

          {/* Section Banner */}

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="space-y-2 max-w-xl">

              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">

                13 Academic Departments

              </span>

              <h3 className="font-outfit text-xl font-black text-slate-900">

                Department Content &amp; Staff Administration

              </h3>

              <p className="text-slate-500 text-xs leading-relaxed">

                Academic departments have their dedicated self-service update portal where Department Heads can upload annual reports, faculty profiles, and departmental achievements using their departmental password.

              </p>

            </div>

            <div className="flex items-center gap-3">

              <Link

                href="/academics/departments/update"

                target="_blank"

                className="px-5 py-3 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold transition flex items-center gap-2 shadow-sm shrink-0"

              >

                <Edit2 className="w-4 h-4" /> Open Department Update Portal

              </Link>

            </div>

          </div>

          {/* Department Passwords Management Card */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">

            {/* Header */}

            <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-slate-50">

              <div className="space-y-1">

                <div className="flex items-center gap-2">

                  <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">

                    <Key className="w-4 h-4" />

                  </div>

                  <h4 className="font-outfit text-base font-black text-slate-900">

                    Department Update Portal Passwords

                  </h4>

                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">

                    Editable by Admin

                  </span>

                </div>

                <p className="text-xs text-slate-500 font-medium">

                  Default password format: <span className="font-mono font-bold text-[#002147]">[deptname]@2026</span>. Department heads use this password to authenticate at <code className="text-[#002147] font-semibold">/academics/departments/update</code>.

                </p>

              </div>

              <div className="flex flex-wrap items-center gap-2.5">

                <div className="relative">

                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

                  <input

                    type="text"

                    placeholder="Search department..."

                    value={deptSearch}

                    onChange={(e) => setDeptSearch(e.target.value)}

                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"

                  />

                  {deptSearch && (

                    <button

                      onClick={() => setDeptSearch("")}

                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"

                    >

                      ×

                    </button>

                  )}

                </div>

                <button

                  type="button"

                  onClick={handleResetAllPasswords}

                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"

                  title="Reset all passwords to default departmentname@2026 format"

                >

                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />

                  Reset Defaults

                </button>

                <button

                  type="button"

                  onClick={handleSavePasswordsDirectly}

                  disabled={passwordSaving}

                  className="px-4 py-1.5 rounded-xl bg-[#002147] hover:bg-[#00387a] disabled:opacity-60 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"

                >

                  {passwordSaving ? (

                    <>

                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />

                      <span>Saving...</span>

                    </>

                  ) : (

                    <>

                      <Save className="w-3.5 h-3.5 text-white" />

                      <span>Save Passwords</span>

                    </>

                  )}

                </button>

              </div>

            </div>

            {/* Success Banner */}

            {passwordSaveSuccess && (

              <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-bold animate-fadeIn">

                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />

                <span>Department passwords saved successfully and published live!</span>

              </div>

            )}

            {/* Passwords Table */}

            <div className="overflow-x-auto">

              <table className="w-full text-left text-xs border-collapse">

                <thead>

                  <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">

                    <th className="py-3 px-4 w-12 text-center">S. No.</th>

                    <th className="py-3 px-4 min-w-[200px]">Department</th>

                    <th className="py-3 px-4 min-w-[180px]">Portal Identifier (Slug)</th>

                    <th className="py-3 px-4 min-w-[280px]">Update Password (Editable)</th>

                    <th className="py-3 px-4 text-right w-44">Actions</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {ACADEMIC_DEPARTMENTS_LIST

                    .filter((d) => {

                      if (!deptSearch.trim()) return true;

                      const q = deptSearch.toLowerCase();

                      return d.name.toLowerCase().includes(q) || d.slug.toLowerCase().includes(q);

                    })

                    .map((dept) => {

                      const currentPass = data?.departmentPasswords?.[dept.slug] ?? dept.defaultPass;

                      const isVisible = !!visiblePasswords[dept.slug];

                      const isCopied = copiedDept === dept.slug;

                      return (

                        <tr key={dept.slug} className="hover:bg-slate-50/70 transition-colors">

                          <td className="py-3 px-4 text-center font-bold text-slate-400">

                            {dept.id}

                          </td>

                          <td className="py-3 px-4">

                            <div className="flex items-center gap-2">

                              <span className="font-extrabold text-slate-900">{dept.name}</span>

                            </div>

                          </td>

                          <td className="py-3 px-4">

                            <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">

                              {dept.slug}

                            </span>

                          </td>

                          <td className="py-3 px-4">

                            <div className="flex items-center gap-1.5 max-w-sm">

                              <div className="relative flex-1">

                                <input

                                  type={isVisible ? "text" : "password"}

                                  value={currentPass}

                                  onChange={(e) => handlePasswordChange(dept.slug, e.target.value, dept.aliases)}

                                  className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-1.5 pr-8 text-xs font-mono font-bold text-[#002147] focus:outline-none focus:ring-1 focus:ring-[#002147]/20 shadow-xs"

                                  placeholder="Set password"

                                />

                                <button

                                  type="button"

                                  onClick={() =>

                                    setVisiblePasswords((prev) => ({

                                      ...prev,

                                      [dept.slug]: !prev[dept.slug],

                                    }))

                                  }

                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"

                                  title={isVisible ? "Hide Password" : "Show Password"}

                                >

                                  {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}

                                </button>

                              </div>

                              <button

                                type="button"

                                onClick={() => handleCopyPassword(dept.slug, currentPass)}

                                className={`p-1.5 rounded-lg border transition shrink-0 ${

                                  isCopied

                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"

                                    : "bg-white text-slate-500 hover:text-[#002147] hover:bg-slate-50 border-slate-200"

                                }`}

                                title={isCopied ? "Copied!" : "Copy password to clipboard"}

                              >

                                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}

                              </button>

                              <button

                                type="button"

                                onClick={() => handleResetPassword(dept.slug, dept.defaultPass, dept.aliases)}

                                className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 transition shrink-0"

                                title={`Reset to default (${dept.defaultPass})`}

                              >

                                <RotateCcw className="w-3.5 h-3.5" />

                              </button>

                            </div>

                          </td>

                          <td className="py-3 px-4 text-right">

                            <div className="flex items-center justify-end gap-2">

                              <Link

                                href="/academics/departments/update"

                                target="_blank"

                                className="px-2.5 py-1 text-[11px] font-bold text-[#002147] bg-blue-50 hover:bg-blue-100 rounded-lg transition inline-flex items-center gap-1 border border-blue-100"

                                title="Open Update Portal in new tab"

                              >

                                <Lock className="w-3 h-3" /> Login

                              </Link>

                              <Link

                                href={`/academics/departments/${dept.slug}`}

                                target="_blank"

                                className="p-1.5 text-slate-400 hover:text-[#002147] hover:bg-slate-100 rounded-lg transition shrink-0"

                                title="View Public Page"

                              >

                                <ExternalLink className="w-3.5 h-3.5" />

                              </Link>

                            </div>

                          </td>

                        </tr>

                      );

                    })}

                </tbody>

              </table>

            </div>

            {/* Security Note Footer */}

            <div className="p-4 bg-slate-50/70 border-t border-slate-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">

              <div className="flex items-center gap-2">

                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />

                <span>

                  Passwords are saved to the persistent academics database. Department heads can only edit their authorized department.

                </span>

              </div>

              <span className="text-slate-400 font-mono text-[10px]">

                Master Admin Override: Active

              </span>

            </div>

          </div>

          {/* Department Directory Quick Links */}

          <div className="space-y-3">

            <h4 className="font-outfit text-sm font-bold text-slate-700 uppercase tracking-wider">

              Public Department Pages Directory

            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {ACADEMIC_DEPARTMENTS_LIST.map((dept) => (

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

                <span className="text-xs text-slate-500 font-bold">

                  {modalType === "ugProgramme"

                    ? "Undergraduate (UG) Programme"

                    : modalType === "pgProgramme"

                    ? "Postgraduate (PG) Programme"

                    : modalType === "calendar"

                    ? `${calendarType.toUpperCase()} Academic Calendar`

                    : modalType === "timetable"

                    ? `${timetableType.toUpperCase()} Semester Timetable`

                    : modalType === "syllabus"

                    ? `${syllabusType.toUpperCase()} Curriculum & Syllabus`

                    : modalType === "regulation"

                    ? "Academic Regulation"

                    : modalType === "ilms"

                    ? "ILMS Library Evidence Document"

                    : modalType.replace(/([A-Z])/g, " $1")}

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
                    Name of the Programme <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingItem?.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#002147]"
                    placeholder="e.g. B.Com. Honours-General"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Sanctioned Intake
                    </label>
                    <input
                      type="number"
                      value={editingItem?.sanctionedIntake ?? editingItem?.intake ?? 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setEditingItem({ ...editingItem, sanctionedIntake: val, intake: val });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Convener Quota Seats
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
                      Management Quota Seats
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
                      EWS Quota Seats
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

                {/* View Documents (Programme Regulations & Syllabus PDF) */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    View Documents (Programme Regulations &amp; Syllabus PDF)
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
                    <label className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
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
                    Brochure (Flyer Image or PDF)
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
                    <label className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
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
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2026–2027"
                    value={editingItem?.year || editingItem?.academicYear || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-[#002147]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    ANU Academic Calendar PDF URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/documents/... or https://..."
                      value={editingItem?.anuCalendarUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, anuCalendarUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:outline-none focus:border-[#002147]"
                    />
                    <label className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "anuCalendarUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    College Annual Institutional Plan (AIP) PDF URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/documents/... or https://..."
                      value={editingItem?.aipUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, aipUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:outline-none focus:border-[#002147]"
                    />
                    <label className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "aipUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {modalType === "timetable" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2026–2027"
                    value={editingItem?.year || editingItem?.academicYear || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-[#002147]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    I, III &amp; V Semesters (Odd Semesters) Timetable PDF
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/documents/... or https://..."
                      value={editingItem?.oddSemUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, oddSemUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:outline-none focus:border-[#002147]"
                    />
                    <label className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "oddSemUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    II, IV &amp; VI Semesters (Even Semesters) Timetable PDF
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/documents/... or https://..."
                      value={editingItem?.evenSemUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, evenSemUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:outline-none focus:border-[#002147]"
                    />
                    <label className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "evenSemUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {modalType === "syllabus" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Major Discipline / Programme Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingItem?.title || editingItem?.programme || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#002147]"
                    placeholder="e.g. B.Com. Honours - General"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Syllabus PDF Document URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.docUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, docUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
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
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingItem?.year || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#002147]"
                    placeholder="e.g. 2026–27"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Regulatory Document PDF URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.docUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, docUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                      placeholder="Paste PDF URL or upload..."
                    />
                    <label className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
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

                    Document / Evidence Title

                  </label>

                  <input

                    type="text"

                    value={editingItem?.title || ""}

                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}

                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"

                    placeholder="e.g. ILMS Annual Report"

                  />

                </div>

                <div>

                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">

                    Academic Year

                  </label>

                  <input

                    type="text"

                    value={editingItem?.year || ""}

                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}

                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"

                    placeholder="e.g. 2025–2026"

                  />

                </div>

                <div>

                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">

                    Evidence Document PDF URL

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

