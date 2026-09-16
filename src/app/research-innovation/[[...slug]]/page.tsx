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
  HeartHandshake,
  Trophy,
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

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* Left: Sticky Sidebar */}
          <aside className="lg:col-span-3">
            <AboutSidebar
              categories={RESEARCH_SIDEBAR_CATEGORIES}
              bannerTitle="Research & Innovation"
              bannerSubtitle="Sections on this Page"
              activeId={activeSectionId}
              onItemClick={(id) => setActiveSectionId(id)}
            />
          </aside>

          {/* Right: Data Elements / Sections */}
          <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
            
            {/* Top Subtext Box */}
            <SubtextBox>
              <p className="text-slate-800 font-medium leading-relaxed">
                At <strong className="text-blue-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong>, research and innovation foster academic excellence, creativity, critical thinking, and societal impact. Through a supportive research ecosystem, St. Ann’s promotes ethical research, emerging technologies, practical solutions, and community-oriented initiatives.
                <span className="block mt-2 text-slate-600 font-medium text-sm">
                  Research inspires discovery. Innovation transforms ideas into impact.
                </span>
              </p>
            </SubtextBox>

            {/* ============================================================ */}
            {/* OVERVIEW SECTION: About Research & Innovation at St. Ann's  */}
            {/* ============================================================ */}
            <section
              id="sec-about"
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
                  <FlaskConical className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    About Research &amp; Innovation at St. Ann’s
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  Institutional research ecosystem, intellectual inquiry, and societal impact.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                <div
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        About Research &amp; Innovation
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Institutional Ecosystem &amp; Academic Excellence</p>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    At <strong className="text-slate-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong>, research and innovation foster academic excellence, creativity, critical thinking and societal impact. The College encourages faculty and students to engage in research, innovative projects, interdisciplinary collaboration, publications and knowledge sharing.
                  </p>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    Through a supportive research ecosystem, St. Ann’s promotes ethical research, emerging technologies, practical solutions and community-oriented initiatives, nurturing women researchers and innovators prepared to contribute to a knowledge-driven and <strong className="text-slate-900 font-bold">Viksit Bharat</strong>.
                  </p>

                  {/* Slogan box without quotation marks */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 text-center mt-2">
                    <p className="text-sm sm:text-base font-bold text-amber-900">
                      Research inspires discovery. Innovation transforms ideas into impact.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 1: Research Promotion, Ethics & Funding Policy       */}
            {/* ============================================================ */}
            <section
              id="sec-policy"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-indigo-300 shrink-0" />
                    <div>
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        1. Research Promotion, Ethics &amp; Funding Policy
                      </h2>
                      <p
                        className="text-sm font-medium mt-0.5 transition-colors duration-200"
                        style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Institutional framework for ethics, integrity, funding, and quality research culture.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPdfModal(data?.researchPolicy?.policyFileUrl || "/documents/research/1.Rsearch Promotion & Development Policy.pdf", "Research Promotion, Ethics & Funding Policy")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold text-xs shadow-sm shrink-0 cursor-pointer transition-all self-start sm:self-auto"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View PDF Research Policy</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                <div
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. Research Promotion &amp; Ethics Policy Framework
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Integrity, transparency, and responsible research culture</p>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    At <strong className="text-slate-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong>, research is promoted as a key component of academic excellence, innovation, and societal development. The College encourages faculty and students to undertake meaningful, multidisciplinary, and socially relevant research.
                  </p>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The policy provides a framework for research promotion, ethical conduct, plagiarism prevention, intellectual property, funding, publications, and collaborations, ensuring integrity, transparency, accountability, and originality in all research activities.
                  </p>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The College is committed to fostering a responsible research culture that supports innovation, higher studies, women’s empowerment, and community development.
                  </p>

                  {/* Slogan box without quotation marks */}
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 text-center mt-2">
                    <p className="text-sm sm:text-base font-bold text-amber-900">
                      Research with Integrity • Innovation with Purpose • Knowledge for Society
                    </p>
                  </div>
                </div>

                {/* PDF Banner */}
                <div
                  id="sec-policy-doc"
                  className="scroll-mt-52 p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-[#002147] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <FileText className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Official Institutional Research Policy Document</h4>
                      <p className="text-xs text-blue-200/90">Complete guidelines on ethics, seed grants, publication rewards &amp; IPR procedures.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPdfModal(data?.researchPolicy?.policyFileUrl || "/documents/research/1.Rsearch Promotion & Development Policy.pdf", "Research Promotion, Ethics & Funding Policy")}
                    className="px-4 py-2 bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View PDF Research Policy</span>
                  </button>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 2: Research & Development Cell (RDC)                */}
            {/* ============================================================ */}
            <section
              id="sec-rdc"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="h-6 w-6 text-indigo-300 shrink-0" />
                    <div>
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        2. Research &amp; Development Cell (RDC)
                      </h2>
                      <p
                        className="text-sm font-medium mt-0.5 transition-colors duration-200"
                        style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                      >
                        Nurturing research aptitude, funded projects, consultancy, and interdisciplinary collaboration.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPdfModal(data?.rdc?.rdcPolicyFileUrl || "/documents/research/1.Rsearch Promotion & Development Policy.pdf", "RDC Policy & Operating Guidelines")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold text-xs shadow-sm shrink-0 cursor-pointer transition-all self-start sm:self-auto"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View PDF: RDC</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                {/* 2.a About RDC */}
                <div
                  id="sec-rdc-about"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <FlaskConical className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. About Research &amp; Development Cell (RDC)
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Institutional Hub for Research &amp; Development</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The <strong className="text-slate-900 font-bold">Research &amp; Development Cell (RDC)</strong> of St. Ann’s College for Women, Gorantla, Guntur promotes a vibrant culture of research, innovation, consultancy, collaboration, and academic excellence in alignment with UGC guidelines, NEP-2020, and institutional quality initiatives.
                  </p>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The RDC facilitates and monitors research activities, encourages ethical research practices, supports publications and funded projects, and provides opportunities for faculty and students to engage in innovative, interdisciplinary, and socially relevant research.
                  </p>
                </div>

                {/* 2.b Vision & Mission */}
                <div
                  id="sec-rdc-vision"
                  className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                  style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                >
                  <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                      <Target className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        b. Vision &amp; Mission
                      </h4>
                      <p className="text-xs text-blue-600/80 font-medium">Guiding philosophy for institutional research</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-500" /> Vision
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {data?.rdc?.vision || "To foster a dynamic research ecosystem that promotes innovation, knowledge creation, academic excellence, and societal transformation."}
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                        <Rocket className="h-4 w-4 text-emerald-600" /> Mission
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700 font-medium leading-relaxed">
                        {(data?.rdc?.mission || [
                          "Nurture research aptitude among faculty and students.",
                          "Promote innovative and socially relevant research.",
                          "Strengthen research collaborations and consultancy.",
                          "Uphold research integrity and ethical standards."
                        ]).map((m: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2.c Key Objectives */}
                <div
                  id="sec-rdc-objectives"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        c. Key Objectives
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Strategic institutional focus areas</p>
                    </div>
                  </div>
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
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2.d Major Initiatives */}
                <div
                  id="sec-rdc-initiatives"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        d. Major Initiatives
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Core academic enablers &amp; capacity-building</p>
                    </div>
                  </div>
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
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{init}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2.e Institutional Commitment */}
                <div
                  id="sec-rdc-commitment"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <HeartHandshake className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        e. Institutional Commitment
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Responsible and collaborative research ecosystem</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    {data?.rdc?.commitment || "St. Ann’s College for Women is committed to building a responsible, innovative, and collaborative research ecosystem that contributes to academic excellence, women’s empowerment, community development, and sustainable societal progress."}
                  </p>
                  <div className="pt-1">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                      Research • Innovation • Integrity • Impact
                    </span>
                  </div>
                </div>

                {/* 2.f RDC Annual Reports Table */}
                <div id="sec-rdc-reports" className="scroll-mt-52 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-outfit text-[#002147] font-extrabold text-base md:text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>f. RDC Annual Activity Reports</span>
                    </h4>
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
                          { year: "2025–2026", title: "RDC Activity Report 2025–2026", fileUrl: "/documents/research/RDC Acivity Report 2025-2026.pdf" },
                          { year: "2024–2025", title: "RDC Activity Report 2024–2025", fileUrl: "/documents/research/RDC Acitivty Report 2024-2025.pdf" }
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
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 3: Research Infrastructure                           */}
            {/* ============================================================ */}
            <section
              id="sec-infra"
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
                  <Building2 className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    3. Research Infrastructure
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  State-of-the-art departmental laboratories, digital resources, library, and computational setups.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                <div
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <Microscope className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        Research &amp; Experimental Facilities
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Comprehensive infrastructure supporting faculty &amp; student inquiry</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    {data?.infrastructure?.description ||
                      "St. Ann’s College for Women, Gorantla, Guntur provides a supportive academic environment for research, innovation, experimentation and knowledge development. The institution utilizes its departmental laboratories, library resources, digital facilities and ICT infrastructure to facilitate faculty and student research activities."}
                  </p>
                </div>

                {/* 6 Facility Cards */}
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
                        className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 flex items-center justify-center mb-4">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base mb-2">{fac.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed text-justify">{fac.description}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Active Campus Facility</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 4: Research Publications & Scholarly Contributions  */}
            {/* ============================================================ */}
            <section
              id="sec-publications"
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
                  <BookOpen className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    4. Research Publications &amp; Scholarly Contributions
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  Peer-reviewed journal articles, conference proceedings, authored books, and published chapters.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                {/* 4.a Publications */}
                <div
                  id="sec-pub-faculty-students"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. Faculty &amp; Students Publications
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Year-wise Faculty &amp; Students Peer-Reviewed Publications</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    St. Ann’s College for Women, Gorantla, Guntur promotes quality research and scholarly contributions by faculty members and students. The institution encourages publication of research findings in peer-reviewed, UGC-recognized, Scopus/Web of Science indexed, and other reputed journals, subject to applicable norms.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs mt-2">
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
                          { year: "2025–2026", facultyFileUrl: "/documents/research/Faculty Research Publications -2025-2026.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
                          { year: "2024–2025", facultyFileUrl: "/documents/research/Faculty Reearch Publications - 2024-2025.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" }
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

                {/* 4.b Paper Presentations */}
                <div
                  id="sec-pub-presentations"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        b. Faculty &amp; Student Paper Presentations
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Conferences, Seminars, Symposiums &amp; Workshops</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The College encourages faculty members and students to disseminate their research findings through paper presentations at national and international conferences, seminars, symposiums, workshops, and academic forums. These activities provide opportunities for scholarly exchange, professional development, and wider dissemination of research outcomes.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs mt-2">
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
                          { year: "2025–2026", facultyFileUrl: "/documents/research/Faculty Research in COnfenrece 2025-2026.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" },
                          { year: "2024–2025", facultyFileUrl: "/documents/research/Faculty Research in COnfenrece 2024-2025.pdf", studentFileUrl: "/documents/DefaultFile_1.pdf" }
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

                {/* 4.c Journals, Books & Book Chapters */}
                <div
                  id="sec-pub-books"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100/60 text-emerald-600">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        c. Journals, Books &amp; Book Chapters
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Year-wise Authored Books &amp; Published Chapters</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
                    Faculty members of St. Ann’s College for Women contribute to academic and scholarly development through:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-2">• Research Articles in reputed and indexed journals</li>
                    <li className="flex items-center gap-2">• Textbooks and Reference Books</li>
                    <li className="flex items-center gap-2">• Edited Books and ISBN Publications</li>
                    <li className="flex items-center gap-2">• National &amp; International Book Chapters</li>
                    <li className="flex items-center gap-2">• Departmental Journals and Academic Magazines</li>
                  </ul>
                  <p className="text-xs text-slate-500 italic">
                    The institution encourages scholarly writing, publication, knowledge sharing, and dissemination of research across diverse disciplines.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs mt-2">
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
                          { year: "2025–2026", title: "Faculty Journals, Books & Book Chapters 2025–2026", fileUrl: "/documents/research/Faculty Publications in Books 2025-2026.pdf" },
                          { year: "2024–2025", title: "Faculty Journals, Books & Book Chapters 2024–2025", fileUrl: "/documents/research/Faculty publications in Books 2024-2025.pdf" }
                        ]).map((book: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 text-center font-bold text-slate-500">{idx + 1}</td>
                            <td className="py-3.5 px-4 font-bold text-blue-900">{book.year}</td>
                            <td className="py-3.5 px-4 text-slate-700 font-medium">{book.title}</td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => openPdfModal(book.fileUrl, book.title)}
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
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 5: Patents / Start-ups / Innovations                */}
            {/* ============================================================ */}
            <section
              id="sec-patents"
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
                  <Lightbulb className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    5. Patents / Start-ups / Innovations
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  Fostering creativity, student project expos, prototype synthesis, and intellectual property.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                <div
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Rocket className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        Innovation, Prototyping &amp; Incubation Ecosystem
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Creative problem solving and intellectual property generation</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    {data?.patentsAndInnovations?.description ||
                      "St. Ann’s College for Women, Gorantla, Guntur promotes innovation, creativity, entrepreneurship, and problem-solving among faculty and students. The institution provides opportunities to develop innovative ideas, projects, prototypes, start-up concepts, and intellectual property."}
                  </p>
                </div>

                {/* Major Initiatives */}
                <div
                  id="sec-patents-initiatives"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. Major Innovation Initiatives
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Ideation, project exhibitions, and incubation support</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(data?.patentsAndInnovations?.initiatives || [
                      "Innovation and Idea Presentation Programmes",
                      "Student Project Exhibitions and Project Expos",
                      "Entrepreneurship & Start-up Awareness Programmes",
                      "Patent & IPR Awareness Programmes",
                      "Innovation and Prototype Development Activities",
                      "Incubation and Entrepreneurship Support"
                    ]).map((init: string, i: number) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{init}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Year-wise Innovation & IPR Activities Table */}
                <div id="sec-patents-matrix" className="scroll-mt-52 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-outfit text-[#002147] font-extrabold text-base md:text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>b. Year-wise Innovation &amp; IPR Activities</span>
                    </h4>
                  </div>

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
                          { year: "2025–2026", innovationFileUrl: "/documents/research/Patents 2025-2026.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" },
                          { year: "2024–2025", innovationFileUrl: "/documents/research/Patents2024-2025.pdf", startupFileUrl: "/documents/DefaultFile_1.pdf", patentIprFileUrl: "/documents/DefaultFile_1.pdf" }
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
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 6: Intellectual Property Rights (IPR) Cell          */}
            {/* ============================================================ */}
            <section
              id="sec-ipr"
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
                  <ShieldCheck className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    6. Intellectual Property Rights (IPR) Cell
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  Constituted on 1 September 2022 to protect inventions and nurture ethical research practices.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                {/* 6.a About IPR Cell */}
                <div
                  id="sec-ipr-about"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. About IPR Cell (Est. 01-09-2022)
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Protection of intellectual assets, patents, and copyright literacy</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The <strong className="text-slate-900 font-bold">Intellectual Property Rights (IPR) Cell</strong> of St. Ann’s College for Women, Gorantla, Guntur, was constituted on <strong className="text-slate-900 font-bold">1 September 2022</strong> to create awareness and promote the effective protection of intellectual property among faculty and students. The Cell encourages innovation, creativity, research ethics, academic integrity, and responsible use of intellectual property.
                  </p>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The IPR Cell provides awareness and guidance on patents, copyrights, trademarks, designs, plagiarism prevention, and related IPR procedures. It also supports research-oriented and innovation-driven academic activities in collaboration with departments and the IQAC.
                  </p>
                </div>

                {/* 6.b Objectives */}
                <div
                  id="sec-ipr-objectives"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100/60 text-emerald-600">
                      <Target className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        b. Objectives
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Core IP awareness and filing directives</p>
                    </div>
                  </div>
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
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6.c Major Activities */}
                <div
                  className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        c. Major Activities
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Workshops, seminars, and FDP initiatives</p>
                    </div>
                  </div>
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
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6.d Expected Outcomes */}
                <div
                  id="sec-ipr-outcomes"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        d. Expected Outcomes
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Institutional innovation and ethical research impact</p>
                    </div>
                  </div>
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
                        <span className="text-xs text-slate-700 font-medium leading-relaxed">{outc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6.e Annual Reports */}
                <div id="sec-ipr-reports" className="scroll-mt-52 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-outfit text-[#002147] font-extrabold text-base md:text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>e. Annual Activity Reports</span>
                    </h4>
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

                {/* 6.f Intellectual Property Policy */}
                <div
                  id="sec-ipr-policy"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-100/60 text-purple-600">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        f. Intellectual Property Policy
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Statutory guidelines on IP ownership and procedures</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    {data?.iprCell?.policyDescription ||
                      "The institution recognizes Intellectual Property as an important component of academic, research, and innovation development. The IPR Cell facilitates awareness, documentation, protection, and ethical use of intellectual property generated through academic and research activities. Faculty and students are encouraged to protect their original work while maintaining confidentiality and adhering to institutional and ethical standards."}
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => openPdfModal(data?.iprCell?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Intellectual Property Policy Document")}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-white hover:bg-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>View Policy Document</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 7: ED / Innovation & Start-Up Centre                */}
            {/* ============================================================ */}
            <section
              id="sec-edc"
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
                  <Rocket className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    7. Entrepreneurship Development / Innovation &amp; Start-Up Centre
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  Nurturing entrepreneurial learning, skill development, industry interaction, and women empowerment.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                {/* 7.a Description & Vision */}
                <div
                  id="sec-edc-about"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                      <Rocket className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. About the Centre &amp; Vision
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Fostering women entrepreneurs and venture creation</p>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    <strong className="text-slate-900 font-bold">St. Ann’s College for Women, Gorantla, Guntur</strong> promotes entrepreneurship, innovation, creativity, leadership, and self-employment among students. The Entrepreneurship Development / Innovation &amp; Start-Up Centre facilitates entrepreneurial learning, skill development, industry interaction, and awareness of start-up opportunities, contributing to employability and women empowerment.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-blue-950 text-white space-y-1.5">
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

                {/* 7.b Objectives */}
                <div
                  id="sec-edc-objectives"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                      <Target className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        b. Objectives
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Empowering student founders &amp; self-employment pathways</p>
                    </div>
                  </div>
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
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7.c Major Activities */}
                <div
                  className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        c. Major Activities
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Workshops, camps, pitch contests, and masterclasses</p>
                    </div>
                  </div>
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
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7.d Industry Engagement & Women Entrepreneurship */}
                <div id="sec-edc-women" className="scroll-mt-52 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div
                    className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                    style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                  >
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-outfit text-blue-700 font-extrabold text-sm uppercase tracking-wider">
                          Industry &amp; Community Engagement
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">Practical exposure &amp; mentoring networks</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">
                      {data?.entrepreneurshipCentre?.industryEngagement ||
                        "The Centre encourages collaboration with industries, entrepreneurs, professional bodies, and community organizations to provide practical exposure, internships, training, mentoring, and entrepreneurial learning opportunities."}
                    </p>
                  </div>

                  <div
                    className="border-2 border-pink-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                    style={{ backgroundColor: "#fdf2f8" }}
                  >
                    <div className="flex items-center gap-3 border-b border-pink-200/60 pb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 border border-pink-200 text-pink-700">
                        <Users className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="font-outfit text-pink-950 font-extrabold text-sm uppercase tracking-wider">
                          Women Entrepreneurship
                        </h4>
                        <p className="text-[11px] text-pink-700/80 font-medium">Empowerment, financial independence &amp; leadership</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify">
                      {data?.entrepreneurshipCentre?.womenEntrepreneurship ||
                        "As a women’s institution, St. Ann’s encourages students to explore self-employment, entrepreneurship, leadership, financial independence, and innovative career pathways through skill development and entrepreneurship awareness initiatives."}
                    </p>
                  </div>
                </div>

                {/* 7.e Expected Outcomes */}
                <div
                  className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        e. Expected Outcomes
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Competency development and economic empowerment</p>
                    </div>
                  </div>
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

                {/* 7.f Annual Reports Table */}
                <div id="sec-edc-reports" className="scroll-mt-52 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-outfit text-[#002147] font-extrabold text-base md:text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>f. Annual Activity Reports</span>
                    </h4>
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

                {/* 7.g Policy */}
                <div
                  id="sec-edc-policy"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-100/60 text-purple-600">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        g. Entrepreneurship Development / Innovation &amp; Start-Up Policy
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Policy framework promoting entrepreneurship &amp; innovation</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    {data?.entrepreneurshipCentre?.policyDescription ||
                      "The Entrepreneurship Development / Innovation & Start-Up Policy of St. Ann’s College for Women, Gorantla, Guntur provides a framework for promoting entrepreneurship, innovation, creativity, and self-employment among students and faculty. The policy encourages entrepreneurial learning, skill development, mentoring, industry interaction, innovative idea development, and start-up awareness. It aims to create a supportive ecosystem that strengthens employability, innovation, leadership, and women entrepreneurship, in alignment with institutional quality enhancement practices."}
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => openPdfModal(data?.entrepreneurshipCentre?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Entrepreneurship Development / Innovation & Start-Up Policy")}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-white hover:bg-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>View Policy Document</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 8: Institution Innovation Council (IIC)             */}
            {/* ============================================================ */}
            <section
              id="sec-iic"
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
                  <Compass className="h-6 w-6 text-indigo-300 shrink-0" />
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                  >
                    8. Institution Innovation Council (IIC) / Institution–Industry Cell
                  </h2>
                </div>
                <p
                  className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                  style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                >
                  Driving innovation ecosystem, incubation support, MoUs, and academic-industry linkages.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-6" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                {/* 8.a About the Cell */}
                <div
                  id="sec-iic-about"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                      <Compass className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        a. About the Cell
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Innovation ecosystem, hackathons, and industry linkages</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    The <strong className="text-slate-900 font-bold">Institution Innovation Council (IIC) / Institution–Industry Cell</strong> of St. Ann’s College for Women, Gorantla, Guntur promotes innovation, entrepreneurship, creativity, skill development, and industry-oriented learning among students and faculty. The Cell facilitates industry interaction, expert engagement, innovative projects, start-up awareness, incubation support, and academic–industry collaboration in association with the IQAC and academic departments.
                  </p>
                </div>

                {/* 8.b Objectives */}
                <div
                  className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-100/60 text-purple-600">
                      <Target className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        b. Objectives
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Design thinking, problem-solving, and industry readiness</p>
                    </div>
                  </div>
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
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8.c Key Activities */}
                <div
                  id="sec-iic-activities"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        c. Key Activities
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Hackathons, MoUs, and industrial exposure</p>
                    </div>
                  </div>
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
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8.d Expected Outcomes */}
                <div
                  className="border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/60 text-amber-600">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        d. Expected Outcomes
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Collaborative growth and entrepreneurship acceleration</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                    {data?.iicCell?.expectedOutcomes ||
                      "The Cell aims to foster an innovative and entrepreneurial mindset, enhance students' creativity, leadership, problem-solving and professional skills, and strengthen industry–academia collaboration and employability."}
                  </p>
                </div>

                {/* 8.e Annual Reports Table */}
                <div id="sec-iic-reports" className="scroll-mt-52 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-outfit text-[#002147] font-extrabold text-base md:text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>e. Annual Activity Reports</span>
                    </h4>
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

                {/* 8.f IIC Policy */}
                <div
                  id="sec-iic-policy"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-100/60 text-purple-600">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        f. Institution Innovation Council (IIC) Policy
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">Operating framework for incubation &amp; industry collaboration</p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                    {data?.iicCell?.policyDescription ||
                      "The Institution has formulated an Institution Innovation Council (IIC) Policy to foster a culture of innovation, entrepreneurship, research, creativity, and industry collaboration. The policy provides a framework for promoting innovative ideas, mentoring, prototype development, start-up awareness, industry interaction, incubation activities, and student participation in innovation-oriented programmes."}
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => openPdfModal(data?.iicCell?.policyFileUrl || "/documents/DefaultFile_1.pdf", "Institution Innovation Council (IIC) Policy")}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147] text-white hover:bg-blue-900 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>View IIC Policy →</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
