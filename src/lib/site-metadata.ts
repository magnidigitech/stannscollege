import buildInfo from "./build-info.json";

export interface LastUpdatedInfo {
  timestamp: string;
  formattedDate: string;
  source: "build" | "cms";
}

/**
 * Format date in formal academic style: "11 September 2026"
 */
export function formatDateFormal(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Resolves the most recent timestamp across code builds and dynamic Sanity CMS updates.
 */
export async function getLastUpdatedDate(): Promise<LastUpdatedInfo> {
  const buildDate = new Date(buildInfo.timestamp);
  let latestDate = buildDate;
  let source: "build" | "cms" = "build";

  try {
    // Check Sanity CMS for latest document update (notices, events, customizations, etc.)
    const query = encodeURIComponent('*[!(_id in path("drafts.**"))] | order(_updatedAt desc)[0]._updatedAt');
    const res = await fetch(
      `https://fhjwqub5.api.sanity.io/v2024-03-01/data/query/production?query=${query}`,
      {
        next: { revalidate: 300 }, // 5 minutes cache
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (data.result) {
        const cmsDate = new Date(data.result);
        if (!isNaN(cmsDate.getTime()) && cmsDate.getTime() > buildDate.getTime()) {
          latestDate = cmsDate;
          source = "cms";
        }
      }
    }
  } catch (error) {
    // Fall back safely to build info if network query fails
    console.error("Failed to query latest CMS update timestamp:", error);
  }

  return {
    timestamp: latestDate.toISOString(),
    formattedDate: formatDateFormal(latestDate),
    source,
  };
}
