import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";

const COOKIE_NAME = "stanns_admin_session";

function checkAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminSessionToken(token) !== null;
}

function getSanityClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    throw new Error("SANITY_WRITE_TOKEN environment variable is not configured.");
  }
  return createClient({
    projectId: "fhjwqub5",
    dataset: "production",
    apiVersion: "2024-03-01",
    token,
    useCdn: false,
  });
}

/**
 * POST /api/admin/upload
 * Handles file uploads (PDFs, circular documents, images) directly to the Sanity asset pipeline
 */
export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Admin session required." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "file"; // "file" or "image"

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload." },
        { status: 400 }
      );
    }

    const client = getSanityClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await client.assets.upload(type === "image" ? "image" : "file", buffer, {
      filename: file.name,
      contentType: file.type || (type === "image" ? "image/jpeg" : "application/pdf"),
    });

    return NextResponse.json({
      success: true,
      asset: {
        _id: asset._id,
        url: asset.url,
        originalFilename: asset.originalFilename || file.name,
        size: asset.size || file.size,
        mimeType: asset.mimeType || file.type,
      },
    });
  } catch (err: any) {
    console.error("Sanity asset upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload file to Sanity." },
      { status: 500 }
    );
  }
}
