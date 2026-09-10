"use client";

import React, { useState, useEffect } from "react";
import { Bell, Phone, Sparkles } from "lucide-react";

export interface AnnouncementConfig {
  announcementVisible?: boolean;
  announcementBadgeText?: string;
  announcementBlinkStyle?: "blink" | "rapid" | "glow" | "solid";
  announcementBadgeBg?: string;
  announcementBadgeTextColor?: string;
  announcementBg?: string;
  announcementTextColor?: string;
  announcementHeight?: number;
  announcementFontSize?: number;
  announcementSpeed?: number;
  announcementShowContact?: boolean;
  announcementPhone1?: string;
  announcementPhone2?: string;
  announcementCustomText?: string;
}

const DEFAULT_ANNOUNCEMENT_CONFIG: AnnouncementConfig = {
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
  announcementCustomText: ""
};

export function AnnouncementBar() {
  const [config, setConfig] = useState<AnnouncementConfig>(DEFAULT_ANNOUNCEMENT_CONFIG);

  // Sync from localStorage and listen to real-time customizer events
  useEffect(() => {
    try {
      const stored = localStorage.getItem("header_nav_customizer_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfig((prev) => ({
          ...prev,
          announcementVisible: parsed.announcementVisible ?? prev.announcementVisible,
          announcementBadgeText: parsed.announcementBadgeText || prev.announcementBadgeText,
          announcementBlinkStyle: parsed.announcementBlinkStyle || prev.announcementBlinkStyle,
          announcementBadgeBg: parsed.announcementBadgeBg || prev.announcementBadgeBg,
          announcementBadgeTextColor: parsed.announcementBadgeTextColor || prev.announcementBadgeTextColor,
          announcementBg: parsed.announcementBg || prev.announcementBg,
          announcementTextColor: parsed.announcementTextColor || prev.announcementTextColor,
          announcementHeight: parsed.announcementHeight ?? prev.announcementHeight,
          announcementFontSize: parsed.announcementFontSize ?? prev.announcementFontSize,
          announcementSpeed: parsed.announcementSpeed ?? prev.announcementSpeed,
          announcementShowContact: parsed.announcementShowContact ?? prev.announcementShowContact,
          announcementPhone1: parsed.announcementPhone1 || prev.announcementPhone1,
          announcementPhone2: parsed.announcementPhone2 || prev.announcementPhone2,
          announcementCustomText: parsed.announcementCustomText || prev.announcementCustomText
        }));
      }
    } catch {
      // Ignore storage errors
    }

    const handleCustomizerUpdate = (e: any) => {
      if (!e.detail) return;
      const d = e.detail;
      setConfig((prev) => ({
        ...prev,
        announcementVisible: d.announcementVisible !== undefined ? d.announcementVisible : prev.announcementVisible,
        announcementBadgeText: d.announcementBadgeText !== undefined ? d.announcementBadgeText : prev.announcementBadgeText,
        announcementBlinkStyle: d.announcementBlinkStyle !== undefined ? d.announcementBlinkStyle : prev.announcementBlinkStyle,
        announcementBadgeBg: d.announcementBadgeBg !== undefined ? d.announcementBadgeBg : prev.announcementBadgeBg,
        announcementBadgeTextColor: d.announcementBadgeTextColor !== undefined ? d.announcementBadgeTextColor : prev.announcementBadgeTextColor,
        announcementBg: d.announcementBg !== undefined ? d.announcementBg : prev.announcementBg,
        announcementTextColor: d.announcementTextColor !== undefined ? d.announcementTextColor : prev.announcementTextColor,
        announcementHeight: d.announcementHeight !== undefined ? d.announcementHeight : prev.announcementHeight,
        announcementFontSize: d.announcementFontSize !== undefined ? d.announcementFontSize : prev.announcementFontSize,
        announcementSpeed: d.announcementSpeed !== undefined ? d.announcementSpeed : prev.announcementSpeed,
        announcementShowContact: d.announcementShowContact !== undefined ? d.announcementShowContact : prev.announcementShowContact,
        announcementPhone1: d.announcementPhone1 !== undefined ? d.announcementPhone1 : prev.announcementPhone1,
        announcementPhone2: d.announcementPhone2 !== undefined ? d.announcementPhone2 : prev.announcementPhone2,
        announcementCustomText: d.announcementCustomText !== undefined ? d.announcementCustomText : prev.announcementCustomText
      }));
    };

    window.addEventListener("headerCustomizerUpdate", handleCustomizerUpdate as EventListener);
    return () => {
      window.removeEventListener("headerCustomizerUpdate", handleCustomizerUpdate as EventListener);
    };
  }, []);

  // If explicitly hidden via customizer
  if (config.announcementVisible === false) {
    return null;
  }

  // Animation class based on chosen blinking style
  const getBadgeAnimationClass = () => {
    switch (config.announcementBlinkStyle) {
      case "rapid":
        return "animate-announcement-badge-rapid ring-2 ring-red-400/80 shadow-lg shadow-red-500/30";
      case "glow":
        return "animate-announcement-badge-pulse-glow ring-2 ring-blue-400/70 shadow-lg shadow-blue-500/30";
      case "solid":
        return "ring-1 ring-white/30 shadow-xs";
      case "blink":
      default:
        return "animate-announcement-badge-blink ring-2 ring-red-400/80 shadow-lg shadow-red-500/35";
    }
  };

  const customText = config.announcementCustomText?.trim();

  return (
    <div
      id="top-announcement-bar"
      className="w-full border-b overflow-hidden select-none transition-colors duration-200 z-40 relative"
      style={{
        backgroundColor: config.announcementBg || "var(--announcement-bg, #020617)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        height: `${config.announcementHeight || 40}px`
      }}
    >
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-12 w-full h-full flex items-center justify-between text-xs font-semibold gap-3 sm:gap-6">
        
        {/* Left: Live Scrolling Announcement Ticker */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-hidden h-full">
          
          {/* Eye-catching Blinking / Glowing 'ANNOUNCEMENTS' Button-like Box */}
          <div
            id="announcements-badge-box"
            className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3 py-1 font-extrabold tracking-wider uppercase text-[10px] sm:text-[11px] shrink-0 z-10 transition-all cursor-pointer select-none ${getBadgeAnimationClass()}`}
            style={{
              backgroundColor: config.announcementBadgeBg || "var(--announcement-badge-bg, #dc2626)",
              color: config.announcementBadgeTextColor || "var(--announcement-badge-color, #ffffff)"
            }}
            title="Click to view latest announcements & updates"
          >
            {/* Pulsing Radar Beacon Dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>

            {/* Icon */}
            <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-bounce shrink-0" />

            {/* Badge Text */}
            <span className="font-outfit tracking-wide drop-shadow-xs font-black">
              {config.announcementBadgeText || "ANNOUNCEMENTS"}
            </span>
          </div>

          {/* Marquee Track with Pause on Hover */}
          <div
            className="relative flex-1 overflow-hidden h-full flex items-center group cursor-pointer"
            title="Hover to pause announcement ticker"
          >
            <div
              className="animate-announcement-marquee flex items-center font-medium"
              style={{
                animationDuration: `${config.announcementSpeed || 32}s`,
                color: config.announcementTextColor || "var(--announcement-text-color, #e2e8f0)",
                fontSize: `${config.announcementFontSize || 12}px`
              }}
            >
              {/* Content Block 1 */}
              <div className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0">
                {customText && (
                  <>
                    <span className="tracking-wide font-bold text-amber-300 inline-flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      {customText}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                  </>
                )}
                <span className="tracking-wide">
                  Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="tracking-wide opacity-90">
                  Accredited by NAAC with &apos;A&apos; Grade in the first cycle
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="tracking-wide opacity-90">
                  Celebrating 29+ Years of Academic Excellence (1997 - 2026)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              </div>

              {/* Duplicate Content Block 2 for Seamless Infinite Loop */}
              <div
                className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0"
                aria-hidden="true"
              >
                {customText && (
                  <>
                    <span className="tracking-wide font-bold text-amber-300 inline-flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      {customText}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                  </>
                )}
                <span className="tracking-wide">
                  Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="tracking-wide opacity-90">
                  Accredited by NAAC with &apos;A&apos; Grade in the first cycle
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="tracking-wide opacity-90">
                  Celebrating 29+ Years of Academic Excellence (1997 - 2026)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clickable Phone Numbers (Optional) */}
        {config.announcementShowContact !== false && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 shrink-0 text-[11px] sm:text-xs">
            <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0 animate-pulse" />
            <span className="text-slate-400 font-medium hidden md:inline">Call Us:</span>
            <a
              href={`tel:${(config.announcementPhone1 || "08632236470").replace(/[^0-9]/g, "")}`}
              className="text-slate-200 hover:text-amber-400 font-semibold transition-colors hover:underline tracking-tight"
              title={`Click to call ${config.announcementPhone1 || "0863-2236470"}`}
            >
              {config.announcementPhone1 || "0863-2236470"}
            </a>
            <span className="text-slate-600 font-normal">|</span>
            <a
              href={`tel:${(config.announcementPhone2 || "7382104655").replace(/[^0-9]/g, "")}`}
              className="text-slate-200 hover:text-amber-400 font-semibold transition-colors hover:underline tracking-tight"
              title={`Click to call ${config.announcementPhone2 || "7382104655"}`}
            >
              {config.announcementPhone2 || "7382104655"}
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default AnnouncementBar;
