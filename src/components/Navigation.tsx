"use client";

import Link from "next/link";
import { useState } from "react";
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
  Minus
} from "lucide-react";

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/^(i+|v+)\.\s*/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Navigation() {
  // Premium Unified Desktop Hover State with Millisecond Delay
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setActiveMenu(null);
    }, 500); // Buttery-smooth 150ms transition tolerance
    setTimeoutId(id);
  };

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
    <div className="w-full flex flex-col font-sans select-none relative">

      {/* ============================================================== */}
      {/* DESKTOP HEADER LAYOUT (Two Custom Single-Line Rows)            */}
      {/* ============================================================== */}

      {/* Row 1: Core Navigation (Home, About Us, Academics, etc.) */}
      <div className="hidden md:flex items-center justify-center py-3.5 text-xs lg:text-[13px] font-bold text-slate-700 relative w-full">
        <nav className="flex items-center justify-center gap-x-8 lg:gap-x-10 w-full">

          {/* 1. Home */}
          <Link href="/" className="hover:text-[#002147] transition-all duration-200 whitespace-nowrap">
            Home
          </Link>

          {/* 2. About Us */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/about/the-institution/basic-institutional-information" className="hover:text-[#002147] select-none font-bold">
              About Us
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "about" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "about" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
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
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("academics")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/academics/academic-programmes/undergraduate-programmes" className="hover:text-[#002147] select-none font-bold">
              Academics
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "academics" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "academics" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-12 gap-8 cursor-default max-h-[75vh] overflow-y-auto animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("academics")}
                onMouseLeave={handleMouseLeave}
              >

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
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("admissions")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/admissions/policy-process" className="hover:text-[#002147] select-none font-bold">
              Admissions
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "admissions" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "admissions" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("admissions")}
                onMouseLeave={handleMouseLeave}
              >
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
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("infra")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/infrastructure" className="hover:text-[#002147] select-none font-bold">
              Infrastructure
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "infra" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "infra" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("infra")}
                onMouseLeave={handleMouseLeave}
              >
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
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("faculty")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/faculty/teaching-staff" className="hover:text-[#002147] select-none font-bold">
              Faculty
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "faculty" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "faculty" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("faculty")}
                onMouseLeave={handleMouseLeave}
              >
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
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("support")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/student-support/mentor-mentee" className="hover:text-[#002147] select-none font-bold">
              Student Support Services
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "support" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "support" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("support")}
                onMouseLeave={handleMouseLeave}
              >
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
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("placements")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/placements" className="hover:text-[#002147] select-none font-bold">
              Placements & Industry Linkages
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "placements" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "placements" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                onMouseEnter={() => handleMouseEnter("placements")}
                onMouseLeave={handleMouseLeave}
              >
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
      <div className="hidden md:flex items-center justify-center py-3.5 border-t border-slate-100 text-xs lg:text-[13px] font-bold text-slate-600 relative w-full">
        <nav className="flex items-center justify-center gap-x-8 lg:gap-x-10 w-full">


          {/* Research & Innovation (Moved here to balance Row 1 & Row 2 spacing perfectly!) */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#002147] transition-all duration-200 py-1 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("research")}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/research-innovation" className="hover:text-[#002147] select-none font-bold">
              Research & Innovation
            </Link>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMenu === "research" ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

            {activeMenu === "research" && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-slate-200/60 shadow-2xl rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default animate-fadeIn"
                onMouseEnter={() => handleMouseEnter("research")}
                onMouseLeave={handleMouseLeave}
              >
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


          <Link href="/alumni" className="hover:text-[#002147] transition-all duration-200 whitespace-nowrap">
            Alumni
          </Link>

          <Link href="/quality-assurance" className="hover:text-[#002147] transition-all duration-200 whitespace-nowrap">
            IQAC, Quality Assurance & Accreditation
          </Link>

          <Link href="/mandatory-disclosures" className="hover:text-[#002147] transition-all duration-200 whitespace-nowrap">
            Mandatory Disclosures & Compliance
          </Link>

          <Link href="/strategic-plans-and-future-directions" className="hover:text-[#002147] transition-all duration-200 whitespace-nowrap">
            Strategic Plans & Future Directions
          </Link>

          <Link href="/contact" className="hover:text-[#002147] transition-all duration-200 whitespace-nowrap">
            Contact Us
          </Link>

        </nav>
      </div>

      {/* ============================================================== */}
      {/* MOBILE RESPONSIVE DRAWER & TRIGGER                             */}
      {/* ============================================================== */}

      {/* Mobile Top Header (Visible only on mobile screens when sticky nav is active) */}
      <div className="flex md:hidden items-center justify-between h-14 w-full select-none relative z-40 bg-white">
        <Link href="/" className="font-outfit font-black text-base text-[#002147] uppercase tracking-tight leading-none">
          St. Ann&apos;s College
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 text-[#002147] transition-all"
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

              {/* 10. Alumni */}
              <Link href="/alumni" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 border-t border-slate-50 pt-1.5 hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>10. Alumni</span>
              </Link>

              {/* 11. IQAC */}
              <Link href="/quality-assurance" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 border-t border-slate-50 pt-1.5 hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>11. IQAC, Quality & Accreditation</span>
              </Link>

              {/* 12. Mandatory Disclosures */}
              <Link href="/mandatory-disclosures" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 border-t border-slate-50 pt-1.5 hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>12. Mandatory Disclosures</span>
              </Link>

              {/* 13. Strategic Plans */}
              <Link href="/strategic-plans-and-future-directions" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 border-t border-slate-50 pt-1.5 hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>13. Strategic Plans</span>
              </Link>

              {/* Contact */}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 border-t border-slate-50 pt-1.5 hover:bg-slate-50 text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wide">
                <span>Contact Us</span>
              </Link>

            </div>

            {/* Apply Now in mobile drawer footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/40 shrink-0 flex flex-col gap-2.5">
              <Link
                href="/admissions/policy-process"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#002147] hover:bg-[#003875] px-6 py-3 font-bold text-white text-xs tracking-wider uppercase hover:shadow-xl hover:shadow-[#002147]/20 transition-all duration-300"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
