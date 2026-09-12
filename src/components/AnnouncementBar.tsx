"use client";

import React from "react";
import { Bell, Phone } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div
      id="top-announcement-bar"
      className="w-full h-10 border-b border-slate-800 bg-[#020617] overflow-hidden select-none z-40 relative"
    >
      <div className="mx-auto max-w-[1780px] px-3 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between text-xs font-semibold gap-3 sm:gap-6">
        
        {/* Left: Live Scrolling Announcement Ticker */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-hidden h-full">
          
          {/* Eye-catching Blinking 'ANNOUNCEMENTS' Badge */}
          <div
            id="announcements-badge-box"
            className="flex items-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3 py-1 font-extrabold tracking-wider uppercase text-[10px] sm:text-[11px] shrink-0 z-10 select-none bg-[#dc2626] text-white animate-announcement-badge-blink ring-2 ring-red-400/80 shadow-lg shadow-red-500/35 cursor-default"
            title="Latest announcements & updates"
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
              ANNOUNCEMENTS
            </span>
          </div>

          {/* Marquee Track with Pause on Hover */}
          <div
            className="relative flex-1 overflow-hidden h-full flex items-center group cursor-pointer"
            title="Hover to pause announcement ticker"
          >
            <div
              className="animate-announcement-marquee flex items-center font-medium text-[12px] text-slate-200"
              style={{ animationDuration: "32s" }}
            >
              {/* Content Block 1 */}
              <div className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0">
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

        {/* Right: Clickable Phone Numbers */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 shrink-0 text-[11px] sm:text-xs">
          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="text-slate-400 font-medium hidden md:inline">Call Us:</span>
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
