"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

const HERO_HEADLINE_ROOT_ID = "hero-headline-root";

type HeroReadyContextValue = {
  ready: boolean;
  markReady: () => void;
};

const HeroReadyContext = createContext<HeroReadyContextValue | null>(null);

type HeroReadyProviderProps = {
  children: ReactNode;
};

export function HeroReadyProvider({ children }: HeroReadyProviderProps) {
  const [ready, setReady] = useState(false);

  const markReady = useCallback(() => {
    setReady((current) => current || true);
  }, []);

  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);

  return (
    <HeroReadyContext.Provider value={value}>
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady(): HeroReadyContextValue {
  const context = useContext(HeroReadyContext);
  if (!context) {
    throw new Error("useHeroReady must be used within HeroReadyProvider");
  }
  return context;
}

type HeroHeadlineRootProps = {
  children: ReactNode;
  className?: string;
};

export function HeroHeadlineRoot({
  children,
  className,
}: HeroHeadlineRootProps) {
  const { ready } = useHeroReady();

  return (
    <div
      id={HERO_HEADLINE_ROOT_ID}
      data-hero-ready={ready ? "" : undefined}
      className={cn(
        "hero-signal-headline relative w-full min-w-0 text-left",
        className,
      )}
    >
      {children}
    </div>
  );
}
