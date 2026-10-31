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
        <div className="relative grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="relative z-10 min-w-0">
            <HeroIntro />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-end opacity-[0.14] max-lg:z-0 lg:pointer-events-auto lg:relative lg:inset-auto lg:top-auto lg:opacity-100">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
