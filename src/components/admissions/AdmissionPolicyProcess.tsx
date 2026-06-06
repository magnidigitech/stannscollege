"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, FileText, Users, ClipboardCheck, Landmark, GraduationCap, ShieldCheck, Eye, Download } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getAcademicProgrammes } from "@/lib/sanity";

const fallbackUgIntake = [
  { sNo: 1, name: "B.Com Honours - General", convenerQuota: 14, managementQuota: 6, totalIntake: 20 },
  { sNo: 2, name: "B.Com Honours - Computer Applications", convenerQuota: 56, managementQuota: 24, totalIntake: 80 },
  { sNo: 3, name: "BCA Honours - Computer Applications", convenerQuota: 42, managementQuota: 18, totalIntake: 60 },
  { sNo: 4, name: "B.Sc Honours - Computer Science", convenerQuota: 25, managementQuota: 10, totalIntake: 35 },
  { sNo: 5, name: "B.Sc Honours - Artificial Intelligence", convenerQuota: 42, managementQuota: 18, totalIntake: 60 },
  { sNo: 6, name: "B.Sc Honours - Mathematics", convenerQuota: 18, managementQuota: 7, totalIntake: 25 },
  { sNo: 7, name: "B.Sc Honours - Physics", convenerQuota: 18, managementQuota: 7, totalIntake: 25 },
  { sNo: 8, name: "B.Sc Honours - Statistics", convenerQuota: 18, managementQuota: 7, totalIntake: 25 },
  { sNo: 9, name: "B.Sc Honours - Microbiology", convenerQuota: 18, managementQuota: 7, totalIntake: 25 },
  { sNo: 10, name: "B.Sc Honours - Biotechnology", convenerQuota: 18, managementQuota: 7, totalIntake: 25 },
  { sNo: 11, name: "B.Sc Honours - Chemistry", convenerQuota: 14, managementQuota: 6, totalIntake: 20 },
  { sNo: 12, name: "B.Sc Honours - Botany", convenerQuota: 18, managementQuota: 7, totalIntake: 25 },
];

const fallbackPgIntake = [
  { sNo: 1, name: "Master of Computer Applications (MCA)", convenerQuota: 42, managementQuota: 18, totalIntake: 60 },
  { sNo: 2, name: "Master of Business Administration (MBA)", convenerQuota: 42, managementQuota: 18, totalIntake: 60 },
];

export function AdmissionPolicyProcess() {
  const [ugIntake, setUgIntake] = useState<any[]>(fallbackUgIntake);
  const [pgIntake, setPgIntake] = useState<any[]>(fallbackPgIntake);
  const [loading, setLoading] = useState(true);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const programmes = await getAcademicProgrammes();
        const ugProgrammes = programmes.filter((p: any) => p.programmeType === "ug");
        const pgProgrammes = programmes.filter((p: any) => p.programmeType === "pg");
        
        if (ugProgrammes.length > 0) {
          setUgIntake(ugProgrammes);
        }
        
        if (pgProgrammes.length > 0) {
          const sortedPg = pgProgrammes.sort((a: any, b: any) => a.sNo - b.sNo);
          setPgIntake(sortedPg);
        }
      } catch (err) {
        console.error("Failed to load programmes in admissions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalUgConvener = ugIntake.reduce((acc, item) => acc + (item.convenerQuota || 0), 0);
  const totalUgManagement = ugIntake.reduce((acc, item) => acc + (item.managementQuota || 0), 0);
  const totalUgIntake = ugIntake.reduce((acc, item) => acc + (item.totalIntake || 0), 0);

  const totalPgConvener = pgIntake.reduce((acc, item) => acc + (item.convenerQuota || 0), 0);
  const totalPgManagement = pgIntake.reduce((acc, item) => acc + (item.managementQuota || 0), 0);
  const totalPgIntake = pgIntake.reduce((acc, item) => acc + (item.totalIntake || 0), 0);

  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <ShieldCheck className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white/15 backdrop-blur px-5 py-2 rounded-full w-fit text-blue-50">
            Admission Window 2026-27
          </span>
          <h2 className="font-outfit text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Admission Policy & Process
          </h2>
          <p className="text-blue-100/90 font-semibold text-lg md:text-xl mt-2 max-w-3xl leading-relaxed">
            A transparent, merit-driven and comprehensive workflow aligning completely with the Government Orders (GOs) of Andhra Pradesh and affiliating university norms.
          </p>
        </div>
      </div>

      {/* 1. General Policy Brief */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start gap-8">
        <div className="h-16 w-16 bg-[#002147] text-white flex items-center justify-center rounded-full shadow-lg shrink-0">
          <Landmark className="h-8 w-8" />
        </div>
        <div className="flex flex-col gap-4 max-w-4xl">
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight border-b pb-3 border-slate-100">Core Institutional Policy</h3>
          <p className="text-slate-700 text-base md:text-[17px] font-semibold leading-relaxed">
            Admissions to all Undergraduate (UG) and Postgraduate (PG) programmes at St. Ann&apos;s College are regulated strictly as per government-sanctioned intakes. Seat allotments follow clear rules of reservation, ensuring access, equity and equal opportunity for diverse learning segments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="flex items-start gap-3 text-slate-700 font-bold text-sm md:text-[15px]">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Seat allocation purely based on merit and category quotas</span>
            </div>
            <div className="flex items-start gap-3 text-slate-700 font-bold text-sm md:text-[15px]">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Adherence to state-level OAMDC (UG) and ICET (PG) counselling</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Undergraduate Programmes Intake */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">I. Undergraduate (UG) Intake Breakdown</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h4 className="font-outfit font-black text-slate-850 text-lg">UG Sanctioned Intakes (2026-2027)</h4>
              <p className="text-slate-500 text-sm font-semibold mt-0.5">Admissions through Online Admission Module (OAMDC)</p>
            </div>
            <span className="bg-indigo-100 text-indigo-950 px-5 py-2 rounded-xl font-black text-sm uppercase tracking-wide">Total Intake: {totalUgIntake} Seats</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base font-sans">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-xs font-bold">
                  <th className="py-5 px-8 text-center w-20">S.No</th>
                  <th className="py-5 px-8">UG Programme</th>
                  <th className="py-5 px-8 text-center bg-slate-100/50">Convener Quota</th>
                  <th className="py-5 px-8 text-center bg-amber-50/40">Management Quota</th>
                  <th className="py-5 px-8 text-center bg-indigo-50/30 font-bold text-indigo-950">Total Intake</th>
                  <th className="py-5 px-8 text-center">About Programme</th>
                  <th className="py-5 px-8 text-center">Brochure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700 text-sm md:text-base">
                {ugIntake.map((item, idx) => (
                  <tr key={item.sNo || idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-5 px-8 text-center text-slate-400 font-medium">{item.sNo}</td>
                    <td className="py-5 px-8 font-medium text-slate-800 tracking-tight">{item.name}</td>
                    <td className="py-5 px-8 text-center text-slate-600 bg-slate-50/20 font-medium">{item.convenerQuota}</td>
                    <td className="py-5 px-8 text-center text-amber-800 bg-amber-50/10 font-medium">{item.managementQuota}</td>
                    <td className="py-5 px-8 text-center text-[#002147] font-semibold bg-indigo-50/10 text-base">{item.totalIntake}</td>
                    <td className="py-5 px-8 text-center">
                      {item.aboutDocumentUrl ? (
                        <button
                          onClick={() => {
                            setPreviewUrl(item.aboutDocumentUrl);
                            setPreviewTitle(`${item.name} - About Programme`);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"
                        >
                          View Document
                        </button>
                      ) : (
                        <span className="text-slate-400">---</span>
                      )}
                    </td>
                    <td className="py-5 px-8 text-center">
                      {item.brochureUrl ? (
                        <button
                          onClick={() => {
                            setPreviewUrl(item.brochureUrl);
                            setPreviewTitle(`${item.name} - Brochure`);
                          }}
                          className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"
                        >
                          View Brochure
                        </button>
                      ) : (
                        <span className="text-slate-400">---</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-900 text-white font-semibold border-t-2 border-slate-800">
                  <td className="py-6 px-8"></td>
                  <td className="py-6 px-8 text-base font-outfit">Cumulative Seats Summary</td>
                  <td className="py-6 px-8 text-center text-base text-slate-300 font-bold">{totalUgConvener}</td>
                  <td className="py-6 px-8 text-center text-base text-amber-300 font-bold">{totalUgManagement}</td>
                  <td className="py-6 px-8 text-center text-lg text-indigo-300 font-bold">{totalUgIntake}</td>
                  <td colSpan={2} className="py-6 px-8"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Step by Step OAMDC Process */}
      <div className="flex flex-col gap-8">
        <h4 className="font-outfit font-black text-[#002147] text-xl flex items-center gap-2 border-l-4 border-[#002147] pl-3">
          UG Online Admission Steps (OAMDC)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Online Registration", desc: "Log on to the OAMDC portal and register with required base details and OTP validation." },
            { step: "02", title: "Web Options Entry", desc: "Select courses and colleges (choose St. Ann's as preferred choice) and lock before deadline." },
            { step: "03", title: "Reporting & Admission", desc: "Report to the allotted college for original certificate verification and fee submission." }
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-md transition-all relative overflow-hidden">
              <span className="absolute right-4 top-2 opacity-[0.08] text-6xl font-black font-outfit text-[#002147]">{s.step}</span>
              <h5 className="font-outfit font-black text-slate-900 text-lg mb-3 tracking-tight">{s.title}</h5>
              <p className="text-slate-600 text-[15px] font-semibold leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Postgraduate Programmes Intake */}
      <div className="flex flex-col gap-8 pt-4">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">II. Postgraduate (PG) Intake Breakdown</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h4 className="font-outfit font-black text-slate-850 text-lg">PG Sanctioned Intakes (2026-2027)</h4>
              <p className="text-slate-500 text-sm font-semibold mt-0.5">Admissions through ICET Entrance Counselling</p>
            </div>
            <span className="bg-emerald-100 text-emerald-950 px-5 py-2 rounded-xl font-black text-sm uppercase tracking-wide">Total Intake: {totalPgIntake} Seats</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-base font-sans">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-xs font-bold">
                  <th className="py-5 px-8 text-center w-20">S.No</th>
                  <th className="py-5 px-8">PG Programme</th>
                  <th className="py-5 px-8 text-center bg-slate-100/50">Convener Quota</th>
                  <th className="py-5 px-8 text-center bg-amber-50/40">Management Quota</th>
                  <th className="py-5 px-8 text-center bg-indigo-50/30 font-bold text-[#002147]">Total Intake</th>
                  <th className="py-5 px-8 text-center">About Programme</th>
                  <th className="py-5 px-8 text-center">Brochure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700 text-sm md:text-base">
                {pgIntake.map((item, idx) => (
                  <tr key={item.sNo || idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-5 px-8 text-center text-slate-400 font-medium">{idx + 1}</td>
                    <td className="py-5 px-8 font-medium text-slate-800 tracking-tight">{item.name}</td>
                    <td className="py-5 px-8 text-center text-slate-600 bg-slate-50/20 font-medium">{item.convenerQuota}</td>
                    <td className="py-5 px-8 text-center text-amber-800 bg-amber-50/10 font-medium">{item.managementQuota}</td>
                    <td className="py-5 px-8 text-center text-[#002147] font-semibold bg-indigo-50/10 text-base">{item.totalIntake}</td>
                    <td className="py-5 px-8 text-center">
                      {item.aboutDocumentUrl ? (
                        <button
                          onClick={() => {
                            setPreviewUrl(item.aboutDocumentUrl);
                            setPreviewTitle(`${item.name} - About Programme`);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"
                        >
                          View Document
                        </button>
                      ) : (
                        <span className="text-slate-400">---</span>
                      )}
                    </td>
                    <td className="py-5 px-8 text-center">
                      {item.brochureUrl ? (
                        <button
                          onClick={() => {
                            setPreviewUrl(item.brochureUrl);
                            setPreviewTitle(`${item.name} - Brochure`);
                          }}
                          className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"
                        >
                          View Brochure
                        </button>
                      ) : (
                        <span className="text-slate-400">---</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#002147] text-white font-semibold border-t-2 border-slate-850">
                  <td className="py-6 px-8"></td>
                  <td className="py-6 px-8 text-base font-outfit">Cumulative Seats Summary</td>
                  <td className="py-6 px-8 text-center text-base text-slate-300 font-bold">{totalPgConvener}</td>
                  <td className="py-6 px-8 text-center text-base text-amber-300 font-bold">{totalPgManagement}</td>
                  <td className="py-6 px-8 text-center text-lg text-amber-400 font-bold">{totalPgIntake}</td>
                  <td colSpan={2} className="py-6 px-8"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Step by Step ICET Process */}
      <div className="flex flex-col gap-8">
        <h4 className="font-outfit font-black text-[#002147] text-xl flex items-center gap-2 border-l-4 border-[#002147] pl-3">
          PG Online Admission Steps (ICET)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            "Qualify in ICET Entrance Examination",
            "Register for State ICET Online Counselling",
            "Attend Certificate Verification",
            "Exercise Web Options Entry",
            "Confirm Allotment & Report to Campus"
          ].map((step, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl hover:shadow-md transition-all relative overflow-hidden flex flex-col gap-3">
              <span className="absolute right-4 top-2 opacity-[0.08] text-5xl font-black font-outfit text-[#002147]">0{i+1}</span>
              <div className="h-8 w-8 bg-[#002147]/5 text-[#002147] border border-[#002147]/10 rounded-full flex items-center justify-center font-black shadow-sm shrink-0 text-xs">{i+1}</div>
              <p className="text-slate-705 text-sm font-bold leading-relaxed pr-6">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Forms / Links */}
      <div className="bg-[#002147]/5 border border-[#002147]/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-8 mt-4">
        <div className="flex flex-col gap-3 w-full">
          <span className="inline-flex items-center gap-2 bg-[#002147] text-white text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full w-fit shadow-xs">
            Download Forms
          </span>
          <h4 className="font-outfit font-black text-[#002147] text-2xl md:text-3xl tracking-tight mt-1">
            Application Inquiries 2026
          </h4>
          <p className="text-slate-700 font-semibold text-base md:text-lg leading-relaxed max-w-4xl mt-1">
            To initiate the application process, download the application Inquiry PDF form below, fill it completely, and submit the finalized physical copy to the college administration office directly.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-[#002147]/10 w-full md:w-fit">
          <button 
            onClick={() => {
              setPreviewUrl("/documents/admissions/UG Application Form.pdf");
              setPreviewTitle("UG Application Inquiry Form");
            }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 hover:border-indigo-300 text-[#002147] font-black rounded-[1.25rem] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-[15px] md:text-base shrink-0 cursor-pointer"
          >
            <FileText className="h-5 w-5 text-indigo-600 shrink-0" /> UG Application Inquiry
          </button>
          <button 
            onClick={() => {
              setPreviewUrl("/documents/admissions/PG Application Form.pdf");
              setPreviewTitle("PG Application Inquiry Form");
            }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#002147] hover:bg-[#0a3c74] text-white font-black rounded-[1.25rem] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-[15px] md:text-base shrink-0 cursor-pointer"
          >
            <FileText className="h-5 w-5 text-emerald-400 shrink-0" /> PG Application Inquiry
          </button>
        </div>
      </div>

      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Application Form"}
      />
    </div>
  );
}
