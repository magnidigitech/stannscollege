import React from "react";
import { notFound } from "next/navigation";
import { getFacultyProfile, getAllFacultyProfiles } from "@/lib/sanity";
import FacultyProfilePage from "@/components/faculty/FacultyProfilePage";
import { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO metadata per faculty member
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getFacultyProfile(slug);

  if (!profile) {
    return {
      title: "Faculty Profile Not Found | St. Ann's College for Women",
    };
  }

  return {
    title: profile.metaTitle || `${profile.facultyName} | Faculty | St. Ann's College for Women`,
    description:
      profile.metaDescription ||
      profile.shortBio ||
      `Faculty profile of ${profile.facultyName}, ${profile.designation} in the Department of ${profile.department} at St. Ann's College for Women.`,
    keywords: profile.metaKeywords?.join(", ") || undefined,
    openGraph: {
      title: profile.metaTitle || `${profile.facultyName} | St. Ann's College for Women`,
      description: profile.metaDescription || profile.shortBio || "",
      images: profile.profilePhotoUrl ? [{ url: profile.profilePhotoUrl, alt: profile.imageAltText || profile.facultyName }] : [],
    },
  };
}

// Static params for ISR / static generation
export async function generateStaticParams() {
  const profiles = await getAllFacultyProfiles();
  return (profiles || []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function FacultyProfileRoute({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = await getFacultyProfile(slug);

  // 404 if not found or hidden from website
  if (!profile || profile.showOnWebsite === false) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <FacultyProfilePage profile={profile} />
    </div>
  );
}
