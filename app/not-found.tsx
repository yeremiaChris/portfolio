import Link from "next/link";
import { ArrowLeft, ArrowRight, Terminal } from "lucide-react";

import { Container } from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main>
      <section
        aria-labelledby="not-found-heading"
        className="relative w-full overflow-hidden"
      >
        <div
          aria-hidden
          className="from-primary/10 via-primary/5 pointer-events-none absolute top-0 left-1/2 h-80 w-[min(100%,48rem)] -translate-x-1/2 bg-linear-to-b to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-0 size-72 rounded-full bg-[#4cd7f6]/8 blur-3xl"
        />

        <Container className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-16 md:py-24">
          <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both flex max-w-xl flex-col gap-6 duration-700">
            <p className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
              <Terminal className="text-primary size-3.5" aria-hidden />
              Error 404
            </p>

            <div className="flex flex-col gap-3">
              <p
                aria-hidden
                className="font-heading from-primary/40 bg-linear-to-r via-[#6ffbbe]/25 to-[#4cd7f6]/30 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-7xl"
              >
                404
              </p>
              <h1
                id="not-found-heading"
                className="font-heading text-foreground text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Page not found
              </h1>
              <p className="text-muted-foreground max-w-md text-[15px] leading-relaxed sm:text-base">
                The route you requested isn&apos;t available. It may have been
                moved, renamed, or never existed.
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both flex flex-wrap items-center gap-3 delay-150 duration-700">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-11 gap-2 px-6 text-[14px] font-semibold",
                )}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back home
              </Link>
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-11 gap-2 px-6 text-[14px] font-medium",
                )}
              >
                Browse writing
                <ArrowRight className="text-primary size-4" aria-hidden />
              </Link>
            </div>

            <p className="animate-in fade-in fill-mode-both text-muted-foreground font-mono text-[12px] delay-300 duration-700">
              <span className="text-border">{"//"}</span> try{" "}
              <Link
                href="/projects"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                /projects
              </Link>
              {" · "}
              <Link
                href="/experience"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                /experience
              </Link>
              {" · "}
              <Link
                href="/about"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                /about
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
