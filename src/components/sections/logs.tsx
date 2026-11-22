"use client";

import Link from "next/link";
import { IconArrowUpRight, IconRss } from "@tabler/icons-react";
import { FeaturedLogCard, LogCard } from "@/components/log-card";
import { useReveal, useRevealGroup } from "@/hooks/use-reveal";
import type { Post } from "@/lib/posts";

interface LogsProps {
  heading?: string;
  kicker?: string;
  description?: string;
  posts: Post[];
  count?: number;
  bordered?: boolean;
}

const pad = (n: number) => n.toString().padStart(2, "0");

const metaClasses =
  "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

const Logs = ({
  heading = "Logs",
  kicker,
  description = "Notes on software, side projects, leadership mistakes, and things I learned the hard way.",
  posts,
  count,
  bordered = true,
}: LogsProps) => {
  const visiblePosts = posts.filter((post) => !post.hidden);
  const sortedPosts = [...visiblePosts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.published).getTime() - new Date(a.published).getTime();
  });

  const displayedPosts = count ? sortedPosts.slice(0, count) : sortedPosts;
  const showSeeMoreLink = Boolean(count && sortedPosts.length > displayedPosts.length);
  const [leadPost, ...restPosts] = displayedPosts;

  const headingRef = useReveal<HTMLDivElement>();
  const leadRef = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const attachRowRef = useRevealGroup({ threshold: 0.05 });
  const footerRef = useReveal<HTMLDivElement>();

  const resolvedKicker =
    kicker ??
    `Writing / ${pad(sortedPosts.length)} ${
      sortedPosts.length === 1 ? "entry" : "entries"
    }`;

  return (
    <section
      id="logs"
      className={`${bordered ? "border-t border-border/50" : ""} py-16 sm:py-24 lg:py-32`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div ref={headingRef} className="reveal">
          <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className={metaClasses}>{resolvedKicker}</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:text-6xl">
                {heading === "Logs" ? (
                  <>
                    Logs &amp;{" "}
                    <span className="font-light italic text-primary">
                      essays.
                    </span>
                  </>
                ) : (
                  heading
                )}
              </h2>
            </div>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
              {description}
            </p>
          </header>
        </div>

        {/* Lead feature essay */}
        {leadPost ? (
          <div
            ref={leadRef}
            className="reveal reveal-delay-1 mt-10 sm:mt-14 md:mt-20"
          >
            <FeaturedLogCard post={leadPost} index={0} />
          </div>
        ) : (
          <p className="mt-10 border-t border-border/50 pt-8 text-base text-muted-foreground sm:mt-14 sm:pt-10">
            No entries published yet.
          </p>
        )}

        {/* Ruled editorial index */}
        {restPosts.length > 0 ? (
          <div className="mt-4 divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/60 bg-card/45 md:mt-0 md:overflow-visible md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:border-border/50 md:bg-transparent">
            {restPosts.map((post, idx) => (
              <div
                key={post.id}
                ref={attachRowRef}
                className={`reveal reveal-delay-${Math.min(idx + 1, 5)}`}
              >
                <LogCard post={post} index={idx + 1} />
              </div>
            ))}
          </div>
        ) : null}

        {/* Archive bar (homepage preview mode) */}
        {showSeeMoreLink ? (
          <div
            ref={footerRef}
            className="reveal mt-8 flex flex-col items-stretch justify-between gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>
                Showing {pad(displayedPosts.length)} of{" "}
                {pad(sortedPosts.length)} entries
              </span>
              <span aria-hidden className="text-border">
                /
              </span>
              <a
                href="/feed.xml"
                className="inline-flex min-h-[36px] items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <IconRss size={13} className="text-primary" />
                RSS feed
              </a>
            </div>

            <Link
              href="/logs"
              className="group inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background sm:w-auto"
            >
              Explore full archive
              <IconArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export { Logs };
