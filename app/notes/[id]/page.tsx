"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Content from "./components/Content";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mt-32 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <Badge variant="outline" className="text-white">
        Next.js
      </Badge>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold sm:text-3xl xs:text-2xl"
      >
        Getting Started with TanStack Query: Fetching Data with useQuery
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-neutral-400 text-lg sm:text-base xs:text-sm"
      >
        Learn how to simplify data fetching in React applications using TanStack
        Query&apos;s useQuery hook. In this blog, we will walk you through the
        basics of setting up TanStack Query and how to use useQuery to fetch
        data from APIs with ease.
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
            June 14, 2025 — Last updated June 14, 2025
          </p>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-xs text-neutral-400"
      >
        Estimated reading time: 3 minutes
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Content />
      </motion.div>
    </motion.article>
  );
};

export default Page;
