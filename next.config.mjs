const BUILD_ID = `build-${Date.now()}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateBuildId: async () => BUILD_ID,
  async headers() {
    return [
      {
        // Ensure HTML pages are never served stale by CDNs/browsers with dead chunk links
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
