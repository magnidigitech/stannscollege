"use client";

import React, { useState } from "react";
import { BookOpen, FileText, Download, CheckCircle, Layers, Sparkles, Award } from "lucide-react";
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
          <BookOpen className="h-4 w-4 text-[#002147]" /> Category B: Academic Regulations &amp; Resources
        </span>
        <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#002147]">
          Programme-wise Syllabus &amp; Curriculum
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl text-slate-700 text-sm md:text-base leading-relaxed font-medium">
        The College follows the prescribed curriculum and academic framework of the competent academic and statutory authorities and provides the complete programme-wise syllabus for Undergraduate (UG) and Postgraduate (PG) programmes. The syllabus documents include the applicable programme structure, courses, credits, course objectives, learning outcomes, scheme of instruction and evaluation.
      </div>

      {/* ===================== PART A: UNDERGRADUATE (UG) ===================== */}
      <div className="flex flex-col gap-8 border-t border-slate-200/60 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#002147] text-white flex items-center justify-center font-black">
            A
          </div>
          <div>
            <h3 className="font-outfit text-xl font-black text-[#002147]">Undergraduate (UG) Programmes</h3>
            <p className="text-xs text-slate-500 font-medium">Single Major framework, core minors, multidisciplinary, AECC &amp; skill courses</p>
          </div>
        </div>

        {/* 1. UG Curriculum Framework - Current */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02] flex items-center justify-between">
            <h4 className="font-outfit text-sm font-bold text-[#002147]">UG Curriculum Framework – Current</h4>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">w.e.f. A.Y. 2025–26</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-16 text-center">S. No.</th>
                  <th className="py-3.5 px-6">Curriculum Framework</th>
                  <th className="py-3.5 px-6 text-center">Applicable From</th>
                  <th className="py-3.5 px-6 text-center">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ugFrameworkCurrent.map((item) => (
                  <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{item.title}</td>
                    <td className="py-3.5 px-6 text-center font-semibold text-slate-600">{item.applicableFrom}</td>
                    <td className="py-3.5 px-6 text-center">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(item.title);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
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
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02] flex items-center justify-between">
            <h4 className="font-outfit text-sm font-bold text-[#002147]">Previous UG Regulations / Curriculum Framework</h4>
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Archive &amp; CBCS</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-16 text-center">S. No.</th>
                  <th className="py-3.5 px-6">Curriculum Framework / Regulations</th>
                  <th className="py-3.5 px-6 text-center">Applicable From</th>
                  <th className="py-3.5 px-6 text-center">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ugFrameworkPrevious.map((item) => (
                  <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{item.title}</td>
                    <td className="py-3.5 px-6 text-center font-semibold text-slate-600">{item.applicableFrom}</td>
                    <td className="py-3.5 px-6 text-center">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} (${item.applicableFrom})`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
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
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-outfit text-base font-bold text-[#002147]">UG Single Major Programmes Syllabus w.e.f 2025–2026</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Total Credits for Three-Year UG Programme: 126 Credits | Major Courses: 15 Courses x 4 = 60 Credits</p>
              </div>
              <span className="text-xs font-bold bg-[#002147]/10 text-[#002147] px-3 py-1 rounded-full w-fit">
                11 Major Disciplines
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-16 text-center">S. No.</th>
                  <th className="py-3.5 px-6">UG Single Major Programmes</th>
                  <th className="py-3.5 px-6 text-center">Syllabus PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ugSingleMajor.map((item) => (
                  <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{item.title}</td>
                    <td className="py-3.5 px-6 text-center">
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
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02]">
            <h4 className="font-outfit text-sm font-bold text-[#002147]">Minor Courses</h4>
            <p className="text-xs text-slate-500 font-medium">3 Years: 6 Courses x 4 Credits = 24 Credits</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-16 text-center">S. No.</th>
                  <th className="py-3.5 px-6">Minor Title</th>
                  <th className="py-3.5 px-6 text-center">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.minorCourses.map((item) => (
                  <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{item.title}</td>
                    <td className="py-3.5 px-6 text-center">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} - Minor Syllabus`);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
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
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-[#002147]/[0.02]">
            <h4 className="font-outfit text-sm font-bold text-[#002147]">Ability Enhancement Compulsory Courses (AECC)</h4>
            <p className="text-xs text-slate-500 font-medium">3 Years: 3 x 3 = 9 Courses x 2 Credits = 18 Credits</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-16 text-center">S. No.</th>
                  <th className="py-3.5 px-6">Title</th>
                  <th className="py-3.5 px-6 text-center">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.aeccCourses.map((item) => (
                  <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{item.title}</td>
                    <td className="py-3.5 px-6 text-center">
                      <button
                        onClick={() => {
                          setPreviewUrl(item.docUrl);
                          setPreviewTitle(`${item.title} - AECC Syllabus`);
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

        {/* 6. Multidisciplinary Courses */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col gap-4 p-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-outfit text-base font-bold text-[#002147]">Multidisciplinary Courses</h4>
            <p className="text-xs text-slate-500 font-medium">3 Years: 3 Courses x 2 Credits = 6 Credits</p>
          </div>

          {/* Sem 1 notice */}
          <div className="p-3.5 bg-amber-50 border border-amber-200/60 rounded-xl text-xs font-bold text-amber-900">
            <strong>Semester – I:</strong> {data.multidisciplinaryCourses.sem1Note}
          </div>

          {/* Sem 2 */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xs text-[#002147] uppercase tracking-wide">Semester – II Courses (Choose 1)</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              A student has to choose ONE course from among the six courses listed. Students are not permitted to choose repeat courses already undergone at the 12th class level or their chosen major.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-1">
              {data.multidisciplinaryCourses.sem2.map((c) => (
                <div key={c.sNo} className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{c.sNo}. {c.title}</span>
                  <button
                    onClick={() => {
                      setPreviewUrl(c.docUrl);
                      setPreviewTitle(`${c.title} - Multidisciplinary Sem II`);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold ml-2 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sem 3 */}
          <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
            <span className="font-bold text-xs text-[#002147] uppercase tracking-wide">Semester – III Courses (Choose 1)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-1">
              {data.multidisciplinaryCourses.sem3.map((c) => (
                <div key={c.sNo} className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{c.sNo}. {c.title}</span>
                  <button
                    onClick={() => {
                      setPreviewUrl(c.docUrl);
                      setPreviewTitle(`${c.title} - Multidisciplinary Sem III`);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold ml-2 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sem 4 */}
          <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
            <span className="font-bold text-xs text-[#002147] uppercase tracking-wide">Semester – IV Courses (Choose 1)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-1">
              {data.multidisciplinaryCourses.sem4.map((c) => (
                <div key={c.sNo} className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{c.sNo}. {c.title}</span>
                  <button
                    onClick={() => {
                      setPreviewUrl(c.docUrl);
                      setPreviewTitle(`${c.title} - Multidisciplinary Sem IV`);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold ml-2 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Skill Enhancement Courses */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col gap-4 p-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-outfit text-base font-bold text-[#002147]">Skill Enhancement Courses</h4>
            <p className="text-xs text-slate-500 font-medium">2 AI Courses x 4 Credits = 8 Credits + 2 Other Courses x 2 Credits = 4 Credits | Total Credits: 12</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Semester – I</span>
                <h5 className="font-bold text-sm text-slate-800 mt-0.5">Introduction to Artificial Intelligence</h5>
              </div>
              <button
                onClick={() => {
                  setPreviewUrl(data.skillCourses.sem1[0].docUrl);
                  setPreviewTitle("Introduction to Artificial Intelligence");
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
              >
                View PDF
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Semester – II</span>
                <h5 className="font-bold text-sm text-slate-800 mt-0.5">Applications of Artificial Intelligence</h5>
              </div>
              <button
                onClick={() => {
                  setPreviewUrl(data.skillCourses.sem2[0].docUrl);
                  setPreviewTitle("Applications of Artificial Intelligence");
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
              >
                View PDF
              </button>
            </div>
          </div>

          <div className="mt-2">
            <span className="font-bold text-xs text-[#002147] uppercase tracking-wide">Semester – III &amp; IV Electives (Choose 1 each semester)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {data.skillCourses.sem3and4.map((c) => (
                <div key={c.sNo} className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 truncate pr-1">{c.sNo}. {c.title}</span>
                  <button
                    onClick={() => {
                      setPreviewUrl(c.docUrl);
                      setPreviewTitle(c.title);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold shrink-0 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. Value Added Course, Community Project & Internship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Semester V – 2 Credits</span>
              <h4 className="font-outfit text-base font-bold text-[#002147] mt-1">Value Added Course</h4>
              <p className="text-xs text-slate-600 font-medium mt-1">Environment Education</p>
            </div>
            <button
              onClick={() => {
                setPreviewUrl(data.vacCourses[0].docUrl);
                setPreviewTitle("Environment Education - VAC");
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> View Syllabus
            </button>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">End of I Year – Summer Vacation</span>
              <h4 className="font-outfit text-base font-bold text-emerald-800 mt-1">Community Service Project</h4>
              <p className="text-xs text-slate-600 font-medium mt-1">Minimum 80 hours with 1 Credit</p>
            </div>
            <button
              onClick={() => {
                setPreviewUrl(data.cspAndInternship[0].docUrl);
                setPreviewTitle("Community Service Project Guidelines");
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> View Guidelines
            </button>
          </div>

          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">III Year – VI Semester</span>
              <h4 className="font-outfit text-base font-bold text-indigo-900 mt-1">Semester Internship / OJT</h4>
              <p className="text-xs text-slate-600 font-medium mt-1">Minimum 180 hours (8 weeks) with 3 Credits</p>
            </div>
            <button
              onClick={() => {
                setPreviewUrl(data.cspAndInternship[1].docUrl);
                setPreviewTitle("Semester Internship Guidelines");
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> View Guidelines
            </button>
          </div>
        </div>
      </div>

      {/* ===================== PART B: POSTGRADUATE (PG) ===================== */}
      <div className="flex flex-col gap-6 border-t border-slate-200/60 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-black">
            B
          </div>
          <div>
            <h3 className="font-outfit text-xl font-black text-[#002147]">Postgraduate (PG) Programmes</h3>
            <p className="text-xs text-slate-500 font-medium">Complete programme-wise syllabus for AICTE professional cohorts</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 w-16 text-center">S. No.</th>
                  <th className="py-4 px-6">Programme</th>
                  <th className="py-4 px-6 text-center">Complete Syllabus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.pgSyllabus.map((item) => (
                  <tr key={item.sNo} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                    <td className="py-4 px-6 font-bold text-slate-800">{item.title}</td>
                    <td className="py-4 px-6 text-center">
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

