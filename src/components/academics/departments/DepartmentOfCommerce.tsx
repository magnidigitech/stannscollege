"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Building, GraduationCap, Users, BookOpen, FileText, Handshake, 
  Trophy, BarChart3, ArrowRight, Calendar, Sparkles, ImageIcon, Award, X,
  ChevronLeft, ChevronRight, Images, Maximize2, ClipboardList, ExternalLink
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "@/components/academics/academics-data.json";
import { getDepartment } from "@/lib/sanity";

interface PhotoItem {
  url: string;
}

export function DepartmentOfCommerce() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Lightbox state for both Event Albums (slideshow) and Single Photos
  const [lightboxData, setLightboxData] = useState<{
    title?: string;
    photos: PhotoItem[];
    currentIndex: number;
  } | null>(null);

  // Curriculum & Learning Outcomes Dropdown States
  const [curriculumYear, setCurriculumYear] = useState<string>("2025–2026");
  const [curriculumProg, setCurriculumProg] = useState<string>("B.Com. Honours – General");
  const [dynamicDept, setDynamicDept] = useState<any>(null);

  useEffect(() => {
    getDepartment("department-of-commerce").then((data) => {
      if (data) setDynamicDept(data);
    }).catch((err) => console.error("Error loading commerce dynamic data:", err));
  }, []);

  const defaultProgrammes = [
    { sNo: 1, name: "B.Com. Honours – General", intake: "20", counseling: "14", management: "6" },
    { sNo: 2, name: "B.Com. Honours – Computer Applications", intake: "105", counseling: "74", management: "31" },
    { sNo: 3, name: "Bachelor of Business Administration (BBA)", intake: "-", counseling: "-", management: "-" }
  ];

  // Safeguard: only use dynamic programmes if they have valid counseling/management fields and all rows
  const hasValidDynamicProgrammes = Array.isArray(dynamicDept?.programmes) &&
    dynamicDept.programmes.length >= 3 &&
    dynamicDept.programmes.every((p: any) => p.counseling !== undefined && p.management !== undefined && p.counseling !== "");

  const programmes = hasValidDynamicProgrammes ? dynamicDept.programmes : defaultProgrammes;


  const staticDept = academicsData.departments.find((d: any) => d.id === "department-of-commerce");
  const overviewPdf = staticDept?.overviewDocUrl || "/documents/DefaultFile_1.pdf";

  const handleOpenPdf = (url: string, title: string) => {
    setPreviewUrl(url || "/documents/DefaultFile_1.pdf");
    setPreviewTitle(title);
  };

  // Authentic Commerce Gallery media (from data / uploads)
  const uploadedPhotos: string[] = (staticDept?.galleryImages && Array.isArray(staticDept.galleryImages) && staticDept.galleryImages.length > 0)
    ? staticDept.galleryImages
    : [];

  const dummyCollegePhoto: PhotoItem = {
    url: "/images/infrastructure/campus-buildings/img-1.jpg",
  };

  const hasUploadedPhotos = uploadedPhotos.length > 0;
  const galleryItems: PhotoItem[] = hasUploadedPhotos
    ? uploadedPhotos.map((url: string) => ({ url }))
    : [dummyCollegePhoto];

  // Lightbox keyboard navigation handler
  const handleNextPhoto = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData(prev => {
      if (!prev) return null;
      const nextIdx = (prev.currentIndex + 1) % prev.photos.length;
      return { ...prev, currentIndex: nextIdx };
    });
  }, [lightboxData]);

  const handlePrevPhoto = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData(prev => {
      if (!prev) return null;
      const prevIdx = (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length;
      return { ...prev, currentIndex: prevIdx };
    });
  }, [lightboxData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === "Escape") {
        setLightboxData(null);
      } else if (e.key === "ArrowRight") {
        handleNextPhoto();
      } else if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData, handleNextPhoto, handlePrevPhoto]);

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 animate-fadeIn font-sans pb-6">

      {/* ============================================================== */}
      {/* 1. DEPARTMENT HEADING (OPTION A: CLEAN SITE-WIDE HEADER)       */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-1.5 mb-1.5">
            <Building className="h-4 w-4 text-[#002147]" /> Academic Department
          </span>
          <h1 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-black text-[#002147] tracking-tight">
            Department of Commerce
          </h1>
          <div className="h-1 w-16 bg-[#002147] rounded-full mt-2.5"></div>
        </div>

        <button
          onClick={() => handleOpenPdf(overviewPdf, "Department of Commerce - Departmental Profile")}
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
        subtext="The Department of Commerce is committed to imparting quality education in commerce, accounting, finance, taxation and business management. It aims to develop students' analytical, entrepreneurial, managerial and financial skills to meet the evolving demands of the business world. Through a balanced blend of theoretical knowledge and practical learning, the department promotes innovation, digital literacy, ethical business practices and professional competence. It strives to empower students with the knowledge, skills and confidence required to excel in their careers and contribute meaningfully to society."
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
                {programmes.map((p: any, idx: number) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{p.sNo || idx + 1}</td>
                    <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{p.name || p.title}</td>
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
                Department of Commerce Faculty Directory
              </h3>
              <p className="text-xs text-slate-600 font-medium max-w-2xl leading-relaxed mt-0.5">
                Access full faculty profiles with academic qualifications, designations, experience, research specializations, and departmental portfolios on the centralized Department-Wise Faculty roster.
              </p>
            </div>
          </div>

          <Link
            href="/faculty/department-wise?dept=commerce"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-[#002147] hover:bg-[#00387a] transition-all shadow-xs active:scale-95 shrink-0"
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

          {/* 2 Cascading Dropdowns */}
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
                <option value="B.Com. Honours – General">B.Com. Honours – General</option>
                <option value="B.Com. Honours – Computer Applications">B.Com. Honours – Computer Applications</option>
              </select>
            </div>
          </div>
        </div>

        {/* 6-Row Document Table (Table 2) with Option 1 Banner */}
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
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">Programme Structure &amp; Curriculum</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Programme Structure & Curriculum - ${curriculumProg} (${curriculumYear})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View PDF
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">Programme Outcomes (POs)</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Programme Outcomes (POs) - ${curriculumProg} (${curriculumYear})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View PDF
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">3</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">Programme Specific Outcomes (PSOs)</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Programme Specific Outcomes (PSOs) - ${curriculumProg} (${curriculumYear})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View PDF
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">4</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">Course Structure &amp; Syllabus</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Course Structure & Syllabus - ${curriculumProg} (${curriculumYear})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Syllabus
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">5</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">Course Outcomes (COs)</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `Course Outcomes (COs) - ${curriculumProg} (${curriculumYear})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View PDF
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">6</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">CO–PO–PSO Mapping</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", `CO–PO–PSO Mapping - ${curriculumProg} (${curriculumYear})`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* OUTGOING BATCH – STUDENT STRENGTH AND PASS PERCENTAGE          */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Outgoing Batch – Student Strength and Pass Percentage
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        {/* 3 Sub-tables with Option 1 Matrix Styling */}
        <div className="flex flex-col gap-2.5">
          {/* B.Com Honours Computer Applications */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
              <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                B.Com. Honours – Computer Applications
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                    <th className="py-3 px-3 text-center w-12 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                    <th className="py-3 px-4 text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Sanctioned Intake</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Admitted</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Discontinued</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Appeared</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Passed</th>
                    <th className="py-3 px-3 text-center bg-blue-100/90 text-[#002147] font-black">Pass %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700 border-r border-slate-100">105</td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700 border-r border-slate-100">104</td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700 border-r border-slate-100">0</td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700 border-r border-slate-100">104</td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-700 border-r border-slate-100">98</td>
                    <td className="py-3 px-3 text-center bg-blue-50/80">
                      <span className="font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
                        94.23%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* B.Com General */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
              <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                B.Com. Honours – General
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                    <th className="py-3 px-3 text-center w-12 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                    <th className="py-3 px-4 text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Sanctioned Intake</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Admitted</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Discontinued</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Appeared</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Passed</th>
                    <th className="py-3 px-3 text-center bg-blue-100/90 text-[#002147] font-black">Pass %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BBA */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
              <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                Bachelor of Business Administration (BBA)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                    <th className="py-3 px-3 text-center w-12 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                    <th className="py-3 px-4 text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Sanctioned Intake</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Admitted</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Discontinued</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Appeared</th>
                    <th className="py-3 px-3 text-center text-slate-700 font-bold border-r border-slate-200">Passed</th>
                    <th className="py-3 px-3 text-center bg-blue-100/90 text-[#002147] font-black">Pass %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-3 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* YEAR-WISE PLACEMENT SUMMARY                                    */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2.5">
        <div>
          <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
            Year-wise Placement Summary
          </h2>
          <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* B.Com Computer Applications */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
              <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                B.Com. Honours – Computer Applications
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                    <th className="py-3 px-4 text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                    <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Final Year Students</th>
                    <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Students Placed</th>
                    <th className="py-3 px-4 text-center bg-blue-100/90 text-[#002147] font-black">Placement %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">60</td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">48</td>
                    <td className="py-3 px-4 text-center bg-blue-50/80">
                      <span className="font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        80%
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">60</td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">46</td>
                    <td className="py-3 px-4 text-center bg-blue-50/80">
                      <span className="font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        77%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* B.Com General */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
              <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                B.Com. Honours – General
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                    <th className="py-3 px-4 text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                    <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Final Year Students</th>
                    <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Students Placed</th>
                    <th className="py-3 px-4 text-center bg-blue-100/90 text-[#002147] font-black">Placement %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BBA */}
          <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-3 px-4 sm:px-5 border-b border-[#001733] bg-[#002147] text-white">
              <h3 className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                Bachelor of Business Administration (BBA)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                    <th className="py-3 px-4 text-[#002147] font-black border-r border-slate-200">Academic Year</th>
                    <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Final Year Students</th>
                    <th className="py-3 px-4 text-center text-slate-700 font-bold border-r border-slate-200">Students Placed</th>
                    <th className="py-3 px-4 text-center bg-blue-100/90 text-[#002147] font-black">Placement %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center text-slate-400 border-r border-slate-100">-</td>
                    <td className="py-3 px-4 text-center font-black text-[#002147] bg-blue-50/80">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "MoU Document - Organization 1")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View MoU
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "MoU Activity Report - Organization 1")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Activity Report
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "MoU Document - Organization 2")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View MoU
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "MoU Activity Report - Organization 2")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Activity Report
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">3</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "MoU Document - Organization 3")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View MoU
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "MoU Activity Report - Organization 3")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Activity Report
                    </button>
                  </td>
                </tr>
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
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Activity Report 1")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Report
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Activity Report 2")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Report
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">3</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Activity Report 3")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Report
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STUDENT EXTERNAL ACHIEVEMENTS                                  */}
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
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Certificate - Achievement 1")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Certificate - Achievement 2")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">3</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Certificate - Achievement 3")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  </td>
                </tr>
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
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Certificate - University Rank 1")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Certificate - University Rank 2")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">3</td>
                  <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">-</td>
                  <td className="py-3 px-5 font-medium text-slate-800 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Certificate - University Rank 3")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Certificate
                    </button>
                  </td>
                </tr>
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
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">1</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">2025–2026</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Annual Activity Report (2025–2026)")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Report
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Supporting Documents (2025–2026)")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Documents
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">2</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">2024–2025</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Annual Activity Report (2024–2025)")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Report
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Supporting Documents (2024–2025)")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Documents
                    </button>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">3</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900 border-r border-slate-100">2023–2024</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-700 border-r border-slate-100">-</td>
                  <td className="py-3 px-4 text-center border-r border-slate-100">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Annual Activity Report (2023–2024)")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Report
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenPdf("/documents/DefaultFile_1.pdf", "Supporting Documents (2023–2024)")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Documents
                    </button>
                  </td>
                </tr>
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
                    title: "Department of Commerce Photo",
                    photos: galleryItems,
                    currentIndex: idx
                  })
                }
                className="bg-slate-100 border border-slate-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer aspect-[4/3] relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={`Commerce Photo ${idx + 1}`}
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

      {/* ============================================================== */}
      {/* INTERACTIVE LIGHTBOX MODAL WITH FULL SLIDESHOW CONTROLS        */}
      {/* ============================================================== */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
          onClick={() => setLightboxData(null)}
        >
          <div
            className="bg-slate-950 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col relative border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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

            {/* Modal Image Area with Navigation Buttons */}
            <div className="relative h-[65vh] sm:h-[72vh] bg-black flex items-center justify-center overflow-hidden">
              {/* Previous Button */}
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
                alt={lightboxData.title || "Commerce Gallery Photo"}
                className="max-h-full max-w-full object-contain animate-fadeIn"
              />

              {/* Next Button */}
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

            {/* Mini Thumbnail Strip for Multi-Photo Albums */}
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
