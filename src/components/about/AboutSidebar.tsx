import React from "react";
import Link from "next/link";

export interface AboutCategory {
  catSlug: string;
  title: string;
  items: { text: string; slug: string }[];
}

export const ABOUT_CATEGORIES: AboutCategory[] = [
  {
    catSlug: "the-institution",
    title: "I. The Institution",
    items: [
      { text: "Basic Institutional Information", slug: "basic-institutional-information" },
      { text: "History of the College", slug: "history-of-the-college" },
      { text: "Vision, Mission, and Core Values", slug: "vision-mission-and-core-values" },
      { text: "Institutional Awards & Recognitions", slug: "institutional-awards-recognitions" },
      { text: "Student Laurels", slug: "student-laurels" },
      { text: "Institutional Distinctiveness", slug: "institutional-distinctiveness" },
      { text: "Head of the Institution", slug: "head-of-the-institution" },
      { text: "A Legacy of Leadership", slug: "legacy-of-leadership" },
    ],
  },
  {
    catSlug: "statutory-affiliations-recognitions",
    title: "II. Statutory Affiliations & Recognitions",
    items: [
      { text: "APSCHE Orders", slug: "apsche-orders" },
      { text: "ANU Affiliation Orders", slug: "anu-affiliation-orders-ug-pg" },
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

interface AboutSidebarProps {
  currentCatSlug?: string;
  currentItemSlug?: string;
}

export default function AboutSidebar({ currentCatSlug, currentItemSlug }: AboutSidebarProps) {
  return (
    <div className="flex flex-col gap-6 sticky top-24 select-none h-fit max-h-[calc(100vh-140px)] overflow-y-auto bg-white border border-slate-200/60 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 pr-2">
      <span className="inline-flex items-center gap-1.5 font-outfit text-xs font-black text-[#002147] uppercase tracking-wider px-2">
        About Navigation
      </span>
      <div className="flex flex-col gap-6">
        {ABOUT_CATEGORIES.map((cat) => (
          <div key={cat.catSlug} className="flex flex-col gap-2">
            <h4 className="font-outfit text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-1 px-2 select-none">
              {cat.title}
            </h4>
            <div className="flex flex-col gap-1.5">
              {cat.items.map((item) => {
                const isActive =
                  (currentCatSlug === cat.catSlug && currentItemSlug === item.slug) ||
                  (item.slug === "strategic-development-plan" && currentItemSlug === "strategic-development-plan");

                const href =
                  item.slug === "strategic-development-plan"
                    ? "/strategic-plans-and-future-directions"
                    : `/about/${cat.catSlug}/${item.slug}`;

                return (
                  <Link
                    key={item.slug}
                    href={href}
                    className={`font-sans text-xs md:text-sm p-3 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                      isActive
                        ? "bg-[#002147]/10 border-[#002147]/30 text-[#002147] font-bold shadow-sm"
                        : "text-slate-600 hover:bg-slate-50/60 hover:text-[#002147] font-medium"
                    }`}
                  >
                    <span className="truncate pr-2">{item.text}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 flex-shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
