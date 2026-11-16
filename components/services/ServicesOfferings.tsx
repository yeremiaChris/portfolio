import {
  ServicesOfferingVisual,
  type ServicesOfferingVisualVariant,
} from "@/components/services/ServicesHeroVisual";
import { ServicesWhatsAppCta } from "@/components/services/ServicesWhatsAppCta";
import {
  servicesSectionClass,
  servicesSectionHeadingGap,
} from "@/components/services/servicesSurface";
import { SectionHeading } from "@/components/typography/SectionTypography";
import {
  servicesOfferings,
  servicesOfferingsHeading,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const offeringVisualVariant: Record<
  ServiceOfferingId,
  ServicesOfferingVisualVariant
> = {
  websites: "landing",
  "web-systems": "dashboard",
};

function formatOfferingIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function OfferingRow({
  offering,
  index,
}: {
  offering: ServiceOffering;
  index: number;
}) {
  const number = formatOfferingIndex(index);
  const visualReversed = index === 1;

  return (
    <article className="border-border/40 border-t py-6 first:border-t-0 md:py-8 lg:py-9">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
        <div
          className={cn(
            "min-w-0 space-y-4 lg:col-span-7",
            visualReversed ? "lg:col-start-6" : "lg:col-start-1",
          )}
        >
          <span className="text-brand-accent font-mono text-sm font-semibold tracking-widest">
            {number}
          </span>
          <div className="space-y-3">
            <h3 className="font-heading text-foreground text-xl font-semibold tracking-tight sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
              {offering.title}
            </h3>
            <p className="text-muted-foreground max-w-xl text-[15px] leading-relaxed sm:text-base">
              {offering.description}
            </p>
          </div>
          <ul className="text-muted-foreground flex flex-col gap-1.5 text-[13px] sm:text-sm">
            {offering.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 leading-snug">
                <span
                  className="bg-brand-accent/90 mt-[0.45em] size-1 shrink-0 rounded-full"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-[11px] font-medium tracking-wide sm:text-[12px]">
            {offering.stack}
          </p>
          <div className="pt-1">
            <ServicesWhatsAppCta className="w-full sm:w-auto" />
          </div>
        </div>

        <div
          className={cn(
            "flex w-full justify-center lg:col-span-5",
            visualReversed
              ? "lg:col-start-1 lg:row-start-1 lg:justify-start"
              : "lg:col-start-8 lg:justify-end",
          )}
        >
          <ServicesOfferingVisual
            variant={offeringVisualVariant[offering.id]}
            className="mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:mx-0 lg:max-w-none"
          />
        </div>
      </div>
    </article>
  );
}

export function ServicesOfferings() {
  return (
    <section
      aria-labelledby="services-offerings-heading"
      className={servicesSectionClass}
    >
      <SectionHeading
        id="services-offerings-heading"
        className={servicesSectionHeadingGap}
      >
        {servicesOfferingsHeading}
      </SectionHeading>

      <div className="border-border/40 border-b">
        {servicesOfferings.map((offering, index) => (
          <OfferingRow key={offering.id} offering={offering} index={index} />
        ))}
      </div>
    </section>
  );
}
