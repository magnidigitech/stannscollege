"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Download, Eye, X, BookOpen, AlertCircle, CheckCircle, GraduationCap, Scale, Users, Users2, FileSpreadsheet, Phone } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { SubtextBox } from "@/components/ui/Heading1Notch";

interface DisclosureItem {
  id: string;
  title: string;
  category: "aicte" | "ugc" | "anu" | "committees" | "policies";
  year: string;
  description: string;
  fileUrl?: string;
}

interface RtiMember {
  sNo: number;
  name: string;
  designation: string;
  role: string;
  mobile: string;
}

interface RtiDocument {
  id: string;
  title: string;
  tag: string;
  badge: string;
  description: string;
  fileUrl: string;
}

export default function MandatoryDisclosuresPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Disclosures", icon: BookOpen },
    { id: "aicte", name: "AICTE Approvals", icon: ShieldCheck },
    { id: "ugc", name: "UGC Status", icon: Scale },
    { id: "anu", name: "ANU Affiliations", icon: GraduationCap },
    { id: "committees", name: "Statutory Committees", icon: Users2 },
    { id: "policies", name: "Compliance Policies", icon: FileText },
    { id: "rti", name: "Right to Information (RTI)", icon: BookOpen }
  ];

  const rtiCommittee: RtiMember[] = [
    {
      sNo: 1,
      name: "Dr. Sr. Fatima Rani P",
      designation: "Correspondent",
      role: "Chairperson / First Appellate Authority",
      mobile: "8978012987"
    },
    {
      sNo: 2,
      name: "Sr. Sandhya Thumma",
      designation: "Principal",
      role: "Member",
      mobile: "9347238194"
    },
    {
      sNo: 3,
      name: "Mr. G. Bala Show Reddy",
      designation: "Physical Director",
      role: "Nodal Officer / Public Information Officer (PIO)",
      mobile: "9959085038"
    },
    {
      sNo: 4,
      name: "Mrs. R. Sharon Rose",
      designation: "Vice Principal & IQAC Coordinator",
      role: "Member",
      mobile: "9948686170"
    },
    {
      sNo: 5,
      name: "Sr. Margaret Priyanka",
      designation: "Administrator",
      role: "Member / Asst. Public Information Officer (PIO)",
      mobile: "7981468359"
    }
  ];

  const rtiDocuments: RtiDocument[] = [
    {
      id: "rti-act-2005",
      title: "Official Gazette / Government Notification – Right to Information Act, 2005",
      tag: "STATUTORY ACT",
      badge: "ACT NO. 22 OF 2005",
      description: "The complete Right to Information Act, 2005 enacted by the Parliament of India, setting out the practical regime of right to information for citizens to secure access to information under the control of public authorities.",
      fileUrl: "https://cdn.sanity.io/files/fhjwqub5/production/32a3d5b540315384535c90682d86a0b23c71d808.pdf"
    },
    {
      id: "rti-office-order",
      title: "RTI Committee / Authority Constitution Order",
      tag: "INSTITUTIONAL ORDER",
      badge: "OFFICE ORDER",
      description: "Official administrative office order of St. Ann's College for Women designating the First Appellate Authority, Public Information Officer (PIO), and Assistant PIO to ensure adherence to statutory disclosure standards.",
      fileUrl: "https://cdn.sanity.io/files/fhjwqub5/production/cd25e5f7d45a56b103d932b451c31b914238be8b.pdf"
    }
  ];

  const disclosures: DisclosureItem[] = [
    {
      id: "aicte-26-27",
      title: "AICTE Extension of Approval (EoA) 2026-2027",
      category: "aicte",
      year: "2026-27",
      description: "Official Extension of Approval issued by the All India Council for Technical Education for MBA, MCA, and BCA programs.",
      fileUrl: "/documents/AICTE_EoA_2026_27.pdf"
    },
    {
      id: "aicte-25-26",
      title: "AICTE Extension of Approval (EoA) 2025-2026",
      category: "aicte",
      year: "2025-26",
      description: "Extension of Approval for postgraduate and professional undergraduate programs for the academic year 2025-26.",
      fileUrl: "/documents/AICTE_EoA_2025_26.pdf"
    },
    {
      id: "ugc-2f-status",
      title: "UGC 2(f) and 12(B) Recognition Status",
      category: "ugc",
      year: "Permanent",
      description: "Official registration certificate under Section 2(f) & 12(B) of the UGC Act, 1956, declaring eligibility for central assistance.",
      fileUrl: "/documents/UGC_2f_Certificate.pdf"
    },
    {
      id: "anu-affiliation-26",
      title: "ANU Temporary Affiliation Orders 2025-2026",
      category: "anu",
      year: "2025-26",
      description: "Acharya Nagarjuna University affiliation orders for both Undergraduate and Postgraduate course blocks.",
      fileUrl: "/documents/ANU_Affiliation_2025_26.pdf"
    },
    {
      id: "governing-body-roster",
      title: "Governing Body Members & Constitution",
      category: "committees",
      year: "2026-27",
      description: "Full roster and management profile of the Society of St. Anne's Governing Body of the College.",
      fileUrl: "/documents/Governing_Body_2026.pdf"
    },
    {
      id: "anti-ragging-charter",
      title: "Anti-Ragging Committee & Standard Operating Procedures",
      category: "committees",
      year: "2026-27",
      description: "Affidavit formats, SOPs, and committee contact structure for standard prevention of ragging on campus.",
      fileUrl: "/documents/Anti_Ragging_SOP.pdf"
    },
    {
      id: "icc-committee-compliance",
      title: "Internal Complaints Committee (ICC) Constitution",
      category: "committees",
      year: "2026-27",
      description: "Compliance document details for prevention, prohibition, and redressal of sexual harassment of women employees and students.",
      fileUrl: "/documents/ICC_Compliance_2026.pdf"
    },
    {
      id: "code-of-conduct-handbook",
      title: "Code of Conduct & Ethics Handbook",
      category: "policies",
      year: "2026-27",
      description: "Rules of academic integrity, core professional values, punctuality, and responsibilities for students, teachers, and staff.",
      fileUrl: "/documents/Code_of_Conduct_Handbook.pdf"
    },
    {
      id: "institutional-policies-compendium",
      title: "Compendium of Institutional Policies",
      category: "policies",
      year: "2026-27",
      description: "Consolidated policies on environmental sustainability, green campus initiatives, IT asset governance, and research development.",
      fileUrl: "/documents/Institutional_Policies_2026.pdf"
    }
  ];

  const categoryDetails: Record<string, {
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = {
    all: {
      title: "Statutory Compliance & Mandatory Disclosures",
      subtitle: `All official governance charters, statutory committee rosters, and regulatory approval certificates on public record (${disclosures.length})`,
      icon: BookOpen
    },
    aicte: {
      title: "AICTE Approvals & Extension of Approval (EoA)",
      subtitle: "Official regulatory approvals and Extension of Approval orders from the All India Council for Technical Education",
      icon: ShieldCheck
    },
    ugc: {
      title: "UGC Recognition & Section 2(f) Status",
      subtitle: "Permanent recognition under Section 2(f) & 12(B) of the UGC Act, 1956, Government of India",
      icon: Scale
    },
    anu: {
      title: "ANU Affiliations & University Sanctions",
      subtitle: "Official university affiliation orders and sanctions from Acharya Nagarjuna University (ANU)",
      icon: GraduationCap
    },
    committees: {
      title: "Statutory Committees & Compliance Charters",
      subtitle: "Mandatory institutional committee constitutions, Anti-Ragging SOPs, and Internal Complaints Committee (ICC) rosters",
      icon: Users2
    },
    policies: {
      title: "Institutional Compliance & Governance Policies",
      subtitle: "Statutory policies, Code of Conduct handbooks, green campus charters, and ethical governance standards",
      icon: FileText
    },
    rti: {
      title: "Right to Information (RTI)",
      subtitle: "Statutory compliance framework, designated appellate authorities, public information officers, and official documentation under the RTI Act, 2005",
      icon: Scale
    }
  };

  const subCategories = [
    { id: "aicte", name: "AICTE Approvals", icon: ShieldCheck, count: disclosures.filter(d => d.category === "aicte").length },
    { id: "ugc", name: "UGC Status", icon: Scale, count: disclosures.filter(d => d.category === "ugc").length },
    { id: "anu", name: "ANU Affiliations", icon: GraduationCap, count: disclosures.filter(d => d.category === "anu").length },
    { id: "committees", name: "Statutory Committees", icon: Users2, count: disclosures.filter(d => d.category === "committees").length },
    { id: "policies", name: "Compliance Policies", icon: FileText, count: disclosures.filter(d => d.category === "policies").length },
    { id: "rti", name: "Right to Information (RTI)", icon: Scale, count: rtiDocuments.length }
  ];

  const filteredDisclosures = selectedCategory === "all"
    ? disclosures
    : disclosures.filter(item => item.category === selectedCategory);

  const activeCategoryInfo = categoryDetails[selectedCategory] || categoryDetails.all;
  const ActiveIcon = activeCategoryInfo.icon;

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      {/* 2. Main Content Container (Sidebar on Left, Data Elements on Right) */}
      <div className="max-w-[1600px] mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">

          {/* Left: Category Tabs Sidebar with Heading Banner and Hierarchical Sub-elements */}
          <aside className="lg:col-span-3">
            <div
              className="sticky select-none h-fit overflow-y-auto no-scrollbar border-2 border-slate-200/90 p-4 sm:p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-6"
              style={{
                top: "calc(var(--main-header-height, 185px) + 16px)",
                maxHeight: "calc(100vh - var(--main-header-height, 185px) - 32px)",
                backgroundColor: "var(--sidebar-container-bg, #eaeff5)",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              }}
            >
              {/* Sidebar Heading Banner */}
              <div
                className="text-white px-4 py-3.5 rounded-2xl flex items-center gap-3.5 shadow-sm border transition-colors duration-200 shrink-0"
                style={{
                  background: "var(--sidebar-bg, #1e40af)",
                  borderColor: "var(--sidebar-border, rgba(30, 64, 175, 0.3))",
                  color: "var(--sidebar-text, #ffffff)"
                }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white shrink-0 backdrop-blur-xs shadow-inner">
                  <BookOpen className="h-4.5 w-4.5" />
                </span>
                <div className="flex flex-col min-w-0">
                  <h1
                    className="font-outfit text-sm sm:text-base font-black uppercase tracking-wider truncate leading-tight"
                    style={{ color: "var(--sidebar-text, #ffffff)" }}
                  >
                    Mandatory Disclosures
                  </h1>
                  <span
                    className="text-[10px] sm:text-[11px] opacity-85 font-medium truncate mt-0.5"
                    style={{ color: "var(--sidebar-text, #ffffff)" }}
                  >
                    Statutory Compliance Directory
                  </span>
                </div>
              </div>

              {/* Navigation Hierarchy: All Disclosures at top, remaining as sub-elements */}
              <nav className="flex flex-col gap-3">
                {/* Parent Root Item: ALL DISCLOSURES */}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`group w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl font-sans text-xs sm:text-sm transition-all duration-200 select-none ${
                    selectedCategory === "all"
                      ? "font-bold shadow-xs"
                      : "text-slate-700 hover:text-blue-800 hover:bg-white/80 hover:translate-x-1.5 font-semibold"
                  }`}
                  style={
                    selectedCategory === "all"
                      ? {
                          background: "var(--sidebar-bg, #1e40af)",
                          borderColor: "var(--sidebar-border, #1e40af)",
                          color: "var(--sidebar-text, #ffffff)",
                          boxShadow: "0 2px 8px -1px rgba(30, 64, 175, 0.25)"
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <BookOpen className={`h-4 w-4 shrink-0 ${selectedCategory === "all" ? "text-white" : "text-blue-600"}`} />
                    <span className="truncate uppercase font-bold tracking-wider text-xs">All Disclosures</span>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                      selectedCategory === "all"
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-700"
                    }`}
                  >
                    {disclosures.length}
                  </span>
                </button>

                {/* Sub-elements Container */}
                <div className="flex flex-col gap-1.5 pl-3 border-l-2 border-slate-300/60 ml-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1 pb-1">
                    Statutory Categories
                  </span>

                  {subCategories.map((sub) => {
                    const isSubActive = selectedCategory === sub.id;
                    const SubIcon = sub.icon;

                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedCategory(sub.id)}
                        className={`group w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl font-sans text-xs transition-all duration-200 select-none ${
                          isSubActive
                            ? "font-bold shadow-xs"
                            : "text-slate-700 hover:text-blue-800 hover:bg-white/80 hover:translate-x-1.5 font-semibold"
                        }`}
                        style={
                          isSubActive
                            ? {
                                background: "var(--sidebar-bg, #1e40af)",
                                borderColor: "var(--sidebar-border, #1e40af)",
                                color: "var(--sidebar-text, #ffffff)",
                                boxShadow: "0 2px 8px -1px rgba(30, 64, 175, 0.25)"
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2 truncate">
                          <SubIcon className={`h-3.5 w-3.5 shrink-0 ${isSubActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"}`} />
                          <span className="truncate">{sub.name}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md shrink-0 ${
                            isSubActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-200/70 text-slate-600"
                          }`}
                        >
                          {sub.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Public Record Alert Card */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-amber-900 shadow-2xs">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold mb-0.5 text-amber-950">Public Record</h5>
                  <p className="font-medium text-amber-800/90 text-[11px]">
                    These documents are updated immediately upon renewal or periodic statutory review by regulatory bodies.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Data Elements Section with Strategic Plans Level 2 Banner */}
          <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
            {/* Sub-text Box */}
            <SubtextBox>
              In absolute compliance with the statutory regulations of AICTE, UGC, and Acharya Nagarjuna University, St. Ann&apos;s College for Women makes all essential governance charters, committee rosters, and approval certificates accessible below.
            </SubtextBox>

            {/* Section 1: Statutory Compliance & Mandatory Disclosures (visible for all or statutory filters) */}
            {selectedCategory !== "rti" && (
              <section
                className="border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
              >
                {/* Heading Level 2 Banner (matching Strategic Plans style) */}
                <div
                  className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--sec-disclosures-bg, var(--level2-bg, #002147))",
                    borderColor: "var(--sec-disclosures-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ActiveIcon className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec-disclosures-title, var(--level2-title, #ffffff))" }}
                      >
                        {activeCategoryInfo.title}
                      </h2>
                    </div>
                    <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-wide bg-white/15 text-white border border-white/20">
                      {filteredDisclosures.length} Document{filteredDisclosures.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                    style={{ color: "var(--sec-disclosures-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                  >
                    {activeCategoryInfo.subtitle}
                  </p>
                </div>

                {/* Document Cards with Alternating Colors (Pure White & Soft Ice Blue) */}
                <div className="p-6 sm:p-8 md:p-10 space-y-6 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDisclosures.map((item, index) => {
                      // Alternating 2-column checkerboard colors: 0=White, 1=IceBlue, 2=IceBlue, 3=White
                      const isEvenRow = Math.floor(index / 2) % 2 === 0;
                      const isEvenCol = index % 2 === 0;
                      const isIceBlue = isEvenRow ? !isEvenCol : isEvenCol;

                      return (
                        <div
                          key={item.id}
                          className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                            isIceBlue
                              ? "border-2 border-blue-200/90 hover:border-blue-300"
                              : "border-2 border-slate-200/90 hover:border-indigo-200"
                          }`}
                          style={{ backgroundColor: isIceBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-700 border border-blue-100">
                                {item.category}
                              </span>
                              <span className="text-[10px] font-bold text-slate-500">
                                AY {item.year}
                              </span>
                            </div>
                            <h4
                              className={`font-outfit text-base sm:text-lg font-black leading-snug transition-colors ${
                                isIceBlue ? "text-blue-900" : "text-slate-900"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2.5">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 mt-6 border-t border-slate-200/60 pt-4">
                            <button
                              onClick={() => setSelectedPdf(item.fileUrl || "/documents/placeholder.pdf")}
                              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white transition-all active:scale-95 shadow-xs select-none"
                            >
                              <Eye className="h-4 w-4" /> View PDF
                            </button>
                            <a
                              href={item.fileUrl || "#"}
                              download
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-700 transition-all active:scale-95 select-none shadow-2xs"
                              title="Download Document"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Section 2: Right to Information (RTI) Section (Under All Disclosures or when RTI is selected) */}
            {(selectedCategory === "all" || selectedCategory === "rti") && (
              <section
                id="rti"
                className="border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
                style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
              >
                {/* Heading Level 2 Banner */}
                <div
                  className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--sec-rti-bg, var(--level2-bg, #002147))",
                    borderColor: "var(--sec-rti-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Scale className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec-rti-title, var(--level2-title, #ffffff))" }}
                      >
                        Right to Information (RTI)
                      </h2>
                    </div>
                    <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-wide bg-white/15 text-white border border-white/20">
                      {rtiDocuments.length} Official Documents
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                    style={{ color: "var(--sec-rti-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                  >
                    Statutory compliance framework, designated appellate authorities, public information officers, and official documentation under the RTI Act, 2005
                  </p>
                </div>

                <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                  {/* Institutional Commitment Card */}
                  <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-1">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-outfit text-base sm:text-lg font-black text-slate-900">
                          Institutional Commitment &amp; Statutory Governance
                        </h3>
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                          St. Ann’s College for Women is committed to transparency, accountability and good governance in its academic and administrative functioning. The Institution facilitates access to relevant information in accordance with the applicable provisions of the Right to Information Act, 2005 and the directions of the competent authorities.
                        </p>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                          The College has constituted/designated the appropriate RTI Committee/Authorities to facilitate the handling of RTI-related matters and to ensure that requests for information are dealt with in accordance with the prescribed procedures.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RTI Committee / Authorities Table Card */}
                  <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100/70 text-blue-800 shrink-0">
                          <Users className="h-4 w-4" />
                        </span>
                        <div>
                          <h3 className="font-outfit text-base sm:text-lg font-black text-slate-900">
                            RTI Committee / Authorities
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Designated authorities for processing information requests and statutory appeals under the RTI Act, 2005
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-center px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {rtiCommittee.length} Designated Members
                      </span>
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                      <table className="w-full text-left border-collapse min-w-[620px]">
                        <thead>
                          <tr className="bg-slate-100/80 text-slate-700 text-xs font-black uppercase tracking-wider border-b border-slate-200">
                            <th className="py-3.5 px-4 text-center w-16">S. No.</th>
                            <th className="py-3.5 px-4">Name</th>
                            <th className="py-3.5 px-4">Designation</th>
                            <th className="py-3.5 px-4">Role in RTI Committee</th>
                            <th className="py-3.5 px-4 text-right">Mobile No</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                          {rtiCommittee.map((member) => (
                            <tr key={member.sNo} className="hover:bg-blue-50/40 transition-colors">
                              <td className="py-3.5 px-4 text-center font-bold text-slate-500">
                                {member.sNo}
                              </td>
                              <td className="py-3.5 px-4 font-bold text-slate-900">
                                {member.name}
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-700">
                                {member.designation}
                              </td>
                              <td className="py-3.5 px-4 font-semibold">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                  member.role.includes("First Appellate")
                                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                                    : member.role.includes("PIO") || member.role.includes("Nodal Officer")
                                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                }`}>
                                  {member.role}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right font-medium">
                                <a
                                  href={`tel:${member.mobile}`}
                                  className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 hover:underline bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200/70 transition-colors select-none"
                                >
                                  <Phone className="h-3.5 w-3.5" />
                                  {member.mobile}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RTI Information & Official Documents */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100/70 text-blue-800 shrink-0">
                        <FileSpreadsheet className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-outfit text-base sm:text-lg font-black text-slate-900">
                          RTI Information &amp; Official Documents
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          The following official documents are made available for reference and download:
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rtiDocuments.map((doc, idx) => {
                        const isIceBlue = idx % 2 === 1;

                        return (
                          <div
                            key={doc.id}
                            className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                              isIceBlue
                                ? "bg-[#e8f1fd] border-2 border-blue-200/90 hover:border-blue-300"
                                : "bg-white border-2 border-slate-200/90 hover:border-indigo-200"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-700 border border-blue-100">
                                  {doc.tag}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">
                                  {doc.badge}
                                </span>
                              </div>
                              <h4
                                className={`font-outfit text-base sm:text-lg font-black leading-snug transition-colors ${
                                  isIceBlue ? "text-blue-900" : "text-slate-900"
                                }`}
                              >
                                {doc.title}
                              </h4>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2.5">
                                {doc.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 mt-6 border-t border-slate-200/60 pt-4">
                              <button
                                onClick={() => setSelectedPdf(doc.fileUrl)}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white transition-all active:scale-95 shadow-xs select-none"
                              >
                                <Eye className="h-4 w-4" /> View PDF
                              </button>
                              <a
                                href={doc.fileUrl}
                                download
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-700 transition-all active:scale-95 select-none shadow-2xs"
                                title="Download Document"
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Compliance Contact Board */}
            <div className="bg-white border-2 border-slate-200/90 p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <h4 className="font-outfit text-lg font-black text-slate-800 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-indigo-600" /> Compliance Enquiries & Public Grievances
                </h4>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                  For formal inquiries concerning our AICTE status, institutional policies, or general regulatory compliance, please reach out directly to our statutory compliance office.
                </p>
              </div>
              <a
                href="mailto:principal@stannscollege.com"
                className="shrink-0 rounded-full bg-[#002147] hover:bg-[#003875] px-6 py-3 font-bold text-white text-xs tracking-wider uppercase hover:shadow-xl hover:shadow-[#002147]/20 transition-all duration-300"
              >
                Email Officer
              </a>
            </div>
          </main>

        </div>
      </div>

      {/* PDF Modal Viewer */}
      <FilePreviewModal
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
        fileUrl={selectedPdf || ""}
        title="Statutory Document Preview"
      />
    </div>
  );
}
