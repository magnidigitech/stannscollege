"use client";

import React, { useEffect, useState } from "react";
import buildInfo from "@/lib/build-info.json";

export function FooterLastUpdated() {
  const [displayDate, setDisplayDate] = useState<string>(
    buildInfo.formattedDate || "11 September 2026"
  );

  useEffect(() => {
    let isMounted = true;
    fetch("/api/site-metadata")
      .then((res) => res.json())
      .then((res) => {
        if (isMounted && res.success && res.data?.formattedDate) {
          setDisplayDate(res.data.formattedDate);
        }
      })
      .catch(() => {
        // Silently preserve build date on network fail
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 text-slate-400 font-sans text-xs select-none">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block shrink-0 shadow-xs" title="Live Content Indicator" />
      <span>
        Last Updated: <strong className="text-slate-300 font-medium">{displayDate}</strong>
      </span>
    </span>
  );
}

export default FooterLastUpdated;
