"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Phone } from "lucide-react";

export function AnnouncementBar() {
  const pathname = usePathname();

  // Appears only on the home page
  if (pathname !== "/") {
    return null;
  }

  return (
    <div id="top-announcement-bar" className="w-full bg-slate-950 border-b border-slate-900 overflow-hidden select-none">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-12 w-full h-10 flex items-center justify-between text-xs font-semibold text-slate-300 gap-3 sm:gap-6">
        
        {/* Left: Live Scrolling Announcement Ticker */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-hidden">
          <span className="flex items-center gap-1.5 rounded bg-[#1e40af] border border-blue-400/30 px-2 sm:px-2.5 py-0.5 text-white font-bold tracking-wider uppercase text-[10px] sm:text-[11px] shrink-0 z-10 shadow-xs">
            <Bell className="h-3 w-3 animate-bounce" /> Announcement
          </span>

          {/* Marquee Track with Pause on Hover */}
          <div className="relative flex-1 overflow-hidden h-6 flex items-center group cursor-pointer" title="Hover to pause scroll">
            <div className="animate-announcement-marquee flex items-center text-xs font-medium text-slate-200">
              {/* Content Block 1 */}
              <div className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0">
                <span className="tracking-wide">
                  Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="tracking-wide text-slate-300">
                  Accredited by NAAC with &apos;A&apos; Grade in the first cycle
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="tracking-wide text-slate-300">
                  Celebrating 29+ Years of Academic Excellence (1997 - 2026)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              </div>

              {/* Duplicate Content Block 2 for Seamless Infinite Loop */}
              <div className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0" aria-hidden="true">
                <span className="tracking-wide">
                  Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="tracking-wide text-slate-300">
                  Accredited by NAAC with &apos;A&apos; Grade in the first cycle
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="tracking-wide text-slate-300">
                  Celebrating 29+ Years of Academic Excellence (1997 - 2026)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clickable Phone Numbers */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 shrink-0 text-[11px] sm:text-xs">
          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-400 font-medium">Call Us:</span>
          <a
            href="tel:08632236470"
            className="text-slate-200 hover:text-amber-400 font-semibold transition-colors hover:underline tracking-tight"
            title="Click to call 0863-2236470"
          >
            0863-2236470
          </a>
          <span className="text-slate-600 font-normal">|</span>
          <a
            href="tel:7382104655"
            className="text-slate-200 hover:text-amber-400 font-semibold transition-colors hover:underline tracking-tight"
            title="Click to call 7382104655"
          >
            7382104655
          </a>
        </div>

      </div>
    </div>
  );
}

export default AnnouncementBar;
