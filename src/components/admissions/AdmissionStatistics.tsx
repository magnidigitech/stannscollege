"use client";

import React from "react";
import { BarChart3, FileText, Eye, TrendingUp, ShieldCheck, ArrowUpRight, PieChart } from "lucide-react";

export function AdmissionStatistics() {
  const ugStats = [
    { year: "2025–2026", apps: "450+", admitted: 405, sanctioned: 425, pct: "95.2%" },
    { year: "2024–2025", apps: "435+", admitted: 398, sanctioned: 425, pct: "93.6%" },
    { year: "2023–2024", apps: "420+", admitted: 390, sanctioned: 425, pct: "91.7%" },
  ];

  const pgStats = [
    { year: "2025–2026", apps: "150+", admitted: 116, sanctioned: 120, pct: "96.6%" },
    { year: "2024–2025", apps: "145+", admitted: 112, sanctioned: 120, pct: "93.3%" },
    { year: "2023–2024", apps: "130+", admitted: 108, sanctioned: 120, pct: "90.0%" },
  ];

  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <BarChart3 className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white/15 backdrop-blur px-5 py-2 rounded-full w-fit text-blue-50">
            Strategic Performance Indicators
          </span>
          <h2 className="font-outfit text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Admission Statistics
          </h2>
          <p className="text-blue-100/90 font-semibold text-lg md:text-xl mt-2 max-w-3xl leading-relaxed">
            Visualizing enrollment health, demand-supply tracking indexes and cumulative annual admissions data across under-graduate and master domains.
          </p>
        </div>
      </div>

      {/* Overview Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Avg Intake Fill Rate", val: "93.4%", sub: "Cumulative Admissions", c: "text-[#002147] bg-[#002147]/5" },
          { label: "Annual Inquiries Received", val: "580+", sub: "UG & PG Inquiries", c: "text-indigo-600 bg-indigo-50" },
          { label: "Growth Projection", val: "+4.5%", sub: "Year on Year Trend", c: "text-emerald-700 bg-emerald-50" }
        ].map((v, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{v.label}</span>
            <div className="flex items-baseline justify-between gap-2">
              <h4 className={`font-outfit text-3xl md:text-4xl font-black ${v.c.split(" ")[0]}`}>{v.val}</h4>
              <div className={`h-10 w-10 rounded-xl ${v.c.split(" ")[1]} flex items-center justify-center text-[#002147]`}>
                {idx === 0 ? <PieChart className="h-5 w-5" /> : idx === 1 ? <TrendingUp className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </div>
            </div>
            <p className="text-slate-500 font-semibold text-sm">{v.sub}</p>
          </div>
        ))}
      </div>

      {/* 1. Undergraduate Admissions Table */}
      <div className="flex flex-col gap-8 pt-2">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">I. UG Admissions Trend Tracker</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h4 className="font-outfit font-black text-slate-800 text-lg">Annual Undergrad Intakes</h4>
            <span className="bg-emerald-100 text-emerald-950 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">Validated Quality</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-base">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-black border-b border-slate-200 uppercase tracking-widest text-xs">
                  <th className="py-5 px-8">Academic Session</th>
                  <th className="py-5 px-8 text-center">No. of Applications</th>
                  <th className="py-5 px-8 text-center">Students Admitted</th>
                  <th className="py-5 px-8 text-center">Sanctioned Intake</th>
                  <th className="py-5 px-8 text-center bg-indigo-50/20 font-black text-[#002147]">Admission Rate (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-bold text-[15px] md:text-base">
                {ugStats.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-5 px-8 font-black text-[#002147]">{item.year}</td>
                    <td className="py-5 px-8 text-center text-slate-600">{item.apps}</td>
                    <td className="py-5 px-8 text-center">{item.admitted}</td>
                    <td className="py-5 px-8 text-center text-slate-400 font-black">{item.sanctioned}</td>
                    <td className="py-5 px-8 text-center bg-indigo-50/10 font-black text-lg text-indigo-950">{item.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Postgraduate Admissions Table */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">II. PG Admissions Trend Tracker</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h4 className="font-outfit font-black text-slate-800 text-lg">Annual Master Level Intakes</h4>
            <span className="bg-indigo-100 text-indigo-950 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">High Demand</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-base">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-black border-b border-slate-200 uppercase tracking-widest text-xs">
                  <th className="py-5 px-8">Academic Session</th>
                  <th className="py-5 px-8 text-center">No. of Applications</th>
                  <th className="py-5 px-8 text-center">Students Admitted</th>
                  <th className="py-5 px-8 text-center">Sanctioned Intake</th>
                  <th className="py-5 px-8 text-center bg-indigo-50/20 font-black text-[#002147]">Admission Rate (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-bold text-[15px] md:text-base">
                {pgStats.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-5 px-8 font-black text-[#002147]">{item.year}</td>
                    <td className="py-5 px-8 text-center text-slate-600">{item.apps}</td>
                    <td className="py-5 px-8 text-center">{item.admitted}</td>
                    <td className="py-5 px-8 text-center text-slate-400 font-black">{item.sanctioned}</td>
                    <td className="py-5 px-8 text-center bg-indigo-50/10 font-black text-lg text-indigo-950">{item.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Archive PDF Section */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-4">
        <div className="flex flex-col gap-2 max-w-xl">
          <h4 className="font-outfit font-black text-slate-900 text-xl md:text-2xl tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600" /> Audited Quality Reports
          </h4>
          <p className="text-slate-600 font-semibold text-[15px] leading-relaxed mt-1">
            Complete audited annual lists as submitted to state monitoring portals are archived for verification. You may view the core PDF registers by request at registration counters.
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm font-black text-[#002147] tracking-widest text-xs uppercase text-center cursor-default flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" /> Certified Internal Quality Records
        </div>
      </div>

    </div>
  );
}
