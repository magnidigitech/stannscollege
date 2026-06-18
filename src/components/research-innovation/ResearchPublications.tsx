import React, { useEffect, useState } from "react";
import { getResearchPublications } from "@/lib/sanity";
import { Download, GraduationCap, Users, Award, BookOpen, CheckCircle, FileText, X } from "lucide-react";

interface PublicationDoc {
  title: string;
  category: "faculty" | "student" | "presentations";
  fileUrl: string;
}

interface ResearchPublicationsData {
  title?: string;
  description?: string;
  documents?: PublicationDoc[];
}

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

export const ResearchPublications = () => {
  const [sanityData, setSanityData] = useState<ResearchPublicationsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    let active = true;
    getResearchPublications()
      .then((data) => {
        if (active) {
          setSanityData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading publications", err);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const documents = sanityData?.documents || [];
  const facultyDocs = documents.filter((doc) => doc.category === "faculty");
  const studentDocs = documents.filter((doc) => doc.category === "student");
  const presentationDocs = documents.filter((doc) => doc.category === "presentations");

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
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="h-48 bg-slate-200 rounded-3xl" />
          <div className="h-48 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header and Title */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-outfit font-black text-[#002147] tracking-tight">
            {sanityData?.title || "Research Publications"}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>
      </div>

      {/* Intro Description */}
      <p className="text-slate-650 leading-relaxed text-[15px] md:text-base">
        {sanityData?.description ||
          "St. Ann’s College for Women encourages faculty members and students to actively engage in research, academic writing, innovation, and scholarly publication activities in alignment with the guidelines of the University Grants Commission, NAAC quality indicators, and NEP-2020."}
      </p>
      {!sanityData?.description && (
        <p className="text-slate-650 leading-relaxed text-[15px] md:text-base -mt-4">
          The institution promotes publication of quality research work in peer-reviewed, UGC CARE-listed, Scopus-indexed, and reputed national and international journals to strengthen academic excellence, research visibility, and knowledge dissemination.
        </p>
      )}

      {/* Publications Cards Grid/Stack */}
      <div className="flex flex-col gap-8 mt-4">
        {/* Card 1: Faculty Publications */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50/50 rounded-bl-full flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform">
            <Users className="h-8 w-8 text-emerald-655/30 -translate-x-2 translate-y-2" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Users className="h-5 w-5" />
              </span>
              Faculty Publications
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] md:text-base mt-2">
              Faculty members are encouraged to publish research papers, articles, books, book chapters, and case studies in reputed journals and academic publications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
            {[
              "Publications in Peer-Reviewed and UGC CARE-Listed Journals",
              "Scopus and Indexed Journal Publications",
              "Books and Edited Volumes",
              "Book Chapters and Conference Papers",
              "Interdisciplinary and Collaborative Research Publications",
              "Research Articles with Social and Community Relevance",
              "Publications related to Innovation, Entrepreneurship, and Emerging Areas",
            ].map((point, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span className="text-slate-655 text-sm md:text-[15px]">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm italic">
            The College motivates faculty members to participate in research-oriented academic activities and provides guidance for enhancing research quality and publication ethics.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {facultyDocs.length > 0 ? (
              facultyDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                    className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    View PDF: {doc.title}
                  </button>
                  <a
                    href={doc.fileUrl}
                    download
                    className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-650 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setSelectedPdf({
                      url: "/documents/research/reearch_publications_from_2024-2025_-_2025-2026.pdf",
                      title: "Faculty Publications (PDF)",
                    })
                  }
                  className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  View Faculty Publications (PDF)
                </button>
                <a
                  href="/documents/research/reearch_publications_from_2024-2025_-_2025-2026.pdf"
                  download
                  className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-650 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Student Publications */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-teal-50/50 rounded-bl-full flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform">
            <GraduationCap className="h-8 w-8 text-teal-655/30 -translate-x-2 translate-y-2" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                <GraduationCap className="h-5 w-5" />
              </span>
              Student Publications
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] md:text-base mt-2">
              The institution encourages students to develop research aptitude and academic writing skills through project works, surveys, and conference presentations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
            {[
              "Student Research Projects",
              "Seminar Papers and Presentations",
              "Poster Presentations and Project Expos",
              "Publication of Student Research Articles",
              "Participation in Conferences and Academic Competitions",
              "Field Studies, Surveys, and Community-Based Research Activities",
            ].map((point, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span className="text-slate-655 text-sm md:text-[15px]">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm italic">
            Students are guided by faculty mentors to undertake innovative, socially relevant, and interdisciplinary research activities.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {studentDocs.length > 0 ? (
              studentDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                    className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    View PDF: {doc.title}
                  </button>
                  <a
                    href={doc.fileUrl}
                    download
                    className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-655 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setSelectedPdf({
                      url: "/documents/research/2.research_publications.pdf",
                      title: "Student Publications (PDF)",
                    })
                  }
                  className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  View Student Publications (PDF)
                </button>
                <a
                  href="/documents/research/2.research_publications.pdf"
                  download
                  className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-655 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Journals, Books & Book Chapters */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform">
            <BookOpen className="h-8 w-8 text-indigo-655/30 -translate-x-2 translate-y-2" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen className="h-5 w-5" />
              </span>
              Journals, Books & Book Chapters
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] md:text-base mt-2">
              Faculty members contribute significantly to academic advancement by authoring research and educational literature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
            {[
              "Publication of Textbooks and Reference Books",
              "Edited Books and ISBN Publications",
              "Book Chapters in National and International Publications",
              "Departmental Journals and Academic Magazines",
              "Research Articles in Reputed Journals",
            ].map((point, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span className="text-slate-655 text-sm md:text-[15px]">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm italic">
            The institution encourages scholarly writing and dissemination of knowledge across various disciplines.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {facultyDocs.length > 0 ? (
              facultyDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                    className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    View PDF: {doc.title}
                  </button>
                  <a
                    href={doc.fileUrl}
                    download
                    className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-650 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setSelectedPdf({
                      url: "/documents/research/research_books_publication2024-25_-_25-26.pdf",
                      title: "Faculty Publications (PDF)",
                    })
                  }
                  className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  View Faculty Publications (PDF)
                </button>
                <a
                  href="/documents/research/research_books_publication2024-25_-_25-26.pdf"
                  download
                  className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-650 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Conference Proceedings */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-amber-50/50 rounded-bl-full flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform">
            <Award className="h-8 w-8 text-amber-655/30 -translate-x-2 translate-y-2" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-outfit font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Award className="h-5 w-5" />
              </span>
              Conference Proceedings
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] md:text-base mt-2">
              Faculty and students actively participate in global and national forums to exchange scientific achievements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
            {[
              "National Conferences",
              "International Conferences",
              "Seminars and Symposiums",
              "Workshops and FDPs",
              "Research Paper Presentations",
            ].map((point, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span className="text-slate-655 text-sm md:text-[15px]">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm italic">
            Research papers presented in conferences are published in conference proceedings and academic compilations.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {presentationDocs.length > 0 ? (
              presentationDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                    className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    View PDF: {doc.title}
                  </button>
                  <a
                    href={doc.fileUrl}
                    download
                    className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-650 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setSelectedPdf({
                      url: "/documents/research/research_in_confenrece_2024-2025_-_2025-2026.pdf",
                      title: "Paper Presentations (PDF)",
                    })
                  }
                  className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002147] hover:bg-[#002147]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  View Paper Presentations (PDF)
                </button>
                <a
                  href="/documents/research/research_in_confenrece_2024-2025_-_2025-2026.pdf"
                  download
                  className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 text-slate-650 hover:border-emerald-500 hover:text-emerald-600 rounded-xl shadow-xs transition-all cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Card 5: Citation & Research Impact */}
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-outfit font-bold text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-[#002147] rounded-xl">
                <CheckCircle className="h-5 w-5" />
              </span>
              Citation & Research Impact
            </h3>
            <p className="text-slate-600 text-sm md:text-[15px] mt-2">
              The institution encourages faculty members to maintain academic research profiles and improve research visibility through:
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "Google Scholar Profiles",
              "ORCID ID Registration",
              "VIDWAN Profiles",
              "Scopus Author Profiles",
              "ResearchGate Profiles",
            ].map((profile, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white border border-slate-200/60 rounded-xl text-xs font-bold text-slate-600 shadow-xs hover:border-blue-400 hover:text-blue-600 transition-colors duration-200"
              >
                {profile}
              </span>
            ))}
          </div>
          <div className="border-t border-slate-200/60 pt-4">
            <span className="font-bold text-slate-800 text-sm block mb-3 uppercase tracking-wider">
              Research impact is assessed through:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
              {[
                "Citation Index",
                "h-index and i10-index",
                "Quality Publications",
                "Research Collaborations",
                "Academic Recognition and Awards",
              ].map((metric, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-slate-655 text-sm md:text-[15px]">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 6: Institutional Support */}
        <div className="bg-[#002147] text-white rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 pointer-events-none group-hover:scale-105 transition-transform">
            <BookOpen className="h-48 w-48" />
          </div>
          <h3 className="text-xl font-outfit font-black tracking-tight">Institutional Support</h3>
          <p className="text-blue-100/90 text-sm md:text-[15px] leading-relaxed">
            The college continuously strives to strengthen research productivity, innovation, and scholarly contribution for academic excellence and societal development through comprehensive support mechanisms:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              "Research Methodology Workshops",
              "Publication Guidance and Mentoring",
              "Awareness Programmes on Publication Ethics and Plagiarism",
              "Financial Support for Conferences and Publications",
              "Access to E-Resources, Journals, and Digital Databases",
              "Encouragement for Collaborative and Interdisciplinary Research",
            ].map((support, i) => (
              <div key={i} className="flex gap-2.5 items-center bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-100">{support}</span>
              </div>
            ))}
          </div>
        </div>
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
