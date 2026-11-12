"use client";

import React, { useState, useEffect } from "react";
import { Target, ShieldCheck, BarChart3, Layers, Award, FileText, CheckCircle2 } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

interface AcademicQualityOutcomesRendererProps {
  subSlug?: string;
}

export function AcademicQualityOutcomesRenderer({ subSlug }: AcademicQualityOutcomesRendererProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const aqo = academicsData.academicQualityOutcomes;

  const topicsList = [
    {
      slug: "programme-outcomes",
      title: "Programme Outcomes (POs)",
      desc: aqo.pos.desc,
      docUrl: aqo.pos.docUrl || "/documents/DefaultFile_1.pdf",
      docLabel: "View POs: Programme Outcomes (POs)",
      icon: Target
    },
    {
      slug: "programme-specific-outcomes",
      title: "Programme Specific Outcomes (PSOs)",
      desc: aqo.psos.desc,
      docUrl: aqo.psos.docUrl || "/documents/DefaultFile_1.pdf",
      docLabel: "View PSOs: Programme Specific Outcomes (PSOs)",
      icon: Award
    },
    {
      slug: "course-outcomes",
      title: "Course Outcomes (COs)",
      desc: aqo.cos.desc,
      docUrl: aqo.cos.docUrl || "/documents/DefaultFile_1.pdf",
      docLabel: "View COs: Course Outcomes (COs)",
      icon: Layers
    },
    {
      slug: "co-po-pso-mapping",
      title: "CO–PO/PSO Mapping",
      desc: aqo.mapping.desc,
      icon: BarChart3
    },
    {
      slug: "attainment-of-outcomes",
      title: "Attainment of Outcomes",
      desc: aqo.attainment.desc,
      icon: CheckCircle2
    },
    {
      slug: "academic-audit",
      title: "Academic Audit",
      desc: aqo.audit.desc,
      docUrl: aqo.audit.docUrl || "/documents/DefaultFile_1.pdf",
      docLabel: "View Document",
      icon: ShieldCheck
    }
  ];

  // Support both slug conventions
  const normalizedSlug = subSlug === "programme-outcomes-pos" ? "programme-outcomes" :
    subSlug === "programme-specific-outcomes-psos" ? "programme-specific-outcomes" :
    subSlug === "course-outcomes-cos" ? "course-outcomes" : subSlug;

  // Smooth scroll to the targeted section if a subSlug is present
  useEffect(() => {
    if (normalizedSlug) {
      const el = document.getElementById(normalizedSlug);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);
      }
    }
  }, [normalizedSlug]);

  return (
    <div className="flex flex-col gap-8 animate-fadeIn font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-[#002147]" /> Outcome-Based Education
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Academic Quality &amp; Outcomes
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* Unified List of All 6 Topics in "Heading Next Paragraph" Format (Approach A) */}
      <div className="flex flex-col gap-6">
        {topicsList.map((item) => {
          const isSelected = normalizedSlug === item.slug;
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

                {item.docUrl && (
                  <button
                    onClick={() => {
                      setPreviewUrl(item.docUrl || "/documents/DefaultFile_1.pdf");
                      setPreviewTitle(`${item.title} - Official Record`);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#002147] bg-[#002147]/5 hover:bg-[#002147] hover:text-white border border-[#002147]/20 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <FileText className="h-3.5 w-3.5" /> {item.docLabel || "View Document"}
                  </button>
                )}
              </div>

              {/* Authentic Paragraph from 3.Academics.docx */}
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal pl-0 sm:pl-1">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Document Preview"}
      />
    </div>
  );
}
