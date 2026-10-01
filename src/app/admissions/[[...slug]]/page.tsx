import React from "react";
import { Metadata } from "next";
import AdmissionsClientPortal from "@/components/admissions/AdmissionsClientPortal";
import { getAdmissionsPortalData } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Admissions 2026–2027 | St. Ann's College for Women",
  description:
    "Explore undergraduate and postgraduate programmes, intake details, eligibility criteria, admission procedures, prospectus, and admission desk at St. Ann's College for Women, Gorantla, Guntur.",
  openGraph: {
    title: "Admissions 2026–2027 | St. Ann's College for Women, Guntur",
    description:
      "Join St. Ann's College for Women. Quality higher education in a supportive, inclusive and value-based environment.",
    images: [{ url: "/images/hero-1.jpg", width: 1200, height: 630, alt: "Admissions at St. Ann's" }],
  },
};

export function generateStaticParams() {
  const slugs = [
    // Subpage & Canonical Sections
    "programmes-eligibility",
    "programmes-offered",
    "eligibility-criteria",
    "admission-policy-process",
    "prospectus-brochures",
    "admission-desk",
    "admission-information",

    // Backward-compatible & friendly aliases
    "programmes",
    "intake",
    "eligibility",
    "policy-process",
    "process",
    "prospectus",
    "brochures",
    "desk",
    "contact",
    "information",
    "records",
    "fee-structure",
    "scholarships-freeships",
    "student-handbook",
    "admission-statistics",
    "guidelines",
    "procedure",
    "rules-regulations",
  ];

  return [{ slug: [] }, ...slugs.map((slug) => ({ slug: [slug] }))];
}

interface AdmissionsPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  // Await the async params as required by Next.js 15+
  const resolvedParams = await params;
  const activeSlug = resolvedParams?.slug?.[0] || "";

  // Fetch dynamic admissions portal data from Sanity
  const portalData = await getAdmissionsPortalData();

  return (
    <div className="bg-[#f8fafc] min-h-screen animate-fadeIn select-none">
      <AdmissionsClientPortal activeSlug={activeSlug} initialData={portalData} />
    </div>
  );
}

