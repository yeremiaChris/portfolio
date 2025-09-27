"use client";
import { Title } from "@/app/components/ui/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Timer } from "lucide-react"; // Using Database icon as a placeholder for TanStack
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import { POSTS } from "@/app/constant/post.constant";

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

export interface NoteCardProps {
  href: string;
  badge: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
}

export const NoteCard = ({
  href,
  badge,
  title,
  description,
  date,
  readTime,
  image,
}: NoteCardProps) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          scale: 1.01,
          y: -2,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        className="group"
      >
        <Card className="bg-transparent text-white border border-neutral-800/50 hover:border-green-500/30 transition-all duration-300 rounded-xl overflow-hidden backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-9">
              <div className="space-y-3 flex-1 w-full">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 transition-colors duration-200 text-xs sm:text-sm">
                  {badge}
                </Badge>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl group-hover:text-green-400 transition-colors duration-300 leading-tight">
                  {title}
                </CardTitle>
                <CardDescription className="text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300 text-sm sm:text-base leading-relaxed">
                  {description}
                </CardDescription>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                  <div className="flex items-center text-neutral-400 gap-1">
                    <Calendar width={12} />
                    <span className="text-xs">{date}</span>
                  </div>
                  <div className="flex items-center text-neutral-400 gap-1">
                    <Timer width={14} />
                    <span className="text-xs">{readTime}</span>
                  </div>
                </div>
              </div>

              <div className="aspect-video rounded-xl bg-neutral-800 relative overflow-hidden w-full max-w-[300px] group-hover:bg-neutral-700 transition-colors duration-300">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
