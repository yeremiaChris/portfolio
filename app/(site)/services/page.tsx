import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ServicesContactCta } from "@/components/services/ServicesContactCta";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesOfferings } from "@/components/services/ServicesOfferings";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesPageMetaDescription } from "@/lib/services";
import { buildPageMetadata, buildServicesPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services | Yeremia Chris Saragi",
  description: servicesPageMetaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={buildServicesPageJsonLd()} />
      <Container className="flex min-w-0 flex-col overflow-x-clip py-6 md:py-8 lg:py-10">
        <ServicesHero />
        <ServicesOfferings />
        <ServicesProcess />
        <ServicesContactCta />
      </Container>
    </main>
  );
}
