"use client";

import React, { useState, useEffect } from "react";
import { staticQualitySections } from "./staticData";
import defaultQaData from "./quality-assurance-data.json";
import { 
  ClipboardCheck, ShieldCheck, Award, Target, FileText, 
  MessageSquare, BarChart, Image as ImageIcon, Phone,
  ChevronDown, ChevronRight, Eye, Search, ExternalLink, 
  X, FolderOpen, AlertCircle, FileSpreadsheet, PlayCircle, Download,
  Calendar, CheckCircle2, Clock, Users, Layers, Sparkles
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
  QualitySurveyDoc
} from "@/types/quality-assurance";

const qualityMeta: Record<string, {
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  "iqac": {
    subtitle: "Promoting institutional quality culture, steering committee guidelines, and continuous academic benchmarking.",
    icon: ClipboardCheck
  },
  "aqar": {
    subtitle: "Annual institutional performance reviews, criteria metrics, departmental parameters, and verified portfolios.",
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
  const [dataLoaded, setDataLoaded] = useState(false);

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
            setDataLoaded(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch fresh QA data, using bundled fallback:", err);
      }
    }
    loadQaData();
    return () => {
      isMounted = false;
    };
  }, [portalData]);

  const activeData = portalData || qaData;

  // Dedicated NAAC Accreditation Viewer
  if (slug === "naac") {
    return (
      <CriterionViewer
        type="naac"
        tagline="NAAC Accreditation"
        subtitle="Browse through our detailed self-assessment portfolios, criteria checklists, student parameters, and verified documents for accreditation."
        naacCycles={activeData.naacCycles || []}
        activeSubSlug={subSlug}
      />
    );
  }

  // Dedicated AQAR Reports Viewer
  if (slug === "aqar") {
    return (
      <CriterionViewer
        type="aqar"
        tagline="AQAR Reports"
        subtitle="Browse through our annual quality assurance reports, criteria checklists, departmental parameters, and verified academic portfolios."
        aqarReports={activeData.aqarReports || []}
        activeSubSlug={subSlug}
      />
    );
  }

  // Dedicated IQAC Page with Live Steering Committee, Convenors, and Meeting ATRs
  if (slug === "iqac") {
    return (
      <IqacSectionRenderer
        qaData={activeData}
        staticData={staticQualitySections["iqac"]}
      />
    );
  }

  // Dedicated Audit Page with Live Academic, Administrative & Green Audits
  if (slug === "audit") {
    return (
      <AuditSectionRenderer
        qaData={activeData}
        staticData={staticQualitySections["audit"]}
      />
    );
  }

  // Dedicated Feedback Page with Live Stakeholder Feedback & ATRs
  if (slug === "feedback") {
    return (
      <FeedbackSectionRenderer
        qaData={activeData}
        staticData={staticQualitySections["feedback"]}
      />
    );
  }

  // Dedicated Surveys Page with Live SSS & Outcome Evaluations
  if (slug === "surveys") {
    return (
      <SurveysSectionRenderer
        qaData={activeData}
        staticData={staticQualitySections["surveys"]}
      />
    );
  }

  // Fallback / Generic renderer for remaining sections (quality-initiatives, gallery, contact)
  return <GenericQualityRenderer slug={slug} />;
};

// =========================================================================
// PREMIUM CRITERION & REPORTS EXPLORER VIEWER (AQAR & NAAC)
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
  // AQAR Year Selection (driven by activeSubSlug if matched, otherwise first report)
  const selectedYear = (type === "aqar" && activeSubSlug)
    ? (aqarReports.find(r => r.year === activeSubSlug)?.year || (aqarReports[0] ? aqarReports[0].year : "2023-2024"))
    : (aqarReports[0] ? aqarReports[0].year : "2023-2024");

  // NAAC Cycle Selection (driven by activeSubSlug if matched, otherwise first cycle)
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

  // Popup view states
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const [activeSubpageData, setActiveSubpageData] = useState<{
    metricNum: string;
    label: string;
    subDocuments: SubDocument[];
  } | null>(null);

  // Auto-select first criterion if selectedCritId is not present in new criteria
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

  // Manage body class for modal overlays to hide page headers and lock scrolling
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

  // Helper to check if a document has any URL or nested files
  const hasDocument = (doc: DocumentEntry) => {
    return !!doc.documentUrl || (doc.subDocuments && doc.subDocuments.length > 0);
  };

  // Helper to open a PDF or a subpage modal
  const handleView = (doc: DocumentEntry, metricNum: string) => {
    if (doc.subDocuments && doc.subDocuments.length > 0) {
      setActiveSubpageData({
        metricNum,
        label: doc.label,
        subDocuments: doc.subDocuments
      });
    } else if (doc.documentUrl) {
      openPdf(doc.documentUrl, `${metricNum} - ${doc.label}`);
    }
  };

  const openPdf = (url: string, title: string) => {
    setActivePdfUrl(url);
    setActivePdfTitle(title);
  };

  // Format file icon for display
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

  // Filter sections/metrics based on search query
  const getFilteredSections = () => {
    if (!selectedCriterion) return [];
    if (!searchQuery.trim()) return selectedCriterion.sections;

    const query = searchQuery.toLowerCase();
    return selectedCriterion.sections.map(section => {
      const filteredMetrics = section.metrics.filter(metric => {
        const titleMatch = metric.title.toLowerCase().includes(query);
        const numMatch = metric.number.toLowerCase().includes(query);
        const docMatch = metric.documents.some(doc => 
          doc.label.toLowerCase().includes(query) || 
          (doc.subDocuments && JSON.stringify(doc.subDocuments).toLowerCase().includes(query))
        );
        return titleMatch || numMatch || docMatch;
      });

      if (filteredMetrics.length > 0 || section.title.toLowerCase().includes(query) || section.number.toLowerCase().includes(query)) {
        return {
          ...section,
          metrics: filteredMetrics.length > 0 ? filteredMetrics : section.metrics
        };
      }
      return null;
    }).filter(Boolean) as Section[];
  };

  const filteredSections = getFilteredSections();

  // Dynamic Title string
  const formatYearDisplay = (yr: string) => {
    return yr.replace(/^(\d{4})-(\d{2})(\d{2})$/, "$1-$3");
  };

  const mainTitle = type === "aqar"
    ? `Annual Quality Assurance Reports (AQAR) ${currentAqarReport ? formatYearDisplay(currentAqarReport.year) : "2023-24"}`
    : "National Assessment & Accreditation";

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm font-sans animate-fade-in relative z-10">
      {/* Global overrides to hide site header, breadcrumbs, and sidebar when the modal is active */}
      <style dangerouslySetInnerHTML={{ __html: `
        body.modal-open header,
        body.modal-open .sticky,
        body.modal-open aside {
          display: none !important;
        }
      ` }} />
      
      {/* Full-Width Section Header Banner */}
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {type === "naac" ? (
              <ShieldCheck className="h-7 w-7 text-indigo-300 shrink-0" />
            ) : (
              <FileText className="h-7 w-7 text-indigo-300 shrink-0" />
            )}
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-blue-200 flex items-center gap-1.5">
                {tagline}
              </span>
              <h2
                className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors duration-200"
                style={{ color: "var(--level2-title, #ffffff)" }}
              >
                {mainTitle}
              </h2>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="relative w-full md:w-80 group shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200 group-hover:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search metric or document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/15 hover:bg-white/20 focus:bg-white text-white focus:text-slate-800 placeholder:text-blue-100/70 focus:placeholder:text-slate-400 pl-10 pr-9 py-2 text-xs md:text-sm rounded-xl border border-white/20 focus:border-white focus:outline-none transition-all font-semibold shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p
          className="text-sm font-medium mt-3 transition-colors duration-200"
          style={{ color: "var(--level2-subtitle, rgba(219, 234, 254, 0.9))" }}
        >
          {subtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-8">

      {/* Criteria Carousel/Tabs (up to 10 tabs for NAAC/AQAR) */}
      {criteria.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
            {criteria.map((crit) => {
              const isActive = selectedCritId === crit.id;
              return (
                <button
                  key={crit.id}
                  onClick={() => {
                    setSelectedCritId(crit.id);
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-b from-[#002147] to-[#0b3c75] text-white border-transparent shadow-md transform -translate-y-1"
                      : "bg-white hover:bg-slate-50 text-slate-650 hover:text-[#002147] border-slate-200/80 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-85 leading-none">
                    {crit.title.toLowerCase().includes('extended') 
                      ? "Profile" 
                      : crit.title.toLowerCase().includes('dvv') 
                        ? "DVV" 
                        : crit.title.toLowerCase().includes('core') 
                          ? "Core Docs" 
                          : `Crit ${crit.id}`}
                  </span>
                  <span className="text-[11px] font-black tracking-tight mt-1 truncate w-full max-w-[80px]">
                    {crit.title.replace(/^Criterion\s+[IVX]+\s*[-–]\s*/i, '').split(" - ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Criterion Header Info Card */}
          {selectedCriterion && (
            <div className="bg-gradient-to-r from-emerald-50/40 to-teal-50/20 border border-emerald-100 rounded-3xl p-6 flex items-center justify-between gap-6 shadow-2xs">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase font-black tracking-widest text-emerald-600 leading-none">
                  Currently Viewing
                </span>
                <h3 className="font-outfit text-xl font-black text-[#002147] tracking-tight mt-1.5">
                  {selectedCriterion.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shrink-0">
                  {selectedCriterion.sections.length} Sections
                </span>
              </div>
            </div>
          )}

          {/* Sections and Metrics List */}
          <div className="flex flex-col gap-6">
            {filteredSections.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200/60">
                <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-outfit font-black text-slate-700 text-lg">No metrics found</h4>
                <p className="text-slate-500 text-sm mt-1">Try refining your search term or view another criterion.</p>
              </div>
            ) : (
              filteredSections.map((section, secIdx) => {
                const sectionKey = `sec_${selectedCriterion.id}_${section.number}_${secIdx}`;
                const isOpen = openSections.has(sectionKey);
                return (
                  <div 
                    key={sectionKey} 
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-xs"
                  >
                    {/* Section Header Accordion Trigger */}
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className={`w-full text-left px-6 py-4.5 flex items-center justify-between transition-colors ${
                        isOpen ? "bg-[#002147]/[0.03] text-[#002147]" : "bg-white hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 pr-4">
                        <span className="text-[11px] font-black tracking-wider text-emerald-600 uppercase bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-lg shrink-0">
                          Section
                        </span>
                        <h4 className="font-outfit font-black text-base md:text-lg tracking-tight">
                          {section.number !== "Section" ? `${section.number} ` : ""}{section.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-bold text-slate-400">
                          {section.metrics.length} Metrics
                        </span>
                        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#002147]" : ""}`} />
                      </div>
                    </button>

                    {/* Section Metrics Body */}
                    {isOpen && (
                      <div className="p-6 bg-slate-50/40 border-t border-slate-100 flex flex-col gap-5">
                        {section.metrics.map((metric, metricIdx) => (
                          <div 
                            key={`metric_${sectionKey}_${metric.number}_${metricIdx}`}
                            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-3xs flex flex-col gap-4 hover:border-slate-300 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <span className="bg-slate-100 text-slate-700 font-black text-xs px-2.5 py-1 rounded-lg shrink-0 tracking-wide mt-0.5">
                                  {metric.number}
                                </span>
                                <h5 className="font-outfit font-black text-sm md:text-base text-slate-800 leading-snug">
                                  {metric.title}
                                </h5>
                              </div>
                            </div>

                            {/* Documents and Subdocuments Action Buttons */}
                            {metric.documents && metric.documents.length > 0 && (
                              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
                                {metric.documents.map((doc, docIdx) => {
                                  const isNested = doc.subDocuments && doc.subDocuments.length > 0;
                                  const hasValidUrl = !!doc.documentUrl || isNested;

                                  if (!hasValidUrl) return null;

                                  return (
                                    <button
                                      key={docIdx}
                                      onClick={() => handleView(doc, metric.number)}
                                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-4xs ${
                                        isNested
                                          ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80"
                                          : "bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200/80"
                                      }`}
                                    >
                                      {isNested ? (
                                        <>
                                          <FolderOpen className="h-4 w-4 text-amber-600 shrink-0" />
                                          <span>{doc.label}</span>
                                          <span className="bg-amber-200/60 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1">
                                            {doc.subDocuments?.length} Files
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <Eye className="h-4 w-4 shrink-0" />
                                          <span>{doc.label || "View Document"}</span>
                                        </>
                                      )}
                                    </button>
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
        </>
      ) : (
        <div className="p-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-outfit font-black text-slate-700 text-lg">Report Under Compilation</h4>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
            Data and metric documents for this academic period are being processed by the IQAC steering committee and will be available here soon.
          </p>
        </div>
      )}

      {/* =========================================================================
          POPUP MODAL: SUBDOCUMENTS EXPLORER TABLE
          ========================================================================= */}
      {activeSubpageData && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden font-sans">
            {/* Header */}
            <div className="bg-[#002147] text-white px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 truncate">
                <span className="bg-emerald-500 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                  {activeSubpageData.metricNum}
                </span>
                <h3 className="font-outfit font-black text-base md:text-lg truncate">
                  {activeSubpageData.label}
                </h3>
              </div>
              <button 
                onClick={() => setActiveSubpageData(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Subdocuments Table */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 font-outfit text-xs font-black uppercase text-slate-500 w-12 text-center">#</th>
                    <th className="px-4 py-3 font-outfit text-xs font-black uppercase text-slate-500">Document Title</th>
                    <th className="px-4 py-3 font-outfit text-xs font-black uppercase text-slate-500 w-28 text-center">Academic Year</th>
                    <th className="px-4 py-3 font-outfit text-xs font-black uppercase text-slate-500 w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeSubpageData.subDocuments.map((subDoc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3.5 text-center text-xs font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          {subDoc.subDocuments && subDoc.subDocuments.length > 0 ? (
                            <FolderOpen className="h-4 w-4 text-amber-500 shrink-0" />
                          ) : (
                            getFileIcon(subDoc.url)
                          )}
                          <span className="text-slate-800 font-bold text-xs md:text-sm">
                            {subDoc.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center text-xs font-bold text-slate-500">
                        {subDoc.year || "—"}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => {
                            if (subDoc.subDocuments && subDoc.subDocuments.length > 0) {
                              setActiveSubpageData({
                                metricNum: activeSubpageData.metricNum,
                                label: subDoc.name,
                                subDocuments: subDoc.subDocuments
                              });
                            } else if (subDoc.url) {
                              openPdf(subDoc.url, `${activeSubpageData.metricNum} - ${subDoc.name}`);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold transition-all border border-emerald-200/60"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          VIEW
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          POPUP MODAL: INLINE PDF VIEWER
          ========================================================================= */}
      {activePdfUrl && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative bg-white w-screen h-screen flex flex-col overflow-hidden font-sans">
            {/* Header Control Panel */}
            <div className="bg-[#002147] text-white px-6 py-4 flex items-center justify-between gap-6 shadow-md border-b border-slate-800">
              <div className="flex flex-col gap-0.5 truncate pr-8">
                <span className="text-[9px] uppercase font-black tracking-widest text-emerald-400">
                  Document Viewer
                </span>
                <h3 className="font-outfit text-sm md:text-base font-black tracking-tight leading-none mt-1 truncate">
                  {activePdfTitle}
                </h3>
              </div>
              <div className="flex items-center gap-3.5 shrink-0">
                <a 
                  href={encodeURI(activePdfUrl)} 
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-750 text-white text-xs font-bold transition-all shadow-4xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <a 
                  href={encodeURI(activePdfUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 text-xs font-bold transition-all shadow-4xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Full Screen
                </a>
                <button 
                  onClick={() => setActivePdfUrl("")}
                  className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded Iframe Document Container */}
            <div className="flex-1 bg-slate-900 flex items-center justify-center relative">
              {activePdfUrl.toLowerCase().endsWith('.mp4') || activePdfUrl.toLowerCase().endsWith('.avi') ? (
                <video 
                  src={encodeURI(activePdfUrl)} 
                  controls 
                  className="w-full max-h-full rounded-b-xl"
                  autoPlay
                />
              ) : activePdfUrl.toLowerCase().endsWith('.xlsx') || activePdfUrl.toLowerCase().endsWith('.xls') || activePdfUrl.toLowerCase().endsWith('.csv') ? (
                <div className="text-white flex flex-col items-center justify-center gap-4 text-center p-8">
                  <FileSpreadsheet className="h-16 w-16 text-emerald-400 animate-bounce" />
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-black text-lg">Spreadsheet Document</h4>
                    <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                      This spreadsheet cannot be previewed natively in the browser frame. Please download it below to view.
                    </p>
                  </div>
                  <a 
                    href={encodeURI(activePdfUrl)}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all"
                  >
                    <Download className="h-4 w-4" />
                    DOWNLOAD SPREADSHEET
                  </a>
                </div>
              ) : (
                <iframe
                  src={`${encodeURI(activePdfUrl)}#toolbar=0&navpanes=0`}
                  title="Document Preview"
                  className="w-full h-full border-none bg-slate-900"
                />
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

// =========================================================================
// IQAC SECTION RENDERER WITH LIVE COMMITTEES, CONVENORS & MEETINGS
// =========================================================================
function IqacSectionRenderer({
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
  const meetings = qaData.meetingsAndAtrs || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm">
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
              QUALITY FRAMEWORK
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              Internal Quality Assurance Cell (IQAC)
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Promoting institutional quality culture, steering committee guidelines, and continuous academic benchmarking.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-10">
        {/* About IQAC */}
        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight !mt-0 mb-3">
            About IQAC
          </h3>
          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">
            The Internal Quality Assurance Cell (IQAC) of St. Ann’s College for Women ensures continuous quality enhancement in academic and administrative performance. Established as a proactive system, it promotes a quality culture within the institution in accordance with NAAC guidelines.
          </p>

          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight mt-8 mb-3">
            Vision
          </h3>
          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">
            To promote quality culture as the prime concern of Higher Education Institutions through institutionalizing and internalizing all quality-enhancing and sustaining initiatives with internal and external support.
          </p>

          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight mt-8 mb-3">
            Mission
          </h3>
          <ul className="space-y-2 text-slate-600 leading-relaxed text-[15px] md:text-base pl-5 list-disc">
            <li>To empower young women through transformative education and shape them into intellectually competent, morally upright, and socially committed individuals.</li>
            <li>To create a conducive environment for the holistic development of rural and socially disadvantaged students.</li>
            <li>To provide an optimal learning environment and eco-friendly atmosphere that inspires young aspirants to explore knowledge and innovation.</li>
            <li>To make students employable, self-reliant, responsible, and socially useful citizens.</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight mt-8 mb-3">
            Objectives of IQAC
          </h3>
          <ul className="space-y-2 text-slate-600 leading-relaxed text-[15px] md:text-base pl-5 list-disc">
            <li>To act as a catalyst in developing mechanisms for promoting conscious, consistent, and coordinated efforts to improve the academic and administrative performance of the institution.</li>
            <li>To promote quality enhancement and sustenance through internalization of quality culture and institutionalization of best practices.</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight mt-8 mb-3">
            Functions of IQAC
          </h3>
          <ul className="space-y-2 text-slate-600 leading-relaxed text-[15px] md:text-base pl-5 list-disc">
            <li>Development and application of quality benchmarks.</li>
            <li>Setting parameters for various academic and administrative activities of the institution.</li>
            <li>Facilitating a learner-centric environment conducive to quality education and faculty development.</li>
            <li>Encouraging the adoption of modern knowledge and technology for participatory teaching-learning processes.</li>
            <li>Collection and analysis of feedback from stakeholders on quality-related institutional processes.</li>
            <li>Dissemination of information on quality parameters among stakeholders.</li>
            <li>Organization of intra- and inter-institutional workshops, seminars, and quality-related programmes.</li>
            <li>Documentation of programmes and activities leading to quality improvement.</li>
            <li>Acting as a nodal agency for coordinating quality-related activities and dissemination of best practices.</li>
            <li>Development and maintenance of institutional databases through MIS for enhancing institutional quality.</li>
            <li>Conducting Academic and Administrative Audits and follow-up activities periodically.</li>
            <li>Preparation and submission of the Annual Quality Assurance Report (AQAR) as per NAAC guidelines.</li>
          </ul>
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

        {/* Live Meetings & Action Taken Reports (ATRs) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-[#002147]" />
            <h3 className="font-outfit font-black text-xl md:text-2xl text-[#002147] tracking-tight">
              IQAC Meetings &amp; Action Taken Reports (ATRs)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {meetings.map((doc) => (
              <div 
                key={doc.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-3xs flex flex-col justify-between gap-3"
              >
                <div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    doc.type === "Minutes" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {doc.type}
                  </span>
                  <h4 className="font-outfit font-bold text-sm text-slate-800 mt-2">
                    {doc.title}
                  </h4>
                  {doc.date && (
                    <p className="text-xs text-slate-400 mt-1">Date: {doc.date}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setActivePdfUrl(doc.fileUrl);
                    setActivePdfTitle(doc.title);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs mt-2"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Document
                </button>
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
// AUDIT SECTION RENDERER
// =========================================================================
function AuditSectionRenderer({
  qaData,
  staticData
}: {
  qaData: QualityAssuranceData;
  staticData?: { title: string; content: string };
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const audits = qaData.auditReports || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm">
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
              QUALITY PROCESSES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              Academic &amp; Administrative Audits
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Comprehensive internal and external academic, administrative, green, and energy audits for institutional excellence.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-8">
        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight !mt-0 mb-3">
            Institutional Quality Audits
          </h3>
          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">
            The college conducts regular Academic and Administrative Audits (AAA) to ensure continuous improvement in academic standards and governance.
          </p>

          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight mt-6 mb-3">
            Types of Audits
          </h3>
          <ul className="space-y-2 text-slate-600 leading-relaxed text-[15px] md:text-base pl-5 list-disc">
            <li><strong>Academic Audit:</strong> Internal and External review of departmental performance and teaching practices.</li>
            <li><strong>Administrative Audit:</strong> Review of office systems, financial management, and institutional governance.</li>
            <li><strong>Green Audit:</strong> Assessment of environmental sustainability and green initiatives.</li>
            <li><strong>Energy Audit:</strong> Evaluation of energy conservation and resource management.</li>
            <li><strong>Environment Audit:</strong> Assessment of eco-friendly campus practices.</li>
          </ul>
        </div>

        {/* Live Audits Table / Grid */}
        <div className="flex flex-col gap-4">
          <h3 className="font-outfit font-black text-xl text-[#002147] tracking-tight">
            Official Audit Documents &amp; Reports
          </h3>
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Audit Type</th>
                  <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Document Title</th>
                  <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 text-center">Academic Year</th>
                  <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {audits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-black uppercase px-2.5 py-1 rounded-md">
                        {audit.type} Audit
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      {audit.title}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500 text-center">
                      {audit.academicYear}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setActivePdfUrl(audit.fileUrl);
                          setActivePdfTitle(audit.title);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
// FEEDBACK SECTION RENDERER
// =========================================================================
function FeedbackSectionRenderer({
  qaData,
  staticData
}: {
  qaData: QualityAssuranceData;
  staticData?: { title: string; content: string };
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const feedbackList = qaData.feedbackSystem || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm">
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <MessageSquare className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              QUALITY PROCESSES
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              Stakeholder Feedback System
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Structured stakeholder feedback collection and action-taken reports from students, teachers, parents, and employers.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-8">
        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight !mt-0 mb-3">
            Stakeholder Feedback Mechanism
          </h3>
          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">
            A systematic feedback mechanism is implemented to collect inputs from students, faculty, alumni, and employers for institutional improvement.
          </p>
        </div>

        {/* Live Feedback Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700">Stakeholder Category</th>
                <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 text-center">Academic Year</th>
                <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 text-center">Feedback Report</th>
                <th className="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 text-center">Action Taken Report (ATR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feedbackList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    <span className="bg-slate-100 text-slate-800 font-black text-xs px-2.5 py-1 rounded-md">
                      {item.stakeholder} Feedback
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 text-center">
                    {item.academicYear}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setActivePdfUrl(item.fileUrl);
                        setActivePdfTitle(`${item.stakeholder} Feedback Analysis (${item.academicYear})`);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold transition-all border border-emerald-200"
                    >
                      <Eye className="h-3.5 w-3.5" /> Analysis PDF
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.atrFileUrl ? (
                      <button
                        onClick={() => {
                          setActivePdfUrl(item.atrFileUrl!);
                          setActivePdfTitle(`${item.stakeholder} Action Taken Report (${item.academicYear})`);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold transition-all border border-blue-200"
                      >
                        <Eye className="h-3.5 w-3.5" /> ATR PDF
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">Integrated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
// SURVEYS & EVALUATIONS SECTION RENDERER
// =========================================================================
function SurveysSectionRenderer({
  qaData,
  staticData
}: {
  qaData: QualityAssuranceData;
  staticData?: { title: string; content: string };
}) {
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const surveys = qaData.surveysAndEvaluations || [];

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm">
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <BarChart className="h-7 w-7 text-indigo-300 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">
              EVALUATION &amp; MEDIA
            </span>
            <h2 className="font-outfit font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              Surveys &amp; Institutional Evaluations
            </h2>
          </div>
        </div>
        <p className="text-sm font-medium mt-2 text-blue-100/90">
          Student Satisfaction Survey (SSS), semester pass percentages, rank progression, and programme outcome evaluations.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white flex flex-col gap-8">
        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight !mt-0 mb-3">
            Institutional Evaluation &amp; Assessment
          </h3>
          <p className="text-slate-600 leading-relaxed text-[15px] md:text-base">
            The institution conducts systematic surveys and evaluations to measure academic effectiveness and stakeholder satisfaction.
          </p>
        </div>

        {/* Live Surveys Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {surveys.map((survey) => (
            <div 
              key={survey.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-3xs flex flex-col justify-between gap-3"
            >
              <div>
                <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  {survey.category}
                </span>
                <h4 className="font-outfit font-bold text-sm text-slate-800 mt-2">
                  {survey.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">Academic Year: {survey.academicYear}</p>
              </div>
              <button
                onClick={() => {
                  setActivePdfUrl(survey.fileUrl);
                  setActivePdfTitle(survey.title);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-4xs mt-2"
              >
                <Eye className="h-3.5 w-3.5" />
                View Evaluation PDF
              </button>
            </div>
          ))}
        </div>
      </div>

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
// GENERIC FALLBACK RENDERER (QUALITY-INITIATIVES, GALLERY, CONTACT)
// =========================================================================
function GenericQualityRenderer({ slug }: { slug: string }) {
  const data = staticQualitySections[slug];
  if (!data) return <div className="p-8 text-slate-500 font-medium">Content not found.</div>;

  const content = data.content || "";
  const lines = content.split("\n");
  const nodes: { type: string; text: string }[] = [];
  let i = 0;

  while (i < lines.length) {
    const chunk = lines[i].trim();
    if (!chunk) {
      i++;
      continue;
    }

    if (chunk.startsWith("<table>") || chunk.includes("<table>")) {
      let tableHtml = chunk;
      if (!chunk.includes("</table>")) {
        i++;
        while (i < lines.length && !lines[i].includes("</table>")) {
          tableHtml += "\n" + lines[i];
          i++;
        }
        if (i < lines.length) {
          tableHtml += "\n" + lines[i];
        }
      }
      nodes.push({ type: 'table', text: tableHtml });
      i++;
      continue;
    }

    if (chunk.startsWith("Link:")) {
      nodes.push({ type: 'link', text: chunk.replace("Link:", "").trim() });
      i++;
      continue;
    }

    nodes.push({ type: 'paragraph', text: chunk });
    i++;
  }

  const renderText = (text: string) => {
    return text.split(/(__.*?__|\*.*?\*|\[.*?\]\(.*?\))/g).map((part, idx) => {
      if (part.startsWith('__') && part.endsWith('__')) {
        return <strong key={idx} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic text-slate-700">{part.slice(1, -1)}</em>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors">{linkMatch[1]}</a>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const meta = qualityMeta[slug] || {
    subtitle: "Promoting institutional quality culture, steering committee guidelines, and continuous academic benchmarking.",
    icon: ClipboardCheck
  };
  const SectionIcon = meta.icon;

  return (
    <section className="bg-[#eaeff5] border-2 border-slate-200/90 rounded-[2.5rem] overflow-hidden shadow-sm">
      <div
        className="text-white px-6 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 w-full flex flex-col justify-center border-b transition-colors duration-200"
        style={{
          backgroundColor: "var(--level2-bg, #002147)",
          borderColor: "var(--level2-border, rgba(49, 46, 129, 0.2))"
        }}
      >
        <div className="flex items-center gap-3">
          <SectionIcon className="h-6 w-6 text-indigo-300 shrink-0" />
          <h2
            className="font-outfit font-black text-xl sm:text-2xl tracking-tight transition-colors duration-200"
            style={{ color: "var(--level2-title, #ffffff)" }}
          >
            {data.title}
          </h2>
        </div>
        <p
          className="text-sm font-medium mt-1 sm:pl-9 transition-colors duration-200"
          style={{ color: "var(--level2-subtitle, rgba(219, 234, 254, 0.9))" }}
        >
          {meta.subtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10 bg-white">
        <div className="prose prose-slate max-w-none">
        {nodes.map((node, idx) => {
          if (node.type === 'table') {
            let processedHtml = node.text
              .replace(/__(.*?)__/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors">$1</a>');

            processedHtml = processedHtml
              .replace('<table>', '<table class="w-full text-left border-collapse">')
              .replace('<thead>', '<thead class="bg-gradient-to-r from-slate-50 to-slate-100/50">')
              .replace(/<th>/g, '<th class="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 border-b border-slate-200">')
              .replace(/<tbody>([\s\S]*?)<\/tbody>/g, (match, tbodyContent) => {
                return '<tbody class="divide-y divide-slate-100">' + 
                  tbodyContent.replace(/<tr>/g, '<tr class="hover:bg-slate-50/50 transition-colors duration-150">')
                              .replace(/<td>/g, '<td class="px-6 py-4 text-sm md:text-base text-slate-600 font-medium leading-relaxed">') + 
                  '</tbody>';
              });

            return (
              <div key={idx} className="my-8 overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
                </div>
              </div>
            );
          }

          if (node.type === 'link') {
            return (
              <a key={idx} href={node.text} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 mt-4 mr-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold transition-all shadow-md hover:shadow-lg w-fit">
                <FileText className="h-4.5 w-4.5" />
                <span className="text-sm tracking-wide">View Document</span>
              </a>
            );
          }

          const text = node.text;
          if (text.startsWith('- ') || text.startsWith('* ')) {
            return (
              <div key={idx} className="flex gap-3 my-2 items-start pl-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                <p className="text-slate-600 leading-relaxed text-[15px] md:text-base m-0">
                  {renderText(text.replace(/^[-*]\s/, ''))}
                </p>
              </div>
            );
          }

          if (text.startsWith('__') && text.endsWith('__')) {
            const hText = text.slice(2, -2);
            return (
              <h3 key={idx} className={`text-xl md:text-2xl font-outfit font-bold text-slate-800 tracking-tight flex items-center gap-3 ${idx === 0 ? '!mt-1 mb-3' : 'mt-7 mb-3'}`}>
                {hText}
              </h3>
            );
          }

          return (
            <p key={idx} className="text-slate-600 leading-relaxed text-[15px] md:text-base mb-4">
              {renderText(text)}
            </p>
          );
        })}
        </div>
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
              href={encodeURI(url)} 
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-750 text-white text-xs font-bold transition-all shadow-4xs"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <a 
              href={encodeURI(url)} 
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
          {url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.avi') ? (
            <video 
              src={encodeURI(url)} 
              controls 
              className="w-full max-h-full rounded-b-xl"
              autoPlay
            />
          ) : url.toLowerCase().endsWith('.xlsx') || url.toLowerCase().endsWith('.xls') || url.toLowerCase().endsWith('.csv') ? (
            <div className="text-white flex flex-col items-center justify-center gap-4 text-center p-8">
              <FileSpreadsheet className="h-16 w-16 text-emerald-400 animate-bounce" />
              <div className="flex flex-col gap-1.5">
                <h4 className="font-black text-lg">Spreadsheet Document</h4>
                <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                  This spreadsheet cannot be previewed natively in the browser frame. Please download it below to view.
                </p>
              </div>
              <a 
                href={encodeURI(url)}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all"
              >
                <Download className="h-4 w-4" />
                DOWNLOAD SPREADSHEET
              </a>
            </div>
          ) : (
            <iframe
              src={`${encodeURI(url)}#toolbar=0&navpanes=0`}
              title="Document Preview"
              className="w-full h-full border-none bg-slate-900"
            />
          )}
        </div>
      </div>
    </div>
  );
}
