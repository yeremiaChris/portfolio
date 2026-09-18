"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useSyncExternalStore } from "react";

import {
  IntroLockup,
  introOverlayClassName,
} from "@/components/intro/IntroLockup";
import {
  INTRO_BAR_DELAY_MS,
  INTRO_DURATION_MS,
  INTRO_EASE,
  INTRO_EXIT_MS,
  completeIntro,
  dismissIntroCover,
  getIntroClientSnapshot,
  getIntroExitAfterMs,
  getIntroServerSnapshot,
  getSessionStorage,
  subscribeIntroVisibility,
} from "@/lib/intro";

export function IntroLoader() {
  const showIntro = useSyncExternalStore(
    subscribeIntroVisibility,
    getIntroClientSnapshot,
    getIntroServerSnapshot,
  );

  useLayoutEffect(() => {
    if (!showIntro) return;

    const root = document.documentElement;
    dismissIntroCover(root.dataset);
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
          className={introOverlayClassName}
        >
          <IntroLockup
            bar={
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
                    delay: INTRO_BAR_DELAY_MS / 1000,
                    ease: INTRO_EASE,
                  }}
                />
              </div>
            }
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
