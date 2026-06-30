import React from "react";
import { Metadata } from "next";
import StudentSupportClientPortal from "@/components/student-support/StudentSupportClientPortal";
import { getStudentSupportImages, getStudentSupportDocuments, getUniversityRankHolders } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Student Support Services | St. Ann's College for Women",
  description: "Explore our dedicated student support cells, including Mentor-Mentee systems, counseling, Grievance Redressal, ICC, and skill development platforms.",
};

interface StudentSupportPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function StudentSupportPage({ params }: StudentSupportPageProps) {
  // Await the async params as required by Next.js 15+
  const resolvedParams = await params;
  
  // Current selected slug parameter (if any), defaulting to "mentor-mentee"
  const activeSlug = resolvedParams?.slug?.[0] || "mentor-mentee";

  // Fetch images, documents and rank holders dynamically from Sanity
  // If activeSlug is "sports-games", fetch from both "sports-games" and the old individual slugs to merge them
  const [sanityData, sanityDataOld, sanityFiles, sanityFilesOld, rankHolders] = await Promise.all([
    getStudentSupportImages(activeSlug),
    activeSlug === "sports-games" ? getStudentSupportImages("sports-cultural-achievements") : Promise.resolve(null),
    getStudentSupportDocuments(activeSlug),
    activeSlug === "sports-games" ? getStudentSupportDocuments("sports-infrastructure") : Promise.resolve(null),
    activeSlug === "academic-achievements" ? getUniversityRankHolders() : Promise.resolve([])
  ]);

  const galleryImages = [
    ...(sanityData?.images || []),
    ...(sanityDataOld?.images || [])
  ];

  const studentSupportData = {
    policyUrl: sanityFiles?.policyUrl || sanityFilesOld?.policyUrl || null,
    reports: [
      ...(sanityFiles?.reports || []),
      ...(sanityFilesOld?.reports || [])
    ]
  };

  return (
    <div className="bg-slate-50/50 min-h-screen animate-fadeIn select-none">
      <StudentSupportClientPortal 
        activeSlug={activeSlug} 
        galleryImages={galleryImages}
        studentSupportData={studentSupportData}
        rankHolders={rankHolders}
        initialSections={[]} 
      />
    </div>
  );
}

