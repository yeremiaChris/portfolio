"use client";

import { useReducedMotion } from "motion/react";

import { useHydrated } from "@/components/motion/useHydrated";
import { usePointerFine } from "@/components/projects/usePointerFine";

export type HomeMotionGate = {
  reduced: boolean;
  scroll: boolean;
  pointer: boolean;
};

export function useHomeMotion(): HomeMotionGate {
  const reduced = useReducedMotion() === true;
  const hydrated = useHydrated();
  const pointerFine = usePointerFine();
  return {
    reduced,
    scroll: hydrated && !reduced,
    pointer: hydrated && pointerFine && !reduced,
  };
}

export function useHomeMotionReduced(): boolean {
  return useHomeMotion().reduced;
}

export function useHomeScrollMotionEnabled(): boolean {
  return useHomeMotion().scroll;
}

export function useHomePointerEffectsEnabled(): boolean {
  return useHomeMotion().pointer;
}
