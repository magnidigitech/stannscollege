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

  // Build a name → slug map, name → photo map, name → pdf map, and name -> full details map
  const profileSlugMap: Record<string, string> = {};
  const profilePhotoMap: Record<string, string> = {};
  const profilePdfMap: Record<string, string> = {};
  const profileDetailsMap: Record<string, any> = {};

  (allProfiles || []).forEach((profile: any) => {
    if (profile.facultyName) {
      const nameKey = profile.facultyName.trim().toLowerCase();
      if (profile.slug) profileSlugMap[nameKey] = profile.slug;
      if (profile.profilePhotoUrl) profilePhotoMap[nameKey] = profile.profilePhotoUrl;
      if (profile.facultyProfilePdfUrl || profile.cvPdfUrl) profilePdfMap[nameKey] = profile.facultyProfilePdfUrl || profile.cvPdfUrl;
      profileDetailsMap[nameKey] = profile;
    }
    if (profile.facultyId || profile.employeeId) {
      const empIdKey = (profile.facultyId || profile.employeeId).trim().toUpperCase();
      if (profile.slug) profileSlugMap[empIdKey] = profile.slug;
      if (profile.profilePhotoUrl) profilePhotoMap[empIdKey] = profile.profilePhotoUrl;
      if (profile.facultyProfilePdfUrl || profile.cvPdfUrl) profilePdfMap[empIdKey] = profile.facultyProfilePdfUrl || profile.cvPdfUrl;
      profileDetailsMap[empIdKey] = profile;
    }
  });
  (members || []).forEach((m: any) => {
    if (m.name) {
      const nameKey = m.name.trim().toLowerCase();
      if (m.slug && !profileSlugMap[nameKey]) profileSlugMap[nameKey] = m.slug;
      if (m.imageUrl && !profilePhotoMap[nameKey]) profilePhotoMap[nameKey] = m.imageUrl;
      if (m.profilePdfUrl && !profilePdfMap[nameKey]) profilePdfMap[nameKey] = m.profilePdfUrl;
      if (!profileDetailsMap[nameKey]) profileDetailsMap[nameKey] = m;
    }
    if (m.employeeId || m.facultyId) {
      const empIdKey = (m.employeeId || m.facultyId).trim().toUpperCase();
      if (m.slug && !profileSlugMap[empIdKey]) profileSlugMap[empIdKey] = m.slug;
      if (m.imageUrl && !profilePhotoMap[empIdKey]) profilePhotoMap[empIdKey] = m.imageUrl;
      if (m.profilePdfUrl && !profilePdfMap[empIdKey]) profilePdfMap[empIdKey] = m.profilePdfUrl;
      if (!profileDetailsMap[empIdKey]) profileDetailsMap[empIdKey] = m;
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
        profileDetailsMap={profileDetailsMap}
        initialPdfDocuments={pdfDocuments || []}
      />
    </div>
  );
}
