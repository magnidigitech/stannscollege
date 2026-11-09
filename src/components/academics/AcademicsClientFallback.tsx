"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap, BookOpen, Building, Award, Lightbulb, Settings, LineChart,
  ChevronRight, Sparkles, CheckCircle, ArrowRight, ShieldCheck, Scale, Compass, Users
} from "lucide-react";

export default function AcademicsClientFallback() {
  const categories = [
    {
      catSlug: "academic-programmes",
      title: "A. Academic Programmes",
      badge: "UG & PG Quotas",
      description: "Undergraduate Single Major honours programmes and AICTE-approved postgraduate professional degrees (MCA & MBA).",
      icon: GraduationCap,
      href: "/academics/academic-programmes/undergraduate-programmes",
      items: [
        { text: "Undergraduate (UG) Programmes", slug: "undergraduate-programmes" },
        { text: "Postgraduate (PG) Programmes", slug: "postgraduate-programmes" }
      ]
    },
    {
      catSlug: "curriculum-academic-planning",
      title: "B. Academic Regulations & Resources",
      badge: "Syllabus & Calendars",
      description: "Academic calendars, semester timetables, NEP 2020 single-major syllabus, regulations, and the Integrated Learning Management System (ILMS).",
      icon: BookOpen,
      href: "/academics/curriculum-academic-planning/academic-calendar",
      items: [
        { text: "Academic Calendar", slug: "academic-calendar" },
        { text: "Time Tables", slug: "timetables" },
        { text: "Curriculum & Syllabus", slug: "curriculum-syllabus" },
        { text: "Academic Regulations", slug: "academic-regulations" },
        { text: "ILMS – Learning Management System", slug: "ilms-system" }
      ]
    },
    {
      catSlug: "departments",
      title: "C. Academic Departments",
      badge: "13 Departments",
      description: "Thirteen dynamic academic departments driving specialized learning, computational labs, scientific research, and professional training.",
      icon: Building,
      href: "/academics/departments",
      items: [
        { text: "1. Department of Commerce", slug: "department-of-commerce" },
        { text: "2. Dept. of Computer Science & Applications", slug: "department-of-computer-science-applications" },
        { text: "3. Department of Mathematics", slug: "department-of-mathematics" },
        { text: "4. Department of Physics", slug: "department-of-physics" },
        { text: "12. Department of MCA", slug: "department-of-mca" },
        { text: "13. Department of MBA", slug: "department-of-mba" }
      ]
    },
    {
      catSlug: "teaching-learning",
      title: "D. Teaching & Learning",
      badge: "Student-Centric",
      description: "Innovative classroom methodologies, experiential learning, field projects, ICT integrations, and remedial support systems.",
      icon: Lightbulb,
      href: "/academics/teaching-learning/teaching-learning-practices",
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
      badge: "Transparent Assessment",
      description: "Standardized evaluation architecture, Continuous Internal Assessment (CIA), semester-end university exams, and ethical conduct.",
      icon: Award,
      href: "/academics/examination-evaluation/examination-system",
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
      badge: "Beyond Syllabus",
      description: "Value-added courses, domain certificate programmes, technical skill development, industry workshops, and national seminars.",
      icon: Sparkles,
      href: "/academics/academic-enrichment/value-added-courses",
      items: [
        { text: "Value-Added Courses (VAC)", slug: "value-added-courses" },
        { text: "Certificate Programmes", slug: "certificate-courses" },
        { text: "Skill Development Programmes", slug: "skill-development-programmes" },
        { text: "Guest Lectures & Workshops", slug: "guest-lectures-workshops" },
        { text: "Seminars & Conferences", slug: "seminars-conferences" },
        { text: "Academic Collaborations", slug: "academic-collaborations" }
      ]
    },
    {
      catSlug: "academic-quality-outcomes",
      title: "G. Academic Quality & Outcomes",
      badge: "OBE & AAA Audits",
      description: "Outcome-Based Education framework mapping Programme Outcomes (POs), PSOs, Course Outcomes (COs), attainment, and Academic Audits.",
      icon: ShieldCheck,
      href: "/academics/academic-quality-outcomes/programme-outcomes",
      items: [
        { text: "Programme Outcomes (POs)", slug: "programme-outcomes" },
        { text: "Programme Specific Outcomes (PSOs)", slug: "programme-specific-outcomes" },
        { text: "Course Outcomes (COs)", slug: "course-outcomes" },
        { text: "CO–PO/PSO Mapping", slug: "co-po-pso-mapping" },
        { text: "Attainment of Outcomes", slug: "attainment-of-outcomes" },
        { text: "Academic & Administrative Audit (AAA)", slug: "academic-audit" }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8 font-sans animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-[#002147] via-[#002d5c] to-indigo-950 rounded-[2rem] py-6 px-6 sm:px-8 md:py-8 md:px-12 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <GraduationCap className="h-[350px] w-[350px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-3 max-w-5xl pr-4 lg:pr-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-black tracking-wider uppercase w-fit text-blue-100">
            <Sparkles className="h-3 w-3 text-amber-300" /> Academic Portal
          </span>
          <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
            Academic Excellence &amp; Holistic Development
          </h2>
          <p className="text-blue-100/90 text-xs sm:text-sm font-normal leading-relaxed">
            St. Ann&apos;s College for Women provides career-oriented, research-infused undergraduate and postgraduate curricula designed to foster intellectual growth, global competency, and ethical leadership in accordance with Acharya Nagarjuna University and NEP 2020 guidelines.
          </p>
        </div>
      </div>

      {/* Grid of 7 Categories with Direct Subpage Links (NO MODAL POPUP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.catSlug}
              className="bg-white border border-slate-200/80 rounded-[2rem] p-7 shadow-xs hover:shadow-lg hover:border-[#002147]/30 transition-all flex flex-col justify-between gap-6 group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 group-hover:bg-[#002147] group-hover:text-white transition-all shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-outfit text-lg font-black text-slate-850 group-hover:text-[#002147] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-slate-500 text-xs font-medium leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Direct Subpage Link List */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sub-Pages:</span>
                  <div className="flex flex-col gap-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={
                          cat.catSlug === "departments"
                            ? `/academics/departments/${item.slug}`
                            : `/academics/${cat.catSlug}/${item.slug}`
                        }
                        className="inline-flex items-center justify-between text-xs font-bold text-slate-700 hover:text-[#002147] hover:bg-slate-50 p-2 rounded-xl transition-all group/item"
                      >
                        <span className="truncate pr-2">{item.text}</span>
                        <ArrowRight className="h-3 w-3 text-slate-400 group-hover/item:text-[#002147] group-hover/item:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Primary Subpage Action */}
              <Link
                href={cat.href}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 hover:bg-[#002147] text-slate-700 hover:text-white text-xs font-bold transition-all shadow-xs group-hover:bg-[#002147] group-hover:text-white"
              >
                <span>Explore Section</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
