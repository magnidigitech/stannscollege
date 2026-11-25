/**
 * Extracts a clean 11-character YouTube video ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=2E7IGyhdQeg
 * - https://youtu.be/2E7IGyhdQeg
 * - https://www.youtube.com/embed/2E7IGyhdQeg
 * - https://www.youtube.com/shorts/2E7IGyhdQeg
 * - 2E7IGyhdQeg (raw ID)
 */
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const clean = urlOrId.trim();

  // If already an 11-character alphanumeric ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // Common YouTube URL regex
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = clean.match(regex);
  if (match && match[1]) {
    return match[1];
  }

  return clean;
}

export function getYouTubeThumbnailUrl(videoIdOrUrl: string, quality: "default" | "mqdefault" | "hqdefault" | "maxresdefault" = "hqdefault"): string {
  const id = extractYouTubeId(videoIdOrUrl);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}
