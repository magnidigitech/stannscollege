"use client";

import React, { createContext, useContext } from "react";
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
  return (
    <CustomizationContext.Provider value={defaultContextValue}>
      {children}
    </CustomizationContext.Provider>
  );
}
