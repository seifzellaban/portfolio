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
  "flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

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
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] sm:gap-5">
      <Link
        href={`/projects/${project.slug}`}
        className="group/case inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
      >
        Case study
        <IconArrowUpRight className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5" />
      </Link>
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-[36px] items-center gap-1.5 py-1.5 text-foreground transition-colors hover:text-primary"
        >
          Live site
          <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      ) : null}
      {project.sourceUrl ? (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[36px] items-center gap-1.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconBrandGithub className="h-3.5 w-3.5" />
          Source
        </a>
      ) : null}
    </div>
  );
}

/**
 * The card's primary stretched link. Points to the live site when available,
 * falling back to the project's case study page when no live URL exists.
 * Action buttons (including the explicit Case study link) sit above it with `relative z-10`.
 */
function ProjectTitleLink({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const linkClassName = `decoration-primary/40 decoration-1 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background group-hover:underline ${className}`;

  const content = (
    <>
      {project.name}
      <IconArrowUpRight
        aria-hidden
        className="ml-2 inline-block h-[0.65em] w-[0.65em] -translate-y-[0.1em] text-primary transition-transform duration-300 group-hover:-translate-y-[0.2em] group-hover:translate-x-1"
      />
    </>
  );

  if (project.demoUrl) {
    return (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`} className={linkClassName}>
      {content}
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
  const metrics = project.metrics?.slice(0, 3) ?? [];

  return (
    <article
      ref={revealRef}
      className="reveal group relative overflow-hidden rounded-2xl border border-border/60 bg-card/55"
    >
      {/* Top dossier header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/50 px-4 py-3.5 sm:gap-3 sm:px-8 sm:py-4">
        <div className={metaClasses}>
          <span className="text-foreground">{pad(number)}</span>
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
          {project.role ? (
            <>
              <span aria-hidden className="hidden text-border sm:inline">
                /
              </span>
              <span className="hidden sm:inline">{project.role}</span>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:gap-3">
          {project.timeline || project.year ? (
            <span>{project.timeline ?? project.year}</span>
          ) : null}
          {project.status ? (
            <span className="rounded-full border border-border/70 bg-background/70 px-2.5 py-0.5 text-[10px] text-foreground">
              {project.status}
            </span>
          ) : null}
        </div>
      </div>

      {/* Showcase frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/50 bg-muted sm:aspect-[16/9]">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30"
        />
      </div>

      {/* Case-study breakdown */}
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <h3 className="font-serif text-2xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <ProjectTitleLink project={project} />
            </h3>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-4 lg:text-lg">
              {project.description}
            </p>
          </div>

          {metrics.length > 0 ? (
            <dl className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4 sm:grid-cols-3 sm:pt-5 lg:col-span-5 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-border/50 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {metrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={
                    idx === 0
                      ? "lg:pb-3.5"
                      : idx === metrics.length - 1
                        ? "col-span-2 border-t border-border/40 pt-3 sm:col-span-1 sm:border-t-0 sm:pt-0 lg:pt-3.5"
                        : "lg:py-3.5"
                  }
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:tracking-[0.18em]">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 font-serif text-base font-semibold text-foreground sm:text-lg">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-5 sm:mt-8 sm:gap-5 sm:pt-6">
          <TechStack items={project.techStack} />
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
  const metrics = project.metrics?.slice(0, 3) ?? [];

  return (
    <article ref={revealRef} className="reveal group relative py-8 sm:py-10 md:py-14">
      <div className="grid grid-cols-1 gap-5 sm:gap-7 md:grid-cols-12 md:items-center md:gap-10">
        {/* Image column */}
        <div className="md:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/60 bg-muted">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {project.status ? (
              <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground backdrop-blur-sm sm:left-3.5 sm:top-3.5">
                {project.status}
              </span>
            ) : null}
          </div>
        </div>

        {/* Details column */}
        <div className="md:col-span-7">
          <div className={metaClasses}>
            <span className="text-foreground">{pad(number)}</span>
            {project.year ? (
              <>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{project.year}</span>
              </>
            ) : null}
            {project.role ? (
              <>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{project.role}</span>
              </>
            ) : null}
          </div>

          <h3 className="mt-2.5 font-serif text-2xl font-bold tracking-tight text-foreground sm:mt-3 sm:text-3xl lg:text-4xl">
            <ProjectTitleLink project={project} />
          </h3>

          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
            {project.description}
          </p>

          {metrics.length > 0 ? (
            <dl className="mt-4 grid grid-cols-2 gap-3.5 border-y border-border/50 py-3.5 sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:py-4">
              {metrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={
                    idx === metrics.length - 1
                      ? "col-span-2 border-t border-border/40 pt-2.5 sm:col-span-1 sm:border-t-0 sm:pt-0"
                      : ""
                  }
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 sm:mt-5">
            <TechStack items={project.techStack} />
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
  const cardRevealRef = useRevealGroup({ threshold: 0.05 });

  const selectMonths = (items: Activity[]): Activity[] => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 12;

    return items.filter((activity: Activity) => {
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

  const totalContributions = contributions?.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <section
      id="projects"
      className="border-t border-border/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Editorial heading */}
        <div ref={headingRef} className="reveal">
          <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className={metaClasses}>
                <span>Selected work</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{pad(projects.length)}</span>
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:text-6xl">
                Selected{" "}
                <span className="font-light italic text-primary">
                  projects.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
              Products, studio builds, and hackathon wins, from 3D solar systems
              to AI research tools.
            </p>
          </header>
        </div>

        {/* Featured + ruled index */}
        <div className="mt-10 sm:mt-14 md:mt-20">
          <FeaturedProject
            project={featured}
            number={1}
            revealRef={cardRevealRef}
          />

          <div className="mt-10 divide-y divide-border/50 border-y border-border/50 sm:mt-12 md:mt-16">
            {rows.map(({ project }, idx) => (
              <ProjectRow
                key={project.slug}
                project={project}
                number={idx + 2}
                revealRef={cardRevealRef}
              />
            ))}
          </div>
        </div>

        {/* Archive & GitHub Activity Strip */}
        <div
          ref={calendarRef}
          className="reveal mt-10 rounded-2xl border border-border/60 bg-card/45 p-5 sm:mt-12 sm:p-8 md:mt-16"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="shrink-0">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  GitHub activity / 12 months
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 md:hidden">
                  Swipe →
                </span>
              </div>
              <p className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground">
                {totalContributions
                  ? `${totalContributions.toLocaleString()} contributions`
                  : "Recent commits"}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em]">
                <Link
                  href="/projects"
                  className="group/all inline-flex min-h-[36px] items-center gap-1.5 text-foreground transition-colors hover:text-primary"
                >
                  All case studies
                  <IconArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5"
                  />
                </Link>
                <a
                  href="https://github.com/seifzellaban"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <IconBrandGithub size={14} />
                  @seifzellaban
                </a>
              </div>
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
