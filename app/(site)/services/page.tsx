import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  ContactCta,
  servicesContactActions,
} from "@/components/home/ContactCta";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesOfferings } from "@/components/services/ServicesOfferings";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import {
  servicesPageContent,
  servicesSectionClass,
} from "@/components/services/servicesSurface";
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
      <Container className="flex min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <ServicesHero />
        <ServicesOfferings />
        <ServicesProcess />
        <div className={cn(servicesPageContent, servicesSectionClass, "mb-4")}>
          <ContactCta
            id="services-contact"
            withContainer={false}
            className="mb-0 w-full"
            panelClassName="ring-1 ring-border/40"
            eyebrow="Services"
            title={servicesContactCta.title}
            description=""
            actions={servicesContactActions()}
          />
        </div>
      </Container>
    </main>
  );
}
