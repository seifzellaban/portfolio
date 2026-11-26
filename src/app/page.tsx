import type { Metadata } from "next";
import { TechStackMarquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import Hero from "@/components/sections/hero";
import { Logs } from "@/components/sections/logs";
import { Services } from "@/components/sections/services";
import { TestimonialsSection } from "@/components/sections/testimonials";
import Signature from "@/components/signature";
import { JsonLd } from "@/components/json-ld";
import { getProjects } from "@/lib/projects";
import { getPosts, getSortedPosts } from "@/lib/posts";
import { getContributions } from "@/lib/github";
import { homeGraphJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: site.title,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Seif",
    lastName: "Zakaria",
    username: site.handle,
    url: `${site.url}/`,
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@seifzellaban",
    site: "@seifzellaban",
  },
};

export default async function Page() {
  const projects = getProjects();
  const posts = getPosts();
  const contributions = await getContributions("seifzellaban");
  const latestPublished = getSortedPosts(posts).find(
    (post) => !post.hidden && post.published
  )?.published;

  return (
    <>
      <JsonLd data={homeGraphJsonLd({ dateModified: latestPublished })} />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <ExperienceSection />
        <TechStackMarquee />
        <ProjectsSection projects={projects} contributions={contributions} />
        <TestimonialsSection />
        <Logs count={3} posts={posts} />
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          <Contact />
          <Signature />
        </div>
      </main>
    </>
  );
}
