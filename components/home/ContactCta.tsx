import { Mail, MessageCircle } from "lucide-react";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-16 md:py-24"
    >
      <Container>
        <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-muted p-8 shadow-xl ring-1 ring-border/20 md:flex-row md:gap-10 md:p-12">
          <div
            className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 flex max-w-xl flex-col">
            <Badge
              variant="secondary"
              className="mb-3 w-fit gap-2 bg-transparent px-0 font-mono text-[10px] tracking-widest text-primary uppercase"
            >
              <span className="size-2 animate-ping rounded-full bg-primary" />
              Ready to build something exceptional?
            </Badge>
            <h2
              id="contact-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Let&apos;s discuss frontend architecture, product UI, or your next
              React / Next.js build.
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
              Available for full-time frontend roles, design-system work, and
              high-impact contractor partnerships worldwide.
            </p>
          </div>

          <div className="relative z-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={site.links.email}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-11 w-full gap-2 px-6 text-[15px] font-semibold shadow-[0_0_20px_rgba(78,222,163,0.3)] sm:w-auto",
              )}
            >
              <Mail className="size-5" aria-hidden />
              Initiate Contact
            </a>
            <a
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-11 w-full gap-2 px-5 text-[15px] font-medium sm:w-auto",
              )}
            >
              <MessageCircle className="size-5 text-primary" aria-hidden />
              Direct WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
