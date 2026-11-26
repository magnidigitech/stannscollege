import React from "react";
import AcademicsDynamicPage from "@/app/academics/[[...slug]]/page";

interface DepartmentCatchAllProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DepartmentCatchAllPage({ params }: DepartmentCatchAllProps) {
  const resolved = await params;
  const subSlug = resolved?.slug || [];
  
  // Forward to AcademicsDynamicPage with synthetic category slug ["departments", ...subSlug]
  const syntheticParams = Promise.resolve({
    slug: ["departments", ...subSlug],
  });

  return <AcademicsDynamicPage params={syntheticParams} />;
}
