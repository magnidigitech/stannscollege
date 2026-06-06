"use client";

import React, { useState } from "react";
import { Eye, Download, BookOpen, Image as ImageIcon } from "lucide-react";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

export function ProspectusBrochures() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");
  return (
    <div className="flex flex-col gap-16 animate-fadeIn pb-12 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <BookOpen className="h-[450px] w-[450px]" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest bg-white/15 backdrop-blur px-5 py-2 rounded-full w-fit text-blue-50">
            Publications & Information
          </span>
          <h2 className="font-outfit text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Prospectus & Brochures
          </h2>
          <p className="text-blue-100/90 font-semibold text-lg md:text-xl mt-2 max-w-3xl leading-relaxed">
            Explore our comprehensive guides detailing campus resources, student support facilities, curriculum patterns and professional pipelines for the academic session.
          </p>
        </div>
      </div>

      {/* 1. Main Prospectus */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Official College Prospectus</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col gap-8 hover:shadow-md hover:border-slate-200/80 transition-all">
          <div className="flex flex-col gap-4 w-full">
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider w-fit">Academic Session 2025 - 2026</span>
            <h4 className="font-outfit text-3xl md:text-4xl font-black text-[#002147] tracking-tight">St. Ann&apos;s Comprehensive Prospectus</h4>
            <p className="text-slate-700 font-semibold text-base md:text-lg leading-relaxed max-w-4xl mt-1">
              Contains precise policies, exhaustive faculty statistics, administrative framework details, dynamic learning resources, extra-curricular clubs and general guidelines of the institution.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-fit pt-2 border-t border-slate-50">
            <button 
              onClick={() => {
                setPreviewUrl("/documents/admissions/Prospectus 2025-26.pdf");
                setPreviewTitle("St. Ann's Comprehensive Prospectus");
              }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#002147] hover:bg-[#0a3c74] text-white text-[15px] md:text-base font-black rounded-[1.25rem] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Eye className="h-5 w-5" /> View Online
            </button>
            <a 
              href="/documents/admissions/Prospectus 2025-26.pdf"
              download
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[15px] md:text-base font-black rounded-[1.25rem] border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Download className="h-5 w-5" /> Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* 2. Brochures & Pamphlets */}
      <div className="flex flex-col gap-8 pt-4">
        <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#002147]/5 text-[#002147] flex items-center justify-center border border-[#002147]/10 shadow-sm shrink-0">
            <ImageIcon className="h-6 w-6" />
          </div>
          <h3 className="font-outfit text-2xl font-black text-[#002147] tracking-tight">Information Pamphlets & Flyers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Institutional Overview Brochure", img: "/documents/admissions/Pamphlets.jpg" },
            { title: "Core Highlights & Stats Pamphlet", img: "/documents/admissions/Pamphlets-WA0006.jpg" }
          ].map((b, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 flex flex-col gap-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
              <div className="aspect-[16/10] w-full rounded-2xl border border-slate-200 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={b.img} 
                  alt={b.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#002147]/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-xs">
                  <button 
                    onClick={() => {
                      setPreviewUrl(b.img);
                      setPreviewTitle(b.title);
                    }}
                    className="h-12 w-12 bg-white text-[#002147] rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 font-black cursor-pointer border-none"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-2">
                <h4 className="font-outfit text-xl font-black text-[#002147] tracking-tight leading-tight">{b.title}</h4>
                <a 
                  href={b.img} 
                  download
                  className="h-10 w-10 bg-indigo-50 text-indigo-950 flex items-center justify-center rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all shadow-xs cursor-pointer"
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
        title={previewTitle || "Brochure Preview"}
      />
    </div>
  );
}
