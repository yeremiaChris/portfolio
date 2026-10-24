import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { labHomeCta } from "@/lib/lab";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroIntro() {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge
          variant="secondary"
          className="bg-secondary text-primary h-auto gap-1.5 px-3 py-1 text-[10px] font-medium tracking-[0.08em] uppercase"
        >
          <span className="relative flex size-2">
            <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-80" />
            <span className="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          {site.availability}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-muted text-foreground h-auto gap-1.5 px-3 py-1 font-mono text-[13px] font-medium tracking-normal normal-case"
        >
          {site.role}
        </Badge>
      </div>

      <div className="mb-4 flex flex-col">
        <h1
          id="hero-heading"
          className="font-heading text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-[4rem] lg:leading-[1.1]"
        >
          Hi, I&apos;m{" "}
          <span className="from-primary bg-linear-to-r via-[#6ffbbe] to-[#4cd7f6] bg-clip-text text-transparent">
            {site.name}
          </span>
        </h1>
        <p className="text-foreground mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          {site.fullName}
        </p>
      </div>

      <p className="text-muted-foreground mb-8 max-w-2xl text-base leading-relaxed sm:text-lg sm:leading-7">
        {site.heroBio}
      </p>

      <div className="mb-10 flex w-full flex-col gap-3">
        <span className="text-muted-foreground font-mono text-[10px] tracking-[0.16em] uppercase">
          Production
        </span>
        <nav
          aria-label="Selected production work"
          className="flex flex-wrap items-center gap-2"
        >
          {site.proof.map((item) => (
            <ProofLink
              key={item.id}
              href={item.href}
              label={item.label}
              meta={item.meta}
            />
          ))}
        </nav>
      </div>

      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        <a
          href="#work"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hover:bg-primary bg-[#10b981] text-[#00422b]",
          )}
        >
          Selected work
          <ArrowRightIcon />
        </a>
        <Link
          href={labHomeCta.href}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "border border-[#4cd7f6]/35 bg-[#4cd7f6]/10 text-[#4cd7f6]",
            "hover:bg-[#4cd7f6]/15 hover:text-[#4cd7f6]",
            "focus-visible:ring-2 focus-visible:ring-[#4cd7f6]/50",
          )}
        >
          <SparklesIcon />
          {labHomeCta.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

function ProofLink({
  href,
  label,
  meta,
}: {
  href: string;
  label: string;
  meta: string;
}) {
  return (
    <a
      href={href}
      className="group bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-colors"
    >
      <span className="text-foreground font-mono text-[13px]">{label}</span>
      <span className="text-muted-foreground group-hover:text-primary font-mono text-[10px] tracking-wider uppercase">
        {meta}
      </span>
    </a>
  );
}
