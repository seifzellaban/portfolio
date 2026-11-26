import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { getPosts, getSortedPosts } from "@/lib/posts";
import { services } from "@/lib/services-data";
import { site } from "@/lib/site";

function fileMtime(relativePath: string, fallback: Date): Date {
  try {
    return fs.statSync(
      path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath)
    ).mtime;
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const posts = getSortedPosts(getPosts()).filter((post) => !post.hidden);
  const latestPostDate = posts[0]?.published
    ? new Date(posts[0].published)
    : new Date("2026-05-12");
  const projects = getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: fileMtime("src/app/page.tsx", latestPostDate),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${baseUrl}${site.portrait}`, `${baseUrl}/seifalt.jpg`],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: fileMtime("src/app/projects/page.tsx", latestPostDate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: fileMtime("src/lib/services-data.tsx", latestPostDate),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/logs`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: fileMtime("src/app/links/links-hub.tsx", latestPostDate),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: fileMtime("src/app/privacy/page.tsx", latestPostDate),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: post.published
      ? new Date(post.published)
      : fileMtime(`src/content/logs/${post.slug}.mdx`, latestPostDate),
    changeFrequency: "monthly",
    priority: 0.7,
    ...(post.image ? { images: [`${baseUrl}${post.image}`] } : {}),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: fileMtime(
      `src/content/projects/${project.slug}.mdx`,
      latestPostDate
    ),
    changeFrequency: "monthly",
    priority: 0.8,
    ...(project.imageUrl ? { images: [`${baseUrl}${project.imageUrl}`] } : {}),
  }));

  const servicesMtime = fileMtime("src/lib/services-data.tsx", latestPostDate);
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: servicesMtime,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...projectRoutes,
    ...serviceRoutes,
  ];
}
