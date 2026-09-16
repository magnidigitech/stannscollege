"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FlaskConical,
  BookOpen,
  Award,
  Sparkles,
  FileText,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  Building2,
  Library,
  Cpu,
  Microscope,
  Briefcase,
  Users,
  Compass,
  ArrowRight,
  Eye,
  ChevronRight,
  TrendingUp,
  Target,
  Rocket,
  Scale,
  GraduationCap,
  Layers,
  Search,
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getResearchData, DEFAULT_RESEARCH_DATA } from "@/lib/sanity";

// Sidebar categories matching 9.Research & Innovation.docx (1 to 8)
const RESEARCH_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "sec-policy",
    title: "1. Research Promotion, Ethics & Funding Policy",
    sectionId: "sec-policy",
    items: [
      { text: "Policy Objectives & Principles", id: "sec-policy-principles" },
      { text: "Ethics & Integrity Framework", id: "sec-policy-ethics" },
      { text: "Seed Grants & Funding Policy (PDF)", id: "sec-policy-doc" },
    ],
  },
  {
    catSlug: "sec-rdc",
    title: "2. Research & Development Cell (RDC)",
    sectionId: "sec-rdc",
    items: [
      { text: "About RDC & Overview", id: "sec-rdc-about" },
      { text: "Vision & Mission", id: "sec-rdc-vision" },
      { text: "Core Objectives", id: "sec-rdc-objectives" },
      { text: "Major Initiatives", id: "sec-rdc-initiatives" },
      { text: "RDC Annual Activity Reports", id: "sec-rdc-reports" },
    ],
  },
  {
    catSlug: "sec-infra",
    title: "3. Research Infrastructure",
    sectionId: "sec-infra",
    items: [
      { text: "Dedicated Research Labs", id: "sec-infra-labs" },
      { text: "Advanced Analytical Equipment", id: "sec-infra-equipment" },
      { text: "Library & E-Resources Gateway", id: "sec-infra-library" },
      { text: "High-Performance ICT & Computing", id: "sec-infra-ict" },
    ],
  },
  {
    catSlug: "sec-publications",
    title: "4. Research Publications & Scholarly Contributions",
    sectionId: "sec-publications",
    items: [
      { text: "Faculty & Students Publications", id: "sec-pub-faculty-students" },
      { text: "Paper Presentations in Conferences", id: "sec-pub-presentations" },
      { text: "Journals, Books & Book Chapters", id: "sec-pub-books" },
    ],
  },
  {
    catSlug: "sec-patents",
    title: "5. Patents / Start-ups / Innovations",
    sectionId: "sec-patents",
    items: [
      { text: "Innovation Initiatives", id: "sec-patents-initiatives" },
      { text: "Year-wise Innovation & IPR Activities", id: "sec-patents-years" },
    ],
  },
  {
    catSlug: "sec-ipr",
    title: "6. Intellectual Property Rights (IPR) Cell",
    sectionId: "sec-ipr",
    items: [
      { text: "About IPR Cell (Est. 01-09-2022)", id: "sec-ipr-about" },
      { text: "IPR Objectives & Activities", id: "sec-ipr-objectives" },
      { text: "Expected Outcomes & Impact", id: "sec-ipr-outcomes" },
      { text: "IPR Annual Reports", id: "sec-ipr-reports" },
    ],
  },
  {
    catSlug: "sec-edc",
    title: "7. ED / Innovation & Start-Up Centre",
    sectionId: "sec-edc",
    items: [
      { text: "Vision & Objectives", id: "sec-edc-vision" },
      { text: "Key Activities & Mentorship", id: "sec-edc-activities" },
      { text: "Women Entrepreneurship Cell", id: "sec-edc-women" },
      { text: "ED Annual Reports", id: "sec-edc-reports" },
    ],
  },
  {
    catSlug: "sec-iic",
    title: "8. Institution Innovation Council (IIC)",
    sectionId: "sec-iic",
    items: [
      { text: "About IIC & Industry Cell", id: "sec-iic-about" },
      { text: "Objectives & Key Activities", id: "sec-iic-objectives" },
      { text: "IIC Annual Reports", id: "sec-iic-reports" },
    ],
  },
];

export default function ResearchInnovationPage() {
  const [data, setData] = useState<any>(DEFAULT_RESEARCH_DATA);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-policy");
  const [previewPdf, setPreviewPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const liveData = await getResearchData();
        if (liveData) {
          setData(liveData);
        }
      } catch (err) {
        console.error("Error loading research data from Sanity:", err);
      }
    }
    loadData();
  }, []);

  const openPdfModal = (url: string, title: string) => {
    setPreviewPdf({
      url: url || "/documents/DefaultFile_1.pdf",
      title: title || "Document Viewer",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      {/* File Preview Modal */}
      {previewPdf && (
        <FilePreviewModal
          isOpen={!!previewPdf}
          onClose={() => setPreviewPdf(null)}
          fileUrl={previewPdf.url}
          title={previewPdf.title}
        />
      )}

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Sidebar (Col 3) */}
          <div className="lg:col-span-3">
            <AboutSidebar
              categories={RESEARCH_SIDEBAR_CATEGORIES}
              bannerTitle="RESEARCH & INNOVATION"
              bannerSubtitle="Official Research, IPR & Start-Up Hub"
              activeId={activeSectionId}
              onItemClick={(id) => setActiveSectionId(id)}
            />
          </div>

          {/* Right Content Stream (Col 9) */}
          <main className="lg:col-span-9 flex flex-col gap-10">
            
            {/* Top Ashoka Chakra Subtext Box */}
            <SubtextBox
              subtext="Fostering a vibrant ecosystem of rigorous intellectual inquiry, sponsored faculty research, high-impact scholarly publications, patent disclosures, and student entrepreneurship at St. Ann's College of Engineering & Technology."
              className="mb-2 shadow-sm"
            />

            {/* ========================================================= */}
            {/* SECTION 1: Research Promotion, Ethics & Funding Policy    */}
            {/* ========================================================= */}
            <section
              id="sec-policy"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>Section 1 • Institutional Framework</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                    1. Research Promotion, Ethics &amp; Funding Policy
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.policy?.pdfUrl, "Research Promotion, Ethics & Funding Policy")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Research Policy (PDF)</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* Tagline / Overview */}
              <div id="sec-policy-principles" className="scroll-mt-56 p-5 bg-gradient-to-r from-blue-50/90 to-indigo-50/60 rounded-2xl border border-blue-100/80 mb-8">
                <p className="text-sm sm:text-base font-semibold text-blue-950 leading-relaxed">
                  {data?.policy?.tagline ||
                    "Promoting Academic Integrity, Innovative Thinking, Rigorous Peer-Reviewed Publications & Institutional Research Grants"}
                </p>
                {data?.policy?.overview && (
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                    {data.policy.overview}
                  </p>
                )}
              </div>

              {/* Key Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div id="sec-policy-ethics" className="scroll-mt-56 p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-center gap-2.5 text-blue-900 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span>Research Ethics &amp; Integrity</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Upholding the highest standards of academic honesty, originality, plagiarism avoidance (strict Turnitin/Urkund verification), ethical animal/human clearances, and responsible data management.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-center gap-2.5 text-blue-900 font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Seed Grants &amp; Financial Incentives</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allocating institutional seed capital for faculty-led pilot investigations, interdisciplinary research projects, patent filing subsidies, and reimbursement for attending national/international symposiums.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-center gap-2.5 text-blue-900 font-bold text-sm">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                    <span>Student Research Fellowships</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Empowering undergraduate and postgraduate scholars with mentored mini-projects, conference paper sponsorships, awards for high-impact journal indexing, and participation in hackathons.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <div className="flex items-center gap-2.5 text-blue-900 font-bold text-sm">
                    <FileCheck2 className="w-5 h-5 text-purple-600" />
                    <span>Scrutiny &amp; Regulatory Compliance</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Institutional Research Advisory Board monitoring research compliance, grant proposal vetting, timeline milestones, and alignment with national science &amp; technology missions.
                  </p>
                </div>
              </div>

              {/* Policy Download Banner */}
              <div id="sec-policy-doc" className="scroll-mt-56 p-5 rounded-2xl bg-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Official Institutional Research Policy Document</h4>
                    <p className="text-xs text-blue-200/80">Complete guidelines on ethics, seed grants, publication rewards &amp; IPR procedures.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.policy?.pdfUrl, "Official Institutional Research Policy Document")}
                  className="px-4 py-2 bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Official PDF</span>
                </button>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: Research & Development Cell (RDC)              */}
            {/* ========================================================= */}
            <section
              id="sec-rdc"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    <span>Section 2 • R&amp;D Ecosystem</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                    2. Research &amp; Development Cell (RDC)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.rdc?.pdfUrl, "RDC Policy & Operating Guidelines")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>RDC Policy (PDF)</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* Tagline / Overview */}
              <div id="sec-rdc-about" className="scroll-mt-56 p-5 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl border border-slate-200/80 mb-8 space-y-2">
                <p className="text-sm sm:text-base font-semibold text-blue-950">
                  {data?.rdc?.tagline ||
                    "Catalyzing Exploratory Inquiry, Interdisciplinary Projects & Sustainable Innovation across Engineering Disciplines"}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {data?.rdc?.overview ||
                    "The Research and Development (R&D) Cell at St. Ann's College of Engineering & Technology serves as the nerve center for fostering intellectual inquiry, spearheading sponsored research projects, mentoring scholarly publications, and translating academic findings into socio-economic solutions."}
                </p>
              </div>

              {/* Vision & Mission Cards */}
              <div id="sec-rdc-vision" className="scroll-mt-56 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Vision</span>
                  </div>
                  <h3 className="font-bold text-base text-white">Our Research Vision</h3>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    {data?.rdc?.vision ||
                      "To emerge as a premier centre of excellence in engineering research and technological innovation, fostering cutting-edge inquiries that address contemporary global and societal challenges."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <Rocket className="w-4 h-4" />
                    <span>Mission</span>
                  </div>
                  <h3 className="font-bold text-base text-white">Our Research Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                    {data?.rdc?.mission ||
                      "To provide state-of-the-art infrastructure, encourage high-impact publications, facilitate external funded research, and nurture an ethical, interdisciplinary collaborative research ecosystem."}
                  </p>
                </div>
              </div>

              {/* 6 Core Objectives */}
              <div id="sec-rdc-objectives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Key Objectives of the R&amp;D Cell</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {(data?.rdc?.objectives || [
                    "Foster a vibrant and sustained research culture across all academic departments.",
                    "Enhance high-quality publications in Scopus, Web of Science & UGC-CARE indexed journals.",
                    "Promote interdisciplinary research initiatives addressing complex societal challenges.",
                    "Facilitate faculty in securing sponsored grants from DST, SERB, AICTE, UGC, and industry bodies.",
                    "Conduct capacity-building workshops, research methodology seminars, and grant writing sessions.",
                    "Establish robust institutional partnerships and collaborative linkages with premier R&D institutes."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10 Major Initiatives */}
              <div id="sec-rdc-initiatives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Major Initiatives &amp; Research Enablers</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.rdc?.initiatives || [
                    "Seed Money Grant Scheme for early-stage faculty research projects and experimental setups.",
                    "Faculty Development Programs (FDPs) on advanced research methodologies and modern simulation tools.",
                    "Financial Incentive & Recognition Scheme for indexed journal publications and book authorships.",
                    "Student Research Mentorship Scheme encouraging B.Tech/M.Tech capstone innovation.",
                    "Annual National & International Conferences organizing thematic technical tracks.",
                    "Distinguished Lecture Series & Colloquia by eminent national and international scientists.",
                    "Mandatory Plagiarism Verification via Turnitin/Urkund for all dissertations and manuscripts.",
                    "Specialized Grant Proposal Clinics assisting faculty in drafting competitive funding submissions.",
                    "Collaborative MOUs with research institutes, industry labs, and technological incubators.",
                    "Annual Research Compendium documenting institutional scholarly achievements and citation metrics."
                  ]).map((init: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 hover:border-blue-300 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{init}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RDC Annual Reports Table */}
              <div id="sec-rdc-reports" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>RDC Annual Activity Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.rdc?.annualReports?.length || 0} Reports Available
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.rdc?.annualReports || []).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.pdfUrl, `${rep.title} (${rep.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: Research Infrastructure                        */}
            {/* ========================================================= */}
            <section
              id="sec-infra"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="border-b border-slate-100 pb-6 mb-8">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Section 3 • Laboratories &amp; Computing</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  3. Research Infrastructure
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {data?.infrastructure?.tagline ||
                    "State-of-the-Art Laboratories, Specialized Testing Instrumentation & High-Performance Computing"}
                </p>
              </div>

              {/* 6 Infrastructure Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(data?.infrastructure?.items || [
                  {
                    id: "sec-infra-labs",
                    title: "Dedicated Research Labs",
                    description: "Advanced departmental research laboratories equipped for exploratory experiments, prototype synthesis, and interdisciplinary investigations in emerging engineering disciplines."
                  },
                  {
                    id: "sec-infra-equipment",
                    title: "Advanced Analytical Equipment",
                    description: "High-precision testing rigs, spectral analyzers, digital oscilloscopes, material testing machinery, and modern measurement instruments."
                  },
                  {
                    id: "sec-infra-dept",
                    title: "Departmental Research Facilities",
                    description: "Specialized project labs for AI/ML, IoT testbeds, VLSI design tools, renewable energy setups, and structural modeling environments."
                  },
                  {
                    id: "sec-infra-library",
                    title: "Central Library & E-Resources",
                    description: "Extensive physical collection and institutional subscriptions to IEEE Xplore, ScienceDirect, SpringerLink, UGC-CARE indexed journals, and digital archives."
                  },
                  {
                    id: "sec-infra-delnet",
                    title: "DELNET & Digital Repository Access",
                    description: "Integrated inter-library lending network, institutional e-thesis repositories, open-access scholarly databases, and global research paper access."
                  },
                  {
                    id: "sec-infra-ict",
                    title: "High-Performance ICT & Computing Hub",
                    description: "Modern compute clusters, GPU-powered nodes for AI computations, campus-wide high-speed fiber backbone, and dedicated cloud computing environments."
                  }
                ]).map((fac: any, idx: number) => {
                  const icons = [Microscope, Cpu, Layers, Library, BookOpen, Compass];
                  const Icon = icons[idx % icons.length];
                  const cardId = fac.id || (idx === 0 ? "sec-infra-labs" : idx === 1 ? "sec-infra-equipment" : idx === 3 ? "sec-infra-library" : idx === 5 ? "sec-infra-ict" : undefined);

                  return (
                    <div
                      key={idx}
                      id={cardId}
                      className="scroll-mt-56 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-800 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-[#002147] mb-2">{fac.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Active Campus Facility</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: Research Publications                          */}
            {/* ========================================================= */}
            <section
              id="sec-publications"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="border-b border-slate-100 pb-6 mb-8">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Section 4 • Scholarly Contributions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  4. Research Publications &amp; Scholarly Contributions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {data?.publications?.tagline ||
                    "Scopus, Web of Science, UGC-CARE Indexed Journals, Authored Books & Research Proceedings"}
                </p>
              </div>

              {/* Table 1: Faculty & Student Publications */}
              <div id="sec-pub-faculty-students" className="scroll-mt-56 space-y-4 mb-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Faculty &amp; Students Research Publications</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.publications?.facultyPublications?.length || 0} Academic Years
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Category / Level</th>
                        <th className="py-3 px-4">Title / Indexed Metrics</th>
                        <th className="py-3 px-4 text-center w-24">Count</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.publications?.facultyPublications || []).map((pub: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{pub.year}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{pub.category}</td>
                          <td className="py-3.5 px-4 text-slate-700">
                            <span className="font-semibold block">{pub.title}</span>
                            {pub.description && <span className="text-[11px] text-slate-500">{pub.description}</span>}
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-blue-900">{pub.totalCount || "—"}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(pub.pdfUrl, `${pub.title} (${pub.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: Paper Presentations */}
              <div id="sec-pub-presentations" className="scroll-mt-56 space-y-4 mb-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>Faculty &amp; Student Paper Presentations in Conferences</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.publications?.paperPresentations?.length || 0} Academic Years
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Forum / Level</th>
                        <th className="py-3 px-4">Proceedings &amp; Presentation Title</th>
                        <th className="py-3 px-4 text-center w-24">Count</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.publications?.paperPresentations || []).map((pres: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{pres.year}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{pres.category}</td>
                          <td className="py-3.5 px-4 text-slate-700">
                            <span className="font-semibold block">{pres.title}</span>
                            {pres.description && <span className="text-[11px] text-slate-500">{pres.description}</span>}
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-blue-900">{pres.totalCount || "—"}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(pres.pdfUrl, `${pres.title} (${pres.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 3: Books and Book Chapters */}
              <div id="sec-pub-books" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <span>Faculty Journals, Authored Books &amp; Book Chapters</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.publications?.booksAndChapters?.length || 0} Academic Years
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Publication Type</th>
                        <th className="py-3 px-4">Publisher &amp; Volume Title</th>
                        <th className="py-3 px-4 text-center w-24">Count</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.publications?.booksAndChapters || []).map((book: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{book.year}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{book.category}</td>
                          <td className="py-3.5 px-4 text-slate-700">
                            <span className="font-semibold block">{book.title}</span>
                            {book.description && <span className="text-[11px] text-slate-500">{book.description}</span>}
                          </td>
                          <td className="py-3.5 px-4 text-center font-black text-blue-900">{book.totalCount || "—"}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(book.pdfUrl, `${book.title} (${book.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 5: Patents / Start-ups / Innovations              */}
            {/* ========================================================= */}
            <section
              id="sec-patents"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Section 5 • IP Creation &amp; Start-ups</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                    5. Patents / Start-ups / Innovations
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.patents?.pdfUrl, "Innovation & Start-up Guidelines")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Innovation Policy (PDF)</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* Tagline */}
              <div className="p-5 bg-gradient-to-r from-amber-50/70 to-orange-50/50 rounded-2xl border border-amber-200/60 mb-8">
                <p className="text-sm sm:text-base font-semibold text-amber-950">
                  {data?.patents?.tagline ||
                    "Transforming Creative Ideation into Protected Intellectual Property, Commercial Licensing & Student-Led Tech Start-ups"}
                </p>
              </div>

              {/* 6 Major Initiatives */}
              <div id="sec-patents-initiatives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Key Innovation &amp; Incubation Pillars</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {(data?.patents?.initiatives || [
                    "Innovation Hackathons & Smart India Hackathon internal scrutiny sessions.",
                    "Patent Prior-Art Searching & Technical Drafting assistance workshops.",
                    "Prototyping FabLabs equipped with 3D printers and microelectronics kits.",
                    "One-on-one Mentorship by registered Patent Attorneys and industry entrepreneurs.",
                    "Pre-incubation facilities and start-up pitch deck competitions.",
                    "Technology Transfer & Commercialization licensing support for novel prototypes."
                  ]).map((init: string, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{init}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Year-wise Innovation & IPR Activities */}
              <div id="sec-patents-years" className="scroll-mt-56 space-y-4">
                <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Year-wise Innovation &amp; IPR Milestones</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(data?.patents?.yearlyActivities || []).map((yr: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 bg-[#002147] text-white rounded-lg text-xs font-bold mb-3">
                          {yr.year}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mb-2">{yr.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{yr.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openPdfModal(yr.pdfUrl, `${yr.title} (${yr.year})`)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Activity Report</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 6: Intellectual Property Rights (IPR) Cell         */}
            {/* ========================================================= */}
            <section
              id="sec-ipr"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Section 6 • Statutory IP Framework</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                    6. Intellectual Property Rights (IPR) Cell
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.ipr?.pdfUrl, "IPR Policy & Operational Manual")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>IPR Policy (PDF)</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* Tagline / Establishment Details */}
              <div id="sec-ipr-about" className="scroll-mt-56 p-5 bg-gradient-to-r from-emerald-50/70 to-teal-50/50 rounded-2xl border border-emerald-200/60 mb-8 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Constituted on: {data?.ipr?.constitutedDate || "01-09-2022"}</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-emerald-950">
                  {data?.ipr?.tagline ||
                    "Protecting Inventions, Safeguarding Creative Expressions & Facilitating Technology Transfer"}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {data?.ipr?.overview ||
                    "The Intellectual Property Rights (IPR) Cell is committed to educating, guiding, and counseling faculty, research scholars, and students regarding the creation, protection, and management of intellectual property."}
                </p>
              </div>

              {/* 6 Objectives */}
              <div id="sec-ipr-objectives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Key Objectives of the IPR Cell</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {(data?.ipr?.objectives || [
                    "Create institutional awareness regarding the importance and scope of Intellectual Property Rights.",
                    "Guide faculty and students through patent drafting, prior-art searches, and Indian Patent Office filing.",
                    "Establish a streamlined mechanism for institutional scrutiny and financial support for patent filings.",
                    "Facilitate copyright, trademark, and design registrations for software products and hardware models.",
                    "Organize regular seminars, workshops, and training sessions in association with patent attorneys.",
                    "Promote technology transfer, licensing, and commercialization of patented innovations."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Activities */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Major Activities Conducted</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.ipr?.activities || [
                    "World IP Day celebrations featuring keynote talks by IP attorneys and patent examiners.",
                    "Patent Search & Prior-Art Analysis hands-on training using global patent databases.",
                    "Interactive workshops on 'How to Convert Academic Projects into Protectable Patents'.",
                    "Assistance in drafting complete and provisional patent specifications.",
                    "Copyright protection awareness drives for computer software code, manuals, and literary works.",
                    "Design registration workshops for novel hardware chassis and aesthetic product shapes.",
                    "Facilitating institutional MoU partnerships with reputed patent law firms.",
                    "Maintaining the central institutional IPR registry and filing status repository."
                  ]).map((act: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Outcomes */}
              <div id="sec-ipr-outcomes" className="scroll-mt-56 p-6 bg-slate-50 rounded-2xl border border-slate-200 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Expected Outcomes &amp; Impact</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(data?.ipr?.outcomes || [
                    "Significant increase in published and granted patents by faculty and student inventors.",
                    "Institutional protection for software algorithms, digital tools, and technical publications.",
                    "Enhanced NIRF, NAAC, and NBA accreditation scores through validated intellectual capital.",
                    "Creation of viable revenue models through patent licensing and technology commercialization.",
                    "A vibrant innovation culture inspiring future generations of engineers and inventors."
                  ]).map((outc: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-relaxed">{outc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IPR Annual Reports Table */}
              <div id="sec-ipr-reports" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>IPR Cell Annual Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.ipr?.annualReports?.length || 0} Reports Available
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.ipr?.annualReports || []).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.pdfUrl, `${rep.title} (${rep.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 7: ED / Innovation & Start-Up Centre              */}
            {/* ========================================================= */}
            <section
              id="sec-edc"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                    <Rocket className="w-4 h-4 text-indigo-600" />
                    <span>Section 7 • Venture Incubation</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                    7. Entrepreneurship Development / Innovation &amp; Start-Up Centre
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.edc?.pdfUrl, "Entrepreneurship Development Policy")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>ED Policy (PDF)</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* Tagline / Vision */}
              <div id="sec-edc-vision" className="scroll-mt-56 p-5 bg-gradient-to-r from-indigo-50/70 to-blue-50/50 rounded-2xl border border-indigo-200/60 mb-8 space-y-2">
                <p className="text-sm sm:text-base font-semibold text-indigo-950">
                  {data?.edc?.tagline ||
                    "Nurturing Student Founders, Promoting Venture Creation & Building Resilient Social & Technological Enterprises"}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {data?.edc?.vision ||
                    "To create a robust incubation and entrepreneurial ecosystem that inspires students to become job creators, technology founders, and innovators addressing national economic priorities."}
                </p>
              </div>

              {/* 7 Objectives */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span>Key Objectives of the ED &amp; Start-Up Centre</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {(data?.edc?.objectives || [
                    "Cultivate an entrepreneurial mindset and self-reliance among engineering students.",
                    "Provide pre-incubation, mentoring, and prototype validation support for early-stage student ventures.",
                    "Organize business plan competitions, venture bootcamps, and investor pitch sessions.",
                    "Connect student founders with angel investors, venture capitalists, and government funding schemes.",
                    "Promote women entrepreneurship through tailored skill workshops and mentorship clinics.",
                    "Facilitate industry-academia partnerships for practical market exposure and pilot deployments.",
                    "Encourage rural and social entrepreneurship addressing grassroots community challenges."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9 Key Activities */}
              <div id="sec-edc-activities" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Major Activities &amp; Mentorship Programs</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(data?.edc?.activities || [
                    "Entrepreneurship Awareness Camps (EAC) conducted across all branches.",
                    "Interactive 'Meet the Founder' sessions with successful college alumni entrepreneurs.",
                    "Startup Bootcamps focusing on business model canvas, market validation, and revenue forecasting.",
                    "Guidance on MSME registrations, Startup India recognition, and company incorporation.",
                    "Pitch deck preparation clinics and mock pitching before investor panels.",
                    "Industrial visits to startup incubators, technology parks, and manufacturing clusters.",
                    "Legal and financial advisory clinics on equity structuring, term sheets, and compliance.",
                    "Specialized hackathons focused on developing commercial-grade minimum viable products (MVPs).",
                    "Facilitating co-working spaces and prototyping equipment access within campus."
                  ]).map((act: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Women Entrepreneurship Box */}
              <div id="sec-edc-women" className="scroll-mt-56 p-6 bg-gradient-to-br from-pink-50/70 to-rose-50/50 rounded-2xl border border-pink-200/60 mb-8 space-y-2">
                <div className="flex items-center gap-2 text-pink-900 font-bold text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4 text-pink-600" />
                  <span>Special Initiative</span>
                </div>
                <h4 className="font-bold text-sm text-pink-950">Women Entrepreneurship Empowerment Cell</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Dedicated mentoring, networking circles, and grant facilitation aimed at empowering female students and alumni to establish technology startups, digital enterprises, and creative ventures.
                </p>
              </div>

              {/* ED Annual Reports Table */}
              <div id="sec-edc-reports" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>ED &amp; Start-Up Centre Annual Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.edc?.annualReports?.length || 0} Reports Available
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.edc?.annualReports || []).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.pdfUrl, `${rep.title} (${rep.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 8: Institution Innovation Council (IIC)           */}
            {/* ========================================================= */}
            <section
              id="sec-iic"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                    <Compass className="w-4 h-4 text-purple-600" />
                    <span>Section 8 • Ministry of Education Initiative</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                    8. Institution Innovation Council (IIC) / Institution–Industry Cell
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.iic?.pdfUrl, "Institution Innovation Council Policy")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>IIC Policy (PDF)</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* Tagline / Overview */}
              <div id="sec-iic-about" className="scroll-mt-56 p-5 bg-gradient-to-r from-purple-50/70 to-indigo-50/50 rounded-2xl border border-purple-200/60 mb-8 space-y-2">
                <p className="text-sm sm:text-base font-semibold text-purple-950">
                  {data?.iic?.tagline ||
                    "Driving Institutional Innovation Ecosystem, Industry Linkages, Hackathons & Nation-Building Collaborative Projects"}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {data?.iic?.overview ||
                    "Established under the guidelines of the Ministry of Education (MoE's Innovation Cell), the IIC systematically fosters a vibrant innovation ecosystem among faculty and students, promoting hackathons, ideation challenges, and industry-oriented technology development."}
                </p>
              </div>

              {/* 7 Objectives */}
              <div id="sec-iic-objectives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span>Key Objectives of the IIC</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {(data?.iic?.objectives || [
                    "Conduct MoE-mandated innovation, IPR, and entrepreneurship activities across all academic quarters.",
                    "Scout, mentor, and accelerate innovative ideas and student-led prototypes.",
                    "Organize internal hackathons and facilitate participation in Smart India Hackathon (SIH).",
                    "Establish active industry-academia collaboration for consultancy, testing, and internships.",
                    "Host interactive sessions with renowned innovators, serial entrepreneurs, and venture capitalists.",
                    "Develop institutional capability for participation in national innovation rankings (ARIIA/NIRF Innovation).",
                    "Create an interdisciplinary platform uniting engineering disciplines for sustainable product development."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8 Key Activities */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Key Activities &amp; Annual Initiatives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.iic?.activities || [
                    "Quarterly MoE IIC Calendar Activity executions and report submissions.",
                    "National Innovation and Startup Policy (NISP) institutional implementation sessions.",
                    "Smart India Hackathon (SIH) internal college evaluations and mentorship bootcamps.",
                    "Field exposure visits to premier technological incubators, research labs, and science parks.",
                    "Hands-on design thinking, critical problem solving, and prototyping workshops.",
                    "Motivational leadership talks by successful startup founders and alumni change-makers.",
                    "Industry Advisory Board conclaves for curriculum-industry alignment and collaborative labs.",
                    "Annual Institutional Innovation Day celebrations and prototype exhibitions."
                  ]).map((act: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IIC Annual Reports Table */}
              <div id="sec-iic-reports" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>IIC Annual Activity Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.iic?.annualReports?.length || 0} Reports Available
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Report Title</th>
                        <th className="py-3 px-4 text-center w-36">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.iic?.annualReports || []).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.pdfUrl, `${rep.title} (${rep.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
