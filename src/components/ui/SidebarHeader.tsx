"use client";

import React from "react";

export interface SidebarHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

/**
 * Sidebar heading — two layouts toggled via CSS variable `--sidebar-header-style`:
 *   "badge"     ? rounded colored badge inside the sidebar (default)
 *   "fullwidth" ? full-width banner attached to the top of the sidebar, edge-to-edge
 *
 * The sidebar container should have the class `sidebar-header-host`.
 */
export function SidebarHeader({ title, subtitle, icon }: SidebarHeaderProps) {
  return (
    <>
      {/* BADGE layout */}
      <div
        className="sidebar-header-badge text-white px-4 py-3.5 rounded-2xl flex items-center gap-3 shadow-sm border transition-colors duration-200 shrink-0"
        style={{
          background: "var(--sidebar-bg, #1e40af)",
          borderColor: "var(--sidebar-border, rgba(30, 64, 175, 0.3))",
          color: "var(--sidebar-text, #ffffff)"
        }}
      >
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white shrink-0 backdrop-blur-xs">
            {icon}
          </span>
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-outfit text-xs font-black uppercase tracking-wider truncate" style={{ color: "var(--sidebar-text, #ffffff)" }}>
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] opacity-85 font-medium truncate" style={{ color: "var(--sidebar-text, #ffffff)" }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* FULLWIDTH layout */}
      <div
        className="sidebar-header-fullwidth text-white flex items-center gap-3 transition-colors duration-200 shrink-0 px-5 py-4"
        style={{
          background: "var(--sidebar-bg, #1e40af)",
          color: "var(--sidebar-text, #ffffff)"
        }}
      >
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white shrink-0">
            {icon}
          </span>
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-outfit text-xs font-black uppercase tracking-wider truncate" style={{ color: "var(--sidebar-text, #ffffff)" }}>
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] opacity-85 font-medium truncate" style={{ color: "var(--sidebar-text, #ffffff)" }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <style>{`
        .sidebar-header-badge     { display: flex; }
        .sidebar-header-fullwidth { display: none; }

        :root[style*="--sidebar-header-style: fullwidth"] .sidebar-header-badge     { display: none !important; }
        :root[style*="--sidebar-header-style: fullwidth"] .sidebar-header-fullwidth { display: flex !important; }

        :root[style*="--sidebar-header-style: fullwidth"] .sidebar-header-host {
          padding-top: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        :root[style*="--sidebar-header-style: fullwidth"] .sidebar-header-host .sidebar-inner-content {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
    </>
  );
}
