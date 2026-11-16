import { MessageCircle } from "lucide-react";

import { ServicesFadeUp } from "@/components/services/ServicesFadeUp";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  return (
    <section className={cn(servicesSectionClass, "w-full max-w-2xl")}>
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-2 md:gap-2.5">
          <h1 className="font-heading text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {servicesHero.title}
          </h1>
          <ServicesFadeUp when="mount" delay={0.08}>
            <p className="text-muted-foreground text-[15px] leading-relaxed sm:text-base">
              {servicesHero.supportingLine}
            </p>
          </ServicesFadeUp>
        </div>
        <ServicesFadeUp when="mount" delay={0.18}>
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "inline-flex h-10 w-fit gap-2 px-4 text-[13px] font-semibold",
            )}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {servicesHero.whatsappCtaLabel}
          </a>
        </ServicesFadeUp>
      </div>
    </section>
  );
}
