"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Award,
  Users,
  Search,
  Filter,
  FileCheck2,
  Check,
  Send,
  HelpCircle,
  TrendingUp,
  X,
  FileSpreadsheet,
  Maximize2,
} from "lucide-react";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { AdmissionEnquiryModal } from "@/components/admissions/AdmissionEnquiryModal";
import { openPdfViewer, getCleanPdfUrl } from "@/lib/pdf-viewer";
import {
  UG_PROGRAMMES_INTAKE,
  PG_PROGRAMMES_INTAKE,
  UG_ELIGIBILITY_CRITERIA,
  PG_ELIGIBILITY_CRITERIA,
  ADMISSION_DOCUMENTS,
  ADMISSION_DESK_INFO,
  ADMISSION_YEARLY_RECORDS,
  ProgrammeIntake,
  EligibilityItem,
  AdmissionYearlyRecord,
} from "./staticData";

export const ADMISSIONS_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "programmes-eligibility",
    title: "A. Programmes & Eligibility",
    sectionId: "subpage-programmes-eligibility",
    items: [
      {
        text: "Programmes Offered & Eligibility Criteria",
        id: "subpage-programmes-eligibility",
        slug: "programmes-eligibility",
      },
    ],
  },
  {
    catSlug: "admission-policy-process",
    title: "B. Admission Policy & Process",
    sectionId: "subpage-admission-policy-process",
    items: [
      {
        text: "Admission Policy, Checklists & Forms",
        id: "subpage-admission-policy-process",
        slug: "admission-policy-process",
      },
    ],
  },
  {
    catSlug: "prospectus-brochures",
    title: "C. Prospectus & Brochures",
    sectionId: "subpage-prospectus-brochures",
    items: [
      {
        text: "College Prospectus & Digital Pamphlets",
        id: "subpage-prospectus-brochures",
        slug: "prospectus-brochures",
      },
    ],
  },
  {
    catSlug: "admission-desk",
    title: "D. Admission Desk",
    sectionId: "subpage-admission-desk",
    items: [
      {
        text: "Admission Helpdesk, Timings & Contacts",
        id: "subpage-admission-desk",
        slug: "admission-desk",
      },
    ],
  },
  {
    catSlug: "admission-information",
    title: "E. Admission Information",
    sectionId: "subpage-admission-information",
    items: [
      {
        text: "Statutory Admission Records (Table 3)",
        id: "subpage-admission-information",
        slug: "admission-information",
      },
    ],
  },
];

// Slug to Subpage ID mapping
const SLUG_TO_SUBPAGE_MAP: Record<string, string> = {
  // Subpage 1: A & B combined
  "programmes-eligibility": "subpage-programmes-eligibility",
  "programmes-offered": "subpage-programmes-eligibility",
  "programmes": "subpage-programmes-eligibility",
  "intake": "subpage-programmes-eligibility",
  "ug-programmes": "subpage-programmes-eligibility",
  "pg-programmes": "subpage-programmes-eligibility",
  "eligibility-criteria": "subpage-programmes-eligibility",
  "eligibility": "subpage-programmes-eligibility",
  "ug-eligibility": "subpage-programmes-eligibility",
  "pg-eligibility": "subpage-programmes-eligibility",
  "fee-structure": "subpage-programmes-eligibility",

  // Subpage 2: C
  "admission-policy-process": "subpage-admission-policy-process",
  "policy-process": "subpage-admission-policy-process",
  "policy": "subpage-admission-policy-process",
  "process": "subpage-admission-policy-process",
  "required-documents": "subpage-admission-policy-process",
  "application-forms": "subpage-admission-policy-process",
  "guidelines": "subpage-admission-policy-process",
  "procedure": "subpage-admission-policy-process",
  "rules-regulations": "subpage-admission-policy-process",
  "scholarships-freeships": "subpage-admission-policy-process",

  // Subpage 3: D
  "prospectus-brochures": "subpage-prospectus-brochures",
  "prospectus": "subpage-prospectus-brochures",
  "brochures": "subpage-prospectus-brochures",
  "student-handbook": "subpage-prospectus-brochures",

  // Subpage 4: E
  "admission-desk": "subpage-admission-desk",
  "desk": "subpage-admission-desk",
  "contact": "subpage-admission-desk",

  // Subpage 5: F
  "admission-information": "subpage-admission-information",
  "information": "subpage-admission-information",
  "records": "subpage-admission-information",
  "compliance": "subpage-admission-information",
  "admission-statistics": "subpage-admission-information",
};

// Canonical subpage to URL slug mapping
const SUBPAGE_TO_SLUG: Record<string, string> = {
  "subpage-programmes-eligibility": "programmes-eligibility",
  "subpage-admission-policy-process": "admission-policy-process",
  "subpage-prospectus-brochures": "prospectus-brochures",
  "subpage-admission-desk": "admission-desk",
  "subpage-admission-information": "admission-information",
};

interface AdmissionsClientPortalProps {
  activeSlug?: string;
  initialData?: any;
}

export default function AdmissionsClientPortal({
  activeSlug = "",
  initialData = null,
}: AdmissionsClientPortalProps) {
  const router = useRouter();

  // Determine initial subpage from slug or default to Subpage 1 (A & B)
  const initialSubpage = (activeSlug && SLUG_TO_SUBPAGE_MAP[activeSlug]) || "subpage-programmes-eligibility";
  const [activeSubpage, setActiveSubpage] = useState<string>(initialSubpage);

  // Single uniform UG / PG switch for Subpage 1 (A & B)
  const [degreeLevel, setDegreeLevel] = useState<"ug" | "pg">("ug");

  // Search filter for UG Eligibility
  const [ugEligibilitySearch, setUgEligibilitySearch] = useState<string>("" );

  // Modals state
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const [previewModalTitle, setPreviewModalTitle] = useState<string>("");
  const [imageLightboxUrl, setImageLightboxUrl] = useState<string | null>(null);
  const [imageLightboxTitle, setImageLightboxTitle] = useState<string>("");
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  // Data resolution: dynamic Sanity data with static fallback
  const ugProgrammes: ProgrammeIntake[] = initialData?.ugProgrammes || UG_PROGRAMMES_INTAKE;
  const pgProgrammes: ProgrammeIntake[] = initialData?.pgProgrammes || PG_PROGRAMMES_INTAKE;
  const ugEligibility: EligibilityItem[] = initialData?.ugEligibility || UG_ELIGIBILITY_CRITERIA;
  const pgEligibility: EligibilityItem[] = initialData?.pgEligibility || PG_ELIGIBILITY_CRITERIA;
  const admissionDocuments = initialData?.documents || ADMISSION_DOCUMENTS;
  const deskInfo = initialData?.deskInfo || ADMISSION_DESK_INFO;
  const yearlyRecords: AdmissionYearlyRecord[] =
    initialData?.yearlyRecords || ADMISSION_YEARLY_RECORDS;

  // Sync state when incoming activeSlug prop changes
  useEffect(() => {
    if (activeSlug) {
      const targetSubpage = SLUG_TO_SUBPAGE_MAP[activeSlug] || "subpage-programmes-eligibility";
      setActiveSubpage(targetSubpage);

      // If user came via a PG-specific slug, set uniform switch to PG
      if (activeSlug === "pg-programmes" || activeSlug === "pg-eligibility") {
        setDegreeLevel("pg");
      } else if (activeSlug === "ug-programmes" || activeSlug === "ug-eligibility") {
        setDegreeLevel("ug");
      }
    }
  }, [activeSlug]);

  const scrollToActiveSubpage = () => {
    if (typeof window === "undefined") return;
    const sectionEl =
      document.getElementById("admissions-active-subpage-section") ||
      document.getElementById("admissions-active-subpage");
    if (sectionEl) {
      const header = document.getElementById("main-header");
      const currentHeight = header
        ? header.getBoundingClientRect().height || header.offsetHeight
        : 140;
      const elementPosition = sectionEl.getBoundingClientRect().top + window.pageYOffset;
      const targetScrollY = elementPosition - currentHeight - 16;
      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: "smooth",
      });
    }
  };

  const handleSidebarClick = useCallback((id: string) => {
    const targetSubpage = id.startsWith("subpage-") ? id : SLUG_TO_SUBPAGE_MAP[id] || id;
    setActiveSubpage(targetSubpage);

    const slug = SUBPAGE_TO_SLUG[targetSubpage] || "programmes-eligibility";
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/admissions/${slug}`);
      setTimeout(() => {
        scrollToActiveSubpage();
      }, 50);
    }
  }, []);

  // Default Fallbacks
  const DEFAULT_PDF = "/documents/DefaultFile_1.pdf";
  const DEFAULT_IMAGE = "/images/cbnew2.webp";

  // PDF opening helper matching Mandatory Disclosures
  const openPdf = (url?: string, title?: string) => {
    const targetUrl = url || DEFAULT_PDF;
    openPdfViewer(targetUrl, title || "Admissions Document");
  };

  // Filtered UG Eligibility List
  const filteredUgEligibility = useMemo(() => {
    if (!ugEligibilitySearch.trim()) return ugEligibility;
    const q = ugEligibilitySearch.toLowerCase();
    return ugEligibility.filter(
      (item) =>
        item.programme.toLowerCase().includes(q) ||
        item.eligibilityCriteria.toLowerCase().includes(q) ||
        (item.streamBadge && item.streamBadge.toLowerCase().includes(q))
    );
  }, [ugEligibilitySearch, ugEligibility]);

  // Calculations for Totals
  const totalUgSanctioned = useMemo(() => ugProgrammes.reduce((a, b) => a + b.sanctionedIntake, 0), [ugProgrammes]);
  const totalUgConvener = useMemo(() => ugProgrammes.reduce((a, b) => a + b.convenerQuota, 0), [ugProgrammes]);
  const totalUgManagement = useMemo(() => ugProgrammes.reduce((a, b) => a + b.managementQuota, 0), [ugProgrammes]);
  const totalUgEws = useMemo(() => ugProgrammes.reduce((a, b) => a + b.ewsQuota, 0), [ugProgrammes]);

  const totalPgSanctioned = useMemo(() => pgProgrammes.reduce((a, b) => a + b.sanctionedIntake, 0), [pgProgrammes]);
  const totalPgConvener = useMemo(() => pgProgrammes.reduce((a, b) => a + b.convenerQuota, 0), [pgProgrammes]);
  const totalPgManagement = useMemo(() => pgProgrammes.reduce((a, b) => a + b.managementQuota, 0), [pgProgrammes]);
  const totalPgEws = useMemo(() => pgProgrammes.reduce((a, b) => a + b.ewsQuota, 0), [pgProgrammes]);

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: Admissions Navigation Sidebar with Helpline Box Fixed Inside Sticky Container */}
            <div className="lg:col-span-3">
              <AboutSidebar
                categories={ADMISSIONS_SIDEBAR_CATEGORIES}
                bannerTitle="Admissions"
                bannerSubtitle="Directory & Guidelines"
                activeId={activeSubpage}
                onItemClick={handleSidebarClick}
              >
                {/* Sidebar Quick Helpline Card - Embedded in Sidebar so it never scrolls behind it */}
                <div className="mt-2 bg-gradient-to-br from-[#002147] to-[#0c478a] text-white rounded-2xl p-4 shadow-sm border border-blue-900/40 relative overflow-hidden group">
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-28 w-28" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400 text-[#002147] font-black text-xs">
                        <Phone className="h-3 w-3" />
                      </span>
                      <h4 className="font-outfit font-black text-xs uppercase tracking-wider text-amber-300">Admission Helpline</h4>
                    </div>
                    <p className="text-blue-100/80 text-[11px] leading-relaxed font-medium">
                      Assistance regarding intake, eligibility, or certificate verification.
                    </p>
                    <div className="flex flex-col gap-1.5 pt-1.5 border-t border-white/10 text-xs font-semibold">
                      {deskInfo.phoneNumbers && deskInfo.phoneNumbers.length > 0 ? (
                        deskInfo.phoneNumbers.map((p: any, idx: number) => (
                          <a key={idx} href={`tel:${p.tel || p.number}`} className="flex items-center gap-2 hover:text-amber-300 transition-colors text-[11px]">
                            <Phone className="h-3 w-3 text-amber-400 shrink-0" /> {p.number}
                          </a>
                        ))
                      ) : (
                        <>
                          <a href="tel:+918632236470" className="flex items-center gap-2 hover:text-amber-300 transition-colors text-[11px]">
                            <Phone className="h-3 w-3 text-amber-400 shrink-0" /> 0863-2236470
                          </a>
                          <a href="tel:+917382104655" className="flex items-center gap-2 hover:text-amber-300 transition-colors text-[11px]">
                            <Phone className="h-3 w-3 text-amber-400 shrink-0" /> 7382104655 / 8500656134
                          </a>
                        </>
                      )}
                      {deskInfo.emails && deskInfo.emails.length > 0 && (
                        <a href={`mailto:${deskInfo.emails[1]?.email || deskInfo.emails[0]?.email}`} className="flex items-center gap-2 hover:text-amber-300 transition-colors truncate text-[11px]">
                          <Mail className="h-3 w-3 text-amber-400 shrink-0" /> {deskInfo.emails[1]?.email || deskInfo.emails[0]?.email}
                        </a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEnquiryModalOpen(true)}
                      className="mt-1 w-full py-2 bg-amber-400 hover:bg-amber-300 text-[#002147] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <Send className="h-3 w-3" />
                      <span>Admission Enquiry</span>
                    </button>
                  </div>
                </div>
              </AboutSidebar>
            </div>

            {/* Right: Data Elements / Subpages */}
            <main className="lg:col-span-9 flex flex-col gap-8 mb-16 min-w-0" id="admissions-active-subpage">
              <div className="flex flex-col gap-6">

                {/* Sub-text Box */}
                <SubtextBox>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <strong className="text-blue-900 font-bold">
                      St. Ann’s College for Women, Gorantla, Guntur
                    </strong>, welcomes eligible students to pursue quality higher education in a supportive, inclusive and value-based environment. Admissions to Undergraduate (UG) and Postgraduate (PG) programmes are conducted strictly in accordance with the regulations, intake approvals, and statutory guidelines prescribed by the Government of Andhra Pradesh, Andhra Pradesh State Council of Higher Education (APSCHE), Acharya Nagarjuna University (ANU), AICTE, and the institution.
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      This comprehensive admissions portal provides detailed information on programmes offered, approved intake capacity, eligibility criteria, admission policy and procedures, downloadable application forms, college prospectus, helpline desk contacts, and statutory admission compliance records.
                    </span>
                  </p>
                </SubtextBox>

                {/* ========================================================================= */}
                {/* SUBPAGE 1: A - PROGRAMMES OFFERED & ELIGIBILITY CRITERIA                  */}
                {/* ========================================================================= */}
                {activeSubpage === "subpage-programmes-eligibility" && (
                  <section
                    id="admissions-active-subpage-section"
                    className="scroll-mt-36 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
                    style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                  >
                    {/* Full-Width Section Header Banner */}
                    <div
                      className="text-white px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                        borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6 text-indigo-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                        >
                          Programmes Offered &amp; Eligibility Criteria
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Approved undergraduate &amp; postgraduate intake capacities, programme combinations, and prescribed academic eligibility requirements.
                      </p>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                      
                      {/* UNIFORM SINGLE SWITCH BUTTON FOR BOTH A & B */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-slate-200/90 shadow-2xs">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Programme Level:</span>
                          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                            <button
                              type="button"
                              onClick={() => setDegreeLevel("ug")}
                              className={`px-5 py-2 rounded-lg transition-all cursor-pointer ${
                                degreeLevel === "ug"
                                  ? "bg-[#002147] text-white shadow-xs"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              Undergraduate (UG) ({ugProgrammes.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => setDegreeLevel("pg")}
                              className={`px-5 py-2 rounded-lg transition-all cursor-pointer ${
                                degreeLevel === "pg"
                                  ? "bg-[#002147] text-white shadow-xs"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              Postgraduate (PG) ({pgProgrammes.length})
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
                            Total Sanctioned: <strong className="text-blue-900">{degreeLevel === "ug" ? `${totalUgSanctioned} Seats` : `${totalPgSanctioned} Seats`}</strong>
                          </span>
                        </div>
                      </div>

                      {/* ======================================================== */}
                      {/* WHEN UNDERGRADUATE (UG) IS SELECTED: SHOW BOTH A.UG & B.UG */}
                      {/* ======================================================== */}
                      {degreeLevel === "ug" && (
                        <div className="space-y-8 animate-fadeIn">
                          
                          {/* Part A: Undergraduate Programmes (UG) Intake Matrix */}
                          <div
                            id="sec-programmes-ug"
                            className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 bg-white"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                  <GraduationCap className="h-5 w-5" />
                                </span>
                                <div>
                                  <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                    Undergraduate Programmes (UG) Intake Matrix
                                  </h4>
                                  <p className="text-xs text-slate-500 font-medium">11 Honours Degree Programmes sanctioned by AP State Govt &amp; ANU</p>
                                </div>
                              </div>

                              <span className="text-xs font-bold text-slate-700 bg-blue-50/70 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-200">
                                Total Sanctioned: <strong>{totalUgSanctioned} Seats</strong>
                              </span>
                            </div>

                            <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                              The institution offers 11 Undergraduate Honours Degree programmes in Arts, Commerce, Computer Applications, and Sciences. Admissions are conducted through the Online Admissions Module for Degree Colleges (OAMDC / AP-CAP) under the Andhra Pradesh State Council of Higher Education (APSCHE).
                            </p>

                            {/* UG Table */}
                            <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                                    <th className="py-3.5 px-4 text-center">S.No</th>
                                    <th className="py-3.5 px-6">Name of the Programme</th>
                                    <th className="py-3.5 px-4 text-center">Sanctioned Intake</th>
                                    <th className="py-3.5 px-4 text-center">Convener Quota (70%)</th>
                                    <th className="py-3.5 px-4 text-center">Management Quota (30%)</th>
                                    <th className="py-3.5 px-4 text-center">EWS Quota</th>
                                    <th className="py-3.5 px-4 text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                  {ugProgrammes.map((p, idx) => (
                                    <tr key={p.sNo || idx} className="hover:bg-blue-50/50 transition-colors">
                                      <td className="py-3.5 px-4 text-center font-bold text-slate-900">{p.sNo || idx + 1}</td>
                                      <td className="py-3.5 px-6">
                                        <div className="flex flex-col">
                                          <span className="font-extrabold text-slate-900 text-sm">{p.name}</span>
                                          <span className="text-[11px] text-slate-500">Honours Degree Programme (Medium: English)</span>
                                        </div>
                                      </td>
                                      <td className="py-3.5 px-4 text-center font-black text-blue-900 text-sm">{p.sanctionedIntake}</td>
                                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">{p.convenerQuota}</td>
                                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">{p.managementQuota}</td>
                                      <td className="py-3.5 px-4 text-center font-bold text-amber-700">{p.ewsQuota}</td>
                                      <td className="py-3.5 px-4 text-center">
                                        <div className="inline-flex items-center gap-1.5">
                                          <button
                                            type="button"
                                            onClick={() => openPdf(admissionDocuments.ugRequiredDocsPdf, "UG Required Documents Checklist")}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg border border-blue-100 transition-all cursor-pointer"
                                            title="View Required Documents Checklist"
                                          >
                                            <FileText className="h-3 w-3" /> Docs
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => openPdf(admissionDocuments.ugApplicationFormPdf, "UG Application Form")}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded-lg border border-emerald-100 transition-all cursor-pointer"
                                            title="View UG Application Form"
                                          >
                                            <Download className="h-3 w-3" /> Form
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {/* Summary Totals Row */}
                                  <tr className="bg-slate-100/90 font-black text-slate-900 border-t-2 border-slate-300">
                                    <td colSpan={2} className="py-3.5 px-6 text-right uppercase text-xs tracking-wider">
                                      Total Sanctioned UG Intake:
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-black text-blue-900 bg-blue-100/50">
                                      {totalUgSanctioned}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-bold text-slate-800">
                                      {totalUgConvener}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-bold text-slate-800">
                                      {totalUgManagement}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-bold text-amber-800">
                                      {totalUgEws}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-[11px] text-slate-500 font-bold">11 Programmes</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Part B: Undergraduate (UG) Eligibility Requirements */}
                          <div
                            id="sec-eligibility-ug"
                            className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                                  <ClipboardList className="h-5 w-5" />
                                </span>
                                <div>
                                  <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                    Undergraduate (UG) Eligibility Requirements
                                  </h4>
                                  <p className="text-xs text-slate-500 font-medium">Prerequisite streams, subjects, and qualifying marks</p>
                                </div>
                              </div>

                              {/* Search Box */}
                              <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="Filter UG courses..."
                                  value={ugEligibilitySearch}
                                  onChange={(e) => setUgEligibilitySearch(e.target.value)}
                                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                              Candidates seeking admission to Undergraduate Honours Degree programmes must have passed the Two-Year Intermediate (+2) Examination conducted by the Board of Intermediate Education, Andhra Pradesh (BIEAP), or an equivalent examination recognized by Acharya Nagarjuna University.
                            </p>

                            {/* Course Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredUgEligibility.map((item, idx) => (
                                <div
                                  key={item.sNo || idx}
                                  className="border-2 border-slate-200/80 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between gap-3 bg-slate-50/60 group"
                                >
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                                        {item.streamBadge || "UG Honours"}
                                      </span>
                                      <span className="text-xs font-bold text-slate-400">#{item.sNo || idx + 1}</span>
                                    </div>
                                    <h5 className="font-outfit font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                                      {item.programme}
                                    </h5>
                                    <div className="flex items-start gap-2 pt-1">
                                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                        {item.eligibilityCriteria}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      )}

                      {/* ======================================================== */}
                      {/* WHEN POSTGRADUATE (PG) IS SELECTED: SHOW BOTH A.PG & B.PG */}
                      {/* ======================================================== */}
                      {degreeLevel === "pg" && (
                        <div className="space-y-8 animate-fadeIn">
                          
                          {/* Part A: Postgraduate Programmes (PG) Intake Matrix */}
                          <div
                            id="sec-programmes-pg"
                            className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 bg-[#e8f1fd]"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-200/60 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                  <GraduationCap className="h-5 w-5" />
                                </span>
                                <div>
                                  <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                    Postgraduate Programmes (PG) Intake Matrix
                                  </h4>
                                  <p className="text-xs text-blue-600/80 font-medium">AICTE Approved &amp; Affiliated to Acharya Nagarjuna University (ANU)</p>
                                </div>
                              </div>

                              <span className="text-xs font-bold text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                                Total Sanctioned: <strong>{totalPgSanctioned} Seats</strong>
                              </span>
                            </div>

                            <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                              Postgraduate programmes (MCA &amp; MBA) are approved by the All India Council for Technical Education (AICTE), New Delhi, and permanently affiliated to Acharya Nagarjuna University. Admissions are conducted through AP ICET Web Counselling.
                            </p>

                            {/* PG Table */}
                            <div className="overflow-x-auto rounded-2xl border-2 border-blue-200 bg-white shadow-xs">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                                    <th className="py-3.5 px-4 text-center">S.No</th>
                                    <th className="py-3.5 px-6">Name of the Programme</th>
                                    <th className="py-3.5 px-4 text-center">Sanctioned Intake</th>
                                    <th className="py-3.5 px-4 text-center">Convener Quota (70%)</th>
                                    <th className="py-3.5 px-4 text-center">Management Quota (30%)</th>
                                    <th className="py-3.5 px-4 text-center">EWS Quota</th>
                                    <th className="py-3.5 px-4 text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                  {pgProgrammes.map((p, idx) => (
                                    <tr key={p.sNo || idx} className="hover:bg-blue-50/50 transition-colors">
                                      <td className="py-3.5 px-4 text-center font-bold text-slate-900">{p.sNo || idx + 1}</td>
                                      <td className="py-3.5 px-6">
                                        <div className="flex flex-col">
                                          <span className="font-extrabold text-slate-900 text-sm">{p.name}</span>
                                          <span className="text-[11px] text-slate-500">Postgraduate Professional Degree (Medium: English, Duration: 2 Years)</span>
                                        </div>
                                      </td>
                                      <td className="py-3.5 px-4 text-center font-black text-blue-900 text-sm">{p.sanctionedIntake}</td>
                                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">{p.convenerQuota}</td>
                                      <td className="py-3.5 px-4 text-center font-bold text-slate-700">{p.managementQuota}</td>
                                      <td className="py-3.5 px-4 text-center font-bold text-amber-700">{p.ewsQuota}</td>
                                      <td className="py-3.5 px-4 text-center">
                                        <div className="inline-flex items-center gap-1.5">
                                          <button
                                            type="button"
                                            onClick={() => openPdf(admissionDocuments.pgRequiredDocsPdf, "PG Required Documents Checklist")}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg border border-blue-100 transition-all cursor-pointer"
                                            title="View Required Documents Checklist"
                                          >
                                            <FileText className="h-3 w-3" /> Docs
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => openPdf(admissionDocuments.pgApplicationFormPdf, "PG Application Form")}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded-lg border border-emerald-100 transition-all cursor-pointer"
                                            title="View PG Application Form"
                                          >
                                            <Download className="h-3 w-3" /> Form
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {/* Summary Totals Row */}
                                  <tr className="bg-slate-100/90 font-black text-slate-900 border-t-2 border-slate-300">
                                    <td colSpan={2} className="py-3.5 px-6 text-right uppercase text-xs tracking-wider">
                                      Total Sanctioned PG Intake:
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-black text-blue-900 bg-blue-100/50">
                                      {totalPgSanctioned}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-bold text-slate-800">
                                      {totalPgConvener}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-bold text-slate-800">
                                      {totalPgManagement}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm font-bold text-amber-800">
                                      {totalPgEws}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-[11px] text-slate-500 font-bold">2 Programmes</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Part B: Postgraduate (PG) Eligibility Requirements */}
                          <div
                            id="sec-eligibility-pg"
                            className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-[#e8f1fd]"
                          >
                            <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                                <Award className="h-5 w-5" />
                              </span>
                              <div>
                                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                                  Postgraduate (PG) Eligibility Requirements
                                </h4>
                                <p className="text-xs text-blue-600/80 font-medium">MCA &amp; MBA Degree Qualifications (AICTE &amp; ANU)</p>
                              </div>
                            </div>

                            <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                              Candidates applying for PG courses must hold a recognized Bachelor&apos;s degree and possess a valid rank in the Andhra Pradesh Integrated Common Entrance Test (AP ICET).
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {pgEligibility.map((item, idx) => (
                                <div
                                  key={item.sNo || idx}
                                  className="border-2 border-blue-200 rounded-2xl p-5 bg-white shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between gap-3"
                                >
                                  <div className="flex flex-col gap-2">
                                    <span className="inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-900 w-fit">
                                      {item.streamBadge || "Postgraduate Professional"}
                                    </span>
                                    <h5 className="font-outfit font-extrabold text-base text-slate-900">
                                      {item.programme}
                                    </h5>
                                    <div className="flex items-start gap-2 pt-1">
                                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                        {item.eligibilityCriteria}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-bold">
                                    <span>Entrance: AP ICET</span>
                                    <button
                                      type="button"
                                      onClick={() => openPdf(admissionDocuments.pgRequiredDocsPdf, "PG Required Documents Checklist")}
                                      className="text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                      View Checklist <ChevronRight className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  </section>
                )}

                {/* ========================================================================= */}
                {/* SUBPAGE 2: B - ADMISSION POLICY & PROCESS                                 */}
                {/* ========================================================================= */}
                {activeSubpage === "subpage-admission-policy-process" && (
                  <section
                    id="admissions-active-subpage-section"
                    className="scroll-mt-36 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
                    style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                  >
                    {/* Full-Width Section Header Banner */}
                    <div
                      className="text-white px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--sec3-bg, var(--level2-bg, #002147))",
                        borderColor: "var(--sec3-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-indigo-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec3-title, var(--level2-title, #ffffff))" }}
                        >
                          Admission Policy &amp; Process
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec3-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Government seat allocation, web counselling, institutional guidelines, and document submission.
                      </p>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                      
                      {/* Admission Policy & Guidelines */}
                      <div
                        id="sec-policy-guidelines"
                        className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 bg-white"
                      >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                            <ShieldCheck className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Admission Policy &amp; Guidelines
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">Statutory Seat Allocation &amp; Fair Merit-Based Procedures</p>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                          St. Ann’s College for Women ensures fair, transparent, inclusive and non-discriminatory admission practices strictly adhering to the reservation rules and statutory directives of the Government of Andhra Pradesh and Acharya Nagarjuna University.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                          {[
                            { title: "70% Convener Quota (Category A)", desc: "Allotted through APSCHE centralized online web counselling (AP-CAP for UG, AP ICET for PG) based on merit." },
                            { title: "30% Management Quota (Category B)", desc: "Admitted by the college management transparently on merit in qualifying examinations as per APSCHE rules." },
                            { title: "10% Supernumerary EWS Quota", desc: "Implemented as per Government orders for eligible Economically Weaker Section candidates." },
                            { title: "Statutory Reservation Norms", desc: "Strict adherence to reservation policies for SC, ST, BC (A/B/C/D/E), PwD, and minority students." },
                            { title: "Zero Capitation Policy", desc: "Strict prohibition of donations or capitation fees under the AP Educational Institutions Prohibition of Capitation Fee Act." },
                            { title: "Institutional Anti-Ragging", desc: "Mandatory anti-ragging undertakings and supportive environment for student safety and welfare." },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col gap-1.5 bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs"
                            >
                              <div className="flex items-center gap-2">
                                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 shrink-0">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </span>
                                <h6 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h6>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium pl-7">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Required Documents Checklist */}
                      <div
                        id="sec-required-documents"
                        className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-[#e8f1fd]"
                      >
                        <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                            <FileText className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Required Documents Checklist
                            </h4>
                            <p className="text-xs text-blue-600/80 font-medium">Official Document Verification Checklists for UG &amp; PG Programmes</p>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Candidates must submit original certificates along with 3 sets of self-attested photocopies at the time of certificate verification and admission confirmation.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* UG Documents Card */}
                          <div className="border-2 border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between gap-4">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
                                  UG Programmes Checklist
                                </span>
                                <span className="text-[11px] text-slate-400 font-bold">10 Requirements</span>
                              </div>
                              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                                {[
                                  "Transfer Certificate (T.C.) & Conduct Certificate from previous institution",
                                  "Intermediate (+2) Marks Memo / Pass Certificate (Original)",
                                  "SSC (10th) Marks Memo for Proof of Date of Birth",
                                  "Study & Bonafide Certificates (Classes VI to XII)",
                                  "Integrated Community / Caste Certificate (SC/ST/BC candidates)",
                                  "Income Certificate / Rice Card (for fee reimbursement / scholarship)",
                                  "EWS Certificate issued by Tahsildar (if applicable)",
                                  "Aadhaar Card copy (Candidate & Parent)",
                                  "Passport Size Photographs (6 copies)",
                                  "AP-CAP / OAMDC Allotment Order & Joining Report",
                                ].map((doc, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                                    <span>{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => openPdf(admissionDocuments.ugRequiredDocsPdf, "UG Required Documents Checklist")}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-xl border border-blue-200/80 transition-all cursor-pointer shadow-2xs"
                              >
                                <Eye className="h-3.5 w-3.5" /> View PDF
                              </button>
                              <a
                                href={getCleanPdfUrl(admissionDocuments.ugRequiredDocsPdf, "UG Required Documents Checklist", true)}
                                download
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </a>
                            </div>
                          </div>

                          {/* PG Documents Card */}
                          <div className="border-2 border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between gap-4">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <span className="text-xs font-black uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md">
                                  PG Programmes Checklist
                                </span>
                                <span className="text-[11px] text-slate-400 font-bold">10 Requirements</span>
                              </div>
                              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                                {[
                                  "Degree Consolidated Marks Memo (CMM) & Provisional Certificate (PC)",
                                  "AP ICET Rank Card & Hall Ticket",
                                  "Transfer Certificate (T.C.) & Conduct Certificate from Degree College",
                                  "Intermediate (+2) & SSC (10th) Marks Memos",
                                  "Study / Bonafide Certificates (Degree & Intermediate)",
                                  "Integrated Caste Certificate (SC/ST/BC candidates)",
                                  "Income Certificate / Ration Card / Rice Card",
                                  "Residence / Migration Certificate (if from outside ANU / AP)",
                                  "Aadhaar Card copy & 6 Passport Size Photographs",
                                  "AP ICET Convener Allotment Order & Joining Report",
                                ].map((doc, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Check className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                                    <span>{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() => openPdf(admissionDocuments.pgRequiredDocsPdf, "PG Required Documents Checklist")}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-[#002147] hover:text-white rounded-xl border border-indigo-200/80 transition-all cursor-pointer shadow-2xs"
                              >
                                <Eye className="h-3.5 w-3.5" /> View PDF
                              </button>
                              <a
                                href={getCleanPdfUrl(admissionDocuments.pgRequiredDocsPdf, "PG Required Documents Checklist", true)}
                                download
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Application Forms & Downloads */}
                      <div
                        id="sec-application-forms"
                        className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                      >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                            <FileCheck2 className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Application Forms &amp; Online Portals
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">Downloadable Application Forms and Official Online Web Counselling Portals</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* UG Form */}
                          <div className="border-2 border-slate-200/80 rounded-2xl p-5 bg-slate-50/60 hover:border-blue-400 transition-all flex flex-col justify-between gap-3">
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md w-fit">
                                UG Form
                              </span>
                              <h5 className="font-outfit font-extrabold text-slate-900 text-sm">
                                UG Application Form
                              </h5>
                              <p className="text-xs text-slate-600 font-medium">
                                Prescribed institutional application form for Undergraduate admissions.
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/70">
                              <button
                                type="button"
                                onClick={() => openPdf(admissionDocuments.ugApplicationFormPdf, "UG Application Form")}
                                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-bold text-blue-700 bg-white hover:bg-[#002147] hover:text-white rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
                              >
                                <Eye className="h-3.5 w-3.5" /> View
                              </button>
                              <a
                                href={getCleanPdfUrl(admissionDocuments.ugApplicationFormPdf, "UG Application Form", true)}
                                download
                                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </a>
                            </div>
                          </div>

                          {/* PG Form */}
                          <div className="border-2 border-slate-200/80 rounded-2xl p-5 bg-slate-50/60 hover:border-blue-400 transition-all flex flex-col justify-between gap-3">
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md w-fit">
                                PG Form
                              </span>
                              <h5 className="font-outfit font-extrabold text-slate-900 text-sm">
                                PG Application Form
                              </h5>
                              <p className="text-xs text-slate-600 font-medium">
                                Prescribed application form for MCA &amp; MBA admissions.
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/70">
                              <button
                                type="button"
                                onClick={() => openPdf(admissionDocuments.pgApplicationFormPdf, "PG Application Form")}
                                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-bold text-indigo-700 bg-white hover:bg-[#002147] hover:text-white rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
                              >
                                <Eye className="h-3.5 w-3.5" /> View
                              </button>
                              <a
                                href={getCleanPdfUrl(admissionDocuments.pgApplicationFormPdf, "PG Application Form", true)}
                                download
                                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </a>
                            </div>
                          </div>

                          {/* AP-CAP Online Portal */}
                          <div className="border-2 border-emerald-200 rounded-2xl p-5 bg-emerald-50/50 hover:border-emerald-400 transition-all flex flex-col justify-between gap-3">
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md w-fit">
                                Govt Online Portal
                              </span>
                              <h5 className="font-outfit font-extrabold text-slate-900 text-sm">
                                AP-CAP Degree Portal
                              </h5>
                              <p className="text-xs text-slate-600 font-medium">
                                Online Admissions Module for Degree Colleges (OAMDC / AP-CAP) under APSCHE.
                              </p>
                            </div>
                            <div className="pt-2 border-t border-emerald-200/70">
                              <a
                                href={admissionDocuments.capPortalUrl || "https://cap.apcfss.in/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all cursor-pointer shadow-2xs"
                              >
                                <ExternalLink className="h-3.5 w-3.5" /> Visit AP-CAP Portal
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </section>
                )}

                {/* ========================================================================= */}
                {/* SUBPAGE 3: C - PROSPECTUS & BROCHURES                                     */}
                {/* ========================================================================= */}
                {activeSubpage === "subpage-prospectus-brochures" && (
                  <section
                    id="admissions-active-subpage-section"
                    className="scroll-mt-36 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
                    style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                  >
                    {/* Full-Width Section Header Banner */}
                    <div
                      className="text-white px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--sec4-bg, var(--level2-bg, #002147))",
                        borderColor: "var(--sec4-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-indigo-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec4-title, var(--level2-title, #ffffff))" }}
                        >
                          Prospectus &amp; Brochures
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Official institutional prospectus, academic brochures, and programme pamphlets.
                      </p>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                      
                      {/* College Prospectus 2025-26 */}
                      <div
                        id="sec-prospectus-view"
                        className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 bg-white"
                      >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                            <BookOpen className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              College Prospectus 2025–26
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">Comprehensive Institutional Academic Handbook &amp; Guidelines</p>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                          The College Prospectus contains in-depth information about the institution&apos;s history, vision, academic curriculum, faculty credentials, campus infrastructure, student welfare cells, code of conduct, and fee structures.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => openPdf(admissionDocuments.prospectusPdf || DEFAULT_PDF, "College Prospectus 2025–26")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002147] hover:bg-[#0c478a] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <Eye className="h-4 w-4 text-amber-300" />
                            <span>View Prospectus PDF</span>
                          </button>
                          <a
                            href={getCleanPdfUrl(admissionDocuments.prospectusPdf || DEFAULT_PDF, "College Prospectus 2025–26", true)}
                            download
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      </div>

                      {/* Admissions Pamphlets & Brochures */}
                      <div
                        id="sec-brochures-gallery"
                        className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-[#e8f1fd]"
                      >
                        <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                            <Layers className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Admissions Pamphlets &amp; Brochures
                            </h4>
                            <p className="text-xs text-blue-600/80 font-medium">Digital Informative Pamphlets, Course Highlights &amp; Highlights</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Pamphlet 1 */}
                          <div className="border-2 border-slate-200 rounded-2xl p-4 bg-white shadow-xs flex flex-col gap-3 group">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={admissionDocuments.pamphlet1 || DEFAULT_IMAGE}
                                alt="Admissions Pamphlet Overview"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
                                }}
                                onClick={() => {
                                  setImageLightboxUrl(admissionDocuments.pamphlet1 || DEFAULT_IMAGE);
                                  setImageLightboxTitle("Admissions Pamphlet 1");
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImageLightboxUrl(admissionDocuments.pamphlet1 || DEFAULT_IMAGE);
                                  setImageLightboxTitle("Admissions Pamphlet 1");
                                }}
                                className="absolute right-2 bottom-2 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs backdrop-blur-xs transition-colors cursor-pointer"
                                title="Enlarge Image"
                              >
                                <Maximize2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-800">Admissions Information Brochure 1</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setImageLightboxUrl(admissionDocuments.pamphlet1 || DEFAULT_IMAGE);
                                  setImageLightboxTitle("Admissions Pamphlet 1");
                                }}
                                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" /> Enlarge
                              </button>
                            </div>
                          </div>

                          {/* Pamphlet 2 */}
                          <div className="border-2 border-slate-200 rounded-2xl p-4 bg-white shadow-xs flex flex-col gap-3 group">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={admissionDocuments.pamphlet2 || DEFAULT_IMAGE}
                                alt="Admissions Pamphlet Details"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
                                }}
                                onClick={() => {
                                  setImageLightboxUrl(admissionDocuments.pamphlet2 || DEFAULT_IMAGE);
                                  setImageLightboxTitle("Admissions Pamphlet 2");
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImageLightboxUrl(admissionDocuments.pamphlet2 || DEFAULT_IMAGE);
                                  setImageLightboxTitle("Admissions Pamphlet 2");
                                }}
                                className="absolute right-2 bottom-2 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs backdrop-blur-xs transition-colors cursor-pointer"
                                title="Enlarge Image"
                              >
                                <Maximize2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-800">Admissions Highlights Brochure 2</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setImageLightboxUrl(admissionDocuments.pamphlet2 || DEFAULT_IMAGE);
                                  setImageLightboxTitle("Admissions Pamphlet 2");
                                }}
                                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" /> Enlarge
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </section>
                )}

                {/* ========================================================================= */}
                {/* SUBPAGE 4: D - ADMISSION DESK                                             */}
                {/* ========================================================================= */}
                {activeSubpage === "subpage-admission-desk" && (
                  <section
                    id="admissions-active-subpage-section"
                    className="scroll-mt-36 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
                    style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                  >
                    {/* Full-Width Section Header Banner */}
                    <div
                      className="text-white px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--sec5-bg, var(--level2-bg, #002147))",
                        borderColor: "var(--sec5-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="h-6 w-6 text-indigo-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec5-title, var(--level2-title, #ffffff))" }}
                        >
                          Admission Desk
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec5-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Dedicated admission helpdesk, contact helplines, working hours, and candidate enquiry.
                      </p>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                      
                      {/* Admission Helpdesk & Contact Particulars */}
                      <div
                        id="sec-desk-contacts"
                        className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5 bg-white"
                      >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                            <Phone className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Helpdesk &amp; Contact Particulars
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">Direct Telephone Helplines, Mobile Numbers, and Electronic Mail</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                              <Phone className="h-4 w-4" />
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Office Landline</span>
                            <a href="tel:+918632236470" className="font-black text-sm text-slate-900 hover:text-blue-700 transition-colors">
                              0863-2236470
                            </a>
                          </div>

                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800">
                              <Phone className="h-4 w-4" />
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mobile Helplines</span>
                            <div className="flex flex-col text-xs font-extrabold text-slate-900">
                              <a href="tel:+917382104655" className="hover:text-blue-700">7382104655</a>
                              <a href="tel:+918500656134" className="hover:text-blue-700">8500656134</a>
                              <a href="tel:+919441128178" className="hover:text-blue-700">9441128178</a>
                            </div>
                          </div>

                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                              <Mail className="h-4 w-4" />
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Admissions Email</span>
                            <a href="mailto:stannscollegegnt@gmail.com" className="font-extrabold text-xs text-slate-900 hover:text-blue-700 transition-colors truncate">
                              stannscollegegnt@gmail.com
                            </a>
                          </div>

                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                              <Clock className="h-4 w-4" />
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Working Hours</span>
                            <span className="font-extrabold text-xs text-slate-900">
                              {deskInfo.officeHours || "9:00 AM – 4:30 PM (Mon–Sat)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Office Timings & Campus Location */}
                      <div
                        id="sec-desk-timings"
                        className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 bg-[#e8f1fd]"
                      >
                        <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                            <MapPin className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Office Timings &amp; Campus Location
                            </h4>
                            <p className="text-xs text-blue-600/80 font-medium">Physical Location of Admission Desk and Visiting Particulars</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col gap-1 text-slate-700 text-xs font-medium">
                            <span className="font-bold text-slate-900 text-sm">{deskInfo.collegeAddress || "St. Ann’s College for Women"}</span>
                            <span>Gorantla, Guntur – 522034, Andhra Pradesh, India.</span>
                            <span className="text-blue-700 font-bold mt-1">Visiting Hours: Mon–Sat: 9:00 AM – 4:30 PM (Closed on Sundays &amp; Public Holidays)</span>
                          </div>

                          <a
                            href="https://maps.google.com/?q=St.+Ann%27s+College+for+Women+Gorantla+Guntur"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-blue-900 hover:text-white text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
                          >
                            <MapPin className="h-4 w-4 text-rose-500" />
                            <span>Google Maps Directions</span>
                          </a>
                        </div>
                      </div>

                      {/* E.3 Interactive Candidate Admission Enquiry */}
                      <div
                        id="sec-desk-enquiry"
                        className="scroll-mt-52 border-2 border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-white"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-[#002147] font-black text-lg shadow-xs shrink-0">
                            <Send className="h-6 w-6" />
                          </span>
                          <div className="flex flex-col">
                            <h4 className="font-outfit text-slate-900 font-extrabold text-base md:text-lg">
                              Have Questions Regarding Admissions 2026–2027?
                            </h4>
                            <p className="text-xs text-slate-600 font-medium">
                              Submit your enquiry online to receive personalized counseling regarding course eligibility and application guidance.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsEnquiryModalOpen(true)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#002147] hover:bg-[#0c478a] text-amber-300 hover:text-white font-black rounded-xl text-xs transition-all shadow-md cursor-pointer shrink-0"
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>Submit Admission Enquiry</span>
                        </button>
                      </div>

                    </div>
                  </section>
                )}

                {/* ========================================================================= */}
                {/* SUBPAGE 5: E - ADMISSION INFORMATION (TABLE 3)                            */}
                {/* ========================================================================= */}
                {activeSubpage === "subpage-admission-information" && (
                  <section
                    id="admissions-active-subpage-section"
                    className="scroll-mt-36 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200 animate-fadeIn"
                    style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                  >
                    {/* Full-Width Section Header Banner */}
                    <div
                      className="text-white px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--sec6-bg, var(--level2-bg, #002147))",
                        borderColor: "var(--sec6-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="h-6 w-6 text-indigo-300 shrink-0" />
                        <h2
                          className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                          style={{ color: "var(--sec6-title, var(--level2-title, #ffffff))" }}
                        >
                          Admission Information
                        </h2>
                      </div>
                      <p
                        className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                        style={{ color: "var(--sec6-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Statutory admission records, affiliation orders, sanctioned intake orders, and admitted student lists across academic years.
                      </p>
                    </div>

                    <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                      
                      {/* Statutory Admission Records (Table 3 from Document) */}
                      <div
                        id="sec-info-compliance"
                        className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 bg-white"
                      >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                            <FileSpreadsheet className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              Statutory Admission Records &amp; Compliance (Table 3)
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">Affiliation Orders, Sanctioned Intake, Admitted Student Lists &amp; Category Admissions</p>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                          The table below reflects institutional compliance records as prescribed in Table 3 of the Admissions Guidelines, providing direct access to statutory university approvals, sanctioned intake orders, and admitted student registers.
                        </p>

                        {/* Yearly Records Table matching Table 3 from Word Doc */}
                        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                                <th className="py-3.5 px-4 text-center">Academic Year</th>
                                <th className="py-3.5 px-4 text-center">Affiliation &amp; Approval Orders</th>
                                <th className="py-3.5 px-4 text-center">Sanctioned Intake Orders</th>
                                <th className="py-3.5 px-4 text-center">Admitted Students List</th>
                                <th className="py-3.5 px-4 text-center">Category-wise Admissions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                              {yearlyRecords.map((row, idx) => (
                                <tr key={row.year || idx} className="hover:bg-blue-50/50 transition-colors">
                                  <td className="py-3.5 px-4 text-center font-bold text-slate-900 text-sm whitespace-nowrap">
                                    {row.year}
                                  </td>
                                  
                                  {/* Col A: Affiliation Orders */}
                                  <td className="py-3.5 px-4 text-center">
                                    <div className="inline-flex flex-col items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => openPdf(row.affiliationDocUrl, row.affiliationDocTitle || `ANU Affiliation Orders (${row.year})`)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-xl border border-blue-100 transition-all cursor-pointer"
                                      >
                                        <Eye className="h-3.5 w-3.5" /> View PDF
                                      </button>
                                    </div>
                                  </td>

                                  {/* Col B: Sanctioned Intake Orders */}
                                  <td className="py-3.5 px-4 text-center">
                                    <div className="inline-flex flex-col items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => openPdf(row.sanctionedIntakeDocUrl, row.sanctionedIntakeDocTitle || `Sanctioned Intake Orders (${row.year})`)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-[#002147] hover:text-white rounded-xl border border-indigo-100 transition-all cursor-pointer"
                                      >
                                        <Eye className="h-3.5 w-3.5" /> View PDF
                                      </button>
                                    </div>
                                  </td>

                                  {/* Col C: Admitted Students List */}
                                  <td className="py-3.5 px-4 text-center">
                                    <div className="inline-flex flex-col items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => openPdf(row.admittedStudentsDocUrl, row.admittedStudentsDocTitle || `List of Admitted Students (${row.year})`)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-700 hover:text-white rounded-lg border border-emerald-100 transition-all cursor-pointer"
                                      >
                                        <Eye className="h-3.5 w-3.5" /> View PDF
                                      </button>
                                    </div>
                                  </td>

                                  {/* Col D: Category Admissions */}
                                  <td className="py-3.5 px-4 text-center">
                                    <div className="inline-flex flex-col items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => openPdf(row.categoryAdmissionsDocUrl, row.categoryAdmissionsDocTitle || `Category Admissions (${row.year})`)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-700 hover:text-white rounded-xl border border-amber-200 transition-all cursor-pointer"
                                      >
                                        <Eye className="h-3.5 w-3.5" /> View PDF
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </section>
                )}

              </div>
            </main>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewModalUrl && (
        <FilePreviewModal
          isOpen={!!previewModalUrl}
          onClose={() => {
            setPreviewModalUrl(null);
            setPreviewModalTitle("");
          }}
          fileUrl={previewModalUrl}
          title={previewModalTitle}
        />
      )}

      {/* Image Lightbox Modal for Pamphlets */}
      {imageLightboxUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 bg-[#002147] text-white">
              <span className="font-bold text-sm">{imageLightboxTitle}</span>
              <button
                type="button"
                onClick={() => setImageLightboxUrl(null)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto max-h-[calc(90vh-4rem)] flex items-center justify-center bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageLightboxUrl}
                alt={imageLightboxTitle}
                className="max-h-[80vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Admission Enquiry Modal */}
      <AdmissionEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
}
