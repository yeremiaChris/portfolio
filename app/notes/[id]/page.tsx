import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Content from "./components/Content";

const Page = () => {
  return (
    <article className="max-w-3xl mt-32 mb-10 relative self-center space-y-5 px-5 mx-auto text-white">
      <Badge variant="outline" className="text-white">
        Next.js
      </Badge>
      <h1 className="text-4xl font-bold sm:text-3xl xs:text-2xl">
        Getting Started with TanStack Query: Fetching Data with useQuery
      </h1>
      <p className="text-neutral-400 text-lg sm:text-base xs:text-sm">
        Learn how to simplify data fetching in React applications using TanStack
        Query&apos;s useQuery hook. In this blog, we will walk you through the
        basics of setting up TanStack Query and how to use useQuery to fetch
        data from APIs with ease.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-2">
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
      </div>
      <p className="text-xs text-neutral-400">
        Estimated reading time: 3 minutes
      </p>
      <Content />
    </article>
  );
};

export default Page;
