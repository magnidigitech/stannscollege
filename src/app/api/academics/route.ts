import { NextResponse } from "next/server";
import { getAcademicsPortalData } from "@/lib/sanity";
import defaultAcademicsData from "@/components/academics/academics-data.json";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const portalData = await getAcademicsPortalData();
    if (portalData) {
      // Strip out private department passwords before sending to public visitors
      const publicData = { ...portalData };
      delete (publicData as any).departmentPasswords;

      return NextResponse.json(
        {
          success: true,
          data: publicData,
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

  const publicFallback = { ...defaultAcademicsData };
  delete (publicFallback as any).departmentPasswords;

  return NextResponse.json(
    {
      success: true,
      data: publicFallback,
      source: "fallback",
    },
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    }
  );
}

