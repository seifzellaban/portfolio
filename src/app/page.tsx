import { TechStackMarquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import Hero from "@/components/sections/hero";
import { Logs } from "@/components/sections/logs";
import { Services } from "@/components/sections/services";
import Signature from "@/components/signature";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <ExperienceSection />
      <TechStackMarquee />
      <ProjectsSection />
      <Logs count={3} />
      <Contact />
      <Signature />
    </main>
  );
}
