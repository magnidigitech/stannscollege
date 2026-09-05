"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { StrategicDevelopmentPlan } from "@/components/about/governance-administration/StrategicDevelopmentPlan";
import AboutSidebar from "@/components/about/AboutSidebar";

export default function StrategicPlansFutureDirectionsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/70 py-5 px-4 sm:px-6 lg:px-12 sticky top-0 z-30 backdrop-blur-md bg-white/95 transition-all shadow-xs w-full">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-[#002147]/65 font-sans">
              <Link href="/" className="hover:text-[#002147] hover:underline transition-all">Home</Link>
              <span className="text-slate-350">/</span>
              <Link href="/about/governance-administration" className="hover:text-[#002147] hover:underline transition-all">About Us</Link>
              <span className="text-slate-350">/</span>
              <span className="text-[#002147]">Strategic Plans & Future Directions</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#002147]">
            <div className="flex items-center gap-1.5 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
              Institutional Autonomy Roadmap
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container with About Sidebar */}
      <div className="max-w-[1600px] mx-auto py-10 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          {/* About Navigation Sidebar */}
          <div className="lg:col-span-3">
            <AboutSidebar
              currentCatSlug="governance-administration"
              currentItemSlug="strategic-development-plan"
            />
          </div>

          {/* Strategic Development Plan Content */}
          <div className="lg:col-span-9 mb-16">
            <StrategicDevelopmentPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
