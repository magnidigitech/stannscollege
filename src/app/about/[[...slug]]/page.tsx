import { Sparkles, Award, Users, CheckCircle, GraduationCap, ArrowRight, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { getFaculty, getAffiliations, getApscheOrders, getAnuAffiliations, getAicteApprovals, getNirfReports, getNaacCertificates, getAisheCertifications, getCommittees, getCommitteeYearwiseLists } from "@/lib/sanity";

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
import AboutSidebar from "@/components/about/AboutSidebar";

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
  const committeesList = await getCommittees();
  const committeeYearwiseLists = await getCommitteeYearwiseLists();

  // Dynamic 2-column Grid Layout for Sections to maximize right-hand empty space
  // Dynamic Grid Layout for Sections with Sidebar
  if (catSlug && itemSlug) {
    return (
      <div className="bg-slate-50/40 min-h-screen py-12 select-none animate-fadeIn">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">

            {/* Desktop Sidebar with All Pages */}
            <div className="lg:col-span-3">
              <AboutSidebar currentCatSlug={catSlug} currentItemSlug={itemSlug} />
            </div>

            {/* Individual Section Content */}
            <div className="lg:col-span-9 mb-16 flex flex-col justify-between">
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
                  {catSlug === "governance-administration" && (
                    <GovernanceAdministration
                      itemSlug={itemSlug}
                      committeesList={committeesList}
                      committeeYearwiseLists={committeeYearwiseLists}
                    />
                  )}
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
