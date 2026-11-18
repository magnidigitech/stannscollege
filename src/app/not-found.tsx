import React from "react";
import Link from "next/link";
import { Home, GraduationCap, Phone, Search, ArrowRight, BookOpen, Compass, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | St. Ann's College for Women, Gorantla",
  description: "The page you are looking for might have been moved, renamed, or is temporarily unavailable.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: "Academic Programmes",
      desc: "Undergraduate (UG) & Postgraduate (PG) Courses",
      href: "/academics/academic-programmes/undergraduate-programmes",
      icon: BookOpen,
    },
    {
      title: "Admissions Portal",
      desc: "Eligibility criteria, process, and prospectus",
      href: "/admissions/programmes-offered",
      icon: GraduationCap,
    },
    {
      title: "Placements & Careers",
      desc: "Top recruiters, placement statistics, and training",
      href: "/placements/training-placements",
      icon: Award,
    },
    {
      title: "College Contact & Directions",
      desc: "Gorantla, Guntur campus location and numbers",
      href: "/contact",
      icon: Phone,
    },
  ];

  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center px-4 py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100">
      <div className="max-w-3xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          Error 404 • Page Not Found
        </div>

        {/* Big 404 Display */}
        <div className="relative mb-6">
          <span className="font-outfit text-7xl sm:text-9xl font-black tracking-tight text-slate-200/80 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-outfit text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Looking for Something at St. Ann&apos;s?
            </h1>
          </div>
        </div>

        {/* Message */}
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-sans">
          The page or document you are trying to reach may have been moved, renamed, or is temporarily unavailable. You can return to our homepage or use the shortcuts below.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-950 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-950/20 hover:bg-indigo-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/admissions/programmes-offered"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm sm:text-base shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4 text-indigo-700" />
            <span>Admissions Portal</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm sm:text-base shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Contact College</span>
          </Link>
        </div>

        {/* Popular Resources Grid */}
        <div className="border-t border-slate-200/80 pt-10 text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-outfit text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
              Popular College Portals & Resources
            </h2>
            <Link
              href="/"
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 transition-colors"
            >
              <span>Explore all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3.5 p-4 rounded-xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-900 group-hover:bg-indigo-950 group-hover:text-amber-400 transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-outfit font-bold text-sm text-slate-900 group-hover:text-indigo-950 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-sans">
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-950 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help Notice */}
        <p className="text-xs text-slate-400 mt-10 font-sans">
          Need immediate assistance? Call our front desk at{" "}
          <a href="tel:08632236470" className="text-indigo-700 font-semibold hover:underline">
            0863-2236470
          </a>{" "}
          or email{" "}
          <a href="mailto:principal@stannscollege.ac.in" className="text-indigo-700 font-semibold hover:underline">
            principal@stannscollege.ac.in
          </a>
        </p>
      </div>
    </div>
  );
}

