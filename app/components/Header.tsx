"use client";
import {
  AlignHorizontalDistributeCenter,
  AlignVerticalJustifyEnd,
  ChartAreaIcon,
  Home,
  Projector,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./icon/Logo";

const menuItems = [
  { href: "/", label: "Home", isActive: true },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

const VIEWPORT_OFFSET = 130;

const updateURL = (hash: string) => {
  window.history.replaceState({}, "", hash);
};

const isElementInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= VIEWPORT_OFFSET && rect.bottom >= VIEWPORT_OFFSET;
};

export const Header = () => {
  const [activeHash, setActiveHash] = React.useState<string>("/");

  React.useEffect(() => {
    const updateActiveHash = (hash: string) => {
      if (activeHash !== hash) {
        setActiveHash(hash);
        updateURL(hash);
      }
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash || "/");
    };

    const handleScroll = () => {
      const sections = menuItems
        .map((item) => item.href)
        .filter((href) => href.startsWith("#"))
        .map((href) => document.getElementById(href.slice(1)))
        .filter((element): element is HTMLElement => element !== null);

      const currentSection = sections.find(isElementInViewport);

      if (currentSection) {
        updateActiveHash(`#${currentSection.id}`);
      } else if (window.scrollY === 0) {
        updateActiveHash("/");
      }
    };

    setActiveHash(window.location.hash || "/");
    handleScroll();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeHash]);

  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed z-50 top-0 right-0 left-0 bg-neutral-950">
      <header
        role="banner"
        className="max-w-6xl w-full py-5 md:py-3 px-5 text-white mx-auto flex  items-center justify-between"
      >
        <Link href="/">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            aria-label="Logo"
            className="bg-neutral-700 p-1 font-bold cursor-pointer text-2xl w-8 h-8 flex items-center justify-center rounded-full text-center hover:bg-neutral-600 hover:scale-110 transition-all duration-300 select-none"
          >
            <Logo />
          </motion.div>
        </Link>

        <nav role="navigation" aria-label="Main navigation">
          <ul className="hidden md:flex text-sm gap-10 bg-neutral-900 px-5 py-3 rounded-lg text-neutral-400 font-semibold">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${
                    activeHash === item.href ? "text-green-400" : ""
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
                  <Link href="#about">
                    <AlignHorizontalDistributeCenter />
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="#experience">
                    <ChartAreaIcon />
                    Experiences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="#projects">
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
