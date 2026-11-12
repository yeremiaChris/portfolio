"use client";

import dynamic from "next/dynamic";

const HeaderScrollBackdrop = dynamic(
  () =>
    import("@/components/motion/HeaderScrollBackdrop").then((mod) => ({
      default: mod.HeaderScrollBackdrop,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="header-scroll-backdrop-static pointer-events-none absolute inset-0 -z-10 border-b"
      />
    ),
  },
);

export function HeaderScrollBackdropSlot() {
  return <HeaderScrollBackdrop />;
}
