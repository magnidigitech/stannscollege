"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles, Phone, Mail, ArrowRight, ChevronDown, ChevronRight, Building, BookOpen, Lightbulb, Award, ShieldCheck } from "lucide-react";

import AcademicsClientFallback from "@/components/academics/AcademicsClientFallback";
import { SubtextBox } from "@/components/ui/Heading1Notch";
import academicsData from "@/components/academics/academics-data.json";

// Component Imports
import { UndergraduateProgrammes } from "@/components/academics/academic-programmes/UndergraduateProgrammes";
import { PostgraduateProgrammes } from "@/components/academics/academic-programmes/PostgraduateProgrammes";

import { AcademicCalendar } from "@/components/academics/curriculum-academic-planning/AcademicCalendar";
import { Timetables } from "@/components/academics/curriculum-academic-planning/Timetables";
import { CurriculumSyllabus } from "@/components/academics/curriculum-academic-planning/CurriculumSyllabus";
import { AcademicRegulations } from "@/components/academics/curriculum-academic-planning/AcademicRegulations";
import { IlmsSystem } from "@/components/academics/curriculum-academic-planning/IlmsSystem";

import { DepartmentDetail } from "@/components/academics/departments/DepartmentDetail";
import { DepartmentOfCommerce } from "@/components/academics/departments/DepartmentOfCommerce";
import { AllDepartmentsHub } from "@/components/academics/departments/AllDepartmentsHub";
import { DepartmentUpdateForm } from "@/components/academics/departments/DepartmentUpdateForm";

import { TeachingLearningRenderer } from "@/components/academics/teaching-learning/TeachingLearningRenderer";
import { ExaminationEvaluationRenderer } from "@/components/academics/examination-evaluation/ExaminationEvaluationRenderer";
import { AcademicEnrichmentRenderer } from "@/components/academics/academic-enrichment/AcademicEnrichmentRenderer";
import { AcademicQualityOutcomesRenderer } from "@/components/academics/academic-quality-outcomes/AcademicQualityOutcomesRenderer";

const navigationStructure = [
  {
    catSlug: "academic-programmes",
    title: "A. Academic Programmes",
    icon: GraduationCap,
    items: [
      { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
      { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" }
    ]
  },
  {
    catSlug: "curriculum-academic-planning",
    title: "B. Academic Regulations & Resources",
    icon: BookOpen,
    items: [
      { text: "Academic Calendar", slug: "academic-calendar" },
      { text: "Time Tables", slug: "timetables" },
      { text: "Curriculum & Syllabus", slug: "curriculum-syllabus" },
      { text: "Academic Regulations", slug: "academic-regulations" },
      { text: "ILMS – Integrated Learning Management System", slug: "ilms-system" }
    ]
  },
  {
    catSlug: "departments",
    title: "C. Departments (Dropdown Menu)",
    isDropdown: true,
    icon: Building,
    items: [
      { text: "• Dept. of Commerce", slug: "department-of-commerce" },
      { text: "• Dept. of Computer Science & Applications", slug: "department-of-computer-science-applications" },
      { text: "• Dept. of Mathematics", slug: "department-of-mathematics" },
      { text: "• Dept. of Physics", slug: "department-of-physics" },
      { text: "• Dept. of Statistics", slug: "department-of-statistics" },
      { text: "• Dept. of Biotechnology", slug: "department-of-biotechnology" },
      { text: "• Dept. of Microbiology", slug: "department-of-microbiology" },
      { text: "• Dept. of Botany", slug: "department-of-botany" },
      { text: "• Dept. of Chemistry", slug: "department-of-chemistry" },
      { text: "• Dept. of English", slug: "department-of-english" },
      { text: "• Dept. of Oriental Languages", slug: "department-of-oriental-languages" },
      { text: "• Dept. of MCA", slug: "department-of-mca" },
      { text: "• Dept. of MBA", slug: "department-of-mba" }
    ]
  },
  {
    catSlug: "teaching-learning",
    title: "D. Teaching & Learning",
    icon: Lightbulb,
    items: [
      { text: "Teaching-Learning Practices", slug: "teaching-learning-practices" },
      { text: "Innovative Teaching Practices", slug: "innovative-teaching-practices" },
      { text: "Experiential & Participative Learning", slug: "experiential-participative-learning" },
      { text: "ICT-Enabled Teaching", slug: "ict-enabled-teaching" },
      { text: "Student-Centric Learning", slug: "student-centric-learning" }
    ]
  },
  {
    catSlug: "examination-evaluation",
    title: "E. Examination & Evaluation",
    icon: Award,
    items: [
      { text: "Examination System", slug: "examination-system" },
      { text: "Continuous Internal Assessment (CIA)", slug: "continuous-internal-assessment" },
      { text: "University Examinations", slug: "university-examinations" },
      { text: "Results & Performance", slug: "results-performance" },
      { text: "Examination Regulations", slug: "examination-regulations" }
    ]
  },
  {
    catSlug: "academic-enrichment",
    title: "F. Academic Enrichment",
    icon: Sparkles,
    items: [
      { text: "Value-Added Courses", slug: "value-added-courses" },
      { text: "Certificate Courses", slug: "certificate-courses" },
      { text: "Skill Development Programmes", slug: "skill-development-programmes" },
      { text: "Guest Lectures & Workshops", slug: "guest-lectures-workshops" },
      { text: "Seminars & Conferences", slug: "seminars-conferences" },
      { text: "Academic Collaborations", slug: "academic-collaborations" }
    ]
  },
  {
    catSlug: "academic-quality-outcomes",
    title: "G. Academic Quality & Outcomes",
    icon: ShieldCheck,
    items: [
      { text: "Programme Outcomes (POs)", slug: "programme-outcomes" },
      { text: "Programme Specific Outcomes (PSOs)", slug: "programme-specific-outcomes" },
      { text: "Course Outcomes (COs)", slug: "course-outcomes" },
      { text: "CO–PO/PSO Mapping", slug: "co-po-pso-mapping" },
      { text: "Attainment of Outcomes", slug: "attainment-of-outcomes" },
      { text: "Academic Audit", slug: "academic-audit" }
    ]
  }
];

function AcademicsSidebar({ catSlug, itemSlug }: { catSlug?: string; itemSlug?: string }) {
  const contact = (academicsData as any).academicCellContact || {
    helpdesk: "0863-2236470",
    email: "st_anns_coll@yahoo.co.in",
    applyUrl: "/admission"
  };

  return (
    <div className="flex flex-col gap-6 sticky top-24 select-none font-sans">
      {/* Quick Contact Widget */}
      <div className="bg-white border border-slate-200/60 p-6 rounded-[2rem] shadow-sm flex flex-col gap-4">
        <h4 className="font-outfit text-sm font-black text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Contact Academic Cell
        </h4>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <Phone className="h-3.5 w-3.5 text-[#002147] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Helpdesk</span>
              <span className="text-xs font-bold text-slate-700 leading-tight">{contact.helpdesk}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Mail className="h-3.5 w-3.5 text-[#002147] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mail</span>
              <span className="text-xs font-bold text-slate-700 leading-tight truncate">{contact.email}</span>
            </div>
          </div>
        </div>
        <Link href={contact.applyUrl || "/admission"} className="mt-2 inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#00387a] text-white font-sans font-bold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95">
          Apply Online <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

    </div>
  );
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function AcademicsDynamicPage({ params }: PageProps) {
  const { slug } = use(params);

  const rawCat = slug?.[0];
  const itemSlug = slug?.[1];

  // Normalized category slug
  const catSlug = rawCat === "academic-regulations-resources" ? "curriculum-academic-planning" :
    rawCat === "value-added-learning" ? "academic-enrichment" :
    rawCat === "outcome-based-education" || rawCat === "academic-quality-indicators" ? "academic-quality-outcomes" :
    rawCat;

  const [deptsOpen, setDeptsOpen] = useState<boolean>(true);
  const [headerHeight, setHeaderHeight] = useState<number>(140);
  const isAllDeptsRoot = catSlug === "departments" && !itemSlug;

  const sidebarScrollRef = useRef<HTMLDivElement>(null);

  // Auto-expand departments menu when navigating to any department
  useEffect(() => {
    if (catSlug === "departments") {
      setDeptsOpen(true);
    }
  }, [catSlug]);

  // Handle scroll position restoration & ensure active item is visible in sidebar
  useEffect(() => {
    const container = sidebarScrollRef.current;
    if (!container) return;

    // 1. Immediately restore saved scroll position if available
    try {
      const saved = sessionStorage.getItem("academics_sidebar_scroll");
      if (saved !== null) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) {
          container.scrollTop = val;
        }
      }
    } catch {
      // Ignore sessionStorage issues in restricted environments
    }

    // 2. Ensure active element is visibly framed within the sidebar container
    const timer = setTimeout(() => {
      if (!container) return;
      const activeEl = container.querySelector<HTMLElement>('[data-active="true"]');
      if (activeEl) {
        const containerRect = container.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();

        const isAbove = elRect.top < containerRect.top + 20;
        const isBelow = elRect.bottom > containerRect.bottom - 20;

        if (isAbove || isBelow) {
          const relativeTop = elRect.top - containerRect.top;
          const targetScroll = container.scrollTop + relativeTop - (container.clientHeight / 2) + (elRect.height / 2);
          container.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: "smooth"
          });
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [catSlug, itemSlug]);

  const saveSidebarScroll = () => {
    if (sidebarScrollRef.current) {
      try {
        sessionStorage.setItem("academics_sidebar_scroll", String(sidebarScrollRef.current.scrollTop));
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById("main-header");
      if (header) {
        const height = header.getBoundingClientRect().height || header.offsetHeight;
        if (height > 0) {
          setHeaderHeight(Math.ceil(height));
        }
      }
    };

    updateHeaderHeight();

    let observer: ResizeObserver | null = null;
    const header = document.getElementById("main-header");
    if (header && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateHeaderHeight());
      observer.observe(header);
    }

    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("scroll", updateHeaderHeight, { passive: true });

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", updateHeaderHeight);
      if (observer) observer.disconnect();
    };
  }, []);

  if (!catSlug || (!isAllDeptsRoot && !itemSlug)) {
    return (
      <div className="bg-slate-50/40 min-h-screen select-none animate-fadeIn font-sans">
        <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-12 sm:pb-16">
          <AcademicsClientFallback />
        </div>
      </div>
    );
  }

  // Logic to render individual content component
  const renderMainContent = () => {
    if (catSlug === "academic-programmes") {
      if (itemSlug === "undergraduate-programmes" || itemSlug === "undergraduate") return <UndergraduateProgrammes />;
      if (itemSlug === "postgraduate-programmes" || itemSlug === "postgraduate") return <PostgraduateProgrammes />;
    }

    if (catSlug === "curriculum-academic-planning") {
      if (itemSlug === "academic-calendar" || itemSlug === "academic-calendar-ug-pg") return <AcademicCalendar />;
      if (itemSlug === "timetables" || itemSlug === "time-tables") return <Timetables />;
      if (itemSlug === "curriculum-syllabus" || itemSlug === "curriculum-framework" || itemSlug === "innovative-interdisciplinary-offerings") return <CurriculumSyllabus />;
      if (itemSlug === "academic-regulations" || itemSlug === "academic-implementation-plan-aip") return <AcademicRegulations />;
      if (itemSlug === "ilms-system" || itemSlug === "learning-management-system-lms") return <IlmsSystem />;
    }

    if (catSlug === "departments") {
      if (isAllDeptsRoot) return <AllDepartmentsHub />;
      if (itemSlug === "update") return <DepartmentUpdateForm />;
      if (itemSlug === "department-of-commerce") return <DepartmentOfCommerce />;
      return <DepartmentDetail itemSlug={itemSlug || ""} />;
    }

    if (catSlug === "teaching-learning") {
      return <TeachingLearningRenderer subSlug={itemSlug} />;
    }

    if (catSlug === "examination-evaluation") {
      return <ExaminationEvaluationRenderer subSlug={itemSlug} />;
    }

    if (catSlug === "academic-enrichment") {
      return <AcademicEnrichmentRenderer subSlug={itemSlug} />;
    }

    if (catSlug === "academic-quality-outcomes") {
      return <AcademicQualityOutcomesRenderer subSlug={itemSlug} />;
    }
    
    return <AcademicsClientFallback />;
  };

  // Determine page title and subtext
  let pageTitle = "Academics";
  let pageSubtext: React.ReactNode = "Providing career-oriented, research-infused undergraduate, postgraduate, and professional curricula designed to foster intellectual growth, global competency, and ethical leadership.";

  if (catSlug === "academic-programmes") {
    pageSubtext = "St. Ann’s College for Women offers diverse UG and PG programmes for academic and professional excellence. UG programmes follow the Single Major system from 2023–2024, aligned with NEP 2020. MCA and MBA are professional programmes approved by AICTE.";
  } else if (catSlug === "curriculum-academic-planning") {
    if (itemSlug === "academic-regulations" || itemSlug === "academic-implementation-plan-aip") {
      pageSubtext = (
        <span>
          The College follows the rules, regulations, guidelines and academic norms prescribed by{" "}
          <strong className="font-black text-[#002147] bg-blue-100/60 px-1.5 py-0.5 rounded">Acharya Nagarjuna University (ANU)</strong>,{" "}
          <strong className="font-black text-[#002147] bg-blue-100/60 px-1.5 py-0.5 rounded">University Grants Commission (UGC)</strong>,{" "}
          <strong className="font-black text-[#002147] bg-blue-100/60 px-1.5 py-0.5 rounded">All India Council for Technical Education (AICTE)</strong>,{" "}
          <strong className="font-black text-[#002147] bg-blue-100/60 px-1.5 py-0.5 rounded">Andhra Pradesh Council of Higher Education (APSCHE)</strong> and other competent{" "}
          <strong className="font-bold text-slate-900">statutory and regulatory authorities</strong>, as applicable to the respective programmes and from time to time. The College also follows its{" "}
          <strong className="font-bold text-slate-900">approved institutional academic policies and regulations</strong>.
        </span>
      );
    } else if (itemSlug === "timetables" || itemSlug === "time-tables") {
      pageSubtext = "The College publishes centrally prepared semester-wise class timetables for UG and PG programmes to ensure systematic scheduling and effective implementation of academic activities.";
    } else if (itemSlug === "curriculum-syllabus" || itemSlug === "curriculum-framework" || itemSlug === "innovative-interdisciplinary-offerings") {
      pageSubtext = "The College follows the prescribed curriculum and academic framework of the competent academic and statutory authorities and provides the complete programme-wise syllabus for Undergraduate (UG) and Postgraduate (PG) programmes. The syllabus documents include the applicable programme structure, courses, credits, course objectives, learning outcomes, scheme of instruction and evaluation.";
    } else if (itemSlug === "academic-calendar" || itemSlug === "academic-calendar-ug-pg") {
      pageSubtext = "The College follows the Academic Calendar prescribed by Acharya Nagarjuna University (ANU) for its Undergraduate and Postgraduate programmes. Based on the University schedule, the College prepares its Annual Institutional Plan (AIP) to plan and monitor academic, co-curricular, extracurricular and institutional activities.";
    } else if (itemSlug === "ilms-system" || itemSlug === "learning-management-system-lms") {
      pageSubtext = (
        <div className="flex flex-col gap-2.5">
          <p>
            St. Ann’s College for Women promotes the use of digital technologies to strengthen teaching-learning processes and provide students and faculty with convenient access to academic resources. The <strong className="font-black text-[#002147]">Integrated Learning Management System (ILMS)</strong> serves as a digital academic platform for organizing and sharing course-related resources, supporting learning activities, and facilitating academic engagement beyond the conventional classroom.
          </p>
          <p>
            The ILMS complements classroom teaching by providing structured access to digital learning resources and supporting <strong className="font-bold text-slate-900">ICT-enabled, learner-centric and blended teaching-learning practices</strong>.
          </p>
        </div>
      );
    } else {
      pageSubtext = "The College follows the prescribed curriculum and academic framework of the competent academic and statutory authorities and provides the complete programme-wise syllabus for Undergraduate (UG) and Postgraduate (PG) programmes.";
    }
  } else if (catSlug === "departments") {
    if (itemSlug === "department-of-commerce") {
      pageSubtext = "The Department of Commerce is committed to imparting quality education in commerce, accounting, finance, taxation and business management, empowering students with analytical, entrepreneurial, and financial skills.";
    } else {
      pageSubtext = "Thirteen dynamic academic departments driving specialized learning, computational labs, scientific research, and professional training.";
    }
  } else if (catSlug === "teaching-learning") {
    if (itemSlug === "teaching-learning-practices") {
      pageSubtext = "Teaching is supported through classroom instruction, discussions, presentations, seminars, assignments, tutorials, and continuous academic guidance.";
    } else if (itemSlug === "innovative-teaching-practices") {
      pageSubtext = "Faculty members adopt innovative and activity-based methods such as case studies, group activities, problem-solving exercises, demonstrations, and interactive learning.";
    } else if (itemSlug === "experiential-participative-learning") {
      pageSubtext = "Students engage in projects, field visits, internships, practical activities, workshops, seminars, and group-based learning to connect classroom knowledge with real-world applications.";
    } else if (itemSlug === "ict-enabled-teaching") {
      pageSubtext = "Digital tools and ICT resources are integrated into teaching through presentations, digital learning resources, online platforms, multimedia content, and other technology-enabled learning practices.";
    } else if (itemSlug === "student-centric-learning") {
      pageSubtext = "The College promotes active student participation, collaborative learning, mentoring, individual academic support, and opportunities for skill development, with emphasis on the diverse learning needs of students.";
    } else {
      pageSubtext = "St. Ann’s College for Women follows student-centred, participative, and outcome-oriented teaching-learning practices to support academic achievement and holistic development.";
    }
  } else if (catSlug === "examination-evaluation") {
    if (itemSlug === "examination-system") {
      pageSubtext = "The College conducts examinations and evaluation processes as per the academic calendar, university regulations, and prescribed guidelines.";
    } else if (itemSlug === "continuous-internal-assessment") {
      pageSubtext = "Students are assessed continuously through internal tests, assignments, seminars, presentations, projects, and other academic activities, as prescribed by the University.";
    } else if (itemSlug === "university-examinations") {
      pageSubtext = "Semester-end University examinations are conducted as per the schedule, regulations, and procedures prescribed by Acharya Nagarjuna University.";
    } else if (itemSlug === "results-performance") {
      pageSubtext = "Student performance is monitored through internal and university examinations, with results analyzed to identify academic strengths and areas requiring support.";
    } else if (itemSlug === "examination-regulations") {
      pageSubtext = "All examinations are conducted in accordance with the University examination regulations, academic guidelines, and institutional procedures, ensuring fairness, transparency, and academic integrity.";
    } else {
      pageSubtext = "The College follows a transparent, systematic, and student-oriented examination and evaluation system in accordance with the regulations of Acharya Nagarjuna University.";
    }
  } else if (catSlug === "academic-enrichment") {
    if (itemSlug === "value-added-courses") {
      pageSubtext = "Courses are offered to supplement the curriculum and provide additional knowledge and competencies.";
    } else if (itemSlug === "certificate-courses") {
      pageSubtext = "Certificate programmes are conducted to develop job-oriented and domain-specific skills.";
    } else if (itemSlug === "skill-development-programmes") {
      pageSubtext = "Students are provided opportunities to develop technical, communication, soft skills, and employability competencies.";
    } else if (itemSlug === "guest-lectures-workshops") {
      pageSubtext = "Experts, academicians, and industry professionals are invited to provide practical insights and exposure to emerging areas.";
    } else if (itemSlug === "seminars-conferences") {
      pageSubtext = "Seminars, conferences, webinars, and academic interactions are organized to promote knowledge sharing, critical thinking, and academic exposure.";
    } else if (itemSlug === "academic-collaborations") {
      pageSubtext = "The College promotes academic linkages and collaborations with universities, institutions, industry, and other organizations for academic enrichment and student development.";
    } else {
      pageSubtext = "The College provides opportunities beyond the prescribed curriculum to enhance students’ knowledge, skills, employability, and overall development.";
    }
  } else if (catSlug === "academic-quality-outcomes") {
    if (itemSlug === "programme-outcomes" || itemSlug === "programme-outcomes-pos") {
      pageSubtext = "Programme Outcomes define the knowledge, skills, competencies, and attributes that students are expected to acquire upon successful completion of a programme.";
    } else if (itemSlug === "programme-specific-outcomes" || itemSlug === "programme-specific-outcomes-psos") {
      pageSubtext = "Programme Specific Outcomes specify the programme-specific knowledge, skills, and competencies that students are expected to develop through their chosen programme.";
    } else if (itemSlug === "course-outcomes" || itemSlug === "course-outcomes-cos") {
      pageSubtext = "Course Outcomes describe the specific learning outcomes that students are expected to achieve on completion of individual courses.";
    } else if (itemSlug === "co-po-pso-mapping") {
      pageSubtext = "Course Outcomes are mapped with Programme Outcomes and Programme Specific Outcomes to assess the alignment between course-level learning and programme-level outcomes.";
    } else if (itemSlug === "attainment-of-outcomes") {
      pageSubtext = "Outcome attainment is assessed through appropriate internal and external assessment methods. The results are analysed and used to identify areas for academic improvement.";
    } else if (itemSlug === "academic-audit") {
      pageSubtext = "Academic audits are undertaken to review teaching-learning processes, academic practices, documentation, and quality enhancement measures, supporting continuous improvement.";
    } else {
      pageSubtext = "The College follows an outcome-based education approach to ensure that teaching-learning processes contribute to the achievement of clearly defined academic and developmental outcomes.";
    }
  }

  if (isAllDeptsRoot) {
    pageTitle = "Academic Departments";
  } else if (itemSlug) {
    for (const group of navigationStructure) {
      const found = group.items.find(it => it.slug === itemSlug);
      if (found) {
        pageTitle = found.text.replace(/^(\d+\.\s*|•\s*)/, "");
        break;
      }
    }
  }

  // When on Department Overview Hub (/academics/departments), render full-width with NO sidebar
  if (isAllDeptsRoot) {
    return (
      <div className="bg-slate-50/40 min-h-screen select-none animate-fadeIn font-sans">
        <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-12 sm:pb-16">
          <AllDepartmentsHub />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/40 min-h-screen select-none animate-fadeIn font-sans">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          
          {/* Left Navigation Sidebar for Desktop */}
          <div
            className="lg:col-span-3 flex flex-col sticky select-none h-fit overflow-hidden bg-white border border-slate-200/80 rounded-[2rem] shadow-sm z-20"
            style={{
              top: `${headerHeight + 16}px`,
              maxHeight: `calc(100vh - ${headerHeight + 32}px)`,
            }}
          >
            {/* Pinned Top Banner Header - Always fixed at top of sidebar card */}
            <div className="p-4 sm:p-5 pb-3.5 shrink-0 bg-white border-b border-slate-100">
              <div className="text-white px-4 py-3.5 rounded-2xl flex items-center gap-3.5 shadow-sm bg-[#002147] border border-[#002147]/20">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white shrink-0 backdrop-blur-xs shadow-inner">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="flex flex-col min-w-0">
                  <Link href="/academics" className="font-outfit text-sm sm:text-base font-black uppercase tracking-wider text-white truncate leading-tight hover:underline">
                    Academics
                  </Link>
                  <span className="text-[10px] sm:text-[11px] text-blue-100/80 font-medium truncate mt-0.5">
                    Academic Modules &amp; Programs
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Categories List */}
            <div
              ref={sidebarScrollRef}
              onScroll={saveSidebarScroll}
              className="p-4 sm:p-5 pt-3 overflow-y-auto flex-1 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {navigationStructure.map((group) => {
                const isGroupActive = catSlug === group.catSlug;

                if (group.isDropdown) {
                  return (
                    <div key={group.catSlug} className="flex flex-col gap-1.5 border-y border-slate-100 py-3 my-1">
                      <div className="flex items-center justify-between px-2">
                        <Link
                          href="/academics/departments"
                          onClick={saveSidebarScroll}
                          data-active={isAllDeptsRoot ? "true" : undefined}
                          className={`font-outfit text-[11px] font-black uppercase tracking-wider hover:text-[#002147] transition-colors flex items-center gap-2 ${
                            isAllDeptsRoot ? "text-[#002147]" : "text-slate-600"
                          }`}
                        >
                          <Building className="h-3.5 w-3.5 text-[#002147]" />
                          <span>C. Departments</span>
                        </Link>
                        <button
                          onClick={() => setDeptsOpen(!deptsOpen)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#002147] transition-colors cursor-pointer"
                          title={deptsOpen ? "Collapse Departments Menu" : "Expand Departments Menu"}
                        >
                          {deptsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                      </div>

                      {deptsOpen && (
                        <div className="flex flex-col gap-1 pl-2 border-l-2 border-indigo-100/60 ml-3 mt-1 animate-fadeIn">
                          {group.items.map((item) => {
                            const isActive = catSlug === group.catSlug && itemSlug === item.slug;
                            return (
                              <Link
                                key={item.slug}
                                href={`/academics/${group.catSlug}/${item.slug}`}
                                onClick={saveSidebarScroll}
                                data-active={isActive ? "true" : undefined}
                                className={`font-sans text-xs p-2 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                                  isActive
                                    ? "bg-[#002147]/10 border-[#002147]/20 text-[#002147] font-black shadow-xs"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-[#002147] font-bold"
                                }`}
                              >
                                <span className="truncate pr-1 text-[11px] leading-tight">{item.text}</span>
                                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#002147] shrink-0 animate-pulse"></span>}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={group.catSlug} className="flex flex-col gap-1.5">
                    <span className="font-outfit text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                      {group.title}
                    </span>
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const isActive = catSlug === group.catSlug && itemSlug === item.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={`/academics/${group.catSlug}/${item.slug}`}
                            onClick={saveSidebarScroll}
                            data-active={isActive ? "true" : undefined}
                            className={`font-sans text-xs p-2.5 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                              isActive
                                ? "bg-[#002147]/10 border-[#002147]/20 text-[#002147] font-black shadow-xs"
                                : "text-slate-600 hover:bg-slate-50 hover:text-[#002147] font-bold"
                            }`}
                          >
                            <span className="truncate pr-2 leading-tight">{item.text}</span>
                            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#002147] shrink-0 animate-pulse"></span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Dynamic Right Component */}
          <div className={`lg:col-span-9 mb-16 flex flex-col ${catSlug === "departments" ? "gap-3.5" : "gap-8"}`}>
            {/* Sub-text Box (suppressed for all departments because departments render their own heading box first, then quote box) */}
            {catSlug !== "departments" && (
              <SubtextBox subtext={pageSubtext} />
            )}

            <div className={`flex flex-col ${catSlug === "departments" ? "gap-3.5" : "gap-6"}`}>
              {renderMainContent()}
            </div>
            
            {/* Mini Sidebar Widgets Display at bottom on mobile/desktop as layout backup */}
            <div className="border-t border-slate-200/60 pt-8 mt-4">
              <AcademicsSidebar catSlug={catSlug} itemSlug={itemSlug} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
