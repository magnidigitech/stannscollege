"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  INITIAL_PAGES_CONFIG,
  PageConfig,
  SectionConfig,
  SiteCustomizationData,
} from "@/lib/customizer-schema";

interface CustomizationContextType {
  pages: Record<string, PageConfig>;
  getSectionConfig: (pageId: string, sectionId: string) => SectionConfig | undefined;
  getSectionStyle: (pageId: string, sectionId: string) => React.CSSProperties;
  isSectionVisible: (pageId: string, sectionId: string) => boolean;
  refreshCustomization: () => Promise<void>;
  loaded: boolean;
}

const CustomizationContext = createContext<CustomizationContextType>({
  pages: INITIAL_PAGES_CONFIG,
  getSectionConfig: () => undefined,
  getSectionStyle: () => ({}),
  isSectionVisible: () => true,
  refreshCustomization: async () => {},
  loaded: false,
});

export function useCustomization() {
  return useContext(CustomizationContext);
}

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<Record<string, PageConfig>>(INITIAL_PAGES_CONFIG);
  const [loaded, setLoaded] = useState(false);

  // Injects CSS variables for all configured sections
  const injectCssVariables = (pagesData: Record<string, PageConfig>) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    for (const [pageId, page] of Object.entries(pagesData)) {
      for (const section of page.sections || []) {
        const prefix = `--custom-${pageId}-${section.id}`;
        const c = section.colors;
        const l = section.layout;

        if (c) {
          root.style.setProperty(`${prefix}-bg`, c.isGradient && c.bgGradient ? c.bgGradient : c.bgColor);
          root.style.setProperty(`${prefix}-heading`, c.headingColor);
          root.style.setProperty(`${prefix}-text`, c.textColor);
          root.style.setProperty(`${prefix}-accent`, c.accentColor);
          root.style.setProperty(`${prefix}-card-bg`, c.cardBg);
          root.style.setProperty(`${prefix}-border`, c.borderColor);
          if (c.badgeBg) root.style.setProperty(`${prefix}-badge-bg`, c.badgeBg);
          if (c.badgeTextColor) root.style.setProperty(`${prefix}-badge-text`, c.badgeTextColor);
        }

        if (l) {
          root.style.setProperty(`${prefix}-display`, l.visible ? "block" : "none");
        }

        // Global Header Component Specific Variables
        if (pageId === "announcement-bar" && section.id === "announcement-ticker") {
          if (c) {
            const annBg = c.isGradient && c.bgGradient ? c.bgGradient : (c.announcementBg || c.bgColor);
            root.style.setProperty("--announcement-bg", annBg);
            const annText = c.announcementTextColor || c.textColor;
            root.style.setProperty("--announcement-text", annText);
            root.style.setProperty("--announcement-text-color", annText);
            if (c.badgeBg || c.announcementBadgeBg) root.style.setProperty("--announcement-badge-bg", c.announcementBadgeBg || c.badgeBg!);
            if (c.badgeTextColor || c.announcementBadgeTextColor) root.style.setProperty("--announcement-badge-color", c.announcementBadgeTextColor || c.badgeTextColor!);
            root.style.setProperty("--announcement-border", c.borderColor);
            root.style.setProperty("--announcement-accent", c.accentColor);
          }
          if (l) {
            root.style.setProperty("--announcement-display", l.visible ? "block" : "none");
            if (l.announcementHeight) root.style.setProperty("--announcement-height", `${l.announcementHeight}px`);
            if (l.announcementFontSize) root.style.setProperty("--announcement-font-size", `${l.announcementFontSize}px`);
            if (l.announcementSpeed) root.style.setProperty("--announcement-speed", `${l.announcementSpeed}s`);
          }
        }

        // Logo bar is permanently hardcoded in code (#000080 Navy Blue, hardcoded layout & typography)

        if (pageId === "top-nav" && section.id === "main-navigation") {
          // Fixed Top Nav Bar Background
          root.style.setProperty("--topnav-bg", "#007c74");
          if (c) {
            root.style.setProperty("--topnav-border", c.borderColor || "#00625c");
            const navLinkColor = c.topNavLinkColor || c.textColor || "#ffffff";
            root.style.setProperty("--topnav-link-color", navLinkColor);
            root.style.setProperty("--topnav-accent", c.accentColor || "#38bdf8");
            if (c.topNavRow2Color) root.style.setProperty("--topnav-row2-color", c.topNavRow2Color);
          }
          if (l) {
            root.style.setProperty("--topnav-display", l.visible ? "block" : "none");
            // Top navigation typography is hardcoded into code (20px bold) - customizer font properties removed
            root.style.removeProperty("--topnav-font-family");
            root.style.removeProperty("--topnav-font-size");
            root.style.removeProperty("--topnav-font-weight");
            if (l.topnavSpacing) root.style.setProperty("--topnav-spacing", `${l.topnavSpacing}px`);
            const resolvedPaddingY = (l.topnavPaddingY && l.topnavPaddingY <= 6) ? l.topnavPaddingY : 4;
            root.style.setProperty("--topnav-padding-y", `${resolvedPaddingY}px`);
          }
        }
      }
    }
  };

  const fetchCustomization = async () => {
    try {
      const res = await fetch("/api/admin/customizer", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.data?.pages) {
        setPages(data.data.pages);
        injectCssVariables(data.data.pages);
        try {
          localStorage.setItem("stanns_customization_cache", JSON.stringify(data.data.pages));
        } catch {
          // Ignore storage quota
        }
      }
    } catch (err) {
      console.warn("CustomizationProvider fetch error:", err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    try {
      const cached = localStorage.getItem("stanns_customization_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object") {
          setPages(parsed);
          injectCssVariables(parsed);
        }
      }
    } catch {
      // Ignore
    }
    fetchCustomization();
  }, []);

  const getSectionConfig = (pageId: string, sectionId: string): SectionConfig | undefined => {
    const page = pages[pageId];
    if (!page) return undefined;
    return page.sections.find((s) => s.id === sectionId);
  };

  const isSectionVisible = (pageId: string, sectionId: string): boolean => {
    const sec = getSectionConfig(pageId, sectionId);
    return sec ? sec.layout.visible : true;
  };

  const getSectionStyle = (pageId: string, sectionId: string): React.CSSProperties => {
    const sec = getSectionConfig(pageId, sectionId);
    if (!sec) return {};

    const c = sec.colors;
    return {
      backgroundColor: !c.isGradient ? c.bgColor : undefined,
      backgroundImage: c.isGradient ? c.bgGradient : undefined,
      color: c.textColor,
      borderColor: c.borderColor,
    };
  };

  return (
    <CustomizationContext.Provider
      value={{
        pages,
        getSectionConfig,
        getSectionStyle,
        isSectionVisible,
        refreshCustomization: fetchCustomization,
        loaded,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}
