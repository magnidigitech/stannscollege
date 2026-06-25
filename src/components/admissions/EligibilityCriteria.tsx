"use client";

import React from "react";
import { CheckCircle2, ClipboardList, GraduationCap, BookOpen, AlertCircle, ShieldCheck, FileCheck } from "lucide-react";

export function EligibilityCriteria() {
  const eligibilityMap = [
    {
      category: "Commerce Programmes",
      courses: "B.Com Honours – General / Computer Applications",
      streams: "Open to all streams (CEC / MEC / MPC / BiPC / Vocational)",
      note: "Commerce background preferred but not mandatory"
    },
    {
      category: "Computer Applications",
      courses: "BCA Honours - Computer Applications",
      streams: "MPC (Mathematics, Physics, Chemistry) – Preferred. MEC / CEC (Commerce) and BiPC (Science) – Eligible.",
      note: "Vocational courses also eligible depending on subject relevance"
    },
    {
      category: "Computer Sciences",
      courses: "B.Sc Honours – Computer Science / Artificial Intelligence",
      streams: "Candidates must have passed Intermediate (10+2) or equivalent with Mathematics at Intermediate level.",
      note: "Students from MPC stream are highly preferred"
    },
    {
      category: "Physical Sciences",
      courses: "B.Sc Honours – Mathematics / Physics / Statistics",
      streams: "Mathematics is mandatory for Maths/Stats streams (MPC). MPC/BiPC students eligible for Physics.",
      note: "Requires solid grounding in core physical theories"
    },
    {
      category: "Life Sciences",
      courses: "B.Sc Honours – Microbiology / Biotechnology / Botany / Chemistry",
      streams: "Candidates from BiPC (Biology, Physics, Chemistry) stream are highly preferred.",
      note: "MPC students may also apply based on subject quotas"
    }
  ];

  const mandatoryOriginals = [
    "SSC (10th Class) Original Marks Memo",
    "Intermediate (10+2) Original Marks Memo / Equivalent",
    "Transfer Certificate (T.C.)",
    "Study Certificates (Class VI to X & Intermediate)",
    "Migration Certificate (Required for non-local/other state boards)",
    "OAMDC (UG) or ICET (PG) Seat Allotment Order",
    "Recent Passport Size Photographs (6 copies)"
  ];

  const photocopiesList = [
    "Intermediate Marks Memo (Online copy accepted)",
    "Aadhaar Card (Mandatory for both Student & Parents)",
    "ABC / APAAR ID (Latest Government Mandate)",
    "Latest Income Certificate (Issued in 2026)",
    "Latest Caste/Community Certificate (If applicable)",
    "EWS Certificate (Latest 2026, if eligible under OC quota)",
    "Residence / Domicile Certificate",
    "New White Ration Card",
    "Nationalized Bank Passbook (1st page copy)",
    "Active Mobile Number & Email ID (Linked with student portfolio)",
    "Extra-curricular (Sports / NCC / NSS) Certificates (If applicable)"
  ];

  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <ClipboardList className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 font-black text-[10px] md:text-xs uppercase tracking-widest bg-white/15 backdrop-blur px-4 py-1.5 rounded-full w-fit text-blue-50">
            Academic Prerequisites
          </span>
          <h2 className="font-outfit text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Eligibility & Required Documents
          </h2>
          <p className="text-blue-100/80 font-semibold text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
            Ensure you fulfill the minimum academic stream qualifications and organize the mandatory checklist records before reporting for admission verification.
          </p>
        </div>
      </div>

      {/* 1. Stream Eligibilities */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Programme Stream Eligibility Matrix</h3>
        </div>

        <div className="flex flex-col gap-6">
          {eligibilityMap.map((e, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pl-2">
                <div className="flex flex-col gap-3 flex-1">
                  <span className="text-indigo-600 font-black uppercase tracking-widest text-xs">{e.category}</span>
                  <h4 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight">{e.courses}</h4>
                  <p className="text-slate-600 font-semibold text-base md:text-lg mt-1 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-1 shrink-0" />
                    <span>{e.streams}</span>
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl min-w-[260px] lg:max-w-[300px] h-fit">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Mandatory Note</span>
                  <p className="text-slate-850 font-black text-sm md:text-[15px] leading-relaxed">{e.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Mandatory Documents & Checklist */}
      <div className="flex flex-col gap-8 pt-4">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <FileCheck className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Mandatory Document Checklists</h3>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/60 rounded-3xl p-6 md:p-8 flex gap-4 items-start text-amber-950 font-semibold text-base">
          <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-black">Note for Admitted Candidates:</strong> You must submit <span className="underline font-black text-amber-900">Original Certificates plus Three complete sets of photocopies</span>. Ensure all documents are completely legible and valid up to date.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category A */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="h-12 w-12 rounded-2xl bg-[#002147] text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-outfit font-black text-slate-850 text-lg md:text-xl">A. Original Certificates</h4>
                <p className="text-slate-500 text-xs md:text-sm font-semibold">Compulsory Records to be Submitted</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {mandatoryOriginals.map((doc, i) => (
                <div key={i} className="flex items-start gap-3.5 p-4 bg-slate-50/60 border border-slate-200/60 rounded-2xl text-slate-800 font-bold text-[15px] md:text-base leading-snug">
                  <span className="h-6 w-6 bg-white border border-[#002147]/10 text-[#002147] rounded-full flex items-center justify-center shrink-0 font-black text-xs shadow-xs">{i+1}</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category B */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-outfit font-black text-slate-850 text-lg md:text-xl">B. Photocopies Checklist</h4>
                <p className="text-slate-500 text-xs md:text-sm font-semibold">3 Complete Xerox Sets Required</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3.5">
              {photocopiesList.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 font-semibold text-slate-700 text-sm md:text-[15px] leading-relaxed border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
