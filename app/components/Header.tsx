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
  // { href: "/notes", label: "Notes" },
];

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <div className="fixed z-50 top-8 right-0 left-0">
      <header
        role="banner"
        className="max-w-6xl w-full text-white mx-auto flex px-3 md:px-0 items-center justify-end md:justify-center"
      >
        <nav role="navigation" aria-label="Main navigation">
          <ul className="hidden md:flex gap-8 py-3 px-6 bg-neutral-900 rounded-lg text-neutral-400 font-normal">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href ? "text-green-400" : ""
                  } font-normal text-base hover:text-green-400 duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-400 after:transition-all after:duration-300`}
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
