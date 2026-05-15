"use client";

import React from "react";
import { Award, CheckCircle2, Landmark, Compass, ShieldCheck, Sparkles, HelpCircle, ExternalLink } from "lucide-react";

export function ScholarshipsFreeships() {
  const scholarshipTypes = [
    {
      title: "Government Post-Matric Scholarships",
      desc: "Exclusively organized under the regulatory departments of Andhra Pradesh for all eligible backward, minority and reserved student portfolios.",
      tag: "AP State Sponsored"
    },
    {
      title: "Full/Partial Fee Reimbursements",
      desc: "Transparent state-governed support covering program tuition payments directly processed via Jagananna Vidya Deevena or affiliated models.",
      tag: "Tuition Reimbursements"
    },
    {
      title: "Merit-Based Performance Awards",
      desc: "Special grants reserved for exceptional academic toppers achieving high GPA milestones across institutional final examinations.",
      tag: "Academic Merit"
    },
    {
      title: "Economically Weaker Assistance",
      desc: "Discretionary financial allowances aimed at lowering administrative barriers for economically challenged students to sustain learning continuity.",
      tag: "Equity & Welfare"
    }
  ];

  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Award className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white/15 backdrop-blur px-5 py-2 rounded-full w-fit text-blue-50">
            Student Aid & Grants
          </span>
          <h2 className="font-outfit text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Scholarships & Freeships
          </h2>
          <p className="text-blue-100/90 font-semibold text-lg md:text-xl mt-2 max-w-3xl leading-relaxed">
            Fostering equity and unconstrained access to quality higher learning by facilitating various governmental and institutional assistance schemes.
          </p>
        </div>
      </div>

      {/* 1. Available Schemes Grid */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Key Financial Assistance Channels</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scholarshipTypes.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 hover:border-indigo-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="flex flex-col gap-4">
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-950 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-wider w-fit">{s.tag}</span>
                <h4 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight group-hover:text-indigo-600 transition-colors leading-snug">{s.title}</h4>
                <p className="text-slate-600 font-semibold text-base leading-relaxed mt-1">{s.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-[#002147] border-t border-slate-100 pt-4 font-black text-sm uppercase tracking-wide">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Governed by Regulation
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Institutional Support Matrix */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-lg mt-4">
        <div className="absolute top-0 right-0 bg-white/5 h-[400px] w-[400px] rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col gap-8">
          {/* Full-Width Header */}
          <div className="flex flex-col gap-4 max-w-4xl pb-8 border-b border-white/10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/10 px-5 py-1.5 text-xs font-black tracking-widest uppercase w-fit text-indigo-100">
              Compliance Desk
            </span>
            <h3 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Complete Institutional Guidance & Support
            </h3>
            <p className="text-slate-300 text-base md:text-lg font-semibold leading-relaxed max-w-3xl">
              Our designated administrative officers assist you along each stage of scholarship validation, paperwork, and state submission protocols.
            </p>
          </div>

          {/* Row-Wise Support List */}
          <div className="flex flex-col gap-4 w-full font-sans">
            {[
              { t: "Scheme Identification", d: "Proactive screening of eligible students for matching scholarship pools based on state matrices." },
              { t: "Documentation Assistance", d: "Validating certificates, incomes, and residence documents before final portal submission." },
              { t: "Continuous Portal Support", d: "Troubleshooting Jnanabhumi portal uploads and mandatory biometric confirmation logistics." },
              { t: "Disbursement Tracking", d: "Consistently monitoring government releases to ensure accurate fee clearances in record modules." }
            ].map((pt, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-4 shrink-0 lg:min-w-[300px] lg:max-w-[300px]">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  </div>
                  <h4 className="font-outfit font-black text-emerald-300 text-lg md:text-xl tracking-tight group-hover:text-emerald-200 transition-colors">
                    {pt.t}
                  </h4>
                </div>
                <p className="text-slate-200 text-base md:text-[17px] font-semibold leading-relaxed flex-1">
                  {pt.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AP Government Portals Quick Nav */}
      <div className="bg-emerald-50/40 border border-emerald-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h4 className="font-outfit font-black text-[#002147] text-xl tracking-tight">External Portal Quicklinks</h4>
          <p className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed max-w-xl">
            To submit your application online or track your post-matric scholarship payouts, please navigate directly to the official state portals.
          </p>
        </div>
        <a 
          href="https://jnanabhumi.ap.gov.in/" 
          target="_blank" 
          rel="noreferrer"
          className="w-fit inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base px-7 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex-shrink-0 cursor-pointer"
        >
          Jnanabhumi Portal AP <ExternalLink className="h-5 w-5" />
        </a>
      </div>

    </div>
  );
}
