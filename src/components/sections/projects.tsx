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

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
}

const projects: Project[] = [
  {
    name: "Masons Landing Page",
    description:
      "The landing page for my startup focused on building meaningful, impact-driven software for real-world problems.",
    imageUrl: "/projects/masons.png",
    demoUrl: "https://wearemasons.com",
    sourceUrl: "https://github.com/wearemasons/website",
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
      "An AI Powered Recycling App with Rewards and Cashback for building a Sustainable Future, Built for AI Finance Hackathon 2025 by GDG Cairo",
    imageUrl: "/projects/repai.png",
    sourceUrl: "https://github.com/wearemasons/repAI",
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
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-bold tracking-tight text-foreground text-4xl md:text-7xl text-center mb-12">
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
            <GitHubCalendar username="seifzellaban" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
