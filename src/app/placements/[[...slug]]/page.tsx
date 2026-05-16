import PlacementsClientPortal from "@/components/placements/PlacementsClientPortal";
import { Metadata } from "next";

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
  const tabs = [
    { slug: ["overview"] },
    { slug: ["training-placements"] },
    { slug: ["industry-linkages"] },
    { slug: ["internationalization"] },
  ];
  return tabs;
}

export default async function PlacementsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const activeSlug = resolvedParams.slug?.[0] || "training-placements";
  return <PlacementsClientPortal activeSlug={activeSlug} />;
}
