import { Reveal } from "@/components/motion/Reveal";
import { galleryIntro } from "@/lib/gallery/intro";

export function GalleryHeader() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-4 pt-2 pb-8 md:pt-4 md:pb-10">
      <Reveal when="mount" preset="calm" className="max-w-3xl min-w-0">
        <h1 className="font-heading text-foreground text-3xl wrap-break-word sm:text-4xl lg:text-5xl">
          {galleryIntro.title}
        </h1>
        <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed sm:text-base">
          {galleryIntro.description}
        </p>
      </Reveal>
    </section>
  );
}
