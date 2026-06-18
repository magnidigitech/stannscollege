import React, { useEffect, useState } from "react";
import { staticResearchSections } from "./staticData";
import { getResearchSection } from "@/lib/sanity";
import { Download, FileText, X } from "lucide-react";

// PDF Fullscreen Preview Modal
const PdfModal = ({ url, title, onClose }: { url: string; title: string; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-3xl w-full h-full max-w-7xl flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <span className="font-outfit font-bold text-slate-800 text-base md:text-lg truncate max-w-md md:max-w-2xl">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl text-slate-650 shadow-xs transition-all flex items-center gap-1.5 px-4 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download
            </a>

            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all font-bold cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-100 p-2 md:p-4">
          <iframe
            src={`${url}#toolbar=1`}
            className="w-full h-full rounded-2xl border-none shadow-inner bg-white"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export const ContentRenderer = ({ slug }: { slug: string }) => {
  const [sanityData, setSanityData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  // Fallback metadata configurations
  const fallbackMetaMap: Record<string, { title: string; desc: string; docs: { title: string; fileUrl: string }[] }> = {
    "research-development-cell": {
      title: "Research Development Cell",
      desc: "St. Ann’s College for Women is committed to promoting a vibrant research culture that encourages innovation, academic excellence, ethical practices, and societal contribution.",
      docs: [
        { title: "Research & Development Cell Policy & Ethics", fileUrl: "/documents/research/1.research_development_celle_policy.pdf" }
      ]
    },
    "research-infrastructure": {
      title: "Research Infrastructure",
      desc: "Modern research laboratories, equipment, databases, and assets supporting scholarly activities.",
      docs: [
        { title: "Research Infrastructure Details", fileUrl: "/documents/research/4.research_infrastructure.pdf" }
      ]
    },
    "research-supervisors-scholars": {
      title: "Supervisors & Scholars",
      desc: "Details of active research guides and scholars pursuing doctoral research programs at the institution.",
      docs: [
        { title: "Research Supervisors & Scholars List", fileUrl: "/documents/research/3.research_supervisors_-scholars.pdf" }
      ]
    },
    "centres-of-excellence": {
      title: "Centres of Excellence",
      desc: "Specialized hubs focusing on advanced multidisciplinary areas to promote high-end research outputs.",
      docs: [
        { title: "Centres of Excellence Details", fileUrl: "/documents/research/7.centres_of_excellence.pdf" }
      ]
    },
    "patents-innovations": {
      title: "Patents & Innovations",
      desc: "Fostering creative designs, start-up ideas, prototypes, and patent filings across all departments.",
      docs: [
        { title: "Patents List 2024-2026", fileUrl: "/documents/research/patents2024-2025_-_2025-2026.pdf" },
        { title: "Patents & Innovations Policy", fileUrl: "/documents/research/5.patents.pdf" }
      ]
    },
    "funded-projects": {
      title: "Funded Projects",
      desc: "Grants, research assignments, and external funding details supporting academic research projects.",
      docs: [
        { title: "Funded Projects Details", fileUrl: "/documents/research/6.funded_projects.pdf" }
      ]
    },
    "ipr-cell": {
      title: "Intellectual Property Cell",
      desc: "Managing intellectual property rights, patent awareness sessions, and copyright clearances.",
      docs: [
        { title: "Intellectual Property Rights (IPR) Policy", fileUrl: "/documents/research/10.intellectual_property_rights_ipr_ploicy.pdf" },
        { title: "Intellectual Property Rights Committee", fileUrl: "/documents/research/8.intellectual_property_rights_ipr_policy_-_committee.pdf" }
      ]
    },
    "institution-innovation-cell": {
      title: "Institution Innovation Cell",
      desc: "Encouraging a collaborative ecosystem of student innovation challenges, project expos, and startup ideas.",
      docs: [
        { title: "Institution Innovation Cell Policy", fileUrl: "/documents/research/institution_innovation_cell_policy.pdf" },
        { title: "Institution Innovation Council Status", fileUrl: "/documents/research/9.institution_innovation_gouncil.pdf" }
      ]
    },
    "entrepreneurship-development": {
      title: "Entrepreneurship Development",
      desc: "Supporting the startup mindset and student incubation opportunities in modern areas of business.",
      docs: [
        { title: "Entrepreneurship Development Policy", fileUrl: "/documents/research/entrepreurship_policy.pdf" }
      ]
    }
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    getResearchSection(slug)
      .then((data) => {
        if (active) {
          setSanityData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching sanity data in ContentRenderer:", err);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-6">
          <div className="flex-1">
            <div className="h-8 w-60 bg-slate-200 rounded-lg mb-4" />
            <div className="h-1 w-20 bg-slate-200 rounded-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  const defaultMeta = fallbackMetaMap[slug] || { title: "", desc: "", docs: [] };
  const title = sanityData?.title || defaultMeta.title;
  const description = sanityData?.description || defaultMeta.desc;
  const content = sanityData?.content || staticResearchSections[slug]?.content || "";

  // Split lines and parse body nodes (skipping tables, links, images and specific headings matching "View PDF")
  const lines = content.split("\n");
  const nodes: { type: string; text: string }[] = [];
  let i = 0;

  while (i < lines.length) {
    const chunk = lines[i].trim();
    if (!chunk) {
      i++;
      continue;
    }

    // Skip tables completely
    if (chunk.startsWith("<table>") || chunk.includes("<table>")) {
      i++;
      while (i < lines.length && !lines[i].includes("</table>")) {
        i++;
      }
      i++;
      continue;
    }

    // Skip links completely
    if (chunk.startsWith("Link:")) {
      i++;
      continue;
    }

    // Skip images completely
    if (chunk.startsWith("<img")) {
      i++;
      continue;
    }

    // Skip custom headings matching "View PDF" to avoid redundant UI elements
    if (chunk.includes("View PDF") || chunk.includes("View Faculty Publications")) {
      i++;
      continue;
    }

    // Skip main title heading if it is identical to page title
    if (chunk.startsWith("__") && chunk.endsWith("__")) {
      const headingVal = chunk.slice(2, -2).trim().toLowerCase();
      const pageTitleVal = title.trim().toLowerCase();
      if (headingVal === pageTitleVal || headingVal === pageTitleVal.replace(/ & /g, ' / ')) {
        i++;
        continue;
      }
    }

    nodes.push({ type: "paragraph", text: chunk });
    i++;
  }

  const renderText = (text: string) => {
    return text.split(/(__.*?__|\*.*?\*|\[.*?\]\(.*?\))/g).map((part, idx) => {
      if (part.startsWith("__") && part.endsWith("__")) {
        return (
          <strong key={idx} className="font-bold text-slate-800">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={idx} className="italic text-slate-700">
            {part.slice(1, -1)}
          </em>
        );
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const linkUrl = linkMatch[2]?.trim();
        const linkLabel = linkMatch[1]?.trim();
        if (linkUrl) {
          return (
            <a
              key={idx}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors"
            >
              {linkLabel || "View Link"}
            </a>
          );
        } else {
          return <span key={idx}>{linkLabel || ""}</span>;
        }
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Choose documents from Sanity if config exists, otherwise fallback to mapped local files
  const rawDocs = sanityData?.documents || [];
  const docsList = rawDocs.length > 0 
    ? rawDocs.map((d: any) => ({ title: d.title || "Download Document", fileUrl: d.fileUrl }))
    : defaultMeta.docs;

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Title */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-outfit font-black text-[#002147] tracking-tight">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>
      </div>

      {/* Render Text Content (headings, lists, paragraphs) */}
      <div className="prose prose-slate max-w-none">
        {nodes.map((node, idx) => {
          const text = node.text;

          // Check if it is a list item
          if (text.startsWith("- ") || text.startsWith("* ")) {
            return (
              <div key={idx} className="flex gap-3 my-2 items-start pl-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                <p className="text-slate-650 leading-relaxed text-[15px] md:text-base m-0">
                  {renderText(text.replace(/^[-*]\s/, ""))}
                </p>
              </div>
            );
          }

          // Check if it is a heading
          if (text.startsWith("__") && text.endsWith("__")) {
            const hText = text.slice(2, -2);
            return (
              <h3 key={idx} className="text-xl md:text-2xl font-outfit font-bold text-slate-800 mt-8 mb-4 tracking-tight flex items-center gap-3">
                {hText}
              </h3>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-slate-655 leading-relaxed text-[15px] md:text-base mb-4">
              {renderText(text)}
            </p>
          );
        })}
      </div>

      {/* Documents Repository Section */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h3 className="text-xl font-outfit font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FileText className="h-5.5 w-5.5 text-emerald-600" />
          Documents & Reports
        </h3>

        {docsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {docsList.map((doc: any, idx: number) => {
              if (!doc.fileUrl) return null;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-slate-100/50 border border-slate-150 rounded-3xl p-6 flex flex-col justify-between gap-6 shadow-xs hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 bg-red-50 text-red-500 rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-outfit font-bold text-slate-800 text-base md:text-lg leading-tight group-hover:text-[#002147] transition-colors break-words">
                        {doc.title}
                      </h4>
                      <span className="text-xs font-semibold text-slate-400 mt-1.5 block uppercase tracking-wider">
                        PDF Document
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      View PDF
                    </button>
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center justify-center p-2.5 bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-slate-500 text-center border border-dashed border-slate-200 rounded-3xl mt-4">
            No documents found for this section.
          </div>
        )}
      </div>

      {/* PDF Modal Viewer */}
      {selectedPdf && (
        <PdfModal
          url={selectedPdf.url}
          title={selectedPdf.title}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </div>
  );
};
