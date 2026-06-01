"use client";

import React, { useState, useEffect } from "react";
import { staticQualitySections } from "./staticData";
import { 
  ClipboardCheck, ShieldCheck, Award, Target, FileText, 
  MessageSquare, BarChart, Image as ImageIcon, Phone,
  ChevronDown, ChevronRight, Eye, Search, ExternalLink, 
  X, FolderOpen, AlertCircle, FileSpreadsheet, PlayCircle, Download
} from "lucide-react";
import { getNaacData } from "@/lib/sanity";

// Interface for NAAC Data structure
interface SubDocument {
  name: string;
  year?: string;
  url: string;
  subDocuments?: SubDocument[];
}

interface DocumentEntry {
  label: string;
  documentUrl: string;
  subDocuments?: SubDocument[];
}

interface Metric {
  number: string;
  title: string;
  documents: DocumentEntry[];
}

interface Section {
  number: string;
  title: string;
  metrics: Metric[];
}

interface Criterion {
  id: number;
  title: string;
  sections: Section[];
}

export const ContentRenderer = ({ slug }: { slug: string }) => {
  if (slug === "naac") {
    return <NaacAccreditationViewer />;
  }

  // Render original static quality sections (iqac, aqar, audit, feedback, etc.)
  const data = staticQualitySections[slug];
  if (!data) return <div className="p-8 text-slate-550 font-medium">Content not found.</div>;

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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-outfit font-black text-[#002147] tracking-tight">
            {data.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>
      </div>

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
            const isPdf = node.text.toLowerCase().endsWith('.pdf');
            
            const formatPdfName = (url: string) => {
              try {
                const filename = url.split('/').pop() || "";
                let name = decodeURIComponent(filename);
                name = name.replace(/\.pdf$/i, '');
                name = name.replace(/_/g, ' ');
                name = name.replace(/^\d+\./, '');
                name = name.replace(/-/g, ' ');
                name = name.replace(/%26/g, '&');
                name = name.split(' ').filter(Boolean).map(w => {
                  if (w === '&' || w.toLowerCase() === 'and') return '&';
                  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                }).join(' ');
                return name.trim() || "View PDF";
              } catch (e) {
                return "View PDF";
              }
            };
            
            const buttonName = isPdf ? formatPdfName(node.text) : "View Link";

            return (
              <a key={idx} href={node.text} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 mt-4 mr-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold transition-all shadow-md hover:shadow-lg w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                <span className="text-sm tracking-wide">{buttonName}</span>
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
              <h3 key={idx} className="text-xl md:text-2xl font-outfit font-bold text-slate-800 mt-8 mb-4 tracking-tight flex items-center gap-3">
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
  );
};

// =========================================================================
// PREMIUM NAAC ACCREDITATION VIEWER
// =========================================================================
const NaacAccreditationViewer = () => {
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [selectedCritId, setSelectedCritId] = useState<number>(1);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["1.1", "2.1", "3.1", "4.1", "5.1", "6.1", "7.1"]));
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  // Popup view states
  const [activePdfUrl, setActivePdfUrl] = useState<string>("");
  const [activePdfTitle, setActivePdfTitle] = useState<string>("");
  const [activeSubpageData, setActiveSubpageData] = useState<{
    metricNum: string;
    label: string;
    subDocuments: SubDocument[];
  } | null>(null);

  // Load criteria data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getNaacData();
      if (data && data.length > 0) {
        setCriteria(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

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
  const toggleSection = (secNum: string) => {
    const next = new Set(openSections);
    if (next.has(secNum)) {
      next.delete(secNum);
    } else {
      next.add(secNum);
    }
    setOpenSections(next);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#002147]/10 rounded-full" />
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-slate-500 font-semibold tracking-wide text-sm animate-pulse">
          Loading NAAC Accreditation Framework...
        </p>
      </div>
    );
  }

  const selectedCriterion = criteria.find(c => c.id === selectedCritId) || criteria[0];

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

  // Format filename for display in PDF Viewer
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

  return (
    <div className="flex flex-col gap-8 font-sans animate-fade-in relative z-10">
      {/* Global overrides to hide site header, breadcrumbs, and sidebar when the modal is active */}
      <style dangerouslySetInnerHTML={{ __html: `
        body.modal-open header,
        body.modal-open .sticky,
        body.modal-open aside {
          display: none !important;
        }
      ` }} />
      
      {/* Header and Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#002147]/60 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> NAAC Accreditation
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-outfit font-black text-[#002147] tracking-tight">
            National Assessment & Accreditation
          </h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl mt-1">
            Browse through our detailed self-assessment portfolios, criteria checklists, student parameters, and verified documents for Cycle-I accreditation.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search metric or document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white px-11 py-3 text-sm rounded-2xl border border-slate-200/80 focus:border-emerald-400 focus:outline-none transition-all focus:ring-4 focus:ring-emerald-50/50 font-semibold text-slate-700 shadow-2xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* 7 Criteria Carousel/Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {criteria.map((crit) => {
          const isActive = selectedCritId === crit.id;
          return (
            <button
              key={crit.id}
              onClick={() => {
                setSelectedCritId(crit.id);
                // Expand first section of new criterion by default
                if (crit.sections.length > 0) {
                  const firstSec = crit.sections[0].number;
                  setOpenSections(new Set([firstSec]));
                }
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-b from-[#002147] to-[#0b3c75] text-white border-transparent shadow-md transform -translate-y-1"
                  : "bg-white hover:bg-slate-50 text-slate-650 hover:text-[#002147] border-slate-200/80 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-wider opacity-85 leading-none">
                Crit {crit.id}
              </span>
              <span className="text-[11px] font-black tracking-tight mt-1 truncate w-full max-w-[80px]">
                {crit.title.replace(/^Criterion\s+[IVX]+\s*[-–]\s*/i, '')}
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
          <div className="hidden sm:flex items-center gap-2 bg-[#002147] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xs">
            {selectedCriterion.sections.length} Sections
          </div>
        </div>
      )}

      {/* List of Sections */}
      <div className="flex flex-col gap-6">
        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <AlertCircle className="h-8 w-8 text-slate-350" />
            <p className="text-slate-450 text-sm font-semibold tracking-wide">
              No matching criteria or documents found for your search.
            </p>
          </div>
        ) : (
          filteredSections.map((section) => {
            const isExpanded = openSections.has(section.number);
            return (
              <div 
                key={section.number} 
                className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-2xs transition-all duration-300"
              >
                {/* Section Header (Accordion Trigger) */}
                <button
                  onClick={() => toggleSection(section.number)}
                  className="w-full flex items-center justify-between p-6 hover:bg-slate-50/40 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 pr-6">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-black tracking-tight shrink-0 shadow-3xs">
                      {section.number}
                    </span>
                    <h4 className="font-outfit text-base md:text-lg font-black text-[#002147] tracking-tight">
                      {section.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {section.metrics.length} Metrics
                    </span>
                    <div className={`p-1.5 rounded-lg bg-slate-100/70 text-slate-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </button>

                {/* Section Content (Metrics and Documents) */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-6 flex flex-col gap-6 bg-slate-50/20">
                    {section.metrics.map((metric) => (
                      <div 
                        key={metric.number}
                        className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-3xs flex flex-col gap-4 hover:border-slate-350 transition-colors"
                      >
                        {/* Metric Label and Prompt */}
                        <div className="flex items-start gap-3">
                          <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-2.5 py-1 rounded-lg shrink-0 tracking-wide mt-0.5 shadow-4xs">
                            {metric.number}
                          </span>
                          <p className="text-slate-750 font-bold text-sm md:text-[15px] leading-relaxed">
                            {metric.title}
                          </p>
                        </div>

                        {/* List of Associated Documents */}
                        {metric.documents.length > 0 && (
                          <div className="flex flex-col gap-2.5 border-t border-slate-100/80 pt-4 mt-1">
                            {metric.documents.map((doc, dIdx) => {
                              const ready = hasDocument(doc);
                              return (
                                <div 
                                  key={dIdx}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50/50 hover:border-slate-200 transition-all group/doc"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="mt-1 shrink-0">
                                      {doc.subDocuments && doc.subDocuments.length > 0 ? (
                                        <FolderOpen className="h-4 w-4 text-amber-500 shrink-0" />
                                      ) : (
                                        <FileText className="h-4 w-4 text-slate-400 group-hover/doc:text-red-500 transition-colors shrink-0" />
                                      )}
                                    </div>
                                    <span className="text-slate-650 font-semibold text-xs md:text-sm leading-relaxed pr-4">
                                      {doc.label}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3 self-end sm:self-auto">
                                    {ready && (
                                      <button
                                        onClick={() => handleView(doc, metric.number)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 hover:border-transparent text-xs font-bold transition-all shadow-4xs shrink-0"
                                      >
                                        <Eye className="h-3.5 w-3.5 shrink-0" />
                                        VIEW
                                      </button>
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

      {/* =========================================================================
          POPUP MODAL: NESTED SUB-PAGES VIEWER (For files list grouped by Year/Course)
          ========================================================================= */}
      {activeSubpageData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
          {/* Glassmorphic Backdrop Blur */}
          <div 
            onClick={() => setActiveSubpageData(null)}
            className="absolute inset-0 bg-[#002147]/45 backdrop-blur-md transition-all" 
          />

          {/* Modal Content Box */}
          <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] border border-slate-200/50 shadow-2xl flex flex-col overflow-hidden font-sans scale-in">
            {/* Header */}
            <div className="bg-[#002147] text-white px-6 py-5 flex items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase font-black tracking-widest text-emerald-400 flex items-center gap-1">
                  <FolderOpen className="h-3.5 w-3.5" /> Subpage Archive
                </span>
                <h3 className="font-outfit text-lg md:text-xl font-black tracking-tight leading-none mt-1">
                  {activeSubpageData.metricNum} - {activeSubpageData.label}
                </h3>
              </div>
              <button 
                onClick={() => setActiveSubpageData(null)}
                className="p-2 rounded-xl bg-white/10 text-slate-200 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List and Table Grid */}
            <div className="p-6 overflow-y-auto bg-slate-50/50 flex-1">
              <div className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-3xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse table-auto">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-5 py-3.5 font-outfit text-[11px] font-black uppercase tracking-wider text-slate-500 w-16 text-center">S.No</th>
                        <th className="px-5 py-3.5 font-outfit text-[11px] font-black uppercase tracking-wider text-slate-500">Document Description</th>
                        <th className="px-5 py-3.5 font-outfit text-[11px] font-black uppercase tracking-wider text-slate-500 w-24 text-center">Academic Year</th>
                        <th className="px-5 py-3.5 font-outfit text-[11px] font-black uppercase tracking-wider text-slate-500 w-24 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeSubpageData.subDocuments.map((subDoc, idx) => {
                        const hasUrl = !!subDoc.url || (subDoc.subDocuments && subDoc.subDocuments.length > 0);
                        return (
                          <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                            <td className="px-5 py-3.5 text-center text-xs font-bold text-slate-400">
                              {idx + 1}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2.5 pr-4">
                                {subDoc.subDocuments && subDoc.subDocuments.length > 0 ? (
                                  <FolderOpen className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                                ) : (
                                  getFileIcon(subDoc.url)
                                )}
                                <span className="text-slate-700 font-bold text-xs md:text-sm leading-relaxed">
                                  {subDoc.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-center text-xs font-bold text-slate-500 tracking-wide">
                              {subDoc.year || "---"}
                            </td>
                            <td className="px-5 py-3.5 text-center shrink-0">
                              {hasUrl && (
                                <button
                                  onClick={() => {
                                    if (subDoc.subDocuments && subDoc.subDocuments.length > 0) {
                                      // Push nested subpage
                                      setActiveSubpageData({
                                        metricNum: activeSubpageData.metricNum,
                                        label: subDoc.name,
                                        subDocuments: subDoc.subDocuments
                                      });
                                    } else if (subDoc.url) {
                                      openPdf(subDoc.url, `${activeSubpageData.metricNum} - ${subDoc.name}`);
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 hover:border-transparent text-[11px] font-black transition-all shadow-4xs"
                                >
                                  {subDoc.subDocuments && subDoc.subDocuments.length > 0 ? (
                                    <>
                                      <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                                      OPEN
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-3.5 w-3.5 shrink-0" />
                                      VIEW
                                    </>
                                  )}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          POPUP MODAL: INLINE PDF / MEDIA VIEWER (Renders in Iframe)
          ========================================================================= */}
      {activePdfUrl && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-slate-950/80 backdrop-blur-md animate-fade-in">
          {/* Backdrop Trigger Click to Close */}
          <div 
            onClick={() => setActivePdfUrl("")}
            className="absolute inset-0 pointer-events-none" 
          />

          {/* Modal Container (Full Screen Layout) */}
          <div className="relative bg-white w-screen h-screen flex flex-col overflow-hidden font-sans rounded-none shadow-2xl z-10 animate-scale-up">
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
                  <FileSpreadsheet className="h-16 w-16 text-emerald-450 animate-bounce" />
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
  );
};
