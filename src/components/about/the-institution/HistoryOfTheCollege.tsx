import React from "react";
import { Sparkles, Award, History, Clock, Calendar, CheckCircle2, BookOpen } from "lucide-react";

export function HistoryOfTheCollege() {
  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Banner Card Section with Badge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#0f172a] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <History className="h-3.5 w-3.5" /> Institutional Journey
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Our History
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Tracing our path of educational empowerment and academic distinction since August 11, 1997.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Clock className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Main Narrative Blocks */}
      <div className="flex flex-col gap-8 text-slate-600 leading-relaxed font-sans text-sm md:text-base">

        {/* Section 1: Visionary Roots */}
        <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="font-outfit text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-4 select-none">
            Visionary Roots & Foundation
          </h3>
          <p className="leading-relaxed font-normal text-slate-600">
            St. Ann’s College for Women was founded with a noble vision—to provide a distinguished platform for women’s higher education and holistic empowerment. The institution was formally established on 11 August 1997, marking the beginning of a transformative educational mission dedicated to academic excellence, discipline, and value-based learning.
          </p>
          <p className="mt-4 leading-relaxed font-normal text-slate-600">
            The college was established under the visionary leadership of Rev. Mother Mekala Mary Ignatius Loyola, the Superior General of the Society of St. Anne, inspired by the life and mission of Mother Thatipathri Gnanamma, the revered foundress of the Society of St. Anne, who dedicated her life to the noble cause of uplifting women through education, empowerment, and values-based formation.
          </p>
          <div className="mt-5 p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm font-semibold text-indigo-900/80 leading-relaxed">
              Soon after its establishment, the college received affiliation from Acharya Nagarjuna University on 16 September 1997, strengthening its academic foundation and enabling it to embark on a journey of quality higher education.
            </p>
          </div>
        </div>

        {/* Section 2: Timeline Grid with Visual Cards */}
        <div className="grid grid-cols-1 gap-6">

          {/* Card 1: Formative Years */}
          <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 cursor-default group">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3 mb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-50 to-indigo-100 border border-indigo-200/50 text-indigo-600 shadow-sm group-hover:scale-105 transition-all">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">1997 – 1998</span>
                <h4 className="mt-0.5 font-outfit text-lg font-black text-slate-800 leading-snug">The Formative Years</h4>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              The college’s academic odyssey began at the Bharathpet campus with the formal affiliation from Acharya Nagarjuna University on September 16, 1997. With an initial approval from APSCHE for 140 seats, we welcomed our pioneer batch of 50 students. From day one, the institution set a high standard by offering all programs exclusively in the English medium, prioritizing professional readiness and global competence.
            </p>
            <div className="mt-4 border-t border-slate-50 pt-3">
              <h5 className="font-outfit text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Pioneering Undergraduate Streams:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> B.Sc. (Mathematics, Physics, Chemistry)</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> B.Sc. (Microbiology, Botany, Chemistry)</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> B.A. (Mathematics, Economics, Statistics)</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> B.Com. (General)</div>
              </div>
            </div>
          </div>

          {/* Card 2: Establishing Gorantla */}
          <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 cursor-default group">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3 mb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-50 to-indigo-100 border border-indigo-200/50 text-indigo-600 shadow-sm group-hover:scale-105 transition-all">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">1999 onwards</span>
                <h4 className="mt-0.5 font-outfit text-lg font-black text-slate-800 leading-snug">Establishing the Gorantla Campus</h4>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              The institution’s growth soon led to the establishment of its own permanent campus at Gorantla, Guntur, marking a significant chapter in its history. A major milestone was reached on 7 February 1999, when the foundation stone for the new campus was ceremonially laid by Rev. Mother Mekala Mary Ignatius Loyola, Superior General of the Society of St. Anne, and blessed by Rev. Fr. Y. Thomas, Parish Priest.
            </p>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal mt-3">
              Following swift progress in construction, the college building was formally inaugurated on 23 October 1999 by Rev. Mother Mary Ignatius Loyola and blessed by Dr. Gali Bali, Bishop of Guntur. Soon thereafter, on 1 November 1999, St. Ann’s College proudly shifted to its permanent campus at Gorantla.
            </p>
          </div>

          {/* Card 3: Expansion Era */}
          <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 cursor-default group">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3 mb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-50 to-indigo-100 border border-indigo-200/50 text-indigo-600 shadow-sm group-hover:scale-105 transition-all">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">1998 – 2007</span>
                <h4 className="mt-0.5 font-outfit text-lg font-black text-slate-800 leading-snug">Decade of Expansion</h4>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              Between 1998 and 2007, St. Ann’s underwent a period of rapid academic diversification to meet the demands of a changing global economy.
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl">
                <h5 className="text-xs font-bold text-indigo-900 uppercase">The IT Revolution</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                  Responding to the digital era, the college introduced BCA and B.Sc. (MSCs) in 1998, followed by B.Com. (Computer Applications) in 1999.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl">
                <h5 className="text-xs font-bold text-indigo-900 uppercase">Scientific Diversification</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                  In 2003, the portfolio expanded to include B.Sc. Biotechnology and additional sections for the highly sought-after MPCs track.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Ascent to Excellence */}
          <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 cursor-default group">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3 mb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-50 to-indigo-100 border border-indigo-200/50 text-indigo-600 shadow-sm group-hover:scale-105 transition-all">
                <Calendar className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest leading-none">2002 – 2007</span>
                <h4 className="mt-0.5 font-outfit text-lg font-black text-slate-800 leading-snug">Ascent to Postgraduate Excellence</h4>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              The college further solidified its reputation by venturing into professional postgraduate education, securing approvals from the All India Council for Technical Education (AICTE).
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl">
                <h5 className="text-xs font-bold text-indigo-900 uppercase">Master of Computer Applications (MCA)</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                  Launched in 2002, the MCA program marked our entry into high-level technical training. Initially a three-year course, it became a cornerstone for developing technical expertise among women.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl">
                <h5 className="text-xs font-bold text-indigo-900 uppercase">Master of Business Administration (MBA)</h5>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                  In 2007, the college launched its MBA program. Reflecting the institution’s prestige, the program achieved 100% enrollment in its inaugural year, nurturing the next generation of women leaders and entrepreneurs.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Continuing Mission Footer */}
        <div className="bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 p-6 md:p-8 border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
          <h4 className="font-outfit text-lg font-black text-slate-900 select-none">A Continuing Mission</h4>
          <p className="mt-3 text-slate-600 font-sans text-xs md:text-sm leading-relaxed font-normal">
            Today, St. Ann’s College for Women stands as a testament to the power of visionary education. We remain dedicated to the noble cause of uplifting women, ensuring that every student who walks through our gates graduates not only with a degree but with the values and skills to lead a meaningful life.
          </p>
        </div>

      </div>
    </div>
  );
}
