import React from "react";
import { getFacultyMembers, getFacultySections, getAllFacultyProfiles } from "@/lib/sanity";
import FacultyClientPortal from "@/components/faculty/FacultyClientPortal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty & Staff | St. Ann's College for Women",
  description: "Meet our highly qualified and dedicated faculty, teaching, and non-teaching staff who drive academic excellence and innovation.",
};

interface FacultyPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function FacultyPage({ params }: FacultyPageProps) {
  // Await the async params as required by Next.js 15+
  const resolvedParams = await params;
  
  // Fetch dynamic data from Sanity Server-Side
  const members = await getFacultyMembers();
  const sections = await getFacultySections();
  const allProfiles = await getAllFacultyProfiles();

  // Build a name → slug map for "View Profile" links in roster
  const profileSlugMap: Record<string, string> = {};
  (allProfiles || []).forEach((profile: { facultyName: string; slug: string }) => {
    if (profile.facultyName && profile.slug) {
      profileSlugMap[profile.facultyName.trim().toLowerCase()] = profile.slug;
    }
  });

  // Current selected slug parameter (if any)
  const activeSlug = resolvedParams?.slug?.[0] || "teaching-staff";

  return (
    <div className="bg-slate-50/50 min-h-screen animate-fadeIn select-none">
      <FacultyClientPortal 
        initialMembers={members || []} 
        initialSections={sections || []} 
        activeSlug={activeSlug}
        profileSlugMap={profileSlugMap}
      />
    </div>
  );
}
