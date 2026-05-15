"use client";

import { CheckCircle, BookOpen, FileText, ExternalLink } from "lucide-react";

export function CurriculumFramework() {
  const corePillars = [
    "Choice-Based Credit System (CBCS) / NEP-aligned structure",
    "Outcome-Based Education (OBE) approach",
    "Integration of skill-based and value-added courses",
    "Continuous curriculum review through feedback mechanisms",
  ];

  const singleMajorSyllabus = [
    { prog: "B.Com Honours - General", pdf: "/documents/curriculum-framework/major/1.B.Com.%20General%20Major%20Syllabus.pdf" },
    { prog: "B.Com Honours - Computer Applications", pdf: "/documents/curriculum-framework/major/2.%20B.Com.%20Computer%20Applications%20Major%20Syllabus.pdf" },
    { prog: "BCA Honours - Computer Applications", pdf: "/documents/curriculum-framework/major/3.B.C.A.%20Computer%20Applications%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Computer Science", pdf: "/documents/curriculum-framework/major/4.%20Computer%20Science%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Artificial Intelligence", pdf: "/documents/curriculum-framework/major/5.Artificial%20Intelligence%20Major%20Sylabus.pdf" },
    { prog: "B.Sc Honours - Mathematics", pdf: "/documents/curriculum-framework/major/6.Mathematics%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Physics", pdf: "/documents/curriculum-framework/major/7.%20Physics%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Statistics", pdf: "/documents/curriculum-framework/major/8.Statistics%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Microbiology", pdf: "/documents/curriculum-framework/major/9.Microbiology%20Major%20Sykkabus.pdf" },
    { prog: "B.Sc Honours - Biotechnology", pdf: "/documents/curriculum-framework/major/10.Biotechnology%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Chemistry", pdf: "/documents/curriculum-framework/major/11%20Chemistry%20Major%20Syllabus.pdf" },
    { prog: "B.Sc Honours - Botany", pdf: "/documents/curriculum-framework/major/12.%20Botany%20Major%20Sykkabus.pdf" },
  ];

  const minorSyllabus = [
    { prog: "B.Com Honours - General", minor: "Business Management", pdf: "/documents/curriculum-framework/minor/Business%20Management%20Minor.pdf" },
    { prog: "B.Com Honours - Computer Applications", minor: "Business Management", pdf: "/documents/curriculum-framework/minor/Business%20Management%20Minor.pdf" },
    { prog: "BCA Honours - Computer Applications", minor: "Digital Marketing", pdf: "/documents/curriculum-framework/minor/Digital%20Marketing%20Minor.pdf" },
    { prog: "B.Sc Honours - Computer Science", minor: "Physics", pdf: "/documents/curriculum-framework/minor/Physics%20Minor.pdf" },
    { prog: "B.Sc Honours - Artificial Intelligence", minor: "Mathematics", pdf: "/documents/curriculum-framework/minor/Mathematics%20Minor.pdf" },
    { prog: "B.Sc Honours - Mathematics", minor: "Computer Science", pdf: "/documents/curriculum-framework/minor/Computer%20Science%20Minor.pdf" },
    { prog: "B.Sc Honours - Physics", minor: "Computer Science", pdf: "/documents/curriculum-framework/minor/Computer%20Science%20Minor.pdf" },
    { prog: "B.Sc Honours - Statistics", minor: "Computer Science", pdf: "/documents/curriculum-framework/minor/Computer%20Science%20Minor.pdf" },
    { prog: "B.Sc Honours - Microbiology", minor: "Botany", pdf: "/documents/curriculum-framework/minor/Botany%20Minor.pdf" },
    { prog: "B.Sc Honours - Biotechnology", minor: "Botany", pdf: "/documents/curriculum-framework/minor/Botany%20Minor.pdf" },
    { prog: "B.Sc Honours - Chemistry", minor: "Botany", pdf: "/documents/curriculum-framework/minor/Botany%20Minor.pdf" },
    { prog: "B.Sc Honours - Botany", minor: "---", pdf: null },
  ];

  const languagesSyllabus = [
    { name: "General English", pdf: "/documents/curriculum-framework/languages/General%20English.pdf" },
    { name: "General Telugu", pdf: "/documents/curriculum-framework/languages/General%20Telugu.pdf" },
    { name: "General Sanskrit", pdf: "/documents/curriculum-framework/languages/General%20Sanskrit%20sem1.pdf" },
    { name: "General Hindi", pdf: "/documents/curriculum-framework/languages/General%20Hindi%20sem1.pdf" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-[#002147]" /> Curriculum & Academic Planning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Curriculum Framework
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The curriculum is designed to provide a balanced integration of theoretical knowledge and practical application. It is regularly updated to meet industry requirements, academic standards, and emerging global trends.
      </p>

      {/* Features Pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {corePillars.map((pill, idx) => (
          <div key={idx} className="flex items-center gap-3 px-5 py-4 bg-[#002147]/[0.02] border border-[#002147]/10 rounded-2xl">
            <CheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0" />
            <span className="text-slate-700 text-xs md:text-sm font-semibold font-sans leading-snug">{pill}</span>
          </div>
        ))}
      </div>

      {/* Major Core Framework Files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base">
              Curriculum Framework - B.Com & BCA
            </h4>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">Effective from A.Y. 2025–26</span>
          </div>
          <a
            href="/documents/curriculum-framework/framework/B.COm%20&%20BCA%20Curriculum%20Framework%202025-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-fit flex items-center gap-1.5 font-bold text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/60 px-4 py-2 rounded-full transition-all"
          >
            View PDF <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base">
              Curriculum Framework - B.Sc
            </h4>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 block">Effective from A.Y. 2025–26</span>
          </div>
          <a
            href="/documents/curriculum-framework/framework/B,Sc%20Curriculum%20Frame%20Work%202025-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-fit flex items-center gap-1.5 font-bold text-xs text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100/60 px-4 py-2 rounded-full transition-all"
          >
            View PDF <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Single Major Syllabus Section */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-4">
        <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02]">
          <h3 className="font-outfit text-base font-black text-[#002147]">Single Major Programmes Syllabus w.e.f A.Y 2025-2026</h3>
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-100">
          {singleMajorSyllabus.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/50 transition-all">
              <div className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-sans text-xs md:text-sm font-bold text-slate-700">{item.prog}</span>
              </div>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-[11px] text-[#002147] hover:underline shrink-0 pl-4"
              >
                View PDF <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Minor Syllabus Section */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-2">
        <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02]">
          <h3 className="font-outfit text-base font-black text-[#002147]">Minor Programmes Syllabus w.e.f A.Y 2025-2026</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500">
                <th className="py-3 px-6 font-bold uppercase tracking-wider">Programme</th>
                <th className="py-3 px-6 font-bold uppercase tracking-wider">Minor</th>
                <th className="py-3 px-6 font-bold uppercase tracking-wider text-right">Syllabus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {minorSyllabus.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-3.5 px-6 font-bold text-slate-700">{item.prog}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-500">{item.minor}</td>
                  <td className="py-3.5 px-6 text-right">
                    {item.pdf ? (
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[11px] text-indigo-600 hover:underline"
                      >
                        View PDF <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400 font-medium italic text-xs px-2">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Languages Section */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-2">
        <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02]">
          <h3 className="font-outfit text-base font-black text-[#002147]">Languages Syllabus w.e.f A.Y 2025-2026</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {languagesSyllabus.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-all border-b border-slate-100 last:border-b-0 md:last:border-b">
              <span className="font-sans text-xs md:text-sm font-bold text-slate-700">{item.name}</span>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-[11px] text-teal-600 hover:underline shrink-0 ml-4"
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

