import {
  servicesSectionClass,
  servicesSectionHeadingGap,
} from "@/components/services/servicesSurface";
import { SectionHeading } from "@/components/typography/SectionTypography";
import { Badge } from "@/components/ui/badge";
import {
  servicesOfferings,
  servicesOfferingsHeading,
  type ServiceOffering,
} from "@/lib/services";

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

  return (
    <article className="border-border/40 border-t py-4 first:border-t-0 md:py-5">
      <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-start md:gap-x-6 md:gap-y-2">
        <div className="flex min-w-0 items-baseline gap-3 md:col-span-1 md:block">
          <span className="text-brand-accent font-mono text-[13px] font-semibold tracking-widest md:text-sm">
            {number}
          </span>
          <h3 className="font-heading text-foreground text-lg font-semibold tracking-tight md:hidden">
            {offering.title}
          </h3>
        </div>

        <div className="min-w-0 space-y-1.5 md:col-span-5">
          <h3 className="font-heading text-foreground hidden text-lg font-semibold tracking-tight md:block">
            {offering.title}
          </h3>
          <p className="text-muted-foreground text-[14px] leading-relaxed md:text-[15px]">
            {offering.description}
          </p>
        </div>

        <div className="min-w-0 space-y-2 md:col-span-6">
          <ul className="flex flex-wrap gap-1.5">
            {offering.bullets.map((bullet) => (
              <li key={bullet}>
                <Badge
                  variant="outline"
                  className="text-foreground hover:border-brand-accent/45 hover:text-brand-accent rounded-md px-2 py-0.5 text-[11px] font-medium motion-reduce:transition-none sm:text-[12px]"
                >
                  {bullet}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground text-[11px] font-medium tracking-wide sm:text-[12px]">
            {offering.stack}
          </p>
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
