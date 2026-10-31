"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const HeaderMobileSheet = dynamic(
  () =>
    import("./HeaderMobileSheet").then((mod) => ({
      default: mod.HeaderMobileSheet,
    })),
  { ssr: false },
);

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  const [loadSheet, setLoadSheet] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "lg:hidden",
        )}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => {
          setLoadSheet(true);
          setOpen(true);
        }}
      >
        <MenuIcon />
      </button>
      {loadSheet ? (
        <HeaderMobileSheet open={open} onOpenChange={setOpen} />
      ) : null}
    </>
  );
}
