"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const blogPostPath = /^\/blog\/[^/]+$/;

const BlogHeaderReadingProgressBar = dynamic(
  () =>
    import("@/components/blog/BlogHeaderReadingProgressBar").then((mod) => ({
      default: mod.BlogHeaderReadingProgressBar,
    })),
  { ssr: false },
);

export function BlogHeaderReadingProgress() {
  const pathname = usePathname();

  if (!blogPostPath.test(pathname)) {
    return null;
  }

  return <BlogHeaderReadingProgressBar />;
}
