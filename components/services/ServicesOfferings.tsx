import { ArrowUpRight, Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { aboutBentoCardClass } from "@/components/about/aboutSurface";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  getServiceOfferingProjectHref,
  getServiceOfferingProjectTitle,
  servicesOfferings,
  type ServiceOffering,
  type ServiceOfferingId,
} from "@/lib/services";
import { cn } from "@/lib/utils";

const OFFERING_ICONS: Record<ServiceOfferingId, typeof Globe> = {
  websites: Globe,
  "web-systems": LayoutDashboard,
};

export function ServicesOfferings() {
  return (
    <section aria-label="Services" className="mb-10 w-full md:mb-12">
      <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {servicesOfferings.map((offering) => (
          <StaggerItem key={offering.id}>
            <ServiceOfferingCard offering={offering} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ServiceOfferingCard({ offering }: { offering: ServiceOffering }) {
  const Icon = OFFERING_ICONS[offering.id];
  const projectHref = getServiceOfferingProjectHref(offering);
  const projectTitle = getServiceOfferingProjectTitle(offering);

  return (
    <article
      className={cn(
        aboutBentoCardClass,
        "flex h-full min-h-[18rem] flex-col justify-between",
      )}
    >
      <div className="space-y-4">
        <div className="bg-brand-accent/10 text-brand-accent border-brand-accent/35 inline-flex size-10 items-center justify-center rounded-lg border">
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-foreground text-xl font-semibold tracking-tight">
            {offering.title}
          </h3>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            {offering.description}
          </p>
        </div>
        <ul className="text-foreground space-y-2 text-[14px] leading-relaxed">
          {offering.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span
                className="bg-brand-accent mt-2 size-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-border/40 mt-6 flex flex-col gap-3 border-t pt-4">
        <p className="text-brand-accent text-[12px] font-medium tracking-wide">
          {offering.stack}
        </p>
        {projectHref && projectTitle ? (
          <Link
            href={projectHref}
            className="text-foreground hover:text-brand-accent group inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 motion-reduce:transition-none"
          >
            <span>See {projectTitle}</span>
            <ArrowUpRight
              className="size-3.5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
