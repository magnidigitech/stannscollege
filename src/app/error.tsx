"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Phone } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client-side error for diagnosis
    console.error("Application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center px-4 py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-rose-50/20 to-slate-100">
      <div className="max-w-xl w-full text-center bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
        {/* Warning Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-6 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Heading */}
        <h1 className="font-outfit text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Something Went Unexpectedly Wrong
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base font-sans mb-6 leading-relaxed">
          We encountered a temporary technical glitch while loading this section. Your browser session is safe, and you can try reloading the section below.
        </p>

        {error.digest && (
          <p className="font-mono text-[11px] text-slate-400 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200/60 inline-block mb-6">
            Incident Reference: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-950 text-white font-semibold text-sm shadow-md hover:bg-indigo-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Home className="w-4 h-4 text-indigo-700" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Footnote */}
        <p className="text-xs text-slate-400 mt-8 border-t border-slate-100 pt-4 font-sans">
          If this persists, please contact the college administration at{" "}
          <a href="mailto:principal@stannscollege.ac.in" className="text-indigo-700 font-semibold hover:underline">
            principal@stannscollege.ac.in
          </a>
        </p>
      </div>
    </div>
  );
}

