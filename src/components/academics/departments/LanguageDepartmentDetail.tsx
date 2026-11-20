"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { 
  Building, Users, FileText, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2, 
  ExternalLink, Calendar, Award, BookOpen, GraduationCap, Briefcase, Trophy, FileCheck,
  CheckCircle2, Filter
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

interface LanguageDepartmentDetailProps {
  itemSlug: string;
}

export function LanguageDepartmentDetail({ itemSlug }: LanguageDepartmentDetailProps) {
  // Normalize slug
  let normalizedSlug = itemSlug;
  if (itemSlug === "department-of-telugu-wing" || itemSlug === "department-of-oriental-languages-telugu-sanskrit-hindi") {
    normalizedSlug = "department-of-telugu";
  } else if (itemSlug === "department-of-sanskrit-hindi-wing" || itemSlug === "department-of-oriental-languages") {
    normalizedSlug = "department-of-sanskrit-hindi";
  }

  const staticDept = academicsData.departments.find(
    (d: any) => d.id === normalizedSlug || d.id === itemSlug || (normalizedSlug === "department-of-telugu" && d.id === "department-of-telugu-wing") || (normalizedSlug === "department-of-sanskrit-hindi" && d.id === "department-of-sanskrit-hindi-wing")
  );

  const isEnglish = normalizedSlug === "department-of-english";
  const isTelugu = normalizedSlug === "department-of-telugu" || itemSlug === "department-of-telugu-wing";
  const isSanskritHindi = normalizedSlug === "department-of-sanskrit-hindi" || itemSlug === "department-of-sanskrit-hindi-wing" || normalizedSlug === "department-of-oriental-languages";

  const languageLabel = isEnglish ? "English" : isTelugu ? "Telugu" : "Sanskrit & Hindi";
  const languageAdjective = isEnglish ? "English Language" : isTelugu ? "Telugu Language" : "Sanskrit & Hindi Language";

  const deptName = staticDept?.name || (isEnglish ? "English" : isTelugu ? "Telugu" : "Sanskrit & Hindi");
  const deptSubtext = "(Under the Department of Oriental Languages)";
  const introParagraph = staticDept?.description || "";
  const overviewPdf = staticDept?.overviewDocUrl || "/documents/DefaultFile_1.pdf";

  const [dynamicDept, setDynamicDept] = useState<any>(null);

  useEffect(() => {
    getDepartment(normalizedSlug)
      .then((data) => {
        if (data) setDynamicDept(data);
      })
      .catch((err) => console.error("Error loading department dynamic data:", err));
  }, [normalizedSlug]);

  // Modals state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const handleOpenPdf = (url: string, title: string) => {
    setPreviewUrl(url || "/documents/DefaultFile_1.pdf");
    setPreviewTitle(title);
  };

  // --------------------------------------------------------------------------
  // ACADEMIC YEAR DROPDOWNS & FILTERS
  // --------------------------------------------------------------------------
  const [curriculumYear, setCurriculumYear] = useState<string>("2025–2026");
  const [resultsYear, setResultsYear] = useState<string>("All");
  const [achievementsYear, setAchievementsYear] = useState<string>("All");
  const [activitiesYear, setActivitiesYear] = useState<string>("All");
  const [bestPracticesYear, setBestPracticesYear] = useState<string>("All");
  const [coursesYear, setCoursesYear] = useState<string>("All");
  const [annualReportsYear, setAnnualReportsYear] = useState<string>("All");
  const [galleryYear, setGalleryYear] = useState<string>("All");

  // Faculty target slug
  const facultyQueryParam = isEnglish ? "english" : "oriental-languages";

  // --------------------------------------------------------------------------
  // TABLE 2: CURRICULUM DOCUMENTS
  // --------------------------------------------------------------------------
  const curriculumDocs = [
    { sNo: 1, particular: `${languageAdjective} Course Structure (Programme-wise / Semester-wise)`, btnText: "View PDF" },
    { sNo: 2, particular: `${languageAdjective} Course-wise Syllabus`, btnText: "View PDF" },
    { sNo: 3, particular: "Course Outcomes (COs) – Semester-wise", btnText: "View PDF" },
    { sNo: 4, particular: "Teaching-Learning Resources and Materials", btnText: "View PDF" }
  ];

  // --------------------------------------------------------------------------
  // TABLE 3: STUDENT STRENGTH, RESULTS & PASS PERCENTAGE
  // --------------------------------------------------------------------------
  const allResults = useMemo(() => {
    if (dynamicDept?.passPercentage && Array.isArray(dynamicDept.passPercentage) && dynamicDept.passPercentage.length > 0) {
      return dynamicDept.passPercentage;
    }
    return (staticDept as any)?.results || [];
  }, [dynamicDept, staticDept]);

  const filteredResults = useMemo(() => {
    if (resultsYear === "All") return allResults;
    return allResults.filter((r: any) => r.year === resultsYear);
  }, [allResults, resultsYear]);

  // --------------------------------------------------------------------------
  // TABLE 4: STUDENT ACHIEVEMENTS IN LANGUAGE & LITERARY ACTIVITIES
  // --------------------------------------------------------------------------
  const allAchievements = useMemo(() => {
    if (dynamicDept?.studentAchievements && Array.isArray(dynamicDept.studentAchievements) && dynamicDept.studentAchievements.length > 0) {
      return dynamicDept.studentAchievements;
    }
    return (staticDept as any)?.achievements || [];
  }, [dynamicDept, staticDept]);

  const filteredAchievements = useMemo(() => {
    if (achievementsYear === "All") return allAchievements;
    return allAchievements.filter((a: any) => a.year === achievementsYear);
  }, [allAchievements, achievementsYear]);

  // --------------------------------------------------------------------------
  // TABLE 5: DEPARTMENTAL ACTIVITIES, EVENTS, PROGRAMMES & CELEBRATIONS
  // --------------------------------------------------------------------------
  const allActivities = useMemo(() => {
    if (dynamicDept?.activitiesList && Array.isArray(dynamicDept.activitiesList) && dynamicDept.activitiesList.length > 0) {
      return dynamicDept.activitiesList;
    }
    return (staticDept as any)?.activities || [];
  }, [dynamicDept, staticDept]);

  const filteredActivities = useMemo(() => {
    if (activitiesYear === "All") return allActivities;
    return allActivities.filter((act: any) => act.year === activitiesYear);
  }, [allActivities, activitiesYear]);

  // --------------------------------------------------------------------------
  // TABLE 6: DEPARTMENTAL BEST PRACTICES
  // --------------------------------------------------------------------------
  const allBestPractices = useMemo(() => {
    if (dynamicDept?.bestPractices && Array.isArray(dynamicDept.bestPractices) && dynamicDept.bestPractices.length > 0) {
      return dynamicDept.bestPractices;
    }
    return (staticDept as any)?.bestPractices || [];
  }, [dynamicDept, staticDept]);

  const filteredBestPractices = useMemo(() => {
    if (bestPracticesYear === "All") return allBestPractices;
    return allBestPractices.filter((bp: any) => bp.year === bestPracticesYear);
  }, [allBestPractices, bestPracticesYear]);

  // --------------------------------------------------------------------------
  // TABLE 7: ADD-ON / VALUE-ADDED / CERTIFICATE COURSES
  // --------------------------------------------------------------------------
  const allCourses = useMemo(() => {
    if (dynamicDept?.certificateCourses && Array.isArray(dynamicDept.certificateCourses) && dynamicDept.certificateCourses.length > 0) {
      return dynamicDept.certificateCourses;
    }
    return (staticDept as any)?.certificateCourses || [];
  }, [dynamicDept, staticDept]);

  const filteredCourses = useMemo(() => {
    if (coursesYear === "All") return allCourses;
    return allCourses.filter((c: any) => c.year === coursesYear);
  }, [allCourses, coursesYear]);

  // --------------------------------------------------------------------------
  // TABLE 8: MEMORANDA OF UNDERSTANDING (MOUS) & COLLABORATIONS
  // --------------------------------------------------------------------------
  const mousList = useMemo(() => {
    if (dynamicDept?.mous && Array.isArray(dynamicDept.mous) && dynamicDept.mous.length > 0) {
      return dynamicDept.mous;
    }
    return (staticDept as any)?.mous || [];
  }, [dynamicDept, staticDept]);

  // --------------------------------------------------------------------------
  // TABLE 9: YEAR-WISE ANNUAL ACTIVITY REPORTS
  // --------------------------------------------------------------------------
  const allAnnualReports = useMemo(() => {
    if (dynamicDept?.annualReports && Array.isArray(dynamicDept.annualReports) && dynamicDept.annualReports.length > 0) {
      return dynamicDept.annualReports;
    }
    return (staticDept as any)?.annualReports || [];
  }, [dynamicDept, staticDept]);

  const filteredAnnualReports = useMemo(() => {
    if (annualReportsYear === "All") return allAnnualReports;
    return allAnnualReports.filter((ar: any) => ar.year === annualReportsYear);
  }, [allAnnualReports, annualReportsYear]);

  // --------------------------------------------------------------------------
  // TABLE 10: PHOTO GALLERY & LIGHTBOX
  // --------------------------------------------------------------------------
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

    // High quality themed fallbacks for Language Wings
    if (isEnglish) {
      return [
        {
          url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800",
          year: "2025–2026",
          title: "English Literary Fest & Shakespeare Dramatics",
          date: "23/04/2025"
        },
        {
          url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800",
          year: "2025–2026",
          title: "Communicative English & Phonetics Lab Session",
          date: "18/09/2025"
        },
        {
          url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800",
          year: "2024–2025",
          title: "State-Level Elocution & Debate Championship",
          date: "12/12/2024"
        }
      ];
    } else if (isTelugu) {
      return [
        {
          url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800",
          year: "2025–2026",
          title: "Telugu Bhasha Dinotsavam & Gidugu Jayanthi Celebrations",
          date: "29/08/2025"
        },
        {
          url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
          year: "2025–2026",
          title: "Kavi Sammelanam & Mother Language Day Recitations",
          date: "21/02/2025"
        },
        {
          url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800",
          year: "2024–2025",
          title: "Manuscript Heritage Exhibition & Classical Poetry Meet",
          date: "10/11/2024"
        }
      ];
    } else {
      return [
        {
          url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800",
          year: "2025–2026",
          title: "Hindi Diwas Celebrations & National Language Literary Meet",
          date: "14/09/2025"
        },
        {
          url: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=800",
          year: "2025–2026",
          title: "Sanskrit Dinotsavam & Classical Vedic Chanting",
          date: "19/08/2025"
        },
        {
          url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800",
          year: "2024–2025",
          title: "Samskrita Sambhashana Sibiram (Spoken Sanskrit Workshop)",
          date: "05/01/2025"
        }
      ];
    }
  }, [staticDept, deptName, isEnglish, isTelugu]);

  const filteredPhotos = useMemo(() => {
    if (galleryYear === "All") return uploadedPhotos;
    return uploadedPhotos.filter(p => p.year === galleryYear);
  }, [uploadedPhotos, galleryYear]);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn font-sans pb-16">

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

          {/* Subtext rendered for all language wings as requested */}
          <div className="mt-0.5">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 italic bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              {deptSubtext}
            </span>
          </div>

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
      {/* SECTION 1: FACULTY DIRECTORY                                   */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              1. Faculty Directory
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#002147]/5 via-blue-50/50 to-slate-50 border-2 border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-[#002147] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-outfit text-base sm:text-lg font-bold text-[#002147]">
                {deptName} Faculty Profiles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
                Explore qualifications, academic experience, publications, and profiles of faculty members guiding {languageLabel} courses across programmes.
              </p>
            </div>
          </div>

          <Link
            href={`/faculty?dept=${facultyQueryParam}`}
            className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#00387a] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95 shrink-0 self-stretch sm:self-auto justify-center"
          >
            <span>View Faculty Profiles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 2: CURRICULUM & LEARNING OUTCOMES                       */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              2. Curriculum &amp; Learning Outcomes
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          {/* Academic Year Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="curriculumYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">
              Academic Year:
            </label>
            <select
              id="curriculumYearSelect"
              value={curriculumYear}
              onChange={(e) => setCurriculumYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="2026–2027">2026–2027</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-16 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Particulars</th>
                  <th className="py-3 px-4 text-center w-36 text-blue-100 font-bold">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {curriculumDocs.map((item, idx) => {
                  const docItem = dynamicDept?.curriculumByYear?.[curriculumYear]?.find((d: any) => d.sNo === item.sNo)
                    || (Array.isArray(dynamicDept?.curriculumDocuments) && (dynamicDept.curriculumDocuments.find((d: any) => d.year === curriculumYear && d.sNo === item.sNo) || dynamicDept.curriculumDocuments[idx]));
                  const targetDoc = docItem?.documentUrl || "/documents/DefaultFile_1.pdf";
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{item.sNo}</td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800 border-r border-slate-200/80">
                        {item.particular} ({curriculumYear})
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleOpenPdf(targetDoc, `${deptName} - ${item.particular} (${curriculumYear})`)}
                          className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#00387a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>{item.btnText}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 3: STUDENT STRENGTH, RESULTS & PASS PERCENTAGE         */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              3. Student Strength, Results &amp; Pass Percentage
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Course-wise results of {languageLabel} language courses offered across various programmes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="resultsYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="resultsYearSelect"
              value={resultsYear}
              onChange={(e) => setResultsYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
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
                  <th className="py-3 px-4 text-white font-black border-r border-[#003366]">Name of the Course</th>
                  <th className="py-3 px-4 text-blue-100 font-bold border-r border-[#003366]">Programme / Class</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Semester</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Appeared</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Passed</th>
                  <th className="py-3 px-3 text-center bg-[#001733] text-emerald-300 font-black">Pass %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-slate-500 font-medium">No results data found.</td>
                  </tr>
                ) : (
                  filteredResults.map((r: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{r.year}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 border-r border-slate-200/80">{r.courseName || r.programme || "Language Course"}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 border-r border-slate-200/80">{r.programme || "B.Sc / B.Com / BCA"}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{r.semester || "Sem I & II"}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80">{r.appeared || "—"}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80">{r.passed || "—"}</td>
                      <td className="py-3.5 px-3 text-center font-black text-emerald-700 bg-emerald-50/50">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                          {r.passPercentage || "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 4: STUDENT ACHIEVEMENTS IN LANGUAGE & LITERARY ACT.    */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              4. Student Achievements in {languageLabel} Language &amp; Literary Activities
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Awards, accolades, and participation of students in literary competitions, elocution, poetry recitation, and state/university fests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="achievementsYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="achievementsYearSelect"
              value={achievementsYear}
              onChange={(e) => setAchievementsYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-12 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Year</th>
                  <th className="py-3 px-4 text-white font-black border-r border-[#003366]">Name of the Student</th>
                  <th className="py-3 px-3 text-blue-100 font-bold border-r border-[#003366]">Class</th>
                  <th className="py-3 px-4 text-blue-100 font-bold border-r border-[#003366]">Achievement / Participation</th>
                  <th className="py-3 px-4 text-blue-100 font-bold border-r border-[#003366]">Event / Competition</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Level</th>
                  <th className="py-3 px-4 text-center bg-[#001733] text-amber-300 font-black border-r border-[#003366]">Award / Recognition</th>
                  <th className="py-3 px-3 text-center w-28 text-blue-100 font-bold">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAchievements.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-6 text-center text-slate-500 font-medium">No achievement records found.</td>
                  </tr>
                ) : (
                  filteredAchievements.map((ach: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{ach.year}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 border-r border-slate-200/80">{ach.studentName || ach.name}</td>
                      <td className="py-3.5 px-3 font-medium text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{ach.programme || ach.class}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 border-r border-slate-200/80">{ach.achievement || ach.participation}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 border-r border-slate-200/80">{ach.event}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                          {ach.level || "State"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-amber-900 border-r border-slate-200/80 bg-amber-50/40">
                        {ach.award}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleOpenPdf(ach.docUrl || "/documents/DefaultFile_1.pdf", `${ach.studentName} - Achievement Certificate`)}
                          className="inline-flex items-center gap-1 bg-[#002147] hover:bg-[#00387a] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 5: DEPARTMENTAL ACTIVITIES & CELEBRATIONS              */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              5. Departmental Activities, Events, Programmes &amp; Celebrations
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="activitiesYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="activitiesYearSelect"
              value={activitiesYear}
              onChange={(e) => setActivitiesYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-4 text-center w-28 text-blue-100 font-bold border-r border-[#003366]">Date</th>
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Activity / Programme</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Category</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Participants</th>
                  <th className="py-3 px-4 text-center w-36 text-blue-100 font-bold">Activity Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500 font-medium">No activity records found.</td>
                  </tr>
                ) : (
                  filteredActivities.map((act: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{act.date}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200/80">{act.title || act.name}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-200/80">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold">
                          {act.category || "Departmental Event"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-800 border-r border-slate-200/80">{act.participants || "—"}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleOpenPdf(act.reportUrl || "/documents/DefaultFile_1.pdf", `${act.title} - Activity Report`)}
                          className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#00387a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View Report</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 6: DEPARTMENTAL BEST PRACTICES                         */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              6. Departmental Best Practices
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="bestPracticesYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="bestPracticesYearSelect"
              value={bestPracticesYear}
              onChange={(e) => setBestPracticesYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-3 text-center w-28 text-blue-100 font-bold border-r border-[#003366]">Year</th>
                  <th className="py-3 px-4 text-white font-black border-r border-[#003366]">Title of Best Practice</th>
                  <th className="py-3 px-5 text-blue-100 font-bold border-r border-[#003366]">Objectives of the Practice</th>
                  <th className="py-3 px-5 text-blue-100 font-bold border-r border-[#003366]">Outcomes / Impact</th>
                  <th className="py-3 px-3 text-center w-28 text-blue-100 font-bold border-r border-[#003366]">Report</th>
                  <th className="py-3 px-3 text-center w-28 text-blue-100 font-bold">Supporting Doc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBestPractices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500 font-medium">No best practices found.</td>
                  </tr>
                ) : (
                  filteredBestPractices.map((bp: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{bp.year}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 border-r border-slate-200/80">{bp.title}</td>
                      <td className="py-3.5 px-5 font-normal text-slate-600 border-r border-slate-200/80">{bp.objectives}</td>
                      <td className="py-3.5 px-5 font-medium text-slate-700 border-r border-slate-200/80">{bp.outcomes}</td>
                      <td className="py-3.5 px-3 text-center border-r border-slate-200/80">
                        <button
                          onClick={() => handleOpenPdf(bp.reportUrl || "/documents/DefaultFile_1.pdf", `${bp.title} - Best Practice Report`)}
                          className="inline-flex items-center gap-1 bg-[#002147] hover:bg-[#00387a] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleOpenPdf(bp.proofUrl || "/documents/DefaultFile_1.pdf", `${bp.title} - Supporting Documents`)}
                          className="inline-flex items-center gap-1 bg-[#002147] hover:bg-[#00387a] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileCheck className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 7: ADD-ON / VALUE-ADDED / CERTIFICATE COURSES          */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              7. Departmental Add-on / Value-Added / Certificate Courses
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="coursesYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="coursesYearSelect"
              value={coursesYear}
              onChange={(e) => setCoursesYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
            </select>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-[11px] font-bold border-b border-[#001733]">
                  <th className="py-3 px-3 text-center w-14 text-blue-100 font-bold border-r border-[#003366]">S. No.</th>
                  <th className="py-3 px-3 text-center w-28 text-blue-100 font-bold border-r border-[#003366]">Year</th>
                  <th className="py-3 px-4 text-white font-black border-r border-[#003366]">Name of the Course</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Type of Course</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Course Code</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Duration</th>
                  <th className="py-3 px-3 text-center text-blue-100 font-bold border-r border-[#003366]">Enrolled</th>
                  <th className="py-3 px-3 text-center bg-[#001733] text-amber-300 font-black">Certified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-slate-500 font-medium">No courses found.</td>
                  </tr>
                ) : (
                  filteredCourses.map((c: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200/80 whitespace-nowrap">{c.year}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 border-r border-slate-200/80">{c.courseName || c.title}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-200/80">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold">
                          {c.courseType || "Certificate"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-700 border-r border-slate-200/80">{c.courseCode || "—"}</td>
                      <td className="py-3.5 px-3 text-center font-medium text-slate-700 border-r border-slate-200/80">{c.duration || "30 Hours"}</td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-800 border-r border-slate-200/80">{c.enrolled || "—"}</td>
                      <td className="py-3.5 px-3 text-center font-black text-amber-800 bg-amber-50/40">{c.certified || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 8: MOUS & COLLABORATIONS                              */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              8. Memoranda of Understanding (MoUs) &amp; Collaborations
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
                  <th className="py-3 px-5 text-white font-black border-r border-[#003366]">Name of the Organization</th>
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Duration / Validity Period</th>
                  <th className="py-3 px-4 text-center w-36 text-blue-100 font-bold border-r border-[#003366]">MoU Document</th>
                  <th className="py-3 px-4 text-center w-40 text-blue-100 font-bold">MoU Activity Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mousList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500 font-medium">No MoUs found.</td>
                  </tr>
                ) : (
                  mousList.map((m: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200/80">{m.organization || m.name}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-200/80">{m.duration || "3 Years"}</td>
                      <td className="py-3.5 px-4 text-center border-r border-slate-200/80">
                        <button
                          onClick={() => handleOpenPdf(m.mouDocUrl || "/documents/DefaultFile_1.pdf", `${m.organization} - MoU Document`)}
                          className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#00387a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View MoU</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleOpenPdf(m.reportUrl || "/documents/DefaultFile_1.pdf", `${m.organization} - Activity Report`)}
                          className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#00387a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileCheck className="h-3.5 w-3.5" />
                          <span>View Activity Report</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 9: YEAR-WISE ANNUAL ACTIVITY REPORTS                   */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              9. Year-wise Annual Activity Reports
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="annualReportsYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="annualReportsYearSelect"
              value={annualReportsYear}
              onChange={(e) => setAnnualReportsYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
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
                  <th className="py-3 px-4 text-center text-blue-100 font-bold border-r border-[#003366]">Total No. of Activities</th>
                  <th className="py-3 px-4 text-center w-40 text-blue-100 font-bold border-r border-[#003366]">Annual Activity Report</th>
                  <th className="py-3 px-4 text-center w-40 text-blue-100 font-bold">Supporting Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAnnualReports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500 font-medium">No annual reports found.</td>
                  </tr>
                ) : (
                  filteredAnnualReports.map((ar: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-700 border-r border-slate-200/80">{idx + 1}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-slate-800 border-r border-slate-200/80 whitespace-nowrap">{ar.year}</td>
                      <td className="py-3.5 px-4 text-center font-black text-slate-800 border-r border-slate-200/80">{ar.count || "12"}</td>
                      <td className="py-3.5 px-4 text-center border-r border-slate-200/80">
                        <button
                          onClick={() => handleOpenPdf(ar.reportUrl || "/documents/DefaultFile_1.pdf", `${deptName} - Annual Activity Report (${ar.year})`)}
                          className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#00387a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleOpenPdf(ar.proofUrl || "/documents/DefaultFile_1.pdf", `${deptName} - Supporting Documents (${ar.year})`)}
                          className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#00387a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                        >
                          <FileCheck className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 10: PHOTO GALLERY                                      */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <h2 className="font-outfit text-lg sm:text-xl font-black text-[#002147] tracking-tight">
              10. Photo Gallery
            </h2>
            <div className="h-0.5 w-12 bg-[#002147] rounded-full mt-1"></div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Photographs of {languageLabel} activities, literary competitions, seminars, workshops, guest lectures, celebrations, and departmental events.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="galleryYearSelect" className="text-xs font-bold text-slate-700 whitespace-nowrap">Filter Year:</label>
            <select
              id="galleryYearSelect"
              value={galleryYear}
              onChange={(e) => setGalleryYear(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#002147] shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2025–2026">2025–2026</option>
              <option value="2024–2025">2024–2025</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, pIdx) => (
            <div
              key={pIdx}
              onClick={() => setLightboxData({ photos: filteredPhotos, currentIndex: pIdx, title: photo.title })}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer bg-slate-900 aspect-[16/10]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.title || `${deptName} Event`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">{photo.date || photo.year}</span>
                <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {photo.title}
                </h4>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL                                                 */}
      {/* ============================================================== */}
      {lightboxData && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxData(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxData.photos[lightboxData.currentIndex]?.url}
              alt={lightboxData.photos[lightboxData.currentIndex]?.title || "Gallery Photo"}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-3 text-center">
              <p className="text-white font-bold text-sm sm:text-base">
                {lightboxData.photos[lightboxData.currentIndex]?.title}
              </p>
              <span className="text-xs text-amber-300 font-semibold">
                {lightboxData.photos[lightboxData.currentIndex]?.date || lightboxData.photos[lightboxData.currentIndex]?.year} ({lightboxData.currentIndex + 1} of {lightboxData.photos.length})
              </span>
            </div>
          </div>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Next Photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* FILE PREVIEW MODAL                                             */}
      {/* ============================================================== */}
      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle}
      />
    </div>
  );
}

