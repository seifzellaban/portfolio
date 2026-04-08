import { TechStackMarquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import Hero from "@/components/sections/hero";
import { Logs } from "@/components/sections/logs";
import { Services } from "@/components/sections/services";
import Signature from "@/components/signature";
import { getProjects } from "@/lib/projects";
import { getPosts } from "@/lib/posts";

export default function Page() {
  const projects = getProjects();
  const posts = getPosts();
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <ExperienceSection />
      <div className="mt-16" />
      <TechStackMarquee />
      <ProjectsSection projects={projects} />
      <Logs count={3} posts={posts} />
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <Contact />
        <Signature />
      </div>
    </main>
  );
}
