"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Target, CheckCircle, FileText, ArrowRight, ShieldCheck, BarChart3, Layers, Award } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

interface AcademicQualityOutcomesRendererProps {
  subSlug?: string;
}

export function AcademicQualityOutcomesRenderer({ subSlug }: AcademicQualityOutcomesRendererProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const aqo = academicsData.academicQualityOutcomes;

  const topics: Record<string, { title: string; desc: string; docUrl?: string; docLabel?: string; highlights: string[]; icon: any }> = {
    "programme-outcomes": {
      title: "1. Programme Outcomes (POs)",
      desc: aqo.pos.desc,
      docUrl: aqo.pos.docUrl,
      docLabel: "View POs: Programme Outcomes (POs)",
      highlights: [
        "Comprehensive knowledge mastery and disciplinary foundation",
        "Critical thinking, analytical deduction, and problem-solving skills",
        "Effective linguistic and interpersonal communication",
        "Ethical reasoning, social responsibility, and lifelong learning commitment"
      ],
      icon: Target
    },
    "programme-specific-outcomes": {
      title: "2. Programme Specific Outcomes (PSOs)",
      desc: aqo.psos.desc,
      docUrl: aqo.psos.docUrl,
      docLabel: "View PSOs: Programme Specific Outcomes (PSOs)",
      highlights: [
        "Domain-specific technological and business competencies",
        "Applied practical mastery in specialized departmental tools and methodologies",
        "Preparation for competitive entrance tests, corporate roles, or postgraduate research",
        "Demonstrated capacity for innovation within chosen major subject"
      ],
      icon: Award
    },
    "course-outcomes": {
      title: "3. Course Outcomes (COs)",
      desc: aqo.cos.desc,
      docUrl: aqo.cos.docUrl,
      docLabel: "View COs: Course Outcomes (COs)",
      highlights: [
        "Defined for every individual course across all semesters",
        "Framed in strict accordance with Bloom's Revised Taxonomy levels",
        "Clearly communicated to students at the commencement of each semester",
        "Measured directly through internal mid-exams, assignments, and university evaluations"
      ],
      icon: Layers
    },
    "co-po-pso-mapping": {
      title: "4. CO–PO/PSO Mapping",
      desc: aqo.mapping.desc,
      docUrl: "/documents/DefaultFile_1.pdf",
      docLabel: "View CO–PO/PSO Articulation Matrix",
      highlights: [
        "Systematic articulation matrices constructed for every individual subject",
        "Correlation correlation levels quantified as: 1 (Slight), 2 (Moderate), 3 (Substantial)",
        "Periodic review by Departmental Academic Committees and IQAC",
        "Validates that overall programme objectives are fulfilled by course curricula"
      ],
      icon: BarChart3
    },
    "attainment-of-outcomes": {
      title: "5. Attainment of Outcomes",
      desc: aqo.attainment.desc,
      docUrl: "/documents/DefaultFile_1.pdf",
      docLabel: "View Outcome Attainment Methodology",
      highlights: [
        "Direct attainment calculated via internal continuous tests and university semester marks",
        "Indirect attainment measured through exit surveys, alumni feedback, and employer reviews",
        "Benchmarked target levels established for each course and programme cohort",
        "Outcome analysis feeds into annual curriculum enrichment and remedial actions"
      ],
      icon: CheckCircle
    },
    "academic-audit": {
      title: "6. Academic & Administrative Audit (AAA)",
      desc: aqo.audit.desc,
      docUrl: aqo.audit.docUrl,
      docLabel: "View Academic Audit Document",
      highlights: [
        "Annual internal and external peer audits conducted by academic experts",
        "Thorough evaluation of course files, teaching plans, evaluation records, and laboratory setups",
        "Faculty publication, research progress, and student feedback analysis",
        "Comprehensive audit reports reviewed by Principal, Management, and IQAC"
      ],
      icon: ShieldCheck
    }
  };

  // Support both slug conventions
  const normalizedSlug = subSlug === "programme-outcomes-pos" ? "programme-outcomes" :
    subSlug === "programme-specific-outcomes-psos" ? "programme-specific-outcomes" :
    subSlug === "course-outcomes-cos" ? "course-outcomes" : subSlug;

  const currentTopic = normalizedSlug ? topics[normalizedSlug] : null;

  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-[#002147]" /> Academic Quality &amp; Outcomes
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          {currentTopic ? currentTopic.title : "Academic Quality & Outcomes (OBE)"}
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Main Philosophy Banner */}
      <div className="bg-slate-50 border border-slate-200/60 p-6 md:p-8 rounded-3xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        {aqo.intro} The College follows an <strong className="text-[#002147]">Outcome-Based Education (OBE)</strong> framework to ensure that teaching-learning processes contribute directly to the achievement of clearly defined academic, professional, and developmental outcomes.
      </div>

      {/* Single Topic Detail or All Topics Overview */}
      {currentTopic ? (
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shrink-0">
                <currentTopic.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OBE Component</span>
                <h3 className="font-outfit text-xl font-black text-[#002147]">{currentTopic.title}</h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
              {currentTopic.desc}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <h4 className="font-outfit text-sm font-bold text-slate-800 uppercase tracking-wider">Key Framework Pillars</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTopic.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-200/60 rounded-2xl shadow-xs">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {currentTopic.docUrl && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs font-bold text-slate-500">Official Outcome Records &amp; Matrices:</span>
                <button
                  onClick={() => {
                    setPreviewUrl(currentTopic.docUrl || "/documents/DefaultFile_1.pdf");
                    setPreviewTitle(`${currentTopic.title} - Official Record`);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <FileText className="h-4 w-4" /> {currentTopic.docLabel || "View Document"}
                </button>
              </div>
            )}
          </div>

          {/* Sibling Subtopics Navigation */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl flex flex-col gap-3">
            <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">Other Sections in Academic Quality &amp; Outcomes:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(topics)
                .filter(([slug]) => slug !== normalizedSlug)
                .map(([slug, data]) => (
                  <Link
                    key={slug}
                    href={`/academics/academic-quality-outcomes/${slug}`}
                    className="p-3 bg-white border border-slate-200/60 rounded-xl hover:border-[#002147]/40 hover:shadow-xs transition-all flex items-center justify-between group"
                  >
                    <span className="text-xs font-bold text-slate-700 group-hover:text-[#002147] truncate pr-1">{data.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      ) : (
        /* Overview Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(topics).map(([slug, data]) => {
            const Icon = data.icon;
            return (
              <div key={slug} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-5 hover:border-[#002147]/20 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-outfit text-base font-bold text-slate-800">{data.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {data.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/academics/academic-quality-outcomes/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] hover:underline"
                  >
                    Explore Framework <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  {data.docUrl && (
                    <button
                      onClick={() => {
                        setPreviewUrl(data.docUrl || "/documents/DefaultFile_1.pdf");
                        setPreviewTitle(`${data.title} - Document`);
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Document Preview"}
      />
    </div>
  );
}

