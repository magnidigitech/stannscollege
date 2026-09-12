"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightbulb, Phone, Mail, ArrowRight, ShieldCheck, BookOpen } from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";

// Component Imports
import { ResearchInnovationLanding } from "@/components/research-innovation/ResearchInnovationLanding";
import { ResearchDevelopmentCell } from "@/components/research-innovation/ResearchDevelopmentCell";
import { ResearchPublications } from "@/components/research-innovation/ResearchPublications";
import { ResearchSupervisorsScholars } from "@/components/research-innovation/ResearchSupervisorsScholars";
import { ResearchInfrastructure } from "@/components/research-innovation/ResearchInfrastructure";
import { PatentsInnovations } from "@/components/research-innovation/PatentsInnovations";
import { FundedProjects } from "@/components/research-innovation/FundedProjects";
import { CentresOfExcellence } from "@/components/research-innovation/CentresOfExcellence";
import { IprCell } from "@/components/research-innovation/IprCell";
import { InstitutionInnovationCell } from "@/components/research-innovation/InstitutionInnovationCell";
import { EntrepreneurshipDevelopment } from "@/components/research-innovation/EntrepreneurshipDevelopment";

const navigationStructure = [
  {
    catSlug: "policy-infra",
    title: "I. Policy & Infrastructure",
    items: [
      { text: "Research Development Cell", slug: "research-development-cell" },
      { text: "Research Infrastructure", slug: "research-infrastructure" },
      { text: "Supervisors & Scholars", slug: "research-supervisors-scholars" },
      { text: "Centres of Excellence", slug: "centres-of-excellence" },
    ]
  },
  {
    catSlug: "outputs-grants",
    title: "II. Outputs & Grants",
    items: [
      { text: "Research Publications", slug: "research-publications" },
      { text: "Patents & Innovations", slug: "patents-innovations" },
      { text: "Funded Projects", slug: "funded-projects" },
    ]
  },
  {
    catSlug: "innovation-ipr",
    title: "III. Innovation & IPR",
    items: [
      { text: "Intellectual Property Cell", slug: "ipr-cell" },
      { text: "Institution Innovation Cell", slug: "institution-innovation-cell" },
      { text: "Entrepreneurship Development", slug: "entrepreneurship-development" },
    ]
  }
];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function ResearchInnovationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pathname = usePathname();

  // Default fallback route is overview landing page
  const currentSlug = resolvedParams?.slug?.[0] || "landing";

  // Function to render the appropriate component based on the slug
  const renderContent = () => {
    switch (currentSlug) {
      case "landing": return <ResearchInnovationLanding />;
      case "research-development-cell": return <ResearchDevelopmentCell />;
      case "research-publications": return <ResearchPublications />;
      case "research-supervisors-scholars": return <ResearchSupervisorsScholars />;
      case "research-infrastructure": return <ResearchInfrastructure />;
      case "patents-innovations": return <PatentsInnovations />;
      case "funded-projects": return <FundedProjects />;
      case "centres-of-excellence": return <CentresOfExcellence />;
      case "ipr-cell": return <IprCell />;
      case "institution-innovation-cell": return <InstitutionInnovationCell />;
      case "entrepreneurship-development": return <EntrepreneurshipDevelopment />;
      default: return <ResearchInnovationLanding />;
    }
  };

  // Determine dynamic title for Notch
  let pageTitle = "Research & Innovation";
  if (currentSlug !== "landing") {
    for (const group of navigationStructure) {
      const found = group.items.find(it => it.slug === currentSlug);
      if (found) {
        pageTitle = found.text;
        break;
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto py-10 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* A. Left Sidebar Sticky Navigation */}
          {currentSlug !== "landing" && (
            <aside className="lg:col-span-3 xl:col-span-3">
              <div className="sticky top-28 flex flex-col gap-8 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">

                {/* Navigation Box */}
                <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden">
                  <div className="flex flex-col gap-1 border-b border-slate-100 pb-4 mb-5">
                    <Link href="/research-innovation" className="hover:opacity-80 transition-opacity">
                      <h1 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight">Research &amp; Innovation</h1>
                    </Link>
                    <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400">Research &amp; IPR Hub</span>
                  </div>

                  <nav className="flex flex-col gap-8">
                    {navigationStructure.map((group, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400/90 border-l-2 border-slate-200 pl-2.5 leading-none">
                          {group.title}
                        </h4>
                        <ul className="flex flex-col gap-1.5">
                          {group.items.map((item, i) => {
                            const fullHref = `/research-innovation/${item.slug}`;
                            const isActive = currentSlug === item.slug;

                            return (
                              <li key={i}>
                                <Link
                                  href={fullHref}
                                  className={`group w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${isActive
                                    ? "bg-[#002147] text-white border-transparent font-bold shadow-md translate-x-1"
                                    : "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-[#002147] border-transparent hover:border-slate-100 hover:translate-x-0.5"
                                    }`}
                                >
                                  <span className="truncate">{item.text}</span>
                                  <ArrowRight className={`h-3.5 w-3.5 shrink-0 transform transition-all ${isActive ? "opacity-100 translate-x-0" : "opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
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



              </div>
            </aside>
          )}

          {/* B. Right Dynamic Component Content */}
          <main className={currentSlug === "landing" ? "lg:col-span-12 xl:col-span-12" : "lg:col-span-9 xl:col-span-9"}>
            {/* Sub-text Box */}
            <SubtextBox 
              subtext="Fostering an ecosystem of intellectual inquiry, funded research projects, patent filings, institutional incubation, and entrepreneurial ventures aligned with national development goals." 
              className="mb-8"
            />
            <div className={currentSlug === "landing" ? "" : "bg-white border border-slate-200/60 rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-sm min-h-[500px]"}>
              {renderContent()}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
