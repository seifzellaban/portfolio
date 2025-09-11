import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
}

interface LogsProps {
  heading?: string;
  description?: string;
  posts?: Post[];
}

const Logs = ({
  heading = "Logs",
  description = "Personal notes and deep dives from my journey—building apps, leading teams, and exploring the craft of modern web development.",
  posts = [
    {
      id: "post-1",
      title: "Rafiqi: Our Journey Building Egypt's Mental Health Companion",
      summary:
        "How we built Rafiqi, an AI-powered mental health companion designed for Egyptians. From tackling cultural stigma to building tech that speaks Egyptian Arabic, here's the story of creating a platform rooted in accessibility, cultural respect, and real impact.",
      label: "Case Study",
      author: "Seif Zakaria",
      published: "20 May 2025",
      url: "https://wearemasons.com/en/case-studies/rafiqi",
      image: "/logthumb.webp",
      tags: ["Mental Health", "AI", "Culture", "Case Study"],
    },
    {
      id: "post-3",
      title: "How I Misread Productivity and Learned the Hard Way",
      summary:
        "A reflective look at how I once thought doing more meant leading better. I share the mistakes that got me fired, how I misunderstood boundaries and alignment, and the lessons I now carry forward about leadership, teamwork, and growth.",
      label: "Blog",
      author: "Seif Zakaria",
      published: "8 September 2025",
      url: "/logs/misread-productivity",
      image: "/logthumb.webp",
      tags: ["Storytelling", "Work Culture", "Lessons Learned", "Growth"],
    },
    {
      id: "post-2",
      title:
        "So, You Wanna Be a Head? A Practical Guide to Building Your Leadership Plan",
      summary:
        "Becoming a head at OSC isn’t just about the title—it’s about leading with vision, structure, and resilience. This guide breaks down how to craft a Head Plan that actually works: from setting SMART goals and timelines to managing risks, budgets, and team dynamics. If you’re stepping up to lead, this is your roadmap.",
      label: "Leadership",
      author: "Seif Zakaria",
      published: "1 Sep 2025",
      url: "/logs/wbh",
      image: "/logthumb.webp",
      tags: ["Leadership", "OSC", "Planning", "Student Life"],
    },
  ],
}: LogsProps) => {
  return (
    <section className="py-32">
      <div className="w-full max-w-screen-3xl mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-4xl md:text-7xl font-semibold text-pretty lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-xl">
            {description}
          </p>
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="order-last mx-auto w-full max-w-6xl border-0 bg-transparent shadow-none sm:order-first sm:col-span-12"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                <div className="sm:col-span-5">
                  <div className="mb-4 md:mb-6">
                    <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                      {post.tags?.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                    <Link href={post.url} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-muted-foreground md:mt-5">
                    {post.summary}
                  </p>
                  <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                    <span className="text-muted-foreground">{post.author}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {post.published}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center space-x-2 md:mt-8">
                    <Link
                      href={post.url}
                      className="inline-flex items-center font-semibold hover:underline md:text-base"
                    >
                      <span>Read more</span>
                      <ArrowRight className="ml-2 size-4 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div className="order-first sm:order-last sm:col-span-5">
                  <Link href={post.url} className="block">
                    <div className="aspect-16/9 overflow-clip rounded-lg border border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Logs };
