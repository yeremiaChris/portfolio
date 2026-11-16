import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  ContactCta,
  servicesContactActions,
} from "@/components/home/ContactCta";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesOfferings } from "@/components/services/ServicesOfferings";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { servicesSectionClass } from "@/components/services/servicesSurface";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  servicesContactCta,
  servicesPageMetaDescription,
} from "@/lib/services";
import { buildPageMetadata, buildServicesPageJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Services | Yeremia Chris Saragi",
  description: servicesPageMetaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={buildServicesPageJsonLd()} />
      <Container className="flex min-w-0 flex-col overflow-x-hidden py-4 md:py-5">
        <ServicesHero />
        <ServicesOfferings />
        <ServicesProcess />
        <Reveal when="inView" preset="calm">
          <ContactCta
            id="services-contact"
            withContainer={false}
            compact
            className={cn(servicesSectionClass, "mb-3")}
            eyebrow=""
            title={servicesContactCta.title}
            description=""
            actions={servicesContactActions()}
          />
        </Reveal>
      </Container>
    </main>
  );
}
