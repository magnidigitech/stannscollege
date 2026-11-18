import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { STUDENT_SUPPORT_DATA } from "@/components/student-support/staticData";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    token: token || undefined,
    useCdn: false,
  });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const client = getSanityClient();
    const query = `*[_type == "studentSupportPortal" && !(_id in path("drafts.**"))][0]`;
    const doc = await client.fetch(query);

    if (doc && doc.portalData) {
      return NextResponse.json(
        {
          success: true,
          data: doc.portalData,
          lastUpdated: doc._updatedAt || null,
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: STUDENT_SUPPORT_DATA,
        lastUpdated: null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("Error fetching public student support data:", err);
    return NextResponse.json(
      {
        success: true,
        data: STUDENT_SUPPORT_DATA,
        error: err.message,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  }
}

