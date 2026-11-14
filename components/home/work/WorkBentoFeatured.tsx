import Image from "next/image";
import { ExternalLink } from "lucide-react";

import {
  homeBentoCardClass,
  homeBentoChipClass,
} from "@/components/home/homeSurface";
import { sectionHeadingSmClass } from "@/components/typography/typography-tokens";
import type { HomeWorkCard } from "@/lib/home-work";
import { tagToneClass } from "@/lib/milestones";
import { cn } from "@/lib/utils";

type WorkBentoFeaturedProps = {
  card: HomeWorkCard;
};

export function WorkBentoFeatured({ card }: WorkBentoFeaturedProps) {
  return (
    <article
      className={cn(
        homeBentoCardClass,
        "grid gap-6 p-5 md:p-6 lg:grid-cols-2 lg:items-center lg:gap-8",
      )}
    >
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "font-mono text-[11px] font-medium tracking-[0.14em] uppercase",
              tagToneClass[card.tagTone],
            )}
          >
            {card.tag}
          </span>
        </div>
        <h3 className={sectionHeadingSmClass}>{card.title}</h3>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {card.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {card.chips.map((chip) => (
            <span key={chip} className={homeBentoChipClass}>
              {chip}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          <a
            href={card.href}
            className="text-brand-accent focus-ring text-sm font-medium outline-none hover:underline"
          >
            Case study
          </a>
          {card.visitUrl ? (
            <a
              href={card.visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground focus-ring hover:text-brand-accent inline-flex items-center gap-1 text-sm outline-none"
            >
              Visit
              <ExternalLink className="size-3.5" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
      <a
        href={card.href}
        className="focus-ring relative block aspect-[16/10] w-full overflow-hidden rounded-xl outline-none"
      >
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw"
          loading="lazy"
          className="object-cover object-top"
        />
      </a>
    </article>
  );
}
