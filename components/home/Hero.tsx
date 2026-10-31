import { Container } from "@/components/Container";
import { HeroHeadline, HeroProduction } from "@/components/home/HeroIntro";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="hero-signal relative w-full overflow-hidden py-10 md:py-14 lg:py-16"
    >
      <Container className="relative flex w-full flex-col items-start gap-0">
        <div className="grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:gap-10">
          <HeroHeadline />
          <HeroVisual />
        </div>
        <HeroProduction />
      </Container>
    </section>
  );
}
