import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getTopicSlugForTag } from "@/lib/blog-topics";
import { cn } from "@/lib/utils";

type BlogTagBadgeProps = {
  tag: string;
  className?: string;
};

export function BlogTagBadge({ tag, className }: BlogTagBadgeProps) {
  const topicSlug = getTopicSlugForTag(tag);

  if (!topicSlug) {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "label-caps text-muted-foreground tracking-wider",
          className,
        )}
      >
        {tag}
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      render={<Link href={`/blog/tag/${topicSlug}`} />}
      className={cn(
        "label-caps text-muted-foreground hover:text-brand-accent tracking-wider transition-colors",
        "motion-reduce:transition-none",
        className,
      )}
    >
      {tag}
    </Badge>
  );
}
