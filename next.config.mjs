/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateBuildId: async () => {
    // Generate unique build ID with timestamp as cache buster
    return `build-${Date.now()}`;
  },
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
