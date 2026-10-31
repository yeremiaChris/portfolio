import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";

import { getSecurityResponseHeaders } from "./lib/security-headers";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Avoid React 19 RSC dev mismatch with next-mdx-remote evaluated MDXContent
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: ["lucide-react", "@base-ui/react"],
  },
  async redirects() {
    return [
      {
        source: "/analytics",
        destination:
          "https://cloud.umami.is/analytics/us/share/pUPvjI3MnPdiy7KE",
        permanent: false,
      },
    ];
  },
  async headers() {
    const securityHeaders = getSecurityResponseHeaders();
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
