import { TechStackMarquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import Hero from "@/components/sections/hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackMarquee />
      <div className="h-200"></div>
    </main>
  );
}
