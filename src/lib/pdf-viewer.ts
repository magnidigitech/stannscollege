/**
 * Utility functions for generating clean PDF URLs and opening PDFs
 * with friendly human-readable filenames in browser viewers.
 */

export function sanitizePdfFilename(title?: string, fallback = "Document"): string {
  if (!title || title.trim() === "") {
    return `${fallback}.pdf`;
  }
  
  // Replace unicode en-dash, em-dash, special dashes with standard ASCII hyphen
  let clean = title
    .trim()
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[/\\?%*:|"<>#]/g, " ")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) clean = fallback;
  if (!clean.toLowerCase().endsWith(".pdf")) {
    clean += ".pdf";
  }
  return clean;
}

/**
 * Returns a URL to the internal PDF stream route with a clean filename in the path.
 * Example: /api/pdf/AICTE_Approval_2026-2027.pdf?url=https%3A%2F%2Fcdn.sanity.io...
 */
export function getCleanPdfUrl(url?: string, title?: string, download = false): string {
  if (!url || url.trim() === "") {
    url = "/documents/DefaultFile_1.pdf";
  }

  // If it's already an internal API route (/api/pdf, /api/faculty-pdf, etc.), return as is with download flag
  if (url.startsWith("/api/")) {
    if (download && !url.includes("dl=1") && !url.includes("download=1")) {
      return url.includes("?") ? `${url}&dl=1` : `${url}?dl=1`;
    }
    return url;
  }

  const cleanName = sanitizePdfFilename(title, "Document");
  const encodedUrl = encodeURIComponent(url);
  const dlParam = download ? "&dl=1" : "";
  
  return `/api/pdf/${encodeURIComponent(cleanName)}?url=${encodedUrl}${dlParam}`;
}

/**
 * Opens a PDF in a new tab with the clean filename displayed in the browser viewer header.
 */
export function openPdfViewer(url?: string, title?: string) {
  const viewerUrl = getCleanPdfUrl(url, title);
  if (typeof window !== "undefined") {
    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  }
}
