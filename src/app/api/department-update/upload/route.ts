import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyAdminSessionToken } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

const PROJECT_ID = "fhjwqub5";
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const ALLOWED_EXTENSIONS = new Set([".pdf", ".jpg", ".jpeg", ".png", ".webp"]);
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get("stanns_admin_session")?.value;
  if (!token) return false;
  return verifyAdminSessionToken(token) !== null;
}

function getWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) return null;
  try {
    return createClient({
      projectId: PROJECT_ID,
      dataset: "production",
      apiVersion: "2024-03-01",
      token,
      useCdn: false,
    });
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Active session required to upload files." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "documents";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "File exceeds maximum size limit of 25MB." },
        { status: 400 }
      );
    }

    const fileExt = path.extname(file.name).toLowerCase();
    const isImage = file.type.startsWith("image/") && file.type !== "image/svg+xml";
    const isPdf = file.type === "application/pdf" || fileExt === ".pdf";

    if (!ALLOWED_MIME_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(fileExt)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only PDF and image files (JPG, PNG, WebP) are permitted." },
        { status: 400 }
      );
    }

    // 1. Try uploading to Sanity first
    const client = getWriteClient();
    if (client) {
      try {
        const asset = await client.assets.upload(isImage ? "image" : "file", buffer, {
          filename: file.name,
          contentType: file.type || (isPdf ? "application/pdf" : "application/octet-stream"),
        });
        if (asset && asset.url) {
          return NextResponse.json({
            success: true,
            url: asset.url,
            filename: file.name,
            source: "sanity"
          });
        }
      } catch (sanityErr: any) {
        console.warn("[upload] Sanity upload failed, falling back to local storage:", sanityErr.message);
      }
    }

    // 2. Local filesystem storage fallback (saved to public/documents/departments/)
    const targetSubdir = isImage ? "images/departments" : "documents/departments";
    const uploadDir = path.join(process.cwd(), "public", targetSubdir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .toLowerCase();
    const uniqueFileName = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    fs.writeFileSync(filePath, buffer);
    const localUrl = `/${targetSubdir}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: localUrl,
      filename: file.name,
      source: "local"
    });
  } catch (err: any) {
    console.error("[upload] Error uploading file:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload file." },
      { status: 500 }
    );
  }
}

