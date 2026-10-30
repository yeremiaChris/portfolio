import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative min-h-[80vh] w-full overflow-hidden py-14 md:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="bg-primary/5 pointer-events-none absolute -top-24 left-1/4 hidden size-96 rounded-full blur-3xl md:block"
      />

      <Container className="relative items-start">
        <HeroIntro />
      </Container>
    </section>
  );
}
