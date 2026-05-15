"use client";

import React from "react";
import Link from "next/link";
import { Building, GraduationCap, ArrowRight, Sparkles, BookOpen } from "lucide-react";

const departmentsData = [
  {
    id: "department-of-commerce",
    name: "Department of Commerce",
    established: "1997",
    courses: ["B.Com Honours (General)", "B.Com Honours (Computer Applications)"],
    type: "UG Programme"
  },
  {
    id: "department-of-computer-applications-bca",
    name: "Department of Computer Applications (BCA)",
    established: "2008",
    courses: ["BCA Honours (Computer Applications)"],
    type: "UG Programme"
  },
  {
    id: "department-of-computer-science-cs-artificial-intelligence",
    name: "Department of Computer Science & AI",
    established: "2000",
    courses: ["B.Sc Honours (Computer Science)", "B.Sc Honours (Artificial Intelligence)"],
    type: "UG Programme"
  },
  {
    id: "department-of-mathematics",
    name: "Department of Mathematics",
    established: "1997",
    courses: ["B.Sc Honours (Mathematics)"],
    type: "UG Programme"
  },
  {
    id: "department-of-physics",
    name: "Department of Physics",
    established: "1997",
    courses: ["B.Sc Honours (Physics)"],
    type: "UG Programme"
  },
  {
    id: "department-of-statistics",
    name: "Department of Statistics",
    established: "2002",
    courses: ["B.Sc Honours (Statistics)"],
    type: "UG Programme"
  },
  {
    id: "department-of-chemistry",
    name: "Department of Chemistry",
    established: "1997",
    courses: ["B.Sc Honours (Chemistry)"],
    type: "UG Programme"
  },
  {
    id: "department-of-biotechnology",
    name: "Department of Biotechnology",
    established: "2005",
    courses: ["B.Sc Honours (Biotechnology)"],
    type: "UG Programme"
  },
  {
    id: "department-of-microbiology",
    name: "Department of Microbiology",
    established: "2005",
    courses: ["B.Sc Honours (Microbiology)"],
    type: "UG Programme"
  },
  {
    id: "department-of-botany",
    name: "Department of Botany",
    established: "1997",
    courses: ["B.Sc Honours (Botany)"],
    type: "UG Programme"
  },
  {
    id: "department-of-mca",
    name: "Department of MCA",
    established: "2001",
    courses: ["Master of Computer Applications (MCA)"],
    type: "PG Programme"
  },
  {
    id: "department-of-mba",
    name: "Department of MBA",
    established: "2003",
    courses: ["Master of Business Administration (MBA)"],
    type: "PG Programme"
  },
  {
    id: "department-of-english",
    name: "Department of English",
    established: "1997",
    courses: ["Language & Communication Foundations"],
    type: "Foundation Dept"
  },
  {
    id: "department-of-oriental-languages-telugu-sanskrit-hindi",
    name: "Department of Oriental Languages",
    established: "1997",
    courses: ["Telugu, Sanskrit, & Hindi Foundations"],
    type: "Foundation Dept"
  }
];

export function AllDepartmentsHub() {
  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002147] to-[#0b3d77] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 bottom-0 opacity-[0.05] transform translate-x-1/6 translate-y-1/6 pointer-events-none">
          <Building className="h-72 w-72" />
        </div>
        <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[10px] font-black tracking-wider uppercase w-fit text-indigo-100">
            <Sparkles className="h-3 w-3 text-amber-400" /> St. Ann&apos;s Faculty Catalog
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-tight mt-1">
            Academic Departments
          </h2>
          <p className="text-blue-100/80 font-medium text-xs md:text-sm mt-1 leading-relaxed">
            Explore our 14 distinct academic departments facilitating specialized undergraduate, postgraduate, and interdisciplinary educational pathways.
          </p>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Depts", val: "14" },
          { label: "UG Programmes", val: "10" },
          { label: "PG Programmes", val: "2" },
          { label: "Faculties", val: "100+" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200/60 rounded-2xl p-4 text-center flex flex-col gap-1 shadow-sm">
            <span className="text-[#002147] font-outfit font-black text-2xl">{stat.val}</span>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Department Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {departmentsData.map((dept, index) => (
          <div key={dept.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border-b-4 hover:border-b-[#002147]/30 relative group">
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                    dept.type.includes("PG") 
                      ? "bg-indigo-50 border-indigo-100 text-indigo-600" 
                      : dept.type.includes("Foundation")
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : "bg-teal-50 border-teal-100 text-teal-600"
                  }`}>
                    {dept.type}
                  </span>
                </div>
                <h3 className="font-outfit text-base md:text-lg font-black text-slate-800 group-hover:text-[#002147] transition-colors tracking-tight mt-1">
                  {dept.name}
                </h3>
              </div>
              <div className="h-10 w-10 shrink-0 rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] flex items-center justify-center">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Courses Displayed:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dept.courses.map((c, i) => (
                  <span key={i} className="bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1.5 rounded-lg text-[11px] font-bold leading-tight">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-2 flex items-center justify-between">
              <span className="text-slate-400 font-medium text-xs">Est. {dept.established}</span>
              <Link 
                href={`/academics/departments/${dept.id}`}
                className="inline-flex items-center gap-1 font-bold text-xs text-[#002147] group-hover:underline"
              >
                Explore Profile <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
