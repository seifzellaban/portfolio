import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts";
import { formatDate, tagSlug } from "@/lib/text";

interface LogCardProps {
  post: Post;
}

export function LogCard({ post }: LogCardProps) {
  return (
    <Card className="order-last mx-auto w-full max-w-6xl border-0 bg-transparent shadow-none sm:order-first sm:col-span-12">
      <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-5">
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
              {post.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/logs/tag/${tagSlug(tag)}`}
                  className="transition-colors hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <h3 className="font-semibold">
            <Link
              href={post.url}
              className="font-serif text-3xl hover:underline"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 text-muted-foreground md:mt-5">{post.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm md:mt-8">
            <span className="text-muted-foreground">{post.author}</span>
            <span aria-hidden className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {formatDate(post.published)}
            </span>
            <span aria-hidden className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {post.readingTime} min read
            </span>
          </div>
        </div>
        <div className="order-first sm:order-last sm:col-span-5">
          <Link href={post.url} className="block" tabIndex={-1} aria-hidden>
            <div className="relative aspect-16/9 overflow-clip rounded-lg border border-border bg-muted">
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                />
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
}
