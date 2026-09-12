"use client";

import React from "react";
import { Bell, Phone } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div
      id="top-announcement-bar"
      className="w-full h-10 border-b border-white/10 bg-[#000d26] overflow-hidden select-none z-40 relative shadow-xs"
    >
      <div className="mx-auto max-w-[1780px] px-3 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between text-xs font-semibold gap-3 sm:gap-6">
        
        {/* Left: Live Scrolling Announcement Ticker */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-hidden h-full">
          
          {/* Eye-catching Stylish 'ANNOUNCEMENTS' Badge */}
          <div
            id="announcements-badge-box"
            className="flex items-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3 py-1 font-extrabold tracking-wider uppercase text-[10px] sm:text-[11px] shrink-0 z-10 select-none bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-slate-950 animate-announcement-badge-blink ring-2 ring-amber-300/90 shadow-md shadow-amber-500/30 cursor-default"
            title="Latest announcements & updates"
          >
            {/* Pulsing Radar Beacon Dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950" />
            </span>

            {/* Icon */}
            <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-bounce shrink-0 text-slate-950" />

            {/* Badge Text */}
            <span className="font-outfit tracking-wide drop-shadow-xs font-black text-slate-950">
              ANNOUNCEMENTS
            </span>
          </div>

          {/* Marquee Track with Pause on Hover */}
          <div
            className="relative flex-1 overflow-hidden h-full flex items-center group cursor-pointer"
            title="Hover to pause announcement ticker"
          >
            <div
              className="animate-announcement-marquee flex items-center font-medium text-[12px] text-slate-100"
              style={{ animationDuration: "32s" }}
            >
              {/* Content Block 1 */}
              <div className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0">
                <span className="tracking-wide text-slate-100">
                  Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0 shadow-xs shadow-sky-400/50" />
                <span className="tracking-wide text-slate-200">
                  Accredited by NAAC with &apos;A&apos; Grade in the first cycle
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 shadow-xs shadow-amber-400/50" />
                <span className="tracking-wide text-slate-200">
                  Celebrating 29+ Years of Academic Excellence (1997 - 2026)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-xs shadow-emerald-400/50" />
              </div>

              {/* Duplicate Content Block 2 for Seamless Infinite Loop */}
              <div
                className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0"
                aria-hidden="true"
              >
                <span className="tracking-wide text-slate-100">
                  Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0 shadow-xs shadow-sky-400/50" />
                <span className="tracking-wide text-slate-200">
                  Accredited by NAAC with &apos;A&apos; Grade in the first cycle
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 shadow-xs shadow-amber-400/50" />
                <span className="tracking-wide text-slate-200">
                  Celebrating 29+ Years of Academic Excellence (1997 - 2026)
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-xs shadow-emerald-400/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clickable Phone Numbers */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 shrink-0 text-[11px] sm:text-xs">
          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="text-slate-300 font-medium hidden md:inline">Call Us:</span>
          <a
            href="tel:08632236470"
            className="text-amber-300 hover:text-amber-200 font-semibold transition-colors hover:underline tracking-tight"
            title="Click to call 0863-2236470"
          >
            0863-2236470
          </a>
          <span className="text-slate-500 font-normal">|</span>
          <a
            href="tel:7382104655"
            className="text-amber-300 hover:text-amber-200 font-semibold transition-colors hover:underline tracking-tight"
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
