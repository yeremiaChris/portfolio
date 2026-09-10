import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  Code2Icon,
  ExternalLinkIcon,
  MailIcon,
  MessageCircleIcon,
  Share2Icon,
  UserIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroIntro() {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge
          variant="secondary"
          className="h-auto gap-1.5 bg-secondary px-3 py-1 text-[10px] font-medium tracking-[0.08em] text-primary uppercase"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-80" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {site.availability}
        </Badge>
        <Badge
          variant="secondary"
          className="h-auto gap-1.5 bg-muted px-3 py-1 font-mono text-[13px] font-medium text-foreground normal-case tracking-normal"
        >
          {site.role}
        </Badge>
      </div>

      <div className="mb-3 flex flex-col">
        <h1
          id="hero-heading"
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[4rem] lg:leading-[1.1]"
        >
          Hi, I&apos;m{" "}
          <span className="bg-linear-to-r from-primary via-[#6ffbbe] to-[#4cd7f6] bg-clip-text text-transparent">
            {site.name}
          </span>
        </h1>
        <p className="mt-1 font-mono text-[13px] tracking-normal text-muted-foreground">
          {site.pronunciation}
        </p>
      </div>

      <p className="mt-3 mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
        {site.bio}
      </p>

      <div className="mb-8 flex w-full flex-wrap items-center gap-3 sm:w-auto">
        <Link
          href={site.links.experience}
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-[#10b981] text-[#00422b] hover:bg-primary",
          )}
        >
          Explore Experience
          <ArrowRightIcon />
        </Link>
        <Link
          href={site.links.about}
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
        >
          <UserIcon />
          More About Me
        </Link>
        <Link
          href={site.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "font-mono text-primary hover:bg-secondary hover:text-primary",
          )}
        >
          <ExternalLinkIcon />
          View Resume
        </Link>
      </div>

      <div className="flex w-full flex-col gap-2 pt-1">
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Connect
        </span>
        <nav aria-label="Social" className="flex flex-wrap items-center gap-2">
          <SocialLink
            href={site.links.whatsapp}
            icon={<MessageCircleIcon />}
            label="WhatsApp"
            meta={site.links.whatsappLabel}
          />
          <SocialLink
            href={site.links.github}
            icon={<Code2Icon />}
            label="GitHub"
            meta={site.links.githubHandle}
          />
          <SocialLink
            href={site.links.linkedin}
            icon={<Share2Icon />}
            label="LinkedIn"
          />
          <SocialLink
            href={site.links.email}
            icon={<MailIcon />}
            label={site.links.emailLabel}
          />
        </nav>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
  meta,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  meta?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="group inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <span className="group-hover:text-primary [&>svg]:size-4.5">
        {icon}
      </span>
      <span className="font-mono text-[13px]">{label}</span>
      {meta ? (
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase group-hover:text-primary">
          {meta}
        </span>
      ) : null}
    </a>
  );
}
