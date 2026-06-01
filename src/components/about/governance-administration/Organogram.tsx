"use client";

import { ShieldCheck, Award, GraduationCap, CheckCircle, Landmark, Users, ArrowDown, ChevronRight, Workflow } from "lucide-react";

export function Organogram() {
  const leadershipLevels = [
    {
      title: "I. Leadership & Policy Framework",
      desc: "Top-tier governance focusing on strategic planning and long-term vision.",
      items: [
        { name: "Governing Body", role: "Apex authority responsible for policy formulation and development." },
        { name: "President", role: "Provides overarching vision, leadership, and regulatory alignment." },
        { name: "Secretary", role: "Primary administrative bridge between management and the institution." },
        { name: "Correspondent", role: "Supervises statutory compliance and administrative affairs." }
      ]
    },
    {
      title: "II. Executive & Academic Administration",
      desc: "Daily operational efficiency and execution of policies.",
      items: [
        { name: "Principal", role: "Academic & Administrative head leading quality enhancement initiatives." },
        { name: "Vice-Principal", role: "Oversees day-to-day operations and acts in absence of Principal." }
      ]
    }
  ];

  const functionalWings = [
    {
      title: "Internal Quality Assurance Cell (IQAC)",
      desc: "Backbone of institutional quality benchmarked against global standards.",
      points: [
        "Continuous monitoring of academic and administrative metrics.",
        "Promoting best practices campus-wide.",
        "Spearheading accreditation processes (NAAC & NIRF)."
      ]
    },
    {
      title: "Academic Leadership & Faculty",
      desc: "Driven by HODs and faculty to maintain academic excellence.",
      points: [
        "Curriculum delivery oversight and academic rigor.",
        "Teaching-learning process optimization.",
        "Student mentoring and research initiatives."
      ]
    },
    {
      title: "College Development Committee (CDC)",
      desc: "Planning hub for scaling operations and strategic growth.",
      points: [
        "Long-term institutional planning.",
        "Infrastructure expansion and mobilization.",
        "Strategic scaling of facilities for evolving needs."
      ]
    },
    {
      title: "Specialized Committees & Cells",
      desc: "Holistic student development beyond the classroom.",
      points: [
        "Convenors direct Anti-Ragging and Grievance cells.",
        "Enforcing safety, inclusiveness, and equity standards.",
        "Student career advancement and cultural cells."
      ]
    },
    {
      title: "Administrative & Support Services",
      desc: "Efficient daily logistical flow and campus upkeep.",
      points: [
        "Financial accounts and budget reporting.",
        "Student database and records management.",
        "General campus upkeep and logistical maintenance."
      ]
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
              <Workflow className="h-3.5 w-3.5" /> Governance & Framework
            </span>
            <h2 className="mt-4 font-outfit text-2xl md:text-3xl font-black tracking-tight leading-tight select-none">
              Institutional Organogram
            </h2>
            <p className="mt-2 text-indigo-100/80 text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              St. Ann’s College for Women maintains a robust governance framework emphasizing <strong className="text-white font-bold">decentralization</strong>, <strong className="text-white font-bold">accountability</strong>, and <strong className="text-white font-bold">participative management</strong>.
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner">
            <Workflow className="h-6 w-6 animate-pulse" />
          </span>
        </div>
      </div>

      {/* High-End Visual Hierarchical Chart */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-8 flex items-center gap-2 select-none">
          <Landmark className="h-5 w-5 text-indigo-600" /> Organizational Flow
        </h4>

        {/* Level 1 down to level 6 flow */}
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto text-center">
          {/* Box 1 */}
          <div className="w-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-4 rounded-2xl shadow-md border border-indigo-500/30">
            <h5 className="font-outfit font-black text-sm md:text-base leading-tight uppercase tracking-wider">
              Governing Body
            </h5>
            <p className="text-xs text-indigo-100 mt-1 font-medium">Apex Policy Formulation</p>
          </div>
          <ArrowDown className="h-5 w-5 text-slate-300" />

          {/* Box 2 */}
          <div className="w-4/5 bg-white border border-indigo-100 text-indigo-900 p-3.5 rounded-2xl shadow-sm hover:shadow transition-all">
            <h5 className="font-outfit font-bold text-sm md:text-base leading-tight">President</h5>
            <p className="text-xs text-indigo-600/70 mt-0.5 font-bold">Vision & Overarching Governance</p>
          </div>
          <ArrowDown className="h-5 w-5 text-slate-300" />

          {/* Box 3 */}
          <div className="w-4/5 bg-white border border-indigo-100 text-indigo-900 p-3.5 rounded-2xl shadow-sm hover:shadow transition-all">
            <h5 className="font-outfit font-bold text-sm md:text-base leading-tight">Secretary</h5>
            <p className="text-xs text-indigo-600/70 mt-0.5 font-bold">Administrative Liaison & Decision Maker</p>
          </div>
          <ArrowDown className="h-5 w-5 text-slate-300" />

          {/* Box 4 */}
          <div className="w-4/5 bg-white border border-indigo-100 text-indigo-900 p-3.5 rounded-2xl shadow-sm hover:shadow transition-all">
            <h5 className="font-outfit font-bold text-sm md:text-base leading-tight">Correspondent</h5>
            <p className="text-xs text-indigo-600/70 mt-0.5 font-bold">Statutory Compliance & Operations</p>
          </div>
          <ArrowDown className="h-5 w-5 text-slate-300" />

          {/* Box 5 */}
          <div className="w-4/5 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 text-indigo-950 p-4 rounded-2xl shadow-sm hover:shadow transition-all">
            <h5 className="font-outfit font-black text-sm md:text-base leading-tight">Principal</h5>
            <p className="text-xs text-indigo-700 mt-0.5 font-bold">Academic Head & Quality Drives</p>
          </div>
          <ArrowDown className="h-5 w-5 text-slate-300" />

          {/* Box 6 */}
          <div className="w-3/4 bg-white border border-indigo-100 text-indigo-900 p-3.5 rounded-2xl shadow-sm hover:shadow transition-all mb-4">
            <h5 className="font-outfit font-bold text-sm md:text-base leading-tight">Vice-Principal</h5>
            <p className="text-xs text-indigo-600/70 mt-0.5 font-bold">Daily Supervision & Admin Support</p>
          </div>
        </div>

        {/* Final Horizontal Branch Row */}
        <div className="border-t border-slate-200 pt-8 mt-2 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start text-center select-none">
            
            {/* Column 1: IQAC */}
            <div className="flex flex-col items-center gap-3 h-full">
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0 animate-bounce" />
              <div className="w-full p-4 bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-700 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  IQAC
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  Internal Quality Assurance Cell
                </p>
              </div>
            </div>

            {/* Column 2: HODs & Faculty */}
            <div className="flex flex-col items-center gap-3">
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0 animate-bounce" />
              <div className="w-full p-4 bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-700 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  HODs
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  Heads of Departments
                </p>
              </div>
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0" />
              <div className="w-full p-4 bg-white border border-indigo-100/80 hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-900 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  Faculty
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  Teaching Staff & Educators
                </p>
              </div>
            </div>

            {/* Column 3: CDC & Convenors of the Committees */}
            <div className="flex flex-col items-center gap-3">
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0 animate-bounce" />
              <div className="w-full p-4 bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-700 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  CDC
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  College Development Committee
                </p>
              </div>
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0" />
              <div className="w-full p-4 bg-white border border-indigo-100/80 hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-900 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  Convenors of the Committees
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  Cell & Statutory Chairpersons
                </p>
              </div>
            </div>

            {/* Column 4: Administrative Staff & Supporting Staff */}
            <div className="flex flex-col items-center gap-3">
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0 animate-bounce" />
              <div className="w-full p-4 bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-700 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  Administrative Staff
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  Office & Operations Management
                </p>
              </div>
              <ArrowDown className="h-4 w-4 text-indigo-400 shrink-0" />
              <div className="w-full p-4 bg-white border border-indigo-100/80 hover:shadow-md rounded-2xl transition-all duration-300">
                <span className="font-outfit font-black text-indigo-900 block text-xs md:text-sm uppercase tracking-wider mb-1">
                  Supporting Staff
                </span>
                <p className="text-[10px] md:text-xs text-slate-400 font-semibold leading-tight">
                  Technical & Auxiliary Services
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Narrative Section: Leadership Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {leadershipLevels.map((level, index) => (
          <div key={index} className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <h4 className="font-outfit text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-2 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-600" /> {level.title}
              </h4>
              <p className="text-slate-500 text-xs md:text-sm font-medium mb-5">
                {level.desc}
              </p>
              <div className="flex flex-col gap-3">
                {level.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-bold text-sm text-indigo-600 flex items-center gap-1.5 leading-tight">
                      <ChevronRight className="h-4 w-4 shrink-0" />
                      {item.name}
                    </span>
                    <span className="text-xs md:text-sm font-normal text-slate-500 leading-relaxed pl-5">
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Narrative Section: Functional Wings */}
      <div className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all">
        <h4 className="font-outfit text-xl font-black text-slate-800 border-b border-slate-100 pb-3 mb-2 flex items-center gap-2">
          <Workflow className="h-5 w-5 text-indigo-600" /> III. Functional Wings & Responsibilities
        </h4>
        <p className="text-slate-500 text-xs md:text-sm font-medium mb-6">
          Daily continuous management ensures smooth academic and operational efficiency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {functionalWings.map((wing, index) => (
            <div key={index} className="p-5 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-md rounded-2xl transition-all duration-300">
              <h5 className="font-outfit font-black text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                {wing.title}
              </h5>
              <p className="text-xs text-indigo-600 mt-1 font-bold leading-tight">
                {wing.desc}
              </p>
              <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-slate-100/80">
                {wing.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs md:text-sm font-normal text-slate-600 leading-relaxed">
                    <CheckCircle className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance Philosophy Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
        <div>
          <h4 className="font-outfit text-lg md:text-xl font-black text-indigo-300 border-b border-indigo-800/80 pb-3 mb-6 flex items-center gap-2">
            <Award className="h-5 w-5" /> IV. Governance Philosophy
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-outfit font-bold text-white text-base mb-1.5 flex items-center gap-2">
                Decentralization
              </h5>
              <p className="text-indigo-100/80 text-xs md:text-sm leading-relaxed font-normal">
                Bottom-up management approach empowering HODs and Committee Convenors to take fully operational decisions, fostering a sense of ownership.
              </p>
            </div>
            <div>
              <h5 className="font-outfit font-bold text-white text-base mb-1.5 flex items-center gap-2">
                Participative Management
              </h5>
              <p className="text-indigo-100/80 text-xs md:text-sm leading-relaxed font-normal">
                Academic scheduling, strategic events, and infrastructural additions are planned collectively through consultations with IQAC and CDC.
              </p>
            </div>
            <div>
              <h5 className="font-outfit font-bold text-white text-base mb-1.5 flex items-center gap-2">
                Accountability
              </h5>
              <p className="text-indigo-100/80 text-xs md:text-sm leading-relaxed font-normal">
                An absolute reporting hierarchy ensures responsibilities are well-defined and monitored continuously to maintain excellent standards of higher education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
