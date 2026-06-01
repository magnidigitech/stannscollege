import { Sparkles, Award, Users, CheckCircle, GraduationCap, ArrowRight, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { getFaculty, getAffiliations, getApscheOrders, getAnuAffiliations, getAicteApprovals, getNirfReports, getNaacCertificates, getAisheCertifications } from "@/lib/sanity";

// Modularized individual page components for Category I
import { BasicInstitutionalInfo } from "@/components/about/the-institution/BasicInstitutionalInfo";
import { HistoryOfTheCollege } from "@/components/about/the-institution/HistoryOfTheCollege";
import { VisionMissionCoreValues } from "@/components/about/the-institution/VisionMissionCoreValues";
import { InstitutionalAwards } from "@/components/about/the-institution/InstitutionalAwards";
import { StudentLaurels } from "@/components/about/the-institution/StudentLaurels";
import { InstitutionalDistinctiveness } from "@/components/about/the-institution/InstitutionalDistinctiveness";
import { HeadOfTheInstitution } from "@/components/about/the-institution/HeadOfTheInstitution";
import { LegacyOfLeadership } from "@/components/about/the-institution/LegacyOfLeadership";
import AboutClientFallback from "@/components/about/AboutClientFallback";

import { StatutoryAffiliations } from "@/components/about/StatutoryAffiliations";
import { GovernanceAdministration } from "@/components/about/GovernanceAdministration";
import { ApscheOrders } from "@/components/about/statutory-affiliations-recognitions/ApscheOrders";
import { AnuAffiliations } from "@/components/about/statutory-affiliations-recognitions/AnuAffiliations";
import { AicteApprovals } from "@/components/about/statutory-affiliations-recognitions/AicteApprovals";
import { NirfReports } from "@/components/about/statutory-affiliations-recognitions/NirfReports";
import { NaacCertificates } from "@/components/about/statutory-affiliations-recognitions/NaacCertificates";
import { AisheCertifications } from "@/components/about/statutory-affiliations-recognitions/AisheCertifications";
import { Ugc2f } from "@/components/about/statutory-affiliations-recognitions/Ugc2f";

const categoryMapping: Record<string, string> = {
  "the-institution": "I. The Institution",
  "statutory-affiliations-recognitions": "II. Statutory Affiliations & Recognitions",
  "governance-administration": "III. Governance & Administration"
};

const itemsMapping: Record<string, string> = {
  "basic-institutional-information": "Basic Institutional Information",
  "history-of-the-college": "History of the College",
  "vision-mission-and-core-values": "Vision, Mission, and Core Values",
  "institutional-awards-recognitions": "Institutional Awards & Recognitions",
  "student-laurels": "Student Laurels",
  "institutional-distinctiveness": "Institutional Distinctiveness",
  "head-of-the-institution": "Head of the Institution",
  "legacy-of-leadership": "A Legacy of Leadership",
  "apsche-orders": "APSCHE Orders",
  "anu-affiliation-orders-ug-pg": "ANU Affiliation Orders (UG & PG)",
  "aicte-approvals": "AICTE Approvals",
  "ugc-2f": "UGC 2(f)",
  "aishe-certificates": "AISHE Certificates",
  "naac-accreditation": "NAAC Accreditation",
  "nirf": "NIRF",
  "governing-body": "Governing Body",
  "organogram": "Organogram",
  "key-functionaries-iqac": "Key Functionaries & IQAC",
  "statutory-non-statutory-committees": "Statutory & Non-Statutory Committees",
  "institutional-policies": "Institutional Policies",
  "strategic-development-plan": "Strategic Development Plan",
  "code-of-conduct": "Code of Conduct"
};

function SidebarWidget() {
  return (
    <div className="flex flex-col gap-6 sticky top-24 select-none">
      {/* Visual Identity & Accreditation Badge */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100/10 border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-200 tracking-wider uppercase w-fit">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Certified
          </span>
          <div>
            <h4 className="font-outfit text-xl font-black tracking-tight leading-snug">
              Accredited A+ by NAAC
            </h4>
            <p className="mt-1 text-indigo-200/80 text-xs md:text-sm font-normal leading-relaxed">
              Highest academic compliance & standards in every program of study.
            </p>
          </div>
          <div className="flex items-center gap-2 border-t border-indigo-800/40 pt-4 mt-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 backdrop-blur-md shadow-inner text-xs font-bold">
              AICTE
            </span>
            <span className="font-sans text-xs font-semibold text-indigo-100/80">Approved Professional Programs</span>
          </div>
        </div>
      </div>

      {/* Quick Links & Contact Card */}
      <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm flex flex-col gap-5 hover:shadow-md transition-all">
        <h4 className="font-outfit text-base font-black text-slate-800 border-b border-slate-100 pb-3">
          Quick Contacts
        </h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-indigo-600 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Help Desk</span>
              <p className="font-sans text-sm font-semibold text-slate-700">0863-2236470, 7382104655</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-indigo-600 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Admissions Email</span>
              <p className="font-sans text-sm font-semibold text-slate-700 leading-snug break-all">
                st_anns_coll@yahoo.co.in
              </p>
            </div>
          </div>
        </div>

        <Link href="/admission" className="mt-2 flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm py-3.5 px-4 shadow-md transition-all duration-300">
          Apply Now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;

  const catSlug = slug?.[0];
  const itemSlug = slug?.[1];

  const activeCategory = catSlug ? categoryMapping[catSlug] || catSlug : null;
  const activeItem = itemSlug ? itemsMapping[itemSlug] || itemSlug : null;

  const coreValues = [
    {
      title: "Vision",
      desc: "To be an innovative beacon of academic distinction, cultivating creative problem solvers and ethical leaders who shape the world with compassion and knowledge.",
    },
    {
      title: "Mission",
      desc: "To provide quality, research-infused programs, build high-performance infrastructure, and empower women in all disciplines of arts, commerce, and advanced sciences.",
    },
  ];

  const facultyList = await getFaculty();
  const affiliationsList = await getAffiliations();
  const apscheOrdersList = await getApscheOrders();
  const anuAffiliationsList = await getAnuAffiliations();
  const aicteApprovalsList = await getAicteApprovals();
  const nirfReportsList = await getNirfReports();
  const naacCertificatesList = await getNaacCertificates();
  const aisheCertificationsList = await getAisheCertifications();

  // Dynamic 2-column Grid Layout for Sections to maximize right-hand empty space
  // Dynamic Grid Layout for Sections with Sidebar
  if (catSlug && itemSlug) {
    const categories = [
      {
        catSlug: "the-institution",
        title: "I. The Institution",
        items: [
          { text: "Basic Institutional Information", slug: "basic-institutional-information" },
          { text: "History of the College", slug: "history-of-the-college" },
          { text: "Vision, Mission, and Core Values", slug: "vision-mission-and-core-values" },
          { text: "Institutional Awards & Recognitions", slug: "institutional-awards-recognitions" },
          { text: "Student Laurels", slug: "student-laurels" },
          { text: "Institutional Distinctiveness", slug: "institutional-distinctiveness" },
          { text: "Head of the Institution", slug: "head-of-the-institution" },
          { text: "A Legacy of Leadership", slug: "legacy-of-leadership" },
        ],
      },
      {
        catSlug: "statutory-affiliations-recognitions",
        title: "II. Statutory Affiliations & Recognitions",
        items: [
          { text: "APSCHE Orders", slug: "apsche-orders" },
          { text: "ANU Affiliation Orders", slug: "anu-affiliation-orders-ug-pg" },
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

    return (
      <div className="bg-slate-50/40 min-h-screen py-12 select-none animate-fadeIn">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">

            {/* Desktop Sidebar with All Pages */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24 select-none h-fit max-h-[calc(100vh-140px)] overflow-y-auto bg-white border border-slate-200/60 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 pr-2">
              <span className="inline-flex items-center gap-1.5 font-outfit text-xs font-black text-[#002147] uppercase tracking-wider px-2">
                About Navigation
              </span>
              <div className="flex flex-col gap-6">
                {categories.map((cat) => (
                  <div key={cat.catSlug} className="flex flex-col gap-2">
                    <h4 className="font-outfit text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2 mb-1 px-2 select-none">
                      {cat.title}
                    </h4>
                    <div className="flex flex-col gap-1.5">
                      {cat.items.map((item) => {
                        const isActive = catSlug === cat.catSlug && itemSlug === item.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={`/about/${cat.catSlug}/${item.slug}`}
                            className={`font-sans text-xs md:text-sm p-3 rounded-xl transition-all border border-transparent flex items-center justify-between select-none ${
                              isActive
                                ? 'bg-[#002147]/10 border-[#002147]/30 text-[#002147] font-bold shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50/60 hover:text-[#002147] font-medium'
                            }`}
                          >
                            <span className="truncate pr-2">{item.text}</span>
                            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 flex-shrink-0"></span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Section Content */}
            <div className="lg:col-span-8 mb-16 flex flex-col justify-between">
              <div>
                <div>
                  {catSlug === "the-institution" && (
                    <>
                      {itemSlug === "basic-institutional-information" && <BasicInstitutionalInfo />}
                      {itemSlug === "history-of-the-college" && <HistoryOfTheCollege />}
                      {itemSlug === "vision-mission-and-core-values" && <VisionMissionCoreValues />}
                      {itemSlug === "institutional-awards-recognitions" && <InstitutionalAwards />}
                      {itemSlug === "student-laurels" && <StudentLaurels />}
                      {itemSlug === "institutional-distinctiveness" && <InstitutionalDistinctiveness />}
                      {itemSlug === "head-of-the-institution" && <HeadOfTheInstitution />}
                      {itemSlug === "legacy-of-leadership" && <LegacyOfLeadership />}
                    </>
                  )}
                  {catSlug === "statutory-affiliations-recognitions" && (
                    <>
                      {itemSlug === "apsche-orders" && <ApscheOrders apscheOrders={apscheOrdersList} />}
                      {itemSlug === "anu-affiliation-orders-ug-pg" && <AnuAffiliations anuAffiliations={anuAffiliationsList} />}
                      {itemSlug === "aicte-approvals" && <AicteApprovals aicteApprovals={aicteApprovalsList} />}
                      {itemSlug === "ugc-2f" && <Ugc2f />}
                      {itemSlug === "nirf" && <NirfReports nirfReports={nirfReportsList} />}
                      {(itemSlug === "naac-certificates" || itemSlug === "naac-certficates" || itemSlug === "naac-accreditation") && <NaacCertificates naacCertificates={naacCertificatesList} />}
                      {(itemSlug === "aishe-mhrd" || itemSlug === "aishe-certificates") && <AisheCertifications aisheCertifications={aisheCertificationsList} />}
                      {itemSlug !== "apsche-orders" && itemSlug !== "anu-affiliation-orders-ug-pg" && itemSlug !== "aicte-approvals" && itemSlug !== "ugc-2f" && itemSlug !== "nirf" && itemSlug !== "naac-certificates" && itemSlug !== "naac-certficates" && itemSlug !== "naac-accreditation" && itemSlug !== "aishe-mhrd" && itemSlug !== "aishe-certificates" && <StatutoryAffiliations itemSlug={itemSlug} />}
                    </>
                  )}
                  {catSlug === "governance-administration" && <GovernanceAdministration itemSlug={itemSlug} />}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <AboutClientFallback
      apscheOrdersList={apscheOrdersList}
      anuAffiliationsList={anuAffiliationsList}
      aicteApprovalsList={aicteApprovalsList}
      nirfReportsList={nirfReportsList}
      naacCertificatesList={naacCertificatesList}
      aisheCertificationsList={aisheCertificationsList}
    />
  );
}
