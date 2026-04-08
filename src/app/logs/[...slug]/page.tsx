import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/posts";
import { components as mdxComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math-extended";
import rehypeKatex from "rehype-katex";

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

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/logs");
  const files = getAllMdxFiles(contentDir, contentDir);
  return files.map((file) => ({
    slug: file.split(path.sep),
  }));
}

export default async function LogPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const slugFile = slug.join(path.sep);

  // Handle external logs (like Rafiqi)
  const allPosts = getPosts();
  const post = allPosts.find((p) => p.url === `/logs/${slugPath}`);
  if (post && post.url.startsWith("http")) {
    redirect(post.url);
  }

  const contentDir = path.join(process.cwd(), "src/content/logs");
  const filePath = path.join(contentDir, `${slugFile}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <article className="space-y-10">
      <header className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm font-mono text-primary uppercase tracking-wider">
            <span>{frontmatter.label}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {frontmatter.published}
            </span>
          </div>
          <h1 className="font-serif text-3xl lg:text-5xl font-bold leading-tight">
            {frontmatter.title}
          </h1>
        </div>

        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6">
          {frontmatter.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-foreground/5 border-none px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {frontmatter.image && frontmatter.showImage !== false && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-border/50">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </div>
    </article>
  );
}
