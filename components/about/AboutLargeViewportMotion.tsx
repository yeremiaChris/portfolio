"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";

import { scheduleIdle } from "@/lib/schedule-idle";

const LG_QUERY = "(min-width: 1024px)";

type AboutLargeViewportMotionProps = {
  fallback: ReactNode;
};

function subscribeLargeViewport(onStoreChange: () => void) {
  const media = window.matchMedia(LG_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getLargeViewportSnapshot() {
  return window.matchMedia(LG_QUERY).matches;
}

function getLargeViewportServerSnapshot() {
  return false;
}

type MotionSections = {
  Story: ComponentType;
  Workflow: ComponentType;
} | null;

export function AboutLargeViewportMotion({
  fallback,
}: AboutLargeViewportMotionProps) {
  const isLarge = useSyncExternalStore(
    subscribeLargeViewport,
    getLargeViewportSnapshot,
    getLargeViewportServerSnapshot,
  );
  const [sections, setSections] = useState<MotionSections>(null);

  useEffect(() => {
    if (!isLarge) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let cancelled = false;
    const cancelIdle = scheduleIdle(() => {
      void Promise.all([
        import("@/components/about/AboutStoryMotion"),
        import("@/components/about/AboutWorkflowMotion"),
      ]).then(([storyMod, workflowMod]) => {
        if (!cancelled) {
          setSections({
            Story: storyMod.AboutStoryMotion,
            Workflow: workflowMod.AboutWorkflowMotion,
          });
        }
      });
    }, 600);
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [isLarge]);

  if (!isLarge) {
    return null;
  }

  if (!sections) {
    return fallback;
  }

  const { Story, Workflow } = sections;

  return (
    <>
      <Story />
      <Workflow />
    </>
  );
}
