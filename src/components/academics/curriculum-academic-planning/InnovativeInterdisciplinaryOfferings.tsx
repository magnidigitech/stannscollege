"use client";

import { Sparkles, Lightbulb, ExternalLink } from "lucide-react";

export function InnovativeInterdisciplinaryOfferings() {
  const coreStatements = [
    "Single Major with Minor structure (UG Honours)",
    "Cross-disciplinary electives and open courses",
    "Industry-relevant and skill-oriented programmes",
    "Project-based, experiential, and research-oriented learning",
    "Exposure to emerging areas such as AI, Data Science, and Biotechnology",
  ];

  const sem2Courses = [
    { name: "Introduction to Social Work", pdf: "/documents/innovative-offerings/multidisciplinary/sem2/Introduction%20to%20Social%20Work.pdf" },
    { name: "Principles of Psychology", pdf: "/documents/innovative-offerings/multidisciplinary/sem2/Principles%20of%20Psychology.pdf" },
    { name: "Indian History", pdf: "/documents/innovative-offerings/multidisciplinary/sem2/Indian%20History.pdf" },
    { name: "Principles of Biological Sciences", pdf: "/documents/innovative-offerings/multidisciplinary/sem2/Principles%20of%20Biological%20Sciences.pdf" },
    { name: "Principles of Chemical Sciences", pdf: "/documents/innovative-offerings/multidisciplinary/sem2/Principles%20of%20Chemical%20Sciences.pdf" },
    { name: "Principles of Physical Sciences", pdf: "/documents/innovative-offerings/multidisciplinary/sem2/Principles%20of%20Physical%20Sciences.pdf" },
  ];

  const sem3Courses = [
    { name: "Introduction to Public Administration", pdf: "/documents/innovative-offerings/multidisciplinary/sem3/Introduction%20to%20Public%20Administration.pdf" },
    { name: "Principles of Management", pdf: "/documents/innovative-offerings/multidisciplinary/sem3/Principles%20of%20Management.pdf" },
    { name: "Principles of Accounting", pdf: "/documents/innovative-offerings/multidisciplinary/sem3/Principles%20of%20Accounting.pdf" },
    { name: "Basic Electronics", pdf: "/documents/innovative-offerings/multidisciplinary/sem3/Basic%20Electronics.pdf" },
    { name: "Health and Hygiene", pdf: "/documents/innovative-offerings/multidisciplinary/sem3/Health%20and%20Hygine.pdf" },
    { name: "Basic Mathematics", pdf: "/documents/innovative-offerings/multidisciplinary/sem3/Basic%20Mathematics.pdf" },
  ];

  const sem4Courses = [
    { name: "Fundamentals of Economics", pdf: "/documents/innovative-offerings/multidisciplinary/sem4/Fundamentals%20of%20Economics.pdf" },
    { name: "Indian Philosophy", pdf: "/documents/innovative-offerings/multidisciplinary/sem4/Indian%20Philosophy.pdf" },
    { name: "Performing Arts", pdf: "/documents/innovative-offerings/multidisciplinary/sem4/Performing%20Arts.pdf" },
    { name: "Introduction to Geography", pdf: "/documents/innovative-offerings/multidisciplinary/sem4/Introduction%20to%20Geography.pdf" },
    { name: "Basic Statistics", pdf: "/documents/innovative-offerings/multidisciplinary/sem4/Basic%20Statistics.pdf" },
    { name: "Introduction to Nanotechnology", pdf: "/documents/innovative-offerings/multidisciplinary/sem4/Introduction%20to%20Nanotechnology.pdf" },
  ];

  const skillCourses = [
    { title: "Semester - I", name: "Introduction to Artificial Intelligence", pdf: "/documents/innovative-offerings/skill-enhancement/Introduction%20to%20Artificial%20Intelligence_1.pdf" },
    { title: "Semester - II", name: "Applications of Artificial Intelligence", pdf: "/documents/innovative-offerings/skill-enhancement/Applications%20of%20Artificial%20Intelligence%20skill-2.pdf" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-[#002147]" /> Curriculum & Academic Planning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Innovative & Interdisciplinary Offerings
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The institution promotes innovation and interdisciplinary learning to prepare students for evolving academic and professional environments.
      </p>

      {/* Core Bullet Points */}
      <div className="bg-[#002147]/[0.02] border border-[#002147]/10 rounded-3xl p-6 flex flex-col gap-4">
        {coreStatements.map((statement, idx) => (
          <div key={idx} className="flex items-start gap-3 text-slate-600 font-medium text-xs md:text-sm leading-relaxed">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></span>
            {statement}
          </div>
        ))}
      </div>

      {/* Multidisciplinary Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mt-4">
        <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm border border-amber-100">
          <Sparkles className="h-4 w-4" />
        </div>
        <h3 className="font-outfit text-lg font-black text-[#002147]">Multidisciplinary Courses Syllabus</h3>
      </div>

      {/* Semesters Map */}
      <div className="space-y-8">
        {/* Semester 1 */}
        <div className="bg-slate-50 rounded-3xl p-5 md:p-6 border border-slate-200/50">
          <h4 className="font-outfit text-sm font-black text-slate-500 uppercase tracking-wider mb-2">Semester I</h4>
          <p className="text-slate-400 font-medium text-xs italic">At present, no multidisciplinary course is offered in Semester I.</p>
        </div>

        {/* Semester 2 */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 bg-indigo-50/40 border-b border-slate-100">
            <h4 className="font-outfit text-sm font-black text-[#002147] uppercase tracking-wider mb-1">Semester II</h4>
            <p className="text-slate-500 text-[11px] font-medium leading-snug">
              <span className="font-bold text-slate-700">Note:</span> Students must choose ONE course. Selection of courses already studied at Higher Secondary / 12th level or major discipline is not permitted.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-slate-100">
            {sem2Courses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/50 transition-all">
                <span className="font-sans text-xs md:text-sm font-bold text-slate-700">{item.name}</span>
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-[11px] text-indigo-600 hover:underline ml-4 shrink-0"
                >
                  View PDF <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Semester 3 */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 bg-teal-50/40 border-b border-slate-100">
            <h4 className="font-outfit text-sm font-black text-teal-950 uppercase tracking-wider mb-1">Semester III</h4>
            <p className="text-slate-500 text-[11px] font-medium leading-snug">
              <span className="font-bold text-slate-700">Note:</span> Choose ONE course. Repetition of previously studied subjects is not allowed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-slate-100">
            {sem3Courses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/50 transition-all">
                <span className="font-sans text-xs md:text-sm font-bold text-slate-700">{item.name}</span>
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-[11px] text-teal-700 hover:underline ml-4 shrink-0"
                >
                  View PDF <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Semester 4 */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 bg-violet-50/40 border-b border-slate-100">
            <h4 className="font-outfit text-sm font-black text-violet-950 uppercase tracking-wider mb-1">Semester IV</h4>
            <p className="text-slate-500 text-[11px] font-medium leading-snug">
              <span className="font-bold text-slate-700">Note:</span> Choose ONE course. Avoid selecting subjects studied earlier or your core discipline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-slate-100">
            {sem4Courses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/50 transition-all">
                <span className="font-sans text-xs md:text-sm font-bold text-slate-700">{item.name}</span>
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-[11px] text-violet-700 hover:underline ml-4 shrink-0"
                >
                  View PDF <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Enhancement Section */}
      <div className="bg-gradient-to-br from-[#002147] to-[#003366] rounded-3xl text-white overflow-hidden shadow-lg mt-6">
        <div className="p-6 border-b border-white/10 bg-white/[0.03]">
          <h3 className="font-outfit text-base font-black tracking-tight">Skill Enhancement Courses Syllabus w.e.f A.Y 2025-2026</h3>
        </div>
        <div className="divide-y divide-white/10 font-sans">
          {skillCourses.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-white/[0.02] transition-all gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-indigo-200 font-bold text-xs uppercase tracking-wider">{item.title}</span>
                <span className="text-sm md:text-base font-black leading-tight">{item.name}</span>
              </div>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-full font-bold text-xs transition-all"
              >
                View PDF <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

