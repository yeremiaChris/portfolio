"use client";

import { useReducedMotion } from "motion/react";

import { usePointerFine } from "@/components/projects/usePointerFine";
import { useHydrated } from "@/components/motion/useHydrated";

export function useHomeMotionReduced(): boolean {
  return useReducedMotion() === true;
}

export function useHomePointerEffectsEnabled(): boolean {
  const hydrated = useHydrated();
  const pointerFine = usePointerFine();
  const reduced = useHomeMotionReduced();
  return hydrated && pointerFine && !reduced;
}

export function useHomeScrollMotionEnabled(): boolean {
  const hydrated = useHydrated();
  const reduced = useHomeMotionReduced();
  return hydrated && !reduced;
}
