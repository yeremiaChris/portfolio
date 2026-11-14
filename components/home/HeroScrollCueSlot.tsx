"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const HeroScrollCue = dynamic(
  () =>
    import("@/components/home/HeroScrollCue").then((mod) => ({
      default: mod.HeroScrollCue,
    })),
  { ssr: false },
);

function subscribeLgViewport(onStoreChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getLgViewportSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getLgViewportServerSnapshot() {
  return false;
}

type HeroScrollCueSlotProps = {
  targetId: string;
  className?: string;
};

export function HeroScrollCueSlot({
  targetId,
  className,
}: HeroScrollCueSlotProps) {
  const largeViewport = useSyncExternalStore(
    subscribeLgViewport,
    getLgViewportSnapshot,
    getLgViewportServerSnapshot,
  );

  if (!largeViewport) {
    return null;
  }

  return <HeroScrollCue targetId={targetId} className={className} />;
}
