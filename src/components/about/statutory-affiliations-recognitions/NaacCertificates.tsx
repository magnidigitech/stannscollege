"use client";

import { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle, FileText, X, Eye, Download, Image as ImageIcon } from "lucide-react";

interface NaacCertificate {
  _id: string;
  title: string;
  imageUrl: string;
}

export function NaacCertificates({ naacCertificates = [] }: { naacCertificates?: NaacCertificate[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              NAAC Accreditation
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              National Assessment and Accreditation Council
            </p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed font-normal text-slate-600">
          St. Ann’s College for Women, Gorantla, Guntur, is proudly accredited by the <strong className="text-indigo-600 font-bold">National Assessment and Accreditation Council (NAAC)</strong>, an autonomous institution of the University Grants Commission (UGC), Government of India.
        </p>
      </div>

      {/* Narrative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Accreditation Status */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-600" /> Accreditation Status
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              The institution has been awarded an excellent grade:
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 leading-relaxed font-normal">
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>NAAC Grade</span>
                </span>
                <span className="font-black text-indigo-600 text-base">A</span>
              </li>
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>CGPA</span>
                </span>
                <span className="font-bold text-slate-700">3.09 <span className="text-xs font-medium text-slate-400">(on a 4-point scale)</span></span>
              </li>
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>Accreditation Date</span>
                </span>
                <span className="font-semibold text-slate-500">June 30, 2024</span>
              </li>
              <li className="flex items-start justify-between border-b border-slate-50 pb-1.5 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>Validity</span>
                </span>
                <span className="font-semibold text-slate-500">Up to June 29, 2029</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              St. Ann&apos;s College for Women holds a lifelong pledge to continuous quality enhancement and rigorous student support standards.
            </p>
          </div>
        </div>

        {/* Focus on Assessment Criteria */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" /> Key Assessment Criteria
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              Our high academic distinction rests on multiple quality parameters:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs md:text-sm text-slate-600 font-normal">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Curricular Aspects</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Teaching & Learning</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Research & Innovation</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Learning Resources</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Student Support</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Governance & Leadership</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <h5 className="font-outfit text-sm font-bold text-slate-800 mb-1">Continuous Quality Assurance:</h5>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Regularly submits the Annual Quality Assurance Report (AQAR) and strictly adheres to NAAC mandates.
            </p>
          </div>
        </div>
      </div>

      {/* Official Certificate Documents Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-indigo-600" /> NAAC Certificates & Records
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6 select-none">
          Click to view certified documentation and scorecards directly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {naacCertificates.map((doc) => (
            <div
              key={doc._id}
              className="group p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                  {doc.title}
                </h5>
                <p className="text-xs text-slate-400 mt-1 font-semibold">
                  Official verified record file.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-6 border-t border-slate-100/80 pt-4">
                <button
                  onClick={() => setSelectedImage(doc.imageUrl)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100/60 hover:border-indigo-200/80 px-3 py-2.5 text-xs font-bold text-indigo-700 transition-all active:scale-95 select-none"
                >
                  <Eye className="h-4 w-4 shrink-0" /> View Image
                </button>
                <a
                  href={doc.imageUrl}
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
      {selectedImage && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/60 text-indigo-600">
                  <ImageIcon className="h-4 w-4" />
                </span>
                <h3 className="font-outfit text-base font-black text-slate-800 leading-tight">
                  NAAC Record Viewer
                </h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all select-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Embedded image */}
            <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center overflow-auto select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="NAAC Document"
                className="max-h-full max-w-full rounded-2xl border border-slate-200/60 shadow-sm bg-white select-none object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
