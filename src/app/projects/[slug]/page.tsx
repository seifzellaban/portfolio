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
  IconBrandGithub,
} from "@tabler/icons-react";
import { components as mdxComponents } from "@/mdx-components";
import {
  getAdjacentProjects,
  getProject,
  getProjects,
} from "@/lib/projects";
import { extractHeadings } from "@/lib/text";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${site.name}`,
      description: project.description,
      url: `${site.url}/projects/${project.slug}`,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${site.name}`,
      description: project.description,
      creator: "@seifzellaban",
    },
  };
}

const metaLabels = [
  { key: "role", label: "Role" },
  { key: "timeline", label: "Timeline" },
  { key: "team", label: "Team" },
  { key: "status", label: "Status" },
] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  // Re-read the raw MDX body for plugins.
  const filePath = path.join(
    process.cwd(),
    "src/content/projects",
    `${slug}.mdx`
  );
  const { content } = matter(fs.readFileSync(filePath, "utf8"));
  const headings = extractHeadings(content);
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <div className="space-y-10">
      <JsonLd
        data={[
          projectJsonLd({
            name: project.name,
            description: project.description,
            slug: project.slug,
            imageUrl: project.imageUrl,
            demoUrl: project.demoUrl,
            sourceUrl: project.sourceUrl,
            techStack: project.techStack,
            year: project.year,
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            {
              name: project.name,
              url: `/projects/${project.slug}`,
            },
          ]),
        ]}
      />

      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{project.year ?? "Case study"}</span>
          {project.status && (
            <>
              <span aria-hidden className="h-px w-6 bg-border" />
              <span>{project.status}</span>
            </>
          )}
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>
            By{" "}
            <Link
              href="/"
              rel="author"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              {site.name}
            </Link>
          </span>
        </div>

        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {project.name}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
          {project.description}
        </p>

        {project.techStack?.length ? (
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Visit live site <IconArrowUpRight size={16} />
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              <IconBrandGithub size={16} /> Source code
            </a>
          )}
        </div>
      </header>

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-muted">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      {(project.role || project.timeline || project.team || project.status) && (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border/50 py-6 sm:grid-cols-4">
          {metaLabels.map(({ key, label }) => {
            const value = project[key];
            if (!value) return null;
            return (
              <div key={key}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1.5 text-base text-foreground">{value}</dd>
              </div>
            );
          })}
        </dl>
      )}

      {project.metrics?.length ? (
        <section aria-label="Project metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/50 bg-card/40 p-5"
            >
              <p className="font-serif text-2xl font-bold text-foreground">
                {metric.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </section>
      ) : null}

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

      <article className="max-w-none">
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
      </article>

      {project.outcomes?.length ? (
        <section className="rounded-2xl border border-border/50 bg-card/40 p-8">
          <h2 className="font-serif text-2xl font-bold">What came out of it</h2>
          <ul className="mt-5 space-y-3">
            {project.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-3 text-base leading-relaxed text-muted-foreground"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {outcome}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.gallery?.length ? (
        <section aria-label="Project gallery" className="grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div
              key={image}
              className="relative aspect-video overflow-hidden rounded-xl border border-border/50 bg-muted"
            >
              <Image
                src={image}
                alt={`${project.name} screenshot ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </section>
      ) : null}

      <nav
        aria-label="Project navigation"
        className="grid gap-4 border-t border-border/50 pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="group rounded-xl border border-border/50 p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <IconArrowLeft size={12} /> Previous
            </span>
            <span className="mt-2 block font-serif text-lg font-semibold group-hover:text-primary">
              {previous.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-xl border border-border/50 p-5 text-right transition-colors hover:border-primary/40"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Next <IconArrowRight size={12} />
            </span>
            <span className="mt-2 block font-serif text-lg font-semibold group-hover:text-primary">
              {next.name}
            </span>
          </Link>
        )}
      </nav>

      <section className="rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">
          Building something similar?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          {site.responseTime}. Tell me about the problem you&apos;re solving.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
        >
          Start a conversation <IconArrowUpRight size={14} />
        </Link>
      </section>
    </div>
  );
}
