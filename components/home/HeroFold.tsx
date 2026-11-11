import { HeroBuildRotatorSlot } from "@/components/home/HeroBuildRotatorSlot";
import { HeroHeadlineCopy } from "@/components/home/HeroHeadlineCopy";
import { HeroHeadlineRoot } from "@/components/home/HeroHeadlineRoot";
import { HeroNameRevealBridge } from "@/components/home/HeroNameReveal";
import {
  HeroReadyAttribute,
  HeroReadyProvider,
} from "@/components/home/HeroReady";
import { HeroVisualSlot } from "@/components/home/HeroVisualSlot";

export function HeroFold() {
  return (
    <HeroReadyProvider>
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:items-center">
        <HeroHeadlineRoot>
          <HeroReadyAttribute />
          <HeroNameRevealBridge />
          <HeroBuildRotatorSlot />
          <HeroHeadlineCopy />
        </HeroHeadlineRoot>
        <HeroVisualSlot />
      </div>
    </HeroReadyProvider>
  );
}
