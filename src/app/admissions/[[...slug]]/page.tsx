"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles, Phone, Mail, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

// Component Imports
import { AdmissionPolicyProcess } from "@/components/admissions/AdmissionPolicyProcess";
import { ProspectusBrochures } from "@/components/admissions/ProspectusBrochures";
import { EligibilityCriteria } from "@/components/admissions/EligibilityCriteria";
import { FeeStructure } from "@/components/admissions/FeeStructure";
import { ScholarshipsFreeships } from "@/components/admissions/ScholarshipsFreeships";
import { StudentHandbook } from "@/components/admissions/StudentHandbook";
import { AdmissionStatistics } from "@/components/admissions/AdmissionStatistics";

const navigationStructure = [
  {
    catSlug: "guidelines",
    title: "Admission Guidelines",
    items: [
      { text: "Admission Policy & Process", slug: "policy-process" },
      { text: "Prospectus & Brochures", slug: "prospectus-brochures" },
      { text: "Eligibility Criteria", slug: "eligibility-criteria" },
    ]
  },
  {
    catSlug: "finance-support",
    title: "Finance & Aid",
    items: [
      { text: "Fee Structure", slug: "fee-structure" },
      { text: "Scholarships & Freeships", slug: "scholarships-freeships" },
    ]
  },
  {
    catSlug: "records-compliance",
    title: "Handbooks & Records",
    items: [
      { text: "Student Handbook", slug: "student-handbook" },
      { text: "Admission Statistics", slug: "admission-statistics" },
    ]
  }
];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function AdmissionsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pathname = usePathname();

  // Default fallback route if no slug exists (e.g., visiting just /admissions)
  const currentSlug = resolvedParams?.slug?.[0] || "policy-process";

  // Function to render the appropriate component based on the slug
  const renderContent = () => {
    switch (currentSlug) {
      case "policy-process":
        return <AdmissionPolicyProcess />;
      case "prospectus-brochures":
        return <ProspectusBrochures />;
      case "eligibility-criteria":
        return <EligibilityCriteria />;
      case "fee-structure":
        return <FeeStructure />;
      case "scholarships-freeships":
        return <ScholarshipsFreeships />;
      case "student-handbook":
        return <StudentHandbook />;
      case "admission-statistics":
        return <AdmissionStatistics />;
      default:
        return <AdmissionPolicyProcess />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/70 py-5 px-6 sticky top-0 z-30 backdrop-blur-md bg-white/95 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-[#002147]/65 font-sans">
              <Link href="/" className="hover:text-[#002147] hover:underline transition-all">Home</Link>
              <span className="text-slate-350">/</span>
              <Link href="/admissions" className="hover:text-[#002147] hover:underline transition-all">Admissions</Link>
              <span className="text-slate-350">/</span>
              <span className="text-[#002147]">{currentSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
            </div>
          </div>

          {/* Quick Access Support Badge */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#002147]">
            <div className="flex items-center gap-1.5 bg-[#002147]/5 px-3.5 py-1.5 rounded-full border border-[#002147]/10 shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              Admission Help Desk Open
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* A. Left Sidebar Sticky Navigation */}
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-28 flex flex-col gap-8">
              
              {/* Navigation Box */}
              <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-5 mb-6">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#002147]/60 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" /> Academic Intake
                  </span>
                  <h3 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight">III. Admissions</h3>
                </div>

                <nav className="flex flex-col gap-8">
                  {navigationStructure.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400/90 border-l-2 border-slate-200 pl-2.5 leading-none">
                        {group.title}
                      </h4>
                      <ul className="flex flex-col gap-1.5">
                        {group.items.map((item, i) => {
                          const fullHref = `/admissions/${item.slug}`;
                          const isActive = currentSlug === item.slug;
                          
                          return (
                            <li key={i}>
                              <Link
                                href={fullHref}
                                className={`group w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                                  isActive
                                    ? "bg-[#002147] text-white border-transparent font-bold shadow-md translate-x-1"
                                    : "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-[#002147] border-transparent hover:border-slate-100 hover:translate-x-0.5"
                                }`}
                              >
                                <span className="truncate">{item.text}</span>
                                <ArrowRight className={`h-3.5 w-3.5 shrink-0 transform transition-all ${
                                  isActive ? "opacity-100 translate-x-0" : "opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                                }`} />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Sidebar Contact Card */}
              <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] text-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-40 w-40" />
                </div>
                <div className="relative z-10 flex flex-col gap-4 font-sans">
                  <h4 className="font-outfit font-black text-lg tracking-tight">Have Enrollment Questions?</h4>
                  <p className="text-blue-100/80 text-xs leading-relaxed font-medium">
                    Connect directly with our regional admission counselors for help on filling applications or ICET codes.
                  </p>
                  <div className="flex flex-col gap-2.5 border-t border-white/10 pt-4 text-xs">
                    <a href="tel:+918632231381" className="flex items-center gap-2.5 hover:text-blue-200 font-black transition-colors">
                      <Phone className="h-4 w-4 text-blue-300" /> +91 863 2231381
                    </a>
                    <a href="mailto:info@stannscollege.com" className="flex items-center gap-2.5 hover:text-blue-200 font-black transition-colors">
                      <Mail className="h-4 w-4 text-blue-300" /> admissions@stannscollege.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* B. Right Dynamic Component Content */}
          <main className="lg:col-span-9 xl:col-span-9 min-h-[500px]">
            {renderContent()}
          </main>

        </div>
      </div>
    </div>
  );
}
