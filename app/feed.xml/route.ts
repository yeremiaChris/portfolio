import { buildBlogRssFeed } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://yeremia.dev";

  return new Response(buildBlogRssFeed(siteUrl), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
