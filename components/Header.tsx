import { HeaderBar } from "@/components/HeaderBar";
import { HeaderMotionProvider } from "@/components/motion/HeaderMotionProvider";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <HeaderMotionProvider>
        <HeaderBar />
      </HeaderMotionProvider>
    </header>
  );
}
