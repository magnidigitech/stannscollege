import React from "react";
import { Award, Clock, Phone, Mail, MapPin, Globe, Calendar, GraduationCap, CheckCircle2, ShieldCheck, Video, Camera } from "lucide-react";

export function BasicInstitutionalInfo() {
  const details = [
    {
      label: "Name of the Institution",
      val: "St. Ann’s College for Women",
      desc: "Comprehensive higher education center for excellence.",
      icon: GraduationCap,
      color: "from-blue-50 to-indigo-50/30 border-blue-100/60"
    },
    {
      label: "Category of Institution",
      val: "Private Unaided Women’s College",
      desc: "Tailored to academic & career distinction.",
      icon: Award,
      color: "from-purple-50 to-pink-50/30 border-purple-100/60"
    },
    {
      label: "Management",
      val: "Run by The Society of St. Anne",
      desc: "Decades of dedicated women's empowerment.",
      icon: CheckCircle2,
      color: "from-teal-50 to-emerald-50/30 border-teal-100/60"
    },
    {
      label: "Type of Institution",
      val: "Catholic Christian Minority Institution",
      desc: "Upholding high moral and professional standards.",
      icon: ShieldCheck,
      color: "from-rose-50 to-orange-50/30 border-rose-100/60"
    },
    {
      label: "Affiliation",
      val: "Affiliated to Acharya Nagarjuna University",
      desc: "Permanently affiliated and strictly regulated.",
      icon: Award,
      color: "from-cyan-50 to-indigo-50/30 border-cyan-100/60"
    }
  ];

  return (
    <div className="flex flex-col gap-12 font-sans select-none animate-fadeIn">
      {/* Banner Component Card with Badge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001730] via-[#002147] to-[#1e1b4b] p-6 md:p-10 text-white shadow-xl border border-indigo-950/20 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase">
              <GraduationCap className="h-3.5 w-3.5" /> Institutional Blueprint
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Basic Institutional Information
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              Official profiles, legal mandates, and recognized affiliations of St. Ann&apos;s College for Women.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Award className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* Primary Characteristics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        {details.map((card, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 p-5 bg-gradient-to-br ${card.color} border border-slate-200/60 hover:border-indigo-400/30 hover:bg-white hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 rounded-2xl transition-all duration-300 cursor-default group`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/50 text-indigo-600 shadow-sm group-hover:scale-105 transition-all">
              <card.icon className="h-4 w-4" />
            </span>
            <div>
              <span className="text-xs font-black text-indigo-600/80 tracking-widest uppercase">
                {card.label}
              </span>
              <p className="font-outfit text-base font-black text-slate-800 tracking-tight leading-snug mt-0.5">
                {card.val}
              </p>
              <p className="font-sans text-xs font-semibold text-slate-400 mt-0.5 leading-normal">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recognitions & Accreditations Block */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 select-none">
          Approvals, Recognitions & Accreditations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">AICTE Approved</span>
              <p className="mt-1 font-sans text-xs md:text-sm text-slate-600 font-normal leading-relaxed">
                Full technical and administrative authorization for professional Postgraduate Programs.
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">UGC Recognition</span>
              <p className="mt-1 font-sans text-xs md:text-sm text-slate-600 font-normal leading-relaxed">
                Formally recognized under Section 2(f) of the UGC Act, 1956, New Delhi.
              </p>
            </div>
          </div>
          <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">NAAC Accredited</span>
              <p className="mt-1 font-sans text-xs md:text-sm text-slate-600 font-normal leading-relaxed">
                Graded &apos;A&apos; in its very first accreditation cycle, verifying high pedagogy standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Addresses & Logistics Card */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-200 transition-all duration-300 select-none">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 border border-indigo-100 shadow-sm">
            <Phone className="h-5 w-5 animate-pulse" />
          </span>
          <div>
            <h3 className="font-outfit text-xl font-black text-slate-800 leading-tight">
              Contact Channels & Location
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Quick Assistance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex items-start gap-4 p-4 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 rounded-2xl transition-all">
            <MapPin className="h-5 w-5 text-indigo-600 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Campus Address</span>
              <p className="font-sans text-sm md:text-base font-bold text-slate-700 mt-1 leading-relaxed">
                D.No. 10-209/2, Amaravathi Road,<br />
                Gorantla, Guntur – 522034,<br />
                Andhra Pradesh, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 rounded-2xl transition-all">
            <Clock className="h-5 w-5 text-indigo-600 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Office Timings</span>
              <p className="font-sans text-sm md:text-base font-bold text-slate-700 mt-1">
                9:00 AM – 4:30 PM
              </p>
              <p className="font-sans text-xs font-semibold text-slate-400 mt-0.5">
                Excludes standard public holidays
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 rounded-2xl transition-all">
            <Phone className="h-5 w-5 text-indigo-600 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Contact Numbers</span>
              <p className="font-sans text-sm md:text-base font-bold text-slate-700 mt-1 leading-normal">
                0863-2236470<br />
                73821 04655<br />
                85506 56134
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 rounded-2xl transition-all">
            <Mail className="h-5 w-5 text-indigo-600 mt-1 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Email & Digital</span>
              <p className="font-sans text-sm md:text-base font-bold text-slate-700 mt-1">
                st_anns_coll@yahoo.co.in
              </p>
              <p className="font-sans text-xs font-semibold text-slate-400 mt-0.5 leading-normal">
                General administration and student support
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Link & Social Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50/60 border border-slate-100/80 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all">
            <Globe className="h-4 w-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Website</span>
              <p className="font-sans text-xs font-semibold text-slate-700 mt-0.5 break-all select-none">
                www.stannscollegeforwomen.ac.in
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/60 border border-slate-100/80 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all">
            <Video className="h-4 w-4 text-rose-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">YouTube</span>
              <p className="font-sans text-xs font-semibold text-slate-700 mt-0.5 select-none leading-tight">
                St Ann’s College for Women, Guntur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/60 border border-slate-100/80 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all">
            <Camera className="h-4 w-4 text-pink-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Instagram</span>
              <p className="font-sans text-xs font-semibold text-slate-700 mt-0.5 select-none">
                @stannscollegeforwomengnt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
