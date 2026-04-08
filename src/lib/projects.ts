import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
  impact?: string;
  techStack?: string[];
}

export function getProjects(): Project[] {
  const contentDir = path.join(process.cwd(), "src/content/projects");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug: file.replace(/\.mdx$/, ""),
      name: data.title || "",
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      demoUrl: data.demoUrl,
      sourceUrl: data.sourceUrl,
      impact: data.impact,
      techStack: data.techStack || [],
    };
  });
}
