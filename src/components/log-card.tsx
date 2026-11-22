import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { Post } from "@/lib/posts";
import { formatDate, tagSlug } from "@/lib/text";

const pad = (n: number) => n.toString().padStart(2, "0");

interface LogCardProps {
  post: Post;
  index?: number;
}

export function FeaturedLogCard({ post, index = 0 }: LogCardProps) {
  const tags = post.tags?.slice(0, 4) ?? [];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm md:overflow-visible md:rounded-none md:border-x-0 md:border-y md:border-border/50 md:bg-transparent md:py-12 md:backdrop-blur-none lg:py-14">
      <div className="grid grid-cols-1 items-center gap-0 md:gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Framed editorial image */}
        <div className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/50 bg-muted/60 md:rounded-xl md:border md:border-border/60">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
                Entry {pad(index + 1)}
              </div>
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30"
            />
          </div>
        </div>

        {/* Editorial copy */}
        <div className="flex flex-col justify-between p-5 sm:p-6 md:p-0 lg:col-span-6 xl:col-span-5">
          <div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:gap-x-3">
              <span className="text-foreground">{pad(index + 1)}</span>
              {post.pinned ? (
                <>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    />
                    Featured
                  </span>
                </>
              ) : null}
              {post.label ? (
                <>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span>{post.label}</span>
                </>
              ) : null}
            </div>

            <h3 className="mt-3 font-serif text-2xl font-bold leading-[1.15] tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl md:mt-4 lg:text-4xl">
              <Link
                href={post.url}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {post.title}
              </Link>
            </h3>

            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-base md:mt-4">
              {post.summary}
            </p>

            {tags.length > 0 ? (
              <div className="relative z-10 mt-6 hidden flex-wrap gap-2 md:flex">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/logs/tag/${tagSlug(tag)}`}
                    className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-4 md:mt-8 md:pt-5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:gap-x-3">
              <span>{formatDate(post.published)}</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>{post.readingTime} min</span>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors group-hover:text-primary">
              Read entry
              <IconArrowUpRight
                size={14}
                className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function LogCard({ post, index }: LogCardProps) {
  const tags = post.tags?.slice(0, 3) ?? [];

  return (
    <article className="group relative px-4 py-5 transition-colors duration-300 hover:bg-card/80 sm:px-5 sm:py-6 md:px-0 md:py-10 md:hover:bg-transparent">
      <div className="grid grid-cols-[minmax(0,1fr)_96px] gap-x-3.5 gap-y-2.5 sm:grid-cols-[minmax(0,1fr)_120px] sm:gap-x-5 md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-0">
        {/* Eyebrow + desktop date column */}
        <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-3 md:flex-col md:items-start md:justify-start">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {typeof index === "number" ? (
              <span className="text-foreground">{pad(index + 1)}</span>
            ) : null}
            {typeof index === "number" && (post.pinned || post.label) ? (
              <span aria-hidden className="text-border md:hidden">
                /
              </span>
            ) : null}
            {post.pinned ? (
              <span className="inline-flex items-center gap-1.5 text-primary">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                />
                Pinned
              </span>
            ) : post.label ? (
              <span>{post.label}</span>
            ) : null}
          </div>

          <div className="hidden flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80 md:mt-2 md:flex">
            <span>{formatDate(post.published)}</span>
            <span aria-hidden className="text-border">
              ·
            </span>
            <span>{post.readingTime} min</span>
          </div>
        </div>

        {/* Copy column */}
        <div
          className={`${
            post.image ? "col-start-1" : "col-span-2"
          } min-w-0 md:col-span-6 md:col-start-4`}
        >
          <h3 className="font-serif text-lg font-bold leading-[1.24] tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl md:text-2xl md:leading-[1.2]">
            <Link
              href={post.url}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {post.title}
            </Link>
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:mt-2 md:mt-2.5 md:text-base">
            {post.summary}
          </p>

          {tags.length > 0 ? (
            <div className="relative z-10 mt-4 hidden flex-wrap gap-2 md:flex">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/logs/tag/${tagSlug(tag)}`}
                  className="rounded-full border border-border/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {/* Side thumbnail (mobile right, desktop col 10-12) + desktop read link */}
        {post.image ? (
          <div className="col-start-2 self-start md:col-span-3 md:col-start-10 md:flex md:flex-col md:items-end">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/60 bg-muted/60 md:aspect-[16/10]">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 768px) 120px, 24vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>

            <span className="mt-3 hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground md:inline-flex">
              Read
              <IconArrowUpRight
                size={13}
                className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        ) : (
          <div className="hidden md:col-span-3 md:col-start-10 md:flex md:justify-end">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
              Read
              <IconArrowUpRight
                size={13}
                className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        )}

        {/* Mobile footer bar */}
        <div className="col-span-2 mt-1 flex items-center justify-between gap-3 border-t border-border/40 pt-3 md:hidden">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>{formatDate(post.published)}</span>
            <span aria-hidden className="text-border">
              ·
            </span>
            <span>{post.readingTime} min</span>
          </div>

          <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors group-hover:text-primary">
            Read
            <IconArrowUpRight
              size={13}
              className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
