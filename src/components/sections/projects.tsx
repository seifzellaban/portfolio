"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme-provider";
import { Project } from "@/lib/projects";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const cardSizes = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

function BentoProjectCard({
  project,
  index,
  className = "",
}: {
  project: { slug: string; name: string; description: string; imageUrl: string; demoUrl?: string; sourceUrl?: string; impact?: string; techStack?: string[] };
  index: number;
  className?: string;
}) {
  const router = useRouter();
  const isLarge = index === 0;

  return (
    <motion.div
      onClick={() => router.push(`/projects/${project.slug}`)}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 cursor-link ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Project number */}
      <div className="absolute top-4 left-4 z-20 font-mono text-xs text-foreground/40 tracking-widest">
        {(index + 1).toString().padStart(2, "0")}
      </div>

      {/* Image */}
      <div className={`relative w-full ${isLarge ? "min-h-[420px]" : "min-h-[260px]"}`}>
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          sizes={
            isLarge
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay — always visible for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent z-10" />

      {/* Always-visible info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            {project.impact && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {project.impact}
              </p>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Hover reveal panel */}
      <div className="absolute inset-0 z-30 bg-background/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6">
          {project.name}
        </h3>
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-foreground/10 border-none px-3 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge
                variant="secondary"
                className="text-xs bg-foreground/10 border-none px-3 py-0.5"
              >
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        )}
        <div className="flex gap-3">
          {project.demoUrl && (
            <Link href={project.demoUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
            </Link>
          )}
          {project.sourceUrl && (
            <Link href={project.sourceUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-foreground/5 transition-colors">
                <Github className="w-4 h-4" />
                Source
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const { theme } = useTheme();

  interface Activity {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }

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

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial heading */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
          <div className="mt-3 h-[2px] w-16 bg-primary" />
          <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
            Selected works highlighting proficiency in full-stack development
            and system design.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[260px]">
          {projects.map((project, index) => (
            <BentoProjectCard
              key={project.name}
              project={project}
              index={index}
              className={cardSizes[index] || "md:col-span-1 md:row-span-1"}
            />
          ))}
        </div>

        {/* GitHub Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl bg-card border border-border/50"
        >
          <h3 className="font-serif text-2xl font-semibold text-center mb-8">
            GitHub Contributions
          </h3>
          <div className="flex justify-center">
            <GitHubCalendar
              username="seifzellaban"
              transformData={selectMonths}
              colorScheme={theme}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
