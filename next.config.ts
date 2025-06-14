import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkHtml from "remark-html";

// Create MDX configuration using @next/mdx
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [remarkHtml],
    providerImportSource: "@mdx-js/react",
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  experimental: {
    mdxRs: true,
  },

  // You no longer need to modify webpack manually for MDX
};

export default withMDX(nextConfig);
