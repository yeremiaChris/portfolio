import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="hero-signal relative w-full overflow-hidden py-10 md:py-14 lg:py-16"
    >
      <Container className="relative items-start">
        <HeroVisual />
        <div className="relative z-10 w-full">
          <HeroIntro />
        </div>
      </Container>
    </section>
  );
}
