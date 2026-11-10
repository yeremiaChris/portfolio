import { Container } from "@/components/Container";
import { HeroAtmosphere } from "@/components/home/HeroAtmosphere";
import { HeroFoldMotion } from "@/components/home/HeroFoldMotion";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import { HeroViewportSection } from "@/components/home/HeroViewportSection";
import { HeroProduction } from "@/components/home/HeroProduction";

export function Hero() {
  return (
    <>
      <HeroViewportSection
        id="overview"
        ariaLabelledby="hero-heading"
        className="hero-signal relative flex w-full flex-col overflow-x-clip pt-10 pb-16 md:pt-14 md:pb-20 lg:min-h-[calc(100svh-var(--nav-height))] lg:pt-8 lg:pb-14"
        footer={<HeroScrollCue targetId="production" />}
      >
        <HeroAtmosphere />
        <Container className="relative z-10 flex w-full flex-1 flex-col justify-center lg:py-6">
          <HeroFoldMotion />
        </Container>
      </HeroViewportSection>
      <div
        id="production"
        className="w-full scroll-mt-6 pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12"
      >
        <Container>
          <HeroProduction />
        </Container>
      </div>
    </>
  );
}
