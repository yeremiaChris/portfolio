import { blogIntro } from "@/lib/blog";

export function BlogHeader() {
  return (
    <section className="relative flex w-full min-w-0 flex-col gap-6 pt-2 pb-8 md:pt-4 md:pb-10">
      <div
        className="bg-primary/5 pointer-events-none absolute top-0 left-1/4 -z-10 size-[28rem] rounded-full blur-[140px]"
        aria-hidden
      />
      <div
        className="bg-brand-accent/5 pointer-events-none absolute top-1/3 right-0 -z-10 size-[24rem] rounded-full blur-[160px]"
        aria-hidden
      />

      <div className="max-w-3xl min-w-0">
        <h1 className="font-heading text-foreground text-3xl sm:text-4xl lg:text-5xl">
          {blogIntro.title}
        </h1>
        <p className="text-muted-foreground mt-3 text-[15px] leading-[1.7] sm:text-base">
          {blogIntro.description}
        </p>
      </div>
    </section>
  );
}
