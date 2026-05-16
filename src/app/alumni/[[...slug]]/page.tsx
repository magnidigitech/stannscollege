"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Phone, Mail, ArrowRight, ShieldCheck, BookOpen, GraduationCap } from "lucide-react";
import { ContentRenderer } from "@/components/alumni/ContentRenderer";

// Component Imports
import { AlumniHome } from "@/components/alumni/AlumniHome";
import { AboutAlumniAssociation } from "@/components/alumni/AboutAlumniAssociation";
import { AlumniConnect } from "@/components/alumni/AlumniConnect";
import { AlumniDay } from "@/components/alumni/AlumniDay";
import { AlumniEvents } from "@/components/alumni/AlumniEvents";
import { ReUnion } from "@/components/alumni/ReUnion";
import { AlumniGallery } from "@/components/alumni/AlumniGallery";
import { AlumniContact } from "@/components/alumni/AlumniContact";
import { AlumniRegister } from "@/components/alumni/AlumniRegister";
import { AlumniDonate } from "@/components/alumni/AlumniDonate";

const navigationStructure = [
  {
    catSlug: "association",
    title: "I. The Association",
    items: [
      { text: "Home", slug: "home" },
      { text: "About Alumni Association", slug: "about-alumni-association" },
      { text: "Contact Us", slug: "contact-us" },
    ]
  },
  {
    catSlug: "engagement",
    title: "II. Engagement",
    items: [
      { text: "Alumni Connect", slug: "alumni-connect" },
      { text: "Alumni Day", slug: "alumni-day" },
      { text: "Alumni Events", slug: "alumni-events" },
      { text: "Re-Union", slug: "re-union" },
    ]
  },
  {
    catSlug: "media",
    title: "III. Media",
    items: [
      { text: "Gallery", slug: "gallery" },
    ]
  }
];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function AlumniPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pathname = usePathname();

  // Default fallback route
  const currentSlug = resolvedParams?.slug?.[0] || "home";

  // Function to render the appropriate component based on the slug
  const renderContent = () => {
    switch (currentSlug) {
      case "home": return <AlumniHome />;
      case "about-alumni-association": return <AboutAlumniAssociation />;
      case "alumni-connect": return <AlumniConnect />;
      case "alumni-day": return <AlumniDay />;
      case "alumni-events": return <AlumniEvents />;
      case "re-union": return <ReUnion />;
      case "gallery": return <AlumniGallery />;
      case "contact-us": return <AlumniContact />;
      case "register": return <AlumniRegister />;
      case "donate": return <AlumniDonate />;
      default: return <AlumniHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#002147] selection:text-white">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/70 py-5 px-6 sticky top-0 z-30 backdrop-blur-md bg-white/95 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-[#002147]/65 font-sans">
              <Link href="/" className="hover:text-[#002147] hover:underline transition-all">Home</Link>
              <span className="text-slate-350">/</span>
              <span className="hover:text-[#002147] transition-all">Alumni</span>
              <span className="text-slate-350">/</span>
              <span className="text-[#002147]">{currentSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#002147]">
            <div className="flex items-center gap-1.5 bg-[#002147]/5 px-3.5 py-1.5 rounded-full border border-[#002147]/10 shadow-xs">
              <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              Alumni Network Active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* A. Left Sidebar Sticky Navigation */}
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-28 flex flex-col gap-8">
              
              {/* Navigation Box */}
              <div className="bg-white border border-slate-200/70 rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-5 mb-6">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#002147]/60 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-amber-400 shrink-0" /> St. Ann's Alumni
                  </span>
                  <h3 className="font-outfit text-xl md:text-2xl font-black text-[#002147] tracking-tight">IX. Alumni</h3>
                </div>

                <nav className="flex flex-col gap-8">
                  {navigationStructure.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400/90 border-l-2 border-slate-200 pl-2.5 leading-none">
                        {group.title}
                      </h4>
                      <ul className="flex flex-col gap-1.5">
                        {group.items.map((item, i) => {
                          const fullHref = item.slug === 'home' ? '/alumni' : `/alumni/${item.slug}`;
                          const isActive = currentSlug === item.slug;
                          
                          return (
                            <li key={i}>
                              <Link
                                href={fullHref}
                                className={`group w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                                  isActive
                                    ? "bg-[#002147] text-white border-transparent font-bold shadow-md translate-x-1"
                                    : "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-[#002147] border-transparent hover:border-slate-100 hover:translate-x-0.5"
                                }`}
                              >
                                <span className="truncate">{item.text}</span>
                                <ArrowRight className={`h-3.5 w-3.5 shrink-0 transform transition-all ${
                                  isActive ? "opacity-100 translate-x-0" : "opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                                }`} />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Sidebar Contact Card */}
              <div className="bg-gradient-to-br from-[#002147] to-[#0c478a] text-white rounded-[2rem] p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-40 w-40" />
                </div>
                <div className="relative z-10 flex flex-col gap-4 font-sans">
                  <h4 className="font-outfit font-black text-lg tracking-tight">Alumni Support?</h4>
                  <p className="text-blue-100/80 text-xs leading-relaxed font-medium">
                    Connect with the Alumni Association for registrations, reunions, and institutional contributions.
                  </p>
                  <div className="flex flex-col gap-2.5 border-t border-white/10 pt-4 text-xs">
                    <a href="tel:+918632231381" className="flex items-center gap-2.5 hover:text-blue-200 font-black transition-colors">
                      <Phone className="h-4 w-4 text-blue-300" /> +91 863 2231381
                    </a>
                    <a href="mailto:alumni@stannscollege.com" className="flex items-center gap-2.5 hover:text-blue-200 font-black transition-colors">
                      <Mail className="h-4 w-4 text-blue-300" /> alumni@stannscollege.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* B. Right Dynamic Component Content */}
          <main className="lg:col-span-9 xl:col-span-9">
            <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-sm min-h-[500px]">
              {renderContent()}
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}
