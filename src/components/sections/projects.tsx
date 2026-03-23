"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme-provider";
import { Project, projects } from "@/lib/projects-data";
import { motion } from "motion/react";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

function BentoProjectCard({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const isLarge = index === 0;

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 h-full ${className}`}
      >
        {/* Image */}
        <div
          className={`relative w-full ${isLarge ? "aspect-[16/9]" : "aspect-[4/3]"}`}
        >
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Info bar */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-semibold">{project.name}</h3>
            {project.impact && (
              <p className="text-sm text-muted-foreground mt-1">
                {project.impact}
              </p>
            )}
          </div>
          <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
        </div>

        {/* Frosted overlay on hover — covers entire card */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 z-10">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
            {project.name}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>
          {project.techStack && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-sm bg-foreground/10 border-none px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-4">
            {project.demoUrl && (
              <div onClick={(e) => e.stopPropagation()}>
                <Link href={project.demoUrl} target="_blank">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-base"
                  >
                    Visit Demo
                  </Button>
                </Link>
              </div>
            )}
            {project.sourceUrl && (
              <div onClick={(e) => e.stopPropagation()}>
                <Link href={project.sourceUrl} target="_blank">
                  <Button variant="ghost" size="lg" className="text-base">
                    Source Code
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ProjectsSection() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <BentoProjectCard
              key={project.name}
              project={project}
              index={index}
              className={index === 0 ? "md:col-span-2" : ""}
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
