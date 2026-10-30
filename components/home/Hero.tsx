import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="hero-signal relative w-full overflow-hidden py-10 md:py-14 lg:py-16"
    >
      <Container className="relative items-start">
        <HeroIntro />
      </Container>
    </section>
  );
}
