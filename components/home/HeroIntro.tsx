import { ArrowRightIcon, FileTextIcon, MailIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { buttonVariants } from "@/components/ui/button-variants";
import { heroCtas } from "@/lib/hero";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const accentButtonClassName =
  "bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover";

export function HeroHeadlineCopy() {
  return (
    <Stagger when="mount" preset="expressive" className="w-full min-w-0">
      <StaggerItem>
        <p
          className={cn(
            "text-muted-foreground mt-2 text-left text-lg font-medium tracking-tight md:mt-3 md:text-xl md:whitespace-nowrap",
          )}
        >
          {site.role}
        </p>
      </StaggerItem>

      <StaggerItem>
        <p
          className={cn(
            "text-foreground/80 mt-5 max-w-[65ch] text-left text-lg leading-[1.7] sm:text-xl md:mt-6",
          )}
        >
          {site.heroBio}
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="mt-6 flex w-full flex-wrap items-start justify-start gap-3 md:mt-8 md:gap-4">
          <a
            href={heroCtas.primary.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              accentButtonClassName,
              "h-12 px-6 text-base",
            )}
          >
            <MailIcon className="size-5" />
            {heroCtas.primary.label}
          </a>
          <a
            href={heroCtas.secondary.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-6 text-base",
            )}
          >
            {heroCtas.secondary.label}
            <ArrowRightIcon className="size-5" />
          </a>
          <a
            href={heroCtas.resume.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-6 text-base",
            )}
          >
            <FileTextIcon className="size-5" />
            {heroCtas.resume.label}
          </a>
        </div>
      </StaggerItem>
    </Stagger>
  );
}
