"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles, Phone, Mail, ArrowRight } from "lucide-react";

// Fallback
import AcademicsClientFallback from "@/components/academics/AcademicsClientFallback";

// Component Imports
import { UndergraduateProgrammes } from "@/components/academics/academic-programmes/UndergraduateProgrammes";
import { PostgraduateProgrammes } from "@/components/academics/academic-programmes/PostgraduateProgrammes";
import { IndustryIntegratedCourses } from "@/components/academics/academic-programmes/IndustryIntegratedCourses";

import { CurriculumFramework } from "@/components/academics/curriculum-academic-planning/CurriculumFramework";
import { InnovativeInterdisciplinaryOfferings } from "@/components/academics/curriculum-academic-planning/InnovativeInterdisciplinaryOfferings";
import { AcademicCalendar } from "@/components/academics/curriculum-academic-planning/AcademicCalendar";
import { AcademicImplementationPlan } from "@/components/academics/curriculum-academic-planning/AcademicImplementationPlan";
import { Timetables } from "@/components/academics/curriculum-academic-planning/Timetables";

import { DepartmentDetail } from "@/components/academics/departments/DepartmentDetail";
import { AllDepartmentsHub } from "@/components/academics/departments/AllDepartmentsHub";
import { ValueAddedLearning } from "@/components/academics/value-added-learning/ValueAddedLearning";

import { PedagogyMethodologies } from "@/components/academics/teaching-learning/PedagogyMethodologies";
import { LearningManagementSystem } from "@/components/academics/teaching-learning/LearningManagementSystem";
import { StudentCentricMethods } from "@/components/academics/teaching-learning/StudentCentricMethods";

import { OutcomeBasedEducation } from "@/components/academics/outcome-based-education/OutcomeBasedEducation";
import { AcademicQualityIndicators } from "@/components/academics/academic-quality-indicators/AcademicQualityIndicators";

const navigationStructure = [
  {
    catSlug: "academic-programmes",
    title: "I. Academic Programmes",
    items: [
      { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
      { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" },
      { text: "Industry-Integrated Courses", slug: "industry-integrated-courses" }
    ]
  },
  {
    catSlug: "curriculum-academic-planning",
    title: "II. Curriculum & Academic Planning",
    items: [
      { text: "Curriculum Framework", slug: "curriculum-framework" },
      { text: "Innovative & Interdisciplinary Offerings", slug: "innovative-interdisciplinary-offerings" },
      { text: "Academic Calendar (UG & PG)", slug: "academic-calendar-ug-pg" },
      { text: "Academic Implementation Plan (AIP)", slug: "academic-implementation-plan-aip" },
      { text: "Time Tables", slug: "time-tables" }
    ]
  },
  {
    catSlug: "departments",
    title: "III. Departments",
    items: [
      { text: "1. Department of Commerce", slug: "department-of-commerce" },
      { text: "2. Department of Computer Applications (BCA)", slug: "department-of-computer-applications-bca" },
      { text: "3. Department of Computer Science (CS & AI)", slug: "department-of-computer-science-cs-artificial-intelligence" },
      { text: "4. Department of Mathematics", slug: "department-of-mathematics" },
      { text: "5. Department of Physics", slug: "department-of-physics" },
      { text: "6. Department of Statistics", slug: "department-of-statistics" },
      { text: "7. Department of Chemistry", slug: "department-of-chemistry" },
      { text: "8. Department of Biotechnology", slug: "department-of-biotechnology" },
      { text: "9. Department of Microbiology", slug: "department-of-microbiology" },
      { text: "10. Department of Botany", slug: "department-of-botany" },
      { text: "11. Department of MCA", slug: "department-of-mca" },
      { text: "12. Department of MBA", slug: "department-of-mba" },
      { text: "13. Department of English", slug: "department-of-english" },
      { text: "14. Oriental Languages (Tel/San/Hin)", slug: "department-of-oriental-languages-telugu-sanskrit-hindi" }
    ]
  },
  {
    catSlug: "value-added-learning",
    title: "IV. Value-Added Learning",
    items: [
      { text: "Add-on Courses", slug: "add-on-courses" },
      { text: "Certificate Courses", slug: "certificate-courses" },
      { text: "Value-Added Courses", slug: "value-added-courses" }
    ]
  },
  {
    catSlug: "teaching-learning",
    title: "V. Teaching & Learning",
    items: [
      { text: "Pedagogy & Learning Methodologies", slug: "pedagogy-learning-methodologies" },
      { text: "Learning Management System (LMS)", slug: "learning-management-system-lms" },
      { text: "Student-Centric Methods", slug: "student-centric-methods" }
    ]
  },
  {
    catSlug: "outcome-based-education",
    title: "VI. Outcome-Based Education",
    items: [
      { text: "Programme Outcomes (POs)", slug: "programme-outcomes-pos" },
      { text: "Course Outcomes (COs)", slug: "course-outcomes-cos" },
      { text: "Programme Specific Outcomes (PSOs)", slug: "programme-specific-outcomes-psos" }
    ]
  },
  {
    catSlug: "academic-quality-indicators",
    title: "VII. Academic Quality Indicators",
    items: [
      { text: "Student–Teacher Ratio", slug: "student-teacher-ratio" },
      { text: "Internal Assessment & Evaluation", slug: "internal-assessment-evaluation" },
      { text: "Academic Performance Indicators", slug: "academic-performance-indicators" }
    ]
  }
];

function AcademicsSidebar() {
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

  const catSlug = slug?.[0];
  const itemSlug = slug?.[1];

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
      if (itemSlug === "undergraduate-programmes") return <UndergraduateProgrammes />;
      if (itemSlug === "postgraduate-programmes") return <PostgraduateProgrammes />;
      if (itemSlug === "industry-integrated-courses") return <IndustryIntegratedCourses />;
    }
    if (catSlug === "curriculum-academic-planning") {
      if (itemSlug === "curriculum-framework") return <CurriculumFramework />;
      if (itemSlug === "innovative-interdisciplinary-offerings") return <InnovativeInterdisciplinaryOfferings />;
      if (itemSlug === "academic-calendar-ug-pg") return <AcademicCalendar />;
      if (itemSlug === "academic-implementation-plan-aip") return <AcademicImplementationPlan />;
      if (itemSlug === "time-tables") return <Timetables />;
    }
    if (catSlug === "departments") {
      if (isAllDeptsRoot) return <AllDepartmentsHub />;
      return <DepartmentDetail itemSlug={itemSlug || ""} />;
    }
    if (catSlug === "value-added-learning") {
      // Maps all 3 sub-items to ValueAddedLearning component
      if (["add-on-courses", "certificate-courses", "value-added-courses"].includes(itemSlug || "")) {
        return <ValueAddedLearning />;
      }
    }
    if (catSlug === "teaching-learning") {
      if (itemSlug === "pedagogy-learning-methodologies") return <PedagogyMethodologies />;
      if (itemSlug === "learning-management-system-lms") return <LearningManagementSystem />;
      if (itemSlug === "student-centric-methods") return <StudentCentricMethods />;
    }
    if (catSlug === "outcome-based-education") {
      // Maps all 3 sub-items (POs, COs, PSOs) to OutcomeBasedEducation component
      if (["programme-outcomes-pos", "course-outcomes-cos", "programme-specific-outcomes-psos"].includes(itemSlug || "")) {
        return <OutcomeBasedEducation />;
      }
    }
    if (catSlug === "academic-quality-indicators") {
      // Maps all 3 sub-items to AcademicQualityIndicators component
      if (["student-teacher-ratio", "internal-assessment-evaluation", "academic-performance-indicators"].includes(itemSlug || "")) {
        return <AcademicQualityIndicators />;
      }
    }
    
    return <AcademicsClientFallback />;
  };

  return (
    <div className="bg-slate-50/40 min-h-screen py-12 select-none animate-fadeIn font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          
          {/* Left Navigation Sidebar for Desktop */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24 select-none h-fit max-h-[calc(100vh-140px)] overflow-y-auto bg-white border border-slate-200/60 p-5 rounded-[2rem] shadow-sm pr-3">
            <span className="inline-flex items-center gap-1.5 font-outfit text-[11px] font-black text-[#002147] uppercase tracking-widest px-2 pb-2 border-b border-slate-100">
              Academic Modules
            </span>
            <div className="flex flex-col gap-6 mt-2">
              {navigationStructure.map((group) => (
                <div key={group.catSlug} className="flex flex-col gap-1.5">
                  {group.catSlug === "departments" ? (
                    <Link 
                      href="/academics/departments"
                      className={`font-outfit text-[10px] font-black uppercase tracking-widest px-2 hover:text-[#002147] transition-colors flex items-center justify-between group cursor-pointer ${
                        isAllDeptsRoot ? 'text-[#002147] border-l-2 border-[#002147] pl-1.5' : 'text-slate-400'
                      }`}
                    >
                      <span>{group.title}</span>
                      {isAllDeptsRoot ? (
                        <span className="h-1 w-1.5 bg-[#002147] rounded-full animate-pulse shrink-0"></span>
                      ) : (
                        <ArrowRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  ) : (
                    <span className="font-outfit text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                      {group.title}
                    </span>
                  )}
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const isActive = catSlug === group.catSlug && itemSlug === item.slug;
                      return (
                        <Link
                          key={item.slug}
                          href={`/academics/${group.catSlug}/${item.slug}`}
                          className={`font-sans text-xs p-2.5 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                            isActive
                              ? 'bg-[#002147]/10 border-[#002147]/20 text-[#002147] font-black shadow-sm'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-[#002147] font-bold'
                          }`}
                        >
                          <span className="truncate pr-2 leading-tight">{item.text}</span>
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#002147] shrink-0 animate-pulse"></span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Dynamic Right Component */}
          <div className="lg:col-span-8 mb-16 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {renderMainContent()}
            </div>
            
            {/* Mini Sidebar Widgets Display at bottom on mobile/desktop as layout backup */}
            <div className="border-t border-slate-200/60 pt-8 mt-4">
              <AcademicsSidebar />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
