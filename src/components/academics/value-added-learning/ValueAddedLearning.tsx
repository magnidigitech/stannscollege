"use client";

import { Award, Briefcase, CheckCircle, ClipboardList, Star, GraduationCap } from "lucide-react";

export function ValueAddedLearning() {
  const stats = [
    { count: "3+", label: "Primary Domains" },
    { count: "300+", label: "Enrolled Annual Students" },
    { count: "100%", label: "Practical Outcome Focus" }
  ];

  const courses = [
    { sNo: 1, title: "Communication Skills", category: "Value-Added", department: "English", year: "2025–26", duration: "4 Weeks", enrolled: 120, outcome: "Certificate" },
    { sNo: 2, title: "Tally with GST", category: "Add On", department: "Commerce", year: "2025–26", duration: "6 Weeks", enrolled: 80, outcome: "Practical Skills" },
    { sNo: 3, title: "Python Programming", category: "Certificate", department: "Computer Science", year: "2025–26", duration: "8 Weeks", enrolled: 100, outcome: "Skill Development" }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-[#002147]" /> Academics Extra
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Value-Added Learning
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#002147] to-[#003f7d] rounded-[2rem] p-8 md:p-10 text-white shadow-md border border-white/5">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <p className="text-sm md:text-base leading-relaxed font-medium text-indigo-100">
            The institution is committed to enhancing student competencies beyond the prescribed curriculum through Value-Added, Add-on, and Certificate Courses.
          </p>
          <p className="text-xs md:text-sm font-normal text-blue-100/80 leading-relaxed">
            Offered in collaboration with reputed organizations and industry experts, these programs equip students with practical exposure, technical proficiency, and career-oriented skills, preparing them to meet global challenges.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4 md:grid md:grid-cols-3 lg:flex lg:flex-col">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col text-center">
              <span className="font-outfit font-black text-2xl md:text-3xl text-white leading-tight">{stat.count}</span>
              <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-blue-200 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Breakdown Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
        {[
          { title: "Add-on Courses", icon: ClipboardList, color: "from-indigo-500 to-indigo-600" },
          { title: "Certificate Courses", icon: Star, color: "from-amber-500 to-amber-600" },
          { title: "Value-Added Courses", icon: GraduationCap, color: "from-teal-500 to-teal-600" }
        ].map((cat, i) => (
          <div key={i} className="bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md`}>
              <cat.icon className="h-6 w-6" />
            </div>
            <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base">{cat.title}</h4>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
              Targeted modules to augment academic transcripts and cultivate key domain knowledge.
            </p>
          </div>
        ))}
      </div>

      {/* Highlight Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-4">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
          <h3 className="font-outfit text-base font-black text-[#002147] flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#002147]" /> Current / Proposed Courses List
          </h3>
          <span className="bg-[#002147]/5 border border-[#002147]/10 text-[#002147] font-bold text-[10px] px-3 py-1 rounded-full uppercase">A.Y. 2025-26</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm font-sans border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 font-black uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6 text-center w-16">S.No</th>
                <th className="py-3.5 px-6">Course Title</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6 text-center">Duration</th>
                <th className="py-3.5 px-6 text-center">Enrolled</th>
                <th className="py-3.5 px-6">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              {courses.map((c) => (
                <tr key={c.sNo} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-4 px-6 text-center text-slate-400">{c.sNo}</td>
                  <td className="py-4 px-6 font-black text-[#002147]">{c.title}</td>
                  <td className="py-4 px-6 text-slate-500">{c.category} ({c.department})</td>
                  <td className="py-4 px-6 text-center text-slate-500">{c.duration}</td>
                  <td className="py-4 px-6 text-center text-slate-800">{c.enrolled}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-100">
                      {c.outcome}
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
