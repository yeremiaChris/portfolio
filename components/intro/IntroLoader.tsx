"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

import {
  INTRO_DURATION_MS,
  INTRO_EXIT_MS,
  completeIntro,
  getIntroClientSnapshot,
  getIntroServerSnapshot,
  getSessionStorage,
  subscribeIntroVisibility,
} from "@/lib/intro";
import { site } from "@/lib/site";

export function IntroLoader() {
  const showIntro = useSyncExternalStore(
    subscribeIntroVisibility,
    getIntroClientSnapshot,
    getIntroServerSnapshot,
  );

  useEffect(() => {
    if (!showIntro) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const timeoutId = window.setTimeout(() => {
      completeIntro(getSessionStorage());
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
      root.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  return (
    <AnimatePresence>
      {showIntro ? (
        <motion.div
          key="intro-loader"
          data-intro-loader=""
          role="status"
          aria-busy="true"
          aria-label="Introducing the site"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{
            duration: INTRO_EXIT_MS / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="bg-background fixed inset-0 z-100 flex items-center justify-center overflow-hidden"
        >
          <div
            aria-hidden
            className="from-primary/15 pointer-events-none absolute top-1/4 left-1/2 size-112 -translate-x-1/2 rounded-full bg-linear-to-b to-transparent blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[12%] bottom-1/4 size-72 rounded-full bg-[#4cd7f6]/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-7 px-6">
            <p className="text-primary font-mono text-[13px] font-bold tracking-tight">
              {"<YC />"}
            </p>

            <p className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="from-primary bg-linear-to-r via-[#6ffbbe] to-[#4cd7f6] bg-clip-text text-transparent">
                {site.name}
              </span>
            </p>

            <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
              {site.role}
            </p>

            <div
              aria-hidden
              className="bg-secondary h-0.5 w-44 overflow-hidden rounded-full sm:w-56"
            >
              <motion.div
                className="from-primary h-full w-full origin-left bg-linear-to-r via-[#6ffbbe] to-[#4cd7f6]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: INTRO_DURATION_MS / 1000,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
