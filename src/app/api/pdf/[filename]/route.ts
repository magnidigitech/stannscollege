import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> | { filename: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    let requestedFilename = decodeURIComponent(params.filename || "document.pdf");
    
    // Ensure filename ends with .pdf
    if (!requestedFilename.toLowerCase().endsWith(".pdf")) {
      requestedFilename += ".pdf";
    }

    // Clean filename for HTTP header
    const safeFilename = requestedFilename.replace(/["\r\n]/g, "");

    const searchParams = request.nextUrl.searchParams;
    const targetUrl = searchParams.get("url") || searchParams.get("file");
    const isDownload = searchParams.get("dl") === "1" || searchParams.get("download") === "1";

    const dispositionType = isDownload ? "attachment" : "inline";
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `${dispositionType}; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
    );
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");

    // Case 1: External URL (e.g. Sanity CDN: https://cdn.sanity.io/...)
    if (targetUrl && (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"))) {
      const response = await fetch(targetUrl, {
        headers: {
          Accept: "application/pdf,*/*",
        },
      });

      if (!response.ok) {
        console.error(`[PDF Proxy] Failed to fetch upstream PDF: ${targetUrl} (${response.status})`);
        return serveFallbackPdf(safeFilename, dispositionType);
      }

      const buffer = await response.arrayBuffer();
      return new NextResponse(Buffer.from(buffer), {
        status: 200,
        headers,
      });
    }

    // Case 2: Local file in /public/
    let localRelativePath = targetUrl ? targetUrl.replace(/^\/+/, "") : "";
    if (!localRelativePath) {
      localRelativePath = "documents/DefaultFile_1.pdf";
    }

    const publicPath = path.join(process.cwd(), "public", localRelativePath);
    if (fs.existsSync(publicPath)) {
      const fileBuffer = fs.readFileSync(publicPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    }

    // Fallback if local file not found
    return serveFallbackPdf(safeFilename, dispositionType);
  } catch (error) {
    console.error("[PDF Proxy Error]:", error);
    return new NextResponse("Internal Server Error while rendering PDF", { status: 500 });
  }
}

function serveFallbackPdf(filename: string, dispositionType: string) {
  const fallbackPath = path.join(process.cwd(), "public", "documents", "DefaultFile_1.pdf");
  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  headers.set(
    "Content-Disposition",
    `${dispositionType}; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
  );

  if (fs.existsSync(fallbackPath)) {
    const fileBuffer = fs.readFileSync(fallbackPath);
    return new NextResponse(fileBuffer, { status: 200, headers });
  }

  return new NextResponse("PDF Not Found", { status: 404 });
}
