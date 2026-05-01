"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Compass, Target, Layers, Settings, FileText, Sparkles, BookOpen, CheckCircle, RefreshCcw, Award, Calendar, BadgeCheck, Shield, BookCheck } from "lucide-react";

export function TeachingPolicyDetail({ onBack }: { onBack: () => void }) {
  const [openIds, setOpenIds] = useState<string[]>(["Overview"]);

  const sections = [
    {
      id: "Overview",
      title: "Overview",
      icon: <Compass className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-4 text-slate-600 font-sans leading-relaxed animate-fadeIn">
          <p className="text-sm md:text-base font-normal">
            St. Ann’s College for Women adopts a student-centric, outcome-based teaching–learning framework aligned with UGC, NAAC, CBCS, and OBE guidelines. The policy ensures effective curriculum delivery through innovative pedagogy, ICT integration, and inclusive practices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-indigo-500" /> Student Centric Focus
              </h5>
              <p className="text-xs md:text-sm text-slate-500">
                Adapting educational processes to meet various student backgrounds and skill levels.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base flex items-center gap-2 mb-1">
                <BookCheck className="h-4 w-4 text-indigo-500" /> NAAC / UGC Compliance
              </h5>
              <p className="text-xs md:text-sm text-slate-500">
                Full alignment with continuous curriculum planning and delivery standards.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "Objectives",
      title: "Objectives",
      icon: <Target className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 hover:border-indigo-100/50 rounded-2xl p-3.5 text-xs md:text-sm font-medium transition-all">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Promote Outcome-Based Education (OBE)</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 hover:border-indigo-100/50 rounded-2xl p-3.5 text-xs md:text-sm font-medium transition-all">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Ensure effective curriculum delivery</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 hover:border-indigo-100/50 rounded-2xl p-3.5 text-xs md:text-sm font-medium transition-all">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Integrate ICT-enabled learning</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 hover:border-indigo-100/50 rounded-2xl p-3.5 text-xs md:text-sm font-medium transition-all">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Support diverse learners</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 hover:border-indigo-100/50 rounded-2xl p-3.5 text-xs md:text-sm font-medium transition-all">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Enhance critical thinking & employability</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 hover:border-indigo-100/50 rounded-2xl p-3.5 text-xs md:text-sm font-medium transition-all">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Continuous teaching quality improvement</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "Guidelines",
      title: "Guidelines",
      icon: <Layers className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-slate-600 animate-fadeIn">
          <div className="p-4 border border-slate-100/80 bg-slate-50/50 hover:bg-white rounded-2xl flex flex-col gap-3">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base border-b border-slate-100 pb-1.5 flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-500" /> Teaching Framework
            </h5>
            <ul className="flex flex-col gap-2 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Aligned with CBCS & OBE
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Define Course Outcomes (COs)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Structured Lesson Plans
              </li>
            </ul>
          </div>

          <div className="p-4 border border-slate-100/80 bg-slate-50/50 hover:bg-white rounded-2xl flex flex-col gap-3">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base border-b border-slate-100 pb-1.5 flex items-center gap-2">
              <Compass className="h-4 w-4 text-indigo-500" /> Student-Centric Pedagogy
            </h5>
            <ul className="flex flex-col gap-2 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Experiential learning
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Group discussions & seminars
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Case-based & Collaborative learning
              </li>
            </ul>
          </div>

          <div className="p-4 border border-slate-100/80 bg-slate-50/50 hover:bg-white rounded-2xl flex flex-col gap-3">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base border-b border-slate-100 pb-1.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" /> ICT Enabled
            </h5>
            <ul className="flex flex-col gap-2 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> LMS, Google Classroom
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Video & blended learning modules
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Digital teaching aides & slides
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "Implementation",
      title: "Implementation Mechanism",
      icon: <Settings className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>IQAC prepares the annual academic calendar</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Departments plan specific semester activities</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Faculty maintain detailed lesson plans and course files</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Orientation, bridge programs, and student inductions</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Structured Continuous Internal Assessment (CIA)</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "Monitoring",
      title: "Monitoring, Evaluation & Feedback",
      icon: <FileText className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Lesson plan verification against daily academic coverage</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Precise syllabus tracking and student engagement checks</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Digital student feedback collection on teaching delivery</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Academic and Administrative Audits (AAA) are conducted regularly</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Action Taken Reports (ATR) are documented by the IQAC</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "FacultyDevelopment",
      title: "Faculty Development",
      icon: <Award className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Workshops, FDPs, and conferences on outcome-based instruction</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Practical training in high-end ICT tools and blended systems</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Encouragement for research-based and exploratory instruction</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "BestPractices",
      title: "Best Practices",
      icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-3 font-sans text-slate-600 animate-fadeIn">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Rural student empowerment through intensive skill enhancement</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Blended and experiential learning initiatives across all streams</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Robust mentor-mentee allocation for continuous guidance</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50/60 border border-slate-100 rounded-2xl p-3.5 text-xs md:text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Highly transparent teaching practices and public metrics</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setOpenIds(sections.map((s) => s.id));
    }
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-8 font-sans select-none animate-fadeIn">
      {/* Action header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-50 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all select-none"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Policies
        </button>

        <span className="text-xs md:text-sm font-bold bg-slate-50 border border-slate-200/60 text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider select-none">
          Review Cycle: Annual
        </span>
      </div>

      {/* Intro Hero banner */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm font-sans text-slate-600 text-base md:text-lg leading-relaxed">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-800 leading-tight">
              Teaching–Learning & Pedagogy Policy
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Curriculum & Instruction
            </p>
          </div>
        </div>

        <p className="font-normal text-slate-600 text-sm md:text-base leading-relaxed">
          St. Ann’s College for Women adopts a student-centric, outcome-based teaching–learning framework aligned with UGC, NAAC, CBCS, and OBE guidelines. The policy ensures effective curriculum delivery through innovative pedagogy, ICT integration, and inclusive practices.
        </p>
      </div>

      {/* Accordions area */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`overflow-hidden border transition-all duration-300 rounded-2xl ${
              openIds.includes(section.id)
                ? "bg-indigo-50/20 border-indigo-200/80 shadow-md"
                : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => toggleAccordion(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 outline-none text-left select-none"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 text-xs shrink-0 select-none">
                  {section.icon}
                </span>
                <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                  {section.title}
                </h4>
              </div>
            </button>

            {openIds.includes(section.id) && (
              <div className="px-6 pb-5 pt-1 border-t border-indigo-100/40 animate-fadeIn">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
