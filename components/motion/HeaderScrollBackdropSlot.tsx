"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { scheduleIdle } from "@/lib/schedule-idle";

const HeaderScrollBackdrop = dynamic(
  () =>
    import("@/components/motion/HeaderScrollBackdrop").then((mod) => ({
      default: mod.HeaderScrollBackdrop,
    })),
  { ssr: false },
);

export function HeaderScrollBackdropSlot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setReady(true), 4000);
  }, []);

  if (!ready) {
    return (
      <div
        aria-hidden
        className="header-scroll-backdrop-static pointer-events-none absolute inset-0 -z-10 border-b"
      />
    );
  }

  return <HeaderScrollBackdrop />;
}
