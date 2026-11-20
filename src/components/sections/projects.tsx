"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme-provider";
import { Project } from "@/lib/projects";
import { useReveal, useRevealGroup } from "@/hooks/use-reveal";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const ActivityCalendar = dynamic(
  () =>
    import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false }
);

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const pad = (n: number) => n.toString().padStart(2, "0");

const metaClasses =
  "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

function TechStack({
  items,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  if (!items?.length) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-border/70 px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-muted-foreground transition-colors duration-300 group-hover:border-border"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.demoUrl && !project.sourceUrl) return null;

  return (
    <div className="relative z-10 flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em]">
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
        >
          Live site
          <IconArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      )}
      {project.sourceUrl && (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconBrandGithub className="h-3.5 w-3.5" />
          Source
        </a>
      )}
    </div>
  );
}

/**
 * The card's only real link. A stretched ::after pseudo-element makes the
 * whole article clickable without nesting anchors, so the external links
 * can sit above it with `relative z-10`.
 */
function CaseStudyLink({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`decoration-primary/40 decoration-1 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background group-hover:underline ${className}`}
    >
      {project.name}
      <IconArrowUpRight
        aria-hidden
        className="ml-2 inline-block h-[0.65em] w-[0.65em] -translate-y-[0.1em] text-primary transition-transform duration-300 group-hover:-translate-y-[0.2em] group-hover:translate-x-1"
      />
    </Link>
  );
}

function FeaturedProject({
  project,
  number,
  revealRef,
}: {
  project: Project;
  number: number;
  revealRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article ref={revealRef} className="reveal group relative">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-muted sm:aspect-[16/9]">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
          Featured
        </span>
      </div>

      {/* Caption */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-8">
          <div className={metaClasses}>
            <span>{pad(number)}</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>Featured project</span>
          </div>

          <h3 className="mt-4 font-serif text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <CaseStudyLink project={project} />
          </h3>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:col-span-4 md:items-end md:justify-end">
          <TechStack items={project.techStack} className="md:justify-end" />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectRow({
  project,
  number,
  revealRef,
}: {
  project: Project;
  number: number;
  revealRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={revealRef}
      className="reveal group relative border-t border-border/50 py-10 md:py-14"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pl-2">
          <div className={metaClasses}>
            <span>{pad(number)}</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>Case study</span>
          </div>

          <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            <CaseStudyLink project={project} />
          </h3>

          <p className="mt-3 line-clamp-2 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.description}
          </p>

          <div className="mt-6">
            <TechStack items={project.techStack} />
          </div>

          <div className="mt-6">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection({
  projects,
  contributions,
}: {
  projects: Project[];
  contributions?: Activity[];
}) {
  const { theme } = useTheme();
  const headingRef = useReveal<HTMLDivElement>();
  const calendarRef = useReveal<HTMLDivElement>();
  const cardRevealRef = useRevealGroup();

  const selectMonths = (contributions: Activity[]): Activity[] => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 12;

    return contributions.filter((activity: Activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
      const yearOfDay = date.getFullYear();

      const monthsAgo =
        (currentYear - yearOfDay) * 12 + (currentMonth - monthOfDay);
      return monthsAgo >= 0 && monthsAgo < shownMonths;
    });
  };

  if (projects.length === 0) return null;

  const featuredIndex = Math.max(
    0,
    projects.findIndex((project) => project.featured)
  );
  const featured = projects[featuredIndex];
  const rows = projects
    .map((project, index) => ({ project, index }))
    .filter(({ index }) => index !== featuredIndex);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial heading */}
        <div ref={headingRef} className="reveal">
          <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className={metaClasses}>
                <span aria-hidden className="h-px w-8 bg-primary" />
                Selected work — {pad(projects.length)}
              </p>
              <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Projects
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
              Selected works highlighting proficiency in full-stack development
              and system design.
            </p>
          </header>
        </div>

        {/* Featured + index list */}
        <div className="mt-14 md:mt-20">
          <FeaturedProject
            project={featured}
            number={featuredIndex + 1}
            revealRef={cardRevealRef}
          />

          <div className="mt-10 md:mt-14">
            {rows.map(({ project, index }) => (
              <ProjectRow
                key={project.slug}
                project={project}
                number={index + 1}
                revealRef={cardRevealRef}
              />
            ))}
          </div>
        </div>

        {/* Activity strip */}
        <div
          ref={calendarRef}
          className="reveal mt-16 border-t border-border/50 pt-10 md:mt-20"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="shrink-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Activity / last 12 months
              </p>
              <p className="mt-2 font-serif text-xl font-semibold text-foreground">
                GitHub contributions
              </p>
            </div>

            <div className="min-w-0 max-w-full overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="w-max">
                {contributions?.length ? (
                  <ActivityCalendar
                    data={contributions}
                    colorScheme={theme}
                    blockSize={11}
                    blockMargin={3}
                    fontSize={12}
                    labels={{
                      totalCount: "{{count}} contributions in the last year",
                    }}
                  />
                ) : (
                  <GitHubCalendar
                    username="seifzellaban"
                    transformData={selectMonths}
                    colorScheme={theme}
                    blockSize={11}
                    blockMargin={3}
                    fontSize={12}
                    labels={{
                      totalCount: "{{count}} contributions in the last year",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
