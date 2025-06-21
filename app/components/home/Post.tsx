"use client";
import { NoteCard } from "@/app/notes/components/Blog";
import React from "react";
import { motion } from "framer-motion";

const Post = () => {
  const noteCardContent = {
    href: "/notes/1",
    badge: "#react",
    title: "TanStack Query: Simplifying Data Fetching in React",
    description:
      "Explore how TanStack Query, formerly known as React Query, simplifies data fetching, caching, and synchronization in React applications. Learn to use the useQuery hook for efficient data management.",
    date: "Sep 02, 2021",
    readTime: "3 min read",
  };

  return (
    <motion.section
      className="text-white px-5 max-w-6xl mx-auto space-y-20 pb-40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl mb-16 md:text-4xl lg:text-5xl ">
          <motion.span
            className="text-neutral-200 bg-gradient-to-r relative from-transparent via-green-900 to-transparent text-3xl font-extrabold tracking-tight lg:text-4xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Latest Posts & Insights
            <svg
              width="75"
              height="62"
              viewBox="0 0 75 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-10 -right-24 hidden sm:block"
            >
              <path
                d="M1 1C6.24431 1.21626 11.5365 2.05428 16.6516 3.13955C28.7596 5.70848 41.2898 9.45859 51.3287 17.0631C61.1747 24.5214 66.3737 34.4703 69.1034 46.2597C70.3557 51.6681 70.3959 56.1136 70.6176 61.434"
                stroke="#D4D4D4"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeDasharray="4 4"
              ></path>
              <path
                d="M63 57.185C65.135 58.2982 67.2076 59.4555 69.2541 60.7235C70.1813 61.2979 70.997 62.1916 71.624 60.9045C72.5057 59.0948 73.0026 57.3294 74.5536 56"
                stroke="#D4D4D4"
                strokeWidth="0.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </motion.span>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <NoteCard {...noteCardContent} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Post;
