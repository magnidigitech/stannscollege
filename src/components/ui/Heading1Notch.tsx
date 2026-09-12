import React from "react";
import { Quote } from "lucide-react";

export interface Heading1NotchProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Heading 1 — two layouts toggled via CSS variable `--heading1-style`:
 *   "notch"     → rounded pill hanging below the nav bar (default)
 *   "fullwidth" → full-width edge-to-edge banner, flush with nav, no side gaps
 */
export function Heading1Notch({ title, className = "", children }: Heading1NotchProps) {
  // Completely removed notch pill hanging below top nav
  return null;
}


export interface SubtextBoxProps {
  subtext?: string | null;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Data Section (Sub-text Box) with prominent Quote watermark.
 * Directly styled to match the reference implementation in Strategic Plans & Future Directions.
 */
export function SubtextBox({ subtext, className = "", children }: SubtextBoxProps) {
  const content = children ?? subtext;
  if (!content || (typeof content === "string" && !content.trim())) return null;

  return (
    <div
      className={`relative overflow-hidden border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors duration-200 ${className}`}
      style={{ backgroundColor: "var(--subtext-bg, #ffffff)" }}
    >
      <Quote className="absolute right-6 top-6 h-12 w-12 text-slate-300 pointer-events-none" />
      <div className="text-slate-700 text-sm sm:text-base md:text-[1.05rem] leading-relaxed font-normal pr-10 sm:pr-14 relative z-10">
        {content}
      </div>
    </div>
  );
}
