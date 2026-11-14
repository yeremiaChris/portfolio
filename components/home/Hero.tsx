import { Container } from "@/components/Container";
import { HeroAtmosphere } from "@/components/home/HeroAtmosphere";
import { HeroFold } from "@/components/home/HeroFold";
import { HeroScrollCueSlot } from "@/components/home/HeroScrollCueSlot";
import { HeroViewportSection } from "@/components/home/HeroViewportSection";

export function Hero() {
  return (
    <HeroViewportSection
      id="overview"
      ariaLabelledby="hero-heading"
      className="hero-signal relative flex w-full flex-col overflow-x-clip pt-10 pb-16 md:pt-14 md:pb-20 lg:min-h-[calc(100svh-var(--nav-height))] lg:pt-8 lg:pb-14"
      footer={<HeroScrollCueSlot targetId="work" />}
    >
      <HeroAtmosphere />
      <Container className="relative z-10 flex w-full flex-1 flex-col justify-center lg:py-6">
        <HeroFold />
      </Container>
    </HeroViewportSection>
  );
}
