"use client";

import React, { useState } from "react";
import { BookOpen, FileText, Download, CheckCircle, Layers, Sparkles, Award, ClipboardList } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import academicsData from "../academics-data.json";

export function CurriculumSyllabus() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  const data = academicsData.curriculumSyllabus;

  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-[#002147]" /> Academic Regulations &amp; Resources
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Programme-wise Syllabus &amp; Curriculum
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      {/* ===================== UNDERGRADUATE (UG) ===================== */}
      <div className="flex flex-col gap-8 border-t border-slate-200/60 pt-6">
        <div>
          <h3 className="font-outfit text-xl sm:text-2xl font-black text-[#002147]">Undergraduate (UG) Programmes</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Single Major framework, core minors, multidisciplinary, AECC &amp; skill courses</p>
        </div>

        {/* 1. UG Curriculum Framework - Current */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Layers className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  UG Curriculum Framework – Current
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  Single Major Honours Programmes framework w.e.f. Academic Year 2025–2026
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              w.e.f. A.Y. 2025–26
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Curriculum Framework</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700 border-r border-slate-200">Applicable From</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ugFrameworkCurrent.map((item, idx) => (
                  <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">{item.applicableFrom}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(item.title);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View / Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Previous UG Regulations / Curriculum Framework */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <BookOpen className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Previous UG Regulations / Curriculum Framework
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  Historical CBCS and earlier curriculum frameworks archive
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              Archive &amp; CBCS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Curriculum Framework / Regulations</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700 border-r border-slate-200">Applicable From</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ugFrameworkPrevious.map((item, idx) => (
                  <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-700 border-r border-slate-100">{item.applicableFrom}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} (${item.applicableFrom})`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View / Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Major Courses */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Award className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  UG Single Major Programmes Syllabus w.e.f 2025–2026
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  Total Credits for Three-Year UG Programme: 126 Credits | Major Courses: 15 Courses x 4 = 60 Credits
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              {data.ugSingleMajor.length} Major Disciplines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">UG Single Major Programmes</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Syllabus PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ugSingleMajor.map((item, idx) => (
                  <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} - Major Syllabus`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View / Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Minor Courses */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Layers className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Minor Courses
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  3 Years: 6 Courses x 4 Credits = 24 Credits
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              {data.minorCourses.length} Minor Courses
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Minor Title</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.minorCourses.map((item, idx) => (
                  <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} - Minor Syllabus`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Ability Enhancement Compulsory Courses (AECC) */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Ability Enhancement Compulsory Courses (AECC)
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  3 Years: 3 x 3 = 9 Courses x 2 Credits = 18 Credits
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              {data.aeccCourses.length} Courses
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.aeccCourses.map((item, idx) => (
                  <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} - AECC Syllabus`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Multidisciplinary Courses */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <BookOpen className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Multidisciplinary Courses
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  3 Years: 3 Courses x 2 Credits = 6 Credits
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              6 Credits Total
            </span>
          </div>

          <div className="p-6 flex flex-col gap-6 bg-slate-50/30">
            {/* Sem 1 notice */}
            <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs font-bold text-amber-900 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-200/70 text-amber-900 rounded-md uppercase tracking-wider text-[11px] font-black">Semester – I</span>
              <span>{data.multidisciplinaryCourses.sem1Note}</span>
            </div>

            {/* Sem 2 Table */}
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-[#002147] border-b border-[#001733] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Semester – II Courses (Choose 1)
                  </span>
                  <p className="text-xs text-blue-200/90 font-normal mt-0.5">
                    A student has to choose ONE course from among the six courses listed.
                  </p>
                </div>
                <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full w-fit">
                  6 Options
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                      <th className="py-3 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                      <th className="py-3 px-4 text-center font-bold text-slate-700">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.multidisciplinaryCourses.sem2.map((c, idx) => (
                      <tr key={c.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                        <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{c.sNo}</td>
                        <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{c.title}</td>
                        <td className="py-3 px-4 text-center font-semibold">
                          <button
                            onClick={() => {
                              setPreviewUrl(c.docUrl);
                              setPreviewTitle(`${c.title} - Multidisciplinary Sem II`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" /> View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sem 3 Table */}
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-[#002147] border-b border-[#001733] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Semester – III Courses (Choose 1)
                  </span>
                  <p className="text-xs text-blue-200/90 font-normal mt-0.5">
                    A student has to choose ONE course from among the six courses listed.
                  </p>
                </div>
                <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full w-fit">
                  6 Options
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                      <th className="py-3 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                      <th className="py-3 px-4 text-center font-bold text-slate-700">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.multidisciplinaryCourses.sem3.map((c, idx) => (
                      <tr key={c.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                        <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{c.sNo}</td>
                        <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{c.title}</td>
                        <td className="py-3 px-4 text-center font-semibold">
                          <button
                            onClick={() => {
                              setPreviewUrl(c.docUrl);
                              setPreviewTitle(`${c.title} - Multidisciplinary Sem III`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" /> View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sem 4 Table */}
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-[#002147] border-b border-[#001733] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Semester – IV Courses (Choose 1)
                  </span>
                  <p className="text-xs text-blue-200/90 font-normal mt-0.5">
                    A student has to choose ONE course from among the six courses listed.
                  </p>
                </div>
                <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full w-fit">
                  6 Options
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                      <th className="py-3 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                      <th className="py-3 px-4 text-center font-bold text-slate-700">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.multidisciplinaryCourses.sem4.map((c, idx) => (
                      <tr key={c.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                        <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{c.sNo}</td>
                        <td className="py-3 px-5 font-bold text-slate-900 border-r border-slate-100">{c.title}</td>
                        <td className="py-3 px-4 text-center font-semibold">
                          <button
                            onClick={() => {
                              setPreviewUrl(c.docUrl);
                              setPreviewTitle(`${c.title} - Multidisciplinary Sem IV`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" /> View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Skill Enhancement Courses */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Award className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Skill Enhancement Courses
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  2 AI Courses x 4 Credits = 8 Credits + 2 Other Courses x 2 Credits = 4 Credits | Total Credits: 12
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              12 Credits Total
            </span>
          </div>

          <div className="p-6 flex flex-col gap-6 bg-slate-50/30">
            {/* Sem 1 & Sem 2 Table */}
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-[#002147] border-b border-[#001733] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  Semester – I &amp; II Mandatory Courses
                </span>
                <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full w-fit">
                  2 Mandatory AI Courses
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3.5 px-5 whitespace-nowrap min-w-[150px] text-slate-700 font-bold border-r border-slate-200">Semester</th>
                      <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                      <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-5 font-bold whitespace-nowrap text-slate-700 border-r border-slate-100">Semester – I</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{data.skillCourses.sem1[0].title}</td>
                      <td className="py-3.5 px-4 text-center font-semibold">
                        <button
                          onClick={() => {
                            setPreviewUrl(data.skillCourses.sem1[0].docUrl);
                            setPreviewTitle(data.skillCourses.sem1[0].title);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" /> View PDF
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-5 font-bold whitespace-nowrap text-slate-700 border-r border-slate-100">Semester – II</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{data.skillCourses.sem2[0].title}</td>
                      <td className="py-3.5 px-4 text-center font-semibold">
                        <button
                          onClick={() => {
                            setPreviewUrl(data.skillCourses.sem2[0].docUrl);
                            setPreviewTitle(data.skillCourses.sem2[0].title);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" /> View PDF
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sem 3 & 4 Table */}
            <div className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-[#002147] border-b border-[#001733] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-outfit text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Semester – III &amp; IV Electives (Choose 1 each semester)
                  </span>
                  <p className="text-xs text-blue-200/90 font-normal mt-0.5">
                    A Student has to choose ONE course in Semester 3 and ONE course in Semester 4 from among the following courses.
                  </p>
                </div>
                <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full w-fit">
                  {data.skillCourses.sem3and4.length} Elective Options
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                      <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                      <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                      <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.skillCourses.sem3and4.map((c, idx) => (
                      <tr key={c.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                        <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{c.sNo}</td>
                        <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{c.title}</td>
                        <td className="py-3.5 px-4 text-center font-semibold">
                          <button
                            onClick={() => {
                              setPreviewUrl(c.docUrl);
                              setPreviewTitle(c.title);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" /> View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Value Added Course */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Value Added Course in V Semester
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  1 Course, 2 Credits
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              2 Credits
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Title</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.vacCourses.map((c: any, idx: number) => (
                  <tr key={c.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{c.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{c.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(c.docUrl);
                          setPreviewTitle(`${c.title} - Value Added Course`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. Community Service Project & Semester Internship */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <CheckCircle className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  Community Service Project &amp; Semester Internship / OJT
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  Mandatory field immersion and industrial on-the-job training
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              4 Credits Total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Programme / Project Stage</th>
                  <th className="py-3.5 px-5 font-bold text-slate-700 border-r border-slate-200">Duration &amp; Credits</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.cspAndInternship.map((c: any, idx: number) => (
                  <tr key={c.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{c.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{c.title}</td>
                    <td className="py-3.5 px-5 text-xs text-slate-600 font-medium border-r border-slate-100">{c.timing}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(c.docUrl);
                          setPreviewTitle(`${c.title} Guidelines`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===================== POSTGRADUATE (PG) ===================== */}
      <div className="flex flex-col gap-6 border-t border-slate-200/60 pt-6">
        <div>
          <h3 className="font-outfit text-xl sm:text-2xl font-black text-[#002147]">Postgraduate (PG) Programmes</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Complete programme-wise syllabus for AICTE professional cohorts</p>
        </div>

        <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#001733] bg-[#002147] text-white flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <ClipboardList className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-lg font-black text-white leading-tight">
                  PG Programme-wise Syllabus
                </h4>
                <p className="text-xs text-blue-200/90 font-medium mt-1">
                  Master of Computer Applications (MCA) &amp; Master of Business Administration (MBA)
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full">
              {data.pgSyllabus.length} Programmes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-[#002147] font-outfit uppercase tracking-wider text-[11px] font-bold border-b-2 border-slate-200">
                  <th className="py-3.5 px-3 text-center w-14 text-slate-600 font-bold border-r border-slate-200">S. No.</th>
                  <th className="py-3.5 px-5 min-w-[260px] text-[#002147] font-black border-r border-slate-200">Programme</th>
                  <th className="py-3.5 px-4 text-center font-bold text-slate-700">Complete Syllabus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.pgSyllabus.map((item, idx) => (
                  <tr key={item.sNo} className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40 transition-colors" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-100">{item.sNo}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-100">{item.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} - Complete Syllabus`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" /> View / Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Document Preview"}
      />
    </div>
  );
}
