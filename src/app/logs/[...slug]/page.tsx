import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math-extended";
import rehypeKatex from "rehype-katex";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { components as mdxComponents } from "@/mdx-components";
import {
  getAdjacentPosts,
  getPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { extractHeadings, formatDate, tagSlug } from "@/lib/text";
import { JsonLd } from "@/components/json-ld";
import { ShareLinks } from "@/components/share-links";
import { breadcrumbJsonLd, logJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

function getAllMdxFiles(dir: string, baseDir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, baseDir));
    } else if (entry.name.endsWith(".mdx")) {
      const relative = path.relative(baseDir, fullPath).replace(/\.mdx$/, "");
      files.push(relative);
    }
  }
  return files;
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/logs");
  return getAllMdxFiles(contentDir, contentDir).map((file) => ({
    slug: file.split(path.sep),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = `/logs/${slug.join("/")}`;
  const post = getPosts().find((item) => item.url === url);

  if (!post) return { title: "Log not found" };

  const ogImage = `/logs/og?title=${encodeURIComponent(
    post.title
  )}&summary=${encodeURIComponent(post.summary)}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${post.title} — ${site.name}`,
      description: post.summary,
      url: `${site.url}${url}`,
      publishedTime: post.published || undefined,
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function LogPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const slugFile = slug.join(path.sep);
  const url = `/logs/${slugPath}`;

  const contentDir = path.join(process.cwd(), "src/content/logs");
  const filePath = path.join(contentDir, `${slugFile}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const { data: frontmatter, content } = matter(
    fs.readFileSync(filePath, "utf8")
  );

  const posts = getPosts();
  const post = posts.find((item) => item.url === url);
  const headings = extractHeadings(content);
  const { previous, next } = getAdjacentPosts(slugPath, posts);
  const related = getRelatedPosts(slugPath, posts);

  return (
    <article className="space-y-10">
      <JsonLd
        data={[
          logJsonLd({
            title: post?.title ?? frontmatter.title,
            summary: post?.summary ?? frontmatter.summary,
            url,
            published: post?.published ?? "",
            image: post?.image ?? "",
            author: post?.author ?? "",
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Logs", url: "/logs" },
            { name: post?.title ?? "Log", url },
          ]),
        ]}
      />

      <header className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            <span>{frontmatter.label}</span>
            <span aria-hidden className="h-px w-6 bg-primary/30" />
            <span className="text-muted-foreground">
              {formatDate(post?.published ?? frontmatter.published)}
            </span>
            {post?.readingTime ? (
              <>
                <span aria-hidden className="h-px w-6 bg-border" />
                <span className="text-muted-foreground">
                  {post.readingTime} min read
                </span>
              </>
            ) : null}
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {frontmatter.title}
          </h1>
        </div>

        <p className="border-l-4 border-primary/20 pl-6 text-base italic leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
          {frontmatter.summary}
        </p>

        {frontmatter.tags?.length ? (
          <ul className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag: string) => (
              <li key={tag}>
                <Link
                  href={`/logs/tag/${tagSlug(tag)}`}
                  className="inline-block rounded-full border border-border/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {frontmatter.image && frontmatter.showImage !== false && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-muted">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {headings.length > 2 && (
        <nav
          aria-label="On this page"
          className="rounded-xl border border-border/50 bg-card/30 p-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            On this page
          </p>
          <ol className="mt-3 space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 3 ? "pl-4" : undefined}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="max-w-none">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-6 border-y border-border/50 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/seifalt.jpg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-border/60 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {frontmatter.author || "Seif Zakaria"}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Fullstack developer & founder
            </p>
          </div>
        </div>
        <ShareLinks title={frontmatter.title} />
      </div>

      {related.length > 0 && (
        <section aria-label="Related logs">
          <h2 className="font-serif text-2xl font-bold">Related logs</h2>
          <ul className="mt-5 divide-y divide-border/50 border-y border-border/50">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="group flex items-center justify-between gap-6 py-4"
                >
                  <span>
                    <span className="block font-serif text-lg group-hover:text-primary">
                      {item.title}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {formatDate(item.published)} · {item.readingTime} min
                    </span>
                  </span>
                  <IconArrowUpRight
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(previous || next) && (
        <nav
          aria-label="Log navigation"
          className="grid gap-4 border-t border-border/50 pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={previous.url}
              className="group rounded-xl border border-border/50 p-5 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <IconArrowLeft size={12} /> Newer
              </span>
              <span className="mt-2 block font-serif text-lg font-semibold group-hover:text-primary">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.url}
              className="group rounded-xl border border-border/50 p-5 text-right transition-colors hover:border-primary/40"
            >
              <span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Older <IconArrowRight size={12} />
              </span>
              <span className="mt-2 block font-serif text-lg font-semibold group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}

      <section className="rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">
          Working on something?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          {site.responseTime}. I&apos;m open to freelance projects.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
        >
          Get in touch <IconArrowUpRight size={14} />
        </Link>
      </section>
    </article>
  );
}
