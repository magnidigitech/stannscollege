"use client";

import { LineChart, Users, CheckCircle2, BarChart3, ClipboardList, Award, GraduationCap } from "lucide-react";

export function AcademicQualityIndicators() {
  const stats = [
    { label: "Student–Teacher Ratio", count: "20:1", year: "A.Y. 2025-2026", color: "from-indigo-500 to-indigo-600" },
    { label: "Total Students", count: "889", year: "A.Y. 2025-2026", color: "from-emerald-500 to-emerald-600" },
    { label: "Total Core Faculty", count: "45", year: "A.Y. 2025-2026", color: "from-[#002147] to-indigo-950" }
  ];

  const evaluationStructure = [
    { component: "Mid Examinations", weight: "20%" },
    { component: "Assignments / Projects", weight: "5%" },
    { component: "Seminars / Presentations", weight: "5%" },
    { component: "Attendance & Participation", weight: "---" },
    { component: "End Semester Exam", weight: "70%" }
  ];

  const indicatorsList = [
    "Pass Percentage Trends",
    "Distinction / First Class Success Rates",
    "University Ranks / Special Achievements",
    "Progression to Prominent Higher Education",
    "Continuous Placement Records",
    "PO & CO Attainment Auditing"
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <LineChart className="h-4 w-4 text-[#002147]" /> Quality Frameworks
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Academic Quality Indicators
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The institution ensures academic excellence through systematic monitoring of key quality indicators aligned with National Assessment and Accreditation Council (NAAC) guidelines under the Teaching–Learning and Evaluation criteria.
      </p>

      {/* Stat Blocks Section 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
        {stats.map((item, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-[2rem] shadow-md flex flex-col gap-2 justify-between relative overflow-hidden group`}>
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform"></div>
            <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-white/70">{item.label}</span>
            <div className="flex flex-col mt-2">
              <span className="font-outfit font-black text-3xl md:text-4xl tracking-tight leading-none">{item.count}</span>
              <span className="text-[10px] font-medium text-white/60 mt-2">{item.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Evaluation vs Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
        
        {/* Evaluation Grid Block */}
        <div className="md:col-span-6 flex flex-col gap-5 bg-white border border-slate-200/60 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-1.5 pb-4 border-b border-slate-100">
            <h3 className="font-outfit text-base md:text-lg font-black text-[#002147] flex items-center gap-2">
              <ClipboardList className="h-5 w-5" /> 2. Internal Evaluation System
            </h3>
            <p className="text-slate-400 text-xs font-medium">Continuous Internal Evaluation (CIE) Structure</p>
          </div>
          <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">
            Follows a transparent, continuous, and student-centric system tracking seminars, assignments, and comprehensive mid exams.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            {evaluationStructure.map((e, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 font-sans text-xs md:text-sm font-bold text-slate-700">
                <span>{e.component}</span>
                <span className="text-[#002147] bg-[#002147]/5 px-3 py-1 rounded-lg border border-[#002147]/10">{e.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics Indicators */}
        <div className="md:col-span-6 flex flex-col gap-5 bg-[#002147]/5 border border-[#002147]/10 rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col gap-1.5 pb-4 border-b border-[#002147]/10">
            <h3 className="font-outfit text-base md:text-lg font-black text-[#002147] flex items-center gap-2">
              <BarChart3 className="h-5 w-5" /> 3. Key Indicators Monitored
            </h3>
            <p className="text-slate-500 text-xs font-medium">Institutional Progress Tracking & QA</p>
          </div>
          <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
            The college quality assurance cell monitors performance milestones regularly.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            {indicatorsList.map((ind, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold text-xs md:text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#002147] flex-shrink-0" />
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
