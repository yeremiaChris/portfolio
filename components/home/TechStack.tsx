import { Container } from "@/components/Container";
import { TechStackConstellation } from "@/components/home/TechStackConstellation";
import { SectionIntro } from "@/components/typography/SectionTypography";
import { techStackIntro } from "@/lib/tech-stack";

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="w-full py-12 md:py-16"
    >
      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionIntro
          eyebrow={techStackIntro.eyebrow}
          title={techStackIntro.title}
          description={techStackIntro.description}
          headingId="tech-stack-heading"
        />

        <TechStackConstellation />
      </Container>
    </section>
  );
}
