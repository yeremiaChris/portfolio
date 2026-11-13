import {
  AboutStoryHeroLayout,
  JourneyTimelineRow,
} from "@/components/about/story/AboutStoryHeroLayout";

export function AboutStoryStatic() {
  return (
    <AboutStoryHeroLayout
      journeyRail={
        <div
          className="border-brand-accent/35 pointer-events-none absolute top-2 bottom-2 left-3 hidden w-px border-l-2 lg:block"
          aria-hidden
        />
      }
      journeyItemSlot={(era) => (
        <li key={era.id} className="list-none">
          <JourneyTimelineRow era={era} active={false} />
        </li>
      )}
    />
  );
}
