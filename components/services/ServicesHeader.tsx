import { MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button-variants";
import { servicesHero } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesHeader() {
  return (
    <section className="relative flex w-full flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <div
        className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full blur-3xl md:blur-[140px]"
        aria-hidden
      />
      <Reveal when="mount" preset="calm" className="max-w-3xl min-w-0">
        <h1 className="font-heading text-foreground text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
          {servicesHero.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
              "h-11 gap-2 px-5 text-[14px] font-semibold shadow-[0_0_16px_rgba(76,215,246,0.22)]",
            )}
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {servicesHero.whatsappCtaLabel}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
