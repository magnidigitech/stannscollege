"use client";

import { CheckCircle, GraduationCap, BookOpen, ClipboardList } from "lucide-react";

export function UndergraduateProgrammes() {
  const intakeData = [
    { sNo: 1, programme: "B.Com Honours - General", convener: 14, management: 6, total: 20 },
    { sNo: 2, programme: "B.Com Honours - Computer Applications", convener: 56, management: 24, total: 80 },
    { sNo: 3, programme: "BCA Honours - Computer Applications", convener: 42, management: 18, total: 60 },
    { sNo: 4, programme: "B.Sc Honours - Computer Science", convener: 25, management: 10, total: 35 },
    { sNo: 5, programme: "B.Sc Honours - Artificial Intelligence", convener: 42, management: 18, total: 60 },
    { sNo: 6, programme: "B.Sc Honours - Mathematics", convener: 18, management: 7, total: 25 },
    { sNo: 7, programme: "B.Sc Honours - Physics", convener: 18, management: 7, total: 25 },
    { sNo: 8, programme: "B.Sc Honours - Statistics", convener: 18, management: 7, total: 25 },
    { sNo: 9, programme: "B.Sc Honours - Microbiology", convener: 18, management: 7, total: 25 },
    { sNo: 10, programme: "B.Sc Honours - Biotechnology", convener: 18, management: 7, total: 25 },
    { sNo: 11, programme: "B.Sc Honours - Chemistry", convener: 14, management: 6, total: 20 },
    { sNo: 12, programme: "B.Sc Honours - Botany", convener: 18, management: 7, total: 25 },
  ];

  const totalConvener = intakeData.reduce((acc, item) => acc + item.convener, 0);
  const totalManagement = intakeData.reduce((acc, item) => acc + item.management, 0);
  const totalIntake = intakeData.reduce((acc, item) => acc + item.total, 0);

  const features = [
    "Flexibility to explore multiple disciplines",
    "Interdisciplinary and skill-oriented learning",
    "Enhanced career opportunities and academic progression",
    "Alignment with modern higher education frameworks",
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Academic Programmes
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Undergraduate Programmes (UG)
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        UG Honours programmes follow a <span className="text-[#002147] font-bold">Single Major with One Minor structure</span> (from A.Y. 2023–24), promoting interdisciplinary and flexible learning.
      </p>

      {/* Programme Structure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col gap-3 hover:border-[#002147]/20 transition-all">
          <div className="h-10 w-10 rounded-2xl bg-[#002147]/5 flex items-center justify-center text-[#002147] border border-[#002147]/10">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-base font-bold text-[#002147]">Major Subject</h3>
          <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
            Core specialization chosen by the student as their primary area of study.
          </p>
        </div>

        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col gap-3 hover:border-[#002147]/20 transition-all">
          <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h3 className="font-outfit text-base font-bold text-slate-800">Minor Subject</h3>
          <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
            Complementary discipline chosen to enhance interdisciplinary perspective and broaden skill sets.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-3xl p-6 md:p-8">
        <h3 className="font-outfit text-lg font-bold text-[#002147] mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-600" /> Key Features
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium text-xs md:text-sm leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-[#002147] mt-2 flex-shrink-0"></span>
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Programme Intake & Admission Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="h-8 w-8 rounded-lg bg-[#002147] flex items-center justify-center text-white">
            <ClipboardList className="h-4 w-4" />
          </div>
          <h3 className="font-outfit text-base font-bold text-[#002147]">Programme Intake & Admission Details</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center w-16">S.No</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider">Programme</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">Convener Quota</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">Management Quota</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center bg-[#002147]/5 text-[#002147]">Total Intake</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {intakeData.map((item) => (
                <tr key={item.sNo} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 text-center font-bold text-slate-400">{item.sNo}</td>
                  <td className="py-4 px-6 font-bold text-slate-700">{item.programme}</td>
                  <td className="py-4 px-6 text-center font-semibold text-slate-600">{item.convener}</td>
                  <td className="py-4 px-6 text-center font-semibold text-slate-600">{item.management}</td>
                  <td className="py-4 px-6 text-center font-bold text-[#002147] bg-[#002147]/[0.02]">{item.total}</td>
                </tr>
              ))}
              <tr className="bg-slate-50/50 border-t-2 border-slate-100">
                <td colSpan={2} className="py-4 px-6 font-black text-[#002147] text-right text-sm">Grand Total</td>
                <td className="py-4 px-6 text-center font-black text-[#002147] text-sm">{totalConvener}</td>
                <td className="py-4 px-6 text-center font-black text-[#002147] text-sm">{totalManagement}</td>
                <td className="py-4 px-6 text-center font-black text-white bg-[#002147] text-sm rounded-br-xl">{totalIntake}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
