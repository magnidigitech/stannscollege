"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Building, Users, FileText, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2, ExternalLink 
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "@/components/academics/academics-data.json";
import { getDepartment } from "@/lib/sanity";

interface PhotoItem {
  url: string;
}

interface ProgrammeItem {
  sNo: number;
  name: string;
  intake: string | number;
  counseling: string | number;
  management: string | number;
}

const departmentProgrammesMap: Record<string, ProgrammeItem[]> = {
  "department-of-computer-science-applications": [
    { sNo: 1, name: "BCA Honours – Computer Applications", intake: 60, counseling: 42, management: 18 },
    { sNo: 2, name: "B.Sc. Honours – Computer Science", intake: 35, counseling: 25, management: 10 },
    { sNo: 3, name: "B.Sc. Honours – Artificial Intelligence", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-mathematics": [
    { sNo: 1, name: "B.Sc. Honours – Mathematics", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-physics": [
    { sNo: 1, name: "B.Sc. Honours – Physics", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-statistics": [
    { sNo: 1, name: "B.Sc. Honours – Statistics", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-biotechnology": [
    { sNo: 1, name: "B.Sc. Honours – Biotechnology", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-microbiology": [
    { sNo: 1, name: "B.Sc. Honours – Microbiology", intake: 25, counseling: 18, management: 7 }
  ],
  "department-of-botany": [
    { sNo: 1, name: "B.Sc. Honours – Botany", intake: "-", counseling: "-", management: "-" }
  ],
  "department-of-chemistry": [
    { sNo: 1, name: "B.Sc. Honours – Chemistry", intake: 20, counseling: 14, management: 6 }
  ],
  "department-of-english": [
    { sNo: 1, name: "B.A. Honours – English Literature", intake: "-", counseling: "-", management: "-" }
  ],
  "department-of-oriental-languages": [
    { sNo: 1, name: "Language Programmes (Telugu, Sanskrit, Hindi)", intake: "-", counseling: "-", management: "-" }
  ],
  "department-of-mca": [
    { sNo: 1, name: "MCA – Master of Computer Applications", intake: 60, counseling: 42, management: 18 }
  ],
  "department-of-mba": [
    { sNo: 1, name: "MBA – Master of Business Administration", intake: 60, counseling: 42, management: 18 }
  ]
};

const deptToFacultySlugMap: Record<string, string> = {
  "department-of-commerce": "commerce",
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
  "department-of-oriental-languages": "oriental-languages",
  "department-of-oriental-languages-telugu-sanskrit-hindi": "oriental-languages",
  "department-of-mca": "mca",
  "department-of-mba": "mba",
};

interface DepartmentDetailProps {
  itemSlug: string;
}

export function DepartmentDetail({ itemSlug }: DepartmentDetailProps) {
  let normalizedSlug = itemSlug;
  if (itemSlug === "department-of-computer-applications-bca" || itemSlug === "department-of-computer-science-cs-artificial-intelligence") {
    normalizedSlug = "department-of-computer-science-applications";
  } else if (itemSlug === "department-of-oriental-languages-telugu-sanskrit-hindi") {
    normalizedSlug = "department-of-oriental-languages";
  }

  const staticDept = academicsData.departments.find((d: any) => d.id === normalizedSlug || d.id === itemSlug);

  const deptName = staticDept?.name || "Academic Department";
  const introParagraph = staticDept?.description || `The ${deptName} is committed to academic excellence, state-of-the-art experiential learning, and preparing women students for impactful leadership and distinguished careers.`;
  const overviewPdf = staticDept?.overviewDocUrl || "/documents/DefaultFile_1.pdf";

  const [dynamicDept, setDynamicDept] = useState<any>(null);

  useEffect(() => {
    getDepartment(normalizedSlug).then((data) => {
      if (data) setDynamicDept(data);
    }).catch((err) => console.error("Error loading department dynamic data:", err));
  }, [normalizedSlug]);

  const defaultProgrammes: ProgrammeItem[] = departmentProgrammesMap[normalizedSlug] || [
    { sNo: 1, name: `${deptName} Honours Programme`, intake: "-", counseling: "-", management: "-" }
  ];

  const hasValidDynamicProgrammes = Array.isArray(dynamicDept?.programmes) &&
    dynamicDept.programmes.length > 0 &&
    dynamicDept.programmes.every((p: any) => p.counseling !== undefined && p.management !== undefined && p.intake !== "TBD");

  const programmes: ProgrammeItem[] = hasValidDynamicProgrammes ? dynamicDept.programmes : defaultProgrammes;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const [curriculumYear, setCurriculumYear] = useState<string>("2025–2026");
  const [curriculumProg, setCurriculumProg] = useState<string>(programmes[0]?.name || "Undergraduate Programme");

  // Keep curriculumProg synced if department changes
  useEffect(() => {
    if (programmes[0]?.name) {
      setCurriculumProg(programmes[0].name);
    }
  }, [normalizedSlug]);

  const [lightboxData, setLightboxData] = useState<{
    title?: string;
    photos: PhotoItem[];
    currentIndex: number;
  } | null>(null);

  const handleOpenPdf = (url: string, title: string) => {
    setPreviewUrl(url || "/documents/DefaultFile_1.pdf");
    setPreviewTitle(title);
  };

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

  // Gallery images support (from static data or dummy fallback)
  const uploadedPhotos: string[] = (staticDept?.galleryImages && Array.isArray(staticDept.galleryImages) && staticDept.galleryImages.length > 0)
    ? staticDept.galleryImages
    : [];

  const dummyCollegePhoto: PhotoItem = {
    url: "/images/infrastructure/campus-buildings/img-1.jpg"
  };

  const hasUploadedPhotos = uploadedPhotos.length > 0;
  const galleryItems: PhotoItem[] = hasUploadedPhotos
    ? uploadedPhotos.map((url: string) => ({ url }))
    : [dummyCollegePhoto];

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-fadeIn font-sans pb-12">

      {/* ============================================================== */}
      {/* 1. DEPARTMENT HEADING (Option A - Standard Site-Wide Header)    */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-[#002147]" /> Academic Department
          </span>
          <h1 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
            {deptName}
          </h1>
          <div className="h-1 w-16 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <button
          onClick={() => handleOpenPdf(overviewPdf, `${deptName} - Departmental Profile`)}
          className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#00387a] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <FileText className="h-4 w-4" /> View Departmental Profile (PDF)
        </button>
      </div>

      {/* ============================================================== */}
      {/* 2. QUOTE BOX WITH AUTHENTIC INTRO PARAGRAPH                    */}
      {/* ============================================================== */}
      <SubtextBox
        className="!p-4 sm:!p-5 !rounded-2xl"
        subtext={introParagraph}
      />

      {/* ============================================================== */}
      {/* PROGRAMMES OFFERED                                             */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Programmes Offered
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Programme</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">Sanctioned Intake</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Counseling Seats</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold">Management Seats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programmes.map((p, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{p.sNo}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{p.name}</td>
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
      {/* FACULTY DIRECTORY                                              */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Faculty Directory
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
                Access full faculty profiles with academic qualifications, designations, experience, research specializations, and departmental portfolios on the centralized Department-Wise Faculty roster.
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
      {/* CURRICULUM & LEARNING OUTCOMES                                 */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              Curriculum &amp; Learning Outcomes
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year:</span>
              <select
                value={curriculumYear}
                onChange={(e) => setCurriculumYear(e.target.value)}
                aria-label="Select Academic Year"
                className="bg-white border-2 border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#002147] shadow-xs cursor-pointer focus:outline-none focus:border-[#002147]"
              >
                <option value="2026–2027">2026–2027</option>
                <option value="2025–2026">2025–2026</option>
                <option value="2024–2025">2024–2025</option>
              </select>
            </div>

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
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              {curriculumProg} ({curriculumYear})
            </span>
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
                  "Programme Structure & Curriculum",
                  "Course Outcomes (COs)",
                  "Programme Outcomes (POs) & PSOs",
                  "Course Evaluation Scheme & Weightage",
                  "Learning Resources & Textbooks",
                  "Academic Regulations & Grading"
                ].map((particular, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{particular}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `${particular} - ${curriculumProg}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Document
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
      {/* OUTGOING BATCH – STUDENT STRENGTH AND PASS PERCENTAGE          */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Outgoing Batch – Student Strength and Pass Percentage
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="flex flex-col gap-3">
          {programmes.map((p, pIdx) => (
            <div key={pIdx} className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
                <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  {p.name}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                      <th className="py-3 px-4 text-center text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                      <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Number of Final Year Students</th>
                      <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Number of Students Passed</th>
                      <th className="py-3 px-4 text-center bg-blue-100/90 text-[#002147] font-black">Pass Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { year: "2024–2025", students: "-", passed: "-", percent: "-" },
                      { year: "2023–2024", students: "-", passed: "-", percent: "-" },
                      { year: "2022–2023", students: "-", passed: "-", percent: "-" }
                    ].map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                        <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{rIdx + 1}</td>
                        <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.students}</td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.passed}</td>
                        <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">{row.percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* YEAR-WISE PLACEMENT SUMMARY                                    */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Year-wise Placement Summary
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="flex flex-col gap-3">
          {programmes.map((p, pIdx) => (
            <div key={pIdx} className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
                <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  {p.name}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                      <th className="py-3 px-4 text-center text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                      <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Number of Students Placed</th>
                      <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Highest Salary (LPA)</th>
                      <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Average Salary (LPA)</th>
                      <th className="py-3 px-4 text-center bg-blue-100/90 text-[#002147] font-black">Placement Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { year: "2024–2025", placed: "-", highest: "-", avg: "-", percent: "-" },
                      { year: "2023–2024", placed: "-", highest: "-", avg: "-", percent: "-" },
                      { year: "2022–2023", placed: "-", highest: "-", avg: "-", percent: "-" }
                    ].map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                        <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{rIdx + 1}</td>
                        <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.placed}</td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.highest}</td>
                        <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.avg}</td>
                        <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">{row.percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOUS – MEMORANDUM OF UNDERSTANDING                             */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            MOUs – Memorandum of Understanding
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Organization</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Duration / Validity Period</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-36">MoU Documents</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">MoU Activity Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `MoU Document - Organization ${row}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View MoU
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `MoU Activity Report - Organization ${row}`)}
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
      {/* ACTIVITIES, EVENTS, PROGRAMMES & CELEBRATIONS                  */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Activities, Events, Programmes &amp; Celebrations
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Title of Activity / Event</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Date</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">No. of Participants</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-40">Activity Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Activity Report ${row}`)}
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
      {/* STUDENT EXTERNAL ACHIEVEMENTS, PARTICIPATION & REPRESENTATION   */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Student External Achievements, Participation &amp; Representation
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Student</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Activity / Event</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">State / National / Inter-University</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Prize / Participation</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-36">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                    <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Certificate - Achievement ${row}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Certificate
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
      {/* UNIVERSITY RANKS & ACADEMIC ACHIEVEMENTS                       */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            University Ranks &amp; Academic Achievements
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Student</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Programme</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">University Rank / Gold Medal</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Academic Year</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-36">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{row}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                    <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Certificate - University Rank ${row}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Certificate
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
      {/* YEAR-WISE ANNUAL ACTIVITY REPORTS                              */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-1.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Year-wise Annual Activity Reports
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
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Number of Activities Conducted</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 border-r border-[#003366] w-40">Annual Activity Report</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-100 w-44">Supporting Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { year: "2025–2026", count: "-" },
                  { year: "2024–2025", count: "-" },
                  { year: "2023–2024", count: "-" }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{idx + 1}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">{row.year}</td>
                    <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">{row.count}</td>
                    <td className="py-3 px-4 text-center border-r border-slate-100">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Annual Activity Report (${row.year})`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                      >
                        <FileText className="h-3.5 w-3.5" /> View Report
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Supporting Documents (${row.year})`)}
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
      {/* CUSTOM DEPARTMENT TABLES                                       */}
      {/* ============================================================== */}
      {Array.isArray(dynamicDept?.customTables) && dynamicDept.customTables.length > 0 && (
        dynamicDept.customTables.map((tbl: any, tblIdx: number) => {
          const columns: string[] = Array.isArray(tbl.columns) ? tbl.columns : [];
          const rows: any[] = Array.isArray(tbl.rows) ? tbl.rows : [];
          if (columns.length === 0 && rows.length === 0) return null;

          return (
            <div key={tbl.id || tbl._key || tblIdx} className="flex flex-col gap-1.5">
              <div>
                <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
                  {tbl.title || `Additional Table ${tblIdx + 1}`}
                </h2>
                {tbl.description && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{tbl.description}</p>
                )}
                <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
              </div>

              <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                    <thead>
                      <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                        {columns.map((colName, cIdx) => (
                          <th
                            key={cIdx}
                            className={`py-3 px-4 ${
                              cIdx === 0 && (colName.toLowerCase().includes("s. no") || colName.toLowerCase().includes("sno"))
                                ? "w-14 text-center border-r border-[#003366] text-blue-100"
                                : cIdx === columns.length - 1
                                ? "text-center text-blue-100"
                                : "border-r border-[#003366] text-blue-100"
                            }`}
                          >
                            {colName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={columns.length || 1} className="py-6 text-center text-xs text-slate-400 italic">
                            No records published in this table yet.
                          </td>
                        </tr>
                      ) : (
                        rows.map((rowItem: any, rIdx: number) => {
                          const cells: string[] = Array.isArray(rowItem)
                            ? rowItem
                            : Array.isArray(rowItem?.cells)
                            ? rowItem.cells
                            : [];
                          const isEven = rIdx % 2 === 1;

                          return (
                            <tr
                              key={rowItem._key || rIdx}
                              className={`${isEven ? "bg-slate-50/60" : "bg-white"} hover:bg-blue-50/40 transition-colors`}
                            >
                              {columns.map((colName, cIdx) => {
                                const rawVal = cells[cIdx] || "";
                                const trimmed = typeof rawVal === "string" ? rawVal.trim() : String(rawVal || "");
                                const isDoc =
                                  trimmed.endsWith(".pdf") ||
                                  trimmed.startsWith("/documents/") ||
                                  trimmed.startsWith("/uploads/") ||
                                  trimmed.includes(".pdf?") ||
                                  trimmed.includes("drive.google.com");
                                const isWebUrl = !isDoc && (trimmed.startsWith("http://") || trimmed.startsWith("https://"));
                                const isSno = cIdx === 0 && (colName.toLowerCase().includes("s. no") || colName.toLowerCase().includes("sno"));

                                return (
                                  <td
                                    key={cIdx}
                                    className={`py-3 px-4 ${
                                      cIdx < columns.length - 1 ? "border-r border-slate-100" : ""
                                    } ${isSno ? "text-center font-bold text-slate-500" : ""}`}
                                  >
                                    {isDoc ? (
                                      <div className="flex justify-center">
                                        <button
                                          onClick={() => handleOpenPdf(trimmed, `${colName} - ${tbl.title || "Document"}`)}
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                                        >
                                          <FileText className="h-3.5 w-3.5" /> View Document
                                        </button>
                                      </div>
                                    ) : isWebUrl ? (
                                      <div className="flex justify-center">
                                        <a
                                          href={trimmed}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
                                        >
                                          Visit Link <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                      </div>
                                    ) : (
                                      <span className={isSno ? "text-slate-500 font-bold" : "text-slate-800 font-medium"}>
                                        {trimmed || "-"}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* ============================================================== */}
      {/* PHOTO GALLERY                                                  */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Photo Gallery
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        {hasUploadedPhotos ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-1">
            {galleryItems.map((photo, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setLightboxData({
                    title: `${deptName} Photo`,
                    photos: galleryItems,
                    currentIndex: idx
                  })
                }
                className="bg-slate-100 border border-slate-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer aspect-[4/3] relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={`${deptName} Photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/40 text-white backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* When empty: show exactly 1 college dummy photo so it won't appear empty */
          <div className="mt-1 max-w-sm sm:max-w-md w-full">
            <div
              onClick={() =>
                setLightboxData({
                  title: "St. Ann's College for Women – Main Campus",
                  photos: [dummyCollegePhoto],
                  currentIndex: 0
                })
              }
              className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer aspect-[16/10] relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dummyCollegePhoto.url}
                alt="St. Ann's College for Women Campus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 right-2.5 z-10">
                <span className="inline-flex items-center gap-1 bg-[#002147]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-xs border border-white/20">
                  <Maximize2 className="h-3 w-3 text-amber-300" /> Click to enlarge
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 pt-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between gap-2 z-10">
                <span className="text-white text-xs sm:text-sm font-bold truncate drop-shadow-sm">
                  St. Ann’s College for Women – Main Campus
                </span>
              </div>
            </div>
          </div>
        )}
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
