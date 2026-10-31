import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { aboutIntro } from "@/lib/about";
import { cn } from "@/lib/utils";

export function AboutHeader() {
  return (
    <section className="relative flex w-full flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <div
        className="from-primary/10 via-primary/5 pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[min(100%,54rem)] -translate-x-1/2 bg-linear-to-b to-transparent blur-3xl"
        aria-hidden
      />

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-foreground/75 mb-2 text-xs font-medium tracking-wide uppercase">
            {aboutIntro.eyebrow}
          </p>
          <h1 className="font-heading text-foreground text-3xl sm:text-4xl lg:text-5xl">
            {aboutIntro.title}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-[15px] leading-[1.7] sm:text-base">
            {aboutIntro.description}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-11 w-full gap-2 px-6 text-[14px] font-medium sm:w-auto",
            )}
          >
            <MessageCircle className="text-primary size-4" aria-hidden />
            {aboutIntro.chatLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
