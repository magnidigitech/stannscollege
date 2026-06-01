"use client";

import { ShieldCheck, Award, GraduationCap, CheckCircle, Award as Medal, Sparkles, BookOpen, Compass, Target, Settings, Layers, ClipboardCheck, ArrowUpRight } from "lucide-react";

export function Iqac() {
  const missionPoints = [
    { title: "Transformative Empowerment", desc: "Empower young women through education that builds intellectual strength, ethical values, and social responsibility." },
    { title: "Holistic Development", desc: "Provide a supportive environment that ensures the all-round development of students, especially from rural and underprivileged backgrounds." },
    { title: "Optimal Learning Ecosystem", desc: "Maintain an eco-friendly campus and a progressive learning environment that encourages innovation and exploration." },
    { title: "Social Responsibility", desc: "Develop self-reliant, employable individuals who contribute positively to society." }
  ];

  const coreObjectives = [
    "Developing a system for continuous and consistent improvement in academic and administrative performance.",
    "Promoting a quality-driven culture through institutional best practices.",
    "Ensuring excellence through planned and result-oriented initiatives."
  ];

  const strategicFramework = [
    { title: "Efficiency", desc: "Timely execution of academic, administrative, and financial processes." },
    { title: "Relevance", desc: "Adoption of modern, industry-aligned academic and research programs." },
    { title: "Equity", desc: "Accessibility and affordability of education for all sections of society." },
    { title: "Innovation", desc: "Integration of advanced tools and technologies in teaching and evaluation." },
    { title: "Accountability", desc: "Transparent assessment systems and effective support structures." },
    { title: "Collaboration", desc: "Partnerships and knowledge-sharing with national and international institutions." }
  ];

  const functionsAndResponsibilities = [
    { title: "Benchmarking", desc: "Establishing and implementing quality standards for academic and administrative processes." },
    { title: "Learner-Centric Approach", desc: "Promoting participatory teaching-learning practices and faculty development initiatives." },
    { title: "Feedback Mechanism", desc: "Collecting, analyzing, and acting upon feedback from students, parents, and stakeholders." },
    { title: "Academic Enrichment", desc: "Organizing workshops, seminars, and quality initiatives to foster excellence." },
    { title: "Documentation & MIS", desc: "Maintaining comprehensive records of institutional activities through digital systems." },
    { title: "Quality Audits", desc: "Conducting Academic and Administrative Audits (AAA) and ensuring follow-up actions." },
    { title: "NAAC Compliance", desc: "Preparing and submitting the Annual Quality Assurance Report (AQAR) as per NAAC guidelines." }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <Compass className="h-3.5 w-3.5" /> St. Ann&apos;s College for Women
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Internal Quality Assurance Cell (IQAC)
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Playing a pivotal role in sustaining and enhancing academic excellence as a structured quality sustenance mechanism.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Overview with Coordinator Card */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        {/* Narrative */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 shadow-sm">
              <Compass className="h-5 w-5" />
            </span>
            <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
              Facilitative & Participative Growth
            </h3>
          </div>
          <p className="leading-relaxed font-normal text-slate-600 text-sm md:text-base mb-4">
            The **Internal Quality Assurance Cell (IQAC)** plays a pivotal role in sustaining and enhancing academic excellence. Established in line with NAAC guidelines, IQAC functions as a <strong className="text-indigo-600 font-bold">post-accreditation quality sustenance mechanism</strong>, ensuring continuous improvement in institutional performance.
          </p>
          <p className="leading-relaxed font-normal text-slate-500 text-sm md:text-base">
            Under the leadership of **Mrs. R. Sharon Rose, IQAC Coordinator**, the cell operates as a **facilitative and participative body**, focusing on systematic planning, evaluation, and quality enhancement. Rather than being a hierarchical unit, IQAC acts as a **dynamic and functional system** that drives institutional growth.
          </p>
        </div>

        {/* Coordinator Image */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center select-none shrink-0">
          <div className="relative group overflow-hidden rounded-2xl border border-slate-100/80 shadow-md aspect-[4/5] w-full max-w-[240px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/key-functionaries/iqac-coordinator.jpg"
              alt="Mrs. R. Sharon Rose - IQAC Coordinator"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-4 text-center select-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
              IQAC Coordinator
            </span>
            <h4 className="font-outfit text-lg font-black text-slate-800 leading-tight">
              Mrs. R. Sharon Rose
            </h4>
            <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide leading-relaxed">
              Academic Leader & Head of Cell
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Core Objectives Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision & Objectives */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
              <Compass className="h-5 w-5 text-indigo-600" /> Vision & Focus
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              To foster a culture of quality as the defining attribute of the institution by **institutionalizing best practices and promoting excellence**, supported by both internal and external stakeholders.
            </p>

            <h5 className="font-outfit text-sm font-bold text-slate-800 border-b border-slate-50 pb-2 mb-3">Core Objectives:</h5>
            <div className="flex flex-col gap-3 text-xs md:text-sm font-normal text-slate-600">
              {coreObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 border-b border-slate-50 last:border-0 pb-1.5 last:pb-0">
                  <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Framework */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-indigo-600" /> Strategic Framework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {strategicFramework.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <span className="font-black font-outfit text-sm text-indigo-600 flex items-center gap-1 leading-snug">
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 font-normal leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transformative Mission Row */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-2 flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" /> Mission Goals
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          IQAC initiatives align with core institutional empowerment milestones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {missionPoints.map((mp, index) => (
            <div key={index} className="p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300">
              <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                {mp.title}
              </h5>
              <p className="text-xs md:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                {mp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Functions & Key Responsibilities List Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-2 flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" /> Functions & Key Responsibilities
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6">
          Systematic assessment mechanisms directed toward achieving continuous operational growth.
        </p>

        <div className="flex flex-col gap-4">
          {functionsAndResponsibilities.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-slate-50 last:border-0 pb-3.5 last:pb-0">
              <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 font-black text-indigo-600 text-xs shrink-0 select-none">
                {index + 1}
              </span>
              <div className="flex-1 flex flex-col">
                <span className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight">
                  {item.title}
                </span>
                <span className="text-xs md:text-sm font-normal text-slate-500 leading-relaxed mt-0.5">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
