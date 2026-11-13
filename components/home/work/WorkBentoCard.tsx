import { HomeSpotlightSurface } from "@/components/home/HomeSpotlightSurface";
import { HomeWorkImageParallax } from "@/components/home/HomeWorkImageParallax";
import {
  homeBentoCardClass,
  homeBentoChipClass,
} from "@/components/home/homeSurface";
import type { HomeWorkCard } from "@/lib/home-work";
import { tagToneClass } from "@/lib/milestones";
import { cn } from "@/lib/utils";

type WorkBentoCardProps = {
  card: HomeWorkCard;
};

export function WorkBentoCard({ card }: WorkBentoCardProps) {
  return (
    <HomeSpotlightSurface
      as="a"
      href={card.href}
      className={cn(
        homeBentoCardClass,
        "focus-ring flex h-full flex-col gap-4 p-5 outline-none md:p-6",
      )}
    >
      <HomeWorkImageParallax src={card.image} alt={card.imageAlt} />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <span
          className={cn(
            "font-mono text-[11px] font-medium tracking-[0.14em] uppercase",
            tagToneClass[card.tagTone],
          )}
        >
          {card.tag}
        </span>
        <h3 className="font-heading text-foreground text-lg font-bold tracking-tight">
          {card.title}
        </h3>
        <p className="text-muted-foreground text-[14px] leading-relaxed">
          {card.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {card.chips.map((chip) => (
            <span key={chip} className={homeBentoChipClass}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </HomeSpotlightSurface>
  );
}
