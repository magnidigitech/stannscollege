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

    // Convert Unicode dashes/characters to ASCII for HTTP ByteString header compliance
    const asciiFilename = requestedFilename
      .replace(/[\u2010-\u2015\u2212]/g, "-")
      .replace(/[^\x20-\x7E]/g, "_")
      .replace(/["\r\n]/g, "_");

    const searchParams = request.nextUrl.searchParams;
    let targetUrl = searchParams.get("url") || searchParams.get("file");
    const isDownload = searchParams.get("dl") === "1" || searchParams.get("download") === "1";

    const dispositionType = isDownload ? "attachment" : "inline";
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `${dispositionType}; filename="${asciiFilename}"; filename*=UTF-8''${encodeURIComponent(requestedFilename)}`
    );
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

    // Case 1: External URL (e.g. Sanity CDN: https://cdn.sanity.io/...)
    if (targetUrl && (targetUrl.startsWith("http://") || targetUrl.startsWith("https://"))) {
      try {
        const parsedUrl = new URL(targetUrl);
        const host = parsedUrl.hostname.toLowerCase();

        // Allowed hostnames for external PDF fetching (SSRF protection)
        const isAllowedHost =
          host === "cdn.sanity.io" ||
          host.endsWith(".sanity.io") ||
          host === "stannscollegeforwomen.ac.in" ||
          host.endsWith(".stannscollegeforwomen.ac.in");

        // Disallow private / local network targets
        const isPrivateHost =
          host === "localhost" ||
          host === "127.0.0.1" ||
          host === "::1" ||
          host.startsWith("10.") ||
          host.startsWith("192.168.") ||
          host.startsWith("169.254.");

        if (!isAllowedHost || isPrivateHost) {
          console.warn(`[PDF Proxy] Blocked unauthorized remote URL request to host: ${host}`);
          return serveFallbackPdf(asciiFilename, dispositionType);
        }

        const response = await fetch(targetUrl, {
          headers: {
            Accept: "application/pdf,*/*",
          },
        });

        if (!response.ok) {
          console.error(`[PDF Proxy] Upstream fetch failed (${response.status}) for: ${targetUrl}`);
          return serveFallbackPdf(asciiFilename, dispositionType);
        }

        const buffer = await response.arrayBuffer();
        return new Response(buffer, {
          status: 200,
          headers,
        });
      } catch (fetchErr) {
        console.error("[PDF Proxy] Error fetching remote PDF:", fetchErr);
        return serveFallbackPdf(asciiFilename, dispositionType);
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

    const publicRoot = path.resolve(process.cwd(), "public");
    const safeRelative = path.normalize(localRelativePath).replace(/^(\.\.[\/\\])+/, "");
    const publicPath = path.resolve(publicRoot, safeRelative);

    // Guard against Path Traversal: ensure resolved path remains strictly within public directory
    if (!publicPath.startsWith(publicRoot + path.sep)) {
      console.warn(`[PDF Proxy] Path traversal blocked: ${localRelativePath}`);
      return serveFallbackPdf(asciiFilename, dispositionType);
    }

    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      const fileBuffer = fs.readFileSync(publicPath);
      return new Response(fileBuffer, {
        status: 200,
        headers,
      });
    }

    // Fallback if local file not found
    return serveFallbackPdf(asciiFilename, dispositionType);
  } catch (error: any) {
    console.error("[PDF Proxy Error]:", error);
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
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  if (fs.existsSync(fallbackPath)) {
    const fileBuffer = fs.readFileSync(fallbackPath);
    return new Response(fileBuffer, { status: 200, headers });
  }

  return new Response("PDF Not Found", { status: 404 });
}
