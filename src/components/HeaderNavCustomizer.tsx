"use client";

import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal, Image, Type, Maximize2, Compass,
  RotateCcw, Check, Copy, X, BookmarkPlus, Trash2, CheckCircle2,
  Sparkles, Layers, ArrowRight, Eye, EyeOff, Palette,
  AlignLeft, AlignCenter, AlignRight, Ruler, Heading,
  Bell, Phone
} from "lucide-react";

export interface HeaderNavConfig {
  headerMode: "image_v1" | "image_v2" | "text";
  
  // Separate Individual Logo & Item Size Controllers:
  crestLogoSize: number; // 36 - 140 (Default 92)
  crestLogoVisible?: boolean; // Default true
  crestLogoOffset?: number; // 0 - 24 (Default 0)

  headerGraphicSize: number; // 36 - 140 (Default 92) - College Name item
  headerGraphicMaxWidth?: number; // 280 - 800 (Default 620)
  
  logo29YearsSize: number; // 36 - 140 (Default 92)
  logo29YearsVisible?: boolean; // Default true

  logoNaacSize: number; // 36 - 140 (Default 92)
  logoNaacVisible?: boolean; // Default true
  logoNaacTextVisible?: boolean; // Default true
  logoNaacTextSize?: number; // 10 - 16 (Default 13)

  logoAicteSize: number; // 36 - 140 (Default 92)
  logoAicteVisible?: boolean; // Default true
  logoAicteTextVisible?: boolean; // Default true
  logoAicteTextSize?: number; // 10 - 16 (Default 13)

  logoBarPaddingY?: number; // 0 - 24 (Default 0)
  logoBarGap?: number; // 6 - 28 (Default 14)
  logoBarLeftGap?: number; // 8 - 32 (Default 16)
  accreditationLogosSize?: number; // legacy fallback
  
  // Text Mode Typography (College Name + 5 Lines Below Separately)
  headerTitleFont: string;
  headerTitleSize: number; // 14 - 36
  headerSubSize: number; // 8 - 22
  headerTextAlign: "left" | "center" | "right";

  // Individual 6 Lines Controls (College Name Line + 5 Lines Below)
  lineCustomizationMode?: "unified" | "individual";
  headerLine1Size?: number; // 14 - 36px (Line 1: College Name)
  headerLine2Size?: number; // 8 - 22px (Line 2: Society / Run by)
  headerLine3Size?: number; // 8 - 22px (Line 3: University Affiliation)
  headerLine4Size?: number; // 8 - 22px (Line 4: UGC 2(f) Recognition)
  headerLine5Size?: number; // 8 - 22px (Line 5: NAAC Accreditation)
  headerLine6Size?: number; // 8 - 22px (Line 6: Campus Address)

  headerLine1Color?: string; // Line 1 Color
  headerLine2Color?: string; // Line 2 Color
  headerLine3Color?: string; // Line 3 Color
  headerLine4Color?: string; // Line 4 Color
  headerLine5Color?: string; // Line 5 Color
  headerLine6Color?: string; // Line 6 Color

  // Top Nav Bar Controls (Layout only; colors are in Color Palette)
  topnavFontFamily: string;
  topnavFontSize: number; // 11 - 16
  topnavFontWeight: string; // 500, 600, 700, 800
  topnavSpacing: number; // 8 - 36 (px)
  topnavPaddingY: number; // 4 - 18

  // Heading Level 1 (Hero Banner Layout & Sizing)
  level1PaddingY: number; // 16 - 80 (px)
  level1TitleSize: number; // 20 - 64 (px)
  level1FontFamily: string;
  level1SubSize: number; // 12 - 24 (px)
  level1TextAlign: "left" | "center" | "right";
  level1Gap: number; // 4 - 28 (px)
  level1SubMaxWidth: string; // "38rem" | "48rem" | "56rem" | "100%"

  // Announcement Section Controls
  announcementVisible?: boolean; // Default true
  announcementBadgeText?: string; // Default "ANNOUNCEMENTS"
  announcementBlinkStyle?: "blink" | "rapid" | "glow" | "solid"; // Default "blink"
  announcementBadgeBg?: string; // Default "#dc2626"
  announcementBadgeTextColor?: string; // Default "#ffffff"
  announcementBg?: string; // Default "#020617"
  announcementTextColor?: string; // Default "#e2e8f0"
  announcementHeight?: number; // 28 - 56 (Default 40)
  announcementFontSize?: number; // 10 - 16 (Default 12)
  announcementSpeed?: number; // 15 - 60 (Default 32)
  announcementShowContact?: boolean; // Default true
  announcementPhone1?: string; // Default "0863-2236470"
  announcementPhone2?: string; // Default "7382104655"
  announcementCustomText?: string; // Custom marquee text

  // Heading 1 Notch Layout Style
  heading1Style?: "notch" | "fullwidth"; // Default "notch"
}

export interface SavedHeaderSetup {
  id: string;
  name: string;
  timestamp: string;
  config: HeaderNavConfig;
}

const DEFAULT_CONFIG: HeaderNavConfig = {
  headerMode: "image_v2",
  crestLogoSize: 92,
  crestLogoVisible: true,
  crestLogoOffset: 0,

  headerGraphicSize: 92,
  headerGraphicMaxWidth: 620,

  logo29YearsSize: 92,
  logo29YearsVisible: true,

  logoNaacSize: 92,
  logoNaacVisible: true,
  logoNaacTextVisible: true,
  logoNaacTextSize: 13,

  logoAicteSize: 92,
  logoAicteVisible: true,
  logoAicteTextVisible: true,
  logoAicteTextSize: 13,

  logoBarPaddingY: 0,
  logoBarGap: 14,
  logoBarLeftGap: 16,

  headerTitleFont: "var(--font-outfit, sans-serif)",
  headerTitleSize: 21,
  headerSubSize: 11,
  headerTextAlign: "left",

  lineCustomizationMode: "individual",
  headerLine1Size: 21,
  headerLine2Size: 11,
  headerLine3Size: 11,
  headerLine4Size: 11,
  headerLine5Size: 11,
  headerLine6Size: 10.5,

  headerLine1Color: "#002b49",
  headerLine2Color: "#1e3a8a",
  headerLine3Color: "#dc2626",
  headerLine4Color: "#dc2626",
  headerLine5Color: "#0284c7",
  headerLine6Color: "#475569",

  topnavFontFamily: "var(--font-inter, sans-serif)",
  topnavFontSize: 13,
  topnavFontWeight: "700",
  topnavSpacing: 20,
  topnavPaddingY: 12,

  level1PaddingY: 44,
  level1TitleSize: 38,
  level1FontFamily: "var(--font-outfit, sans-serif)",
  level1SubSize: 16,
  level1TextAlign: "center",
  level1Gap: 12,
  level1SubMaxWidth: "56rem",

  announcementVisible: true,
  announcementBadgeText: "ANNOUNCEMENTS",
  announcementBlinkStyle: "blink",
  announcementBadgeBg: "#dc2626",
  announcementBadgeTextColor: "#ffffff",
  announcementBg: "#020617",
  announcementTextColor: "#e2e8f0",
  announcementHeight: 40,
  announcementFontSize: 12,
  announcementSpeed: 32,
  announcementShowContact: true,
  announcementPhone1: "0863-2236470",
  announcementPhone2: "7382104655",
  announcementCustomText: "",

  heading1Style: "notch"
};

const FONT_OPTIONS = [
  { label: "Outfit (Academic Sans)", value: "var(--font-outfit, sans-serif)" },
  { label: "Inter (Modern Sans)", value: "var(--font-inter, sans-serif)" },
  { label: "Cinzel (Classical Academic)", value: "'Cinzel', Georgia, serif" },
  { label: "Playfair Display (Prestigious Serif)", value: "'Playfair Display', Georgia, serif" },
  { label: "Georgia (Traditional Serif)", value: "Georgia, serif" },
  { label: "Montserrat (Classic Editorial)", value: "'Montserrat', sans-serif" },
  { label: "Poppins (Clean Geometric)", value: "'Poppins', sans-serif" },
  { label: "System UI (Native)", value: "system-ui, -apple-system, sans-serif" }
];

const WEIGHT_OPTIONS = [
  { label: "Medium (500)", value: "500" },
  { label: "Semi-Bold (600)", value: "600" },
  { label: "Bold (700)", value: "700" },
  { label: "Extra-Bold (800)", value: "800" }
];

export function HeaderNavCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"logos" | "masthead" | "announcement" | "nav" | "level1" | "snapshots">("logos");
  const [config, setConfig] = useState<HeaderNavConfig>(DEFAULT_CONFIG);
  const [savedSetups, setSavedSetups] = useState<SavedHeaderSetup[]>([]);
  const [newVersionName, setNewVersionName] = useState("");
  const [copied, setCopied] = useState(false);

  // Apply Layout & Sizing Config to DOM & CSS Variables
  const applyConfigToDOM = (cfg: HeaderNavConfig) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Apply Separate Individual Logo Size CSS Variables
    const crest = cfg.crestLogoSize ?? 92;
    const graphic = cfg.headerGraphicSize ?? 92;
    const l29 = cfg.logo29YearsSize ?? cfg.accreditationLogosSize ?? 92;
    const naac = cfg.logoNaacSize ?? cfg.accreditationLogosSize ?? 92;
    const aicte = cfg.logoAicteSize ?? cfg.accreditationLogosSize ?? 92;
    const padY = cfg.logoBarPaddingY ?? 0;
    const gap = cfg.logoBarGap ?? 14;
    const leftGap = cfg.logoBarLeftGap ?? 16;
    const graphicMaxWidth = cfg.headerGraphicMaxWidth ?? 620;

    root.style.setProperty("--crest-logo-size", `${crest}px`);
    root.style.setProperty("--crest-logo-display", cfg.crestLogoVisible === false ? "none" : "block");
    root.style.setProperty("--crest-logo-offset", `${cfg.crestLogoOffset ?? 0}px`);

    root.style.setProperty("--header-graphic-size", `${graphic}px`);
    root.style.setProperty("--header-graphic-max-width", `${graphicMaxWidth}px`);

    root.style.setProperty("--logo-29years-size", `${l29}px`);
    root.style.setProperty("--logo-29years-display", cfg.logo29YearsVisible === false ? "none" : "flex");

    root.style.setProperty("--logo-naac-size", `${naac}px`);
    root.style.setProperty("--logo-naac-display", cfg.logoNaacVisible === false ? "none" : "flex");
    root.style.setProperty("--logo-naac-text-display", cfg.logoNaacTextVisible === false ? "none" : "flex");
    root.style.setProperty("--logo-naac-text-size", `${cfg.logoNaacTextSize ?? 13}px`);

    root.style.setProperty("--logo-aicte-size", `${aicte}px`);
    root.style.setProperty("--logo-aicte-display", cfg.logoAicteVisible === false ? "none" : "flex");
    root.style.setProperty("--logo-aicte-text-display", cfg.logoAicteTextVisible === false ? "none" : "flex");
    root.style.setProperty("--logo-aicte-text-size", `${cfg.logoAicteTextSize ?? 13}px`);

    const maxLogoHeight = Math.max(crest, graphic, l29, naac, aicte, 92);
    root.style.setProperty("--logo-bar-height", `${maxLogoHeight}px`);
    root.style.setProperty("--logo-bar-padding-y", `${padY}px`);
    root.style.setProperty("--logo-bar-gap", `${gap}px`);
    root.style.setProperty("--logo-bar-left-gap", `${leftGap}px`);

    // Typography Variables
    root.style.setProperty("--header-title-font", cfg.headerTitleFont);
    const l1Size = cfg.headerLine1Size ?? cfg.headerTitleSize ?? 21;
    const l2Size = cfg.headerLine2Size ?? cfg.headerSubSize ?? 11;
    const l3Size = cfg.headerLine3Size ?? cfg.headerSubSize ?? 11;
    const l4Size = cfg.headerLine4Size ?? cfg.headerSubSize ?? 11;
    const l5Size = cfg.headerLine5Size ?? cfg.headerSubSize ?? 11;
    const l6Size = cfg.headerLine6Size ?? 10.5;

    root.style.setProperty("--header-title-size", `${l1Size}px`);
    root.style.setProperty("--header-line1-size", `${l1Size}px`);
    root.style.setProperty("--header-line2-size", `${l2Size}px`);
    root.style.setProperty("--header-line3-size", `${l3Size}px`);
    root.style.setProperty("--header-line4-size", `${l4Size}px`);
    root.style.setProperty("--header-line5-size", `${l5Size}px`);
    root.style.setProperty("--header-line6-size", `${l6Size}px`);
    root.style.setProperty("--header-sub-size", `${cfg.headerSubSize ?? 11}px`);
    root.style.setProperty("--header-address-size", `${l6Size}px`);
    root.style.setProperty("--header-text-align", cfg.headerTextAlign);
    root.style.setProperty(
      "--header-text-align-items",
      cfg.headerTextAlign === "center" ? "center" : cfg.headerTextAlign === "right" ? "flex-end" : "flex-start"
    );

    // Set individual line colors
    if (cfg.headerLine1Color) root.style.setProperty("--header-line1-color", cfg.headerLine1Color);
    if (cfg.headerLine2Color) root.style.setProperty("--header-line2-color", cfg.headerLine2Color);
    if (cfg.headerLine3Color) root.style.setProperty("--header-line3-color", cfg.headerLine3Color);
    if (cfg.headerLine4Color) root.style.setProperty("--header-line4-color", cfg.headerLine4Color);
    if (cfg.headerLine5Color) root.style.setProperty("--header-line5-color", cfg.headerLine5Color);
    if (cfg.headerLine6Color) root.style.setProperty("--header-line6-color", cfg.headerLine6Color);

    // Navigation Layout Variables
    root.style.setProperty("--topnav-font-family", cfg.topnavFontFamily);
    root.style.setProperty("--topnav-font-size", `${cfg.topnavFontSize}px`);
    root.style.setProperty("--topnav-font-weight", cfg.topnavFontWeight);
    root.style.setProperty("--topnav-spacing", `${cfg.topnavSpacing}px`);
    root.style.setProperty("--topnav-padding-y", `${cfg.topnavPaddingY}px`);

    // Heading Level 1 Variables
    root.style.setProperty("--level1-padding-y", `${cfg.level1PaddingY || 44}px`);
    root.style.setProperty("--level1-title-size", `${cfg.level1TitleSize || 38}px`);
    root.style.setProperty("--level1-font-family", cfg.level1FontFamily || "var(--font-outfit, sans-serif)");
    root.style.setProperty("--level1-sub-size", `${cfg.level1SubSize || 16}px`);
    root.style.setProperty("--level1-text-align", cfg.level1TextAlign || "center");
    root.style.setProperty(
      "--level1-align-items",
      cfg.level1TextAlign === "left" ? "flex-start" : cfg.level1TextAlign === "right" ? "flex-end" : "center"
    );
    root.style.setProperty("--level1-gap", `${cfg.level1Gap || 12}px`);
    root.style.setProperty("--level1-sub-max-width", cfg.level1SubMaxWidth || "56rem");

    // Heading 1 Style
    root.style.setProperty("--heading1-style", cfg.heading1Style || "notch");

    // Announcement Bar Variables
    root.style.setProperty("--announcement-display", cfg.announcementVisible === false ? "none" : "block");
    root.style.setProperty("--announcement-bg", cfg.announcementBg || "#020617");
    root.style.setProperty("--announcement-badge-bg", cfg.announcementBadgeBg || "#dc2626");
    root.style.setProperty("--announcement-badge-color", cfg.announcementBadgeTextColor || "#ffffff");
    root.style.setProperty("--announcement-text-color", cfg.announcementTextColor || "#e2e8f0");
    root.style.setProperty("--announcement-height", `${cfg.announcementHeight || 40}px`);
    root.style.setProperty("--announcement-font-size", `${cfg.announcementFontSize || 12}px`);
    root.style.setProperty("--announcement-speed", `${cfg.announcementSpeed || 32}s`);

    // Set Data Attribute & Store in localStorage
    root.setAttribute("data-header-mode", cfg.headerMode);
    try {
      localStorage.setItem("header_display_mode", cfg.headerMode);
      localStorage.setItem("header_nav_customizer_config", JSON.stringify(cfg));
    } catch (e) {
      // Ignore storage errors
    }

    // Dispatch global event asynchronously
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("headerCustomizerUpdate", {
            detail: cfg
          })
        );
      }, 0);
    }
  };

  // Initial Load from localStorage & Listen to Drawer State
  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem("header_nav_customizer_config");
      const storedMode = localStorage.getItem("header_display_mode");
      if (storedConfig) {
        const parsed = JSON.parse(storedConfig);
        if (storedMode) parsed.headerMode = storedMode;
        if (!parsed.headerLine1Color) {
          parsed.headerLine1Color = localStorage.getItem("theme_headerLine1Color") || localStorage.getItem("theme_headerTitleColor") || "#002b49";
        }
        if (!parsed.headerLine2Color) {
          parsed.headerLine2Color = localStorage.getItem("theme_headerLine2Color") || localStorage.getItem("theme_headerSubColor") || "#1e3a8a";
        }
        if (!parsed.headerLine3Color) {
          parsed.headerLine3Color = localStorage.getItem("theme_headerLine3Color") || localStorage.getItem("theme_headerAccentColor") || "#dc2626";
        }
        if (!parsed.headerLine4Color) {
          parsed.headerLine4Color = localStorage.getItem("theme_headerLine4Color") || localStorage.getItem("theme_headerAccentColor") || "#dc2626";
        }
        if (!parsed.headerLine5Color) {
          parsed.headerLine5Color = localStorage.getItem("theme_headerLine5Color") || localStorage.getItem("theme_headerSubColor") || "#0284c7";
        }
        if (!parsed.headerLine6Color) {
          parsed.headerLine6Color = localStorage.getItem("theme_headerLine6Color") || localStorage.getItem("theme_headerAddressColor") || "#475569";
        }
        setConfig((prev) => ({ ...prev, ...parsed }));
      }

      const storedSetups = localStorage.getItem("header_nav_saved_setups");
      if (storedSetups) {
        setSavedSetups(JSON.parse(storedSetups));
      }
    } catch (e) {
      // Ignore
    }

    const handleDrawerState = (e: any) => {
      if (e.detail) {
        setActiveDrawer(e.detail.openDrawer);
        if (e.detail.openDrawer === "color") {
          setIsOpen(false);
        } else if (e.detail.openDrawer === "layout") {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("customizerDrawerState", handleDrawerState);
    return () => window.removeEventListener("customizerDrawerState", handleDrawerState);
  }, []);

  // Reactively apply DOM and CSS changes whenever config changes
  useEffect(() => {
    applyConfigToDOM(config);
  }, [config]);

  // Update helper
  const updateConfig = (patch: Partial<HeaderNavConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
    setActiveDrawer("layout");
    window.dispatchEvent(new CustomEvent("customizerDrawerState", { detail: { openDrawer: "layout" } }));
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
    setActiveDrawer(null);
    window.dispatchEvent(new CustomEvent("customizerDrawerState", { detail: { openDrawer: null } }));
  };

  const handleSwitchToColor = () => {
    setIsOpen(false);
    setActiveDrawer("color");
    window.dispatchEvent(new CustomEvent("customizerDrawerState", { detail: { openDrawer: "color" } }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleSaveSetup = () => {
    const name = newVersionName.trim() || `Layout ${savedSetups.length + 1} (${config.headerMode.toUpperCase()})`;
    const newEntry: SavedHeaderSetup = {
      id: Date.now().toString(),
      name,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      config: { ...config }
    };
    const updated = [newEntry, ...savedSetups];
    setSavedSetups(updated);
    setNewVersionName("");
    try {
      localStorage.setItem("header_nav_saved_setups", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  const handleApplySavedSetup = (setup: SavedHeaderSetup) => {
    setConfig(setup.config);
  };

  const handleDeleteSavedSetup = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedSetups.filter((s) => s.id !== id);
    setSavedSetups(updated);
    try {
      localStorage.setItem("header_nav_saved_setups", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button: ONLY rendered when NO customizer drawer is open anywhere */}
      {!isOpen && activeDrawer === null && (
        <div className="fixed bottom-6 right-48 z-50 select-none animate-fadeIn hidden sm:block">
          <button
            onClick={handleOpenDrawer}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 text-white font-bold text-xs shadow-2xl hover:bg-slate-900 border-2 border-emerald-400/80 hover:border-emerald-300 transition-all active:scale-95 group hover:-translate-y-0.5 hover:shadow-emerald-500/25 cursor-pointer"
            title="Customize Individual Logo Sizes, College Name Item, Typography & Nav Sizing"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 text-white shadow-xs group-hover:rotate-45 transition-transform duration-300">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </span>
            <span className="font-outfit tracking-wide text-white">Logos &amp; Layout Studio</span>
            <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black bg-emerald-400 text-slate-950 uppercase tracking-wide shadow-xs">
              Logos
            </span>
          </button>
        </div>
      )}

      {/* Floating Trigger Button for Mobile: ONLY rendered when NO customizer drawer is open anywhere */}
      {!isOpen && activeDrawer === null && (
        <div className="fixed bottom-22 right-6 z-50 select-none animate-fadeIn sm:hidden">
          <button
            onClick={handleOpenDrawer}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs shadow-2xl border-2 border-emerald-400/80 transition-all active:scale-95 cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-400" />
            <span>Logos &amp; Layout</span>
          </button>
        </div>
      )}

      {/* Slide-over Drawer / Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs select-none animate-fadeIn">
          <div
            className="w-full max-w-[500px] h-full bg-[#f8fafc] shadow-2xl border-l-2 border-slate-300 flex flex-col justify-between overflow-hidden animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Panel Header */}
            <div className="p-4 sm:p-5 border-b-2 border-slate-800 bg-[#001730] text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 shadow-xs">
                  <SlidersHorizontal className="h-4 w-4" />
                </span>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-outfit font-black text-sm sm:text-base tracking-tight leading-none text-white">
                      Logos &amp; Layout Studio
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500 text-slate-950 uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1">
                    Individual Logos, College Name Item, 6-Line Typography &amp; Nav
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSwitchToColor}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-600/30 border border-purple-400/50 hover:bg-purple-600/50 text-purple-200 hover:text-white text-[11px] font-bold transition-all cursor-pointer"
                  title="Switch directly to Color Palette Customizer"
                >
                  <Palette className="h-3.5 w-3.5 text-purple-300" />
                  <span className="hidden sm:inline">Color Palette</span>
                </button>

                <button
                  onClick={handleCloseDrawer}
                  className="h-8 w-8 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (6 Segmented Tabs with Announcement Bar) */}
            <div className="grid grid-cols-6 p-1 bg-slate-200/90 border-b-2 border-slate-300/80 text-xs font-bold shrink-0 gap-1">
              <button
                onClick={() => setActiveTab("logos")}
                className={`flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "logos"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="text-[9.5px] leading-tight text-center">Logos</span>
              </button>

              <button
                onClick={() => setActiveTab("masthead")}
                className={`flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "masthead"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Type className="h-3.5 w-3.5" />
                <span className="text-[9.5px] leading-tight text-center">6-Lines</span>
              </button>

              <button
                onClick={() => setActiveTab("announcement")}
                className={`flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "announcement"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-red-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Bell className="h-3.5 w-3.5 text-red-500" />
                <span className="text-[9.5px] leading-tight text-center">Announce</span>
              </button>

              <button
                onClick={() => setActiveTab("nav")}
                className={`flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "nav"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span className="text-[9.5px] leading-tight text-center">Top Nav</span>
              </button>

              <button
                onClick={() => setActiveTab("level1")}
                className={`flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "level1"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Heading className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[9.5px] leading-tight text-center">Heading 1</span>
              </button>

              <button
                onClick={() => setActiveTab("snapshots")}
                className={`flex flex-col items-center gap-1 py-2 px-0.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "snapshots"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <BookmarkPlus className="h-3.5 w-3.5" />
                <span className="text-[9.5px] leading-tight text-center">Setups</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 text-left text-slate-800">
              
              {/* ========================================================= */}
              {/* TAB 2: COLLEGE NAME & MASTHEAD (3 MODES & 6-LINES TEXT)  */}
              {/* ========================================================= */}
              {activeTab === "masthead" && (
                <div className="flex flex-col gap-4 animate-fadeIn">

                  {/* Switch to Logo Bar Banner */}
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border-2 border-emerald-200 shadow-2xs">
                    <div className="flex items-center gap-2 text-emerald-950">
                      <SlidersHorizontal className="h-4 w-4 text-emerald-700 shrink-0" />
                      <span className="text-[11px] font-bold">Looking to adjust Logo &amp; College Name sizes?</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("logos")}
                      className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-black transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center gap-1"
                    >
                      <span>Logo Bar Tab</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      College Masthead Display Mode:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      3 Options Ready
                    </span>
                  </div>

                  {/* Mode Selector Cards */}
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Mode 1: Image Version 1 (4 lines) */}
                    <div
                      onClick={() => updateConfig({ headerMode: "image_v1" })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${
                        config.headerMode === "image_v1"
                          ? "bg-slate-950 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                          : "bg-white text-slate-800 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                            config.headerMode === "image_v1" ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                          }`}>
                            <Image className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-black">
                            Option 1: Image Version 1 (Original 4-Line)
                          </span>
                        </div>
                        {config.headerMode === "image_v1" ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded-full shadow-xs">
                            <Check className="h-3 w-3 stroke-[3]" /> Active Selection
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">Click to Select</span>
                        )}
                      </div>
                      <p className={`text-[11px] pl-9.5 leading-relaxed ${
                        config.headerMode === "image_v1" ? "text-slate-300" : "text-slate-500"
                      }`}>
                        Features original letterhead graphic: College Name, Society, ANU Affiliation / AICTE, UGC 2(f).
                      </p>

                      {config.headerMode === "image_v1" && (
                        <div className="flex flex-col gap-2 pt-2 mt-1 border-t border-slate-800 text-left" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
                            <span>Image Height:</span>
                            <span className="font-mono text-emerald-400 text-xs font-black">
                              {config.headerGraphicSize ?? 92}px
                            </span>
                          </div>
                          <input
                            type="range"
                            min="36"
                            max="140"
                            value={config.headerGraphicSize ?? 92}
                            onChange={(e) => updateConfig({ headerGraphicSize: Number(e.target.value) })}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>

                    {/* Mode 2: Image Version 2 (6 lines) */}
                    <div
                      onClick={() => updateConfig({ headerMode: "image_v2" })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${
                        config.headerMode === "image_v2"
                          ? "bg-slate-950 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                          : "bg-white text-slate-800 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                            config.headerMode === "image_v2" ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                          }`}>
                            <Image className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-black">
                            Option 2: Image Version 2 (Updated 6-Line with Address)
                          </span>
                        </div>
                        {config.headerMode === "image_v2" ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded-full shadow-xs">
                            <Check className="h-3 w-3 stroke-[3]" /> Active Selection
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">Click to Select</span>
                        )}
                      </div>
                      <p className={`text-[11px] pl-9.5 leading-relaxed ${
                        config.headerMode === "image_v2" ? "text-slate-300" : "text-slate-500"
                      }`}>
                        Features updated letterhead graphic with NAAC &apos;A&apos; Grade (1st Cycle) and Amaravathi Road, Gorantla address.
                      </p>

                      {config.headerMode === "image_v2" && (
                        <div className="flex flex-col gap-2 pt-2 mt-1 border-t border-slate-800 text-left" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
                            <span>Image Height:</span>
                            <span className="font-mono text-emerald-400 text-xs font-black">
                              {config.headerGraphicSize ?? 92}px
                            </span>
                          </div>
                          <input
                            type="range"
                            min="36"
                            max="140"
                            value={config.headerGraphicSize ?? 92}
                            onChange={(e) => updateConfig({ headerGraphicSize: Number(e.target.value) })}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>

                    {/* Mode 3: Pure HTML Typography Text Mode */}
                    <div
                      onClick={() => updateConfig({ headerMode: "text" })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
                        config.headerMode === "text"
                          ? "bg-slate-950 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                          : "bg-white text-slate-800 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                            config.headerMode === "text" ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                          }`}>
                            <Type className="h-4 w-4" />
                          </span>
                          <span className="text-xs font-black">
                            Option 3: Live HTML Typography Text (Not Image)
                          </span>
                        </div>
                        {config.headerMode === "text" ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded-full shadow-xs">
                            <Check className="h-3 w-3 stroke-[3]" /> Active Selection
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">Click to Select</span>
                        )}
                      </div>
                      <p className={`text-[11px] pl-9.5 leading-relaxed ${
                        config.headerMode === "text" ? "text-slate-300" : "text-slate-500"
                      }`}>
                        Renders pure vector text with customizable font families, font sizes, and live real-time alignment.
                      </p>
                    </div>

                  </div>

                  {/* Text Mode Detailed Sizing & Typography Controls */}
                  {config.headerMode === "text" && (
                    <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex flex-col gap-4 animate-fadeIn">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-800">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-xs font-black uppercase tracking-wider">Typography, Sizing &amp; Colors:</span>
                        </div>
                        <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          6 Lines Separately
                        </span>
                      </div>

                      {/* Font Family & Alignment Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-700">Title Font Family:</label>
                          <select
                            value={config.headerTitleFont}
                            onChange={(e) => updateConfig({ headerTitleFont: e.target.value })}
                            className="px-3 py-2 text-xs bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold cursor-pointer"
                          >
                            {FONT_OPTIONS.map((f, i) => (
                              <option key={i} value={f.value}>{f.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-700">Text Alignment:</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            <button
                              type="button"
                              onClick={() => updateConfig({ headerTextAlign: "left" })}
                              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                config.headerTextAlign === "left"
                                  ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                                  : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                              }`}
                            >
                              <AlignLeft className="h-3 w-3" />
                              <span>Left</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateConfig({ headerTextAlign: "center" })}
                              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                config.headerTextAlign === "center"
                                  ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                                  : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                              }`}
                            >
                              <AlignCenter className="h-3 w-3" />
                              <span>Center</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateConfig({ headerTextAlign: "right" })}
                              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                config.headerTextAlign === "right"
                                  ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                                  : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                              }`}
                            >
                              <AlignRight className="h-3 w-3" />
                              <span>Right</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mode Toggle: Individual 6 Lines vs Quick Unified */}
                      <div className="flex items-center gap-2 p-1.5 bg-slate-200/90 rounded-2xl border-2 border-slate-300/80">
                        <button
                          type="button"
                          onClick={() => updateConfig({ lineCustomizationMode: "individual" })}
                          className={`flex-1 py-2 px-2 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                            (config.lineCustomizationMode || "individual") === "individual"
                              ? "bg-slate-950 text-white shadow-md border-2 border-emerald-500 ring-2 ring-emerald-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          6 Lines Separately (Sizing &amp; Colors)
                        </button>
                        <button
                          type="button"
                          onClick={() => updateConfig({ lineCustomizationMode: "unified" })}
                          className={`flex-1 py-2 px-2 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                            config.lineCustomizationMode === "unified"
                              ? "bg-slate-950 text-white shadow-md border-2 border-emerald-500 ring-2 ring-emerald-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          Quick Unified Sliders
                        </button>
                      </div>

                      {/* Individual 6 Lines Cards */}
                      {(config.lineCustomizationMode || "individual") === "individual" ? (
                        <div className="flex flex-col gap-3">
                          {/* Helper actions */}
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              College Name Line + 5 Lines Below:
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const targetSize = config.headerLine2Size || 11;
                                  updateConfig({
                                    headerLine3Size: targetSize,
                                    headerLine4Size: targetSize,
                                    headerLine5Size: targetSize,
                                    headerLine6Size: Math.max(9, targetSize - 0.5)
                                  });
                                }}
                                className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                              >
                                Sync Subtext Sizes
                              </button>
                              <span className="text-slate-300">•</span>
                              <button
                                type="button"
                                onClick={() => {
                                  updateConfig({
                                    headerLine1Size: 21,
                                    headerLine2Size: 11,
                                    headerLine3Size: 11,
                                    headerLine4Size: 11,
                                    headerLine5Size: 11,
                                    headerLine6Size: 10.5,
                                    headerLine1Color: "#002b49",
                                    headerLine2Color: "#1e3a8a",
                                    headerLine3Color: "#dc2626",
                                    headerLine4Color: "#dc2626",
                                    headerLine5Color: "#0284c7",
                                    headerLine6Color: "#475569"
                                  });
                                }}
                                className="text-[10px] font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                              >
                                Reset Lines
                              </button>
                            </div>
                          </div>

                          {/* 6 Line Cards */}
                          {[
                            {
                              num: 1,
                              label: "College Name (Line 1)",
                              text: "ST. ANN’S COLLEGE FOR WOMEN",
                              sizeKey: "headerLine1Size" as const,
                              colorKey: "headerLine1Color" as const,
                              min: 14,
                              max: 36,
                              step: 1,
                              defaultSize: 21,
                              currentSize: config.headerLine1Size ?? config.headerTitleSize ?? 21,
                              currentColor: config.headerLine1Color || "#002b49",
                              badge: "Main College Title",
                              swatches: ["#002b49", "#ffffff", "#0f172a", "#1e3a8a", "#dc2626", "#0284c7", "#475569", "#d97706"]
                            },
                            {
                              num: 2,
                              label: "Society Name (Line 2)",
                              text: "Run by The Society of St Anne",
                              sizeKey: "headerLine2Size" as const,
                              colorKey: "headerLine2Color" as const,
                              min: 8,
                              max: 22,
                              step: 0.5,
                              defaultSize: 11,
                              currentSize: config.headerLine2Size ?? config.headerSubSize ?? 11,
                              currentColor: config.headerLine2Color || "#1e3a8a",
                              badge: "Run by Line",
                              swatches: ["#1e3a8a", "#2563eb", "#002b49", "#ffffff", "#dc2626", "#0284c7", "#475569", "#d97706"]
                            },
                            {
                              num: 3,
                              label: "Affiliation Line (Line 3)",
                              text: "Affiliated to Acharya Nagarjuna University, Approved by AICTE",
                              sizeKey: "headerLine3Size" as const,
                              colorKey: "headerLine3Color" as const,
                              min: 8,
                              max: 22,
                              step: 0.5,
                              defaultSize: 11,
                              currentSize: config.headerLine3Size ?? config.headerSubSize ?? 11,
                              currentColor: config.headerLine3Color || "#dc2626",
                              badge: "Affiliation & Approval",
                              swatches: ["#dc2626", "#991b1b", "#ea580c", "#1e3a8a", "#002b49", "#ffffff", "#0284c7", "#475569"]
                            },
                            {
                              num: 4,
                              label: "UGC Recognition (Line 4)",
                              text: "Recognized under Section 2(f) of the UGC Act, 1956, New Delhi.",
                              sizeKey: "headerLine4Size" as const,
                              colorKey: "headerLine4Color" as const,
                              min: 8,
                              max: 22,
                              step: 0.5,
                              defaultSize: 11,
                              currentSize: config.headerLine4Size ?? config.headerSubSize ?? 11,
                              currentColor: config.headerLine4Color || "#dc2626",
                              badge: "UGC 2(f) Act",
                              swatches: ["#dc2626", "#ea580c", "#991b1b", "#1e3a8a", "#002b49", "#ffffff", "#0284c7", "#475569"]
                            },
                            {
                              num: 5,
                              label: "NAAC Accreditation (Line 5)",
                              text: "Accredited by NAAC with ‘A’ Grade in the First Cycle",
                              sizeKey: "headerLine5Size" as const,
                              colorKey: "headerLine5Color" as const,
                              min: 8,
                              max: 22,
                              step: 0.5,
                              defaultSize: 11,
                              currentSize: config.headerLine5Size ?? config.headerSubSize ?? 11,
                              currentColor: config.headerLine5Color || "#0284c7",
                              badge: "NAAC ‘A’ Grade",
                              swatches: ["#0284c7", "#0369a1", "#1d4ed8", "#1e3a8a", "#059669", "#d97706", "#ffffff", "#475569"]
                            },
                            {
                              num: 6,
                              label: "Campus Address (Line 6)",
                              text: "Amaravathi Road, Gorantla, Guntur–34, Andhra Pradesh, India.",
                              sizeKey: "headerLine6Size" as const,
                              colorKey: "headerLine6Color" as const,
                              min: 8,
                              max: 22,
                              step: 0.5,
                              defaultSize: 10.5,
                              currentSize: config.headerLine6Size ?? 10.5,
                              currentColor: config.headerLine6Color || "#475569",
                              badge: "Location & PIN",
                              swatches: ["#475569", "#002b49", "#0f172a", "#334155", "#64748b", "#94a3b8", "#ffffff", "#0284c7"]
                            }
                          ].map((line) => (
                            <div
                              key={line.num}
                              className="p-3.5 bg-slate-50 border-2 border-slate-200/90 rounded-2xl flex flex-col gap-2.5 shadow-2xs hover:border-slate-300 transition-all"
                            >
                              {/* Header: Title, Badge, and Color Preview */}
                              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-900 text-white font-black text-[10px] shrink-0">
                                    {line.num}
                                  </span>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-black text-slate-800 truncate">
                                      {line.label}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-semibold truncate">
                                      {line.badge}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Live size badge & color swatch */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="font-mono text-emerald-950 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-[11px]">
                                    {line.currentSize}px
                                  </span>
                                  <span
                                    className="h-5 w-6 rounded-md border border-slate-300 shadow-2xs shrink-0"
                                    style={{ backgroundColor: line.currentColor }}
                                  />
                                </div>
                              </div>

                              {/* Live text preview banner */}
                              <div
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200/80 text-[11px] font-bold truncate select-none shadow-inner"
                                style={{
                                  backgroundColor: "#ffffff",
                                  color: line.currentColor,
                                  fontSize: `${Math.min(14, line.currentSize)}px`
                                }}
                              >
                                {line.text}
                              </div>

                              {/* Size Slider */}
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                                  <span>Font Size:</span>
                                  <span className="text-slate-400 font-mono text-[10px]">
                                    {line.min}px – {line.max}px (default {line.defaultSize}px)
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min={line.min}
                                  max={line.max}
                                  step={line.step}
                                  value={line.currentSize}
                                  onChange={(e) => updateConfig({ [line.sizeKey]: Number(e.target.value) } as any)}
                                  className="w-full accent-emerald-600 cursor-pointer"
                                />
                              </div>

                              {/* Color Controls: Native Picker + Hex Text + Swatches */}
                              <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200/80">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                                  <span>Text Color:</span>
                                  <span className="font-mono text-[10px] uppercase text-slate-500 font-bold">
                                    {line.currentColor}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={line.currentColor}
                                    onChange={(e) => updateConfig({ [line.colorKey]: e.target.value } as any)}
                                    className="h-8 w-10 rounded-lg cursor-pointer border border-slate-300 shrink-0 p-0.5 bg-white"
                                  />
                                  <input
                                    type="text"
                                    value={line.currentColor}
                                    onChange={(e) => updateConfig({ [line.colorKey]: e.target.value } as any)}
                                    className="flex-1 px-2.5 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 rounded-lg uppercase text-slate-800"
                                  />
                                </div>

                                {/* Quick swatches */}
                                <div className="flex items-center gap-1.5 pt-0.5">
                                  <span className="text-[9px] font-black uppercase text-slate-400 mr-0.5">
                                    Quick:
                                  </span>
                                  {line.swatches.map((swatch) => (
                                    <button
                                      key={swatch}
                                      type="button"
                                      onClick={() => updateConfig({ [line.colorKey]: swatch } as any)}
                                      className={`h-5 w-5 rounded-md border transition-all cursor-pointer ${
                                        line.currentColor.toLowerCase() === swatch.toLowerCase()
                                          ? "ring-2 ring-emerald-500 scale-110 border-slate-900"
                                          : "border-slate-300 hover:scale-105"
                                      }`}
                                      style={{ backgroundColor: swatch }}
                                      title={swatch}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Unified Quick Sliders (Original 2 Sliders) */
                        <div className="flex flex-col gap-3">
                          {/* Title Font Size */}
                          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span>College Name Size:</span>
                              <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                                {config.headerTitleSize}px
                              </span>
                            </div>
                            <input
                              type="range"
                              min="16"
                              max="28"
                              value={config.headerTitleSize}
                              onChange={(e) => updateConfig({ headerTitleSize: Number(e.target.value), headerLine1Size: Number(e.target.value) })}
                              className="w-full accent-emerald-600 cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                              <span>16px</span>
                              <span>Default 21px</span>
                              <span>28px</span>
                            </div>
                          </div>

                          {/* Subtext Font Size */}
                          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span>Subtext &amp; Address Size (All 5 Sublines):</span>
                              <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                                {config.headerSubSize}px
                              </span>
                            </div>
                            <input
                              type="range"
                              min="9"
                              max="14"
                              step="0.5"
                              value={config.headerSubSize}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                updateConfig({
                                  headerSubSize: val,
                                  headerLine2Size: val,
                                  headerLine3Size: val,
                                  headerLine4Size: val,
                                  headerLine5Size: val,
                                  headerLine6Size: Math.max(9, val - 0.5)
                                });
                              }}
                              className="w-full accent-emerald-600 cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                              <span>9px</span>
                              <span>Default 11px</span>
                              <span>14px</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Color Palette Switcher Notice */}
                      <div className="p-3 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-between gap-2 mt-1">
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4 text-purple-600 shrink-0" />
                          <span className="text-[11px] font-bold text-purple-900 leading-tight">
                            Full College Site Color Palette Customizer:
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleSwitchToColor}
                          className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-black hover:bg-purple-700 transition-all cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          Open Palette &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 1: INDIVIDUAL LOGO & COLLEGE NAME CONTROLLERS         */}
              {/* ========================================================= */}
              {activeTab === "logos" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  
                  {/* Section Title Banner */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                        Separate Controllers for Each Logo &amp; Item:
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Live sizing, visibility &amp; spacing controls
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs">
                      5 Separate Sliders
                    </span>
                  </div>

                  {/* Quick Uniform Presets */}
                  <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-100 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-slate-700">Quick Uniform Presets:</span>
                      <span className="text-[9.5px] text-slate-400 font-semibold">One-click sync</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateConfig({
                          crestLogoSize: 92,
                          headerGraphicSize: 92,
                          logo29YearsSize: 92,
                          logoNaacSize: 92,
                          logoAicteSize: 92,
                          logoBarPaddingY: 0,
                          crestLogoVisible: true,
                          logo29YearsVisible: true,
                          logoNaacVisible: true,
                          logoAicteVisible: true
                        })}
                        className="py-1.5 px-1.5 rounded-xl bg-slate-950 text-white text-[10px] font-black hover:bg-slate-800 transition-all cursor-pointer shadow-xs ring-2 ring-emerald-500/20 text-center"
                      >
                        Fit Bar (92px)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateConfig({
                          crestLogoSize: 72,
                          headerGraphicSize: 72,
                          logo29YearsSize: 64,
                          logoNaacSize: 64,
                          logoAicteSize: 64,
                          logoBarPaddingY: 6
                        })}
                        className="py-1.5 px-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs text-center"
                      >
                        Compact (64px)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateConfig({
                          crestLogoSize: 104,
                          headerGraphicSize: 104,
                          logo29YearsSize: 104,
                          logoNaacSize: 104,
                          logoAicteSize: 104,
                          logoBarPaddingY: 0
                        })}
                        className="py-1.5 px-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs text-center"
                      >
                        Grand (104px)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateConfig({
                          crestLogoSize: 92,
                          headerGraphicSize: 92,
                          logo29YearsSize: 92,
                          logoNaacSize: 92,
                          logoAicteSize: 92,
                          logoBarPaddingY: 0,
                          logoBarGap: 14,
                          logoBarLeftGap: 16,
                          headerGraphicMaxWidth: 620,
                          crestLogoOffset: 0
                        })}
                        className="py-1.5 px-1.5 rounded-xl bg-slate-200 border border-slate-300 text-slate-800 text-[10px] font-bold hover:bg-slate-300 transition-all cursor-pointer text-center"
                      >
                        Reset All
                      </button>
                    </div>
                  </div>

                  {/* ======================================================= */}
                  {/* CONTROLLER 1: LEFT COLLEGE CREST LOGO                   */}
                  {/* ======================================================= */}
                  <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/Crest_Logo.png?v=full_v5"
                          alt="Crest preview"
                          className="h-8 w-8 object-contain shrink-0 drop-shadow-xs p-0.5 bg-slate-50 rounded-lg border border-slate-200"
                        />
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-slate-800">
                            1. College Crest Logo (Left)
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            Official college crest symbol
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => updateConfig({ crestLogoVisible: config.crestLogoVisible === false ? true : false })}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            config.crestLogoVisible !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                          title="Toggle Crest Logo Visibility"
                        >
                          {config.crestLogoVisible !== false ? <Eye className="h-3 w-3 text-emerald-600" /> : <EyeOff className="h-3 w-3 text-slate-400" />}
                          <span>{config.crestLogoVisible !== false ? "Visible" : "Hidden"}</span>
                        </button>

                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-xs">
                          {config.crestLogoSize ?? 92}px
                        </span>
                      </div>
                    </div>

                    {/* Crest Height Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Logo Height:</span>
                        <span className="text-slate-400 font-mono text-[10px]">36px – 140px (Default 92px)</span>
                      </div>
                      <input
                        type="range"
                        min="36"
                        max="140"
                        value={config.crestLogoSize ?? 92}
                        onChange={(e) => updateConfig({ crestLogoSize: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Crest Left Margin / Offset Slider */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10.5px]">
                      <span className="font-bold text-slate-600">Left Offset / Spacing:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={config.crestLogoOffset ?? 0}
                          onChange={(e) => updateConfig({ crestLogoOffset: Number(e.target.value) })}
                          className="w-24 accent-emerald-600 cursor-pointer"
                        />
                        <span className="font-mono font-bold text-slate-700 text-[10px] w-8 text-right">
                          {config.crestLogoOffset ?? 0}px
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ======================================================= */}
                  {/* CONTROLLER 2: COLLEGE NAME ITEM IN LOGO BAR (MASTHEAD)  */}
                  {/* ======================================================= */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-white border-2 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/40 text-emerald-800 text-xs font-black shrink-0">
                          <Type className="h-4 w-4" />
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-slate-900">
                            2. College Name Item in Logo Bar
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            {config.headerMode === "image_v1" ? "Image Version 1 (4-Line)" : config.headerMode === "image_v2" ? "Image Version 2 (6-Line with Address)" : "Pure Live HTML Typography"}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-xs">
                        {config.headerGraphicSize ?? 92}px
                      </span>
                    </div>

                    {/* Mode Selector Buttons inside College Name Controller */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Display Mode for College Name:
                      </span>
                      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                        <button
                          type="button"
                          onClick={() => updateConfig({ headerMode: "image_v1" })}
                          className={`py-1 px-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer text-center truncate ${
                            config.headerMode === "image_v1"
                              ? "bg-slate-950 text-white shadow-xs"
                              : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          Option 1 (4-Line)
                        </button>
                        <button
                          type="button"
                          onClick={() => updateConfig({ headerMode: "image_v2" })}
                          className={`py-1 px-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer text-center truncate ${
                            config.headerMode === "image_v2"
                              ? "bg-slate-950 text-white shadow-xs"
                              : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          Option 2 (6-Line)
                        </button>
                        <button
                          type="button"
                          onClick={() => updateConfig({ headerMode: "text" })}
                          className={`py-1 px-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer text-center truncate ${
                            config.headerMode === "text"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "text-slate-600 hover:bg-white"
                          }`}
                        >
                          Option 3 (HTML Text)
                        </button>
                      </div>
                    </div>

                    {/* Height Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Height / Vertical Scale:</span>
                        <span className="text-slate-400 font-mono text-[10px]">36px – 140px (Default 92px)</span>
                      </div>
                      <input
                        type="range"
                        min="36"
                        max="140"
                        value={config.headerGraphicSize ?? 92}
                        onChange={(e) => updateConfig({ headerGraphicSize: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Max Width Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Max Width / Horizontal Spread:</span>
                        <span className="font-mono text-slate-700 font-bold text-[10.5px]">
                          {config.headerGraphicMaxWidth ?? 620}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="280"
                        max="800"
                        step="10"
                        value={config.headerGraphicMaxWidth ?? 620}
                        onChange={(e) => updateConfig({ headerGraphicMaxWidth: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9.5px] text-slate-400 font-semibold">
                        <span>280px (Narrow)</span>
                        <span>Default 620px</span>
                        <span>800px (Wide)</span>
                      </div>
                    </div>

                    {/* Extra Text Mode Live Sliders if in Option 3 */}
                    {config.headerMode === "text" && (
                      <div className="flex flex-col gap-2.5 pt-2.5 border-t-2 border-emerald-100 bg-emerald-50/50 p-2.5 rounded-xl">
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                          <span>College Name Font Size (Line 1):</span>
                          <span className="font-mono text-emerald-900 bg-white border border-emerald-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            {config.headerLine1Size ?? config.headerTitleSize ?? 21}px
                          </span>
                        </div>
                        <input
                          type="range"
                          min="14"
                          max="36"
                          value={config.headerLine1Size ?? config.headerTitleSize ?? 21}
                          onChange={(e) => updateConfig({ headerLine1Size: Number(e.target.value), headerTitleSize: Number(e.target.value) })}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />

                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                          <span>Sublines Font Size (Lines 2–6):</span>
                          <span className="font-mono text-emerald-900 bg-white border border-emerald-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            {config.headerSubSize ?? 11}px
                          </span>
                        </div>
                        <input
                          type="range"
                          min="8"
                          max="22"
                          step="0.5"
                          value={config.headerSubSize ?? 11}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateConfig({
                              headerSubSize: val,
                              headerLine2Size: val,
                              headerLine3Size: val,
                              headerLine4Size: val,
                              headerLine5Size: val,
                              headerLine6Size: Math.max(8, val - 0.5)
                            });
                          }}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />

                        <button
                          type="button"
                          onClick={() => setActiveTab("masthead")}
                          className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-700 text-white text-[11px] font-bold hover:bg-emerald-800 transition-all cursor-pointer shadow-xs mt-1"
                        >
                          <span>Open Full 6-Line Typography &amp; Colors Studio</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ======================================================= */}
                  {/* CONTROLLER 3: 29+ YEARS OF EXCELLENCE LOGO              */}
                  {/* ======================================================= */}
                  <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/29years--logo.png?v=full_v5"
                          alt="29 Years preview"
                          className="h-8 w-8 object-contain shrink-0 drop-shadow-xs p-0.5 bg-slate-50 rounded-lg border border-slate-200"
                        />
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-slate-800">
                            3. 29+ Years Excellence Logo
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            1997 - 2026 Anniversary badge
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => updateConfig({ logo29YearsVisible: config.logo29YearsVisible === false ? true : false })}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            config.logo29YearsVisible !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                          title="Toggle 29+ Years Logo Visibility"
                        >
                          {config.logo29YearsVisible !== false ? <Eye className="h-3 w-3 text-emerald-600" /> : <EyeOff className="h-3 w-3 text-slate-400" />}
                          <span>{config.logo29YearsVisible !== false ? "Visible" : "Hidden"}</span>
                        </button>

                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-xs">
                          {config.logo29YearsSize ?? 92}px
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Logo Height:</span>
                        <span className="text-slate-400 font-mono text-[10px]">36px – 140px (Default 92px)</span>
                      </div>
                      <input
                        type="range"
                        min="36"
                        max="140"
                        value={config.logo29YearsSize ?? 92}
                        onChange={(e) => updateConfig({ logo29YearsSize: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* ======================================================= */}
                  {/* CONTROLLER 4: NAAC 'A' GRADE ACCREDITATION LOGO         */}
                  {/* ======================================================= */}
                  <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/naac_logo_clean.png?v=full_v5"
                          alt="NAAC preview"
                          className="h-8 w-8 object-contain shrink-0 drop-shadow-xs p-0.5 bg-slate-50 rounded-lg border border-slate-200"
                        />
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-slate-800">
                            4. NAAC &apos;A&apos; Grade Logo
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            National Assessment Council
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => updateConfig({ logoNaacVisible: config.logoNaacVisible === false ? true : false })}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            config.logoNaacVisible !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                          title="Toggle NAAC Logo Visibility"
                        >
                          {config.logoNaacVisible !== false ? <Eye className="h-3 w-3 text-emerald-600" /> : <EyeOff className="h-3 w-3 text-slate-400" />}
                          <span>{config.logoNaacVisible !== false ? "Visible" : "Hidden"}</span>
                        </button>

                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-xs">
                          {config.logoNaacSize ?? 92}px
                        </span>
                      </div>
                    </div>

                    {/* Height Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Logo Height:</span>
                        <span className="text-slate-400 font-mono text-[10px]">36px – 140px (Default 92px)</span>
                      </div>
                      <input
                        type="range"
                        min="36"
                        max="140"
                        value={config.logoNaacSize ?? 92}
                        onChange={(e) => updateConfig({ logoNaacSize: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Accompanying Text Controls */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10.5px]">
                      <span className="font-bold text-slate-600">Side Label (&ldquo;NAAC &lsquo;A&rsquo;&rdquo;):</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateConfig({ logoNaacTextVisible: config.logoNaacTextVisible === false ? true : false })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                            config.logoNaacTextVisible !== false ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {config.logoNaacTextVisible !== false ? "Label On" : "Label Off"}
                        </button>
                        <input
                          type="range"
                          min="10"
                          max="16"
                          value={config.logoNaacTextSize ?? 13}
                          onChange={(e) => updateConfig({ logoNaacTextSize: Number(e.target.value) })}
                          className="w-16 accent-amber-600 cursor-pointer"
                          title="Font size for NAAC label"
                        />
                        <span className="font-mono font-bold text-slate-700 text-[10px] w-7 text-right">
                          {config.logoNaacTextSize ?? 13}px
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ======================================================= */}
                  {/* CONTROLLER 5: AICTE APPROVED LOGO                       */}
                  {/* ======================================================= */}
                  <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/AICTE_Logo.png?v=full_v5"
                          alt="AICTE preview"
                          className="h-8 w-8 object-contain shrink-0 drop-shadow-xs p-0.5 bg-slate-50 rounded-lg border border-slate-200"
                        />
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-slate-800">
                            5. AICTE Approved Logo
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            Council for Technical Education
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => updateConfig({ logoAicteVisible: config.logoAicteVisible === false ? true : false })}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            config.logoAicteVisible !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 text-slate-400 border border-slate-300"
                          }`}
                          title="Toggle AICTE Logo Visibility"
                        >
                          {config.logoAicteVisible !== false ? <Eye className="h-3 w-3 text-emerald-600" /> : <EyeOff className="h-3 w-3 text-slate-400" />}
                          <span>{config.logoAicteVisible !== false ? "Visible" : "Hidden"}</span>
                        </button>

                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg font-black text-xs">
                          {config.logoAicteSize ?? 92}px
                        </span>
                      </div>
                    </div>

                    {/* Height Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Logo Height:</span>
                        <span className="text-slate-400 font-mono text-[10px]">36px – 140px (Default 92px)</span>
                      </div>
                      <input
                        type="range"
                        min="36"
                        max="140"
                        value={config.logoAicteSize ?? 92}
                        onChange={(e) => updateConfig({ logoAicteSize: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Accompanying Text Controls */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10.5px]">
                      <span className="font-bold text-slate-600">Side Label (&ldquo;AICTE&rdquo;):</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateConfig({ logoAicteTextVisible: config.logoAicteTextVisible === false ? true : false })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                            config.logoAicteTextVisible !== false ? "bg-blue-100 text-blue-900 border border-blue-300" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {config.logoAicteTextVisible !== false ? "Label On" : "Label Off"}
                        </button>
                        <input
                          type="range"
                          min="10"
                          max="16"
                          value={config.logoAicteTextSize ?? 13}
                          onChange={(e) => updateConfig({ logoAicteTextSize: Number(e.target.value) })}
                          className="w-16 accent-blue-600 cursor-pointer"
                          title="Font size for AICTE label"
                        />
                        <span className="font-mono font-bold text-slate-700 text-[10px] w-7 text-right">
                          {config.logoAicteTextSize ?? 13}px
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ======================================================= */}
                  {/* CONTROLLER 6: LOGO BAR PADDING & SPACING                */}
                  {/* ======================================================= */}
                  <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-slate-100 border border-slate-300/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">
                        6. Logo Bar Layout, Gap &amp; Vertical Padding:
                      </span>
                      <span className="font-mono text-slate-700 bg-white border border-slate-300 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        Dynamic Bar Height
                      </span>
                    </div>

                    {/* Vertical Padding Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Top &amp; Bottom Vertical Padding:</span>
                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md font-black text-[11px]">
                          {config.logoBarPaddingY ?? 0}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={config.logoBarPaddingY ?? 0}
                        onChange={(e) => updateConfig({ logoBarPaddingY: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9.5px] text-slate-400 font-semibold">
                        <span>0px (Edge-to-Edge Vertical Fit)</span>
                        <span>Default 0px</span>
                        <span>24px (Spacious)</span>
                      </div>
                    </div>

                    {/* Gap Between Right Logos Slider */}
                    <div className="flex flex-col gap-1 pt-1 border-t border-slate-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Gap Between Right Logos:</span>
                        <span className="font-mono text-slate-800 bg-white border border-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                          {config.logoBarGap ?? 14}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="28"
                        value={config.logoBarGap ?? 14}
                        onChange={(e) => updateConfig({ logoBarGap: Number(e.target.value) })}
                        className="w-full accent-slate-700 cursor-pointer"
                      />
                    </div>

                    {/* Gap Between Crest & College Name Slider */}
                    <div className="flex flex-col gap-1 pt-1 border-t border-slate-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Gap Between Crest &amp; College Name:</span>
                        <span className="font-mono text-slate-800 bg-white border border-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                          {config.logoBarLeftGap ?? 16}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="32"
                        value={config.logoBarLeftGap ?? 16}
                        onChange={(e) => updateConfig({ logoBarLeftGap: Number(e.target.value) })}
                        className="w-full accent-slate-700 cursor-pointer"
                      />
                    </div>

                    {/* Live Height Summary */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-[10.5px]">
                      <span className="text-slate-600 font-semibold">Calculated Logo Bar Height:</span>
                      <span className="font-mono font-black text-emerald-900 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                        {Math.max(
                          config.crestLogoSize ?? 92,
                          config.headerGraphicSize ?? 92,
                          config.logo29YearsSize ?? 92,
                          config.logoNaacSize ?? 92,
                          config.logoAicteSize ?? 92,
                          92
                        )}px
                      </span>
                    </div>
                  </div>

                  {/* -------------------------------------------------------- */}
                  {/* HEADING 1 NOTCH STYLE TOGGLE                             */}
                  {/* -------------------------------------------------------- */}
                  <div className="flex flex-col gap-3 pt-3 border-t-2 border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                          Page Heading Style
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          The title notch below the top nav bar
                        </span>
                      </div>
                      <span className="text-[9.5px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-300 px-2 py-0.5 rounded-full">
                        Layout
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Option A: Notch (current) */}
                      <button
                        onClick={() => updateConfig({ heading1Style: "notch" })}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                          (config.heading1Style ?? "notch") === "notch"
                            ? "border-indigo-500 bg-indigo-50 shadow-md"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        {/* Mini visual preview of notch */}
                        <div className="w-full h-10 bg-slate-100 rounded-lg relative flex items-start justify-center overflow-hidden">
                          <div className="absolute top-0 w-3/5 h-6 rounded-b-xl" style={{ background: "linear-gradient(135deg, #001730, #002147)" }} />
                        </div>
                        <span className={`text-[10px] font-black ${ (config.heading1Style ?? "notch") === "notch" ? "text-indigo-700" : "text-slate-500" }`}>
                          Notch (Current)
                        </span>
                        {(config.heading1Style ?? "notch") === "notch" && (
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Active</span>
                        )}
                      </button>

                      {/* Option B: Full-Width Banner */}
                      <button
                        onClick={() => updateConfig({ heading1Style: "fullwidth" })}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                          config.heading1Style === "fullwidth"
                            ? "border-indigo-500 bg-indigo-50 shadow-md"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        {/* Mini visual preview of full-width bar */}
                        <div className="w-full h-10 bg-slate-100 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001730, #002147)" }} />
                        </div>
                        <span className={`text-[10px] font-black ${ config.heading1Style === "fullwidth" ? "text-indigo-700" : "text-slate-500" }`}>
                          Full Width
                        </span>
                        {config.heading1Style === "fullwidth" && (
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Active</span>
                        )}
                      </button>
                    </div>

                    <p className="text-[9.5px] text-slate-400 font-medium leading-relaxed">
                      <strong className="text-slate-600">Notch</strong> — drops as a pill from the nav bar with rounded bottom corners. <strong className="text-slate-600">Full Width</strong> — spans edge-to-edge, flush with the nav bar, no gaps.
                    </p>
                  </div>

                </div>
              )}


              {/* ========================================================= */}
              {/* TAB: ANNOUNCEMENT BAR & BLINKING BADGE CONTROLS          */}
              {/* ========================================================= */}
              {activeTab === "announcement" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  
                  {/* Banner / Info Card */}
                  <div className="p-3.5 bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-red-200/80 shadow-2xs flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
                          <Bell className="h-4 w-4" />
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-slate-900">
                            Sitewide Announcement Bar
                          </span>
                          <span className="text-[10px] font-semibold text-red-700">
                            Visible across every page of the website
                          </span>
                        </div>
                      </div>
                      <span className="text-[9.5px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                        Sitewide
                      </span>
                    </div>

                    {/* Mini Live Preview Box */}
                    <div
                      className="mt-1 p-2.5 rounded-xl border border-slate-700/60 overflow-hidden flex items-center justify-between gap-2 text-xs"
                      style={{
                        backgroundColor: config.announcementBg || "#020617",
                        color: config.announcementTextColor || "#e2e8f0"
                      }}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                        <span
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md font-extrabold uppercase text-[9.5px] tracking-wider shrink-0 transition-all ${
                            config.announcementBlinkStyle === "rapid"
                              ? "animate-announcement-badge-rapid ring-2 ring-red-400"
                              : config.announcementBlinkStyle === "glow"
                              ? "animate-announcement-badge-pulse-glow ring-2 ring-blue-400"
                              : config.announcementBlinkStyle === "solid"
                              ? "ring-1 ring-white/30"
                              : "animate-announcement-badge-blink ring-2 ring-red-400"
                          }`}
                          style={{
                            backgroundColor: config.announcementBadgeBg || "#dc2626",
                            color: config.announcementBadgeTextColor || "#ffffff"
                          }}
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                          </span>
                          <Bell className="h-2.5 w-2.5 animate-bounce" />
                          <span>{config.announcementBadgeText || "ANNOUNCEMENTS"}</span>
                        </span>
                        <span className="text-[10px] truncate opacity-90 font-medium">
                          {config.announcementCustomText || "Admissions are officially open for UG & PG 2026-2027..."}
                        </span>
                      </div>
                      {config.announcementShowContact !== false && (
                        <span className="text-[9px] text-amber-300 font-bold shrink-0 hidden sm:inline">
                          0863-2236470
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 1. Visibility Switch */}
                  <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black text-slate-800">
                        Announcement Bar Visibility
                      </span>
                      <span className="text-[10.5px] text-slate-400 font-medium">
                        Show or hide ticker across all pages
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateConfig({ announcementVisible: config.announcementVisible === false ? true : false })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs ${
                        config.announcementVisible !== false
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                      }`}
                    >
                      {config.announcementVisible !== false ? (
                        <>
                          <Eye className="h-3.5 w-3.5" />
                          <span>Visible (On)</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" />
                          <span>Hidden (Off)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 2. "Announcements" Button/Badge Box (Attention & Blinking) */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-red-200/90 shadow-xs flex flex-col gap-3.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-xs font-black text-slate-900">
                          &ldquo;Announcements&rdquo; Button Badge Box
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        Focus &amp; Blink
                      </span>
                    </div>

                    {/* Badge Label Text Input */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[11px] font-bold text-slate-700">Badge Text Label:</label>
                      <input
                        type="text"
                        value={config.announcementBadgeText || "ANNOUNCEMENTS"}
                        onChange={(e) => updateConfig({ announcementBadgeText: e.target.value })}
                        placeholder="ANNOUNCEMENTS"
                        className="px-3 py-2 text-xs font-extrabold uppercase tracking-wide bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-2xs"
                      />
                      <div className="flex flex-wrap gap-1 pt-1">
                        {["ANNOUNCEMENTS", "ADMISSIONS ALERT", "LATEST NOTICES", "IMPORTANT", "FLASH NEWS"].map((txt) => (
                          <button
                            key={txt}
                            type="button"
                            onClick={() => updateConfig({ announcementBadgeText: txt })}
                            className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition-all cursor-pointer ${
                              (config.announcementBadgeText || "ANNOUNCEMENTS") === txt
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {txt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Attention / Blinking Effect Selector */}
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 text-left">
                      <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                        <span>Blink &amp; Attention Effect:</span>
                        <span className="text-[10px] font-semibold text-slate-400">Gets user focus</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            id: "blink",
                            name: "Pulse & Glow Blink",
                            desc: "High-focus glow pulse (Recommended)"
                          },
                          {
                            id: "rapid",
                            name: "Rapid Flash",
                            desc: "Urgent rhythmic blink"
                          },
                          {
                            id: "glow",
                            name: "Ambient Pulse Glow",
                            desc: "Smooth continuous breathing glow"
                          },
                          {
                            id: "solid",
                            name: "Solid / Static",
                            desc: "Steady badge without blinking"
                          }
                        ].map((m) => {
                          const isActive = (config.announcementBlinkStyle || "blink") === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => updateConfig({ announcementBlinkStyle: m.id as any })}
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
                              <span className={`text-[9.5px] leading-tight ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                                {m.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Badge Background Color */}
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 text-left">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700">Badge Background Color:</label>
                        <span className="font-mono text-[10px] font-black text-slate-600 uppercase">
                          {config.announcementBadgeBg || "#dc2626"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex flex-wrap gap-1.5">
                          {[
                            { name: "Alert Crimson", val: "#dc2626" },
                            { name: "Royal Navy", val: "#1e40af" },
                            { name: "Amber Gold", val: "#d97706" },
                            { name: "Emerald", val: "#059669" },
                            { name: "Deep Maroon", val: "#831843" },
                            { name: "Electric Purple", val: "#7c3aed" },
                            { name: "Dark Indigo", val: "#312e81" }
                          ].map((c) => (
                            <button
                              key={c.val}
                              type="button"
                              onClick={() => updateConfig({ announcementBadgeBg: c.val })}
                              className={`h-7 w-7 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center ${
                                (config.announcementBadgeBg || "#dc2626") === c.val
                                  ? "border-slate-950 scale-110 shadow-sm ring-2 ring-slate-950/20"
                                  : "border-white shadow-2xs hover:scale-105"
                              }`}
                              style={{ backgroundColor: c.val }}
                              title={c.name}
                            >
                              {(config.announcementBadgeBg || "#dc2626") === c.val && (
                                <Check className="h-3.5 w-3.5 text-white drop-shadow-xs" />
                              )}
                            </button>
                          ))}
                        </div>
                        <input
                          type="color"
                          value={config.announcementBadgeBg || "#dc2626"}
                          onChange={(e) => updateConfig({ announcementBadgeBg: e.target.value })}
                          className="h-8 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white shrink-0"
                          title="Custom Badge Color"
                        />
                      </div>
                    </div>

                    {/* Badge Text Color */}
                    <div className="flex flex-col gap-1.5 pt-1 text-left">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700">Badge Text Color:</label>
                        <span className="font-mono text-[10px] font-black text-slate-600 uppercase">
                          {config.announcementBadgeTextColor || "#ffffff"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[
                          { name: "Pure White", val: "#ffffff" },
                          { name: "Bright Yellow", val: "#fef08a" },
                          { name: "Light Amber", val: "#fef3c7" },
                          { name: "Ice Blue", val: "#e0f2fe" },
                          { name: "Dark Slate", val: "#0f172a" }
                        ].map((tc) => (
                          <button
                            key={tc.val}
                            type="button"
                            onClick={() => updateConfig({ announcementBadgeTextColor: tc.val })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all cursor-pointer ${
                              (config.announcementBadgeTextColor || "#ffffff") === tc.val
                                ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-white"
                            }`}
                          >
                            {tc.name}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* 3. Bar Background, Height & Ticker Typography */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex flex-col gap-3.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-black text-slate-900">
                        Bar Background, Height &amp; Marquee Speed
                      </span>
                      <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                        Layout
                      </span>
                    </div>

                    {/* Bar Background Color */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700">Bar Background Color:</label>
                        <span className="font-mono text-[10px] font-black text-slate-600 uppercase">
                          {config.announcementBg || "#020617"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex flex-wrap gap-1.5">
                          {[
                            { name: "Slate 950", val: "#020617" },
                            { name: "Midnight Navy", val: "#001730" },
                            { name: "Royal Oxford", val: "#002147" },
                            { name: "Charcoal 900", val: "#0f172a" },
                            { name: "Deep Maroon", val: "#2c0b0e" },
                            { name: "Pure White", val: "#ffffff" }
                          ].map((bg) => (
                            <button
                              key={bg.val}
                              type="button"
                              onClick={() => updateConfig({ announcementBg: bg.val })}
                              className={`h-7 w-7 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center ${
                                (config.announcementBg || "#020617") === bg.val
                                  ? "border-emerald-500 scale-110 shadow-sm ring-2 ring-emerald-500/30"
                                  : "border-slate-200 shadow-2xs hover:scale-105"
                              }`}
                              style={{ backgroundColor: bg.val }}
                              title={bg.name}
                            >
                              {(config.announcementBg || "#020617") === bg.val && (
                                <Check className={`h-3.5 w-3.5 ${bg.val === "#ffffff" ? "text-slate-950" : "text-white"}`} />
                              )}
                            </button>
                          ))}
                        </div>
                        <input
                          type="color"
                          value={config.announcementBg || "#020617"}
                          onChange={(e) => updateConfig({ announcementBg: e.target.value })}
                          className="h-8 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white shrink-0"
                          title="Custom Bar Background Color"
                        />
                      </div>
                    </div>

                    {/* Ticker Text Color */}
                    <div className="flex flex-col gap-1.5 pt-1 text-left">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700">Ticker Text Color:</label>
                        <span className="font-mono text-[10px] font-black text-slate-600 uppercase">
                          {config.announcementTextColor || "#e2e8f0"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex flex-wrap gap-1.5">
                          {[
                            { name: "Crisp White", val: "#ffffff" },
                            { name: "Light Slate", val: "#e2e8f0" },
                            { name: "Muted Slate", val: "#94a3b8" },
                            { name: "Warm Amber", val: "#fef3c7" },
                            { name: "Dark Navy", val: "#002147" }
                          ].map((tcol) => (
                            <button
                              key={tcol.val}
                              type="button"
                              onClick={() => updateConfig({ announcementTextColor: tcol.val })}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                                (config.announcementTextColor || "#e2e8f0") === tcol.val
                                  ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-white"
                              }`}
                            >
                              {tcol.name}
                            </button>
                          ))}
                        </div>
                        <input
                          type="color"
                          value={config.announcementTextColor || "#e2e8f0"}
                          onChange={(e) => updateConfig({ announcementTextColor: e.target.value })}
                          className="h-8 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white shrink-0"
                          title="Custom Ticker Text Color"
                        />
                      </div>
                    </div>

                    {/* Bar Height Slider */}
                    <div className="flex flex-col gap-1 pt-2 border-t border-slate-100 text-left">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Bar Height:</span>
                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-black text-xs">
                          {config.announcementHeight || 40}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="28"
                        max="56"
                        value={config.announcementHeight || 40}
                        onChange={(e) => updateConfig({ announcementHeight: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Ticker Font Size Slider */}
                    <div className="flex flex-col gap-1 text-left">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Ticker Font Size:</span>
                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-black text-xs">
                          {config.announcementFontSize || 12}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="16"
                        value={config.announcementFontSize || 12}
                        onChange={(e) => updateConfig({ announcementFontSize: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    {/* Marquee Speed Slider */}
                    <div className="flex flex-col gap-1 text-left">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Scrolling Duration (Speed):</span>
                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-black text-xs">
                          {config.announcementSpeed || 32}s (Lower = Faster)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="60"
                        value={config.announcementSpeed || 32}
                        onChange={(e) => updateConfig({ announcementSpeed: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-bold px-0.5">
                        <span>15s (Fast)</span>
                        <span>32s (Normal)</span>
                        <span>60s (Gentle Slow)</span>
                      </div>
                    </div>

                  </div>

                  {/* 4. Phone Numbers & Contact (Right side) */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-xs font-black text-slate-900">
                          Right-side Phone Contacts
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateConfig({ announcementShowContact: config.announcementShowContact === false ? true : false })}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                          config.announcementShowContact !== false
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {config.announcementShowContact !== false ? "Visible" : "Hidden"}
                      </button>
                    </div>

                    {config.announcementShowContact !== false && (
                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-600">Phone 1:</label>
                          <input
                            type="text"
                            value={config.announcementPhone1 || "0863-2236470"}
                            onChange={(e) => updateConfig({ announcementPhone1: e.target.value })}
                            placeholder="0863-2236470"
                            className="px-2.5 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-600">Phone 2:</label>
                          <input
                            type="text"
                            value={config.announcementPhone2 || "7382104655"}
                            onChange={(e) => updateConfig({ announcementPhone2: e.target.value })}
                            placeholder="7382104655"
                            className="px-2.5 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5. Custom Marquee Message */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-xs flex flex-col gap-2.5 text-left">
                    <label className="text-xs font-black text-slate-900 flex items-center justify-between">
                      <span>Custom Announcement Highlight:</span>
                      <span className="text-[10px] font-semibold text-slate-400">Prepended to ticker</span>
                    </label>
                    <input
                      type="text"
                      value={config.announcementCustomText || ""}
                      onChange={(e) => updateConfig({ announcementCustomText: e.target.value })}
                      placeholder="e.g. Special Admissions Counseling Session on Saturday!"
                      className="px-3 py-2 text-xs font-medium bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 3: TOP NAVIGATION BAR LAYOUT                         */}
              {/* ========================================================= */}
              {activeTab === "nav" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Top Navigation Font, Size, Weight &amp; Spacing:
                    </span>
                  </div>

                  {/* 1. Font Family */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Navigation Font Family:</label>
                    <select
                      value={config.topnavFontFamily}
                      onChange={(e) => updateConfig({ topnavFontFamily: e.target.value })}
                      className="px-3 py-2 text-xs bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold cursor-pointer shadow-2xs"
                    >
                      {FONT_OPTIONS.map((f, i) => (
                        <option key={i} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Font Size Slider */}
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Menu Links Font Size:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.topnavFontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="11"
                      max="16"
                      value={config.topnavFontSize}
                      onChange={(e) => updateConfig({ topnavFontSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>11px</span>
                      <span>Default 13px</span>
                      <span>16px (Large)</span>
                    </div>
                  </div>

                  {/* 3. Font Weight Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Font Weight (Boldness):</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {WEIGHT_OPTIONS.map((w, i) => (
                        <button
                          key={i}
                          onClick={() => updateConfig({ topnavFontWeight: w.value })}
                          className={`py-2 px-2 rounded-xl text-[11px] transition-all cursor-pointer ${
                            config.topnavFontWeight === w.value
                              ? "bg-slate-950 text-white font-black shadow-xs ring-2 ring-emerald-500/20"
                              : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                          }`}
                        >
                          {w.label.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Menu Items Horizontal Spacing */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Menu Item Spacing (Horizontal Gap):</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.topnavSpacing}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="36"
                      value={config.topnavSpacing}
                      onChange={(e) => updateConfig({ topnavSpacing: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Tight (8px)</span>
                      <span>Balanced (20px)</span>
                      <span>Spacious (36px)</span>
                    </div>
                  </div>

                  {/* 5. Navigation Bar Row Height */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Nav Row Vertical Padding:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.topnavPaddingY}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="18"
                      value={config.topnavPaddingY}
                      onChange={(e) => updateConfig({ topnavPaddingY: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  {/* Color Palette Switcher Notice */}
                  <div className="p-3 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-purple-600 shrink-0" />
                      <span className="text-[11px] font-bold text-purple-900 leading-tight">
                        Looking to change nav colors?
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSwitchToColor}
                      className="text-[10px] font-black text-white bg-purple-600 hover:bg-purple-700 px-2.5 py-1 rounded-md shrink-0 transition-colors cursor-pointer"
                    >
                      Open Color Palette &rarr;
                    </button>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 4: HEADING LEVEL 1 (HERO BANNER LAYOUT & SIZING)      */}
              {/* ========================================================= */}
              {activeTab === "level1" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Heading Level 1 (Hero Banner) Controls:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Full Width Bleed
                    </span>
                  </div>

                  {/* 1. Heading 1 Font Family */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Heading 1 Title Font Family:</label>
                    <select
                      value={config.level1FontFamily}
                      onChange={(e) => updateConfig({ level1FontFamily: e.target.value })}
                      className="px-3 py-2 text-xs bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold cursor-pointer shadow-2xs"
                    >
                      {FONT_OPTIONS.map((f, i) => (
                        <option key={i} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Banner Vertical Padding */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Banner Vertical Padding (Height):</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.level1PaddingY}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="72"
                      value={config.level1PaddingY}
                      onChange={(e) => updateConfig({ level1PaddingY: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Compact (16px)</span>
                      <span>Default 44px</span>
                      <span>Grand (72px)</span>
                    </div>
                  </div>

                  {/* 3. Heading 1 Title Font Size */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Heading 1 Title Font Size:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.level1TitleSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="56"
                      value={config.level1TitleSize}
                      onChange={(e) => updateConfig({ level1TitleSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>24px</span>
                      <span>Default 38px</span>
                      <span>56px (Hero Bold)</span>
                    </div>
                  </div>

                  {/* 4. Subtext Font Size */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Subtext Font Size:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.level1SubSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="22"
                      value={config.level1SubSize}
                      onChange={(e) => updateConfig({ level1SubSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>12px</span>
                      <span>Default 16px</span>
                      <span>22px (Large)</span>
                    </div>
                  </div>

                  {/* 5. Title Alignment & Subtext Width */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <label className="text-xs font-bold text-slate-700">Banner Text Alignment:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => updateConfig({ level1TextAlign: "left" })}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          config.level1TextAlign === "left"
                            ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                            : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                        }`}
                      >
                        <AlignLeft className="h-3.5 w-3.5" />
                        <span>Left</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateConfig({ level1TextAlign: "center" })}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          config.level1TextAlign === "center"
                            ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                            : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                        }`}
                      >
                        <AlignCenter className="h-3.5 w-3.5" />
                        <span>Center</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateConfig({ level1TextAlign: "right" })}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          config.level1TextAlign === "right"
                            ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                            : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                        }`}
                      >
                        <AlignRight className="h-3.5 w-3.5" />
                        <span>Right</span>
                      </button>
                    </div>

                    {/* Gap between Title and Subtext */}
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Title &amp; Subtext Gap:</span>
                        <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-xs font-bold">
                          {config.level1Gap}px
                        </span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="24"
                        value={config.level1Gap}
                        onChange={(e) => updateConfig({ level1Gap: Number(e.target.value) })}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* 6. Subtext Max Width Presets */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Subtext Maximum Reading Width:</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: "Standard", val: "48rem" },
                        { label: "Wide (Def)", val: "56rem" },
                        { label: "Expanded", val: "68rem" },
                        { label: "Full Bleed", val: "100%" }
                      ].map((m) => (
                        <button
                          key={m.val}
                          type="button"
                          onClick={() => updateConfig({ level1SubMaxWidth: m.val })}
                          className={`py-2 px-1 rounded-xl text-[10.5px] transition-all cursor-pointer text-center font-bold ${
                            config.level1SubMaxWidth === m.val
                              ? "bg-slate-950 text-white shadow-xs ring-2 ring-emerald-500/20 font-black"
                              : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Redirection Notice */}
                  <div className="p-3 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-between gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-purple-600 shrink-0" />
                      <span className="text-[11px] font-bold text-purple-900 leading-tight">
                        Looking to change banner gradient or text colors?
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSwitchToColor}
                      className="text-[10px] font-black text-white bg-purple-600 hover:bg-purple-700 px-2.5 py-1 rounded-md shrink-0 transition-colors cursor-pointer"
                    >
                      Open Color Palette &rarr;
                    </button>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 5: SAVED SETUPS                                       */}
              {/* ========================================================= */}
              {activeTab === "snapshots" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Save &amp; Switch Client Layout Configurations:
                    </span>
                  </div>

                  {/* Save Box */}
                  <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <input
                      type="text"
                      placeholder="Name this layout..."
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold"
                    />
                    <button
                      onClick={handleSaveSetup}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <BookmarkPlus className="h-3.5 w-3.5" />
                      <span>Save</span>
                    </button>
                  </div>

                  {/* List of Saved Setups */}
                  <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto">
                    {savedSetups.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs font-medium border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                        No custom layouts saved yet. Fine-tune your sizes and click &quot;Save&quot; above!
                      </div>
                    ) : (
                      savedSetups.map((setup) => (
                        <div
                          key={setup.id}
                          onClick={() => handleApplySavedSetup(setup)}
                          className="p-3 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-400 flex items-center justify-between transition-all cursor-pointer group shadow-2xs"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800 group-hover:text-emerald-800">
                              {setup.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {setup.timestamp} &bull; {setup.config.headerMode}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              Apply
                            </span>
                            <button
                              onClick={(e) => handleDeleteSavedSetup(setup.id, e)}
                              className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t-2 border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0 shadow-xs">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Defaults</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJSON}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Config"}</span>
                </button>
                <button
                  onClick={handleCloseDrawer}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-900 text-white transition-all cursor-pointer shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default HeaderNavCustomizer;
