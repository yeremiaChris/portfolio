import { Container } from "@/components/Container";
import { HeroFold } from "@/components/home/HeroFold";
import { HeroInteractiveSection } from "@/components/home/HeroInteractiveSection";
import { HeroScrollCue } from "@/components/home/HeroScrollCue";
import {
  homeHeroInnerClass,
  homeHeroShellClass,
} from "@/components/home/homeSurface";

export function Hero() {
  return (
    <HeroInteractiveSection
      id="overview"
      ariaLabelledby="hero-heading"
      className={homeHeroShellClass}
      footer={<HeroScrollCue targetId="work" />}
    >
      <Container
        className={`relative z-[2] flex w-full min-w-0 flex-col ${homeHeroInnerClass}`}
      >
        <HeroFold />
      </Container>
    </HeroInteractiveSection>
  );
}
