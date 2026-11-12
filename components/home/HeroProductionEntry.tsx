"use client";

import { useEffect, useState, type ComponentType } from "react";

import { HeroProductionStatic } from "@/components/home/HeroProductionStatic";

export function HeroProductionEntry() {
  const [Production, setProduction] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("@/components/home/HeroProduction").then((mod) => {
      if (!cancelled) {
        setProduction(() => mod.HeroProduction);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Production) {
    return <HeroProductionStatic />;
  }

  return <Production />;
}
