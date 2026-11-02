"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  CheckCircle, 
  FileText, 
  X, 
  Eye, 
  Download, 
  Landmark, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface DocumentItem {
  _id?: string;
  title: string;
  academicYear?: string;
  fileUrl: string;
}

interface ImageCertificateItem {
  _id?: string;
  title: string;
  category?: string;
  imageUrl: string;
}

interface StatutoryAffiliationsProps {
  anuAffiliations?: DocumentItem[];
  aicteApprovals?: DocumentItem[];
  naacCertificates?: ImageCertificateItem[];
}

export function StatutoryAffiliations({
  anuAffiliations = [],
  aicteApprovals = [],
  naacCertificates = [],
}: StatutoryAffiliationsProps) {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fallback documents for ANU Affiliations
  const defaultAnuDocs: DocumentItem[] = [
    { title: "ANU UG Affiliation Order 2025–2026", academicYear: "2025–2026", fileUrl: "/documents/affiliations/ANU_UG_Affiliation_2025-2026.pdf" },
    { title: "ANU PG Affiliation Order 2025–2026", academicYear: "2025–2026", fileUrl: "/documents/affiliations/ANU_PG_Affiliation_2025-2026.pdf" },
    { title: "ANU UG Affiliation Order 2024–2025", academicYear: "2024–2025", fileUrl: "/documents/affiliations/ANU_UG_Affiliation_2024-2025.pdf" },
    { title: "ANU PG Affiliation Order 2024–2025", academicYear: "2024–2025", fileUrl: "/documents/affiliations/ANU_PG_Affiliation_2024-2025.pdf" },
    { title: "ANU UG Affiliation Order 2023–2024", academicYear: "2023–2024", fileUrl: "/documents/affiliations/ANU_UG_Affiliation_2023-2024.pdf" },
    { title: "ANU PG Affiliation Order 2023–2024", academicYear: "2023–2024", fileUrl: "/documents/affiliations/ANU_PG_Affiliation_2023-2024.pdf" },
  ];

  // Fallback documents for AICTE Approvals
  const defaultAicteDocs: DocumentItem[] = [
    { title: "AICTE Approval Order 2026–2027", academicYear: "2026–2027", fileUrl: "/documents/aicte/AICTE_Approval_2026-2027.pdf" },
    { title: "AICTE Approval Order 2025–2026", academicYear: "2025–2026", fileUrl: "/documents/aicte/AICTE_Approval_2025-2026.pdf" },
    { title: "AICTE Approval Order 2024–2025", academicYear: "2024–2025", fileUrl: "/documents/aicte/AICTE_Approval_2024-2025.pdf" },
    { title: "AICTE Approval Order 2023–2024", academicYear: "2023–2024", fileUrl: "/documents/aicte/AICTE_Approval_2023-2024.pdf" },
    { title: "AICTE Approval Order 2022–2023", academicYear: "2022–2023", fileUrl: "/documents/aicte/AICTE_Approval_2022-2023.pdf" },
    { title: "AICTE Approval Order 2021–2022", academicYear: "2021–2022", fileUrl: "/documents/aicte/AICTE_Approval_2021-2022.pdf" },
  ];

  // Fallback documents for NAAC
  const defaultNaacDocs: ImageCertificateItem[] = [
    { title: "NAAC Accreditation Certificate", category: "NAAC Accreditation", imageUrl: "/documents/naac/NAAC Certificate.jpg" },
    { title: "Accreditation Score Card (CGPA 3.09)", category: "NAAC Evaluation", imageUrl: "/documents/naac/NAAC Score Card.jpg" },
    { title: "Letter of Communication", category: "Official Communication", imageUrl: "/documents/naac/NAAC Letter of Communication.jpg" },
    { title: "APSCHE Appreciation Letter – Page 1", category: "State Council Recognition", imageUrl: "/documents/naac/Appreciation Letter from APSCHE (Page 1).jpg" },
    { title: "APSCHE Appreciation Letter – Page 2", category: "State Council Recognition", imageUrl: "/documents/naac/Appreciation Letter from APSCHE (Page 2).jpg" },
  ];

  const anuList = anuAffiliations && anuAffiliations.length > 0 ? anuAffiliations : defaultAnuDocs;
  const aicteList = aicteApprovals && aicteApprovals.length > 0 ? aicteApprovals : defaultAicteDocs;
  const naacList = naacCertificates && naacCertificates.length > 0 ? naacCertificates : defaultNaacDocs;

  // Auto-scroll to anchor hash on mount or hash change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashScroll = () => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          const el = document.getElementById(hash);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      };

      handleHashScroll();
      window.addEventListener("hashchange", handleHashScroll);
      return () => window.removeEventListener("hashchange", handleHashScroll);
    }
  }, []);

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Narrative Section Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Section B • Statutory Affirmation
            </div>
            <h2 className="font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Affiliations, Approvals, Accreditation & Recognitions
            </h2>
            <p className="mt-3 text-indigo-100/90 text-sm md:text-base max-w-3xl font-normal leading-relaxed">
              St. Ann’s College for Women, Gorantla, Guntur is a recognized higher education institution committed to academic quality, regulatory compliance and institutional excellence.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Award className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: ANU AFFILIATION
      ========================================================================= */}
      <section id="anu" className="scroll-mt-36 flex flex-col gap-6">
        <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm shrink-0">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  Regulatory Affiliation
                </span>
                <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  Affiliated to: Acharya Nagarjuna University (ANU)
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-bold">
              <CheckCircle className="h-3.5 w-3.5" /> Permanent Affiliation
            </span>
          </div>

          <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mb-6">
            St. Ann’s College for Women, Gorantla, Guntur, is proudly affiliated with <strong className="text-slate-900 font-semibold">Acharya Nagarjuna University (ANU)</strong>, a NAAC ‘A’ Grade institution. All academic curricula, examination protocols, and degree frameworks strictly conform to university directives under continuous regulatory compliance.
          </p>

          {/* Academic Programmes Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5">
              <h4 className="font-outfit text-sm font-black text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-600" /> Undergraduate Programmes (UG)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600">
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (CS)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (Math)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (Physics)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (Chemistry)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (Statistics)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (Biotechnology)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Sc Honours (Microbiology)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> BCA Honours</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Com Honours (General)</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> B.Com (Computer Apps)</div>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5">
              <h4 className="font-outfit text-sm font-black text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-600" /> Postgraduate Programmes (PG)
              </h4>
              <div className="flex flex-col gap-3 text-xs md:text-sm text-slate-600">
                <div className="flex items-start justify-between border-b border-slate-200/50 pb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500" /> Master of Business Administration (MBA)
                  </span>
                  <span className="text-slate-500 font-semibold">Intake: 60 Seats</span>
                </div>
                <div className="flex items-start justify-between border-b border-slate-200/50 pb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-indigo-500" /> Master of Computer Applications (MCA)
                  </span>
                  <span className="text-slate-500 font-semibold">Intake: 120 Seats</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 italic">
                  *Conducted in accordance with ANU and AICTE approved academic schedules.
                </p>
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="border-t border-slate-100 pt-5">
            <h5 className="font-outfit text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-600" /> Official ANU Affiliation Orders
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {anuList.map((doc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                      {doc.academicYear || "Official Order"}
                    </span>
                    <h6 className="font-outfit font-bold text-slate-800 text-xs md:text-sm mt-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {doc.title}
                    </h6>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" /> View PDF
                    </button>
                    <a
                      href={doc.fileUrl}
                      download
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: AICTE APPROVAL
      ========================================================================= */}
      <section id="aicte" className="scroll-mt-36 flex flex-col gap-6">
        <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm shrink-0">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  Apex Technical Authority
                </span>
                <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  Approved by: All India Council for Technical Education (AICTE)
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 text-xs font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> EoA Certified
            </span>
          </div>

          <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mb-6">
            St. Ann’s College for Women is approved by the <strong className="text-slate-900 font-semibold">All India Council for Technical Education (AICTE)</strong>, New Delhi, for conducting professional postgraduate courses (MBA & MCA) under the annual Extension of Approval (EoA) framework, maintaining complete alignment with national technical education benchmarks.
          </p>

          {/* Approved Programmes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">Postgraduate Technical</span>
                <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mt-0.5">Master of Business Administration (MBA)</h5>
              </div>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-extrabold text-[#002147]">
                Intake: 60
              </span>
            </div>

            <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">Postgraduate Technical</span>
                <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base mt-0.5">Master of Computer Applications (MCA)</h5>
              </div>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-extrabold text-[#002147]">
                Intake: 120
              </span>
            </div>
          </div>

          {/* AICTE Documents */}
          <div className="border-t border-slate-100 pt-5">
            <h5 className="font-outfit text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-600" /> AICTE Extension of Approval (EoA) Documents
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aicteList.map((doc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-100 rounded-2xl transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                      {doc.academicYear || "AICTE EoA"}
                    </span>
                    <h6 className="font-outfit font-bold text-slate-800 text-xs md:text-sm mt-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {doc.title}
                    </h6>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedPdf({ url: doc.fileUrl, title: doc.title })}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" /> View PDF
                    </button>
                    <a
                      href={doc.fileUrl}
                      download
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: UGC 2(F)
      ========================================================================= */}
      <section id="ugc" className="scroll-mt-36 flex flex-col gap-6">
        <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm shrink-0">
                <Landmark className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  Central Commission Recognition
                </span>
                <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  Recognised under: Section 2(f) of the UGC Act, 1956
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 text-xs font-bold">
              <CheckCircle className="h-3.5 w-3.5" /> Statutory Status
            </span>
          </div>

          <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mb-6">
            St. Ann’s College for Women, Gorantla, Guntur, is formally recognized under <strong className="text-slate-900 font-semibold">Section 2(f) of the UGC Act, 1956</strong> by the <strong className="text-slate-900 font-semibold">University Grants Commission (UGC)</strong>, New Delhi. This statutory status confirms nationwide standing and enables active participation in key central higher education and developmental schemes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              "Recognized under Section 2(f) of UGC Act, 1956",
              "Affiliated to Acharya Nagarjuna University",
              "Established in the Year 1997",
              "Offers Bachelor's & Master's Degree Programmes",
              "Non-Government & Unaided Women’s Institution",
              "Recognized by University Grants Commission, New Delhi"
            ].map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-slate-50/70 border border-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                <CheckCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          {/* UGC Order Document Card */}
          <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-indigo-100 text-indigo-600 shadow-xs shrink-0">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight">
                  UGC Section 2(f) Statutory Recognition Order
                </h5>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  Official Gazette / Notification of UGC approval under Section 2(f).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setSelectedPdf({ url: "/documents/ugc/UGC_2f_Recognition_Order.pdf", title: "UGC Section 2(f) Recognition Order" })}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Eye className="h-4 w-4" /> View Order
              </button>
              <a
                href="/documents/ugc/UGC_2f_Recognition_Order.pdf"
                download
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: NAAC ACCREDITATION
      ========================================================================= */}
      <section id="naac" className="scroll-mt-36 flex flex-col gap-6">
        <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] shadow-sm shrink-0">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  National Quality Benchmark
                </span>
                <h3 className="font-outfit text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  Accredited by: National Assessment and Accreditation Council (NAAC) with ‘A’ Grade
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-bold">
              <Award className="h-3.5 w-3.5" /> Grade ‘A’ (CGPA 3.09)
            </span>
          </div>

          <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mb-6">
            The college was awarded the prestigious <strong className="text-slate-900 font-semibold">‘A’ Grade</strong> by the <strong className="text-slate-900 font-semibold">National Assessment and Accreditation Council (NAAC)</strong> with a <strong className="text-indigo-600 font-bold">CGPA of 3.09</strong> on June 30, 2024, accomplished in the very first cycle of accreditation. The Peer Team Visit (June 12–14, 2024) validated the institution&apos;s quality culture, curricular rigor, and exemplary student support frameworks.
          </p>

          {/* NAAC Certificates Gallery */}
          <div className="border-t border-slate-100 pt-5">
            <h5 className="font-outfit text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" /> Accreditation Certificates & Official Communications
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {naacList.map((doc, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(doc.imageUrl)}
                  className="p-3 bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-200 rounded-2xl transition-all cursor-pointer group shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div className="overflow-hidden rounded-xl border border-slate-200/80 aspect-[4/3] bg-white relative">
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 bg-white/90 backdrop-blur-xs rounded-xl text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                      {doc.category || "Official Document"}
                    </span>
                    <h6 className="font-outfit font-bold text-slate-800 text-xs md:text-sm mt-0.5 leading-snug">
                      {doc.title}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA: VIEW DETAILED STATUTORY DISCLOSURES
      ========================================================================= */}
      <div className="bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-indigo-950/20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase mb-2">
            Public Information Mandate
          </span>
          <h4 className="font-outfit text-xl md:text-2xl font-black">
            Detailed Statutory Disclosures
          </h4>
          <p className="text-xs md:text-sm text-indigo-100/80 mt-1 max-w-xl font-normal leading-relaxed">
            Access statutory returns, compliance reports, AICTE feedback, land certificates, and complete institutional disclosures as mandated by regulatory bodies.
          </p>
        </div>
        <Link
          href="/mandatory-disclosures"
          className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-[#002147] hover:bg-indigo-50 font-outfit text-sm font-black transition-all shadow-md hover:shadow-lg active:scale-95 group"
        >
          View Detailed Statutory Disclosures →
        </Link>
      </div>

      {/* =========================================================================
          MODALS FOR PDF AND IMAGE PREVIEW
      ========================================================================= */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-outfit text-sm md:text-base font-black text-slate-900 leading-tight">
                    {selectedPdf.title}
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Official Regulatory Document</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPdf.url}
                  download
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" /> Download
                </a>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 p-2 sm:p-4">
              <iframe
                src={`${selectedPdf.url}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-2xl border border-slate-200 bg-white"
                title={selectedPdf.title}
              />
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl p-3 shadow-2xl border border-white/20 flex flex-col cursor-default"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg z-10 transition-transform active:scale-90 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-auto rounded-2xl max-h-[82vh]">
              <img
                src={selectedImage}
                alt="Document Certificate"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
