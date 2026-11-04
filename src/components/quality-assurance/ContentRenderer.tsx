"use client";

import React, { useState, useEffect, useRef } from "react";
import { staticQualitySections } from "./staticData";
import defaultQaData from "./quality-assurance-data.json";
import { 
  ClipboardCheck, ShieldCheck, Award, Target, FileText, 
  MessageSquare, BarChart, Image as ImageIcon, Phone,
  ChevronDown, ChevronRight, ChevronLeft, Eye, Search, ExternalLink, 
  X, FolderOpen, AlertCircle, FileSpreadsheet, PlayCircle, Download,
  Calendar, CheckCircle2, Clock, Users, Layers, Sparkles, BookOpen,
  ArrowRight, Check, Compass, FileCheck
} from "lucide-react";
import {
  QualityAssuranceData,
  AqarYearReport,
  NaacCycleReport,
  Criterion,
  Section,
  Metric,
  DocumentEntry,
  SubDocument,
  SteeringCommitteeMember,
  CriterionConvenorGroup,
  QualityMeetingDoc,
  QualityAuditDoc,
  QualityFeedbackDoc,
  QualitySurveyDoc,
  IqacYearCommitteeDoc,
  IqacYearMeetingRow,
  IqacActionPlanRow,
  IqacAnnualReportRow,
  AaaAuditRow,
  GreenAuditRow,
  QualityInitiativeRow,
  QualityEnhancementMeasureRow,
  CqiActivityRow,
  BestPracticeRow,
  InstitutionalDistinctivenessRow,
  IqacGalleryRow,
  NaacMasterDocRow,
  ExtendedProfileDocRow,
  AqarMasterReportRow
} from "@/types/quality-assurance";

const DEFAULT_PDF = "/documents/DefaultFile_1.pdf";

export const qualityMeta: Record<string, {
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  "about-iqac": {
    subtitle: "Promoting institutional quality culture, steering committee guidelines, and continuous academic benchmarking.",
    icon: ClipboardCheck
  },
  "iqac-meetings-planning": {
    subtitle: "Systematic meeting records, Action Taken Reports (ATRs), annual quality action plans, and comprehensive annual reports.",
    icon: Clock
  },
  "iqac-audits-enhancement": {
    subtitle: "Academic & Administrative Audits (AAA), Green & Energy Audits, Quality Initiatives, Enhancement Measures, and CQI.",
    icon: Award
  },
  "best-practices": {
    subtitle: "Institutionalized best practices fostering holistic student development, value-based education, and social commitment.",
    icon: Target
  },
  "institutional-distinctiveness": {
    subtitle: "Priority and thrust areas highlighting the unique character and transformative mission of St. Ann's College.",
    icon: Sparkles
  },
  "iqac-gallery": {
    subtitle: "Visual archives and photographic documentation of IQAC meetings, workshops, peer team visits, and quality initiatives.",
    icon: ImageIcon
  },
  "naac-cycle-1": {
    subtitle: "National Assessment & Accreditation Council (NAAC) Cycle-I self-study reports, peer team portfolios, criteria metrics, and verified documentary records.",
    icon: ShieldCheck
  },
  "aqar-reports": {
    subtitle: "Annual Quality Assurance Reports (AQAR) tracking institutional performance benchmarks, criteria checklists, departmental parameters, and verified portfolios.",
    icon: FileText
  },
  // Legacy aliases
  "iqac": {
    subtitle: "Promoting institutional quality culture, steering committee guidelines, and continuous academic benchmarking.",
    icon: ClipboardCheck
  },
  "aqar": {
    subtitle: "Annual Quality Assurance Reports (AQAR) tracking institutional performance benchmarks, criteria checklists, and verified portfolios.",
    icon: FileText
  },
  "naac": {
    subtitle: "National Assessment & Accreditation self-study reports, peer team portfolios, and quality criteria checklists.",
    icon: ShieldCheck
  },
  "quality-initiatives": {
    subtitle: "Proactive quality enhancement, faculty development programmes, outcome-based education, and student enrichment.",
    icon: Target
  },
  "audit": {
    subtitle: "Comprehensive internal and external academic, administrative, green, and energy audits for institutional excellence.",
    icon: Award
  },
  "feedback": {
    subtitle: "Structured stakeholder feedback collection and action-taken reports from students, teachers, parents, and employers.",
    icon: MessageSquare
  },
  "surveys": {
    subtitle: "Student Satisfaction Survey (SSS), semester pass percentages, rank progression, and programme outcome evaluations.",
    icon: BarChart
  },
  "gallery": {
    subtitle: "Visual documentation of peer visits, faculty workshops, national seminars, outreach activities, and institutional milestones.",
    icon: ImageIcon
  },
  "contact": {
    subtitle: "Direct communication with the IQAC Coordinator and Secretariat for quality assurance and accreditation queries.",
    icon: Phone
  }
};

export const ContentRenderer = ({
  slug,
  subSlug,
  portalData
}: {
  slug: string;
  subSlug?: string;
  portalData?: QualityAssuranceData;
}) => {
  const [qaData, setQaData] = useState<QualityAssuranceData>(portalData || (defaultQaData as unknown as QualityAssuranceData));

  // Fetch live QA Data from /api/quality-assurance with fallback
  useEffect(() => {
    if (portalData) {
      setQaData(portalData);
      return;
    }
    let isMounted = true;
    async function loadQaData() {
      try {
        const res = await fetch("/api/quality-assurance");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            setQaData(json.data);
          }
        }
      } catch {
        // Fallback to local json
      }
    }
    loadQaData();
    return () => {
      isMounted = false;
    };
  }, [portalData]);

  const activeData = portalData || qaData;

  // 1. About IQAC
  if (slug === "about-iqac" || slug === "iqac") {
    return (
      <AboutIqacRenderer
        qaData={activeData}
        staticData={staticQualitySections["iqac"]}
      />
    );
  }

  // 2. IQAC Meetings & Quality Planning
  if (slug === "iqac-meetings-planning" || slug === "meetings") {
    return (
      <IqacMeetingsPlanningRenderer
        qaData={activeData}
      />
    );
  }

  // 3. IQAC Audits & Quality Enhancement
  if (slug === "iqac-audits-enhancement" || slug === "quality-initiatives" || slug === "audit" || slug === "feedback" || slug === "surveys") {
    return (
      <IqacAuditsEnhancementRenderer
        qaData={activeData}
        staticData={staticQualitySections["audit"]}
      />
    );
  }

  // 4. Best Practices
  if (slug === "best-practices") {
    return (
      <BestPracticesRenderer
        qaData={activeData}
      />
    );
  }

  // 5. Institutional Distinctiveness
  if (slug === "institutional-distinctiveness") {
    return (
      <InstitutionalDistinctivenessRenderer
        qaData={activeData}
      />
    );
  }

  // 6. IQAC Gallery
  if (slug === "iqac-gallery" || slug === "gallery") {
    return (
      <IqacGalleryRenderer
        qaData={activeData}
      />
    );
  }

  // A. NAAC Accreditation – Cycle I
  if (slug === "naac-cycle-1" || slug === "naac") {
    return (
      <NaacCycle1Renderer
        qaData={activeData}
        activeSubSlug={subSlug}
      />
    );
  }

  // B. AQAR – Annual Quality Assurance Reports
  if (slug === "aqar-reports" || slug === "aqar") {
    return (
      <AqarReportsRenderer
        qaData={activeData}
        activeSubSlug={subSlug}
      />
    );
  }

  // Fallback generic renderer
  return <GenericQualityRenderer slug={slug} />;
};

// =========================================================================
// 1. ABOUT IQAC RENDERER
// =========================================================================
function AboutIqacRenderer({
  qaData,
  staticData
}: {
  qaData: QualityAssuranceData;
  staticData?: { title: string; content: string };
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");

  const steeringMembers = qaData.steeringCommittee || [];
  const convenorGroups = qaData.criterionConvenors || [];
  const committeeYears = qaData.iqacCommitteeYears || [];

  const functionsList = [
    { title: "Quality Benchmarks", desc: "Development and application of quality benchmarks / parameters for various academic and administrative activities." },
    { title: "Learner-Centric Environment", desc: "Facilitating the creation of a learner-centric environment conducive to quality education and faculty maturation." },
    { title: "Participatory Teaching & ICT", desc: "Encouraging adoption of the required knowledge and technology for participatory higher education processes." },
    { title: "Stakeholder Feedback", desc: "Collection, rigorous analysis and deployment of feedback from students, parents, alumni, and other stakeholders." },
    { title: "Quality Dissemination", desc: "Dissemination of information on various quality parameters to institutional and external stakeholders." },
    { title: "Workshops & Seminars", desc: "Organization of inter- and intra-institutional workshops, seminars on quality-related themes, and promotion of quality circles." },
    { title: "Quality Documentation", desc: "Documentation of the various programmes and activities leading to continuous quality improvement." },
    { title: "Nodal Coordination", desc: "Acting as a nodal agency of the Institution for coordinating quality-related activities, including adoption of best practices." },
    { title: "MIS & Institutional Database", desc: "Development and maintenance of institutional database through MIS for the purpose of maintaining/enhancing institutional quality." },
    { title: "Quality Culture", desc: "Periodical conduct of Academic and Administrative Audit and its follow-up to internalize a culture of institutional excellence." },
    { title: "AQAR Preparation", desc: "Preparation and timely submission of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC." },
    { title: "Strategic Planning", desc: "Formulation of annual institutional action plans and monitoring target achievements against defined benchmarks." }
  ];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <ClipboardCheck className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              IQAC &amp; ITS INITIATIVES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              1. About IQAC
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Internal Quality Assurance Cell ensuring continuous quality enhancement in academic and administrative performance.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">
        {/* Introduction */}
        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight !mt-0 mb-3">
            Internal Quality Assurance Cell (IQAC)
          </h3>
          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">
            The Internal Quality Assurance Cell (IQAC) of St. Ann’s College for Women ensures continuous quality enhancement in academic and administrative performance. Established as a proactive mechanism, it fosters a quality culture within the institution in accordance with NAAC benchmarks and national higher education standards.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/40 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-[#002147]">
              <Compass className="h-5 w-5 text-indigo-600" />
              <h4 className="font-outfit font-black text-lg text-[#002147]">Vision</h4>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm font-medium">
              To promote quality culture as the prime concern of Higher Education Institutions through institutionalizing and internalizing all quality-enhancing and sustaining initiatives with internal and external support.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-emerald-900">
              <Target className="h-5 w-5 text-emerald-600" />
              <h4 className="font-outfit font-black text-lg text-emerald-950">Mission</h4>
            </div>
            <ul className="space-y-2 text-slate-700 leading-relaxed text-xs sm:text-sm pl-4 list-disc font-medium">
              <li>To empower young women through transformative education into competent, morally upright individuals.</li>
              <li>To create a conducive environment for holistic development of rural and disadvantaged students.</li>
              <li>To provide an optimal learning environment and eco-friendly atmosphere that inspires exploration.</li>
              <li>To make students employable, self-reliant, responsible, and socially useful citizens.</li>
            </ul>
          </div>
        </div>

        {/* Objectives & Strategies */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col gap-5">
          <div>
            <h4 className="font-outfit font-black text-base md:text-lg text-[#002147] mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Objectives of IQAC
            </h4>
            <ul className="space-y-2 text-slate-700 leading-relaxed text-sm pl-5 list-disc font-medium">
              <li>To act as a catalyst in developing mechanisms for conscious, consistent, and coordinated efforts to improve the academic and administrative performance of the institution.</li>
              <li>To promote quality enhancement and sustenance through internalization of quality culture and institutionalization of best practices.</li>
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-outfit font-black text-base md:text-lg text-[#002147] mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" /> Operational Strategies
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              IQAC evolves mechanisms and procedures for ensuring: timely, efficient, and progressive performance of academic, administrative, and financial tasks; relevance and quality of academic and research programmes; equitable access to and affordability of academic programmes for various sections of society; optimization and integration of modern methods of teaching and learning; credibility of evaluation procedures; and adequacy, maintenance, and proper allocation of support structure and services.
            </p>
          </div>
        </div>

        {/* 1. IQAC Committee Composition by Academic Year (2018-19 to 2026-27) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <Users className="h-6 w-6 text-[#002147]" />
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                IQAC Committee Composition by Academic Year
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              2018–19 to 2026–27
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Committee Composition Document</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {committeeYears.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{item.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{item.label || `IQAC Committee Composition ${item.year}`}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(item.pdfUrl || DEFAULT_PDF);
                            setActivePdfTitle(item.label || `IQAC Committee Composition ${item.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View PDF Document
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Steering Committee Table */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-[#002147]" />
            <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
              IQAC Steering Committee
            </h3>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Criterion / Sector</th>
                    <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Name of the Member</th>
                    <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Role in IQAC</th>
                    <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Designation / Department</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {steeringMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-black uppercase text-indigo-700">
                        {member.criterion}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-xs font-extrabold text-emerald-700">
                        <span className="bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                        {member.designation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Criterion-wise Convenors */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Layers className="h-6 w-6 text-[#002147]" />
            <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
              Criterion-wise Convenors &amp; Members
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {convenorGroups.map((group) => (
              <div 
                key={group.criterionId} 
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white"
              >
                <div className="bg-[#002147] text-white px-5 py-3.5 flex items-center justify-between">
                  <h4 className="font-outfit font-black text-sm tracking-tight">
                    {group.criterionTitle}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                    Crit {group.criterionId}
                  </span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-black uppercase text-[10px]">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Role</th>
                        <th className="pb-2">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {group.members.map((m, mIdx) => (
                        <tr key={mIdx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 font-bold text-slate-800 pr-2">{m.name}</td>
                          <td className="py-2.5 pr-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              m.role === "Convenor" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                            }`}>
                              {m.role}
                            </span>
                          </td>
                          <td className="py-2.5 text-slate-500 font-medium">{m.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Functions of IQAC (12 Functions from Doc 10) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Target className="h-6 w-6 text-[#002147]" />
            <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
              Operational Functions of IQAC
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {functionsList.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all flex flex-col gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#002147] text-white font-outfit text-xs font-black">
                    {idx + 1}
                  </span>
                  <h4 className="font-outfit font-bold text-sm text-slate-800">{item.title}</h4>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-medium pl-9">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// 2. IQAC MEETINGS & QUALITY PLANNING RENDERER
// =========================================================================
function IqacMeetingsPlanningRenderer({
  qaData
}: {
  qaData: QualityAssuranceData;
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");

  const meetingsTable = qaData.iqacMeetingsTable || [];
  const actionPlans = qaData.iqacActionPlans || [];
  const annualReports = qaData.iqacAnnualReportsTable || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <Clock className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              IQAC &amp; ITS INITIATIVES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              2. IQAC Meetings &amp; Quality Planning
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Systematic meeting records, Action Taken Reports (ATRs), annual quality action plans, and comprehensive annual reports.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* Table 1: IQAC Meetings & ATRs (Academic Years 2018-19 to 2026-27) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                IQAC Meetings &amp; Action Taken Reports (ATRs)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                4 quarterly meetings conducted per academic year with validated minutes and action taken records.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              9 Academic Years (2018–19 to 2026–27)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-4 py-3.5 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-4 py-3.5 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-4 py-3.5 font-outfit text-xs uppercase tracking-wider font-bold text-center">Meeting 1</th>
                    <th className="px-4 py-3.5 font-outfit text-xs uppercase tracking-wider font-bold text-center">Meeting 2</th>
                    <th className="px-4 py-3.5 font-outfit text-xs uppercase tracking-wider font-bold text-center">Meeting 3</th>
                    <th className="px-4 py-3.5 font-outfit text-xs uppercase tracking-wider font-bold text-center">Meeting 4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {meetingsTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3.5 font-black text-[#002147] whitespace-nowrap text-sm">{row.year}</td>
                      
                      {/* Meeting 1 */}
                      <td className="px-3 py-3 text-center">
                        <div className="inline-flex gap-1.5 justify-center">
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m1Minutes || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 1 Minutes`);
                            }}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold transition-all border border-blue-200"
                          >
                            Minutes
                          </button>
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m1Atr || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 1 ATR`);
                            }}
                            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold transition-all border border-emerald-200"
                          >
                            ATR
                          </button>
                        </div>
                      </td>

                      {/* Meeting 2 */}
                      <td className="px-3 py-3 text-center">
                        <div className="inline-flex gap-1.5 justify-center">
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m2Minutes || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 2 Minutes`);
                            }}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold transition-all border border-blue-200"
                          >
                            Minutes
                          </button>
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m2Atr || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 2 ATR`);
                            }}
                            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold transition-all border border-emerald-200"
                          >
                            ATR
                          </button>
                        </div>
                      </td>

                      {/* Meeting 3 */}
                      <td className="px-3 py-3 text-center">
                        <div className="inline-flex gap-1.5 justify-center">
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m3Minutes || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 3 Minutes`);
                            }}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold transition-all border border-blue-200"
                          >
                            Minutes
                          </button>
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m3Atr || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 3 ATR`);
                            }}
                            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold transition-all border border-emerald-200"
                          >
                            ATR
                          </button>
                        </div>
                      </td>

                      {/* Meeting 4 */}
                      <td className="px-3 py-3 text-center">
                        <div className="inline-flex gap-1.5 justify-center">
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m4Minutes || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 4 Minutes`);
                            }}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold transition-all border border-blue-200"
                          >
                            Minutes
                          </button>
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.m4Atr || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Meeting 4 ATR`);
                            }}
                            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold transition-all border border-emerald-200"
                          >
                            ATR
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Table 2: Annual Action Plan (2022-23 to 2026-27) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                IQAC Annual Action Plans
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Strategic annual targets formulated at the start of each academic year to steer institutional quality.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              5 Academic Years (2022–23 to 2026–27)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Action Plan Document</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {actionPlans.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">Annual Action Plan {row.year}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.planUrl || DEFAULT_PDF);
                            setActivePdfTitle(`Annual Action Plan ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Action Plan (PDF)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Table 3: IQAC Annual Reports (2021-22 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                IQAC Annual Reports
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Consolidated annual institutional performance evaluations documenting academic achievements and milestones.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              5 Academic Years (2021–22 to 2025–26)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">IQAC Annual Report Document</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {annualReports.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">IQAC Annual Report {row.year}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.reportUrl || DEFAULT_PDF);
                            setActivePdfTitle(`IQAC Annual Report ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Annual Report (PDF)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// 3. IQAC AUDITS & QUALITY ENHANCEMENT RENDERER
// =========================================================================
function IqacAuditsEnhancementRenderer({
  qaData,
  staticData
}: {
  qaData: QualityAssuranceData;
  staticData?: { title: string; content: string };
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");

  const aaaAudits = qaData.aaaAuditsTable || [];
  const greenAudits = qaData.greenAuditsTable || [];
  const qualityInitiatives = qaData.qualityInitiativesTable || [];
  const qualityEnhancement = qaData.qualityEnhancementTable || [];
  const cqiActivities = qaData.cqiActivitiesTable || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <Award className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              IQAC &amp; ITS INITIATIVES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              3. IQAC Audits &amp; Quality Enhancement
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Academic &amp; Administrative Audits (AAA), Green &amp; Energy Audits, Quality Initiatives, Enhancement Measures, and CQI.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* Section 1: Academic & Administrative Audit (AAA) (2023-24 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Academic &amp; Administrative Audit (AAA)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Periodic external and internal audits reviewing academic delivery, departmental operations, and compliance.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              2023–24 to 2025–26
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">AAA Audit Report</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action Taken Report (ATR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {aaaAudits.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.reportUrl || DEFAULT_PDF);
                            setActivePdfTitle(`AAA Audit Report ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View AAA Report
                        </button>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.atrUrl || DEFAULT_PDF);
                            setActivePdfTitle(`AAA Audit ATR ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View AAA ATR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: Green, Energy & Environment Audits (2022-23 to 2026-27) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Green, Energy &amp; Environment Audits
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Certified sustainability and energy conservation assessments tracking carbon neutrality, waste, and green campus.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              2022–23 to 2026–27
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Audit Report</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action Taken Report (ATR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {greenAudits.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.reportUrl || DEFAULT_PDF);
                            setActivePdfTitle(`Green & Environment Audit Report ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Audit Report
                        </button>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.atrUrl || DEFAULT_PDF);
                            setActivePdfTitle(`Green & Environment Audit ATR ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Audit ATR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: IQAC Quality Initiatives (2021-22 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                IQAC Quality Initiatives
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Proactive programmes on faculty enrichment, pedagogical modernization, and academic benchmarks.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              5 Academic Years (2021–22 to 2025–26)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Quality Initiative Theme / Focus</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Supporting Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {qualityInitiatives.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{row.title}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.docUrl || DEFAULT_PDF);
                            setActivePdfTitle(`Quality Initiatives ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Initiative Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 4: Quality Enhancement Measures (2021-22 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Quality Enhancement Measures
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Strategic interventions and deployment documents aimed at elevating teaching-learning outcomes.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              5 Academic Years (2021–22 to 2025–26)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Quality Enhancement Focus</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Documentation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {qualityEnhancement.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{row.title}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.docUrl || DEFAULT_PDF);
                            setActivePdfTitle(`Quality Enhancement Measures ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Document
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 5: Continuous Quality Improvement (CQI) Process */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Continuous Quality Improvement (CQI)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Structured PDCA cycle ensuring systematic academic review, student outcome assessment, and corrective action.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              PDCA Architecture
            </span>
          </div>

          {/* CQI Visual Diagram Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-outfit text-[11px] font-black w-fit">
                STAGE 1: PLAN
              </span>
              <h4 className="font-outfit font-bold text-sm text-[#002147]">Quality Benchmarks &amp; Targets</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Establish curriculum goals, semester action plans, learner outcomes, and infrastructural targets.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-outfit text-[11px] font-black w-fit">
                STAGE 2: DO
              </span>
              <h4 className="font-outfit font-bold text-sm text-[#002147]">Deployment &amp; Execution</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Implement OBE pedagogies, ICT teaching, skill workshops, mentoring, and student enrichment activities.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-outfit text-[11px] font-black w-fit">
                STAGE 3: CHECK
              </span>
              <h4 className="font-outfit font-bold text-sm text-[#002147]">Audits, SSS &amp; Feedback</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Evaluate pass percentages, conduct internal/external AAA audits, gather stakeholder feedback &amp; SSS.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-outfit text-[11px] font-black w-fit">
                STAGE 4: ACT
              </span>
              <h4 className="font-outfit font-bold text-sm text-[#002147]">Action Taken &amp; Sustenance</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Enforce ATRs, upgrade infrastructure, institutionalize best practices, and submit annual AQAR reports.
              </p>
            </div>
          </div>

          {/* CQI Year-wise Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white mt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">CQI Review &amp; Outcomes Register</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Documentation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {cqiActivities.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{row.title}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.docUrl || DEFAULT_PDF);
                            setActivePdfTitle(`CQI Review Register ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View CQI Register
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// 4. BEST PRACTICES RENDERER
// =========================================================================
function BestPracticesRenderer({
  qaData
}: {
  qaData: QualityAssuranceData;
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");

  const bestPractices = qaData.bestPracticesTable || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <Target className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              IQAC &amp; ITS INITIATIVES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              4. Best Practices
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Institutionalized best practices fostering holistic student development, value-based education, and social commitment.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* Narrative Cards for 2 Institutional Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/40 flex flex-col gap-3">
            <span className="px-3 py-1 rounded-full bg-[#002147] text-white font-outfit text-xs font-black w-fit">
              BEST PRACTICE – I
            </span>
            <h4 className="font-outfit font-black text-lg text-[#002147]">
              Empowerment through Value-based &amp; Skill Education
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
              St. Ann’s College integrates career-oriented certificate courses, communication skills, ethical values, and digital literacy into the mainstream undergraduate framework to ensure high employability and character formation for women students from diverse backgrounds.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex flex-col gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-800 text-white font-outfit text-xs font-black w-fit">
              BEST PRACTICE – II
            </span>
            <h4 className="font-outfit font-black text-lg text-emerald-950">
              Community Outreach &amp; Holistic Student Progression
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
              Extensive community engagement driven by NSS, NCC, and Red Ribbon Club instills compassion, civic responsibility, and leadership. Students actively lead rural health camps, literacy drives, environmental awareness, and village adoption projects.
            </p>
          </div>
        </div>

        {/* Year-wise Best Practice Table (2018-19 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Institutional Best Practice – I &amp; II Records
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Year-wise deployment records, evidence of success, and resources allocated.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              8 Academic Years (2018–19 to 2025–26)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Best Practice – I</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Best Practice – II</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {bestPractices.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-4 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-slate-800 font-bold text-xs">{row.practice1Title}</span>
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.practice1Url || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Best Practice I`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs w-fit"
                          >
                            <Eye className="h-3 w-3" />
                            View Best Practice – I
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-slate-800 font-bold text-xs">{row.practice2Title}</span>
                          <button
                            onClick={() => {
                              setActivePdfUrl(row.practice2Url || DEFAULT_PDF);
                              setActivePdfTitle(`${row.year} – Best Practice II`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs w-fit"
                          >
                            <Eye className="h-3 w-3" />
                            View Best Practice – II
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// 5. INSTITUTIONAL DISTINCTIVENESS RENDERER
// =========================================================================
function InstitutionalDistinctivenessRenderer({
  qaData
}: {
  qaData: QualityAssuranceData;
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");

  const distinctivenessRows = qaData.institutionalDistinctivenessTable || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              IQAC &amp; ITS INITIATIVES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              5. Institutional Distinctiveness
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Priority and thrust areas highlighting the unique character and transformative mission of St. Ann&apos;s College.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* Highlight Spotlight Card */}
        <div className="p-8 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-[#002147] text-white shadow-xs">
              <Sparkles className="h-6 w-6 text-amber-300" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                CORE INSTITUTIONAL THRUST
              </span>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Holistic Women Empowerment through Quality Higher Education
              </h3>
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm md:text-base font-medium">
            Founded with the consecrated vision of the Sisters of St. Ann, the college provides affordable, high-calibre collegiate education to young women from rural and economically disadvantaged communities. By combining academic rigour, value-oriented ethics, vocational competency, and compassionate social awareness, the institution shapes confident leaders capable of transforming families, communities, and society.
          </p>
        </div>

        {/* Year-wise Table (2023-24 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Institutional Distinctiveness Reports
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Annual priority area reports submitted to NAAC articulating distinctive institutional impact.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              2023–24 to 2025–26
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Distinctiveness Priority / Thrust Area</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Documentation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {distinctivenessRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{row.title}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.docUrl || DEFAULT_PDF);
                            setActivePdfTitle(`Institutional Distinctiveness ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Distinctiveness Report (PDF)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// 6. IQAC GALLERY RENDERER
// =========================================================================
function IqacGalleryRenderer({
  qaData
}: {
  qaData: QualityAssuranceData;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const galleryRows = qaData.iqacGalleryTable || [];

  const sampleGalleryPhotos = [
    { title: "NAAC Peer Team Welcome Ceremony", desc: "Honouring the NAAC peer team dignitaries during the Cycle-I assessment visit.", src: "/images/naac/naac-1.jpg" },
    { title: "IQAC Quality Review Meeting", desc: "Interactive deliberation by Steering Committee members on academic benchmarks.", src: "/images/naac/naac-2.jpg" },
    { title: "Faculty Enrichment Workshop", desc: "Hands-on pedagogical orientation on Outcome Based Education and digital tools.", src: "/images/naac/naac-3.jpg" },
    { title: "Laboratory Inspection & Verification", desc: "Peer team evaluating state-of-the-art computer science and science laboratories.", src: "/images/naac/naac-4.jpg" },
    { title: "Cultural & Heritage Presentation", desc: "Students presenting vibrant cultural traditions reflecting institutional values.", src: "/images/naac/naac-5.jpg" },
    { title: "Stakeholder Interaction Session", desc: "Fruitful dialogue between NAAC dignitaries, parents, alumni, and employers.", src: "/images/naac/naac-6.jpg" }
  ];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <ImageIcon className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              IQAC &amp; ITS INITIATIVES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              6. IQAC Gallery
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Visual archives and photographic documentation of IQAC meetings, workshops, peer team visits, and quality initiatives.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* Year-wise Gallery Table (2023-24 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                Quality Events &amp; Peer Visit Portfolios
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Photographic albums cataloguing quality sustenance milestones across academic years.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              2023–24 to 2025–26
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Event Portfolio</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {galleryRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-slate-700 font-semibold">{row.title}</td>
                      <td className="px-6 py-3.5 text-center">
                        <a
                          href={row.galleryUrl || "/naac-peer-team"}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Explore Gallery
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Featured Photographic Gallery Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="h-6 w-6 text-[#002147]" />
            <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
              Featured Photographic Showcase
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleGalleryPhotos.map((photo, pIdx) => (
              <div
                key={pIdx}
                className="group border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-2xs hover:shadow-md transition-all flex flex-col"
              >
                <div 
                  className="h-48 overflow-hidden cursor-pointer relative bg-slate-200"
                  onClick={() => setSelectedPhoto(photo.src)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/hero-1.jpg";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-sm">
                      <Eye className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-1.5 bg-white flex-1">
                  <h4 className="font-outfit font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {photo.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-transparent" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedPhoto} 
              alt="Enlarged gallery view" 
              className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-4 -right-4 p-2 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================================================================
// A. NAAC ACCREDITATION – CYCLE I RENDERER
// (Supports View Toggles: Overview, Interactive Explorer, Unified View)
// =========================================================================
function NaacCycle1Renderer({
  qaData,
  activeSubSlug
}: {
  qaData: QualityAssuranceData;
  activeSubSlug?: string;
}) {
  // View mode switcher: 'overview' | 'interactive' | 'unified'
  const [viewMode, setViewMode] = useState<"overview" | "interactive" | "unified">("overview");
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");

  const naacCycles = qaData.naacCycles || [];
  const currentNaacCycle = naacCycles[0];
  const masterDocs = qaData.naacMasterDocs || [];
  const extendedDocs = qaData.extendedProfileDocs || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans flex flex-col">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              NAAC &amp; ACCREDITATION
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              A. NAAC Accreditation – Cycle I
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Cycle-I Accreditation status, Master Documents, Extended Profile, DVV Clarifications, and Criterion-wise supporting documentary records.
        </p>
      </div>

      {/* Top View Toggle Toolbar (Allows switching between New Layout, Current Interactive Explorer, or Combined) */}
      <div className="bg-slate-100 border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
            View Layout:
          </span>
          <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 shadow-2xs">
            <button
              onClick={() => setViewMode("overview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "overview"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
              }`}
            >
              📄 Accreditation Overview (New Layout)
            </button>
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "interactive"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
              }`}
            >
              🔍 Interactive Criteria Explorer (Current View)
            </button>
            <button
              onClick={() => setViewMode("unified")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "unified"
                  ? "bg-[#002147] text-white shadow-xs"
                  : "text-slate-600 hover:text-blue-900 hover:bg-slate-50"
              }`}
            >
              ✨ Unified Full View
            </button>
          </div>
        </div>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> All 624 Verified Documents Preserved
        </span>
      </div>

      {/* View Content */}
      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* OVERVIEW / NEW DOCUMENT 10 LAYOUT */}
        {(viewMode === "overview" || viewMode === "unified") && (
          <div className="flex flex-col gap-10 animate-fade-in">

            {/* Accreditation Badge / Status Hero */}
            <div className="p-6 md:p-8 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-[#002147] text-white flex items-center justify-center shadow-md shrink-0">
                  <ShieldCheck className="h-10 w-10 text-emerald-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-outfit text-[11px] font-black uppercase">
                      Accredited
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      NAAC Cycle – I
                    </span>
                  </div>
                  <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                    St. Ann’s College for Women, Gorantla
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm font-medium">
                    Affiliated to Acharya Nagarjuna University | Accredited with Grade &apos;A&apos; (CGPA 3.09)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0">
                <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                    Institutional Grade
                  </span>
                  <span className="font-outfit font-black text-xl text-amber-900">
                    &apos;A&apos; Grade (CGPA 3.09)
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Validity Period: 2024 – 2029
                </span>
              </div>
            </div>

            {/* Table 1: Master Documents Table (Items 1 to 9 from Doc 10) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                    Master Accreditation Documents (Cycle-I)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Essential institutional submissions, assessment certifications, and verification portfolios.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Items 1 to 9
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#002147] text-white">
                      <tr>
                        <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                        <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Title of Document</th>
                        <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Action / View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {masterDocs.map((row) => (
                        <tr key={row.sNo} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{row.sNo}</td>
                          <td className="px-6 py-3.5 font-bold text-slate-800">{row.title}</td>
                          <td className="px-6 py-3.5 text-center">
                            {row.sNo === 5 ? (
                              <button
                                onClick={() => setViewMode("interactive")}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#002147] hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-4xs"
                              >
                                <Compass className="h-3.5 w-3.5 text-emerald-400" />
                                Explore Criteria &amp; Supporting Documents
                              </button>
                            ) : row.sNo === 4 ? (
                              <a
                                href="#extended-profile"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                              >
                                <FolderOpen className="h-3.5 w-3.5" />
                                View Extended Profile Below
                              </a>
                            ) : row.sNo === 6 ? (
                              <a
                                href="#dvv-clarifications"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                              >
                                <FileCheck className="h-3.5 w-3.5" />
                                View DVV Clarifications Below
                              </a>
                            ) : row.sNo === 9 ? (
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setActivePdfUrl("https://cdn.sanity.io/files/fhjwqub5/production/395dc0faebe1dd07d2c53322faaa55098d0e2654.pdf");
                                    setActivePdfTitle("Self-Declaration [11-01-2024]");
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  Self-Declaration
                                </button>
                                <button
                                  onClick={() => {
                                    setActivePdfUrl("https://cdn.sanity.io/files/fhjwqub5/production/a931936e490a29606d1ef2af64eee76d4f1ce5e0.pdf");
                                    setActivePdfTitle("Undertaking");
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  Undertaking
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setActivePdfUrl(row.docUrl || DEFAULT_PDF);
                                  setActivePdfTitle(row.title);
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                {row.actionText || "View PDF Document"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Table 2: Extended Profile (Cycle-I) */}
            <div id="extended-profile" className="flex flex-col gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                    Extended Profile (Cycle-I)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Institutional student strength, approved full-time teacher rosters, and expenditure statements.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  11 Verified Records
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#002147] text-white">
                      <tr>
                        <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Metric / S.No</th>
                        <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Document Title &amp; Description</th>
                        <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Supporting File</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {extendedDocs.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-3.5 font-black text-indigo-700 text-xs">{row.sNo}</td>
                          <td className="px-6 py-3.5 font-bold text-slate-800">{row.title}</td>
                          <td className="px-6 py-3.5 text-center">
                            <button
                              onClick={() => {
                                setActivePdfUrl(row.docUrl || DEFAULT_PDF);
                                setActivePdfTitle(`${row.sNo} - ${row.title}`);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View Document
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 3: DVV Clarifications */}
            <div id="dvv-clarifications" className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-outfit font-black text-lg text-[#002147]">
                    DVV Clarifications &amp; Data Verification
                  </h4>
                </div>
                <button
                  onClick={() => setViewMode("interactive")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] text-white text-xs font-bold hover:bg-blue-900 transition-all"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Explore DVV Criterion in Interactive Viewer
                </button>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                All data points validated during the Data Validation and Verification (DVV) phase by NAAC, including institutional clarifications, metric justifications, and authenticated student and expenditure evidence portfolios, are meticulously documented.
              </p>
            </div>

            {/* Section 4: Self-Declaration & Statutory Undertaking */}
            <div id="self-declaration" className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                  <h4 className="font-outfit font-black text-lg text-emerald-950">
                    Self-Declaration &amp; Undertaking
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActivePdfUrl("https://cdn.sanity.io/files/fhjwqub5/production/395dc0faebe1dd07d2c53322faaa55098d0e2654.pdf");
                      setActivePdfTitle("Self-Declaration [11-01-2024]");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-4xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Self-Declaration (PDF)
                  </button>
                  <button
                    onClick={() => {
                      setActivePdfUrl("https://cdn.sanity.io/files/fhjwqub5/production/a931936e490a29606d1ef2af64eee76d4f1ce5e0.pdf");
                      setActivePdfTitle("Statutory Undertaking");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-4xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Undertaking (PDF)
                  </button>
                </div>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                St. Ann’s College for Women solemnly declares that the information and documentary evidence provided across all criteria, metrics, and extended profiles are true, authentic, and in full compliance with the statutory norms and regulations of NAAC and the UGC.
              </p>
            </div>

          </div>
        )}

        {/* INTERACTIVE CRITERIA EXPLORER (Exact Current Viewer with all 624 docs) */}
        {(viewMode === "interactive" || viewMode === "unified") && (
          <div className="flex flex-col gap-6">
            {viewMode === "unified" && (
              <div className="pt-8 border-t-2 border-slate-200">
                <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight mb-2">
                  Criterion-wise Data &amp; Supporting Documents (Cycle-I Explorer)
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-6">
                  Interactive criteria pills, metrics accordions, and complete access to all 624 verified documents.
                </p>
              </div>
            )}

            <CriterionViewer
              type="naac"
              tagline="NAAC Accreditation – Cycle I"
              subtitle="Browse through our detailed self-assessment portfolios, criteria checklists, student parameters, and verified documents for accreditation."
              naacCycles={naacCycles}
              activeSubSlug={activeSubSlug}
            />
          </div>
        )}

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// B. AQAR – ANNUAL QUALITY ASSURANCE REPORTS RENDERER
// =========================================================================
function AqarReportsRenderer({
  qaData,
  activeSubSlug
}: {
  qaData: QualityAssuranceData;
  activeSubSlug?: string;
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const [showExplorer, setShowExplorer] = useState<boolean>(() => !!activeSubSlug);

  const aqarMaster = qaData.aqarMasterReports || [];
  const aqarReports = qaData.aqarReports || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans flex flex-col">
      {/* Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              NAAC &amp; ACCREDITATION
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              B. AQAR – Annual Quality Assurance Reports
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Annual Quality Assurance Reports (AQAR) tracking institutional performance benchmarks, criteria checklists, departmental parameters, and verified academic portfolios.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">

        {/* Master AQAR Table (2018-19 to 2025-26) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                AQAR Master Reports &amp; Portfolios
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Year-wise AQAR submissions to NAAC with associated criterion checklists and verification portfolios.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              8 Academic Years (2018–19 to 2025–26)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#002147] text-white">
                  <tr>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">S.No</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold">Academic Year</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">AQAR Report (PDF)</th>
                    <th className="px-6 py-4 font-outfit text-xs uppercase tracking-wider font-bold text-center">Supporting Documents Portfolio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {aqarMaster.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-6 py-3.5 font-black text-[#002147] whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => {
                            setActivePdfUrl(row.aqarUrl || DEFAULT_PDF);
                            setActivePdfTitle(`AQAR Report ${row.year}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-4xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View AQAR Report
                        </button>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        {row.supportingDocsAvailable ? (
                          <button
                            onClick={() => setShowExplorer(true)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                          >
                            <FolderOpen className="h-3.5 w-3.5" />
                            Explore 207 Documents (8 Criteria)
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setActivePdfUrl(DEFAULT_PDF);
                              setActivePdfTitle(`Supporting Documents ${row.year}`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200"
                          >
                            <FileText className="h-3.5 w-3.5 text-slate-500" />
                            View Documents
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Interactive Criterion & Metrics Explorer */}
        {(showExplorer || activeSubSlug) && (
          <div className="flex flex-col gap-4 pt-6 border-t-2 border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
                  AQAR Criteria &amp; Supporting Documents Explorer
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Complete criteria checklists, departmental parameters, and 207 verified supporting files.
                </p>
              </div>
              <button
                onClick={() => setShowExplorer(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                Hide Explorer
              </button>
            </div>

            <CriterionViewer
              type="aqar"
              tagline="AQAR Reports"
              subtitle="Browse through our annual quality assurance reports, criteria checklists, departmental parameters, and verified academic portfolios."
              aqarReports={aqarReports}
              activeSubSlug={activeSubSlug}
            />
          </div>
        )}

      </div>

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </section>
  );
}

// =========================================================================
// PREMIUM CRITERION & REPORTS EXPLORER VIEWER (AQAR & NAAC)
// (Fully preserves all criteria, search bar, sections, metrics, and documents)
// =========================================================================
interface CriterionViewerProps {
  type: "naac" | "aqar";
  tagline: string;
  subtitle: string;
  aqarReports?: AqarYearReport[];
  naacCycles?: NaacCycleReport[];
  activeSubSlug?: string;
}

const CriterionViewer = ({
  type,
  tagline,
  subtitle,
  aqarReports = [],
  naacCycles = [],
  activeSubSlug
}: CriterionViewerProps) => {
  // AQAR Year Selection
  const selectedYear = (type === "aqar" && activeSubSlug)
    ? (aqarReports.find(r => r.year === activeSubSlug)?.year || (aqarReports[0] ? aqarReports[0].year : "2023-2024"))
    : (aqarReports[0] ? aqarReports[0].year : "2023-2024");

  // NAAC Cycle Selection
  const selectedCycleId = (type === "naac" && activeSubSlug)
    ? (naacCycles.find(c => c.cycleId === activeSubSlug)?.cycleId || (naacCycles[0] ? naacCycles[0].cycleId : "cycle-1"))
    : (naacCycles[0] ? naacCycles[0].cycleId : "cycle-1");

  // Active Report or Cycle
  const currentAqarReport = aqarReports.find(r => r.year === selectedYear) || aqarReports[0];
  const currentNaacCycle = naacCycles.find(c => c.cycleId === selectedCycleId) || naacCycles[0];

  // Active Criteria list
  const criteria: Criterion[] = type === "aqar" 
    ? (currentAqarReport?.criteria || [])
    : (currentNaacCycle?.criteria || []);

  const [selectedCritId, setSelectedCritId] = useState<number>(1);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Tab scroll navigation ref & state
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = tabsRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [criteria]);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const offset = direction === "left" ? -280 : 280;
      tabsRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (tabsRef.current && e.deltaY !== 0) {
      tabsRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  // Popup view states
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const [activeSubpageData, setActiveSubpageData] = useState<{
    metricNum: string;
    label: string;
    subDocuments: SubDocument[];
  } | null>(null);

  // Auto-select first criterion if selectedCritId is not present
  useEffect(() => {
    if (criteria.length > 0 && !criteria.some(c => c.id === selectedCritId)) {
      setSelectedCritId(criteria[0].id);
    }
  }, [criteria, selectedCritId]);

  const selectedCriterion = criteria.find(c => c.id === selectedCritId) || criteria[0];

  // Auto-expand all sections in currently selected criterion
  useEffect(() => {
    if (selectedCriterion && selectedCriterion.sections.length > 0) {
      const keys = selectedCriterion.sections.map(
        (sec, idx) => `sec_${selectedCriterion.id}_${sec.number}_${idx}`
      );
      setOpenSections(new Set(keys));
    }
  }, [selectedCriterion?.id]);

  // Manage body class for modal overlays
  useEffect(() => {
    if (activePdfUrl || activeSubpageData) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activePdfUrl, activeSubpageData]);

  // Toggle sections
  const toggleSection = (secKey: string) => {
    const next = new Set(openSections);
    if (next.has(secKey)) {
      next.delete(secKey);
    } else {
      next.add(secKey);
    }
    setOpenSections(next);
  };

  const hasDocument = (doc: DocumentEntry) => {
    return !!doc.documentUrl || (doc.subDocuments && doc.subDocuments.length > 0);
  };

  const handleView = (doc: DocumentEntry, metricNum: string) => {
    if (doc.subDocuments && doc.subDocuments.length > 0) {
      setActiveSubpageData({
        metricNum,
        label: doc.label,
        subDocuments: doc.subDocuments
      });
    } else if (doc.documentUrl) {
      openPdf(doc.documentUrl, `${metricNum} - ${doc.label}`);
    } else {
      openPdf(DEFAULT_PDF, `${metricNum} - ${doc.label}`);
    }
  };

  const openPdf = (url: string, title: string) => {
    setActivePdfUrl(url || DEFAULT_PDF);
    setActivePdfTitle(title);
  };

  const getFileIcon = (url: string) => {
    const u = url.toLowerCase();
    if (u.endsWith('.mp4') || u.endsWith('.mkv') || u.endsWith('.avi')) {
      return <PlayCircle className="h-5 w-5 text-indigo-500 shrink-0" />;
    }
    if (u.endsWith('.xlsx') || u.endsWith('.xls') || u.endsWith('.csv')) {
      return <FileSpreadsheet className="h-5 w-5 text-emerald-600 shrink-0" />;
    }
    return <FileText className="h-5 w-5 text-red-500 shrink-0" />;
  };

  const getFilteredSections = () => {
    if (!selectedCriterion) return [];
    if (!searchQuery.trim()) return selectedCriterion.sections;

    const query = searchQuery.toLowerCase();
    return selectedCriterion.sections.map(section => {
      const filteredMetrics = section.metrics.filter(metric => {
        const titleMatch = metric.title.toLowerCase().includes(query);
        const numberMatch = metric.number.toLowerCase().includes(query);
        const docMatch = metric.documents.some(doc => 
          doc.label.toLowerCase().includes(query) ||
          (doc.subDocuments && doc.subDocuments.some(sub => sub.name.toLowerCase().includes(query)))
        );
        return titleMatch || numberMatch || docMatch;
      });

      return {
        ...section,
        metrics: filteredMetrics
      };
    }).filter(section => section.metrics.length > 0);
  };

  const filteredSections = getFilteredSections();

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search metric number, description, or documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
            {criteria.length} Criteria Available
          </span>
        </div>
      </div>

      {/* Criteria Tabs Pill Bar with Left/Right Buttons & Mouse Wheel Scroll */}
      <div className="relative group/tabs flex items-center">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => scrollTabs("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`hidden sm:flex absolute left-0 z-10 h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-slate-200 text-slate-700 hover:text-blue-900 hover:bg-white transition-all ${
            canScrollLeft ? "opacity-100 cursor-pointer hover:scale-105" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Scrollable Tabs Track */}
        <div
          ref={tabsRef}
          onWheel={handleWheel}
          className="flex gap-2 overflow-x-auto pb-2 scroll-smooth no-scrollbar w-full px-1 sm:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {criteria.map((c) => {
            const isSelected = c.id === selectedCritId;
            return (
              <button
                key={c.id}
                onClick={(e) => {
                  setSelectedCritId(c.id);
                  (e.currentTarget as HTMLElement).scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                  });
                }}
                className={`px-4 py-2.5 rounded-xl font-outfit text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 select-none shrink-0 ${
                  isSelected
                    ? "bg-[#002147] text-white shadow-sm ring-2 ring-[#002147]/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-blue-900 border border-slate-200"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-emerald-400" : "bg-slate-300"}`} />
                <span className="truncate max-w-[200px] sm:max-w-[260px]">{c.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => scrollTabs("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`hidden sm:flex absolute right-0 z-10 h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-slate-200 text-slate-700 hover:text-blue-900 hover:bg-white transition-all ${
            canScrollRight ? "opacity-100 cursor-pointer hover:scale-105" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Active Criterion Title Header */}
      {selectedCriterion && (
        <div className="bg-slate-50/80 p-4 md:p-5 rounded-2xl border border-slate-200 flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
            Selected Criterion
          </span>
          <h3 className="font-outfit font-black text-lg md:text-xl text-[#002147]">
            {selectedCriterion.title}
          </h3>
        </div>
      )}

      {/* Accordion Sections & Metrics List */}
      <div className="flex flex-col gap-4">
        {filteredSections.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center gap-3">
            <AlertCircle className="h-10 w-10 text-slate-300" />
            <h4 className="font-outfit font-bold text-base text-slate-700">No matching metrics or documents</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              We couldn&apos;t find any metrics matching &quot;{searchQuery}&quot; under this criterion. Try clearing your search query.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredSections.map((section, sIdx) => {
            const secKey = `sec_${selectedCriterion.id}_${section.number}_${sIdx}`;
            const isOpen = openSections.has(secKey);

            return (
              <div 
                key={secKey}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Section Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleSection(secKey)}
                  className="w-full p-4 md:p-5 flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-slate-100/70 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2.5 py-1 rounded-lg bg-[#002147] text-white text-xs font-black shrink-0">
                      {section.number}
                    </span>
                    <h4 className="font-outfit font-bold text-sm md:text-base text-slate-900 truncate">
                      {section.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                      {section.metrics.length} {section.metrics.length === 1 ? "Metric" : "Metrics"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* Metrics Table */}
                {isOpen && (
                  <div className="p-4 md:p-6 border-t border-slate-100 flex flex-col gap-6">
                    {section.metrics.map((metric) => (
                      <div 
                        key={metric.number}
                        className="p-4 md:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50/80 transition-all flex flex-col gap-4"
                      >
                        <div className="flex items-start gap-3 justify-between">
                          <div className="flex items-start gap-3">
                            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-outfit text-xs font-black shrink-0 mt-0.5">
                              {metric.number}
                            </span>
                            <h5 className="font-outfit font-bold text-sm md:text-[15px] text-slate-900 leading-snug">
                              {metric.title}
                            </h5>
                          </div>
                        </div>

                        {/* Metric Documents List */}
                        {metric.documents && metric.documents.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                            {metric.documents.map((doc, dIdx) => {
                              const hasDocs = hasDocument(doc);
                              const isSubpage = doc.subDocuments && doc.subDocuments.length > 0;

                              return (
                                <div
                                  key={dIdx}
                                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-4xs flex flex-col justify-between gap-3"
                                >
                                  <div className="flex items-start gap-2.5">
                                    {isSubpage ? (
                                      <FolderOpen className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                    ) : (
                                      getFileIcon(doc.documentUrl || "")
                                    )}
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                                        {doc.label}
                                      </span>
                                      {isSubpage && (
                                        <span className="text-[10px] text-amber-600 font-bold mt-1">
                                          {doc.subDocuments?.length} Sub-documents
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                    <button
                                      onClick={() => handleView(doc, metric.number)}
                                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-4xs ${
                                        isSubpage
                                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                      }`}
                                    >
                                      {isSubpage ? (
                                        <>
                                          <FolderOpen className="h-3.5 w-3.5" />
                                          Open Folder
                                        </>
                                      ) : (
                                        <>
                                          <Eye className="h-3.5 w-3.5" />
                                          View Document
                                        </>
                                      )}
                                    </button>

                                    {doc.documentUrl && (
                                      <a
                                        href={doc.documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-slate-600 p-1"
                                        title="Open in new window"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Nested Sub-Documents Explorer Modal */}
      {activeSubpageData && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-3 truncate">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-black">
                  {activeSubpageData.metricNum}
                </span>
                <h4 className="font-outfit font-black text-sm md:text-base tracking-tight truncate">
                  {activeSubpageData.label}
                </h4>
              </div>
              <button
                onClick={() => setActiveSubpageData(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {activeSubpageData.subDocuments.length} Documents Available:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSubpageData.subDocuments.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all flex items-center justify-between gap-3 shadow-4xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {getFileIcon(sub.url || "")}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {sub.name}
                        </span>
                        {sub.year && (
                          <span className="text-[10px] text-slate-500">
                            Academic Year: {sub.year}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        openPdf(sub.url || DEFAULT_PDF, sub.name);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs shrink-0"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveSubpageData(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded PDF Viewer Modal */}
      {activePdfUrl && (
        <InlinePdfModal
          url={activePdfUrl}
          title={activePdfTitle}
          onClose={() => setActivePdfUrl("")}
        />
      )}
    </div>
  );
};

// =========================================================================
// GENERIC QUALITY RENDERER FOR OTHER SLUGS
// =========================================================================
function GenericQualityRenderer({ slug }: { slug: string }) {
  const meta = qualityMeta[slug] || {
    subtitle: "Internal Quality Assurance Cell ensuring continuous quality enhancement in academic and administrative performance.",
    icon: ClipboardCheck
  };
  const Icon = meta.icon;

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans">
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              QUALITY ASSURANCE
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight capitalize">
              {slug.replace(/-/g, " ")}
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          {meta.subtitle}
        </p>
      </div>

      <div className="p-8 md:p-12 bg-white flex flex-col items-center justify-center text-center gap-4">
        <Icon className="h-14 w-14 text-slate-300" />
        <h3 className="font-outfit font-bold text-lg text-slate-800">
          Information &amp; Documentation Portal
        </h3>
        <p className="text-slate-500 text-sm max-w-md leading-relaxed">
          Please explore the dedicated IQAC and NAAC Accreditation sub-pages from the navigation menu on the left.
        </p>
      </div>
    </section>
  );
}

// =========================================================================
// REUSABLE POPUP MODAL: INLINE PDF / MEDIA VIEWER
// =========================================================================
function InlinePdfModal({
  url,
  title,
  onClose
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  const effectiveUrl = url || DEFAULT_PDF;

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative bg-white w-screen h-screen flex flex-col overflow-hidden">
        <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-6 shadow-md border-b border-slate-800">
          <div className="flex flex-col gap-0.5 truncate pr-8">
            <span className="text-[9px] uppercase font-black tracking-widest text-emerald-400">
              Document Viewer
            </span>
            <h3 className="font-outfit text-sm md:text-base font-black tracking-tight leading-none mt-1 truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3.5 shrink-0">
            <a 
              href={encodeURI(effectiveUrl)} 
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <a 
              href={encodeURI(effectiveUrl)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 text-xs font-bold transition-all shadow-4xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Full Screen
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-900 flex items-center justify-center relative">
          {effectiveUrl.toLowerCase().endsWith('.mp4') || effectiveUrl.toLowerCase().endsWith('.avi') ? (
            <video 
              src={encodeURI(effectiveUrl)} 
              controls 
              className="w-full max-h-full rounded-b-xl"
              autoPlay
            />
          ) : effectiveUrl.toLowerCase().endsWith('.xlsx') || effectiveUrl.toLowerCase().endsWith('.xls') || effectiveUrl.toLowerCase().endsWith('.csv') ? (
            <div className="text-white flex flex-col items-center justify-center gap-4 text-center p-8">
              <FileSpreadsheet className="h-16 w-16 text-emerald-400 animate-bounce" />
              <div className="flex flex-col gap-1.5">
                <h4 className="font-black text-lg">Spreadsheet Document</h4>
                <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                  This spreadsheet cannot be previewed natively in the browser frame. Please download it below to view.
                </p>
              </div>
              <a 
                href={encodeURI(effectiveUrl)}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all"
              >
                <Download className="h-4 w-4" />
                DOWNLOAD SPREADSHEET
              </a>
            </div>
          ) : (
            <iframe
              src={`${encodeURI(effectiveUrl)}#toolbar=0&navpanes=0`}
              title="Document Preview"
              className="w-full h-full border-none bg-slate-900"
            />
          )}
        </div>
      </div>
    </div>
  );
}
