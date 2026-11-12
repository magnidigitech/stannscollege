"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Building, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, 
  Upload, Eye, ExternalLink, Save, ArrowLeft, RefreshCw, Lock, 
  Users, BookOpen, Award, FileText, Handshake, Calendar, Image as ImageIcon,
  ChevronRight, Camera, X, Sparkles, HelpCircle, LogOut
} from "lucide-react";
import { getDepartment } from "@/lib/sanity";

export interface CustomTableRow {
  _key?: string;
  cells: string[];
}

export interface CustomTable {
  id: string;
  title: string;
  description?: string;
  columns: string[];
  rows: CustomTableRow[];
}

interface DepartmentConfig {
  id: string;
  name: string;
  code: string;
}

const DEPARTMENTS: DepartmentConfig[] = [
  { id: "department-of-commerce", name: "Department of Commerce", code: "COMM" },
  { id: "department-of-computer-science-applications", name: "Dept. of Computer Science & Applications (BCA / B.Sc / AI)", code: "CS-AI" },
  { id: "department-of-mathematics", name: "Department of Mathematics", code: "MATH" },
  { id: "department-of-physics", name: "Department of Physics", code: "PHYS" },
  { id: "department-of-statistics", name: "Department of Statistics", code: "STAT" },
  { id: "department-of-biotechnology", name: "Department of Biotechnology", code: "BIOT" },
  { id: "department-of-microbiology", name: "Department of Microbiology", code: "MICR" },
  { id: "department-of-botany", name: "Department of Botany", code: "BOTA" },
  { id: "department-of-chemistry", name: "Department of Chemistry", code: "CHEM" },
  { id: "department-of-english", name: "Department of English", code: "ENGL" },
  { id: "department-of-oriental-languages", name: "Department of Oriental Languages (Telugu, Sanskrit, Hindi)", code: "LANG" },
  { id: "department-of-mca", name: "Department of MCA (Master of Computer Applications)", code: "MCA" },
  { id: "department-of-mba", name: "Department of MBA (Master of Business Administration)", code: "MBA" }
];

export function DepartmentUpdateForm() {
  const [step, setStep] = useState<"login" | "editor">("login");
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS[0].id);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" });
  const [lastSaved, setLastSaved] = useState("");

  // 1. Core Profile Details
  const [established, setEstablished] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState<string[]>([]);
  const [overviewDocUrl, setOverviewDocUrl] = useState("/documents/DefaultFile_1.pdf");

  // 2. Programmes Offered
  const [programmes, setProgrammes] = useState<Array<{ 
    sNo?: number; 
    name: string; 
    intake: string | number; 
    counseling: string | number; 
    management: string | number;
  }>>([]);

  // 3. Faculty Directory (Linked with Central Data)
  const [facultyMembers, setFacultyMembers] = useState<Array<{ 
    _id?: string;
    name: string; 
    designation: string; 
    qualification?: string; 
    experience?: string; 
    email?: string;
    employeeId?: string;
    imageUrl?: string;
    photoFile?: File | null;
    staffType?: string;
    specialization?: string;
    dateOfJoining?: string;
    [key: string]: any;
  }>>([]);
  const [editingProfileIndex, setEditingProfileIndex] = useState<number | null>(null);
  const [uploadingDocKey, setUploadingDocKey] = useState<string | null>(null);

  const handleDocumentUpload = async (
    file: File, 
    onSuccess: (url: string) => void, 
    key: string
  ) => {
    setUploadingDocKey(key);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", "documents");

      const res = await fetch("/api/department-update/upload", {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data.success && data.url) {
        onSuccess(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unable to upload file."));
      }
    } catch (err: any) {
      console.error("Document upload error:", err);
      alert("Network error during document upload.");
    } finally {
      setUploadingDocKey(null);
    }
  };

  // 4. Curriculum & Learning Outcomes (6-Row Document Table)
  const [curriculumDocuments, setCurriculumDocuments] = useState<Array<{ 
    sNo: number; 
    particular: string; 
    documentUrl: string;
  }>>([]);

  // 5. Outgoing Batch – Student Strength and Pass Percentage
  const [passPercentage, setPassPercentage] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    finalYearStudents: string; 
    studentsPassed: string; 
    percentage: string;
  }>>([]);

  // 6. Year-wise Placement Summary
  const [placements, setPlacements] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    studentsPlaced: string; 
    highestSalary: string; 
    averageSalary: string; 
    percentage: string;
  }>>([]);

  // 7. MOUs – Memorandum of Understanding
  const [mous, setMous] = useState<Array<{ 
    sNo?: number; 
    organization: string; 
    duration: string; 
    documentUrl: string; 
    reportUrl: string;
  }>>([]);

  // 8. Activities, Events, Programmes & Celebrations
  const [activities, setActivities] = useState<Array<{ 
    sNo?: number; 
    title: string; 
    date: string; 
    participants: string; 
    reportUrl: string;
  }>>([]);

  // 9. Student External Achievements, Participation & Representation
  const [studentAchievements, setStudentAchievements] = useState<Array<{ 
    sNo?: number; 
    studentName: string; 
    eventName: string; 
    level: string; 
    prize: string; 
    certificateUrl: string;
  }>>([]);

  // 10. University Ranks & Academic Achievements
  const [universityRanks, setUniversityRanks] = useState<Array<{ 
    sNo?: number; 
    studentName: string; 
    programme: string; 
    rank: string; 
    year: string; 
    certificateUrl: string;
  }>>([]);

  // 11. Year-wise Annual Activity Reports
  const [annualReports, setAnnualReports] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    activitiesCount: string; 
    reportUrl: string; 
    supportingDocUrl: string;
  }>>([]);

  // 12. Dynamic Custom Tables
  const [customTables, setCustomTables] = useState<CustomTable[]>([]);

  // 13. Department Photo & Video Gallery
  const [gallery, setGallery] = useState<Array<{ 
    image?: any; 
    file?: File | null; 
    url?: string;
    caption: string; 
  }>>([]);

  // Handle Login Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your departmental password." });
      return;
    }
    setLoginLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/department-update/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentId: selectedDeptId, password }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("editor");
      } else {
        setStatusMsg({ type: "error", text: data.error || "Incorrect password for this department." });
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setStatusMsg({ type: "error", text: "Connection error. Please try again." });
    } finally {
      setLoginLoading(false);
    }
  };

  // Load Department Data
  const loadDeptData = async () => {
    setLoading(true);
    setStatusMsg({ type: "", text: "" });
    try {
      const data = await getDepartment(selectedDeptId);
      if (data) {
        setEstablished(data.established || "1997-98");
        setTagline(data.tagline || "");
        setDescription(data.description || "");
        setVision(data.vision || "");
        setMission(Array.isArray(data.mission) ? data.mission : []);
        setOverviewDocUrl(data.overviewDocUrl || "/documents/DefaultFile_1.pdf");
        
        // 1. Programmes
        if (Array.isArray(data.programmes) && data.programmes.length > 0) {
          setProgrammes(data.programmes.map((p: any, i: number) => ({
            sNo: i + 1,
            name: p.name || p.title || "",
            intake: p.intake || "-",
            counseling: p.counseling || "-",
            management: p.management || "-"
          })));
        } else {
          setProgrammes([]);
        }

        // 2. Curriculum Documents
        if (Array.isArray(data.curriculumDocuments) && data.curriculumDocuments.length > 0) {
          setCurriculumDocuments(data.curriculumDocuments);
        } else {
          setCurriculumDocuments([
            { sNo: 1, particular: "Programme Structure & Curriculum", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, particular: "Course Syllabi", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, particular: "Course Outcomes (COs)", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 4, particular: "Programme Specific Outcomes (PSOs)", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 5, particular: "Programme Outcomes (POs)", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 6, particular: "Academic Regulations & Evaluation Guidelines", documentUrl: "/documents/DefaultFile_1.pdf" },
          ]);
        }

        // 3. Results (Pass %)
        if (Array.isArray(data.passPercentage) && data.passPercentage.length > 0) {
          setPassPercentage(data.passPercentage.map((p: any, i: number) => ({
            sNo: i + 1,
            year: p.year || "",
            finalYearStudents: p.finalYearStudents || "",
            studentsPassed: p.studentsPassed || "",
            percentage: p.percentage || ""
          })));
        } else {
          setPassPercentage([]);
        }

        // 4. Placements
        if (Array.isArray(data.placements) && data.placements.length > 0) {
          setPlacements(data.placements.map((p: any, i: number) => ({
            sNo: i + 1,
            year: p.year || "",
            studentsPlaced: p.studentsPlaced || "",
            highestSalary: p.highestSalary || "",
            averageSalary: p.averageSalary || "",
            percentage: p.percentage || ""
          })));
        } else {
          setPlacements([]);
        }

        // 5. MOUs
        if (Array.isArray(data.mous) && data.mous.length > 0) {
          setMous(data.mous.map((m: any, i: number) => ({
            sNo: i + 1,
            organization: m.organization || m.title || "",
            duration: m.duration || "",
            documentUrl: m.documentUrl || "/documents/DefaultFile_1.pdf",
            reportUrl: m.reportUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setMous([]);
        }

        // 6. Activities
        const acts = data.activities || data.activitiesList || [];
        if (Array.isArray(acts) && acts.length > 0) {
          setActivities(acts.map((a: any, i: number) => ({
            sNo: i + 1,
            title: a.title || a.label || "",
            date: a.date || "",
            participants: a.participants || "",
            reportUrl: a.reportUrl || a.documentUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setActivities([]);
        }

        // 7. Student Achievements
        if (Array.isArray(data.studentAchievements) && data.studentAchievements.length > 0) {
          setStudentAchievements(data.studentAchievements.map((s: any, i: number) => ({
            sNo: i + 1,
            studentName: s.studentName || s.name || "",
            eventName: s.eventName || s.activity || "",
            level: s.level || "",
            prize: s.prize || s.achievement || "",
            certificateUrl: s.certificateUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setStudentAchievements([]);
        }

        // 8. University Ranks
        const ranks = data.universityRanks || data.academicAchievements || [];
        if (Array.isArray(ranks) && ranks.length > 0) {
          setUniversityRanks(ranks.map((r: any, i: number) => ({
            sNo: i + 1,
            studentName: r.studentName || r.name || "",
            programme: r.programme || "",
            rank: r.rank || r.award || "",
            year: r.year || "",
            certificateUrl: r.certificateUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setUniversityRanks([]);
        }

        // 9. Annual Reports
        const reports = data.annualReports || data.activitiesSummary || [];
        if (Array.isArray(reports) && reports.length > 0) {
          setAnnualReports(reports.map((r: any, i: number) => ({
            sNo: i + 1,
            year: r.year || "",
            activitiesCount: r.activitiesCount || r.count || "",
            reportUrl: r.reportUrl || r.documentUrl || "/documents/DefaultFile_1.pdf",
            supportingDocUrl: r.supportingDocUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setAnnualReports([]);
        }

        // 10. Custom Tables
        if (Array.isArray(data.customTables) && data.customTables.length > 0) {
          setCustomTables(data.customTables.map((t: any, idx: number) => ({
            id: t.id || t._key || `custom-table-${idx + 1}-${Date.now()}`,
            title: t.title || `Custom Table ${idx + 1}`,
            description: t.description || "",
            columns: Array.isArray(t.columns) && t.columns.length > 0 ? t.columns : ["S. No.", "Particulars / Title", "Details", "Document / Link"],
            rows: Array.isArray(t.rows) ? t.rows.map((r: any, rIdx: number) => {
              if (Array.isArray(r)) return { _key: `row-${rIdx}`, cells: r };
              if (r && Array.isArray(r.cells)) return { _key: r._key || `row-${rIdx}`, cells: r.cells };
              return { _key: `row-${rIdx}`, cells: [] };
            }) : []
          })));
        } else {
          setCustomTables([]);
        }

        // 11. Gallery
        const gal = Array.isArray(data.gallery) ? data.gallery : [];
        setGallery(gal.map((g: any) => ({
          ...g,
          url: g.image?.asset?.url || g.url || "",
          file: null
        })));
      }

      // Automatically fetch Central Faculty records for this department
      try {
        const facRes = await fetch(`/api/department-update/faculty?deptId=${encodeURIComponent(selectedDeptId)}`);
        const facJson = await facRes.json();
        if (facJson.success && Array.isArray(facJson.faculty) && facJson.faculty.length > 0) {
          setFacultyMembers(facJson.faculty);
        } else if (data && Array.isArray(data.facultyMembers) && data.facultyMembers.length > 0) {
          setFacultyMembers(data.facultyMembers);
        }
      } catch (fErr) {
        if (data && Array.isArray(data.facultyMembers)) {
          setFacultyMembers(data.facultyMembers);
        }
      }
    } catch (err) {
      console.error("Failed to load department data:", err);
      setStatusMsg({ type: "error", text: "Failed to fetch existing department details." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "editor") {
      loadDeptData();
    }
  }, [selectedDeptId, step]);

  // Handle Save / Publish
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId);
    const fd = new FormData();
    fd.append("password", password);
    fd.append("selectedDeptId", selectedDeptId);

    // Faculty photos
    facultyMembers.forEach((fac, idx) => {
      if (fac.photoFile) {
        fd.append(`facultyPhoto_${idx}`, fac.photoFile);
      }
    });

    // Gallery images
    gallery.forEach((item, idx) => {
      if (item.file) {
        fd.append(`galleryImage_${idx}`, item.file);
      }
    });

    const galleryPayload = gallery.map(item => ({
      caption: item.caption || "",
      image: item.image || (item.url ? { asset: { url: item.url } } : undefined)
    }));

    const sanitizedCustomTables = customTables.map(t => ({
      _key: t.id || `tbl-${Date.now()}`,
      id: t.id,
      title: t.title,
      description: t.description || "",
      columns: t.columns,
      rows: t.rows.map((r, rIdx) => ({
        _key: r._key || `row-${rIdx}-${Date.now()}`,
        cells: r.cells
      }))
    }));

    const documentData = {
      _id: selectedDeptId,
      _type: "department",
      name: activeDept?.name || "Department",
      slug: { _type: "slug", current: selectedDeptId },
      established,
      tagline,
      description,
      vision,
      mission,
      overviewDocUrl,
      programmes,
      curriculumDocuments,
      facultyMembers,
      passPercentage,
      placements,
      mous,
      activities,
      studentAchievements,
      universityRanks,
      annualReports,
      customTables: sanitizedCustomTables,
      gallery: galleryPayload
    };

    fd.append("departmentData", JSON.stringify(documentData));

    try {
      const res = await fetch("/api/department-update", {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: "Changes published live to website successfully!" });
        const istTime = new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit"
        }) + " IST";
        setLastSaved(istTime);
      } else {
        setStatusMsg({ type: "error", text: data.error || "Save failed." });
      }
    } catch (err: any) {
      console.error("Publish error:", err);
      setStatusMsg({ type: "error", text: "Network error while saving. Please check connection." });
    } finally {
      setSaving(false);
    }
  };

  // ── Dynamic Custom Tables Handlers ───────────────────────────
  const handleAddCustomTable = () => {
    const newId = `custom-tbl-${Date.now()}`;
    const newTable: CustomTable = {
      id: newId,
      title: `Additional Table ${customTables.length + 1}`,
      description: "",
      columns: ["S. No.", "Particulars / Title", "Details / Description", "Document / URL"],
      rows: [
        { _key: `row-${Date.now()}-1`, cells: ["1", "", "", ""] }
      ]
    };
    setCustomTables(prev => [...prev, newTable]);
  };

  const handleDeleteCustomTable = (tableId: string) => {
    if (confirm("Are you sure you want to delete this custom table? All columns and rows in this table will be removed.")) {
      setCustomTables(prev => prev.filter(t => t.id !== tableId));
    }
  };

  const handleUpdateTableMeta = (tableId: string, field: "title" | "description", value: string) => {
    setCustomTables(prev => prev.map(t => t.id === tableId ? { ...t, [field]: value } : t));
  };

  const handleAddColumn = (tableId: string) => {
    setCustomTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      const newColName = `Column ${t.columns.length + 1}`;
      const newCols = [...t.columns, newColName];
      const newRows = t.rows.map(r => ({
        ...r,
        cells: [...r.cells, ""]
      }));
      return { ...t, columns: newCols, rows: newRows };
    }));
  };

  const handleDeleteColumn = (tableId: string, colIndex: number) => {
    setCustomTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      if (t.columns.length <= 1) {
        alert("A table must have at least one column.");
        return t;
      }
      const newCols = t.columns.filter((_, i) => i !== colIndex);
      const newRows = t.rows.map(r => ({
        ...r,
        cells: r.cells.filter((_, i) => i !== colIndex)
      }));
      return { ...t, columns: newCols, rows: newRows };
    }));
  };

  const handleRenameColumn = (tableId: string, colIndex: number, newName: string) => {
    setCustomTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      const newCols = [...t.columns];
      newCols[colIndex] = newName;
      return { ...t, columns: newCols };
    }));
  };

  const handleAddRow = (tableId: string) => {
    setCustomTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      const newCells = t.columns.map((col, idx) => {
        if (idx === 0 && (col.toLowerCase().includes("s. no") || col.toLowerCase().includes("sno"))) {
          return `${t.rows.length + 1}`;
        }
        return "";
      });
      return {
        ...t,
        rows: [...t.rows, { _key: `row-${Date.now()}-${t.rows.length}`, cells: newCells }]
      };
    }));
  };

  const handleDeleteRow = (tableId: string, rowIndex: number) => {
    setCustomTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      const newRows = t.rows.filter((_, i) => i !== rowIndex);
      const renumbered = newRows.map((r, idx) => {
        if (t.columns[0] && (t.columns[0].toLowerCase().includes("s. no") || t.columns[0].toLowerCase().includes("sno"))) {
          const cellsCopy = [...r.cells];
          cellsCopy[0] = `${idx + 1}`;
          return { ...r, cells: cellsCopy };
        }
        return r;
      });
      return { ...t, rows: renumbered };
    }));
  };

  const handleUpdateCell = (tableId: string, rowIndex: number, colIndex: number, value: string) => {
    setCustomTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      const newRows = [...t.rows];
      const targetRow = newRows[rowIndex];
      if (targetRow) {
        const newCells = [...targetRow.cells];
        while (newCells.length <= colIndex) newCells.push("");
        newCells[colIndex] = value;
        newRows[rowIndex] = { ...targetRow, cells: newCells };
      }
      return { ...t, rows: newRows };
    }));
  };

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId);

  // ─────────────────────────────────────────────────────────────
  // 1. LOGIN VIEW
  // ─────────────────────────────────────────────────────────────
  if (step === "login") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 flex flex-col gap-6 animate-fadeIn">
          
          <div className="flex flex-col items-center text-center gap-2">
            <div className="h-16 w-16 bg-[#002147] text-white rounded-2xl flex items-center justify-center shadow-md">
              <Building className="h-8 w-8 text-amber-400" />
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mt-2">
              St. Ann&apos;s College for Women
            </span>
            <h1 className="font-outfit font-black text-2xl text-[#002147] tracking-tight">
              Department Portal Login
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Select your department and enter your password to edit your department profile, programmes, tables, and faculty.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Select Department</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-4 py-2.5 pr-14 text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-[#002147] transition-colors focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {statusMsg.text && statusMsg.type === "error" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusMsg.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#00387a] disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Unlock Department Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <Link 
              href="/academics" 
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#002147] font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Academics
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. EDITOR VIEW (Strictly Department Content)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 animate-fadeIn font-sans pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* STICKY TOP ACTION BAR */}
      <div className="sticky top-2 z-40 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#002147] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            {activeDept?.code || "DEPT"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-outfit font-black text-base sm:text-lg text-[#002147] tracking-tight">
                {activeDept?.name}
              </h1>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Editing Portal
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <Link 
                href={`/academics/departments/${selectedDeptId}`} 
                target="_blank"
                className="text-blue-600 hover:underline inline-flex items-center gap-1 font-bold"
              >
                View Live Page <ExternalLink className="w-3 h-3" />
              </Link>
              {lastSaved && <span>• Last published: {lastSaved}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to log out of this department?")) {
                setStep("login");
                setPassword("");
              }
            }}
            className="px-3.5 py-2 border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-xl text-xs font-bold text-slate-700 transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="Log out of department session"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-red-600" />
            <span>Logout</span>
          </button>
          
          <button
            type="button"
            onClick={loadDeptData}
            disabled={loading || saving}
            className="px-3 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="Reload latest from database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Reload
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-4 py-2 bg-[#002147] hover:bg-[#00387a] disabled:opacity-60 text-white rounded-xl text-xs font-bold transition shadow-xs inline-flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-amber-400" />
                <span>Publish to Website</span>
              </>
            )}
          </button>
        </div>
      </div>

      {statusMsg.text && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between gap-3 shadow-xs ${
          statusMsg.type === "success" 
            ? "bg-emerald-50 border border-emerald-200 text-emerald-900" 
            : "bg-red-50 border border-red-200 text-red-900"
        }`}>
          <div className="flex items-center gap-2">
            {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg({ type: "", text: "" })} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#002147]" />
          <p className="text-sm font-bold text-slate-600">Loading {activeDept?.name} data...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">

          {/* ============================================================== */}
          {/* SECTION 1: CORE PROFILE DETAILS                                */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-outfit font-black text-lg text-[#002147]">1. Department Core Profile</h2>
              <p className="text-xs text-slate-500 font-medium">Basic information displayed at the top of your department page.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Established Year</label>
                <input
                  type="text"
                  placeholder="e.g. 1997-98"
                  value={established}
                  onChange={(e) => setEstablished(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Tagline / Motto</label>
                <input
                  type="text"
                  placeholder="e.g. Commerce Wonder World – Emphasizing Holistic Student Development"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Introduction / Description</label>
              <textarea
                rows={3}
                placeholder="Brief introduction of the department and its mission..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Overview PDF (View Departmental Profile)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="/documents/DefaultFile_1.pdf"
                  value={overviewDocUrl}
                  onChange={(e) => setOverviewDocUrl(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#002147] hover:bg-[#00387a] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs shrink-0 active:scale-95">
                  {uploadingDocKey === "overview" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Upload PDF</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    disabled={uploadingDocKey !== null}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleDocumentUpload(file, (url) => setOverviewDocUrl(url), "overview");
                      }
                    }}
                  />
                </label>
                {overviewDocUrl && (
                  <a
                    href={overviewDocUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#002147] rounded-xl text-xs font-bold transition inline-flex items-center gap-1 shrink-0"
                  >
                    Test <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Vision Statement</label>
                <textarea
                  rows={3}
                  placeholder="Department Vision..."
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Mission Points ({mission.length})</label>
                  <button
                    type="button"
                    onClick={() => setMission([...mission, ""])}
                    className="text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Point
                  </button>
                </div>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {mission.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 w-4 text-center">{idx + 1}.</span>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const next = [...mission];
                          next[idx] = e.target.value;
                          setMission(next);
                        }}
                        placeholder={`Mission point ${idx + 1}`}
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setMission(mission.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 2: PROGRAMMES OFFERED (MATCHING LIVE SITE COLUMNS)      */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">2. Programmes Offered</h2>
                <p className="text-xs text-slate-500 font-medium">Undergraduate and postgraduate degrees conducted by this department.</p>
              </div>
              <button
                type="button"
                onClick={() => setProgrammes([
                  ...programmes,
                  { sNo: programmes.length + 1, name: "", intake: "-", counseling: "-", management: "-" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Programme
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[240px] text-white border-r border-[#003366]">Name of the Programme</th>
                    <th className="py-3 px-4 text-center min-w-[130px] text-amber-300 font-bold border-r border-[#003366]">Sanctioned Intake</th>
                    <th className="py-3 px-4 text-center min-w-[130px] text-blue-100 border-r border-[#003366]">Counseling Seats</th>
                    <th className="py-3 px-4 text-center min-w-[130px] text-blue-100 border-r border-[#003366]">Management Seats</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {programmes.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. B.Com. Honours – General"
                          value={item.name}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].name = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 20"
                          value={item.intake}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].intake = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 14"
                          value={item.counseling}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].counseling = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 6"
                          value={item.management}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].management = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setProgrammes(programmes.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Delete row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {programmes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-slate-400 italic">
                        No programmes added yet. Click &quot;+ Add Programme&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 3: FACULTY DIRECTORY (CENTRAL TWO-WAY SYNC)            */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">3. Faculty Directory</h2>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Live Central Sync
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Faculty loaded from central records. Changes made here automatically sync with both your department page and the central Faculty Directory.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFacultyMembers([
                  ...facultyMembers,
                  {
                    name: "",
                    designation: "Assistant Professor",
                    qualification: "",
                    experience: "",
                    email: "",
                    employeeId: "",
                    staffType: "teaching",
                    imageUrl: ""
                  }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Faculty Member
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-12 text-blue-100 border-r border-[#003366]">#</th>
                    <th className="py-3 px-3 text-center w-20 text-blue-100 border-r border-[#003366]">Photo</th>
                    <th className="py-3 px-4 min-w-[190px] text-white border-r border-[#003366]">Faculty Name</th>
                    <th className="py-3 px-4 min-w-[160px] text-white border-r border-[#003366]">Designation</th>
                    <th className="py-3 px-4 min-w-[150px] text-white border-r border-[#003366]">Qualifications</th>
                    <th className="py-3 px-3 text-center min-w-[100px] text-white border-r border-[#003366]">Experience</th>
                    <th className="py-3 px-4 min-w-[180px] text-white border-r border-[#003366]">Email &amp; Emp ID</th>
                    <th className="py-3 px-3 text-center min-w-[100px] text-white border-r border-[#003366]">Profile</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facultyMembers.map((fac, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      
                      {/* Photo Avatar with 1-click change */}
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="relative group w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 shrink-0 shadow-xs">
                            {fac.imageUrl ? (
                              <img src={fac.imageUrl} alt={fac.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#002147] font-bold text-xs">
                                {fac.name ? fac.name.charAt(0) : "F"}
                              </div>
                            )}
                            <label className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <Camera className="w-4 h-4" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    const next = [...facultyMembers];
                                    next[idx].photoFile = file;
                                    next[idx].imageUrl = previewUrl;
                                    setFacultyMembers(next);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <label className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">
                            Change
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const previewUrl = URL.createObjectURL(file);
                                  const next = [...facultyMembers];
                                  next[idx].photoFile = file;
                                  next[idx].imageUrl = previewUrl;
                                  setFacultyMembers(next);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>

                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Faculty Name"
                          value={fac.name}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].name = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>

                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. Assistant Professor"
                          value={fac.designation}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].designation = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>

                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. M.Com, MBA, Ph.D"
                          value={fac.qualification || ""}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].qualification = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>

                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 12 Years"
                          value={fac.experience || ""}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].experience = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-[#002147] focus:outline-none"
                        />
                      </td>

                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex flex-col gap-1">
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={fac.email || ""}
                            onChange={(e) => {
                              const next = [...facultyMembers];
                              next[idx].email = e.target.value;
                              setFacultyMembers(next);
                            }}
                            className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-0.5 text-[11px] font-medium text-slate-700 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Emp ID (e.g. SACW-003)"
                            value={fac.employeeId || ""}
                            onChange={(e) => {
                              const next = [...facultyMembers];
                              next[idx].employeeId = e.target.value;
                              setFacultyMembers(next);
                            }}
                            className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-0.5 text-[11px] font-medium text-slate-500 focus:outline-none"
                          />
                        </div>
                      </td>

                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <button
                          type="button"
                          onClick={() => setEditingProfileIndex(idx)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition shadow-xs"
                        >
                          Edit Bio
                        </button>
                      </td>

                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setFacultyMembers(facultyMembers.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Delete faculty"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {facultyMembers.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-6 text-center text-xs text-slate-400 italic">
                        No faculty members added. Click &quot;+ Add Faculty Member&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 4: CURRICULUM & LEARNING OUTCOMES (6-ROW DOCUMENT TABLE)*/}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-outfit font-black text-lg text-[#002147]">4. Curriculum &amp; Learning Outcomes Documents</h2>
              <p className="text-xs text-slate-500 font-medium">
                The 6 standard curriculum and syllabus documents displayed in Table 2 of your department page.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[280px] text-white border-r border-[#003366]">Particulars</th>
                    <th className="py-3 px-4 min-w-[320px] text-white border-r border-[#003366]">Document URL / PDF Link</th>
                    <th className="py-3 px-3 text-center w-24 text-white">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {curriculumDocuments.map((doc, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900 border-r border-slate-100">
                        {doc.particular}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={doc.documentUrl}
                            onChange={(e) => {
                              const next = [...curriculumDocuments];
                              next[idx].documentUrl = e.target.value;
                              setCurriculumDocuments(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-[#00387a] text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-xs shrink-0 active:scale-95">
                            {uploadingDocKey === `curriculum_${idx}` ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5 text-amber-400" />
                                <span>Upload PDF</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...curriculumDocuments];
                                      next[idx].documentUrl = url;
                                      setCurriculumDocuments(next);
                                    },
                                    `curriculum_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center">
                        {doc.documentUrl ? (
                          <a
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-xs font-bold transition inline-flex items-center gap-1 shadow-xs"
                          >
                            Test <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 5: OUTGOING BATCH – PASS PERCENTAGE                     */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">5. Outgoing Batch – Student Strength and Pass Percentage</h2>
                <p className="text-xs text-slate-500 font-medium">Year-wise results, number of final year students, and pass percentage.</p>
              </div>
              <button
                type="button"
                onClick={() => setPassPercentage([
                  ...passPercentage,
                  { sNo: passPercentage.length + 1, year: "", finalYearStudents: "", studentsPassed: "", percentage: "" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Academic Year
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[150px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-4 text-center min-w-[180px] text-white border-r border-[#003366]">Number of Final Year Students</th>
                    <th className="py-3 px-4 text-center min-w-[180px] text-white border-r border-[#003366]">Number of Students Passed</th>
                    <th className="py-3 px-4 text-center min-w-[140px] text-amber-300 font-bold border-r border-[#003366]">Pass Percentage</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passPercentage.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 2024–2025"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].year = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 98"
                          value={item.finalYearStudents}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].finalYearStudents = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 94"
                          value={item.studentsPassed}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].studentsPassed = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 95.9%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].percentage = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setPassPercentage(passPercentage.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {passPercentage.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-slate-400 italic">
                        No pass percentage records added yet. Click &quot;+ Add Academic Year&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 6: YEAR-WISE PLACEMENT SUMMARY                         */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">6. Year-wise Placement Summary</h2>
                <p className="text-xs text-slate-500 font-medium">Students placed, highest salary, average salary, and placement percentage.</p>
              </div>
              <button
                type="button"
                onClick={() => setPlacements([
                  ...placements,
                  { sNo: placements.length + 1, year: "", studentsPlaced: "", highestSalary: "", averageSalary: "", percentage: "" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Placement Year
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[130px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-4 text-center min-w-[160px] text-white border-r border-[#003366]">Number of Students Placed</th>
                    <th className="py-3 px-4 text-center min-w-[150px] text-white border-r border-[#003366]">Highest Salary (LPA)</th>
                    <th className="py-3 px-4 text-center min-w-[150px] text-white border-r border-[#003366]">Average Salary (LPA)</th>
                    <th className="py-3 px-4 text-center min-w-[150px] text-amber-300 font-bold border-r border-[#003366]">Placement Percentage</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {placements.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 2024–2025"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].year = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 68"
                          value={item.studentsPlaced}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].studentsPlaced = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 6.5 LPA"
                          value={item.highestSalary}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].highestSalary = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 3.2 LPA"
                          value={item.averageSalary}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].averageSalary = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 80%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].percentage = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setPlacements(placements.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {placements.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-xs text-slate-400 italic">
                        No placement summary added yet. Click &quot;+ Add Placement Year&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 7: MOUS – MEMORANDUM OF UNDERSTANDING                  */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">7. MOUs – Memorandum of Understanding</h2>
                <p className="text-xs text-slate-500 font-medium">Industry and institutional partnerships signed by the department.</p>
              </div>
              <button
                type="button"
                onClick={() => setMous([
                  ...mous,
                  { sNo: mous.length + 1, organization: "", duration: "", documentUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add MoU
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Name of the Organization</th>
                    <th className="py-3 px-4 min-w-[170px] text-white border-r border-[#003366]">Duration / Validity Period</th>
                    <th className="py-3 px-4 min-w-[200px] text-white border-r border-[#003366]">MoU Documents (PDF URL)</th>
                    <th className="py-3 px-4 min-w-[200px] text-white border-r border-[#003366]">MoU Activity Report (PDF URL)</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mous.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. Sri Venkateswara Accounting Solutions"
                          value={item.organization}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].organization = e.target.value;
                            setMous(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 3 Years (2024–2027)"
                          value={item.duration}
                          onChange={(e) => {
                            const next = [...mous];
                            next[idx].duration = e.target.value;
                            setMous(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.documentUrl}
                            onChange={(e) => {
                              const next = [...mous];
                              next[idx].documentUrl = e.target.value;
                              setMous(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...mous];
                                      next[idx].documentUrl = url;
                                      setMous(next);
                                    },
                                    `mou_doc_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.reportUrl}
                            onChange={(e) => {
                              const next = [...mous];
                              next[idx].reportUrl = e.target.value;
                              setMous(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...mous];
                                      next[idx].reportUrl = url;
                                      setMous(next);
                                    },
                                    `mou_rep_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setMous(mous.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {mous.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-slate-400 italic">
                        No MoUs added yet. Click &quot;+ Add MoU&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 8: ACTIVITIES & EVENTS CONDUCTED                       */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">8. Activities, Events, Programmes &amp; Celebrations</h2>
                <p className="text-xs text-slate-500 font-medium">Workshops, fests, guest lectures, and celebrations conducted by this department.</p>
              </div>
              <button
                type="button"
                onClick={() => setActivities([
                  ...activities,
                  { sNo: activities.length + 1, title: "", date: "", participants: "", reportUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Activity
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[260px] text-white border-r border-[#003366]">Title of Activity / Event</th>
                    <th className="py-3 px-3 text-center min-w-[130px] text-white border-r border-[#003366]">Date</th>
                    <th className="py-3 px-3 text-center min-w-[140px] text-white border-r border-[#003366]">No. of Participants</th>
                    <th className="py-3 px-4 min-w-[200px] text-white border-r border-[#003366]">Activity Report (PDF URL)</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activities.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. State-Level Commerce Fest 'VANIJYA'"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].title = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 18-01-2025"
                          value={item.date}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].date = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 240"
                          value={item.participants}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].participants = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.reportUrl}
                            onChange={(e) => {
                              const next = [...activities];
                              next[idx].reportUrl = e.target.value;
                              setActivities(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...activities];
                                      next[idx].reportUrl = url;
                                      setActivities(next);
                                    },
                                    `act_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setActivities(activities.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {activities.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-slate-400 italic">
                        No activities added yet. Click &quot;+ Add Activity&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 9: STUDENT EXTERNAL ACHIEVEMENTS                       */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">9. Student External Achievements, Participation &amp; Representation</h2>
                <p className="text-xs text-slate-500 font-medium">Inter-university, state, and national co-curricular achievements of students.</p>
              </div>
              <button
                type="button"
                onClick={() => setStudentAchievements([
                  ...studentAchievements,
                  { sNo: studentAchievements.length + 1, studentName: "", eventName: "", level: "State / National", prize: "1st Prize", certificateUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Achievement
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[170px] text-white border-r border-[#003366]">Name of the Student</th>
                    <th className="py-3 px-4 min-w-[210px] text-white border-r border-[#003366]">Name of the Activity / Event</th>
                    <th className="py-3 px-3 text-center min-w-[160px] text-white border-r border-[#003366]">Level (State / National)</th>
                    <th className="py-3 px-3 text-center min-w-[140px] text-white border-r border-[#003366]">Prize / Participation</th>
                    <th className="py-3 px-4 min-w-[180px] text-white border-r border-[#003366]">Certificate (PDF URL)</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentAchievements.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. K. Divya Teja"
                          value={item.studentName}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].studentName = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. National Commerce Olympiad"
                          value={item.eventName}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].eventName = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. National"
                          value={item.level}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].level = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 1st Prize"
                          value={item.prize}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].prize = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-bold text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.certificateUrl}
                            onChange={(e) => {
                              const next = [...studentAchievements];
                              next[idx].certificateUrl = e.target.value;
                              setStudentAchievements(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...studentAchievements];
                                      next[idx].certificateUrl = url;
                                      setStudentAchievements(next);
                                    },
                                    `st_ach_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setStudentAchievements(studentAchievements.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {studentAchievements.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-xs text-slate-400 italic">
                        No student achievements added yet. Click &quot;+ Add Achievement&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 10: UNIVERSITY RANKS & ACADEMIC ACHIEVEMENTS           */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">10. University Ranks &amp; Academic Achievements</h2>
                <p className="text-xs text-slate-500 font-medium">Gold medals, university top ranks, and academic laurels bagged by students.</p>
              </div>
              <button
                type="button"
                onClick={() => setUniversityRanks([
                  ...universityRanks,
                  { sNo: universityRanks.length + 1, studentName: "", programme: "", rank: "1st Rank (Gold Medal)", year: "", certificateUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add University Rank
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[170px] text-white border-r border-[#003366]">Name of the Student</th>
                    <th className="py-3 px-4 min-w-[180px] text-white border-r border-[#003366]">Programme</th>
                    <th className="py-3 px-4 text-center min-w-[180px] text-amber-300 font-bold border-r border-[#003366]">University Rank / Gold Medal</th>
                    <th className="py-3 px-3 text-center min-w-[120px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-4 min-w-[180px] text-white border-r border-[#003366]">Certificate (PDF URL)</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {universityRanks.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. P. Lakshmi Prasanna"
                          value={item.studentName}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].studentName = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. B.Com Honours (CA)"
                          value={item.programme}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].programme = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 1st Rank (Gold Medal)"
                          value={item.rank}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].rank = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 2023–2024"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].year = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.certificateUrl}
                            onChange={(e) => {
                              const next = [...universityRanks];
                              next[idx].certificateUrl = e.target.value;
                              setUniversityRanks(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...universityRanks];
                                      next[idx].certificateUrl = url;
                                      setUniversityRanks(next);
                                    },
                                    `rank_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setUniversityRanks(universityRanks.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {universityRanks.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-xs text-slate-400 italic">
                        No university ranks added yet. Click &quot;+ Add University Rank&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 11: YEAR-WISE ANNUAL ACTIVITY REPORTS                  */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">11. Year-wise Annual Activity Reports</h2>
                <p className="text-xs text-slate-500 font-medium">Consolidated annual department activity reports and supporting documents.</p>
              </div>
              <button
                type="button"
                onClick={() => setAnnualReports([
                  ...annualReports,
                  { sNo: annualReports.length + 1, year: "", activitiesCount: "", reportUrl: "/documents/DefaultFile_1.pdf", supportingDocUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Annual Report
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[140px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-4 text-center min-w-[190px] text-white border-r border-[#003366]">Number of Activities Conducted</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Annual Activity Report (PDF URL)</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Supporting Documents (PDF URL)</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {annualReports.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 2024–2025"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...annualReports];
                            next[idx].year = e.target.value;
                            setAnnualReports(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 14"
                          value={item.activitiesCount}
                          onChange={(e) => {
                            const next = [...annualReports];
                            next[idx].activitiesCount = e.target.value;
                            setAnnualReports(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-bold text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.reportUrl}
                            onChange={(e) => {
                              const next = [...annualReports];
                              next[idx].reportUrl = e.target.value;
                              setAnnualReports(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...annualReports];
                                      next[idx].reportUrl = url;
                                      setAnnualReports(next);
                                    },
                                    `ann_rep_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.supportingDocUrl}
                            onChange={(e) => {
                              const next = [...annualReports];
                              next[idx].supportingDocUrl = e.target.value;
                              setAnnualReports(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[11px] font-bold transition cursor-pointer shadow-xs shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingDocKey !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleDocumentUpload(
                                    file,
                                    (url) => {
                                      const next = [...annualReports];
                                      next[idx].supportingDocUrl = url;
                                      setAnnualReports(next);
                                    },
                                    `ann_sup_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setAnnualReports(annualReports.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {annualReports.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-slate-400 italic">
                        No annual reports added yet. Click &quot;+ Add Annual Report&quot; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 12: ADDITIONAL DEPARTMENT TABLES (CUSTOM)              */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">12. Additional Department Tables (Custom)</h2>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                    Dynamic Columns
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Create and publish custom tables with any number of flexible columns, rows, and document links.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddCustomTable}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Table
              </button>
            </div>

            {customTables.length === 0 ? (
              <div className="bg-slate-50/70 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#002147] flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-sm text-slate-800">No Custom Tables Created Yet</h3>
                  <p className="text-xs text-slate-500 max-w-md mt-1">
                    Need to display departmental workshops, certifications, patents, student club initiatives, or guest lectures? Click &quot;Create Custom Table&quot; to build a custom table with any number of columns and rows.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomTable}
                  className="mt-1 px-4 py-2 bg-[#002147] hover:bg-[#00387a] text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" /> Create Custom Table
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {customTables.map((tbl, tIdx) => (
                  <div
                    key={tbl.id || tIdx}
                    className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-xs"
                  >
                    {/* Table Meta Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto shadow-2xs">
                          Table #{tIdx + 1}
                        </span>
                        <div className="flex-1 flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={tbl.title}
                            onChange={(e) => handleUpdateTableMeta(tbl.id, "title", e.target.value)}
                            placeholder="Table Title (e.g. Departmental Workshops / Research Papers)"
                            className="bg-white border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-[#002147] focus:outline-none flex-1 shadow-2xs"
                          />
                          <input
                            type="text"
                            value={tbl.description || ""}
                            onChange={(e) => handleUpdateTableMeta(tbl.id, "description", e.target.value)}
                            placeholder="Optional table subtitle / note"
                            className="bg-white border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-1.5 text-xs font-medium text-slate-600 focus:outline-none flex-1 shadow-2xs"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCustomTable(tbl.id)}
                        className="px-3 py-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start lg:self-auto cursor-pointer shrink-0 shadow-2xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Table
                      </button>
                    </div>

                    {/* Dynamic Column Header Manager */}
                    <div className="bg-white/80 border border-slate-200 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Columns ({tbl.columns.length}):
                          </span>
                          <span className="text-[11px] text-slate-400">
                            (Edit column titles directly or click &quot;+ Add Column&quot;)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddColumn(tbl.id)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition shadow-2xs active:scale-95"
                        >
                          <Plus className="w-3 h-3" /> Add Column
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {tbl.columns.map((col, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 shadow-2xs group hover:border-slate-300 transition-colors"
                          >
                            <span className="text-[10px] font-bold text-slate-400 select-none">
                              #{cIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={col}
                              onChange={(e) => handleRenameColumn(tbl.id, cIdx, e.target.value)}
                              placeholder={`Column ${cIdx + 1}`}
                              className="text-xs font-semibold text-slate-800 bg-transparent outline-none w-28 sm:w-36 focus:text-[#002147]"
                            />
                            {tbl.columns.length > 1 && (
                              <button
                                type="button"
                                title="Delete Column"
                                onClick={() => handleDeleteColumn(tbl.id, cIdx)}
                                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table Data Grid */}
                    <div className="overflow-x-auto border-2 border-slate-200/90 rounded-xl bg-white shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                            {tbl.columns.map((col, cIdx) => (
                              <th
                                key={cIdx}
                                className={`py-2.5 px-3 border-r border-[#003366] text-blue-100 ${
                                  cIdx === 0 && (col.toLowerCase().includes("s. no") || col.toLowerCase().includes("sno"))
                                    ? "w-16 text-center"
                                    : ""
                                }`}
                              >
                                {col}
                              </th>
                            ))}
                            <th className="py-2.5 px-2 text-center w-14 text-blue-100">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {tbl.rows.length === 0 ? (
                            <tr>
                              <td
                                colSpan={tbl.columns.length + 1}
                                className="py-6 text-center text-xs text-slate-400 italic"
                              >
                                No rows in this table yet. Click &quot;+ Add Row&quot; below to add data.
                              </td>
                            </tr>
                          ) : (
                            tbl.rows.map((r, rIdx) => {
                              const isEven = rIdx % 2 === 1;
                              return (
                                <tr
                                  key={r._key || rIdx}
                                  className={`${isEven ? "bg-slate-50/50" : "bg-white"} hover:bg-blue-50/30 transition-colors`}
                                >
                                  {tbl.columns.map((col, cIdx) => {
                                    const cellVal = r.cells[cIdx] || "";
                                    const trimmed = cellVal.trim();
                                    const isDocOrUrl =
                                      trimmed.startsWith("http://") ||
                                      trimmed.startsWith("https://") ||
                                      trimmed.startsWith("/documents/") ||
                                      trimmed.startsWith("/uploads/") ||
                                      trimmed.endsWith(".pdf");
                                    const isSno =
                                      cIdx === 0 &&
                                      (col.toLowerCase().includes("s. no") || col.toLowerCase().includes("sno"));
                                    const uploadKey = `custom_${tbl.id}_${rIdx}_${cIdx}`;

                                    return (
                                      <td
                                        key={cIdx}
                                        className={`py-2 px-2.5 border-r border-slate-100 ${
                                          isSno ? "w-16" : ""
                                        }`}
                                      >
                                        <div className="relative flex items-center gap-1">
                                          <input
                                            type="text"
                                            value={cellVal}
                                            onChange={(e) =>
                                              handleUpdateCell(tbl.id, rIdx, cIdx, e.target.value)
                                            }
                                            placeholder={isSno ? `${rIdx + 1}` : `Enter ${col}`}
                                            className={`w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none transition-all shadow-2xs ${
                                              isSno ? "text-center font-bold" : "pr-14"
                                            }`}
                                          />
                                          {!isSno && (
                                            <div className="absolute right-1 flex items-center gap-0.5">
                                              {isDocOrUrl && (
                                                <a
                                                  href={trimmed}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  title="Test Document / URL Link"
                                                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                  <ExternalLink className="w-3 h-3" />
                                                </a>
                                              )}
                                              <label
                                                title="Upload PDF to this cell"
                                                className={`p-1 rounded cursor-pointer transition ${
                                                  uploadingDocKey === uploadKey
                                                    ? "bg-amber-100 text-amber-700 animate-pulse"
                                                    : "text-slate-400 hover:text-[#002147] hover:bg-slate-100"
                                                }`}
                                              >
                                                <Upload className="w-3 h-3" />
                                                <input
                                                  type="file"
                                                  accept=".pdf,application/pdf,.doc,.docx"
                                                  className="hidden"
                                                  disabled={uploadingDocKey !== null}
                                                  onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                      handleDocumentUpload(
                                                        file,
                                                        (url) => handleUpdateCell(tbl.id, rIdx, cIdx, url),
                                                        uploadKey
                                                      );
                                                    }
                                                  }}
                                                />
                                              </label>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    );
                                  })}
                                  <td className="py-2 px-2 text-center w-14">
                                    <button
                                      type="button"
                                      title="Delete Row"
                                      onClick={() => handleDeleteRow(tbl.id, rIdx)}
                                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Bottom Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleAddRow(tbl.id)}
                        className="px-3 py-1.5 bg-[#002147] hover:bg-[#00387a] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 self-start cursor-pointer shadow-xs active:scale-95 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Row
                      </button>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Click the <Upload className="inline w-3 h-3 text-slate-500 mx-0.5" /> icon inside any cell to upload a PDF directly.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* SECTION 13: PHOTO & VIDEO GALLERY                             */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">13. Department Photo &amp; Video Gallery</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Upload photos of department laboratories, events, and workshops. If no photos are uploaded, the website automatically displays the campus landmark photo as fallback.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGallery([
                  ...gallery,
                  { url: "", caption: "", file: null }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Gallery Item
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col gap-2.5 relative group">
                  <div className="h-36 rounded-xl bg-slate-200 overflow-hidden relative border border-slate-200 flex items-center justify-center">
                    {item.url ? (
                      <img src={item.url} alt={item.caption || "Gallery"} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-slate-400 flex flex-col items-center gap-1">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-[10px] font-bold">No image chosen</span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold">
                      <Camera className="w-5 h-5" />
                      <span>{item.url ? "Change Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            const next = [...gallery];
                            next[idx].file = file;
                            next[idx].url = previewUrl;
                            setGallery(next);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Caption / Event Title"
                    value={item.caption}
                    onChange={(e) => {
                      const next = [...gallery];
                      next[idx].caption = e.target.value;
                      setGallery(next);
                    }}
                    className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                  />

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="text-blue-600 hover:underline font-bold cursor-pointer text-[11px]">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            const next = [...gallery];
                            next[idx].file = file;
                            next[idx].url = previewUrl;
                            setGallery(next);
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-red-600 inline-flex items-center gap-1 font-bold text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                  No department photos uploaded yet. When empty, the college campus photo will automatically display as a fallback.
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM SAVE BUTTON BAR */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-outfit font-black text-lg text-white">Ready to update {activeDept?.name}?</h3>
              <p className="text-xs text-slate-300 font-medium">Clicking publish updates your live department page and synchronizes faculty central data.</p>
            </div>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#002147] rounded-xl text-sm font-black transition shadow-lg inline-flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Publish All Changes Live</span>
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* FULL PROFILE EDIT MODAL */}
      {editingProfileIndex !== null && facultyMembers[editingProfileIndex] && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-outfit font-black text-lg text-[#002147]">
                  Edit Faculty Profile: {facultyMembers[editingProfileIndex].name || "New Faculty"}
                </h3>
                <p className="text-xs text-slate-500">Update detailed academic biography and credentials.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingProfileIndex(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Specialization / Research Area</label>
                <input
                  type="text"
                  placeholder="e.g. Accounting, Finance &amp; Business Analytics"
                  value={facultyMembers[editingProfileIndex].specialization || ""}
                  onChange={(e) => {
                    const next = [...facultyMembers];
                    next[editingProfileIndex].specialization = e.target.value;
                    setFacultyMembers(next);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#002147]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Date of Joining</label>
                  <input
                    type="text"
                    placeholder="e.g. 16 June 1999"
                    value={facultyMembers[editingProfileIndex].dateOfJoining || ""}
                    onChange={(e) => {
                      const next = [...facultyMembers];
                      next[editingProfileIndex].dateOfJoining = e.target.value;
                      setFacultyMembers(next);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#002147]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Staff Type</label>
                  <select
                    value={facultyMembers[editingProfileIndex].staffType || "teaching"}
                    onChange={(e) => {
                      const next = [...facultyMembers];
                      next[editingProfileIndex].staffType = e.target.value;
                      setFacultyMembers(next);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#002147]"
                  >
                    <option value="teaching">Teaching Staff</option>
                    <option value="non-teaching">Non-Teaching Staff</option>
                    <option value="visiting">Visiting Faculty</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Short Bio / Overview</label>
                <textarea
                  rows={4}
                  placeholder="Brief biography of academic experience, awards, and contributions..."
                  value={facultyMembers[editingProfileIndex].shortBio || ""}
                  onChange={(e) => {
                    const next = [...facultyMembers];
                    next[editingProfileIndex].shortBio = e.target.value;
                    setFacultyMembers(next);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#002147]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Profile / CV PDF URL</label>
                <input
                  type="text"
                  placeholder="/documents/DefaultFile_1.pdf"
                  value={facultyMembers[editingProfileIndex].profilePdfUrl || ""}
                  onChange={(e) => {
                    const next = [...facultyMembers];
                    next[editingProfileIndex].profilePdfUrl = e.target.value;
                    setFacultyMembers(next);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#002147]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingProfileIndex(null)}
                className="px-4 py-2 bg-[#002147] text-white rounded-xl text-xs font-bold hover:bg-[#00387a] transition shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
