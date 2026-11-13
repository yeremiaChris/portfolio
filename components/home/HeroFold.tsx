import { HeroBuildRotatorSlot } from "@/components/home/HeroBuildRotatorSlot";
import { HeroEyebrow } from "@/components/home/HeroEyebrow";
import { HeroHeadlineCopy } from "@/components/home/HeroHeadlineCopy";
import { HeroHeadlineRoot } from "@/components/home/HeroHeadlineRoot";
import { HeroNameRevealBridge } from "@/components/home/HeroNameReveal";
import { HeroStatusPill } from "@/components/home/HeroStatusPill";
import {
  HeroReadyAttribute,
  HeroReadyProvider,
} from "@/components/home/HeroReady";
import { HeroVisualSlot } from "@/components/home/HeroVisualSlot";

export function HeroFold() {
  return (
    <HeroReadyProvider>
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-8 overflow-hidden lg:gap-10 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:items-center">
        <HeroHeadlineRoot>
          <HeroReadyAttribute />
          <HeroEyebrow />
          <HeroNameRevealBridge />
          <HeroStatusPill />
          <HeroBuildRotatorSlot />
          <HeroHeadlineCopy />
        </HeroHeadlineRoot>
        <HeroVisualSlot />
      </div>
    </HeroReadyProvider>
  );
}
