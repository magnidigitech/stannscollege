"use client";

import React, { useState } from "react";
import { ShieldCheck, Award, Leaf, HeartHandshake, ExternalLink, X, CheckCircle2 } from "lucide-react";

export default function AccreditationsStrip() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const accreditations = [
    {
      id: "naac",
      title: "NAAC Grade A+",
      subtitle: "First Cycle Peer Team Grade",
      icon: ShieldCheck,
      badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      description: "St. Ann's College for Women earned the premier NAAC 'A+' Grade in its first assessment cycle, validating higher standards in pedagogy, infrastructure, research output, and student governance.",
      highlights: [
        "CGPA benchmark of excellence in Guntur district",
        "Outcomes-based learning evaluation framework",
        "Comprehensive Student Satisfaction Surveys (SSS)"
      ]
    },
    {
      id: "aicte",
      title: "AICTE Approved",
      subtitle: "Professional MCA & MBA",
      icon: Award,
      badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      description: "All Postgraduate Professional Programmes (Master of Computer Applications and Master of Business Administration) are officially approved by the All India Council for Technical Education (AICTE), New Delhi.",
      highlights: [
        "Industry-aligned curriculum with IT & Management focus",
        "State-of-the-art computer networks and case study labs",
        "100% placement training and internship assistance"
      ]
    },
    {
      id: "ugc",
      title: "UGC 2(f) Recognized",
      subtitle: "University Grants Commission",
      icon: ShieldCheck,
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      description: "Recognized under Section 2(f) of the UGC Act 1956, authorizing standard degree certification and academic governance.",
      highlights: [
        "Eligible for central academic grants and research development",
        "Strict adherence to national quality indicators",
        "Affiliated to Acharya Nagarjuna University, Guntur"
      ]
    },
    {
      id: "bharatpet",
      title: "Bharatpet Platinum Award",
      subtitle: "Institutional Eminence",
      icon: Award,
      badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      description: "Honored with the prestigious Platinum Level Recognition by Bharatpet for institutional social initiatives and skill development impact.",
      highlights: [
        "Excellence in student leadership & community training",
        "Outstanding industrial partner outreach",
        "Recognized educational & skill development track"
      ]
    },
    {
      id: "nsf-green",
      title: "NSF Green Campus Award",
      subtitle: "Nature Science Foundation",
      icon: Leaf,
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      description: "Awarded Green Campus Certification by Nature Science Foundation for eco-friendly solar infrastructure, rainwater harvesting, zero-waste campus management, and botanical conservation.",
      highlights: [
        "Solar energy grid and energy conservation units",
        "Comprehensive green audit & botanical biodiversity",
        "Single-use plastic free campus directive"
      ]
    },
    {
      id: "nsf-social",
      title: "NSF Social Responsibility",
      subtitle: "Nature Science Foundation",
      icon: HeartHandshake,
      badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-300",
      description: "Recognized for exemplary social impact, rural financial literacy drives, blood donation camps, and Mother Gnanamma outreach activities.",
      highlights: [
        "Village adoption & rural community literacy camps",
        "Active NSS & Red Ribbon Club community initiatives",
        "Empowerment programs for rural women and youth"
      ]
    }
  ];

  const selectedAccreditation = accreditations.find((a) => a.id === activeModal);

  return (
    <section className="w-full bg-[#001733] border-y border-indigo-950 py-8 select-none text-white">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex flex-col gap-6">
          {/* Header Strip */}
          <div className="flex items-center justify-between border-b border-indigo-900/50 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                <ShieldCheck className="h-5 w-5 animate-pulse" />
              </span>
              <div>
                <h4 className="font-outfit text-sm font-black uppercase tracking-wider text-indigo-300 leading-none">
                  Accreditations, Approvals & National Honors
                </h4>
                <p className="font-sans text-xs text-slate-400 font-medium mt-1">
                  Validated parameters of institutional eminence, environmental stewardship, and community impact.
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Click any badge to view details
            </span>
          </div>

          {/* Accreditations Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {accreditations.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModal(item.id)}
                className="bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-white/10 rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col items-start justify-between group shadow-sm"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${item.badgeColor}`}>
                    <item.icon className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div>
                  <h5 className="font-outfit text-sm font-black text-white leading-tight group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h5>
                  <p className="font-sans text-[11px] text-slate-400 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedAccreditation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-xl bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${selectedAccreditation.badgeColor}`}>
                <selectedAccreditation.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-outfit text-xl font-black text-white leading-tight">
                  {selectedAccreditation.title}
                </h3>
                <p className="font-sans text-xs text-indigo-300 font-bold uppercase tracking-wider">
                  {selectedAccreditation.subtitle}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-300 leading-relaxed mt-4">
              {selectedAccreditation.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
              <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">
                Key Standards & Compliance
              </span>
              {selectedAccreditation.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 text-xs font-bold transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
