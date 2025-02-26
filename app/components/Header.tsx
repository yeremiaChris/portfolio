"use client";
import {
  AlignHorizontalDistributeCenter,
  AlignVerticalJustifyEnd,
  ChartAreaIcon,
  Home,
  Projector,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Home", isActive: true },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <div className="fixed z-50 top-0 right-0 left-0 bg-neutral-950">
      <header
        role="banner"
        className="max-w-6xl w-full py-5 md:py-3 px-5 text-white mx-auto flex  items-center justify-between"
      >
        <div className="rounded-full group relative">
          <Link href="/" className="relative">
            <div
              aria-label="Logo"
              className="bg-neutral-700 text-4xl font-bold cursor-pointer w-5 h-5 flex items-center justify-center rounded-full text-center hover:bg-neutral-600 hover:scale-110 transition-all duration-300 select-none"
            >
              Y
            </div>
          </Link>
        </div>

        <nav role="navigation" aria-label="Main navigation">
          <ul className="hidden md:flex text-sm gap-10 bg-neutral-900 px-5 py-3 rounded-lg text-neutral-400 font-semibold">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href ? "text-green-400" : ""
                  } hover:text-green-400 duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full`}
                  aria-label={`Go to ${item.label} section`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <AlignVerticalJustifyEnd className="text-neutral-500 md:hidden cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!right-0 !left-0" align="end">
              <DropdownMenuLabel className="w-full">Actions</DropdownMenuLabel>
              <DropdownMenuGroup className="w-full">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/">
                    <Home />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/about">
                    <AlignHorizontalDistributeCenter />
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/experience">
                    <ChartAreaIcon />
                    Experiences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/projects">
                    <Projector />
                    Projects
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
    </div>
  );
};
