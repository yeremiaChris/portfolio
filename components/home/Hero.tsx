import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="hero-signal relative min-h-[82vh] w-full overflow-hidden py-16 md:py-24 lg:py-28"
    >
      <Container className="relative items-start">
        <HeroIntro />
      </Container>
    </section>
  );
}
