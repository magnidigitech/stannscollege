"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

export interface SidebarItem {
  text: string;
  slug?: string;
  id?: string;
  isSubItem?: boolean;
  textColor?: string;
}

export interface SidebarCategory {
  catSlug: string;
  title: string;
  sectionId?: string;
  items: SidebarItem[];
}

export type AboutCategory = SidebarCategory;

export const ABOUT_CATEGORIES: SidebarCategory[] = [
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
  categories?: SidebarCategory[];
  bannerTitle?: string;
  bannerSubtitle?: string;
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export default function AboutSidebar({
  currentCatSlug,
  currentItemSlug,
  categories,
  bannerTitle = "ABOUT US",
  bannerSubtitle = "Institutional Directory",
  activeId,
  onItemClick
}: AboutSidebarProps) {
  const activeCategories = categories || ABOUT_CATEGORIES;

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById("main-header");
      if (header) {
        const height = header.getBoundingClientRect().height || header.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty("--main-header-height", `${Math.ceil(height)}px`);
        }
      }
    };

    updateHeaderHeight();

    let observer: ResizeObserver | null = null;
    const header = document.getElementById("main-header");
    if (header && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      observer.observe(header);
    }

    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("scroll", updateHeaderHeight, { passive: true });

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", updateHeaderHeight);
      if (observer) observer.disconnect();
    };
  }, []);

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const header = document.getElementById("main-header");
      const headerHeight = header ? (header.getBoundingClientRect().height || header.offsetHeight) : 225;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20; // 20px buffer below sticky header
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
  };

  return (
    <aside
      className="flex flex-col sticky select-none h-fit overflow-hidden border-2 border-slate-200/90 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 z-20"
      style={{
        top: "calc(var(--main-header-height, 225px) + 16px)",
        maxHeight: "calc(100vh - var(--main-header-height, 225px) - 32px)",
        backgroundColor: "var(--sidebar-container-bg, #eaeff5)"
      }}
    >
      {/* Sidebar Top Banner Header - Fixed flush to top & sides with no gap */}
      <div
        className="text-white px-4.5 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3.5 shadow-sm border-b transition-colors duration-200 shrink-0 w-full"
        style={{
          background: "var(--sidebar-bg, #1e40af)",
          borderColor: "var(--sidebar-border, rgba(30, 64, 175, 0.3))",
          color: "var(--sidebar-text, #ffffff)"
        }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white shrink-0 backdrop-blur-xs shadow-inner">
          <BookOpen className="h-4.5 w-4.5" />
        </span>
        <div className="flex flex-col min-w-0 flex-1">
          <h1
            className="font-outfit text-xs sm:text-sm font-black uppercase tracking-wider leading-snug break-words"
            style={{ color: "var(--sidebar-text, #ffffff)" }}
          >
            {bannerTitle}
          </h1>
          <span
            className="text-[10px] sm:text-[11px] opacity-85 font-medium mt-0.5 break-words"
            style={{ color: "var(--sidebar-text, #ffffff)" }}
          >
            {bannerSubtitle}
          </span>
        </div>
      </div>

      {/* Category Groups - Inner scrollable content */}
      <div
        className="flex flex-col gap-6 p-4 sm:p-5 overflow-y-auto no-scrollbar"
        style={{
          maxHeight: "calc(100vh - var(--main-header-height, 225px) - 32px - 72px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        {activeCategories.map((cat) => (
          <div key={cat.catSlug} className="flex flex-col gap-2">
            <div
              onClick={() => {
                if (cat.sectionId) {
                  scrollToTarget(cat.sectionId);
                  if (onItemClick) onItemClick(cat.sectionId);
                }
              }}
              className={`flex items-center gap-2 px-1 pb-1.5 border-b border-slate-300/70 ${
                cat.sectionId ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0 transition-colors duration-200"
                style={{ background: "var(--sidebar-bg, #1e40af)" }}
              />
              <h4 className="font-outfit text-xs font-extrabold text-[#002147] uppercase tracking-wider select-none">
                {cat.title}
              </h4>
            </div>
            <div className="flex flex-col gap-1">
              {cat.items.map((item) => {
                const isItemActive =
                  (item.id && activeId === item.id) ||
                  (!item.id && (
                    (currentCatSlug === cat.catSlug && currentItemSlug === item.slug) ||
                    (item.slug === "strategic-development-plan" && currentItemSlug === "strategic-development-plan")
                  ));

                const handleClick = (e: React.MouseEvent) => {
                  if (item.id) {
                    e.preventDefault();
                    scrollToTarget(item.id);
                    if (onItemClick) onItemClick(item.id);
                  }
                };

                const href = item.id
                  ? `#${item.id}`
                  : item.slug === "strategic-development-plan"
                    ? "/strategic-plans-and-future-directions"
                    : `/about/${cat.catSlug}/${item.slug}`;

                const subItemClasses = item.isSubItem
                  ? "pl-6 py-1.5 text-xs"
                  : "py-2.5 px-3 text-xs md:text-sm";

                const inactiveColorClass = item.textColor
                  ? `${item.textColor} hover:brightness-125 hover:bg-white/80 hover:translate-x-1.5 font-medium`
                  : item.isSubItem
                  ? "text-rose-600 hover:text-rose-800 hover:bg-white/80 hover:translate-x-1.5 font-semibold"
                  : "text-slate-700 hover:text-blue-800 hover:bg-white/80 hover:translate-x-1.5 font-semibold";

                return (
                  <Link
                    key={item.id || item.slug || item.text}
                    href={href}
                    onClick={handleClick}
                    className={`group font-sans rounded-xl transition-all duration-200 flex items-center justify-between select-none ${subItemClasses} ${
                      isItemActive
                        ? "font-bold shadow-xs"
                        : inactiveColorClass
                    }`}
                    style={
                      isItemActive
                        ? {
                            background: "var(--sidebar-bg, #1e40af)",
                            borderColor: "var(--sidebar-border, #1e40af)",
                            color: "var(--sidebar-text, #ffffff)",
                            boxShadow: "0 2px 8px -1px rgba(30, 64, 175, 0.25)"
                          }
                        : undefined
                    }
                  >
                    <span className="truncate pr-2 transition-transform duration-200">
                      {item.text}
                    </span>
                    {isItemActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0 shadow-xs" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-700 transition-all duration-200 group-hover:translate-x-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
