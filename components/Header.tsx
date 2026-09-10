"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#tech-stack", label: "Tech Stack" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-mono text-[13px] font-bold tracking-tight text-primary">
              {"<YC />"}
            </span>
            <span className="hidden font-heading font-semibold tracking-tight text-foreground sm:inline-block">
              yeremia.dev
            </span>
          </Link>

          <Badge
            variant="secondary"
            className="hidden gap-1.5 bg-muted px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] text-primary uppercase xl:inline-flex"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Available for work
          </Badge>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-[13px]",
                  active &&
                    "bg-secondary font-semibold text-foreground hover:bg-secondary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden bg-[#10b981] text-[#00422b] hover:bg-primary sm:inline-flex",
            )}
          >
            Get in Touch
          </Link>

          <Link
            href="/resume.pdf"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "font-mono text-[13px] text-muted-foreground",
            )}
          >
            CV.pdf
          </Link>

          <Avatar className="bg-primary after:border-transparent">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <UserIcon className="size-4" />
            </AvatarFallback>
          </Avatar>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="font-mono text-primary">
                  {"<YC />"}
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
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
                        "mt-2 justify-start bg-[#10b981] text-[#00422b] hover:bg-primary",
                      )}
                    />
                  }
                >
                  Get in Touch
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
