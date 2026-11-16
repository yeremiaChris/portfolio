import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";
import { ServicesWhatsAppCta } from "@/components/services/ServicesWhatsAppCta";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { servicesHero, servicesHeroLines } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  return (
    <section className={cn(servicesSectionClass, "relative w-full")}>
      <div
        className="bg-brand-accent/[0.06] pointer-events-none absolute -top-6 right-0 -z-10 size-[min(100%,18rem)] rounded-full blur-3xl md:right-6 md:size-[22rem] md:blur-[100px]"
        aria-hidden
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="min-w-0 lg:col-span-7 lg:max-w-xl">
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
          <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4">
            <ServicesWhatsAppCta />
          </div>
        </div>
        <div className="flex w-full justify-center lg:col-span-5 lg:justify-end">
          <ServicesHeroVisual className="w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[280px]" />
        </div>
      </div>
    </section>
  );
}
