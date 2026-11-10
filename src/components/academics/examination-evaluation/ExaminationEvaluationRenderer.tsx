"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, CheckCircle, ShieldCheck, FileText, ArrowRight, BarChart3, Scale, Layers, HelpCircle } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

interface ExaminationEvaluationRendererProps {
  subSlug?: string;
}

export function ExaminationEvaluationRenderer({ subSlug }: ExaminationEvaluationRendererProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const ee = academicsData.examinationEvaluation;

  const topics: Record<string, { title: string; summary: string; highlights: string[]; icon: any }> = {
    "examination-system": {
      ...ee.examinationSystem,
      icon: Layers
    },
    "continuous-internal-assessment": {
      ...ee.continuousInternalAssessment,
      icon: Award
    },
    "university-examinations": {
      ...ee.universityExaminations,
      icon: ShieldCheck
    },
    "results-performance": {
      ...ee.resultsPerformance,
      icon: BarChart3
    },
    "examination-regulations": {
      ...ee.examinationRegulations,
      icon: Scale
    }
  };

  const currentTopic = subSlug ? topics[subSlug] : null;

  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-[#002147]" /> Examination &amp; Evaluation
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          {currentTopic ? currentTopic.title : "Examination & Evaluation System"}
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Main Philosophy Banner */}
      <div className="bg-slate-50 border border-slate-200/60 p-6 md:p-8 rounded-3xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        The College follows a <strong className="text-[#002147]">transparent, systematic, and student-oriented examination and evaluation system</strong> in accordance with the regulations of Acharya Nagarjuna University. Assessments are designed to measure knowledge acquisition, conceptual clarity, analytical capability, and practical competencies.
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Focus Area</span>
                <h3 className="font-outfit text-xl font-black text-[#002147]">{currentTopic.title}</h3>
              </div>
            </div>

            <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
              {currentTopic.summary}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <h4 className="font-outfit text-sm font-bold text-slate-800 uppercase tracking-wider">Operational Highlights &amp; Compliance</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTopic.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white border border-slate-200/60 rounded-2xl shadow-xs">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs font-bold text-slate-500">Related Examination Policy Document:</span>
              <button
                onClick={() => {
                  setPreviewUrl("/documents/DefaultFile_1.pdf");
                  setPreviewTitle(`${currentTopic.title} - Examination Guidelines & SOP`);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <FileText className="h-4 w-4" /> View Examination Document
              </button>
            </div>
          </div>

          {/* Sibling Subtopics Navigation */}
          <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl flex flex-col gap-3">
            <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">Other Areas in Examination &amp; Evaluation:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(topics)
                .filter(([slug]) => slug !== subSlug)
                .map(([slug, data]) => (
                  <Link
                    key={slug}
                    href={`/academics/examination-evaluation/${slug}`}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {data.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/academics/examination-evaluation/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] hover:underline"
                  >
                    Explore Guidelines <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      setPreviewUrl("/documents/DefaultFile_1.pdf");
                      setPreviewTitle(`${data.title} - Documentation`);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    View Document
                  </button>
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

