"use client";
import { Title } from "@/app/components/ui/Title";
import { POSTS } from "@/app/constant/post.constant";
import { motion } from "framer-motion";
import { NoteCard } from "./backend-fundamentals/NoteCard";
export default function Blog() {
  return (
    <section
      id="about"
      className="max-w-6xl pt-20 pb-40 space-y-5 relative self-center px-5 mx-auto text-white"
    >
      <Title title="Blog" description="My study references" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-x-3"
      >
        {POSTS.map((post) => (
          <NoteCard key={post.title} {...post} />
        ))}
      </motion.div>
    </section>
  );
}
