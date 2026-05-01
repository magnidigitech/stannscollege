import { Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-slate-50/50 px-6 py-12 md:py-24 text-center font-sans select-none animate-fadeIn">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-xs font-black text-indigo-600 uppercase tracking-wider mb-6">
          <Sparkles className="h-4 w-4 animate-pulse shrink-0" /> Admissions
        </span>
        <h1 className="font-outfit text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-none mb-4">
          Admissions are Coming Soon
        </h1>
        <p className="text-sm md:text-base text-slate-600 font-medium max-w-md leading-relaxed mb-8">
          The enrollment window for our dynamic undergraduate and postgraduate programs is preparing to launch. Please check back soon or visit our about section to learn more about our courses.
        </p>

        <Link
          href="/about"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3.5 text-sm md:text-base font-extrabold text-white shadow-xl shadow-indigo-100 hover:shadow-indigo-200 active:scale-95 transition-all select-none"
        >
          Explore About the College
        </Link>
      </div>
    </div>
  );
}
