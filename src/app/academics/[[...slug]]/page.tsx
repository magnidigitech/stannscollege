"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles, Phone, Mail, ArrowRight, ChevronDown, ChevronRight, Building, BookOpen, Lightbulb, Award, ShieldCheck } from "lucide-react";

import AcademicsClientFallback from "@/components/academics/AcademicsClientFallback";
import { SubtextBox } from "@/components/ui/Heading1Notch";

// Component Imports
import { UndergraduateProgrammes } from "@/components/academics/academic-programmes/UndergraduateProgrammes";
import { PostgraduateProgrammes } from "@/components/academics/academic-programmes/PostgraduateProgrammes";

import { AcademicCalendar } from "@/components/academics/curriculum-academic-planning/AcademicCalendar";
import { Timetables } from "@/components/academics/curriculum-academic-planning/Timetables";
import { CurriculumSyllabus } from "@/components/academics/curriculum-academic-planning/CurriculumSyllabus";
import { AcademicRegulations } from "@/components/academics/curriculum-academic-planning/AcademicRegulations";
import { IlmsSystem } from "@/components/academics/curriculum-academic-planning/IlmsSystem";

import { DepartmentDetail } from "@/components/academics/departments/DepartmentDetail";
import { AllDepartmentsHub } from "@/components/academics/departments/AllDepartmentsHub";
import { DepartmentUpdateForm } from "@/components/academics/departments/DepartmentUpdateForm";

import { TeachingLearningRenderer } from "@/components/academics/teaching-learning/TeachingLearningRenderer";
import { ExaminationEvaluationRenderer } from "@/components/academics/examination-evaluation/ExaminationEvaluationRenderer";
import { AcademicEnrichmentRenderer } from "@/components/academics/academic-enrichment/AcademicEnrichmentRenderer";
import { AcademicQualityOutcomesRenderer } from "@/components/academics/academic-quality-outcomes/AcademicQualityOutcomesRenderer";

const navigationStructure = [
  {
    catSlug: "academic-programmes",
    title: "A. Academic Programmes",
    icon: GraduationCap,
    items: [
      { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
      { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" }
    ]
  },
  {
    catSlug: "curriculum-academic-planning",
    title: "B. Academic Regulations & Resources",
    icon: BookOpen,
    items: [
      { text: "Academic Calendar", slug: "academic-calendar" },
      { text: "Time Tables", slug: "timetables" },
      { text: "Curriculum & Syllabus", slug: "curriculum-syllabus" },
      { text: "Academic Regulations", slug: "academic-regulations" },
      { text: "ILMS – Integrated Learning Management System", slug: "ilms-system" }
    ]
  },
  {
    catSlug: "departments",
    title: "C. Departments (Dropdown Menu)",
    isDropdown: true,
    icon: Building,
    items: [
      { text: "1. Department of Commerce", slug: "department-of-commerce" },
      { text: "2. Dept. of Computer Science & Applications", slug: "department-of-computer-science-applications" },
      { text: "3. Department of Mathematics", slug: "department-of-mathematics" },
      { text: "4. Department of Physics", slug: "department-of-physics" },
      { text: "5. Department of Statistics", slug: "department-of-statistics" },
      { text: "6. Department of Biotechnology", slug: "department-of-biotechnology" },
      { text: "7. Department of Microbiology", slug: "department-of-microbiology" },
      { text: "8. Department of Botany", slug: "department-of-botany" },
      { text: "9. Department of Chemistry", slug: "department-of-chemistry" },
      { text: "10. Department of English", slug: "department-of-english" },
      { text: "11. Department of Oriental Languages", slug: "department-of-oriental-languages" },
      { text: "12. Department of MCA", slug: "department-of-mca" },
      { text: "13. Department of MBA", slug: "department-of-mba" },
      { text: "⚙️ Manage Content", slug: "update" }
    ]
  },
  {
    catSlug: "teaching-learning",
    title: "D. Teaching & Learning",
    icon: Lightbulb,
    items: [
      { text: "Teaching-Learning Practices", slug: "teaching-learning-practices" },
      { text: "Innovative Teaching Practices", slug: "innovative-teaching-practices" },
      { text: "Experiential & Participative Learning", slug: "experiential-participative-learning" },
      { text: "ICT-Enabled Teaching", slug: "ict-enabled-teaching" },
      { text: "Student-Centric Learning", slug: "student-centric-learning" }
    ]
  },
  {
    catSlug: "examination-evaluation",
    title: "E. Examination & Evaluation",
    icon: Award,
    items: [
      { text: "Examination System", slug: "examination-system" },
      { text: "Continuous Internal Assessment (CIA)", slug: "continuous-internal-assessment" },
      { text: "University Examinations", slug: "university-examinations" },
      { text: "Results & Performance", slug: "results-performance" },
      { text: "Examination Regulations", slug: "examination-regulations" }
    ]
  },
  {
    catSlug: "academic-enrichment",
    title: "F. Academic Enrichment",
    icon: Sparkles,
    items: [
      { text: "Value-Added Courses (VAC)", slug: "value-added-courses" },
      { text: "Certificate Programmes", slug: "certificate-courses" },
      { text: "Skill Development Programmes", slug: "skill-development-programmes" },
      { text: "Guest Lectures & Workshops", slug: "guest-lectures-workshops" },
      { text: "Seminars & Conferences", slug: "seminars-conferences" },
      { text: "Academic Collaborations", slug: "academic-collaborations" }
    ]
  },
  {
    catSlug: "academic-quality-outcomes",
    title: "G. Academic Quality & Outcomes",
    icon: ShieldCheck,
    items: [
      { text: "Programme Outcomes (POs)", slug: "programme-outcomes" },
      { text: "Programme Specific Outcomes (PSOs)", slug: "programme-specific-outcomes" },
      { text: "Course Outcomes (COs)", slug: "course-outcomes" },
      { text: "CO–PO/PSO Mapping", slug: "co-po-pso-mapping" },
      { text: "Attainment of Outcomes", slug: "attainment-of-outcomes" },
      { text: "Academic & Administrative Audit (AAA)", slug: "academic-audit" }
    ]
  }
];

function AcademicsSidebar({ catSlug, itemSlug }: { catSlug?: string; itemSlug?: string }) {
  const [departmentsOpen, setDepartmentsOpen] = useState(catSlug === "departments" || true);

  return (
    <div className="flex flex-col gap-6 sticky top-24 select-none font-sans">
      
      {/* Badge Widget */}
      <div className="bg-gradient-to-br from-[#002147] via-[#002d5c] to-indigo-950 p-6 rounded-[2rem] text-white shadow-lg border border-[#003875] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[10px] font-black tracking-wider uppercase w-fit text-indigo-100">
            <Sparkles className="h-3 w-3 text-emerald-400" /> Continuous Development
          </span>
          <div>
            <h4 className="font-outfit text-lg font-black leading-snug tracking-tight">Institutional QA Framework</h4>
            <p className="mt-1 text-blue-200/80 text-xs leading-relaxed font-medium">Standardized course outcomes and pedagogical auditing structures.</p>
          </div>
        </div>
      </div>

      {/* Quick Contact Widget */}
      <div className="bg-white border border-slate-200/60 p-6 rounded-[2rem] shadow-sm flex flex-col gap-4">
        <h4 className="font-outfit text-sm font-black text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Contact Academic Cell
        </h4>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <Phone className="h-3.5 w-3.5 text-[#002147] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Helpdesk</span>
              <span className="text-xs font-bold text-slate-700 leading-tight">0863-2236470</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Mail className="h-3.5 w-3.5 text-[#002147] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mail</span>
              <span className="text-xs font-bold text-slate-700 leading-tight truncate">st_anns_coll@yahoo.co.in</span>
            </div>
          </div>
        </div>
        <Link href="/admission" className="mt-2 inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#00387a] text-white font-sans font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95">
          Apply Online <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

    </div>
  );
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function AcademicsDynamicPage({ params }: PageProps) {
  const { slug } = use(params);

  const rawCat = slug?.[0];
  const itemSlug = slug?.[1];

  // Normalized category slug
  const catSlug = rawCat === "academic-regulations-resources" ? "curriculum-academic-planning" :
    rawCat === "value-added-learning" ? "academic-enrichment" :
    rawCat === "outcome-based-education" || rawCat === "academic-quality-indicators" ? "academic-quality-outcomes" :
    rawCat;

  const [deptsOpen, setDeptsOpen] = useState<boolean>(true);

  if (!catSlug) {
    return <AcademicsClientFallback />;
  }

  const isAllDeptsRoot = catSlug === "departments" && !itemSlug;

  if (!isAllDeptsRoot && !itemSlug) {
    return <AcademicsClientFallback />;
  }

  // Logic to render individual content component
  const renderMainContent = () => {
    if (catSlug === "academic-programmes") {
      if (itemSlug === "undergraduate-programmes" || itemSlug === "undergraduate") return <UndergraduateProgrammes />;
      if (itemSlug === "postgraduate-programmes" || itemSlug === "postgraduate") return <PostgraduateProgrammes />;
    }

    if (catSlug === "curriculum-academic-planning") {
      if (itemSlug === "academic-calendar" || itemSlug === "academic-calendar-ug-pg") return <AcademicCalendar />;
      if (itemSlug === "timetables" || itemSlug === "time-tables") return <Timetables />;
      if (itemSlug === "curriculum-syllabus" || itemSlug === "curriculum-framework" || itemSlug === "innovative-interdisciplinary-offerings") return <CurriculumSyllabus />;
      if (itemSlug === "academic-regulations" || itemSlug === "academic-implementation-plan-aip") return <AcademicRegulations />;
      if (itemSlug === "ilms-system" || itemSlug === "learning-management-system-lms") return <IlmsSystem />;
    }

    if (catSlug === "departments") {
      if (isAllDeptsRoot) return <AllDepartmentsHub />;
      if (itemSlug === "update") return <DepartmentUpdateForm />;
      return <DepartmentDetail itemSlug={itemSlug || ""} />;
    }

    if (catSlug === "teaching-learning") {
      return <TeachingLearningRenderer subSlug={itemSlug} />;
    }

    if (catSlug === "examination-evaluation") {
      return <ExaminationEvaluationRenderer subSlug={itemSlug} />;
    }

    if (catSlug === "academic-enrichment") {
      return <AcademicEnrichmentRenderer subSlug={itemSlug} />;
    }

    if (catSlug === "academic-quality-outcomes") {
      return <AcademicQualityOutcomesRenderer subSlug={itemSlug} />;
    }
    
    return <AcademicsClientFallback />;
  };

  // Determine page title and subtext
  let pageTitle = "Academics";
  const pageSubtext = "Providing career-oriented, research-infused undergraduate, postgraduate, and professional curricula designed to foster intellectual growth, global competency, and ethical leadership.";

  if (isAllDeptsRoot) {
    pageTitle = "Academic Departments";
  } else if (itemSlug) {
    for (const group of navigationStructure) {
      const found = group.items.find(it => it.slug === itemSlug);
      if (found) {
        pageTitle = found.text.replace(/^\d+\.\s*/, "");
        break;
      }
    }
  }

  return (
    <div className="bg-slate-50/40 min-h-screen select-none animate-fadeIn font-sans">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          
          {/* Left Navigation Sidebar for Desktop */}
          <div className="lg:col-span-3 flex flex-col gap-6 sticky top-24 select-none h-fit max-h-[calc(100vh-140px)] overflow-y-auto bg-white border border-slate-200/60 p-5 rounded-[2rem] shadow-sm pr-3">
            <div className="text-white px-4 py-3.5 rounded-2xl flex items-center gap-3.5 shadow-sm bg-[#002147] border border-[#002147]/20 shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white shrink-0 backdrop-blur-xs shadow-inner">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <Link href="/academics" className="font-outfit text-sm sm:text-base font-black uppercase tracking-wider text-white truncate leading-tight hover:underline">
                  Academics
                </Link>
                <span className="text-[10px] sm:text-[11px] text-blue-100/80 font-medium truncate mt-0.5">
                  Academic Modules &amp; Programs
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-1">
              {navigationStructure.map((group) => {
                const isGroupActive = catSlug === group.catSlug;

                if (group.isDropdown) {
                  return (
                    <div key={group.catSlug} className="flex flex-col gap-1.5 border-y border-slate-100 py-3 my-1">
                      <div className="flex items-center justify-between px-2">
                        <Link
                          href="/academics/departments"
                          className={`font-outfit text-[11px] font-black uppercase tracking-wider hover:text-[#002147] transition-colors flex items-center gap-2 ${
                            isAllDeptsRoot ? "text-[#002147]" : "text-slate-600"
                          }`}
                        >
                          <Building className="h-3.5 w-3.5 text-[#002147]" />
                          <span>C. Departments</span>
                        </Link>
                        <button
                          onClick={() => setDeptsOpen(!deptsOpen)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#002147] transition-colors cursor-pointer"
                          title={deptsOpen ? "Collapse Departments Menu" : "Expand Departments Menu"}
                        >
                          {deptsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                      </div>

                      {deptsOpen && (
                        <div className="flex flex-col gap-1 pl-2 border-l-2 border-indigo-100/60 ml-3 mt-1 animate-fadeIn">
                          {group.items.map((item) => {
                            const isActive = catSlug === group.catSlug && itemSlug === item.slug;
                            return (
                              <Link
                                key={item.slug}
                                href={`/academics/${group.catSlug}/${item.slug}`}
                                className={`font-sans text-xs p-2 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                                  isActive
                                    ? "bg-[#002147]/10 border-[#002147]/20 text-[#002147] font-black shadow-xs"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-[#002147] font-bold"
                                }`}
                              >
                                <span className="truncate pr-1 text-[11px] leading-tight">{item.text}</span>
                                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#002147] shrink-0 animate-pulse"></span>}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={group.catSlug} className="flex flex-col gap-1.5">
                    <span className="font-outfit text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                      {group.title}
                    </span>
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const isActive = catSlug === group.catSlug && itemSlug === item.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={`/academics/${group.catSlug}/${item.slug}`}
                            className={`font-sans text-xs p-2.5 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                              isActive
                                ? "bg-[#002147]/10 border-[#002147]/20 text-[#002147] font-black shadow-xs"
                                : "text-slate-600 hover:bg-slate-50 hover:text-[#002147] font-bold"
                            }`}
                          >
                            <span className="truncate pr-2 leading-tight">{item.text}</span>
                            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#002147] shrink-0 animate-pulse"></span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Dynamic Right Component */}
          <div className="lg:col-span-9 mb-16 flex flex-col gap-8">
            {/* Sub-text Box */}
            <SubtextBox subtext={pageSubtext} />

            <div className="flex flex-col gap-6">
              {renderMainContent()}
            </div>
            
            {/* Mini Sidebar Widgets Display at bottom on mobile/desktop as layout backup */}
            <div className="border-t border-slate-200/60 pt-8 mt-4">
              <AcademicsSidebar catSlug={catSlug} itemSlug={itemSlug} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
