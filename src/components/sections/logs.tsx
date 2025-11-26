"use client";

import { LogCard } from "@/components/log-card";
import { posts as defaultPosts, Post } from "@/lib/logs-data";
import ShinyText from "@/components/ShinyText";
import { motion } from "motion/react";
import Link from "next/link";

interface LogsProps {
  heading?: string;
  description?: string;
  posts?: Post[];
  count?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Logs = ({
  heading = "Logs",
  description = "Personal notes and deep dives from my journey—building apps, leading teams, and exploring the craft of modern web development.",
  posts = defaultPosts,
  count,
}: LogsProps) => {
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.published).getTime() - new Date(a.published).getTime();
  });

  const displayedPosts = count ? sortedPosts.slice(0, count) : sortedPosts;
  const showSeeMoreLink = !!count;

  return (
    <section className="py-32">
      <div className="w-full mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl sm:text-4xl font-semibold text-pretty lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-xl">
            {description}
          </p>
        </div>

        <div className="grid gap-y-10 px-2 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {displayedPosts.map((post) => (
            <LogCard key={post.id} post={post} />
          ))}
        </div>

        {showSeeMoreLink && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-center"
          >
            <Link
              href="/logs"
              className="group relative inline-flex items-center gap-3 text-base font-medium text-muted-foreground/60 hover:text-foreground transition-all duration-500 tracking-wider uppercase"
            >
              <ShinyText
                text="See more logs"
                speed={3}
                className="animate-shine font-mono"
              />
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ x: 0 }}
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export { Logs };