"use client";

import type { ReactNode } from "react";
import { LazyMotion, domMax } from "motion/react";

type HeaderMotionProviderProps = {
  children: ReactNode;
};

export function HeaderMotionProvider({ children }: HeaderMotionProviderProps) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
