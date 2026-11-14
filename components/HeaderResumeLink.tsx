"use client";

import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button-variants";
import { isResumeHidden } from "@/lib/nav";
import { SITE_RESUME_HREF } from "@/lib/site-links";
import { cn } from "@/lib/utils";

export function HeaderResumeLink() {
  const pathname = usePathname();

  if (isResumeHidden(pathname)) return null;

  return (
    <a
      href={SITE_RESUME_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "focus-ring text-muted-foreground about-hide-header-resume inline-flex h-8 shrink-0 items-center rounded-full text-[13px] whitespace-nowrap",
      )}
    >
      CV.pdf
    </a>
  );
}
