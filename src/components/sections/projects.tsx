"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "@/lib/theme-provider";

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
  impact?: string;
}

const projects: Project[] = [
  {
    name: "Umbra",
    description:
      "Built for the 2025 NASA Space Apps Challenge, Umbra empowers researchers, mission planners, and citizen scientists to explore, filter, and visualize NASA’s vast library of space biology experiments. Designed to fuel the next era of human space exploration.",
    imageUrl: "/projects/umbra.png",
    demoUrl: "https://umbra.wearemasons.com",
    sourceUrl: "https://github.com/wearemasons/umbra",
    impact: "Enabled researchers to visualize 600+ space biology experiments.",
  },
  {
    name: "Masons Landing Page",
    description:
      "The landing page for my startup focused on building meaningful, impact-driven software for real-world problems.",
    imageUrl: "/projects/masons.png",
    demoUrl: "https://wearemasons.com",
    sourceUrl: "https://github.com/wearemasons/website",
    impact: "Increased inquiry rate by 40% through improved UX.",
  },
  {
    name: "Orbit",
    description: "A real-time 3D solar system sim using NASA APIs",
    imageUrl: "/projects/orbit.png",
    sourceUrl: "https://github.com/wearemasons/orbit",
  },
  {
    name: "repAI",
    description:
      "An AI Powered Recycling App with Rewards and Cashback for building a Sustainable Future, Built for Google's AI-Finance Hackathon 2025 by GDG Cairo",
    imageUrl: "/projects/repai.png",
    sourceUrl: "https://github.com/wearemasons/repAI",
    impact: "Won 5th place at Google's AI-Finance Hackathon 2025.",
  },
];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col bg-card rounded-lg shadow-md">
      <CardContent className="flex flex-col flex-grow">
        <div className="relative w-full mb-4 aspect-[4/3] sm:aspect-video lg:aspect-[5/4] xl:aspect-video">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
        </div>

        <CardTitle className="text-2xl font-semibold mb-2">
          {project.name}
        </CardTitle>

        <CardDescription className="text-muted-foreground text-lg mb-4 flex-grow">
          {project.description}
        </CardDescription>

        {project.impact && (
          <div className="mb-4 p-3 bg-muted/50 rounded-md">
            <p className="text-base font-medium text-foreground">
              Impact:{" "}
              <span className="text-muted-foreground font-normal">
                {project.impact}
              </span>
            </p>
          </div>
        )}

        <CardFooter className="flex gap-4 mt-auto p-0">
          {project.demoUrl && (
            <Link href={project.demoUrl} passHref>
              <Button variant="outline">Visit Demo</Button>
            </Link>
          )}
          {project.sourceUrl && (
            <Link href={project.sourceUrl} passHref>
              <Button variant="outline">View Source Code</Button>
            </Link>
          )}
        </CardFooter>
      </CardContent>
    </Card>
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
    const shownMonths = 9;

    return contributions.filter((activity: Activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-bold tracking-tight text-foreground text-3xl sm:text-4xl text-center mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Github Contributions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-8">
            <GitHubCalendar
              username="seifzellaban"
              transformData={selectMonths}
              colorScheme={theme}
              labels={{
                totalCount: "{{count}} contributions in the last 3 quarters",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
