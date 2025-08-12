import { TechStackMarquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import Hero from "@/components/sections/hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <ExperienceSection />
      <TechStackMarquee />
      <ProjectsSection />
      <Contact />
    </main>
  );
}
