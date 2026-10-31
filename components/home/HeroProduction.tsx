import dynamic from "next/dynamic";

import { HeroProofCard } from "@/components/home/HeroProofCard";
import { site } from "@/lib/site";

const HeroProofNav = dynamic(() =>
  import("@/components/home/HeroProofNav").then((mod) => ({
    default: mod.HeroProofNav,
  })),
);

export function HeroProduction() {
  return (
    <div className="hero-enter hero-enter--4 mt-10 w-full md:mt-12">
      <p className="text-muted-foreground mb-4 text-left font-mono text-[11px] tracking-[0.16em] uppercase">
        Production
      </p>
      <HeroProofNav
        aria-label="Selected production work"
        className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6"
      >
        {site.proof.map((item) => (
          <HeroProofCard
            key={item.id}
            href={item.href}
            label={item.label}
            meta={item.meta}
          />
        ))}
      </HeroProofNav>
    </div>
  );
}
