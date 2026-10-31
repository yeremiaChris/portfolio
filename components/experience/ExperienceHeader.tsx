import { Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { experienceIntro } from "@/lib/experience";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ExperienceHeader() {
  return (
    <section className="flex w-full flex-col gap-4 pt-2 pb-6 md:pt-4 md:pb-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <p className="text-foreground/75 text-xs font-medium tracking-wide uppercase">
              {experienceIntro.eyebrow}
            </p>
            <Badge
              variant="secondary"
              className="text-foreground/80 rounded-full px-3 py-1 text-xs font-medium"
            >
              {experienceIntro.tenureBadge}
            </Badge>
          </div>
          <h1 className="font-heading text-foreground text-3xl sm:text-4xl">
            {experienceIntro.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-[15px] leading-[1.7]">
            {experienceIntro.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={site.links.email}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "h-9 px-4 text-[13px]",
            )}
          >
            Contact recruiter
          </a>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-9 gap-2 px-4 text-[13px] font-semibold shadow-[0_0_16px_rgba(78,222,163,0.25)]",
            )}
          >
            <Download className="size-4" aria-hidden />
            CV.pdf
          </a>
        </div>
      </div>
    </section>
  );
}
