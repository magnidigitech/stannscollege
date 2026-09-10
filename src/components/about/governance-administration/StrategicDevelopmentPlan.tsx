"use client";

import React, { useState, useEffect } from "react";
import {
  FileText, Eye, Shield, BookOpen, GraduationCap, Users, Laptop,
  Briefcase, Leaf, ShieldCheck, ArrowRight, Milestone, Download,
  ExternalLink, Globe, CheckCircle2, MessageSquare, Building, Scale,
  Flame, Activity, Award, HeartHandshake, TrendingUp, Coins, Sparkles, Quote
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { Heading1Notch, SubtextBox } from "@/components/ui/Heading1Notch";
import { getStrategicPlan } from "@/lib/sanity";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";

interface StrategicPlanDocument {
  title: string;
  fileUrl: string;
  googleFormUrl?: string;
}

interface StrategicPlanData {
  title: string;
  executiveSummary: string;
  googleFormUrl?: string;
  studentFeedbackFormUrl?: string;
  facultyFeedbackFormUrl?: string;
  parentFeedbackFormUrl?: string;
  alumniFeedbackFormUrl?: string;
  documents?: StrategicPlanDocument[];
}

const defaultPlanData: StrategicPlanData = {
  title: "Strategic Plans & Future Directions",
  executiveSummary: "St. Ann’s College for Women, Guntur, envisions a transformative future rooted in academic excellence, innovation, women empowerment, social responsibility, and nation-building. Guided by the values of the Congregation of the Sisters of St. Ann and aligned with the aspirations of Viksit Bharat @2047 and Swarna Andhra @2047, the institution is committed to nurturing globally competent, ethically grounded, and socially responsible women leaders.",
  googleFormUrl: "https://www.google.com/search?q=%23",
  studentFeedbackFormUrl: "https://forms.gle/n6QfA4roPrqtPWjM8",
  facultyFeedbackFormUrl: "https://www.google.com/search?q=%23",
  parentFeedbackFormUrl: "https://www.google.com/search?q=%23",
  alumniFeedbackFormUrl: "https://www.google.com/search?q=%23",
  documents: [
    {
      title: "Years Plan",
      fileUrl: "/documents/Institutional Strategic Framework  2024-2030.pdf",
      googleFormUrl: "https://www.google.com/search?q=%23"
    },
    {
      title: "Annual Deployment Plan 2025-2026",
      fileUrl: "/documents/Annual Plan Deployment Report  2025-2026.pdf",
      googleFormUrl: "https://www.google.com/search?q=%23"
    },
    {
      title: "Annual Deployment Plan 2024-2025",
      fileUrl: "/documents/Annual Plan Deployment Report  2024-2025.pdf",
      googleFormUrl: "https://www.google.com/search?q=%23"
    }
  ]
};

// Full Text Datasets from User Markdown for maximum fidelity
const academicIndicators = [
  "Consistent university examination pass percentage",
  "Increasing number of university ranks and academic distinctions",
  "Student progression to higher education and professional careers",
  "Integration of multidisciplinary and skill-based courses",
  "Internship participation and industry exposure",
  "Digital learning adoption and ICT-enabled classrooms",
  "Placement opportunities and career readiness initiatives",
  "Student participation in seminars, workshops, hackathons, and competitions"
];

const researchIndicators = [
  "Increase in faculty research publications and book chapters",
  "Research collaborations with universities and industries",
  "Student mini-projects and innovation-based learning",
  "Establishment of incubation and entrepreneurship initiatives",
  "Participation in national and international conferences",
  "Promotion of patents, startups, and community-based innovations",
  "Strengthening of research laboratories and digital resources"
];

const societalIndicators = [
  "NSS, NCC, and extension activities",
  "Rural outreach and community engagement programmes",
  "Awareness campaigns on health, environment, and digital literacy",
  "Women empowerment and leadership initiatives",
  "Skill development programmes for underserved communities",
  "Environmental sustainability and green campus practices",
  "Community partnerships and social responsibility projects"
];

const excellenceIndicators = [
  "NAAC quality enhancement initiatives",
  "Participation in NIRF and national ranking frameworks",
  "Academic and administrative audits",
  "Digital governance and e-administration systems",
  "Faculty development and professional training",
  "Alumni engagement and institutional networking",
  "International collaborations and global exposure programmes"
];

const academicPriorities = [
  "Introduction of new interdisciplinary and emerging programmes",
  "Strengthening Outcome-Based Education (OBE)",
  "Expansion of skill development and value-added certification courses",
  "Integration of Artificial Intelligence, Data Analytics, and Digital Technologies",
  "Enhancement of employability and entrepreneurship training",
  "Strengthening internship, industry, and research collaborations",
  "Promotion of innovation-driven and experiential learning",
  "Development of global competencies and communication skills"
];

const infraPriorities = [
  "Smart classrooms and advanced ICT-enabled teaching spaces",
  "Modernization of science and computer laboratories",
  "Expansion of digital library and e-learning resources",
  "Green campus and sustainable infrastructure development",
  "Renewable energy and energy conservation initiatives",
  "Improvement of sports, fitness, and wellness facilities",
  "Enhanced safety, accessibility, and student support infrastructure",
  "Establishment of innovation, incubation, and research centers"
];

const financialPriorities = [
  "Strengthening resource mobilization strategies",
  "Enhancing funding through research grants and projects",
  "Industry partnerships and CSR collaborations",
  "Infrastructure development through phased investments",
  "Transparent and technology-driven financial management",
  "Alumni contribution and endowment initiatives",
  "Financial sustainability through strategic planning and optimization"
];

const globalPriorities = [
  "International academic collaborations and MoUs",
  "Student and faculty exchange programmes",
  "Global certification and online learning opportunities",
  "Cross-cultural learning and international exposure",
  "Participation in global conferences and academic networks",
  "Promotion of international internships and research collaborations",
  "Strengthening English communication and professional skills",
  "Alignment with Sustainable Development Goals (SDGs)"
];

const visionCommitments = [
  "Empowering women through inclusive, equitable, and quality education",
  "Promoting academic excellence and holistic development",
  "Encouraging innovation, entrepreneurship, and research culture",
  "Enhancing digital literacy and future-ready skills",
  "Supporting environmental sustainability and green practices",
  "Strengthening community engagement and social responsibility",
  "Developing leadership, ethical values, and constitutional awareness",
  "Aligning institutional practices with national education reforms and global standards"
];

const focusAreas = [
  {
    title: "Academic Excellence & NEP 2020 Implementation",
    bullets: [
      "Outcome-Based Education (OBE)",
      "Multidisciplinary and skill-based learning",
      "Value-added and certificate programmes",
      "Internship and experiential learning opportunities",
      "Digital learning and ICT-enabled education"
    ],
    links: [
      { text: "National Education Policy (NEP 2020)", url: "https://www.education.gov.in/nep-2020" },
      { text: "UGC – University Grants Commission", url: "https://www.ugc.gov.in" }
    ]
  },
  {
    title: "Women Empowerment & Leadership",
    bullets: [
      "Leadership development programmes",
      "Entrepreneurship and employability training",
      "Health, wellness, and legal awareness initiatives",
      "Career guidance and mentoring support",
      "Women innovation and leadership initiatives"
    ],
    links: []
  },
  {
    title: "Research, Innovation & Entrepreneurship",
    bullets: [
      "Research and Innovation Cell",
      "Student projects and publications",
      "Startup and incubation awareness programmes",
      "Industry collaborations and skill enhancement",
      "Innovation-driven learning environment"
    ],
    links: [
      { text: "AICTE Innovation Cell", url: "https://mic.gov.in" },
      { text: "NAAC – National Assessment and Accreditation Council", url: "http://www.naac.gov.in" }
    ]
  },
  {
    title: "Digital & Green Campus Initiatives",
    bullets: [
      "Smart classrooms and digital learning platforms",
      "Green campus and sustainability initiatives",
      "Rainwater harvesting and energy conservation",
      "Plastic-free and eco-friendly campus practices",
      "Digital governance and e-administration"
    ],
    links: [
      { text: "Sustainable Development Goals (SDGs) – United Nations", url: "https://sdgs.un.org" }
    ]
  },
  {
    title: "Community Engagement & Social Responsibility",
    bullets: [
      "NSS and outreach activities",
      "Rural women empowerment initiatives",
      "Environmental awareness programmes",
      "Health, hygiene, and literacy campaigns",
      "Social impact and extension activities"
    ],
    links: []
  },
  {
    title: "Employability & Career Advancement",
    bullets: [
      "Placement training programmes",
      "Career guidance and counselling support",
      "Internship and industry interaction opportunities",
      "Resume building and interview skill workshops",
      "Soft skills and communication training",
      "Competitive examination coaching",
      "Alumni mentoring and networking initiatives",
      "Entrepreneurship and startup awareness programmes"
    ],
    links: []
  },
  {
    title: "Global Exposure & Internationalization",
    bullets: [
      "International webinars and virtual exchange programmes",
      "Collaboration with foreign universities and institutions",
      "Global certification and online learning opportunities",
      "Cross-cultural learning and international exposure activities",
      "International internships and collaborative projects",
      "English communication and professional skill enhancement"
    ],
    links: []
  },
  {
    title: "Institutional Quality Enhancement",
    bullets: [
      "Strengthening IQAC and quality assurance initiatives",
      "Academic and administrative audits",
      "Faculty development programmes (FDPs)",
      "E-governance and digital administration systems",
      "Data-driven institutional planning and review",
      "Student feedback and satisfaction surveys",
      "Documentation of best practices and institutional achievements"
    ],
    links: []
  }
];

const signatureInitiatives = [
  {
    title: "Women for Viksit Bharat",
    desc: "Leadership and personality development, community engagement, and women empowerment."
  },
  {
    title: "Digital St. Ann’s 2047",
    desc: "Smart classrooms, ICT-enabled teaching, and e-governance."
  },
  {
    title: "Green Campus – Green Future",
    desc: "Environmental sustainability, energy conservation, and eco-friendly campus development."
  },
  {
    title: "Rural Women Empowerment Mission",
    desc: "Skill development, literacy outreach, and community support."
  },
  {
    title: "Innovation & Entrepreneurship Hub",
    desc: "Startup initiatives, entrepreneurship development, and industry collaboration."
  },
  {
    title: "Future Skills Academy",
    desc: "AI, analytics, coding, digital skills training, and career readiness."
  }
];

const futureVisions = [
  "A leading women’s institution in Andhra Pradesh",
  "A center for innovation, leadership, and entrepreneurship",
  "A digitally empowered and sustainable campus",
  "A socially responsible institution contributing to nation-building",
  "A catalyst for women empowerment and community transformation"
];

const externalResources = {
  viksit: [
    { title: "MyGov – Viksit Bharat @2047", desc: "Government of India initiative inviting ideas and participation for developed India vision.", url: "https://www.mygov.in/viksitbharat2047/" },
    { title: "MY Bharat Portal", desc: "Youth engagement, leadership, volunteering, and nation-building initiatives aligned with Viksit Bharat.", url: "https://mybharat.gov.in/" },
    { title: "NITI Aayog – Work for Viksit Bharat", desc: "Opportunities and national development initiatives connected to Viksit Bharat goals.", url: "https://www.niti.gov.in" },
    { title: "Viksit Bharat Overview", desc: "Overview explaining the vision of transforming India into a developed nation by 2047.", url: "https://www.india.gov.in" }
  ],
  swarna: [
    { title: "Swarna Andhra Official Portal", desc: "Andhra Pradesh Government vision portal for Swarna Andhra @2047.", url: "https://ap.gov.in" },
    { title: "Guntur District – Swarna Andhra Vision @2047", desc: "District-level vision document and development roadmap.", url: "https://guntur.ap.gov.in" },
    { title: "Swarna Andhra Vision Plan Document", desc: "Government document related to the Swarna Andhra 2047 vision plan.", url: "https://ap.gov.in" }
  ]
};

const STRATEGIC_PLAN_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "performance-indicators",
    title: "I. Performance Indicators",
    sectionId: "performance-indicators",
    items: [
      { text: "Overview & Metrics", id: "performance-indicators" },
      { text: "Academic Performance", id: "sec-academic-indicators" },
      { text: "Research & Innovation", id: "sec-research-indicators" },
      { text: "Societal & Extension", id: "sec-societal-indicators" },
      { text: "Institutional Excellence", id: "sec-excellence-indicators" },
    ],
  },
  {
    catSlug: "plan-documents",
    title: "II. Strategic Plan Documents",
    sectionId: "plan-documents",
    items: [
      { text: "Plan Documents Overview", id: "plan-documents" },
      { text: "Strategic Framework 2024-2030", id: "sec-plan-years" },
      { text: "Deployment Plan 2025-2026", id: "sec-plan-2025-26" },
      { text: "Deployment Plan 2024-2025", id: "sec-plan-2024-25" },
    ],
  },
  {
    catSlug: "strategic-priorities",
    title: "III. Strategic Priorities",
    sectionId: "strategic-priorities",
    items: [
      { text: "Key Focus Areas", id: "strategic-priorities" },
      { text: "Academic & NEP 2020", id: "sec-priority-academic" },
      { text: "Infrastructure & ICT", id: "sec-priority-infra" },
      { text: "Financial Mobilization", id: "sec-priority-financial" },
      { text: "Global Collaborations", id: "sec-priority-global" },
    ],
  },
  {
    catSlug: "stakeholder-engagement",
    title: "IV. Stakeholder Consultations",
    sectionId: "stakeholder-engagement",
    items: [
      { text: "Consultative Planning", id: "stakeholder-engagement" },
      { text: "Student Feedback Portal", id: "sec-feedback-student" },
      { text: "Faculty Consultations", id: "sec-feedback-faculty" },
      { text: "Parent Participation", id: "sec-feedback-parent" },
      { text: "Alumni Advisory", id: "sec-feedback-alumni" },
    ],
  },
  {
    catSlug: "vision-2047",
    title: "V. Vision 2047 Alignment",
    sectionId: "vision-2047",
    items: [
      { text: "Viksit Bharat Vision", id: "vision-2047" },
      { text: "Our Commitment Pillars", id: "sec-vision-commitments" },
      { text: "8 Core Focus Areas", id: "sec-vision-focus" },
      { text: "6 Signature Initiatives", id: "sec-vision-initiatives" },
      { text: "Swarna Andhra @2047", id: "sec-vision-swarna" },
    ],
  },
  {
    catSlug: "resource-links",
    title: "VI. Resource Links & Portals",
    sectionId: "resource-links",
    items: [
      { text: "Government Frameworks", id: "resource-links" },
      { text: "National Vision Portals", id: "sec-resource-national" },
      { text: "AP State Roadmap Portals", id: "sec-resource-state" },
    ],
  },
];

export function StrategicDevelopmentPlan() {
  const [data, setData] = useState<StrategicPlanData>(defaultPlanData);
  const [loading, setLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string>("performance-indicators");

  useEffect(() => {
    const allIds = [
      "performance-indicators",
      "sec-academic-indicators",
      "sec-research-indicators",
      "sec-societal-indicators",
      "sec-excellence-indicators",
      "plan-documents",
      "sec-plan-years",
      "sec-plan-2025-26",
      "sec-plan-2024-25",
      "strategic-priorities",
      "sec-priority-academic",
      "sec-priority-infra",
      "sec-priority-financial",
      "sec-priority-global",
      "stakeholder-engagement",
      "sec-feedback-student",
      "sec-feedback-faculty",
      "sec-feedback-parent",
      "sec-feedback-alumni",
      "vision-2047",
      "sec-vision-commitments",
      "sec-vision-focus",
      "sec-vision-initiatives",
      "sec-vision-swarna",
      "resource-links",
      "sec-resource-national",
      "sec-resource-state",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
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

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPlan = await getStrategicPlan();
        if (fetchedPlan) {
          setData({
            title: fetchedPlan.title || defaultPlanData.title,
            executiveSummary: (fetchedPlan.executiveSummary && fetchedPlan.executiveSummary.includes("envisions a transformative future"))
              ? fetchedPlan.executiveSummary
              : defaultPlanData.executiveSummary,
            googleFormUrl: fetchedPlan.googleFormUrl || defaultPlanData.googleFormUrl,
            studentFeedbackFormUrl: (fetchedPlan.studentFeedbackFormUrl && fetchedPlan.studentFeedbackFormUrl !== "https://www.google.com/search?q=%23")
              ? fetchedPlan.studentFeedbackFormUrl
              : "https://forms.gle/n6QfA4roPrqtPWjM8",
            facultyFeedbackFormUrl: fetchedPlan.facultyFeedbackFormUrl || defaultPlanData.facultyFeedbackFormUrl,
            parentFeedbackFormUrl: fetchedPlan.parentFeedbackFormUrl || defaultPlanData.parentFeedbackFormUrl,
            alumniFeedbackFormUrl: fetchedPlan.alumniFeedbackFormUrl || defaultPlanData.alumniFeedbackFormUrl,
            documents: (fetchedPlan.documents && fetchedPlan.documents.length > 0) ? fetchedPlan.documents : defaultPlanData.documents
          });
        }
      } catch (err) {
        console.error("Error loading strategic plan from Sanity:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleOpenPdf = (url: string, title: string) => {
    setSelectedFileUrl(url);
    setSelectedFileTitle(title);
  };

  const documentsList = data.documents || defaultPlanData.documents || [];

  return (
    <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
      {/* 1. Heading 1 Notch Attached to Top Nav */}
      <Heading1Notch title="Strategic Plans &amp; Future Directions" />

      {/* 2. Main Content Container (Sidebar on Left, Data Elements on Right) */}
      <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Left: About Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <AboutSidebar
            categories={STRATEGIC_PLAN_CATEGORIES}
            bannerTitle="STRATEGIC PLAN"
            bannerSubtitle="Sections on this Page"
            activeId={activeSectionId}
            onItemClick={(id) => setActiveSectionId(id)}
          />
        </aside>

        {/* Right: Data Elements / Sections */}
        <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
          <div className="flex flex-col gap-4">
            {/* Sub-text Box */}
            <SubtextBox subtext={data.executiveSummary || defaultPlanData.executiveSummary} />

            {/* Section 1: Institutional Performance Indicators */}
            <section
              id="performance-indicators"
              className="scroll-mt-28 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
              style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
            >
            {/* Full-Width Section Header Banner */}
        <div
          className="text-white px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
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
              Institutional Performance Indicators
            </h2>
          </div>
          <p
            className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
            style={{ color: "var(--sec1-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
          >
            Academic, Research, Societal &amp; Impact Metrics tracking institutional progression.
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indicator Card 1 - Color A (Pure White) */}
            <div
              id="sec-academic-indicators"
              className="scroll-mt-32 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
              style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                  Academic Performance Indicators
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5">
                {academicIndicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indicator Card 2 - Color B (Soft Ice Blue) */}
            <div
              id="sec-research-indicators"
              className="scroll-mt-32 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
              style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
            >
              <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                  <Flame className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                  Research &amp; Innovation Indicators
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5">
                {researchIndicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indicator Card 3 - Color B (Soft Ice Blue, checkerboard) */}
            <div
              id="sec-societal-indicators"
              className="scroll-mt-32 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
              style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
            >
              <div className="flex items-center gap-3 border-b border-blue-200/60 pb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 shadow-2xs">
                  <Activity className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                  Societal Impact Indicators
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5">
                {societalIndicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indicator Card 4 - Color A (Pure White, checkerboard) */}
            <div
              id="sec-excellence-indicators"
              className="scroll-mt-32 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
              style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600">
                  <Award className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider">
                  Institutional Excellence Indicators
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5">
                {excellenceIndicators.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

      {/* Section 2: Strategic Plan Documents */}
      <section
        id="plan-documents"
        className="scroll-mt-28 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
        style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
      >
        {/* Full-Width Section Header Banner */}
        <div
          className="text-white px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
          style={{
            backgroundColor: "var(--sec2-bg, var(--level2-bg, #002147))",
            borderColor: "var(--sec2-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
          }}
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white shadow-xs shrink-0 backdrop-blur-xs">
              <FileText className="h-5 w-5" />
            </span>
            <h2
              className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
              style={{ color: "var(--sec2-title, var(--level2-title, #ffffff))" }}
            >
              Strategic Plan Documents
            </h2>
          </div>
          <p
            className="text-sm font-medium mt-1.5 sm:pl-14.5 transition-colors duration-200"
            style={{ color: "var(--sec2-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
          >
            Official institutional frameworks and annual deployment plan reports available for online flipbook preview and direct download.
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentsList.map((doc, idx) => {
              const cardId = idx === 0 ? "sec-plan-years" : idx === 1 ? "sec-plan-2025-26" : "sec-plan-2024-25";
              const isBlue = idx % 2 === 1;
              const cardBg = isBlue
                ? "border-2 border-blue-200/90"
                : "border-2 border-slate-200/90";
              const titleColor = isBlue ? "text-blue-700 group-hover:text-blue-900" : "text-blue-600 group-hover:text-blue-700";
              const iconStyle = isBlue
                ? "bg-white border border-blue-200/80 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white"
                : "bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white";
              const buttonStyle = isBlue
                ? "text-blue-700 bg-white hover:bg-[#1e40af] hover:text-white border border-blue-200/80 shadow-2xs"
                : "text-blue-600 bg-blue-50 hover:bg-[#1e40af] hover:text-white border border-blue-100/80";
              const downloadStyle = isBlue
                ? "text-slate-700 bg-white/90 hover:bg-white border border-blue-200/60 shadow-2xs"
                : "text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60";
              const formStyle = isBlue
                ? "text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 shadow-2xs"
                : "text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-100";

              return (
                <div
                  key={idx}
                  id={cardId}
                  className={`${cardBg} scroll-mt-32 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group relative overflow-hidden select-none`}
                  style={{ backgroundColor: isBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconStyle} transition-all duration-300`}>
                      <FileText className="h-6 w-6" />
                    </span>
                    <div className="flex flex-col gap-1 flex-1">
                      <h4 className={`font-outfit ${titleColor} font-extrabold text-base transition-colors leading-snug`}>
                        {doc.title}
                      </h4>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        PDF Document File
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-slate-200/60 mt-2">
                    {doc.fileUrl && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenPdf(doc.fileUrl, doc.title)}
                          className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold ${buttonStyle} px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer`}
                        >
                          <Eye className="h-4 w-4" /> View PDF
                        </button>
                        <a
                          href={doc.fileUrl}
                          download
                          className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold ${downloadStyle} px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer`}
                        >
                          <Download className="h-4 w-4" /> Download
                        </a>
                      </div>
                    )}
                    {doc.googleFormUrl && (
                      <a
                        href={doc.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 text-xs font-black ${formStyle} px-3 py-2.5 rounded-xl transition-all duration-200`}
                      >
                        <MessageSquare className="h-4 w-4" /> Section Form
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Strategic Priorities – Next Five Years */}
      <section
        id="strategic-priorities"
        className="scroll-mt-28 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
        style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
      >
        {/* Full-Width Section Header Banner */}
        <div
          className="text-white px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
          style={{
            backgroundColor: "var(--sec3-bg, var(--level2-bg, #002147))",
            borderColor: "var(--sec3-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
          }}
        >
          <div className="flex items-center gap-3">
            <Milestone className="h-6 w-6 text-indigo-300 shrink-0" />
            <h2
              className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
              style={{ color: "var(--sec3-title, var(--level2-title, #ffffff))" }}
            >
              Strategic Priorities – Next Five Years
            </h2>
          </div>
          <p
            className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
            style={{ color: "var(--sec3-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
          >
            Target development parameters across four primary institutional categories (2026–2031).
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Card 1 - Color A (Pure White) */}
            <div
              id="sec-priority-academic"
              className="scroll-mt-32 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
              style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
            >
              <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider border-b border-slate-100 pb-2">Academic Priorities</h4>
              <ul className="flex flex-col gap-2">
                {academicPriorities.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Priority Card 2 - Color B (Soft Ice Blue) */}
            <div
              id="sec-priority-infra"
              className="scroll-mt-32 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
              style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
            >
              <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider border-b border-blue-200/60 pb-2">Infrastructure Priorities</h4>
              <ul className="flex flex-col gap-2">
                {infraPriorities.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Priority Card 3 - Color B (Soft Ice Blue, checkerboard) */}
            <div
              id="sec-priority-financial"
              className="scroll-mt-32 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
              style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
            >
              <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider border-b border-blue-200/60 pb-2">Financial Priorities</h4>
              <ul className="flex flex-col gap-2">
                {financialPriorities.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Priority Card 4 - Color A (Pure White, checkerboard) */}
            <div
              id="sec-priority-global"
              className="scroll-mt-32 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
              style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
            >
              <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider border-b border-slate-100 pb-2">Global Goals &amp; International</h4>
              <ul className="flex flex-col gap-2">
                {globalPriorities.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Stakeholder Engagement & Feedback Mechanisms */}
      <section
        id="stakeholder-engagement"
        className="scroll-mt-28 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
        style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
      >
        {/* Full-Width Section Header Banner */}
        <div
          className="text-white px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
          style={{
            backgroundColor: "var(--sec4-bg, var(--level2-bg, #002147))",
            borderColor: "var(--sec4-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
          }}
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white shadow-xs shrink-0 backdrop-blur-xs">
              <Users className="h-5 w-5" />
            </span>
            <h2
              className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
              style={{ color: "var(--sec4-title, var(--level2-title, #ffffff))" }}
            >
              Stakeholder Engagement &amp; Feedback Mechanisms
            </h2>
          </div>
          <p
            className="text-sm font-medium mt-1.5 sm:pl-14.5 transition-colors duration-200"
            style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
          >
            St. Ann’s College values the active participation of all stakeholders in institutional development and decision-making.
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Student - Color A (Pure White) */}
            <div
              id="sec-feedback-student"
              className="scroll-mt-32 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
            >
              <div className="flex flex-col gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all">
                  <Users className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                  Student Feedback
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                  Regular feedback is collected regarding curriculum effectiveness, teaching-learning quality, infrastructure and campus facilities, student support services, as well as skill development and placement initiatives. Student suggestions are incorporated through academic reviews and quality enhancement measures.
                </p>
              </div>
              {(data.studentFeedbackFormUrl || "https://forms.gle/n6QfA4roPrqtPWjM8") && (
                <a
                  href={data.studentFeedbackFormUrl || "https://forms.gle/n6QfA4roPrqtPWjM8"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/70 px-4 py-3 rounded-xl transition-all shadow-xs cursor-pointer select-none group/btn"
                >
                  <MessageSquare className="h-4 w-4 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                  <span>Submit Student Feedback</span>
                  <ExternalLink className="h-3.5 w-3.5 text-blue-500 opacity-80" />
                </a>
              )}
            </div>

            {/* Card 2: Faculty - Color B (Soft Ice Blue) */}
            <div
              id="sec-feedback-faculty"
              className="scroll-mt-32 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
            >
              <div className="flex flex-col gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shadow-2xs">
                  <Building className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                  Faculty Engagement
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                  Faculty members contribute through academic planning and curriculum enrichment, research and innovation initiatives, institutional policy development, quality assurance activities, mentoring, and student guidance. Regular faculty development programmes ensure continuous professional growth.
                </p>
              </div>
              {data.facultyFeedbackFormUrl && (
                <a
                  href={data.facultyFeedbackFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-blue-200/80 px-4 py-3 rounded-xl transition-all shadow-2xs"
                >
                  <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Card 3: Parent - Color B (Soft Ice Blue, checkerboard) */}
            <div
              id="sec-feedback-parent"
              className="scroll-mt-32 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
            >
              <div className="flex flex-col gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shadow-2xs">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                  Parent &amp; Community Participation
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                  The institution engages parents and the community through parent-teacher interactions, community outreach programmes, social awareness campaigns, collaborative developmental initiatives, and extension/service-learning activities.
                </p>
              </div>
              {data.parentFeedbackFormUrl && (
                <a
                  href={data.parentFeedbackFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-blue-200/80 px-4 py-3 rounded-xl transition-all shadow-2xs"
                >
                  <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Card 4: Alumni - Color A (Pure White, checkerboard) */}
            <div
              id="sec-feedback-alumni"
              className="scroll-mt-32 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
            >
              <div className="flex flex-col gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all">
                  <Globe className="h-5 w-5" />
                </span>
                <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                  Alumni Engagement
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                  The alumni network plays a vital role in institutional advancement through career mentoring and placements, guest lectures, professional interactions, scholarships, institutional support, industry networking opportunities, and collaborative development initiatives.
                </p>
              </div>
              {data.alumniFeedbackFormUrl && (
                <a
                  href={data.alumniFeedbackFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/70 px-4 py-3 rounded-xl transition-all shadow-xs"
                >
                  <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Vision for 2047: Viksit Bharat (Indian Flag Theme / Thought of India) */}
      <section id="vision-2047" className="scroll-mt-28 bg-gradient-to-b from-amber-50/90 via-orange-50/30 to-emerald-50/80 border-2 border-amber-300/80 rounded-[2.5rem] shadow-md relative overflow-hidden">
        {/* Indian National Tricolor Top Ribbon (Saffron, White, Green) */}
        <div className="h-3 w-full grid grid-cols-3 shadow-xs">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Full-Width Section Header Banner (Thought of India / Tricolor Identity) */}
        <div
          className="text-white px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 w-full relative z-10 border-b-4 border-b-[#FF9933] transition-colors duration-200"
          style={{
            background: "var(--sec5-bg, linear-gradient(to right, #001730, #002147, #001a35))"
          }}
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[2px] shrink-0 shadow-md">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#002147]">
                <svg className="h-7 w-7 text-amber-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                  <circle cx="50" cy="50" r="44" strokeWidth="5" />
                  <circle cx="50" cy="50" r="12" strokeWidth="4" fill="currentColor" />
                  {Array.from({ length: 24 }).map((_, i) => (
                    <line key={i} x1="50" y1="50" x2="50" y2="8" stroke="currentColor" strokeWidth="3" transform={`rotate(${(i * 360) / 24} 50 50)`} />
                  ))}
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FF9933]">National &amp; State Vision</span>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Thought of India</span>
              </div>
              <h2
                className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors duration-200"
                style={{ color: "var(--sec5-title, #ffffff)" }}
              >
                Vision for 2047: <span className="text-[#FF9933]">Viksit Bharat</span> <span className="text-slate-200">&amp;</span> <span className="text-emerald-400">Swarna Andhra</span>
              </h2>
            </div>
          </div>

          <p
            className="text-sm md:text-base font-normal leading-relaxed mt-4 text-justify pl-0 sm:pl-15 transition-colors duration-200"
            style={{ color: "var(--sec5-subtitle, #f1f5f9)" }}
          >
            St. Ann’s College for Women, Guntur envisions becoming a center of excellence in women’s higher education by contributing meaningfully to the national vision of <strong className="text-[#FF9933] font-bold">Viksit Bharat @2047</strong> and the state vision of <strong className="text-emerald-400 font-bold">Swarna Andhra @2047</strong>. The institution is committed to empowering young women through quality education, innovation, leadership, sustainability, and social responsibility.
          </p>
        </div>

        {/* Decorative Ashoka Chakra Watermark */}
        <svg
          className="opacity-[0.05] text-[#000080] absolute -right-10 -bottom-10 h-80 w-80 pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <circle cx="100" cy="100" r="90" strokeWidth="5" />
          <circle cx="100" cy="100" r="82" strokeWidth="2" />
          <circle cx="100" cy="100" r="22" strokeWidth="4" />
          <circle cx="100" cy="100" r="9" fill="currentColor" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2="100"
              y2="18"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${(i * 360) / 24} 100 100)`}
            />
          ))}
        </svg>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 relative z-10">
          {/* Our Commitment List */}
          <div id="sec-vision-commitments" className="scroll-mt-32 flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <h4 className="font-outfit text-[#D97706] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                Our Commitment
              </h4>
              <span className="bg-amber-100 text-[#D97706] border border-amber-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Core Pillars
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visionCommitments.map((item, index) => {
                const mod = index % 3;
                const borderClass = mod === 0 
                  ? "border-l-[6px] !border-l-[#FF9933] border-t border-r border-b border-amber-200/80" 
                  : mod === 1 
                  ? "border-l-[6px] !border-l-[#002147] border-t border-r border-b border-slate-300/80" 
                  : "border-l-[6px] !border-l-[#138808] border-t border-r border-b border-emerald-200/80";
                const checkClass = mod === 0
                  ? "bg-amber-100 border border-amber-300 text-[#D97706]"
                  : mod === 1
                  ? "bg-slate-100 border border-slate-300 text-[#002147]"
                  : "bg-emerald-100 border border-emerald-300 text-[#138808]";
                return (
                  <div
                    key={index}
                    className={`bg-white/95 ${borderClass} rounded-2xl p-5 md:p-6 flex items-start gap-3.5 shadow-xs hover:shadow-md transition-all`}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${checkClass} font-black font-outfit text-xs mt-0.5`}>
                      ✓
                    </span>
                    <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategic Focus Areas */}
          <div id="sec-vision-focus" className="scroll-mt-32 flex flex-col gap-4 mt-2 relative z-10">
            <div className="flex items-center gap-2.5">
              <h4 className="font-outfit text-[#138808] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                Strategic Focus Areas
              </h4>
              <span className="bg-emerald-100 text-[#138808] border border-emerald-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Key Thrusts
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {focusAreas.map((area, index) => {
                const mod = index % 3;
                const borderClass = mod === 0 
                  ? "border-l-[6px] !border-l-[#FF9933] border-t border-r border-b border-amber-200/80" 
                  : mod === 1 
                  ? "border-l-[6px] !border-l-[#002147] border-t border-r border-b border-slate-300/80" 
                  : "border-l-[6px] !border-l-[#138808] border-t border-r border-b border-emerald-200/80";
                const titleColor = mod === 0 ? "text-[#D97706]" : mod === 1 ? "text-[#002147]" : "text-[#138808]";
                return (
                  <div key={index} className={`bg-white/95 ${borderClass} rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all`}>
                    <div className="flex flex-col gap-2.5">
                      <h5 className={`font-outfit ${titleColor} font-extrabold text-sm md:text-base tracking-tight border-b border-slate-100 pb-2`}>
                        {area.title}
                      </h5>
                      <ul className="flex flex-col gap-1.5 list-disc pl-4 text-slate-655 text-sm font-medium leading-relaxed">
                        {area.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-justify">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {area.links.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 mt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">References:</span>
                        {area.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xs font-black ${titleColor} hover:underline flex items-center gap-0.5`}
                          >
                            {link.text} <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature Initiatives */}
          <div id="sec-vision-initiatives" className="scroll-mt-32 flex flex-col gap-4 mt-2 relative z-10">
            <div className="flex items-center gap-2.5">
              <h4 className="font-outfit text-[#D97706] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                Vision 2047 – Signature Initiatives
              </h4>
              <span className="bg-amber-100 text-[#D97706] border border-amber-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Flagship Programs
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {signatureInitiatives.map((item, index) => {
                const mod = index % 3;
                const cardBorder = mod === 0 
                  ? "border-l-[6px] !border-l-[#FF9933] border-t border-r border-b border-amber-200/80" 
                  : mod === 1 
                  ? "border-l-[6px] !border-l-[#002147] border-t border-r border-b border-slate-300/80" 
                  : "border-l-[6px] !border-l-[#138808] border-t border-r border-b border-emerald-200/80";
                const titleColor = mod === 0 ? "text-[#D97706]" : mod === 1 ? "text-[#002147]" : "text-[#138808]";
                return (
                  <div
                    key={index}
                    className={`bg-white/95 ${cardBorder} rounded-2xl p-6 shadow-xs flex flex-col gap-2 hover:shadow-md transition-all group`}
                  >
                    <h5 className={`font-outfit ${titleColor} font-extrabold text-sm md:text-base tracking-tight transition-colors`}>
                      {item.title}
                    </h5>
                    <p className="text-slate-600 text-sm font-semibold leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Future Vision Summary */}
          <div id="sec-vision-swarna" className="scroll-mt-32 flex flex-col gap-4 mt-2 relative z-10">
            <div className="flex items-center gap-2.5">
              <h4 className="font-outfit text-[#138808] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                Our Vision for the Future
              </h4>
              <span className="bg-emerald-100 text-[#138808] border border-emerald-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Aspirations
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {futureVisions.map((item, index) => {
                const mod = index % 3;
                const cardBorder = mod === 0 
                  ? "border-l-[6px] !border-l-[#FF9933] border-t border-r border-b border-amber-200/80" 
                  : mod === 1 
                  ? "border-l-[6px] !border-l-[#002147] border-t border-r border-b border-slate-300/80" 
                  : "border-l-[6px] !border-l-[#138808] border-t border-r border-b border-emerald-200/80";
                return (
                  <div
                    key={index}
                    className={`bg-white/95 ${cardBorder} rounded-2xl p-4 flex items-center justify-center text-center shadow-xs hover:shadow-sm hover:scale-[1.02] transition-all group`}
                  >
                    <p className="font-outfit text-sm font-extrabold leading-snug text-slate-800">
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Reference Resource Links */}
      <section
        id="resource-links"
        className="scroll-mt-28 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
        style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}
      >
        {/* Full-Width Section Header Banner */}
        <div
          className="text-white px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 w-full flex flex-col justify-center border-b transition-colors duration-200"
          style={{
            backgroundColor: "var(--sec6-bg, var(--level2-bg, #002147))",
            borderColor: "var(--sec6-border, var(--level2-border, rgba(49, 46, 129, 0.2)))"
          }}
        >
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-indigo-300 shrink-0" />
            <h2
              className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
              style={{ color: "var(--sec6-title, var(--level2-title, #ffffff))" }}
            >
              Reference Resource Links
            </h2>
          </div>
          <p
            className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
            style={{ color: "var(--sec6-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
          >
            National &amp; State portal alignments supporting developed India (Viksit Bharat) and Swarna Andhra roadmaps.
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
          {/* Viksit Bharat links */}
          <div id="sec-resource-national" className="scroll-mt-32 flex flex-col gap-4">
            <h5 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
              Viksit Bharat @2047 Links
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {externalResources.viksit.map((portal, index) => {
                const isBlue = index % 2 === 1;
                const cardBg = isBlue
                  ? "border-2 border-blue-200/90"
                  : "border-2 border-slate-200/90";
                const titleHover = isBlue ? "group-hover:text-blue-800" : "group-hover:text-blue-600";
                const linkHover = isBlue ? "group-hover:text-blue-800" : "group-hover:text-blue-600";

                return (
                  <a
                    key={index}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardBg} rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all group`}
                    style={{ backgroundColor: isBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <h5 className={`font-outfit text-slate-800 font-black text-sm md:text-base tracking-tight ${titleHover} transition-colors`}>
                          {portal.title}
                        </h5>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          {portal.desc}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center justify-end text-xs font-bold text-slate-400 ${linkHover} transition-colors pt-4 mt-2 border-t border-slate-200/60 gap-1.5`}>
                      View Portal <ExternalLink className="h-3 w-3" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Swarna Andhra links */}
          <div id="sec-resource-state" className="scroll-mt-32 flex flex-col gap-4 mt-2">
            <h5 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider">
              Swarna Andhra @2047 Links
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {externalResources.swarna.map((portal, index) => {
                const isBlue = index % 2 === 1;
                const cardBg = isBlue
                  ? "border-2 border-blue-200/90"
                  : "border-2 border-slate-200/90";
                const titleHover = isBlue ? "group-hover:text-blue-800" : "group-hover:text-blue-600";
                const linkHover = isBlue ? "group-hover:text-blue-800" : "group-hover:text-blue-600";

                return (
                  <a
                    key={index}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardBg} rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all group`}
                    style={{ backgroundColor: isBlue ? "var(--card-alt-bg, #e8f1fd)" : "var(--card-main-bg, #ffffff)" }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <h5 className={`font-outfit text-slate-800 font-black text-sm md:text-base tracking-tight ${titleHover} transition-colors`}>
                          {portal.title}
                        </h5>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          {portal.desc}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center justify-end text-xs font-bold text-slate-400 ${linkHover} transition-colors pt-4 mt-2 border-t border-slate-200/60 gap-1.5`}>
                      View Portal <ExternalLink className="h-3 w-3" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
        </main>
      </div>
      </div>

      {/* 7. Flipbook Modal Reader */}
      {selectedFileUrl && (
        <FilePreviewModal
          isOpen={true}
          onClose={() => {
            setSelectedFileUrl(null);
            setSelectedFileTitle("");
          }}
          fileUrl={selectedFileUrl}
          title={selectedFileTitle}
        />
      )}
    </div>
  );
}
