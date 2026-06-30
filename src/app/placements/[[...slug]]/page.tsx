import PlacementsClientPortal from "@/components/placements/PlacementsClientPortal";
import { Metadata } from "next";
import { getPlacementSections, getPlacementsImages, getPlacementsData } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Placements & Industry Linkages | St. Ann's College for Women",
  description: "Explore the comprehensive placement records, industry linkages, global outreach, and training programs at St. Ann's College for Women.",
  openGraph: {
    title: "Placements & Industry Linkages | St. Ann's College",
    description: "Training programs, placement records, and industry partnerships.",
    images: [{ url: "/images/hero-1.jpg", width: 1200, height: 630, alt: "Placements at St. Ann's" }],
  },
};

export function generateStaticParams() {
  const slugs = [
    // Group 1
    "about-cell",
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

    // Group 2
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

    // Group 3
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
  const activeSlug = resolvedParams.slug?.[0] || "about-cell";
  
  const [placementSections, placementsImagesData, placementsData] = await Promise.all([
    getPlacementSections(),
    getPlacementsImages(activeSlug),
    getPlacementsData(activeSlug)
  ]);
  
  const galleryImages = placementsImagesData?.images || [];

  return (
    <PlacementsClientPortal
      activeSlug={activeSlug}
      initialSections={placementSections}
      galleryImages={galleryImages}
      placementsData={placementsData}
    />
  );
}
