import { MessageCircle } from "lucide-react";

import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";
import {
  servicesEyebrowBadgeClass,
  servicesPageContent,
  servicesSectionClass,
} from "@/components/services/servicesSurface";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero, servicesHeroLines } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  return (
    <section
      className={cn(servicesSectionClass, "relative w-full pb-6 md:pb-8")}
    >
      <div className={cn(servicesPageContent, "relative")}>
        <div
          className="bg-brand-accent/[0.07] pointer-events-none absolute -top-8 right-0 -z-10 size-[min(100%,24rem)] rounded-full blur-3xl md:-top-12 md:right-8 md:size-[28rem] md:blur-[120px]"
          aria-hidden
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="min-w-0 lg:col-span-7 lg:max-w-2xl">
            <Badge
              variant="secondary"
              className={cn(servicesEyebrowBadgeClass, "mb-3")}
            >
              <span
                className="bg-brand-accent size-2 shrink-0 rounded-full"
                aria-hidden
              />
              Services
            </Badge>
            <h1 className="font-heading text-foreground text-3xl sm:text-4xl lg:text-5xl lg:leading-tight">
              <span className="sr-only">{servicesHero.title}</span>
              <span aria-hidden className="flex flex-col">
                {servicesHeroLines.map((line) => (
                  <span key={line} className="block py-[0.04em] leading-[1.15]">
                    {line}
                  </span>
                ))}
              </span>
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2 md:mt-6">
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "h-11 gap-2 px-5 text-[14px] font-semibold shadow-[0_0_16px_rgba(76,215,246,0.22)]",
                )}
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                {servicesHero.whatsappCtaLabel}
              </a>
            </div>
          </div>
          <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
            <ServicesHeroVisual className="w-full max-w-[320px] lg:max-w-[420px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
