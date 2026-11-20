import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "src/content/projects",
    `${slug}.mdx`
  );

  let title = "Project";
  let description = "";

  try {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    title = data.title || title;
    description = data.description || "";
  } catch {
    // Fall back to defaults for unknown slugs.
  }

  return renderOg({
    kicker: "Case study",
    title,
    subtitle: description,
  });
}
