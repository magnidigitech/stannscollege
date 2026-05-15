"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, GraduationCap, Users, Building, ShieldCheck, BookOpen, Lightbulb, LineChart, ArrowRight, HeartHandshake, Flag, Trophy } from "lucide-react";

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/^(i+|v+)\.\s*/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Navigation() {
  const [openAbout, setOpenAbout] = useState(false);
  const [openAcademics, setOpenAcademics] = useState(false);
  const [openAdmissions, setOpenAdmissions] = useState(false);
  const [openFaculty, setOpenFaculty] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openInfra, setOpenInfra] = useState(false);

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
      ]
    },
    {
      title: "II. Progression & Skills",
      icon: Trophy,
      items: [
        { text: "Academic Achievements", slug: "academic-achievements" },
        { text: "Sports & Cultural", slug: "sports-cultural-achievements" },
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
        { text: "Faculty Achievements", slug: "faculty-achievements" },
        { text: "Faculty Exchange & Sabbaticals", slug: "faculty-exchange" },
        { text: "Consultancy Assignments", slug: "consultancy-assignments" },
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
    <nav className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm text-slate-600 select-none">
      <Link href="/" className="hover:text-[#002147] transition-all duration-200">
        Home
      </Link>

      {/* About Us Mega Menu Trigger */}
      <div
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#002147] transition-all duration-200 h-14"
        onMouseEnter={() => { setOpenAbout(true); setOpenAcademics(false); setOpenInfra(false); setOpenSupport(false); setOpenAdmissions(false); setOpenFaculty(false); }}
        onMouseLeave={() => setOpenAbout(false)}
      >
        <Link href="/about/basic-institutional-information" className="font-semibold text-sm text-slate-600 hover:text-[#002147] select-none">
          About Us
        </Link>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openAbout ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

        {openAbout && (
          <div className="absolute top-[56px] left-0 w-full bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/40 rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default">
            {aboutCategories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm">
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
                    return (
                      <Link
                        key={idx}
                        href={`/about/${catSlug}/${itemSlug}`}
                        onClick={() => setOpenAbout(false)}
                        className="text-xs font-medium text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
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

      {/* Academics Mega Menu Trigger */}
      <div
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#002147] transition-all duration-200 h-14"
        onMouseEnter={() => { setOpenAcademics(true); setOpenAbout(false); setOpenInfra(false); setOpenSupport(false); setOpenAdmissions(false); setOpenFaculty(false); }}
        onMouseLeave={() => setOpenAcademics(false)}
      >
        <Link href="/academics/academic-programmes/undergraduate-programmes" className="font-semibold text-sm text-slate-600 hover:text-[#002147] select-none">
          Academics
        </Link>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openAcademics ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

        {openAcademics && (
          <div className="absolute top-[56px] left-0 w-full bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/40 rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-12 gap-8 cursor-default max-h-[85vh] overflow-y-auto">
            
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
                        onClick={() => setOpenAcademics(false)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-[#002147] hover:bg-slate-50/70 px-2 py-1 rounded transition-all leading-snug"
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: III Departments (Populating all 14 in a compact 2-column mini-grid) */}
            <div className="md:col-span-4 flex flex-col gap-4 bg-[#002147]/[0.02] border border-slate-100 rounded-2xl p-5">
              <Link 
                href="/academics/departments"
                onClick={() => setOpenAcademics(false)}
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
                    onClick={() => setOpenAcademics(false)}
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
                        onClick={() => setOpenAcademics(false)}
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

      <div
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#002147] transition-all duration-200 h-14"
        onMouseEnter={() => { setOpenInfra(true); setOpenAbout(false); setOpenAcademics(false); setOpenSupport(false); setOpenAdmissions(false); setOpenFaculty(false); }}
        onMouseLeave={() => setOpenInfra(false)}
      >
        <Link href="/infrastructure/campus-buildings" className="font-semibold text-sm text-slate-600 hover:text-[#002147] select-none">
          Infrastructure
        </Link>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openInfra ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

        {openInfra && (
          <div className="absolute top-[56px] left-0 w-full bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/40 rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default">
            {infraCategories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm">
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
                      onClick={() => setOpenInfra(false)}
                      className="text-xs font-medium text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all leading-relaxed"
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

      <Link href="/courses" className="hover:text-[#002147] transition-all duration-200">
        Courses
      </Link>
      <div
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#002147] transition-all duration-200 h-14"
        onMouseEnter={() => { setOpenAdmissions(true); setOpenAbout(false); setOpenAcademics(false); setOpenInfra(false); setOpenSupport(false); setOpenFaculty(false); }}
        onMouseLeave={() => setOpenAdmissions(false)}
      >
        <Link href="/admissions/policy-process" className="font-semibold text-sm text-slate-600 hover:text-[#002147] select-none">
          Admissions
        </Link>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openAdmissions ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

        {openAdmissions && (
          <div className="absolute top-[56px] left-0 w-full bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/40 rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default">
            {admissionsCategories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm">
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
                      onClick={() => setOpenAdmissions(false)}
                      className="text-xs font-medium text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all leading-relaxed"
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

      <div
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#002147] transition-all duration-200 h-14"
        onMouseEnter={() => { setOpenFaculty(true); setOpenAbout(false); setOpenAcademics(false); setOpenAdmissions(false); setOpenInfra(false); setOpenSupport(false); }}
        onMouseLeave={() => setOpenFaculty(false)}
      >
        <Link href="/faculty/teaching-staff" className="font-semibold text-sm text-slate-600 hover:text-[#002147] select-none">
          Faculty
        </Link>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openFaculty ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

        {openFaculty && (
          <div className="absolute top-[56px] left-0 w-full bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/40 rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default">
            {facultyCategories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm">
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
                      onClick={() => setOpenFaculty(false)}
                      className="text-xs font-medium text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all leading-relaxed"
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

      <div
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#002147] transition-all duration-200 h-14"
        onMouseEnter={() => { setOpenSupport(true); setOpenAbout(false); setOpenAcademics(false); setOpenAdmissions(false); setOpenFaculty(false); setOpenInfra(false); }}
        onMouseLeave={() => setOpenSupport(false)}
      >
        <Link href="/student-support/mentor-mentee" className="font-semibold text-sm text-slate-600 hover:text-[#002147] select-none">
          Student Support
        </Link>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openSupport ? 'rotate-180 text-[#002147]' : 'text-slate-400'}`} />

        {openSupport && (
          <div className="absolute top-[56px] left-0 w-full bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/40 rounded-3xl p-8 z-50 grid grid-cols-1 md:grid-cols-3 gap-8 cursor-default">
            {supportCategories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm">
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
                      onClick={() => setOpenSupport(false)}
                      className="text-xs font-medium text-slate-500 hover:text-[#002147] hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all leading-relaxed"
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

      <Link href="/contact" className="hover:text-[#002147] transition-all duration-200">
        Contact
      </Link>

      <Link
        href="/admissions/policy-process"
        className="rounded-full bg-[#002147] hover:bg-[#003875] px-6 py-2.5 font-bold text-white text-xs hover:shadow-xl hover:shadow-[#002147]/20 transition-all active:scale-95 duration-300 hover:-translate-y-0.5"
      >
        Apply Now
      </Link>
    </nav>
  );
}

