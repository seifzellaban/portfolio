import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { Logs } from "@/components/sections/logs";
import { getAllTags, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

function findTag(slug: string, posts = getPosts()) {
  return getAllTags(posts).find((tag) => tag.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const found = findTag(tag);

  if (!found) return { title: "Tag not found" };

  return {
    title: `#${found.tag}`,
    description: `Logs tagged ${found.tag} by Seif Zakaria.`,
    alternates: { canonical: `/logs/tag/${found.slug}` },
    openGraph: {
      title: `#${found.tag} — ${site.name}`,
      description: `Logs tagged ${found.tag}.`,
      type: "website",
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPosts();
  const found = findTag(tag, posts);

  if (!found) notFound();

  const tagged = posts.filter((post) =>
    post.tags?.some(
      (postTag) => postTag.toLowerCase() === found.tag.toLowerCase()
    )
  );

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <Link
          href="/logs"
          className="inline-flex min-h-[40px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
        >
          <IconArrowLeft size={14} /> All logs
        </Link>
      </div>
      <Logs
        heading={`#${found.tag}`}
        kicker={`Topic archive / ${tagged.length} ${
          tagged.length === 1 ? "entry" : "entries"
        }`}
        description={`Essays and field notes filed under ${found.tag}.`}
        posts={tagged}
        bordered={false}
      />
    </main>
  );
}
