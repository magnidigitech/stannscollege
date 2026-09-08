"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders, SlidersHorizontal, Image, Type, Maximize2, Compass,
  RotateCcw, Check, Copy, X, BookmarkPlus, Trash2, CheckCircle2,
  Sparkles, Layers, ArrowRight, Eye, Palette,
  AlignLeft, AlignCenter, AlignRight
} from "lucide-react";

export interface HeaderNavConfig {
  headerMode: "image_v1" | "image_v2" | "text";
  crestLogoSize: number; // 40 - 90
  headerGraphicSize: number; // 40 - 90
  accreditationLogosSize: number; // 36 - 75
  logoBarPaddingY: number; // 4 - 28
  
  // Text Mode Typography
  headerTitleFont: string;
  headerTitleSize: number; // 16 - 28
  headerSubSize: number; // 9 - 14
  headerTitleColor: string;
  headerSubColor: string;
  headerAccentColor: string;
  headerTextAlign: "left" | "center" | "right";

  // Top Nav Bar Controls
  topnavFontFamily: string;
  topnavFontSize: number; // 11 - 16
  topnavFontWeight: string; // 500, 600, 700, 800
  topnavSpacing: number; // 8 - 36 (px)
  topnavLinkColor: string;
  topnavPaddingY: number; // 4 - 18
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
  headerTitleColor: "#002b49",
  headerSubColor: "#1e3a8a",
  headerAccentColor: "#991b1b",
  headerTextAlign: "left",

  topnavFontFamily: "var(--font-inter, sans-serif)",
  topnavFontSize: 13,
  topnavFontWeight: "700",
  topnavSpacing: 20,
  topnavLinkColor: "#ffffff",
  topnavPaddingY: 12
};

const FONT_OPTIONS = [
  { label: "Inter (Modern Sans)", value: "var(--font-inter, sans-serif)" },
  { label: "Outfit (Academic Sans)", value: "var(--font-outfit, sans-serif)" },
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

const NAV_COLOR_SWATCHES = [
  { label: "Pure White", value: "#ffffff" },
  { label: "Ice Blue", value: "#e0f2fe" },
  { label: "Warm Gold", value: "#fef08a" },
  { label: "Amber Sun", value: "#fde68a" },
  { label: "Silver Slate", value: "#cbd5e1" },
  { label: "Soft Mint", value: "#ccfbf1" },
  { label: "Rose Pearl", value: "#ffe4e6" }
];

export function HeaderNavCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"masthead" | "sizes" | "nav" | "snapshots">("masthead");
  const [config, setConfig] = useState<HeaderNavConfig>(DEFAULT_CONFIG);
  const [savedSetups, setSavedSetups] = useState<SavedHeaderSetup[]>([]);
  const [newVersionName, setNewVersionName] = useState("");
  const [copied, setCopied] = useState(false);

  // Apply Config to DOM & CSS Variables
  const applyConfigToDOM = (cfg: HeaderNavConfig) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Apply CSS Variables
    root.style.setProperty("--crest-logo-size", `${cfg.crestLogoSize}px`);
    root.style.setProperty("--header-graphic-size", `${cfg.headerGraphicSize}px`);
    root.style.setProperty("--accreditation-logos-size", `${cfg.accreditationLogosSize}px`);
    root.style.setProperty("--logo-bar-padding-y", `${cfg.logoBarPaddingY}px`);

    root.style.setProperty("--header-title-font", cfg.headerTitleFont);
    root.style.setProperty("--header-title-size", `${cfg.headerTitleSize}px`);
    root.style.setProperty("--header-sub-size", `${cfg.headerSubSize}px`);
    root.style.setProperty("--header-address-size", `${Math.max(9, cfg.headerSubSize - 0.5)}px`);
    root.style.setProperty("--header-title-color", cfg.headerTitleColor);
    root.style.setProperty("--header-sub-color", cfg.headerSubColor);
    root.style.setProperty("--header-accent-color", cfg.headerAccentColor);
    root.style.setProperty("--header-text-align", cfg.headerTextAlign);
    root.style.setProperty(
      "--header-text-align-items",
      cfg.headerTextAlign === "center" ? "center" : cfg.headerTextAlign === "right" ? "flex-end" : "flex-start"
    );

    root.style.setProperty("--topnav-font-family", cfg.topnavFontFamily);
    root.style.setProperty("--topnav-font-size", `${cfg.topnavFontSize}px`);
    root.style.setProperty("--topnav-font-weight", cfg.topnavFontWeight);
    root.style.setProperty("--topnav-spacing", `${cfg.topnavSpacing}px`);
    root.style.setProperty("--topnav-link-color", cfg.topnavLinkColor);
    root.style.setProperty("--topnav-padding-y", `${cfg.topnavPaddingY}px`);

    // Set Data Attribute & Store in localStorage
    root.setAttribute("data-header-mode", cfg.headerMode);
    try {
      localStorage.setItem("header_display_mode", cfg.headerMode);
      localStorage.setItem("header_nav_customizer_config", JSON.stringify(cfg));
    } catch (e) {
      // Ignore storage errors
    }

    // Dispatch global event asynchronously to avoid updating other components during render
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

  // Initial Load from localStorage
  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem("header_nav_customizer_config");
      const storedMode = localStorage.getItem("header_display_mode");
      if (storedConfig) {
        const parsed = JSON.parse(storedConfig);
        if (storedMode) parsed.headerMode = storedMode;
        setConfig(parsed);
      }

      const storedSetups = localStorage.getItem("header_nav_saved_setups");
      if (storedSetups) {
        setSavedSetups(JSON.parse(storedSetups));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Reactively apply DOM and CSS changes whenever config changes
  useEffect(() => {
    applyConfigToDOM(config);
  }, [config]);

  // Update helper
  const updateConfig = (patch: Partial<HeaderNavConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleSaveSetup = () => {
    const name = newVersionName.trim() || `Setup ${savedSetups.length + 1} (${config.headerMode.toUpperCase()})`;
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
      {/* Floating Trigger Button beside Color Palette */}
      {!isOpen && (
        <div className="fixed bottom-6 right-56 z-50 select-none animate-fadeIn hidden sm:block">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 text-white font-bold text-xs shadow-2xl hover:bg-slate-900 border-2 border-emerald-400/60 hover:border-emerald-400 transition-all active:scale-95 group hover:-translate-y-0.5 hover:shadow-emerald-500/25 cursor-pointer"
            title="Customize Header Masthead, Logo Sizes, Top Nav Font & Spacing"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 text-white shadow-xs group-hover:rotate-45 transition-transform duration-300">
              <Sliders className="h-3.5 w-3.5" />
            </span>
            <span className="font-outfit tracking-wide">Header & Nav</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      )}

      {/* Floating Trigger Button for Mobile (Stacked above bottom-right) */}
      {!isOpen && (
        <div className="fixed bottom-22 right-6 z-50 select-none animate-fadeIn sm:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs shadow-2xl border-2 border-emerald-400/60 transition-all active:scale-95 cursor-pointer"
          >
            <Sliders className="h-3.5 w-3.5 text-emerald-400" />
            <span>Header</span>
          </button>
        </div>
      )}

      {/* Slide-over Drawer / Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-xs select-none animate-fadeIn">
          <div
            className="w-full max-w-[490px] h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Panel Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400">
                  <SlidersHorizontal className="h-4 w-4" />
                </span>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-outfit font-black text-sm sm:text-base tracking-tight leading-none text-white">
                      Header & Navigation Studio
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    Toggle College Masthead, fine-tune sizes & Top Nav
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-4 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold shrink-0">
              <button
                onClick={() => setActiveTab("masthead")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "masthead"
                    ? "bg-white text-emerald-700 shadow-xs border border-slate-200 font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Type className="h-3.5 w-3.5" />
                <span className="text-[10.5px] leading-tight">College Name</span>
              </button>

              <button
                onClick={() => setActiveTab("sizes")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "sizes"
                    ? "bg-white text-emerald-700 shadow-xs border border-slate-200 font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="text-[10.5px] leading-tight">Logo Sizes</span>
              </button>

              <button
                onClick={() => setActiveTab("nav")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "nav"
                    ? "bg-white text-emerald-700 shadow-xs border border-slate-200 font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span className="text-[10.5px] leading-tight">Top Nav</span>
              </button>

              <button
                onClick={() => setActiveTab("snapshots")}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "snapshots"
                    ? "bg-white text-emerald-700 shadow-xs border border-slate-200 font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookmarkPlus className="h-3.5 w-3.5" />
                <span className="text-[10.5px] leading-tight">Setups ({savedSetups.length})</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-5 text-left text-slate-800">
              
              {/* ========================================================= */}
              {/* TAB 1: COLLEGE NAME & MASTHEAD (3 MODES TOGGLE)          */}
              {/* ========================================================= */}
              {activeTab === "masthead" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      College Name Display Mode (Client Toggle):
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      3 Options Ready
                    </span>
                  </div>

                  {/* Mode Selector Cards */}
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Mode 1: Image Version 1 (4 lines) */}
                    <div
                      onClick={() => updateConfig({ headerMode: "image_v1" })}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${
                        config.headerMode === "image_v1"
                          ? "bg-emerald-50/60 border-emerald-500 shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                            config.headerMode === "image_v1" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            <Image className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-black text-slate-800">
                            Option 1: Image Version 1 (Original 4-Line)
                          </span>
                        </div>
                        {config.headerMode === "image_v1" && (
                          <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium pl-8">
                        Features original letterhead graphic: College Name, Society, ANU Affiliation / AICTE, UGC 2(f).
                      </p>
                    </div>

                    {/* Mode 2: Image Version 2 (6 lines) */}
                    <div
                      onClick={() => updateConfig({ headerMode: "image_v2" })}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${
                        config.headerMode === "image_v2"
                          ? "bg-emerald-50/60 border-emerald-500 shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                            config.headerMode === "image_v2" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            <Image className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-black text-slate-800">
                            Option 2: Image Version 2 (Updated 6-Line with Address)
                          </span>
                        </div>
                        {config.headerMode === "image_v2" && (
                          <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium pl-8">
                        Features updated letterhead graphic with NAAC &apos;A&apos; Grade (1st Cycle) and Amaravathi Road, Gorantla address.
                      </p>
                    </div>

                    {/* Mode 3: Pure HTML Typography Text Mode */}
                    <div
                      onClick={() => updateConfig({ headerMode: "text" })}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${
                        config.headerMode === "text"
                          ? "bg-emerald-50/60 border-emerald-500 shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                            config.headerMode === "text" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            <Type className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-black text-slate-800">
                            Option 3: Live HTML Typography Text (Not Image)
                          </span>
                        </div>
                        {config.headerMode === "text" && (
                          <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium pl-8">
                        Renders pure vector text with customizable fonts, sizes, colors, and live real-time alignment.
                      </p>
                    </div>

                  </div>

                  {/* Text Mode Detailed Controls (Only when in Text Mode) */}
                  {config.headerMode === "text" && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4 animate-fadeIn">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-700">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-xs font-extrabold">Text Mode Customization Controls:</span>
                      </div>

                      {/* Font Family */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700">Title Font Family:</label>
                        <select
                          value={config.headerTitleFont}
                          onChange={(e) => updateConfig({ headerTitleFont: e.target.value })}
                          className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-medium"
                        >
                          {FONT_OPTIONS.map((f, i) => (
                            <option key={i} value={f.value}>{f.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Title Font Size */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>College Name Size:</span>
                          <span className="font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
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
                      </div>

                      {/* Subtext Font Size */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Subtext & Address Size:</span>
                          <span className="font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
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
                      </div>

                      {/* Colors for Text Mode */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Title Color:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={config.headerTitleColor}
                              onChange={(e) => updateConfig({ headerTitleColor: e.target.value })}
                              className="h-8 w-10 p-0 border border-slate-300 rounded cursor-pointer"
                            />
                            <span className="font-mono text-xs text-slate-700 font-bold">{config.headerTitleColor}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Affiliations Accent:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={config.headerAccentColor}
                              onChange={(e) => updateConfig({ headerAccentColor: e.target.value })}
                              className="h-8 w-10 p-0 border border-slate-300 rounded cursor-pointer"
                            />
                            <span className="font-mono text-xs text-slate-700 font-bold">{config.headerAccentColor}</span>
                          </div>
                        </div>
                      </div>

                      {/* Text Alignment Selector */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200/80">
                        <label className="text-xs font-bold text-slate-700">Text Alignment:</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => updateConfig({ headerTextAlign: "left" })}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              config.headerTextAlign === "left"
                                ? "bg-emerald-700 text-white shadow-xs font-black"
                                : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 font-medium"
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
                                ? "bg-emerald-700 text-white shadow-xs font-black"
                                : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 font-medium"
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
                                ? "bg-emerald-700 text-white shadow-xs font-black"
                                : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 font-medium"
                            }`}
                          >
                            <AlignRight className="h-3.5 w-3.5" />
                            <span>Right</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: LOGO SIZES & BAR HEIGHT                            */}
              {/* ========================================================= */}
              {activeTab === "sizes" && (
                <div className="flex flex-col gap-5 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Sizing Controls for Logo Images & Header Bar:
                    </span>
                  </div>

                  {/* Slider 1: Top Logo Bar Vertical Height / Padding */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Top Logo Bar Height / Padding:</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
                        {config.logoBarPaddingY}px padding (~{config.logoBarPaddingY * 2 + config.headerGraphicSize}px bar)
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
                      <span>Compact (4px)</span>
                      <span>Balanced (10px)</span>
                      <span>Tall & Spacious (24px)</span>
                    </div>
                  </div>

                  {/* Slider 2: Official Crest Logo Size */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Official College Crest Logo Size:</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
                        {config.crestLogoSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="42"
                      max="85"
                      value={config.crestLogoSize}
                      onChange={(e) => updateConfig({ crestLogoSize: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>42px</span>
                      <span>Default 64px</span>
                      <span>85px (Large)</span>
                    </div>
                  </div>

                  {/* Slider 3: College Name Graphic / Text Block Size */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>College Name Masthead Size:</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
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
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Side Accreditations (29+ Years, NAAC, AICTE):</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
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
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
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
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 transition-all cursor-pointer"
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
                        className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-[11px] font-black text-emerald-800 transition-all cursor-pointer"
                      >
                        Standard (Default)
                      </button>
                      <button
                        onClick={() => updateConfig({
                          logoBarPaddingY: 16,
                          crestLogoSize: 76,
                          headerGraphicSize: 76,
                          accreditationLogosSize: 62
                        })}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 transition-all cursor-pointer"
                      >
                        Grand & Bold
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 3: TOP NAVIGATION BAR STYLING                         */}
              {/* ========================================================= */}
              {activeTab === "nav" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Top Navigation Font, Size, Color & Spacing:
                    </span>
                  </div>

                  {/* 1. Font Family */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Navigation Font Family:</label>
                    <select
                      value={config.topnavFontFamily}
                      onChange={(e) => updateConfig({ topnavFontFamily: e.target.value })}
                      className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-medium cursor-pointer"
                    >
                      {FONT_OPTIONS.map((f, i) => (
                        <option key={i} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Font Size Slider */}
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Menu Links Font Size:</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
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
                          className={`py-1.5 px-2 rounded-xl text-[11px] transition-all cursor-pointer ${
                            config.topnavFontWeight === w.value
                              ? "bg-slate-900 text-white font-black shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium"
                          }`}
                        >
                          {w.label.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Text Color & Swatches */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Menu Links Text Color:</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-4 w-4 rounded-full border border-slate-300 shadow-2xs"
                          style={{ backgroundColor: config.topnavLinkColor }}
                        />
                        <span className="font-mono text-xs text-slate-700 font-black">{config.topnavLinkColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      {NAV_COLOR_SWATCHES.map((swatch, i) => (
                        <button
                          key={i}
                          onClick={() => updateConfig({ topnavLinkColor: swatch.value })}
                          className={`h-7 w-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                            config.topnavLinkColor.toLowerCase() === swatch.value.toLowerCase()
                              ? "border-emerald-600 scale-110 shadow-xs"
                              : "border-slate-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: swatch.value }}
                          title={swatch.label}
                        >
                          {config.topnavLinkColor.toLowerCase() === swatch.value.toLowerCase() && (
                            <Check className="h-3 w-3 text-slate-900" />
                          )}
                        </button>
                      ))}

                      {/* Custom Color Input */}
                      <input
                        type="color"
                        value={config.topnavLinkColor}
                        onChange={(e) => updateConfig({ topnavLinkColor: e.target.value })}
                        className="h-7 w-8 p-0 border border-slate-300 rounded cursor-pointer ml-1"
                        title="Pick Custom Color"
                      />
                    </div>
                  </div>

                  {/* 5. Menu Items Horizontal Spacing */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Menu Item Spacing (Horizontal Gap):</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
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

                  {/* 6. Navigation Bar Row Height */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Nav Row Vertical Padding:</span>
                      <span className="font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-black">
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

                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 4: SAVED SETUPS (CLIENT PRESENTATION SNAPSHOTS)       */}
              {/* ========================================================= */}
              {activeTab === "snapshots" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Save & Switch Client Presentations Instantly:
                    </span>
                  </div>

                  {/* Save Current Snapshot */}
                  <div className="flex items-center gap-2 p-2 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <input
                      type="text"
                      placeholder="e.g. Option A - Text Mode (Large)"
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold"
                    />
                    <button
                      onClick={handleSaveSetup}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <BookmarkPlus className="h-3.5 w-3.5" />
                      <span>Save Setup</span>
                    </button>
                  </div>

                  {/* List of Saved Setups */}
                  {savedSetups.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 flex flex-col items-center gap-2">
                      <Layers className="h-8 w-8 text-slate-300" />
                      <p className="text-xs font-semibold">No saved setups yet.</p>
                      <p className="text-[11px]">Click &ldquo;Save Setup&rdquo; above to bookmark your active configuration for client review.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {savedSetups.map((setup) => (
                        <div
                          key={setup.id}
                          onClick={() => handleApplySavedSetup(setup)}
                          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                                {setup.config.headerMode === "text" ? "T" : "IMG"}
                              </span>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-extrabold text-slate-800">{setup.name}</span>
                                <span className="text-[10px] text-slate-400">Saved at {setup.timestamp}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => handleDeleteSavedSetup(setup.id, e)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                title="Delete this setup"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                            <span>Mode: {setup.config.headerMode.toUpperCase()} | Crest: {setup.config.crestLogoSize}px</span>
                            <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                              Apply Now →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Panel Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Defaults
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJSON}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                  title="Copy Configuration JSON"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Config"}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-all active:scale-95 cursor-pointer"
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
