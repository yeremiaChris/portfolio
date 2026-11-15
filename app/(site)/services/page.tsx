import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  ContactCta,
  servicesContactActions,
} from "@/components/home/ContactCta";
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ServicesOfferings } from "@/components/services/ServicesOfferings";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { servicesContactCta, servicesHero } from "@/lib/services";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services | Yeremia Chris Saragi",
  description: servicesHero.title,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <Container className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-col overflow-x-hidden py-6 md:py-8">
        <ServicesHeader />
        <ServicesOfferings />
        <ServicesProcess />
        <ContactCta
          id="services-contact"
          withContainer={false}
          className="mb-4"
          panelClassName="ring-1 ring-border/40"
          eyebrow="Services"
          title={servicesContactCta.title}
          description=""
          actions={servicesContactActions()}
        />
      </Container>
    </main>
  );
}
