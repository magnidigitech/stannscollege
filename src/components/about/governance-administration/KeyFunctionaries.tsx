"use client";

import { ShieldCheck, Award, GraduationCap, CheckCircle, Award as Medal, Sparkles } from "lucide-react";

export function KeyFunctionaries() {
  const functionaries = [
    {
      title: "President",
      name: "Rev. Mother Anthonyamma Pyyreddy",
      role: "Superior General & President of Schools and Colleges",
      image: "/images/key-functionaries/president.jpg",
      profile: "Rev. Mother Anthonyamma Pyyreddy is a visionary leader and a cornerstone of the Society of St. Anne (SSA). Since 2016, she has served with distinction as the Superior General, providing spiritual and administrative guidance to the congregation. In her dual role as the President of Schools and Colleges, Mother Anthonyamma has been instrumental in shaping the academic excellence and holistic development of our educational institutions.",
      details: "With a deep-seated commitment to service and a forward-thinking approach to leadership, she has spearheaded numerous initiatives that blend traditional values with modern educational standards. Her tenure is marked by a profound dedication to empowering the youth through quality education and nurturing a compassionate, value-based environment for both students and faculty alike. Under her stewardship, the Society continues to expand its mission of transformative service, fostering a legacy of integrity, wisdom, and social responsibility."
    },
    {
      title: "Secretary",
      name: "Dr. Sr. Thumma Theresamma",
      role: "Provincial Superior & Secretary",
      image: "/images/key-functionaries/secretary.jpg",
      profile: "Dr. Sr. Thumma Theresamma is a distinguished academician and a visionary leader who currently serves as the Provincial Superior of the Guntur Province (CSSA). With a career spanning over three decades, she has become a cornerstone of nursing education and administrative excellence in India. Her academic journey is marked by extraordinary brilliance, beginning with her B.Sc. in Nursing from Osmania University, where she was an eight-time Gold Medalist and the prestigious recipient of the President’s Medal.",
      details: "As a seasoned administrator, Dr. Sr. Theresamma has dedicated 30 years to shaping future healthcare professionals, serving notably as the Principal and Professor at St. Ann's College of Nursing for 20 years and Nava Chaitanya Nursing School for a decade. Recognized for her compassion and professional rigor, she has been honored with the Florence Nightingale Award, the Jewel of India Award, and the Best Teacher Award."
    },
    {
      title: "Correspondent",
      name: "Rev. Dr. Sr. Fatima Rani P.",
      role: "Correspondent & Chairperson of IQAC",
      image: "/images/key-functionaries/correspondent.jpg",
      profile: "Dr. Sr. Fatima Rani. P is an eminent academician, a dedicated social worker, and a visionary administrator who currently serves as the Correspondent of St. Ann’s Degree and PG College, Gorantla. With a profound academic background including a Ph.D. in English, M.Phil, and M.A. Litt., she has devoted over four decades to the mission of education and administrative leadership.",
      details: "Her dynamic guidance as the Chairperson of IQAC, St. Ann’s College for Women, Gorantla, led the institution to receive its prestigious 'A' Grade from NAAC in its first cycle (2024). Her contributions have been recognized through numerous national and regional honors, including the Rajiv Gandhi Award for Best Principal and the Lady Legend Inspiration Award."
    }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Dark Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Leadership & Vision
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Key Functionaries
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              The administrative success of St. Ann’s College for Women rests on the dedication of our spiritual leaders, distinguished academicians, and visionary administrators.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Functionaries Detail List */}
      <div className="flex flex-col gap-12">
        {functionaries.map((person, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 p-6 md:p-10"
          >
            {/* Image / Card portion */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative group overflow-hidden rounded-2xl border border-slate-100/80 shadow-md aspect-[4/5] w-full max-w-[300px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-6 text-center select-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                  {person.title}
                </span>
                <h4 className="font-outfit text-xl font-black text-slate-800 leading-tight">
                  {person.name}
                </h4>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide leading-relaxed">
                  {person.role}
                </p>
              </div>
            </div>

            {/* Narrative / Details portion */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-outfit text-xl md:text-2xl font-black text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Medal className="h-5 w-5 text-indigo-600" /> Leadership Profile
              </h4>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
                {person.profile}
              </p>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                {person.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
