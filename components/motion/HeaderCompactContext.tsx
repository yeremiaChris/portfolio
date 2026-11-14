"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { resolveHeaderCompact } from "@/lib/header-compact";

const HeaderCompactContext = createContext(false);

export function useHeaderCompact(): boolean {
  return useContext(HeaderCompactContext);
}

export function HeaderCompactProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(() =>
    typeof window !== "undefined"
      ? resolveHeaderCompact(window.scrollY, false)
      : false,
  );

  useMotionValueEvent(scrollY, "change", (value) => {
    setCompact((current) => resolveHeaderCompact(value, current));
  });

  const contextValue = useMemo(() => compact, [compact]);

  return (
    <HeaderCompactContext.Provider value={contextValue}>
      {children}
    </HeaderCompactContext.Provider>
  );
}
