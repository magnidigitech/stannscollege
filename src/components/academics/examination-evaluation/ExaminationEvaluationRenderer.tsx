"use client";

import React, { useEffect } from "react";
import { Award, ShieldCheck, BarChart3, Scale, Layers } from "lucide-react";
import academicsData from "../academics-data.json";

interface ExaminationEvaluationRendererProps {
  subSlug?: string;
}

export function ExaminationEvaluationRenderer({ subSlug }: ExaminationEvaluationRendererProps) {
  const ee = academicsData.examinationEvaluation;

  const topicsList = [
    {
      slug: "examination-system",
      title: "Examination System",
      summary: ee.examinationSystem.summary,
      icon: Layers
    },
    {
      slug: "continuous-internal-assessment",
      title: "Continuous Internal Assessment (CIA)",
      summary: ee.continuousInternalAssessment.summary,
      icon: Award
    },
    {
      slug: "university-examinations",
      title: "University Examinations",
      summary: ee.universityExaminations.summary,
      icon: ShieldCheck
    },
    {
      slug: "results-performance",
      title: "Results & Performance",
      summary: ee.resultsPerformance.summary,
      icon: BarChart3
    },
    {
      slug: "examination-regulations",
      title: "Examination Regulations",
      summary: ee.examinationRegulations.summary,
      icon: Scale
    }
  ];

  // Smooth scroll to the targeted section if a subSlug is present
  useEffect(() => {
    if (subSlug) {
      const el = document.getElementById(subSlug);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    }
  }, [subSlug]);

  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-[#002147]" /> Academic Evaluation
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Examination &amp; Evaluation
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Unified List of All 5 Topics in "Heading Next Paragraph" Format (Approach A) */}
      <div className="flex flex-col gap-6">
        {topicsList.map((item) => {
          const isSelected = subSlug === item.slug;
          const Icon = item.icon;

          return (
            <div
              key={item.slug}
              id={item.slug}
              className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col gap-4 scroll-mt-24 ${
                isSelected
                  ? "bg-white border-2 border-[#002147] shadow-lg ring-4 ring-[#002147]/10"
                  : "bg-white border-2 border-slate-200/90 hover:border-[#002147]/40 shadow-xs hover:shadow-sm"
              }`}
            >
              {/* Card Heading Banner */}
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#002147] text-amber-300 shadow-xs"
                        : "bg-[#002147]/5 text-[#002147]"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-outfit text-lg sm:text-xl font-black text-[#002147] leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Authentic Paragraph from 3.Academics.docx */}
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal pl-0 sm:pl-1">
                {item.summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
