"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, GraduationCap, Users, Building, ShieldCheck } from "lucide-react";

export default function Navigation() {
  const [openMegaMenu, setOpenMegaMenu] = useState(false);

  const categories = [
    {
      title: "I. The Institution",
      icon: Building,
      items: [
        "Basic Institutional Information",
        "History of the College",
        "Vision, Mission, and Core Values",
        "Institutional Awards & Recognitions",
        "Student Laurels",
        "Institutional Distinctiveness",
        "Head of the Institution",
      ],
    },
    {
      title: "II. Statutory Affiliations & Recognitions",
      icon: ShieldCheck,
      items: [
        "APSCHE Orders",
        "ANU Affiliation Orders (UG & PG)",
        "AICTE Approvals",
        "UGC 2(f)",
        "AISHE Certificates",
        "NAAC Accreditation",
        "NIRF",
      ],
    },
    {
      title: "III. Governance & Administration",
      icon: Users,
      items: [
        "Governing Body",
        "Organogram",
        "Key Functionaries & IQAC",
        "Statutory & Non-Statutory Committees",
        "Institutional Policies",
        "Strategic Development Plan",
        "Code of Conduct",
      ],
    },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm text-slate-600 relative select-none">
      <Link href="/" className="hover:text-indigo-600 transition-all duration-200">
        Home
      </Link>

      {/* About Us Mega Menu Trigger */}
      <div 
        className="relative flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-all duration-200 h-20"
        onMouseEnter={() => setOpenMegaMenu(true)}
        onMouseLeave={() => setOpenMegaMenu(false)}
      >
        <span className="font-semibold text-sm text-slate-600 hover:text-indigo-600 select-none">
          About Us
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openMegaMenu ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />

        {/* Mega Menu Contents */}
        {openMegaMenu && (
          <div className="absolute top-[80px] left-[-150px] md:left-[-350px] w-[900px] bg-white border border-slate-200/60 shadow-2xl shadow-indigo-100/50 rounded-3xl p-8 z-50 grid grid-cols-3 gap-8 cursor-default">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/50 text-indigo-600 shadow-sm">
                    <cat.icon className="h-4 w-4" />
                  </span>
                  <h4 className="font-outfit font-black text-slate-800 text-sm leading-tight">
                    {cat.title}
                  </h4>
                </div>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/about?category=${encodeURIComponent(cat.title)}&item=${encodeURIComponent(item)}`}
                      className="text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50/60 px-3 py-1.5 rounded-lg transition-all"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/courses" className="hover:text-indigo-600 transition-all duration-200">
        Courses
      </Link>
      <Link href="/admission" className="hover:text-indigo-600 transition-all duration-200">
        Admissions
      </Link>
      <Link href="/contact" className="hover:text-indigo-600 transition-all duration-200">
        Contact
      </Link>

      <Link 
        href="/admission" 
        className="rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-6 py-2.5 font-bold text-white text-xs hover:shadow-xl hover:shadow-indigo-100 transition-all active:scale-95 duration-300 hover:-translate-y-0.5"
      >
        Apply Now
      </Link>
    </nav>
  );
}
