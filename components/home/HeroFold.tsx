import { HeroBuildRotatorSlot } from "@/components/home/HeroBuildRotatorSlot";
import { HeroHeadlineCopy } from "@/components/home/HeroHeadlineCopy";
import { HeroNameRevealBridge } from "@/components/home/HeroNameReveal";
import { HeroVisualSlot } from "@/components/home/HeroVisualSlot";

export function HeroFold() {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:items-center">
      <div
        id="hero-headline-root"
        className="hero-signal-headline relative w-full min-w-0 text-left"
      >
        <HeroNameRevealBridge />
        <HeroBuildRotatorSlot />
        <HeroHeadlineCopy />
      </div>
      <HeroVisualSlot />
    </div>
  );
}
