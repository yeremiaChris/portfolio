"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Blog1 from "@/markdown/backend-fundamental.md";
const Page = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl pt-32 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <Badge variant="outline" className="text-white">
        Backend
      </Badge>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold sm:text-3xl xs:text-2xl"
      >
        Backend Fundamentals
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-neutral-400 text-lg sm:text-base xs:text-sm"
      >
        Backend Fundamentals is a guide to the core concepts of backend
        development, covering essential topics such as server-side programming,
        database management, and system architecture. Gain insights into how
        backend technologies work together to support web applications.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-2"
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <p className="text-md sm:text-sm">Yeremia Chris Saragi</p>
          <p className="text-xs text-neutral-400">
            Sep 28, 2025 — Last updated Sep 28, 2025
          </p>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-xs text-neutral-400"
      >
        Estimated reading time: 5 minutes
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="space-y-4 w-full">
          <Blog1 />
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Page;
