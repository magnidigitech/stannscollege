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
  variant?: "default" | "tricolor";
  icon?: "quote" | "ashoka-chakra" | "none";
}

/**
 * Ashoka Chakra Vector Icon (24 spokes, decorative outer beads, center hub)
 */
export function AshokaChakra({ className = "h-12 w-12", color = "#000080" }: { className?: string; color?: string }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ashoka Chakra"
    >
      {/* Outer double rim */}
      <circle cx="50" cy="50" r="47" stroke={color} strokeWidth="2.4" />
      <circle cx="50" cy="50" r="41.5" stroke={color} strokeWidth="1.2" />

      {/* 24 decorative dots on the rim */}
      {spokes.map((angle) => {
        const rad = ((angle + 7.5) * Math.PI) / 180;
        const cx = 50 + 44.2 * Math.cos(rad);
        const cy = 50 + 44.2 * Math.sin(rad);
        return <circle key={`dot-${angle}`} cx={cx} cy={cy} r="1.1" fill={color} />;
      })}

      {/* 24 Spokes radiating from center hub to inner rim */}
      {spokes.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 8.5 * Math.cos(rad);
        const y1 = 50 + 8.5 * Math.sin(rad);
        const x2 = 50 + 41.5 * Math.cos(rad);
        const y2 = 50 + 41.5 * Math.sin(rad);
        return (
          <line
            key={`spoke-${angle}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}

      {/* Center Hub */}
      <circle cx="50" cy="50" r="8.5" fill={color} />
      <circle cx="50" cy="50" r="4" fill="#ffffff" />
      <circle cx="50" cy="50" r="1.8" fill={color} />
    </svg>
  );
}

/**
 * Data Section (Sub-text Box) with prominent Quote watermark or Ashoka Chakra.
 * Supports Indian Flag Tricolor palette with saffron, white, and green wash.
 */
export function SubtextBox({
  subtext,
  className = "",
  children,
  variant = "default",
  icon = "quote",
}: SubtextBoxProps) {
  const content = children ?? subtext;
  if (!content || (typeof content === "string" && !content.trim())) return null;

  const isTricolor = variant === "tricolor";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 ${
        isTricolor
          ? "border-2 border-amber-200/70"
          : "border-2 border-slate-200/90"
      } ${className}`}
      style={
        isTricolor
          ? {
              background:
                "linear-gradient(180deg, rgba(255, 153, 51, 0.18) 0%, rgba(255, 153, 51, 0.07) 30%, rgba(255, 255, 255, 0.98) 36%, rgba(255, 255, 255, 0.98) 64%, rgba(19, 136, 8, 0.07) 70%, rgba(19, 136, 8, 0.18) 100%)",
            }
          : { backgroundColor: "var(--subtext-bg, #ffffff)" }
      }
    >
      {/* Tricolor top accent ribbon if tricolor */}
      {isTricolor && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-20" />
      )}

      {/* Right Icon: Ashoka Chakra or Quote */}
      {icon === "ashoka-chakra" ? (
        <div className="absolute right-5 top-5 sm:right-7 sm:top-7 pointer-events-none drop-shadow-sm opacity-90 transition-transform duration-300 hover:scale-105">
          <AshokaChakra className="h-12 w-12 sm:h-14 sm:w-14" color="#000080" />
        </div>
      ) : icon === "quote" ? (
        <Quote className="absolute right-6 top-6 h-12 w-12 text-slate-300 pointer-events-none" />
      ) : null}

      <div className="text-slate-700 text-sm sm:text-base md:text-[1.05rem] leading-relaxed font-normal pr-12 sm:pr-20 relative z-10">
        {content}
      </div>
    </div>
  );
}
