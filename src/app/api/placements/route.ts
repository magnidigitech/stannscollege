import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

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
    const query = `*[_type == "placements-singleton" && !(_id in path("drafts.**"))][0] {
      _id,
      tpoOfficer,
      aboutOverview,
      statistics,
      recruiters,
      mous,
      mousMasterPdfUrl,
      mouActivities,
      annualReports,
      skillDomains,
      skillTrainingPdfUrl,
      apssdcSupportAreas,
      apssdcPdfUrl,
      internshipReports,
      internshipGalleries,
      competitiveExamsList,
      competitiveExamReports,
      competitiveExamGalleries,
      externalLinks,
      industryEngagementPdfUrl,
      internationalPolicyPdfUrl
    }`;
    const data = await client.fetch(query);

    return NextResponse.json(
      {
        success: true,
        data: data || null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("Error fetching public placements data:", err);
    return NextResponse.json(
      {
        success: false,
        data: null,
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

