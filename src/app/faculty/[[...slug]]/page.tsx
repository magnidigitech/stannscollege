import React from "react";
import { getFacultyMembers, getFacultySections, getAllFacultyProfiles, getFacultyPdfDocuments } from "@/lib/sanity";
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
  const pdfDocuments = await getFacultyPdfDocuments();

  // Build a name → slug map, name → photo map, and name → pdf map for "View Profile" / PDF links and member cards
  const profileSlugMap: Record<string, string> = {};
  const profilePhotoMap: Record<string, string> = {};
  const profilePdfMap: Record<string, string> = {};
  (allProfiles || []).forEach((profile: any) => {
    if (profile.facultyName) {
      const key = profile.facultyName.trim().toLowerCase();
      if (profile.slug) profileSlugMap[key] = profile.slug;
      if (profile.profilePhotoUrl) profilePhotoMap[key] = profile.profilePhotoUrl;
      if (profile.facultyProfilePdfUrl || profile.cvPdfUrl) profilePdfMap[key] = profile.facultyProfilePdfUrl || profile.cvPdfUrl;
    }
  });
  (members || []).forEach((m: any) => {
    if (m.name) {
      const key = m.name.trim().toLowerCase();
      if (m.slug && !profileSlugMap[key]) profileSlugMap[key] = m.slug;
      if (m.imageUrl && !profilePhotoMap[key]) profilePhotoMap[key] = m.imageUrl;
      if (m.profilePdfUrl && !profilePdfMap[key]) profilePdfMap[key] = m.profilePdfUrl;
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
        profilePhotoMap={profilePhotoMap}
        profilePdfMap={profilePdfMap}
        initialPdfDocuments={pdfDocuments || []}
      />
    </div>
  );
}
