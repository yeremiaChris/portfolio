import { HeroBuildRotatorFallback } from "@/components/home/HeroBuildRotatorFallback";
import { HeroBuildRotatorSlot } from "@/components/home/HeroBuildRotatorSlot";
import { HeroCodeSnippetMotionSlot } from "@/components/home/HeroCodeSnippetMotionSlot";
import { HeroEyebrow } from "@/components/home/HeroEyebrow";
import { HeroHeadlineCopy } from "@/components/home/HeroHeadlineCopy";
import { HeroHeadlineRoot } from "@/components/home/HeroHeadlineRoot";
import { HeroNameRevealBridge } from "@/components/home/HeroNameReveal";
import { HeroStatusPill } from "@/components/home/HeroStatusPill";
import {
  HeroReadyAttribute,
  HeroReadyProvider,
} from "@/components/home/HeroReady";
import { HeroVisualShell } from "@/components/home/HeroVisualShell";

export function HeroFold() {
  return (
    <HeroReadyProvider>
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_min(420px,38%)] xl:items-center">
        <HeroHeadlineRoot>
          <HeroReadyAttribute />
          <HeroEyebrow />
          <HeroNameRevealBridge />
          <HeroStatusPill />
          <div className="hero-build-rotator-wrap relative grid">
            <HeroBuildRotatorFallback className="hero-build-rotator-fallback col-start-1 row-start-1" />
            <HeroBuildRotatorSlot className="col-start-1 row-start-1" />
          </div>
          <HeroHeadlineCopy />
        </HeroHeadlineRoot>
        <HeroVisualShell motionSlot={<HeroCodeSnippetMotionSlot />} />
      </div>
    </HeroReadyProvider>
  );
}
