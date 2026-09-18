"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HEADER_NAV, isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface HeaderMobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeaderMobileSheet({
  open,
  onOpenChange,
}: HeaderMobileSheetProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(100%,20rem)]">
        <SheetHeader>
          <SheetTitle className="text-primary font-mono">{"<YC />"}</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-4">
          {HEADER_NAV.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-start",
                      active && "bg-secondary font-semibold",
                    )}
                  />
                }
              >
                {item.label}
              </SheetClose>
            );
          })}
          <SheetClose
            nativeButton={false}
            render={
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "hover:bg-primary mt-2 justify-start bg-[#10b981] text-[#00422b]",
                )}
              />
            }
          >
            Get in Touch
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
