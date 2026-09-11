"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardCheck, ShieldCheck, Award, Target, FileText, MessageSquare, BarChart, Image as ImageIcon, Phone, ArrowRight, BookOpen, Mail } from "lucide-react";
import { ContentRenderer } from "@/components/quality-assurance/ContentRenderer";
import { Heading1Notch, SubtextBox } from "@/components/ui/Heading1Notch";

const navigationStructure = [
  {
    catSlug: "core-quality",
    title: "I. Quality Framework",
    items: [
      { text: "About IQAC", slug: "iqac", icon: ClipboardCheck },
      { text: "AQAR Reports", slug: "aqar", icon: FileText },
      { text: "NAAC Accreditation", slug: "naac", icon: ShieldCheck },
    ]
  },
  {
    catSlug: "processes",
    title: "II. Quality Processes",
    items: [
      { text: "Quality Initiatives", slug: "quality-initiatives", icon: Target },
      { text: "Audit Reports", slug: "audit", icon: Award },
      { text: "Feedback System", slug: "feedback", icon: MessageSquare },
    ]
  },
  {
    catSlug: "outcomes",
    title: "III. Evaluation & Media",
    items: [
      { text: "Surveys & Evaluation", slug: "surveys", icon: BarChart },
      { text: "IQAC Gallery", slug: "gallery", icon: ImageIcon },
      { text: "Contact IQAC", slug: "contact", icon: Phone },
    ]
  }
];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function QualityAssurancePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pathname = usePathname();

  // Default fallback route
  const currentSlug = resolvedParams?.slug?.[0] || "iqac";

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      {/* 1. Heading 1 Banner */}
      <Heading1Notch title="Internal Quality Assurance Cell (IQAC)" />

      {/* 2. Main Content Container (Sidebar on Left, Data Elements on Right) */}
      <div className="max-w-[1600px] mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">

          {/* Left: Redesigned Collegiate Sidebar */}
          <aside className="lg:col-span-3">
            <div
              className="sticky select-none h-fit overflow-y-auto no-scrollbar border-2 border-slate-200/90 p-4 sm:p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-6"
              style={{
                top: "calc(var(--main-header-height, 185px) + 16px)",
                maxHeight: "calc(100vh - var(--main-header-height, 185px) - 32px)",
                backgroundColor: "var(--sidebar-container-bg, #eaeff5)",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              }}
            >
              {/* Sidebar Heading Banner */}
              <div
                className="text-white px-4 py-3.5 rounded-2xl flex items-center gap-3 shadow-sm border transition-colors duration-200 shrink-0"
                style={{
                  background: "var(--sidebar-bg, #1e40af)",
                  borderColor: "var(--sidebar-border, rgba(30, 64, 175, 0.3))",
                  color: "var(--sidebar-text, #ffffff)"
                }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white shrink-0 backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span
                    className="font-outfit text-xs font-black uppercase tracking-wider truncate"
                    style={{ color: "var(--sidebar-text, #ffffff)" }}
                  >
                    IQAC DIRECTORY
                  </span>
                  <span
                    className="text-[10px] opacity-85 font-medium truncate"
                    style={{ color: "var(--sidebar-text, #ffffff)" }}
                  >
                    Quality Assurance &amp; Accreditation
                  </span>
                </div>
              </div>

              {/* Navigation Category Groups */}
              <nav className="flex flex-col gap-5">
                {navigationStructure.map((group, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 px-1 pb-1 border-b border-slate-300/70">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0 transition-colors duration-200"
                        style={{ background: "var(--sidebar-bg, #1e40af)" }}
                      />
                      <h4 className="font-outfit text-xs font-extrabold text-[#002147] uppercase tracking-wider select-none">
                        {group.title}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-1 mt-1">
                      {group.items.map((item, i) => {
                        const fullHref = `/quality-assurance/${item.slug}`;
                        const isActive = currentSlug === item.slug;
                        const ItemIcon = item.icon;

                        return (
                          <Link
                            key={i}
                            href={fullHref}
                            className={`group font-sans text-xs md:text-sm py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-between select-none ${
                              isActive
                                ? "font-bold shadow-xs"
                                : "text-slate-700 hover:text-blue-800 hover:bg-white/80 hover:translate-x-1.5 font-semibold"
                            }`}
                            style={
                              isActive
                                ? {
                                    background: "var(--sidebar-bg, #1e40af)",
                                    borderColor: "var(--sidebar-border, #1e40af)",
                                    color: "var(--sidebar-text, #ffffff)",
                                    boxShadow: "0 2px 8px -1px rgba(30, 64, 175, 0.25)"
                                  }
                                : undefined
                            }
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <ItemIcon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"}`} />
                              <span className="truncate">{item.text}</span>
                            </div>
                            {isActive ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0 shadow-xs" />
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-700 transition-all duration-200 group-hover:translate-x-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Sidebar Contact Card */}
              <div
                className="text-white rounded-2xl p-4 shadow-sm relative overflow-hidden group shrink-0 border transition-colors duration-200"
                style={{
                  background: "linear-gradient(135deg, #002147 0%, #0d3b66 100%)",
                  borderColor: "rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-28 w-28 text-white" />
                </div>
                <div className="relative z-10 flex flex-col gap-2 font-sans">
                  <h4 className="font-outfit font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" /> IQAC Enquiries?
                  </h4>
                  <p className="text-blue-100/80 text-[11px] leading-relaxed font-medium">
                    Connect with the IQAC coordinator for queries related to accreditation, feedback, and quality reports.
                  </p>
                  <div className="flex flex-col gap-1.5 border-t border-white/10 pt-2.5 text-[11px]">
                    <a href="tel:+918632231381" className="flex items-center gap-2 hover:text-blue-200 font-bold transition-colors text-blue-100">
                      <Phone className="h-3.5 w-3.5 text-blue-300 shrink-0" /> +91 863 2231381
                    </a>
                    <a href="mailto:iqac@stannscollege.com" className="flex items-center gap-2 hover:text-blue-200 font-bold transition-colors text-blue-100">
                      <Mail className="h-3.5 w-3.5 text-blue-300 shrink-0" /> iqac@stannscollege.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Right: Dynamic Component Content */}
          <main className="lg:col-span-9 flex flex-col gap-10 mb-16">
            <SubtextBox>
              Dedicated to institutional excellence, quality culture, continuous academic enhancement, and NAAC benchmarks at St. Ann&apos;s College for Women.
            </SubtextBox>
            <ContentRenderer slug={currentSlug} />
          </main>

        </div>
      </div>
    </div>
  );
}