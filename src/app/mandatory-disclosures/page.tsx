"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Download, Eye, X, BookOpen, AlertCircle, CheckCircle, GraduationCap, Scale, Users, Users2, FileSpreadsheet } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

interface DisclosureItem {
  id: string;
  title: string;
  category: "aicte" | "ugc" | "anu" | "committees" | "policies";
  year: string;
  description: string;
  fileUrl?: string;
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
    { id: "policies", name: "Compliance Policies", icon: FileText }
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

  const filteredDisclosures = selectedCategory === "all"
    ? disclosures
    : disclosures.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/70 py-5 px-4 sm:px-6 lg:px-12 sticky top-0 z-30 backdrop-blur-md bg-white/95 transition-all shadow-xs w-full">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-[#002147]/65 font-sans">
              <Link href="/" className="hover:text-[#002147] hover:underline transition-all">Home</Link>
              <span className="text-slate-350">/</span>
              <span className="text-[#002147]">Mandatory Disclosures & Compliance</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#002147]">
            <div className="flex items-center gap-1.5 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
              Statutory Compliance Active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto py-10 px-4 sm:px-6 lg:px-12 w-full">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-[#002147] via-[#022f63] to-[#043c7d] text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl flex flex-col gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase w-fit">
              <Scale className="h-3.5 w-3.5 text-indigo-300" /> Academic Governance
            </span>
            <h1 className="font-outfit text-3xl md:text-5xl font-black tracking-tight leading-none">
              Mandatory Disclosures & Statutory Compliance
            </h1>
            <p className="text-blue-100/90 text-sm md:text-base leading-relaxed font-medium">
              In absolute compliance with the statutory regulations of AICTE, UGC, and Acharya Nagarjuna University, St. Ann&apos;s College for Women makes all essential governance charters, committee rosters, and approval certificates accessible below.
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Category Tabs Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28 bg-white border border-slate-200/70 p-6 rounded-[2rem] shadow-sm flex flex-col gap-6">
              <div className="border-b border-slate-100 pb-3 mb-1 select-none">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#002147]/60">Document Hub</span>
                <h4 className="font-outfit text-lg font-black text-[#002147] mt-0.5">Filter by Category</h4>
              </div>
              
              <nav className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                      selectedCategory === cat.id
                        ? "bg-[#002147] text-white border-transparent shadow-md translate-x-1"
                        : "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-[#002147] border-transparent hover:border-slate-100"
                    }`}
                  >
                    <cat.icon className="h-4 w-4 shrink-0" />
                    <span>{cat.name}</span>
                  </button>
                ))}
              </nav>

              <div className="bg-amber-50/60 border border-amber-100/80 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold mb-0.5">Public Record</h5>
                  <p className="font-medium text-amber-700/90">These documents are updated immediately upon renewal or periodic statutory review by regulatory bodies.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* List of Documents */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-[2rem] shadow-sm">
              <h3 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <span>Documents List ({filteredDisclosures.length})</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Society of St. Anne</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDisclosures.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100/80 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 border border-indigo-100/50">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          AY {item.year}
                        </span>
                      </div>
                      <h4 className="font-outfit text-base font-black text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 border-t border-slate-100/80 pt-4">
                      <button
                        onClick={() => setSelectedPdf(item.fileUrl || "/documents/placeholder.pdf")}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-100/40 hover:border-indigo-200/50 px-4 py-2.5 text-xs font-bold text-indigo-700 transition-all active:scale-95 select-none"
                      >
                        <Eye className="h-4 w-4" /> View PDF
                      </button>
                      <a
                        href={item.fileUrl || "#"}
                        download
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all active:scale-95 select-none"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Contact Board */}
            <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
