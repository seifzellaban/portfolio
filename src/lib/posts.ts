import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
  pinned?: boolean;
  hidden?: boolean;
}

function getAllMdxFiles(dir: string, baseDir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, baseDir));
    } else if (entry.name.endsWith(".mdx")) {
      const relative = path.relative(baseDir, fullPath).replace(/\.mdx$/, "");
      files.push(relative);
    }
  }
  return files;
}

export function getPosts(): Post[] {
  const contentDir = path.join(process.cwd(), "src/content/logs");
  const files = getAllMdxFiles(contentDir, contentDir);

  return files.map((file) => {
    const filePath = path.join(contentDir, `${file}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const urlPath = file.split(path.sep).join("/");

    return {
      id: `post-${urlPath}`,
      title: data.title || "",
      summary: data.summary || "",
      label: data.label || "",
      author: data.author || "",
      published: data.published || "",
      url: `/logs/${urlPath}`,
      image: data.image || "",
      tags: data.tags || [],
      pinned: data.pinned || false,
      hidden: data.hidden || false,
    };
  });
}
