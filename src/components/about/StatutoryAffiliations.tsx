"use client";

import { useState } from "react";
import { ShieldCheck, Award, GraduationCap, CheckCircle, FileText, X, Eye, Download } from "lucide-react";

interface ApscheOrder {
  _id: string;
  title: string;
  academicYear: string;
  fileUrl: string;
}

export function StatutoryAffiliations({
  itemSlug,
  apscheOrders = [],
}: {
  itemSlug: string;
  apscheOrders?: ApscheOrder[];
}) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const sections: Record<string, { title: string; content: string; extra?: string }> = {
    "apsche-orders": {
      title: "APSCHE Orders",
      content: "The Andhra Pradesh State Council of Higher Education (APSCHE) has officially granted provisional permission to St. Ann's College for Women, Guntur for the conversion of existing undergraduate single major programmes under the revised curriculum framework.",
      extra: "Fully aligns with the multidisciplinary standards of higher education.",
    },
    "anu-affiliation-orders-ug-pg": {
      title: "ANU Affiliation Orders (UG & PG)",
      content: "St. Ann’s is permanently affiliated with Acharya Nagarjuna University (ANU). All academic rules, examination procedures, and degree frameworks conform perfectly to university directives.",
      extra: "Official affiliation certificates are valid up to the latest 2021-2026 cycles.",
    },
    "aicte-approvals": {
      title: "AICTE Approvals",
      content: "Our higher postgraduate courses (specifically MBA & MCA programs) operate under continuous verification and complete approval from the All India Council for Technical Education (AICTE), New Delhi.",
      extra: "Strict compliance with intake limits, teaching standards, and laboratory prerequisites.",
    },
    "ugc-2f": {
      title: "UGC 2(f)",
      content: "Recognized under Section 2(f) of the UGC Act, 1956. This certification enables participation in key developmental projects and supports higher institutional visibility.",
      extra: "Validates our commitment to upholding nationwide educational standards.",
    },
    "aishe-certificates": {
      title: "AISHE (MHRD) Certificates",
      content: "We strictly participate in the All India Survey on Higher Education (AISHE). Our AISHE code is C-32612.",
      extra: "Ensures comprehensive reporting and transparent tracking with the Ministry of Education.",
    },
    "naac-accreditation": {
      title: "NAAC Accreditation",
      content: "The college has achieved prestigious accreditation from the National Assessment and Accreditation Council (NAAC) with 'A' grade in the First Cycle.",
      extra: "Reflects academic and physical excellence across core criteria.",
    },
    "nirf": {
      title: "NIRF Reports",
      content: "Data submitted under the National Institutional Ranking Framework (NIRF) showcases our commitment to teaching outcomes, placement success, and inclusive education.",
      extra: "Upholds transparency through consistent public data presentation.",
    },
  };

  const active = sections[itemSlug] || {
    title: "Statutory Affiliations",
    content: "Official recognition and compliance with all leading higher education bodies in the state and country.",
    extra: "Upholds administrative transparency and continuous quality improvements.",
  };

  // Content for APSCHE page specifically
  if (itemSlug === "apsche-orders") {
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
                APSCHE Orders
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Official Regulatory Affirmation
              </p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed font-normal text-slate-600">
            The Andhra Pradesh State Council of Higher Education (APSCHE) has officially granted <strong className="text-indigo-600 font-bold">provisional permission</strong> to <em className="text-slate-800 font-semibold not-italic">St. Ann’s College for Women, Guntur</em> for the <strong className="text-indigo-600 font-bold">conversion of existing undergraduate single major programmes</strong> under the revised curriculum framework for the academic year <strong className="text-slate-800 font-bold">2025–2026</strong>.
          </p>
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
            {apscheOrders.map((order) => (
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

  return (
    <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all font-sans text-slate-600 text-base md:text-lg leading-relaxed">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-outfit text-2xl font-black text-slate-800 leading-tight">
            {active.title}
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            Official Affirmation
          </p>
        </div>
      </div>
      <p className="mt-4 leading-relaxed font-normal text-slate-600">
        {active.content}
      </p>
      {active.extra && (
        <div className="mt-6 flex items-start gap-2.5 p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
          <p className="font-sans text-xs font-semibold text-slate-500 leading-normal">
            {active.extra}
          </p>
        </div>
      )}
    </div>
  );
}
