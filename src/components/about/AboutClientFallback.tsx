"use client";

import React, { useState } from "react";
import { Building, ShieldCheck, Users, X, Sparkles, ChevronRight, Award } from "lucide-react";

// Section component imports
import { BasicInstitutionalInfo } from "@/components/about/the-institution/BasicInstitutionalInfo";
import { HistoryOfTheCollege } from "@/components/about/the-institution/HistoryOfTheCollege";
import { VisionMissionCoreValues } from "@/components/about/the-institution/VisionMissionCoreValues";
import { InstitutionalAwards } from "@/components/about/the-institution/InstitutionalAwards";
import { StudentLaurels } from "@/components/about/the-institution/StudentLaurels";
import { InstitutionalDistinctiveness } from "@/components/about/the-institution/InstitutionalDistinctiveness";
import { HeadOfTheInstitution } from "@/components/about/the-institution/HeadOfTheInstitution";

import { StatutoryAffiliations } from "@/components/about/StatutoryAffiliations";
import { GovernanceAdministration } from "@/components/about/GovernanceAdministration";
import { ApscheOrders } from "@/components/about/statutory-affiliations-recognitions/ApscheOrders";
import { AnuAffiliations } from "@/components/about/statutory-affiliations-recognitions/AnuAffiliations";
import { AicteApprovals } from "@/components/about/statutory-affiliations-recognitions/AicteApprovals";
import { NirfReports } from "@/components/about/statutory-affiliations-recognitions/NirfReports";
import { NaacCertificates } from "@/components/about/statutory-affiliations-recognitions/NaacCertificates";
import { AisheCertifications } from "@/components/about/statutory-affiliations-recognitions/AisheCertifications";

interface AboutClientFallbackProps {
  apscheOrdersList: any[];
  anuAffiliationsList: any[];
  aicteApprovalsList: any[];
  nirfReportsList: any[];
  naacCertificatesList: any[];
  aisheCertificationsList: any[];
}

export default function AboutClientFallback({
  apscheOrdersList,
  anuAffiliationsList,
  aicteApprovalsList,
  nirfReportsList,
  naacCertificatesList,
  aisheCertificationsList
}: AboutClientFallbackProps) {
  const [activeModal, setActiveModal] = useState<{ catSlug: string; itemSlug: string; text: string } | null>(null);

  const categories = [
    {
      catSlug: "the-institution",
      title: "I. The Institution",
      description: "Our history, core values, distinctive character, and visionary path since 1997.",
      icon: Building,
      items: [
        { text: "Basic Institutional Information", slug: "basic-institutional-information" },
        { text: "History of the College", slug: "history-of-the-college" },
        { text: "Vision, Mission, and Core Values", slug: "vision-mission-and-core-values" },
        { text: "Institutional Awards & Recognitions", slug: "institutional-awards-recognitions" },
        { text: "Student Laurels", slug: "student-laurels" },
        { text: "Institutional Distinctiveness", slug: "institutional-distinctiveness" },
        { text: "Head of the Institution", slug: "head-of-the-institution" },
      ],
    },
    {
      catSlug: "statutory-affiliations-recognitions",
      title: "II. Statutory Affiliations & Recognitions",
      description: "Accreditation, official recognition, and statutory compliance frameworks.",
      icon: ShieldCheck,
      items: [
        { text: "APSCHE Orders", slug: "apsche-orders" },
        { text: "ANU Affiliation Orders (UG & PG)", slug: "anu-affiliation-orders-ug-pg" },
        { text: "AICTE Approvals", slug: "aicte-approvals" },
        { text: "UGC 2(f)", slug: "ugc-2f" },
        { text: "AISHE Certificates", slug: "aishe-certificates" },
        { text: "NAAC Accreditation", slug: "naac-accreditation" },
        { text: "NIRF", slug: "nirf" },
      ],
    },
    {
      catSlug: "governance-administration",
      title: "III. Governance & Administration",
      description: "Our governing body, administration policies, functions, and key committees.",
      icon: Users,
      items: [
        { text: "Governing Body", slug: "governing-body" },
        { text: "Organogram", slug: "organogram" },
        { text: "Key Functionaries & IQAC", slug: "key-functionaries-iqac" },
        { text: "Statutory & Non-Statutory Committees", slug: "statutory-non-statutory-committees" },
        { text: "Institutional Policies", slug: "institutional-policies" },
        { text: "Strategic Development Plan", slug: "strategic-development-plan" },
        { text: "Code of Conduct", slug: "code-of-conduct" },
      ],
    },
  ];

  const openModal = (catSlug: string, itemSlug: string, text: string) => {
    setActiveModal({ catSlug, itemSlug, text });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Logic to dynamically render the corresponding page component inside the Popup Modal
  const renderPopupContent = () => {
    if (!activeModal) return null;

    const { catSlug, itemSlug } = activeModal;

    if (catSlug === "the-institution") {
      switch (itemSlug) {
        case "basic-institutional-information": return <BasicInstitutionalInfo />;
        case "history-of-the-college": return <HistoryOfTheCollege />;
        case "vision-mission-and-core-values": return <VisionMissionCoreValues />;
        case "institutional-awards-recognitions": return <InstitutionalAwards />;
        case "student-laurels": return <StudentLaurels />;
        case "institutional-distinctiveness": return <InstitutionalDistinctiveness />;
        case "head-of-the-institution": return <HeadOfTheInstitution />;
        default: return <p className="text-slate-500 font-sans p-4">Component not found.</p>;
      }
    }

    if (catSlug === "statutory-affiliations-recognitions") {
      switch (itemSlug) {
        case "apsche-orders": return <ApscheOrders apscheOrders={apscheOrdersList} />;
        case "anu-affiliation-orders-ug-pg": return <AnuAffiliations anuAffiliations={anuAffiliationsList} />;
        case "aicte-approvals": return <AicteApprovals aicteApprovals={aicteApprovalsList} />;
        case "nirf": return <NirfReports nirfReports={nirfReportsList} />;
        case "naac-accreditation":
        case "naac-certificates": return <NaacCertificates naacCertificates={naacCertificatesList} />;
        case "aishe-certificates":
        case "aishe-mhrd": return <AisheCertifications aisheCertifications={aisheCertificationsList} />;
        default: return <StatutoryAffiliations itemSlug={itemSlug} />;
      }
    }

    if (catSlug === "governance-administration") {
      return <GovernanceAdministration itemSlug={itemSlug} />;
    }

    return <p className="text-slate-500 font-sans p-4">Section component not found.</p>;
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 md:py-20 select-none font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Banner Section */}
        <div className="max-w-4xl text-left mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 px-4 py-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider shadow-sm select-none">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" /> Continuous Excellence
          </span>
          <h1 className="mt-6 font-outfit text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1] md:leading-[1.1]">
            About St. Ann&apos;s College
          </h1>
          <p className="mt-4 font-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
            Explore our heritage, regulatory details, and administrative structures across three core pillars. Click any individual page to view full details instantly in a popup view.
          </p>
        </div>

        {/* Banner image for About page */}
        <div className="relative w-full h-[320px] md:h-[450px] mb-16 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md select-none">
          <img 
            src="/images/about/cbnew2.webp" 
            alt="About St. Ann's College" 
            className="w-full h-full object-cover select-none hover:scale-[1.01] transition-all duration-500"
          />
        </div>

        {/* 3 Columns Section Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            return (
              <div
                key={cat.catSlug}
                className="bg-white border border-slate-200/60 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-100/60 transition-all duration-300 flex flex-col gap-6 relative"
              >
                {/* Column header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#002147] to-[#003875] text-white shadow-md">
                      <CatIcon className="h-6 w-6" />
                    </span>
                    <h3 className="font-outfit text-xl font-black text-slate-800 leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed min-h-[40px]">
                    {cat.description}
                  </p>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                {/* Sub items list inside column */}
                <div className="flex flex-col gap-2">
                  {cat.items.map((item, idx) => (
                    <button
                      key={item.slug}
                      onClick={() => openModal(cat.catSlug, item.slug, item.text)}
                      className="group flex items-center justify-between text-left p-3.5 bg-slate-50/40 hover:bg-[#002147]/5 hover:border-[#002147]/20 border border-slate-100/60 rounded-2xl transition-all duration-300 select-none cursor-pointer"
                    >
                      <span className="font-sans text-xs md:text-sm font-semibold text-slate-700 group-hover:text-[#002147] transition-colors">
                        {item.text}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#002147] group-hover:translate-x-0.5 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PopUp Window Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative max-h-[92vh] flex flex-col animate-scaleUp">
            {/* Header / Banner in the Popup - Styled with St. Ann's Branding */}
            <div className="relative bg-[#002147] px-6 py-4 text-white flex items-center justify-between border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-4">
                <img
                  src="/images/collegelogo.png"
                  alt="St. Ann's Logo"
                  className="h-12 w-auto object-contain select-none bg-white rounded-xl p-1 shadow-sm"
                />
                <div className="h-8 w-px bg-white/20 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="font-outfit text-sm md:text-lg font-black tracking-tight leading-tight select-none uppercase text-white">
                    St. Ann&apos;s College for Women
                  </span>
                  <span className="font-sans text-[10px] md:text-xs font-semibold text-slate-300 tracking-wide select-none">
                    Run by the Society of St Anne
                  </span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 hover:scale-105 transition-all active:scale-95 duration-200"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Popup content - with scrolling */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/40">
              {renderPopupContent()}
            </div>

            {/* Modal action footer */}
            <div className="border-t border-slate-100 p-5 bg-white flex justify-end flex-shrink-0">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 duration-200"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
