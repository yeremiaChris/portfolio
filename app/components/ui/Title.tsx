import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
export const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};
interface TitleProps {
  title: string;
  description: string;
}
export const Title = ({ description, title }: TitleProps) => {
  return (
    <motion.div
      {...defaultMotionProps}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-2 flex flex-col items-center pt-8 mb-24"
    >
      <Button size="sm" asChild>
        <Link href="/">
          <Home />
          Home
        </Link>
      </Button>
      <h2 className="md:text-5xl text-3xl font-bold">{title}</h2>

      <p className="text-sm bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 text-transparent bg-clip-text bg-300% animate-shine font-medium">
        {description}
      </p>
    </motion.div>
  );
};
