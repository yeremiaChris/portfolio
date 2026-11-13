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
  return true;
}

type MotionWorkflow = ComponentType | null;

export function AboutLargeViewportMotion({
  fallback,
}: AboutLargeViewportMotionProps) {
  const isLarge = useSyncExternalStore(
    subscribeLargeViewport,
    getLargeViewportSnapshot,
    getLargeViewportServerSnapshot,
  );
  const [Workflow, setWorkflow] = useState<MotionWorkflow>(null);

  useEffect(() => {
    if (!isLarge) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let cancelled = false;
    const cancelIdle = scheduleIdle(() => {
      void import("@/components/about/AboutWorkflowMotion").then(
        (workflowMod) => {
          if (!cancelled) {
            setWorkflow(() => workflowMod.AboutWorkflowMotion);
          }
        },
      );
    }, 600);
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [isLarge]);

  if (!isLarge) {
    return null;
  }

  if (!Workflow) {
    return fallback;
  }

  return <Workflow />;
}
