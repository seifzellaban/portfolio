import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { normalizeDate, readingTime, tagSlug } from "@/lib/text";

export interface Post {
  id: string;
  slug: string;
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
  readingTime: number;
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
    const { data, content } = matter(fileContent);
    const urlPath = file.split(path.sep).join("/");

    return {
      id: `post-${urlPath}`,
      slug: urlPath,
      title: data.title || "",
      summary: data.summary || "",
      label: data.label || "",
      author: data.author || "",
      published: normalizeDate(data.published || ""),
      url: `/logs/${urlPath}`,
      image: data.image || "",
      tags: data.tags || [],
      pinned: data.pinned || false,
      hidden: data.hidden || false,
      readingTime: readingTime(content),
    };
  });
}

export function getSortedPosts(posts = getPosts()) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.published).getTime() - new Date(a.published).getTime()
  );
}

export function getAdjacentPosts(slug: string, posts = getPosts()) {
  const visible = getSortedPosts(posts).filter((post) => !post.hidden);
  const index = visible.findIndex((post) => post.slug === slug);
  return {
    previous: index > 0 ? visible[index - 1] : undefined,
    next:
      index >= 0 && index < visible.length - 1 ? visible[index + 1] : undefined,
  };
}

export function getRelatedPosts(slug: string, posts = getPosts(), limit = 3) {
  const current = posts.find((post) => post.slug === slug);
  if (!current?.tags?.length) return [];

  const tags = new Set(current.tags.map((tag) => tag.toLowerCase()));

  return posts
    .filter(
      (post) =>
        post.slug !== slug &&
        !post.hidden &&
        post.tags?.some((tag) => tags.has(tag.toLowerCase()))
    )
    .slice(0, limit);
}

export function getAllTags(posts = getPosts()) {
  const map = new Map<string, { tag: string; slug: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const slug = tagSlug(tag);
      const existing = map.get(slug);
      map.set(slug, {
        tag: existing?.tag ?? tag,
        slug,
        count: (existing?.count ?? 0) + 1,
      });
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}
