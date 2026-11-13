"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { 
  Building, Users, FileText, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2, 
  ExternalLink, Calendar, Award, BookOpen, GraduationCap, Briefcase, Trophy, FileCheck
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "@/components/academics/academics-data.json";
import { getDepartment } from "@/lib/sanity";

interface PhotoItem {
  url: string;
  year?: string;
  title?: string;
  date?: string;
}

interface ProgrammeItem {
  sNo: number;
  name: string;
  type: string;
  intake: string | number;
  counseling: string | number;
  management: string | number;
}

// Subtext mapping strictly for the specified departments
const departmentSubtextMap: Record<string, string> = {
  "department-of-bca": "(Under the Department of Computer Science & Applications)",
  "department-of-computer-science": "(Under the Department of Computer Science & Applications)",
  "department-of-artificial-intelligence": "(Under the Department of Computer Science & Applications)",
  "department-of-english": "(Under the Department of Oriental Languages)",
  "department-of-telugu-wing": "(Under the Department of Oriental Languages)",
  "department-of-sanskrit-hindi-wing": "(Under the Department of Oriental Languages)",
};

const departmentProgrammesMap: Record<string, ProgrammeItem[]> = {
  "department-of-commerce": [
    { sNo: 1, name: "B.Com. Honours – General", type: "UG Honours", intake: 20, counseling: 14, management: 6 },
    { sNo: 2, name: "B.Com. Honours – Computer Applications", type: "UG Honours", intake: 105, counseling: 74, management: 31 }
  ],
  "department-of-bca": [
    { sNo: 1, name: "BCA Honours – Computer Applications", type: "UG Honours", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-computer-science": [
    { sNo: 1, name: "B.Sc. Honours – Computer Science", type: "UG Honours", intake: 35, counseling: 25, management: 10 }
  ],
  "department-of-artificial-intelligence": [
    { sNo: 1, name: "B.Sc. Honours – Artificial Intelligence", type: "UG Honours", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-computer-science-applications": [
    { sNo: 1, name: "BCA Honours – Computer Applications", type: "UG Honours", intake: 60, counseling: 42, management: 18 },
    { sNo: 2, name: "B.Sc. Honours – Computer Science", type: "UG Honours", intake: 35, counseling: 25, management: 10 },
    { sNo: 3, name: "B.Sc. Honours – Artificial Intelligence", type: "UG Honours", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-mathematics": [
    { sNo: 1, name: "B.Sc. Honours – Mathematics", type: "UG Honours", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-physics": [
    { sNo: 1, name: "B.Sc. Honours – Physics", type: "UG Honours", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-statistics": [
    { sNo: 1, name: "B.Sc. Honours – Statistics", type: "UG Honours", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-biotechnology": [
    { sNo: 1, name: "B.Sc. Honours – Biotechnology", type: "UG Honours", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-microbiology": [
    { sNo: 1, name: "B.Sc. Honours – Microbiology", type: "UG Honours", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-botany": [
    { sNo: 1, name: "B.Sc. Honours – Botany", type: "UG Honours", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-chemistry": [
    { sNo: 1, name: "B.Sc. Honours – Chemistry", type: "UG Honours", intake: 20, counseling: 14, management: 6 }
  ],
  "department-of-mca": [
    { sNo: 1, name: "MCA – Master of Computer Applications", type: "PG Professional", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-mba": [
    { sNo: 1, name: "MBA – Master of Business Administration", type: "PG Professional", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-english": [
    { sNo: 1, name: "B.A. Honours – English Literature & Foundation Courses", type: "UG Language & Literature", intake: "-", counseling: "-", management: "-" }
  ],
  "department-of-telugu-wing": [
    { sNo: 1, name: "Classical & Modern Telugu Language Courses", type: "UG Language Wing", intake: "-", counseling: "-", management: "-" }
  ],
  "department-of-sanskrit-hindi-wing": [
    { sNo: 1, name: "Classical Sanskrit & National Hindi Language Courses", type: "UG Language Wing", intake: "-", counseling: "-", management: "-" }
  ],
  "department-of-oriental-languages": [
    { sNo: 1, name: "Language Programmes (Telugu, Sanskrit, Hindi)", type: "UG Language Wing", intake: "-", counseling: "-", management: "-" }
  ]
};

const deptToFacultySlugMap: Record<string, string> = {
  "department-of-commerce": "commerce",
  "department-of-bca": "computer-science",
  "department-of-computer-science": "computer-science",
  "department-of-artificial-intelligence": "computer-science",
  "department-of-computer-science-applications": "computer-science",
  "department-of-computer-applications-bca": "computer-science",
  "department-of-computer-science-cs-artificial-intelligence": "computer-science",
  "department-of-mathematics": "mathematics",
  "department-of-physics": "physics",
  "department-of-statistics": "statistics",
  "department-of-biotechnology": "biotechnology",
  "department-of-microbiology": "microbiology",
  "department-of-botany": "botany",
  "department-of-chemistry": "chemistry",
  "department-of-english": "english",
  "department-of-telugu-wing": "oriental-languages",
  "department-of-sanskrit-hindi-wing": "oriental-languages",
  "department-of-oriental-languages": "oriental-languages",
  "department-of-oriental-languages-telugu-sanskrit-hindi": "oriental-languages",
  "department-of-mca": "mca",
  "department-of-mba": "mba",
};

interface DepartmentDetailProps {
  itemSlug: string;
}

export function DepartmentDetail({ itemSlug }: DepartmentDetailProps) {
  // Normalize legacy slugs if any
  let normalizedSlug = itemSlug;
  if (itemSlug === "department-of-computer-applications-bca") {
    normalizedSlug = "department-of-bca";
  } else if (itemSlug === "department-of-computer-science-cs-artificial-intelligence") {
    normalizedSlug = "department-of-artificial-intelligence";
  } else if (itemSlug === "department-of-oriental-languages-telugu-sanskrit-hindi") {
    normalizedSlug = "department-of-telugu-wing";
  }

  const staticDept = academicsData.departments.find((d: any) => d.id === normalizedSlug || d.id === itemSlug);

  const deptName = staticDept?.name || "Academic Department";
  const deptSubtext = departmentSubtextMap[normalizedSlug] || staticDept?.subtext || null;
  const introParagraph = staticDept?.description || `The ${deptName} is committed to academic excellence, state-of-the-art experiential learning, and preparing women students for impactful leadership and distinguished careers.`;
  const overviewPdf = staticDept?.overviewDocUrl || "/documents/DefaultFile_1.pdf";

  const [dynamicDept, setDynamicDept] = useState<any>(null);

  useEffect(() => {
    getDepartment(normalizedSlug).then((data) => {
      if (data) setDynamicDept(data);
    }).catch((err) => console.error("Error loading department dynamic data:", err));
  }, [normalizedSlug]);

  const defaultProgrammes: ProgrammeItem[] = departmentProgrammesMap[normalizedSlug] || [
    { sNo: 1, name: `${deptName} Honours Programme`, type: "UG Honours", intake: "-", counseling: "-", management: "-" }
  ];

  const hasValidDynamicProgrammes = Array.isArray(dynamicDept?.programmes) &&
    dynamicDept.programmes.length > 0 &&
    dynamicDept.programmes.every((p: any) => p.counseling !== undefined && p.management !== undefined && p.intake !== "TBD");

  const programmes: ProgrammeItem[] = hasValidDynamicProgrammes ? dynamicDept.programmes : defaultProgrammes;

  // Modals state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const handleOpenPdf = (url: string, title: string) => {
    setPreviewUrl(url || "/documents/DefaultFile_1.pdf");
    setPreviewTitle(title);
  };

  // --------------------------------------------------------------------------
  // ACADEMIC YEAR DROPDOWNS (Table 2, 4, 5, 8, 9, 11, 12, etc.)
  // --------------------------------------------------------------------------
  const [table2Year, setTable2Year] = useState<string>("2025–2026");
  const [curriculumProg, setCurriculumProg] = useState<string>(programmes[0]?.name || "Undergraduate Programme");

  const [table3Year, setTable3Year] = useState<string>("All");
  const [table4Year, setTable4Year] = useState<string>("All");
  const [table5Year, setTable5Year] = useState<string>("All");
  const [table6Year, setTable6Year] = useState<string>("All");
  const [table7Year, setTable7Year] = useState<string>("All");
  const [table8Year, setTable8Year] = useState<string>("All");
  const [table9Year, setTable9Year] = useState<string>("All");
  const [table10Year, setTable10Year] = useState<string>("All");
  const [table11Year, setTable11Year] = useState<string>("All");
  const [table12Year, setTable12Year] = useState<string>("All");
  const [galleryYear, setGalleryYear] = useState<string>("All");

  useEffect(() => {
    if (programmes[0]?.name) {
      setCurriculumProg(programmes[0].name);
    }
  }, [normalizedSlug]);

  // Lightbox Data
  const [lightboxData, setLightboxData] = useState<{
    title?: string;
    photos: PhotoItem[];
    currentIndex: number;
  } | null>(null);

  const handleNextPhoto = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.photos.length
      };
    });
  }, [lightboxData]);

  const handlePrevPhoto = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length
      };
    });
  }, [lightboxData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "Escape") setLightboxData(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData, handleNextPhoto, handlePrevPhoto]);

  // Gallery items fallback
  const uploadedPhotos: PhotoItem[] = useMemo(() => {
    if (staticDept?.galleryImages && Array.isArray(staticDept.galleryImages) && staticDept.galleryImages.length > 0) {
      return staticDept.galleryImages.map((img: any, idx: number) => {
        if (typeof img === "string") {
          return { url: img, year: "2025–2026", title: `${deptName} Event ${idx + 1}`, date: "2025–2026" };
        }
        return {
          url: img.url || "/images/infrastructure/campus-buildings/img-1.jpg",
          year: img.year || "2025–2026",
          title: img.title || `${deptName} Activity`,
          date: img.date || "2025–2026"
        };
      });
    }
    return [
      {
        url: "/images/infrastructure/campus-buildings/img-1.jpg",
        year: "2025–2026",
        title: `${deptName} – Main Academic Campus`,
        date: "Academic Year 2025–2026"
      }
    ];
  }, [staticDept, deptName]);

  const filteredGallery = useMemo(() => {
    if (galleryYear === "All") return uploadedPhotos;
    return uploadedPhotos.filter(p => p.year === galleryYear);
  }, [uploadedPhotos, galleryYear]);

  // Standard Baseline Data for Table 3 (Student Strength & Pass %)
  const table3Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", intake: "60", admitted: "58", discontinued: "1", appeared: "57", passed: "56", passPct: "98.24%" },
      { sNo: 2, year: "2024–2025", intake: "60", admitted: "60", discontinued: "2", appeared: "58", passed: "57", passPct: "98.27%" },
      { sNo: 3, year: "2023–2024", intake: "60", admitted: "59", discontinued: "1", appeared: "58", passed: "58", passPct: "100.00%" }
    ];
    if (Array.isArray(dynamicDept?.passPercentage) && dynamicDept.passPercentage.length > 0) {
      all = dynamicDept.passPercentage.map((p: any, i: number) => ({
        sNo: i + 1,
        year: p.year || "",
        intake: p.intake ?? p.sanctionedIntake ?? "60",
        admitted: p.admitted ?? p.admittedStudents ?? "-",
        discontinued: p.discontinued ?? "-",
        appeared: p.appeared ?? p.finalYearStudents ?? "-",
        passed: p.passed ?? p.studentsPassed ?? "-",
        passPct: p.passPct ?? p.percentage ?? "-"
      }));
    }
    if (table3Year === "All") return all;
    return all.filter(r => r.year === table3Year);
  }, [table3Year, dynamicDept]);

  // Standard Baseline Data for Table 4 (University Ranks)
  const table4Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2024–2025", studentName: "K. Sowmya", prog: "B.Sc. Honours", regNo: "Y21MATH012", achievement: "University Gold Medal", position: "1st Rank", uni: "Acharya Nagarjuna University", docUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2023–2024", studentName: "P. Bhavani", prog: "B.Sc. Honours", regNo: "Y20MATH045", achievement: "University Prathibha Award", position: "2nd Rank", uni: "Acharya Nagarjuna University", docUrl: "/documents/DefaultFile_1.pdf" }
    ];
    const dynRanks = dynamicDept?.universityRanks || dynamicDept?.academicAchievements;
    if (Array.isArray(dynRanks) && dynRanks.length > 0) {
      all = dynRanks.map((r: any, i: number) => ({
        sNo: i + 1,
        year: r.year || "",
        studentName: r.studentName || r.name || "",
        prog: r.prog || r.programme || "",
        regNo: r.regNo || r.registerNumber || "—",
        achievement: r.achievement || r.award || "University Rank",
        position: r.position || r.rank || "Rank",
        uni: r.uni || r.university || "Acharya Nagarjuna University",
        docUrl: r.docUrl || r.certificateUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table4Year === "All") return all;
    return all.filter(r => r.year === table4Year);
  }, [table4Year, dynamicDept]);

  // Standard Baseline Data for Table 5 (Placements)
  const table5Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", finalStudents: "58", placed: "49", pct: "84.48%", docUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2024–2025", finalStudents: "60", placed: "51", pct: "85.00%", docUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, year: "2023–2024", finalStudents: "57", placed: "48", pct: "84.21%", docUrl: "/documents/DefaultFile_1.pdf" }
    ];
    if (Array.isArray(dynamicDept?.placements) && dynamicDept.placements.length > 0) {
      all = dynamicDept.placements.map((p: any, i: number) => ({
        sNo: i + 1,
        year: p.year || "",
        finalStudents: p.finalStudents ?? p.finalYearStudents ?? "—",
        placed: p.placed ?? p.studentsPlaced ?? "—",
        pct: p.pct ?? p.percentage ?? "—",
        docUrl: p.docUrl || p.supportingDocUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table5Year === "All") return all;
    return all.filter(r => r.year === table5Year);
  }, [table5Year, dynamicDept]);

  // Standard Baseline Data for Table 6 (Higher Education Progression)
  const table6Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", totalOutgoing: "58", progressed: "18", pct: "31.03%", listDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2024–2025", totalOutgoing: "60", progressed: "20", pct: "33.33%", listDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, year: "2023–2024", totalOutgoing: "57", progressed: "17", pct: "29.82%", listDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" },
      { sNo: 4, year: "2022–2023", totalOutgoing: "55", progressed: "16", pct: "29.09%", listDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" },
      { sNo: 5, year: "2021–2022", totalOutgoing: "54", progressed: "15", pct: "27.78%", listDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" }
    ];
    if (Array.isArray(dynamicDept?.higherEducation) && dynamicDept.higherEducation.length > 0) {
      all = dynamicDept.higherEducation.map((h: any, i: number) => ({
        sNo: i + 1,
        year: h.year || "",
        totalOutgoing: h.totalOutgoing || "—",
        progressed: h.progressed || "—",
        pct: h.percentage || h.pct || "—",
        listDoc: h.listDocUrl || h.listDoc || "/documents/DefaultFile_1.pdf",
        proofDoc: h.proofDocUrl || h.proofDoc || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table6Year === "All") return all;
    return all.filter(r => r.year === table6Year);
  }, [table6Year, dynamicDept]);

  // Standard Baseline Data for Table 7 (Competitive Examinations)
  const table7Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", qualified: "14", listDoc: "/documents/DefaultFile_1.pdf", certDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2024–2025", qualified: "16", listDoc: "/documents/DefaultFile_1.pdf", certDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, year: "2023–2024", qualified: "12", listDoc: "/documents/DefaultFile_1.pdf", certDoc: "/documents/DefaultFile_1.pdf", proofDoc: "/documents/DefaultFile_1.pdf" }
    ];
    if (Array.isArray(dynamicDept?.competitiveExams) && dynamicDept.competitiveExams.length > 0) {
      all = dynamicDept.competitiveExams.map((c: any, i: number) => ({
        sNo: i + 1,
        year: c.year || "",
        qualified: c.qualified || "—",
        listDoc: c.listDocUrl || c.listDoc || "/documents/DefaultFile_1.pdf",
        certDoc: c.certDocUrl || c.certDoc || "/documents/DefaultFile_1.pdf",
        proofDoc: c.proofDocUrl || c.proofDoc || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table7Year === "All") return all;
    return all.filter(r => r.year === table7Year);
  }, [table7Year, dynamicDept]);

  // Standard Baseline Data for Table 8 (MoUs)
  const table8Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", org: "National Mathematics Research Academy", duration: "3 Years (2024–2027)", docUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2024–2025", org: "Centre for Data Science & Analytics Training", duration: "3 Years (2023–2026)", docUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, year: "2023–2024", org: "APSSDC – Andhra Pradesh Skill Development Corporation", duration: "5 Years (2022–2027)", docUrl: "/documents/DefaultFile_1.pdf", reportUrl: "/documents/DefaultFile_1.pdf" }
    ];
    if (Array.isArray(dynamicDept?.mous) && dynamicDept.mous.length > 0) {
      all = dynamicDept.mous.map((m: any, i: number) => ({
        sNo: i + 1,
        year: m.year || "2025–2026",
        org: m.organization || m.title || m.org || "",
        duration: m.duration || "—",
        docUrl: m.documentUrl || m.docUrl || "/documents/DefaultFile_1.pdf",
        reportUrl: m.reportUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table8Year === "All") return all;
    return all.filter(r => r.year === table8Year);
  }, [table8Year, dynamicDept]);

  // Standard Baseline Data for Table 9 (Best Practices)
  const table9Data = useMemo(() => {
    let all = [
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
    ];
    if (Array.isArray(dynamicDept?.bestPractices) && dynamicDept.bestPractices.length > 0) {
      all = dynamicDept.bestPractices.map((b: any, i: number) => ({
        sNo: i + 1,
        year: b.year || "",
        title: b.title || "",
        objectives: b.objectives || "",
        outcomes: b.outcomes || "",
        reportUrl: b.reportUrl || "/documents/DefaultFile_1.pdf",
        docUrl: b.docUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table9Year === "All") return all;
    return all.filter(r => r.year === table9Year);
  }, [table9Year, dynamicDept]);

  // Standard Baseline Data for Table 10 (Add-on / Certificate Courses)
  const table10Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", name: "Certificate Course in Vedic Mathematics & Quick Calculation", type: "Certificate Course", code: "MAT-CC-01", duration: "36 Hours", enrolled: "45", certified: "45", reportUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2024–2025", name: "Value-Added Course in Statistical Modeling using R", type: "Value-Added Course", code: "MAT-VAC-02", duration: "40 Hours", enrolled: "42", certified: "42", reportUrl: "/documents/DefaultFile_1.pdf" }
    ];
    if (Array.isArray(dynamicDept?.certificateCourses) && dynamicDept.certificateCourses.length > 0) {
      all = dynamicDept.certificateCourses.map((c: any, i: number) => ({
        sNo: i + 1,
        year: c.year || "",
        name: c.name || "",
        type: c.type || "Certificate Course",
        code: c.code || "—",
        duration: c.duration || "—",
        enrolled: c.enrolled || "—",
        certified: c.certified || "—",
        reportUrl: c.reportUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table10Year === "All") return all;
    return all.filter(r => r.year === table10Year);
  }, [table10Year, dynamicDept]);

  // Standard Baseline Data for Table 11 (Activities & Events)
  const table11Data = useMemo(() => {
    let all = [
      { sNo: 1, date: "22-12-2025", year: "2025–2026", name: "National Mathematics Day Celebration & Srinivasa Ramanujan Memorial Lecture", category: "Academic Celebration", participants: "185", reportUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, date: "15-09-2025", year: "2025–2026", name: "State-Level Inter-Collegiate Math Olympiad & Quantitative Quiz", category: "Competition", participants: "120", reportUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, date: "28-02-2025", year: "2024–2025", name: "National Science Day – Workshop on Mathematical Modeling in Natural Sciences", category: "Workshop", participants: "140", reportUrl: "/documents/DefaultFile_1.pdf" }
    ];
    const dynActs = dynamicDept?.activities || dynamicDept?.activitiesList;
    if (Array.isArray(dynActs) && dynActs.length > 0) {
      all = dynActs.map((a: any, i: number) => ({
        sNo: i + 1,
        date: a.date || "",
        year: a.year || (a.date?.includes("2026") ? "2025–2026" : a.date?.includes("2025") ? "2024–2025" : "2025–2026"),
        name: a.name || a.title || a.label || "",
        category: a.category || "Department Activity",
        participants: a.participants || "—",
        reportUrl: a.reportUrl || a.documentUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table11Year === "All") return all;
    return all.filter(r => r.year === table11Year);
  }, [table11Year, dynamicDept]);

  // Standard Baseline Data for Table 12 (External Achievements)
  const table12Data = useMemo(() => {
    let all = [
      { sNo: 1, date: "18-01-2026", year: "2025–2026", studentName: "M. Kavitha", cls: "III B.Sc.", achievement: "First Prize & Cash Award", event: "State Inter-Collegiate Math Quiz", level: "State Level", org: "Andhra Loyola College, Vijayawada", award: "Gold Medal & ₹5,000 Cash Prize", docUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, date: "12-11-2025", year: "2025–2026", studentName: "R. Sai Tejaswi", cls: "II B.Sc.", achievement: "Second Prize in Paper Presentation", event: "National Seminar on Modern Algebra", level: "National Level", org: "PB Siddhartha College, Vijayawada", award: "Certificate of Merit & Trophy", docUrl: "/documents/DefaultFile_1.pdf" }
    ];
    if (Array.isArray(dynamicDept?.studentAchievements) && dynamicDept.studentAchievements.length > 0) {
      all = dynamicDept.studentAchievements.map((s: any, i: number) => ({
        sNo: i + 1,
        date: s.date || "",
        year: s.year || (s.date?.includes("2026") ? "2025–2026" : "2024–2025"),
        studentName: s.studentName || s.name || "",
        cls: s.cls || s.programme || s.class || "—",
        achievement: s.achievement || s.prize || "Achievement",
        event: s.event || s.eventName || s.activity || "",
        level: s.level || "College Level",
        org: s.org || s.organizer || "—",
        award: s.award || s.prize || "Certificate",
        docUrl: s.docUrl || s.certificateUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    if (table12Year === "All") return all;
    return all.filter(r => r.year === table12Year);
  }, [table12Year, dynamicDept]);

  // Standard Baseline Data for Table 13 (Annual Activity Reports)
  const table13Data = useMemo(() => {
    let all = [
      { sNo: 1, year: "2025–2026", count: "14", reportUrl: "/documents/DefaultFile_1.pdf", proofUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 2, year: "2024–2025", count: "16", reportUrl: "/documents/DefaultFile_1.pdf", proofUrl: "/documents/DefaultFile_1.pdf" },
      { sNo: 3, year: "2023–2024", count: "15", reportUrl: "/documents/DefaultFile_1.pdf", proofUrl: "/documents/DefaultFile_1.pdf" }
    ];
    const dynReports = dynamicDept?.annualReports || dynamicDept?.activitiesSummary;
    if (Array.isArray(dynReports) && dynReports.length > 0) {
      all = dynReports.map((r: any, i: number) => ({
        sNo: i + 1,
        year: r.year || "",
        count: r.count || r.activitiesCount || "—",
        reportUrl: r.reportUrl || r.documentUrl || "/documents/DefaultFile_1.pdf",
        proofUrl: r.proofUrl || r.supportingDocUrl || "/documents/DefaultFile_1.pdf"
      }));
    }
    return all;
  }, [dynamicDept]);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 animate-fadeIn font-sans pb-16">

      {/* ============================================================== */}
      {/* 1. DEPARTMENT HEADING & SUBTEXT (Specified Departments Only)    */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 border-b border-slate-200/90 pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-[#002147]" /> Academic Department
          </span>
          <h1 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
            {deptName}
          </h1>

          {/* Subtext rendered strictly when present for specified departments */}
          {deptSubtext && (
            <div className="mt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 italic bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                {deptSubtext}
              </span>
            </div>
          )}

          <div className="h-1 w-16 bg-[#002147] rounded-full mt-1.5"></div>
        </div>

        <button
          onClick={() => handleOpenPdf(overviewPdf, `${deptName} - Departmental Profile`)}
          className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#00387a] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <FileText className="h-4 w-4" /> View Departmental Profile (PDF)
        </button>
      </div>

      {/* ============================================================== */}
      {/* 2. AUTHENTIC INTRO PARAGRAPH                                   */}
      {/* ============================================================== */}
      <SubtextBox
        className="!p-4 sm:!p-5 !rounded-2xl"
        subtext={introParagraph}
      />

      {/* ============================================================== */}
      {/* SECTION 1: PROGRAMMES OFFERED (6 COLUMNS)                       */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              1. Programmes Offered
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Programme</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Programme Type</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">Sanctioned Intake</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Counselling Seats</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold">Management Seats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programmes.map((p, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{p.sNo || idx + 1}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{p.name}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{p.type || "UG Honours"}</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{p.intake}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{p.counseling}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700">{p.management}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 2: FACULTY DIRECTORY                                   */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            2. Faculty Directory
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#002147]/40 transition-all">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-[#002147]/5 text-[#002147] flex items-center justify-center shrink-0 border border-[#002147]/10">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-outfit text-sm sm:text-base font-black text-[#002147]">
                {deptName} Faculty Directory
              </h3>
              <p className="text-xs text-slate-600 font-medium max-w-2xl leading-relaxed mt-0.5">
                Access verified faculty rosters with doctoral qualifications, designations, teaching experience, research specializations, and departmental portfolios.
              </p>
            </div>
          </div>

          <Link
            href={`/faculty/department-wise?dept=${encodeURIComponent(deptToFacultySlugMap[normalizedSlug] || normalizedSlug.replace("department-of-", ""))}`}
            className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#00387a] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            View Faculty Profiles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 3: CURRICULUM & LEARNING OUTCOMES (TABLE 2 WITH YEAR)  */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              3. Curriculum &amp; Learning Outcomes
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          {/* Academic Year Dropdown for Table 2 */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#002147]" /> Year:
              </span>
              <select
                value={table2Year}
                onChange={(e) => setTable2Year(e.target.value)}
                aria-label="Select Academic Year"
                className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
              >
                <option value="2026–2027">2026–2027</option>
                <option value="2025–2026">2025–2026</option>
                <option value="2024–2025">2024–2025</option>
              </select>
            </div>

            {programmes.length > 1 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Programme:</span>
                <select
                  value={curriculumProg}
                  onChange={(e) => setCurriculumProg(e.target.value)}
                  aria-label="Select Programme"
                  className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
                >
                  {programmes.map((p, idx) => (
                    <option key={idx} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Curriculum Documents ({table2Year})
            </span>
            <span className="text-[11px] text-blue-200 font-bold">{curriculumProg}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3 px-5 text-[#002147] font-black border-r border-slate-200">Particulars</th>
                  <th className="py-3 px-4 text-center font-bold text-slate-700 w-36">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { sNo: 1, particular: "Programme Structure & Curriculum", btnText: "View PDF" },
                  { sNo: 2, particular: "Programme Outcomes (POs)", btnText: "View PDF" },
                  { sNo: 3, particular: "Programme Specific Outcomes (PSOs)", btnText: "View PDF" },
                  { sNo: 4, particular: "Course Structure & Syllabus", btnText: "View Syllabus" },
                  { sNo: 5, particular: "Course Outcomes (COs)", btnText: "View PDF" },
                  { sNo: 6, particular: "CO–PO–PSO Mapping", btnText: "View PDF" }
                ].map((row) => (
                  <tr key={row.sNo} className={row.sNo % 2 === 1 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{row.particular}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `${row.particular} (${table2Year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> {row.btnText}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 4: STUDENT STRENGTH, RESULTS & PASS PERCENTAGE (TABLE 3)*/}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              4. Student Strength, Results &amp; Pass Percentage
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Outgoing Batch – Student Strength and Pass Percentage</p>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table3Year}
              onChange={(e) => setTable3Year(e.target.value)}
              aria-label="Filter Outgoing Batch Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Sanctioned Intake</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">No. of Students Admitted</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">No. of Students Discontinued</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">No. of Students Appeared</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">No. of Students Passed</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black">Pass Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table3Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.intake}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.admitted}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.discontinued}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.appeared}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.passed}</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">{row.passPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 5: UNIVERSITY RANKS & ACHIEVEMENTS (TABLE 4 WITH YEAR) */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              5. University Ranks &amp; Academic Achievements
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table4Year}
              onChange={(e) => setTable4Year(e.target.value)}
              aria-label="Filter University Ranks Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-white font-black border-r border-[#003366]">Name of the Student</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Class / Programme</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Register Number</th>
                  <th className="py-3 px-4 text-white font-bold border-r border-[#003366]">University Rank / Achievement</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Rank / Position</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">University Name</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-36">Certificate / Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table4Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">{row.studentName}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.prog}</td>
                    <td className="py-3 px-4 text-center font-mono font-medium text-slate-700 border-r border-slate-100">{row.regNo}</td>
                    <td className="py-3 px-4 font-bold text-indigo-900 border-r border-slate-100">{row.achievement}</td>
                    <td className="py-3 px-3 text-center font-black text-amber-700 border-r border-slate-100">{row.position}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.uni}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.docUrl, `Rank Certificate - ${row.studentName} (${row.year})`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 6: YEAR-WISE PLACEMENT SUMMARY (TABLE 5 WITH YEAR)     */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              6. Year-wise Placement Summary
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table5Year}
              onChange={(e) => setTable5Year(e.target.value)}
              aria-label="Filter Placement Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Final-Year Students</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Students Placed</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">Placement Percentage</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">Supporting Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table5Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.finalStudents}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.placed}</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{row.pct}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.docUrl, `Placement Evidence (${row.year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 7: STUDENT PROGRESSION TO HIGHER EDUCATION (TABLE 6)   */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              7. Student Progression to Higher Education – Year-wise Summary
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table6Year}
              onChange={(e) => setTable6Year(e.target.value)}
              aria-label="Filter Higher Education Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
              <option value="2022–2023">2022–2023</option>
              <option value="2021–2022">2021–2022</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Total Outgoing Students</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Students Progressed to Higher Education</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">Progression Percentage</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-36">Student List (View PDF)</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">Supporting Documents (View PDF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table6Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.totalOutgoing}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.progressed}</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{row.pct}</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf(row.listDoc, `Student List - Higher Education (${row.year})`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.proofDoc, `Higher Education Proofs (${row.year})`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 8: COMPETITIVE EXAMINATIONS SUMMARY (TABLE 7)          */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              8. Students Qualifying in Competitive Examinations – Year-wise Summary
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table7Year}
              onChange={(e) => setTable7Year(e.target.value)}
              aria-label="Filter Competitive Exams Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">No. of Students Qualified</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-36">Student List (View PDF)</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-44">Qualifying Certificates (View PDF)</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">Supporting Documents (View PDF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table7Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{row.qualified}</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf(row.listDoc, `Qualified Students (${row.year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf(row.certDoc, `Certificates (${row.year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.proofDoc, `Supporting Docs (${row.year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 9: MEMORANDA OF UNDERSTANDING (TABLE 8 WITH YEAR)      */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              9. Memoranda of Understanding (MoUs) &amp; Collaborations
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table8Year}
              onChange={(e) => setTable8Year(e.target.value)}
              aria-label="Filter MoUs Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Organization</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Duration / Validity Period</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-36">MoU Document</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">MoU Activity Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table8Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{row.org}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.duration}</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf(row.docUrl, `MoU Document - ${row.org}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View MoU
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.reportUrl, `MoU Activity Report - ${row.org}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Activity Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 10: DEPARTMENTAL BEST PRACTICES (TABLE 9 WITH YEAR)    */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              10. Departmental Best Practices
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table9Year}
              onChange={(e) => setTable9Year(e.target.value)}
              aria-label="Filter Best Practices Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-white font-bold border-r border-[#003366]">Title of Best Practice</th>
                  <th className="py-3 px-5 text-blue-100 font-bold border-r border-[#003366]">Objectives of the Practice</th>
                  <th className="py-3 px-5 text-blue-100 font-bold border-r border-[#003366]">Outcomes / Impact</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-36">Best Practice Report</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">Supporting Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table9Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 font-black text-[#002147] border-r border-slate-100">{row.title}</td>
                    <td className="py-3 px-5 text-xs text-slate-700 leading-relaxed border-r border-slate-100">{row.objectives}</td>
                    <td className="py-3 px-5 text-xs text-slate-700 leading-relaxed border-r border-slate-100">{row.outcomes}</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf(row.reportUrl, `Best Practice Report - ${row.title}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.docUrl, `Supporting Documents - ${row.title}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 11: ADD-ON / CERTIFICATE COURSES (TABLE 10)            */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              11. Departmental Add-on / Value-Added / Certificate Courses
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table10Year}
              onChange={(e) => setTable10Year(e.target.value)}
              aria-label="Filter Courses Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Course</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Type of Course</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Course Code</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Duration (Hours)</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Students Enrolled</th>
                  <th className="py-3 px-3 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">Students Certified</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-36">Course Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table10Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{row.name}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.type}</td>
                    <td className="py-3 px-4 text-center font-mono font-medium text-slate-700 border-r border-slate-100">{row.code}</td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700 border-r border-slate-100">{row.duration}</td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700 border-r border-slate-100">{row.enrolled}</td>
                    <td className="py-3 px-3 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{row.certified}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.reportUrl, `Course Report - ${row.name}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 12: ACTIVITIES, EVENTS & PROGRAMMES (TABLE 11 WITH YEAR)*/}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              12. Departmental Activities, Events, Programmes &amp; Celebrations
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table11Year}
              onChange={(e) => setTable11Year(e.target.value)}
              aria-label="Filter Activities Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Date</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Activity / Programme</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Category</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">No. of Participants</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-40">Activity Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table11Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.date}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{row.name}</td>
                    <td className="py-3 px-4 text-center font-medium text-indigo-900 bg-indigo-50/50 border-r border-slate-100">{row.category}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.participants}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.reportUrl, `Activity Report - ${row.name}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 13: STUDENT EXTERNAL ACHIEVEMENTS (TABLE 12 WITH YEAR) */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              13. Student External Achievements, Participation &amp; Representation
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={table12Year}
              onChange={(e) => setTable12Year(e.target.value)}
              aria-label="Filter External Achievements Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Date</th>
                  <th className="py-3 px-4 text-white font-black border-r border-[#003366]">Name of the Student</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Class / Programme</th>
                  <th className="py-3 px-4 text-blue-100 font-bold border-r border-[#003366]">Achievement / Participation</th>
                  <th className="py-3 px-4 text-white font-bold border-r border-[#003366]">Event / Competition Name</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Level</th>
                  <th className="py-3 px-4 text-blue-100 font-bold border-r border-[#003366]">Organizing Institution</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Award / Recognition</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-36">Certificate / Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table12Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700 border-r border-slate-100">{row.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">{row.studentName}</td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700 border-r border-slate-100">{row.cls}</td>
                    <td className="py-3 px-4 font-medium text-slate-800 border-r border-slate-100">{row.achievement}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">{row.event}</td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700 border-r border-slate-100">{row.level}</td>
                    <td className="py-3 px-4 text-xs text-slate-700 border-r border-slate-100">{row.org}</td>
                    <td className="py-3 px-3 text-center font-black text-amber-700 border-r border-slate-100">{row.award}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.docUrl, `Achievement Certificate - ${row.studentName} (${row.event})`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 14: YEAR-WISE ANNUAL ACTIVITY REPORTS (TABLE 13)       */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            14. Year-wise Annual Activity Reports
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center text-white font-black border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Total No. of Activities</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-44">Annual Activity Report</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">Supporting Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table13Data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row.sNo}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80 border-r border-slate-100">{row.count}</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf(row.reportUrl, `Annual Activity Report (${row.year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Report
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf(row.proofUrl, `Supporting Documents (${row.year}) - ${deptName}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Documents
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 15: PHOTO GALLERY (WITH YEAR & CAPTIONS)               */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              15. Photo Gallery
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
            <select
              value={galleryYear}
              onChange={(e) => setGalleryYear(e.target.value)}
              aria-label="Filter Photo Gallery Year"
              className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
              <option value="2023–2024">2023–2024</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-1">
          {filteredGallery.map((photo, idx) => (
            <div
              key={idx}
              onClick={() =>
                setLightboxData({
                  title: photo.title || `${deptName} Activity Photo`,
                  photos: filteredGallery,
                  currentIndex: idx
                })
              }
              className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer aspect-[16/11] relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.title || `${deptName} Photo`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="inline-flex items-center gap-1 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-xs border border-white/20">
                  <Maximize2 className="h-2.5 w-2.5 text-amber-300" /> Click to enlarge
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 pt-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end gap-0.5 z-10">
                <span className="text-white text-xs font-bold truncate drop-shadow-sm">
                  {photo.title || `${deptName} Activity`}
                </span>
                <span className="text-blue-200 text-[10px] font-medium">
                  {photo.date || photo.year || "Academic Year"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Document Preview Modal */}
      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Document Preview"}
      />

      {/* Interactive Lightbox Modal */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
          onClick={() => setLightboxData(null)}
        >
          <div
            className="bg-slate-950 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col relative border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 px-5 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2.5 truncate pr-3">
                {lightboxData.title && (
                  <span className="font-outfit font-bold text-sm text-white truncate">
                    {lightboxData.title}
                  </span>
                )}
                {lightboxData.photos.length > 1 && (
                  <span className="bg-white/10 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
                    {lightboxData.currentIndex + 1} / {lightboxData.photos.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setLightboxData(null)}
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close photo preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative h-[65vh] sm:h-[72vh] bg-black flex items-center justify-center overflow-hidden">
              {lightboxData.photos.length > 1 && (
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-90"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={lightboxData.currentIndex}
                src={lightboxData.photos[lightboxData.currentIndex]?.url}
                alt={lightboxData.title || "Department Photo"}
                className="max-h-full max-w-full object-contain animate-fadeIn"
              />

              {lightboxData.photos.length > 1 && (
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-90"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {lightboxData.photos.length > 1 && (
              <div className="p-2.5 px-4 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto">
                {lightboxData.photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setLightboxData((prev) => (prev ? { ...prev, currentIndex: idx } : null))
                    }
                    className={`h-10 w-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === lightboxData.currentIndex
                        ? "border-amber-400 scale-105 shadow-md"
                        : "border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
