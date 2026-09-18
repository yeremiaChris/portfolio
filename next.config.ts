import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid React 19 RSC dev mismatch with next-mdx-remote evaluated MDXContent
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
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
};

export default nextConfig;
