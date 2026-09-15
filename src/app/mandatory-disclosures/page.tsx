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
  AlertCircle
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { getMandatoryDisclosures, DEFAULT_MANDATORY_DISCLOSURES } from "@/lib/sanity";

// Sidebar categories matching Mandatory Disclosures Content list.pdf (A to H)
const MANDATORY_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "statutory",
    title: "A. Statutory & Regulatory",
    sectionId: "sec-statutory",
    items: [
      { text: "Mandatory Disclosure", slug: "sec-mandatory-disclosure", id: "sec-mandatory-disclosure" },
      { text: "Institutional Profile & Programme Details", slug: "sec-institutional-profile", id: "sec-institutional-profile" },
      { text: "ANU Affiliation Orders – UG & PG", slug: "sec-anu-affiliations", id: "sec-anu-affiliations" },
      { text: "AICTE Approval / EoA Documents", slug: "sec-aicte-approval", id: "sec-aicte-approval" },
      { text: "UGC Section 2(f) Recognition", slug: "sec-ugc-recognition", id: "sec-ugc-recognition" },
      { text: "CCE & APSCHE Orders", slug: "sec-apsche-orders", id: "sec-apsche-orders" },
      { text: "AISHE Certificates & Reports", slug: "sec-aishe-reports", id: "sec-aishe-reports" },
      { text: "NIRF Submission & Reports", slug: "sec-nirf-reports", id: "sec-nirf-reports" },
    ]
  },
  {
    catSlug: "compliance",
    title: "B. Regulatory Compliance",
    sectionId: "sec-compliance",
    items: [
      { text: "AICTE Compliance", slug: "sec-compliance", id: "sec-compliance" },
      { text: "UGC Compliance", slug: "sec-compliance", id: "sec-compliance" },
      { text: "APSCHE Compliance", slug: "sec-compliance", id: "sec-compliance" },
      { text: "Other Statutory Compliance", slug: "sec-compliance", id: "sec-compliance" },
    ]
  },
  {
    catSlug: "rti",
    title: "C. Right to Information (RTI)",
    sectionId: "sec-rti",
    items: [
      { text: "RTI Act & Institutional Information", slug: "sec-rti", id: "sec-rti" },
      { text: "RTI Committee / Authorities", slug: "sec-rti", id: "sec-rti" },
      { text: "RTI Gazette & Constitution Orders", slug: "sec-rti", id: "sec-rti" },
    ]
  },
  {
    catSlug: "student-welfare",
    title: "D. Student Welfare & Grievance",
    sectionId: "sec-student-welfare",
    items: [
      { text: "Anti-Ragging Policy & Committee", slug: "sec-student-welfare", id: "sec-student-welfare" },
      { text: "Grievance Redressal Cell", slug: "sec-student-welfare", id: "sec-student-welfare" },
      { text: "Internal Complaints Committee (ICC)", slug: "sec-student-welfare", id: "sec-student-welfare" },
      { text: "Women Empowerment & Safety", slug: "sec-student-welfare", id: "sec-student-welfare" },
      { text: "SC/ST & Equal Opportunity Cell", slug: "sec-student-welfare", id: "sec-student-welfare" },
      { text: "Student Counselling & Support", slug: "sec-student-welfare", id: "sec-student-welfare" },
    ]
  },
  {
    catSlug: "financial",
    title: "E. Financial Transparency",
    sectionId: "sec-financial",
    items: [
      { text: "Annual Budget", slug: "sec-financial", id: "sec-financial" },
      { text: "Audited Financial Statements", slug: "sec-financial", id: "sec-financial" },
      { text: "Sources of Income & Corpus Funds", slug: "sec-financial", id: "sec-financial" },
      { text: "Utilization Certificates", slug: "sec-financial", id: "sec-financial" },
      { text: "Finance & Procurement Policies", slug: "sec-financial", id: "sec-financial" },
      { text: "Approved Fee Structure & AFRC", slug: "sec-financial", id: "sec-financial" },
      { text: "Scholarship Details", slug: "sec-financial", id: "sec-financial" },
    ]
  },
  {
    catSlug: "governance",
    title: "F. Governance & Policies",
    sectionId: "sec-governance",
    items: [
      { text: "Governance Structure", slug: "sec-governance", id: "sec-governance" },
      { text: "Institutional Policies", slug: "sec-governance", id: "sec-governance" },
      { text: "Code of Conduct", slug: "sec-governance", id: "sec-governance" },
      { text: "Administrative & Service Policies", slug: "sec-governance", id: "sec-governance" },
      { text: "Academic Policies", slug: "sec-governance", id: "sec-governance" },
      { text: "Student Policies", slug: "sec-governance", id: "sec-governance" },
    ]
  },
  {
    catSlug: "reports",
    title: "G. Institutional Reports & Data",
    sectionId: "sec-reports",
    items: [
      { text: "Annual Reports", slug: "sec-reports", id: "sec-reports" },
      { text: "Institutional Data & Statistics", slug: "sec-reports", id: "sec-reports" },
      { text: "Other Statutory Reports", slug: "sec-reports", id: "sec-reports" },
    ]
  },
  {
    catSlug: "archives",
    title: "H. Disclosure Archives",
    sectionId: "sec-archives",
    items: [
      { text: "Previous Mandatory Disclosures", slug: "sec-archives", id: "sec-archives" },
      { text: "Previous Compliance Documents", slug: "sec-archives", id: "sec-archives" },
      { text: "Previous Annual Reports", slug: "sec-archives", id: "sec-archives" },
      { text: "Previous Statutory Reports", slug: "sec-archives", id: "sec-archives" },
      { text: "Archived Policies & Historical Disclosures", slug: "sec-archives", id: "sec-archives" },
    ]
  }
];

export default function MandatoryDisclosuresPage() {
  const [data, setData] = useState<any>(DEFAULT_MANDATORY_DISCLOSURES);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-statutory");
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);
  const [anuTab, setAnuTab] = useState<"ug" | "pg">("ug");

  useEffect(() => {
    getMandatoryDisclosures()
      .then((res) => {
        if (res) setData(res);
      })
      .catch((err) => console.error("Error loading mandatory disclosures:", err));
  }, []);

  const openPdf = (url?: string, title?: string) => {
    const targetUrl = url && url.trim() !== "" ? url : "/documents/DefaultFile_1.pdf";
    setPreviewPdf({
      url: targetUrl,
      title: title || "Mandatory Disclosure Document"
    });
  };

  const ugAnu = (data.anuAffiliations || []).filter((item: any) => item.programmeType?.toLowerCase() === "ug");
  const pgAnu = (data.anuAffiliations || []).filter((item: any) => item.programmeType?.toLowerCase() === "pg");

  return (
    <div className="flex flex-col font-sans select-none animate-fadeIn w-full min-h-screen bg-slate-50/50">
      {/* Top Banner / Header Notch */}
      <div className="bg-[#001738] text-white py-12 px-4 sm:px-6 lg:px-12 border-b border-blue-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest w-fit">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              Official Institutional Disclosures
            </div>
            <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Mandatory Disclosures & Compliance
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Statutory regulatory declarations, institutional accreditations, government orders, financial audits, RTI transparency, and compliance documentation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-xs text-slate-200 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <span>Last Updated: <strong className="text-white">{data.lastUpdated || "15 September 2026"}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container (Sidebar on Left, Sections on Right) */}
      <div className="max-w-[1600px] mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
          
          {/* Left: Navigation Sidebar */}
          <aside className="lg:col-span-3">
            <AboutSidebar
              categories={MANDATORY_SIDEBAR_CATEGORIES}
              bannerTitle="MANDATORY DISCLOSURES"
              bannerSubtitle="Statutory & Compliance Directory"
              activeId={activeSectionId}
              onItemClick={(id) => setActiveSectionId(id)}
            />
          </aside>

          {/* Right: Data Sections */}
          <main className="lg:col-span-9 flex flex-col gap-10">

            {/* Sub-text Box (Institutional Commitment) */}
            <SubtextBox variant="tricolor" icon="ashoka-chakra">
              <div className="space-y-3 font-medium text-slate-800 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>St. Ann’s College for Women, Gorantla, Guntur</strong>, is committed to maintaining transparency, accountability, good governance and compliance with applicable statutory and regulatory requirements. The institution provides relevant information relating to its academic programmes, statutory approvals, affiliations, regulatory compliance, student welfare, financial management, governance and institutional functioning through its official website.
                </p>
                <p className="text-slate-700 text-xs sm:text-sm italic">
                  This section provides access to important institutional documents and information for the benefit of students, parents, faculty, stakeholders, regulatory authorities and the general public.
                </p>
              </div>
            </SubtextBox>

            {/* ============================================================ */}
            {/* SECTION A: Statutory & Regulatory Information                */}
            {/* ============================================================ */}
            <section id="sec-statutory" className="scroll-mt-40 flex flex-col gap-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#002147] text-white font-black text-sm">
                  A
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Statutory & Regulatory Information
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Core institutional affiliations, approvals, survey reports, and official particulars
                  </p>
                </div>
              </div>

              {/* A.1 Mandatory Disclosure */}
              <div id="sec-mandatory-disclosure" className="scroll-mt-48 flex flex-col gap-4 bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
                      1. Statutory Particulars
                    </span>
                    <h3 className="font-outfit text-lg font-extrabold text-slate-900 mt-1">
                      Mandatory Disclosure
                    </h3>
                  </div>
                  <button
                    onClick={() => openPdf("/documents/DefaultFile_1.pdf", "Official Mandatory Disclosure")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                  >
                    <Eye className="h-4 w-4" />
                    View Prescribed PDF
                  </button>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  The institution publishes the prescribed Mandatory Disclosure containing essential information relating to the institution, management, academic programmes, approved intake, faculty, infrastructure, facilities and other relevant institutional particulars.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                  {[
                    "Mandatory Disclosure Document",
                    "Institutional Profile",
                    "Programme Details & Curricula",
                    "Approved Intake / Sanctioned Strength",
                    "Faculty & Infrastructure Details",
                    "Campus Facilities & Governance"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* A.2 Institutional Profile & Programme Details */}
              <div id="sec-institutional-profile" className="scroll-mt-48 flex flex-col gap-3 bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/70">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md w-fit">
                  2. Academic Scope
                </span>
                <h3 className="font-outfit text-lg font-extrabold text-slate-900">
                  Institutional Profile & Programme Details
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  This section provides comprehensive information about the institution and its academic programmes, including programme names, duration, eligibility, sanctioned intake and other relevant academic particulars.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-[#002147] text-slate-800 rounded-xl text-xs font-bold transition-all"
                  >
                    <span>View All Academic Programmes</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </Link>
                  <button
                    onClick={() => openPdf("/documents/DefaultFile_1.pdf", "Programme Details & Sanctioned Intake")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:border-[#002147] text-slate-800 rounded-xl text-xs font-bold transition-all"
                  >
                    <Eye className="h-3.5 w-3.5 text-blue-700" />
                    <span>Sanctioned Strength Order (PDF)</span>
                  </button>
                </div>
              </div>

              {/* A.3 ANU Affiliation Orders - UG & PG */}
              <div id="sec-anu-affiliations" className="scroll-mt-48 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                      3. University Orders
                    </span>
                    <h3 className="font-outfit text-lg font-extrabold text-[#002147]">
                      ANU Affiliation Orders – UG & PG
                    </h3>
                  </div>
                  {/* UG / PG Tabs */}
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => setAnuTab("ug")}
                      className={`px-3.5 py-1.5 rounded-lg transition-all ${
                        anuTab === "ug" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Undergraduate (UG)
                    </button>
                    <button
                      onClick={() => setAnuTab("pg")}
                      className={`px-3.5 py-1.5 rounded-lg transition-all ${
                        anuTab === "pg" ? "bg-[#002147] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Postgraduate (PG)
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  The institution is affiliated to Acharya Nagarjuna University. Relevant affiliation orders and documents relating to Undergraduate and Postgraduate programmes are provided here for reference.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(anuTab === "ug" ? ugAnu : pgAnu).map((item: any, idx: number) => (
                    <div
                      key={item._key || idx}
                      className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-800 font-bold text-xs shrink-0">
                          <GraduationCap className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-extrabold text-xs text-slate-900">{item.year}</p>
                          <p className="text-[11px] text-slate-500 truncate">{item.title || `${anuTab.toUpperCase()} Affiliation Order`}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => openPdf(item.fileUrl, `${anuTab.toUpperCase()} Affiliation Order - ${item.year}`)}
                        className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-700 hover:text-white rounded-lg transition-all shrink-0 ml-2"
                      >
                        View PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* A.4 AICTE Approval / EoA Documents Table */}
              <div id="sec-aicte-approval" className="scroll-mt-48 flex flex-col gap-3">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                    4. Technical Education Approval
                  </span>
                  <h3 className="font-outfit text-lg font-extrabold text-[#002147]">
                    AICTE Approval / Extension of Approval (EoA) Documents
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  St. Ann’s College for Women, Gorantla, Guntur, maintains the applicable AICTE Approval / Extension of Approval (EoA) documents relating to its approved programmes. The relevant documents are provided year-wise for transparency, institutional reference and regulatory compliance.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                        <th className="py-3 px-4 sm:px-6">Academic Year</th>
                        <th className="py-3 px-4 sm:px-6">Document Name</th>
                        <th className="py-3 px-4 sm:px-6 text-right">View Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(data.aicteApprovals || []).map((row: any, idx: number) => (
                        <tr key={row._key || idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-4 sm:px-6">{row.title || "AICTE Approval / EoA"}</td>
                          <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => openPdf(row.fileUrl, `AICTE Approval - ${row.year}`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>{row.year === "Previous Years" ? "View Archive" : "View PDF"}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* A.5 UGC Section 2(f) Recognition */}
              <div id="sec-ugc-recognition" className="scroll-mt-48 flex flex-col gap-3">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                    5. UGC Act 1956
                  </span>
                  <h3 className="font-outfit text-lg font-extrabold text-[#002147]">
                    UGC Section 2(f) Recognition
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  St. Ann’s College for Women, Gorantla, Guntur, is recognised under Section 2(f) of the University Grants Commission (UGC) Act, 1956, as applicable. The relevant UGC recognition document is made available below for public reference and institutional verification.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                        <th className="py-3 px-4 sm:px-6 w-20">Sl. No.</th>
                        <th className="py-3 px-4 sm:px-6">Document</th>
                        <th className="py-3 px-4 sm:px-6 text-right">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(data.ugcDocuments || []).map((row: any, idx: number) => (
                        <tr key={row._key || idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{row.sNo || idx + 1}</td>
                          <td className="py-3 px-4 sm:px-6 font-semibold text-slate-800">{row.title || "UGC Section 2(f) Recognition Order"}</td>
                          <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => openPdf(row.fileUrl, row.title || "UGC Recognition Document")}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* A.6 Commissionerate of Collegiate Education (CCE) & APSCHE Orders */}
              <div id="sec-apsche-orders" className="scroll-mt-48 flex flex-col gap-4">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                    6. State Council & Collegiate Education
                  </span>
                  <h3 className="font-outfit text-lg font-extrabold text-[#002147]">
                    Commissionerate of Collegiate Education (CCE) & APSCHE Orders and Communications
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  St. Ann’s College for Women, Gorantla, Guntur, maintains relevant orders, proceedings, communications, guidelines, notifications and other official documents issued by the Commissionerate of Collegiate Education (CCE), Government of Andhra Pradesh, and the Andhra Pradesh State Council of Higher Education (APSCHE), as applicable to the institution.
                </p>

                {/* Sub-table A: Commissionerate of Higher Education (CHE) */}
                <div className="flex flex-col gap-2 pt-2">
                  <h4 className="font-outfit text-xs font-black uppercase tracking-wider text-slate-800">
                    A. Commissionerate of Higher Education (CHE / CCE)
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 font-extrabold text-[11px] border-b border-slate-200">
                          <th className="py-2.5 px-4 sm:px-6">Academic Year</th>
                          <th className="py-2.5 px-4 sm:px-6">Document / Communication</th>
                          <th className="py-2.5 px-4 sm:px-6 text-right">View</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {(data.cceOrders || []).map((row: any, idx: number) => (
                          <tr key={row._key || idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-4 sm:px-6 font-bold text-slate-900">{row.year}</td>
                            <td className="py-2.5 px-4 sm:px-6">{row.title || "CCE Orders / Proceedings / Communications"}</td>
                            <td className="py-2.5 px-4 sm:px-6 text-right">
                              <button
                                onClick={() => openPdf(row.fileUrl, `CCE Communication - ${row.year}`)}
                                className="px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all"
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

                {/* Sub-table B: APSCHE Orders & Communications */}
                <div className="flex flex-col gap-2 pt-3">
                  <h4 className="font-outfit text-xs font-black uppercase tracking-wider text-slate-800">
                    B. APSCHE Orders & Communications
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-800 font-extrabold text-[11px] border-b border-slate-200">
                          <th className="py-2.5 px-4 sm:px-6">Academic Year</th>
                          <th className="py-2.5 px-4 sm:px-6">Document / Communication</th>
                          <th className="py-2.5 px-4 sm:px-6 text-right">View</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {(data.apscheOrders || []).map((row: any, idx: number) => (
                          <tr key={row._key || idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-4 sm:px-6 font-bold text-slate-900">{row.year}</td>
                            <td className="py-2.5 px-4 sm:px-6">{row.title || "APSCHE Orders / Communications"}</td>
                            <td className="py-2.5 px-4 sm:px-6 text-right">
                              <button
                                onClick={() => openPdf(row.fileUrl, `APSCHE Order - ${row.year}`)}
                                className="px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all"
                              >
                                {row.year === "Previous Years" ? "View Archive" : "View PDF"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* A.7 AISHE Certificates & Reports */}
              <div id="sec-aishe-reports" className="scroll-mt-48 flex flex-col gap-3">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                    7. National Higher Education Survey
                  </span>
                  <h3 className="font-outfit text-lg font-extrabold text-[#002147]">
                    AISHE Certificates & Reports
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  St. Ann’s College for Women participates in the All-India Survey on Higher Education (AISHE) conducted by the Ministry of Education, Government of India. The AISHE Certificates, submitted data, reports and related documents are maintained year-wise and made available below for transparency and reference.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                        <th className="py-3 px-4 sm:px-6 w-16">S. No.</th>
                        <th className="py-3 px-4 sm:px-6">Academic Year</th>
                        <th className="py-3 px-4 sm:px-6">Document</th>
                        <th className="py-3 px-4 sm:px-6 text-right">View PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(data.aisheReports || []).map((row: any, idx: number) => (
                        <tr key={row._key || idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{row.sNo || idx + 1}</td>
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-4 sm:px-6">{row.title || "AISHE Certificate / Report"}</td>
                          <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => openPdf(row.fileUrl, `AISHE Certificate - ${row.year}`)}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* A.8 NIRF Submission & Reports */}
              <div id="sec-nirf-reports" className="scroll-mt-48 flex flex-col gap-3">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
                    8. National Institutional Ranking
                  </span>
                  <h3 className="font-outfit text-lg font-extrabold text-[#002147]">
                    NIRF Submission & Reports
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  The institution participates in the National Institutional Ranking Framework (NIRF), wherever applicable. Relevant NIRF submissions and institutional data are maintained and made available for reference.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                        <th className="py-3 px-4 sm:px-6">Year</th>
                        <th className="py-3 px-4 sm:px-6 text-center">Document 1</th>
                        <th className="py-3 px-4 sm:px-6 text-center">Document 2</th>
                        <th className="py-3 px-4 sm:px-6 text-center">Document 3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(data.nirfSubmissions || []).map((row: any, idx: number) => (
                        <tr key={row._key || idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                              onClick={() => openPdf(row.collegeDataUrl, `NIRF ${row.year} - College Data`)}
                              className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all"
                            >
                              College Data - View PDF
                            </button>
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                              onClick={() => openPdf(row.managementDataUrl, `NIRF ${row.year} - Management Data`)}
                              className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all"
                            >
                              Management Data - View PDF
                            </button>
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                              onClick={() => openPdf(row.overallDataUrl, `NIRF ${row.year} - Overall Data`)}
                              className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-[#002147] hover:text-white rounded-lg transition-all"
                            >
                              Overall Data - View PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </section>

            {/* ============================================================ */}
            {/* SECTION B: Regulatory Compliance                             */}
            {/* ============================================================ */}
            <section id="sec-compliance" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-700 text-white font-black text-sm">
                  B
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Regulatory Compliance
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Statutory directions, declarations, orders, and compliance monitoring
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm">
                St. Ann’s College for Women strives to comply with the applicable rules, regulations, guidelines and directions issued by competent statutory and regulatory authorities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.regulatoryComplianceDocs || []).map((doc: any, idx: number) => (
                  <div key={doc._key || idx} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded w-fit">
                        {doc.code?.toUpperCase()} Compliance
                      </span>
                      <h3 className="font-outfit font-extrabold text-sm text-slate-900">
                        {doc.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                    <button
                      onClick={() => openPdf(doc.fileUrl, doc.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all w-fit mt-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION C: Right to Information (RTI)                        */}
            {/* ============================================================ */}
            <section id="sec-rti" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-600 text-white font-black text-sm">
                  C
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Right to Information (RTI)
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Public information, appellate authorities, and statutory governance particulars
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  St. Ann’s College for Women is committed to transparency, accountability and good governance in its academic and administrative functioning. The Institution facilitates access to relevant information in accordance with the applicable provisions of the <strong>Right to Information Act, 2005</strong> and the directions of the competent authorities.
                </p>
                <p>
                  The College has constituted/designated the appropriate RTI Committee/Authorities to facilitate the handling of RTI-related matters and to ensure that requests for information are dealt with in accordance with the prescribed procedures.
                </p>
              </div>

              {/* RTI Committee Table */}
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="font-outfit text-sm font-black uppercase tracking-wider text-slate-800">
                  RTI Committee / Designated Authorities
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                        <th className="py-3 px-4 sm:px-6 w-14">S. No.</th>
                        <th className="py-3 px-4 sm:px-6">Name</th>
                        <th className="py-3 px-4 sm:px-6">Designation</th>
                        <th className="py-3 px-4 sm:px-6">Role in RTI Committee</th>
                        <th className="py-3 px-4 sm:px-6 text-right">Mobile No</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(data.rtiMembers || []).map((mem: any, idx: number) => (
                        <tr key={mem._key || idx} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{mem.sNo || idx + 1}</td>
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{mem.name}</td>
                          <td className="py-3 px-4 sm:px-6 text-slate-600">{mem.designation}</td>
                          <td className="py-3 px-4 sm:px-6">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-900 border border-blue-200">
                              {mem.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap font-mono text-slate-900 font-bold">
                            <a href={`tel:${mem.mobile}`} className="hover:text-blue-700 flex items-center justify-end gap-1">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {mem.mobile}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RTI Information & Official Documents */}
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="font-outfit text-sm font-black uppercase tracking-wider text-slate-800">
                  RTI Information & Official Documents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(data.rtiDocuments || []).map((doc: any, idx: number) => (
                    <div key={doc._key || idx} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="font-outfit font-extrabold text-sm text-slate-900">
                          {doc.title}
                        </h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                      <button
                        onClick={() => openPdf(doc.fileUrl, doc.title)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all w-fit mt-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION D: Student Welfare, Safety & Grievance Redressal     */}
            {/* ============================================================ */}
            <section id="sec-student-welfare" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white font-black text-sm">
                  D
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Student Welfare, Safety & Grievance Redressal
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Campus committees, anti-ragging policies, POSH/ICC, and grievance support
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  St. Ann’s College for Women is committed to providing a safe, inclusive and supportive campus environment. The institution has established appropriate statutory committees and student-support mechanisms in accordance with applicable regulations and institutional requirements.
                </p>
                <p className="text-slate-500 text-xs italic">
                  Detailed information regarding student welfare services, committees, activities and support mechanisms is available under the Student Support Services section of the college website.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                {[
                  { title: "Anti-Ragging Policy & Committee", href: "/student-support/anti-ragging-cell" },
                  { title: "Grievance Redressal Cell", href: "/student-support/grievance-redressal-cell" },
                  { title: "Internal Complaints Committee (ICC)", href: "/student-support/internal-complaints-committee" },
                  { title: "Women Empowerment & Campus Safety", href: "/student-support/women-empowerment-cell" },
                  { title: "Student Counselling & Support", href: "/student-support/counseling-centre" },
                  { title: "EOC / SC / ST / Minority Cell", href: "/student-support/sc-st-minority-cell" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group bg-slate-50/80 hover:bg-blue-50/70 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-800 text-xs font-bold shrink-0">
                        <Users2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-extrabold text-xs text-slate-800 group-hover:text-blue-900 transition-colors truncate">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-1 rounded-lg border border-slate-200 group-hover:bg-[#002147] group-hover:text-white transition-all shrink-0">
                      View Details →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION E: Financial Transparency                            */}
            {/* ============================================================ */}
            <section id="sec-financial" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-700 text-white font-black text-sm">
                  E
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Financial Transparency
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Budgets, audited balance sheets, utilization certificates, fee structures, and scholarship data
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm">
                The institution is committed to maintaining financial accountability, proper financial management and transparency in accordance with applicable rules and institutional procedures.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(data.financialDocuments || []).map((doc: any, idx: number) => (
                  <div key={doc._key || idx} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3 shadow-2xs">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded w-fit">
                        {doc.code?.replace("_", " ").toUpperCase()}
                      </span>
                      <h3 className="font-outfit font-extrabold text-sm text-slate-900">
                        {doc.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {doc.description}
                      </p>
                    </div>
                    <button
                      onClick={() => openPdf(doc.fileUrl, doc.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all w-fit mt-1 shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION F: Governance & Institutional Policies               */}
            {/* ============================================================ */}
            <section id="sec-governance" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-white font-black text-sm">
                  F
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Governance & Institutional Policies
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Organisational structure, handbooks, service rules, code of conduct, and academic regulations
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  The institution follows a structured governance framework to ensure effective academic, administrative and institutional functioning. It maintains relevant policies, codes, guidelines and procedures covering academic, administrative, quality assurance, student welfare and institutional development.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {[
                  { title: "Governance Structure", href: "/about/governance-administration" },
                  { title: "Institutional Policies Compendium", href: "/about/policies" },
                  { title: "Code of Conduct & Ethics", href: "/about/code-of-conduct" },
                  { title: "Administrative & Service Policies", href: "/about/service-rules" },
                  { title: "Academic Policies & Regulations", href: "/academics/academic-regulations" },
                  { title: "Student Charter & Conduct Policies", href: "/student-support/student-charter" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group bg-slate-50/80 hover:bg-slate-100 p-4 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 text-slate-800 text-xs font-bold shrink-0">
                        <Landmark className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-extrabold text-xs text-slate-800 group-hover:text-blue-900 transition-colors truncate">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-1 rounded-lg border border-slate-200 group-hover:bg-[#002147] group-hover:text-white transition-all shrink-0">
                      View Details →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION G: Institutional Reports & Data                      */}
            {/* ============================================================ */}
            <section id="sec-reports" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-700 text-white font-black text-sm">
                  G
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Institutional Reports & Data
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Year-wise Annual Reports, institutional data, statistics, and statutory submissions
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm">
                The institution publishes Annual Reports highlighting significant academic, administrative, co-curricular, extension, student development and institutional activities during the respective academic year.
              </p>

              {/* Annual Reports Table */}
              <div className="flex flex-col gap-2">
                <h3 className="font-outfit text-sm font-black uppercase tracking-wider text-slate-800">
                  Year-wise Annual Reports
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                        <th className="py-3 px-4 sm:px-6">Academic Year</th>
                        <th className="py-3 px-4 sm:px-6">Report Title</th>
                        <th className="py-3 px-4 sm:px-6 text-right">View PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {(data.annualReports || []).map((row: any, idx: number) => (
                        <tr key={row._key || idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                          <td className="py-3 px-4 sm:px-6">{row.title || `Annual Report ${row.year}`}</td>
                          <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => openPdf(row.fileUrl, `Annual Report - ${row.year}`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 hover:bg-[#002147] hover:text-white rounded-lg font-bold text-xs transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Data & Statistics Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="font-outfit font-extrabold text-sm text-slate-900">Institutional Data & Statistics</h4>
                    <p className="text-slate-600 text-xs mt-1">Access latest student intake, departmental statistics, faculty distributions, and academic metrics.</p>
                  </div>
                  <Link href="/placements" className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                    <span>Explore Institutional Data & Statistics</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="font-outfit font-extrabold text-sm text-slate-900">Other Statutory Reports</h4>
                    <p className="text-slate-600 text-xs mt-1">Periodic reviews and institutional returns submitted to competent statutory authorities.</p>
                  </div>
                  <button onClick={() => openPdf("/documents/DefaultFile_1.pdf", "Other Statutory Submissions Report")} className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 w-fit">
                    <span>View Consolidated Statutory Reports (PDF)</span>
                    <Eye className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION H: Disclosure Archives                               */}
            {/* ============================================================ */}
            <section id="sec-archives" className="scroll-mt-40 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-700 text-white font-black text-sm">
                  H
                </span>
                <div>
                  <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#002147] uppercase tracking-wide">
                    Disclosure Archives
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold">
                    Comprehensive multi-year historical archive of disclosures, reports, and compliance records
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm">
                The institution maintains an archive of previous disclosures and important institutional documents to promote transparency, continuity and easy reference.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#002147] text-white font-extrabold tracking-wider uppercase text-[11px]">
                      <th className="py-3 px-4 sm:px-6">Academic Year</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Mandatory Disclosures</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Compliance Documents</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Annual Report</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Statutory Reports</th>
                      <th className="py-3 px-4 sm:px-6 text-center">Policies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {(data.disclosureArchives || []).map((row: any, idx: number) => (
                      <tr key={row._key || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">{row.year}</td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                          <button
                            onClick={() => openPdf(row.mandatoryDisclosuresUrl, `Archive ${row.year} - Mandatory Disclosures`)}
                            className="px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded transition-all"
                          >
                            View PDF
                          </button>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                          <button
                            onClick={() => openPdf(row.complianceDocumentsUrl, `Archive ${row.year} - Compliance`)}
                            className="px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded transition-all"
                          >
                            View PDF
                          </button>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                          <button
                            onClick={() => openPdf(row.annualReportUrl, `Archive ${row.year} - Annual Report`)}
                            className="px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded transition-all"
                          >
                            View PDF
                          </button>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                          <button
                            onClick={() => openPdf(row.statutoryReportsUrl, `Archive ${row.year} - Statutory Reports`)}
                            className="px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded transition-all"
                          >
                            View PDF
                          </button>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                          <button
                            onClick={() => openPdf(row.policiesUrl, `Archive ${row.year} - Policies`)}
                            className="px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-[#002147] hover:text-white rounded transition-all"
                          >
                            View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Document Update & Verification Footer Card */}
            <div className="bg-slate-100/90 rounded-3xl p-6 sm:p-8 border border-slate-200 text-xs text-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <h4 className="font-outfit font-black text-sm uppercase tracking-wider text-slate-900">
                  Document Update & Verification
                </h4>
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

          </main>
        </div>
      </div>

      {/* PDF Viewer Modal */}
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
