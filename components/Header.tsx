import { BlogHeaderReadingProgress } from "@/components/blog/BlogPostReadingMotion";
import { HeaderBar } from "@/components/HeaderBar";

export function Header() {
  return (
    <header className="pointer-events-none fixed relative inset-x-0 top-0 z-50">
      <HeaderBar />
      <BlogHeaderReadingProgress />
    </header>
  );
}
