"use client";

import { useState } from "react";
import { ShieldCheck, Award, CheckCircle, FileText, X, Eye, Download, FileSpreadsheet, Landmark } from "lucide-react";

interface AisheCertification {
  _id: string;
  title: string;
  academicYear: string;
  fileUrl: string;
}

export function AisheCertifications({ aisheCertifications = [] }: { aisheCertifications?: AisheCertification[] }) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const defaultCertifications: AisheCertification[] = [
    {
      _id: "aishe-2024-2025",
      title: "AISHE Certificate 2024-2025",
      academicYear: "2024-2025",
      fileUrl: "/documents/aishe/1.AISCHE (MHRD ) Certificate 2024-2025.pdf"
    },
    {
      _id: "aishe-2023-2024",
      title: "AISHE Certificate 2023-2024",
      academicYear: "2023-2024",
      fileUrl: "/documents/aishe/2.AISCHE (MHRD ) Certificate 2023-2024.pdf"
    },
    {
      _id: "aishe-2022-2023",
      title: "AISHE Certificate 2022-2023",
      academicYear: "2022-2023",
      fileUrl: "/documents/aishe/3.AISCHE (MHRD) Certificate 2022-2023.pdf"
    },
    {
      _id: "aishe-2021-2022",
      title: "AISHE Certificate 2021-2022",
      academicYear: "2021-2022",
      fileUrl: "/documents/aishe/4.AISCHE (MHRD) Certificate 20221-2022.pdf"
    },
    {
      _id: "aishe-2020-2021",
      title: "AISHE Certificate 2020-2021",
      academicYear: "2020-2021",
      fileUrl: "/documents/aishe/5..AISCHE (MHRD ) Certificate 2020-2021.pdf"
    }
  ];

  const certificationsToUse = aisheCertifications && aisheCertifications.length > 0
    ? aisheCertifications
    : defaultCertifications;

  const sortedCertifications = [...certificationsToUse].sort((a, b) => b.academicYear.localeCompare(a.academicYear));

  const highlights = [
    "Certified under AISHE (All India Survey on Higher Education)",
    "Issued by the Ministry of Education, Government of India",
    "AISHE Reference No: C-39493-2024",
    "Successfully submitted survey data for the academic year 2024–2025",
    "Demonstrates commitment to academic excellence and institutional transparency",
  ];

  return (
    <div className="flex flex-col gap-10 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              AISHE Certification
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              St. Ann’s College for Women, Gorantla, has successfully submitted institutional data to the <strong className="text-white font-bold">All India Survey on Higher Education (AISHE)</strong>, conducted by the Ministry of Education, Government of India.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Landmark className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* AISHE Overview Narrative */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 shadow-sm">
            <FileSpreadsheet className="h-5 w-5" />
          </span>
          <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
            Survey Submission & Compliance
          </h3>
        </div>
        <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed font-normal">
          The AISHE certification reflects the institution’s commitment to maintaining transparency, quality standards, and accurate educational data reporting in the higher education system. Consistently providing precise stats ensures our metrics are well represented at the national policy planning level.
        </p>
      </div>

      {/* Key Highlights */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
          <Award className="h-5 w-5 text-indigo-600" /> Key Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-gradient-to-br from-slate-50/80 to-white border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300 group"
            >
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-sans text-sm font-semibold text-slate-700 leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AISHE Upload Verification Certificates */}
      {sortedCertifications.length > 0 && (
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" /> AISHE Upload Verification Certificates
          </h4>
          <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
            Click to view official upload confirmations issued by the Department of Higher Education.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedCertifications.map((order) => (
              <div
                key={order._id}
                className="group p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                    AY {order.academicYear}
                  </span>
                  <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                    {order.title}
                  </h5>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    MHRD - Ministry of Education Verified Record.
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 border-t border-slate-100/80 pt-4">
                  <button
                    onClick={() => setSelectedPdf(order.fileUrl)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-4 py-2.5 text-xs font-bold text-indigo-700 transition-all active:scale-95 select-none"
                  >
                    <Eye className="h-4 w-4" /> View PDF
                  </button>
                  <a
                    href={order.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all active:scale-95 select-none"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Popup Viewer */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </span>
                <h3 className="font-outfit text-base font-black text-slate-800 leading-tight">
                  AISHE Record Viewer
                </h3>
              </div>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all select-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Embedded iframe */}
            <div className="flex-1 bg-slate-50 p-4">
              <iframe
                src={`${selectedPdf}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-2xl border border-slate-200/60 shadow-sm bg-white"
                title="AISHE PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
