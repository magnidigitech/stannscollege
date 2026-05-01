"use client";

import { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle, FileText, X, Eye, Download } from "lucide-react";

interface AicteApproval {
  _id: string;
  title: string;
  academicYear: string;
  fileUrl: string;
}

export function AicteApprovals({ aicteApprovals = [] }: { aicteApprovals?: AicteApproval[] }) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const sortedApprovals = [...aicteApprovals].sort((a, b) => b.academicYear.localeCompare(a.academicYear));

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
              AICTE Approvals
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              All India Council for Technical Education
            </p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed font-normal text-slate-600">
          St. Ann’s College for Women, Gorantla, Guntur, is approved by the <strong className="text-indigo-600 font-bold">All India Council for Technical Education (AICTE)</strong> for the academic year <strong className="text-slate-800 font-bold">2026–2027</strong> under the Extension of Approval (EoA) process.
        </p>
      </div>

      {/* Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Approved Programmes */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" /> Approved Programmes
          </h4>
          <p className="text-slate-500 text-xs md:text-sm font-medium mb-4">
            Authorized programmes under AICTE & Acharya Nagarjuna University norms for the academic year 2026–2027.
          </p>
          <div className="flex flex-col gap-4 text-sm text-slate-600 leading-relaxed font-normal">
            <div>
              <h5 className="font-outfit text-sm font-black text-indigo-600 uppercase tracking-wide mb-2">Postgraduate (PG)</h5>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-1 border-b border-slate-50 pb-1.5">
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Master of Business Administration (MBA)
                  </span>
                  <span className="font-semibold text-slate-400">Intake: 60</span>
                </div>
                <div className="flex items-start justify-between gap-1 border-b border-slate-50 pb-1.5">
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Master of Computer Applications (MCA)
                  </span>
                  <span className="font-semibold text-slate-400">Intake: 60</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-outfit text-sm font-black text-indigo-600 uppercase tracking-wide mb-2">Undergraduate (UG)</h5>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-1 border-b border-slate-50 pb-1.5">
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" /> Bachelor of Computer Applications (BCA)
                  </span>
                  <span className="font-semibold text-slate-400">Intake: 60</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights & Compliance */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-600" /> Key Highlights & Compliance
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              AICTE approval is subject to strict adherence to regulations:
            </p>
            <ul className="flex flex-col gap-2 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Maintaining standard faculty–student ratio & infrastructure.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Publishing mandatory disclosures on the official website.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Mandatory internships, student welfare, and anti-ragging measures.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <h5 className="font-outfit text-sm font-bold text-slate-800 mb-1">Authorization Status:</h5>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Approved under the AICTE Act, 1987 as a Private - Self Financing Institution.
            </p>
          </div>
        </div>
      </div>

      {/* PDF Document List Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" /> AICTE EoA Documents List
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          View official Extension of Approval (EoA) certificates issued by the AICTE.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedApprovals.map((order) => (
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
                  All India Council for Technical Education Official EoA.
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
                  AICTE EoA Viewer
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
                title="AICTE Approval PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
