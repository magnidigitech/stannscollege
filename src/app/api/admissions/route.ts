import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import {
  UG_PROGRAMMES_INTAKE,
  PG_PROGRAMMES_INTAKE,
  UG_ELIGIBILITY_CRITERIA,
  PG_ELIGIBILITY_CRITERIA,
  ADMISSION_DOCUMENTS,
  ADMISSION_DESK_INFO,
  ADMISSION_YEARLY_RECORDS,
} from "@/components/admissions/staticData";

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

const DEFAULT_ADMISSIONS_DATA = {
  ugProgrammes: UG_PROGRAMMES_INTAKE,
  pgProgrammes: PG_PROGRAMMES_INTAKE,
  ugEligibility: UG_ELIGIBILITY_CRITERIA,
  pgEligibility: PG_ELIGIBILITY_CRITERIA,
  documents: ADMISSION_DOCUMENTS,
  deskInfo: ADMISSION_DESK_INFO,
  yearlyRecords: ADMISSION_YEARLY_RECORDS,
};

export async function GET() {
  try {
    const client = getSanityClient();
    const query = `*[_type == "admissionsPortal" && !(_id in path("drafts.**"))][0]`;
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
        data: DEFAULT_ADMISSIONS_DATA,
        lastUpdated: null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("Error fetching public admissions data:", err);
    return NextResponse.json(
      {
        success: true,
        data: DEFAULT_ADMISSIONS_DATA,
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

