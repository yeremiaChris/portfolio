import { Container } from "@/components/Container";
import { ContactCtaPanel } from "@/components/home/ContactCta";
import { homeSectionSpacingClass } from "@/components/home/homeSurface";
import { SectionWithReveal } from "@/components/motion/SectionWithReveal";

export function HomeContactCta() {
  const headingId = "contact-heading";

  return (
    <SectionWithReveal
      id="contact"
      ariaLabelledby={headingId}
      className={homeSectionSpacingClass}
    >
      <Container>
        <ContactCtaPanel
          headingId={headingId}
          panelClassName="ring-1 ring-border/40"
        />
      </Container>
    </SectionWithReveal>
  );
}
