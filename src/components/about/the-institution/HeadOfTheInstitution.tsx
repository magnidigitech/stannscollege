import React from "react";
import { GraduationCap, Quote, ShieldCheck, Heart, Award } from "lucide-react";

export function HeadOfTheInstitution() {
  return (
    <div className="flex flex-col gap-8 font-sans select-none animate-fadeIn">
      {/* Narrative Section Banner (Sparkle removed as requested) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#0f172a] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-100 shadow-inner">
              <GraduationCap className="h-8 w-8 md:h-10 md:w-10" />
            </span>
            <div className="text-center md:text-left">
              <h2 className="font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
                Dr. Sr. Sandhya Thumma
              </h2>
              <p className="text-xs font-bold text-indigo-300 mt-1 uppercase tracking-wide">
                Principal & Visionary Administrator
              </p>
              <p className="font-sans text-xs font-semibold text-indigo-200/80 mt-0.5 select-none">
                MBA, M.Com, M.Ed, Ph.D.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Profile Card: Principal Photo on Left + Bio on Right */}
      <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
          {/* Photo Frame on Left */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="h-64 w-48 sm:h-72 sm:w-56 rounded-2xl overflow-hidden border border-slate-200/80 p-1 bg-slate-50 shadow-sm group">
              <img
                src="/images/principal.jpg"
                alt="Dr. Sr. Sandhya Thumma - Principal"
                className="w-full h-full object-cover rounded-xl select-none group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-center mt-3">
              <span className="font-outfit text-sm font-black text-slate-800 block">
                Dr. Sr. Sandhya Thumma
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 block mt-0.5">
                Principal, St. Ann&apos;s College
              </span>
            </div>
          </div>

          {/* Bio & Details on Right */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold w-fit mb-3">
              <Award className="h-3.5 w-3.5" /> Academician | Visionary Administrator | Empowerment Advocate
            </div>
            <h3 className="font-outfit text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-3">
              Guiding St. Ann&apos;s Towards Holistic Growth & Innovation
            </h3>
            <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Dr. Sr. Sandhya Thumma stands as a dynamic leader, blending academic excellence with visionary administration. Since assuming office as the Principal of St. Ann’s College for Women, Gorantla on June 25, 2024, she has been instrumental in steering the institution towards a new phase of growth, innovation, and academic distinction.
            </p>
            <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mt-3.5">
              With an impressive academic portfolio—MBA, M.Com, M.Ed, and Ph.D.—Sr. Sandhya embodies a commitment to lifelong learning and intellectual rigor. Her scholarly depth and leadership insight continue to inspire both faculty and students to strive for excellence.
            </p>
          </div>
        </div>
      </div>

      {/* The 3C Philosophy Section */}
      <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-outfit text-xl font-black text-slate-900">
              The &quot;3C&quot; Philosophy
            </h3>
            <span className="text-xs font-semibold text-slate-400">
              Character • Competence • Compassion
            </span>
          </div>
        </div>

        <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mb-5">
          At the heart of her leadership lies the <strong>&quot;3C&quot; Philosophy—Character, Competence, and Compassion</strong>. She envisions education as a transformative journey that goes beyond degrees, nurturing women into confident, responsible, and globally competent individuals. Under her guidance, the institution is steadily evolving into a center of holistic education, empowering young women to lead with integrity, skill, and a strong sense of social responsibility.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4 text-center">
            <span className="font-outfit text-sm font-black text-[#002147] block mb-1">Character</span>
            <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">
              Instilling ethical integrity, moral resilience, and guided spiritual values.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4 text-center">
            <span className="font-outfit text-sm font-black text-[#002147] block mb-1">Competence</span>
            <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">
              Fostering academic rigor, analytical thinking, and career preparedness.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4 text-center">
            <span className="font-outfit text-sm font-black text-[#002147] block mb-1">Compassion</span>
            <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">
              Cultivating empathy, community outreach, and social accountability.
            </p>
          </div>
        </div>
      </div>

      {/* Unified Principal's Message Card */}
      <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Quote className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-outfit text-xl font-black text-slate-900">
              Principal&apos;s Message
            </h3>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              The Call to Excellence & Transformation
            </span>
          </div>
        </div>

        {/* Featured Callout Quote */}
        <div className="relative rounded-2xl bg-gradient-to-r from-indigo-50/60 via-purple-50/40 to-slate-50 border-l-4 border-indigo-600 p-5 md:p-6 mb-6">
          <Quote className="absolute right-4 top-4 h-8 w-8 text-indigo-200/60 pointer-events-none" />
          <p className="font-outfit text-base sm:text-lg font-bold text-slate-800 italic leading-snug">
            &quot;Transforming Potential into Power. Welcome to a community where we don&apos;t just teach—we transform.&quot;
          </p>
        </div>

        {/* Narrative Message Content */}
        <div className="space-y-4 font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
          <p>
            At St. Ann’s College for Women, Gorantla, we recognize that the future belongs to those who are prepared for it. My vision as Principal is to ensure that our institution remains at the forefront of quality education. We are deeply committed to the NAAC Core Values, ensuring that our students are equipped with professional skills, ethical foundations, and a progressive mindset.
          </p>
          <p>
            Our journey is one of continuous improvement. We are building a legacy of excellence where academic achievements are balanced with holistic growth. I invite every student to step into their potential and every faculty member to continue their pursuit of academic distinction. Together, we are not just educating women; we are empowering the leaders of tomorrow.
          </p>
        </div>

        {/* Sign-off */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="font-outfit text-base font-black text-slate-900 block">
              Dr. Sr. Sandhya Thumma
            </span>
            <span className="text-xs font-semibold text-slate-500 block">
              Principal, St. Ann&apos;s College for Women, Gorantla
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> NAAC Committed
          </span>
        </div>
      </div>
    </div>
  );
}
