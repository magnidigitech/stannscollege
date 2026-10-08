"use client";

import React from "react";
import Link from "next/link";
import { Building, ShieldCheck, Users, ChevronRight } from "lucide-react";
import { SubtextBox } from "@/components/ui/Heading1Notch";

export default function AboutClientFallback() {
  const categories = [
    {
      catSlug: "the-institution",
      title: "A. The Institution",
      description: "Our history, core values, distinctive character, and visionary path since 1997.",
      icon: Building,
      items: [
        { text: "Basic Institutional Information", slug: "basic-institutional-information" },
        { text: "History & Milestones", slug: "history-of-the-college" },
        { text: "Emblem, Motto, Tagline, Vision, Mission & Core Values", slug: "vision-mission-and-core-values" },
        { text: "Institutional Awards & Recognitions", slug: "institutional-awards-recognitions" },
        { text: "Student Achievements & Laurels", slug: "student-laurels" },
        { text: "Institutional Distinctiveness", slug: "institutional-distinctiveness" },
        { text: "Head of the Institution", slug: "head-of-the-institution" },
        { text: "Legacy of Leadership", slug: "legacy-of-leadership" },
      ],
    },
    {
      catSlug: "statutory-affiliations-recognitions",
      title: "II. Statutory Affiliations & Recognitions",
      description: "Accreditation, official recognition, and statutory compliance frameworks.",
      icon: ShieldCheck,
      items: [
        { text: "APSCHE Orders", slug: "apsche-orders" },
        { text: "ANU Affiliation Orders (UG & PG)", slug: "anu-affiliation-orders-ug-pg" },
        { text: "AICTE Approvals", slug: "aicte-approvals" },
        { text: "UGC 2(f)", slug: "ugc-2f" },
        { text: "AISHE Certificates", slug: "aishe-certificates" },
        { text: "NAAC Accreditation", slug: "naac-accreditation" },
        { text: "NIRF", slug: "nirf" },
      ],
    },
    {
      catSlug: "governance-administration",
      title: "III. Governance & Administration",
      description: "Our governing body, administration policies, functions, and key committees.",
      icon: Users,
      items: [
        { text: "Governing Body", slug: "governing-body" },
        { text: "Organogram", slug: "organogram" },
        { text: "Key Functionaries & IQAC", slug: "key-functionaries-iqac" },
        { text: "Statutory & Non-Statutory Committees", slug: "statutory-non-statutory-committees" },
        { text: "Institutional Policies", slug: "institutional-policies" },
        { text: "Strategic Development Plan", slug: "strategic-development-plan" },
        { text: "Code of Conduct", slug: "code-of-conduct" },
      ],
    },
  ];

  return (
    <div className="bg-slate-50/50 min-h-screen select-none font-sans">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 py-8 sm:py-12 w-full">
        {/* Sub-text Box */}
        <SubtextBox 
          subtext="St. Ann’s College for Women, Gorantla, Guntur, established in 1997, is committed to higher educational distinction, moral integrity, academic rigor, and the holistic empowerment of young women." 
          className="mb-8"
        />

        {/* Banner image for About page */}
        <div className="relative w-full h-[320px] md:h-[450px] mb-16 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md select-none">
          <img 
            src="/images/about/cbnew2.webp" 
            alt="About St. Ann's College" 
            className="w-full h-full object-cover select-none hover:scale-[1.01] transition-all duration-500"
          />
        </div>

        {/* 3 Columns Section Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div
                key={cat.catSlug}
                className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-100/60 transition-all duration-300 flex flex-col gap-6 relative"
              >
                {/* Column header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#002147] to-[#003875] text-white shadow-md">
                      <CatIcon className="h-6 w-6" />
                    </span>
                    <h3 className="font-outfit text-xl font-black text-slate-800 leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed min-h-[40px]">
                    {cat.description}
                  </p>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                {/* Sub items list inside column */}
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => {
                    const href = item.slug === "strategic-development-plan"
                      ? "/strategic-plans-and-future-directions"
                      : `/about/${cat.catSlug}/${item.slug}`;

                    return (
                      <Link
                        key={item.slug}
                        href={href}
                        className="group flex items-center justify-between text-left p-3.5 bg-slate-50/40 hover:bg-[#002147]/5 hover:border-[#002147]/20 border border-slate-100/60 rounded-2xl transition-all duration-300 select-none cursor-pointer"
                      >
                        <span className="font-sans text-xs md:text-sm font-semibold text-slate-700 group-hover:text-[#002147] transition-colors">
                          {item.text}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#002147] group-hover:translate-x-0.5 transition-all duration-300" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
