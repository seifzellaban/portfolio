import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/logs-data";

interface LogCardProps {
  post: Post;
}

export function LogCard({ post }: LogCardProps) {
  return (
    <Card className="order-last mx-auto w-full max-w-6xl border-0 bg-transparent shadow-none sm:order-first sm:col-span-12">
      <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-5">
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
              {post.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <h3 className="font-semibold">
            <Link
              href={post.url}
              className="hover:underline font-serif text-3xl"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 text-muted-foreground md:mt-5">{post.summary}</p>
          <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
            <span className="text-muted-foreground">{post.author}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{post.published}</span>
          </div>
        </div>
        <div className="order-first sm:order-last sm:col-span-5">
          <Link href={post.url} className="block">
            <div className="relative aspect-16/9 overflow-clip rounded-lg border border-border">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-opacity duration-200 fade-in hover:opacity-70"
              />
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
}
