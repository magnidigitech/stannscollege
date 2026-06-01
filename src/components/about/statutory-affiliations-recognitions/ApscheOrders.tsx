"use client";

import { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle, FileText, X, Eye, Download } from "lucide-react";

interface ApscheOrder {
  _id: string;
  title: string;
  academicYear: string;
  fileUrl: string;
}

export function ApscheOrders({ apscheOrders = [] }: { apscheOrders?: ApscheOrder[] }) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const sortedOrders = [...apscheOrders].sort((a, b) => b.academicYear.localeCompare(a.academicYear));

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <ShieldCheck className="h-3.5 w-3.5" /> Regulatory Affirmation
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              APSCHE Orders
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              The Andhra Pradesh State Council of Higher Education (APSCHE) has officially granted <strong className="text-white font-bold">provisional permission</strong> to St. Ann&apos;s College for Women, Guntur for the <strong className="text-white font-bold">conversion of existing undergraduate single major programmes</strong> under the revised curriculum framework for the academic year <strong className="text-white font-bold">2025–2026</strong>.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Award className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overview Block */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" /> Overview & Objective
          </h4>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
            This approval allows the institution to restructure its academic offerings in alignment with modern education standards and multidisciplinary learning. The conversion is applicable to both unaided and aided degree programmes, ensuring students gain access to updated and industry-relevant courses.
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            <strong>Objective:</strong> Aligning education with current industry and academic standards, promoting skill-based multidisciplinary learning, and enhancing student career opportunities and employability.
          </p>
        </div>

        {/* Key Academic Changes & Conditions */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
          <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" /> Key Academic Changes
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed font-normal">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Existing UG programmes reorganized into updated Honours programmes across various disciplines.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>New and revised courses: B.Sc Honours (Biotechnology, Microbiology, AI, Physics, Chemistry, Statistics, Math, CS), B.Com Honours (General & Computer Apps), BCA Honours.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
              <span>Sanctioned total capacity of 425 seats across balanced programmes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* PDF Document List Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" /> Statutory Order Documents
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          Official APSCHE communications and government mandates valid for upcoming academic years.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedOrders.map((order) => (
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
                  The Andhra Pradesh State Council of Higher Education Official Approval.
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
                  APSCHE Official Document Viewer
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
                title="APSCHE Orders PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
