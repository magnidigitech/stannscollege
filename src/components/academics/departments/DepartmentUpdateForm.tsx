"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Building, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, 
  Upload, Eye, ExternalLink, Save, ArrowLeft, RefreshCw, Lock, 
  Users, BookOpen, Award, FileText, Handshake, Calendar, Image as ImageIcon,
  ChevronRight, Camera, X, Sparkles, HelpCircle, LogOut, GraduationCap, Briefcase, Trophy,
  Newspaper, Bell, CalendarDays
} from "lucide-react";
import { getDepartment } from "@/lib/sanity";
import QuickDrawersManager from "@/components/admin/QuickDrawersManager";
import EventsManager from "@/components/admin/EventsManager";
import NoticesManager from "@/components/admin/NoticesManager";

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
  subtitle?: string;
  category?: "department" | "committee";
}

const DEPARTMENTS: DepartmentConfig[] = [
  { id: "department-of-commerce", name: "1. Department of Commerce", code: "COMM", category: "department" },
  { id: "department-of-bca", name: "2. BCA – Bachelor of Computer Applications", subtitle: "Under the Department of Computer Science & Applications", code: "BCA", category: "department" },
  { id: "department-of-computer-science", name: "3. Computer Science", subtitle: "Under the Department of Computer Science & Applications", code: "CS", category: "department" },
  { id: "department-of-artificial-intelligence", name: "4. Artificial Intelligence (AI)", subtitle: "Under the Department of Computer Science & Applications", code: "AI", category: "department" },
  { id: "department-of-mathematics", name: "5. Department of Mathematics", code: "MATH", category: "department" },
  { id: "department-of-physics", name: "6. Department of Physics", code: "PHYS", category: "department" },
  { id: "department-of-statistics", name: "7. Department of Statistics", code: "STAT", category: "department" },
  { id: "department-of-biotechnology", name: "8. Department of Biotechnology", code: "BIOT", category: "department" },
  { id: "department-of-microbiology", name: "9. Department of Microbiology", code: "MICR", category: "department" },
  { id: "department-of-botany", name: "10. Department of Botany", code: "BOTA", category: "department" },
  { id: "department-of-chemistry", name: "11. Department of Chemistry", code: "CHEM", category: "department" },
  { id: "department-of-mca", name: "12. Department of MCA (Master of Computer Applications)", code: "MCA", category: "department" },
  { id: "department-of-mba", name: "13. Department of MBA (Master of Business Administration)", code: "MBA", category: "department" },
  { id: "department-of-english", name: "14. Department of English", subtitle: "Under the Department of Oriental Languages", code: "ENGL", category: "department" },
  { id: "department-of-telugu-wing", name: "15. Telugu Wing", subtitle: "Under the Department of Oriental Languages", code: "TELU", category: "department" },
  { id: "department-of-sanskrit-hindi-wing", name: "16. Sanskrit & Hindi Wing", subtitle: "Under the Department of Oriental Languages", code: "SANS", category: "department" }
];

const INSTITUTIONAL_COMMITTEES: DepartmentConfig[] = [
  {
    id: "publications",
    name: "College Publications & Media Cell",
    subtitle: "Newsletters (The Chronicle), Magazines (Annite), Student Handbook & Brochures",
    code: "PUB",
    category: "committee"
  },
  {
    id: "events",
    name: "Events & Activities Committee",
    subtitle: "Upcoming & Past Events, Celebrations, Photo Gallery & Reports",
    code: "EVT",
    category: "committee"
  },
  {
    id: "notices",
    name: "Notice Board & Circulars Hub",
    subtitle: "Official Announcements, Examination Circulars & Timetable Releases",
    code: "NOTC",
    category: "committee"
  }
];

const ALL_PORTAL_ENTITIES: DepartmentConfig[] = [...DEPARTMENTS, ...INSTITUTIONAL_COMMITTEES];

export function dedupeFaculty<T extends { employeeId?: string; name: string; imageUrl?: string; photoFile?: any; [key: string]: any }>(list: T[]): T[] {
  if (!Array.isArray(list)) return [];
  const map = new Map<string, T>();

  const getCleanName = (rawName: string) =>
    (rawName || "")
      .toLowerCase()
      .replace(/^(dr|mr|mrs|ms|miss|prof|sr)\.?\s*/gi, "")
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, " ")
      .trim();

  for (const item of list) {
    if (!item || !item.name?.trim()) continue;
    const rawEmp = (item.employeeId || "").trim().toUpperCase();
    const cleanName = getCleanName(item.name);

    let existingKey: string | null = null;
    if (rawEmp && map.has(`EMP:${rawEmp}`)) {
      existingKey = `EMP:${rawEmp}`;
    } else if (cleanName && map.has(`NAME:${cleanName}`)) {
      existingKey = `NAME:${cleanName}`;
    } else {
      for (const [k, v] of map.entries()) {
        const vEmp = (v.employeeId || "").trim().toUpperCase();
        const vCleanName = getCleanName(v.name);
        if ((rawEmp && vEmp && rawEmp === vEmp) || (cleanName && vCleanName && cleanName === vCleanName)) {
          existingKey = k;
          break;
        }
      }
    }

    if (existingKey) {
      const existing = map.get(existingKey)!;
      const hasImage = Boolean(item.imageUrl || item.photoFile);

      const merged: T = {
        ...existing,
        ...item,
        imageUrl: (hasImage ? item.imageUrl : existing.imageUrl) || "",
        photoFile: item.photoFile || existing.photoFile || null,
        photoAssetId: (item as any).photoAssetId || (existing as any).photoAssetId,
        name: (item.name && item.name.includes(" ") && !existing.name?.includes(" "))
          ? item.name
          : (existing.name || item.name),
        designation: (item.designation && item.designation !== "Lecturer")
          ? item.designation
          : (existing.designation || item.designation || "Lecturer"),
        employeeId: rawEmp || existing.employeeId || "",
      };
      map.set(existingKey, merged);
    } else {
      const key = rawEmp ? `EMP:${rawEmp}` : `NAME:${cleanName}`;
      map.set(key, { ...item, employeeId: rawEmp || item.employeeId || "" });
    }
  }

  return Array.from(map.values());
}

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

  // URL query parameter support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const targetFromUrl = params.get("dept") || params.get("role") || params.get("section");
      if (targetFromUrl) {
        const found = ALL_PORTAL_ENTITIES.find(
          (d) => d.id === targetFromUrl || d.code.toLowerCase() === targetFromUrl.toLowerCase()
        );
        if (found) {
          setSelectedDeptId(found.id);
        }
      }
    }
  }, []);

  // 1. Core Profile Details
  const [established, setEstablished] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState<string[]>([]);
  const [overviewDocUrl, setOverviewDocUrl] = useState("/documents/DefaultFile_1.pdf");

  // 2. Programmes Offered (Section 1 in Ref Doc)
  const [programmes, setProgrammes] = useState<Array<{ 
    sNo?: number; 
    name: string; 
    type?: string;
    intake: string | number; 
    counseling: string | number; 
    management: string | number;
  }>>([]);

  // 3. Faculty Directory (Section 2 in Ref Doc)
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

  // 4. Curriculum & Learning Outcomes (Section 3 in Ref Doc)
  const [curriculumDocuments, setCurriculumDocuments] = useState<Array<{ 
    sNo: number; 
    particular: string; 
    documentUrl: string;
  }>>([]);

  // 5. Outgoing Batch – Student Strength and Pass Percentage (Section 4 in Ref Doc - 8 cols)
  const [passPercentage, setPassPercentage] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    intake: string;
    admitted: string;
    discontinued: string;
    appeared: string;
    passed: string;
    percentage: string;
  }>>([]);

  // 6. University Ranks & Academic Achievements (Section 5 in Ref Doc - 9 cols)
  const [universityRanks, setUniversityRanks] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    studentName: string; 
    programme: string; 
    regNo: string;
    achievement: string;
    rank: string; 
    university: string;
    certificateUrl: string;
  }>>([]);

  // 7. Year-wise Placement Summary (Section 6 in Ref Doc - 6 cols)
  const [placements, setPlacements] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    finalStudents: string;
    studentsPlaced: string; 
    percentage: string;
    docUrl: string;
  }>>([]);

  // 8. Student Progression to Higher Education (Section 7 in Ref Doc - 7 cols)
  const [higherEducation, setHigherEducation] = useState<Array<{
    sNo?: number;
    year: string;
    totalOutgoing: string;
    progressed: string;
    percentage: string;
    listDocUrl: string;
    proofDocUrl: string;
  }>>([]);

  // 9. Students Qualifying in Competitive Examinations (Section 8 in Ref Doc - 6 cols)
  const [competitiveExams, setCompetitiveExams] = useState<Array<{
    sNo?: number;
    year: string;
    qualified: string;
    listDocUrl: string;
    certDocUrl: string;
    proofDocUrl: string;
  }>>([]);

  // 10. MOUs – Memorandum of Understanding (Section 9 in Ref Doc - 5 cols)
  const [mous, setMous] = useState<Array<{ 
    sNo?: number; 
    organization: string; 
    duration: string; 
    documentUrl: string; 
    reportUrl: string;
  }>>([]);

  // 11. Departmental Best Practices (Section 10 in Ref Doc - 7 cols)
  const [bestPractices, setBestPractices] = useState<Array<{
    sNo?: number;
    year: string;
    title: string;
    objectives: string;
    outcomes: string;
    reportUrl: string;
    docUrl: string;
  }>>([]);

  // 12. Departmental Add-on / Certificate Courses (Section 11 in Ref Doc - 9 cols)
  const [certificateCourses, setCertificateCourses] = useState<Array<{
    sNo?: number;
    year: string;
    name: string;
    type: string;
    code: string;
    duration: string;
    enrolled: string;
    certified: string;
    reportUrl: string;
  }>>([]);

  // 13. Activities, Events, Programmes & Celebrations (Section 12 in Ref Doc - 6 cols)
  const [activities, setActivities] = useState<Array<{ 
    sNo?: number; 
    date: string; 
    title: string; 
    category: string;
    participants: string; 
    reportUrl: string;
  }>>([]);

  // 14. Student External Achievements, Participation & Representation (Section 13 in Ref Doc - 10 cols)
  const [studentAchievements, setStudentAchievements] = useState<Array<{ 
    sNo?: number; 
    date: string;
    studentName: string; 
    programme: string;
    achievement: string;
    eventName: string; 
    level: string; 
    org: string;
    award: string;
    certificateUrl: string;
  }>>([]);

  // 15. Year-wise Annual Activity Reports (Section 14 in Ref Doc - 5 cols)
  const [annualReports, setAnnualReports] = useState<Array<{ 
    sNo?: number; 
    year: string; 
    activitiesCount: string; 
    reportUrl: string; 
    supportingDocUrl: string;
  }>>([]);

  // 16. Dynamic Custom Tables
  const [customTables, setCustomTables] = useState<CustomTable[]>([]);

  // 17. Department Photo & Video Gallery (Section 15 in Ref Doc)
  const [gallery, setGallery] = useState<Array<{ 
    image?: any; 
    file?: File | null; 
    url?: string;
    year?: string;
    title?: string;
    date?: string;
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
    if (["publications", "events", "notices"].includes(selectedDeptId)) {
      return;
    }
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
            type: p.type || "UG Honours",
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
            { sNo: 2, particular: "Programme Outcomes (POs)", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, particular: "Programme Specific Outcomes (PSOs)", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 4, particular: "Course Structure & Syllabus", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 5, particular: "Course Outcomes (COs)", documentUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 6, particular: "CO–PO–PSO Mapping", documentUrl: "/documents/DefaultFile_1.pdf" },
          ]);
        }

        // 3. Results (Pass %) - 8 cols
        if (Array.isArray(data.passPercentage) && data.passPercentage.length > 0) {
          setPassPercentage(data.passPercentage.map((p: any, i: number) => ({
            sNo: i + 1,
            year: p.year || "",
            intake: p.intake ?? p.sanctionedIntake ?? "60",
            admitted: p.admitted ?? p.admittedStudents ?? "-",
            discontinued: p.discontinued ?? "-",
            appeared: p.appeared ?? p.finalYearStudents ?? "-",
            passed: p.passed ?? p.studentsPassed ?? "-",
            percentage: p.percentage ?? p.passPct ?? ""
          })));
        } else {
          setPassPercentage([
            { sNo: 1, year: "2025–2026", intake: "60", admitted: "58", discontinued: "1", appeared: "57", passed: "56", percentage: "98.24%" },
            { sNo: 2, year: "2024–2025", intake: "60", admitted: "60", discontinued: "2", appeared: "58", passed: "57", percentage: "98.27%" },
            { sNo: 3, year: "2023–2024", intake: "60", admitted: "59", discontinued: "1", appeared: "58", passed: "58", percentage: "100.00%" }
          ]);
        }

        // 4. University Ranks - 9 cols
        const ranks = data.universityRanks || data.academicAchievements || [];
        if (Array.isArray(ranks) && ranks.length > 0) {
          setUniversityRanks(ranks.map((r: any, i: number) => ({
            sNo: i + 1,
            year: r.year || "",
            studentName: r.studentName || r.name || "",
            programme: r.programme || r.prog || "",
            regNo: r.regNo || r.registerNumber || "—",
            achievement: r.achievement || r.award || "University Gold Medal",
            rank: r.rank || r.position || "1st Rank",
            university: r.university || r.uni || "Acharya Nagarjuna University",
            certificateUrl: r.certificateUrl || r.docUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setUniversityRanks([
            { sNo: 1, year: "2024–2025", studentName: "K. Sowmya", programme: "B.Sc. Honours", regNo: "Y21MATH012", achievement: "University Gold Medal", rank: "1st Rank", university: "Acharya Nagarjuna University", certificateUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, year: "2023–2024", studentName: "P. Bhavani", programme: "B.Sc. Honours", regNo: "Y20MATH045", achievement: "University Prathibha Award", rank: "2nd Rank", university: "Acharya Nagarjuna University", certificateUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 5. Placements - 6 cols
        if (Array.isArray(data.placements) && data.placements.length > 0) {
          setPlacements(data.placements.map((p: any, i: number) => ({
            sNo: i + 1,
            year: p.year || "",
            finalStudents: p.finalStudents ?? p.finalYearStudents ?? "58",
            studentsPlaced: p.studentsPlaced ?? p.placed ?? "49",
            percentage: p.percentage ?? p.pct ?? "84.48%",
            docUrl: p.docUrl || p.supportingDocUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setPlacements([
            { sNo: 1, year: "2025–2026", finalStudents: "58", studentsPlaced: "49", percentage: "84.48%", docUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, year: "2024–2025", finalStudents: "60", studentsPlaced: "51", percentage: "85.00%", docUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, year: "2023–2024", finalStudents: "57", studentsPlaced: "48", percentage: "84.21%", docUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 6. Higher Education - 7 cols
        if (Array.isArray(data.higherEducation) && data.higherEducation.length > 0) {
          setHigherEducation(data.higherEducation.map((h: any, i: number) => ({
            sNo: i + 1,
            year: h.year || "",
            totalOutgoing: h.totalOutgoing || "58",
            progressed: h.progressed || "18",
            percentage: h.percentage || h.pct || "31.03%",
            listDocUrl: h.listDocUrl || h.listDoc || "/documents/DefaultFile_1.pdf",
            proofDocUrl: h.proofDocUrl || h.proofDoc || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setHigherEducation([
            { sNo: 1, year: "2025–2026", totalOutgoing: "58", progressed: "18", percentage: "31.03%", listDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, year: "2024–2025", totalOutgoing: "60", progressed: "20", percentage: "33.33%", listDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, year: "2023–2024", totalOutgoing: "57", progressed: "17", percentage: "29.82%", listDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 4, year: "2022–2023", totalOutgoing: "55", progressed: "16", percentage: "29.09%", listDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 5, year: "2021–2022", totalOutgoing: "54", progressed: "15", percentage: "27.78%", listDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 7. Competitive Exams - 6 cols
        if (Array.isArray(data.competitiveExams) && data.competitiveExams.length > 0) {
          setCompetitiveExams(data.competitiveExams.map((c: any, i: number) => ({
            sNo: i + 1,
            year: c.year || "",
            qualified: c.qualified || "14",
            listDocUrl: c.listDocUrl || c.listDoc || "/documents/DefaultFile_1.pdf",
            certDocUrl: c.certDocUrl || c.certDoc || "/documents/DefaultFile_1.pdf",
            proofDocUrl: c.proofDocUrl || c.proofDoc || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setCompetitiveExams([
            { sNo: 1, year: "2025–2026", qualified: "14", listDocUrl: "/documents/DefaultFile_1.pdf", certDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, year: "2024–2025", qualified: "16", listDocUrl: "/documents/DefaultFile_1.pdf", certDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, year: "2023–2024", qualified: "12", listDocUrl: "/documents/DefaultFile_1.pdf", certDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 8. MOUs - 5 cols
        if (Array.isArray(data.mous) && data.mous.length > 0) {
          setMous(data.mous.map((m: any, i: number) => ({
            sNo: i + 1,
            organization: m.organization || m.title || "",
            duration: m.duration || "",
            documentUrl: m.documentUrl || "/documents/DefaultFile_1.pdf",
            reportUrl: m.reportUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setMous([
            { sNo: 1, organization: "National Mathematics Research Academy", duration: "3 Years (2024–2027)", documentUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, organization: "Centre for Data Science & Analytics Training", duration: "3 Years (2023–2026)", documentUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, organization: "APSSDC – Andhra Pradesh Skill Development Corporation", duration: "5 Years (2022–2027)", documentUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 9. Best Practices - 7 cols
        if (Array.isArray(data.bestPractices) && data.bestPractices.length > 0) {
          setBestPractices(data.bestPractices.map((b: any, i: number) => ({
            sNo: i + 1,
            year: b.year || "",
            title: b.title || "",
            objectives: b.objectives || "",
            outcomes: b.outcomes || "",
            reportUrl: b.reportUrl || "/documents/DefaultFile_1.pdf",
            docUrl: b.docUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setBestPractices([
            { 
              sNo: 1, 
              year: "2025–2026", 
              title: "Peer-Led Remedial Mathematics Clinics", 
              objectives: "To strengthen analytical foundations and build computational confidence among non-mathematics and slow learners.",
              outcomes: "Measurable 22% increase in semester pass percentages and elimination of mathematics anxiety.",
              reportUrl: "/documents/DefaultFile_1.pdf", 
              docUrl: "/documents/DefaultFile_1.pdf" 
            },
            { 
              sNo: 2, 
              year: "2024–2025", 
              title: "Mathematical Coding with Python & LaTeX", 
              objectives: "To bridge abstract mathematical formulas with applied algorithmic computing and modern scientific typesetting.",
              outcomes: "100% of final-year students demonstrated computational project work and LaTeX thesis formulation.",
              reportUrl: "/documents/DefaultFile_1.pdf", 
              docUrl: "/documents/DefaultFile_1.pdf" 
            }
          ]);
        }

        // 10. Certificate Courses - 9 cols
        if (Array.isArray(data.certificateCourses) && data.certificateCourses.length > 0) {
          setCertificateCourses(data.certificateCourses.map((c: any, i: number) => ({
            sNo: i + 1,
            year: c.year || "",
            name: c.name || "",
            type: c.type || "Certificate Course",
            code: c.code || "",
            duration: c.duration || "",
            enrolled: c.enrolled || "",
            certified: c.certified || "",
            reportUrl: c.reportUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setCertificateCourses([
            { sNo: 1, year: "2025–2026", name: "Certificate Course in Vedic Mathematics & Quick Calculation", type: "Certificate Course", code: "MAT-CC-01", duration: "36 Hours", enrolled: "45", certified: "45", reportUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, year: "2024–2025", name: "Value-Added Course in Statistical Modeling using R", type: "Value-Added Course", code: "MAT-VAC-02", duration: "40 Hours", enrolled: "42", certified: "42", reportUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 11. Activities - 6 cols
        const acts = data.activities || data.activitiesList || [];
        if (Array.isArray(acts) && acts.length > 0) {
          setActivities(acts.map((a: any, i: number) => ({
            sNo: i + 1,
            date: a.date || "",
            title: a.title || a.name || a.label || "",
            category: a.category || "Academic Celebration",
            participants: a.participants || "",
            reportUrl: a.reportUrl || a.documentUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setActivities([
            { sNo: 1, date: "22-12-2025", title: "National Mathematics Day Celebration & Srinivasa Ramanujan Memorial Lecture", category: "Academic Celebration", participants: "185", reportUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, date: "15-09-2025", title: "State-Level Inter-Collegiate Math Olympiad & Quantitative Quiz", category: "Competition", participants: "120", reportUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, date: "28-02-2025", title: "National Science Day – Workshop on Mathematical Modeling in Natural Sciences", category: "Workshop", participants: "140", reportUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 12. Student External Achievements - 10 cols
        if (Array.isArray(data.studentAchievements) && data.studentAchievements.length > 0) {
          setStudentAchievements(data.studentAchievements.map((s: any, i: number) => ({
            sNo: i + 1,
            date: s.date || "",
            studentName: s.studentName || s.name || "",
            programme: s.programme || s.cls || "III B.Sc.",
            achievement: s.achievement || s.prize || "First Prize & Cash Award",
            eventName: s.eventName || s.event || "",
            level: s.level || "State Level",
            org: s.org || s.organizingInstitution || "",
            award: s.award || s.prize || "Gold Medal & Cash Prize",
            certificateUrl: s.certificateUrl || s.docUrl || "/documents/DefaultFile_1.pdf"
          })));
        } else {
          setStudentAchievements([
            { sNo: 1, date: "18-01-2026", studentName: "M. Kavitha", programme: "III B.Sc.", achievement: "First Prize & Cash Award", eventName: "State Inter-Collegiate Math Quiz", level: "State Level", org: "Andhra Loyola College, Vijayawada", award: "Gold Medal & ₹5,000 Cash Prize", certificateUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, date: "12-11-2025", studentName: "R. Sai Tejaswi", programme: "II B.Sc.", achievement: "Second Prize in Paper Presentation", eventName: "National Seminar on Modern Algebra", level: "National Level", org: "PB Siddhartha College, Vijayawada", award: "Certificate of Merit & Trophy", certificateUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 13. Annual Reports - 5 cols
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
          setAnnualReports([
            { sNo: 1, year: "2025–2026", activitiesCount: "14", reportUrl: "/documents/DefaultFile_1.pdf", supportingDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 2, year: "2024–2025", activitiesCount: "16", reportUrl: "/documents/DefaultFile_1.pdf", supportingDocUrl: "/documents/DefaultFile_1.pdf" },
            { sNo: 3, year: "2023–2024", activitiesCount: "15", reportUrl: "/documents/DefaultFile_1.pdf", supportingDocUrl: "/documents/DefaultFile_1.pdf" }
          ]);
        }

        // 14. Custom Tables
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

        // 15. Gallery
        const gal = Array.isArray(data.gallery) ? data.gallery : [];
        setGallery(gal.map((g: any) => ({
          ...g,
          url: g.image?.asset?.url || g.url || "",
          year: g.year || "2025–2026",
          title: g.title || "",
          date: g.date || "",
          file: null
        })));
      }

      // Automatically fetch Central Faculty records for this department with deduplication
      try {
        const facRes = await fetch(`/api/department-update/faculty?deptId=${encodeURIComponent(selectedDeptId)}`);
        const facJson = await facRes.json();
        if (facJson.success && Array.isArray(facJson.faculty) && facJson.faculty.length > 0) {
          setFacultyMembers(dedupeFaculty(facJson.faculty));
        } else if (data && Array.isArray(data.facultyMembers) && data.facultyMembers.length > 0) {
          setFacultyMembers(dedupeFaculty(data.facultyMembers));
        }
      } catch (fErr) {
        if (data && Array.isArray(data.facultyMembers)) {
          setFacultyMembers(dedupeFaculty(data.facultyMembers));
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

    const fd = new FormData();
    fd.append("password", password);
    fd.append("selectedDeptId", selectedDeptId);

    const dedupedMembers = dedupeFaculty(facultyMembers);

    // Faculty photos
    dedupedMembers.forEach((fac, idx) => {
      if (fac.photoFile) {
        fd.append(`facultyPhoto_${idx}`, fac.photoFile);
      }
    });

    // Gallery images
    gallery.forEach((g, idx) => {
      if (g.file) {
        fd.append(`galleryImage_${idx}`, g.file);
      }
    });

    const galleryPayload = gallery.map(g => ({
      caption: g.caption || "",
      year: g.year || "2025–2026",
      title: g.title || "",
      date: g.date || "",
      url: g.url || ""
    }));

    const sanitizedCustomTables = customTables.map(t => ({
      _key: t.id,
      id: t.id,
      title: t.title || "Custom Table",
      description: t.description || "",
      columns: t.columns || [],
      rows: (t.rows || []).map(r => ({
        _key: r._key || `row-${Math.random()}`,
        cells: r.cells || []
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
      facultyMembers: dedupedMembers,
      passPercentage,
      universityRanks,
      placements,
      higherEducation,
      competitiveExams,
      mous,
      bestPractices,
      certificateCourses,
      activities,
      studentAchievements,
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
      console.error("Save error:", err);
      setStatusMsg({ type: "error", text: "Connection error while saving." });
    } finally {
      setSaving(false);
    }
  };

  // Custom Table Helpers
  const handleAddCustomTable = () => {
    const newId = `custom-table-${Date.now()}`;
    const newTable: CustomTable = {
      id: newId,
      title: `Additional Table ${customTables.length + 1}`,
      description: "Custom tabular evidence for NAAC / SSR compliance.",
      columns: ["S. No.", "Academic Year", "Particulars / Event", "Details / Metric", "Document (PDF Link)"],
      rows: [
        { _key: `row-1`, cells: ["1", "2025–2026", "Sample Particular", "Completed", "/documents/DefaultFile_1.pdf"] }
      ]
    };
    setCustomTables([...customTables, newTable]);
  };

  const handleDeleteCustomTable = (tableId: string) => {
    if (window.confirm("Are you sure you want to delete this custom table?")) {
      setCustomTables(customTables.filter(t => t.id !== tableId));
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

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out of this portal session?")) {
      try {
        await fetch("/api/department-update/auth", { method: "DELETE" });
      } catch (err) {
        console.error("Logout error:", err);
      }
      setStep("login");
      setPassword("");
    }
  };

  const activeDept = ALL_PORTAL_ENTITIES.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const isCommittee = ["publications", "events", "notices"].includes(selectedDeptId);

  // ─────────────────────────────────────────────────────────────
  // 1. LOGIN VIEW
  // ─────────────────────────────────────────────────────────────
  if (step === "login") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 flex flex-col gap-6 animate-fadeIn">
          
          <div className="flex flex-col items-center text-center gap-2">
            <div className="h-16 w-16 bg-[#002147] text-white rounded-2xl flex items-center justify-center shadow-md">
              {isCommittee ? (
                selectedDeptId === "publications" ? (
                  <Newspaper className="h-8 w-8 text-amber-400" />
                ) : selectedDeptId === "events" ? (
                  <CalendarDays className="h-8 w-8 text-amber-400" />
                ) : (
                  <Bell className="h-8 w-8 text-amber-400" />
                )
              ) : (
                <Building className="h-8 w-8 text-amber-400" />
              )}
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mt-2">
              St. Ann&apos;s College for Women
            </span>
            <h1 className="font-outfit font-black text-2xl text-[#002147] tracking-tight">
              Institutional Update Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Select your department or institutional committee and enter your password to edit website content, documents, and media.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Select Department / Committee</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <optgroup label="Academic Departments (16)">
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.subtitle ? `(${d.subtitle})` : ""}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Institutional Committees & Media (3)">
                  {INSTITUTIONAL_COMMITTEES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </optgroup>
              </select>
              {activeDept?.subtitle && (
                <span className="text-[11px] text-slate-500 font-medium italic px-1">
                  {activeDept.subtitle}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                {isCommittee ? "Committee Password" : "Department Password"}
              </label>
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-[#002147] transition-colors focus:outline-none cursor-pointer"
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
                  <span>{isCommittee ? "Unlock Committee Portal" : "Unlock Department Portal"}</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500 font-semibold">
            <Link 
              href="/academics" 
              className="inline-flex items-center gap-1.5 hover:text-[#002147] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Academics Hub
            </Link>
            <span>•</span>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 hover:text-[#002147] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" /> Super Admin
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
                {isCommittee ? "Institutional Cell" : "Editing Portal"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              {activeDept?.subtitle && (
                <span className="font-semibold text-slate-600 hidden md:inline">
                  {activeDept.subtitle} •
                </span>
              )}
              <Link 
                href={
                  selectedDeptId === "publications"
                    ? "/admissions"
                    : selectedDeptId === "events"
                    ? "/campus-life/events"
                    : selectedDeptId === "notices"
                    ? "/campus-life/events"
                    : `/academics/departments/${selectedDeptId}`
                } 
                target="_blank"
                className="text-blue-600 hover:underline inline-flex items-center gap-1 font-bold"
              >
                View Live Page <ExternalLink className="w-3 h-3" />
              </Link>
              {!isCommittee && lastSaved && <span>• Last published: {lastSaved}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-xl text-xs font-bold text-slate-700 transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="Log out of session"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-red-600" />
            <span>Logout</span>
          </button>
          
          {!isCommittee && (
            <>
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
            </>
          )}
        </div>
      </div>

      {selectedDeptId === "publications" ? (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <QuickDrawersManager />
        </div>
      ) : selectedDeptId === "events" ? (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <EventsManager />
        </div>
      ) : selectedDeptId === "notices" ? (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <NoticesManager />
        </div>
      ) : (
        <>
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
                  placeholder="e.g. Fostering Computational & Mathematical Excellence"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Overview / Description</label>
              <textarea
                rows={3}
                placeholder="Comprehensive departmental overview paragraph..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Vision</label>
                <textarea
                  rows={3}
                  placeholder="Vision statement..."
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Department Mission (Bullet Points)</label>
                  <button
                    type="button"
                    onClick={() => setMission([...mission, ""])}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Point
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {mission.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 w-4 text-right">{idx + 1}.</span>
                      <input
                        type="text"
                        placeholder="Mission objective..."
                        value={m}
                        onChange={(e) => {
                          const next = [...mission];
                          next[idx] = e.target.value;
                          setMission(next);
                        }}
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setMission(mission.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {mission.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No mission points added yet. Click &apos;Add Point&apos; above.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Department Profile Brochure / Document</span>
                <span className="text-[11px] text-slate-500">Official profile PDF downloaded when visitors click &apos;View Departmental Profile&apos;.</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="/documents/DefaultFile_1.pdf"
                  value={overviewDocUrl}
                  onChange={(e) => setOverviewDocUrl(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-1.5 text-xs text-slate-800 font-mono w-64"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-[#00387a] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-95 shrink-0">
                  {uploadingDocKey === "overviewDoc" ? (
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
                        handleDocumentUpload(file, (url) => setOverviewDocUrl(url), "overviewDoc");
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 2: PROGRAMMES OFFERED (6 COLS IN REF DOC)              */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">2. Programmes Offered</h2>
                <p className="text-xs text-slate-500 font-medium">Undergraduate and postgraduate programmes offered under this department.</p>
              </div>
              <button
                type="button"
                onClick={() => setProgrammes([
                  ...programmes,
                  { sNo: programmes.length + 1, name: "", type: "UG Honours", intake: "60", counseling: "42", management: "18" }
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
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Name of the Programme</th>
                    <th className="py-3 px-4 min-w-[140px] text-white border-r border-[#003366]">Programme Type</th>
                    <th className="py-3 px-3 text-center w-28 text-white border-r border-[#003366]">Sanctioned Intake</th>
                    <th className="py-3 px-3 text-center w-28 text-white border-r border-[#003366]">Counselling Seats</th>
                    <th className="py-3 px-3 text-center w-28 text-white border-r border-[#003366]">Management Seats</th>
                    <th className="py-3 px-3 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {programmes.map((p, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. B.Sc. Honours – Mathematics"
                          value={p.name}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].name = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. UG Honours"
                          value={p.type || "UG Honours"}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].type = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="60"
                          value={p.intake}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].intake = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="42"
                          value={p.counseling}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].counseling = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="18"
                          value={p.management}
                          onChange={(e) => {
                            const next = [...programmes];
                            next[idx].management = e.target.value;
                            setProgrammes(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setProgrammes(programmes.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {programmes.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400 italic">
                        No programmes added yet. Click &apos;Add Programme&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 3: FACULTY DIRECTORY (WITH LIVE DEDUPLICATION)          */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">3. Faculty Directory</h2>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Live Deduplicated &amp; Synced
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Faculty members for this department. Duplicate entries are automatically merged while preserving photos and employee IDs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFacultyMembers(dedupeFaculty([
                  ...facultyMembers,
                  {
                    name: "",
                    designation: "Lecturer",
                    qualification: "M.Sc., B.Ed.",
                    experience: "5 Years",
                    email: "",
                    employeeId: "",
                    staffType: "teaching",
                    imageUrl: ""
                  }
                ]))}
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
                                    setFacultyMembers(dedupeFaculty(next));
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
                                  setFacultyMembers(dedupeFaculty(next));
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
                          placeholder="e.g. Lecturer"
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
                          placeholder="e.g. M.Sc., Ph.D."
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
                          placeholder="e.g. 15 Years"
                          value={fac.experience || ""}
                          onChange={(e) => {
                            const next = [...facultyMembers];
                            next[idx].experience = e.target.value;
                            setFacultyMembers(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
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
                            className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-0.5 text-[11px] text-slate-700 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Employee ID (SACW-xxx)"
                            value={fac.employeeId || ""}
                            onChange={(e) => {
                              const next = [...facultyMembers];
                              next[idx].employeeId = e.target.value;
                              setFacultyMembers(next);
                            }}
                            className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-0.5 text-[11px] text-slate-700 font-mono focus:outline-none"
                          />
                        </div>
                      </td>

                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <button
                          type="button"
                          onClick={() => setEditingProfileIndex(idx)}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition shadow-xs"
                        >
                          Details
                        </button>
                      </td>

                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setFacultyMembers(facultyMembers.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {facultyMembers.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center py-6 text-slate-400 italic">
                        No faculty members loaded. Click &apos;Add Faculty Member&apos; above.
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
          {/* SECTION 5: OUTGOING BATCH – RESULTS & PASS % (8 COLS)           */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">5. Outgoing Batch – Student Strength and Pass Percentage</h2>
                <p className="text-xs text-slate-500 font-medium">Year-wise intake, admitted, discontinued, appeared, passed, and pass percentage (8 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setPassPercentage([
                  ...passPercentage,
                  { sNo: passPercentage.length + 1, year: "2025–2026", intake: "60", admitted: "58", discontinued: "1", appeared: "57", passed: "56", percentage: "98.24%" }
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
                    <th className="py-3 px-3 min-w-[130px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-3 text-center min-w-[110px] text-white border-r border-[#003366]">Sanctioned Intake</th>
                    <th className="py-3 px-3 text-center min-w-[110px] text-white border-r border-[#003366]">No. Admitted</th>
                    <th className="py-3 px-3 text-center min-w-[110px] text-white border-r border-[#003366]">No. Discontinued</th>
                    <th className="py-3 px-3 text-center min-w-[110px] text-white border-r border-[#003366]">No. Appeared</th>
                    <th className="py-3 px-3 text-center min-w-[110px] text-white border-r border-[#003366]">No. Passed</th>
                    <th className="py-3 px-3 text-center min-w-[120px] text-amber-300 font-bold border-r border-[#003366]">Pass Percentage</th>
                    <th className="py-3 px-2 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passPercentage.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. 2025–2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].year = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="60"
                          value={item.intake}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].intake = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="58"
                          value={item.admitted}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].admitted = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="1"
                          value={item.discontinued}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].discontinued = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="57"
                          value={item.appeared}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].appeared = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="56"
                          value={item.passed}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].passed = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="98.24%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...passPercentage];
                            next[idx].percentage = e.target.value;
                            setPassPercentage(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => setPassPercentage(passPercentage.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {passPercentage.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center py-6 text-slate-400 italic">
                        No results records added yet. Click &apos;Add Academic Year&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 6: UNIVERSITY RANKS & ACHIEVEMENTS (9 COLS)             */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">6. University Ranks &amp; Academic Achievements</h2>
                <p className="text-xs text-slate-500 font-medium">Student university ranks, medals, prathibha awards, and certificates (9 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setUniversityRanks([
                  ...universityRanks,
                  { sNo: universityRanks.length + 1, year: "2024–2025", studentName: "", programme: "B.Sc. Honours", regNo: "", achievement: "University Gold Medal", rank: "1st Rank", university: "Acharya Nagarjuna University", certificateUrl: "/documents/DefaultFile_1.pdf" }
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
                    <th className="py-3 px-3 text-center w-12 text-blue-100 border-r border-[#003366]">#</th>
                    <th className="py-3 px-3 min-w-[110px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">Student Name</th>
                    <th className="py-3 px-3 min-w-[120px] text-white border-r border-[#003366]">Class / Programme</th>
                    <th className="py-3 px-3 min-w-[110px] text-white border-r border-[#003366]">Register Number</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">University Achievement</th>
                    <th className="py-3 px-3 min-w-[90px] text-white border-r border-[#003366]">Rank</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">University Name</th>
                    <th className="py-3 px-3 min-w-[180px] text-white border-r border-[#003366]">Certificate PDF</th>
                    <th className="py-3 px-2 text-center w-10 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {universityRanks.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="2024–2025"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].year = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Student Name"
                          value={item.studentName}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].studentName = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="B.Sc. Honours"
                          value={item.programme}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].programme = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Y21MATH012"
                          value={item.regNo}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].regNo = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-mono text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="University Gold Medal"
                          value={item.achievement}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].achievement = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="1st Rank"
                          value={item.rank}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].rank = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Acharya Nagarjuna University"
                          value={item.university}
                          onChange={(e) => {
                            const next = [...universityRanks];
                            next[idx].university = e.target.value;
                            setUniversityRanks(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
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
                                      const next = [...universityRanks];
                                      next[idx].certificateUrl = url;
                                      setUniversityRanks(next);
                                    },
                                    `rankDoc_${idx}`
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
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {universityRanks.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center py-6 text-slate-400 italic">
                        No ranks added yet. Click &apos;Add University Rank&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 7: YEAR-WISE PLACEMENT SUMMARY (6 COLS)                */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">7. Year-wise Placement Summary</h2>
                <p className="text-xs text-slate-500 font-medium">Outgoing students placed with verified placement offers &amp; percentage (6 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setPlacements([
                  ...placements,
                  { sNo: placements.length + 1, year: "2025–2026", finalStudents: "58", studentsPlaced: "49", percentage: "84.48%", docUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Placement Record
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[150px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-4 text-center min-w-[160px] text-white border-r border-[#003366]">Final-Year Students</th>
                    <th className="py-3 px-4 text-center min-w-[150px] text-white border-r border-[#003366]">Students Placed</th>
                    <th className="py-3 px-4 text-center min-w-[140px] text-amber-300 font-bold border-r border-[#003366]">Placement %</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Supporting Documents (PDF)</th>
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
                          placeholder="e.g. 2025–2026"
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
                          placeholder="58"
                          value={item.finalStudents}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].finalStudents = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="49"
                          value={item.studentsPlaced}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].studentsPlaced = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="84.48%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...placements];
                            next[idx].percentage = e.target.value;
                            setPlacements(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.docUrl}
                            onChange={(e) => {
                              const next = [...placements];
                              next[idx].docUrl = e.target.value;
                              setPlacements(next);
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
                                      const next = [...placements];
                                      next[idx].docUrl = url;
                                      setPlacements(next);
                                    },
                                    `placementDoc_${idx}`
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
                          onClick={() => setPlacements(placements.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {placements.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400 italic">
                        No placement records added yet. Click &apos;Add Placement Record&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 8: HIGHER EDUCATION PROGRESSION (7 COLS - NEW)          */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">8. Student Progression to Higher Education</h2>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Standard Section 7
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Students progressing to postgraduate degrees (M.Sc, MCA, MBA, B.Ed) with student lists and admission proof (7 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setHigherEducation([
                  ...higherEducation,
                  { sNo: higherEducation.length + 1, year: "2025–2026", totalOutgoing: "58", progressed: "18", percentage: "31.03%", listDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Progression Year
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-3 min-w-[130px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-3 text-center min-w-[130px] text-white border-r border-[#003366]">Total Outgoing Students</th>
                    <th className="py-3 px-3 text-center min-w-[140px] text-white border-r border-[#003366]">Progressed to Higher Ed</th>
                    <th className="py-3 px-3 text-center min-w-[120px] text-amber-300 font-bold border-r border-[#003366]">Progression %</th>
                    <th className="py-3 px-3 min-w-[190px] text-white border-r border-[#003366]">Student List (PDF)</th>
                    <th className="py-3 px-3 min-w-[190px] text-white border-r border-[#003366]">Supporting Proofs (PDF)</th>
                    <th className="py-3 px-2 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {higherEducation.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="2025–2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...higherEducation];
                            next[idx].year = e.target.value;
                            setHigherEducation(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="58"
                          value={item.totalOutgoing}
                          onChange={(e) => {
                            const next = [...higherEducation];
                            next[idx].totalOutgoing = e.target.value;
                            setHigherEducation(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="18"
                          value={item.progressed}
                          onChange={(e) => {
                            const next = [...higherEducation];
                            next[idx].progressed = e.target.value;
                            setHigherEducation(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="31.03%"
                          value={item.percentage}
                          onChange={(e) => {
                            const next = [...higherEducation];
                            next[idx].percentage = e.target.value;
                            setHigherEducation(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs font-black text-[#002147] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.listDocUrl}
                            onChange={(e) => {
                              const next = [...higherEducation];
                              next[idx].listDocUrl = e.target.value;
                              setHigherEducation(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...higherEducation];
                                      next[idx].listDocUrl = url;
                                      setHigherEducation(next);
                                    },
                                    `higherEdList_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.proofDocUrl}
                            onChange={(e) => {
                              const next = [...higherEducation];
                              next[idx].proofDocUrl = e.target.value;
                              setHigherEducation(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...higherEducation];
                                      next[idx].proofDocUrl = url;
                                      setHigherEducation(next);
                                    },
                                    `higherEdProof_${idx}`
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
                          onClick={() => setHigherEducation(higherEducation.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {higherEducation.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-6 text-slate-400 italic">
                        No progression records added yet. Click &apos;Add Progression Year&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 9: COMPETITIVE EXAMINATIONS (6 COLS - NEW)              */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">9. Students Qualifying in Competitive Examinations</h2>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Standard Section 8
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Students qualifying in national and state competitive examinations with student lists, certificates, and supporting proof (6 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setCompetitiveExams([
                  ...competitiveExams,
                  { sNo: competitiveExams.length + 1, year: "2025–2026", qualified: "14", listDocUrl: "/documents/DefaultFile_1.pdf", certDocUrl: "/documents/DefaultFile_1.pdf", proofDocUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Examination Year
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-3 min-w-[130px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-3 text-center min-w-[150px] text-white border-r border-[#003366]">No. Qualified</th>
                    <th className="py-3 px-3 min-w-[180px] text-white border-r border-[#003366]">Student List (PDF)</th>
                    <th className="py-3 px-3 min-w-[180px] text-white border-r border-[#003366]">Qualifying Certificates (PDF)</th>
                    <th className="py-3 px-3 min-w-[180px] text-white border-r border-[#003366]">Supporting Proofs (PDF)</th>
                    <th className="py-3 px-2 text-center w-12 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {competitiveExams.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="2025–2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...competitiveExams];
                            next[idx].year = e.target.value;
                            setCompetitiveExams(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="14"
                          value={item.qualified}
                          onChange={(e) => {
                            const next = [...competitiveExams];
                            next[idx].qualified = e.target.value;
                            setCompetitiveExams(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.listDocUrl}
                            onChange={(e) => {
                              const next = [...competitiveExams];
                              next[idx].listDocUrl = e.target.value;
                              setCompetitiveExams(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...competitiveExams];
                                      next[idx].listDocUrl = url;
                                      setCompetitiveExams(next);
                                    },
                                    `compList_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.certDocUrl}
                            onChange={(e) => {
                              const next = [...competitiveExams];
                              next[idx].certDocUrl = e.target.value;
                              setCompetitiveExams(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...competitiveExams];
                                      next[idx].certDocUrl = url;
                                      setCompetitiveExams(next);
                                    },
                                    `compCert_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.proofDocUrl}
                            onChange={(e) => {
                              const next = [...competitiveExams];
                              next[idx].proofDocUrl = e.target.value;
                              setCompetitiveExams(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...competitiveExams];
                                      next[idx].proofDocUrl = url;
                                      setCompetitiveExams(next);
                                    },
                                    `compProof_${idx}`
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
                          onClick={() => setCompetitiveExams(competitiveExams.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {competitiveExams.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400 italic">
                        No competitive exams added yet. Click &apos;Add Examination Year&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 10: MOUS – MEMORANDUM OF UNDERSTANDING (5 COLS)         */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">10. MOUs – Memorandum of Understanding</h2>
                <p className="text-xs text-slate-500 font-medium">Industry and institutional partnerships signed by the department (5 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setMous([
                  ...mous,
                  { sNo: mous.length + 1, organization: "", duration: "3 Years (2024–2027)", documentUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" }
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
                    <th className="py-3 px-4 min-w-[200px] text-white border-r border-[#003366]">MoU Documents (PDF)</th>
                    <th className="py-3 px-4 min-w-[200px] text-white border-r border-[#003366]">MoU Activity Report (PDF)</th>
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
                          placeholder="e.g. National Mathematics Research Academy"
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
                                    `mouDoc_${idx}`
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
                                    `mouReport_${idx}`
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
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {mous.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-400 italic">
                        No MOUs added yet. Click &apos;Add MoU&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 11: DEPARTMENTAL BEST PRACTICES (7 COLS - NEW)          */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">11. Departmental Best Practices</h2>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Standard Section 10
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Distinctive departmental practices, institutional objectives, measurable outcomes, and reports (7 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setBestPractices([
                  ...bestPractices,
                  { sNo: bestPractices.length + 1, year: "2025–2026", title: "", objectives: "", outcomes: "", reportUrl: "/documents/DefaultFile_1.pdf", docUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Best Practice
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-12 text-blue-100 border-r border-[#003366]">#</th>
                    <th className="py-3 px-3 min-w-[110px] text-white border-r border-[#003366]">Year</th>
                    <th className="py-3 px-3 min-w-[180px] text-white border-r border-[#003366]">Title of Best Practice</th>
                    <th className="py-3 px-3 min-w-[200px] text-white border-r border-[#003366]">Objectives of Practice</th>
                    <th className="py-3 px-3 min-w-[200px] text-white border-r border-[#003366]">Outcomes / Impact</th>
                    <th className="py-3 px-3 min-w-[170px] text-white border-r border-[#003366]">Report (PDF)</th>
                    <th className="py-3 px-3 min-w-[170px] text-white border-r border-[#003366]">Supporting Docs (PDF)</th>
                    <th className="py-3 px-2 text-center w-10 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bestPractices.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="2025–2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...bestPractices];
                            next[idx].year = e.target.value;
                            setBestPractices(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Title of Best Practice"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...bestPractices];
                            next[idx].title = e.target.value;
                            setBestPractices(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <textarea
                          rows={2}
                          placeholder="Objectives..."
                          value={item.objectives}
                          onChange={(e) => {
                            const next = [...bestPractices];
                            next[idx].objectives = e.target.value;
                            setBestPractices(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <textarea
                          rows={2}
                          placeholder="Outcomes..."
                          value={item.outcomes}
                          onChange={(e) => {
                            const next = [...bestPractices];
                            next[idx].outcomes = e.target.value;
                            setBestPractices(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.reportUrl}
                            onChange={(e) => {
                              const next = [...bestPractices];
                              next[idx].reportUrl = e.target.value;
                              setBestPractices(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...bestPractices];
                                      next[idx].reportUrl = url;
                                      setBestPractices(next);
                                    },
                                    `bpReport_${idx}`
                                  );
                                }
                              }}
                            />
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.docUrl}
                            onChange={(e) => {
                              const next = [...bestPractices];
                              next[idx].docUrl = e.target.value;
                              setBestPractices(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...bestPractices];
                                      next[idx].docUrl = url;
                                      setBestPractices(next);
                                    },
                                    `bpDoc_${idx}`
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
                          onClick={() => setBestPractices(bestPractices.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bestPractices.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-6 text-slate-400 italic">
                        No best practices added yet. Click &apos;Add Best Practice&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 12: ADD-ON / CERTIFICATE COURSES (9 COLS - NEW)         */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">12. Departmental Add-on / Certificate Courses</h2>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Standard Section 11
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Departmental certificate and value-added courses with course code, duration, enrolled, and certified students (9 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setCertificateCourses([
                  ...certificateCourses,
                  { sNo: certificateCourses.length + 1, year: "2025–2026", name: "", type: "Certificate Course", code: "MAT-CC-01", duration: "36 Hours", enrolled: "45", certified: "45", reportUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-12 text-blue-100 border-r border-[#003366]">#</th>
                    <th className="py-3 px-3 min-w-[110px] text-white border-r border-[#003366]">Year</th>
                    <th className="py-3 px-3 min-w-[180px] text-white border-r border-[#003366]">Course Name</th>
                    <th className="py-3 px-3 min-w-[120px] text-white border-r border-[#003366]">Type of Course</th>
                    <th className="py-3 px-3 min-w-[100px] text-white border-r border-[#003366]">Course Code</th>
                    <th className="py-3 px-3 text-center min-w-[100px] text-white border-r border-[#003366]">Duration</th>
                    <th className="py-3 px-3 text-center min-w-[90px] text-white border-r border-[#003366]">Enrolled</th>
                    <th className="py-3 px-3 text-center min-w-[90px] text-white border-r border-[#003366]">Certified</th>
                    <th className="py-3 px-3 min-w-[170px] text-white border-r border-[#003366]">Report / Syllabus (PDF)</th>
                    <th className="py-3 px-2 text-center w-10 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificateCourses.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="2025–2026"
                          value={item.year}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].year = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Course Name"
                          value={item.name}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].name = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Certificate Course"
                          value={item.type}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].type = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="MAT-CC-01"
                          value={item.code}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].code = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-mono text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="36 Hours"
                          value={item.duration}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].duration = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="45"
                          value={item.enrolled}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].enrolled = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="45"
                          value={item.certified}
                          onChange={(e) => {
                            const next = [...certificateCourses];
                            next[idx].certified = e.target.value;
                            setCertificateCourses(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.reportUrl}
                            onChange={(e) => {
                              const next = [...certificateCourses];
                              next[idx].reportUrl = e.target.value;
                              setCertificateCourses(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                      const next = [...certificateCourses];
                                      next[idx].reportUrl = url;
                                      setCertificateCourses(next);
                                    },
                                    `certReport_${idx}`
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
                          onClick={() => setCertificateCourses(certificateCourses.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {certificateCourses.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center py-6 text-slate-400 italic">
                        No courses added yet. Click &apos;Add Course&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 13: ACTIVITIES & CELEBRATIONS (6 COLS)                  */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">13. Departmental Activities &amp; Celebrations</h2>
                <p className="text-xs text-slate-500 font-medium">Workshops, national seminars, guest lectures, and student festivals (6 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setActivities([
                  ...activities,
                  { sNo: activities.length + 1, date: "", title: "", category: "Academic Celebration", participants: "100", reportUrl: "/documents/DefaultFile_1.pdf" }
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
                    <th className="py-3 px-4 min-w-[130px] text-white border-r border-[#003366]">Date</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Name of the Activity / Programme</th>
                    <th className="py-3 px-4 min-w-[150px] text-white border-r border-[#003366]">Category</th>
                    <th className="py-3 px-3 text-center min-w-[110px] text-white border-r border-[#003366]">Participants</th>
                    <th className="py-3 px-4 min-w-[200px] text-white border-r border-[#003366]">Activity Report (PDF)</th>
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
                          placeholder="e.g. 22-12-2025"
                          value={item.date}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].date = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="National Mathematics Day Celebration"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].title = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="e.g. Workshop"
                          value={item.category}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].category = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 text-center border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="185"
                          value={item.participants}
                          onChange={(e) => {
                            const next = [...activities];
                            next[idx].participants = e.target.value;
                            setActivities(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
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
                                      const next = [...activities];
                                      next[idx].reportUrl = url;
                                      setActivities(next);
                                    },
                                    `actReport_${idx}`
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
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {activities.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400 italic">
                        No activities added yet. Click &apos;Add Activity&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 14: STUDENT EXTERNAL ACHIEVEMENTS (10 COLS)             */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">14. Student External Achievements, Participation &amp; Representation</h2>
                <p className="text-xs text-slate-500 font-medium">Inter-collegiate, state, and national awards won by department students (10 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setStudentAchievements([
                  ...studentAchievements,
                  { sNo: studentAchievements.length + 1, date: "18-01-2026", studentName: "", programme: "III B.Sc.", achievement: "First Prize & Cash Award", eventName: "", level: "State Level", org: "", award: "Gold Medal & Cash Prize", certificateUrl: "/documents/DefaultFile_1.pdf" }
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
                    <th className="py-3 px-3 text-center w-12 text-blue-100 border-r border-[#003366]">#</th>
                    <th className="py-3 px-3 min-w-[100px] text-white border-r border-[#003366]">Date</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">Student Name</th>
                    <th className="py-3 px-3 min-w-[110px] text-white border-r border-[#003366]">Class / Prog</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">Achievement</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">Event / Contest</th>
                    <th className="py-3 px-3 min-w-[90px] text-white border-r border-[#003366]">Level</th>
                    <th className="py-3 px-3 min-w-[140px] text-white border-r border-[#003366]">Organizing Inst</th>
                    <th className="py-3 px-3 min-w-[120px] text-white border-r border-[#003366]">Award</th>
                    <th className="py-3 px-3 min-w-[170px] text-white border-r border-[#003366]">Certificate PDF</th>
                    <th className="py-3 px-2 text-center w-10 text-white">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentAchievements.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/60 hover:bg-blue-50/30"}>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="18-01-2026"
                          value={item.date}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].date = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Student Name"
                          value={item.studentName}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].studentName = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="III B.Sc."
                          value={item.programme}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].programme = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="First Prize & Cash Award"
                          value={item.achievement}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].achievement = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-medium text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Math Olympiad Quiz"
                          value={item.eventName}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].eventName = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="State Level"
                          value={item.level}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].level = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Andhra Loyola College"
                          value={item.org}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].org = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <input
                          type="text"
                          placeholder="Gold Medal"
                          value={item.award}
                          onChange={(e) => {
                            const next = [...studentAchievements];
                            next[idx].award = e.target.value;
                            setStudentAchievements(next);
                          }}
                          className="w-full bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-2 border-r border-slate-100">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="/documents/DefaultFile_1.pdf"
                            value={item.certificateUrl}
                            onChange={(e) => {
                              const next = [...studentAchievements];
                              next[idx].certificateUrl = e.target.value;
                              setStudentAchievements(next);
                            }}
                            className="flex-1 bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-1.5 py-0.5 text-xs text-slate-700 focus:outline-none"
                          />
                          <label className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#002147] hover:text-white text-[#002147] rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0">
                            <Upload className="w-3 h-3" />
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
                                    `achCert_${idx}`
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
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {studentAchievements.length === 0 && (
                    <tr>
                      <td colSpan={11} className="text-center py-6 text-slate-400 italic">
                        No achievements added yet. Click &apos;Add Achievement&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 15: YEAR-WISE ANNUAL ACTIVITY REPORTS (5 COLS)          */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">15. Year-wise Annual Activity Reports</h2>
                <p className="text-xs text-slate-500 font-medium">Consolidated annual department activity reports and supporting documents (5 columns).</p>
              </div>
              <button
                type="button"
                onClick={() => setAnnualReports([
                  ...annualReports,
                  { sNo: annualReports.length + 1, year: "2025–2026", activitiesCount: "14", reportUrl: "/documents/DefaultFile_1.pdf", supportingDocUrl: "/documents/DefaultFile_1.pdf" }
                ])}
                className="px-3.5 py-1.5 bg-[#002147] text-white hover:bg-[#00387a] rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Report Year
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-3 px-3 text-center w-14 text-blue-100 border-r border-[#003366]">S. No.</th>
                    <th className="py-3 px-4 min-w-[150px] text-white border-r border-[#003366]">Academic Year</th>
                    <th className="py-3 px-4 text-center min-w-[160px] text-white border-r border-[#003366]">Total No. of Activities</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Annual Activity Report (PDF)</th>
                    <th className="py-3 px-4 min-w-[220px] text-white border-r border-[#003366]">Supporting Documents (PDF)</th>
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
                          placeholder="e.g. 2025–2026"
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
                          placeholder="14"
                          value={item.activitiesCount}
                          onChange={(e) => {
                            const next = [...annualReports];
                            next[idx].activitiesCount = e.target.value;
                            setAnnualReports(next);
                          }}
                          className="w-full text-center bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
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
                                    `annReport_${idx}`
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
                                    `annSupport_${idx}`
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
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {annualReports.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-400 italic">
                        No annual reports added yet. Click &apos;Add Report Year&apos; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 16: DYNAMIC CUSTOM TABLES                              */}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-outfit font-black text-lg text-[#002147]">16. Additional Department Tables (Custom)</h2>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    Custom NAAC Data
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Create custom tables with arbitrary columns and rows for specific department activities or NAAC criteria.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddCustomTable}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Create New Table
              </button>
            </div>

            {customTables.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center gap-2">
                <BookOpen className="w-8 h-8 text-slate-300" />
                <p className="text-xs font-bold text-slate-600">No custom tables created for this department.</p>
                <p className="text-[11px] text-slate-400">Click &apos;Create New Table&apos; above if your department has additional NAAC evidence or unique criteria.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {customTables.map((tbl, tIdx) => (
                  <div key={tbl.id} className="p-5 bg-slate-50/70 border border-slate-200 rounded-2xl flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <input
                          type="text"
                          value={tbl.title}
                          onChange={(e) => handleUpdateTableMeta(tbl.id, "title", e.target.value)}
                          placeholder="Table Title"
                          className="bg-white border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-1.5 text-sm font-black text-[#002147] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={tbl.description || ""}
                          onChange={(e) => handleUpdateTableMeta(tbl.id, "description", e.target.value)}
                          placeholder="Short description or criteria notes..."
                          className="bg-white border border-slate-200 focus:border-[#002147] rounded-xl px-3 py-1 text-xs text-slate-600 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => handleAddColumn(tbl.id)}
                          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-indigo-400 text-indigo-700 rounded-lg text-xs font-bold transition shadow-xs inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Column
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddRow(tbl.id)}
                          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-[#002147] text-[#002147] rounded-lg text-xs font-bold transition shadow-xs inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Row
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomTable(tbl.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Table"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                      <table className="w-full text-left text-xs border-collapse font-sans">
                        <thead>
                          <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold">
                            {tbl.columns.map((col, cIdx) => (
                              <th key={cIdx} className="py-2.5 px-3 border-r border-[#003366] min-w-[140px]">
                                <div className="flex items-center justify-between gap-1.5">
                                  <input
                                    type="text"
                                    value={col}
                                    onChange={(e) => handleRenameColumn(tbl.id, cIdx, e.target.value)}
                                    className="bg-transparent text-white font-bold text-[11px] uppercase tracking-wider border-b border-transparent hover:border-blue-300 focus:border-amber-300 focus:outline-none w-full"
                                  />
                                  {tbl.columns.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteColumn(tbl.id, cIdx)}
                                      className="text-blue-300 hover:text-red-300 p-0.5"
                                      title="Delete Column"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              </th>
                            ))}
                            <th className="py-2.5 px-2 text-center w-10 text-white">Del</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={row._key || rIdx} className={rIdx % 2 === 0 ? "bg-white hover:bg-blue-50/20" : "bg-slate-50/40 hover:bg-blue-50/20"}>
                              {tbl.columns.map((_, cIdx) => (
                                <td key={cIdx} className="py-1.5 px-2 border-r border-slate-100">
                                  <input
                                    type="text"
                                    value={row.cells[cIdx] || ""}
                                    onChange={(e) => handleUpdateCell(tbl.id, rIdx, cIdx, e.target.value)}
                                    placeholder="—"
                                    className="w-full bg-transparent border-0 px-1 py-1 text-xs text-slate-800 focus:ring-1 focus:ring-[#002147] rounded-md focus:bg-white"
                                  />
                                </td>
                              ))}
                              <td className="py-1.5 px-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRow(tbl.id, rIdx)}
                                  className="text-slate-400 hover:text-red-500 p-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* SECTION 17: DEPARTMENT PHOTO & VIDEO GALLERY (YEAR-WISE FILTER)*/}
          {/* ============================================================== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-outfit font-black text-lg text-[#002147]">17. Department Photo &amp; Video Gallery</h2>
                <p className="text-xs text-slate-500 font-medium">Upload photographs with academic year, event title, and date for the public photo gallery.</p>
              </div>
              <label className="px-3.5 py-1.5 bg-[#002147] hover:bg-[#00387a] text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs cursor-pointer active:scale-95">
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setGallery([
                        ...gallery,
                        { file, url: previewUrl, year: "2025–2026", title: "Department Event", date: "2025–2026", caption: "" }
                      ]);
                    }
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-2.5 relative group">
                  <div className="h-40 w-full rounded-lg overflow-hidden bg-slate-200 relative border border-slate-200">
                    {item.url ? (
                      <img src={item.url} alt={item.title || "Gallery"} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full transition shadow-md"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Year: 2025–2026"
                      value={item.year || "2025–2026"}
                      onChange={(e) => {
                        const next = [...gallery];
                        next[idx].year = e.target.value;
                        setGallery(next);
                      }}
                      className="bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Date: 22-12-2025"
                      value={item.date || ""}
                      onChange={(e) => {
                        const next = [...gallery];
                        next[idx].date = e.target.value;
                        setGallery(next);
                      }}
                      className="bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Event Title..."
                    value={item.title || ""}
                    onChange={(e) => {
                      const next = [...gallery];
                      next[idx].title = e.target.value;
                      setGallery(next);
                    }}
                    className="bg-white border border-slate-200 focus:border-[#002147] rounded-lg px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                  <p className="text-xs font-bold text-slate-500">No gallery photos added yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
        </>
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
