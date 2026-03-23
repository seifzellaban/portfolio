import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { MdxLayout } from "@/components/mdx-layout";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/projects");
  const files = fs.readdirSync(contentDir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contentDir = path.join(process.cwd(), "src/content/projects");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-12 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>

        <div className="space-y-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50">
            <Image
              src={frontmatter.imageUrl}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold">
              {frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {frontmatter.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {frontmatter.techStack?.map((tech: string) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-sm bg-foreground/10 border-none px-4 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            {frontmatter.demoUrl && (
              <Link href={frontmatter.demoUrl} target="_blank">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="h-5 w-5" /> Visit Live Demo
                </Button>
              </Link>
            )}
            {frontmatter.sourceUrl && (
              <Link href={frontmatter.sourceUrl} target="_blank">
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="h-5 w-5" /> Source Code
                </Button>
              </Link>
            )}
          </div>

          <hr className="border-border/50 my-12" />

          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground">
            <MDXRemote source={content} />
          </article>
        </div>
      </div>
    </div>
  );
}
