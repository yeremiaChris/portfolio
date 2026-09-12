import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid React 19 RSC dev mismatch with next-mdx-remote evaluated MDXContent
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
