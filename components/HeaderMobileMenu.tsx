"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

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
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => {
          setLoadSheet(true);
          setOpen(true);
        }}
      >
        <MenuIcon />
      </Button>
      {loadSheet ? (
        <HeaderMobileSheet open={open} onOpenChange={setOpen} />
      ) : null}
    </>
  );
}
