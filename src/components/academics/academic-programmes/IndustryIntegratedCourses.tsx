"use client";

import { CheckCircle, Cpu, Briefcase, Users, Award, FileCheck } from "lucide-react";

export function IndustryIntegratedCourses() {
  const dynamicComponents = [
    { icon: Cpu, text: "Hands-on training and practical sessions" },
    { icon: FileCheck, text: "Industry-relevant curriculum and tools" },
    { icon: Users, text: "Guest lectures by professionals" },
    { icon: Briefcase, text: "Internships and live projects" },
    { icon: Award, text: "Certification aligned with industry standards" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Briefcase className="h-4 w-4 text-[#002147]" /> Academic Programmes
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Industry – Integrated Courses / Skill-Oriented / Career-Oriented Courses
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
          Industry-Integrated Courses are programmes designed in collaboration with industry experts to ensure that students gain practical skills, real-world exposure, and job-ready competencies along with academic knowledge.
        </p>
        <p className="text-[#002147] font-bold text-sm md:text-base bg-[#002147]/5 border border-[#002147]/10 p-4 rounded-2xl leading-relaxed">
          These courses bridge the gap between classroom learning and industry requirements by incorporating:
        </p>
      </div>

      {/* Features Grid with Sleek Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {dynamicComponents.map((comp, idx) => (
          <div key={idx} className="bg-white border border-slate-200/60 p-5 rounded-2xl hover:shadow-md hover:border-[#002147]/20 transition-all flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-[#002147]/5 flex items-center justify-center text-[#002147] flex-shrink-0">
              <comp.icon className="h-5 w-5" />
            </div>
            <p className="font-sans text-xs md:text-sm font-semibold text-slate-700 leading-snug">
              {comp.text}
            </p>
          </div>
        ))}
      </div>

      {/* Impact Info */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003f7d] p-8 rounded-3xl text-white flex flex-col gap-3 shadow-lg relative overflow-hidden border border-white/10">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <h3 className="font-outfit text-xl font-black tracking-tight flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-teal-400" /> Career Readiness & Employability
        </h3>
        <p className="text-indigo-100 font-normal leading-relaxed text-sm md:text-base max-w-2xl">
          Such programmes enhance students’ employability, technical expertise, and career readiness, preparing them to meet the evolving demands of the professional world.
        </p>
      </div>
    </div>
  );
}
