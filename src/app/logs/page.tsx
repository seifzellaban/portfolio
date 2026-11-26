import { Logs } from "@/components/sections/logs";
import { getAllTags, getPosts, getSortedPosts } from "@/lib/posts";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { IconRss } from "@tabler/icons-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
  description:
    "Notes on engineering, products, leadership, and the craft of building software, by Seif Zakaria.",
  alternates: { canonical: "/logs" },
  openGraph: {
    type: "website",
    url: `${site.url}/logs`,
    siteName: site.name,
    title: "Logs — Seif Zakaria",
    description:
      "Notes on engineering, products, leadership, and the craft of building software, by Seif Zakaria.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logs — Seif Zakaria",
    description:
      "Notes on engineering, products, leadership, and the craft of building software, by Seif Zakaria.",
  },
};

export default function LogsPage() {
  const posts = getPosts();
  const visiblePosts = getSortedPosts(posts).filter((post) => !post.hidden);
  const tags = getAllTags(posts);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background selection:bg-primary/10 selection:text-primary">
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: `Logs — ${site.name}`,
            description:
              "Notes on engineering, products, leadership, and the craft of building software, by Seif Zakaria.",
            url: "/logs",
            items: visiblePosts.map((post) => ({
              name: post.title,
              url: post.url,
            })),
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Logs", url: "/logs" },
          ]),
        ]}
      />
      {/* Subtle architectural background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <main id="main-content" className="relative z-10 mx-auto">
        <Logs
          heading="Logs"
          headingLevel="h1"
          kicker="All entries"
          description="Notes on software, side projects, leadership mistakes, and things I figured out while building."
          posts={posts}
          bordered={false}
        />

        <div className="mx-auto max-w-7xl px-5 pb-28 sm:px-6 md:pb-32 lg:px-8">
          {tags.length > 0 && (
            <div className="border-t border-border/50 pt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Browse by topic
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.slug}>
                    <Link
                      href={`/logs/tag/${tag.slug}`}
                      className="inline-flex min-h-[34px] items-center rounded-full border border-border/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {tag.tag} ({tag.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex flex-col items-stretch justify-between gap-4 border-t border-border/50 pt-8 sm:mt-12 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              Prefer reading in a feed reader? New notes are published to RSS.
            </p>
            <a
              href="/feed.xml"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 sm:w-auto"
            >
              <IconRss size={14} className="text-primary" />
              Follow via RSS
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
