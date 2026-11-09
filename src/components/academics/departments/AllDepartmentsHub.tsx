"use client";

import React from "react";
import Link from "next/link";
import { Building, GraduationCap, ArrowRight, Sparkles, BookOpen, Settings } from "lucide-react";
import academicsData from "../academics-data.json";

export function AllDepartmentsHub() {
  const departmentsData = academicsData.departments.map((dept, idx) => ({
    id: dept.id,
    name: dept.name,
    established: dept.established,
    number: idx + 1,
    description: dept.description,
    type: dept.id.includes("mca") || dept.id.includes("mba") ? "PG Professional Dept" : "UG Academic Dept"
  }));

  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002147] to-[#0b3d77] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="absolute right-0 bottom-0 opacity-[0.05] transform translate-x-1/6 translate-y-1/6 pointer-events-none">
          <Building className="h-72 w-72" />
        </div>
        <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[10px] font-black tracking-wider uppercase w-fit text-indigo-100">
            <Sparkles className="h-3 w-3 text-amber-400" /> Academic Spectrum
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-tight mt-1">
            Academic Departments
          </h2>
          <p className="text-blue-100 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
            13 distinct departments offering comprehensive undergraduate, postgraduate, and language disciplines fostering intellectual growth, industry readiness, and research orientation.
          </p>
        </div>
      </div>

      {/* Grid of 13 Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentsData.map((dept) => (
          <Link
            key={dept.id}
            href={`/academics/departments/${dept.id}`}
            className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#002147]/30 transition-all flex flex-col justify-between gap-5 relative overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="h-8 w-8 rounded-xl bg-[#002147]/5 text-[#002147] font-black text-xs flex items-center justify-center border border-[#002147]/10">
                  {dept.number}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  Est. {dept.established}
                </span>
              </div>
              <h3 className="font-outfit text-base font-bold text-slate-800 group-hover:text-[#002147] transition-colors leading-snug">
                {dept.name}
              </h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3">
                {dept.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
              <span className="text-[11px] font-bold text-[#002147] bg-[#002147]/5 px-2.5 py-1 rounded-lg">
                {dept.type}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#002147] group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
