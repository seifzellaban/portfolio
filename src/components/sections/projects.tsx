import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
  },
  {
    name: "Orbit",
    description: "A real-time 3D solar system sim using NASA APIs",
    imageUrl: "/projects/orbit.png",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md flex flex-col">
      <div className="relative w-full mb-4 aspect-[4/3] sm:aspect-video lg:aspect-[5/4] xl:aspect-video">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">
        {project.description}
      </p>
      <div className="flex gap-4 mt-auto">
        {project.demoUrl && (
          <Link href={project.demoUrl} passHref>
            <Button variant="outline">View Demo</Button>
          </Link>
        )}
        {project.sourceUrl && (
          <Link href={project.sourceUrl} passHref>
            <Button variant="outline">View Source</Button>
          </Link>
        )}
      </div>
    </div>
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
    </section>
  );
}
