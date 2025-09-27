import { TechStackMarquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import Hero from "@/components/sections/hero";
import { Logs } from "@/components/sections/logs";
import { CustomCursor } from "@/components/custom-cursor";

export default function Page() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <About />
      <ExperienceSection />
      <TechStackMarquee />
      <ProjectsSection />
      <Logs />
      <Contact />
    </main>
  );
}
