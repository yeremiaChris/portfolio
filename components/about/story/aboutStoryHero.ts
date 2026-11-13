import {
  aboutProfile,
  aboutProfileMetrics,
  aboutStoryEras,
  aboutStoryIntro,
} from "@/lib/about";

export const aboutStoryHeroContent = {
  profile: aboutProfile,
  metrics: aboutProfileMetrics,
  journeyIntro: aboutStoryIntro,
  eras: aboutStoryEras,
} as const;
