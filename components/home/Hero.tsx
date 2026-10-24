import { Container } from "@/components/Container";
import { HeroIntro } from "@/components/home/HeroIntro";
import { HeroProductCard } from "@/components/home/HeroProductCard";

export function Hero() {
  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden pt-10 pb-20 md:pt-14 md:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 hidden size-[28rem] rounded-full bg-[#4cd7f6]/10 blur-3xl md:block"
      />
      <div
        aria-hidden
        className="bg-primary/10 pointer-events-none absolute top-1/4 right-0 hidden size-96 rounded-full blur-3xl md:block"
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6 xl:col-span-6">
          <HeroIntro />
        </div>

        <div className="lg:col-span-6 xl:col-span-6">
          <HeroProductCard />
        </div>
      </Container>
    </section>
  );
}
