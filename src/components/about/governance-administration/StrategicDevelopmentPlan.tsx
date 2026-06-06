"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, Eye, Shield, Award, Calendar, Layers, BookOpen, 
  GraduationCap, Users, Laptop, Briefcase, Leaf, ShieldCheck, ArrowRight, Milestone 
} from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getStrategicPlan } from "@/lib/sanity";

interface Pillar {
  title: string;
  description: string;
}

interface Phase {
  title: string;
  description: string;
}

interface StrategicPlanData {
  title: string;
  executiveSummary: string;
  pillars: Pillar[];
  phases: Phase[];
  targets: string[];
  documentUrl?: string | null;
}

const defaultPlanData: StrategicPlanData = {
  title: "Institutional Strategic Framework 2024-2030",
  executiveSummary: "St. Ann's College for Women has developed a comprehensive Institutional Strategic Framework for 2024-2030, charting a detailed roadmap to achieve Autonomous Status by 2029-2030. The plan aligns with national initiatives such as NEP 2020 and Viksit Bharat, utilizing a structured approach to enhance academic quality, research, infrastructure, and women's empowerment.",
  pillars: [
    {
      title: "Academic Excellence & Autonomy Readiness",
      description: "The institution will implement Outcome-Based Education (OBE) across all programs. It also plans to integrate NEP 2020 principles and introduce new interdisciplinary, skill-oriented courses."
    },
    {
      title: "Research, Innovation & Faculty Development",
      description: "The college intends to establish a Research & Innovation Cell and increase the number of Ph.D.-qualified faculty by at least 20% by 2028. The target is to produce a minimum of 40 research publications annually in indexed journals."
    },
    {
      title: "Student Enrollment, Retention & Success",
      description: "To support holistic student growth, the college will introduce an 'Earn While You Learn' scheme and strengthen its Mentor-Mentee system. The framework sets a goal of achieving a placement rate of 70% or higher and reducing the dropout rate to below 5%."
    },
    {
      title: "Infrastructure & Digital Transformation",
      description: "Key initiatives include establishing a Centralized Library and ensuring 100% ICT-enabled smart classrooms by 2027. The plan also details the modernization of laboratories and upgrades to hostel facilities to maintain optimal occupancy."
    },
    {
      title: "Industry Linkages & Employability",
      description: "The college plans to integrate mandatory internships and apprenticeships into its academic programs. It will also expand Memorandums of Understanding (MoUs) with industry partners and promote a startup culture through the Entrepreneurship Development & Innovation Support Cell (EDISC)."
    },
    {
      title: "Green Campus & Social Responsibility",
      description: "The framework outlines the development of an eco-friendly 'Botanica Campus' and the implementation of annual green audits. The institution aims to secure Green Campus Certification by 2026-2027 and ensure 100% student participation in extension or social activities."
    },
    {
      title: "Governance & Quality Assurance",
      description: "The plan mandates a transparent, participatory governance system supported by a 360-degree performance appraisal for faculty and staff. It also empowers the IQAC to conduct regular academic and administrative audits to ensure alignment with NAAC standards."
    }
  ],
  phases: [
    {
      title: "Phase 1: Foundation & Infrastructure (2024-2025)",
      description: "Focuses on basic infrastructure upgrades, such as modernizing laboratories, relocating PG programs to the Gnanam Block, and launching structured admission outreach campaigns."
    },
    {
      title: "Phase 2: Quality Enhancement (2025-2026)",
      description: "Concentrates on achieving 100% institution-wide OBE implementation, creating the Centralized Library, and initiating a functional research ecosystem."
    },
    {
      title: "Phase 3: Expansion (2026-2027)",
      description: "Emphasizes introducing new academic programs, expanding industry MoUs, upgrading to 100% ICT-enabled classrooms, and boosting student admissions by 15-20%."
    },
    {
      title: "Phase 4: Consolidation (2027-2028)",
      description: "Dedicated to achieving targeted research outputs, strengthening governance through the 360-degree appraisal system, and fulfilling NAAC quality benchmarks."
    },
    {
      title: "Phase 5: Autonomy Achievement (2028-2030)",
      description: "The final stage targets the application and attainment of Autonomous Status, achieving Green Campus Certification, and fostering global collaborations."
    }
  ],
  targets: [
    "Increase overall student admissions by 20%.",
    "Maintain a pass percentage of 90% or higher across programs.",
    "Publish 40 to 50 research papers annually.",
    "Maintain at least 20 active MoUs with industry and corporate partners.",
    "Achieve 100% internship coverage for students."
  ],
  documentUrl: "/documents/INSTITUTIONAL STRATEGIC FRAMEWORK 2024-2030.docx.pdf"
};

const pillarIcons = [
  GraduationCap,
  BookOpen,
  Users,
  Laptop,
  Briefcase,
  Leaf,
  ShieldCheck
];

export function StrategicDevelopmentPlan() {
  const [data, setData] = useState<StrategicPlanData>(defaultPlanData);
  const [loading, setLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPlan = await getStrategicPlan();
        if (fetchedPlan) {
          setData({
            title: fetchedPlan.title || defaultPlanData.title,
            executiveSummary: fetchedPlan.executiveSummary || defaultPlanData.executiveSummary,
            pillars: fetchedPlan.pillars || defaultPlanData.pillars,
            phases: fetchedPlan.phases || defaultPlanData.phases,
            targets: fetchedPlan.targets || defaultPlanData.targets,
            documentUrl: fetchedPlan.documentUrl || defaultPlanData.documentUrl
          });
        }
      } catch (err) {
        console.error("Error loading strategic plan from Sanity:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleOpenPdf = (url: string, title: string) => {
    setSelectedFileUrl(url);
    setSelectedFileTitle(title);
  };

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* 1. Dark Gradient Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001730] via-[#002147] to-[#0d3b66] p-8 md:p-10 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 backdrop-blur-md border border-indigo-400/20 px-3.5 py-1.5 text-xs font-black text-indigo-300 tracking-wider uppercase w-fit">
              <Shield className="h-3.5 w-3.5" /> Institutional Framework
            </span>
            <h1 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
              {data.title}
            </h1>
            <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-3xl mt-1 text-justify">
              {data.executiveSummary}
            </p>
          </div>
          {data.documentUrl && (
            <button
              onClick={() => handleOpenPdf(data.documentUrl!, "Institutional Strategic Framework (2024-2030)")}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 text-xs font-black text-white uppercase tracking-wider transition-all select-none hover:scale-[1.03] shrink-0"
            >
              <BookOpen className="h-4 w-4" /> Open Interactive Flipbook
            </button>
          )}
        </div>
      </div>

      {/* 1.5 Directly Opened PDF Document */}
      {data.documentUrl && (
        <div className="bg-white border border-slate-200/60 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-650">
                <FileText className="h-4.5 w-4.5" />
              </span>
              <h3 className="font-outfit text-base md:text-lg font-black text-slate-800 leading-tight">
                Strategic Framework Document
              </h3>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">Scrollable Document View</span>
          </div>
          <div className="w-full h-[600px] md:h-[800px] rounded-2xl overflow-hidden border border-slate-200/50 bg-slate-50 relative">
            <iframe
              src={`${data.documentUrl}#toolbar=1`}
              className="w-full h-full border-none bg-white"
              title="Institutional Strategic Framework PDF Viewer"
            />
          </div>
        </div>
      )}

      {/* 2. Seven Core Strategic Pillars */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Foundational Pillars</span>
          <h2 className="font-outfit text-2xl font-black text-slate-800 tracking-tight leading-tight">
            Seven Core Strategic Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.pillars.map((pillar, index) => {
            const IconComponent = pillarIcons[index % pillarIcons.length] || GraduationCap;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col gap-4 group"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-650 group-hover:bg-[#002147] group-hover:text-white transition-all">
                  <IconComponent className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-snug group-hover:text-[#002147] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed text-justify">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Phased Implementation Roadmap */}
      <div className="flex flex-col gap-6 bg-slate-50/50 border border-slate-200/60 p-6 md:p-8 rounded-3xl">
        <div className="flex flex-col gap-1 border-b border-slate-200/60 pb-4 mb-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-600">Roadmap to Autonomy</span>
          <h2 className="font-outfit text-2xl font-black text-slate-800 tracking-tight leading-tight">
            Phased Implementation Roadmap
          </h2>
        </div>

        <div className="flex flex-col gap-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200/70 pl-8">
          {data.phases.map((phase, index) => (
            <div key={index} className="relative group">
              {/* Timeline dot */}
              <span className="absolute -left-12 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-indigo-400 group-hover:border-[#002147] text-indigo-600 group-hover:text-[#002147] font-black font-outfit text-xs transition-colors shadow-sm">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-outfit font-black text-slate-850 text-sm md:text-base leading-snug group-hover:text-indigo-600 transition-colors">
                  {phase.title}
                </h4>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed text-justify max-w-4xl">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Performance Targets */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Milestone className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
              Key Performance Tracking Targets (By 2027-2028)
            </h4>
            <p className="text-slate-400 text-xs font-semibold mt-1">
              Quantifiable institutional markers set for strict academic and administrative assessment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.targets.map((target, index) => (
            <div 
              key={index}
              className="bg-slate-50/50 border border-slate-200/40 rounded-2xl p-5 flex items-start gap-3 hover:border-indigo-300 hover:bg-white hover:shadow-md hover:shadow-indigo-50/10 transition-all group"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold font-outfit text-xs group-hover:bg-[#002147] group-hover:text-white transition-all">
                ✓
              </span>
              <p className="text-slate-700 text-xs md:text-sm font-semibold leading-relaxed">
                {target}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Flipbook Modal Reader */}
      {selectedFileUrl && (
        <FilePreviewModal
          isOpen={true}
          onClose={() => {
            setSelectedFileUrl(null);
            setSelectedFileTitle("");
          }}
          fileUrl={selectedFileUrl}
          title={selectedFileTitle}
        />
      )}
    </div>
  );
}
