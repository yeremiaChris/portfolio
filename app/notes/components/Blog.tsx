"use client";
import { motion } from "framer-motion";
import { Title } from "../../components/ui/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      className="max-w-6xl mt-20 mb-10 relative self-center space-y-5 px-5 mx-auto text-white"
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
    <Link href={`/notes/20-system-design-basics`}>
      <Card className="bg-transparent text-white border-0 rounded-none pb-0">
        <CardContent className="p-0">
          <div className="items-center justify-between flex gap">
            <div className="space-y-3 ">
              <Badge>#design</Badge>
              <CardTitle className="text-xl">20 System Design Basics</CardTitle>
              <CardDescription className="text-neutral-200">
                A straightforward breakdown of 20 essential system design
                concepts, jotted down from my learning journey—perfect for
                beginners and anyone looking to refresh the fundamentals.
              </CardDescription>
              <div className="flex gap-5">
                <div className="flex items-center  text-neutral-400 gap-1">
                  <Calendar width={12} />
                  <span className="text-xs"> Nov 16, 2019 </span>
                </div>
                <div className="flex items-center  text-neutral-400 gap-1">
                  <Timer width={14} />
                  <span className="text-xs"> 10 min read </span>
                </div>
              </div>
            </div>

            <div>
              <div className="relative w-[200px] h-[110px] rounded overflow-hidden">
                <Image
                  src="/blog/system-design-basic.jpeg"
                  alt="20-system-design"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
