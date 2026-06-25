"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Globe2,
  Handshake,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Eye,
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { staticPlacementSections } from "./staticData";
import { FilePreviewModal } from "@/components/ui/FilePreviewModal";

const navigationGroups = [
  {
    title: "Training & Placements",
    icon: Briefcase,
    slugPrefix: "training",
    items: [
      { text: "About Training & Placement Cell", slug: "about-cell" },
      { text: "Annual Reports", slug: "annual-reports" },
      { text: "Placement Statistics", slug: "placement-statistics" },
      { text: "Campus Recruitment Drives", slug: "recruitment-drives" },
      { text: "Skill Development Initiatives", slug: "skill-development" },
      { text: "Soft Skills & Personality Development", slug: "soft-skills" },
      { text: "Internships & Industry Exposure", slug: "internships-exposure" },
      { text: "Competitive Exam Coaching", slug: "competitive-coaching" },
      { text: "Career Guidance & Counselling", slug: "career-guidance" },
      { text: "Entrepreneurship Development", slug: "entrepreneurship" },
      { text: "Industry Linkages / Placement Partnerships", slug: "placement-partnerships" },
      { text: "Capacity Building & Skill Enhancement", slug: "capacity-building" },
      { text: "Alumni Career Support", slug: "alumni-support" },
      { text: "Training Calendar / Activity Gallery", slug: "training-calendar" }
    ]
  },
  {
    title: "Industry Linkages & Employability",
    icon: Handshake,
    slugPrefix: "industry",
    items: [
      { text: "Industry Partnerships", slug: "industry-partnerships" },
      { text: "Internships & Apprenticeships", slug: "internships-apprenticeships" },
      { text: "MoUs / Agreements", slug: "mous-agreements" },
      { text: "MoU Activities", slug: "mou-activities" },
      { text: "CSR Initiatives", slug: "csr-initiatives" },
      { text: "Placement Partnerships", slug: "industry-placement-partnerships" },
      { text: "Professional Certification Programmes", slug: "certifications" },
      { text: "Industry Expert Lectures", slug: "expert-lectures" },
      { text: "Industrial Visits", slug: "industrial-visits" },
      { text: "Skill-Based Training Programmes", slug: "skill-training" },
      { text: "Employability Enhancement Activities", slug: "employability-activities" }
    ]
  },
  {
    title: "Internationalization & Global Outreach",
    icon: Globe2,
    slugPrefix: "global",
    items: [
      { text: "International Collaborations", slug: "international-collaborations" },
      { text: "Internationalization Policy", slug: "internationalization-policy" },
      { text: "International Accreditations & Memberships", slug: "accreditations-memberships" },
      { text: "Global Alumni & Outreach Engagement", slug: "global-alumni" },
      { text: "Global Research Collaborations", slug: "global-research" },
      { text: "Student Exchange / Faculty Exchange", slug: "student-faculty-exchange" },
      { text: "International Webinars & Conferences", slug: "webinars-conferences" },
      { text: "Cross-Cultural Learning Activities", slug: "cross-cultural-learning" }
    ]
  }
];

const PlacementsLanding = ({ onNavigate }: { onNavigate: (slug: string, e: React.MouseEvent) => void }) => {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#004225] to-[#085e36] p-8 md:p-12 text-white shadow-md">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl flex flex-col gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
            Career & Placements Hub
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Placements & Industry Linkages
          </h2>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed font-medium">
            Welcome to the Training, Placement, and Global Outreach portal of St. Ann's College for Women. 
            We empower our students with industry-aligned skills, career-ready initiatives, robust corporate linkages, 
            and global academic opportunities. Explore the sections below to learn more about our cells, statistics, MoUs, and outreach.
          </p>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="flex flex-col gap-10">
        {navigationGroups.map((group, gIdx) => {
          const GroupIcon = group.icon;
          return (
            <div key={gIdx} className="flex flex-col gap-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-3">
                <span className="p-2.5 bg-emerald-50 rounded-xl text-[#004225]">
                  <GroupIcon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-outfit text-xl md:text-2xl font-black text-[#004225] tracking-tight">
                    {group.title}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={`/placements/${item.slug}`}
                    onClick={(e) => onNavigate(item.slug, e)}
                    className="group flex items-center justify-between p-4 bg-white border border-slate-200/65 rounded-2xl hover:border-emerald-200/50 hover:bg-emerald-50/10 hover:shadow-sm hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="font-outfit font-bold text-slate-700 text-sm leading-snug truncate group-hover:text-[#004225] transition-colors">
                        {item.text}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-350 shrink-0 group-hover:text-[#004225] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface PlacementsClientPortalProps {
  activeSlug: string;
  initialSections?: any[];
  galleryImages?: Array<{ url: string; caption?: string }>;
}

export default function PlacementsClientPortal({
  activeSlug = "about-cell",
  initialSections = [],
  galleryImages = []
}: PlacementsClientPortalProps) {

  // Accordion Expand States
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Training & Placements": true,
    "Industry Linkages & Employability": false,
    "Internationalization & Global Outreach": false
  });

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sections, setSections] = useState<Record<string, any>>(staticPlacementSections);

  // Flipbook States
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [selectedFileTitle, setSelectedFileTitle] = useState("");

  const [currentActiveSlug, setCurrentActiveSlug] = useState(activeSlug);

  // Gallery states
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Reset search queries and gallery pagination when jumping slugs
  useEffect(() => {
    setVisibleCount(12);
    setLightboxIndex(null);
  }, [currentActiveSlug]);

  // Sync activeSlug prop from router/URL
  useEffect(() => {
    setCurrentActiveSlug(activeSlug);
  }, [activeSlug]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split("/");
      const slug = pathParts[pathParts.length - 1] || "about-cell";
      setCurrentActiveSlug(slug);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Sort and group gallery images by academic year
  const processedImages = React.useMemo(() => {
    return [...galleryImages].sort((a, b) => {
      const matchA = a.caption?.match(/^\[(\d{4}-\d{4})\]/);
      const matchB = b.caption?.match(/^\[(\d{4}-\d{4})\]/);
      const yearA = matchA ? matchA[1] : "";
      const yearB = matchB ? matchB[1] : "";
      if (yearA && yearB) {
        return yearB.localeCompare(yearA); // latest year first
      }
      if (yearA) return -1;
      if (yearB) return 1;
      return 0;
    });
  }, [galleryImages]);

  // Group visible images by year
  const visibleImages = processedImages.slice(0, visibleCount);

  const groupedImages = React.useMemo(() => {
    const groups: Record<string, Array<{ img: { url: string; caption?: string }; globalIndex: number }>> = {};
    visibleImages.forEach((img, idx) => {
      const match = img.caption?.match(/^\[(\d{4}-\d{4})\]/);
      const year = match ? match[1] : "Other Photos";
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push({ img, globalIndex: idx });
    });
    return groups;
  }, [visibleImages]);

  // Sort year headings: latest first, and "Other Photos" last
  const sortedYearHeadings = React.useMemo(() => {
    return Object.keys(groupedImages).sort((a, b) => {
      if (a === "Other Photos") return 1;
      if (b === "Other Photos") return -1;
      return b.localeCompare(a);
    });
  }, [groupedImages]);

  const hasMultipleGroupsOrYear = React.useMemo(() => {
    const keys = Object.keys(groupedImages);
    if (keys.length > 1) return true;
    if (keys.length === 1 && keys[0] !== "Other Photos") return true;
    return false;
  }, [groupedImages]);

  // Click handler for sidebar / internal links
  const handleSlugChange = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentActiveSlug(slug);
    window.history.pushState(null, "", `/placements/${slug}`);

    // On mobile, smooth scroll to the content area
    if (window.innerWidth < 1024) {
      const contentElem = document.getElementById("placements-content-area");
      if (contentElem) {
        contentElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Auto-expand group of the active slug
  useEffect(() => {
    const activeGroup = navigationGroups.find(g => g.items.some(item => item.slug === currentActiveSlug));
    if (activeGroup) {
      setExpandedGroups(prev => ({
        ...prev,
        [activeGroup.title]: true
      }));
    }
  }, [currentActiveSlug]);

  // Merge server-side pre-fetched Sanity data with local static fallbacks
  useEffect(() => {
    if (initialSections && initialSections.length > 0) {
      const merged = { ...staticPlacementSections };
      initialSections.forEach((s: any) => {
        if (s.id) {
          merged[s.id] = {
            id: s.id,
            title: s.title || merged[s.id]?.title || "",
            content: s.content || merged[s.id]?.content || ""
          };
        }
      });
      setSections(merged);
    } else {
      setSections(staticPlacementSections);
    }
  }, [initialSections]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSelectedFileUrl(null);
    setSelectedFileTitle("");
  }, [currentActiveSlug]);

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  // Find active item and active group definitions
  const activeGroup = navigationGroups.find(g => g.items.some(item => item.slug === currentActiveSlug)) || navigationGroups[0];
  const activeItem = activeGroup.items.find(item => item.slug === currentActiveSlug) || activeGroup.items[0];

  const sectionData = sections[currentActiveSlug] || {
    title: activeItem.text,
    content: ""
  };

  const stripEmojis = (str: string) => {
    if (!str) return "";
    return str.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, "").trim();
  };

  const renderRichString = (str: string) => {
    const sanitized = stripEmojis(str);
    if (!sanitized) return "";

    const tokenRegex = /(\*\*|__)([\s\S]+?)\1|\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    let keyCounter = 0;

    while ((match = tokenRegex.exec(sanitized)) !== null) {
      if (match.index > lastIdx) {
        parts.push(sanitized.substring(lastIdx, match.index));
      }

      if (match[1]) {
        const boldContent = match[2].replace(/__/g, "").trim();
        parts.push(
          <strong key={keyCounter++} className="text-[#004225] font-black tracking-tight inline">
            {renderRichString(boldContent)}
          </strong>
        );
      } else if (match[3]) {
        const linkLabel = match[3].replace(/__/g, "").trim();
        const linkUrl = match[4];
        const isPdf = linkUrl.toLowerCase().endsWith(".pdf") || linkUrl.toLowerCase().includes("/pdf");

        if (isPdf) {
          parts.push(
            <button
              key={keyCounter++}
              onClick={() => {
                setSelectedFileUrl(linkUrl);
                setSelectedFileTitle(linkLabel);
              }}
              className="text-emerald-700 hover:text-emerald-900 font-extrabold underline transition-all inline cursor-pointer text-left hover:scale-[1.01]"
            >
              {linkLabel}
            </button>
          );
        } else {
          parts.push(
            <a
              key={keyCounter++}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-800 font-bold underline transition-colors inline"
            >
              {linkLabel}
            </a>
          );
        }
      }
      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < sanitized.length) {
      parts.push(sanitized.substring(lastIdx));
    }

    return parts.length > 0 ? parts : sanitized;
  };

  const sanitizeAsciiTables = (text: string) => {
    if (!text) return "";

    // If the text contains ASCII table borders, replace them with clean markdown tables
    if (text.includes("+-") && text.includes("|")) {
      // Replace the "Year wise Placement Packages" ASCII block
      const packagesRegex = /\+-+[\s\S]*?Year wise Placement Packages[\s\S]*?2018-2019[\s\S]*?\+-+/i;
      if (packagesRegex.test(text)) {
        const cleanPackages = `__**Year wise Placement Packages**__\n\n**Academic Year**\n\n**Students Eligible (UG & PG)**\n\n**Students Placed**\n\n**Placement %**\n\n**Highest Package**\n\n2025-2026\n\n—\n\n—\n\n—\n\n—\n\n2024-2025\n\n—\n\n—\n\n—\n\n—\n\n2023-2024\n\n—\n\n—\n\n—\n\n—\n\n2022-2023\n\n—\n\n—\n\n—\n\n—\n\n2021-2022\n\n—\n\n—\n\n—\n\n—\n\n2020-2021\n\n—\n\n—\n\n—\n\n—\n\n2019-2020\n\n—\n\n—\n\n—\n\n—\n\n2018-2019\n\n—\n\n—\n\n—\n\n—`;
        text = text.replace(packagesRegex, cleanPackages);
      }

      // Replace "Department/Programme -wise Placements" ASCII block
      const deptRegex = /\+-+[\s\S]*?Department\/Programme -wise Placements[\s\S]*?MBA - Master of Business[\s\S]*?\+-+/i;
      if (deptRegex.test(text)) {
        const cleanDept = `__**Department/Programme -wise Placements**__\n\n**Academic Year**\n\n**Programme**\n\n**Total No.of Students**\n\n**Students Placed**\n\n**Placement %**\n\n2025-2026\n\nB.Com Honours - General\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Com Honours Computer Applications\n\n—\n\n—\n\n—\n\n2025-2026\n\nBBA Honours-Business Management\n\n—\n\n—\n\n—\n\n2025-2026\n\nB. Sc Honours Computer Science\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours Artificial Intelligence\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Mathematics\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Physics\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours-Statistics\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Chemistry\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Biotechnology\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc honours -Microbiology\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours-Chemistry\n\n—\n\n—\n\n—\n\n2025-2026\n\nMCA-Master of Computer Applications\n\n—\n\n—\n\n—\n\n2025-2026\n\nMBA - Master of Business Administration\n\n—\n\n—\n\n—`;
        text = text.replace(deptRegex, cleanDept);
      }

      // Replace "Higher Education Progression" ASCII block
      const higherRegex = /\+-+[\s\S]*?Higher Education Progression[\s\S]*?MBA - Master of Business[\s\S]*?\+-+/i;
      if (higherRegex.test(text)) {
        const cleanHigher = `__**Higher Education Progression**__\n\n**Academic Year**\n\n**Programme**\n\n**Total No.of Students**\n\n**Programme in Which Students Pursuing Higher Education**\n\n**No.of Students**\n\n2025-2026\n\nB.Com Honours - General\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Com Honours Computer Applications\n\n—\n\n—\n\n—\n\n2025-2026\n\nBBA Honours-Business Management\n\n—\n\n—\n\n—\n\n2025-2026\n\nB. Sc Honours Computer Science\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours Artificial Intelligence\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Mathematics\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Physics\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours-Statistics\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Chemistry\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours -Biotechnology\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc honours -Microbiology\n\n—\n\n—\n\n—\n\n2025-2026\n\nB.Sc Honours-Chemistry\n\n—\n\n—\n\n—\n\n2025-2026\n\nMCA-Master of Computer Applications\n\n—\n\n—\n\n—\n\n2025-2026\n\nMBA - Master of Business Administration\n\n—\n\n—\n\n—`;
        text = text.replace(higherRegex, cleanHigher);
      }
    }
    return text;
  };

  const renderContentBody = (text: string) => {
    if (!text) return null;

    // Clean dynamic/static annual reports year header and duplicate View Document texts
    if (currentActiveSlug === "annual-reports") {
      text = text
        .replace(/\*\*2023-2024\s*,\s*2024-2025\s*,\s*2025-.*?\*\*/gi, "")
        .replace(/\*\*View Document\s*\(PDF\)\*\*/gi, "");
    }

    const sanitizedText = sanitizeAsciiTables(text);
    const rawChunks = sanitizedText.split("\n\n").map(c => c.trim()).filter(Boolean);
    const nodes: any[] = [];

    let i = 0;
    while (i < rawChunks.length) {
      const chunk = rawChunks[i];

      const clean = (s: string) => (s || "").replace(/[*_]+/g, "").trim();
      const norm = (s: string) => (s || "").replace(/[*_\s\.]+/g, "").toLowerCase();

      const n0 = norm(chunk);
      const n1 = norm(rawChunks[i + 1] || "");
      const n2 = norm(rawChunks[i + 2] || "");
      const n3 = norm(rawChunks[i + 3] || "");
      const n4 = norm(rawChunks[i + 4] || "");

      if (n0 === "photogallery" || n0 === "gallery" || n0 === "photos" || chunk.startsWith("[Embedded") || n0.includes("suggestedwebsiteadditions")) {
        i++;
        continue;
      }

      const isSNo = n0.startsWith("sno") || n0.startsWith("slno") || n0 === "s";
      const isColStart = n0 === "academicyear" || n0 === "category" || n0 === "programme" || n0 === "year" || n0 === "nameofthedepartment";

      // Intelligent Tables
      const is8ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i + 5]) && norm(rawChunks[i + 6]) && norm(rawChunks[i + 7]);
      const is7ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i + 5]) && norm(rawChunks[i + 6]);
      const is6ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4 && norm(rawChunks[i + 5]);
      const is5ColTable = (isSNo || isColStart) && n1 && n2 && n3 && n4;
      const is4ColTable = (isSNo || isColStart) && n1 && n2 && n3;
      const is3ColTable = (isSNo || isColStart) && n1 && n2;
      const is2ColTable = (isSNo || isColStart || n0 === "category") && n1;

      const parseTable = (colCount: number) => {
        const headers = [];
        for (let j = 0; j < colCount; j++) {
          headers.push(rawChunks[i + j]);
        }
        const rowItems: string[] = [];
        let lookAhead = i + colCount;

        while (lookAhead < rawChunks.length) {
          const nextVal = rawChunks[lookAhead];
          const nextClean = clean(nextVal);
          if (((nextVal.startsWith("__") && nextVal.endsWith("__")) || (nextVal.startsWith("**") && nextVal.endsWith("**"))) && nextVal.length > 4) break;
          if (nextVal.startsWith("Link:")) break;
          if (nextClean.includes("Services") || nextClean.startsWith("View PDF") || nextClean.includes("Gallery")) break;
          rowItems.push(nextVal);
          lookAhead++;
        }

        const rows: string[][] = [];
        for (let r = 0; r < rowItems.length; r += colCount) {
          const slice = rowItems.slice(r, r + colCount);
          if (slice.length > 0) {
            while (slice.length < colCount) slice.push("—");
            rows.push(slice);
          }
        }
        nodes.push({ type: "table", headers, rows, columns: colCount });
        i = lookAhead;
      };

      if (is8ColTable && (norm(rawChunks[i + 7]).includes("notyetplaced") || norm(rawChunks[i + 7]).includes("document") || norm(rawChunks[i + 7]).includes("years"))) {
        parseTable(8);
        continue;
      }
      if (is7ColTable && (norm(rawChunks[i + 6]).includes("viewdocument") || norm(rawChunks[i + 6]).includes("document") || norm(rawChunks[i + 6]).includes("years"))) {
        parseTable(7);
        continue;
      }
      if (is6ColTable && (norm(rawChunks[i + 5]).includes("placementdrive") || norm(rawChunks[i + 5]).includes("year") || norm(rawChunks[i + 5]).includes("view"))) {
        parseTable(6);
        continue;
      }
      if (is5ColTable && (norm(rawChunks[i + 4]).includes("highestpackage") || norm(rawChunks[i + 4]).includes("studentsplaced") || norm(rawChunks[i + 4]).includes("duration") || norm(rawChunks[i + 4]).includes("placement") || norm(rawChunks[i + 4]).includes("students") || norm(rawChunks[i + 4]).includes("interned") || norm(rawChunks[i + 4]).includes("noofstudents"))) {
        parseTable(5);
        continue;
      }
      if (is4ColTable) {
        if (norm(rawChunks[i + 3]).includes("studentsinterned") || norm(rawChunks[i + 3]).includes("purpose") || norm(rawChunks[i + 3]).includes("duration")) {
          parseTable(4);
          continue;
        }
      }
      if (is3ColTable) {
        if (norm(rawChunks[i + 2]).includes("totalselections")) {
          parseTable(3);
          continue;
        }
      }
      if (is2ColTable && n0 === "category" && n1.includes("totalselections")) {
        parseTable(2);
        continue;
      }

      // Check if this chunk is a line of PDF or document links (to display as cards)
      const docLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+?\.(pdf|docx|xlsx|doc|xls))[^\s)]*\)/gi;
      const matches = [...chunk.matchAll(docLinkRegex)];
      if (matches.length > 0) {
        const totalLinkTextLength = matches.reduce((acc, m) => acc + m[0].length, 0);
        if (totalLinkTextLength > chunk.length * 0.7) {
          const links = matches.map(m => ({ title: m[1], url: m[2] }));
          nodes.push({ type: "pdf-cards", links });
          i++;
          continue;
        }
      }

      if (chunk.startsWith("Link:")) {
        nodes.push({ type: "link", text: chunk.replace("Link:", "").trim() });
        i++;
        continue;
      }

      if (chunk.startsWith("- ") || chunk.startsWith("* ")) {
        const listItems = [chunk];
        let lookAhead = i + 1;
        while (lookAhead < rawChunks.length) {
          const nextChunk = rawChunks[lookAhead];
          if (nextChunk.startsWith("- ") || nextChunk.startsWith("* ")) {
            listItems.push(nextChunk);
            lookAhead++;
          } else {
            break;
          }
        }
        nodes.push({ type: "list", items: listItems });
        i = lookAhead;
        continue;
      }

      nodes.push({ type: "paragraph", text: chunk });
      i++;
    }

    let hasBoostedFirstHeader = false;

    return nodes.map((node, idx) => {
      if (node.type === "pdf-cards") {
        return (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 animate-fadeIn select-text">
            {node.links.map((link: any, lIdx: number) => (
              <div
                key={lIdx}
                className="flex flex-col justify-between p-5 bg-white border border-slate-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-emerald-200/50 hover:scale-[1.01] transition-all duration-300 group min-h-[180px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700">
                      <BookOpen className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
                    </span>
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100/30">
                      PDF Document
                    </span>
                  </div>
                  <h4 className="font-outfit font-black text-slate-800 text-base leading-snug mb-5 group-hover:text-[#004225] transition-colors">
                    {link.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto select-none">
                  <button
                    onClick={() => {
                      setSelectedFileUrl(link.url);
                      setSelectedFileTitle(link.title);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-black text-white bg-[#004225] hover:bg-[#02542f] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <a
                    href={link.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-black text-[#004225] bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl transition-all active:scale-95 cursor-pointer text-center text-decoration-none"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (node.type === "link") {
        const fileUrl = node.text;
        const fileName = fileUrl.split("/").pop() || "View Document";
        const cleanName = decodeURIComponent(fileName).replace(/\.[^/.]+$/, "");
        return (
          <button
            key={idx}
            onClick={() => {
              setSelectedFileUrl(fileUrl);
              setSelectedFileTitle(cleanName);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 mt-3 mb-6 bg-emerald-50 hover:bg-emerald-100 text-[#004225] font-extrabold rounded-xl transition-all border border-emerald-200/30 group w-fit hover:scale-[1.02] active:scale-[0.98] mr-4 shadow-sm"
          >
            <BookOpen className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
            {cleanName}
          </button>
        );
      }

      if (node.type === "table") {
        if (currentActiveSlug === "mous-agreements" || currentActiveSlug === "mou-activities") {
          return (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 animate-fadeIn">
              {node.rows.map((row: string[], rIdx: number) => {
                const sNo = row[0] || "";
                const department = row[1] || "";
                const company = row[2] || "";
                const yearOfSigning = row[3] || "";
                const duration = row[4] || "";
                const purpose = row[5] || "";
                const years = row[6] || "";
                const viewDocument = row[7] || "";

                // Extract clean department badge
                const cleanDept = department
                  .replace(/St\.?\s*Ann['’]?s\s+College\s+for\s+Women,?\s*(Gorantla,)?\s*Guntur/gi, "")
                  .replace(/Department\s+of/gi, "")
                  .trim();
                const deptBadge = cleanDept || "College-Wide";

                // View PDF click handling
                const linkMatch = viewDocument.match(/\[([^\]]+)\]\(([^)]+)\)/);
                const linkUrl = linkMatch ? linkMatch[2] : null;

                const displayYears = years && years !== "—" ? `${years} ${years.toLowerCase().includes("year") ? "" : "Years"}` : null;
                const displayDuration = displayYears || duration || "—";

                return (
                  <div
                    key={rIdx}
                    className="flex flex-col justify-between bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-emerald-200/50 hover:scale-[1.01]"
                  >
                    <div>
                      {/* Badge & S.No */}
                      <div className="flex items-center justify-between mb-3.5">
                        {deptBadge !== "College-Wide" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#004225] border border-emerald-100/50">
                            {deptBadge}
                          </span>
                        ) : (
                          <div />
                        )}
                        <span className="text-[10px] font-bold text-slate-350">
                          #{sNo}
                        </span>
                      </div>

                      {/* Company / Institution Name */}
                      <h4 className="font-outfit text-sm md:text-base font-black text-slate-805 mb-2 leading-snug group-hover:text-[#004225] transition-colors">
                        {company}
                      </h4>

                      {/* Purpose */}
                      {purpose && purpose !== "—" && (
                        <p className="text-slate-500 text-[12.5px] leading-relaxed mb-5 font-semibold">
                          {purpose}
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata Line */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-4 text-[10.5px] md:text-[11px] font-bold text-slate-450 uppercase tracking-wider shrink-0">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span>Signed: {yearOfSigning}</span>
                        <span className="text-slate-200 font-normal">|</span>
                        <span>Duration: {displayDuration}</span>
                      </div>

                      {linkUrl ? (
                        <button
                          onClick={() => {
                            setSelectedFileUrl(linkUrl);
                            setSelectedFileTitle(company || "MoU Document");
                          }}
                          className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-md transition-all cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          View PDF
                        </button>
                      ) : (
                        <span className="text-slate-300 font-normal text-[10px] shrink-0">No PDF</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        return (
          <div key={idx} className="my-8 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_32px_-4px_rgba(0,0,0,0.04)] select-text animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#004225] via-[#02542f] to-[#085e36] text-white">
                    {node.headers.map((h: string, hIdx: number) => {
                      const lowerH = h.toLowerCase().replace(/[^a-z]/g, "");
                      const isSno = lowerH === "sno" || lowerH === "slno" || lowerH === "s";
                      const isTotal = lowerH === "total" || lowerH === "link" || lowerH === "highestpackage" || lowerH === "placement%";

                      return (
                        <th
                          key={hIdx}
                          className={`px-6 py-5 font-outfit text-[11px] md:text-xs uppercase tracking-widest font-black border-r border-white/5 last:border-0 ${isSno ? "text-center" : isTotal ? "text-right" : "text-left"
                            }`}
                        >
                          {renderRichString(h.replace(/\*\*|__/g, ""))}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70">
                  {node.rows.map((row: string[], rIdx: number) => (
                    <tr
                      key={rIdx}
                      className="group transition-all duration-200 hover:bg-emerald-50/20"
                    >
                      {row.map((cell, cIdx) => {
                        const headerText = node.headers[cIdx] || "";
                        const lowerH = headerText.toLowerCase().replace(/[^a-z]/g, "");
                        const isSno = lowerH === "sno" || lowerH === "slno" || lowerH === "s";
                        const isTotal = lowerH === "total" || headerText.toLowerCase().includes("total") || lowerH === "highestpackage" || lowerH === "placement%";
                        const isEmpty = cell === "—" || cell.trim() === "";

                        // Check if the cell has a document link (markdown link format)
                        const linkMatch = cell.match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (linkMatch) {
                          const linkLabel = linkMatch[1];
                          const linkUrl = linkMatch[2];
                          const isPdf = linkUrl.toLowerCase().endsWith(".pdf") || linkUrl.toLowerCase().includes("/pdf");

                          if (isPdf) {
                            return (
                              <td key={cIdx} className="px-6 py-5 text-center">
                                <button
                                  onClick={() => {
                                    setSelectedFileUrl(linkUrl);
                                    setSelectedFileTitle(linkLabel);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg transition-all cursor-pointer hover:scale-[1.03]"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  {linkLabel}
                                </button>
                              </td>
                            );
                          }
                        }

                        return (
                          <td
                            key={cIdx}
                            className={`px-6 py-5 text-slate-650 text-xs md:text-[14px] font-semibold leading-relaxed transition-colors duration-200 ${isSno ? "text-center w-[80px]" : isTotal ? "text-right" : "text-left"
                              }`}
                          >
                            {isSno ? (
                              <div className="flex justify-center">
                                <span className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-2 text-[11px] font-black font-outfit rounded-lg bg-slate-100 text-slate-500 border border-slate-200/20 transition-all duration-300 shadow-sm group-hover:bg-[#004225]/10 group-hover:text-[#004225] group-hover:border-[#004225]/20 group-hover:scale-105">
                                  {cell.trim()}
                                </span>
                              </div>
                            ) : isTotal ? (
                              <span className="font-outfit font-extrabold text-slate-900 text-[14px] tracking-tight transition-colors duration-200 group-hover:text-[#004225] tabular-nums">
                                {isEmpty ? <span className="text-slate-300 font-normal">—</span> : renderRichString(cell)}
                              </span>
                            ) : (
                              <span className={isEmpty ? "text-slate-300 font-normal" : "text-slate-700 font-semibold tracking-tight transition-colors duration-200 group-hover:text-slate-900"}>
                                {isEmpty ? "—" : renderRichString(cell)}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (node.type === "list") {
        const lines: string[] = [];
        for (const item of node.items) {
          const rawLines = item.split("\n").map((l: string) => l.trim()).filter(Boolean);
          for (const line of rawLines) {
            if (line.startsWith("-") || line.startsWith("*")) {
              lines.push(line.replace(/^[-*]\s*/, "").trim());
            } else {
              if (lines.length > 0) {
                lines[lines.length - 1] += " " + line;
              } else {
                lines.push(line.replace(/^[-*]\s*/, "").trim());
              }
            }
          }
        }
        return (
          <ul key={idx} className="space-y-2.5 my-5 bg-slate-50/30 rounded-xl p-4 md:p-5 border border-slate-100/50 shadow-sm">
            {lines.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 leading-relaxed text-[14px] md:text-[15px] group animate-fadeIn">
                <div className="mt-2 min-w-[8px] flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#004225]" />
                </div>
                <span className="flex-1 font-semibold text-slate-650">{renderRichString(item)}</span>
              </li>
            ))}
          </ul>
        );
      }

      const p = node.text;

      if (p && ((p.startsWith("__") && p.endsWith("__")) || (p.startsWith("**") && p.endsWith("**"))) && p.length > 4) {
        const cleanTitle = stripEmojis(p.replace(/[*_]+/g, "").trim())
          .replace(/^(?:(?:\d+(?:\.\d+)*|[IVXLCDM]+|[a-zA-Z])[\.\)]\s+)+/i, "")
          .trim();

        const isBigTitle = /^[IVX\d]+\./.test(p.replace(/[*_]+/g, "").trim()) || cleanTitle.toUpperCase() === cleanTitle;

        if (isBigTitle) {
          if (!hasBoostedFirstHeader) {
            hasBoostedFirstHeader = true;
            return (
              <h3 key={idx} className="font-outfit text-2xl md:text-3xl font-black text-[#004225] tracking-tight mt-2 mb-8 flex items-center gap-4 leading-tight animate-fadeIn">
                <span className="h-9 w-2 rounded-full bg-gradient-to-b from-[#004225] to-[#08723c] shrink-0"></span>
                {cleanTitle}
              </h3>
            );
          }

          return (
            <h3 key={idx} className="font-outfit text-xl md:text-2xl font-black text-[#004225] tracking-tight mt-12 mb-6 pt-8 border-t border-slate-100 flex items-center gap-3">
              <span className="h-6 w-1.5 rounded-full bg-[#004225] shrink-0"></span>
              {cleanTitle}
            </h3>
          );
        }
        return (
          <h4 key={idx} className="font-outfit text-xs md:text-sm font-black text-slate-800 mt-8 mb-3 uppercase tracking-wider border-l-4 border-emerald-100 pl-3">
            {cleanTitle}
          </h4>
        );
      }

      if (p && (p.startsWith("- ") || p.startsWith("* "))) {
        const rawLines = p.split("\n").map((l: string) => l.trim()).filter(Boolean);
        const lines: string[] = [];
        for (const line of rawLines) {
          if (line.startsWith("-") || line.startsWith("*")) {
            lines.push(line.replace(/^[-*]\s*/, "").trim());
          } else {
            if (lines.length > 0) {
              lines[lines.length - 1] += " " + line;
            } else {
              lines.push(line.replace(/^[-*]\s*/, "").trim());
            }
          }
        }
        return (
          <ul key={idx} className="space-y-2.5 my-5 bg-slate-50/30 rounded-xl p-4 md:p-5 border border-slate-100/50 shadow-sm">
            {lines.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 leading-relaxed text-[14px] md:text-[15px] group">
                <div className="mt-2 min-w-[8px] flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#004225]" />
                </div>
                <span className="flex-1 font-semibold text-slate-650">{renderRichString(item)}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={idx} className="text-slate-650 leading-[1.8] text-[15px] md:text-[16px] mb-6 font-medium text-justify">
          {p ? renderRichString(p) : ""}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header */}
      <div className="relative bg-[#004225] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        </div>
        <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white font-outfit tracking-tight mb-3 max-w-4xl leading-[1.15] animate-slideUp">
            Placements & Industry Linkages
          </h1>
          <p className="text-emerald-100/80 text-xs md:text-sm max-w-2xl font-medium leading-relaxed animate-slideUp">
            Empowering students with career-ready skillsets, dynamic placement opportunities, robust industry tie-ups, and global collaborations.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile Floating Drawer Trigger */}
          <div className="lg:hidden z-40">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 flex items-center justify-between font-outfit"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  {React.createElement(activeGroup.icon, { className: "w-5 h-5 text-[#004225]" })}
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-black tracking-wider text-slate-400">{activeGroup.title}</div>
                  <span className="font-bold text-slate-800 text-base leading-tight">{activeItem.text}</span>
                </div>
              </div>
              <Menu className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Mobile Navigation Full-Screen Slide-over */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />

              <div className="relative flex flex-col w-full max-w-xs ml-auto bg-white h-full shadow-2xl animate-slideLeft">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <span className="font-outfit font-black text-slate-800 text-lg">Navigation Hub</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl bg-slate-50">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {navigationGroups.map((group) => {
                    const Icon = group.icon;
                    const isGroupExpanded = !!expandedGroups[group.title];
                    return (
                      <div key={group.title} className="space-y-2">
                        <button
                          onClick={() => toggleGroup(group.title)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl font-outfit font-extrabold text-sm transition-all text-left ${isGroupExpanded ? "bg-emerald-50 text-[#004225]" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{group.title}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isGroupExpanded ? "rotate-180" : ""}`} />
                        </button>

                        {isGroupExpanded && (
                          <div className="pl-4 border-l border-emerald-100/70 space-y-1 mt-1">
                            {group.items.map((item) => {
                              const isActive = item.slug === currentActiveSlug;
                              return (
                                <Link
                                  key={item.slug}
                                  href={`/placements/${item.slug}`}
                                  onClick={(e) => handleSlugChange(item.slug, e)}
                                  className={`block py-2 px-3 rounded-lg text-xs font-semibold transition-all ${isActive
                                    ? "bg-[#004225] text-white"
                                    : "text-slate-600 hover:text-[#004225] hover:bg-slate-50"
                                    }`}
                                >
                                  {item.text}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Left Accordion Sidebar Navigation */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-200/50 backdrop-blur-xl max-h-[calc(100vh-140px)] flex flex-col">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Navigation Hub</h3>
              <div className="space-y-3 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {navigationGroups.map((group) => {
                  const Icon = group.icon;
                  const isExpanded = !!expandedGroups[group.title];
                  const hasActiveChild = group.items.some(item => item.slug === currentActiveSlug);

                  return (
                    <div
                      key={group.title}
                      className={`rounded-2xl border transition-all duration-300 ${isExpanded || hasActiveChild
                        ? "border-emerald-150/40 bg-emerald-50/10"
                        : "border-slate-100 bg-white"
                        }`}
                    >
                      {/* Accordion Group Trigger */}
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className={`w-full flex items-center justify-between p-3.5 font-outfit font-black text-[13px] tracking-wide transition-all ${isExpanded
                          ? "text-[#004225]"
                          : "text-slate-655 hover:text-[#004225]"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl transition-all ${isExpanded || hasActiveChild
                            ? "bg-[#004225] text-white"
                            : "bg-slate-100 text-slate-500"
                            }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-left leading-snug">{group.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 shrink-0 ${isExpanded ? "rotate-180 text-[#004225]" : "text-slate-400"}`} />
                      </button>

                      {/* Accordion Group Submenu Items */}
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 border-t border-slate-100/50 space-y-1 animate-fadeIn">
                          {group.items.map((item) => {
                            const isActive = item.slug === currentActiveSlug;
                            return (
                              <Link
                                key={item.slug}
                                href={`/placements/${item.slug}`}
                                onClick={(e) => handleSlugChange(item.slug, e)}
                                className={`group/item flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all duration-200 text-left ${isActive
                                  ? "bg-[#004225] text-white font-bold shadow-sm shadow-emerald-900/10 scale-[1.01]"
                                  : "hover:bg-slate-50 text-slate-600 hover:text-[#004225]"
                                  }`}
                              >
                                <span className={`text-[12px] font-semibold leading-normal ${isActive ? "text-white" : "text-slate-600 group-hover/item:text-[#004225]"}`}>
                                  {item.text}
                                </span>
                                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Content Pane */}
          <div id="placements-content-area" className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl md:p-8 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-200/50 relative overflow-hidden min-h-[500px]">
              {/* Premium Background Accent */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50/40 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-10 select-text">
                {currentActiveSlug !== "about-cell" && (
                  <>
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold text-[10px] md:text-xs uppercase tracking-widest font-outfit mb-8 shadow-sm">
                      {React.createElement(activeGroup.icon, { className: "w-3.5 h-3.5" })}
                      {activeGroup.title}
                    </div>

                    <h2 className="font-outfit text-2xl md:text-4xl font-black text-slate-850 mb-8 leading-tight tracking-tight">
                      {sectionData.title}
                    </h2>
                  </>
                )}

                <div className="prose prose-slate max-w-none prose-headings:font-outfit prose-p:font-sans">
                  {currentActiveSlug === "about-cell" ? (
                    <PlacementsLanding onNavigate={handleSlugChange} />
                  ) : (
                    renderContentBody(sectionData.content)
                  )}
                </div>
              </div>
            </div>

            {/* Beautiful Image Gallery Section */}
            {processedImages && processedImages.length > 0 && (
              <div className="mt-8 bg-white border border-slate-200/50 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] animate-fadeIn select-none">
                <h3 className="font-outfit text-xl md:text-2xl font-black text-[#004225] tracking-tight mb-6 flex items-center gap-3">
                  <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-[#004225] to-emerald-600 shrink-0"></span>
                  Event & Activity Gallery
                </h3>

                {hasMultipleGroupsOrYear ? (
                  sortedYearHeadings.map((year) => {
                    const items = groupedImages[year];
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={year} className="mb-8 last:mb-0">
                        <h4 className="font-outfit text-sm md:text-base font-extrabold text-emerald-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Academic Year: {year}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                          {items.map(({ img, globalIndex }) => {
                            const displayCaption = img.caption?.replace(/^\[\d{4}-\d{4}\]\s*/, "") || "";
                            return (
                              <div 
                                key={globalIndex}
                                onClick={() => setLightboxIndex(globalIndex)}
                                className="group relative h-40 sm:h-48 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/40 shadow-sm hover:shadow-lg hover:border-emerald-350 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                              >
                                <img 
                                  src={img.url ? `${img.url}?w=600&q=70&fit=max&auto=format` : ""} 
                                  alt={displayCaption || `Photo ${globalIndex + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                  <p className="text-white text-[11px] font-semibold line-clamp-2 leading-snug">
                                    {displayCaption || `View full image`}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {visibleImages.map((img, idx) => {
                      const displayCaption = img.caption?.replace(/^\[\d{4}-\d{4}\]\s*/, "") || "";
                      return (
                        <div 
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className="group relative h-40 sm:h-48 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/40 shadow-sm hover:shadow-lg hover:border-emerald-350 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        >
                          <img 
                            src={img.url ? `${img.url}?w=600&q=70&fit=max&auto=format` : ""} 
                            alt={displayCaption || `Photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <p className="text-white text-[11px] font-semibold line-clamp-2 leading-snug">
                              {displayCaption || `View full image`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {visibleCount < processedImages.length && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-[#004225] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-900/10 hover:from-emerald-500 hover:to-emerald-600 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      Load More Photos ({visibleCount} of {processedImages.length})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Flipbook Modal Reader */}
      <FilePreviewModal
        isOpen={!!selectedFileUrl}
        onClose={() => {
          setSelectedFileUrl(null);
          setSelectedFileTitle("");
        }}
        fileUrl={selectedFileUrl || ""}
        title={selectedFileTitle}
      />

      {/* Premium Gallery Lightbox Modal */}
      {lightboxIndex !== null && processedImages[lightboxIndex] && (() => {
        const currentImg = processedImages[lightboxIndex];
        const displayCaption = currentImg.caption?.replace(/^\[\d{4}-\d{4}\]\s*/, "") || "Placements Activity Image";
        return (
          <div 
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 select-none animate-fadeIn"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95 z-[101] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Main Viewer Row */}
            <div className="w-full max-w-5xl h-[70vh] flex items-center justify-between gap-4 relative">
              {/* Left Nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === 0 ? processedImages.length - 1 : prev! - 1));
                }}
                className="h-12 w-12 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Image Frame */}
              <div 
                className="flex-1 h-full relative flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={currentImg.url ? `${currentImg.url}?w=1600&q=80&fit=max&auto=format` : ""}
                  alt={displayCaption}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl select-text"
                />
              </div>

              {/* Right Nav */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === processedImages.length - 1 ? 0 : prev! + 1));
                }}
                className="h-12 w-12 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Metadata Footer */}
            <div 
              className="mt-6 text-center max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white font-outfit text-base md:text-lg font-bold leading-relaxed select-text">
                {displayCaption}
              </p>
              <span className="inline-block mt-2 text-xs font-semibold text-slate-400">
                Image {lightboxIndex + 1} of {processedImages.length}
              </span>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
