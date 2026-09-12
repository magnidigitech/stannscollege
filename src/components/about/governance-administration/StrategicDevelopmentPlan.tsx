"use client";

import React, { useState, useEffect } from "react";
import {
  FileText, Eye, Shield, BookOpen, GraduationCap, Users, Laptop,
  Briefcase, Leaf, ShieldCheck, ArrowRight, Milestone, Download,
  ExternalLink, Globe, CheckCircle2, MessageSquare, Building, Scale,
  Flame, Activity, Award, HeartHandshake, TrendingUp, Coins, Sparkles, Quote, Network, X
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import { getStrategicPlan } from "@/lib/sanity";
import AboutSidebar, { SidebarCategory } from "@/components/about/AboutSidebar";

interface StrategicPlanDocument {
  title: string;
  fileUrl: string;
}

interface StrategicPlanData {
  title: string;
  executiveSummary: string;
  googleFormUrl?: string;
  studentFeedbackFormUrl?: string;
  facultyFeedbackFormUrl?: string;
  parentFeedbackFormUrl?: string;
  alumniFeedbackFormUrl?: string;
  communityFeedbackFormUrl?: string;
  employerFeedbackFormUrl?: string;
  documents?: StrategicPlanDocument[];
}

const defaultPlanData: StrategicPlanData = {
  title: "Strategic Plans & Future Directions",
  executiveSummary: "St. Ann’s College for Women, Guntur, envisions a transformative future rooted in academic excellence, innovation, women empowerment, social responsibility, and nation-building. Guided by the values of the Congregation of the Sisters of St. Ann and aligned with the aspirations of Viksit Bharat @2047 and Swarna Andhra @2047, the institution is committed to nurturing globally competent, ethically grounded, and socially responsible women leaders.",
  googleFormUrl: "https://www.google.com",
  studentFeedbackFormUrl: "https://forms.gle/n6QfA4roPrqtPWjM8",
  facultyFeedbackFormUrl: "https://www.google.com",
  parentFeedbackFormUrl: "https://www.google.com",
  alumniFeedbackFormUrl: "https://www.google.com",
  communityFeedbackFormUrl: "https://www.google.com",
  employerFeedbackFormUrl: "https://www.google.com",
  documents: [
    {
      title: "Institutional Strategic Framework 2024-2030 (Years Plan)",
      fileUrl: "/documents/Institutional Strategic Framework  2024-2030.pdf",
    },
    {
      title: "Annual Deployment Plan 2025–2026",
      fileUrl: "/documents/Annual Plan Deployment Report  2025-2026.pdf",
    },
    {
      title: "Annual Deployment Plan 2024–2025",
      fileUrl: "/documents/Annual Plan Deployment Report  2024-2025.pdf",
    },
    {
      title: "Annual Deployment Plan 2023–2024",
      fileUrl: "/documents/Annual Plan Deployment Report  2024-2025.pdf",
    },
    {
      title: "Annual Deployment Plan 2022–2023",
      fileUrl: "/documents/Annual Plan Deployment Report  2024-2025.pdf",
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

// Reorganized into 4 categories matching Image 1
const STRATEGIC_PLAN_CATEGORIES: SidebarCategory[] = [
  {
    catSlug: "performance-indicators",
    title: "1. Institutional Performance Indicators",
    sectionId: "performance-indicators",
    items: [
      { text: "a. Academic Performance Indicators", id: "sec-academic-indicators" },
      { text: "b. Research & Innovation Indicators", id: "sec-research-indicators" },
      { text: "c. Societal Impact Indicators", id: "sec-societal-indicators" },
      { text: "d. Institutional Excellence Indicators", id: "sec-excellence-indicators" },
    ],
  },
  {
    catSlug: "strategic-priorities",
    title: "2. Strategic Priorities – 2026–2031",
    sectionId: "strategic-priorities",
    items: [
      { text: "a. Academic Priorities", id: "sec-priority-academic" },
      { text: "b. Infrastructure Priorities", id: "sec-priority-infra" },
      { text: "c. Financial Priorities", id: "sec-priority-financial" },
      { text: "d. Global Goals & Internationalization", id: "sec-priority-global" },
      { text: "e. Strategic Documents", id: "sec-strategic-documents" },
    ],
  },
  {
    catSlug: "stakeholder-engagement",
    title: "3. Stakeholder Engagement & Feedback",
    sectionId: "stakeholder-engagement",
    items: [
      { text: "a. Student Feedback", id: "sec-feedback-student" },
      { text: "b. Faculty Engagement", id: "sec-feedback-faculty" },
      { text: "c. Parent Feedback", id: "sec-feedback-parent" },
      { text: "d. Alumni Engagement", id: "sec-feedback-alumni" },
      { text: "e. Stakeholder /Community Feedback", id: "sec-feedback-community" },
      { text: "f. Employers Feedback", id: "sec-feedback-employers" },
    ],
  },
  {
    catSlug: "vision-2047",
    title: "4. Vision for 2047: Viksit Bharat @ 2047 & Swarna Andhra 2047",
    sectionId: "vision-2047",
    items: [
      { text: "a. Our Commitment", id: "sec-vision-commitments" },
      { text: "b. Strategic Focus Areas", id: "sec-vision-focus" },
      { text: "c. Vision 2047-Signature Initiatives", id: "sec-vision-initiatives" },
      { text: "d. Our Vision for the Future", id: "sec-vision-swarna" },
      { text: "e. Reference Resource Links", id: "sec-reference-resources" },
    ],
  },
];

export function StrategicDevelopmentPlan() {
  const [data, setData] = useState<StrategicPlanData>(defaultPlanData);
  const [loading, setLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string>("performance-indicators");
  const [isAllDocsModalOpen, setIsAllDocsModalOpen] = useState(false);
  const [docSearchQuery, setDocSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAllDocsModalOpen(false);
      }
    };
    if (isAllDocsModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAllDocsModalOpen]);

  useEffect(() => {
    const allIds = [
      "performance-indicators",
      "sec-academic-indicators",
      "sec-research-indicators",
      "sec-societal-indicators",
      "sec-excellence-indicators",
      "strategic-priorities",
      "sec-priority-academic",
      "sec-priority-infra",
      "sec-priority-financial",
      "sec-priority-global",
      "sec-strategic-documents",
      "sec-plan-years",
      "sec-plan-2025-26",
      "sec-plan-2024-25",
      "stakeholder-engagement",
      "sec-feedback-student",
      "sec-feedback-faculty",
      "sec-feedback-parent",
      "sec-feedback-alumni",
      "sec-feedback-community",
      "sec-feedback-employers",
      "vision-2047",
      "sec-vision-commitments",
      "sec-vision-focus",
      "sec-vision-initiatives",
      "sec-vision-swarna",
      "sec-reference-resources",
      "sec-resource-national",
      "sec-resource-state",
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
            facultyFeedbackFormUrl: (fetchedPlan.facultyFeedbackFormUrl && fetchedPlan.facultyFeedbackFormUrl !== "https://www.google.com/search?q=%23")
              ? fetchedPlan.facultyFeedbackFormUrl
              : defaultPlanData.facultyFeedbackFormUrl,
            parentFeedbackFormUrl: (fetchedPlan.parentFeedbackFormUrl && fetchedPlan.parentFeedbackFormUrl !== "https://www.google.com/search?q=%23")
              ? fetchedPlan.parentFeedbackFormUrl
              : defaultPlanData.parentFeedbackFormUrl,
            alumniFeedbackFormUrl: (fetchedPlan.alumniFeedbackFormUrl && fetchedPlan.alumniFeedbackFormUrl !== "https://www.google.com/search?q=%23")
              ? fetchedPlan.alumniFeedbackFormUrl
              : defaultPlanData.alumniFeedbackFormUrl,
            communityFeedbackFormUrl: (fetchedPlan.communityFeedbackFormUrl && fetchedPlan.communityFeedbackFormUrl !== "https://www.google.com/search?q=%23")
              ? fetchedPlan.communityFeedbackFormUrl
              : defaultPlanData.communityFeedbackFormUrl,
            employerFeedbackFormUrl: (fetchedPlan.employerFeedbackFormUrl && fetchedPlan.employerFeedbackFormUrl !== "https://www.google.com/search?q=%23")
              ? fetchedPlan.employerFeedbackFormUrl
              : defaultPlanData.employerFeedbackFormUrl,
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
  const displayedDocs = documentsList.slice(0, 3);
  const filteredAllDocs = documentsList.filter((doc) =>
    doc.title.toLowerCase().includes(docSearchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col font-sans select-none animate-fadeIn w-full">
      {/* Main Content Container (Sidebar on Left, Data Elements on Right) */}
      <div className="max-w-[1600px] mx-auto pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Left: About Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <AboutSidebar
            categories={STRATEGIC_PLAN_CATEGORIES}
            bannerTitle="Strategic Plans & Future Directions"
            bannerSubtitle="Sections on this Page"
            activeId={activeSectionId}
            onItemClick={(id) => setActiveSectionId(id)}
          />
        </aside>

        {/* Right: Data Elements / Sections */}
        <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
          <div className="flex flex-col gap-4">
            {/* Sub-text Box */}
            <SubtextBox variant="tricolor" icon="ashoka-chakra">
              {data.executiveSummary && !data.executiveSummary.includes("envisions a transformative future") ? (
                <div style={{ color: "var(--sidebar-bg, #1e40af)" }} className="font-medium">
                  {data.executiveSummary}
                </div>
              ) : (
                <p style={{ color: "var(--sidebar-bg, #1e40af)" }} className="font-medium">
                  <mark style={{ color: "var(--sidebar-bg, #1e40af)" }} className="bg-amber-100/75 font-extrabold text-[1.15em] px-1.5 py-0.5 rounded not-italic">
                    St. Ann’s College for Women, Guntur
                  </mark>, envisions a transformative future rooted in academic excellence, innovation, women empowerment, social responsibility, and nation-building. Guided by the values of the Congregation of the Sisters of St. Ann and aligned with the aspirations of{" "}
                  <mark style={{ color: "var(--sidebar-bg, #1e40af)" }} className="bg-amber-100/75 font-extrabold text-[1.15em] px-1.5 py-0.5 rounded not-italic">
                    Viksit Bharat @2047
                  </mark>{" "}
                  and{" "}
                  <mark style={{ color: "var(--sidebar-bg, #1e40af)" }} className="bg-amber-100/75 font-extrabold text-[1.15em] px-1.5 py-0.5 rounded not-italic">
                    Swarna Andhra @2047
                  </mark>, the institution is committed to nurturing globally competent, ethically grounded, and socially responsible women leaders.
                </p>
              )}
            </SubtextBox>

            {/* Section 1: Institutional Performance Indicators (Unchanged) */}
            <section
              id="performance-indicators"
              className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
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
                    1. Institutional Performance Indicators
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
                    className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
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
                    className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
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
                    className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
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
                    className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
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

          {/* Section 2: Strategic Priorities – 2026–2031 (Merged with PDF Documents at bottom) */}
          <section
            id="strategic-priorities"
            className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
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
                  2. Strategic Priorities – 2026–2031
                </h2>
              </div>
              <p
                className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
                style={{ color: "var(--sec3-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
              >
                Target development parameters across four primary institutional categories and official strategic deployment documents.
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10 space-y-10 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
              {/* Priorities Grid (a, b, c, d) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* a. Academic Priorities */}
                <div
                  id="sec-priority-academic"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider border-b border-slate-100 pb-2">
                    a. Academic Priorities
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {academicPriorities.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* b. Infrastructure Priorities */}
                <div
                  id="sec-priority-infra"
                  className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
                  style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                >
                  <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider border-b border-blue-200/60 pb-2">
                    b. Infrastructure Priorities
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {infraPriorities.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* c. Financial Priorities */}
                <div
                  id="sec-priority-financial"
                  className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
                  style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                >
                  <h4 className="font-outfit text-blue-700 font-extrabold text-base uppercase tracking-wider border-b border-blue-200/60 pb-2">
                    c. Financial Priorities
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {financialPriorities.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* d. Global Goals & Internationalization */}
                <div
                  id="sec-priority-global"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col gap-3.5 hover:shadow-md transition-all"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <h4 className="font-outfit text-blue-600 font-extrabold text-base uppercase tracking-wider border-b border-slate-100 pb-2">
                    d. Global Goals &amp; Internationalization
                  </h4>
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

              {/* e. Strategic Documents (Placed at the bottom of Section 2) */}
              <div id="sec-strategic-documents" className="scroll-mt-52 pt-8 border-t border-slate-300/80 flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/80 border border-blue-200 text-blue-700 shrink-0 font-bold">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider">
                        e. Strategic Documents
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Official institutional strategic plan &amp; annual deployment reports available for view and download.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setIsAllDocsModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#002147] hover:bg-[#003366] px-4 py-1.5 rounded-full transition-all shadow-xs hover:shadow hover:scale-105 active:scale-95 cursor-pointer select-none"
                      title="View all strategic plans & annual deployment documents"
                    >
                      <FileText className="h-3.5 w-3.5 text-amber-300" />
                      <span>View All</span>
                      <ExternalLink className="h-3 w-3 opacity-80" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {displayedDocs.map((doc, idx) => {
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

                    return (
                      <div
                        key={idx}
                        id={cardId}
                        className={`${cardBg} scroll-mt-52 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group relative overflow-hidden select-none`}
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Stakeholder Engagement & Feedback (6 Feedback Cards + Process Flow) */}
          <section
            id="stakeholder-engagement"
            className="scroll-mt-52 border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors duration-200"
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
                  3. Stakeholder Engagement &amp; Feedback Mechanism
                </h2>
              </div>
              <p
                className="text-sm font-medium mt-1.5 sm:pl-14.5 transition-colors duration-200"
                style={{ color: "var(--sec4-subtitle, var(--level2-subtitle, rgba(219, 234, 254, 0.9)))" }}
              >
                St. Ann’s College values the active participation of all stakeholders in institutional development, academic enrichment, and quality governance.
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10 space-y-8 transition-colors duration-200" style={{ backgroundColor: "var(--section-container-bg, #eaeff5)" }}>
              {/* 6 Feedback Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* a. Student Feedback */}
                <div
                  id="sec-feedback-student"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex flex-col gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all">
                      <Users className="h-5 w-5" />
                    </span>
                    <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                      a. Student Feedback
                    </h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                      Feedback is obtained from students on curriculum, teaching-learning, faculty effectiveness, infrastructure, mentoring, student support, and overall academic experience.
                    </p>
                  </div>
                  <a
                    href={data.studentFeedbackFormUrl || "https://forms.gle/n6QfA4roPrqtPWjM8"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-3 rounded-xl transition-all shadow-xs cursor-pointer select-none group/btn"
                  >
                    <MessageSquare className="h-4 w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Links: Student Feedback Form</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500 opacity-80" />
                  </a>
                </div>

                {/* b. Faculty Feedback */}
                <div
                  id="sec-feedback-faculty"
                  className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                >
                  <div className="flex flex-col gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shadow-2xs">
                      <Building className="h-5 w-5" />
                    </span>
                    <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                      b. Faculty Feedback
                    </h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                      Faculty feedback is collected on curriculum, academic planning, teaching-learning resources, infrastructure, professional development, research, and institutional support.
                    </p>
                  </div>
                  <a
                    href={data.facultyFeedbackFormUrl || "https://www.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200/80 px-4 py-3 rounded-xl transition-all shadow-2xs cursor-pointer select-none group/btn"
                  >
                    <MessageSquare className="h-4 w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Links: Faculty Feedback Form</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500 opacity-80" />
                  </a>
                </div>

                {/* c. Parent / Guardian Feedback */}
                <div
                  id="sec-feedback-parent"
                  className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                >
                  <div className="flex flex-col gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shadow-2xs">
                      <HeartHandshake className="h-5 w-5" />
                    </span>
                    <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                      c. Parent / Guardian Feedback
                    </h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                      Parents/Guardians provide feedback on academic support, student development, communication, facilities, mentoring, career guidance, and overall institutional experience.
                    </p>
                  </div>
                  <a
                    href={data.parentFeedbackFormUrl || "https://www.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200/80 px-4 py-3 rounded-xl transition-all shadow-2xs cursor-pointer select-none group/btn"
                  >
                    <MessageSquare className="h-4 w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Links: Parent Feedback Form</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500 opacity-80" />
                  </a>
                </div>

                {/* d. Alumni Feedback */}
                <div
                  id="sec-feedback-alumni"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex flex-col gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all">
                      <Globe className="h-5 w-5" />
                    </span>
                    <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                      d. Alumni Feedback
                    </h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                      Alumni feedback focuses on curriculum relevance, skill development, employability, career preparedness, institutional facilities, and suggestions for improvement.
                    </p>
                  </div>
                  <a
                    href={data.alumniFeedbackFormUrl || "https://www.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-3 rounded-xl transition-all shadow-xs cursor-pointer select-none group/btn"
                  >
                    <MessageSquare className="h-4 w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Links: Alumni Feedback Form</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500 opacity-80" />
                  </a>
                </div>

                {/* e. Stakeholder / Community Feedback */}
                <div
                  id="sec-feedback-community"
                  className="scroll-mt-52 border-2 border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  style={{ backgroundColor: "var(--card-main-bg, #ffffff)" }}
                >
                  <div className="flex flex-col gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/60 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all">
                      <Network className="h-5 w-5" />
                    </span>
                    <h4 className="font-outfit text-blue-600 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                      e. Stakeholder / Community Feedback
                    </h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                      Feedback from community members and other stakeholders helps the Institution improve its extension activities, social initiatives, women empowerment programmes, sustainability practices, and community engagement.
                    </p>
                  </div>
                  <a
                    href={data.communityFeedbackFormUrl || "https://www.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-3 rounded-xl transition-all shadow-xs cursor-pointer select-none group/btn"
                  >
                    <MessageSquare className="h-4 w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Links: Stakeholder / Community Feedback Form</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500 opacity-80" />
                  </a>
                </div>

                {/* f. Employer Feedback */}
                <div
                  id="sec-feedback-employers"
                  className="scroll-mt-52 border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  style={{ backgroundColor: "var(--card-alt-bg, #e8f1fd)" }}
                >
                  <div className="flex flex-col gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-200/80 text-blue-600 group-hover:bg-[#1e40af] group-hover:text-white transition-all shadow-2xs">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <h4 className="font-outfit text-blue-700 font-extrabold text-base md:text-lg uppercase tracking-wider leading-snug">
                      f. Employer Feedback
                    </h4>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                      Employer feedback helps assess students' technical knowledge, communication, teamwork, problem-solving, professional skills, employability, and workplace readiness.
                    </p>
                  </div>
                  <a
                    href={data.employerFeedbackFormUrl || "https://www.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-black text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200/80 px-4 py-3 rounded-xl transition-all shadow-2xs cursor-pointer select-none group/btn"
                  >
                    <MessageSquare className="h-4 w-4 text-rose-600 group-hover/btn:scale-110 transition-transform" />
                    <span>Links: Employer Feedback Form</span>
                    <ExternalLink className="h-3.5 w-3.5 text-rose-500 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Feedback & Continuous Improvement (Process workflow from Image 3) */}
              <div className="pt-8 border-t border-slate-300/80 flex flex-col items-center text-center gap-6">
                <div className="flex flex-col items-center gap-3">
                  <h4 className="font-outfit text-slate-900 font-extrabold text-base md:text-lg tracking-tight">
                    Feedback &amp; Continuous Improvement
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-bold text-slate-800 bg-white/95 border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-xs">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">Feedback Collection</span>
                    <span className="text-slate-400 font-black px-1">→</span>
                    <span className="px-3 py-1.5 bg-indigo-50 text-indigo-800 rounded-lg border border-indigo-100">Analysis</span>
                    <span className="text-slate-400 font-black px-1">→</span>
                    <span className="px-3 py-1.5 bg-purple-50 text-purple-800 rounded-lg border border-purple-100">Review</span>
                    <span className="text-slate-400 font-black px-1">→</span>
                    <span className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg border border-amber-100">Action Taken</span>
                    <span className="text-slate-400 font-black px-1">→</span>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100">Continuous Improvement</span>
                  </div>
                </div>
                <p className="max-w-3xl text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                  The Institution uses stakeholder feedback as an important input for strengthening academic practices, institutional processes, student services, and quality enhancement initiatives.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Vision for 2047: Viksit Bharat & Swarna Andhra 2047 (Consolidated with Reference Links) */}
          <section id="vision-2047" className="scroll-mt-52 bg-gradient-to-b from-amber-50/90 via-orange-50/30 to-emerald-50/80 border-2 border-amber-300/80 rounded-[2.5rem] shadow-md relative overflow-hidden">
            {/* Indian National Tricolor Top Ribbon (Saffron, White, Green) */}
            <div className="h-3 w-full grid grid-cols-3 shadow-xs">
              <div className="bg-[#FF9933]"></div>
              <div className="bg-white"></div>
              <div className="bg-[#138808]"></div>
            </div>

            {/* Full-Width Section Header Banner (Indian National Flag Tricolor Identity) */}
            <div
              className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 w-full relative z-10 border-b-4 border-b-[#138808] transition-colors duration-200 overflow-hidden shadow-xs"
              style={{
                background: "var(--sec5-bg, linear-gradient(135deg, #FFD8B2 0%, #FFEEDD 16%, #FFFFFF 40%, #FFFFFF 60%, #DCF5DF 84%, #B6ECC0 100%))"
              }}
            >
              {/* Subtle Ashoka Chakra Watermark inside Banner */}
              <svg
                className="opacity-[0.07] text-[#000080] absolute -right-6 -top-6 h-56 w-56 pointer-events-none select-none"
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

              <div className="flex items-center gap-3.5 relative z-10">
                {/* Ashoka Chakra Crest Badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border-2 border-[#002147]/15 p-1 shrink-0 shadow-sm">
                  <div className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#002147] text-amber-300 shadow-xs">
                    <svg className="h-7 w-7" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
                      <circle cx="50" cy="50" r="44" strokeWidth="5" />
                      <circle cx="50" cy="50" r="12" strokeWidth="4" fill="currentColor" />
                      {Array.from({ length: 24 }).map((_, i) => (
                        <line key={i} x1="50" y1="50" x2="50" y2="8" stroke="currentColor" strokeWidth="3" transform={`rotate(${(i * 360) / 24} 50 50)`} />
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#C25E00] bg-white/90 border border-amber-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                      National &amp; State Vision
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#138808] bg-white/90 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                      Thought of India
                    </span>
                  </div>
                  <h2
                    className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors duration-200"
                    style={{ color: "var(--sec5-title, #002147)" }}
                  >
                    4. Vision for 2047: <span className="text-[#C25E00]">Viksit Bharat @ 2047</span> <span className="text-[#002147]">&amp;</span> <span className="text-[#138808]">Swarna Andhra 2047</span>
                  </h2>
                </div>
              </div>

              <p
                className="text-sm md:text-base font-semibold leading-relaxed mt-4 text-justify pl-0 sm:pl-15.5 transition-colors duration-200 text-slate-800 relative z-10"
                style={{ color: "var(--sec5-subtitle, #1e293b)" }}
              >
                St. Ann’s College for Women, Guntur envisions becoming a center of excellence in women’s higher education by contributing meaningfully to the national vision of <strong className="text-[#C25E00] font-black">Viksit Bharat @2047</strong> and the state vision of <strong className="text-[#138808] font-black">Swarna Andhra @2047</strong>. The institution is committed to empowering young women through quality education, innovation, leadership, sustainability, and social responsibility.
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
              {/* a. Our Commitment List */}
              <div id="sec-vision-commitments" className="scroll-mt-52 flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-outfit text-[#D97706] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                    a. Our Commitment
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

              {/* b. Strategic Focus Areas */}
              <div id="sec-vision-focus" className="scroll-mt-52 flex flex-col gap-4 mt-2 relative z-10">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-outfit text-[#138808] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                    b. Strategic Focus Areas
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

              {/* c. Vision 2047 – Signature Initiatives */}
              <div id="sec-vision-initiatives" className="scroll-mt-52 flex flex-col gap-4 mt-2 relative z-10">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-outfit text-[#D97706] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                    c. Vision 2047-Signature Initiatives
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

              {/* d. Our Vision for the Future */}
              <div id="sec-vision-swarna" className="scroll-mt-52 flex flex-col gap-4 mt-2 relative z-10">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-outfit text-[#138808] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                    d. Our Vision for the Future
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

              {/* e. Reference Resource Links (Integrated into Section 4 with Vision 2047 Theme) */}
              <div id="sec-reference-resources" className="scroll-mt-52 flex flex-col gap-6 mt-8 pt-8 border-t-2 border-amber-300/60 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-[#D97706] border border-amber-300 font-bold shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-outfit text-[#002147] font-extrabold text-base md:text-lg uppercase tracking-wider select-none">
                      e. Reference Resource Links
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      National &amp; State portal alignments supporting developed India (Viksit Bharat @2047) and Swarna Andhra 2047 roadmaps.
                    </p>
                  </div>
                </div>

                {/* Viksit Bharat links */}
                <div id="sec-resource-national" className="scroll-mt-52 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF9933]" />
                    <h5 className="font-outfit text-[#D97706] font-extrabold text-sm md:text-base uppercase tracking-wider">
                      Viksit Bharat @2047 National Portals
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {externalResources.viksit.map((portal, index) => (
                      <a
                        key={index}
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/95 border-l-[5px] border-l-[#FF9933] border-t border-r border-b border-amber-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all group"
                      >
                        <div className="flex flex-col gap-2">
                          <h6 className="font-outfit text-slate-900 group-hover:text-[#D97706] font-bold text-sm transition-colors">
                            {portal.title}
                          </h6>
                          <p className="text-slate-600 text-xs font-medium leading-relaxed">
                            {portal.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-end text-xs font-bold text-[#D97706] transition-colors pt-3 mt-2 border-t border-slate-100 gap-1">
                          <span>View Portal</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Swarna Andhra links */}
                <div id="sec-resource-state" className="scroll-mt-52 flex flex-col gap-3 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#138808]" />
                    <h5 className="font-outfit text-[#138808] font-extrabold text-sm md:text-base uppercase tracking-wider">
                      Swarna Andhra 2047 State Portals
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {externalResources.swarna.map((portal, index) => (
                      <a
                        key={index}
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/95 border-l-[5px] border-l-[#138808] border-t border-r border-b border-emerald-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all group"
                      >
                        <div className="flex flex-col gap-2">
                          <h6 className="font-outfit text-slate-900 group-hover:text-[#138808] font-bold text-sm transition-colors">
                            {portal.title}
                          </h6>
                          <p className="text-slate-600 text-xs font-medium leading-relaxed">
                            {portal.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-end text-xs font-bold text-[#138808] transition-colors pt-3 mt-2 border-t border-slate-100 gap-1">
                          <span>View Portal</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      </div>

      {/* All Strategic Documents Modal Popup */}
      {isAllDocsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs select-none animate-fadeIn"
          onClick={() => setIsAllDocsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#002147] text-white px-6 py-5 sm:px-8 flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-amber-300 shadow-xs shrink-0">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-outfit font-black text-lg sm:text-xl text-white tracking-tight">
                      All Strategic Plans &amp; Deployment Documents
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs hidden sm:inline-block">
                      {documentsList.length} Total
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Complete archive of institutional framework plans and annual deployment reports.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAllDocsModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Search / Filter Bar */}
            {documentsList.length > 3 && (
              <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0 flex items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Search documents by title, year..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-xs sm:text-sm font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147]"
                />
                {docSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setDocSearchQuery("")}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 shrink-0 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Modal Scrollable Content: All PDFs */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[58vh] bg-slate-50/50">
              {filteredAllDocs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-semibold text-sm">
                  No documents found matching &ldquo;{docSearchQuery}&rdquo;
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAllDocs.map((doc, idx) => {
                    const isBlue = idx % 2 === 1;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl p-5 border-2 ${
                          isBlue ? "bg-[#e8f1fd] border-blue-200/90" : "bg-white border-slate-200/90"
                        } shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              isBlue
                                ? "bg-white border border-blue-200/80 text-blue-700"
                                : "bg-blue-50 border border-blue-100/60 text-blue-600"
                            } font-bold`}
                          >
                            <FileText className="h-5 w-5" />
                          </span>
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                Document #{idx + 1}
                              </span>
                              {idx < 3 && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                  Latest
                                </span>
                              )}
                            </div>
                            <h4
                              className={`font-outfit font-extrabold text-sm sm:text-base leading-snug ${
                                isBlue ? "text-blue-900" : "text-slate-900"
                              }`}
                            >
                              {doc.title}
                            </h4>
                            <p className="text-slate-500 text-[11px] font-semibold">
                              Official PDF Report Document
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-slate-200/80 mt-1">
                          <button
                            type="button"
                            onClick={() => handleOpenPdf(doc.fileUrl, doc.title)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] bg-white hover:bg-[#002147] hover:text-white border border-slate-200/90 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View PDF</span>
                          </button>
                          <a
                            href={doc.fileUrl}
                            download
                            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-500">
                Showing {filteredAllDocs.length} of {documentsList.length} documents
              </span>
              <button
                type="button"
                onClick={() => setIsAllDocsModalOpen(false)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flipbook Modal Reader */}
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
