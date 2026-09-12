"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdmissionEnquiryModal } from "./admissions/AdmissionEnquiryModal";

export function TopLogoBar() {
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenEnquiry = () => {
      setIsAdmissionModalOpen(true);
    };

    window.addEventListener("open-admission-enquiry", handleOpenEnquiry);
    return () => {
      window.removeEventListener("open-admission-enquiry", handleOpenEnquiry);
    };
  }, []);

  return (
    <div
      id="top-logo-bar"
      className="w-full border-b border-white/15 select-none shadow-xs"
      style={{ backgroundColor: "#000080" }}
    >
      <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-3 min-h-[92px] py-1">

        {/* Left: Official College Logo & Full Header Graphic / Text */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group shrink-0 self-stretch py-0"
        >
          <img
            src="/images/Crest_Logo.png?v=full_v5"
            alt="St. Ann's College Crest Logo"
            className="h-[90px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-xs shrink-0 py-0"
          />

          {/* Hardcoded Institutional Typography (Center-Aligned) */}
          <div className="flex flex-col justify-center items-center text-center select-none py-0 max-w-[620px]">
            <h1 className="font-black text-[22px] sm:text-[24px] tracking-tight leading-none uppercase select-none text-white font-outfit w-full text-center">
              ST. ANN’S COLLEGE FOR WOMEN
            </h1>
            <span className="font-bold text-[10px] tracking-tight leading-tight mt-0.5 w-full text-[#e2ff94] text-center">
              Run by The Society of St Anne
            </span>
            <span className="font-semibold text-[10px] tracking-tight leading-tight mt-0.5 w-full text-[#e2ff94] text-center">
              Affiliated to Acharya Nagarjuna University, Approved by AICTE
            </span>
            <span className="font-semibold text-[10px] tracking-tight leading-tight w-full text-[#e2ff94] text-center">
              Recognized under Section 2(f) of the UGC Act, 1956, New Delhi.
            </span>
            <span className="font-semibold text-[10px] tracking-tight leading-tight w-full text-[#e2ff94] text-center">
              Accredited by NAAC with &lsquo;A&rsquo; Grade in the First Cycle
            </span>
            <span className="font-bold text-[13.5px] sm:text-[14px] tracking-wide leading-tight mt-0.5 w-full text-white text-center">
              Amaravathi Road, Gorantla, Guntur–522034, Andhra Pradesh, India.
            </span>
          </div>
        </Link>

        {/* Right: Accreditations (29+ Years, NAAC, AICTE) & Apply Now CTA Button */}
        <div className="flex items-center gap-3.5 shrink-0 self-stretch py-0">
          <div className="flex items-center gap-3 h-full py-0">
            {/* 29+ Years of Excellence Graphic */}
            <div className="flex items-center h-full py-0 shrink-0">
              <img
                src="/images/29years--logo.png?v=full_v5"
                alt="29+ Years of Excellence (1997 - 2026)"
                className="h-[88px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs py-0 shrink-0"
              />
            </div>

            {/* Divider Line */}
            <div className="h-11 w-px bg-white/20 hidden sm:block shrink-0" />

            {/* NAAC 'A' Accreditation Logo */}
            <div
              className="flex items-center group cursor-default h-full py-0 shrink-0"
              title="Accredited by NAAC with 'A' Grade in the first cycle"
            >
              <img
                src="/images/naac_logo_clean.png?v=full_v5"
                alt="NAAC 'A' Grade"
                className="h-[84px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs py-0 shrink-0"
              />
            </div>

            {/* Divider Line */}
            <div className="h-11 w-px bg-white/20 hidden sm:block shrink-0" />

            {/* AICTE Approved Logo */}
            <div
              className="hidden sm:flex items-center group cursor-default h-full py-0 shrink-0"
              title="Approved by All India Council for Technical Education (AICTE), New Delhi for MCA & MBA"
            >
              <img
                src="/images/AICTE_Logo.png?v=full_v5"
                alt="AICTE Approved"
                className="h-[84px] w-auto object-contain select-none hover:scale-105 transition-all duration-300 drop-shadow-2xs py-0 shrink-0"
              />
            </div>
          </div>

          {/* Apply Now button with AISHE Code below */}
          <div className="flex flex-col items-center justify-center gap-1 shrink-0 py-0.5">
            <button
              type="button"
              onClick={() => setIsAdmissionModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 font-bold text-white text-xs sm:text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95 duration-300 hover:-translate-y-0.5 group/btn select-none shrink-0 border border-emerald-400/30 shadow-xs cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>
            <span className="text-[11px] sm:text-[12px] font-bold tracking-tight select-none text-slate-300">
              AISHE Code: <span className="text-white font-extrabold">C-39493</span>
            </span>
          </div>
        </div>

      </div>

      {/* Admission Enquiry Questionnaire Popup Modal */}
      <AdmissionEnquiryModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
      />
    </div>
  );
}

export default TopLogoBar;
