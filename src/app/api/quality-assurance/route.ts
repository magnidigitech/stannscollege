import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import defaultQaData from "@/components/quality-assurance/quality-assurance-data.json";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";
const QA_DOC_ID = "quality-assurance-portal-singleton";

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    token: token || undefined,
    useCdn: true,
  });
}

export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const query = `*[_type == "qualityAssurancePortal" && !(_id in path("drafts.**"))][0]`;
    const doc = await client.fetch(query);

    if (doc && doc.portalData) {
      return NextResponse.json({
        success: true,
        data: doc.portalData,
        source: "sanity"
      });
    }
  } catch (err: any) {
    console.error("Sanity QA fetch fallback to local JSON:", err.message);
  }

  // Fallback to local JSON
  try {
    const filePath = path.join(process.cwd(), "src/components/quality-assurance/quality-assurance-data.json");
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      return NextResponse.json({
        success: true,
        data: JSON.parse(fileContent),
        source: "local-file"
      });
    }
  } catch (err) {
    console.error("Error reading local QA file:", err);
  }

  return NextResponse.json({
    success: true,
    data: defaultQaData,
    source: "static-fallback"
  });
}

