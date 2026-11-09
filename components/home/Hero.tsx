import { Container } from "@/components/Container";
import { HeroFoldMotion } from "@/components/home/HeroFoldMotion";
import { HeroProduction } from "@/components/home/HeroProduction";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="hero-signal relative w-full overflow-hidden py-10 md:py-14 lg:py-16"
    >
      <Container className="relative flex w-full flex-col items-start gap-0">
        <HeroFoldMotion />
        <Stagger when="mount" className="mt-8 w-full md:mt-10">
          <StaggerItem>
            <HeroProduction />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
