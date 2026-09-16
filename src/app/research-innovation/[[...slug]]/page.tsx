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
  Quote,
} from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getResearchData, DEFAULT_RESEARCH_DATA } from "@/lib/sanity";

// Sidebar categories matching 9.Research & Innovation.docx (1 to 8)
const RESEARCH_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "sec-about",
    title: "About Research & Innovation",
    sectionId: "sec-about",
    items: [
      { text: "About Research & Innovation at St. Ann's", id: "sec-about" },
    ],
  },
  {
    catSlug: "sec-policy",
    title: "1. Research Promotion, Ethics & Funding Policy",
    sectionId: "sec-policy",
    items: [
      { text: "Policy Framework & Commitments", id: "sec-policy" },
      { text: "View Policy Document (PDF)", id: "sec-policy-doc" },
    ],
  },
  {
    catSlug: "sec-rdc",
    title: "2. Research & Development Cell (RDC)",
    sectionId: "sec-rdc",
    items: [
      { text: "About RDC", id: "sec-rdc-about" },
      { text: "Vision & Mission", id: "sec-rdc-vision" },
      { text: "Key Objectives", id: "sec-rdc-objectives" },
      { text: "Major Initiatives", id: "sec-rdc-initiatives" },
      { text: "Institutional Commitment", id: "sec-rdc-commitment" },
      { text: "RDC Annual Activity Reports", id: "sec-rdc-reports" },
    ],
  },
  {
    catSlug: "sec-infra",
    title: "3. Research Infrastructure",
    sectionId: "sec-infra",
    items: [
      { text: "Research Laboratories", id: "sec-infra-labs" },
      { text: "Laboratory Facilities & Equipment", id: "sec-infra-equipment" },
      { text: "Departmental Research Facilities", id: "sec-infra-dept" },
      { text: "Library & E-Resources", id: "sec-infra-library" },
      { text: "DELNET / Digital Resources", id: "sec-infra-delnet" },
      { text: "ICT & Computational Facilities", id: "sec-infra-ict" },
    ],
  },
  {
    catSlug: "sec-publications",
    title: "4. Research Publications & Scholarly Contributions",
    sectionId: "sec-publications",
    items: [
      { text: "Faculty & Students Publications", id: "sec-pub-faculty-students" },
      { text: "Faculty & Student Paper Presentations", id: "sec-pub-presentations" },
      { text: "Journals, Books & Book Chapters", id: "sec-pub-books" },
    ],
  },
  {
    catSlug: "sec-patents",
    title: "5. Patents / Start-ups / Innovations",
    sectionId: "sec-patents",
    items: [
      { text: "Major Innovation Initiatives", id: "sec-patents-initiatives" },
      { text: "Year-wise Innovation & IPR Activities", id: "sec-patents-matrix" },
    ],
  },
  {
    catSlug: "sec-ipr",
    title: "6. Intellectual Property Rights (IPR) Cell",
    sectionId: "sec-ipr",
    items: [
      { text: "About IPR Cell (Est. 01-09-2022)", id: "sec-ipr-about" },
      { text: "Objectives & Major Activities", id: "sec-ipr-objectives" },
      { text: "Expected Outcomes", id: "sec-ipr-outcomes" },
      { text: "Annual Activity Reports", id: "sec-ipr-reports" },
      { text: "Intellectual Property Policy", id: "sec-ipr-policy" },
    ],
  },
  {
    catSlug: "sec-edc",
    title: "7. ED / Innovation & Start-Up Centre",
    sectionId: "sec-edc",
    items: [
      { text: "About Centre & Vision", id: "sec-edc-about" },
      { text: "Objectives & Major Activities", id: "sec-edc-objectives" },
      { text: "Industry & Women Entrepreneurship", id: "sec-edc-women" },
      { text: "Annual Activity Reports", id: "sec-edc-reports" },
      { text: "ED & Start-Up Policy", id: "sec-edc-policy" },
    ],
  },
  {
    catSlug: "sec-iic",
    title: "8. Institution Innovation Council (IIC)",
    sectionId: "sec-iic",
    items: [
      { text: "About the Cell & Objectives", id: "sec-iic-about" },
      { text: "Key Activities & Outcomes", id: "sec-iic-activities" },
      { text: "Annual Activity Reports", id: "sec-iic-reports" },
      { text: "IIC Policy", id: "sec-iic-policy" },
    ],
  },
];

export default function ResearchInnovationPage() {
  const [data, setData] = useState<any>(DEFAULT_RESEARCH_DATA);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-about");
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
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
              subtext="At St. Ann’s College for Women, Gorantla, Guntur, research and innovation foster academic excellence, creativity, critical thinking and societal impact. Fostering a supportive research ecosystem, St. Ann’s promotes ethical research, emerging technologies, practical solutions and community-oriented initiatives."
              className="mb-2 shadow-sm"
            />

            {/* ========================================================= */}
            {/* OVERVIEW SECTION: About Research & Innovation at St. Ann's */}
            {/* ========================================================= */}
            <section
              id="sec-about"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Institutional Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  About Research &amp; Innovation at St. Ann’s
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  At <strong className="text-slate-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong>, research and innovation foster academic excellence, creativity, critical thinking and societal impact. The College encourages faculty and students to engage in research, innovative projects, interdisciplinary collaboration, publications and knowledge sharing.
                </p>
                <p>
                  Through a supportive research ecosystem, St. Ann’s promotes ethical research, emerging technologies, practical solutions and community-oriented initiatives, nurturing women researchers and innovators prepared to contribute to a knowledge-driven and <strong className="text-slate-900 font-bold">Viksit Bharat</strong>.
                </p>
              </div>

              {/* Tagline / Quote */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100/80 text-center shadow-xs">
                <Quote className="w-6 h-6 text-blue-400 mx-auto mb-2 opacity-60" />
                <p className="text-base sm:text-lg font-bold text-amber-900 italic">
                  “Research inspires discovery. Innovation transforms ideas into impact.”
                </p>
              </div>
            </section>

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
                  onClick={() => openPdfModal(data?.researchPolicy?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Research Promotion, Ethics & Funding Policy")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View PDF Research Policy</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                <p>
                  At <strong className="text-slate-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong>, research is promoted as a key component of academic excellence, innovation, and societal development. The College encourages faculty and students to undertake meaningful, multidisciplinary, and socially relevant research.
                </p>
                <p>
                  The policy provides a framework for research promotion, ethical conduct, plagiarism prevention, intellectual property, funding, publications, and collaborations, ensuring integrity, transparency, accountability, and originality in all research activities.
                </p>
                <p>
                  The College is committed to fostering a responsible research culture that supports innovation, higher studies, women’s empowerment, and community development.
                </p>
              </div>

              {/* Tagline */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center mb-6">
                <p className="text-sm sm:text-base font-bold text-amber-900">
                  “Research with Integrity • Innovation with Purpose • Knowledge for Society”
                </p>
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
                  onClick={() => openPdfModal(data?.researchPolicy?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Official Institutional Research Policy Document")}
                  className="px-4 py-2 bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View PDF Research Policy</span>
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
                  onClick={() => openPdfModal(data?.rdc?.rdcPolicyFileUrl || "/documents/DefaultFile_1.pdf", "RDC Policy & Operating Guidelines")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#002147] text-white hover:bg-blue-900 transition-all text-xs font-bold shadow-sm shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View PDF: RDC</span>
                  <Eye className="w-3.5 h-3.5 text-blue-200" />
                </button>
              </div>

              {/* About RDC */}
              <div id="sec-rdc-about" className="scroll-mt-56 space-y-3 mb-8 text-sm sm:text-base text-slate-700 leading-relaxed">
                <h3 className="text-base font-bold text-[#002147]">About RDC</h3>
                <p>
                  The <strong className="text-slate-900 font-bold">Research &amp; Development Cell (RDC)</strong> of St. Ann’s College for Women, Gorantla, Guntur promotes a vibrant culture of research, innovation, consultancy, collaboration, and academic excellence in alignment with UGC guidelines, NEP-2020, and institutional quality initiatives.
                </p>
                <p>
                  The RDC facilitates and monitors research activities, encourages ethical research practices, supports publications and funded projects, and provides opportunities for faculty and students to engage in innovative, interdisciplinary, and socially relevant research.
                </p>
              </div>

              {/* Vision & Mission Cards */}
              <div id="sec-rdc-vision" className="scroll-mt-56 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Vision</span>
                  </div>
                  <h4 className="font-bold text-base text-white">Our Vision</h4>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    {data?.rdc?.vision || "To foster a dynamic research ecosystem that promotes innovation, knowledge creation, academic excellence, and societal transformation."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <Rocket className="w-4 h-4" />
                    <span>Mission</span>
                  </div>
                  <h4 className="font-bold text-base text-white">Our Mission</h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                    {(data?.rdc?.mission || [
                      "Nurture research aptitude among faculty and students.",
                      "Promote innovative and socially relevant research.",
                      "Strengthen research collaborations and consultancy.",
                      "Uphold research integrity and ethical standards."
                    ]).map((m: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Objectives */}
              <div id="sec-rdc-objectives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Key Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.rdc?.objectives || [
                    "Promote quality research and publications.",
                    "Encourage funded projects, patents, and consultancy.",
                    "Facilitate interdisciplinary and collaborative research.",
                    "Organize research methodology, IPR, and publication ethics programmes.",
                    "Support research proposal preparation and funding opportunities.",
                    "Promote student research, innovation, and project-based learning.",
                    "Develop linkages with universities, industries, NGOs, and research organizations.",
                    "Maintain institutional records of research, publications, projects, patents, and collaborations."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Initiatives */}
              <div id="sec-rdc-initiatives" className="scroll-mt-56 mb-8">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Major Initiatives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.rdc?.initiatives || [
                    "Research Methodology & FDP Programmes",
                    "Publication and Research Guidance",
                    "Research Ethics, Plagiarism & IPR Awareness",
                    "Seed Funding & Research Incentives",
                    "Patent and Innovation Support",
                    "Funded Project & Consultancy Guidance",
                    "Student Research & Project Activities",
                    "Interdisciplinary and Collaborative Research",
                    "Academic and Industry Collaborations",
                    "Research Grant and Fellowship Awareness"
                  ]).map((init: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 hover:border-blue-300 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{init}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institutional Commitment */}
              <div id="sec-rdc-commitment" className="scroll-mt-56 p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8 space-y-2">
                <h3 className="text-base font-bold text-[#002147]">Institutional Commitment</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {data?.rdc?.commitment || "St. Ann’s College for Women is committed to building a responsible, innovative, and collaborative research ecosystem that contributes to academic excellence, women’s empowerment, community development, and sustainable societal progress."}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                    Research • Innovation • Integrity • Impact
                  </span>
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
                    {data?.rdc?.activityReports?.length || 2} Reports Available
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
                      {(data?.rdc?.activityReports || [
                        { year: "2025–2026", title: "RDC Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", title: "RDC Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.fileUrl, rep.title)}
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
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Section 3 • Laboratories &amp; Computing</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  3. Research Infrastructure
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {data?.infrastructure?.description ||
                    "St. Ann’s College for Women, Gorantla, Guntur provides a supportive academic environment for research, innovation, experimentation and knowledge development. The institution utilizes its departmental laboratories, library resources, digital facilities and ICT infrastructure to facilitate faculty and student research activities."}
                </p>
              </div>

              {/* 6 Infrastructure Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(data?.infrastructure?.facilities || [
                  {
                    id: "sec-infra-labs",
                    title: "Research Laboratories",
                    description: "The College has departmental laboratories that support practical learning, experimentation, project work and research-oriented academic activities across Science, Computer Science and other disciplines."
                  },
                  {
                    id: "sec-infra-equipment",
                    title: "Laboratory Facilities & Equipment",
                    description: "The laboratories are equipped with essential instruments, equipment and learning resources required for practical training, student projects, demonstrations and faculty research activities."
                  },
                  {
                    id: "sec-infra-dept",
                    title: "Departmental Research Facilities",
                    description: "Academic departments provide discipline-specific facilities that encourage faculty research, student projects, interdisciplinary learning and innovative academic practices."
                  },
                  {
                    id: "sec-infra-library",
                    title: "Library & E-Resources",
                    description: "The College Library provides access to a wide range of books, journals, reference materials and digital learning resources that support teaching, learning and research."
                  },
                  {
                    id: "sec-infra-delnet",
                    title: "DELNET / Digital Resources",
                    description: "The institution provides access to DELNET and digital resources, enabling students and faculty to explore scholarly literature, bibliographic databases, e-resources and academic information beyond the physical library collection."
                  },
                  {
                    id: "sec-infra-ict",
                    title: "ICT & Computational Facilities",
                    description: "ICT-enabled classrooms, computer facilities, internet connectivity and relevant software applications support data analysis, digital research, project development, online learning and academic collaboration."
                  }
                ]).map((fac: any, idx: number) => {
                  const icons = [Microscope, Cpu, Layers, Library, BookOpen, Compass];
                  const Icon = icons[idx % icons.length];
                  const cardId = fac.id || (idx === 0 ? "sec-infra-labs" : idx === 1 ? "sec-infra-equipment" : idx === 2 ? "sec-infra-dept" : idx === 3 ? "sec-infra-library" : idx === 4 ? "sec-infra-delnet" : "sec-infra-ict");

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
            {/* SECTION 4: Research Publications & Scholarly Contributions */}
            {/* ========================================================= */}
            <section
              id="sec-publications"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Section 4 • Scholarly Contributions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  4. Research Publications &amp; Scholarly Contributions
                </h2>
              </div>

              {/* Sub-part 1: Publications */}
              <div id="sec-pub-faculty-students" className="scroll-mt-56 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#002147]">Publications</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    St. Ann’s College for Women, Gorantla, Guntur promotes quality research and scholarly contributions by faculty members and students. The institution encourages publication of research findings in peer-reviewed, UGC-recognized, Scopus/Web of Science indexed, and other reputed journals, subject to applicable norms.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Year</th>
                        <th className="py-3 px-4 text-center">Faculty Publications</th>
                        <th className="py-3 px-4 text-center">Students Publications</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.scholarlyContributions?.publications || [
                        { year: "2026–2027", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2025–2026", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((pub: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{pub.year}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(pub.facultyFileUrl, `Faculty Publications (${pub.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(pub.studentFileUrl, `Students Publications (${pub.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-indigo-200/60"
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

              {/* Sub-part 2: Paper Presentations */}
              <div id="sec-pub-presentations" className="scroll-mt-56 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#002147]">Paper Presentations</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    The College encourages faculty members and students to disseminate their research findings through paper presentations at national and international conferences, seminars, symposiums, workshops, and academic forums. These activities provide opportunities for scholarly exchange, professional development, and wider dissemination of research outcomes.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4 text-center">Faculty Paper Presentations</th>
                        <th className="py-3 px-4 text-center">Student Paper Presentations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.scholarlyContributions?.paperPresentations || [
                        { year: "2025–2026", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", facultyFileUrl: "/documents/DefaultFile_1.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((pres: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{pres.year}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(pres.facultyFileUrl, `Faculty Paper Presentations (${pres.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF →</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(pres.studentFileUrl, `Student Paper Presentations (${pres.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-indigo-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF →</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-part 3: Journals, Books & Book Chapters */}
              <div id="sec-pub-books" className="scroll-mt-56 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#002147]">Journals, Books &amp; Book Chapters</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Faculty members of St. Ann’s College for Women contribute to academic and scholarly development through:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">• Research Articles in reputed and indexed journals</li>
                    <li className="flex items-center gap-2">• Textbooks and Reference Books</li>
                    <li className="flex items-center gap-2">• Edited Books and ISBN Publications</li>
                    <li className="flex items-center gap-2">• National &amp; International Book Chapters</li>
                    <li className="flex items-center gap-2">• Departmental Journals and Academic Magazines</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    The institution encourages scholarly writing, publication, knowledge sharing, and dissemination of research across diverse disciplines.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4">Publication Category</th>
                        <th className="py-3 px-4 text-center w-40">Document</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.scholarlyContributions?.booksAndChapters || [
                        { year: "2026–2027", title: "Faculty Journals, Books & Book Chapters 2026–2027", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2025–2026", title: "Faculty Journals, Books & Book Chapters 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", title: "Faculty Journals, Books & Book Chapters 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((book: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{book.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{book.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(book.fileUrl, `${book.title}`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF →</span>
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
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Section 5 • IP Creation &amp; Start-ups</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  5. Patents / Start-ups / Innovations
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {data?.patentsAndInnovations?.description ||
                    "St. Ann’s College for Women, Gorantla, Guntur promotes innovation, creativity, entrepreneurship, and problem-solving among faculty and students. The institution provides opportunities to develop innovative ideas, projects, prototypes, start-up concepts, and intellectual property."}
                </p>
              </div>

              {/* Major Initiatives */}
              <div id="sec-patents-initiatives" className="scroll-mt-56">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Major Initiatives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(data?.patentsAndInnovations?.initiatives || [
                    "Innovation and Idea Presentation Programmes",
                    "Student Project Exhibitions and Project Expos",
                    "Entrepreneurship & Start-up Awareness Programmes",
                    "Patent & IPR Awareness Programmes",
                    "Innovation and Prototype Development Activities",
                    "Incubation and Entrepreneurship Support"
                  ]).map((init: string, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">{init}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Year-wise Innovation & IPR Activities Table */}
              <div id="sec-patents-matrix" className="scroll-mt-56 space-y-4">
                <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Year-wise Innovation &amp; IPR Activities</span>
                </h3>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#002147] text-white font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4">Academic Year</th>
                        <th className="py-3 px-4 text-center">Innovation Activities</th>
                        <th className="py-3 px-4 text-center">Start-up Initiatives</th>
                        <th className="py-3 px-4 text-center">Patent / IPR Awareness</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {(data?.patentsAndInnovations?.activitiesMatrix || [
                        { year: "2026–2027", innovationFileUrl: "/documents/DefaultFile_1.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2025–2026", innovationFileUrl: "/documents/DefaultFile_1.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", innovationFileUrl: "/documents/DefaultFile_1.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{row.year}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(row.innovationFileUrl, `Innovation Activities (${row.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF →</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(row.startupFileUrl, `Start-up Initiatives (${row.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-emerald-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF →</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(row.patentIprFileUrl, `Patent / IPR Awareness (${row.year})`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer border border-purple-200/60"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View PDF →</span>
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
            {/* SECTION 6: Intellectual Property Rights (IPR) Cell         */}
            {/* ========================================================= */}
            <section
              id="sec-ipr"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Section 6 • Statutory IP Framework</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  6. Intellectual Property Rights (IPR) Cell
                </h2>
              </div>

              {/* Description */}
              <div id="sec-ipr-about" className="scroll-mt-56 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  The <strong className="text-slate-900 font-bold">Intellectual Property Rights (IPR) Cell</strong> of St. Ann’s College for Women, Gorantla, Guntur, was constituted on <strong className="text-slate-900 font-bold">1 September 2022</strong> to create awareness and promote the effective protection of intellectual property among faculty and students. The Cell encourages innovation, creativity, research ethics, academic integrity, and responsible use of intellectual property.
                </p>
                <p>
                  The IPR Cell provides awareness and guidance on patents, copyrights, trademarks, designs, plagiarism prevention, and related IPR procedures. It also supports research-oriented and innovation-driven academic activities in collaboration with departments and the IQAC.
                </p>
              </div>

              {/* Objectives */}
              <div id="sec-ipr-objectives" className="scroll-mt-56">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.iprCell?.objectives || [
                    "Create awareness of Intellectual Property Rights among faculty and students.",
                    "Promote innovation, creativity, and ethical research practices.",
                    "Create awareness of patents, copyrights, trademarks, and designs.",
                    "Guide faculty and students on IPR protection and filing procedures.",
                    "Promote academic integrity and prevention of plagiarism.",
                    "Encourage documentation and protection of innovative academic work."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Activities */}
              <div>
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Major Activities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.iprCell?.majorActivities || [
                    "IPR awareness programmes, workshops, and seminars.",
                    "Expert lectures and FDPs on patents, copyrights, and research ethics.",
                    "Awareness programmes on plagiarism and academic integrity.",
                    "Guidance on patent and copyright filing procedures.",
                    "Innovation, creativity, quiz, and poster-presentation activities.",
                    "Student project exhibitions and idea-presentation sessions.",
                    "Collaboration with IQAC, departments, experts, and academic institutions.",
                    "Maintenance of records and reports of IPR-related activities."
                  ]).map((act: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Outcomes */}
              <div id="sec-ipr-outcomes" className="scroll-mt-56 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Expected Outcomes</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(data?.iprCell?.expectedOutcomes || [
                    "Enhanced awareness of IPR and research ethics.",
                    "Greater protection of innovative and creative work.",
                    "Promotion of academic integrity and research culture.",
                    "Increased student participation in innovation and entrepreneurship.",
                    "Strengthening of institutional research and innovation practices."
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
                    <span>Annual Activity Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.iprCell?.activityReports?.length || 3} Reports Available
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
                      {(data?.iprCell?.activityReports || [
                        { year: "2025–2026", title: "IPR Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", title: "IPR Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2023–2024", title: "IPR Activity Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.fileUrl, rep.title)}
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

              {/* Intellectual Property Policy */}
              <div id="sec-ipr-policy" className="scroll-mt-56 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#002147]">Intellectual Property Policy</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {data?.iprCell?.policyDescription ||
                      "The institution recognizes Intellectual Property as an important component of academic, research, and innovation development. The IPR Cell facilitates awareness, documentation, protection, and ethical use of intellectual property generated through academic and research activities. Faculty and students are encouraged to protect their original work while maintaining confidentiality and adhering to institutional and ethical standards."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.iprCell?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Intellectual Property Policy Document")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-white hover:bg-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View Policy Document</span>
                </button>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 7: ED / Innovation & Start-Up Centre              */}
            {/* ========================================================= */}
            <section
              id="sec-edc"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <Rocket className="w-4 h-4 text-indigo-600" />
                  <span>Section 7 • Venture Incubation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  7. Entrepreneurship Development / Innovation &amp; Start-Up Centre
                </h2>
              </div>

              {/* Description & Vision */}
              <div id="sec-edc-about" className="scroll-mt-56 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong> promotes entrepreneurship, innovation, creativity, leadership, and self-employment among students. The Entrepreneurship Development / Innovation &amp; Start-Up Centre facilitates entrepreneurial learning, skill development, industry interaction, and awareness of start-up opportunities, contributing to employability and women empowerment.
                </p>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-blue-950 text-white space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Vision</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    {data?.entrepreneurshipCentre?.vision ||
                      "To nurture an entrepreneurial and innovation-oriented environment that empowers women students with creativity, leadership, business skills, and self-employment capabilities."}
                  </p>
                </div>
              </div>

              {/* Objectives */}
              <div id="sec-edc-objectives" className="scroll-mt-56">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span>Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.entrepreneurshipCentre?.objectives || [
                    "Promote entrepreneurial and innovative thinking among students.",
                    "Create awareness of start-ups, entrepreneurship, and government support schemes.",
                    "Develop leadership, communication, financial literacy, and business management skills.",
                    "Encourage innovative ideas, projects, prototypes, and business plans.",
                    "Facilitate interaction with entrepreneurs, industry experts, and professionals.",
                    "Promote women entrepreneurship and economic empowerment.",
                    "Strengthen employability through skill-based and industry-oriented learning."
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Activities */}
              <div>
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Major Activities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(data?.entrepreneurshipCentre?.majorActivities || [
                    "Entrepreneurship Awareness Programmes",
                    "Workshops, seminars, and training programmes",
                    "Business idea and business-plan competitions",
                    "Skill development and employability programmes",
                    "Financial literacy and entrepreneurship awareness",
                    "Interaction with entrepreneurs and industry experts",
                    "Innovation exhibitions and entrepreneurial activities",
                    "Awareness programmes on government schemes and funding opportunities",
                    "Add-on and certificate programmes related to entrepreneurship"
                  ]).map((act: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Engagement & Women Entrepreneurship */}
              <div id="sec-edc-women" className="scroll-mt-56 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="font-bold text-sm text-[#002147]">Industry &amp; Community Engagement</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {data?.entrepreneurshipCentre?.industryEngagement ||
                      "The Centre encourages collaboration with industries, entrepreneurs, professional bodies, and community organizations to provide practical exposure, internships, training, mentoring, and entrepreneurial learning opportunities."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50/70 to-rose-50/50 border border-pink-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-pink-900 font-bold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4 text-pink-600" />
                    <span>Focus Area</span>
                  </div>
                  <h4 className="font-bold text-sm text-pink-950">Women Entrepreneurship</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {data?.entrepreneurshipCentre?.womenEntrepreneurship ||
                      "As a women’s institution, St. Ann’s encourages students to explore self-employment, entrepreneurship, leadership, financial independence, and innovative career pathways through skill development and entrepreneurship awareness initiatives."}
                  </p>
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Expected Outcomes</span>
                </h3>
                <p className="text-xs text-slate-600">The Centre aims to develop:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(data?.entrepreneurshipCentre?.expectedOutcomes || [
                    "Entrepreneurial mindset and innovative thinking",
                    "Leadership and managerial competencies",
                    "Creativity and problem-solving skills",
                    "Start-up and self-employment awareness",
                    "Employability and professional skills",
                    "Confidence and economic empowerment among women students"
                  ]).map((outc: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-xs text-slate-700 font-medium">{outc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annual Activity Reports Table */}
              <div id="sec-edc-reports" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Annual Activity Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.entrepreneurshipCentre?.activityReports?.length || 3} Reports Available
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
                      {(data?.entrepreneurshipCentre?.activityReports || [
                        { year: "2025–2026", title: "ED Centre Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", title: "ED Centre Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2023–2024", title: "ED Centre Activity Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.fileUrl, rep.title)}
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

              {/* Policy */}
              <div id="sec-edc-policy" className="scroll-mt-56 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#002147]">Entrepreneurship Development / Innovation &amp; Start-Up Policy</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {data?.entrepreneurshipCentre?.policyDescription ||
                      "The Entrepreneurship Development / Innovation & Start-Up Policy of St. Ann’s College for Women, Gorantla, Guntur provides a framework for promoting entrepreneurship, innovation, creativity, and self-employment among students and faculty. The policy encourages entrepreneurial learning, skill development, mentoring, industry interaction, innovative idea development, and start-up awareness. It aims to create a supportive ecosystem that strengthens employability, innovation, leadership, and women entrepreneurship, in alignment with institutional quality enhancement practices."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.entrepreneurshipCentre?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Entrepreneurship Development / Innovation & Start-Up Policy")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-white hover:bg-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View Policy Document</span>
                </button>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 8: Institution Innovation Council (IIC)           */}
            {/* ========================================================= */}
            <section
              id="sec-iic"
              className="scroll-mt-56 bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
            >
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 mb-1">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Section 8 • Innovation &amp; Industry Collaboration</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  8. Institution Innovation Council (IIC) / Institution–Industry Cell
                </h2>
              </div>

              {/* About the Cell */}
              <div id="sec-iic-about" className="scroll-mt-56 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                <h3 className="text-base font-bold text-[#002147]">About the Cell</h3>
                <p>
                  The <strong className="text-slate-900 font-bold">Institution Innovation Council (IIC) / Institution–Industry Cell</strong> of St. Ann’s College for Women, Gorantla, Guntur promotes innovation, entrepreneurship, creativity, skill development, and industry-oriented learning among students and faculty. The Cell facilitates industry interaction, expert engagement, innovative projects, start-up awareness, incubation support, and academic–industry collaboration in association with the IQAC and academic departments.
                </p>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span>Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.iicCell?.objectives || [
                    "Promote innovation, creativity, and entrepreneurship",
                    "Develop problem-solving and design-thinking skills",
                    "Encourage innovative projects and prototypes",
                    "Strengthen industry–academia interaction",
                    "Promote start-up and incubation awareness",
                    "Facilitate research, consultancy, and skill development",
                    "Enhance employability and industry readiness"
                  ]).map((obj: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Activities */}
              <div id="sec-iic-activities" className="scroll-mt-56">
                <h3 className="text-base font-bold text-[#002147] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Key Activities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data?.iicCell?.keyActivities || [
                    "Innovation and entrepreneurship programmes",
                    "Workshops, seminars, FDPs, and expert lectures",
                    "Hackathons, idea competitions, and project exhibitions",
                    "Industry interaction and industrial visits",
                    "Start-up and incubation awareness programmes",
                    "Skill development and employability training",
                    "Industry-oriented projects and collaborations",
                    "MoUs and collaborative initiatives"
                  ]).map((act: string, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Expected Outcomes</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {data?.iicCell?.expectedOutcomes ||
                    "The Cell aims to foster an innovative and entrepreneurial mindset, enhance students' creativity, leadership, problem-solving and professional skills, and strengthen industry–academia collaboration and employability."}
                </p>
              </div>

              {/* IIC Annual Reports Table */}
              <div id="sec-iic-reports" className="scroll-mt-56 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#002147] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Annual Activity Reports</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {data?.iicCell?.activityReports?.length || 3} Reports Available
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
                      {(data?.iicCell?.activityReports || [
                        { year: "2025–2026", title: "IIC Activity Report 2025–2026", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2024–2025", title: "IIC Activity Report 2024–2025", fileUrl: "/documents/DefaultFile_1.pdf" },
                        { year: "2023–2024", title: "IIC Activity Report 2023–2024", fileUrl: "/documents/DefaultFile_1.pdf" }
                      ]).map((rep: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                          <td className="py-3.5 px-4 font-bold text-blue-900">{rep.year}</td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">{rep.title}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openPdfModal(rep.fileUrl, rep.title)}
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

              {/* IIC Policy */}
              <div id="sec-iic-policy" className="scroll-mt-56 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#002147]">IIC Policy</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {data?.iicCell?.policyDescription ||
                      "The Institution has formulated an Institution Innovation Council (IIC) Policy to foster a culture of innovation, entrepreneurship, research, creativity, and industry collaboration. The policy provides a framework for promoting innovative ideas, mentoring, prototype development, start-up awareness, industry interaction, incubation activities, and student participation in innovation-oriented programmes."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openPdfModal(data?.iicCell?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Institution Innovation Council (IIC) Policy")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-white hover:bg-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View IIC Policy →</span>
                </button>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
