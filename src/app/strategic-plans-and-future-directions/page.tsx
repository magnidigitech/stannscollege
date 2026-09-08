"use client";

import React from "react";
import { StrategicDevelopmentPlan } from "@/components/about/governance-administration/StrategicDevelopmentPlan";

export default function StrategicPlansFutureDirectionsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">

      {/* Main Content Container (Full-width Heading 1 Banner on top, Sidebar & Sections below) */}
      <div className="max-w-[1600px] mx-auto py-10 px-4 sm:px-6 lg:px-12 w-full">
        <StrategicDevelopmentPlan />
      </div>
    </div>
  );
}
