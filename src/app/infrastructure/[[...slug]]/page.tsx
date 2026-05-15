import React from "react";
import { notFound } from "next/navigation";
import InfrastructureClientPortal from "@/components/infrastructure/InfrastructureClientPortal";

// Configure standard Static Param generation for pre-rendering!
export const dynamic = "force-static";
export const revalidate = 3600; // revalidate once per hour

const VALID_SLUGS = [
  "campus-buildings",
  "classrooms",
  "library",
  "ict-digital",
  "laboratories",
  "skill-development",
  "hostel",
  "canteen",
  "health-centre",
  "sports-games",
  "cultural-recreation",
  "safety-security",
  "green-campus",
  "inclusive-access"
];

export async function generateStaticParams() {
  // Create top-level root and individual sub-slugs paths with explicit typing
  const params: { slug: string[] }[] = [{ slug: [] }];
  VALID_SLUGS.forEach(s => {
    params.push({ slug: [s] });
  });
  return params;
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function InfrastructurePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  // Default to overview dashboard if no slug is provided in root path
  const activeSlug = slugArray.length > 0 ? slugArray[0] : "overview";

  if (slugArray.length > 1 || (slugArray.length === 1 && !VALID_SLUGS.includes(activeSlug) && activeSlug !== "overview")) {
    notFound();
  }

  return (
    <InfrastructureClientPortal 
      activeSlug={activeSlug}
    />
  );
}
