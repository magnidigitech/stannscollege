import PlacementsClientPortal from "@/components/placements/PlacementsClientPortal";
import { Metadata } from "next";
import { getPlacementSections, getPlacementsImages, getPlacementsSingletonData, getPlacementYearlyStats } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Placements & Industry Linkages | St. Ann's College for Women",
  description: "Explore the comprehensive placement records, industry linkages, APSSDC support, and training programs at St. Ann's College for Women, Gorantla, Guntur.",
  openGraph: {
    title: "Placements & Industry Linkages | St. Ann's College",
    description: "Training programs, campus recruitment drives, placement statistics, and industry partnerships.",
    images: [{ url: "/images/hero-1.jpg", width: 1200, height: 630, alt: "Placements at St. Ann's" }],
  },
};

export function generateStaticParams() {
  const slugs = [
    // 9 Canonical Sections from 8.Placements & Industry Linkages.docx
    "about-cell",
    "placements-recruitment",
    "apssdc",
    "skill-development-areas",
    "internships-industry-exposure",
    "competitive-exam-coaching",
    "industry-professional-engagement",
    "mous",
    "international-collaborations-global-engagement",

    // Backward-compatible aliases
    "annual-reports",
    "placement-statistics",
    "recruitment-drives",
    "skill-development",
    "soft-skills",
    "internships-exposure",
    "competitive-coaching",
    "career-guidance",
    "entrepreneurship",
    "placement-partnerships",
    "capacity-building",
    "alumni-support",
    "training-calendar",
    "industry-partnerships",
    "internships-apprenticeships",
    "mous-agreements",
    "mou-activities",
    "csr-initiatives",
    "industry-placement-partnerships",
    "certifications",
    "expert-lectures",
    "industrial-visits",
    "skill-training",
    "employability-activities",
    "international-collaborations",
    "internationalization-policy",
    "accreditations-memberships",
    "global-alumni",
    "global-research",
    "student-faculty-exchange",
    "webinars-conferences",
    "cross-cultural-learning"
  ];
  return slugs.map(slug => ({ slug: [slug] }));
}

export default async function PlacementsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const activeSlug = resolvedParams.slug?.[0] || "";
  
  const [placementSections, placementsImagesData, placementsData, placementYearlyStats] = await Promise.all([
    getPlacementSections(),
    getPlacementsImages(activeSlug || "about-cell"),
    getPlacementsSingletonData(),
    activeSlug === "placement-statistics" || activeSlug === "placements-recruitment" ? getPlacementYearlyStats() : Promise.resolve([])
  ]);
  
  const galleryImages = placementsImagesData?.images || [];

  return (
    <PlacementsClientPortal
      activeSlug={activeSlug}
      initialSections={placementSections}
      galleryImages={galleryImages}
      placementsData={placementsData}
      placementYearlyStats={placementYearlyStats}
    />
  );
}
