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
  { name: "Javascript", icon: <IconBrandJavascript size={42} /> },
  { name: "TypeScript", icon: <IconBrandTypescript size={42} /> },
  { name: "React", icon: <IconBrandReact size={42} /> },
  { name: "Next.js", icon: <IconBrandNextjs size={42} /> },
  { name: "Tailwind CSS", icon: <IconBrandTailwind size={42} /> },
  { name: "Node.js", icon: <IconBrandNodejs size={42} /> },
  { name: "Express.js", icon: <IconBrandNodejs size={42} /> },
  { name: "Three.js", icon: <IconBrandThreejs size={42} /> },
  { name: "Golang", icon: <IconBrandGolang size={42} /> },
  { name: "PostgreSQL", icon: <IconSql size={42} /> },
  { name: "Docker", icon: <IconBrandDocker size={42} /> },
  { name: "Git", icon: <IconBrandGit size={42} /> },
  { name: "GitHub Actions", icon: <IconBrandGithub size={42} /> },
  { name: "Convex", icon: <IconApiApp size={42} /> },
  { name: "MongoDB", icon: <IconBrandMongodb size={42} /> },
  { name: "Vercel", icon: <IconBrandVercel size={42} /> },
  { name: "Gen AI", icon: <IconBrandOpenai size={42} /> },
];

export function TechStackMarquee() {
  return (
    <Marquee>
      {techStack.map((tech) => (
        <div
          key={tech.name}
          className="flex items-center space-x-4 mx-4 pt-16 text-muted-foreground"
        >
          {tech.icon}
          <span className="text-2xl font-semibold text-muted-foreground">
            {tech.name}
          </span>
        </div>
      ))}
    </Marquee>
  );
}
