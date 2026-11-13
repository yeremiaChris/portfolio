import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import { cn } from "@/lib/utils";

export const aboutSurfacePanelPaddingClass = "p-5 sm:p-6";

export const aboutSurfaceCardClass = cn(
  projectSurfacePanelClass,
  aboutSurfacePanelPaddingClass,
  "min-w-0",
);

export { projectSurfaceHairlineClass };
