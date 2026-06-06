"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, GraduationCap, ClipboardList, Star } from "lucide-react";
import { getAcademicProgrammes } from "@/lib/sanity";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

const fallbackPgIntakeData = [
  { sNo: 1, name: "Master of Computer Applications (MCA)", convenerQuota: 42, managementQuota: 18, totalIntake: 60 },
  { sNo: 2, name: "Master of Business Administration (MBA)", convenerQuota: 42, managementQuota: 18, totalIntake: 60 },
];

export function PostgraduateProgrammes() {
  const [pgIntakeData, setPgIntakeData] = useState<any[]>(fallbackPgIntakeData);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const programmes = await getAcademicProgrammes();
        const pgProgrammes = programmes.filter((p: any) => p.programmeType === "pg");
        if (pgProgrammes.length > 0) {
          const sortedPg = pgProgrammes.sort((a: any, b: any) => a.sNo - b.sNo);
          setPgIntakeData(sortedPg);
        }
      } catch (err) {
        console.error("Failed to load PG programmes from Sanity:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalConvener = pgIntakeData.reduce((acc, item) => acc + (item.convenerQuota || 0), 0);
  const totalManagement = pgIntakeData.reduce((acc, item) => acc + (item.managementQuota || 0), 0);
  const totalIntake = pgIntakeData.reduce((acc, item) => acc + (item.totalIntake || 0), 0);

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 flex items-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[#002147]" /> Academic Programmes
        </span>
        <h2 className="font-outfit text-3xl font-black tracking-tight text-[#002147]">
          Postgraduate Professional Programmes (PG) – MCA & MBA
        </h2>
        <div className="h-1 w-20 bg-[#002147] rounded-full mt-4"></div>
      </div>

      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        The institution offers AICTE-recognized Postgraduate Professional Programmes in Master of Computer Applications (MCA) and Master of Business Administration (MBA). These programmes are designed to provide advanced knowledge, practical exposure, and industry-relevant skills, preparing students for dynamic careers in technology and management.
      </p>

      {/* Highlight Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800">
          <Star className="h-5 w-5 text-amber-600 flex-shrink-0 fill-amber-500" />
          <span className="text-xs md:text-sm font-bold">AICTE Approved</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs md:text-sm font-bold">Advanced Curriculum</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-[#002147]/5 border border-[#002147]/10 rounded-2xl text-[#002147]">
          <GraduationCap className="h-5 w-5 flex-shrink-0" />
          <span className="text-xs md:text-sm font-bold">High Industry Relevance</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="h-8 w-8 rounded-lg bg-[#002147] flex items-center justify-center text-white">
            <ClipboardList className="h-4 w-4" />
          </div>
          <h3 className="font-outfit text-base font-bold text-[#002147]">PG Programme Intake & Admission</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center w-16">S.No</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider">PG Programme</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">Convener Quota</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">Management Quota</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center bg-[#002147]/5 text-[#002147]">Total Seats/Intake</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">About Programme</th>
                <th className="py-4 px-6 font-bold uppercase tracking-wider text-center">Brochure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pgIntakeData.map((item, idx) => (
                <tr key={item.sNo || idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6 text-center font-medium text-slate-400">{idx + 1}</td>
                  <td className="py-4 px-6 font-medium text-slate-700">{item.name}</td>
                  <td className="py-4 px-6 text-center font-medium text-slate-600">{item.convenerQuota}</td>
                  <td className="py-4 px-6 text-center font-medium text-slate-600">{item.managementQuota}</td>
                  <td className="py-4 px-6 text-center font-semibold text-[#002147] bg-[#002147]/[0.02]">{item.totalIntake}</td>
                  <td className="py-4 px-6 text-center font-semibold">
                    {item.aboutDocumentUrl ? (
                      <button
                        onClick={() => {
                          setPreviewUrl(item.aboutDocumentUrl);
                          setPreviewTitle(`${item.name} - About Programme`);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                      >
                        View Document
                      </button>
                    ) : (
                      <span className="text-slate-400">---</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center font-semibold">
                    {item.brochureUrl ? (
                      <button
                        onClick={() => {
                          setPreviewUrl(item.brochureUrl);
                          setPreviewTitle(`${item.name} - Brochure`);
                        }}
                        className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
                      >
                        View Brochure
                      </button>
                    ) : (
                      <span className="text-slate-400">---</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50/50 border-t-2 border-slate-100">
                <td colSpan={2} className="py-4 px-6 font-black text-[#002147] text-right text-sm">Grand Total</td>
                <td className="py-4 px-6 text-center font-black text-[#002147] text-sm">{totalConvener}</td>
                <td className="py-4 px-6 text-center font-black text-[#002147] text-sm">{totalManagement}</td>
                <td className="py-4 px-6 text-center font-black text-white bg-[#002147] text-sm">{totalIntake}</td>
                <td colSpan={2} className="py-4 px-6 bg-slate-50/20"></td>
              </tr>
            </tbody>
          </table>
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
