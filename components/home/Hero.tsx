import { Container } from "@/components/Container";
import { HeroFoldMotion } from "@/components/home/HeroFoldMotion";
import { HeroProduction } from "@/components/home/HeroProduction";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="hero-signal relative w-full overflow-hidden pt-10 pb-6 md:pt-14 md:pb-8 lg:pt-16 lg:pb-9"
    >
      <Container className="relative flex w-full flex-col items-start gap-0">
        <HeroFoldMotion />
        <Stagger when="mount" className="mt-6 w-full md:mt-7">
          <StaggerItem>
            <HeroProduction />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
