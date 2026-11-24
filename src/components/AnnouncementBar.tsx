"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Phone } from "lucide-react";
import defaultData from "@/components/announcements-data.json";

interface AnnouncementItem {
  id: string;
  text: string;
  link?: string;
  dotColor?: "sky" | "amber" | "emerald" | "rose" | "purple";
  isActive: boolean;
}

interface PhoneNumberItem {
  label: string;
  number: string;
}

interface AnnouncementData {
  enabled: boolean;
  badgeText: string;
  speedSeconds: number;
  phoneNumbers: PhoneNumberItem[];
  announcements: AnnouncementItem[];
}

export function AnnouncementBar() {
  const [data, setData] = useState<AnnouncementData>(defaultData as AnnouncementData);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveAnnouncements() {
      try {
        const res = await fetch("/api/admin/announcements");
        const json = await res.json();
        if (json.success && json.data && isMounted) {
          setData(json.data);
        }
      } catch (err) {
        // Fallback already in initial state
      }
    }
    loadLiveAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!data.enabled) {
    return null;
  }

  const activeAnnouncements = data.announcements.filter((a) => a.isActive);
  if (activeAnnouncements.length === 0) {
    return null;
  }

  const getDotClass = (color?: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-400 shadow-xs shadow-amber-400/50";
      case "emerald":
        return "bg-emerald-400 shadow-xs shadow-emerald-400/50";
      case "rose":
        return "bg-rose-400 shadow-xs shadow-rose-400/50";
      case "purple":
        return "bg-purple-400 shadow-xs shadow-purple-400/50";
      case "sky":
      default:
        return "bg-sky-400 shadow-xs shadow-sky-400/50";
    }
  };

  const renderContentBlock = (isAriaHidden = false) => (
    <div
      className="inline-flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0"
      aria-hidden={isAriaHidden}
    >
      {activeAnnouncements.map((item, idx) => (
        <React.Fragment key={`${item.id || idx}-${isAriaHidden ? "dup" : "orig"}`}>
          {item.link ? (
            <Link
              href={item.link}
              className="tracking-wide text-slate-100 hover:text-amber-300 transition-colors hover:underline"
            >
              {item.text}
            </Link>
          ) : (
            <span className="tracking-wide text-slate-100">{item.text}</span>
          )}
          <span
            className={`h-1.5 w-1.5 rounded-full shrink-0 ${getDotClass(item.dotColor)}`}
          />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      id="top-announcement-bar"
      className="w-full h-10 border-b border-white/10 overflow-hidden select-none z-40 relative shadow-xs"
      style={{ backgroundColor: "#000080" }}
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
              {data.badgeText || "ANNOUNCEMENTS"}
            </span>
          </div>

          {/* Marquee Track with Pause on Hover */}
          <div
            className="relative flex-1 overflow-hidden h-full flex items-center group cursor-pointer"
            title="Hover to pause announcement ticker"
          >
            <div
              className="animate-announcement-marquee flex items-center font-medium text-[12px] text-slate-100"
              style={{ animationDuration: `${data.speedSeconds || 32}s` }}
            >
              {/* Content Block 1 */}
              {renderContentBlock(false)}

              {/* Duplicate Content Block 2 for Seamless Infinite Loop */}
              {renderContentBlock(true)}
            </div>
          </div>
        </div>

        {/* Right: Clickable Phone Numbers */}
        {data.phoneNumbers && data.phoneNumbers.length > 0 && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 shrink-0 text-[11px] sm:text-xs">
            <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0 animate-pulse" />
            {data.phoneNumbers.map((p, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-500 font-normal">|</span>}
                {p.label && <span className="text-slate-300 font-medium hidden md:inline">{p.label}:</span>}
                <a
                  href={`tel:${p.number.replace(/[^\d+]/g, "")}`}
                  className="text-amber-300 hover:text-amber-200 font-semibold transition-colors hover:underline tracking-tight"
                  title={`Click to call ${p.number}`}
                >
                  {p.number}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementBar;
