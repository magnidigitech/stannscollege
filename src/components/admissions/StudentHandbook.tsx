"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, FileText, Eye, Download, ShieldAlert, CalendarDays, FolderClosed } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";
import { getStudentHandbooks } from "@/lib/sanity";

interface HandbookData {
  year: string;
  fileUrl: string;
  order: number;
}

export function StudentHandbook() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");
  
  const staticHandbooks: HandbookData[] = [
    { year: "2023-2024", fileUrl: "/documents/admissions/handbooks/handbook 2023-24.pdf", order: 3 },
    { year: "2022-2023", fileUrl: "/documents/admissions/handbooks/handbook 2022-23.pdf", order: 4 },
    { year: "2021-2022", fileUrl: "/documents/admissions/handbooks/handbook 2021-22.pdf", order: 5 },
    { year: "2020-2021", fileUrl: "/documents/admissions/handbooks/handbook 2020-21.pdf", order: 6 },
    { year: "2019-2020", fileUrl: "/documents/admissions/handbooks/handbook 2019-20.pdf", order: 7 },
    { year: "2018-2019", fileUrl: "/documents/admissions/handbooks/handbook 2018-19.pdf", order: 8 }
  ];

  const [handbooksList, setHandbooksList] = useState<HandbookData[]>(staticHandbooks);

  useEffect(() => {
    let active = true;
    async function loadHandbooks() {
      try {
        const data = await getStudentHandbooks();
        if (active) {
          const validHandbooks = data.filter((h: any) => h.year && h.fileUrl);
          if (validHandbooks.length > 0) {
            setHandbooksList(validHandbooks);
          }
        }
      } catch (err) {
        console.error("Failed to load handbooks from Sanity:", err);
      }
    }
    loadHandbooks();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <BookOpen className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 font-black text-[10px] md:text-xs uppercase tracking-widest bg-white/15 backdrop-blur px-4 py-1.5 rounded-full w-fit text-blue-50">
            Regulatory Guidelines
          </span>
          <h2 className="font-outfit text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Student Handbook
          </h2>
          <p className="text-blue-100/80 font-semibold text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
            The definitive guide containing the institutional code of conduct, general rules, curriculum schedules, evaluation methods and student-centric administrative policies.
          </p>
        </div>
      </div>

      {/* 1. Main Directive Note */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
        <div className="h-12 w-12 bg-white text-amber-600 border border-amber-200 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-outfit font-black text-amber-950 text-lg">Essential Student Mandate</h3>
          <p className="text-amber-900/80 text-base font-semibold leading-relaxed">
            Every student admitted to the college is required to possess and thoroughly study the student handbook relevant to their academic year. It serves as the official governing agreement on all matters of institutional discipline, grading configurations and attendance standards.
          </p>
        </div>
      </div>

      {/* 2. Annual Archive Grid */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <FolderClosed className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Year-wise Student Handbooks</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {handbooksList.map((h, i) => (
            <div key={i} className="bg-white border-2 border-slate-100 hover:border-indigo-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-8 group relative overflow-hidden">
              {i === 0 && (
                <span className="absolute right-0 top-0 bg-[#002147] text-white font-black uppercase text-[9px] tracking-widest px-4 py-1.5 rounded-bl-2xl z-10 shadow-sm">
                  Latest
                </span>
              )}
              
              <div className="flex flex-col gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 border border-[#002147]/10 text-[#002147] flex items-center justify-center shadow-xs group-hover:bg-[#002147] group-hover:text-white transition-all">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-slate-350" /> Session Year
                  </span>
                  <h4 className="font-outfit text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">Hand Book {h.year}</h4>
                </div>
              </div>

              <div className="flex gap-3 border-t border-slate-100 pt-5 mt-2">
                <button 
                  onClick={() => {
                    setPreviewUrl(h.fileUrl);
                    setPreviewTitle(`Student Handbook ${h.year}`);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white font-black px-4 py-3 rounded-xl text-sm shadow-xs transition-all cursor-pointer border-none"
                >
                  <Eye className="h-4 w-4" /> View
                </button>
                <a 
                  href={h.fileUrl}
                  download
                  className="inline-flex items-center justify-center w-12 bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


      <FilePreviewModal
        isOpen={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        fileUrl={previewUrl || ""}
        title={previewTitle || "Handbook Preview"}
      />
    </div>
  );
}
