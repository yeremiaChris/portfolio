import { MessageCircle } from "lucide-react";

import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero, servicesHeroLines } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  return (
    <section className="relative w-full pb-10 md:pb-14">
      <div
        className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full blur-3xl md:blur-[140px]"
        aria-hidden
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="min-w-0 lg:col-span-7 lg:max-w-2xl">
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
    </section>
  );
}
