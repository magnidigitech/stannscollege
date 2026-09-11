import { NextResponse } from "next/server";
import { getLastUpdatedDate } from "@/lib/site-metadata";

export const revalidate = 300; // 5 minutes cache

export async function GET() {
  try {
    const data = await getLastUpdatedDate();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}
