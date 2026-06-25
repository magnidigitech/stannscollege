import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";

const DEPARTMENT_PASSWORD = "Stannsf@2026";
const PROJECT_ID = "fhjwqub5";

function getWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error("SANITY_WRITE_TOKEN not configured");
  return createClient({
    projectId: PROJECT_ID,
    dataset: "production",
    apiVersion: "2024-03-01",
    token,
    useCdn: false,
  });
}

async function uploadAsset(client: any, file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type || "image/jpeg",
  });
  return asset._id;
}

function addKeysToObj(obj: any) {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (let item of obj) {
      if (item && typeof item === "object") {
        if (!item._key) {
          item._key = crypto.randomUUID();
        }
        addKeysToObj(item);
      }
    }
  } else {
    for (let k in obj) {
      if (typeof obj[k] === "object") {
        addKeysToObj(obj[k]);
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const password = formData.get("password") as string;
    const selectedDeptId = formData.get("selectedDeptId") as string;
    const departmentDataStr = formData.get("departmentData") as string;

    if (!selectedDeptId || !password) {
      return NextResponse.json({ success: false, error: "Department and password required." }, { status: 400 });
    }

    if (password !== DEPARTMENT_PASSWORD) {
      return NextResponse.json({ success: false, error: "Incorrect password. Access denied." }, { status: 401 });
    }

    let departmentData: Record<string, any> = {};
    try {
      departmentData = JSON.parse(departmentDataStr);
    } catch {
      return NextResponse.json({ success: false, error: "Malformed payload." }, { status: 400 });
    }

    const client = getWriteClient();

    // ── Process photo gallery file uploads ───────────────────────────
    const gallery = Array.isArray(departmentData.gallery) ? departmentData.gallery : [];
    
    for (let i = 0; i < gallery.length; i++) {
      const fileKey = `galleryImage_${i}`;
      const imageFile = formData.get(fileKey) as File | null;
      
      if (imageFile && imageFile.size > 0) {
        // Upload the new image file to Sanity
        const assetId = await uploadAsset(client, imageFile);
        gallery[i].image = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: assetId,
          },
        };
      }
    }

    // Set updated gallery array back into the document data
    departmentData.gallery = gallery;

    // Ensure all array items have unique keys before submitting
    addKeysToObj(departmentData);

    // Write to Sanity CMS
    await client.createOrReplace(departmentData as any);

    return NextResponse.json({
      success: true,
      message: `Successfully published department changes to Sanity CMS!`,
    });
  } catch (err: any) {
    console.error("[department-update] API error:", err);
    return NextResponse.json({ success: false, error: err.message || "Server error." }, { status: 500 });
  }
}
