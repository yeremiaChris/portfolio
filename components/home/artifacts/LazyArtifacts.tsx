"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TokenEngine = dynamic(
  () =>
    import("@/components/home/artifacts/TokenEngine").then((mod) => ({
      default: mod.TokenEngine,
    })),
  { ssr: false },
);

const FsmLab = dynamic(
  () =>
    import("@/components/home/artifacts/FsmLab").then((mod) => ({
      default: mod.FsmLab,
    })),
  { ssr: false },
);

function ArtifactFallback() {
  return (
    <div className="bg-muted ring-border/20 min-h-80 rounded-xl" aria-hidden />
  );
}

function useLoadWhenVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || load) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setLoad(true);
        observer.disconnect();
      },
      { rootMargin: "280px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [load]);

  return { ref, load };
}

export function LazyTokenEngine() {
  const { ref, load } = useLoadWhenVisible();

  return <div ref={ref}>{load ? <TokenEngine /> : <ArtifactFallback />}</div>;
}

export function LazyFsmLab() {
  const { ref, load } = useLoadWhenVisible();

  return <div ref={ref}>{load ? <FsmLab /> : <ArtifactFallback />}</div>;
}
