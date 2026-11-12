import fs from "node:fs";
import path from "node:path";

export function readGalleryComponentSource(slug: string): string {
  const filePath = path.join(process.cwd(), "gallery", slug, "Component.tsx");
  return fs.readFileSync(filePath, "utf8");
}
