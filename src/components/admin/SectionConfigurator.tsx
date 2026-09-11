"use client";

import React, { useState } from "react";
import {
  SectionConfig,
  SectionColors,
  SectionLayout,
} from "@/lib/customizer-schema";
import {
  ChevronDown,
  Palette,
  LayoutTemplate,
  Eye,
  EyeOff,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Quote,
  Bell,
  GraduationCap,
  Building,
  Target,
  ExternalLink,
  Award,
  ArrowRight,
  Phone,
  Megaphone,
  Menu,
  ShieldCheck,
  AlertCircle,
  Check,
  CheckCircle2,
  Compass,
  Type,
  Sliders,
  SlidersHorizontal,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

// --- PRESETS & OPTIONS MATCHING ORIGINAL CUSTOMIZERS ---
const LOGO_BAR_PRESETS = [
  { name: "Pure White", hex: "#ffffff" },
  { name: "Midnight Navy", hex: "#002147" },
  { name: "Slate Dark", hex: "#0f172a" },
  { name: "Off White", hex: "#f8fafc" },
  { name: "Deep Teal", hex: "#002b36" },
  { name: "Oxford Blue", hex: "#1e1b4b" },
  { name: "Emerald Dark", hex: "#022c22" },
  { name: "Ivory Cream", hex: "#fffbeb" },
];

const TOP_NAV_PRESETS = [
  { name: "Midnight Navy", hex: "#002147" },
  { name: "Deep Teal", hex: "#084c61" },
  { name: "Oxford Indigo", hex: "#312e81" },
  { name: "Slate Charcoal", hex: "#1e293b" },
  { name: "Emerald Heritage", hex: "#064e3b" },
  { name: "Burgundy Wine", hex: "#581c1c" },
  { name: "Royal Blue", hex: "#1e3a8a" },
  { name: "Pure White", hex: "#ffffff" },
];

const TOP_NAV_LINK_PRESETS = [
  { name: "Pure White", hex: "#ffffff" },
  { name: "Soft Slate", hex: "#e2e8f0" },
  { name: "Pale Gold", hex: "#fef08a" },
  { name: "Ice Cyan", hex: "#67e8f9" },
  { name: "Dark Slate", hex: "#0f172a" },
  { name: "Midnight Navy", hex: "#002147" },
  { name: "Amber Gold", hex: "#f59e0b" },
  { name: "Mint Light", hex: "#a7f3d0" },
];

const ANNOUNCEMENT_BG_PRESETS = [
  { name: "Slate 950", val: "#020617" },
  { name: "Midnight Navy", val: "#001730" },
  { name: "Royal Oxford", val: "#002147" },
  { name: "Charcoal 900", val: "#0f172a" },
  { name: "Deep Maroon", val: "#2c0b0e" },
  { name: "Pure White", val: "#ffffff" },
];

const ANNOUNCEMENT_BADGE_PRESETS = [
  { name: "Alert Crimson", val: "#dc2626" },
  { name: "Royal Navy", val: "#1e40af" },
  { name: "Amber Gold", val: "#d97706" },
  { name: "Emerald", val: "#059669" },
  { name: "Deep Maroon", val: "#831843" },
  { name: "Electric Purple", val: "#7c3aed" },
  { name: "Dark Indigo", val: "#312e81" },
];

const ANNOUNCEMENT_BADGE_TEXT_PRESETS = [
  { name: "Pure White", val: "#ffffff" },
  { name: "Bright Yellow", val: "#fef08a" },
  { name: "Light Amber", val: "#fef3c7" },
  { name: "Ice Blue", val: "#e0f2fe" },
  { name: "Dark Slate", val: "#0f172a" },
];

const ANNOUNCEMENT_TEXT_PRESETS = [
  { name: "Crisp White", val: "#ffffff" },
  { name: "Light Slate", val: "#e2e8f0" },
  { name: "Muted Slate", val: "#94a3b8" },
  { name: "Warm Amber", val: "#fef3c7" },
  { name: "Dark Navy", val: "#002147" },
];

const FONT_OPTIONS = [
  { label: "System Sans (Default)", value: "system-ui, -apple-system, sans-serif" },
  { label: "Inter Modern", value: "var(--font-inter), sans-serif" },
  { label: "Outfit Academic", value: "var(--font-outfit), sans-serif" },
  { label: "Montserrat Bold", value: "var(--font-montserrat), sans-serif" },
  { label: "Playfair Prestige (Serif)", value: "var(--font-playfair), serif" },
  { label: "Cinzel Classical (Heritage)", value: "var(--font-cinzel), serif" },
];

const WEIGHT_OPTIONS = [
  { label: "500 Medium", value: "500" },
  { label: "600 Semi-Bold", value: "600" },
  { label: "700 Bold", value: "700" },
  { label: "800 Extra-Bold", value: "800" },
];

interface SectionConfiguratorProps {
  section: SectionConfig;
  onChange: (updated: SectionConfig) => void;
  onReset?: () => void;
}

export default function SectionConfigurator({
  section,
  onChange,
}: SectionConfiguratorProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"colors" | "layout">("colors");
  const [showPreview, setShowPreview] = useState(true);

  // Sub-modes matching the website customizers
  const [logoSubMode, setLogoSubMode] = useState<"background" | "typography">("background");
  const [headerColorSync, setHeaderColorSync] = useState<"all" | "individual">("all");
  const [navSubMode, setNavSubMode] = useState<"background" | "links">("background");
  const [navLinkSync, setNavLinkSync] = useState<"all" | "individual">("all");

  // Section identification flags
  const isAnnouncement =
    section.id === "announcement-ticker" ||
    section.id === "announcement-contacts" ||
    section.id.toLowerCase().includes("announcement");

  const isLogoBar =
    section.id === "main-logo-bar" ||
    section.id === "logo-bar-accreditation" ||
    section.id === "accreditation-badges" ||
    section.id.toLowerCase().includes("logo");

  const isNav =
    section.id === "main-navigation" ||
    section.id === "navigation-megamenu" ||
    section.id === "dropdown-menus" ||
    section.id.toLowerCase().includes("nav");

  const updateColor = (key: keyof SectionColors, value: any) => {
    onChange({
      ...section,
      colors: {
        ...section.colors,
        [key]: value,
      },
    });
  };

  const updateColors = (newColors: Partial<SectionColors>) => {
    onChange({
      ...section,
      colors: {
        ...section.colors,
        ...newColors,
      },
    });
  };

  const updateLayout = (key: keyof SectionLayout, value: any) => {
    onChange({
      ...section,
      layout: {
        ...section.layout,
        [key]: value,
      },
    });
  };

  const colors = section.colors;
  const layout = section.layout;

  // Helper mappings for layout classes in the preview
  const paddingMap = {
    compact: "py-2 px-3",
    normal: "py-4 px-4 sm:px-6",
    spacious: "py-6 px-6 sm:px-8",
    extra: "py-10 px-8 sm:px-12",
  };

  const maxWidthMap = {
    compact: "max-w-md mx-auto",
    contained: "max-w-4xl mx-auto",
    wide: "max-w-5xl mx-auto",
    full: "w-full",
  };

  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const radiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-3xl",
  };

  const cardStyleMap = {
    elevated: "shadow-md border",
    bordered: "border-2 shadow-none",
    glass: "backdrop-blur-md bg-white/40 border border-white/40 shadow-sm",
    flat: "shadow-none border border-transparent",
  };

  const gridColsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all overflow-hidden mb-5">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 cursor-pointer bg-slate-50/70 hover:bg-slate-100/70 border-b border-slate-200/60 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              updateLayout("visible", !layout.visible);
            }}
            title={layout.visible ? "Section is visible" : "Section is hidden"}
            className={`p-2 rounded-lg transition-colors ${
              layout.visible
                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                : "bg-rose-50 text-rose-600 hover:bg-rose-100"
            }`}
          >
            {layout.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-base">{section.name}</h3>
              {!layout.visible && (
                <span className="text-[11px] font-medium uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                  Hidden
                </span>
              )}
            </div>
            {section.description && (
              <p className="text-xs text-slate-500 mt-0.5">{section.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Color Preview Swatches */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 shadow-2xs">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Palette:</span>
            <div
              className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
              style={{ backgroundColor: colors.bgColor }}
              title={`Background: ${colors.bgColor}`}
            />
            <div
              className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
              style={{ backgroundColor: colors.headingColor }}
              title={`Heading: ${colors.headingColor}`}
            />
            <div
              className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
              style={{ backgroundColor: colors.accentColor }}
              title={`Accent: ${colors.accentColor}`}
            />
            <div
              className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
              style={{ backgroundColor: colors.cardBg }}
              title={`Card: ${colors.cardBg}`}
            />
          </div>

          {/* Toggle Live Preview Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(!showPreview);
            }}
            title={showPreview ? "Hide Live Preview" : "Show Live Preview"}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showPreview
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-6">
          {/* HIGH-FIDELITY LIVE PREVIEW (MATCHES THE REAL WEBSITE SECTION) */}
          {showPreview && (
            <div className="mb-8 rounded-2xl border border-slate-300/80 overflow-hidden shadow-sm bg-slate-900 transition-all">
              {/* Preview Bar Label */}
              <div className="px-4 py-2 bg-slate-800 text-slate-200 flex items-center justify-between text-xs border-b border-slate-700">
                <div className="flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real Section Preview (Before Saving)</span>
                  <span className="text-[11px] text-slate-400 font-normal hidden md:inline">
                    • Updates live as you customize colors &amp; layout below
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!layout.visible ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-400/40 px-2 py-0.5 rounded-full">
                      Section Hidden
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                      Section Visible
                    </span>
                  )}
                </div>
              </div>

              {/* SECTION-SPECIFIC REALISTIC PREVIEWS */}
              <div
                className={`w-full transition-all duration-150 relative overflow-hidden ${
                  paddingMap[layout.paddingY] || "py-4 px-4"
                }`}
                style={{
                  background: colors.isGradient && colors.bgGradient ? colors.bgGradient : colors.bgColor,
                  borderBottom: `1px solid ${colors.borderColor}`,
                  opacity: layout.visible ? 1 : 0.4,
                }}
              >
                {!layout.visible && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center z-20">
                    <span className="text-xs font-bold text-white bg-rose-600 px-3.5 py-1.5 rounded-full shadow-lg">
                      Section is set to Hidden
                    </span>
                  </div>
                )}

                {/* 0A. ANNOUNCEMENT TICKER PREVIEW: Exact replica of live website top marquee announcement bar */}
                {section.id === "announcement-ticker" ? (
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div
                      className="w-full rounded-xl border overflow-hidden select-none transition-all duration-200 shadow-md px-4 flex items-center justify-between gap-4"
                      style={{
                        backgroundColor: colors.isGradient && colors.bgGradient ? undefined : (colors.announcementBg || colors.bgColor || "#020617"),
                        backgroundImage: colors.isGradient ? colors.bgGradient : undefined,
                        borderColor: colors.borderColor || "#1e293b",
                        color: colors.announcementTextColor || colors.textColor || "#e2e8f0",
                        minHeight: `${layout.announcementHeight || 40}px`,
                        height: `${layout.announcementHeight || 40}px`,
                      }}
                    >
                      {/* Left: Announcements Badge & Live Marquee */}
                      <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden h-full">
                        {/* Red Blinking Badge */}
                        <div
                          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-extrabold tracking-wider uppercase text-[10px] shrink-0 shadow-md ${
                            layout.announcementBlinkStyle === "rapid"
                              ? "animate-announcement-badge-rapid ring-2 ring-red-400/80"
                              : layout.announcementBlinkStyle === "glow"
                              ? "animate-announcement-badge-pulse-glow ring-2 ring-blue-400/80"
                              : layout.announcementBlinkStyle === "solid"
                              ? "ring-1 ring-white/30"
                              : "animate-announcement-badge-blink ring-2 ring-red-400/80"
                          }`}
                          style={{
                            backgroundColor: colors.announcementBadgeBg || colors.badgeBg || "#dc2626",
                            color: colors.announcementBadgeTextColor || colors.badgeTextColor || "#ffffff",
                          }}
                        >
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                          </span>
                          <Bell className="h-3 w-3 animate-bounce shrink-0" />
                          <span className="font-outfit tracking-wide font-black">
                            {layout.announcementBadgeText || "ANNOUNCEMENTS"}
                          </span>
                        </div>

                        {/* Scrolling Ticker Text Preview */}
                        <div
                          className="flex items-center gap-6 overflow-hidden whitespace-nowrap font-semibold"
                          style={{ fontSize: `${layout.announcementFontSize || 12}px` }}
                        >
                          {layout.announcementCustomText && (
                            <>
                              <span className="flex items-center gap-1.5 font-bold" style={{ color: colors.accentColor || "#38bdf8" }}>
                                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                                <span>{layout.announcementCustomText}</span>
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            </>
                          )}
                          <span className="flex items-center gap-1.5 font-bold" style={{ color: colors.accentColor || "#38bdf8" }}>
                            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>Admissions Open 2026-27 (UG &amp; PG Degree Programs)</span>
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          <span className="opacity-90">Accredited by NAAC with &apos;A&apos; Grade • Autonomous Institution</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span className="opacity-90">End Semester Autonomous Examination Timetable Released</span>
                        </div>
                      </div>

                      {/* Right: Contact Numbers */}
                      {layout.announcementShowContact !== false && (
                        <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs font-bold pl-3 border-l border-white/10">
                          <Phone className="w-3.5 h-3.5" style={{ color: colors.accentColor || "#38bdf8" }} />
                          <span className="text-[11px] opacity-80">Help Desk:</span>
                          <span className="text-xs font-black tracking-wide" style={{ color: colors.accentColor || "#38bdf8" }}>
                            {layout.announcementPhone1 || "0863-2236470"}
                          </span>
                          <span className="opacity-40">|</span>
                          <span className="text-xs font-black tracking-wide" style={{ color: colors.accentColor || "#38bdf8" }}>
                            {layout.announcementPhone2 || "7382104655"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : section.id === "emergency-alerts" ? (
                  /* 0B. EMERGENCY NOTIFICATIONS & HELPLINE RIBBON */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div
                      className="w-full rounded-xl border p-3 flex flex-wrap items-center justify-between gap-3 shadow-md"
                      style={{
                        backgroundColor: colors.isGradient && colors.bgGradient ? undefined : colors.bgColor,
                        backgroundImage: colors.isGradient ? colors.bgGradient : undefined,
                        borderColor: colors.borderColor || "#b91c1c",
                        color: colors.textColor || "#fecaca",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-4 h-4 text-white animate-pulse" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white text-rose-900">
                              Urgent Notice
                            </span>
                            <span className="text-xs font-black" style={{ color: colors.headingColor || "#ffffff" }}>
                              Autonomous Examination Hall Tickets &amp; Circulars
                            </span>
                          </div>
                          <p className="text-[11px] opacity-90 mt-0.5">
                            Official instructions for autonomous degree students. Helpline desks are operational 9 AM - 5 PM.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider cursor-default shadow-xs"
                          style={{
                            backgroundColor: colors.accentColor || "#fef08a",
                            color: "#0f172a",
                          }}
                        >
                          View Hall Tickets
                        </span>
                      </div>
                    </div>
                  </div>
                ) : section.id === "main-logo-bar" ? (
                  /* 0C. MAIN LOGO BAR PREVIEW: Exact replica of live website college branding & crest bar */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div
                      className="w-full rounded-2xl border shadow-sm select-none transition-all duration-200 px-4 flex flex-col md:flex-row items-center justify-between gap-4"
                      style={{
                        backgroundColor: colors.logoBarColor || colors.bgColor || "#ffffff",
                        borderColor: colors.borderColor || "#e2e8f0",
                        paddingTop: `${(layout.logoBarPaddingY || 0) + 12}px`,
                        paddingBottom: `${(layout.logoBarPaddingY || 0) + 12}px`,
                      }}
                    >
                      {/* Left: Official College Crest Logo & Full 4/6-Line Typography */}
                      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        <img
                          src="/images/Crest_Logo.png?v=full_v5"
                          alt="St. Ann's Crest Logo"
                          className="w-auto object-contain shrink-0 drop-shadow-xs"
                          style={{
                            height: `${layout.crestLogoSize || 80}px`,
                            maxHeight: "120px",
                          }}
                        />
                        <div
                          className="flex flex-col justify-center transition-all"
                          style={{
                            textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            alignItems: (layout.headerTextAlign || layout.alignment || "left") === "center"
                              ? "center"
                              : (layout.headerTextAlign || layout.alignment || "left") === "right"
                              ? "flex-end"
                              : "flex-start",
                          }}
                        >
                          <h1
                            className="font-black tracking-tight leading-none uppercase text-base sm:text-lg w-full transition-colors"
                            style={{
                              color: colors.headerLine1Color || colors.headingColor || "#002b49",
                              textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            }}
                          >
                            ST. ANN’S COLLEGE FOR WOMEN
                          </h1>
                          <span
                            className="font-bold tracking-tight text-[11px] sm:text-xs mt-1 w-full transition-colors"
                            style={{
                              color: colors.headerLine2Color || colors.headerSubColor || colors.textColor || "#1e3a8a",
                              textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            }}
                          >
                            Run by The Society of St Anne
                          </span>
                          <span
                            className="font-semibold text-[10px] mt-0.5 w-full transition-colors"
                            style={{
                              color: colors.headerLine3Color || colors.headerAccentColor || colors.accentColor || "#991b1b",
                              textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            }}
                          >
                            Affiliated to Acharya Nagarjuna University, Approved by AICTE
                          </span>
                          <span
                            className="font-semibold text-[9.5px] mt-0.5 w-full transition-colors"
                            style={{
                              color: colors.headerLine4Color || colors.headerAccentColor || colors.accentColor || "#991b1b",
                              textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            }}
                          >
                            Recognized under Section 2(f) of the UGC Act, 1956, New Delhi.
                          </span>
                          <span
                            className="font-semibold text-[9.5px] mt-0.5 w-full transition-colors"
                            style={{
                              color: colors.headerLine5Color || colors.headerSubColor || "#0284c7",
                              textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            }}
                          >
                            Accredited by NAAC with &apos;A&apos; Grade in the First Cycle
                          </span>
                          <span
                            className="text-[9px] sm:text-[10px] opacity-80 mt-0.5 w-full transition-colors"
                            style={{
                              color: colors.headerLine6Color || colors.headerAddressColor || colors.textColor || "#475569",
                              textAlign: (layout.headerTextAlign || layout.alignment || "left") as any,
                            }}
                          >
                            Amaravathi Road, Gorantla, Guntur–34, Andhra Pradesh, India.
                          </span>
                        </div>
                      </div>

                      {/* Right: Accreditations & Apply Now Action */}
                      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap justify-center">
                        {/* 29 Years Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 shadow-2xs">
                          <Award className="w-4 h-4 text-amber-600 shrink-0" />
                          <div className="text-left">
                            <span className="block text-[10px] font-black leading-none">29+ YEARS</span>
                            <span className="block text-[8px] font-semibold text-amber-700 leading-none mt-0.5">1997 - 2026</span>
                          </div>
                        </div>

                        {/* NAAC Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 text-white shadow-2xs border border-slate-800">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div className="text-left">
                            <span className="block text-[10px] font-black leading-none text-emerald-400">NAAC &apos;A&apos;</span>
                            <span className="block text-[8px] font-semibold text-slate-300 leading-none mt-0.5">Accredited</span>
                          </div>
                        </div>

                        {/* Apply Now Button */}
                        <div
                          className="flex items-center gap-1.5 rounded-full px-4 py-2 font-bold text-white text-xs tracking-wider uppercase shadow-md cursor-default transition-all"
                          style={{
                            backgroundColor: colors.accentColor || "#059669",
                          }}
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : section.id === "accreditation-badges" ? (
                  /* 0D. ACCREDITATIONS & APPLY NOW ACTION ROW PREVIEW */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div
                      className="w-full rounded-2xl border p-4 shadow-sm flex flex-wrap items-center justify-between gap-4"
                      style={{
                        backgroundColor: colors.cardBg || "#f8fafc",
                        borderColor: colors.borderColor || "#e2e8f0",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-400/20">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800">Accreditations, Honors &amp; Admissions Action</h4>
                          <p className="text-xs text-slate-500">Badges displayed in the top header and hero banner across all pages.</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-black text-slate-800">29+ Years Excellence</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-2xs flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-black text-emerald-400">NAAC &apos;A&apos; Grade</span>
                        </div>
                        <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-black text-slate-800">AICTE Approved</span>
                        </div>
                        <div
                          className="px-4 py-2 rounded-full font-black text-white text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5"
                          style={{
                            backgroundColor: colors.accentColor || "#059669",
                          }}
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : section.id === "main-navigation" ? (
                  /* 0E. MAIN NAVIGATION BAR PREVIEW: Exact replica of the 14-link sticky navbar */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div
                      className="w-full rounded-2xl border shadow-md select-none transition-all duration-200 px-4"
                      style={{
                        backgroundColor: colors.isGradient && colors.bgGradient ? undefined : (colors.topNavColor || colors.bgColor || "#002147"),
                        backgroundImage: colors.isGradient ? colors.bgGradient : undefined,
                        borderColor: colors.borderColor || "#001730",
                        color: colors.topNavLinkColor || colors.textColor || "#ffffff",
                        fontFamily: layout.topnavFontFamily || "inherit",
                        paddingTop: `${layout.topnavPaddingY || 10}px`,
                        paddingBottom: `${layout.topnavPaddingY || 10}px`,
                      }}
                    >
                      <div
                        className="flex items-center justify-between overflow-x-auto whitespace-nowrap pb-1"
                        style={{
                          gap: `${layout.topnavSpacing || 20}px`,
                          fontSize: "20px",
                          fontWeight: 700,
                        }}
                      >
                        {/* 1. Home (Active Link) */}
                        <div
                          className="px-2.5 py-1 rounded-lg transition-colors cursor-default"
                          style={{
                            color: colors.accentColor || "#38bdf8",
                            backgroundColor: "rgba(255,255,255,0.08)",
                          }}
                        >
                          1. Home
                        </div>
                        {/* Remaining Links with subtle arrow indicator */}
                        {[
                          "2. About Us",
                          "3. Academics",
                          "4. Admissions",
                          "5. Infrastructure",
                          "6. Faculty",
                          "7. Student Support",
                          "8. Placements",
                          "9. Research",
                          "10. Alumni",
                          "11. IQAC",
                          "12. Mandates",
                          "13. Strategic",
                          "14. Contact",
                        ].map((linkTitle, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-default opacity-90"
                            style={{ color: colors.topNavLinkColor || colors.textColor || "#ffffff" }}
                          >
                            <span>{linkTitle}</span>
                            <ChevronDown className="w-3 h-3 opacity-60" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : section.id === "dropdown-menus" ? (
                  /* 0F. DROPDOWN MEGA-MENUS PREVIEW: Realistic mega menu flyout panel */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div
                      className="w-full rounded-2xl border shadow-xl p-5 select-none transition-all duration-200 text-left"
                      style={{
                        backgroundColor: colors.cardBg || "#ffffff",
                        borderColor: colors.borderColor || "#e2e8f0",
                        color: colors.textColor || "#475569",
                      }}
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Menu className="w-4 h-4 text-blue-600" />
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                            Mega-Menu Dropdown Panel Preview (e.g. &quot;About Us&quot;)
                          </h4>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: colors.accentColor ? `${colors.accentColor}15` : "#2563eb15",
                            color: colors.accentColor || "#2563eb",
                          }}
                        >
                          3 Columns
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Column 1 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                            <Building className="w-3.5 h-3.5 text-blue-700" />
                            <span className="text-xs font-black" style={{ color: colors.headingColor || "#002147" }}>
                              I. The Institution
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              About the College
                            </li>
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              Vision, Mission &amp; Motto
                            </li>
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              Head of the Institution
                            </li>
                          </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                            <GraduationCap className="w-3.5 h-3.5 text-indigo-700" />
                            <span className="text-xs font-black" style={{ color: colors.headingColor || "#002147" }}>
                              II. Governance
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              Governing Body
                            </li>
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              Academic Council
                            </li>
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              Board of Studies (BOS)
                            </li>
                          </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                            <Award className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="text-xs font-black" style={{ color: colors.headingColor || "#002147" }}>
                              III. Accreditation
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              NAAC Certificates
                            </li>
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              NIRF Disclosures
                            </li>
                            <li className="hover:text-blue-700 cursor-default flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accentColor }} />
                              ISO 9001:2015 Certifications
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : section.id === "hero-slider" ? (
                  <div className={`w-full relative ${maxWidthMap[layout.maxWidth] || "w-full"}`}>
                    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-black aspect-[16/7] sm:aspect-[21/9] flex items-center justify-center group/hero select-none">
                      {/* Real Banner Image from live website */}
                      <img
                        src="https://cdn.sanity.io/images/fhjwqub5/production/fe7432bfb0fa5ce6cf3899de4ae0a627dd5c75a7-1672x941.png"
                        alt="St. Ann's College Live Banner"
                        className="w-full h-full object-cover object-top"
                      />

                      {/* Left Social Media Handle Bar (Exact replica of live website) */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col z-20 shadow-md">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#FF0000] text-white flex items-center justify-center text-[9px] font-bold">
                          ▶
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#1877F2] text-white flex items-center justify-center text-[9px] font-bold">
                          f
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#E4405F] text-white flex items-center justify-center text-[9px] font-bold">
                          📷
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#25D366] text-white flex items-center justify-center text-[9px] font-bold">
                          💬
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#0A66C2] text-white flex items-center justify-center text-[9px] font-bold">
                          in
                        </div>
                      </div>

                      {/* Carousel Prev & Next Chevrons */}
                      <div className="absolute left-8 sm:left-9 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                        <ChevronLeft className="w-4 h-4" />
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                        <ChevronRight className="w-4 h-4" />
                      </div>

                      {/* Bottom Slide Indicators */}
                      <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                        <span
                          className="w-6 h-1.5 rounded-full shadow-xs transition-all"
                          style={{ backgroundColor: colors.accentColor || "#f59e0b" }}
                        />
                        <span className="w-2 h-1.5 rounded-full bg-white/60" />
                        <span className="w-2 h-1.5 rounded-full bg-white/60" />
                        <span className="w-2 h-1.5 rounded-full bg-white/60" />
                      </div>
                    </div>
                  </div>
                ) : section.id === "three-column-highlights" || section.id === "stats-counters" ? (
                  /* 2. THREE-COLUMN HIGHLIGHTS PREVIEW: Events, Principal's Desk & Notice Board */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      {/* Box 1: Events & Activities */}
                      <div
                        className={`overflow-hidden border transition-all ${radiusMap[layout.borderRadius] || "rounded-2xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.borderColor,
                        }}
                      >
                        <div
                          className="px-3.5 py-2 text-white flex items-center justify-between text-xs"
                          style={{
                            background: colors.accentColor ? `linear-gradient(to right, ${colors.accentColor}, #002147)` : "linear-gradient(to right, #002147, #0a3d78)",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-sky-300" />
                            <span className="font-black">Events &amp; Activities</span>
                          </div>
                          <span className="text-[9px] font-bold bg-emerald-400 text-slate-950 px-1.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-ping" />
                            Upcoming
                          </span>
                        </div>
                        <div className="p-3 text-xs space-y-2">
                          <div className="border-b border-slate-100 pb-2">
                            <p className="font-bold text-slate-800 leading-snug">
                              National Remote Sensing Day Workshop
                            </p>
                            <span className="text-[10px] text-slate-500">12th August 2026 • Science Department</span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-snug">
                              AI Ethics &amp; Governance Faculty Seminar
                            </p>
                            <span className="text-[10px] text-slate-500">8th June 2028 • MCA Department</span>
                          </div>
                        </div>
                      </div>

                      {/* Box 2: Principal's Desk */}
                      <div
                        className={`overflow-hidden border transition-all ${radiusMap[layout.borderRadius] || "rounded-2xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.borderColor,
                        }}
                      >
                        <div
                          className="px-3.5 py-2 text-white flex items-center justify-between text-xs"
                          style={{
                            background: colors.accentColor ? `linear-gradient(to right, ${colors.accentColor}, #002147)` : "linear-gradient(to right, #002147, #0a3d78)",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Quote className="w-3.5 h-3.5 text-amber-300" />
                            <span className="font-black">Principal&apos;s Desk</span>
                          </div>
                          <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full uppercase">
                            Leadership
                          </span>
                        </div>
                        <div className="p-3 text-xs flex flex-col items-center text-center">
                          <div className="w-14 h-14 rounded-full border-2 border-indigo-300 mb-2 overflow-hidden shadow-sm aspect-square">
                            <img
                              src="/images/principal.jpg"
                              alt="Dr. Sr. Sandhya Thumma"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <h5 className="text-xs font-black text-slate-800">
                            Dr. Sr. Sandhya Thumma
                          </h5>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase">
                            Principal, St. Ann&apos;s College
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold mb-1">
                            MBA, M.Com, M.Ed, Ph.D.
                          </p>
                          <p className="text-[11px] text-slate-600 italic leading-snug bg-slate-50 p-2 rounded-lg border border-slate-100 mt-1">
                            &quot;Empowering women through holistic, value-based education and transformative leadership.&quot;
                          </p>
                        </div>
                      </div>

                      {/* Box 3: Notice Board */}
                      <div
                        className={`overflow-hidden border transition-all ${radiusMap[layout.borderRadius] || "rounded-2xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                        style={{
                          backgroundColor: colors.cardBg,
                          borderColor: colors.borderColor,
                        }}
                      >
                        <div
                          className="px-3.5 py-2 text-white flex items-center justify-between text-xs"
                          style={{
                            background: colors.accentColor ? `linear-gradient(to right, ${colors.accentColor}, #002147)` : "linear-gradient(to right, #002147, #0a3d78)",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Bell className="w-3.5 h-3.5 text-rose-300" />
                            <span className="font-black">Notice Board</span>
                          </div>
                          <span className="text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            Active
                          </span>
                        </div>
                        <div className="p-3 text-xs space-y-2">
                          <div className="border-b border-slate-100 pb-2 flex items-start gap-2">
                            <span className="text-rose-600 font-black text-xs mt-0.5">✉</span>
                            <div>
                              <p className="font-bold text-slate-800 leading-snug">
                                UG I Year – Phase I Seat Allotment
                              </p>
                              <span className="text-[10px] text-slate-500">7 September 2026 • APCFSS</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-rose-600 font-black text-xs mt-0.5">✉</span>
                            <div>
                              <p className="font-bold text-slate-800 leading-snug">
                                Commencement of MCA & MBA Classes
                              </p>
                              <span className="text-[10px] text-slate-500">16 September 2026 • Batch Y27</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : section.id === "why-choose" || section.id === "academic-programs" ? (
                  /* 3. WHY CHOOSE ST. ANN'S PREVIEW */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"} ${alignMap[layout.alignment] || "text-left"}`}>
                    <div className="mb-3">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1"
                        style={{ backgroundColor: colors.badgeBg, color: colors.badgeTextColor || "#ffffff" }}
                      >
                        <Sparkles className="w-3 h-3 text-indigo-300 animate-pulse" />
                        <span>Institution Pillars</span>
                      </span>
                      <h4 className="text-base sm:text-lg font-black tracking-tight" style={{ color: colors.headingColor }}>
                        Why Elite Students Choose St. Ann&apos;s
                      </h4>
                    </div>
                    {/* 4 Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {[
                        { title: "The 3C Philosophy", active: true },
                        { title: "Premium Academics", active: false },
                        { title: "World-Class Campus", active: false },
                        { title: "Career Success", active: false },
                      ].map((tab, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                            tab.active
                              ? "bg-[#002147] text-white border-[#002147] shadow-sm"
                              : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >
                          {tab.title}
                        </div>
                      ))}
                    </div>
                    {/* Active Tab Card */}
                    <div
                      className={`p-4 border text-left ${radiusMap[layout.borderRadius] || "rounded-2xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.borderColor,
                      }}
                    >
                      <h5 className="font-black text-sm text-slate-900 mb-1">
                        Character, Competence, and Compassion
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        At St. Ann&apos;s, higher education transcends regular classroom lectures. We foster moral uprightness, industrial capabilities, and dynamic social empathy.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">✓ Guided spiritual &amp; moral value mentoring</span>
                        <span className="flex items-center gap-1.5">✓ Experiential real-world case studies</span>
                      </div>
                    </div>
                  </div>
                ) : section.id === "campus-facilities" || section.id === "campus-life" ? (
                  /* 4. CAMPUS FACILITIES & PLACEMENT PREVIEW */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"} ${alignMap[layout.alignment] || "text-left"}`}>
                    <div className="mb-3">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1"
                        style={{ backgroundColor: colors.badgeBg, color: colors.badgeTextColor || "#ffffff" }}
                      >
                        Career Milestones
                      </span>
                      <h4 className="text-base sm:text-lg font-black tracking-tight" style={{ color: colors.headingColor }}>
                        Top Recruiters &amp; Placement Records
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border text-left flex flex-col justify-between ${radiusMap[layout.borderRadius] || "rounded-2xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                        style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                      >
                        <div>
                          <h5 className="font-bold text-xs text-slate-800 mb-1">100% Dedicated Placement Training</h5>
                          <p className="text-[11px] text-slate-600 leading-snug mb-3">
                            Aptitude grooming, Python/Java technical mock sessions, and soft-skill development drills.
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-700 uppercase">
                          MNC Recruitment Drives • 2024–2025
                        </span>
                      </div>
                      <div
                        className={`p-3 border text-center flex flex-col items-center justify-center ${radiusMap[layout.borderRadius] || "rounded-2xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                        style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                      >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Placement Statistics Graph</span>
                        <div className="w-full h-24 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 text-xs font-bold text-indigo-900">
                          📊 100% Placement Support Verified
                        </div>
                      </div>
                    </div>
                  </div>
                ) : section.id === "magazines-newsletters" ? (
                  /* 5. MAGAZINES & NEWSLETTERS PREVIEW */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"}`}>
                    <div className="mb-3 text-left">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 bg-indigo-100 text-indigo-800">
                        Publications
                      </span>
                      <h4 className="text-base sm:text-lg font-black tracking-tight" style={{ color: colors.headingColor }}>
                        College Magazines &amp; Newsletters
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`p-3.5 border text-left rounded-2xl ${cardStyleMap[layout.cardStyle] || "shadow-md"}`} style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">📖</span>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">Annual College Magazine &quot;ANNAURA&quot;</h5>
                            <span className="text-[10px] text-slate-500">Academic Year 2024–2025</span>
                          </div>
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          PDF Download Available
                        </span>
                      </div>
                      <div className={`p-3.5 border text-left rounded-2xl ${cardStyleMap[layout.cardStyle] || "shadow-md"}`} style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">📰</span>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">Quarterly Newsletter &quot;ANNQUEST&quot;</h5>
                            <span className="text-[10px] text-slate-500">Vol 14 • Issue 2</span>
                          </div>
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Digital Flipbook
                        </span>
                      </div>
                    </div>
                  </div>
                ) : section.id === "photo-gallery" ? (
                  /* 6. PHOTO GALLERY PREVIEW */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"}`}>
                    <div className="mb-3 text-left">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 bg-amber-100 text-amber-800">
                        Campus Life
                      </span>
                      <h4 className="text-base sm:text-lg font-black tracking-tight" style={{ color: colors.headingColor }}>
                        Campus Photo Gallery
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { title: "Main Academic Block", icon: "🏛" },
                        { title: "Science Laboratories", icon: "🔬" },
                        { title: "Central Digital Library", icon: "📚" },
                        { title: "Sports Complex", icon: "🏆" },
                      ].map((card, idx) => (
                        <div
                          key={idx}
                          className="aspect-[4/3] rounded-xl bg-slate-800 text-white flex flex-col items-center justify-center p-2 text-center border border-slate-700"
                        >
                          <span className="text-2xl mb-1">{card.icon}</span>
                          <span className="text-[10px] font-bold leading-tight">{card.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : section.id === "mandates-compliance" || section.id === "bottom-actions" ? (
                  /* 7. OFFICIAL MANDATES PREVIEW */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"}`}>
                    <div className="mb-3 text-left">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 bg-sky-100 text-sky-800">
                        Statutory Accreditations
                      </span>
                      <h4 className="text-base sm:text-lg font-black tracking-tight" style={{ color: colors.headingColor }}>
                        Official Mandates &amp; Regulatory Compliance
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                      {[
                        { title: "APSCHE Orders", sub: "State Council Approvals", badge: "2025–2026" },
                        { title: "ANU Affiliations", sub: "Acharya Nagarjuna Univ", badge: "Grade A+" },
                        { title: "AICTE Approvals", sub: "MCA & MBA Programs", badge: "Approved" },
                      ].map((mandate, idx) => (
                        <div
                          key={idx}
                          className={`p-3 border rounded-xl ${cardStyleMap[layout.cardStyle] || "shadow-md"}`}
                          style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black text-slate-800">{mandate.title}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {mandate.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{mandate.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* 8. GENERAL HIGH-FIDELITY PREVIEW FOR OTHER PAGES */
                  <div className={`w-full ${maxWidthMap[layout.maxWidth] || "max-w-4xl mx-auto"} ${alignMap[layout.alignment] || "text-left"}`}>
                    {colors.badgeBg && (
                      <div className="mb-2">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-2xs"
                          style={{
                            backgroundColor: colors.badgeBg,
                            color: colors.badgeTextColor || "#ffffff",
                          }}
                        >
                          Official Section
                        </span>
                      </div>
                    )}
                    <h4
                      className="text-base sm:text-lg font-black tracking-tight mb-1.5 transition-colors"
                      style={{ color: colors.headingColor }}
                    >
                      {section.name}
                    </h4>
                    {section.description && (
                      <p
                        className="text-xs opacity-90 leading-relaxed mb-4 max-w-xl transition-colors inline-block"
                        style={{ color: colors.textColor }}
                      >
                        {section.description}
                      </p>
                    )}
                    <div className={`grid gap-3 ${gridColsMap[layout.columns] || "grid-cols-3"}`}>
                      {[
                        { title: "Academic Curriculum & Syllabus", desc: "Structured degree pathways and course regulation credits." },
                        { title: "Faculty Mentorship & Guidance", desc: "Dedicated faculty advisors and practical labs support." },
                        { title: "Campus Facilities & Safety", desc: "Secure environment, ICT classrooms, and digital catalogs." },
                        { title: "Student Welfare & Career Cell", desc: "Professional placement training and skill certifications." },
                      ]
                        .slice(0, layout.columns)
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-3 transition-all text-left ${radiusMap[layout.borderRadius] || "rounded-xl"} ${cardStyleMap[layout.cardStyle] || "shadow-md border"}`}
                            style={{
                              backgroundColor: colors.cardBg,
                              borderColor: colors.borderColor,
                              color: colors.textColor,
                            }}
                          >
                            <div
                              className="font-bold text-xs mb-1 transition-colors flex items-center justify-between"
                              style={{ color: colors.headingColor }}
                            >
                              <span>{item.title}</span>
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: colors.accentColor }}
                              />
                            </div>
                            <p
                              className="text-[11px] leading-tight opacity-85 mb-3 transition-colors"
                              style={{ color: colors.textColor }}
                            >
                              {item.desc}
                            </p>
                            <div
                              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded transition-all cursor-default shadow-2xs"
                              style={{
                                backgroundColor: colors.accentColor,
                                color: "#ffffff",
                              }}
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sub-Tabs: Colors vs Layout */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("colors")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "colors"
                  ? "bg-[#002147] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Color Customisation</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("layout")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "layout"
                  ? "bg-[#002147] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Layout Customisation</span>
            </button>
          </div>

          {/* TAB 1: COLORS */}
          {activeTab === "colors" && (
            <div className="space-y-6">
              {isAnnouncement ? (
                /* ======================================================== */
                /* 1. ANNOUNCEMENT SECTION COLORS (EXACT PALETTES & PRESETS) */
                /* ======================================================== */
                <div className="space-y-6">
                  <div className="p-3.5 bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-red-200/80 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
                        <Bell className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="text-xs font-black text-slate-900 block">Top Announcement Bar Color Palettes</span>
                        <span className="text-[11px] text-red-700 font-medium">Quick presets for ticker background, text, and alert badge</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                      Sitewide
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* 1. Bar Background Color */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-slate-800">Bar Background Color</label>
                          <p className="text-[11px] text-slate-500">Background of the announcement ticker bar</p>
                        </div>
                        <span className="font-mono text-xs font-black uppercase text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {colors.announcementBg || colors.bgColor || "#020617"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={(colors.announcementBg || colors.bgColor || "#020617").startsWith("#") ? (colors.announcementBg || colors.bgColor || "#020617") : "#020617"}
                          onChange={(e) => {
                            updateColors({ bgColor: e.target.value, announcementBg: e.target.value });
                          }}
                          className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white shrink-0"
                        />
                        <input
                          type="text"
                          value={colors.announcementBg || colors.bgColor || "#020617"}
                          onChange={(e) => {
                            updateColors({ bgColor: e.target.value, announcementBg: e.target.value });
                          }}
                          className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 uppercase"
                        />
                      </div>

                      {/* Quick presets */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Quick Background Presets:</span>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                          {ANNOUNCEMENT_BG_PRESETS.map((p) => {
                            const active = (colors.announcementBg || colors.bgColor || "#020617").toLowerCase() === p.val.toLowerCase();
                            return (
                              <button
                                key={p.val}
                                type="button"
                                onClick={() => {
                                  updateColors({ bgColor: p.val, announcementBg: p.val });
                                }}
                                className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                  active ? "border-red-600 bg-red-50 shadow-xs ring-1 ring-red-500/20" : "border-slate-200 bg-white hover:bg-slate-100"
                                }`}
                                title={p.name}
                              >
                                <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.val }} />
                                <span className="text-[10px] font-bold text-slate-800 truncate">{p.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 2. Ticker Text Color */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-slate-800">Ticker Text Color</label>
                          <p className="text-[11px] text-slate-500">Color of the marquee messages and news headlines</p>
                        </div>
                        <span className="font-mono text-xs font-black uppercase text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {colors.announcementTextColor || colors.textColor || "#e2e8f0"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={(colors.announcementTextColor || colors.textColor || "#e2e8f0").startsWith("#") ? (colors.announcementTextColor || colors.textColor || "#e2e8f0") : "#e2e8f0"}
                          onChange={(e) => {
                            updateColors({ textColor: e.target.value, announcementTextColor: e.target.value });
                          }}
                          className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white shrink-0"
                        />
                        <input
                          type="text"
                          value={colors.announcementTextColor || colors.textColor || "#e2e8f0"}
                          onChange={(e) => {
                            updateColors({ textColor: e.target.value, announcementTextColor: e.target.value });
                          }}
                          className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 uppercase"
                        />
                      </div>

                      {/* Quick text presets */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Quick Text Presets:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                          {ANNOUNCEMENT_TEXT_PRESETS.map((p) => {
                            const active = (colors.announcementTextColor || colors.textColor || "#e2e8f0").toLowerCase() === p.val.toLowerCase();
                            return (
                              <button
                                key={p.val}
                                type="button"
                                onClick={() => {
                                  updateColors({ textColor: p.val, announcementTextColor: p.val });
                                }}
                                className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                  active ? "border-red-600 bg-red-50 shadow-xs ring-1 ring-red-500/20" : "border-slate-200 bg-white hover:bg-slate-100"
                                }`}
                              >
                                <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.val }} />
                                <span className="text-[10px] font-bold text-slate-800 truncate">{p.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 3. Badge Background Color */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-slate-800">Badge Background Color</label>
                          <p className="text-[11px] text-slate-500">Background of the pulsing &quot;ANNOUNCEMENTS&quot; badge</p>
                        </div>
                        <span className="font-mono text-xs font-black uppercase text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {colors.announcementBadgeBg || colors.badgeBg || "#dc2626"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={(colors.announcementBadgeBg || colors.badgeBg || "#dc2626").startsWith("#") ? (colors.announcementBadgeBg || colors.badgeBg || "#dc2626") : "#dc2626"}
                          onChange={(e) => {
                            updateColors({ badgeBg: e.target.value, announcementBadgeBg: e.target.value });
                          }}
                          className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white shrink-0"
                        />
                        <input
                          type="text"
                          value={colors.announcementBadgeBg || colors.badgeBg || "#dc2626"}
                          onChange={(e) => {
                            updateColors({ badgeBg: e.target.value, announcementBadgeBg: e.target.value });
                          }}
                          className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 uppercase"
                        />
                      </div>

                      {/* Quick badge presets */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Quick Badge Presets:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {ANNOUNCEMENT_BADGE_PRESETS.map((p) => {
                            const active = (colors.announcementBadgeBg || colors.badgeBg || "#dc2626").toLowerCase() === p.val.toLowerCase();
                            return (
                              <button
                                key={p.val}
                                type="button"
                                onClick={() => {
                                  updateColors({ badgeBg: p.val, announcementBadgeBg: p.val });
                                }}
                                className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                  active ? "border-red-600 bg-red-50 shadow-xs ring-1 ring-red-500/20" : "border-slate-200 bg-white hover:bg-slate-100"
                                }`}
                                title={p.name}
                              >
                                <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.val }} />
                                <span className="text-[10px] font-bold text-slate-800 truncate">{p.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 4. Badge Text Color */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-slate-800">Badge Text Color</label>
                          <p className="text-[11px] text-slate-500">Color of text inside the announcement badge</p>
                        </div>
                        <span className="font-mono text-xs font-black uppercase text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {colors.announcementBadgeTextColor || colors.badgeTextColor || "#ffffff"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={(colors.announcementBadgeTextColor || colors.badgeTextColor || "#ffffff").startsWith("#") ? (colors.announcementBadgeTextColor || colors.badgeTextColor || "#ffffff") : "#ffffff"}
                          onChange={(e) => {
                            updateColors({ badgeTextColor: e.target.value, announcementBadgeTextColor: e.target.value });
                          }}
                          className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white shrink-0"
                        />
                        <input
                          type="text"
                          value={colors.announcementBadgeTextColor || colors.badgeTextColor || "#ffffff"}
                          onChange={(e) => {
                            updateColors({ badgeTextColor: e.target.value, announcementBadgeTextColor: e.target.value });
                          }}
                          className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 uppercase"
                        />
                      </div>

                      {/* Quick badge text presets */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Quick Badge Text Presets:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                          {ANNOUNCEMENT_BADGE_TEXT_PRESETS.map((p) => {
                            const active = (colors.announcementBadgeTextColor || colors.badgeTextColor || "#ffffff").toLowerCase() === p.val.toLowerCase();
                            return (
                              <button
                                key={p.val}
                                type="button"
                                onClick={() => {
                                  updateColors({ badgeTextColor: p.val, announcementBadgeTextColor: p.val });
                                }}
                                className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                  active ? "border-red-600 bg-red-50 shadow-xs ring-1 ring-red-500/20" : "border-slate-200 bg-white hover:bg-slate-100"
                                }`}
                              >
                                <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.val }} />
                                <span className="text-[10px] font-bold text-slate-800 truncate">{p.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 5. Helpline & Sparkle Accent */}
                    <ColorInput
                      label="Helpline & Sparkle Accent"
                      value={colors.accentColor || "#38bdf8"}
                      onChange={(val) => updateColor("accentColor", val)}
                      description="Phone icons, phone numbers, and marquee sparkles"
                    />

                    {/* 6. Border / Bottom Divider Color */}
                    <ColorInput
                      label="Border / Bottom Divider Color"
                      value={colors.borderColor || "#1e293b"}
                      onChange={(val) => updateColor("borderColor", val)}
                      description="Divider line separating announcement ticker from header"
                    />
                  </div>
                </div>
              ) : isLogoBar ? (
                /* ======================================================== */
                /* 2. LOGO BAR SECTION COLORS (BACKGROUND VS TYPOGRAPHY)   */
                /* ======================================================== */
                <div className="space-y-6">
                  {/* Header Display Mode Selector */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <label className="text-xs font-bold text-slate-800">Header Display Mode</label>
                        <p className="text-[11px] text-slate-500">Choose between live HTML typography or graphic image header</p>
                      </div>
                      <span className="font-mono text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                        {layout.headerMode === "image_v1" ? "Image (4-Line)" : layout.headerMode === "image_v2" ? "Image (6-Line)" : "Live Text Mode"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => updateLayout("headerMode", "text")}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          (!layout.headerMode || layout.headerMode === "text")
                            ? "border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 font-bold"
                            : "border-slate-200 bg-white hover:bg-slate-100 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs text-slate-900 font-bold">
                          <Type className="w-3.5 h-3.5 text-purple-600" />
                          <span>Live Text Mode</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">Full color, typography & alignment control</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateLayout("headerMode", "image_v2")}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          layout.headerMode === "image_v2"
                            ? "border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 font-bold"
                            : "border-slate-200 bg-white hover:bg-slate-100 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs text-slate-900 font-bold">
                          <Building className="w-3.5 h-3.5 text-blue-600" />
                          <span>Graphic Header (6-Line)</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">Official high-res masthead image</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateLayout("headerMode", "image_v1")}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          layout.headerMode === "image_v1"
                            ? "border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 font-bold"
                            : "border-slate-200 bg-white hover:bg-slate-100 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs text-slate-900 font-bold">
                          <Building className="w-3.5 h-3.5 text-slate-600" />
                          <span>Graphic Header (4-Line)</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">Compact official masthead image</p>
                      </button>
                    </div>
                  </div>

                  {/* Sub-mode switcher */}
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setLogoSubMode("background")}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        logoSubMode === "background"
                          ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Building className="h-4 w-4" />
                      <span>Logo Bar Background</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLogoSubMode("typography")}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        logoSubMode === "typography"
                          ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Type className="h-4 w-4" />
                      <span>Text Mode Typography</span>
                    </button>
                  </div>

                  {logoSubMode === "background" ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Logo Bar Background Color (Fixed to #000080 Navy Blue) */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-xs font-bold text-slate-800">Logo Bar Background</label>
                              <p className="text-[11px] text-slate-500">Official college header background color (Fixed in code)</p>
                            </div>
                            <span className="font-mono text-xs font-black uppercase text-white bg-[#000080] px-2.5 py-1 rounded-lg shadow-2xs border border-blue-900">
                              #000080 (Navy Blue)
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 font-medium">
                            The Logo Bar background is permanently fixed in the codebase to official Navy Blue (#000080).
                          </p>
                        </div>

                        {/* Border Color */}
                        <ColorInput
                          label="Border / Divider Color"
                          value={colors.borderColor || "#e2e8f0"}
                          onChange={(val) => updateColor("borderColor", val)}
                          description="Lower outline border beneath the logo bar"
                        />

                        {/* Apply Now Accent Color */}
                        <ColorInput
                          label="Apply Now Button & Accent"
                          value={colors.accentColor || "#059669"}
                          onChange={(val) => updateColor("accentColor", val)}
                          description="Color of the Apply Now pill button & active badges"
                        />

                        {/* Badges Box Background */}
                        <ColorInput
                          label="Accreditation Box Background"
                          value={colors.cardBg || "#f8fafc"}
                          onChange={(val) => updateColor("cardBg", val)}
                          description="Background of accreditation cards and honors pills"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Text Mode Typography */
                    <div className="space-y-5">
                      <div className="p-3.5 bg-purple-50/90 border-2 border-purple-200 rounded-2xl text-xs text-purple-950 flex flex-col gap-1">
                        <span className="font-black flex items-center gap-1.5 text-purple-900 text-sm">
                          <Type className="h-4 w-4 text-purple-600" /> Live Text Mode Masthead Colors
                        </span>
                        <p className="text-[11px] text-purple-800 font-medium">
                          Customizes the 6 individual lines of the college header masthead (College Name, Society, University, UGC, NAAC, and Address).
                        </p>
                      </div>

                      {/* Masthead Text Alignment (Left, Center, Right) */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                        <div>
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                            <span>Masthead Text Alignment:</span>
                            <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                              {(layout.headerTextAlign || layout.alignment || "left").toUpperCase()}
                            </span>
                          </label>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Aligns all 6 lines of the college header (Left, Center, Right)
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
                          {[
                            { id: "left", label: "Left", icon: AlignLeft },
                            { id: "center", label: "Center", icon: AlignCenter },
                            { id: "right", label: "Right", icon: AlignRight },
                          ].map((al) => {
                            const active = (layout.headerTextAlign || layout.alignment || "left") === al.id;
                            const Icon = al.icon;
                            return (
                              <button
                                key={al.id}
                                type="button"
                                onClick={() => {
                                  updateLayout("alignment", al.id as any);
                                  updateLayout("headerTextAlign", al.id as any);
                                }}
                                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  active
                                    ? "bg-purple-700 text-white shadow-xs font-black ring-2 ring-purple-500/20"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{al.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Fixed College Name Brand Colors Notice */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-800">College Name & Masthead Colors</span>
                            <p className="text-[11px] text-slate-500">Fixed institutional brand colors in code</p>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg">
                            Fixed in Code
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-slate-700">1. College Name</span>
                            <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">#FFFFFF (White)</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-slate-700">2. Society Name</span>
                            <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">#E2FF94 (Lime)</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-slate-700">3. Affiliation & AICTE</span>
                            <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">#E2FF94 (Lime)</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-slate-700">4. UGC 2(f) Recognition</span>
                            <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">#E2FF94 (Lime)</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-slate-700">5. NAAC ‘A’ Grade</span>
                            <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">#E2FF94 (Lime)</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-slate-700">6. Campus Address</span>
                            <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">#FFFFFF (White - 13px)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : isNav ? (
                /* ======================================================== */
                /* 3. TOP NAV SECTION COLORS (BACKGROUND VS MENU LINKS)     */
                /* ======================================================== */
                <div className="space-y-6">
                  {/* Sub-mode switcher */}
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setNavSubMode("background")}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        navSubMode === "background"
                          ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Compass className="h-4 w-4" />
                      <span>Nav Bar Background</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNavSubMode("links")}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        navSubMode === "links"
                          ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Type className="h-4 w-4" />
                      <span>Menu Links &amp; Text</span>
                    </button>
                  </div>

                  {navSubMode === "background" ? (
                    <div className="space-y-6">
                      {/* Gradient Banner Toggle */}
                      <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <div>
                            <span className="text-sm font-bold text-slate-800">Gradient Nav Bar Background</span>
                            <p className="text-xs text-slate-500">Apply an institutional dual-tone gradient to the sticky navigation</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={colors.isGradient}
                            onChange={(e) => updateColor("isGradient", e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002147]"></div>
                        </label>
                      </div>

                      {colors.isGradient && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Gradient CSS Value
                          </label>
                          <input
                            type="text"
                            value={colors.bgGradient || ""}
                            onChange={(e) => updateColor("bgGradient", e.target.value)}
                            placeholder="linear-gradient(to right, #001730, #002147, #0d3b66)"
                            className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              { name: "Midnight Navy", val: "linear-gradient(to right, #001730, #002147, #0d3b66)" },
                              { name: "Academic Teal", val: "linear-gradient(to right, #002b36, #043d4d, #084c61)" },
                              { name: "Royal Sapphire", val: "linear-gradient(to right, #1e3a8a, #1e40af, #2563eb)" },
                              { name: "Dark Slate", val: "linear-gradient(to right, #090d16, #0f172a, #1e293b)" },
                              { name: "Academic Crimson", val: "linear-gradient(to right, #2c0b0e, #581c1c, #831843)" },
                            ].map((preset) => (
                              <button
                                key={preset.name}
                                type="button"
                                onClick={() => updateColor("bgGradient", preset.val)}
                                className="text-[11px] px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md transition-colors cursor-pointer"
                              >
                                {preset.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Nav Bar Background Color (Fixed to #007c74 Teal) */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-xs font-bold text-slate-800">Nav Bar Background Color</label>
                              <p className="text-[11px] text-slate-500">Fixed institutional color in code</p>
                            </div>
                            <span className="font-mono text-xs font-black uppercase text-white bg-[#007c74] px-2.5 py-1 rounded-lg shadow-2xs border border-teal-800">
                              #007c74 (Teal)
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 font-medium">
                            The sticky menu bar background is permanently fixed in the codebase to official Teal (#007c74).
                          </p>
                        </div>

                        {/* Border / Separator */}
                        <ColorInput
                          label="Border / Separator Color"
                          value={colors.borderColor || "#001730"}
                          onChange={(val) => updateColor("borderColor", val)}
                          description="Lower outline border beneath the navigation bar"
                        />

                        {/* Active Link / Highlight Color */}
                        <ColorInput
                          label="Active Link / Highlight Accent"
                          value={colors.accentColor || "#38bdf8"}
                          onChange={(val) => updateColor("accentColor", val)}
                          description="Active menu tab, hover pills, and arrow highlights"
                        />

                        {/* Dropdown Mega-Menu Panel Background */}
                        <ColorInput
                          label="Dropdown Mega-Menu Panel Background"
                          value={colors.cardBg || "#ffffff"}
                          onChange={(val) => updateColor("cardBg", val)}
                          description="Flyout mega-menu container background"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Menu Links and Sub-Row Colors */
                    <div className="space-y-6">
                      {/* Sync Mode Toggle */}
                      <div className="flex items-center gap-2 p-1.5 bg-slate-200/90 rounded-2xl border border-slate-300">
                        <button
                          type="button"
                          onClick={() => setNavLinkSync("all")}
                          className={`flex-1 py-2 px-3 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                            navLinkSync === "all"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          All Nav Links (Row 1 &amp; 2 Unified)
                        </button>
                        <button
                          type="button"
                          onClick={() => setNavLinkSync("individual")}
                          className={`flex-1 py-2 px-3 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                            navLinkSync === "individual"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          Row 1 &amp; Row 2 Separately
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Primary Nav Links Color */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-xs font-bold text-slate-800">
                                {navLinkSync === "all" ? "All Top Nav Links Color" : "Primary Nav Links Color (Row 1)"}
                              </label>
                              <p className="text-[11px] text-slate-500">
                                {navLinkSync === "all" ? "Simultaneously updates Row 1 and Row 2" : "Home, About Us, Academics, Admissions, etc."}
                              </p>
                            </div>
                            <span className="font-mono text-xs font-black uppercase text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {colors.topNavLinkColor || colors.textColor || "#ffffff"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={(colors.topNavLinkColor || colors.textColor || "#ffffff").startsWith("#") ? (colors.topNavLinkColor || colors.textColor || "#ffffff") : "#ffffff"}
                              onChange={(e) => {
                                updateColors({
                                  textColor: e.target.value,
                                  topNavLinkColor: e.target.value,
                                  ...(navLinkSync === "all" ? { topNavRow2Color: e.target.value } : {})
                                });
                              }}
                              className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white shrink-0"
                            />
                            <input
                              type="text"
                              value={colors.topNavLinkColor || colors.textColor || "#ffffff"}
                              onChange={(e) => {
                                updateColors({
                                  textColor: e.target.value,
                                  topNavLinkColor: e.target.value,
                                  ...(navLinkSync === "all" ? { topNavRow2Color: e.target.value } : {})
                                });
                              }}
                              className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 uppercase"
                            />
                          </div>

                          {/* Quick Link Presets */}
                          <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Quick Link Text Presets:
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {TOP_NAV_LINK_PRESETS.map((p) => {
                                const active = (colors.topNavLinkColor || colors.textColor || "#ffffff").toLowerCase() === p.hex.toLowerCase();
                                return (
                                  <button
                                    key={p.hex}
                                    type="button"
                                    onClick={() => {
                                      updateColors({
                                        textColor: p.hex,
                                        topNavLinkColor: p.hex,
                                        ...(navLinkSync === "all" ? { topNavRow2Color: p.hex } : {})
                                      });
                                    }}
                                    className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                      active
                                        ? "border-purple-600 bg-purple-50 font-black shadow-xs ring-1 ring-purple-500/20"
                                        : "border-slate-200 bg-white hover:bg-slate-100"
                                    }`}
                                  >
                                    <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.hex }} />
                                    <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Row 2 Separately */}
                        {navLinkSync === "individual" && (
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="text-xs font-bold text-slate-800">Utility Bar Links Color (Row 2)</label>
                                <p className="text-[11px] text-slate-500">Quick links, portal logins, and sub-items</p>
                              </div>
                              <span className="font-mono text-xs font-black uppercase text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {colors.topNavRow2Color || "#cbd5e1"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={(colors.topNavRow2Color || "#cbd5e1").startsWith("#") ? (colors.topNavRow2Color || "#cbd5e1") : "#cbd5e1"}
                                onChange={(e) => updateColor("topNavRow2Color", e.target.value)}
                                className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white shrink-0"
                              />
                              <input
                                type="text"
                                value={colors.topNavRow2Color || "#cbd5e1"}
                                onChange={(e) => updateColor("topNavRow2Color", e.target.value)}
                                className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 uppercase"
                              />
                            </div>

                            {/* Quick Link Presets for Row 2 */}
                            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                Quick Row 2 Presets:
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {TOP_NAV_LINK_PRESETS.map((p) => {
                                  const active = (colors.topNavRow2Color || "#cbd5e1").toLowerCase() === p.hex.toLowerCase();
                                  return (
                                    <button
                                      key={p.hex}
                                      type="button"
                                      onClick={() => updateColor("topNavRow2Color", p.hex)}
                                      className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                        active
                                          ? "border-purple-600 bg-purple-50 font-black shadow-xs ring-1 ring-purple-500/20"
                                          : "border-slate-200 bg-white hover:bg-slate-100"
                                      }`}
                                    >
                                      <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.hex }} />
                                      <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ======================================================== */
                /* 4. STANDARD SECTIONS COLOR CONTROLS                      */
                /* ======================================================== */
                <div className="space-y-6">
                  {/* Gradient Banner Toggle */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-sm font-medium text-slate-800">Gradient Background</span>
                        <p className="text-xs text-slate-500">Apply a multi-tone gradient instead of solid color</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={colors.isGradient}
                        onChange={(e) => updateColor("isGradient", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002147]"></div>
                    </label>
                  </div>

                  {colors.isGradient && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Gradient CSS Value
                      </label>
                      <input
                        type="text"
                        value={colors.bgGradient || ""}
                        onChange={(e) => updateColor("bgGradient", e.target.value)}
                        placeholder="linear-gradient(to right, #001730, #002147, #0d3b66)"
                        className="w-full px-3 py-2 text-sm font-mono border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[
                          { name: "Midnight Navy", val: "linear-gradient(to right, #001730, #002147, #0d3b66)" },
                          { name: "Academic Teal", val: "linear-gradient(to right, #002b36, #043d4d, #084c61)" },
                          { name: "Royal Sapphire", val: "linear-gradient(to right, #1e3a8a, #1e40af, #2563eb)" },
                          { name: "Dark Slate", val: "linear-gradient(to right, #090d16, #0f172a, #1e293b)" },
                          { name: "Warm Gold Accent", val: "linear-gradient(to right, #78350f, #92400e, #b45309)" },
                        ].map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => updateColor("bgGradient", preset.val)}
                            className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <ColorInput
                      label="Section Background"
                      value={colors.bgColor}
                      onChange={(val) => updateColor("bgColor", val)}
                      description="Primary background of the section"
                    />

                    <ColorInput
                      label="Heading / Title Color"
                      value={colors.headingColor}
                      onChange={(val) => updateColor("headingColor", val)}
                      description="Titles and major headings"
                    />

                    <ColorInput
                      label="Text / Body Color"
                      value={colors.textColor}
                      onChange={(val) => updateColor("textColor", val)}
                      description="Paragraphs and secondary descriptions"
                    />

                    <ColorInput
                      label="Accent / Primary Color"
                      value={colors.accentColor}
                      onChange={(val) => updateColor("accentColor", val)}
                      description="Buttons, links, and decorative lines"
                    />

                    <ColorInput
                      label="Card / Box Background"
                      value={colors.cardBg}
                      onChange={(val) => updateColor("cardBg", val)}
                      description="Background of internal cards/containers"
                    />

                    <ColorInput
                      label="Border / Divider Color"
                      value={colors.borderColor}
                      onChange={(val) => updateColor("borderColor", val)}
                      description="Separators and card outlines"
                    />

                    <ColorInput
                      label="Badge Background"
                      value={colors.badgeBg || "#002147"}
                      onChange={(val) => updateColor("badgeBg", val)}
                      description="Tags, category pills, and labels"
                    />

                    <ColorInput
                      label="Badge Text Color"
                      value={colors.badgeTextColor || "#ffffff"}
                      onChange={(val) => updateColor("badgeTextColor", val)}
                      description="Text inside tags and badges"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LAYOUT */}
          {activeTab === "layout" && (
            <div className="space-y-6">
              {isAnnouncement ? (
                /* ======================================================== */
                /* 1. ANNOUNCEMENT SECTION LAYOUT (SIZING & BLINK EFFECTS)  */
                /* ======================================================== */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 1. Visibility */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Announcement Bar Visibility
                      </label>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => updateLayout("visible", true)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            layout.visible
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Show Ticker
                        </button>
                        <button
                          type="button"
                          onClick={() => updateLayout("visible", false)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            !layout.visible
                              ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Hide Ticker
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Controls whether the marquee appears at the top across all pages.
                      </p>
                    </div>

                    {/* 2. Bar Height Slider */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Bar Height
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.announcementHeight || 40}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Vertical thickness of the top announcement ticker
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="28"
                          max="56"
                          value={layout.announcementHeight || 40}
                          onChange={(e) => updateLayout("announcementHeight", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>28px (Compact)</span>
                          <span>40px (Default)</span>
                          <span>56px (Thick)</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Ticker Font Size Slider */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Ticker Font Size
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.announcementFontSize || 12}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Font size for scrolling news headlines
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="10"
                          max="16"
                          value={layout.announcementFontSize || 12}
                          onChange={(e) => updateLayout("announcementFontSize", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>10px</span>
                          <span>12px (Default)</span>
                          <span>16px (Large)</span>
                        </div>
                      </div>
                    </div>

                    {/* 4. Marquee Speed Slider */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Scrolling Duration (Speed)
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.announcementSpeed || 32}s
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Seconds per marquee cycle (Lower duration = Faster scroll)
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="15"
                          max="60"
                          value={layout.announcementSpeed || 32}
                          onChange={(e) => updateLayout("announcementSpeed", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>15s (Fast)</span>
                          <span>32s (Normal)</span>
                          <span>60s (Gentle Slow)</span>
                        </div>
                      </div>
                    </div>

                    {/* 5. Container Max-Width */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Container Max Width
                      </label>
                      <select
                        value={layout.maxWidth}
                        onChange={(e) => updateLayout("maxWidth", e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value="compact">Compact (max-w-4xl / 896px)</option>
                        <option value="contained">Contained (max-w-7xl / 1280px)</option>
                        <option value="wide">Wide (max-w-[1600px] / 1600px)</option>
                        <option value="full">Full Bleed (100% width)</option>
                      </select>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Horizontal containment limit for announcement content.
                      </p>
                    </div>

                    {/* 6. Right-side Contacts Toggle */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Right-side Phone Contacts
                        </label>
                        <button
                          type="button"
                          onClick={() => updateLayout("announcementShowContact", layout.announcementShowContact === false ? true : false)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            layout.announcementShowContact !== false
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-slate-200 text-slate-500 border border-slate-300"
                          }`}
                        >
                          {layout.announcementShowContact !== false ? "Visible (On)" : "Hidden (Off)"}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 mb-2">
                        Admission help desk numbers shown on the right
                      </p>
                      {layout.announcementShowContact !== false && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Phone 1:</label>
                            <input
                              type="text"
                              value={layout.announcementPhone1 || "0863-2236470"}
                              onChange={(e) => updateLayout("announcementPhone1", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Phone 2:</label>
                            <input
                              type="text"
                              value={layout.announcementPhone2 || "7382104655"}
                              onChange={(e) => updateLayout("announcementPhone2", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badge Text Label & Attention / Blinking Effect */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-red-200/90 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-xs font-black text-slate-900">
                          &ldquo;Announcements&rdquo; Button Badge Box &amp; Blink Effect
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        Attention Trigger
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Badge Label Text Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700">Badge Text Label:</label>
                        <input
                          type="text"
                          value={layout.announcementBadgeText || "ANNOUNCEMENTS"}
                          onChange={(e) => updateLayout("announcementBadgeText", e.target.value)}
                          placeholder="ANNOUNCEMENTS"
                          className="px-3 py-2 text-xs font-extrabold uppercase tracking-wide bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-2xs"
                        />
                        <div className="flex flex-wrap gap-1 pt-1">
                          {["ANNOUNCEMENTS", "ADMISSIONS ALERT", "LATEST NOTICES", "IMPORTANT", "FLASH NEWS"].map((txt) => (
                            <button
                              key={txt}
                              type="button"
                              onClick={() => updateLayout("announcementBadgeText", txt)}
                              className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition-all cursor-pointer ${
                                (layout.announcementBadgeText || "ANNOUNCEMENTS") === txt
                                  ? "bg-red-600 text-white border-red-600"
                                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                              }`}
                            >
                              {txt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Highlight Text */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span>Custom Announcement Highlight:</span>
                          <span className="text-[10px] font-semibold text-slate-400">Prepended to ticker</span>
                        </label>
                        <input
                          type="text"
                          value={layout.announcementCustomText || ""}
                          onChange={(e) => updateLayout("announcementCustomText", e.target.value)}
                          placeholder="e.g. Special Admissions Counseling Session on Saturday!"
                          className="px-3 py-2 text-xs font-medium bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-2xs"
                        />
                        <p className="text-[11px] text-slate-400">
                          Leaves blank to use default continuous headlines
                        </p>
                      </div>
                    </div>

                    {/* Blink & Attention Effect Selector */}
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                      <label className="text-xs font-bold text-slate-700">
                        Blink &amp; Attention Effect Style:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          {
                            id: "blink",
                            name: "Pulse & Glow Blink",
                            desc: "High-focus glow pulse (Recommended)",
                          },
                          {
                            id: "rapid",
                            name: "Rapid Flash",
                            desc: "Urgent rhythmic blink",
                          },
                          {
                            id: "glow",
                            name: "Ambient Pulse Glow",
                            desc: "Smooth breathing glow",
                          },
                          {
                            id: "solid",
                            name: "Solid / Static",
                            desc: "Steady without blinking",
                          },
                        ].map((m) => {
                          const isActive = (layout.announcementBlinkStyle || "blink") === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => updateLayout("announcementBlinkStyle", m.id as any)}
                              className={`p-2.5 rounded-xl border-2 text-left flex flex-col gap-1 transition-all cursor-pointer ${
                                isActive
                                  ? "bg-slate-950 text-white border-red-500 shadow-md ring-2 ring-red-500/20"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black">{m.name}</span>
                                {isActive && <Check className="h-3.5 w-3.5 text-red-400" />}
                              </div>
                              <span className={`text-[10px] leading-tight ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                                {m.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : isLogoBar ? (
                /* ======================================================== */
                /* 2. LOGO BAR SECTION LAYOUT (CREST & GRAPHIC SIZING)     */
                /* ======================================================== */
                <div className="space-y-6">
                  {/* Quick Uniform Presets */}
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">Quick Uniform Sizing Presets:</span>
                      <span className="text-[10px] text-slate-400 font-semibold">One-click sync</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onChange({
                            ...section,
                            layout: {
                              ...section.layout,
                              crestLogoSize: 92,
                              headerGraphicSize: 92,
                              logoBarPaddingY: 0,
                            },
                          });
                        }}
                        className="py-2 px-2 rounded-xl bg-slate-950 text-white text-xs font-black hover:bg-slate-800 transition-all cursor-pointer shadow-xs text-center"
                      >
                        Fit Bar (92px)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onChange({
                            ...section,
                            layout: {
                              ...section.layout,
                              crestLogoSize: 72,
                              headerGraphicSize: 72,
                              logoBarPaddingY: 6,
                            },
                          });
                        }}
                        className="py-2 px-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs text-center"
                      >
                        Compact (64px - 72px)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onChange({
                            ...section,
                            layout: {
                              ...section.layout,
                              crestLogoSize: 104,
                              headerGraphicSize: 104,
                              logoBarPaddingY: 0,
                            },
                          });
                        }}
                        className="py-2 px-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs text-center"
                      >
                        Grand (104px)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 1. Visibility */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Logo Bar Visibility
                      </label>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => updateLayout("visible", true)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            layout.visible
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Show Bar
                        </button>
                        <button
                          type="button"
                          onClick={() => updateLayout("visible", false)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            !layout.visible
                              ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Hide Bar
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        When hidden, the masthead is omitted from the top header.
                      </p>
                    </div>

                    {/* 2. Header Display Mode */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            2. Header Display Mode
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded uppercase">
                            {layout.headerMode === "image_v1" ? "Image (4-Line)" : layout.headerMode === "image_v2" ? "Image (6-Line)" : "Live Text Mode"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Render dynamic customizable HTML typography or fixed official graphic
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => updateLayout("headerMode", "text")}
                          className={`p-2 rounded-lg border-2 text-left transition-all cursor-pointer ${
                            (!layout.headerMode || layout.headerMode === "text")
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span className="block text-xs font-bold">Live Text Mode</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">Custom colors & fonts</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => updateLayout("headerMode", "image_v2")}
                          className={`p-2 rounded-lg border-2 text-left transition-all cursor-pointer ${
                            layout.headerMode === "image_v2"
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span className="block text-xs font-bold">Graphic (6-Line)</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">With college address</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => updateLayout("headerMode", "image_v1")}
                          className={`p-2 rounded-lg border-2 text-left transition-all cursor-pointer ${
                            layout.headerMode === "image_v1"
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold"
                              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span className="block text-xs font-bold">Graphic (4-Line)</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">Compact image</span>
                        </button>
                      </div>
                    </div>

                    {/* 3. Masthead Text Alignment (Left, Center, Right) */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            3. Masthead Alignment
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded uppercase">
                            {layout.headerTextAlign || layout.alignment || "left"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Align all 6 lines of the college masthead text
                        </p>
                      </div>
                      <div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: "left", label: "Left", icon: AlignLeft },
                            { id: "center", label: "Center", icon: AlignCenter },
                            { id: "right", label: "Right", icon: AlignRight },
                          ].map((al) => {
                            const active = (layout.headerTextAlign || layout.alignment || "left") === al.id;
                            const Icon = al.icon;
                            return (
                              <button
                                key={al.id}
                                type="button"
                                onClick={() => {
                                  updateLayout("alignment", al.id as any);
                                  updateLayout("headerTextAlign", al.id as any);
                                }}
                                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                  active
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold"
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{al.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                          <span>Left Align</span>
                          <span>Centered</span>
                          <span>Right Align</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. College Crest Logo Height */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            3. Crest Logo Height (Left)
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.crestLogoSize || 92}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Height scale for the official college crest emblem
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="36"
                          max="140"
                          value={layout.crestLogoSize || 92}
                          onChange={(e) => updateLayout("crestLogoSize", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>36px</span>
                          <span>Default 92px</span>
                          <span>140px (Grand)</span>
                        </div>
                      </div>
                    </div>

                    {/* 4. College Masthead / Graphic Height */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            4. Masthead Graphic Height
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.headerGraphicSize || 92}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Height / scale for the college name and affiliation text graphic
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="36"
                          max="140"
                          value={layout.headerGraphicSize || 92}
                          onChange={(e) => updateLayout("headerGraphicSize", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>36px</span>
                          <span>Default 92px</span>
                          <span>140px (Grand)</span>
                        </div>
                      </div>
                    </div>

                    {/* 5. Logo Bar Vertical Padding */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            5. Logo Bar Vertical Padding
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.logoBarPaddingY || 0}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Extra top and bottom spacing within the logo bar container
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={layout.logoBarPaddingY || 0}
                          onChange={(e) => updateLayout("logoBarPaddingY", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>0px (Tight)</span>
                          <span>12px</span>
                          <span>24px (Spacious)</span>
                        </div>
                      </div>
                    </div>

                    {/* 6. Container Max Width */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        6. Container Max Width
                      </label>
                      <select
                        value={layout.maxWidth}
                        onChange={(e) => updateLayout("maxWidth", e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value="compact">Compact (max-w-4xl / 896px)</option>
                        <option value="contained">Contained (max-w-7xl / 1280px)</option>
                        <option value="wide">Wide (max-w-[1600px] / 1600px)</option>
                        <option value="full">Full Bleed (100% width)</option>
                      </select>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Horizontal container boundaries for the logo bar.
                      </p>
                    </div>
                  </div>
                </div>
              ) : isNav ? (
                /* ======================================================== */
                /* 3. TOP NAV SECTION LAYOUT (FONT, SIZE, WEIGHT, SPACING)  */
                /* ======================================================== */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 1. Visibility */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Navigation Bar Visibility
                      </label>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => updateLayout("visible", true)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            layout.visible
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Show Nav
                        </button>
                        <button
                          type="button"
                          onClick={() => updateLayout("visible", false)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            !layout.visible
                              ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          Hide Nav
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Controls visibility of the primary sticky navigation bar.
                      </p>
                    </div>

                    {/* Top Nav Typography Notice (Fixed in code) */}
                    <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200/80 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Top Nav Typography Fixed in Code</h4>
                        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                          Top navigation menu font size is permanently hardcoded in code at <strong>20px (Bold)</strong> for visual balance and readability across all screens. Customizer font controls for the top nav have been retired.
                        </p>
                      </div>
                    </div>

                    {/* 5. Menu Items Horizontal Spacing */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Item Spacing (Horizontal Gap)
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.topnavSpacing || 20}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Horizontal spacing between adjacent menu tabs
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="8"
                          max="36"
                          value={layout.topnavSpacing || 20}
                          onChange={(e) => updateLayout("topnavSpacing", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>Tight (8px)</span>
                          <span>Balanced (20px)</span>
                          <span>Spacious (36px)</span>
                        </div>
                      </div>
                    </div>

                    {/* 6. Navigation Bar Row Height / Vertical Padding */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Nav Row Vertical Padding
                          </label>
                          <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                            {layout.topnavPaddingY || 4}px
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 mb-3">
                          Top and bottom thickness for the sticky navigation bar
                        </p>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="2"
                          max="12"
                          value={layout.topnavPaddingY || 4}
                          onChange={(e) => updateLayout("topnavPaddingY", Number(e.target.value))}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                          <span>Compact (2px)</span>
                          <span>Default (4px)</span>
                          <span>Tall (12px)</span>
                        </div>
                      </div>
                    </div>

                    {/* 7. Container Max-Width */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Container Max Width
                      </label>
                      <select
                        value={layout.maxWidth}
                        onChange={(e) => updateLayout("maxWidth", e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value="compact">Compact (max-w-4xl / 896px)</option>
                        <option value="contained">Contained (max-w-7xl / 1280px)</option>
                        <option value="wide">Wide (max-w-[1600px] / 1600px)</option>
                        <option value="full">Full Bleed (100% width)</option>
                      </select>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Constrains maximum horizontal container width.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ======================================================== */
                /* 4. STANDARD SECTIONS LAYOUT CONTROLS                     */
                /* ======================================================== */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 1. Visibility */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Section Visibility
                    </label>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => updateLayout("visible", true)}
                        className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          layout.visible
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Show Section
                      </button>
                      <button
                        type="button"
                        onClick={() => updateLayout("visible", false)}
                        className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          !layout.visible
                            ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        Hide Section
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      When hidden, this section is omitted from the page.
                    </p>
                  </div>

                  {/* 2. Vertical Spacing (Padding Y) */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Vertical Padding (Spacing)
                    </label>
                    <select
                      value={layout.paddingY}
                      onChange={(e) => updateLayout("paddingY", e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="compact">Compact (py-6 / 24px)</option>
                      <option value="normal">Standard (py-12 / 48px)</option>
                      <option value="spacious">Spacious (py-16 / 64px)</option>
                      <option value="extra">Extra Spacious (py-24 / 96px)</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Controls top and bottom whitespace for this section.
                    </p>
                  </div>

                  {/* 3. Container Max-Width */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Container Max Width
                    </label>
                    <select
                      value={layout.maxWidth}
                      onChange={(e) => updateLayout("maxWidth", e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="compact">Compact (max-w-4xl / 896px)</option>
                      <option value="contained">Contained (max-w-7xl / 1280px)</option>
                      <option value="wide">Wide (max-w-[1600px] / 1600px)</option>
                      <option value="full">Full Bleed (100% width)</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Constrains maximum horizontal container width.
                    </p>
                  </div>

                  {/* 4. Text & Header Alignment */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Content Alignment
                    </label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {(["left", "center", "right"] as const).map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateLayout("alignment", align)}
                          className={`py-2 text-xs font-semibold uppercase rounded-lg border transition-all cursor-pointer ${
                            layout.alignment === align
                              ? "bg-[#002147] text-white border-[#002147] shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Aligns section headers and introductory text.
                    </p>
                  </div>

                  {/* 5. Grid Columns */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Card Grid Columns
                    </label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {([1, 2, 3, 4] as const).map((cols) => (
                        <button
                          key={cols}
                          type="button"
                          onClick={() => updateLayout("columns", cols)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            layout.columns === cols
                              ? "bg-[#002147] text-white border-[#002147] shadow-sm"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {cols} Col
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Columns on desktop (automatically stacks on mobile).
                    </p>
                  </div>

                  {/* 6. Card Style */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Card Style / Elevation
                    </label>
                    <select
                      value={layout.cardStyle}
                      onChange={(e) => updateLayout("cardStyle", e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="elevated">Elevated Shadow (shadow-md)</option>
                      <option value="bordered">Bordered Outline (border)</option>
                      <option value="glass">Glassmorphism (backdrop-blur)</option>
                      <option value="flat">Flat Minimal</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Visual appearance for internal items and cards.
                    </p>
                  </div>

                  {/* 7. Corner Radius */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Corner Rounding (Border Radius)
                    </label>
                    <select
                      value={layout.borderRadius}
                      onChange={(e) => updateLayout("borderRadius", e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="none">Square (rounded-none)</option>
                      <option value="sm">Subtle (rounded-sm)</option>
                      <option value="md">Standard (rounded-md)</option>
                      <option value="lg">Smooth (rounded-lg)</option>
                      <option value="xl">Modern Curved (rounded-2xl)</option>
                      <option value="full">Pill / Full (rounded-full)</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Card and container edge curvature.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

function ColorInput({ label, value, onChange, description }: ColorInputProps) {
  return (
    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value.startsWith("#") ? value : "#ffffff"}
            onChange={(e) => onChange(e.target.value)}
            className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
          placeholder="#000000"
        />
      </div>
      {description && <p className="text-[11px] text-slate-400 mt-1.5">{description}</p>}
    </div>
  );
}
