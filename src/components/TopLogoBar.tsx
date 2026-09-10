"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TopLogoBar() {
  const [headerMode, setHeaderMode] = useState<"image_v1" | "image_v2" | "text">("image_v2");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("header_display_mode");
      if (stored === "image_v1" || stored === "image_v2" || stored === "text") {
        setHeaderMode(stored);
      }
    } catch (e) {
      // Ignore
    }

    const handleUpdate = (e: any) => {
      if (e.detail && e.detail.headerMode) {
        setTimeout(() => {
          setHeaderMode(e.detail.headerMode);
        }, 0);
      }
    };

    window.addEventListener("headerCustomizerUpdate", handleUpdate);
    return () => window.removeEventListener("headerCustomizerUpdate", handleUpdate);
  }, []);

  return (
    <div
      id="top-logo-bar"
      className="w-full bg-white border-b border-slate-200/90 select-none transition-all duration-200 shadow-xs"
      style={{
        backgroundColor: "var(--logo-bar-bg, #ffffff)",
        borderColor: "var(--logo-bar-border, #e2e8f0)",
        paddingTop: "var(--logo-bar-padding-y, 0px)",
        paddingBottom: "var(--logo-bar-padding-y, 0px)"
      }}
    >
      <div
        className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 sm:gap-3 md:gap-4 transition-all duration-200 py-0"
        style={{ minHeight: "var(--logo-bar-height, 92px)" }}
      >
        
        {/* Left: Official College Logo & Full Header Graphic / Text */}
        <Link 
          href="/" 
          className="flex items-center gap-3 sm:gap-4 group shrink-0 self-stretch py-0"
          style={{ gap: "var(--logo-bar-left-gap, 16px)" }}
        >
          <img
            src="/images/Crest_Logo.png?v=full_v5"
            alt="St. Ann's College Crest Logo"
            className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-xs shrink-0 py-0"
            style={{ 
              height: "var(--crest-logo-size, 92px)", 
              maxHeight: "160px",
              display: "var(--crest-logo-display, block)",
              marginLeft: "var(--crest-logo-offset, 0px)"
            }}
          />

          {/* Option 1: Image Version 1 (4 lines) */}
          {headerMode === "image_v1" && (
            <img
              src="/images/Stanns_CLG_Website_Header_v1.png?v=full_v5"
              alt="St. Ann's College for Women (4-line)"
              className="w-auto object-contain select-none transition-all duration-300 animate-fadeIn py-0 shrink-0"
              style={{ 
                height: "var(--header-graphic-size, 92px)", 
                maxWidth: "var(--header-graphic-max-width, 680px)",
                maxHeight: "160px" 
              }}
            />
          )}

          {/* Option 2: Image Version 2 (6 lines with address) */}
          {headerMode === "image_v2" && (
            <img
              src="/images/Stanns_CLG_Website_Header_without_background.png?v=full_v5"
              alt="St. Ann's College for Women (6-line)"
              className="w-auto object-contain select-none transition-all duration-300 animate-fadeIn py-0 shrink-0"
              style={{ 
                height: "var(--header-graphic-size, 92px)", 
                maxWidth: "var(--header-graphic-max-width, 680px)",
                maxHeight: "160px" 
              }}
            />
          )}

          {/* Option 3: Live HTML Typography Text Mode */}
          {headerMode === "text" && (
            <div
              className="flex flex-col justify-center select-none transition-all duration-200 animate-fadeIn py-0"
              style={{
                fontFamily: "var(--header-text-font, inherit)",
                textAlign: "var(--header-text-align, left)" as any,
                alignItems: "var(--header-text-align-items, flex-start)" as any,
                maxWidth: "var(--header-graphic-max-width, 680px)"
              }}
            >
              <h1
                className="font-black tracking-tight leading-none uppercase select-none transition-colors duration-200 w-full"
                style={{
                  fontSize: "var(--header-line1-size, var(--header-title-size, 21px))",
                  color: "var(--header-line1-color, var(--header-title-color, #002b49))",
                  fontFamily: "var(--header-title-font, var(--font-outfit, inherit))",
                  textAlign: "inherit"
                }}
              >
                ST. ANN’S COLLEGE FOR WOMEN
              </h1>
              <span
                className="font-bold tracking-tight leading-tight mt-0.5 w-full"
                style={{
                  fontSize: "var(--header-line2-size, var(--header-sub-size, 11px))",
                  color: "var(--header-line2-color, var(--header-sub-color, var(--header-title-color, #1e3a8a)))",
                  textAlign: "inherit"
                }}
              >
                Run by The Society of St Anne
              </span>
              <span
                className="font-semibold tracking-tight leading-tight mt-0.5 w-full"
                style={{
                  fontSize: "var(--header-line3-size, var(--header-sub-size, 11px))",
                  color: "var(--header-line3-color, var(--header-accent-color, var(--header-title-color, #991b1b)))",
                  textAlign: "inherit"
                }}
              >
                Affiliated to Acharya Nagarjuna University, Approved by AICTE
              </span>
              <span
                className="font-semibold tracking-tight leading-tight w-full"
                style={{
                  fontSize: "var(--header-line4-size, var(--header-sub-size, 11px))",
                  color: "var(--header-line4-color, var(--header-accent-color, var(--header-title-color, #991b1b)))",
                  textAlign: "inherit"
                }}
              >
                Recognized under Section 2(f) of the UGC Act, 1956, New Delhi.
              </span>
              <span
                className="font-semibold tracking-tight leading-tight w-full"
                style={{
                  fontSize: "var(--header-line5-size, var(--header-sub-size, 11px))",
                  color: "var(--header-line5-color, var(--header-sub-color, var(--header-title-color, #0369a1)))",
                  textAlign: "inherit"
                }}
              >
                Accredited by NAAC with &lsquo;A&rsquo; Grade in the First Cycle
              </span>
              <span
                className="font-bold tracking-tight leading-tight mt-0.5 w-full"
                style={{
                  fontSize: "var(--header-line6-size, var(--header-address-size, 10.5px))",
                  color: "var(--header-line6-color, var(--header-address-color, var(--header-title-color, #002b49)))",
                  textAlign: "inherit"
                }}
              >
                Amaravathi Road, Gorantla, Guntur–34, Andhra Pradesh, India.
              </span>
            </div>
          )}
        </Link>

        {/* Right: Accreditations (29+ Years, NAAC, AICTE) & Apply Now CTA Button */}
        <div 
          className="flex items-center gap-3 sm:gap-4 shrink-0 self-stretch py-0"
          style={{ gap: "var(--logo-bar-gap, 16px)" }}
        >
          <div 
            className="flex items-center gap-2.5 sm:gap-3.5 h-full py-0"
            style={{ gap: "var(--logo-bar-gap, 14px)" }}
          >
            {/* 29+ Years of Excellence Graphic */}
            <div 
              className="flex items-center h-full py-0 shrink-0"
              style={{ display: "var(--logo-29years-display, flex)" }}
            >
              <img
                src="/images/29years--logo.png?v=full_v5"
                alt="29+ Years of Excellence (1997 - 2026)"
                className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs py-0 shrink-0"
                style={{ height: "var(--logo-29years-size, 92px)", maxHeight: "160px" }}
              />
            </div>

            {/* Divider Line */}
            <div 
              className="h-10 sm:h-12 w-px bg-slate-200 hidden sm:block shrink-0"
              style={{ display: "var(--logo-29years-display, block)" }}
            />

            {/* NAAC 'A' Accreditation with Side Text */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 group cursor-default h-full py-0 shrink-0"
              title="Accredited by NAAC with 'A' Grade in the first cycle"
              style={{ display: "var(--logo-naac-display, flex)" }}
            >
              <img
                src="/images/naac_logo_clean.png?v=full_v5"
                alt="NAAC 'A' Grade"
                className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs py-0 shrink-0"
                style={{ height: "var(--logo-naac-size, 92px)", maxHeight: "160px" }}
              />
              <div 
                className="flex flex-col text-left leading-tight shrink-0"
                style={{ display: "var(--logo-naac-text-display, flex)" }}
              >
                <span 
                  className="text-xs sm:text-sm font-black text-amber-600 tracking-tight"
                  style={{ fontSize: "var(--logo-naac-text-size, 13px)" }}
                >
                  NAAC &apos;A&apos;
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Accreditation
                </span>
              </div>
            </div>

            {/* Divider Line */}
            <div 
              className="h-10 sm:h-12 w-px bg-slate-200 hidden sm:block shrink-0"
              style={{ display: "var(--logo-aicte-display, block)" }}
            />

            {/* AICTE Approved with Side Text */}
            <div
              className="hidden sm:flex items-center gap-1.5 sm:gap-2 group cursor-default h-full py-0 shrink-0"
              title="Approved by All India Council for Technical Education (AICTE), New Delhi for MCA & MBA"
              style={{ display: "var(--logo-aicte-display, flex)" }}
            >
              <img
                src="/images/AICTE_Logo.png?v=full_v5"
                alt="AICTE Approved"
                className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs py-0 shrink-0"
                style={{ height: "var(--logo-aicte-size, 92px)", maxHeight: "160px" }}
              />
              <div 
                className="flex flex-col text-left leading-tight shrink-0"
                style={{ display: "var(--logo-aicte-text-display, flex)" }}
              >
                <span 
                  className="text-xs sm:text-sm font-black text-blue-900 tracking-tight"
                  style={{ fontSize: "var(--logo-aicte-text-size, 13px)" }}
                >
                  AICTE
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Approved
                </span>
              </div>
            </div>
          </div>

          {/* Apply Now button with AISHE Code below */}
          <div className="flex flex-col items-center justify-center gap-1 shrink-0 py-1">
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
