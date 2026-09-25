import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const PROJECT_ID = "fhjwqub5";
const DATASET = "production";

function getSanityClient() {
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-03-01",
    useCdn: false,
  });
}

export const dynamic = "force-dynamic";

/**
 * GET /api/faculty-gallery
 * Public fetch of all faculty event albums
 */
export async function GET(req: NextRequest) {
  try {
    const client = getSanityClient();
    const query = `*[_type == "facultyEventAlbum" && !(_id in path("drafts.**"))] | order(date desc, _createdAt desc) {
      _id,
      _type,
      title,
      date,
      year,
      category,
      description,
      "coverImage": coalesce(coverImage.asset->url, coverImageUrl, null),
      media[]{
        id,
        mediaType,
        "url": coalesce(asset->url, url),
        caption,
        thumbnailUrl
      }
    }`;

    const albums = await client.fetch(query);
    return NextResponse.json({ success: true, albums: albums || [] });
  } catch (err: any) {
    console.error("Failed to fetch faculty gallery events:", err);
    return NextResponse.json({ success: false, albums: [] });
  }
}
