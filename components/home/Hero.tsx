import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden pt-10 pb-24 md:pt-16 md:pb-36"
    >
      <div
        aria-hidden
        className="bg-primary/5 pointer-events-none absolute -top-24 left-1/4 hidden size-96 rounded-full blur-3xl md:block"
      />

      <Container className="relative">
        <HeroIntro />
      </Container>
    </section>
  );
}
