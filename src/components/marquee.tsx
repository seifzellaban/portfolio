"use client";
import Marquee from "react-fast-marquee";
import { useReducedMotion } from "motion/react";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Typescript } from "@/components/ui/svgs/typescript";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Expressjs } from "@/components/ui/svgs/expressjs";
import { ThreejsDark } from "@/components/ui/svgs/threejsDark";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Git } from "@/components/ui/svgs/git";
import { GithubDark } from "@/components/ui/svgs/githubDark";
import { Convex } from "@/components/ui/svgs/convex";
import { MongodbIconDark } from "@/components/ui/svgs/mongodbIconDark";
import { VercelDark } from "@/components/ui/svgs/vercelDark";
import { useIsMobile } from "@/hooks/use-mobile";
import { OpenaiDark } from "./ui/svgs/openaiDark";

const techStack = [
  { name: "Javascript", icon: <Javascript className="h-9 w-9" /> },
  { name: "TypeScript", icon: <Typescript className="h-9 w-9" /> },
  { name: "React", icon: <ReactDark className="h-9 w-9" /> },
  { name: "Next.js", icon: <NextjsIconDark className="h-9 w-9" /> },
  { name: "Tailwind CSS", icon: <Tailwindcss className="h-9 w-9" /> },
  { name: "Node.js", icon: <Nodejs className="h-9 w-9" /> },
  { name: "Express.js", icon: <Expressjs className="h-9 w-9" /> },
  { name: "Three.js", icon: <ThreejsDark className="h-9 w-9" /> },
  { name: "PostgreSQL", icon: <Postgresql className="h-9 w-9" /> },
  { name: "Docker", icon: <Docker className="h-9 w-9" /> },
  { name: "Git", icon: <Git className="h-9 w-9" /> },
  { name: "GitHub Actions", icon: <GithubDark className="h-9 w-9" /> },
  { name: "Convex", icon: <Convex className="h-9 w-9" /> },
  { name: "MongoDB", icon: <MongodbIconDark className="h-9 w-9" /> },
  { name: "Vercel", icon: <VercelDark className="h-9 w-9" /> },
  { name: "OpenAI", icon: <OpenaiDark className="h-9 w-9" /> },
];

export function TechStackMarquee() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const speed = isMobile ? 40 : 50;

  return (
    <div className="border-y border-border/50 py-8 sm:py-12">
      <div aria-hidden="true">
        <Marquee
          speed={speed}
          gradient={false}
          play={!reduceMotion}
          pauseOnHover
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="mx-5 flex items-center gap-2.5 text-muted-foreground transition-colors duration-300 hover:text-primary sm:mx-8 sm:gap-3"
            >
              {tech.icon}
              <span className="text-base font-medium tracking-wide sm:text-lg">
                {tech.name}
              </span>
              <span className="ml-3 font-serif text-2xl text-primary/20 sm:ml-4">
                ·
              </span>
            </div>
          ))}
        </Marquee>
      </div>
      <ul className="sr-only">
        {techStack.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
    </div>
  );
}
