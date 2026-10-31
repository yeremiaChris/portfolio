"use client";

import dynamic from "next/dynamic";

import { HeroVisualPlaceholder } from "@/components/home/HeroVisualPlaceholder";

const HeroVisual = dynamic(
  () =>
    import("@/components/home/HeroVisual").then((mod) => ({
      default: mod.HeroVisual,
    })),
  {
    ssr: false,
    loading: () => <HeroVisualPlaceholder />,
  },
);

export function HeroVisualDynamic() {
  return <HeroVisual />;
}
