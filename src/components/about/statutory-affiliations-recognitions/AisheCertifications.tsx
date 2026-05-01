"use client";

import { useState } from "react";
import { ShieldCheck, Award, CheckCircle, FileText, X, Eye, Download, FileSpreadsheet } from "lucide-react";

interface AisheCertification {
  _id: string;
  title: string;
  academicYear: string;
  fileUrl: string;
}

export function AisheCertifications({ aisheCertifications = [] }: { aisheCertifications?: AisheCertification[] }) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const sortedCertifications = [...aisheCertifications].sort((a, b) => b.academicYear.localeCompare(a.academicYear));

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Banner with Icon */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all font-sans text-slate-600 text-base md:text-lg leading-relaxed">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-outfit text-2xl font-black text-slate-800 leading-tight">
              AISHE Certification
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              All India Survey on Higher Education
            </p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed font-normal text-slate-600">
          St. Ann’s College for Women, Gorantla, Guntur, is recognized under the <strong className="text-indigo-600 font-bold">All India Survey on Higher Education (AISHE)</strong> conducted by the Ministry of Education, Government of India. The institution has consistently submitted its institutional data to AISHE over multiple academic years, reflecting transparency and compliance with national education standards.
        </p>
      </div>

      {/* Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core AISHE Importance */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" /> Purpose & Importance
          </h4>
          <p className="text-slate-500 text-xs md:text-sm font-medium mb-4">
            AISHE survey data collection directly helps structural planning.
          </p>
          <div className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed font-normal">
            <div className="flex items-start gap-2 border-b border-slate-50 pb-2">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Contributes to national educational policy frameworks and statistics.</span>
            </div>
            <div className="flex items-start gap-2 border-b border-slate-50 pb-2">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Maintains immense transparency and accountability in institutional reporting.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Provides verified data needed for development grants.</span>
            </div>
          </div>
        </div>

        {/* Commitment to Transparency */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-indigo-600" /> Accountability Standards
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Regular data updates directly ensure accurate and reliable reporting:
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span>Successful uploading and complete verification of all AISHE metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span>Validates multi-dimensional institutional monitoring and growth.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* AISHE Document List Block */}
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
