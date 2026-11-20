import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
  impact?: string;
  techStack?: string[];
  featured?: boolean;
  role?: string;
  timeline?: string;
  year?: string;
  status?: string;
  team?: string;
  metrics?: ProjectMetric[];
  outcomes?: string[];
  gallery?: string[];
  content?: string;
}

const contentDir = path.join(process.cwd(), "src/content/projects");

function mapProject(slug: string, data: Record<string, unknown>, content = "") {
  return {
    slug,
    name: (data.title as string) || "",
    description: (data.description as string) || "",
    imageUrl: (data.imageUrl as string) || "",
    demoUrl: data.demoUrl as string | undefined,
    sourceUrl: data.sourceUrl as string | undefined,
    impact: data.impact as string | undefined,
    techStack: (data.techStack as string[]) || [],
    featured: data.featured === true,
    role: data.role as string | undefined,
    timeline: data.timeline as string | undefined,
    year: data.year as string | undefined,
    status: data.status as string | undefined,
    team: data.team as string | undefined,
    metrics: (data.metrics as ProjectMetric[]) || [],
    outcomes: (data.outcomes as string[]) || [],
    gallery: (data.gallery as string[]) || [],
    content,
  } satisfies Project;
}

export function getProjects(): Project[] {
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(contentDir, file);
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    return mapProject(file.replace(/\.mdx$/, ""), data, content);
  });
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return mapProject(slug, data, content);
}

export function getAdjacentProjects(slug: string, projects = getProjects()) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next:
      index >= 0 && index < projects.length - 1
        ? projects[index + 1]
        : undefined,
  };
}
