import { MessageCircle } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero, servicesHeroLines } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  return (
    <section className={cn(servicesSectionClass, "relative w-full")}>
      <div
        className="bg-brand-accent/[0.06] pointer-events-none absolute -top-6 right-0 -z-10 size-[min(100%,18rem)] rounded-full blur-3xl md:right-6 md:size-[22rem] md:blur-[100px]"
        aria-hidden
      />
      <Stagger
        when="mount"
        preset="expressive"
        className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center lg:gap-6"
      >
        <StaggerItem className="min-w-0 lg:col-span-7 lg:max-w-xl">
          <h1 className="font-heading text-foreground text-2xl sm:text-3xl lg:text-4xl lg:leading-tight">
            <span className="sr-only">{servicesHero.title}</span>
            <span aria-hidden className="flex flex-col">
              {servicesHeroLines.map((line) => (
                <span key={line} className="block py-[0.02em] leading-[1.12]">
                  {line}
                </span>
              ))}
            </span>
          </h1>
        </StaggerItem>
        <StaggerItem className="min-w-0 lg:col-span-7 lg:max-w-xl">
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "inline-flex h-10 gap-2 px-4 text-[13px] font-semibold shadow-[0_0_14px_rgba(76,215,246,0.2)]",
            )}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {servicesHero.whatsappCtaLabel}
          </a>
        </StaggerItem>
        <StaggerItem className="flex w-full justify-center lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:justify-end">
          <ServicesHeroVisual className="w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[280px]" />
        </StaggerItem>
      </Stagger>
    </section>
  );
}
