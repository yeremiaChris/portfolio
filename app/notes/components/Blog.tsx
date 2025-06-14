"use client";
import { motion } from "framer-motion";
import { Title } from "../../components/ui/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Timer } from "lucide-react"; // Using Database icon as a placeholder for TanStack
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
      className="max-w-4xl mt-20 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
    >
      <Title title="Notes" description="My study references" />

      <div className="max-w-4xl grid gap-10 m-auto">
        <NoteCard />
      </div>
    </motion.section>
  );
};

const NoteCard = () => {
  return (
    <Link href={`/notes/1`}>
      <Card className="bg-transparent text-white border-0 rounded-none pb-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-3">
              <Badge>#react</Badge>
              <CardTitle className="text-xl">
                TanStack Query: Simplifying Data Fetching in React
              </CardTitle>
              <CardDescription className="text-neutral-200">
                Explore how TanStack Query, formerly known as React Query,
                simplifies data fetching, caching, and synchronization in React
                applications. Learn to use the useQuery hook for efficient data
                management.
              </CardDescription>
              <div className="flex gap-5">
                <div className="flex items-center text-neutral-400 gap-1">
                  <Calendar width={12} />
                  <span className="text-xs"> Sep 02, 2021 </span>
                </div>
                <div className="flex items-center text-neutral-400 gap-1">
                  <Timer width={14} />
                  <span className="text-xs"> 10 min read </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
