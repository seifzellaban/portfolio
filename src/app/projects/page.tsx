import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { getProjects } from "@/lib/projects";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Seif Zakaria: NASA Space Apps builds, AI products, 3D interfaces, and startup software.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${site.url}/projects`,
    siteName: site.name,
    title: `Projects — ${site.name}`,
    description:
      "Selected work by Seif Zakaria: NASA Space Apps builds, AI products, 3D interfaces, and startup software.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects — ${site.name}`,
    description:
      "Selected work by Seif Zakaria: NASA Space Apps builds, AI products, 3D interfaces, and startup software.",
  },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: `Projects — ${site.name}`,
            description:
              "Selected work by Seif Zakaria: NASA Space Apps builds, AI products, 3D interfaces, and startup software.",
            url: "/projects",
            items: projects.map((project) => ({
              name: project.name,
              url: `/projects/${project.slug}`,
            })),
          }),
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
          ]),
        ]}
      />

      <section className="border-b border-border/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Selected work</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span>{projects.length.toString().padStart(2, "0")}</span>
          </p>
          <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Projects
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Case studies from hackathons, client work, and my startup. Each one
            covers the problem, the build, and what came out of it.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="divide-y divide-border/50 border-y border-border/50">
            {projects.map((project, index) => (
              <article
                key={project.slug}
                className="group relative grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <div className="md:col-span-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                <div className="md:col-span-8">
                  <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{(index + 1).toString().padStart(2, "0")}</span>
                    <span aria-hidden className="text-border">
                      /
                    </span>
                    <span>{project.year ?? "Case study"}</span>
                  </p>

                  <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-primary/40 decoration-1 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background group-hover:underline"
                      >
                        {project.name}
                        <IconArrowUpRight
                          aria-hidden
                          size={18}
                          className="ml-2 inline-block -translate-y-0.5 text-primary transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-1"
                        />
                      </a>
                    ) : (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="decoration-primary/40 decoration-1 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background group-hover:underline"
                      >
                        {project.name}
                        <IconArrowUpRight
                          aria-hidden
                          size={18}
                          className="ml-2 inline-block -translate-y-0.5 text-primary transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-1"
                        />
                      </Link>
                    )}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] sm:gap-5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/case inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                    >
                      Case study
                      <IconArrowUpRight
                        size={14}
                        className="text-primary transition-transform duration-300 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
                      />
                    </Link>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex min-h-[36px] items-center gap-1.5 py-1.5 text-foreground transition-colors hover:text-primary"
                      >
                        Live site{" "}
                        <IconArrowUpRight
                          size={14}
                          className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <IconBrandGithub size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/50 bg-card/40 p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                Have something in mind?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {site.responseTime.toLowerCase()}. Tell me what you&apos;re
                building.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              Get in touch <IconArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
