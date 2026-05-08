"use client";
import Marquee from "react-fast-marquee";
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
  { name: "Javascript", icon: <Javascript className="w-9 h-9" /> },
  { name: "TypeScript", icon: <Typescript className="w-9 h-9" /> },
  { name: "React", icon: <ReactDark className="w-9 h-9" /> },
  { name: "Next.js", icon: <NextjsIconDark className="w-9 h-9" /> },
  { name: "Tailwind CSS", icon: <Tailwindcss className="w-9 h-9" /> },
  { name: "Node.js", icon: <Nodejs className="w-9 h-9" /> },
  { name: "Express.js", icon: <Expressjs className="w-9 h-9" /> },
  { name: "Three.js", icon: <ThreejsDark className="w-9 h-9" /> },
  { name: "PostgreSQL", icon: <Postgresql className="w-9 h-9" /> },
  { name: "Docker", icon: <Docker className="w-9 h-9" /> },
  { name: "Git", icon: <Git className="w-9 h-9" /> },
  { name: "GitHub Actions", icon: <GithubDark className="w-9 h-9" /> },
  { name: "Convex", icon: <Convex className="w-9 h-9" /> },
  { name: "MongoDB", icon: <MongodbIconDark className="w-9 h-9" /> },
  { name: "Vercel", icon: <VercelDark className="w-9 h-9" /> },
  { name: "OpenAI", icon: <OpenaiDark className="w-9 h-9" /> },
];

export function TechStackMarquee() {
  const isMobile = useIsMobile();
  const speed = isMobile ? 100 : 50;
  return (
    <div className="py-12 border-y border-border/50">
      <Marquee speed={speed} gradient={false}>
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-3 mx-8 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            {tech.icon}
            <span className="text-lg font-medium tracking-wide">
              {tech.name}
            </span>
            <span className="text-primary/20 ml-4 font-serif text-2xl">·</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
