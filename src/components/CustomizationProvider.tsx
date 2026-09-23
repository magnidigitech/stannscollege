"use client";

import React, { createContext, useContext, useEffect } from "react";
import {
  INITIAL_PAGES_CONFIG,
  PageConfig,
  SectionConfig,
} from "@/lib/customizer-schema";

interface CustomizationContextType {
  pages: Record<string, PageConfig>;
  getSectionConfig: (pageId: string, sectionId: string) => SectionConfig | undefined;
  getSectionStyle: (pageId: string, sectionId: string) => React.CSSProperties;
  isSectionVisible: (pageId: string, sectionId: string) => boolean;
  refreshCustomization: () => Promise<void>;
  loaded: boolean;
}

const defaultContextValue: CustomizationContextType = {
  pages: INITIAL_PAGES_CONFIG,
  getSectionConfig: (pageId: string, sectionId: string) =>
    INITIAL_PAGES_CONFIG[pageId]?.sections?.find((s) => s.id === sectionId),
  getSectionStyle: () => ({}),
  isSectionVisible: () => true,
  refreshCustomization: async () => {},
  loaded: true,
};

const CustomizationContext = createContext<CustomizationContextType>(defaultContextValue);

export function useCustomization() {
  return useContext(CustomizationContext);
}

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Logo bar background cache preload
    try {
      const c = localStorage.getItem("stanns_customization_cache");
      if (c) {
        const p = JSON.parse(c);
        const lb = p["logo-bar"] && p["logo-bar"].sections && p["logo-bar"].sections[0];
        if (lb && lb.colors) {
          const bg = lb.colors.logoBarColor || (lb.colors.bgColor !== "#ffffff" ? lb.colors.bgColor : null);
          if (bg) document.documentElement.style.setProperty("--logo-bar-bg", bg);
        }
      }
    } catch (e) {}

    // 2. CSS Chunk error recovery
    const errorHandler = (e: ErrorEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "LINK" && (target as HTMLLinkElement).rel === "stylesheet") {
        const href = (target as HTMLLinkElement).href;
        if (href && !href.includes("_cb=")) {
          const separator = href.includes("?") ? "&" : "?";
          const newLink = document.createElement("link");
          newLink.rel = "stylesheet";
          newLink.href = href + separator + "_cb=" + Date.now();
          document.head.appendChild(newLink);
        }
      }
      if (e.message && (e.message.indexOf("Loading CSS chunk") !== -1 || e.message.indexOf("ChunkLoadError") !== -1)) {
        const reloadKey = "_css_reload_ts";
        const lastReload = sessionStorage.getItem(reloadKey);
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          sessionStorage.setItem(reloadKey, now.toString());
          window.location.reload();
        }
      }
    };

    const unhandledRejectionHandler = (e: PromiseRejectionEvent) => {
      const reason = e.reason ? (e.reason.message || e.reason.toString()) : "";
      if (reason && (reason.indexOf("Loading CSS chunk") !== -1 || reason.indexOf("ChunkLoadError") !== -1)) {
        const reloadKey = "_css_reload_ts";
        const lastReload = sessionStorage.getItem(reloadKey);
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          sessionStorage.setItem(reloadKey, now.toString());
          window.location.reload();
        }
      }
    };

    window.addEventListener("error", errorHandler, true);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler, true);
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
    };
  }, []);

  return (
    <CustomizationContext.Provider value={defaultContextValue}>
      {children}
    </CustomizationContext.Provider>
  );
}
