import {
  projectSurfaceHairlineClass,
  projectSurfacePanelClass,
} from "@/components/projects/projectSurface";
import { cn } from "@/lib/utils";

export const aboutSurfaceCardClass = cn(
  projectSurfacePanelClass,
  "min-w-0 p-5 sm:p-6",
);

export { projectSurfaceHairlineClass };
