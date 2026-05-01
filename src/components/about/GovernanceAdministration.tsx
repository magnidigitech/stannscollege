"use client";

import { useState } from "react";
import { GoverningBody } from "./governance-administration/GoverningBody";
import { Organogram } from "./governance-administration/Organogram";
import { KeyFunctionaries } from "./governance-administration/KeyFunctionaries";
import { Iqac } from "./governance-administration/Iqac";
import { StatutoryCommittees } from "./governance-administration/StatutoryCommittees";
import { InstitutionalPolicies } from "./governance-administration/InstitutionalPolicies";
import { CodeOfConduct } from "./governance-administration/CodeOfConduct";
import { ShieldCheck, Sparkles, UserCheck } from "lucide-react";

export function GovernanceAdministration({ itemSlug }: { itemSlug: string }) {
  const [activeTab, setActiveTab] = useState<"functionaries" | "iqac">("functionaries");

  if (itemSlug === "governing-body") {
    return <GoverningBody />;
  }

  if (itemSlug === "organogram") {
    return <Organogram />;
  }

  if (itemSlug === "key-functionaries-iqac") {
    return (
      <div className="flex flex-col gap-6 select-none">
        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl max-w-md border border-slate-200/40 select-none">
          <button
            onClick={() => setActiveTab("functionaries")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeTab === "functionaries"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserCheck className="h-4 w-4" /> Key Functionaries
          </button>
          <button
            onClick={() => setActiveTab("iqac")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all ${
              activeTab === "iqac"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="h-4 w-4" /> IQAC
          </button>
        </div>

        {activeTab === "functionaries" && <KeyFunctionaries />}
        {activeTab === "iqac" && <Iqac />}
      </div>
    );
  }

  if (itemSlug === "statutory-non-statutory-committees") {
    return <StatutoryCommittees />;
  }

  if (itemSlug === "institutional-policies") {
    return <InstitutionalPolicies />;
  }

  if (itemSlug === "code-of-conduct") {
    return <CodeOfConduct />;
  }

  const defaultDetails: Record<string, { title: string; desc: string }> = {
    "key-functionaries-iqac": {
      title: "Key Functionaries & IQAC",
      desc: "Our Internal Quality Assurance Cell (IQAC) coordinates all core quality drives across academic and campus affairs. Backed by highly efficient functionaries, it designs and reviews teaching modules to maintain NAAC benchmark excellence."
    },
    "statutory-non-statutory-committees": {
      title: "Statutory & Non-Statutory Committees",
      desc: "The college runs several active committees—such as Anti-Ragging and Grievances—alongside non-statutory wings like Culture and Placement cells to support and uplift students beyond regular classrooms."
    },
    "institutional-policies": {
      title: "Institutional Policies",
      desc: "The administration enforces strict, transparent, and fair internal policies governing staff behavior, continuous evaluation systems, human resources, and all facets of general student code."
    },
    "strategic-development-plan": {
      title: "Strategic Development Plan",
      desc: "Our Strategic Development Plan covers long-term projections for institutional growth, laboratory additions, physical campus expansion, and online curriculum systems."
    },
    "code-of-conduct": {
      title: "Code of Conduct",
      desc: "An official Code of Conduct encourages absolute punctuality, academic honesty, and social decency. Monitored closely, it helps maintain a peaceful, respectful environment for academic and personal growth."
    }
  };

  const active = defaultDetails[itemSlug] || {
    title: "Governance & Administration",
    desc: "Comprehensive oversight, strategic framework development, and policy management directed towards achieving consistent educational excellence."
  };

  return (
    <div className="bg-white border border-slate-200/60 p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all font-sans text-slate-600 text-base md:text-lg leading-relaxed">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6 select-none">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-outfit text-xl font-black text-slate-800 leading-tight">
            {active.title}
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Management Detail</p>
        </div>
      </div>
      <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
        {active.desc}
      </p>
    </div>
  );
}
