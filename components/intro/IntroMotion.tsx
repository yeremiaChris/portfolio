"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";

import { getIntroClientSnapshot, subscribeIntroVisibility } from "@/lib/intro";

const IntroLoader = dynamic(
  () => import("./IntroLoader").then((mod) => ({ default: mod.IntroLoader })),
  { ssr: false },
);

export function IntroMotion() {
  const showIntro = useSyncExternalStore(
    subscribeIntroVisibility,
    getIntroClientSnapshot,
    () => false,
  );
  const [loadIntro, setLoadIntro] = useState(false);

  if (showIntro && !loadIntro) {
    setLoadIntro(true);
  }

  if (!loadIntro) return null;

  return <IntroLoader />;
}
