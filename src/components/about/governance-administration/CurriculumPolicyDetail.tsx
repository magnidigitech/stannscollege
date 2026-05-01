"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Compass, Target, Layers, Settings, FileText, Sparkles, BookOpen, CheckCircle, RefreshCcw, Award, Calendar, BadgeCheck, Shield } from "lucide-react";

export function CurriculumPolicyDetail({ onBack }: { onBack: () => void }) {
  const [openIds, setOpenIds] = useState<string[]>(["purpose"]);

  const sections = [
    {
      id: "purpose",
      title: "Purpose",
      icon: <Compass className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-4 text-slate-600 font-sans">
          <p className="text-base font-normal leading-relaxed">
            To establish a <strong className="text-slate-800">systematic framework for curriculum design, delivery, and evaluation</strong> that:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <li className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-sm md:text-base font-normal">
              <CheckCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <span>Aligns with national and university regulations</span>
            </li>
            <li className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-sm md:text-base font-normal">
              <CheckCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <span>Enhances student learning outcomes</span>
            </li>
            <li className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-sm md:text-base font-normal">
              <CheckCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <span>Promotes employability and holistic development</span>
            </li>
            <li className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-sm md:text-base font-normal">
              <CheckCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <span>Ensures inclusivity and accessibility</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "objectives",
      title: "Objectives",
      icon: <Target className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-600 font-sans">
          <div className="p-4 bg-slate-50/60 border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-indigo-500" /> Alignment with Vision & Mission
            </h5>
            <p className="text-xs md:text-sm text-slate-500">Ensure curriculum reflects institutional goals and values</p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-indigo-500" /> Regulatory Compliance
            </h5>
            <p className="text-xs md:text-sm text-slate-500">Follow CBCS & OBE frameworks prescribed by UGC, APSCHE, and ANU</p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-indigo-500" /> Outcome-Based Learning
            </h5>
            <p className="text-xs md:text-sm text-slate-500">Define and implement COs, POs, and PSOs for measurable learning</p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-indigo-500" /> Holistic Development
            </h5>
            <p className="text-xs md:text-sm text-slate-500">Integrate life skills, ethics, and entrepreneurship</p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-indigo-500" /> Inclusivity
            </h5>
            <p className="text-xs md:text-sm text-slate-500">Support students from rural and diverse backgrounds</p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1.5 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-indigo-500" /> Employability Enhancement
            </h5>
            <p className="text-xs md:text-sm text-slate-500">Strengthen career skills, higher education readiness, and innovation</p>
          </div>
        </div>
      )
    },
    {
      id: "policy-guidelines",
      title: "Policy Guidelines",
      icon: <Layers className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-6 text-slate-600 font-sans">
          <div className="p-4 bg-slate-50/60 border border-slate-100/80 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2 border-b border-slate-100/80 pb-1.5">
              Curriculum Framework
            </h5>
            <ul className="flex flex-col gap-1.5 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> UG programmes follow APSCHE curriculum
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> PG programmes (MBA, MCA) follow Acharya Nagarjuna University guidelines
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Strict adherence to CBCS regulations
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50/60 border border-slate-100/80 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2 border-b border-slate-100/80 pb-1.5">
              Outcome-Based Education (OBE)
            </h5>
            <ul className="flex flex-col gap-1.5 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Clearly defined COs, POs, and PSOs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> CO–PO mapping using Bloom’s Taxonomy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Continuous outcome-based evaluation
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50/60 border border-slate-100/80 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2 border-b border-slate-100/80 pb-1.5">
              Academic Preparedness
            </h5>
            <ul className="flex flex-col gap-1.5 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Faculty prepare Course Files, Lesson Plans, Academic Plans
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Syllabus shared with students at semester start
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "implementation",
      title: "Implementation Mechanism",
      icon: <Settings className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600 font-sans">
          <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-500" /> Academic Planning
            </h5>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              IQAC prepares institutional academic calendar to set schedules and continuous operational review timelines.
            </p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
              <Award className="h-4 w-4 text-indigo-500" /> Teaching-Learning Process
            </h5>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              ICT-enabled teaching (LMS, Google Classroom), continuous internal assessments, and strictly structured lesson delivery.
            </p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-500" /> Induction & Bridge
            </h5>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              Orientation and bridge programs are held for incoming students to smoothen their transition into higher education.
            </p>
          </div>
          <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-500" /> Continuous Monitoring
            </h5>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              Principal & Academic Council actively oversee dynamic implementation and syllabus completion within exact timelines.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "monitoring",
      title: "Monitoring, Evaluation & Feedback",
      icon: <FileText className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="flex flex-col gap-4 text-slate-600 font-sans">
          <div className="p-4 bg-indigo-50/20 border border-indigo-100/60 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2">
              Outcome Assessment & Reviews
            </h5>
            <ul className="flex flex-col gap-2 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Regular CO–PO attainment analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Use of direct and indirect assessment methods
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Thorough review of lesson plans and course files
              </li>
            </ul>
          </div>

          <div className="p-4 bg-indigo-50/20 border border-indigo-100/60 rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2">
              Feedback Loop
            </h5>
            <ul className="flex flex-col gap-2 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Digital feedback collection via structured Google Forms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Stakeholders include: Students, Alumni, Employers, and Faculty
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Action Taken Reports (ATR) are documented and maintained
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "quality",
      title: "Quality Assurance & Distinctiveness",
      icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-600 font-sans">
          <div className="p-4 border border-slate-100/80 bg-slate-50/50 hover:bg-white rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2">
              Quality Assurance (QA)
            </h5>
            <ul className="flex flex-col gap-1.5 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Regular Academic & Administrative Audits (AAA)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Continuous improvement drives by the IQAC
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Systematic feedback processing and ATR updates
              </li>
            </ul>
          </div>

          <div className="p-4 border border-slate-100/80 bg-slate-50/50 hover:bg-white rounded-2xl">
            <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mb-2">
              Institutional Distinctiveness
            </h5>
            <ul className="flex flex-col gap-1.5 text-xs md:text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Rural student empowerment through active skilling
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Mandatory skill integration & digital support
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500" /> Transparent academic practices across departments
              </li>
            </ul>
          </div>
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
      {/* Top action header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-50 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all select-none"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Policies
        </button>

        <span className="text-xs md:text-sm font-bold bg-slate-50 border border-slate-200/60 text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider select-none">
          Drafted: June 2024
        </span>
      </div>

      {/* Hero Detail Area */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm font-sans text-slate-600 text-base md:text-lg leading-relaxed">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-800 leading-tight">
              Curriculum Planning and Development Policy (CBCS/OBE)
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Academics & Strategy
            </p>
          </div>
        </div>

        <p className="font-normal text-slate-600 text-sm md:text-base leading-relaxed">
          St. Ann’s College for Women adopts a structured and progressive approach to curriculum planning and development aligned with the <strong>Choice Based Credit System (CBCS)</strong> and <strong>Outcome-Based Education (OBE)</strong>.
          This policy ensures a student-centric, skill-oriented, and inclusive academic framework that promotes academic excellence, multidisciplinary learning, and career readiness.
        </p>
      </div>

      {/* Dynamic Tabs/Accordion area */}
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
