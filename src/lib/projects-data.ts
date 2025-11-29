export interface Project {
  name: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
  impact?: string;
  techStack?: string[];
}

export const projects: Project[] = [
  {
    name: "Umbra",
    description:
      "Built for the 2025 NASA Space Apps Challenge, Umbra empowers researchers, mission planners, and citizen scientists to explore, filter, and visualize NASA’s vast library of space biology experiments. Designed to fuel the next era of human space exploration.",
    imageUrl: "/projects/umbra.png",
    demoUrl: "https://umbra.wearemasons.com",
    sourceUrl: "https://github.com/wearemasons/umbra",
    impact: "Enabled researchers to visualize 600+ space biology experiments.",
    techStack: [
      "Next.js",
      "Shadcn/UI",
      "Framer Motion",
      "TypeScript",
      "Tailwind CSS",
      "NASA's space biology database",
    ],
  },
  {
    name: "Masons Landing Page",
    description:
      "The landing page for my startup focused on building meaningful, impact-driven software for real-world problems.",
    imageUrl: "/projects/masons.png",
    demoUrl: "https://wearemasons.com",
    sourceUrl: "https://github.com/wearemasons/website",
    impact: "Increased inquiry rate by 40% through improved UX.",
    techStack: ["Next.js", "Shadcn/UI", "Framer Motion", "Tailwind CSS"],
  },
  {
    name: "Orbit",
    description:
      "Orbit is an interactive 3D web application designed to simulate the solar system and track Near-Earth Objects (NEOs). This was our official submission for the NASA Space Apps Cairo 2024 hackathon.",
    imageUrl: "/projects/orbit.png",
    sourceUrl: "https://github.com/wearemasons/orbit",
    impact: "Visualized the entire solar system with some NEOs.",
    techStack: ["Next.js", "Three.js", "Blender"],
  },
  {
    name: "repAI",
    description:
      "An AI Powered Recycling App with Rewards and Cashback for building a Sustainable Future, Built for Google's AI-Finance Hackathon 2025 by GDG Cairo",
    imageUrl: "/projects/repai.png",
    sourceUrl: "https://github.com/wearemasons/repAI",
    impact: "Won 5th place at Google's AI-Finance Hackathon 2025.",
    techStack: ["React", "Google AI", "Tailwind CSS"],
  },
];
