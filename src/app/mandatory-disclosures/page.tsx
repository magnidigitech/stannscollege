"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Scale,
  GraduationCap,
  Users2,
  BookOpen,
  Eye,
  Download,
  ExternalLink,
  ChevronRight,
  Landmark,
  BarChart3,
  Archive,
  Phone,
  CheckCircle2,
  FileCheck2,
  FolderLock,
  Layers,
  Calendar,
  AlertCircle,
  Building,
  HeartHandshake,
  Globe,
  Milestone,
  Flame,
  Award,
  Activity,
  Coins,
  X
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { getMandatoryDisclosures, DEFAULT_MANDATORY_DISCLOSURES } from "@/lib/sanity";

// Direct file resolvers for ANU and AISHE so local files are always served reliably
const KNOWN_ANU_MAP: Record<string, string> = {
  "ug_2025–2026": "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf",
  "ug_2025-2026": "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf",
  "ug_2024–2025": "/documents/affiliations/ANU_UG_Affiliation_2024-2025.pdf",
  "ug_2024-2025": "/documents/affiliations/ANU_UG_Affiliation_2024-2025.pdf",
  "ug_2023–2024": "/documents/affiliations/ANU_UG_Affiliation_2023-2024.pdf",
  "ug_2023-2024": "/documents/affiliations/ANU_UG_Affiliation_2023-2024.pdf",
  "pg_2025–2026": "/documents/affiliations/ANU_PG_Affiliation_2025-2026.pdf",
  "pg_2025-2026": "/documents/affiliations/ANU_PG_Affiliation_2025-2026.pdf",
  "pg_2024–2025": "/documents/affiliations/ANU_PG_Affiliation_2024-2025.pdf",
  "pg_2024-2025": "/documents/affiliations/ANU_PG_Affiliation_2024-2025.pdf",
  "pg_2023–2024": "/documents/affiliations/ANU_PG_Affiliation_2023-2024.pdf",
  "pg_2023-2024": "/documents/affiliations/ANU_PG_Affiliation_2023-2024.pdf",
};

const resolveAnuUrl = (prog: string, yr: string, currentUrl?: string) => {
  if (currentUrl && currentUrl !== "/documents/DefaultFile_1.pdf" && currentUrl.trim() !== "") {
    return currentUrl;
  }
  const key = `${prog.toLowerCase()}_${yr.trim()}`;
  return KNOWN_ANU_MAP[key] || currentUrl || "/documents/DefaultFile_1.pdf";
};

const KNOWN_AISHE_MAP: Record<string, string> = {
  "2024–2025": "/documents/aishe/AISHE_Certificate_2024-2025.pdf",
  "2024-2025": "/documents/aishe/AISHE_Certificate_2024-2025.pdf",
  "2023–2024": "/documents/aishe/AISHE_Certificate_2023-2024.pdf",
  "2023-2024": "/documents/aishe/AISHE_Certificate_2023-2024.pdf",
  "2022–2023": "/documents/aishe/AISHE_Certificate_2022-2023.pdf",
  "2022-2023": "/documents/aishe/AISHE_Certificate_2022-2023.pdf",
  "2021–2022": "/documents/aishe/AISHE_Certificate_2021-2022.pdf",
  "2021-2022": "/documents/aishe/AISHE_Certificate_2021-2022.pdf",
  "2020–2021": "/documents/aishe/AISHE_Certificate_2020-2021.pdf",
  "2020-2021": "/documents/aishe/AISHE_Certificate_2020-2021.pdf",
};

const resolveAisheUrl = (yr: string, currentUrl?: string) => {
  if (currentUrl && currentUrl !== "/documents/DefaultFile_1.pdf" && currentUrl.trim() !== "") {
    return currentUrl;
  }
  return KNOWN_AISHE_MAP[yr.trim()] || currentUrl || "/documents/DefaultFile_1.pdf";
};

// Sidebar categories matching Mandatory Disclosures Content list.pdf (A to H)
const MANDATORY_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "sec-statutory",
    title: "A. Statutory & Regulatory",
    sectionId: "sec-statutory",
    items: [
      { text: "1. Mandatory Disclosure", id: "sec-mandatory-disclosure" },
      { text: "2. Institutional Profile & Scope", id: "sec-institutional-profile" },
      { text: "3. ANU Affiliation Orders – UG & PG", id: "sec-anu-affiliations" },
      { text: "4. AICTE Approval / EoA Documents", id: "sec-aicte-approval" },
      { text: "5. UGC Section 2(f) Recognition", id: "sec-ugc-recognition" },
      { text: "6. CCE & APSCHE Orders", id: "sec-apsche-orders" },
      { text: "7. AISHE Certificates & Reports", id: "sec-aishe-reports" },
      { text: "8. NIRF Submission & Reports", id: "sec-nirf-reports" },
    ]
  },
  {
    catSlug: "sec-compliance",
    title: "B. Regulatory Compliance",
    sectionId: "sec-compliance",
    items: [
      { text: "1. AICTE Compliance", id: "sec-compliance-aicte" },
      { text: "2. UGC Compliance", id: "sec-compliance-ugc" },
      { text: "3. APSCHE Compliance", id: "sec-compliance-apsche" },
      { text: "4. Other Statutory Compliance", id: "sec-compliance-other" },
    ]
  },
  {
    catSlug: "sec-rti",
    title: "C. Right to Information (RTI)",
    sectionId: "sec-rti",
    items: [
      { text: "1. RTI Act & Particulars", id: "sec-rti-info" },
      { text: "2. RTI Committee / Authorities", id: "sec-rti-committee" },
      { text: "3. RTI Official Documents", id: "sec-rti-docs" },
    ]
  },
  {
    catSlug: "sec-student-welfare",
    title: "D. Student Welfare & Grievance",
    sectionId: "sec-student-welfare",
    items: [
      { text: "1. Anti-Ragging Policy & Committee", id: "sec-welfare-antiragging" },
      { text: "2. Grievance Redressal Cell", id: "sec-welfare-grievance" },
      { text: "3. Internal Complaints Committee (ICC)", id: "sec-welfare-icc" },
      { text: "4. Women Empowerment & Safety", id: "sec-welfare-women" },
      { text: "5. Student Counselling & Support", id: "sec-welfare-counseling" },
      { text: "6. SC/ST & Equal Opportunity Cell", id: "sec-welfare-eoc" },
    ]
  },
  {
    catSlug: "sec-financial",
    title: "E. Financial Transparency",
    sectionId: "sec-financial",
    items: [
      { text: "1. Annual Budget", id: "sec-financial-budget" },
      { text: "2. Audited Financial Statements", id: "sec-financial-audit" },
      { text: "3. Financial Resources / Sources of Income", id: "sec-financial-income" },
      { text: "4. Endowment & Corpus Funds", id: "sec-financial-corpus" },
      { text: "5. Utilization Certificates", id: "sec-financial-utilization" },
      { text: "6. Finance Policy", id: "sec-financial-finance_policy" },
      { text: "7. Purchase & Procurement Policy", id: "sec-financial-procurement" },
      { text: "8. Infrastructure Development Policy", id: "sec-financial-infrastructure_policy" },
      { text: "9. Approved Fee Structure", id: "sec-financial-fee_structure" },
      { text: "10. AFRC Orders", id: "sec-financial-afrc_orders" },
      { text: "11. Scholarship Details", id: "sec-financial-scholarship" },
    ]
  },
  {
    catSlug: "sec-governance",
    title: "F. Governance & Policies",
    sectionId: "sec-governance",
    items: [
      { text: "1. Governance Structure & Organogram", id: "sec-gov-structure" },
      { text: "2. Institutional Policies Compendium", id: "sec-gov-policies" },
      { text: "3. Code of Conduct & Ethics", id: "sec-gov-code" },
      { text: "4. Administrative & Academic Policies", id: "sec-gov-admin" },
    ]
  },
  {
    catSlug: "sec-reports",
    title: "G. Institutional Reports & Data",
    sectionId: "sec-reports",
    items: [
      { text: "1. Year-wise Annual Reports", id: "sec-reports-annual" },
      { text: "2. Institutional Data & Statistics", id: "sec-reports-stats" },
      { text: "3. Other Statutory Reports", id: "sec-reports-statutory" },
    ]
  },
  {
    catSlug: "sec-archives",
    title: "H. Disclosure Archives",
    sectionId: "sec-archives",
    items: [
      { text: "1. Historic Disclosure Matrix", id: "sec-archives-matrix" },
      { text: "2. Periodic Verification Status", id: "sec-archives-verification" },
    ]
  }
];

export default function MandatoryDisclosuresPage() {
  const [data, setData] = useState<any>(DEFAULT_MANDATORY_DISCLOSURES);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-statutory");
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);
  const [anuTab, setAnuTab] = useState<"ug" | "pg">("ug");

  // State for "View All" ANU Modal popup
  const [isAnuModalOpen, setIsAnuModalOpen] = useState(false);
  const [anuSearchQuery, setAnuSearchQuery] = useState("");
  const [anuModalFilter, setAnuModalFilter] = useState<"all" | "ug" | "pg">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAnuModalOpen(false);
      }
    };
    if (isAnuModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnuModalOpen]);

  useEffect(() => {
    getMandatoryDisclosures()
      .then((res) => {
        if (res) setData(res);
      })
      .catch((err) => console.error("Error loading mandatory disclosures:", err));
  }, []);

  useEffect(() => {
    const allIds = [
      "sec-statutory",
      "sec-mandatory-disclosure",
      "sec-institutional-profile",
      "sec-anu-affiliations",
      "sec-aicte-approval",
      "sec-ugc-recognition",
      "sec-apsche-orders",
      "sec-aishe-reports",
      "sec-nirf-reports",
      "sec-compliance",
      "sec-compliance-aicte",
      "sec-compliance-ugc",
      "sec-compliance-apsche",
      "sec-compliance-other",
      "sec-rti",
      "sec-rti-info",
      "sec-rti-committee",
      "sec-rti-docs",
      "sec-student-welfare",
      "sec-welfare-antiragging",
      "sec-welfare-grievance",
      "sec-welfare-icc",
      "sec-welfare-women",
      "sec-welfare-counseling",
      "sec-welfare-eoc",
      "sec-financial",
      "sec-financial-budget",
      "sec-financial-audit",
      "sec-financial-income",
      "sec-financial-corpus",
      "sec-financial-utilization",
      "sec-financial-finance_policy",
      "sec-financial-procurement",
      "sec-financial-infrastructure_policy",
      "sec-financial-fee_structure",
      "sec-financial-afrc_orders",
      "sec-financial-scholarship",
      "sec-governance",
      "sec-gov-structure",
      "sec-gov-policies",
      "sec-gov-code",
      "sec-gov-admin",
      "sec-reports",
      "sec-reports-annual",
      "sec-reports-stats",
      "sec-reports-statutory",
      "sec-archives",
      "sec-archives-matrix",
      "sec-archives-verification",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(allIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPdf = (url?: string, title?: string) => {
    const targetUrl = url && url.trim() !== "" ? url : "/documents/DefaultFile_1.pdf";
    setPreviewPdf({
      url: targetUrl,
      title: title || "Mandatory Disclosure Document"
    });
  };

  const rawAnu = data.anuAffiliations || DEFAULT_MANDATORY_DISCLOSURES.anuAffiliations || [];
  const ugAnu = rawAnu.filter((item: any) => item.programmeType?.toLowerCase() === "ug");
  const pgAnu = rawAnu.filter((item: any) => item.programmeType?.toLowerCase() === "pg");

  // The active list on page and only the latest 3 items displayed on the main cards
  const currentAnuList = anuTab === "ug" ? ugAnu : pgAnu;
  const displayedAnu = currentAnuList.slice(0, 3);

  // All ANU items for modal filter & search
  const allModalAnu = rawAnu.filter((item: any) => {
    const matchesFilter =
      anuModalFilter === "all" || item.programmeType?.toLowerCase() === anuModalFilter;
    const matchesSearch =
      anuSearchQuery === "" ||
      (item.year && item.year.toLowerCase().includes(anuSearchQuery.toLowerCase())) ||
      (item.title && item.title.toLowerCase().includes(anuSearchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: About Navigation Sidebar */}
            <aside className="lg:col-span-3">
              <AboutSidebar
                categories={MANDATORY_SIDEBAR_CATEGORIES}
                bannerTitle="Mandatory Disclosures & Compliance"
                bannerSubtitle="Sections on this Page"
                activeId={activeSectionId}
                onItemClick={(id) => setActiveSectionId(id)}
              />
            </aside>

            {/* Right: Data Elements / Sections */}
            <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
              <div className="flex flex-col gap-4">

                {/* Sub-text Box */}
                <SubtextBox>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <strong className="text-blue-900 font-bold">
                      St. Ann’s College for Women, Gorantla, Guntur
                    </strong>, is committed to maintaining transparency, accountability, good governance and compliance with applicable statutory and regulatory requirements. The institution provides relevant information relating to its academic programmes, statutory approvals, affiliations, regulatory compliance, student welfare, financial management, governance and institutional functioning through its official website.
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      This section provides access to important institutional documents and information for the benefit of students, parents, faculty, stakeholders, regulatory authorities and the general public.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* SECTION A: Statutory & Regulatory Information                */}
                {/* ============================================================ */}
                <section
                  id="sec-statutory"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  {/* Full-Width Section Header Banner */}
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        A. Statutory &amp; Regulatory Information
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Core institutional affiliations, approvals, survey reports, and official particulars.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* A.1 Mandatory Disclosure */}
                    <div
                      id="sec-mandatory-disclosure"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <FileText className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            1. Mandatory Disclosure
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Official prescribed institutional disclosure document</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The institution publishes the prescribed Mandatory Disclosure containing essential information relating to the institution, management, academic programmes, approved intake, faculty, infrastructure, facilities and other relevant institutional particulars.
                      </p>

                      <div className="flex flex-col gap-1">
                        <h5 className="font-outfit font-extrabold text-sm text-slate-900 uppercase tracking-wide">Documents / Information:</h5>
                        <div className="flex flex-col gap-2 mt-1">
                          {(data.mandatoryDisclosureDocs || []).map((doc: any, idx: number) => (
                            <div key={doc._key || idx} className="flex items-center gap-3 bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-200/80">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span className="text-xs font-semibold text-slate-700 flex-1 truncate">{doc.title}</span>
                              <button
                                onClick={() => openPdf(doc.fileUrl, doc.title)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#002147] hover:bg-blue-900 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0"
                              >
                                <Eye className="h-3 w-3" />
                                <span>View PDF</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* A.2 Institutional Profile & Programme Details */}
                    <div
                      id="sec-institutional-profile"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <GraduationCap className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            {data.institutionalProfile?.title || "2. Institutional Profile & Programme Details"}
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">
                            {data.institutionalProfile?.subtitle || "Academic programmes, duration, eligibility, and sanctioned intake"}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        {data.institutionalProfile?.description || "This section provides comprehensive information about the institution and its academic programmes, including programme names, duration, eligibility, sanctioned intake and other relevant academic particulars."}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                          href={data.institutionalProfile?.programmesLink || "/courses"}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-blue-200/80 hover:bg-[#1e40af] hover:text-white text-blue-700 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          <span>{data.institutionalProfile?.programmesBtnLabel || "View All Academic Programmes"}</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => openPdf(data.institutionalProfile?.sanctionedOrderFileUrl || "/documents/DefaultFile_1.pdf", data.institutionalProfile?.sanctionedOrderBtnLabel || "Programme Details & Sanctioned Intake")}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-blue-200/80 hover:bg-[#1e40af] hover:text-white text-blue-700 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span>{data.institutionalProfile?.sanctionedOrderBtnLabel || "Sanctioned Strength Order (PDF)"}</span>
                        </button>
                      </div>
                    </div>

                    {/* A.3 ANU Affiliation Orders - UG & PG (Shows only latest 3 + View All modal) */}
                    <div
                      id="sec-anu-affiliations"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                            <Building className="h-5 w-5" />
                          </span>
                          <div>
                            <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                              3. ANU Affiliation Orders – UG &amp; PG
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">Acharya Nagarjuna University permanent and temporary affiliation orders</p>
                          </div>
                        </div>

                        {/* Controls: UG/PG Toggle + View All Button */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          {/* UG / PG Switch */}
                          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                            <button
                              onClick={() => setAnuTab("ug")}
                              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                                anuTab === "ug" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              Undergraduate (UG)
                            </button>
                            <button
                              onClick={() => setAnuTab("pg")}
                              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                                anuTab === "pg" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              Postgraduate (PG)
                            </button>
                          </div>

                          {/* View All Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setAnuModalFilter(anuTab);
                              setIsAnuModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#002147] hover:bg-[#003366] px-4 py-2 rounded-xl transition-all shadow-xs hover:shadow hover:scale-105 active:scale-95 cursor-pointer select-none"
                            title="View all ANU affiliation orders & archive"
                          >
                            <FileText className="h-3.5 w-3.5 text-amber-300" />
                            <span>View All ({currentAnuList.length})</span>
                            <ExternalLink className="h-3 w-3 opacity-80" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Displaying latest 3 academic years for {anuTab.toUpperCase()} programmes. Use <strong>View All</strong> to explore older years and complete archive.
                        </p>
                      </div>

                      {/* Displaying ONLY Latest 3 Cards on Main Page */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedAnu.map((item: any, idx: number) => {
                          const resolvedUrl = resolveAnuUrl(item.programmeType || anuTab, item.year, item.fileUrl);
                          return (
                            <div
                              key={item._key || idx}
                              className="border-2 border-slate-200/80 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between gap-3.5 bg-slate-50/60 group"
                            >
                              <div className="flex items-start gap-3.5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/70 text-blue-800 font-bold text-xs shrink-0 group-hover:bg-[#002147] group-hover:text-white transition-colors">
                                  <GraduationCap className="h-5 w-5" />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-extrabold text-base text-slate-900">{item.year}</p>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                      Latest
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                                    {item.title || `${anuTab.toUpperCase()} Affiliation Order`}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/80">
                                <button
                                  onClick={() => openPdf(resolvedUrl, `${anuTab.toUpperCase()} Affiliation Order - ${item.year}`)}
                                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-white hover:bg-[#002147] hover:text-white rounded-xl border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                                >
                                  <Eye className="h-3.5 w-3.5" /> View PDF
                                </button>
                                <a
                                  href={resolvedUrl}
                                  download
                                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                                >
                                  <Download className="h-3.5 w-3.5" /> Download
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* A.4 AICTE Approval / EoA Documents */}
                    <div
                      id="sec-aicte-approval"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Milestone className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            4. AICTE Approval / Extension of Approval (EoA) Documents
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Year-wise All India Council for Technical Education regulatory approvals</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        St. Ann’s College for Women, Gorantla, Guntur, maintains the applicable AICTE Approval / Extension of Approval (EoA) documents relating to its approved programmes. The relevant documents are provided year-wise for transparency and institutional reference.
                      </p>

                      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold border-b border-[#001733]">
                              <th className="py-3.5 px-6">Academic Year</th>
                              <th className="py-3.5 px-6">Document Name</th>
                              <th className="py-3.5 px-6 text-right">View Document</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.aicteApprovals || []).map((row: any, idx: number) => (
                              <tr key={row._key || idx} className="hover:bg-blue-50/50 transition-colors">
                                <td className="py-3.5 px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                                <td className="py-3.5 px-6">{row.title || "AICTE Approval / EoA"}</td>
                                <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => openPdf(row.fileUrl, `AICTE Approval - ${row.year}`)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl font-bold text-xs transition-all border border-blue-100/70 cursor-pointer"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>{row.year === "Previous Years" ? "View Archive" : "View PDF"}</span>
                                    </button>
                                    {row.redirectUrl && (
                                      <a
                                        href={row.redirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-xs transition-all border border-emerald-200 cursor-pointer"
                                        title="Open Portal Link"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        <span>Portal</span>
                                      </a>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* A.5 UGC Section 2(f) Recognition */}
                    <div
                      id="sec-ugc-recognition"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <Award className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            5. UGC Section 2(f) Recognition
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">University Grants Commission recognition under Section 2(f) of UGC Act, 1956</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        St. Ann’s College for Women, Gorantla, Guntur, is recognised under Section 2(f) of the University Grants Commission (UGC) Act, 1956, as applicable. The relevant UGC recognition document is made available below for public reference and institutional verification.
                      </p>

                      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold border-b border-[#001733]">
                              <th className="py-3.5 px-6 w-20">Sl. No.</th>
                              <th className="py-3.5 px-6">Document Particulars</th>
                              <th className="py-3.5 px-6 text-right">View Document</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.ugcDocuments || []).map((row: any, idx: number) => (
                              <tr key={row._key || idx} className="hover:bg-blue-50/50 transition-colors">
                                <td className="py-3.5 px-6 font-bold text-slate-900">{row.sNo || idx + 1}</td>
                                <td className="py-3.5 px-6 font-semibold text-slate-800">{row.title || "UGC Section 2(f) Recognition Order"}</td>
                                <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => openPdf(row.fileUrl, row.title || "UGC Recognition Document")}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl font-bold text-xs transition-all border border-blue-100/70 cursor-pointer"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>View PDF</span>
                                    </button>
                                    {row.redirectUrl && (
                                      <a
                                        href={row.redirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-xs transition-all border border-emerald-200 cursor-pointer"
                                        title="Open Portal Link"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        <span>Portal</span>
                                      </a>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* A.6 CCE & APSCHE Orders */}
                    <div
                      id="sec-apsche-orders"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Landmark className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            6. CCE &amp; APSCHE Orders and Communications
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Commissionerate of Collegiate Education and AP State Council of Higher Education</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        St. Ann’s College for Women maintains relevant orders, proceedings, communications, guidelines, and notifications issued by the Commissionerate of Collegiate Education (CCE), Government of Andhra Pradesh, and the Andhra Pradesh State Council of Higher Education (APSCHE).
                      </p>

                      {/* Sub-table A: CCE */}
                      <div className="flex flex-col gap-2.5">
                        <h5 className="font-outfit text-xs font-black uppercase tracking-wider text-slate-800">
                          A. Commissionerate of Collegiate Education (CCE / CHE)
                        </h5>
                        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                                <th className="py-3 px-6">Academic Year</th>
                                <th className="py-3 px-6">Document / Communication</th>
                                <th className="py-3 px-6 text-right">View</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                              {(data.cceOrders || []).map((row: any, idx: number) => (
                                <tr key={row._key || idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="py-3 px-6 font-bold text-slate-900">{row.year}</td>
                                  <td className="py-3 px-6">{row.title || "CCE Orders / Proceedings / Communications"}</td>
                                  <td className="py-3 px-6 text-right whitespace-nowrap">
                                    <div className="inline-flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => openPdf(row.fileUrl, `CCE Communication - ${row.year}`)}
                                        className="px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all border border-blue-100 cursor-pointer inline-flex items-center gap-1"
                                      >
                                        <Eye className="h-3 w-3" />
                                        <span>View PDF</span>
                                      </button>
                                      {row.redirectUrl && (
                                        <a
                                          href={row.redirectUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-xs transition-all border border-emerald-200 cursor-pointer inline-flex items-center gap-1"
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                          <span>Portal</span>
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Sub-table B: APSCHE */}
                      <div className="flex flex-col gap-2.5 pt-2">
                        <h5 className="font-outfit text-xs font-black uppercase tracking-wider text-slate-800">
                          B. APSCHE Orders &amp; Communications
                        </h5>
                        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                                <th className="py-3 px-6">Academic Year</th>
                                <th className="py-3 px-6">Document / Communication</th>
                                <th className="py-3 px-6 text-right">View</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                              {(data.apscheOrders || []).map((row: any, idx: number) => (
                                <tr key={row._key || idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="py-3 px-6 font-bold text-slate-900">{row.year}</td>
                                  <td className="py-3 px-6">{row.title || "APSCHE Orders / Communications"}</td>
                                  <td className="py-3 px-6 text-right whitespace-nowrap">
                                    <div className="inline-flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => openPdf(row.fileUrl, `APSCHE Order - ${row.year}`)}
                                        className="px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all border border-blue-100 cursor-pointer inline-flex items-center gap-1"
                                      >
                                        <Eye className="h-3 w-3" />
                                        <span>{row.year === "Previous Years" ? "View Archive" : "View PDF"}</span>
                                      </button>
                                      {row.redirectUrl && (
                                        <a
                                          href={row.redirectUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-xs transition-all border border-emerald-200 cursor-pointer inline-flex items-center gap-1"
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                          <span>Portal</span>
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* A.7 AISHE Certificates & Reports (Updated with real files) */}
                    <div
                      id="sec-aishe-reports"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <BarChart3 className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            7. AISHE Certificates &amp; Reports
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">All-India Survey on Higher Education, Ministry of Education, Govt. of India</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        St. Ann’s College for Women participates regularly in the All-India Survey on Higher Education (AISHE). The certificates, submitted survey data and institutional reports are maintained year-wise.
                      </p>

                      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                              <th className="py-3.5 px-6 w-16">S. No.</th>
                              <th className="py-3.5 px-6">Academic Year</th>
                              <th className="py-3.5 px-6">Document Particulars</th>
                              <th className="py-3.5 px-6 text-right">View PDF</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.aisheReports || []).map((row: any, idx: number) => {
                              const resolvedUrl = resolveAisheUrl(row.year, row.fileUrl);
                              return (
                                <tr key={row._key || idx} className="hover:bg-blue-50/50 transition-colors">
                                  <td className="py-3.5 px-6 font-bold text-slate-900">{row.sNo || idx + 1}</td>
                                  <td className="py-3.5 px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                                  <td className="py-3.5 px-6 font-semibold text-slate-800">{row.title || "AISHE Certificate / Report"}</td>
                                  <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                    <div className="inline-flex items-center gap-2">
                                      <button
                                        onClick={() => openPdf(resolvedUrl, `AISHE Certificate - ${row.year}`)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl font-bold text-xs transition-all border border-blue-100/70 cursor-pointer"
                                      >
                                        <Eye className="h-3.5 w-3.5" />
                                        <span>View PDF</span>
                                      </button>
                                      <a
                                        href={resolvedUrl}
                                        download
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-200 rounded-xl font-bold text-xs transition-all border border-slate-200 cursor-pointer"
                                        title="Download Certificate"
                                      >
                                        <Download className="h-3.5 w-3.5" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* A.8 NIRF Submission & Reports */}
                    <div
                      id="sec-nirf-reports"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Activity className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            8. NIRF Submission &amp; Reports
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">National Institutional Ranking Framework data submissions and rankings</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        The institution participates in the National Institutional Ranking Framework (NIRF). Relevant submissions covering College Data, Management Data and Overall Institutional data are accessible below.
                      </p>

                      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                              <th className="py-3.5 px-6">Year</th>
                              <th className="py-3.5 px-6 text-center">College Data</th>
                              <th className="py-3.5 px-6 text-center">Management Data</th>
                              <th className="py-3.5 px-6 text-center">Overall Data</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.nirfSubmissions || []).map((row: any, idx: number) => (
                              <tr key={row._key || idx} className="hover:bg-blue-50/50 transition-colors">
                                <td className="py-3.5 px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                                <td className="py-3.5 px-6 text-center whitespace-nowrap">
                                  <div className="inline-flex flex-col items-center gap-1">
                                    <button
                                      onClick={() => openPdf(row.collegeDataUrl, `NIRF ${row.year} - College Data`)}
                                      className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-xl border border-blue-100 transition-all cursor-pointer"
                                    >
                                      View College PDF
                                    </button>
                                    {row.collegeRedirectUrl && (
                                      <a
                                        href={row.collegeRedirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-md border border-emerald-200"
                                      >
                                        <ExternalLink className="h-2.5 w-2.5" /> Portal
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3.5 px-6 text-center whitespace-nowrap">
                                  <div className="inline-flex flex-col items-center gap-1">
                                    <button
                                      onClick={() => openPdf(row.managementDataUrl, `NIRF ${row.year} - Management Data`)}
                                      className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-[#002147] hover:text-white rounded-xl border border-indigo-100 transition-all cursor-pointer"
                                    >
                                      View Management PDF
                                    </button>
                                    {row.managementRedirectUrl && (
                                      <a
                                        href={row.managementRedirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-md border border-emerald-200"
                                      >
                                        <ExternalLink className="h-2.5 w-2.5" /> Portal
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3.5 px-6 text-center whitespace-nowrap">
                                  <div className="inline-flex flex-col items-center gap-1">
                                    <button
                                      onClick={() => openPdf(row.overallDataUrl, `NIRF ${row.year} - Overall Data`)}
                                      className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-[#002147] hover:text-white rounded-xl border border-emerald-100 transition-all cursor-pointer"
                                    >
                                      View Overall PDF
                                    </button>
                                    {row.overallRedirectUrl && (
                                      <a
                                        href={row.overallRedirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-md border border-emerald-200"
                                      >
                                        <ExternalLink className="h-2.5 w-2.5" /> Portal
                                      </a>
                                    )}
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

                {/* ============================================================ */}
                {/* SECTION B: Regulatory Compliance                             */}
                {/* ============================================================ */}
                <section
                  id="sec-compliance"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec2-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec2-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck2 className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec2-title, var(--level2-title, #ffffff))" }}
                      >
                        B. Regulatory Compliance
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec2-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Statutory directions, declarations, orders, and compliance monitoring across regulatory bodies.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      St. Ann’s College for Women strives to comply with the applicable rules, regulations, guidelines and directions issued by competent statutory and regulatory authorities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(data.regulatoryComplianceDocs || []).map((doc: any, idx: number) => {
                        const isBlue = idx % 2 === 1;
                        const cardId = idx === 0 ? "sec-compliance-aicte" : idx === 1 ? "sec-compliance-ugc" : idx === 2 ? "sec-compliance-apsche" : "sec-compliance-other";
                        return (
                          <div
                            key={doc._key || idx}
                            id={cardId}
                            className={`scroll-mt-52 border-2 ${isBlue ? "border-blue-200/90" : "border-slate-200/90"} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group`}
                            style={{ backgroundColor: isBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                          >
                            <div className="flex flex-col gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md w-fit">
                                {doc.code?.toUpperCase()} Compliance
                              </span>
                              <h4 className="font-outfit text-slate-900 group-hover:text-blue-700 font-extrabold text-base transition-colors leading-snug">
                                {doc.title}
                              </h4>
                              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                {doc.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => openPdf(doc.fileUrl, doc.title)}
                                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700 bg-white hover:bg-[#002147] hover:text-white border border-slate-200/80 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs w-fit"
                              >
                                <Eye className="h-4 w-4" /> View PDF
                              </button>
                              {doc.redirectUrl && (
                                <a
                                  href={doc.redirectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs w-fit"
                                >
                                  <ExternalLink className="h-4 w-4" /> Visit Portal
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION C: Right to Information (RTI)                        */}
                {/* ============================================================ */}
                <section
                  id="sec-rti"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec3-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec3-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Scale className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec3-title, var(--level2-title, #ffffff))" }}
                      >
                        C. Right to Information (RTI)
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec3-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Statutory institutional cell, public authorities, and proactive disclosures under RTI Act, 2005.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* RTI Overview */}
                    <div
                      id="sec-rti-info"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider border-b border-slate-100 pb-2">
                        1. RTI Act &amp; Institutional Particulars
                      </h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women is committed to transparency, accountability and good governance in its academic and administrative functioning. The Institution facilitates access to relevant information in accordance with the applicable provisions of the <strong>Right to Information Act, 2005</strong> and the directions of the competent authorities.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The College has designated the appropriate RTI Committee / Authorities to facilitate the handling of RTI-related matters and to ensure that requests for information are dealt with in accordance with the prescribed procedures.
                      </p>
                    </div>

                    {/* RTI Committee Table */}
                    <div
                      id="sec-rti-committee"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Users2 className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            2. RTI Committee / Designated Authorities
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Public Information Officer, Appellate Authority, and Assistant PIO particulars</p>
                        </div>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                              <th className="py-3.5 px-6 w-14">S. No.</th>
                              <th className="py-3.5 px-6">Name</th>
                              <th className="py-3.5 px-6">Designation</th>
                              <th className="py-3.5 px-6">Role in RTI Committee</th>
                              <th className="py-3.5 px-6 text-right">Mobile No</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.rtiMembers || []).map((mem: any, idx: number) => (
                              <tr key={mem._key || idx} className="hover:bg-amber-50/30 transition-colors">
                                <td className="py-3.5 px-6 font-bold text-slate-900">{mem.sNo || idx + 1}</td>
                                <td className="py-3.5 px-6 font-bold text-slate-900">{mem.name}</td>
                                <td className="py-3.5 px-6 text-slate-600">{mem.designation}</td>
                                <td className="py-3.5 px-6">
                                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-900 border border-blue-200">
                                    {mem.role}
                                  </span>
                                </td>
                                <td className="py-3.5 px-6 text-right whitespace-nowrap font-mono text-slate-900 font-bold">
                                  <a href={`tel:${mem.mobile}`} className="hover:text-blue-700 flex items-center justify-end gap-1.5 cursor-pointer">
                                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                                    {mem.mobile}
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* RTI Official Documents */}
                    <div
                      id="sec-rti-docs"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider border-b border-slate-100 pb-2">
                        3. RTI Guidelines &amp; Official Documents
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(data.rtiDocuments || []).map((doc: any, idx: number) => (
                          <div key={doc._key || idx} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                            <div>
                              <h5 className="font-outfit font-extrabold text-sm text-slate-900">
                                {doc.title}
                              </h5>
                              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                                {doc.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => openPdf(doc.fileUrl, doc.title)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all w-fit cursor-pointer shadow-2xs"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>View PDF</span>
                              </button>
                              {doc.redirectUrl && (
                                <a
                                  href={doc.redirectUrl}
                                  target={doc.redirectUrl.startsWith("http") ? "_blank" : "_self"}
                                  rel={doc.redirectUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl text-xs font-bold transition-all w-fit border border-blue-200"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                  <span>Portal Link</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION D: Student Welfare, Safety & Grievance Redressal     */}
                {/* ============================================================ */}
                <section
                  id="sec-student-welfare"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec4-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec4-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <HeartHandshake className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec4-title, var(--level2-title, #ffffff))" }}
                      >
                        D. Student Welfare, Safety &amp; Grievance Redressal
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Campus welfare cells, statutory committees, women empowerment, and anti-ragging support.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      St. Ann’s College for Women is committed to providing a safe, inclusive and supportive campus environment. The institution has established appropriate statutory committees and student-support mechanisms in accordance with applicable regulations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {((data.studentWelfareCards && data.studentWelfareCards.length > 0) ? data.studentWelfareCards : [
                        { id: "sec-welfare-antiragging", title: "Anti-Ragging Policy & Committee", href: "/student-support/anti-ragging-cell" },
                        { id: "sec-welfare-grievance", title: "Grievance Redressal Cell", href: "/student-support/grievance-redressal-cell" },
                        { id: "sec-welfare-icc", title: "Internal Complaints Committee (ICC)", href: "/student-support/internal-complaints-committee" },
                        { id: "sec-welfare-women", title: "Women Empowerment & Safety", href: "/student-support/women-empowerment-cell" },
                        { id: "sec-welfare-counseling", title: "Student Counselling & Support", href: "/student-support/counseling-centre" },
                        { id: "sec-welfare-eoc", title: "EOC / SC / ST / Minority Cell", href: "/student-support/sc-st-minority-cell" },
                      ]).map((item: any, idx: number) => {
                        const isBlue = idx % 2 === 1;
                        const targetHref = item.href || item.redirectUrl || "#";
                        const isExternal = targetHref.startsWith("http");
                        return (
                          <div
                            key={item._key || idx}
                            id={item.id}
                            className={`scroll-mt-52 border-2 ${isBlue ? "border-blue-200/90" : "border-slate-200/90"} p-5 rounded-2xl hover:shadow-md transition-all flex flex-col justify-between gap-3 group`}
                            style={{ backgroundColor: isBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shrink-0">
                                <Users2 className="h-4.5 w-4.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                                {item.title}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                              {targetHref !== "#" && (
                                <Link
                                  href={targetHref}
                                  target={isExternal ? "_blank" : undefined}
                                  rel={isExternal ? "noopener noreferrer" : undefined}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                                >
                                  <span>Access Portal</span>
                                  {isExternal ? <ExternalLink className="h-3 w-3" /> : <ChevronRight className="h-3.5 w-3.5" />}
                                </Link>
                              )}
                              {item.fileUrl && (
                                <button
                                  onClick={() => openPdf(item.fileUrl, item.title)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#002147] hover:bg-blue-900 text-white rounded-lg text-[11px] font-bold transition-all ml-auto cursor-pointer"
                                >
                                  <Eye className="h-3 w-3" />
                                  <span>PDF</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION E: Financial Transparency                            */}
                {/* ============================================================ */}
                <section
                  id="sec-financial"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec1-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec1-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Coins className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        E. Financial Transparency
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Budgets, audited statements, income sources, fee regulations, and scholarship details.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      The institution is committed to maintaining financial accountability, proper financial management and transparency in accordance with applicable rules and institutional procedures.
                    </p>

                    <div className="flex flex-col gap-6">
                      {(data.financialDocuments || []).map((doc: any, idx: number) => {
                        const sNo = doc.sNo || idx + 1;
                        return (
                          <div
                            key={doc._key || idx}
                            id={`sec-financial-${doc.code || idx}`}
                            className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                            style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                          >
                            <h4 className="font-outfit font-extrabold text-sm md:text-base text-slate-900">
                              {sNo}. {doc.title}
                            </h4>
                            {doc.description && (
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {doc.description}
                              </p>
                            )}
                            <div className="flex flex-col gap-1.5 pt-1">
                              <span className="text-xs font-black text-red-600 uppercase tracking-wider">PDF View:</span>
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => openPdf(doc.fileUrl, doc.title)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                                >
                                  <FileText className="h-3.5 w-3.5 text-emerald-600" />
                                  <span className="underline">{doc.btnLabel || doc.title} – View PDF</span>
                                </button>
                                {doc.secondFileUrl && (
                                  <button
                                    onClick={() => openPdf(doc.secondFileUrl, doc.secondBtnLabel || doc.title)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                                  >
                                    <FileText className="h-3.5 w-3.5 text-emerald-600" />
                                    <span className="underline">{doc.secondBtnLabel || "Additional Document"} – View PDF</span>
                                  </button>
                                )}
                                {doc.redirectUrl && (
                                  <a
                                    href={doc.redirectUrl}
                                    target={doc.redirectUrl.startsWith("http") ? "_blank" : "_self"}
                                    rel={doc.redirectUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    <span className="underline">Portal Link</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION F: Governance & Institutional Policies               */}
                {/* ============================================================ */}
                <section
                  id="sec-governance"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec2-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec2-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Landmark className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec2-title, var(--level2-title, #ffffff))" }}
                      >
                        F. Governance &amp; Institutional Policies
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec2-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Organisational structure, handbooks, service rules, code of conduct, and academic regulations.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      The institution follows a structured governance framework to ensure effective academic, administrative and institutional functioning.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {((data.governanceCards && data.governanceCards.length > 0) ? data.governanceCards : [
                        { id: "sec-gov-structure", title: "Governance Structure & Organogram", href: "/about/governance-administration" },
                        { id: "sec-gov-policies", title: "Institutional Policies Compendium", href: "/about/policies" },
                        { id: "sec-gov-code", title: "Code of Conduct & Ethics", href: "/about/code-of-conduct" },
                        { id: "sec-gov-admin", title: "Administrative & Service Policies", href: "/about/service-rules" },
                        { id: "sec-gov-academic", title: "Academic Policies & Regulations", href: "/academics/academic-regulations" },
                        { id: "sec-gov-charter", title: "Student Charter & Conduct Policies", href: "/student-support/student-charter" },
                      ]).map((item: any, idx: number) => {
                        const isBlue = idx % 2 === 1;
                        const targetHref = item.href || item.redirectUrl || "#";
                        const isExternal = targetHref.startsWith("http");
                        return (
                          <div
                            key={item._key || idx}
                            id={item.id}
                            className={`scroll-mt-52 border-2 ${isBlue ? "border-blue-200/90" : "border-slate-200/90"} p-5 rounded-2xl hover:shadow-md transition-all flex flex-col justify-between gap-3 group`}
                            style={{ backgroundColor: isBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shrink-0">
                                <BookOpen className="h-4.5 w-4.5" />
                              </span>
                              <h5 className="font-outfit font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                                {item.title}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                              {targetHref !== "#" && (
                                <Link
                                  href={targetHref}
                                  target={isExternal ? "_blank" : undefined}
                                  rel={isExternal ? "noopener noreferrer" : undefined}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                                >
                                  <span>View Details</span>
                                  {isExternal ? <ExternalLink className="h-3 w-3" /> : <ChevronRight className="h-3.5 w-3.5" />}
                                </Link>
                              )}
                              {item.fileUrl && (
                                <button
                                  onClick={() => openPdf(item.fileUrl, item.title)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#002147] hover:bg-blue-900 text-white rounded-lg text-[11px] font-bold transition-all ml-auto cursor-pointer"
                                >
                                  <Eye className="h-3 w-3" />
                                  <span>PDF</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION G: Institutional Reports & Data                      */}
                {/* ============================================================ */}
                <section
                  id="sec-reports"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec3-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec3-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec3-title, var(--level2-title, #ffffff))" }}
                      >
                        G. Institutional Reports &amp; Data
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec3-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Year-wise Annual Reports, institutional data, statistics, and statutory submissions.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* Annual Reports Table */}
                    <div
                      id="sec-reports-annual"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider border-b border-slate-100 pb-2">
                        1. Year-wise Annual Reports
                      </h4>
                      <div className="overflow-x-auto rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold">
                              <th className="py-3.5 px-6">Academic Year</th>
                              <th className="py-3.5 px-6">Report Title</th>
                              <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.annualReports || []).map((row: any, idx: number) => (
                              <tr key={row._key || idx} className="hover:bg-blue-50/50 transition-colors">
                                <td className="py-3.5 px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                                <td className="py-3.5 px-6">{row.title || `Annual Report ${row.year}`}</td>
                                <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center gap-2 justify-end">
                                    <button
                                      onClick={() => openPdf(row.fileUrl, `Annual Report - ${row.year}`)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-xl font-bold text-xs transition-all border border-blue-100/70 cursor-pointer"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>View PDF</span>
                                    </button>
                                    {row.redirectUrl && (
                                      <a
                                        href={row.redirectUrl}
                                        target={row.redirectUrl.startsWith("http") ? "_blank" : "_self"}
                                        rel={row.redirectUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-bold text-xs transition-all border border-blue-200"
                                      >
                                        <ExternalLink className="h-3 w-3" />
                                        <span>Link</span>
                                      </a>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Data & Statistics Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {((data.dataStatsCards && data.dataStatsCards.length > 0) ? data.dataStatsCards : [
                        { id: "sec-reports-stats", title: "2. Institutional Data & Statistics", description: "Access student intake, departmental statistics, faculty distributions, and academic metrics.", href: "/placements", linkText: "Explore Institutional Data & Statistics" },
                        { id: "sec-reports-statutory", title: "3. Other Statutory Reports", description: "Periodic reviews and institutional returns submitted to competent statutory authorities.", fileUrl: "/documents/DefaultFile_1.pdf", linkText: "View Consolidated Statutory Reports (PDF)" },
                      ]).map((statCard: any, idx: number) => {
                        const isAlt = idx % 2 === 0;
                        const cardHref = statCard.href || statCard.redirectUrl;
                        return (
                          <div
                            key={statCard._key || idx}
                            id={statCard.id}
                            className={`scroll-mt-52 border-2 ${isAlt ? "border-blue-200/90" : "border-slate-200/90"} rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4`}
                            style={{ backgroundColor: isAlt ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                          >
                            <div>
                              <h4 className={`font-outfit font-extrabold text-base uppercase tracking-wider ${isAlt ? "text-blue-700" : "text-blue-600"}`}>
                                {statCard.title}
                              </h4>
                              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                {statCard.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              {cardHref && (
                                <Link
                                  href={cardHref}
                                  target={cardHref.startsWith("http") ? "_blank" : undefined}
                                  rel={cardHref.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <span>{statCard.linkText || "Explore Details"}</span>
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              )}
                              {statCard.fileUrl && (
                                <button
                                  onClick={() => openPdf(statCard.fileUrl, statCard.title)}
                                  className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 w-fit cursor-pointer"
                                >
                                  <span>{statCard.linkText || "View Document (PDF)"}</span>
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION H: Disclosure Archives                               */}
                {/* ============================================================ */}
                <section
                  id="sec-archives"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                  style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
                >
                  <div
                    className="text-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--sec4-bg, var(--level2-bg, #002147))",
                      borderColor: "var(--sec4-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Archive className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec4-title, var(--level2-title, #ffffff))" }}
                      >
                        H. Disclosure Archives
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Multi-year historical repository of previous disclosures, approvals, and annual compliance files.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      The institution maintains an archive of previous disclosures and important institutional documents to promote transparency, continuity and easy reference.
                    </p>

                    <div
                      id="sec-archives-matrix"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-xs bg-white"
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#002147] text-white font-outfit uppercase tracking-wider text-xs font-extrabold border-b border-[#001733]">
                              <th className="py-3.5 px-6">Academic Year</th>
                              <th className="py-3.5 px-6 text-center">Mandatory Disclosures</th>
                              <th className="py-3.5 px-6 text-center">Compliance Documents</th>
                              <th className="py-3.5 px-6 text-center">Annual Report</th>
                              <th className="py-3.5 px-6 text-center">Statutory Reports</th>
                              <th className="py-3.5 px-6 text-center">Policies</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {(data.disclosureArchives || []).map((row: any, idx: number) => (
                              <tr key={row._key || idx} className="hover:bg-slate-50 transition-colors">
                                <td className="py-3.5 px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                                <td className="py-3.5 px-6 text-center">
                                  <button
                                    onClick={() => openPdf(row.mandatoryDisclosuresUrl, `Archive ${row.year} - Mandatory Disclosures`)}
                                    className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all border border-blue-100 cursor-pointer"
                                  >
                                    View PDF
                                  </button>
                                </td>
                                <td className="py-3.5 px-6 text-center">
                                  <button
                                    onClick={() => openPdf(row.complianceDocumentsUrl, `Archive ${row.year} - Compliance`)}
                                    className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all border border-blue-100 cursor-pointer"
                                  >
                                    View PDF
                                  </button>
                                </td>
                                <td className="py-3.5 px-6 text-center">
                                  <button
                                    onClick={() => openPdf(row.annualReportUrl, `Archive ${row.year} - Annual Report`)}
                                    className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all border border-blue-100 cursor-pointer"
                                  >
                                    View PDF
                                  </button>
                                </td>
                                <td className="py-3.5 px-6 text-center">
                                  <button
                                    onClick={() => openPdf(row.statutoryReportsUrl, `Archive ${row.year} - Statutory Reports`)}
                                    className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all border border-blue-100 cursor-pointer"
                                  >
                                    View PDF
                                  </button>
                                </td>
                                <td className="py-3.5 px-6 text-center">
                                  <button
                                    onClick={() => openPdf(row.policiesUrl, `Archive ${row.year} - Policies`)}
                                    className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all border border-blue-100 cursor-pointer"
                                  >
                                    View PDF
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Periodic Verification Box */}
                    <div
                      id="sec-archives-verification"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex flex-col gap-1.5">
                        <h5 className="font-outfit font-black text-sm uppercase tracking-wider text-slate-900">
                          Document Update &amp; Verification Status
                        </h5>
                        <p className="text-slate-600 text-xs max-w-xl leading-relaxed">
                          The Mandatory Disclosures section is reviewed and updated periodically to ensure that the information provided through the official website remains accurate, current and aligned with applicable statutory, regulatory and institutional requirements.
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 text-xs border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 shrink-0 font-medium">
                        <div>Last Updated: <strong className="text-slate-900">{data.lastUpdated || "15 September 2026"}</strong></div>
                        <div>Verified By: <strong className="text-slate-900">{data.verifiedBy || "Principal / IQAC Coordinator"}</strong></div>
                        <div className="text-slate-500 text-[11px] mt-0.5">St. Ann’s College for Women, Gorantla, Guntur</div>
                      </div>
                    </div>

                  </div>
                </section>

              </div>
            </main>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* All ANU Affiliation Orders & Archive Modal Popup             */}
      {/* ============================================================ */}
      {isAnuModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs select-none animate-fadeIn"
          onClick={() => setIsAnuModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-5 sm:px-8 flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-amber-300 shadow-xs shrink-0">
                  <Building className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-outfit font-black text-lg sm:text-xl text-white tracking-tight">
                      ANU Affiliation Orders &amp; Archives
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-2xs">
                      {rawAnu.length} Total Orders
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Complete multi-year archive of Undergraduate (UG) and Postgraduate (PG) affiliation orders.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAnuModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Programme Category Switch */}
              <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 text-xs font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => setAnuModalFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    anuModalFilter === "all" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Orders ({rawAnu.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAnuModalFilter("ug")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    anuModalFilter === "ug" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Undergraduate ({ugAnu.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAnuModalFilter("pg")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    anuModalFilter === "pg" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Postgraduate ({pgAnu.length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search by academic year..."
                  value={anuSearchQuery}
                  onChange={(e) => setAnuSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
                {anuSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setAnuSearchQuery("")}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 shrink-0 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Modal Scrollable Content: All ANU PDFs */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[58vh] bg-slate-50/50">
              {allModalAnu.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-semibold text-sm">
                  No affiliation orders found matching &ldquo;{anuSearchQuery}&rdquo;
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allModalAnu.map((item: any, idx: number) => {
                    const isUG = item.programmeType?.toLowerCase() === "ug";
                    const resolvedUrl = resolveAnuUrl(item.programmeType || "ug", item.year, item.fileUrl);
                    const isRecent = idx < 3;

                    return (
                      <div
                        key={item._key || idx}
                        className="rounded-2xl p-5 border-2 bg-white border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-700 font-bold group-hover:bg-[#002147] group-hover:text-white transition-colors">
                            <GraduationCap className="h-5 w-5" />
                          </span>
                          <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                isUG ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                              }`}>
                                {isUG ? "UG Programme" : "PG Programme"}
                              </span>
                              {isRecent ? (
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                  Recent Active Order
                                </span>
                              ) : (
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                  Archive Order
                                </span>
                              )}
                            </div>
                            <h4 className="font-outfit text-slate-900 group-hover:text-blue-700 font-extrabold text-base transition-colors leading-snug">
                              {item.year} - {item.title || `${isUG ? "UG" : "PG"} Affiliation Order`}
                            </h4>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                              Acharya Nagarjuna University Order
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => openPdf(resolvedUrl, `${isUG ? "UG" : "PG"} Affiliation Order - ${item.year}`)}
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white border border-blue-100/80 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                          >
                            <Eye className="h-3.5 w-3.5" /> View PDF
                          </button>
                          <a
                            href={resolvedUrl}
                            download
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                          >
                            <Download className="h-3.5 w-3.5" /> Download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>St. Ann’s College for Women • ANU Affiliation Registry</span>
              <button
                onClick={() => setIsAnuModalOpen(false)}
                className="px-4 py-1.5 bg-[#002147] text-white rounded-lg font-bold text-xs hover:bg-[#003366] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Flipbook Viewer Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={!!previewPdf}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
          onClose={() => setPreviewPdf(null)}
        />
      )}
    </div>
  );
}
