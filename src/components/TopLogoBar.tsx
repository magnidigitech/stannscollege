"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopLogoBar() {
  return (
    <div
      id="top-logo-bar"
      className="w-full bg-white border-b border-slate-200/90 select-none transition-colors duration-200 shadow-xs"
      style={{
        backgroundColor: "var(--logo-bar-bg, #ffffff)",
        borderColor: "var(--logo-bar-border, #e2e8f0)"
      }}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        
        {/* Left: Official College Logo & Full Header Graphic */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          <img
            src="/images/Stanns_CLG_Website_Logo_without_background.png"
            alt="St. Ann's College Logo"
            className="h-12 sm:h-14 md:h-[58px] lg:h-[62px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-xs"
          />
          <img
            src="/images/Stanns_CLG_Website_Header_without_background.png?v=2"
            alt="St. Ann's College for Women"
            className="h-12 sm:h-14 md:h-[58px] lg:h-[62px] w-auto max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl object-contain select-none"
          />
        </Link>

        {/* Right: Accreditations (29+ Years, NAAC, AICTE) & Apply Now CTA Button */}
        <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 29+ Years of Excellence Graphic */}
            <div className="flex items-center">
              <img
                src="/images/29_years+_logo-no_background.png"
                alt="29+ Years of Excellence (1997 - 2026)"
                className="h-11 sm:h-12 md:h-[50px] lg:h-[52px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs"
              />
            </div>

            {/* Divider Line */}
            <div className="h-9 sm:h-10 w-px bg-slate-200 hidden sm:block" />

            {/* NAAC 'A' Accreditation with Side Text */}
            <div
              className="flex items-center gap-2 sm:gap-2.5 group cursor-default"
              title="Accredited by NAAC with 'A' Grade in the first cycle"
            >
              <img
                src="/images/Naac_A_no_background.png?v=2"
                alt="NAAC 'A' Grade"
                className="h-11 sm:h-12 md:h-[50px] lg:h-[52px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs"
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-black text-amber-600 tracking-tight">
                  NAAC &apos;A&apos;
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Accreditation
                </span>
              </div>
            </div>

            {/* Divider Line */}
            <div className="h-9 sm:h-10 w-px bg-slate-200 hidden sm:block" />

            {/* AICTE Approved with Side Text */}
            <div
              className="hidden sm:flex items-center gap-2 sm:gap-2.5 group cursor-default"
              title="Approved by All India Council for Technical Education (AICTE), New Delhi for MCA & MBA"
            >
              <img
                src="/images/AICTE_seal_hd.png?v=2"
                alt="AICTE Approved"
                className="h-11 sm:h-12 md:h-[50px] lg:h-[52px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs"
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-black text-blue-900 tracking-tight">
                  AICTE
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Approved
                </span>
              </div>
            </div>
          </div>

          {/* Apply Now button with AISHE Code below */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <Link
              href="/admissions/policy-process"
              className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 sm:px-5 py-2 font-bold text-white text-xs hover:shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95 duration-300 hover:-translate-y-0.5 group/btn select-none shrink-0 border border-emerald-400/30 shadow-xs"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
            <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 tracking-tight select-none">
              AISHE Code: <span className="text-slate-700 font-extrabold">C-39493</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TopLogoBar;
