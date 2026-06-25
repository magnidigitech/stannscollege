"use client";

import React from "react";
import { CreditCard, ShieldCheck, CalendarDays, AlertTriangle, Info, HelpCircle, Landmark, ArrowRight } from "lucide-react";

export function FeeStructure() {
  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <Landmark className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 font-black text-[10px] md:text-xs uppercase tracking-widest bg-white/15 backdrop-blur px-4 py-1.5 rounded-full w-fit text-blue-50">
            Financial Framework
          </span>
          <h2 className="font-outfit text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Fee Structure
          </h2>
          <p className="text-blue-100/80 font-semibold text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
            Affordable and equitable fee configurations calculated strictly as per government standards, ensuring access to world-class educational infrastructure.
          </p>
        </div>
      </div>

      {/* 1. General Policy & Norms */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-10 items-start hover:shadow-md hover:border-slate-200/80 transition-all">
        <div className="h-16 w-16 shrink-0 bg-indigo-50 text-[#002147] border border-indigo-100 rounded-3xl flex items-center justify-center shadow-sm">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div className="flex flex-col gap-4 max-w-3xl">
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight border-b pb-3 border-slate-100">Government Norm Compliance</h3>
          <p className="text-slate-700 font-semibold text-base md:text-lg leading-relaxed">
            The absolute tuition fee and auxiliary structure for all courses is prescribed explicitly according to the approved standards of the <span className="font-black text-slate-900">Government of Andhra Pradesh</span> and the regulating university body.
          </p>
          <p className="text-slate-600 text-[15px] font-semibold leading-relaxed">
            The institution maintains complete administrative transparency, eliminating all hidden components. Detailed programme-wise annual breakdowns are made accessible directly at the institutional cash counters and OAMDC portal outputs.
          </p>
        </div>
      </div>

      {/* 2. Term Payment Schedule */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <CalendarDays className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Annual Payment Timelines</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Term 1 */}
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-bl-[5rem] group-hover:scale-105 transition-transform pointer-events-none"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">Phase I Schedule</span>
              <h4 className="font-outfit text-2xl md:text-3xl font-black text-[#002147]">I Term Payments</h4>
              <div className="h-1 w-12 bg-indigo-600 rounded-full mt-1"></div>
              <p className="text-slate-600 text-[15px] font-semibold mt-3 leading-relaxed">
                Due immediately during the commencement of the academic session. Candidates are advised to clear primary processing allocations.
              </p>
              <div className="mt-6 bg-white border border-indigo-100 rounded-2xl p-4 flex items-center justify-between font-black text-[#002147]">
                <span className="text-sm">Primary Deadline</span>
                <span className="bg-indigo-100 text-indigo-950 px-4 py-2 rounded-xl tracking-wide text-sm">June Annually</span>
              </div>
            </div>
          </div>

          {/* Term 2 */}
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/5 rounded-bl-[5rem] group-hover:scale-105 transition-transform pointer-events-none"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <span className="text-teal-700 font-black text-xs uppercase tracking-widest">Phase II Schedule</span>
              <h4 className="font-outfit text-2xl md:text-3xl font-black text-[#002147]">II Term Payments</h4>
              <div className="h-1 w-12 bg-teal-600 rounded-full mt-1"></div>
              <p className="text-slate-600 text-[15px] font-semibold mt-3 leading-relaxed">
                Residual term amounts covering secondary learning modules and term examination processes. Covers the mid-year syllabus span.
              </p>
              <div className="mt-6 bg-white border border-teal-100 rounded-2xl p-4 flex items-center justify-between font-black text-teal-900">
                <span className="text-sm">Secondary Deadline</span>
                <span className="bg-teal-100 text-teal-950 px-4 py-2 rounded-xl tracking-wide text-sm">September Annually</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Notice & Fast Actions */}
      <div className="flex flex-col md:flex-row items-stretch gap-8">
        
        <div className="flex-1 bg-amber-50/60 border border-amber-200/70 rounded-3xl p-8 flex gap-4 items-start">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
          <div className="flex flex-col gap-2">
            <h4 className="font-outfit font-black text-amber-950 text-lg">Important Compliance Note</h4>
            <p className="text-amber-900/80 text-sm md:text-[15px] font-semibold leading-relaxed">
              Students must strictly adhere to the payment timelines stated. Late clearance of dues may attract prescribed statutory penalties as authorized by administrative directives. Keep receipts securely for references.
            </p>
          </div>
        </div>

        <div className="flex-1 bg-[#002147]/5 border border-[#002147]/10 rounded-3xl p-8 flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-outfit font-black text-[#002147] text-lg flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Fee Queries?</h4>
            <p className="text-slate-600 text-[14px] font-semibold mt-2">Get direct assistance from our corporate accounting desks inside main office block for specific installment plans or bank payment transfers.</p>
          </div>
          <span className="inline-flex items-center gap-2 font-black text-sm text-[#002147] uppercase tracking-wider pt-2 border-t border-slate-200/60 mt-2 cursor-default">
            Contact Admin Office <ArrowRight className="h-4 w-4" />
          </span>
        </div>

      </div>

    </div>
  );
}
