"use client";

import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal, Image, Type, Maximize2, Compass,
  RotateCcw, Check, Copy, X, BookmarkPlus, Trash2, CheckCircle2,
  Sparkles, Layers, ArrowRight, Eye, Palette,
  AlignLeft, AlignCenter, AlignRight, Ruler, Heading
} from "lucide-react";

export interface HeaderNavConfig {
  headerMode: "image_v1" | "image_v2" | "text";
  crestLogoSize: number; // 40 - 90
  headerGraphicSize: number; // 40 - 90
  accreditationLogosSize: number; // 36 - 75
  logoBarPaddingY: number; // 4 - 28
  
  // Text Mode Typography (Layout only; colors are in Color Palette)
  headerTitleFont: string;
  headerTitleSize: number; // 16 - 28
  headerSubSize: number; // 9 - 14
  headerTextAlign: "left" | "center" | "right";

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
}

export interface SavedHeaderSetup {
  id: string;
  name: string;
  timestamp: string;
  config: HeaderNavConfig;
}

const DEFAULT_CONFIG: HeaderNavConfig = {
  headerMode: "image_v2",
  crestLogoSize: 64,
  headerGraphicSize: 64,
  accreditationLogosSize: 52,
  logoBarPaddingY: 10,

  headerTitleFont: "var(--font-outfit, sans-serif)",
  headerTitleSize: 21,
  headerSubSize: 11,
  headerTextAlign: "left",

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
  level1SubMaxWidth: "56rem"
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
  const [activeTab, setActiveTab] = useState<"masthead" | "sizes" | "nav" | "level1" | "snapshots">("masthead");
  const [config, setConfig] = useState<HeaderNavConfig>(DEFAULT_CONFIG);
  const [savedSetups, setSavedSetups] = useState<SavedHeaderSetup[]>([]);
  const [newVersionName, setNewVersionName] = useState("");
  const [copied, setCopied] = useState(false);

  // Apply Layout & Sizing Config to DOM & CSS Variables
  const applyConfigToDOM = (cfg: HeaderNavConfig) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Apply Sizing & Spacing CSS Variables
    root.style.setProperty("--crest-logo-size", `${cfg.crestLogoSize}px`);
    root.style.setProperty("--header-graphic-size", `${cfg.headerGraphicSize}px`);
    root.style.setProperty("--accreditation-logos-size", `${cfg.accreditationLogosSize}px`);
    root.style.setProperty("--logo-bar-padding-y", `${cfg.logoBarPaddingY}px`);

    // Typography Variables
    root.style.setProperty("--header-title-font", cfg.headerTitleFont);
    root.style.setProperty("--header-title-size", `${cfg.headerTitleSize}px`);
    root.style.setProperty("--header-sub-size", `${cfg.headerSubSize}px`);
    root.style.setProperty("--header-address-size", `${Math.max(9, cfg.headerSubSize - 0.5)}px`);
    root.style.setProperty("--header-text-align", cfg.headerTextAlign);
    root.style.setProperty(
      "--header-text-align-items",
      cfg.headerTextAlign === "center" ? "center" : cfg.headerTextAlign === "right" ? "flex-end" : "flex-start"
    );

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
            title="Customize Masthead Mode, Logo Dimensions, Typography, Nav & Heading 1 Sizing"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 text-white shadow-xs group-hover:rotate-45 transition-transform duration-300">
              <Ruler className="h-3.5 w-3.5" />
            </span>
            <span className="font-outfit tracking-wide text-white">Layout & Sizing</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
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
            <Ruler className="h-3.5 w-3.5 text-emerald-400" />
            <span>Layout</span>
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
                      Layout &amp; Sizing Studio
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500 text-slate-950 uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-1">
                    Masthead Mode, Logo Dimensions, Top Nav &amp; Heading 1
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

            {/* Navigation Tabs (5 Segmented Tabs including Heading 1) */}
            <div className="grid grid-cols-5 p-1.5 bg-slate-200/90 border-b-2 border-slate-300/80 text-xs font-bold shrink-0 gap-1">
              <button
                onClick={() => setActiveTab("masthead")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "masthead"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Type className="h-3.5 w-3.5" />
                <span className="text-[10px] leading-tight">Masthead</span>
              </button>

              <button
                onClick={() => setActiveTab("sizes")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "sizes"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="text-[10px] leading-tight">Logo Sizes</span>
              </button>

              <button
                onClick={() => setActiveTab("nav")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "nav"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span className="text-[10px] leading-tight">Top Nav</span>
              </button>

              <button
                onClick={() => setActiveTab("level1")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "level1"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <Heading className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[10px] leading-tight">Heading 1</span>
              </button>

              <button
                onClick={() => setActiveTab("snapshots")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "snapshots"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-emerald-500/30 font-black"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/60 font-bold"
                }`}
              >
                <BookmarkPlus className="h-3.5 w-3.5" />
                <span className="text-[10px] leading-tight">Setups ({savedSetups.length})</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 text-left text-slate-800">
              
              {/* ========================================================= */}
              {/* TAB 1: COLLEGE NAME & MASTHEAD (3 MODES TOGGLE)          */}
              {/* ========================================================= */}
              {activeTab === "masthead" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
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
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
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
                    </div>

                    {/* Mode 2: Image Version 2 (6 lines) */}
                    <div
                      onClick={() => updateConfig({ headerMode: "image_v2" })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
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
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-800">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs font-black uppercase tracking-wider">Typography &amp; Sizing Controls:</span>
                      </div>

                      {/* Font Family */}
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
                          onChange={(e) => updateConfig({ headerTitleSize: Number(e.target.value) })}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                          <span>16px</span>
                          <span>Default 21px</span>
                          <span>28px (Extra Large)</span>
                        </div>
                      </div>

                      {/* Subtext Font Size */}
                      <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>Subtext &amp; Address Size:</span>
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
                          onChange={(e) => updateConfig({ headerSubSize: Number(e.target.value) })}
                          className="w-full accent-emerald-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                          <span>9px</span>
                          <span>Default 11px</span>
                          <span>14px</span>
                        </div>
                      </div>

                      {/* Text Alignment Selector */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200">
                        <label className="text-xs font-bold text-slate-700">Text Alignment:</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => updateConfig({ headerTextAlign: "left" })}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              config.headerTextAlign === "left"
                                ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                                : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                            }`}
                          >
                            <AlignLeft className="h-3.5 w-3.5" />
                            <span>Left</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateConfig({ headerTextAlign: "center" })}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              config.headerTextAlign === "center"
                                ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                                : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                            }`}
                          >
                            <AlignCenter className="h-3.5 w-3.5" />
                            <span>Center</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => updateConfig({ headerTextAlign: "right" })}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              config.headerTextAlign === "right"
                                ? "bg-slate-950 text-white shadow-xs font-black ring-2 ring-emerald-500/20"
                                : "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
                            }`}
                          >
                            <AlignRight className="h-3.5 w-3.5" />
                            <span>Right</span>
                          </button>
                        </div>
                      </div>

                      {/* Color Palette Switcher Notice */}
                      <div className="p-3 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-between gap-2 mt-1">
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4 text-purple-600 shrink-0" />
                          <span className="text-[11px] font-bold text-purple-900 leading-tight">
                            Looking to change text colors?
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

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: LOGO & HEADER SIZES                                */}
              {/* ========================================================= */}
              {activeTab === "sizes" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Header Bar Proportions &amp; Logo Dimensions:
                    </span>
                  </div>

                  {/* Slider 1: Top Bar Vertical Padding */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Header Bar Vertical Padding:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.logoBarPaddingY}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="24"
                      value={config.logoBarPaddingY}
                      onChange={(e) => updateConfig({ logoBarPaddingY: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>4px (Ultra-Compact)</span>
                      <span>Default 10px</span>
                      <span>24px (Spacious)</span>
                    </div>
                  </div>

                  {/* Slider 2: Official College Crest Logo Size */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Left College Crest Logo Size:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.crestLogoSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="44"
                      max="88"
                      value={config.crestLogoSize}
                      onChange={(e) => updateConfig({ crestLogoSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>44px</span>
                      <span>Default 64px</span>
                      <span>88px (Large)</span>
                    </div>
                  </div>

                  {/* Slider 3: College Name Graphic / Text Block Size */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>College Name Masthead Size:</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.headerGraphicSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="42"
                      max="85"
                      value={config.headerGraphicSize}
                      onChange={(e) => updateConfig({ headerGraphicSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>42px</span>
                      <span>Default 64px</span>
                      <span>85px (Large)</span>
                    </div>
                  </div>

                  {/* Slider 4: Side Accreditation Logos Size (29+ Years, NAAC, AICTE) */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Side Accreditations (29+ Years, NAAC, AICTE):</span>
                      <span className="font-mono text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-lg font-black text-xs">
                        {config.accreditationLogosSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="36"
                      max="72"
                      value={config.accreditationLogosSize}
                      onChange={(e) => updateConfig({ accreditationLogosSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>36px (Subtle)</span>
                      <span>Default 52px</span>
                      <span>72px (Prominent)</span>
                    </div>
                  </div>

                  {/* Quick Sizing Presets */}
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Quick Proportion Presets:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => updateConfig({
                          logoBarPaddingY: 6,
                          crestLogoSize: 52,
                          headerGraphicSize: 52,
                          accreditationLogosSize: 42
                        })}
                        className="p-2 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 text-[11px] font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
                      >
                        Compact
                      </button>
                      <button
                        onClick={() => updateConfig({
                          logoBarPaddingY: 10,
                          crestLogoSize: 64,
                          headerGraphicSize: 64,
                          accreditationLogosSize: 52
                        })}
                        className="p-2 rounded-xl bg-slate-950 text-white text-[11px] font-black transition-all cursor-pointer shadow-xs ring-2 ring-emerald-500/20"
                      >
                        Standard
                      </button>
                      <button
                        onClick={() => updateConfig({
                          logoBarPaddingY: 16,
                          crestLogoSize: 76,
                          headerGraphicSize: 76,
                          accreditationLogosSize: 62
                        })}
                        className="p-2 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 text-[11px] font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
                      >
                        Grand &amp; Bold
                      </button>
                    </div>
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
