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
        paddingTop: "var(--logo-bar-padding-y, 10px)",
        paddingBottom: "var(--logo-bar-padding-y, 10px)"
      }}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 transition-all duration-200">
        
        {/* Left: Official College Logo & Full Header Graphic / Text */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          {/* College Crest Logo Box */}
          <div
            id="crest-logo-box"
            className="flex items-center justify-center p-1.5 sm:p-2 rounded-2xl border shadow-xs transition-all duration-200 shrink-0"
            style={{
              backgroundColor: "var(--crest-box-bg, #ffffff)",
              borderColor: "var(--crest-box-border, rgba(0, 0, 0, 0.08))"
            }}
          >
            <img
              src="/images/Stanns_CLG_Website_Logo_without_background.png"
              alt="St. Ann's College Logo"
              className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-xs shrink-0"
              style={{ height: "var(--crest-logo-size, 64px)" }}
            />
          </div>

          {/* Option 1: Image Version 1 (4 lines) */}
          {headerMode === "image_v1" && (
            <img
              src="/images/Stanns_CLG_Website_Header_v1.png"
              alt="St. Ann's College for Women (4-line)"
              className="w-auto max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl object-contain select-none transition-all duration-300 animate-fadeIn"
              style={{ height: "var(--header-graphic-size, 64px)" }}
            />
          )}

          {/* Option 2: Image Version 2 (6 lines with address) */}
          {headerMode === "image_v2" && (
            <img
              src="/images/Stanns_CLG_Website_Header_without_background.png?v=3"
              alt="St. Ann's College for Women (6-line)"
              className="w-auto max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl object-contain select-none transition-all duration-300 animate-fadeIn"
              style={{ height: "var(--header-graphic-size, 64px)" }}
            />
          )}

          {/* Option 3: Live HTML Typography Text Mode */}
          {headerMode === "text" && (
            <div
              className="flex flex-col justify-center select-none transition-all duration-200 animate-fadeIn"
              style={{
                fontFamily: "var(--header-text-font, inherit)",
                textAlign: "var(--header-text-align, left)" as any,
                alignItems: "var(--header-text-align-items, flex-start)" as any
              }}
            >
              <h1
                className="font-black tracking-tight leading-none uppercase select-none transition-colors duration-200 w-full"
                style={{
                  fontSize: "var(--header-title-size, 21px)",
                  color: "var(--header-title-color, #002b49)",
                  fontFamily: "var(--header-title-font, var(--font-outfit, inherit))",
                  textAlign: "inherit"
                }}
              >
                ST. ANN’S COLLEGE FOR WOMEN
              </h1>
              <span
                className="font-bold tracking-tight leading-tight mt-0.5 w-full"
                style={{
                  fontSize: "var(--header-sub-size, 11px)",
                  color: "var(--header-sub-color, var(--header-title-color, #1e3a8a))",
                  textAlign: "inherit"
                }}
              >
                Run by The Society of St Anne
              </span>
              <span
                className="font-semibold tracking-tight leading-tight mt-0.5 w-full"
                style={{
                  fontSize: "var(--header-sub-size, 11px)",
                  color: "var(--header-accent-color, var(--header-title-color, #991b1b))",
                  textAlign: "inherit"
                }}
              >
                Affiliated to Acharya Nagarjuna University, Approved by AICTE
              </span>
              <span
                className="font-semibold tracking-tight leading-tight w-full"
                style={{
                  fontSize: "var(--header-sub-size, 11px)",
                  color: "var(--header-accent-color, var(--header-title-color, #991b1b))",
                  textAlign: "inherit"
                }}
              >
                Recognized under Section 2(f) of the UGC Act, 1956, New Delhi.
              </span>
              <span
                className="font-semibold tracking-tight leading-tight w-full"
                style={{
                  fontSize: "var(--header-sub-size, 11px)",
                  color: "var(--header-sub-color, var(--header-title-color, #0369a1))",
                  textAlign: "inherit"
                }}
              >
                Accredited by NAAC with &lsquo;A&rsquo; Grade in the First Cycle
              </span>
              <span
                className="font-bold tracking-tight leading-tight mt-0.5 w-full"
                style={{
                  fontSize: "var(--header-address-size, 10.5px)",
                  color: "var(--header-address-color, var(--header-title-color, #002b49))",
                  textAlign: "inherit"
                }}
              >
                Amaravathi Road, Gorantla, Guntur–34, Andhra Pradesh, India.
              </span>
            </div>
          )}
        </Link>

        {/* Right: Accreditations (29+ Years, NAAC, AICTE) & Apply Now CTA Button */}
        <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
          {/* Accreditation Logos Box */}
          <div
            id="top-logos-box"
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border shadow-xs transition-all duration-200"
            style={{
              backgroundColor: "var(--logo-box-bg, #ffffff)",
              borderColor: "var(--logo-box-border, rgba(0, 0, 0, 0.08))"
            }}
          >
            {/* 29+ Years of Excellence Graphic */}
            <div className="flex items-center">
              <img
                src="/images/29_years+_logo-no_background.png"
                alt="29+ Years of Excellence (1997 - 2026)"
                className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs"
                style={{ height: "var(--accreditation-logos-size, 52px)" }}
              />
            </div>

            {/* Divider Line */}
            <div
              className="h-9 sm:h-10 w-px hidden sm:block transition-colors duration-200"
              style={{ backgroundColor: "var(--logo-box-divider, rgba(0, 0, 0, 0.12))" }}
            />

            {/* NAAC 'A' Accreditation with Side Text */}
            <div
              className="flex items-center gap-2 sm:gap-2.5 group cursor-default"
              title="Accredited by NAAC with 'A' Grade in the first cycle"
            >
              <img
                src="/images/Naac_A_no_background.png?v=2"
                alt="NAAC 'A' Grade"
                className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs"
                style={{ height: "var(--accreditation-logos-size, 52px)" }}
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs sm:text-sm font-black text-amber-600 tracking-tight">
                  NAAC &apos;A&apos;
                </span>
                <span
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide transition-colors duration-200"
                  style={{ color: "var(--logo-box-text, #334155)" }}
                >
                  Accreditation
                </span>
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="h-9 sm:h-10 w-px hidden sm:block transition-colors duration-200"
              style={{ backgroundColor: "var(--logo-box-divider, rgba(0, 0, 0, 0.12))" }}
            />

            {/* AICTE Approved with Side Text */}
            <div
              className="hidden sm:flex items-center gap-2 sm:gap-2.5 group cursor-default"
              title="Approved by All India Council for Technical Education (AICTE), New Delhi for MCA & MBA"
            >
              <img
                src="/images/AICTE_seal_hd.png?v=2"
                alt="AICTE Approved"
                className="w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs"
                style={{ height: "var(--accreditation-logos-size, 52px)" }}
              />
              <div className="flex flex-col text-left leading-tight">
                <span
                  className="text-xs sm:text-sm font-black tracking-tight transition-colors duration-200"
                  style={{ color: "var(--logo-box-title, #1e3a8a)" }}
                >
                  AICTE
                </span>
                <span
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide transition-colors duration-200"
                  style={{ color: "var(--logo-box-text, #334155)" }}
                >
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
