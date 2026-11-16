"use client";

import type { ReactNode } from "react";
import { Fragment } from "react";

import { RouteScrollToTop } from "@/components/motion/RouteScrollToTop";
import { SmoothScrollLenisMount } from "@/components/motion/SmoothScrollLenis";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <Fragment>
      {children}
      <RouteScrollToTop />
      <SmoothScrollLenisMount />
    </Fragment>
  );
}
