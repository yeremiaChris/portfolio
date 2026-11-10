import { Container } from "@/components/Container";
import { HeroFoldMotion } from "@/components/home/HeroFoldMotion";
import { HeroProduction } from "@/components/home/HeroProduction";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Hero() {
  return (
    <>
      <section
        id="overview"
        aria-labelledby="hero-heading"
        className="hero-signal relative flex w-full flex-col overflow-hidden pt-10 pb-16 md:pt-14 md:pb-20 lg:min-h-[calc(100svh-var(--nav-height))] lg:pt-8 lg:pb-14"
      >
        <div
          aria-hidden
          className="hero-signal-dots pointer-events-none absolute inset-0 z-0"
        />
        <Container className="relative z-10 flex w-full flex-1 flex-col justify-center lg:py-6">
          <HeroFoldMotion />
        </Container>
        <HeroScrollCue targetId="production" />
      </section>
      <div id="production" className="w-full scroll-mt-6">
        <Container>
          <Stagger when="mount" className="w-full">
            <StaggerItem>
              <HeroProduction />
            </StaggerItem>
          </Stagger>
        </Container>
      </div>
    </>
  );
}
