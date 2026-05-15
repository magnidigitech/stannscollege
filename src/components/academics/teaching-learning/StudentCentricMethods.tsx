"use client";

import { Users, BookOpen, FileCheck, Presentation, Award, Lightbulb, CheckCircle } from "lucide-react";

export function StudentCentricMethods() {
  const methods = [
    { sNo: 1, method: "Experiential Learning", desc: "Learning by doing", activities: "Internships, Field Visits", outcome: "Real-world application", icon: BookOpen },
    { sNo: 2, method: "Participative Learning", desc: "Active student role", activities: "Group Work, Peer Learning", outcome: "Enhanced teamwork", icon: Users },
    { sNo: 3, method: "Problem-Solving", desc: "Analytical approach", activities: "Case Studies, Assignments", outcome: "Critical thinking", icon: Lightbulb },
    { sNo: 4, method: "Project-Based Learning", desc: "Learning through projects", activities: "Mini / Major Projects", outcome: "Application skills", icon: FileCheck },
    { sNo: 5, method: "Student Seminars", desc: "Student presentations", activities: "PPT / Oral Presentations", outcome: "Confidence building", icon: Presentation },
    { sNo: 6, method: "Competitions", desc: "Skill enhancement activities", activities: "Quiz, Debate", outcome: "Creativity & skills", icon: Award },
  ];

  const coreOutcomes = [
    "Improved critical thinking & communication skills",
    "Enhanced employability prospects",
    "Empirical & practical knowledge application"
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-[#002147]" /> Teaching & Learning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Student-Centric Methods
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The institution emphasizes student-centric learning approaches that actively engage students in the learning process, promoting autonomy, creativity, and experiential understanding.
      </p>

      {/* Highlight Outcomes Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-200/60 p-6 rounded-[2rem]">
        {coreOutcomes.map((text, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <span className="h-8 w-8 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl shadow-inner shrink-0">
              <CheckCircle className="h-4 w-4" />
            </span>
            <p className="font-sans text-slate-800 font-bold text-xs md:text-sm leading-snug mt-1">{text}</p>
          </div>
        ))}
      </div>

      {/* Grid of 6 Student Centric Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {methods.map((item) => (
          <div key={item.sNo} className="bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:border-[#002147]/20 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#002147]/5 text-[#002147] group-hover:bg-[#002147] group-hover:text-white flex items-center justify-center shadow-sm transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-black text-slate-800 text-sm md:text-base group-hover:text-[#002147] transition-colors">
                  {item.method}
                </h3>
              </div>
              <span className="h-6 w-6 rounded-full bg-slate-100 text-slate-400 font-bold text-[10px] flex items-center justify-center shrink-0">{(item.sNo)}</span>
            </div>
            <div className="flex flex-col gap-1 font-sans text-xs">
              <span className="text-slate-400 uppercase tracking-wide font-bold text-[9px]">Focus</span>
              <p className="text-slate-700 font-bold">{item.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-1 bg-slate-50/80 border border-slate-100 rounded-2xl p-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-bold uppercase text-[8px] tracking-widest">Activities</span>
                <span className="font-bold text-slate-600 leading-tight text-[11px]">{item.activities}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-bold uppercase text-[8px] tracking-widest">Key Outcome</span>
                <span className="font-bold text-emerald-700 leading-tight text-[11px]">{item.outcome}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
