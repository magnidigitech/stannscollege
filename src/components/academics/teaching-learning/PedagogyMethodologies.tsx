"use client";

import { Lightbulb, CheckCircle, FileText, PlayCircle, Users, HelpCircle, RefreshCw } from "lucide-react";

export function PedagogyMethodologies() {
  const methods = [
    { sNo: 1, method: "Lecture Method", desc: "Concept delivery with interaction", tools: "Chalk & Talk, PPTs", outcome: "Concept clarity", proof: "Lesson Plans View PDF", icon: Users },
    { sNo: 2, method: "ICT-enabled Teaching", desc: "Use of digital tools in teaching", tools: "Smart Boards, Videos", outcome: "Enhanced understanding", proof: "Photos / PPTs Link", icon: PlayCircle },
    { sNo: 3, method: "Experiential Learning", desc: "Learning through practice", tools: "Projects, Internships", outcome: "Practical exposure", proof: "View PDF", icon: CheckCircle },
    { sNo: 4, method: "Participative Learning", desc: "Student involvement in learning", tools: "Seminars, Group Discussions", outcome: "Communication skills", proof: "Activity Photos Link", icon: Lightbulb },
    { sNo: 5, method: "Problem-Solving Method", desc: "Analytical thinking approach", tools: "Case Studies, Assignments", outcome: "Critical thinking", proof: "Assignments Link", icon: HelpCircle },
    { sNo: 6, method: "Blended Learning", desc: "Combination of online & offline", tools: "LMS, Recorded Lectures", outcome: "Flexible learning", proof: "LMS Records", icon: RefreshCw },
  ];

  const keyPractices = [
    "Lecture Method with interactive discussions",
    "ICT-enabled Teaching (Smart Classrooms, PPTs, Videos)",
    "Experiential Learning (Projects, Internships, Field Work)",
    "Participative Learning (Group Discussions, Seminars, Debates)",
    "Problem-Solving & Case Study Methods",
    "Blended Learning Approaches"
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-[#002147]" /> Teaching & Learning
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Pedagogy & Learning Methodologies
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The institution adopts a dynamic and learner-centric pedagogical approach that integrates traditional teaching with modern, ICT-enabled methods. Faculty members employ innovative strategies to enhance conceptual understanding, critical thinking, and practical application of knowledge.
      </p>

      {/* Practices Pills */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="font-outfit text-base font-black text-[#002147] mb-4">Key Pedagogical Practices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {keyPractices.map((practice, idx) => (
            <div key={idx} className="flex items-start gap-3 px-4 py-3 bg-[#002147]/5 border border-[#002147]/10 rounded-xl">
              <CheckCircle className="h-4 w-4 text-[#002147] mt-0.5 shrink-0" />
              <span className="text-slate-700 text-xs md:text-sm font-semibold leading-snug">{practice}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Methodologies Table */}
      <div className="bg-white border border-slate-200/60 rounded-[2rem] shadow-sm overflow-hidden mt-2">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h3 className="font-outfit text-base font-black text-[#002147]">Dynamic Teaching & Learning Matrices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-sans border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 font-black uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Teaching Method</th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6">Tools/Techniques</th>
                <th className="py-3.5 px-6 text-center">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {methods.map((m) => (
                <tr key={m.sNo} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-[#002147]/5 text-[#002147] flex items-center justify-center shrink-0">
                        <m.icon className="h-4 w-4" />
                      </div>
                      <span className="font-black text-slate-800 text-xs md:text-sm">{m.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs leading-relaxed">{m.desc}</td>
                  <td className="py-4 px-6 text-slate-600 text-xs">{m.tools}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
                      {m.outcome}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
