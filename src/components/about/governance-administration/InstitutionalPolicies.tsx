"use client";

import { ShieldCheck, Award, GraduationCap, CheckCircle, Award as Medal, Sparkles, BookOpen, Compass, Target, Settings, Layers, ClipboardCheck, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { CurriculumPolicyDetail } from "../policy/academic-curriculum-policies/CurriculumPolicyDetail";
import { TeachingPolicyDetail } from "../policy/academic-curriculum-policies/TeachingPolicyDetail";

export function InstitutionalPolicies() {
  const [selectedPolicy, setSelectedPolicy] = useState<"main" | "curriculum" | "teaching">("main");
  const [openIds, setOpenIds] = useState<number[]>([0]);

  const categories = [
    {
      title: "1. Academic & Curriculum Policies",
      points: [
        "Curriculum Planning and Development Policy (CBCS/OBE)",
        "Teaching–Learning and Pedagogy Policy",
        "Academic Calendar and Academic Planning Policy",
        "Feedback and Stakeholder Engagement Policy",
        "Examination and Assessment Policy",
        "Outcome-Based Education (OBE) Implementation Policy",
        "Value-Added and Certificate Courses Policy",
        "Internship and Experiential Learning Policy"
      ]
    },
    {
      title: "2. Research, Innovation & Extension Policies",
      points: [
        "Research Promotion and Development Policy",
        "Intellectual Property Rights (IPR) Policy",
        "Innovation, Incubation Policy",
        "Entrepreneurship Policy",
        "Collaboration, MoU & Consultancy Policy"
      ]
    },
    {
      title: "3. Student Support & Welfare Policies",
      points: [
        "Student Induction and Mentoring Policy",
        "Student Support, Scholarships and Financial Aid Policy",
        "Career Guidance, Training and Placement Policy",
        "Student Grievance Redressal Policy",
        "Anti-Ragging Policy",
        "Student Welfare and Counseling Policy",
        "Alumni Engagement and Progression Policy"
      ]
    },
    {
      title: "4. Governance & Institutional Management Policies",
      points: [
        "Institutional Governance and Leadership Policy",
        "Code of Conduct Policy (Students, Faculty and Staff)",
        "E-Governance and Digital Administration Policy",
        "Strategic Perspective Plan (2024–2030)",
        "Internal Quality Assurance Cell (IQAC) Policy",
        "Decentralization and Participative Management Policy"
      ]
    },
    {
      title: "5. Human Resource Management Policies",
      points: [
        "Recruitment, Selection and Promotion Policy",
        "Faculty Development and Training Policy",
        "Performance Appraisal Policy (PBAS/API)",
        "Leave, Service Rules and Welfare Policy",
        "Staff Welfare and Professional Ethics Policy"
      ]
    },
    {
      title: "6. Financial Management Policies",
      points: [
        "Financial Management and Resource Mobilization Policy",
        "Budget Planning and Financial Control Policy",
        "Audit and Compliance Policy",
        "Procurement and Purchase Policy",
        "Financial Transparency and Utilization Policy"
      ]
    },
    {
      title: "7. Infrastructure & Learning Resources Policies",
      points: [
        "Infrastructure Development and Augmentation Policy",
        "IT Infrastructure and Digital Learning Policy",
        "Library and Knowledge Resource Policy",
        "Maintenance of Physical and Academic Facilities Policy",
        "Campus Safety and Security Policy"
      ]
    },
    {
      title: "8. Gender Equity & Inclusivity Policies",
      points: [
        "Gender Equity and Sensitization Policy",
        "Prevention of Sexual Harassment Policy (POSH – ICC)",
        "Equal Opportunity and Inclusive Education Policy",
        "Divyangjan (Differently-Abled) Support Policy",
        "Women Empowerment and Development Policy"
      ]
    },
    {
      title: "9. Environment & Sustainability Policies",
      points: [
        "Green Campus and Environmental Sustainability Policy",
        "Waste Management Policy",
        "Energy Conservation and Renewable Energy Policy",
        "Water Conservation and Management Policy",
        "Green Audit and Environmental Monitoring Policy"
      ]
    },
    {
      title: "10. Extension, Outreach & Social Responsibility Policies",
      points: [
        "Extension Activities and Community Engagement Policy",
        "NSS and Institutional Social Responsibility Policy",
        "Outreach Programs and Social Impact Policy"
      ]
    },
    {
      title: "11. Quality Assurance & NAAC Policies",
      points: [
        "Internal Quality Assurance and Enhancement Policy",
        "Continuous Quality Improvement Policy",
        "Best Practices and Institutional Distinctiveness Policy",
        "Documentation, Data Management and AQAR Policy",
        "Academic and Administrative Audit (AAA) Policy"
      ]
    }
  ];

  const mandatoryPolicies = [
    "Anti-Ragging Policy",
    "Sexual Harassment Prevention Policy (ICC)",
    "Student Grievance Redressal Policy",
    "Code of Conduct",
    "Equal Opportunity Policy"
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setOpenIds(categories.map((_, idx) => idx));
    }
  }, []);

  const toggleAccordion = (idx: number) => {
    setOpenIds((prev) =>
      prev.includes(idx) ? prev.filter((id) => id !== idx) : [...prev, idx]
    );
  };

  if (selectedPolicy === "curriculum") {
    return <CurriculumPolicyDetail onBack={() => setSelectedPolicy("main")} />;
  }

  if (selectedPolicy === "teaching") {
    return <TeachingPolicyDetail onBack={() => setSelectedPolicy("main")} />;
  }

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <ClipboardCheck className="h-3.5 w-3.5" /> NAAC-Aligned Framework
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Institutional Policies
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Enforcing strict, transparent, and fair policies governing all facets of our educational mission. This framework supports continuous quality enhancement and academic integrity.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <ClipboardCheck className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Mandatory Statutory Policies Callout Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 md:p-8 rounded-3xl shadow-md border border-indigo-800/40 hover:shadow-lg transition-all flex flex-col justify-between">
        <div>
          <h4 className="font-outfit text-lg md:text-xl font-black text-indigo-300 border-b border-indigo-800/80 pb-3 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 animate-pulse" /> Mandatory Statutory Policies
          </h4>
          <p className="text-indigo-100/80 text-xs md:text-sm font-medium mb-5 select-none">
            Strictly highlighted for compliance and regulatory clarity.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {mandatoryPolicies.map((policy, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 px-4 py-2 text-xs md:text-sm font-bold text-indigo-100 transition-all select-none"
              >
                <CheckCircle className="h-4 w-4 text-indigo-300 shrink-0" />
                {policy}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Accordions Category List - using same styling as Detail view */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`overflow-hidden border transition-all duration-300 rounded-2xl ${openIds.includes(index)
                ? "bg-indigo-50/20 border-indigo-200/80 shadow-md"
                : "bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm"
              }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between px-6 py-4 outline-none text-left select-none"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 text-xs shrink-0 select-none">
                  <Layers className="h-4 w-4 text-indigo-600" />
                </span>
                <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                  {cat.title}
                </h4>
              </div>
            </button>

            {openIds.includes(index) && (
              <div className="px-6 pb-5 pt-2 border-t border-indigo-100/40 animate-fadeIn">
                <div className="flex flex-col gap-2.5">
                  {cat.points.map((point, idx) => {
                    const isCurriculum = index === 0 && idx === 0;
                    const isTeaching = index === 0 && idx === 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isCurriculum) setSelectedPolicy("curriculum");
                          if (isTeaching) setSelectedPolicy("teaching");
                        }}
                        className={`flex items-start gap-2 text-xs md:text-sm font-normal text-slate-600 leading-relaxed p-1.5 rounded-xl transition-all ${isCurriculum || isTeaching
                            ? "cursor-pointer hover:bg-indigo-50/60 hover:text-indigo-700 font-bold border border-transparent hover:border-indigo-100/50"
                            : ""
                          }`}
                      >
                        <CheckCircle
                          className={`h-4 w-4 mt-0.5 shrink-0 ${isCurriculum || isTeaching
                              ? "text-indigo-600 animate-pulse"
                              : "text-indigo-500"
                            }`}
                        />
                        <span>{point}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
