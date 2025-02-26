"use client";
import { motion } from "framer-motion";
import { Title } from "./ui/Title";
const defaultMotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};
export const Blog = () => {
  return (
    <motion.section
      {...defaultMotionProps}
      id="about"
      className="max-w-6xl mt-20 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <Title
        title="Blog"
        description="My thoughts and experiences in web development."
      />

      <div>Coming soon...</div>
    </motion.section>
  );
};
