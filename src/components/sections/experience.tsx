import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";

export function ExperienceSection() {
  const data = [
    {
      title: "Sep 2022",
      content: (
        <div>
          <h3 className="mb-2 text-2xl font-semibold">
            Attended Ain Shams University
          </h3>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Began my B.Sc. in Computer Science & Statistics at{" "}
            <LinkPreview
              url="https://www.asu.edu.eg/"
              className="font-bold text-muted-foreground"
            >
              Ain Shams University.
            </LinkPreview>
          </p>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Went beyond just coding; from shipping real projects to running
            events, mentoring, and experimenting with everything from software
            dev to data analysis and machine learning. All while stirring things
            up in the{" "}
            <Link href="/osc" className="underline">
              Open Source Community (OSC)
            </Link>
            .
          </p>
        </div>
      ),
    },
    {
      title: "Sep 2023 – Present",
      content: (
        <div>
          <h3 className="mb-2 text-2xl font-semibold">Founded Masons</h3>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Launched{" "}
            <LinkPreview
              url="https://wearemasons.com"
              className="font-bold text-muted-foreground"
            >
              Masons
            </LinkPreview>
            , my startup focused on building meaningful, impact-driven software
            for real-world problems.
          </p>
          <div className="mb-4">
            <h4 className="mb-2 text-lg font-medium">Flagship Project:</h4>
            <p className="text-base font-normal text-muted-foreground md:text-lg">
              <LinkPreview
                url="https://test-rafiqi.wearemasons.com"
                className="font-bold text-muted-foreground"
              >
                Rafiqi
              </LinkPreview>{" "}
              — an AI-powered mental health platform tailored for Egyptians.
            </p>
            <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
              Rafiqi combines culturally informed design with AI to provide
              mental health support that’s accessible and relevant to the people
              it serves.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 text-lg font-medium">Competitive Builds:</h4>
            <div className="mb-2">
              <p className="text-base font-medium text-muted-foreground md:text-lg">
                <strong>Oct 2023 — NASA Space Apps Challenge</strong>
              </p>
              <div className="ml-4 mt-1">
                <div className="flex items-center gap-2 text-base text-muted-foreground/80 md:text-lg">
                  🌦️ NAVERIS: A weather-based early warning system for climate
                  hazards
                </div>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-base font-medium text-muted-foreground md:text-lg">
                <strong>Oct 2024 — NASA Space Apps Challenge</strong>
              </p>
              <div className="ml-4 mt-1">
                <div className="flex items-center gap-2 text-base text-muted-foreground/80 md:text-lg">
                  🌌 Orbit: A real-time 3D solar system sim using NASA APIs
                </div>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-base font-medium text-muted-foreground md:text-lg">
                <strong>Mar 2025 — GDG Cairo AI Finance Hackathon</strong> (Top
                7 Finalist out of 88 teams)
              </p>
              <div className="ml-4 mt-1">
                <div className="flex items-center gap-2 text-base text-muted-foreground/80 md:text-lg">
                  ♻️ RepAi: AI-powered recycling rewards platform with dynamic
                  cashback
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Sep 2024",
      content: (
        <div>
          <h3 className="mb-2 text-2xl font-semibold">
            Fintech Intern @ CIB Egypt
          </h3>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Completed a 2-week internship at CIB, one of Egypt&apos;s top-tier
            banks.
          </p>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Gained solid experience in banking operations, financial systems,
            and risk strategy, while refining professional communication and
            critical thinking in a corporate setting.
          </p>
        </div>
      ),
    },
    {
      title: "Nov 2024 – May 2025",
      content: (
        <div>
          <h3 className="mb-2 text-2xl font-semibold">
            Full Stack Intern @ DEPI
          </h3>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Spent 6 months with the Digital Egypt Pioneers Initiative as a Full
            Stack Web Developer, building and refining React web applications
            with the MERN stack.
          </p>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Strengthened my core skills in HTML, CSS, JavaScript, and
            Git/GitHub, while picking up TypeScript, TailwindCSS, and Bootstrap.
            Gained practical exposure to backend development with Node.js and
            Express, plus a solid intro to containerization using Docker.
          </p>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Beyond coding, learned UI/UX design principles, code quality
            practices, documentation workflows, and unit testing; all the stuff
            that turns code into a maintainable product.
          </p>
          <p className="mb-4 text-base font-normal text-muted-foreground md:text-lg">
            Wrapped up with a capstone project: <strong>Convo</strong>, a
            full-stack real-time chat application built from scratch using React
            and Node.js. It pulled together everything I’d learned into a
            production-grade, working product, a hands-on challenge that shaped
            the way I now approach development.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
