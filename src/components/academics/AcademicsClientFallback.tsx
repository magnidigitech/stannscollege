"use client";

import React, { useState } from "react";
import {
  GraduationCap, BookOpen, Building, Award, Lightbulb, Settings, LineChart,
  ChevronRight, X, Sparkles, CheckCircle
} from "lucide-react";

// Individual Component Imports
import { UndergraduateProgrammes } from "./academic-programmes/UndergraduateProgrammes";
import { PostgraduateProgrammes } from "./academic-programmes/PostgraduateProgrammes";
import { IndustryIntegratedCourses } from "./academic-programmes/IndustryIntegratedCourses";

import { CurriculumFramework } from "./curriculum-academic-planning/CurriculumFramework";
import { InnovativeInterdisciplinaryOfferings } from "./curriculum-academic-planning/InnovativeInterdisciplinaryOfferings";
import { AcademicCalendar } from "./curriculum-academic-planning/AcademicCalendar";
import { AcademicImplementationPlan } from "./curriculum-academic-planning/AcademicImplementationPlan";
import { Timetables } from "./curriculum-academic-planning/Timetables";

import { DepartmentDetail } from "./departments/DepartmentDetail";
import { ValueAddedLearning } from "./value-added-learning/ValueAddedLearning";

import { PedagogyMethodologies } from "./teaching-learning/PedagogyMethodologies";
import { LearningManagementSystem } from "./teaching-learning/LearningManagementSystem";
import { StudentCentricMethods } from "./teaching-learning/StudentCentricMethods";

import { OutcomeBasedEducation } from "./outcome-based-education/OutcomeBasedEducation";
import { AcademicQualityIndicators } from "./academic-quality-indicators/AcademicQualityIndicators";

export default function AcademicsClientFallback() {
  const [activeModal, setActiveModal] = useState<{ catSlug: string; itemSlug: string; text: string } | null>(null);

  const categories = [
    {
      catSlug: "academic-programmes",
      title: "I. Academic Programmes",
      description: "Undergraduate, Postgraduate and industrial courses mapping professional progression.",
      icon: GraduationCap,
      items: [
        { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
        { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" },
        { text: "Industry-Integrated Courses", slug: "industry-integrated-courses" }
      ]
    },
    {
      catSlug: "curriculum-academic-planning",
      title: "II. Curriculum & Academic Planning",
      description: "Frameworks, interdisciplinary offerings, calendars, AIP and comprehensive timetables.",
      icon: BookOpen,
      items: [
        { text: "Curriculum Framework", slug: "curriculum-framework" },
        { text: "Innovative Offerings", slug: "innovative-interdisciplinary-offerings" },
        { text: "Academic Calendar", slug: "academic-calendar-ug-pg" },
        { text: "Implementation Plan (AIP)", slug: "academic-implementation-plan-aip" },
        { text: "Timetables", slug: "time-tables" }
      ]
    },
    {
      catSlug: "departments",
      title: "III. Departments",
      description: "14 distinct departments fostering specialized training and core research.",
      icon: Building,
      items: [
        { text: "Department of Commerce", slug: "department-of-commerce" },
        { text: "Computer Science (CS & AI)", slug: "department-of-computer-science-cs-artificial-intelligence" },
        { text: "Computer Applications (BCA)", slug: "department-of-computer-applications-bca" },
        { text: "Department of MCA", slug: "department-of-mca" },
        { text: "Department of MBA", slug: "department-of-mba" }
      ]
    },
    {
      catSlug: "value-added-learning",
      title: "IV. Value-Added Learning",
      description: "Skill enhancement via practical Add-on, Value-added and Certificate certifications.",
      icon: Award,
      items: [
        { text: "Value-Added Learning Overview", slug: "value-added-learning-courses" }
      ]
    },
    {
      catSlug: "teaching-learning",
      title: "V. Teaching & Learning",
      description: "Pedagogy methodologies, interactive LMS platforms, and student-centric methods.",
      icon: Lightbulb,
      items: [
        { text: "Pedagogy & Methodologies", slug: "pedagogy-learning-methodologies" },
        { text: "LMS Integration", slug: "learning-management-system-lms" },
        { text: "Student-Centric Methods", slug: "student-centric-methods" }
      ]
    },
    {
      catSlug: "outcome-based-education",
      title: "VI. Outcome-Based Education",
      description: "Mapping Programme Outcomes (POs), Course Outcomes (COs) and PSOs frameworks.",
      icon: Settings,
      items: [
        { text: "Outcome-Based Education (OBE)", slug: "programme-outcomes-pos" }
      ]
    },
    {
      catSlug: "academic-quality-indicators",
      title: "VII. Academic Quality Indicators",
      description: "Auditing Student-Teacher ratios, evaluation methods and quality compliance metrics.",
      icon: LineChart,
      items: [
        { text: "Academic Quality Indicators", slug: "student-teacher-ratio" }
      ]
    }
  ];

  const openModal = (catSlug: string, itemSlug: string, text: string) => {
    setActiveModal({ catSlug, itemSlug, text });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderPopupContent = () => {
    if (!activeModal) return null;
    const { catSlug, itemSlug } = activeModal;

    if (catSlug === "academic-programmes") {
      switch (itemSlug) {
        case "undergraduate-programmes": return <UndergraduateProgrammes />;
        case "postgraduate-programmes": return <PostgraduateProgrammes />;
        case "industry-integrated-courses": return <IndustryIntegratedCourses />;
      }
    }
    if (catSlug === "curriculum-academic-planning") {
      switch (itemSlug) {
        case "curriculum-framework": return <CurriculumFramework />;
        case "innovative-interdisciplinary-offerings": return <InnovativeInterdisciplinaryOfferings />;
        case "academic-calendar-ug-pg": return <AcademicCalendar />;
        case "academic-implementation-plan-aip": return <AcademicImplementationPlan />;
        case "time-tables": return <Timetables />;
      }
    }
    if (catSlug === "departments") {
      return <DepartmentDetail itemSlug={itemSlug} />;
    }
    if (catSlug === "value-added-learning") {
      return <ValueAddedLearning />;
    }
    if (catSlug === "teaching-learning") {
      switch (itemSlug) {
        case "pedagogy-learning-methodologies": return <PedagogyMethodologies />;
        case "learning-management-system-lms": return <LearningManagementSystem />;
        case "student-centric-methods": return <StudentCentricMethods />;
      }
    }
    if (catSlug === "outcome-based-education") {
      return <OutcomeBasedEducation />;
    }
    if (catSlug === "academic-quality-indicators") {
      return <AcademicQualityIndicators />;
    }

    return <p className="text-slate-500 font-sans p-4">Section details being aggregated...</p>;
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 md:py-24 select-none font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header Panel */}
        <div className="max-w-4xl text-left mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#002147]/5 border border-[#002147]/10 px-4 py-1.5 text-xs font-black text-[#002147] uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#002147]" /> Continuous Development
          </span>
          <h1 className="mt-6 font-outfit text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
            Academics
          </h1>
          <p className="mt-4 font-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
            Robust education ecosystems mapping curriculum frameworks, outcomes assessment, specialized 14 departments and comprehensive ICT pedagogical delivery mechanisms. Click any item to preview inside immediate view.
          </p>
        </div>

        {/* Banner Image Area */}
        <div className="relative w-full h-[320px] md:h-[400px] mb-16 rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img
            src="/images/courses/slider1.jpg"
            alt="St. Ann's Academics"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"; }}
          />
          <div className="absolute bottom-8 left-8 z-20 text-white">
            <h2 className="font-outfit text-2xl md:text-4xl font-black">Excellence in Action</h2>
            <p className="text-xs md:text-sm font-semibold mt-1 text-slate-200">Adhering strictly to statutory compliance & modern pedagogy</p>
          </div>
        </div>

        {/* Categories Grid Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.catSlug} className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:border-[#002147]/20 transition-all duration-300 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#002147]/5 text-[#002147] border border-[#002147]/10 shadow-inner">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">{cat.title}</h3>
                  </div>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed min-h-[36px]">{cat.description}</p>
                </div>
                <div className="h-px bg-slate-100 w-full" />
                <div className="flex flex-col gap-2">
                  {cat.items.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={() => openModal(cat.catSlug, sub.slug, sub.text)}
                      className="group flex items-center justify-between text-left p-3 bg-slate-50/50 hover:bg-[#002147]/5 border border-slate-100/60 rounded-xl transition-all duration-200 select-none"
                    >
                      <span className="font-sans text-xs md:text-sm font-bold text-slate-700 group-hover:text-[#002147]">{sub.text}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#002147] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Popup Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative max-h-[90vh] flex flex-col animate-scaleUp">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#002147] to-slate-900 p-6 text-white flex items-center justify-between border-b border-white/10 flex-shrink-0 shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
              <div className="relative z-10 flex flex-col gap-0.5">
                <span className="inline-flex items-center gap-1 font-outfit text-[10px] uppercase tracking-widest font-bold text-blue-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full w-fit border border-white/10">
                  <CheckCircle className="h-3 w-3 text-emerald-400" /> Direct Portal Insight
                </span>
                <h3 className="font-outfit text-lg md:text-xl font-black mt-1.5 leading-tight tracking-tight select-none">{activeModal.text}</h3>
              </div>
              <button
                onClick={closeModal}
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 active:scale-95"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Modal Body with Scrolling */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/40">
              {renderPopupContent()}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 p-5 bg-white flex justify-end flex-shrink-0">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-[#002147] hover:bg-indigo-950 text-white font-sans font-bold text-xs md:text-sm rounded-xl transition-all active:scale-95 shadow-md"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
