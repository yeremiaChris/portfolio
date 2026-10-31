"use client";

import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button-variants";
import { isResumeHidden } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeaderResumeLink() {
  const pathname = usePathname();

  if (isResumeHidden(pathname)) return null;

  return (
    <a
      href={site.links.resume}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "text-muted-foreground text-[13px]",
      )}
    >
      CV.pdf
    </a>
  );
}
