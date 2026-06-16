"use client";

import React, { useState, useEffect } from "react";
import {
  FileText, Eye, Shield, BookOpen, GraduationCap, Users, Laptop,
  Briefcase, Leaf, ShieldCheck, ArrowRight, Milestone, Download,
  ExternalLink, Globe, CheckCircle2, MessageSquare, Building, Scale,
  Flame, Activity, Award, HeartHandshake, TrendingUp, Coins
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getStrategicPlan } from "@/lib/sanity";

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
  studentFeedbackFormUrl: "https://www.google.com/search?q=%23",
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

export function StrategicDevelopmentPlan() {
  const [data, setData] = useState<StrategicPlanData>(defaultPlanData);
  const [loading, setLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPlan = await getStrategicPlan();
        if (fetchedPlan) {
          setData({
            title: fetchedPlan.title || defaultPlanData.title,
            executiveSummary: fetchedPlan.executiveSummary || defaultPlanData.executiveSummary,
            googleFormUrl: fetchedPlan.googleFormUrl || defaultPlanData.googleFormUrl,
            studentFeedbackFormUrl: fetchedPlan.studentFeedbackFormUrl || defaultPlanData.studentFeedbackFormUrl,
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
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn pb-16">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001730] via-[#002147] to-[#0d3b66] p-8 md:p-12 text-white shadow-2xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/25 px-4 py-1.5 text-xs font-black text-indigo-200 tracking-wider uppercase w-fit">
              <Shield className="h-3.5 w-3.5 text-indigo-300" /> Strategic Roadmap
            </span>
            <h1 className="font-outfit text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
              {data.title}
            </h1>
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-indigo-200/90">
              St. Ann’s College for Women, Guntur
            </p>
            <p className="text-slate-200 text-sm md:text-base font-normal leading-relaxed max-w-4xl text-justify">
              {data.executiveSummary}
            </p>
          </div>
          {data.googleFormUrl && (
            <a
              href={data.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 border border-amber-400/20 px-6 py-4 text-xs font-black text-[#001730] uppercase tracking-wider transition-all select-none hover:scale-[1.03] shrink-0 shadow-lg shadow-amber-500/10"
            >
              <MessageSquare className="h-4 w-4" /> Global Feedback Form
            </a>
          )}
        </div>
      </div>

      {/* 2. Institutional Performance Indicators Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Fulfilling Quality Parameters</span>
          <h2 className="font-outfit text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Institutional Performance Indicators
          </h2>
          <p className="text-slate-550 text-sm font-semibold">
            Academic, Research, Societal & Impact Metrics tracking institutional progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Indicator Card 1 */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-650">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg">
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

          {/* Indicator Card 2 */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-650">
                <Flame className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg">
                Research & Innovation Indicators
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

          {/* Indicator Card 3 */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-650">
                <Activity className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg">
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

          {/* Indicator Card 4 */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-650">
                <Award className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg">
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

      {/* 3. Strategic Priorities & Documents Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Strategic Priorities (2026–2031)</span>
          <h2 className="font-outfit text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Strategic Priorities – Next Five Years
          </h2>
          <p className="text-slate-550 text-sm font-semibold">
            Target development parameters across four primary institutional categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Priority Card 1 */}
          <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col gap-3.5 hover:shadow-md transition-all">
            <h4 className="font-outfit font-black text-sm uppercase tracking-wider text-indigo-600 border-b border-slate-50 pb-2">Academic Priorities</h4>
            <ul className="flex flex-col gap-2">
              {academicPriorities.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Priority Card 2 */}
          <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col gap-3.5 hover:shadow-md transition-all">
            <h4 className="font-outfit font-black text-sm uppercase tracking-wider text-indigo-600 border-b border-slate-50 pb-2">Infrastructure Priorities</h4>
            <ul className="flex flex-col gap-2">
              {infraPriorities.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Priority Card 3 */}
          <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col gap-3.5 hover:shadow-md transition-all">
            <h4 className="font-outfit font-black text-sm uppercase tracking-wider text-indigo-600 border-b border-slate-50 pb-2">Financial Priorities</h4>
            <ul className="flex flex-col gap-2">
              {financialPriorities.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Priority Card 4 */}
          <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col gap-3.5 hover:shadow-md transition-all">
            <h4 className="font-outfit font-black text-sm uppercase tracking-wider text-indigo-600 border-b border-slate-50 pb-2">Global Goals & International</h4>
            <ul className="flex flex-col gap-2">
              {globalPriorities.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 font-semibold leading-relaxed flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic PDF Viewer Grid */}
        <div className="mt-8 flex flex-col gap-4">
          <h4 className="font-outfit font-black text-sm md:text-base text-[#002147] uppercase tracking-wider border-b border-slate-100 pb-2 select-none">
            Strategic Plan Documents
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentsList.map((doc, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group relative overflow-hidden select-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100/50 text-[#002147] group-hover:bg-[#002147] group-hover:text-white transition-all duration-300">
                      <FileText className="h-6 w-6" />
                    </span>
                    <div className="flex flex-col gap-1 flex-1">
                      <h4 className="font-outfit font-black text-sm md:text-base text-slate-800 group-hover:text-[#002147] transition-colors leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        PDF Document File
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 mt-2">
                    {doc.fileUrl && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenPdf(doc.fileUrl, doc.title)}
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#002147] bg-indigo-50 hover:bg-[#002147] hover:text-white border border-indigo-100 px-3 py-2.5 rounded-xl transition-all duration-200"
                        >
                          <Eye className="h-4 w-4" /> View PDF
                        </button>
                        <a
                          href={doc.fileUrl}
                          download
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 px-3 py-2.5 rounded-xl transition-all duration-200"
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
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-indigo-650 hover:text-[#002147] bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-2.5 rounded-xl transition-all duration-200"
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
      </div>

      {/* 4. Stakeholder Feedback Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Active Participation & Governance</span>
          <h2 className="font-outfit text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Stakeholder Engagement & Feedback Mechanisms
          </h2>
          <p className="text-slate-550 text-sm font-semibold mt-1">
            St. Ann’s College values the active participation of all stakeholders in institutional development and decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Student */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-[#002147] group-hover:text-white transition-all">
                <Users className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg leading-snug transition-colors group-hover:text-indigo-650">
                Student Feedback
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed text-justify">
                Regular feedback is collected regarding curriculum effectiveness, teaching-learning quality, infrastructure and campus facilities, student support services, as well as skill development and placement initiatives. Student suggestions are incorporated through academic reviews and quality enhancement measures.
              </p>
            </div>
            {data.studentFeedbackFormUrl && (
              <a
                href={data.studentFeedbackFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-indigo-650 hover:text-indigo-850 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100/50 px-4 py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Card 2: Faculty */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-[#002147] group-hover:text-white transition-all">
                <Building className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg leading-snug transition-colors group-hover:text-indigo-650">
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
                className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-indigo-650 hover:text-indigo-850 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100/50 px-4 py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Card 3: Parent */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-[#002147] group-hover:text-white transition-all">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg leading-snug transition-colors group-hover:text-indigo-650">
                Parent & Community Participation
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
                className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-indigo-650 hover:text-indigo-850 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100/50 px-4 py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Card 4: Alumni */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-[#002147] group-hover:text-white transition-all">
                <Globe className="h-5 w-5" />
              </span>
              <h4 className="font-outfit font-black text-slate-850 text-base md:text-lg leading-snug transition-colors group-hover:text-indigo-650">
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
                className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-black text-indigo-650 hover:text-indigo-850 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-100/50 px-4 py-3 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare className="h-4 w-4" />Google Form Link <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 5. Vision 2047: Viksit Bharat & Swarna Andhra */}
      <div className="flex flex-col gap-8 bg-slate-50/50 border border-slate-200/60 p-6 md:p-10 rounded-3xl">
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Amrit Kaal Strategic Vision</span>
          <h2 className="font-outfit text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Vision for 2047: Viksit Bharat & Swarna Andhra
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-semibold max-w-4xl leading-relaxed mt-1 text-justify">
            St. Ann’s College for Women, Guntur envisions becoming a center of excellence in women’s higher education by contributing meaningfully to the national vision of <strong>Viksit Bharat @2047</strong> and the state vision of <strong>Swarna Andhra @2047</strong>. The institution is committed to empowering young women through quality education, innovation, leadership, sustainability, and social responsibility.
          </p>
        </div>

        {/* Our Commitment List */}
        <div className="flex flex-col gap-4">
          <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base uppercase tracking-wider select-none">
            Our Commitment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visionCommitments.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/40 rounded-2xl p-4 flex items-start gap-3 shadow-2xs group"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold font-outfit text-xs group-hover:bg-[#002147] group-hover:text-white transition-all">
                  ✓
                </span>
                <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Focus Areas */}
        <div className="flex flex-col gap-4 mt-4">
          <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base uppercase tracking-wider select-none">
            Strategic Focus Areas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {focusAreas.map((area, index) => (
              <div key={index} className="bg-white border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="flex flex-col gap-2.5">
                  <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base tracking-tight border-b border-slate-50 pb-2">
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
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 mt-3 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">References:</span>
                    {area.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-black text-indigo-650 hover:text-indigo-850 hover:underline flex items-center gap-0.5"
                      >
                        {link.text} <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Signature Initiatives */}
        <div className="flex flex-col gap-4 mt-4">
          <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base uppercase tracking-wider select-none">
            Vision 2047 – Signature Initiatives
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureInitiatives.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/50 p-5 rounded-2xl flex flex-col gap-2 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <h5 className="font-outfit font-black text-slate-850 text-sm md:text-base tracking-tight group-hover:text-indigo-650 transition-colors">
                  {item.title}
                </h5>
                <p className="text-slate-600 text-sm font-semibold leading-relaxed text-justify">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision Summary */}
        <div className="flex flex-col gap-4 mt-4">
          <h4 className="font-outfit font-black text-[#002147] text-sm md:text-base uppercase tracking-wider select-none">
            Our Vision for the Future
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {futureVisions.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 border border-slate-200/60 p-4 rounded-xl flex items-center justify-center text-center hover:bg-[#002147] hover:text-white transition-all group shadow-2xs"
              >
                <p className="font-outfit text-sm font-black leading-snug group-hover:text-white text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Reference Resource Links (Quick links grid at bottom) */}
      <div className="flex flex-col gap-8 bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200/60 p-6 md:p-8 rounded-3xl">
        <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#002147] border border-[#002147]/10 text-white">
            <Globe className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-outfit text-xl md:text-2xl font-black text-[#002147] leading-tight">
              Reference Resource Links
            </h4>
            <p className="text-slate-500 text-sm font-semibold mt-1">
              National & State portal alignments supporting developed India (Viksit Bharat) and Swarna Andhra roadmaps.
            </p>
          </div>
        </div>

        {/* Viksit Bharat links */}
        <div className="flex flex-col gap-4">
          <h5 className="font-outfit font-black text-sm uppercase tracking-wider text-indigo-750">
            Viksit Bharat @2047 Links
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {externalResources.viksit.map((portal, index) => (
              <a
                key={index}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200/65 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:border-indigo-400 hover:scale-[1.02] transition-all group shadow-2xs"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base tracking-tight group-hover:text-indigo-650 transition-colors">
                      {portal.title}
                    </h5>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {portal.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end text-xs font-bold text-slate-405 group-hover:text-indigo-600 transition-colors pt-4 mt-2 border-t border-slate-50 gap-1.5">
                  View Portal <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Swarna Andhra links */}
        <div className="flex flex-col gap-4 mt-2">
          <h5 className="font-outfit font-black text-sm uppercase tracking-wider text-indigo-750">
            Swarna Andhra @2047 Links
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalResources.swarna.map((portal, index) => (
              <a
                key={index}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200/65 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:border-indigo-400 hover:scale-[1.02] transition-all group shadow-2xs"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base tracking-tight group-hover:text-indigo-650 transition-colors">
                      {portal.title}
                    </h5>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {portal.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end text-xs font-bold text-slate-405 group-hover:text-indigo-600 transition-colors pt-4 mt-2 border-t border-slate-50 gap-1.5">
                  View Portal <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
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
