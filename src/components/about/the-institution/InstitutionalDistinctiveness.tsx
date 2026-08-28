import React from "react";
import { Sparkles, Star, CheckCircle, ArrowRight, BookOpen, Compass, Award, ShieldCheck } from "lucide-react";

export function InstitutionalDistinctiveness() {
  const pillars = [
    {
      title: "1. Bridging the Rural-Professional Divide",
      desc: "Located in the heart of Guntur, we serve as a gateway for first-generation learners. Our distinctiveness lies in providing Academic Heterogeneity, offering a diverse spectrum of over 38 program combinations that allow rural students the same intellectual freedom and competitive edge as their urban counterparts."
    },
    {
      title: "2. Financial Inclusivity: The 'Education for All' Mandate",
      desc: "We believe that financial constraints should never extinguish the 'Candle of Knowledge.' Our institution is distinguished by its robust Social Support System, providing extensive management-funded scholarships and fee concessions. This ensures that the most vulnerable sections of society gain access to premium higher education."
    },
    {
      title: "3. Innovative Pedagogy & Skill Integration",
      desc: "In alignment with our tagline, 'Where Knowledge Ignites Empowerment,' we move beyond rote learning. By integrating ICT-enabled tools, e-learning, and project-based assignments, we bridge the gap between classroom theory and industry readiness. Our focus on Additional Credits through MOOCs and certificate courses ensures our graduates are 'Global-Ready.'"
    },
    {
      title: "4. The 'St. Ann’s Woman' Profile (Graduate Attributes)",
      desc: "Our success is measured by the eight core domains we instill in every student. We nurture ethical leaders who lead with integrity, entrepreneurial minds who strive for economic independence, and socially responsible citizens who carry the spirit of the 'Lotus' to serve their communities."
    }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Narrative Section Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#064e3b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              The Annite Way: Igniting Empowerment
            </h2>
            <p className="mt-2 text-emerald-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Transforming rural and economically challenged young women into self-reliant, ethical leaders of tomorrow.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 backdrop-blur-md shadow-inner">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Full Width Building Photo Showcase Card */}
      <div className="bg-white border border-slate-200/60 p-2 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
        <div className="overflow-hidden rounded-2xl border border-slate-200 aspect-[16/9] md:aspect-[21/8] bg-slate-50 relative">
          <img 
            src="/images/about/cbnew2.webp" 
            alt="St. Ann's College Campus Building" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 select-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4 md:p-6">
            <div>
              <span className="bg-emerald-600 text-white font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md select-none">
                Campus Showcase
              </span>
              <h4 className="font-outfit text-white text-base md:text-lg font-black mt-2 select-none">
                Main Institutional Building – Gorantla, Guntur
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative & Inception Context card */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <img 
              src="/images/collegelogo.png" 
              alt="St. Ann's Emblem Logo" 
              className="h-14 w-auto object-contain select-none"
            />
            <div>
              <h3 className="font-outfit text-xl font-black text-[#002147] select-none leading-tight">
                Our Singular Vision Since 1997
              </h3>
              <p className="font-sans text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">
                Institutional Identity & Philosophy
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="font-outfit text-sm font-black text-[#002147]">
              Educate • Enrich • Empower
            </p>
            <p className="text-slate-400 font-sans text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Where Knowledge Ignites Empowerment
            </p>
          </div>
        </div>
        
        <p className="leading-relaxed font-normal text-slate-600 text-sm md:text-base">
          At St. Ann’s College for Women, Gorantla, our distinctiveness is not just in what we teach, but in who our students become. Since our inception in 1997, our institutional identity has been defined by a singular, powerful thrust: Transforming rural and economically challenged young women into self-reliant, ethical leaders of tomorrow.
        </p>
      </div>

      {/* Philosophy of Our Symbols */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm">
        <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
          The Philosophy of Our Symbols
        </h3>
        <p className="font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Foundational Identity</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-emerald-100 transition-all flex flex-col justify-between h-full group">
            <div>
              <span className="text-xl group-hover:scale-110 transition duration-300 inline-block">🕯️</span>
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight mt-2">The Candle</h5>
              <p className="text-slate-500 font-sans text-xs mt-1 leading-relaxed font-normal">
                Representing the Light of Knowledge that dispels the darkness of ignorance and lights future pathways.
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-emerald-100 transition-all flex flex-col justify-between h-full group">
            <div>
              <span className="text-xl group-hover:scale-110 transition duration-300 inline-block">📖</span>
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight mt-2">The Book</h5>
              <p className="text-slate-500 font-sans text-xs mt-1 leading-relaxed font-normal">
                Representing the Foundation of Wisdom, intellectual inquiry, and comprehensive academic rigor.
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-emerald-100 transition-all flex flex-col justify-between h-full group">
            <div>
              <span className="text-xl group-hover:scale-110 transition duration-300 inline-block">🪷</span>
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight mt-2">The Lotus</h5>
              <p className="text-slate-500 font-sans text-xs mt-1 leading-relaxed font-normal">
                Symbolizing the Spirit of Resilience—the unique ability to bloom, adapt, and succeed in any environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars of Distinctive Excellence */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h3 className="font-outfit text-xl font-black text-slate-800 select-none leading-none">
            Pillars of Our Distinctive Excellence
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {pillars.map((p, i) => (
            <div key={i} className="p-5 bg-white border border-slate-200/60 rounded-3xl hover:shadow-md hover:border-emerald-100 transition-all">
              <h5 className="font-outfit font-black text-slate-800 text-sm md:text-base leading-tight">{p.title}</h5>
              <p className="text-slate-500 font-sans text-xs md:text-sm mt-2 leading-relaxed font-normal">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact & Evidence Card */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-outfit text-xl font-black text-slate-900 select-none">
            Impact & Evidence: The Empowerment Loop
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
            <span className="text-lg font-black text-emerald-600 shrink-0">1</span>
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-snug">Enrolling the underprivileged.</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
            <span className="text-lg font-black text-emerald-600 shrink-0">2</span>
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-snug">Enriching them through value-based academic rigor.</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
            <span className="text-lg font-black text-emerald-600 shrink-0">3</span>
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-snug">Empowering them with vocational skills & resilience.</p>
          </div>
        </div>
        <p className="mt-6 text-slate-500 font-sans text-xs md:text-sm leading-relaxed font-normal border-t border-slate-50 pt-4">
          Today, St. Ann’s graduates are found leading in corporate sectors, excelling in government services, and building stable homes—serving as living proof of our motto: <strong>Educate • Enrich • Empower</strong>.
        </p>
      </div>

      {/* Dynamic Link Footer */}
      <div className="bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 md:p-8 border border-slate-200/60 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-outfit text-base font-black text-slate-900 select-none">Connecting Distinctiveness to Best Practices</h4>
          <p className="text-xs text-slate-500 mt-1">Operationalized through our two flagship best practices.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/about/the-institution/student-mentorship-holistic-support" className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-200 font-bold px-4 py-2 text-xs rounded-xl shadow-sm hover:shadow transition">
            Student Mentorship <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href="/about/the-institution/lab-to-land-extension-activities" className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-200 font-bold px-4 py-2 text-xs rounded-xl shadow-sm hover:shadow transition">
            &apos;Lab-to-Land&apos; Extension <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
