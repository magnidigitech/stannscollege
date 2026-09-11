"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  ExternalLink,
  X,
  FileText,
  Sparkles,
  Building2,
  Users,
} from "lucide-react";

interface Recruiter {
  id: string;
  name: string;
  category: string;
  roles: string;
  packageRange: string;
  placedCount?: number;
  featuredColor: string;
  logo: React.ReactNode;
}

// ── Accurate SVG Company Logos for Recruiters in Placement Statistics ──
const TcsLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#001242] flex items-center justify-center font-black text-white text-[11px] tracking-tight border border-blue-900 shadow-xs">
      <span className="text-white">T</span>
      <span className="text-red-500">C</span>
      <span className="text-sky-400">S</span>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">TATA</span>
      <span className="text-[8px] font-bold text-slate-500 tracking-wider uppercase">Consultancy Services</span>
    </div>
  </div>
);

const InfosysLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#007CC3] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-xs">
      inf
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[15px] tracking-tight text-[#007CC3]">infosys</span>
      <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest">Navigate your next</span>
    </div>
  </div>
);

const WiproLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
      <svg viewBox="0 0 40 40" className="w-6 h-6">
        <circle cx="14" cy="14" r="4" fill="#0C7C59" />
        <circle cx="26" cy="14" r="4" fill="#E01A4F" />
        <circle cx="20" cy="26" r="4.5" fill="#F39C12" />
        <circle cx="20" cy="16" r="2.5" fill="#2B303A" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[15px] tracking-tight text-slate-900">wipro</span>
      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Enterprise Tech</span>
    </div>
  </div>
);

const TechMahindraLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#E31837] flex items-center justify-center text-white shadow-xs">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4 6h4v12H4zm6 4h4v8h-4zm6-2h4v10h-4z" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">Tech</span>
      <span className="text-[12px] font-bold text-[#E31837] tracking-tight">Mahindra</span>
    </div>
  </div>
);

const AccentureLogo = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-xs">
      <span className="text-[#A100FF] font-black text-xl leading-none">&gt;</span>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[14px] tracking-tight text-slate-900">accenture</span>
      <span className="text-[7.5px] font-bold text-[#A100FF] uppercase tracking-wider">High Performance</span>
    </div>
  </div>
);

const SutherlandLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00539B] to-[#00A3E0] flex items-center justify-center text-white shadow-xs">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-black text-[13px] tracking-wider text-[#00539B]">SUTHERLAND</span>
      <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest">Global Services</span>
    </div>
  </div>
);

const FirstsourceLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-black text-xs shadow-xs">
      FSL
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">firstsource</span>
      <span className="text-[8px] font-bold text-[#FF6B00] tracking-wider uppercase">Solutions Limited</span>
    </div>
  </div>
);

const EALabsLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
      EA
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">EA LABS</span>
      <span className="text-[8px] font-bold text-sky-600 tracking-wider uppercase">Success Factor IT</span>
    </div>
  </div>
);

const IlmLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center text-white font-black text-xs shadow-xs">
      ILM
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">ILM Institute</span>
      <span className="text-[8px] font-bold text-[#0F766E] uppercase tracking-wider">Language Management</span>
    </div>
  </div>
);

const EslLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
      ESL
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">ESL Corp</span>
      <span className="text-[8px] font-bold text-amber-700 uppercase tracking-wider">Enhancing Skills</span>
    </div>
  </div>
);

const TechbiumLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white font-black text-xs shadow-xs">
      &lt;/&gt;
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">TECHBIUM</span>
      <span className="text-[8px] font-bold text-indigo-600 uppercase tracking-wider">Software Services</span>
    </div>
  </div>
);

const AdeptLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#0891B2] flex items-center justify-center text-white font-black text-xs shadow-xs">
      +
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">ADEPT</span>
      <span className="text-[8px] font-bold text-cyan-700 uppercase tracking-wider">Talent Acquisition</span>
    </div>
  </div>
);

const CentillionLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
      CN
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">CENTILLION</span>
      <span className="text-[8px] font-bold text-rose-600 uppercase tracking-wider">Networks Pvt Ltd</span>
    </div>
  </div>
);

const CalibhrLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#005A9C] flex items-center justify-center text-white font-black text-[11px] shadow-xs">
      SBI
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">CALIBHR</span>
      <span className="text-[7.5px] font-bold text-[#005A9C] uppercase tracking-wider">State Bank Operations</span>
    </div>
  </div>
);

const InfoQuestLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-black text-xs shadow-xs">
      IQ
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">Info Quest</span>
      <span className="text-[8px] font-bold text-blue-600 uppercase tracking-wider">Background Check</span>
    </div>
  </div>
);

const EnglishForYouLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-xs shadow-xs">
      E4U
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-extrabold text-[13px] tracking-tight text-slate-900">English For You</span>
      <span className="text-[8px] font-bold text-amber-700 uppercase tracking-wider">Soft Skills Academy</span>
    </div>
  </div>
);

// ── The 16 Verified Recruiters from Current Placement Statistics ──
const ROW_1_RECRUITERS: Recruiter[] = [
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    category: "MNC IT Services",
    roles: "Graduate Trainee / Process Associate",
    packageRange: "Rs. 1,96,000 - 2,60,000/-",
    placedCount: 10,
    featuredColor: "border-blue-200 hover:border-blue-400 bg-gradient-to-b from-white to-blue-50/30",
    logo: <TcsLogo />,
  },
  {
    id: "infosys",
    name: "Infosys",
    category: "Global IT & Consulting",
    roles: "System Associate",
    packageRange: "Rs. 2,20,000/-",
    placedCount: 2,
    featuredColor: "border-sky-200 hover:border-sky-400 bg-gradient-to-b from-white to-sky-50/30",
    logo: <InfosysLogo />,
  },
  {
    id: "wipro",
    name: "Wipro",
    category: "Software & Technology",
    roles: "Pre-skilling Training Program",
    packageRange: "Rs. 1,85,856/-",
    placedCount: 1,
    featuredColor: "border-emerald-200 hover:border-emerald-400 bg-gradient-to-b from-white to-emerald-50/30",
    logo: <WiproLogo />,
  },
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    category: "Enterprise IT & Telecom",
    roles: "Customer Support / IT Engineer",
    packageRange: "Rs. 2,90,000 - 4,50,000/-",
    placedCount: 4,
    featuredColor: "border-rose-200 hover:border-rose-400 bg-gradient-to-b from-white to-rose-50/30",
    logo: <TechMahindraLogo />,
  },
  {
    id: "accenture",
    name: "Accenture",
    category: "Strategy & Technology",
    roles: "Software Engineering (MCA)",
    packageRange: "Rs. 3,90,000 - 4,70,000/-",
    placedCount: 2,
    featuredColor: "border-purple-200 hover:border-purple-400 bg-gradient-to-b from-white to-purple-50/30",
    logo: <AccentureLogo />,
  },
  {
    id: "sutherland",
    name: "Sutherland Global Services",
    category: "Digital Transformation & BPM",
    roles: "Consultant / Process Associate",
    packageRange: "Rs. 2,75,000/-",
    placedCount: 43,
    featuredColor: "border-cyan-200 hover:border-cyan-400 bg-gradient-to-b from-white to-cyan-50/30",
    logo: <SutherlandLogo />,
  },
  {
    id: "firstsource",
    name: "Firstsource Solutions Limited (FSL)",
    category: "BPM & Financial Analytics",
    roles: "Success Factor Trainee",
    packageRange: "Rs. 2,35,000/-",
    placedCount: 32,
    featuredColor: "border-orange-200 hover:border-orange-400 bg-gradient-to-b from-white to-orange-50/30",
    logo: <FirstsourceLogo />,
  },
  {
    id: "ea-labs",
    name: "EA LABS",
    category: "Software & Technology",
    roles: "Success Factor Trainee",
    packageRange: "Rs. 1,38,000/-",
    placedCount: 4,
    featuredColor: "border-sky-200 hover:border-sky-400 bg-gradient-to-b from-white to-sky-50/30",
    logo: <EALabsLogo />,
  },
];

const ROW_2_RECRUITERS: Recruiter[] = [
  {
    id: "ilm",
    name: "ILM - Institute of Language Management",
    category: "Professional Training & Faculty",
    roles: "Faculty - Communicative English",
    packageRange: "Rs. 2,52,000/-",
    placedCount: 86,
    featuredColor: "border-teal-200 hover:border-teal-400 bg-gradient-to-b from-white to-teal-50/30",
    logo: <IlmLogo />,
  },
  {
    id: "esl",
    name: "ESL - Enhancing Skills through Language",
    category: "Training & Communication",
    roles: "Communicative Trainer",
    packageRange: "Rs. 1,80,000/-",
    placedCount: 28,
    featuredColor: "border-amber-200 hover:border-amber-400 bg-gradient-to-b from-white to-amber-50/30",
    logo: <EslLogo />,
  },
  {
    id: "techbium",
    name: "TECHBIUM Software Services",
    category: "Enterprise Software",
    roles: "Process Associate",
    packageRange: "Rs. 1,20,000 - 1,40,000/-",
    placedCount: 55,
    featuredColor: "border-indigo-200 hover:border-indigo-400 bg-gradient-to-b from-white to-indigo-50/30",
    logo: <TechbiumLogo />,
  },
  {
    id: "adept",
    name: "Adept Talent Acquisition",
    category: "Healthcare & Analytics",
    roles: "Medical Billing Analyst",
    packageRange: "Rs. 1,80,000/-",
    placedCount: 12,
    featuredColor: "border-cyan-200 hover:border-cyan-400 bg-gradient-to-b from-white to-cyan-50/30",
    logo: <AdeptLogo />,
  },
  {
    id: "centillion",
    name: "Centillion Networks",
    category: "Telecommunications",
    roles: "Junior Telecom Engineer",
    packageRange: "Rs. 3,00,000/-",
    placedCount: 1,
    featuredColor: "border-rose-200 hover:border-rose-400 bg-gradient-to-b from-white to-rose-50/30",
    logo: <CentillionLogo />,
  },
  {
    id: "calibhr",
    name: "CALIBHR (State Bank Operations)",
    category: "Banking & Financial Services",
    roles: "Seva Sarathi / Operations Associate",
    packageRange: "Rs. 2,88,660/-",
    placedCount: 1,
    featuredColor: "border-blue-200 hover:border-blue-400 bg-gradient-to-b from-white to-blue-50/30",
    logo: <CalibhrLogo />,
  },
  {
    id: "infoquest",
    name: "Info Quest Background Check",
    category: "Corporate Verification & Audit",
    roles: "Verification Trainee",
    packageRange: "Rs. 1,80,000/-",
    placedCount: 34,
    featuredColor: "border-blue-200 hover:border-blue-400 bg-gradient-to-b from-white to-blue-50/30",
    logo: <InfoQuestLogo />,
  },
  {
    id: "english4you",
    name: "English For You Institution",
    category: "Academic & Soft Skills",
    roles: "Soft Skills Trainer",
    packageRange: "Rs. 2,04,000/-",
    placedCount: 62,
    featuredColor: "border-amber-200 hover:border-amber-400 bg-gradient-to-b from-white to-amber-50/30",
    logo: <EnglishForYouLogo />,
  },
];

interface TopRecruitersSectionProps {
  customConfig?: any;
}

export default function TopRecruitersSection({ customConfig }: TopRecruitersSectionProps) {
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<"2024-25" | "2025-26">("2024-25");

  return (
    <section
      style={{
        background:
          customConfig?.colors?.isGradient && customConfig?.colors?.bgGradient
            ? customConfig.colors.bgGradient
            : customConfig?.colors?.bgColor || undefined,
        paddingTop:
          customConfig?.layout?.paddingY === "compact"
            ? "32px"
            : customConfig?.layout?.paddingY === "spacious"
            ? "80px"
            : customConfig?.layout?.paddingY === "extra"
            ? "112px"
            : "64px",
        paddingBottom:
          customConfig?.layout?.paddingY === "compact"
            ? "32px"
            : customConfig?.layout?.paddingY === "spacious"
            ? "80px"
            : customConfig?.layout?.paddingY === "extra"
            ? "112px"
            : "64px",
      }}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/40 via-white to-slate-50/60 border-y border-slate-200/60 select-none transition-colors duration-300"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1780px] px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-black text-indigo-700 uppercase tracking-wider">
              <Briefcase className="h-3.5 w-3.5 text-indigo-600" />
              Corporate Partnerships &amp; Career Milestones
            </span>

            <h2
              style={{ color: customConfig?.colors?.headingColor || undefined }}
              className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            >
              Top Recruiters &amp; Placement Partners
            </h2>

            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
              Leading multinational corporations, global software giants, financial entities, and healthcare analytics firms actively recruit talented female graduates from St. Ann&apos;s College for Women.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2024–25 Selections</p>
                <p className="text-base font-black text-slate-900 leading-tight">173 Placed</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2025–26 Selections</p>
                <p className="text-base font-black text-emerald-600 leading-tight">207 Placed</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStatsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#002147] hover:bg-[#002b5c] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-300" />
              <span>View Placement Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── CONTINUOUS FLOATING LEFT-TO-RIGHT MARQUEES ── */}
        <div className="space-y-4 py-2 relative">
          {/* Gradient Edge Masks for Smooth Floating Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* ── ROW 1: FLOATING LEFT TO RIGHT ── */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-ltr flex items-center gap-4 group">
              {/* Render items twice to ensure seamless continuous infinite loop */}
              {[...ROW_1_RECRUITERS, ...ROW_1_RECRUITERS].map((recruiter, idx) => (
                <div
                  key={`${recruiter.id}-${idx}`}
                  className={`w-72 sm:w-80 shrink-0 p-4 rounded-2xl border ${recruiter.featuredColor} shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer backdrop-blur-xs flex flex-col justify-between gap-3`}
                  onClick={() => setStatsModalOpen(true)}
                >
                  <div className="flex items-center justify-between gap-2">
                    {recruiter.logo}
                    {recruiter.placedCount && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold shrink-0 border border-slate-200">
                        {recruiter.placedCount} Placed
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 truncate max-w-[150px]">
                      {recruiter.category}
                    </span>
                    <span className="font-bold text-slate-800 text-[10.5px]">
                      {recruiter.packageRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ROW 2: FLOATING IN OPPOSITE DIRECTION (RIGHT TO LEFT) ── */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-rtl flex items-center gap-4 group">
              {[...ROW_2_RECRUITERS, ...ROW_2_RECRUITERS].map((recruiter, idx) => (
                <div
                  key={`${recruiter.id}-${idx}`}
                  className={`w-72 sm:w-80 shrink-0 p-4 rounded-2xl border ${recruiter.featuredColor} shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer backdrop-blur-xs flex flex-col justify-between gap-3`}
                  onClick={() => setStatsModalOpen(true)}
                >
                  <div className="flex items-center justify-between gap-2">
                    {recruiter.logo}
                    {recruiter.placedCount && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold shrink-0 border border-slate-200">
                        {recruiter.placedCount} Placed
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 truncate max-w-[150px]">
                      {recruiter.category}
                    </span>
                    <span className="font-bold text-slate-800 text-[10.5px]">
                      {recruiter.packageRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Footnote / Links ── */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hover any company card to inspect placement statistics &amp; packages</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/placements"
              className="text-[#002147] hover:underline flex items-center gap-1 font-bold"
            >
              <span>Explore Training &amp; Placements Cell</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── MODAL: OFFICIAL PLACEMENTS RECORD & TABLE ── */}
      {statsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setStatsModalOpen(false)} />

          <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#001730] via-[#002147] to-[#0a3d78] text-white">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <Briefcase className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-outfit text-base font-bold leading-tight">
                    Official Training &amp; Placement Statistics
                  </h3>
                  <p className="text-[11px] text-sky-200/80">
                    St. Ann&apos;s College for Women, Gorantla, Guntur
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatsModalOpen(false)}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5 bg-slate-50/50">
              {/* Year Switcher Pills */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setSelectedYear("2024-25")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedYear === "2024-25"
                        ? "bg-[#002147] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Placements Statistics (2024–2025)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedYear("2025-26")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedYear === "2025-26"
                        ? "bg-[#002147] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Placements Statistics (2025–2026)
                  </button>
                </div>

                <Link
                  href="/placements"
                  className="text-xs font-bold text-[#002147] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>All Placement Reports</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Official Verified Placement Statistics Image / Table */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center">
                {selectedYear === "2024-25" ? (
                  <img
                    src="/images/placements/Placements Statistics 2024-2025.png"
                    alt="Placements Statistics 2024-2025 - St. Ann's College for Women"
                    className="w-full h-auto object-contain rounded-xl select-none"
                  />
                ) : (
                  <img
                    src="/images/placements/Placemetn Statistics 2025-2026.png"
                    alt="Placements Statistics 2025-2026 - St. Ann's College for Women"
                    className="w-full h-auto object-contain rounded-xl select-none"
                  />
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Verified by St. Ann&apos;s Training and Placement Cell</span>
              <button
                type="button"
                onClick={() => setStatsModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
