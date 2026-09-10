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
  if (!title) return null;

  return (
    <>
      {/* ── NOTCH layout: shown when --heading1-style = notch ── */}
      <div
        className={`w-full flex justify-center -mt-px relative z-20 pointer-events-none heading1-notch-wrap ${className}`}
        style={{ display: "var(--heading1-notch-display, flex)" }}
      >
        <div
          className="pointer-events-auto relative overflow-hidden text-white px-6 sm:px-10 md:px-14 py-2.5 sm:py-3.5 md:py-4 rounded-b-2xl sm:rounded-b-3xl md:rounded-b-[2rem] shadow-xl border-x-2 border-b-2 border-t-0 transition-all duration-200 flex items-center justify-center text-center max-w-[92vw] sm:max-w-fit mx-auto"
          style={{
            background: "var(--level1-bg, linear-gradient(to bottom right, #001730, #002147, #0d3b66))",
            borderColor: "var(--level1-border, rgba(49, 46, 129, 0.25))",
            boxShadow: "0 10px 25px -3px rgba(0, 33, 71, 0.25), 0 4px 6px -2px rgba(0, 33, 71, 0.1)"
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none"></div>
          <h1
            className="tracking-tight leading-tight transition-all duration-200 font-black relative z-10 select-none whitespace-normal sm:whitespace-nowrap"
            style={{
              color: "var(--level1-title, #ffffff)",
              fontFamily: "var(--level1-font-family, var(--font-outfit, inherit))",
              fontSize: "clamp(1.15rem, 2.2vw, var(--level1-title-size, 1.85rem))",
              textAlign: "center"
            }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* ── FULLWIDTH layout: shown when --heading1-style = fullwidth ── */}
      <div
        className="w-full text-white relative overflow-hidden transition-all duration-200 border-b shadow-md heading1-fullwidth-wrap"
        style={{
          display: "var(--heading1-fullwidth-display, none)",
          background: "var(--level1-bg, linear-gradient(to bottom right, #001730, #002147, #0d3b66))",
          borderColor: "var(--level1-border, rgba(49, 46, 129, 0.2))",
          paddingTop: "var(--level1-padding-y, 44px)",
          paddingBottom: "var(--level1-padding-y, 44px)"
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none"></div>
        <div
          className="max-w-[1600px] mx-auto relative z-10 flex flex-col w-full px-4 sm:px-6 lg:px-12"
          style={{
            alignItems: "var(--level1-align-items, center)",
            textAlign: "var(--level1-text-align, center)" as any,
            gap: "var(--level1-gap, 12px)"
          }}
        >
          <h1
            className="tracking-tight leading-tight transition-all duration-200 font-black"
            style={{
              color: "var(--level1-title, #ffffff)",
              fontFamily: "var(--level1-font-family, var(--font-outfit, inherit))",
              fontSize: "var(--level1-title-size, 38px)",
              textAlign: "inherit"
            }}
          >
            {title}
          </h1>
          {children && (
            <p
              className="text-blue-100/90 leading-relaxed font-semibold border-t border-white/15 pt-3 px-2 sm:px-4"
              style={{
                fontSize: "var(--level1-sub-size, 14px)",
                maxWidth: "var(--level1-sub-max-width, 56rem)",
                textAlign: "inherit"
              }}
            >
              {children}
            </p>
          )}
        </div>
      </div>

      {/* Inline style that reads the CSS var and applies display toggling */}
      <style>{`
        :root { --heading1-style: notch; }
        :root[style*="--heading1-style: notch"] .heading1-notch-wrap,
        :root:not([style*="--heading1-style"]) .heading1-notch-wrap { display: flex !important; }
        :root[style*="--heading1-style: notch"] .heading1-fullwidth-wrap,
        :root:not([style*="--heading1-style"]) .heading1-fullwidth-wrap { display: none !important; }
        :root[style*="--heading1-style: fullwidth"] .heading1-notch-wrap { display: none !important; }
        :root[style*="--heading1-style: fullwidth"] .heading1-fullwidth-wrap { display: block !important; }
      `}</style>
    </>
  );
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
      <p className="text-slate-700 text-sm sm:text-base md:text-[1.05rem] leading-relaxed font-normal pr-10 sm:pr-14 relative z-10">
        {content}
      </p>
    </div>
  );
}
