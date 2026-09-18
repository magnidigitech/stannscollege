"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Briefcase,
  Globe2,
  Handshake,
  ChevronRight,
  ChevronLeft,
  Eye,
  Download,
  BookOpen,
  Building2,
  GraduationCap,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  Sparkles,
  Layers,
  Search,
  ExternalLink,
  Maximize2,
  Calendar,
  Compass,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Laptop,
  Coins,
  MessageSquare,
  Languages,
  HeartHandshake,
  UserCheck,
  Copy,
  Check,
  X,
  FileCheck2,
  Filter,
  ChevronDown
} from "lucide-react";
import {
  tpoOfficer,
  annualReportsList,
  placementAboutDoc,
  companyWiseStatsImages,
  programmeWiseStatsPdfs,
  recruitersList,
  skillDomains,
  apssdcSupportAreas,
  competitiveExamsList
} from "./staticData";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";

export const PLACEMENTS_SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "sec-tp-cell",
    title: "I. Training & Placement Cell",
    sectionId: "sec-tp-cell",
    items: [
      { text: "About Training & Placement Cell", id: "sec-about-cell" },
      { text: "Placements & Recruitment", id: "sec-placements-recruitment" },
      { text: "APSSDC", id: "sec-apssdc" },
      { text: "Skill Development Training Areas", id: "sec-skill-development-areas" },
      { text: "Internships & Industry Exposure", id: "sec-internships-industry-exposure" },
      { text: "Competitive Exam Coaching", id: "sec-competitive-exam-coaching" },
    ]
  },
  {
    catSlug: "sec-industry-linkages",
    title: "II. Industry Linkages",
    sectionId: "sec-industry-linkages",
    items: [
      { text: "Industry & Professional Engagement", id: "sec-industry-professional-engagement" },
      { text: "MoUs – Memoranda of Understanding", id: "sec-mous" },
    ]
  },
  {
    catSlug: "sec-global-outreach",
    title: "III. Internalization & Global Outreach",
    sectionId: "sec-global-outreach",
    items: [
      { text: "International Collaborations & Global Engagement", id: "sec-international-collaborations-global-engagement" }
    ]
  }
];

// Slug to Element ID mapping
const slugToSectionMap: Record<string, string> = {
  "about-cell": "sec-about-cell",
  "placements-recruitment": "sec-placements-recruitment",
  "apssdc": "sec-apssdc",
  "skill-development-areas": "sec-skill-development-areas",
  "internships-industry-exposure": "sec-internships-industry-exposure",
  "competitive-exam-coaching": "sec-competitive-exam-coaching",
  "industry-professional-engagement": "sec-industry-professional-engagement",
  "mous": "sec-mous",
  "international-collaborations-global-engagement": "sec-international-collaborations-global-engagement",

  // Aliases
  "annual-reports": "sec-about-cell",
  "placement-statistics": "sec-placements-recruitment",
  "recruitment-drives": "sec-placements-recruitment",
  "placement-partnerships": "sec-placements-recruitment",
  "skill-development": "sec-skill-development-areas",
  "soft-skills": "sec-skill-development-areas",
  "career-guidance": "sec-skill-development-areas",
  "entrepreneurship": "sec-skill-development-areas",
  "capacity-building": "sec-skill-development-areas",
  "alumni-support": "sec-skill-development-areas",
  "training-calendar": "sec-skill-development-areas",
  "internships-exposure": "sec-internships-industry-exposure",
  "competitive-coaching": "sec-competitive-exam-coaching",
  "industry-partnerships": "sec-industry-professional-engagement",
  "internships-apprenticeships": "sec-industry-professional-engagement",
  "mous-agreements": "sec-mous",
  "mou-activities": "sec-mous",
  "csr-initiatives": "sec-industry-professional-engagement",
  "industry-placement-partnerships": "sec-industry-professional-engagement",
  "certifications": "sec-industry-professional-engagement",
  "expert-lectures": "sec-industry-professional-engagement",
  "industrial-visits": "sec-industry-professional-engagement",
  "skill-training": "sec-skill-development-areas",
  "employability-activities": "sec-apssdc",
  "international-collaborations": "sec-international-collaborations-global-engagement",
  "internationalization-policy": "sec-international-collaborations-global-engagement",
  "accreditations-memberships": "sec-international-collaborations-global-engagement",
  "global-alumni": "sec-international-collaborations-global-engagement",
  "global-research": "sec-international-collaborations-global-engagement",
  "student-faculty-exchange": "sec-international-collaborations-global-engagement",
  "webinars-conferences": "sec-international-collaborations-global-engagement",
  "cross-cultural-learning": "sec-international-collaborations-global-engagement"
};

// Rich Interactive Recruiter Items with Distinct Monograms & Categories
const RICH_RECRUITERS = [
  { id: "tcs", name: "Tata Consultancy Services", short: "TCS", sector: "IT & Digital Services", roles: "Software Trainee / Associate", color: "from-blue-900 to-indigo-950", tag: "IT Services" },
  { id: "infosys", name: "Infosys Limited", short: "INF", sector: "IT & Enterprise Consulting", roles: "Systems Engineer Trainee", color: "from-sky-700 to-blue-900", tag: "IT Services" },
  { id: "wipro", name: "Wipro Technologies", short: "WIP", sector: "Cloud & Digital Solutions", roles: "Project Engineer / Analyst", color: "from-emerald-700 to-teal-900", tag: "IT Services" },
  { id: "capgemini", name: "Capgemini", short: "CAP", sector: "Global IT Services", roles: "Senior Analyst / Tech Associate", color: "from-blue-600 to-indigo-800", tag: "IT Services" },
  { id: "techm", name: "Tech Mahindra", short: "TM", sector: "Telecom & Software Solutions", roles: "Associate Software Engineer", color: "from-rose-700 to-red-900", tag: "IT Services" },
  { id: "cts", name: "Cognizant Technology Solutions", short: "CTS", sector: "Digital Transformation", roles: "Programmer Analyst Trainee", color: "from-blue-800 to-cyan-900", tag: "IT Services" },
  { id: "accenture", name: "Accenture", short: "ACN", sector: "Strategy & Technology", roles: "Application Development Associate", color: "from-purple-800 to-indigo-950", tag: "IT Services" },
  { id: "hcl", name: "HCL Technologies", short: "HCL", sector: "IT Infrastructure & Cloud", roles: "Graduate Trainee Engineer", color: "from-blue-700 to-blue-950", tag: "IT Services" },
  { id: "icici", name: "ICICI Bank", short: "ICICI", sector: "Banking & Financial Services", roles: "Relationship Manager / Officer", color: "from-amber-700 to-orange-900", tag: "Banking & Finance" },
  { id: "hdfc", name: "HDFC Bank", short: "HDFC", sector: "Retail & Corporate Banking", roles: "Branch Operations Executive", color: "from-blue-900 to-sky-950", tag: "Banking & Finance" },
  { id: "hetero", name: "Hetero Drugs Ltd.", short: "HET", sector: "Pharmaceuticals & Healthcare", roles: "QC / QA Trainee Analyst", color: "from-teal-800 to-emerald-950", tag: "Pharma & Science" },
  { id: "divis", name: "Divi's Laboratories", short: "DIV", sector: "Life Sciences & Biotech", roles: "Chemist / Research Associate", color: "from-indigo-800 to-slate-900", tag: "Pharma & Science" },
  { id: "genpact", name: "Genpact", short: "GEN", sector: "Analytics & Digital Operations", roles: "Process Associate / Finance", color: "from-amber-600 to-red-900", tag: "EdTech & Analytics" },
  { id: "sutherland", name: "Sutherland Global", short: "SUTH", sector: "Customer Experience & ITES", roles: "Associate / Digital Support", color: "from-blue-700 to-indigo-900", tag: "EdTech & Analytics" },
  { id: "omega", name: "Omega Healthcare", short: "OMG", sector: "Healthcare IT & RCM", roles: "Medical Coding Trainee", color: "from-cyan-800 to-blue-950", tag: "Pharma & Science" },
  { id: "chaitanya", name: "Sri Chaitanya Institutions", short: "SCI", sector: "Academic & EdTech", roles: "Faculty Trainee / Coordinator", color: "from-red-800 to-amber-950", tag: "EdTech & Analytics" }
];

interface PlacementsClientPortalProps {
  activeSlug?: string;
  initialSections?: any[];
  galleryImages?: any[];
  placementsData?: any;
  placementYearlyStats?: any[];
}

export default function PlacementsClientPortal({
  activeSlug: initialSlug = "",
  placementsData
}: PlacementsClientPortalProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-about-cell");
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string } | null>(null);
  const [galleryModal, setGalleryModal] = useState<{ title: string; category: string } | null>(null);

  const currentTpo = placementsData?.tpoOfficer || tpoOfficer;
  const currentRecruitersList = placementsData?.recruiters || RICH_RECRUITERS;
  const currentAnnualReports = placementsData?.annualReports || annualReportsList;

  // Dynamic Company-wise and Programme-wise Statistics from Sanity with Fallbacks
  const liveCompanyStats = useMemo(() => {
    if (placementsData?.statistics?.companyWiseStats && placementsData.statistics.companyWiseStats.length > 0) {
      return placementsData.statistics.companyWiseStats;
    }
    return [
      { year: "2025-2026", title: "Company-wise Placed Students 2025–2026", fileUrl: "/documents/placements/Students palced company wise data 2025-2026.png" },
      { year: "2024-2025", title: "Placement Statistics Summary 2024–2025", fileUrl: "/documents/placements/2024-2025 Placement statisitcs.png" }
    ];
  }, [placementsData]);

  const liveProgrammeStats = useMemo(() => {
    if (placementsData?.statistics?.programmeWiseStats && placementsData.statistics.programmeWiseStats.length > 0) {
      return placementsData.statistics.programmeWiseStats;
    }
    return [
      { year: "2025-2026", title: "Programme-wise Placement Statistics 2025–2026", fileUrl: "/documents/placements/Programmewsie palcement statitics 2025-2026.pdf" },
      { year: "2024-2025", title: "Programme-wise Placement Statistics 2024–2025", fileUrl: "/documents/placements/Programme Wise Placement statisicts 2024-2025.pdf" }
    ];
  }, [placementsData]);

  const availableStatsYears = useMemo(() => {
    const yearsSet = new Set<string>();
    liveCompanyStats.forEach((s: any) => s.year && yearsSet.add(s.year.trim()));
    liveProgrammeStats.forEach((s: any) => s.year && yearsSet.add(s.year.trim()));
    if (yearsSet.size === 0) {
      yearsSet.add("2025-2026");
      yearsSet.add("2024-2025");
    }
    return Array.from(yearsSet);
  }, [liveCompanyStats, liveProgrammeStats]);

  // Year tabs for stats and MoUs
  const [statsYear, setStatsYear] = useState<string>("2025-2026");
  const [mouYear, setMouYear] = useState<"2025-2026" | "2024-2025">("2025-2026");

  // Keep statsYear valid if availableStatsYears updates
  useEffect(() => {
    if (availableStatsYears.length > 0 && !availableStatsYears.includes(statsYear)) {
      setStatsYear(availableStatsYears[0]);
    }
  }, [availableStatsYears, statsYear]);

  const currentCompanyStat = useMemo(() => {
    return (
      liveCompanyStats.find(
        (s: any) => s.year?.trim() === statsYear || s.year?.replace("–", "-") === statsYear.replace("–", "-")
      ) ||
      liveCompanyStats[0] || {
        title: `Company-wise Placed Students ${statsYear}`,
        fileUrl: "/documents/placements/Students palced company wise data 2025-2026.png"
      }
    );
  }, [liveCompanyStats, statsYear]);

  const currentProgrammeStat = useMemo(() => {
    return (
      liveProgrammeStats.find(
        (s: any) => s.year?.trim() === statsYear || s.year?.replace("–", "-") === statsYear.replace("–", "-")
      ) ||
      liveProgrammeStats[0] || {
        title: `Programme-wise Placement Statistics ${statsYear}`,
        fileUrl: "/documents/placements/Programmewsie palcement statitics 2025-2026.pdf"
      }
    );
  }, [liveProgrammeStats, statsYear]);

  // Recruiter Showcase Slider State
  const [recruiterFilter, setRecruiterFilter] = useState<string>("all");
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isRecruiterPaused, setIsRecruiterPaused] = useState<boolean>(false);

  // Contact Modal & Copy State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copySingle = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAllModal = () => {
    const contactText = `${currentTpo.name}\n${currentTpo.designation}, ${currentTpo.institution}\nMobile: ${currentTpo.mobile}\nLandline: ${currentTpo.landline}\nPlacement Email: ${currentTpo.placementEmail}\nInstitution Email: ${currentTpo.institutionEmail}`;
    navigator.clipboard.writeText(contactText);
    setCopiedField("all");
    setTimeout(() => setCopiedField(null), 2500);
  };

  const filteredRecruiters = useMemo(() => {
    if (recruiterFilter === "all") return currentRecruitersList;
    return currentRecruitersList.filter((r: any) => r.tag === recruiterFilter);
  }, [recruiterFilter, currentRecruitersList]);

  // Handle slide pagination
  const itemsPerPage = 4;
  const maxSlideIndex = Math.max(0, Math.ceil(filteredRecruiters.length / itemsPerPage) - 1);

  // Auto slide recruiters every 3.5 seconds
  useEffect(() => {
    if (isRecruiterPaused || maxSlideIndex <= 0) return;
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [isRecruiterPaused, maxSlideIndex]);

  const currentSlideRecruiters = useMemo(() => {
    const start = sliderIndex * itemsPerPage;
    return filteredRecruiters.slice(start, start + itemsPerPage);
  }, [filteredRecruiters, sliderIndex]);

  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  // Track active section on user scroll
  useEffect(() => {
    const allSectionIds = [
      "sec-tp-cell",
      "sec-about-cell",
      "sec-placements-recruitment",
      "sec-apssdc",
      "sec-skill-development-areas",
      "sec-internships-industry-exposure",
      "sec-competitive-exam-coaching",
      "sec-industry-linkages",
      "sec-industry-professional-engagement",
      "sec-mous",
      "sec-global-outreach",
      "sec-international-collaborations-global-engagement",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = allSectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(allSectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openPdf = (url: string, title: string) => {
    setActivePdfUrl(url);
    setPreviewTitle(title);
  };

  // Sample verified signed MoUs for tabular view
  const sampleMous = {
    "2025-2026": [
      { id: 1, title: "EXCER Edtech Pvt. Ltd. (Skill & Placement Integration)", department: "Institutional / Placement Cell", year: "2025-2026", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 2, title: "Dimensions Coaching Centre (Competitive Exams Coaching)", department: "Career Development Cell", year: "2025-2026", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 3, title: "Datavalley India Pvt. Ltd. (Long Term Digital Internships)", department: "Computer Science & IT", year: "2025-2026", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 4, title: "Ala Hospital (Healthcare Sciences & Clinical Exposure)", department: "Life Sciences / Biotech", year: "2025-2026", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 5, title: "APSSDC (Skill Hub & Employability Support)", department: "All Departments", year: "2025-2026", fileUrl: "/documents/placements/Training & Placement Cell.pdf" }
    ],
    "2024-2025": [
      { id: 1, title: "EXCER Edtech Pvt. Ltd. (2023-2024 & 2024-2025)", department: "Institution / Placement Cell", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 2, title: "Dimensions Coaching Centre 2020-2025", department: "Career Development Cell", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 3, title: "Datavalley India Pvt. Ltd. (Long Term Internship)", department: "Computer Applications", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 4, title: "Ala Hospital 2017-2026", department: "Botany & Zoology", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 5, title: "Apssdc Skill Hub & Certification", department: "APSSDC Cell", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 6, title: "Pidilite Industries Ltd., Guntur", department: "Chemistry & Commerce", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" },
      { id: 7, title: "Hindu College Collaboration (Botany)", department: "Botany", year: "2024-2025", fileUrl: "/documents/placements/Training & Placement Cell.pdf" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
        {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
        <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Left: About / Placements Navigation Sidebar */}
            <aside className="lg:col-span-3">
              <AboutSidebar
                categories={PLACEMENTS_SIDEBAR_CATEGORIES}
                bannerTitle="Placements & Linkages"
                bannerSubtitle="Sections on this Page"
                activeId={activeSectionId}
                onItemClick={(id) => scrollToSection(id)}
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
                    </strong>, supports students in developing employability, career readiness, professional competencies, industry interactions, and global outreach.
                    <span className="block mt-2 text-slate-600 font-medium text-sm">
                      Our dedicated Training & Placement Cell bridges academic excellence with industry requirements, empowering students with systematic training, campus recruitments, APSSDC skill initiatives, and collaborative MoUs.
                    </span>
                  </p>
                </SubtextBox>

                {/* ============================================================ */}
                {/* SECTION 1: I. TRAINING & PLACEMENT CELL                     */}
                {/* ============================================================ */}
                <section
                  id="sec-tp-cell"
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
                      <Briefcase className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        I. TRAINING & PLACEMENT CELL
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Career readiness, training, recruitment statistics, APSSDC support, and capacity building.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 1.a About the Training & Placement Cell (White Card) */}
                    <div
                      id="sec-about-cell"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <Briefcase className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            a. About the Training &amp; Placement Cell
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Bridging academics and the employment sector</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Training &amp; Placement (T&amp;P) Cell of St. Ann’s College for Women, Gorantla, Guntur supports students in developing employability, career readiness and professional skills. It acts as a bridge between academics and the employment sector by facilitating training, career guidance, industry interaction, internships and placement opportunities.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The Cell conducts training in Aptitude, Logical Reasoning, Communication Skills, Soft Skills, Technical Skills, Resume Writing, Group Discussions and Personal Interviews. It also provides guidance for higher education, competitive examinations, professional courses, entrepreneurship and other career pathways.
                      </p>

                      {/* Vision & Mission Split Cards (Alternating Tint) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-5 bg-gradient-to-br from-white to-blue-50/60 rounded-2xl border border-blue-200/80 flex flex-col gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-amber-500" /> Vision
                          </span>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            To empower women students with knowledge, skills, confidence and professional competence for successful careers and responsible citizenship.
                          </p>
                        </div>

                        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/80 rounded-2xl border border-blue-200/80 flex flex-col gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Mission
                          </span>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            To provide systematic training, career guidance, industry exposure and placement support, enabling students to confidently pursue employment, higher education, entrepreneurship and lifelong learning.
                          </p>
                        </div>
                      </div>

                      {/* Objectives */}
                      <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200 flex flex-col gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800">Objectives of the T&amp;P Cell:</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                          {[
                            "Enhance students’ employability and career readiness.",
                            "Facilitate campus placements, internships and industry interactions.",
                            "Develop communication, aptitude, technical and soft skills.",
                            "Provide training in resume preparation, GDs and interviews.",
                            "Offer guidance for higher education and competitive examinations.",
                            "Encourage entrepreneurship, innovation and self-employment.",
                            "Strengthen interaction with recruiters, industries, alumni and professionals.",
                            "Maintain placement and training records for quality improvement and institutional development."
                          ].map((obj, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Training & Placement Officer Box */}
                      <div className="p-6 bg-[#002147] text-white rounded-3xl border border-blue-900 shadow-sm flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-outfit font-black text-2xl text-emerald-300 shrink-0 shadow-inner">
                            PR
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">TRAINING &amp; PLACEMENT OFFICER</span>
                            <h5 className="font-outfit font-black text-xl text-white tracking-tight">{tpoOfficer.name}</h5>
                            <p className="text-xs text-slate-200 font-medium">{tpoOfficer.degrees}</p>
                            <p className="text-[11px] text-slate-300 font-medium mt-0.5">{tpoOfficer.designation}, {tpoOfficer.institution}</p>
                          </div>
                        </div>

                        {/* Contact Details Box (Restored to pill badge layout; click opens executive contact actions modal) */}
                        <div
                          onClick={() => setContactModalOpen(true)}
                          className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 hover:border-emerald-400/40 w-full xl:w-auto cursor-pointer transition-all group flex flex-col gap-2.5 shadow-sm select-none"
                          title="Click to view contact options (Call, Mail & Copy)"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-black tracking-widest uppercase text-slate-300">
                              PLACEMENT DESK
                            </span>
                            <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1 group-hover:text-emerald-200 transition-colors">
                              <span>Connect / Copy</span>
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/25 border border-white/15 text-slate-100 text-xs font-semibold group-hover:border-white/30 transition-colors">
                              <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                              <span>{tpoOfficer.mobile}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/25 border border-white/15 text-slate-100 text-xs font-semibold group-hover:border-white/30 transition-colors">
                              <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                              <span>{tpoOfficer.landline}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/25 border border-white/15 text-slate-100 text-xs font-semibold truncate group-hover:border-white/30 transition-colors">
                            <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{tpoOfficer.placementEmail}</span>
                          </div>
                        </div>
                      </div>

                      {/* About T&P PDF Button */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-red-600" />
                          <div>
                            <h5 className="font-outfit font-bold text-slate-900 text-sm">About the Training &amp; Placement Cell Overview</h5>
                            <p className="text-xs text-slate-500">Official institutional overview and operational handbook</p>
                          </div>
                        </div>
                        <button
                          onClick={() => openPdf(placementAboutDoc.fileUrl, placementAboutDoc.title)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View / Download</span>
                        </button>
                      </div>

                      {/* Placement Cell Annual Reports Table (Zebra Striped Rows) */}
                      <div className="flex flex-col gap-3 pt-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <h5 className="font-outfit font-bold text-slate-900 text-sm uppercase tracking-wide">
                            Placement Cell Annual Reports
                          </h5>
                          <span className="text-xs text-slate-500 font-medium">AY 2022–2023 to 2025–2026</span>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                                <th className="py-3 px-4 w-36">Academic Year</th>
                                <th className="py-3 px-4">Annual Activity Report</th>
                                <th className="py-3 px-4 text-right w-36">View / Download</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                              {annualReportsList.map((rep, idx) => (
                                <tr
                                  key={idx}
                                  className={`transition-colors ${
                                    idx % 2 === 0 ? "bg-white hover:bg-blue-50/50" : "bg-slate-50/90 hover:bg-blue-50/50"
                                  }`}
                                >
                                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{rep.year}</td>
                                  <td className="py-3 px-4 font-medium text-slate-800">{rep.title}</td>
                                  <td className="py-3 px-4 text-right whitespace-nowrap">
                                    <button
                                      onClick={() => openPdf(rep.fileUrl, rep.title)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>View / Download</span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* 1.b Placements & Recruitment (Soft Blue Card) */}
                    <div
                      id="sec-placements-recruitment"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <TrendingUp className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            b. Placements &amp; Recruitment
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Campus recruitments, drives, and student placement statistics</p>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                        The Placements &amp; Recruitment section highlights the career opportunities facilitated by the Training &amp; Placement Cell through campus recruitment, off-campus opportunities, recruitment drives, job fairs, and industry interactions. It provides transparent, year-wise information on placement activities, recruiters, student selections, and placement achievements.
                      </p>

                      {/* Subsection A: Placement Statistics */}
                      <div className="p-5 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div>
                            <h5 className="font-outfit font-black text-slate-900 text-sm uppercase tracking-wide">
                              A. Placement Statistics
                            </h5>
                            <p className="text-xs text-slate-500 font-medium">Company-wise and Programme-wise placement outcomes</p>
                          </div>

                          {/* Year Tabs */}
                          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
                            {availableStatsYears.map((yearKey) => (
                              <button
                                key={yearKey}
                                onClick={() => setStatsYear(yearKey)}
                                className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  statsYear === yearKey
                                    ? "bg-[#002147] text-white shadow-xs"
                                    : "text-slate-600 hover:text-slate-900"
                                }`}
                              >
                                {yearKey}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Split Cards: Company-wise & Programme-wise */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Company-wise */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-bold text-[#002147] bg-blue-100 px-2 py-0.5 rounded-full uppercase">
                                Company-wise Statistics ({statsYear})
                              </span>
                              <h6 className="font-outfit font-bold text-slate-900 text-sm mt-2">
                                {currentCompanyStat.title || `Placed Students by Recruiting Company (${statsYear})`}
                              </h6>
                              <p className="text-xs text-slate-500 font-medium mt-1">
                                High-resolution graphical analysis of placements across hiring organizations.
                              </p>
                            </div>

                            {/* Image Graphic Preview Box */}
                            <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-[16/10] flex items-center justify-center">
                              {currentCompanyStat.fileUrl ? (
                                <img
                                  src={currentCompanyStat.fileUrl}
                                  alt={currentCompanyStat.title}
                                  className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="text-slate-400 text-xs font-medium">No graphic uploaded for {statsYear}</div>
                              )}
                            </div>

                            {currentCompanyStat.fileUrl && (
                              <button
                                onClick={() => setZoomImage({ url: currentCompanyStat.fileUrl, title: currentCompanyStat.title })}
                                className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                              >
                                <Maximize2 className="h-3.5 w-3.5" />
                                <span>View Full Graphic ({statsYear})</span>
                              </button>
                            )}
                          </div>

                          {/* Programme-wise Document Card (Rich Interactive Document Mockup) */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4">
                            <div>
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                                Programme-wise Statistics ({statsYear})
                              </span>
                              <h6 className="font-outfit font-bold text-slate-900 text-sm mt-2">
                                {currentProgrammeStat.title || `Placed Students by Programme (${statsYear})`}
                              </h6>
                              <p className="text-xs text-slate-500 font-medium mt-1">
                                Verified institutional PDF report detailing degree and PG course distributions.
                              </p>
                            </div>

                            {/* Rich Document Representation Box */}
                            <div
                              onClick={() => currentProgrammeStat.fileUrl && openPdf(currentProgrammeStat.fileUrl, currentProgrammeStat.title)}
                              className="group relative rounded-xl border border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4 flex flex-col justify-between aspect-[16/10] shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer overflow-hidden"
                            >
                              {/* Top Doc Header */}
                              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-7 w-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">PDF Report</span>
                                    <span className="block text-[11px] font-bold text-slate-800">Academic Year {statsYear}</span>
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                                  <FileCheck2 className="h-3 w-3" /> Official
                                </span>
                              </div>

                              {/* Document Body Mockup */}
                              <div className="flex flex-col gap-1.5 py-2">
                                <div className="text-[11px] font-extrabold text-[#002147] line-clamp-1">
                                  {currentProgrammeStat.title}
                                </div>
                                <div className="space-y-1">
                                  <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                                  <div className="h-1.5 w-5/6 bg-slate-200 rounded-full" />
                                  <div className="h-1.5 w-4/6 bg-emerald-200 rounded-full" />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-medium">
                                  <span>Format: Multi-Page PDF</span>
                                  <span>Affiliated to ANU</span>
                                </div>
                              </div>

                              {/* Hover Overlay Hint */}
                              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-emerald-700 font-bold group-hover:text-emerald-800">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3.5 w-3.5" /> Click to Preview PDF
                                </span>
                                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>

                            {currentProgrammeStat.fileUrl && (
                              <button
                                onClick={() => openPdf(currentProgrammeStat.fileUrl, currentProgrammeStat.title)}
                                className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>View PDF ({statsYear})</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Subsection B: Recruiters / Companies - INTERACTIVE SLIDE SHOW / CAROUSEL */}
                      <div className="p-5 bg-white rounded-2xl border border-blue-200/80 flex flex-col gap-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div>
                            <h5 className="font-outfit font-black text-slate-900 text-sm uppercase tracking-wide">
                              B. Recruiters &amp; Corporate Partners
                            </h5>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              St. Ann’s College for Women maintains active engagement with prominent national and global recruiters.
                            </p>
                          </div>

                          {/* Category Filter Dropdown */}
                          <div className="flex items-center gap-2">
                            <label htmlFor="recruiter-domain-filter" className="text-xs font-bold text-slate-600 whitespace-nowrap">
                              Filter Domain:
                            </label>
                            <div className="relative min-w-[190px]">
                              <select
                                id="recruiter-domain-filter"
                                value={recruiterFilter}
                                onChange={(e) => {
                                  setRecruiterFilter(e.target.value);
                                  setSliderIndex(0);
                                }}
                                className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 focus:border-[#002147] focus:ring-2 focus:ring-[#002147]/10 text-slate-800 text-xs font-bold py-2 pl-3 pr-8 rounded-xl transition-all cursor-pointer shadow-xs focus:outline-none"
                              >
                                <option value="all">All Companies</option>
                                <option value="IT Services">IT Services</option>
                                <option value="Banking & Finance">Banking &amp; Finance</option>
                                <option value="Pharma & Science">Pharma &amp; Science</option>
                                <option value="EdTech & Analytics">EdTech &amp; Analytics</option>
                              </select>
                              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Carousel Slider Cards Container with Auto-slide & Pause-on-Hover */}
                        <div
                          className="relative"
                          onMouseEnter={() => setIsRecruiterPaused(true)}
                          onMouseLeave={() => setIsRecruiterPaused(false)}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 min-h-[175px] transition-all duration-300">
                            {currentSlideRecruiters.map((rec: any) => (
                              <div
                                key={rec.id}
                                className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between gap-3 group min-h-[175px]"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2.5">
                                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${rec.color} text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0`}>
                                      {rec.short}
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                                      {rec.tag}
                                    </span>
                                  </div>
                                  <h6 className="font-outfit font-black text-slate-900 text-sm group-hover:text-blue-900 transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-start">
                                    {rec.name}
                                  </h6>
                                  <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-1">{rec.sector}</p>
                                </div>

                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
                                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Hiring Partner</span>
                                  <span className="text-slate-400">Campus Drives</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Slider Navigation Bar */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                            <span className="text-xs text-slate-500 font-medium">
                              Showing {sliderIndex * itemsPerPage + 1}–{Math.min((sliderIndex + 1) * itemsPerPage, filteredRecruiters.length)} of {filteredRecruiters.length} recruiting partners
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={handlePrevSlide}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                title="Previous Companies"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>

                              {/* Dot Indicators */}
                              <div className="flex items-center gap-1 px-1">
                                {Array.from({ length: maxSlideIndex + 1 }).map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setSliderIndex(idx)}
                                    className={`h-2 rounded-full transition-all cursor-pointer ${
                                      sliderIndex === idx ? "w-5 bg-[#002147]" : "w-2 bg-slate-200 hover:bg-slate-300"
                                    }`}
                                  />
                                ))}
                              </div>

                              <button
                                onClick={handleNextSlide}
                                className="p-2 rounded-xl bg-[#002147] hover:bg-blue-900 text-white transition-colors cursor-pointer"
                                title="Next Companies"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 4 Recruitment Pillars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                          {[
                            { title: "Campus Recruitment", desc: "Inviting corporate organisations for pre-placement talks, written tests, and face-to-face interview panels on campus." },
                            { title: "Off-Campus Recruitment", desc: "Supporting and mentoring students to participate in pooled drives and online corporate recruitment portals." },
                            { title: "Job Fairs / Placement Fairs", desc: "Facilitating student participation in state, university, and APSSDC-sponsored mega job melas." },
                            { title: "Placement Drives", desc: "Coordinating structured drives throughout the academic calendar across multiple sectors and skill tracks." }
                          ].map((pill, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60 flex flex-col gap-1.5">
                              <span className="font-outfit font-bold text-blue-900 text-xs uppercase">{pill.title}</span>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">{pill.desc}</p>
                            </div>
                          ))}
                        </div>

                        {/* Year-wise Placement Drives Gallery Triggers */}
                        <div className="p-4 bg-gradient-to-r from-[#002147] to-[#003875] text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-black uppercase text-emerald-400">Photo Records</span>
                            <h6 className="font-outfit font-bold text-sm text-white">Year-wise Placement Drives Gallery</h6>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setGalleryModal({ title: "Placement Drives 2025–2026 Gallery", category: "2025-2026" })}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs cursor-pointer transition-all"
                            >
                              2025–2026 Photos
                            </button>
                            <button
                              onClick={() => setGalleryModal({ title: "Placement Drives 2024–2025 Gallery", category: "2024-2025" })}
                              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 cursor-pointer transition-all"
                            >
                              2024–2025 Photos
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 1.c APSSDC (White Card) */}
                    <div
                      id="sec-apssdc"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs">
                          AP
                        </span>
                        <div>
                          <h4 className="font-outfit text-amber-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            c. APSSDC – Skill Development &amp; Employability Support
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Andhra Pradesh State Skill Development Corporation Partnership</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women is committed to enhancing the employability, career readiness and skill competencies of students through skill development initiatives undertaken in collaboration with the <strong>Andhra Pradesh State Skill Development Corporation (APSSDC)</strong>.
                      </p>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        The College facilitates and encourages students to participate in skill development programmes, industry-oriented training, career guidance sessions, workshops, entrepreneurship initiatives and employment-related activities organized through APSSDC and its associated partners.
                      </p>

                      {/* 8 Support Pillars (Alternating Box Backgrounds) */}
                      <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 flex flex-col gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800">Major Areas of Support:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {apssdcSupportAreas.map((area, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${
                                idx % 4 === 0 || idx % 4 === 3
                                  ? "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300"
                                  : "bg-amber-50/70 border-amber-200/80 shadow-2xs hover:bg-amber-50"
                              }`}
                            >
                              <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-900 text-xs">{area.title}</span>
                                <p className="text-[11px] text-slate-500 mt-0.5">{area.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Nypunyam Portal Banner */}
                      <div className="p-4 bg-gradient-to-r from-[#002147] to-amber-950 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-black uppercase text-amber-400">AP State Skill Portal</span>
                          <h6 className="font-outfit font-bold text-sm text-white">Naipunyam / Nypunyam Portal</h6>
                          <p className="text-xs text-slate-300">Access online training modules, assessments, and certifications</p>
                        </div>
                        <a
                          href="https://naipunyam.ap.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs shrink-0"
                        >
                          <span>View Nypunyam Portal</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      {/* Year-wise APSSDC Activity Reports Table (Zebra Striped Rows) */}
                      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                              <th className="py-3 px-4 w-36">Academic Year</th>
                              <th className="py-3 px-4">APSSDC Activity Report</th>
                              <th className="py-3 px-4 text-right w-36">View</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {[
                              { year: "2025–2026", title: "APSSDC Activity Report 2025–2026", fileUrl: "/documents/placements/Placement Cell Annual Report 2025-2026.pdf" },
                              { year: "2024–2025", title: "APSSDC Activity Report 2024–2025", fileUrl: "/documents/placements/Placement Cell Annual Report 2024-2025.pdf" }
                            ].map((rep, idx) => (
                              <tr
                                key={idx}
                                className={`transition-colors ${
                                  idx % 2 === 0 ? "bg-white hover:bg-blue-50/50" : "bg-slate-50/90 hover:bg-blue-50/50"
                                }`}
                              >
                                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{rep.year}</td>
                                <td className="py-3 px-4 font-medium text-slate-800">{rep.title}</td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => openPdf(rep.fileUrl, rep.title)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 1.d Skill Development Training Areas (Soft Blue Card with Alternating Domain Boxes) */}
                    <div
                      id="sec-skill-development-areas"
                      className="scroll-mt-52 border-2 border-indigo-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-6"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-indigo-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-indigo-200/80 text-indigo-600 shadow-2xs">
                          <Sparkles className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-indigo-800 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            d. Skill Development Training Areas
                          </h4>
                          <p className="text-xs text-indigo-600/80 font-medium">11 comprehensive skill enhancement domains, career guidance &amp; alumni support</p>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women provides students with diverse skill development and capability enhancement programmes to strengthen their employability, career readiness, personal effectiveness and professional competencies.
                      </p>

                      {/* 11 Major Domains Grid - STRICT ALTERNATING BOXES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skillDomains.map((dom, idx) => (
                          <div
                            key={idx}
                            className={`p-5 rounded-2xl border shadow-2xs flex flex-col justify-between gap-3 transition-all ${
                              idx % 2 === 0
                                ? "bg-white border-slate-200/90 hover:border-indigo-300"
                                : "bg-blue-50/80 border-blue-200/90 hover:border-indigo-300"
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="flex h-6 w-6 rounded-full bg-[#002147] text-white text-[10px] items-center justify-center font-black shrink-0">
                                  {dom.number}
                                </span>
                                <h6 className="font-outfit font-black text-slate-900 text-sm">{dom.title}</h6>
                              </div>
                              <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">{dom.desc}</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60">
                              {dom.topics.map((t, tidx) => (
                                <span
                                  key={tidx}
                                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                                    idx % 2 === 0
                                      ? "bg-slate-100 text-slate-700 border-slate-200/80"
                                      : "bg-white text-blue-900 border-blue-200/80"
                                  }`}
                                >
                                  • {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Career Guidance & Alumni Support Pair (Alternating) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        {/* Career Guidance (White) */}
                        <div className="p-5 bg-white rounded-2xl border border-indigo-200/90 shadow-2xs flex flex-col gap-2.5">
                          <span className="text-xs font-black uppercase text-indigo-900 tracking-wider">Career Guidance &amp; Counselling</span>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            Helping students make informed decisions about higher education, employment, and professional pathways.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium pt-1">
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" /> Career Awareness</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" /> Higher Education Guidance</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" /> Overseas Counselling</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" /> Opportunity Awareness</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" /> Individual Counselling</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" /> Alumni Career Interaction</li>
                          </ul>
                        </div>

                        {/* Alumni Career Support (Soft Blue) */}
                        <div className="p-5 bg-blue-50/90 rounded-2xl border border-blue-200/90 shadow-2xs flex flex-col gap-2.5">
                          <span className="text-xs font-black uppercase text-blue-900 tracking-wider">Alumni Career Support</span>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            The Alumni Association supports students through career guidance, mentoring, and professional networking.
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium pt-1">
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" /> Career Interaction</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" /> Placement Guidance</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" /> Mentoring Support</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" /> Industry Exposure</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" /> Internship Support</li>
                            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-700 shrink-0" /> Alumni Guest Talks</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* 1.e Internships & Industry Exposure (White Card) */}
                    <div
                      id="sec-internships-industry-exposure"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-100/60 text-teal-600">
                          <Compass className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-teal-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            e. Internships &amp; Industry Exposure
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Experiential learning, industrial visits, and field work</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        Experiential learning is encouraged through internships, industrial visits, field work, and industry interaction programmes. Such exposure helps students connect classroom learning with real-world applications.
                      </p>

                      {/* Alternating Split Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col gap-2.5">
                          <span className="text-xs font-black uppercase text-teal-900 tracking-wider">Internship Opportunities</span>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Industry-Based Internships</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" /> NGO Internships</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Project Internships</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Summer Training Programmes</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" /> Community Engagement Activities</li>
                          </ul>
                        </div>

                        <div className="p-5 bg-teal-50/70 rounded-2xl border border-teal-200/80 shadow-2xs flex flex-col gap-2.5">
                          <span className="text-xs font-black uppercase text-[#002147] tracking-wider">Industry Exposure Activities</span>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#002147] shrink-0" /> Industrial Visits</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#002147] shrink-0" /> Field Trips</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#002147] shrink-0" /> Guest Lectures by Industry Experts</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#002147] shrink-0" /> Industry–Academia Interaction Sessions</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#002147] shrink-0" /> Live Projects and Case Studies</li>
                          </ul>
                        </div>
                      </div>

                      {/* PDF & Gallery Actions */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => openPdf(placementAboutDoc.fileUrl, "Internships & Exposure Document")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                        <button
                          onClick={() => setGalleryModal({ title: "Internships & Industry Visits Gallery", category: "internships" })}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>View Gallery</span>
                        </button>
                      </div>
                    </div>

                    {/* 1.f Competitive Exam Coaching (Soft Blue Card) */}
                    <div
                      id="sec-competitive-exam-coaching"
                      className="scroll-mt-52 border-2 border-amber-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-amber-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-amber-200/80 text-amber-700 shadow-2xs">
                          <GraduationCap className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-amber-800 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            f. Competitive Exam Coaching
                          </h4>
                          <p className="text-xs text-amber-700/80 font-medium">Banking, SSC, ICET/PGCET, TET, and UPSC preparation support</p>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                        The institution supports students preparing for higher education entrance tests and government recruitment examinations.
                      </p>

                      {/* Alternating Split Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white rounded-2xl border border-amber-200/80 shadow-2xs flex flex-col gap-2.5">
                          <span className="text-xs font-black uppercase text-amber-900 tracking-wider">Coaching Support For:</span>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Banking Examinations (IBPS / SBI)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> SSC Examinations (CGL, CHSL)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> ICET / PGCET (State &amp; National Entrance)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Teacher Eligibility Tests (TET, DSC)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> UPSC / State Public Service (APPSC)</li>
                          </ul>
                        </div>

                        <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-2xs flex flex-col gap-2.5">
                          <span className="text-xs font-black uppercase text-amber-900 tracking-wider">Coaching Activities:</span>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Aptitude Training</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Reasoning Skills</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Quantitative Techniques</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Communication Skills</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" /> Motivational Programmes &amp; Guidance</li>
                          </ul>
                        </div>
                      </div>

                      {/* PDF & Gallery Actions */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => openPdf(placementAboutDoc.fileUrl, "Competitive Exam Coaching Syllabus & Modules")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                        <button
                          onClick={() => setGalleryModal({ title: "Competitive Coaching Sessions Gallery", category: "coaching" })}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>View Gallery</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 2: II. INDUSTRY LINKAGES                            */}
                {/* ============================================================ */}
                <section
                  id="sec-industry-linkages"
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
                      <Handshake className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        II. INDUSTRY LINKAGES
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Professional engagement, corporate partnerships, and Memoranda of Understanding (MoUs).
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 2.a Industry & Professional Engagement (White Card) */}
                    <div
                      id="sec-industry-professional-engagement"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                          <Handshake className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            a. Industry &amp; Professional Engagement
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Bridging academic learning with professional practice</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women, Gorantla, promotes strong industry–institution linkages to bridge the gap between academic learning and professional practice. The institution facilitates internships, skill development, industry interactions, placement support, professional certifications, and experiential learning opportunities for Degree, PG, MBA, and MCA students.
                      </p>

                      {/* 6 Key Areas of Engagement Grid (Alternating Box Backgrounds) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {[
                          { title: "Industry Partnerships", desc: "Collaborations with industries, corporate organizations, professional bodies, startups, and service sectors." },
                          { title: "Internships & Apprenticeships", desc: "Practical exposure through internships, training, field projects, and workplace learning." },
                          { title: "Placement Partnerships", desc: "Industry linkages supporting campus recruitment, career guidance, employability training, and placement opportunities." },
                          { title: "Professional Certification Programmes", desc: "Value-added and skill-based programmes in communication, digital skills, accounting, entrepreneurship, data analytics, and emerging technologies." },
                          { title: "Industry Expert Lectures", desc: "Guest lectures, expert talks, webinars, and interactive sessions with industry professionals, entrepreneurs, and corporate experts." },
                          { title: "Industrial Visits", desc: "Field visits and educational exposure to understand industrial operations, technologies, organizational practices, and workplace culture." }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border flex flex-col gap-1.5 transition-colors ${
                              idx % 2 === 0
                                ? "bg-white border-slate-200/90 shadow-2xs"
                                : "bg-blue-50/70 border-blue-200/80 shadow-2xs"
                            }`}
                          >
                            <span className="font-outfit font-black text-blue-900 text-xs uppercase">{item.title}</span>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Student Benefits & Institutional Commitment (Alternating Pair) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="p-5 bg-white rounded-2xl border border-blue-200/80 shadow-2xs flex flex-col gap-2">
                          <span className="text-xs font-black uppercase text-blue-900 tracking-wider">Student Benefits</span>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            These initiatives enhance students’ practical knowledge, technical and soft skills, professional competencies, career awareness, employability, and workplace readiness, while encouraging innovation, entrepreneurship, and continuous learning.
                          </p>
                        </div>

                        <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-2xs flex flex-col gap-2">
                          <span className="text-xs font-black uppercase text-emerald-900 tracking-wider">Institutional Commitment</span>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            The institution continuously strengthens academia–industry collaboration and experiential learning to prepare students for higher education, entrepreneurship, and successful professional careers.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2.b MoUs – Memoranda of Understanding (Soft Blue Card) */}
                    <div
                      id="sec-mous"
                      className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                          <Handshake className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            b. MoUs – Memoranda of Understanding
                          </h4>
                          <p className="text-xs text-blue-600/80 font-medium">Active signed institutional partnerships and collaborative agreements</p>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women, Gorantla, enters into Memoranda of Understanding (MoUs) with industries, corporate organizations, educational institutions, professional bodies, training organizations, NGOs, and other reputed institutions to promote academic, professional, and skill development opportunities.
                      </p>

                      {/* Objectives of MoUs */}
                      <div className="p-5 bg-white rounded-2xl border border-blue-200/80 shadow-2xs flex flex-col gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800">Objectives of MoUs:</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                          {[
                            "Strengthen Industry–Institution and Academic Collaboration",
                            "Facilitate internships, training, and field exposure",
                            "Promote skill development and employability",
                            "Organize guest lectures, workshops, seminars, and expert sessions",
                            "Support placements and career development",
                            "Encourage research, innovation, and entrepreneurship",
                            "Provide opportunities for knowledge sharing and professional networking"
                          ].map((obj, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* General MoUs PDF Button */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-200/80 shadow-2xs">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-red-600" />
                          <div>
                            <h5 className="font-outfit font-bold text-slate-900 text-sm">Memoranda of Understanding (MoUs) Master Document</h5>
                            <p className="text-xs text-slate-500">Comprehensive register of collaborative agreements</p>
                          </div>
                        </div>
                        <button
                          onClick={() => openPdf(placementAboutDoc.fileUrl, "Memoranda of Understanding Master Document")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View PDF</span>
                        </button>
                      </div>

                      {/* Year-wise Signed MoUs Table (Zebra Striped Rows) */}
                      <div className="p-5 bg-white rounded-2xl border border-blue-200/80 shadow-2xs flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div>
                            <h5 className="font-outfit font-black text-slate-900 text-sm uppercase tracking-wide">
                              Year-wise MoU Activities &amp; Signed Documents
                            </h5>
                            <p className="text-xs text-slate-500 font-medium">Reviewed implementation and verified signed agreements</p>
                          </div>

                          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
                            <button
                              onClick={() => setMouYear("2025-2026")}
                              className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                mouYear === "2025-2026"
                                  ? "bg-[#002147] text-white shadow-xs"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              2025–2026
                            </button>
                            <button
                              onClick={() => setMouYear("2024-2025")}
                              className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                mouYear === "2024-2025"
                                  ? "bg-[#002147] text-white shadow-xs"
                                  : "text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              2024–2025
                            </button>
                          </div>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100/90 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                                <th className="py-3 px-4 text-center w-14">S.No.</th>
                                <th className="py-3 px-4">Organization / Collaborating Agency</th>
                                <th className="py-3 px-4">Department / Scope</th>
                                <th className="py-3 px-4 text-right w-36">View Document</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                              {sampleMous[mouYear].map((mou, idx) => (
                                <tr
                                  key={mou.id}
                                  className={`transition-colors ${
                                    idx % 2 === 0 ? "bg-white hover:bg-blue-50/50" : "bg-slate-50/90 hover:bg-blue-50/50"
                                  }`}
                                >
                                  <td className="py-3 px-4 text-center font-bold text-slate-900">{mou.id}</td>
                                  <td className="py-3 px-4 font-bold text-slate-900">{mou.title}</td>
                                  <td className="py-3 px-4 text-slate-600">{mou.department}</td>
                                  <td className="py-3 px-4 text-right whitespace-nowrap">
                                    <button
                                      onClick={() => openPdf(mou.fileUrl, mou.title)}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
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
                    </div>

                  </div>
                </section>

                {/* ============================================================ */}
                {/* SECTION 3: III. INTERNALIZATION & GLOBAL OUTREACH           */}
                {/* ============================================================ */}
                <section
                  id="sec-global-outreach"
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
                      <Globe2 className="h-6 w-6 text-indigo-300 shrink-0" />
                      <h2
                        className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
                        style={{ color: "var(--sec1-title, var(--level2-title, #ffffff))" }}
                      >
                        III. INTERNALIZATION &amp; GLOBAL OUTREACH
                      </h2>
                    </div>
                    <p
                      className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                      style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
                    >
                      Global collaborations, research partnerships, intercultural learning, and international engagement.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 space-y-8" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
                    
                    {/* 3.a International Collaborations & Global Engagement (White Card) */}
                    <div
                      id="sec-international-collaborations-global-engagement"
                      className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
                      style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                    >
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-100/60 text-sky-600">
                          <Globe2 className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="font-outfit text-sky-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                            a. International Collaborations &amp; Global Engagement
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">Promoting international perspectives and intercultural competencies</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                        St. Ann’s College for Women promotes global academic engagement through international collaborations, online academic interactions, research initiatives, expert sessions, alumni networking, and cross-cultural learning activities. These initiatives provide students and faculty with opportunities to gain global exposure, exchange knowledge, and develop international perspectives.
                      </p>

                      {/* 6 Key Areas Grid (Alternating Box Backgrounds) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {[
                          { title: "International Collaborations", desc: "Academic partnerships, knowledge exchange, and collaborative learning initiatives." },
                          { title: "Global Research Engagement", desc: "Joint research activities, publications, conferences, webinars, and academic discussions." },
                          { title: "International Webinars & Conferences", desc: "Interaction with international experts and exposure to global academic and professional trends." },
                          { title: "Student & Faculty Exchange", desc: "Opportunities for academic interaction, collaborative learning, and intercultural exposure through institutional and online initiatives." },
                          { title: "Global Alumni Engagement", desc: "Alumni interaction, mentoring, career guidance, and professional networking across regions and countries." },
                          { title: "Cross-Cultural Learning", desc: "Cultural exchange, international observances, language activities, and awareness programmes promoting inclusiveness and global citizenship." }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border flex flex-col gap-1.5 transition-colors ${
                              idx % 2 === 0
                                ? "bg-white border-slate-200/90 shadow-2xs"
                                : "bg-sky-50/70 border-sky-200/80 shadow-2xs"
                            }`}
                          >
                            <span className="font-outfit font-black text-sky-900 text-xs uppercase">{item.title}</span>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="p-5 bg-gradient-to-br from-sky-50 to-blue-50/80 rounded-2xl border border-sky-200/80 shadow-2xs flex flex-col gap-2">
                        <span className="text-xs font-black uppercase text-sky-900 tracking-wider">Holistic Impact</span>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          These initiatives contribute to global exposure, intercultural competence, research culture, academic enrichment, professional awareness, and holistic development of students and faculty.
                        </p>
                      </div>
                    </div>

                  </div>
                </section>

              </div>
            </main>

          </div>
        </div>
      </div>

      {/* TPO Direct Contact & Actions Pop-up Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col gap-5 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-[#002147] text-emerald-300 flex items-center justify-center font-outfit font-black text-lg shadow-sm">
                  PR
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Training &amp; Placement Officer</span>
                  <h4 className="font-outfit font-black text-slate-900 text-lg leading-tight">{tpoOfficer.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{tpoOfficer.degrees} • {tpoOfficer.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Contact Rows with Call / Mail and Copy Buttons */}
            <div className="flex flex-col gap-2.5">
              {/* Mobile */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-emerald-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official Mobile</span>
                    <span className="font-bold text-slate-900 text-sm">{tpoOfficer.mobile}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${tpoOfficer.mobile.replace(/\s+/g, "")}`}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                  >
                    <Phone className="h-3 w-3" /> Call
                  </a>
                  <button
                    onClick={() => copySingle(tpoOfficer.mobile, "mobile")}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                    title="Copy Number"
                  >
                    {copiedField === "mobile" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Landline */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-emerald-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">College Landline</span>
                    <span className="font-bold text-slate-900 text-sm">{tpoOfficer.landline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${tpoOfficer.landline.replace(/\s+/g, "")}`}
                    className="px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                  >
                    <Phone className="h-3 w-3" /> Dial
                  </a>
                  <button
                    onClick={() => copySingle(tpoOfficer.landline, "landline")}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                    title="Copy Landline"
                  >
                    {copiedField === "landline" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Placement Email */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-300 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Placement Email</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm truncate block">{tpoOfficer.placementEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(tpoOfficer.placementEmail)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                    title="Open in Gmail (Web Browser)"
                  >
                    <Mail className="h-3 w-3" /> Gmail
                  </a>
                  <a
                    href={`mailto:${tpoOfficer.placementEmail}`}
                    className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                    title="Open in Default Mail Client / App"
                  >
                    <Mail className="h-3 w-3" /> App
                  </a>
                  <button
                    onClick={() => copySingle(tpoOfficer.placementEmail, "placement_email")}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedField === "placement_email" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Institution Email */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-sky-300 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Institution Email</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm truncate block">{tpoOfficer.institutionEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(tpoOfficer.institutionEmail)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                    title="Open in Gmail (Web Browser)"
                  >
                    <Mail className="h-3 w-3" /> Gmail
                  </a>
                  <a
                    href={`mailto:${tpoOfficer.institutionEmail}`}
                    className="px-2.5 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                    title="Open in Default Mail Client / App"
                  >
                    <Mail className="h-3 w-3" /> App
                  </a>
                  <button
                    onClick={() => copySingle(tpoOfficer.institutionEmail, "inst_email")}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedField === "inst_email" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Copy All */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleCopyAllModal}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                {copiedField === "all" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedField === "all" ? "All Details Copied!" : "Copy Complete Contact Card"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {activePdfUrl && (
        <FilePreviewModal
          isOpen={!!activePdfUrl}
          onClose={() => setActivePdfUrl(null)}
          fileUrl={activePdfUrl}
          title={previewTitle}
        />
      )}

      {/* Image Lightbox Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-outfit font-black text-slate-900 text-base">{zoomImage.title}</h4>
              <div className="flex items-center gap-2">
                <a
                  href={zoomImage.url}
                  download
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  title="Download Image"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setZoomImage(null)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2">
              <img
                src={zoomImage.url}
                alt={zoomImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {galleryModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setGalleryModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Photo Gallery</span>
                <h4 className="font-outfit font-black text-slate-900 text-base">{galleryModal.title}</h4>
              </div>
              <button
                onClick={() => setGalleryModal(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3] flex items-center justify-center relative group">
                    <div className="text-center p-4">
                      <Briefcase className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <div className="text-xs font-bold text-slate-600">{galleryModal.title}</div>
                      <div className="text-[10px] text-slate-400">Activity Photograph {num}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
