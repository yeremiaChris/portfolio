import Blog1 from "@/markdown/blog1.mdx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  return (
    <article className="max-w-3xl mt-32 mb-10 relative self-center space-y-5 px-5 mx-auto text-white">
      <Badge variant="outline" className="text-white">
        Next.js
      </Badge>
      <h1 className="text-4xl font-bold">
        Getting Started with TanStack Query: Fetching Data with useQuery
      </h1>
      <p className="text-neutral-400">
        Learn how to simplify data fetching in React applications using TanStack
        Query&apos;s useQuery hook. In this blog, we will walk you through the
        basics of setting up TanStack Query and how to use useQuery to fetch
        data from APIs with ease.
      </p>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-md">Yeremia Chris Saragi</p>
          <p className="text-xs text-neutral-400">
            June 14, 2025 — Last updated June 14, 2025
          </p>
        </div>
      </div>
      <p className="text-xs text-neutral-400">
        Estimated reading time: 3 minutes
      </p>
      <div className="space-y-4">
        <Blog1 />
      </div>
    </article>
  );
};

export default Page;
