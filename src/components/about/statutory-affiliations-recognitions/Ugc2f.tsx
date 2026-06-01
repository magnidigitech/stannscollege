"use client";

import { useState } from "react";
import { ShieldCheck, Award, CheckCircle, FileText, X, Eye, Download, Landmark, BookOpen } from "lucide-react";

export function Ugc2f() {
  const [showPdf, setShowPdf] = useState(false);

  const highlights = [
    "Recognized under Section 2(f) of the UGC Act, 1956",
    "Affiliated to Acharya Nagarjuna University",
    "Established in 1997",
    "Offers Bachelor's Degree Programs",
    "Non-Government & Unaided Institution",
    "Recognized by University Grants Commission (UGC), New Delhi",
  ];

  return (
    <div className="flex flex-col gap-10 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner – matching Institution section style */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <ShieldCheck className="h-3.5 w-3.5" /> Statutory Recognition
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              UGC 2(f) Recognition
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Official recognition under Section 2(f) of the University Grants Commission Act, 1956 — validating our commitment to nationwide educational standards.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Landmark className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* About UGC 2(f) - Narrative Card */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 shadow-sm">
            <BookOpen className="h-5 w-5" />
          </span>
          <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 leading-tight">
            About UGC 2(f) Recognition
          </h3>
        </div>
        <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed font-normal">
          St. Ann&apos;s College for Women, Gorantla, is recognized under <strong className="text-indigo-600 font-bold">Section 2(f) of the UGC Act, 1956</strong> by the <em className="text-slate-800 font-semibold not-italic">University Grants Commission (UGC), New Delhi</em>. The institution is affiliated to Acharya Nagarjuna University and has been included in the list of colleges approved under Section 2(f). The college was established in 1997 and is recognized as a non-government, unaided institution offering Bachelor&apos;s degree programs.
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

      {/* Document Section - View & Download */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg md:text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" /> Official Document
        </h3>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6">
          UGC 2(f) Recognition Certificate issued by the University Grants Commission, New Delhi.
        </p>

        <div className="group p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                UGC 2(f) Recognition Certificate – 2019
              </h5>
              <p className="text-xs text-slate-400 mt-0.5 font-semibold">
                University Grants Commission, New Delhi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPdf(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-5 py-2.5 text-xs font-bold text-indigo-700 transition-all active:scale-95 select-none"
            >
              <Eye className="h-4 w-4" /> View PDF
            </button>
            <a
              href="/documents/UGC 2(f) 2019.pdf"
              download
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-800 transition-all active:scale-95 select-none"
            >
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdf && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </span>
                <h3 className="font-outfit text-base font-black text-slate-800 leading-tight">
                  UGC 2(f) Recognition — Document Viewer
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/documents/UGC 2(f) 2019.pdf"
                  download
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 transition-all active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  onClick={() => setShowPdf(false)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all select-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF */}
            <div className="flex-1 bg-slate-50 p-4">
              <iframe
                src="/documents/UGC 2(f) 2019.pdf#toolbar=0&navpanes=0"
                className="w-full h-full rounded-2xl border border-slate-200/60 shadow-sm bg-white"
                title="UGC 2(f) Recognition Certificate PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
