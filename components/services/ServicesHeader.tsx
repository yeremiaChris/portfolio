import { ServicesHeroCopyMotion } from "@/components/services/ServicesHeroCopyMotion";
import { ServicesHeroVisual } from "@/components/services/ServicesHeroVisual";

export function ServicesHeader() {
  return (
    <section className="relative w-full pb-6 md:pb-7">
      <div
        className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full blur-3xl md:blur-[140px]"
        aria-hidden
      />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,380px)] lg:items-center lg:gap-8">
        <ServicesHeroCopyMotion />
        <ServicesHeroVisual className="mx-auto hidden w-full lg:mx-0 lg:block lg:justify-self-end" />
      </div>
      <ServicesHeroVisual className="mx-auto mt-1 hidden w-full max-w-[300px] sm:block sm:max-w-[320px] lg:hidden" />
    </section>
  );
}
