"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

import {
  INTRO_BAR_DELAY_MS,
  INTRO_DURATION_MS,
  INTRO_EASE,
  INTRO_EXIT_MS,
  INTRO_STAGGER_MS,
  completeIntro,
  getIntroClientSnapshot,
  getIntroExitAfterMs,
  getIntroServerSnapshot,
  getSessionStorage,
  subscribeIntroVisibility,
} from "@/lib/intro";
import { site } from "@/lib/site";

const introStack = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: INTRO_STAGGER_MS / 1000,
    },
  },
};

const introItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: INTRO_EASE,
    },
  },
};

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
    }, getIntroExitAfterMs());

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
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: INTRO_EXIT_MS / 1000,
            ease: INTRO_EASE,
          }}
          className="bg-background fixed inset-0 z-110 flex items-center justify-center overflow-hidden"
        >
          <div
            aria-hidden
            className="from-primary/15 pointer-events-none absolute top-1/4 left-1/2 size-112 -translate-x-1/2 rounded-full bg-linear-to-b to-transparent blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[12%] bottom-1/4 size-72 rounded-full bg-[#4cd7f6]/10 blur-3xl"
          />

          <motion.div
            className="relative flex flex-col items-center gap-7 px-6"
            variants={introStack}
            initial="hidden"
            animate="show"
          >
            <motion.p
              className="text-primary font-mono text-[13px] font-bold tracking-tight"
              variants={introItem}
            >
              {"<YC />"}
            </motion.p>

            <motion.p
              className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
              variants={introItem}
            >
              <span className="from-primary bg-linear-to-r via-[#6ffbbe] to-[#4cd7f6] bg-clip-text text-transparent">
                {site.name}
              </span>
            </motion.p>

            <motion.p
              className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase"
              variants={introItem}
            >
              {site.role}
            </motion.p>

            <motion.div
              aria-hidden
              className="bg-secondary h-0.5 w-44 overflow-hidden rounded-full sm:w-56"
              variants={introItem}
            >
              <motion.div
                className="from-primary h-full w-full origin-left bg-linear-to-r via-[#6ffbbe] to-[#4cd7f6]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: INTRO_DURATION_MS / 1000,
                  delay: INTRO_BAR_DELAY_MS / 1000,
                  ease: INTRO_EASE,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
