import { buildBlogRssFeed } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildBlogRssFeed(getSiteUrl()), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
