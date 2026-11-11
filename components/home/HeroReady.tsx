"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

export function HeroReadyAttribute() {
  const { ready } = useHeroReady();

  useLayoutEffect(() => {
    const root = document.getElementById(HERO_HEADLINE_ROOT_ID);
    if (!root) {
      return;
    }
    if (ready) {
      root.setAttribute("data-hero-ready", "");
    } else {
      root.removeAttribute("data-hero-ready");
    }
  }, [ready]);

  return null;
}
