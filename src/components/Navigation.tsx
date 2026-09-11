"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  GraduationCap,
  Users,
  Building,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  LineChart,
  ArrowRight,
  HeartHandshake,
  Flag,
  Trophy,
  Briefcase,
  Handshake,
  Globe2,
  Menu,
  X,
  Plus,
  Minus,
  Phone,
  MapPin
} from "lucide-react";

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/^(i+|v+)\.\s*/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function DropdownHeaderBanner({
  title,
  href,
  buttonText,
  icon: Icon,
  onNavigate,
}: {
  title: string;
  href: string;
  buttonText: string;
  icon: React.ComponentType<{ className?: string }>;
  onNavigate: () => void;
}) {
  return (
    <div className="col-span-full flex items-center justify-between pb-3.5 mb-2 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="font-outfit font-black text-xs md:text-sm text-slate-800 tracking-tight">
          {title}
        </span>
      </div>
      <Link
        href={href}
        onClick={onNavigate}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold transition-all shadow-xs hover:shadow group/btn"
      >
        <span>{buttonText}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default function Navigation() {
  // Desktop Menu Click Toggle State (toggles open/close on click instead of hover)
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // If the clicked target was unmounted/detached during React re-render, ignore
      if (!target || !document.body.contains(target)) return;

      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Mobile Drawer & Accordion States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mAbout, setMAbout] = useState(false);
  const [mAcademics, setMAcademics] = useState(false);
  const [mAdmissions, setMAdmissions] = useState(false);
  const [mInfra, setMInfra] = useState(false);
  const [mFaculty, setMFaculty] = useState(false);
  const [mSupport, setMSupport] = useState(false);
  const [mPlacements, setMPlacements] = useState(false);
  const [mResearch, setMResearch] = useState(false);
  const [mAlumni, setMAlumni] = useState(false);
  const [mIqac, setMIqac] = useState(false);
  const [mMandatory, setMMandatory] = useState(false);
  const [mStrategic, setMStrategic] = useState(false);
  const [mContact, setMContact] = useState(false);

  const researchCategories = [
    {
      title: "I. Policy & Infrastructure",
      icon: ShieldCheck,
      items: [
        { text: "Research Development Cell", slug: "research-development-cell" },
        { text: "Research Infrastructure", slug: "research-infrastructure" },
        { text: "Supervisors & Scholars", slug: "research-supervisors-scholars" },
        { text: "Centres of Excellence", slug: "centres-of-excellence" },
      ]
    },
    {
      title: "II. Outputs & Grants",
      icon: BookOpen,
      items: [
        { text: "Research Publications", slug: "research-publications" },
        { text: "Patents & Innovations", slug: "patents-innovations" },
        { text: "Funded Projects", slug: "funded-projects" },
      ]
    },
    {
      title: "III. Innovation & IPR",
      icon: Lightbulb,
      items: [
        { text: "Intellectual Property Cell", slug: "ipr-cell" },
        { text: "Institution Innovation Cell", slug: "institution-innovation-cell" },
        { text: "Entrepreneurship Development", slug: "entrepreneurship-development" },
      ]
    }
  ];

  const alumniCategories = [
    {
      title: "I. The Association",
      icon: Users,
      items: [
        { text: "Alumni Home", href: "/alumni" },
        { text: "About Alumni Association", href: "/alumni/about-alumni-association" },
        { text: "Contact Association Desk", href: "/alumni/contact-us" },
      ]
    },
    {
      title: "II. Engagement & Events",
      icon: HeartHandshake,
      items: [
        { text: "Alumni Connect Portal", href: "/alumni/alumni-connect" },
        { text: "Alumni Day Celebrations", href: "/alumni/alumni-day" },
        { text: "Alumni Events & Activities", href: "/alumni/alumni-events" },
        { text: "Re-Union Gatherings", href: "/alumni/re-union" },
      ]
    },
    {
      title: "III. Media & Portals",
      icon: Trophy,
      items: [
        { text: "Alumni Photo Gallery", href: "/alumni/gallery" },
        { text: "Alumni Registration Form", href: "/alumni/register" },
        { text: "Giving & Institutional Support", href: "/alumni/donate" },
      ]
    }
  ];

  const iqacCategories = [
    {
      title: "I. Quality Framework",
      icon: ShieldCheck,
      items: [
        { text: "About IQAC Cell", href: "/quality-assurance/iqac" },
        { text: "AQAR Annual Quality Reports", href: "/quality-assurance/aqar" },
        { text: "NAAC Accreditation Details", href: "/quality-assurance/naac" },
        { text: "NAAC Peer Team Portal", href: "/naac-peer-team" },
      ]
    },
    {
      title: "II. Quality Processes",
      icon: Lightbulb,
      items: [
        { text: "Quality Initiatives", href: "/quality-assurance/quality-initiatives" },
        { text: "Academic & Administrative Audit (AAA)", href: "/quality-assurance/audit" },
        { text: "Feedback System & Action Taken", href: "/quality-assurance/feedback" },
      ]
    },
    {
      title: "III. Evaluation & Media",
      icon: BookOpen,
      items: [
        { text: "Student Satisfaction Surveys", href: "/quality-assurance/surveys" },
        { text: "IQAC Activity Gallery", href: "/quality-assurance/gallery" },
        { text: "Contact IQAC Coordinator", href: "/quality-assurance/contact" },
      ]
    }
  ];

  const mandatoryCategories = [
    {
      title: "I. Statutory Approvals & Status",
      icon: ShieldCheck,
      items: [
        { text: "All Mandatory Disclosures", href: "/mandatory-disclosures" },
        { text: "AICTE Extension of Approval (EoA)", href: "/mandatory-disclosures?category=aicte" },
        { text: "UGC 2(f) & 12(B) Recognition", href: "/mandatory-disclosures?category=ugc" },
        { text: "ANU Affiliation Orders", href: "/mandatory-disclosures?category=anu" },
      ]
    },
    {
      title: "II. Statutory Committees",
      icon: Users,
      items: [
        { text: "Governing Body Constitution", href: "/mandatory-disclosures?category=committees" },
        { text: "Anti-Ragging Committee & SOPs", href: "/mandatory-disclosures?category=committees" },
        { text: "Internal Complaints Committee (ICC)", href: "/mandatory-disclosures?category=committees" },
      ]
    },
    {
      title: "III. Compliance Policies",
      icon: BookOpen,
      items: [
        { text: "Code of Conduct & Ethics Handbook", href: "/mandatory-disclosures?category=policies" },
        { text: "Institutional Policies Compendium", href: "/mandatory-disclosures?category=policies" },
      ]
    }
  ];

  const strategicCategories = [
    {
      title: "I. Strategic Framework",
      icon: GraduationCap,
      items: [
        { text: "Overview & Executive Summary", href: "/strategic-plans-and-future-directions" },
        { text: "Institutional Performance Indicators", href: "/strategic-plans-and-future-directions#indicators" },
        { text: "Strategic Priorities – Next 5 Years", href: "/strategic-plans-and-future-directions#priorities" },
      ]
    },
    {
      title: "II. Deployment Plans & Reports",
      icon: LineChart,
      items: [
        { text: "Strategic Framework (2024–2030)", href: "/strategic-plans-and-future-directions#documents" },
        { text: "Annual Deployment Plan 2025–2026", href: "/strategic-plans-and-future-directions#documents" },
        { text: "Annual Deployment Plan 2024–2025", href: "/strategic-plans-and-future-directions#documents" },
      ]
    },
    {
      title: "III. Vision 2047 & Engagement",
      icon: Flag,
      items: [
        { text: "Vision 2047: Viksit Bharat & Swarna Andhra", href: "/strategic-plans-and-future-directions#vision-2047" },
        { text: "Stakeholder Feedback Mechanisms", href: "/strategic-plans-and-future-directions#stakeholder-feedback" },
        { text: "National & State Resource Links", href: "/strategic-plans-and-future-directions#resources" },
      ]
    }
  ];

  const contactCategories = [
    {
      title: "I. Direct Communications",
      icon: Phone,
      items: [
        { text: "Send an Enquiry Message", href: "/contact#enquiry-form" },
        { text: "Admissions Helpline Directory", href: "/contact#admissions-helpline" },
        { text: "Principal & Office Contacts", href: "/contact#admissions-helpline" },
      ]
    },
    {
      title: "II. Campus Location",
      icon: MapPin,
      items: [
        { text: "Interactive Campus Map", href: "/contact#campus-map" },
        { text: "Address & Geographic Coordinates", href: "/contact#campus-map" },
      ]
    },
    {
      title: "III. Office & Timings",
      icon: Building,
      items: [
        { text: "Administrative Office Hours", href: "/contact#working-hours" },
        { text: "Official Social Media Portals", href: "/contact" },
      ]
    }
  ];

  const admissionsCategories = [
    {
      title: "I. Admission Guidelines",
      icon: ShieldCheck,
      items: [
        { text: "Admission Policy & Process", slug: "policy-process" },
        { text: "Prospectus & Brochures", slug: "prospectus-brochures" },
        { text: "Eligibility Criteria", slug: "eligibility-criteria" },
      ]
    },
    {
      title: "II. Finance & Aid",
      icon: LineChart,
      items: [
        { text: "Fee Structure", slug: "fee-structure" },
        { text: "Scholarships & Freeships", slug: "scholarships-freeships" },
      ]
    },
    {
      title: "III. Records & Handbooks",
      icon: BookOpen,
      items: [
        { text: "Student Handbook", slug: "student-handbook" },
        { text: "Admission Statistics", slug: "admission-statistics" },
      ]
    }
  ];

  const infraCategories = [
    {
      title: "I. Academic Blocks",
      icon: Building,
      items: [
        { text: "Campus & Buildings", slug: "campus-buildings" },
        { text: "Classrooms", slug: "classrooms" },
        { text: "Library", slug: "library" },
        { text: "Scientific Laboratories", slug: "laboratories" },
      ]
    },
    {
      title: "II. Student Facilities",
      icon: GraduationCap,
      items: [
        { text: "Hostel Residence", slug: "hostel" },
        { text: "Cafeteria / Canteen", slug: "canteen" },
        { text: "Sports, Games & Gym", slug: "sports-games" },
        { text: "Health Centre", slug: "health-centre" },
      ]
    },
    {
      title: "III. Operations & Utility",
      icon: ShieldCheck,
      items: [
        { text: "ICT & Digital Infra", slug: "ict-digital" },
        { text: "Safety & Security", slug: "safety-security" },
        { text: "Green Campus", slug: "green-campus" },
        { text: "Barrier-Free Access", slug: "inclusive-access" },
      ]
    }
  ];

  const supportCategories = [
    {
      title: "I. Support Services",
      icon: HeartHandshake,
      items: [
        { text: "Mentor–Mentee System", slug: "mentor-mentee" },
        { text: "Student Counselling", slug: "student-counselling" },
        { text: "Internal Complaints (ICC)", slug: "internal-complaints" },
        { text: "Anti-Ragging Committee", slug: "anti-ragging" },
        { text: "Women Empowerment", slug: "women-empowerment" },
        { text: "Sports & Games", slug: "sports-games" },
      ]
    },
    {
      title: "II. Progression & Skills",
      icon: Trophy,
      items: [
        { text: "Academic Achievements", slug: "academic-achievements" },
        { text: "Literacy and Cultural", slug: "literacy-cultural-achievements" },
        { text: "Capacity Building & Skills", slug: "capacity-building" },
      ]
    },
    {
      title: "III. Extension Units",
      icon: Flag,
      items: [
        { text: "NSS Activities", slug: "nss-activities" },
        { text: "NCC Activities", slug: "ncc-activities" },
        { text: "Mother Gnanamma Outreach", slug: "mother-gnanamma" },
        { text: "Eco Club & Environment", slug: "environmental-social" },
      ]
    }
  ];

  const facultyCategories = [
    {
      title: "I. Staff Roster",
      icon: Users,
      items: [
        { text: "List of Teaching Staff", slug: "teaching-staff" },
        { text: "Faculty Department wise", slug: "department-wise" },
        { text: "List of Non-Teaching Staff", slug: "non-teaching-staff" },
      ]
    },
    {
      title: "II. Policies & Appraisal",
      icon: ShieldCheck,
      items: [
        { text: "Visiting / Adjunct Professors", slug: "visiting-professors" },
        { text: "Recruitment Policy & Process", slug: "recruitment-policy" },
        { text: "360° Performance Appraisal", slug: "performance-appraisal" },
      ]
    },
    {
      title: "III. Development & Awards",
      icon: Lightbulb,
      items: [
        { text: "Professional Development", slug: "professional-development" },
        { text: "Seminars & Conferences", slug: "seminars-conferences" },
        { text: "Faculty Achievements", slug: "faculty-achievements" },
        { text: "Faculty Exchange & Sabbaticals", slug: "faculty-exchange" },
        { text: "Consultancy Assignments", slug: "consultancy-assignments" },
      ]
    }
  ];

  const placementsCategories = [
    {
      title: "I. Placements",
      icon: Briefcase,
      items: [
        { text: "About Training & Placement Cell", slug: "about-cell" },
        { text: "Annual Reports", slug: "annual-reports" },
        { text: "Placement Statistics", slug: "placement-statistics" },
        { text: "Campus Recruitment Drives", slug: "recruitment-drives" },
        { text: "Skill Development Initiatives", slug: "skill-development" },
        { text: "Soft Skills & Personality Development", slug: "soft-skills" },
        { text: "Internships & Industry Exposure", slug: "internships-exposure" },
        { text: "Competitive Exam Coaching", slug: "competitive-coaching" },
        { text: "Career Guidance & Counselling", slug: "career-guidance" },
        { text: "Entrepreneurship Development", slug: "entrepreneurship" },
        { text: "Placement Partnerships", slug: "placement-partnerships" },
        { text: "Capacity Building & Skill Enhancement", slug: "capacity-building" },
        { text: "Alumni Career Support", slug: "alumni-support" },
        { text: "Training Calendar / Activity Gallery", slug: "training-calendar" }
      ]
    },
    {
      title: "II. Industry",
      icon: Handshake,
      items: [
        { text: "Industry Partnerships", slug: "industry-partnerships" },
        { text: "Internships & Apprenticeships", slug: "internships-apprenticeships" },
        { text: "MoUs / Agreements", slug: "mous-agreements" },
        { text: "MoU Activities", slug: "mou-activities" },
        { text: "CSR Initiatives", slug: "csr-initiatives" },
        { text: "Placement Partnerships", slug: "industry-placement-partnerships" },
        { text: "Professional Certification Programmes", slug: "certifications" },
        { text: "Industry Expert Lectures", slug: "expert-lectures" },
        { text: "Industrial Visits", slug: "industrial-visits" },
        { text: "Skill-Based Training Programmes", slug: "skill-training" },
        { text: "Employability Enhancement Activities", slug: "employability-activities" }
      ]
    },
    {
      title: "III. Global",
      icon: Globe2,
      items: [
        { text: "International Collaborations", slug: "international-collaborations" },
        { text: "Internationalization Policy", slug: "internationalization-policy" },
        { text: "International Accreditations & Memberships", slug: "accreditations-memberships" },
        { text: "Global Alumni & Outreach Engagement", slug: "global-alumni" },
        { text: "Global Research Collaborations", slug: "global-research" },
        { text: "Student Exchange / Faculty Exchange", slug: "student-faculty-exchange" },
        { text: "International Webinars & Conferences", slug: "webinars-conferences" },
        { text: "Cross-Cultural Learning Activities", slug: "cross-cultural-learning" }
      ]
    }
  ];

  const aboutCategories = [
    {
      title: "I. The Institution",
      icon: Building,
      items: [
        "Basic Institutional Information",
        "History of the College",
        "Vision, Mission, and Core Values",
        "Institutional Awards & Recognitions",
        "Student Laurels",
        "Institutional Distinctiveness",
        "Head of the Institution",
        "Legacy of Leadership",
      ],
    },
    {
      title: "II. Statutory Affiliations & Recognitions",
      icon: ShieldCheck,
      items: [
        "APSCHE Orders",
        "ANU Affiliation Orders (UG & PG)",
        "AICTE Approvals",
        "UGC 2(f)",
        "AISHE Certificates",
        "NAAC Accreditation",
        "NIRF",
        "NAAC Peer Team",
      ],
    },
    {
      title: "III. Governance & Administration",
      icon: Users,
      items: [
        "Governing Body",
        "Organogram",
        "Key Functionaries & IQAC",
        "Statutory & Non-Statutory Committees",
        "Institutional Policies",
        "Strategic Development Plan",
        "Code of Conduct",
      ],
    },
  ];

  const academicsCol1 = [
    {
      title: "I. Academic Programmes",
      cat: "academic-programmes",
      items: [
        { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
        { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" },
        { text: "Industry-Integrated Courses", slug: "industry-integrated-courses" }
      ]
    },
    {
      title: "II. Curriculum & Academic Planning",
      cat: "curriculum-academic-planning",
      items: [
        { text: "Curriculum Framework", slug: "curriculum-framework" },
        { text: "Innovative & Interdisciplinary Offerings", slug: "innovative-interdisciplinary-offerings" },
        { text: "Academic Calendar (UG & PG)", slug: "academic-calendar-ug-pg" },
        { text: "Academic Implementation Plan (AIP)", slug: "academic-implementation-plan-aip" },
        { text: "Time Tables", slug: "time-tables" }
      ]
    }
  ];

  const academicsCol2 = [
    {
      title: "IV. Value-Added Learning",
      cat: "value-added-learning",
      items: [
        { text: "Add-on Courses", slug: "add-on-courses" },
        { text: "Certificate Courses", slug: "certificate-courses" },
        { text: "Value-Added Courses", slug: "value-added-courses" }
      ]
    },
    {
      title: "V. Teaching & Learning",
      cat: "teaching-learning",
      items: [
        { text: "Pedagogy & Learning Methodologies", slug: "pedagogy-learning-methodologies" },
        { text: "Learning Management System (LMS)", slug: "learning-management-system-lms" },
        { text: "Student-Centric Methods", slug: "student-centric-methods" }
      ]
    },
    {
      title: "VI. Outcome-Based Education",
      cat: "outcome-based-education",
      items: [
        { text: "Programme Outcomes (POs)", slug: "programme-outcomes-pos" },
        { text: "Course Outcomes (COs)", slug: "course-outcomes-cos" },
        { text: "Programme Specific Outcomes (PSOs)", slug: "programme-specific-outcomes-psos" }
      ]
    },
    {
      title: "VII. Academic Quality Indicators",
      cat: "academic-quality-indicators",
      items: [
        { text: "Student–Teacher Ratio", slug: "student-teacher-ratio" },
        { text: "Internal Assessment & Evaluation", slug: "internal-assessment-evaluation" },
        { text: "Academic Performance Indicators", slug: "academic-performance-indicators" }
      ]
    }
  ];

  const academicsCol3 = {
    title: "III. Departments",
    cat: "departments",
    items: [
      { text: "1. Dept of Commerce", slug: "department-of-commerce" },
      { text: "2. BCA Applications", slug: "department-of-computer-applications-bca" },
      { text: "3. Computer Science & AI", slug: "department-of-computer-science-cs-artificial-intelligence" },
      { text: "4. Dept of Mathematics", slug: "department-of-mathematics" },
      { text: "5. Dept of Physics", slug: "department-of-physics" },
      { text: "6. Dept of Statistics", slug: "department-of-statistics" },
      { text: "7. Dept of Chemistry", slug: "department-of-chemistry" },
      { text: "8. Dept of Biotechnology", slug: "department-of-biotechnology" },
      { text: "9. Dept of Microbiology", slug: "department-of-microbiology" },
      { text: "10. Dept of Botany", slug: "department-of-botany" },
      { text: "11. Dept of MCA", slug: "department-of-mca" },
      { text: "12. Dept of MBA", slug: "department-of-mba" },
      { text: "13. Dept of English", slug: "department-of-english" },
      { text: "14. Oriental Languages", slug: "department-of-oriental-languages-telugu-sanskrit-hindi" }
    ]
  };

  return (
    <div ref={navContainerRef} className="w-full flex flex-col font-sans select-none relative">

      {/* ============================================================== */}
      {/* DESKTOP HEADER LAYOUT (Two Custom Single-Line Rows)            */}
      {/* ============================================================== */}

      {/* Row 1: Core Navigation (Home, About Us, Academics, etc.) */}
      <div
        className="hidden md:flex items-center justify-between text-[16px] lg:text-[18px] xl:text-[20px] font-bold relative w-full transition-all duration-200 z-30"
        style={{
          color: "var(--topnav-link-color, #ffffff)",
          fontFamily: "inherit",
          fontSize: "20px",
          fontWeight: 700,
          paddingTop: "var(--topnav-padding-y, 4px)",
          paddingBottom: "var(--topnav-padding-y, 4px)"
        }}
      >
        <nav
          className="flex items-center justify-between w-full text-inherit"
          style={{
            gap: "var(--topnav-spacing, 20px)",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit"
          }}
        >

          {/* 1. Home */}
          <Link href="/" onClick={() => setActiveMenu(null)} className="hover:opacity-80 transition-all duration-200 whitespace-nowrap text-inherit font-bold">
            Home
          </Link>

          {/* 2. About Us */}
          <div className="flex items-center group/nav">
            <Link
              href="/about"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit About Us Page"
            >
              About Us
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("about");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "about"}
              aria-label="Toggle About Us menu"
              title="Open About Us Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "about" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "about" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="About Us"
                  href="/about"
                  buttonText="Visit About Us Main Page"
                  icon={Building}
                  onNavigate={() => setActiveMenu(null)}
                />
                {aboutCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => {
                        const catSlug = toSlug(cat.title);
                        const itemSlug = toSlug(item);
                        const href = itemSlug === "strategic-development-plan"
                          ? "/strategic-plans-and-future-directions"
                          : itemSlug === "naac-peer-team"
                            ? "/naac-peer-team"
                            : `/about/${catSlug}/${itemSlug}`;
                        return (
                          <Link
                            key={idx}
                            href={href}
                            onClick={() => setActiveMenu(null)}
                            className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                          >
                            {item}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Academics */}
          <div className="flex items-center group/nav">
            <Link
              href="/academics"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Academics Page"
            >
              Academics
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("academics");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "academics"}
              aria-label="Toggle Academics menu"
              title="Open Academics Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "academics" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "academics" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-12 gap-8 cursor-default max-h-[75vh] overflow-y-auto animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Academic Programmes & Departments"
                  href="/academics"
                  buttonText="Visit Academics Main Page"
                  icon={GraduationCap}
                  onNavigate={() => setActiveMenu(null)}
                />

                {/* Column 1: I and II */}
                <div className="md:col-span-4 flex flex-col gap-6">
                  {academicsCol1.map((cat, i) => (
                    <div key={i} className="flex flex-col gap-3 border-b border-slate-50 pb-4 last:border-0">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#002147]/5 text-[#002147] border border-[#002147]/10">
                          <GraduationCap className="h-3.5 w-3.5" />
                        </span>
                        <h4 className="font-outfit font-black text-slate-800 text-xs uppercase tracking-wider">{cat.title}</h4>
                      </div>
                      <div className="flex flex-col gap-1">
                        {cat.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/academics/${cat.cat}/${item.slug}`}
                            onClick={() => setActiveMenu(null)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/70 px-2 py-1 rounded transition-all leading-snug"
                          >
                            {item.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: III Departments */}
                <div className="md:col-span-4 flex flex-col gap-4 bg-[#002147]/[0.02] border border-slate-100 rounded-2xl p-5">
                  <Link
                    href="/academics/departments"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2 pb-2 border-b border-[#002147]/10 hover:opacity-80 transition-opacity group cursor-pointer"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#002147] text-white">
                      <BookOpen className="h-3.5 w-3.5" />
                    </span>
                    <div className="flex items-center gap-1">
                      <h4 className="font-outfit font-black text-[#002147] text-xs uppercase tracking-wider">{academicsCol3.title}</h4>
                      <ArrowRight className="h-3 w-3 text-[#002147] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {academicsCol3.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/academics/${academicsCol3.cat}/${item.slug}`}
                        onClick={() => setActiveMenu(null)}
                        className="text-[10px] font-bold text-slate-600 hover:text-[#002147] hover:bg-white border border-transparent hover:border-slate-200/50 p-1.5 rounded transition-all truncate leading-snug"
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: IV, V, VI, VII */}
                <div className="md:col-span-4 flex flex-col gap-5">
                  {academicsCol2.map((cat, i) => (
                    <div key={i} className="flex flex-col gap-2 border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                          <Lightbulb className="h-3 w-3" />
                        </span>
                        <h4 className="font-outfit font-black text-slate-800 text-[10px] uppercase tracking-wider">{cat.title}</h4>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {cat.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/academics/${cat.cat}/${item.slug}`}
                            onClick={() => setActiveMenu(null)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/70 px-2 py-1 rounded transition-all leading-snug"
                          >
                            {item.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* 4. Admissions */}
          <div className="flex items-center group/nav">
            <Link
              href="/admissions"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Admissions Page"
            >
              Admissions
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("admissions");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "admissions"}
              aria-label="Toggle Admissions menu"
              title="Open Admissions Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "admissions" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "admissions" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Admissions & Enrolment Portal"
                  href="/admissions"
                  buttonText="Visit Admissions Main Page"
                  icon={BookOpen}
                  onNavigate={() => setActiveMenu(null)}
                />
                {admissionsCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/admissions/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Infrastructure */}
          <div className="flex items-center group/nav">
            <Link
              href="/infrastructure"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Infrastructure Page"
            >
              Infrastructure
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("infra");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "infra"}
              aria-label="Toggle Infrastructure menu"
              title="Open Infrastructure Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "infra" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "infra" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Campus Infrastructure & Facilities"
                  href="/infrastructure"
                  buttonText="Visit Infrastructure Main Page"
                  icon={Building}
                  onNavigate={() => setActiveMenu(null)}
                />
                {infraCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/infrastructure/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Faculty */}
          <div className="flex items-center group/nav">
            <Link
              href="/faculty"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Faculty Page"
            >
              Faculty
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("faculty");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "faculty"}
              aria-label="Toggle Faculty menu"
              title="Open Faculty Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "faculty" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "faculty" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Faculty & Academic Staff Directory"
                  href="/faculty"
                  buttonText="Visit Faculty Main Page"
                  icon={Users}
                  onNavigate={() => setActiveMenu(null)}
                />
                {facultyCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/faculty/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Student Support Services */}
          <div className="flex items-center group/nav">
            <Link
              href="/student-support"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Student Support Page"
            >
              Student Support Services
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("support");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "support"}
              aria-label="Toggle Student Support menu"
              title="Open Student Support Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "support" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "support" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Student Support & Services Portal"
                  href="/student-support"
                  buttonText="Visit Student Support Main Page"
                  icon={HeartHandshake}
                  onNavigate={() => setActiveMenu(null)}
                />
                {supportCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/student-support/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 8. Placements & Industry Linkages */}
          <div className="flex items-center group/nav">
            <Link
              href="/placements"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Placements Page"
            >
              Placements & Industry Linkages
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("placements");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "placements"}
              aria-label="Toggle Placements menu"
              title="Open Placements Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "placements" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "placements" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Training, Placements & Industry Linkages"
                  href="/placements"
                  buttonText="Visit Placements Main Page"
                  icon={Briefcase}
                  onNavigate={() => setActiveMenu(null)}
                />
                {placementsCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/placements/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </nav>
      </div>

      {/* Row 2: Compliance, Research, & Utility Bar */}
      {/* Contains: Alumni, IQAC, Mandatory Disclosures, Research & Innovation, Strategic Plans, Contact */}
      <div
        className={`hidden md:flex items-center justify-between border-t text-[16px] lg:text-[18px] xl:text-[20px] font-bold relative w-full transition-all duration-200 ${activeMenu && ['research','alumni','iqac','mandatory','strategic','contact'].includes(activeMenu) ? 'z-40' : 'z-20'}`}
        style={{
          borderColor: "var(--topnav-divider, rgba(255, 255, 255, 0.15))",
          color: "var(--topnav-row2-color, var(--topnav-link-color, #ffffff))",
          fontFamily: "inherit",
          fontSize: "20px",
          fontWeight: 700,
          paddingTop: "calc(var(--topnav-padding-y, 4px) * 0.75)",
          paddingBottom: "calc(var(--topnav-padding-y, 4px) * 0.75)"
        }}
      >
        <nav
          className="flex items-center justify-between w-full text-inherit"
          style={{
            gap: "var(--topnav-spacing, 20px)",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit"
          }}
        >


          {/* Research & Innovation (Moved here to balance Row 1 & Row 2 spacing perfectly!) */}
          <div className="flex items-center group/nav">
            <Link
              href="/research-innovation"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Research & Innovation Page"
            >
              Research & Innovation
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("research");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "research"}
              aria-label="Toggle Research & Innovation menu"
              title="Open Research & Innovation Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "research" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "research" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Research & Innovation Wing"
                  href="/research-innovation"
                  buttonText="Visit Research Main Page"
                  icon={Lightbulb}
                  onNavigate={() => setActiveMenu(null)}
                />
                {researchCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/research-innovation/${item.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* 10. Alumni */}
          <div className="flex items-center group/nav">
            <Link
              href="/alumni"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Alumni Page"
            >
              Alumni
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("alumni");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "alumni"}
              aria-label="Toggle Alumni menu"
              title="Open Alumni Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "alumni" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "alumni" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Alumni Association & Network"
                  href="/alumni"
                  buttonText="Visit Alumni Main Page"
                  icon={Users}
                  onNavigate={() => setActiveMenu(null)}
                />
                {alumniCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 11. IQAC, Quality Assurance & Accreditation */}
          <div className="flex items-center group/nav">
            <Link
              href="/quality-assurance"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Quality Assurance Page"
            >
              Quality Assurance & Accreditation
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("iqac");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "iqac"}
              aria-label="Toggle Quality Assurance menu"
              title="Open Quality Assurance Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "iqac" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "iqac" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Internal Quality Assurance Cell (IQAC)"
                  href="/quality-assurance"
                  buttonText="Visit IQAC Main Page"
                  icon={ShieldCheck}
                  onNavigate={() => setActiveMenu(null)}
                />
                {iqacCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 12. Mandatory Disclosures & Compliance */}
          <div className="flex items-center group/nav">
            <Link
              href="/mandatory-disclosures"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Mandatory Disclosures Page"
            >
              Mandatory Disclosures & Compliance
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("mandatory");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "mandatory"}
              aria-label="Toggle Mandatory Disclosures menu"
              title="Open Mandatory Disclosures Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "mandatory" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "mandatory" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Mandatory Disclosures & Regulatory Compliance"
                  href="/mandatory-disclosures"
                  buttonText="Visit Disclosures Main Page"
                  icon={ShieldCheck}
                  onNavigate={() => setActiveMenu(null)}
                />
                {mandatoryCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 13. Strategic Plans & Future Directions */}
          <div className="flex items-center group/nav">
            <Link
              href="/strategic-plans-and-future-directions"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Strategic Plans Page"
            >
              Strategic Plans & Future Directions
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("strategic");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "strategic"}
              aria-label="Toggle Strategic Plans menu"
              title="Open Strategic Plans Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "strategic" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "strategic" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Institutional Strategic Plans & Future Directions"
                  href="/strategic-plans-and-future-directions"
                  buttonText="Visit Strategic Plans Main Page"
                  icon={LineChart}
                  onNavigate={() => setActiveMenu(null)}
                />
                {strategicCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 14. Contact Us */}
          <div className="flex items-center group/nav">
            <Link
              href="/contact"
              onClick={() => setActiveMenu(null)}
              className="cursor-pointer text-inherit transition-all duration-200 py-1 whitespace-nowrap select-none hover:opacity-85 font-bold outline-none"
              title="Visit Contact Us Page"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleMenu("contact");
              }}
              className="p-1 -mr-1 ml-0.5 rounded hover:bg-white/15 cursor-pointer text-inherit transition-all duration-200 select-none outline-none focus:outline-none"
              aria-expanded={activeMenu === "contact"}
              aria-label="Toggle Contact Us menu"
              title="Open Contact Us Menu"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "contact" ? 'rotate-180 opacity-100 text-blue-300' : 'opacity-65 group-hover/nav:opacity-100'}`} />
            </button>

            {activeMenu === "contact" && (
              <div
                className="absolute top-full left-0 w-full !bg-white !opacity-100 border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                style={{ backgroundColor: "#ffffff", opacity: 1, zIndex: 100 }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DropdownHeaderBanner
                  title="Contact Us & Campus Location"
                  href="/contact"
                  buttonText="Visit Contact Page"
                  icon={Phone}
                  onNavigate={() => setActiveMenu(null)}
                />
                {contactCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147]">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-xs font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </nav>
      </div>

      {/* ============================================================== */}
      {/* MOBILE RESPONSIVE DRAWER & TRIGGER                             */}
      {/* ============================================================== */}

      {/* Mobile Top Header (Visible only on mobile screens when sticky nav is active) */}
      <div
        className="flex md:hidden items-center justify-between h-14 w-full select-none relative z-40 px-4 transition-colors duration-200"
        style={{ backgroundColor: "var(--topnav-bg, #002147)" }}
      >
        <Link
          href="/"
          className="font-outfit font-black text-base uppercase tracking-tight leading-none"
          style={{ color: "var(--topnav-link-color, #ffffff)" }}
        >
          St. Ann&apos;s College
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
          style={{ color: "var(--topnav-link-color, #ffffff)" }}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Navigation Overlay & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex select-none animate-fadeIn">
          {/* Transparent Backdrop */}
          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />

          {/* Sliding Drawer Container */}
          <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-slate-100 animate-slideIn">

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0 bg-slate-50/40">
              <span className="font-outfit font-black text-sm text-[#002147] uppercase tracking-wider">Navigation Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Navigation Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">

              {/* Primary Direct Links */}
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>1. Home</span>
              </Link>

              {/* 2. About Us Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAbout(!mAbout)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>2. About Us</span>
                  {mAbout ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAbout && (
                  <div className="flex flex-col gap-4 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/about"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit About Us Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {aboutCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider border-b border-slate-50 pb-1">{cat.title}</span>
                        {cat.items.map((item, idx) => {
                          const itemSlug = toSlug(item);
                          const href = itemSlug === "strategic-development-plan"
                            ? "/strategic-plans-and-future-directions"
                            : itemSlug === "naac-peer-team"
                              ? "/naac-peer-team"
                              : `/about/${toSlug(cat.title)}/${itemSlug}`;
                          return (
                            <Link
                              key={idx}
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className="text-xs font-semibold text-slate-500 hover:text-[#002147] py-1"
                            >
                              • {item}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Academics Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAcademics(!mAcademics)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>3. Academics</span>
                  {mAcademics ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAcademics && (
                  <div className="flex flex-col gap-4 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/academics"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Academics Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Academic Programmes</span>
                      {academicsCol1[0].items.map((item, idx) => (
                        <Link key={idx} href={`/academics/academic-programmes/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Academic Planning</span>
                      {academicsCol1[1].items.map((item, idx) => (
                        <Link key={idx} href={`/academics/curriculum-academic-planning/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Departments</span>
                      <div className="grid grid-cols-1 gap-1">
                        {academicsCol3.items.map((item, idx) => (
                          <Link key={idx} href={`/academics/departments/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-[11px] font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Admissions Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAdmissions(!mAdmissions)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>4. Admissions</span>
                  {mAdmissions ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAdmissions && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/admissions"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Admissions Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {admissionsCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/admissions/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Infrastructure Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMInfra(!mInfra)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>5. Infrastructure</span>
                  {mInfra ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mInfra && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/infrastructure"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Infrastructure Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {infraCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/infrastructure/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Faculty Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMFaculty(!mFaculty)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>6. Faculty</span>
                  {mFaculty ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mFaculty && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/faculty"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Faculty Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {facultyCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/faculty/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Student Support Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMSupport(!mSupport)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>7. Student Support Services</span>
                  {mSupport ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mSupport && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/student-support"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Student Support Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {supportCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/student-support/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 8. Placements Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMPlacements(!mPlacements)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>8. Placements & Industry Linkages</span>
                  {mPlacements ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mPlacements && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/placements"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Placements Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {placementsCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/placements/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 9. Research Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMResearch(!mResearch)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>9. Research & Innovation</span>
                  {mResearch ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mResearch && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/research-innovation"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Research Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {researchCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={`/research-innovation/${item.slug}`} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 10. Alumni Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMAlumni(!mAlumni)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>10. Alumni</span>
                  {mAlumni ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mAlumni && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/alumni"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Alumni Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {alumniCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 11. IQAC Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMIqac(!mIqac)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>11. IQAC & Accreditation</span>
                  {mIqac ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mIqac && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/quality-assurance"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit IQAC Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {iqacCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 12. Mandatory Disclosures Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMMandatory(!mMandatory)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>12. Mandatory Disclosures</span>
                  {mMandatory ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mMandatory && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/mandatory-disclosures"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Disclosures Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {mandatoryCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 13. Strategic Plans Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMStrategic(!mStrategic)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>13. Strategic Plans</span>
                  {mStrategic ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mStrategic && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/strategic-plans-and-future-directions"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Strategic Plans Main Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {strategicCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 14. Contact Us Accordion */}
              <div className="flex flex-col gap-1 border-t border-slate-50 pt-1">
                <button
                  onClick={() => setMContact(!mContact)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide"
                >
                  <span>14. Contact Us</span>
                  {mContact ? <Minus className="h-4 w-4 text-slate-400" /> : <Plus className="h-4 w-4 text-slate-400" />}
                </button>
                {mContact && (
                  <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-indigo-100 ml-3">
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-[#002147] bg-slate-100/90 hover:bg-[#002147] hover:text-white px-3 py-2 rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Visit Contact Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {contactCategories.map((cat, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black uppercase text-[#002147] tracking-wider">{cat.title}</span>
                        {cat.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-slate-500 py-1">• {item.text}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Apply Now in mobile drawer footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/40 shrink-0 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-admission-enquiry"));
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-bold text-white text-xs tracking-wider uppercase hover:shadow-xl hover:shadow-emerald-600/20 transition-all duration-300 cursor-pointer border border-emerald-400/30"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
