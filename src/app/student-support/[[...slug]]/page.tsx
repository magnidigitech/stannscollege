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
  const [sanityData, sanityFiles, rankHolders] = await Promise.all([
    getStudentSupportImages(activeSlug),
    getStudentSupportDocuments(activeSlug),
    activeSlug === "academic-achievements" ? getUniversityRankHolders() : Promise.resolve([])
  ]);

  const galleryImages = sanityData?.images || [];

  return (
    <div className="bg-slate-50/50 min-h-screen animate-fadeIn select-none">
      <StudentSupportClientPortal 
        activeSlug={activeSlug} 
        galleryImages={galleryImages}
        sanityFiles={sanityFiles}
        rankHolders={rankHolders}
        initialSections={[]} 
      />
    </div>
  );
}

