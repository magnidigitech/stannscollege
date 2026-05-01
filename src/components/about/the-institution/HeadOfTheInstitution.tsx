import React from "react";
import { Users, Award, Sparkles, GraduationCap, Quote, Star, ShieldCheck } from "lucide-react";

export function HeadOfTheInstitution() {
  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Narrative Section Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 p-6 md:p-10 text-white shadow-xl border border-slate-800/40 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-100 shadow-inner">
              <GraduationCap className="h-8 w-8 md:h-10 md:w-10" />
            </span>
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
                <ShieldCheck className="h-3.5 w-3.5" /> Head of the Institution
              </span>
              <h2 className="mt-3 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
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
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Main Grid: Profile Details and Message */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left/Middle Column - Complete Narrative */}
        <div className="md:col-span-2 flex flex-col gap-8">
          
          {/* Profile Section */}
          <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
            <h3 className="font-outfit text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 select-none">
              Academician | Visionary Administrator | Empowerment Advocate
            </h3>
            <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Dr. Sr. Sandhya Thumma stands as a dynamic leader, blending academic excellence with visionary administration. Since assuming office as the Principal of St. Ann’s College for Women, Gorantla on June 25, 2024, she has been instrumental in steering the institution towards a new phase of growth, innovation, and academic distinction.
            </p>
            <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mt-4">
              With an impressive academic portfolio—MBA, M.Com, M.Ed, and Ph.D.—Sr. Sandhya embodies a commitment to lifelong learning and intellectual rigor. Her scholarly depth and leadership insight continue to inspire both faculty and students to strive for excellence.
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
            <h3 className="font-outfit text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 select-none">
              The &quot;3C&quot; Philosophy
            </h3>
            <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              At the heart of her leadership lies the <strong>&quot;3C&quot; Philosophy—Character, Competence, and Compassion</strong>. She envisions education as a transformative journey that goes beyond degrees, nurturing women into confident, responsible, and globally competent individuals.
            </p>
            <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mt-4">
              Under her guidance, the institution is steadily evolving into a center of holistic education, empowering young women to lead with integrity, skill, and a strong sense of social responsibility.
            </p>
          </div>

        </div>

        {/* Right Column - Principal's Message & Visual Accents */}
        <div className="flex flex-col gap-6">
          
          {/* Visual card or placeholder avatar */}
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[220px] group">
            <div className="h-24 w-24 rounded-full bg-slate-50 border border-slate-200/60 p-1 flex items-center justify-center group-hover:scale-105 transition duration-300">
              <span className="text-4xl text-slate-300">👩‍💼</span>
            </div>
            <h4 className="font-outfit text-base font-black text-slate-800 leading-snug mt-4">Dr. Sr. Sandhya Thumma</h4>
            <p className="text-xs font-semibold text-slate-400 mt-1 leading-tight">Principal Message Slot</p>
          </div>

          {/* Message Spotlight */}
          <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 border border-slate-200/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4 shadow-sm">
              <Quote className="h-5 w-5" />
            </span>
            <h4 className="font-outfit text-base font-black text-slate-800 leading-snug">Principal’s Message</h4>
            <span className="text-xs font-bold text-indigo-500 block mt-0.5 uppercase tracking-wide">The Call to Excellence</span>
            <p className="mt-3 font-sans text-xs md:text-sm italic font-medium text-slate-600 leading-relaxed">
              &quot;Transforming Potential into Power. Welcome to a community where we don&apos;t just teach—we transform.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Message Paragraphs */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          Full Principal&apos;s Message
        </h3>
        <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal">
          At St. Ann’s College for Women, Gorantla, we recognize that the future belongs to those who are prepared for it. My vision as Principal is to ensure that our institution remains at the forefront of quality education. We are deeply committed to the NAAC Core Values, ensuring that our students are equipped with professional skills, ethical foundations, and a progressive mindset.
        </p>
        <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-normal mt-4">
          Our journey is one of continuous improvement. We are building a legacy of excellence where academic achievements are balanced with holistic growth. I invite every student to step into their potential and every faculty member to continue their pursuit of academic distinction. Together, we are not just educating women; we are empowering the leaders of tomorrow.
        </p>
      </div>

    </div>
  );
}
