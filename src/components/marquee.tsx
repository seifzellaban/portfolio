import Marquee from "react-fast-marquee";
import {
  IconBrandNextjs,
  IconBrandGolang,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTailwind,
  IconSql,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandGit,
  IconApiApp,
  IconBrandMongodb,
  IconBrandVercel,
  IconBrandOpenai,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandThreejs,
} from "@tabler/icons-react";

const techStack = [
  { name: "Javascript", icon: <IconBrandJavascript size={36} /> },
  { name: "TypeScript", icon: <IconBrandTypescript size={36} /> },
  { name: "React", icon: <IconBrandReact size={36} /> },
  { name: "Next.js", icon: <IconBrandNextjs size={36} /> },
  { name: "Tailwind CSS", icon: <IconBrandTailwind size={36} /> },
  { name: "Node.js", icon: <IconBrandNodejs size={36} /> },
  { name: "Express.js", icon: <IconBrandNodejs size={36} /> },
  { name: "Three.js", icon: <IconBrandThreejs size={36} /> },
  { name: "Golang", icon: <IconBrandGolang size={36} /> },
  { name: "PostgreSQL", icon: <IconSql size={36} /> },
  { name: "Docker", icon: <IconBrandDocker size={36} /> },
  { name: "Git", icon: <IconBrandGit size={36} /> },
  { name: "GitHub Actions", icon: <IconBrandGithub size={36} /> },
  { name: "Convex", icon: <IconApiApp size={36} /> },
  { name: "MongoDB", icon: <IconBrandMongodb size={36} /> },
  { name: "Vercel", icon: <IconBrandVercel size={36} /> },
  { name: "Gen AI", icon: <IconBrandOpenai size={36} /> },
];

export function TechStackMarquee() {
  return (
    <div className="py-12 border-y border-border/50">
      <Marquee speed={35} gradient={false}>
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-3 mx-8 text-muted-foreground/50 hover:text-primary transition-colors duration-300"
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
