import { NoteCardProps } from "@/app/blog/components/NoteCard";
export const POSTS: NoteCardProps[] = [
  {
    href: "/blog/getting-started-with-tanstack-query",
    badge: "#react",
    title: "TanStack Query: Simplifying Data Fetching in React",
    description:
      "Explore how TanStack Query, formerly known as React Query, simplifies data fetching, caching, and synchronization in React applications. Learn to use the useQuery hook for efficient data management.",
    date: "June 14, 2025 — Last updated June 14, 2025",
    readTime: "3 min read",
    image: "/blog/tanstack.png",
  },
  {
    href: "/blog/backend-fundamentals",
    badge: "#backend",
    title: "Backend Development Fundamentals: Building the Engine of the Web",
    description:
      "Delve into the core concepts of backend development, covering essential topics such as server-side programming, database management, and system architecture. Gain insights into how backend technologies work together to support web applications.",
    date: "Sep 28, 2025 — Last updated Sep 28, 2025",
    readTime: "5 min read",
    image: "/blog/backend-fundamental.png",
  },
];
