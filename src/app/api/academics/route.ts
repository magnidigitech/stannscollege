import { NextResponse } from "next/server";
import { getAcademicsPortalData } from "@/lib/sanity";
import defaultAcademicsData from "@/components/academics/academics-data.json";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const portalData = await getAcademicsPortalData();
    if (portalData) {
      return NextResponse.json(
        {
          success: true,
          data: portalData,
          source: "sanity",
        },
        {
          headers: {
            "Cache-Control": "no-store, must-revalidate",
          },
        }
      );
    }
  } catch (err: any) {
    console.error("Error fetching live academics data in /api/academics:", err);
  }

  return NextResponse.json(
    {
      success: true,
      data: defaultAcademicsData,
      source: "fallback",
    },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    }
  );
}
