"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

export function AnnouncementBar() {
  const pathname = usePathname();

  // Appears only on the home page
  if (pathname !== "/") {
    return null;
  }

  return (
    <div id="top-announcement-bar" className="w-full bg-slate-950 border-b border-slate-900 overflow-hidden select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full h-10 flex items-center justify-between text-xs font-semibold text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded bg-[#1e40af] border border-blue-400/30 px-2 py-0.5 text-white font-bold tracking-wider uppercase animate-pulse select-none">
            <Bell className="h-3 w-3" /> Announcement
          </span>
          <span className="hidden sm:inline font-sans font-medium text-slate-200 truncate max-w-sm md:max-w-md">
            Admissions are officially open for UG and PG programs for the 2026-2027 academic year.
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline font-medium">AISHE Code: C-39493</span>
          <span className="font-medium">Call Us: 0863-2236470 | 7382104655</span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
