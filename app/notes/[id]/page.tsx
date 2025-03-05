import { Header } from "@/app/components/Header";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  return (
    <>
      <Header />
      <section className="max-w-6xl w-full mt-20 mb-10 self-center space-y-5 px-5 mx-auto text-white">
        <div className="pt-20 max-w-3xl m-auto">
          <Badge className="mb-6">#design</Badge>
          <h1 className="text-5xl mb-3 font-bold">20 System Design Basics</h1>
          <p className="text-neutral-500">
            A straightforward breakdown of 20 essential system design concepts,
            jotted down from my learning journey—perfect for beginners and
            anyone looking to refresh the fundamentals.
          </p>

          <div className="mt-14 flex items-center gap-4">
            <Image
              src="/yeremia.jpg"
              alt="yeremia"
              width={40}
              height={40}
              className="rounded-full"
            />

            <div>
              <p className="text-lg text-neutral-100 font-medium">
                Yeremia Chris Saragi
              </p>
              <div className="text-sm flex items-center text-neutral-600">
                <p>December 17, 2024</p>
                <span className="mx-2">·</span>
                <div className="flex items-center text-sm text-neutral-600 gap-1">
                  <Timer width={14} />
                  <span className="text-xs"> 10 min read </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">asdf</div>
        </div>
      </section>
    </>
  );
}
