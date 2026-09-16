/**
 * Utility functions for generating clean PDF URLs and opening PDFs
 * with friendly human-readable filenames in browser viewers.
 */

export function sanitizePdfFilename(title?: string, fallback = "Document"): string {
  if (!title || title.trim() === "") {
    return `${fallback}.pdf`;
  }
  
  // Replace characters not allowed in filenames or URLs with safe characters
  let clean = title
    .trim()
    .replace(/[/\\?%*:|"<>#]/g, " ")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

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

  // If it's already an internal /api/pdf route, return as is
  if (url.startsWith("/api/pdf/")) {
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
