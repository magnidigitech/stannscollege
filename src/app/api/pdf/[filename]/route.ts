import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    let requestedFilename = "document.pdf";

    if (context && context.params) {
      const resolvedParams = await context.params;
      if (resolvedParams?.filename) {
        requestedFilename = decodeURIComponent(resolvedParams.filename);
      }
    }

    // Ensure filename ends with .pdf
    if (!requestedFilename.toLowerCase().endsWith(".pdf")) {
      requestedFilename += ".pdf";
    }

    // Clean filename for HTTP header
    const safeFilename = requestedFilename.replace(/["\r\n]/g, "_");

    const searchParams = request.nextUrl.searchParams;
    let targetUrl = searchParams.get("url") || searchParams.get("file");
    const isDownload = searchParams.get("dl") === "1" || searchParams.get("download") === "1";

    const dispositionType = isDownload ? "attachment" : "inline";
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `${dispositionType}; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
    );
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");

    // Case 1: External URL (e.g. Sanity CDN: https://cdn.sanity.io/...)
    if (targetUrl && (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"))) {
      try {
        const response = await fetch(targetUrl, {
          headers: {
            Accept: "application/pdf,*/*",
          },
        });

        if (!response.ok) {
          console.error(`[PDF Proxy] Upstream fetch failed (${response.status}) for: ${targetUrl}`);
          return serveFallbackPdf(safeFilename, dispositionType);
        }

        const buffer = await response.arrayBuffer();
        return new Response(buffer, {
          status: 200,
          headers,
        });
      } catch (fetchErr) {
        console.error("[PDF Proxy] Error fetching remote PDF:", fetchErr);
        return serveFallbackPdf(safeFilename, dispositionType);
      }
    }

    // Case 2: Local file in /public/
    let localRelativePath = targetUrl ? targetUrl.replace(/^\/+/, "") : "";
    if (!localRelativePath) {
      localRelativePath = "documents/DefaultFile_1.pdf";
    }

    try {
      localRelativePath = decodeURIComponent(localRelativePath);
    } catch {}

    const publicPath = path.join(process.cwd(), "public", localRelativePath);
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      const fileBuffer = fs.readFileSync(publicPath);
      return new Response(fileBuffer, {
        status: 200,
        headers,
      });
    }

    // Fallback if local file not found
    return serveFallbackPdf(safeFilename, dispositionType);
  } catch (error: any) {
    console.error("[PDF Proxy Error]:", error?.message || error);
    return serveFallbackPdf("Document.pdf", "inline");
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
    return new Response(fileBuffer, { status: 200, headers });
  }

  return new Response("PDF Not Found", { status: 404 });
}
