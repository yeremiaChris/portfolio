"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { isHeaderCompact } from "@/lib/header-compact";

const HeaderCompactContext = createContext(false);

export function useHeaderCompact(): boolean {
  return useContext(HeaderCompactContext);
}

export function HeaderCompactProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(() =>
    typeof window !== "undefined" ? isHeaderCompact(window.scrollY) : false,
  );

  useMotionValueEvent(scrollY, "change", (value) => {
    setCompact(isHeaderCompact(value));
  });

  const contextValue = useMemo(() => compact, [compact]);

  return (
    <HeaderCompactContext.Provider value={contextValue}>
      {children}
    </HeaderCompactContext.Provider>
  );
}
