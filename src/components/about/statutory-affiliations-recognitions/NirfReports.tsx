"use client";

import { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle, FileText, X, Eye, Download, Users, Briefcase, RefreshCw, Layers } from "lucide-react";

interface NirfReport {
  _id: string;
  title: string;
  academicYear: string;
  category: string;
  fileUrl: string;
}

export function NirfReports({ nirfReports = [] }: { nirfReports?: NirfReport[] }) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // Grouping by year
  const groupedByYear: Record<string, NirfReport[]> = {};
  nirfReports.forEach((report) => {
    if (!groupedByYear[report.academicYear]) {
      groupedByYear[report.academicYear] = [];
    }
    groupedByYear[report.academicYear].push(report);
  });

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));

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
              NIRF Reports
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              National Institutional Ranking Framework
            </p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed font-normal text-slate-600">
          St. Ann’s College for Women has submitted its institutional data to the <strong className="text-indigo-600 font-bold">National Institutional Ranking Framework (NIRF), Ministry of Education, Government of India</strong>, reflecting its unwavering commitment to transparency, academic quality, and continuous improvement.
        </p>
      </div>

      {/* Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Institutional Highlights */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" /> Student Intake & Strength
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              The institution maintains a steady intake of quality applicants:
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 leading-relaxed font-normal">
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>UG Intake Capacity</span>
                </span>
                <span className="font-bold text-slate-500">425</span>
              </li>
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>PG Intake Capacity</span>
                </span>
                <span className="font-bold text-slate-500">120</span>
              </li>
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>Total UG Strength</span>
                </span>
                <span className="font-bold text-slate-500">794 Students</span>
              </li>
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>Total PG Strength</span>
                </span>
                <span className="font-bold text-slate-500">127 Students</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Career Outcomes & Quality */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" /> Career Readiness & Outcomes
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Significant outcomes in placements and higher studies:
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 font-normal">
              <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span>Up to 165 students placed in recent academic cycles.</span>
              </li>
              <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span>Median salary reaches up to ₹2.2 Lakhs per annum for UG.</span>
              </li>
              <li className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                <span>Steady career progressions and high rates of PG student enrollment.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <h5 className="font-outfit text-sm font-bold text-slate-800 mb-1">Accreditation status:</h5>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Fully NAAC Accredited institution with a CGPA of 3.09 valid through June 2029.
            </p>
          </div>
        </div>
      </div>

      {/* NIRF Document List Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" /> Annual Submission Records
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          Click to view inline data submissions for individual academic cycles.
        </p>

        <div className="flex flex-col gap-10">
          {sortedYears.map((year) => (
            <div key={year} className="border-b border-slate-100/80 pb-8 last:border-b-0">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Academic Year {year}
                </span>
                <span className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {groupedByYear[year].map((order) => (
                  <div
                    key={order._id}
                    className="group p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                        {order.title}
                      </h5>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">
                        {order.category} Category Data submission.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6 border-t border-slate-100/80 pt-4">
                      <button
                        onClick={() => setSelectedPdf(order.fileUrl)}
                        className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-3 py-2.5 text-xs font-bold text-indigo-700 transition-all active:scale-95 select-none"
                      >
                        <Eye className="h-4 w-4 shrink-0" /> View
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
                  NIRF Report Document Viewer
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
                title="NIRF Document PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
