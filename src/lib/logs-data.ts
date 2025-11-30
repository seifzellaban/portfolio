export interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
  pinned?: boolean;
  hidden?: boolean;
}

export const posts: Post[] = [
  {
    id: "post-6",
    title:
      "What I Learned From Scaling (and Leaving) the Open Source Community",
    summary:
      'As the Head of HR for the Open Source Community (OSC), I treated the department not as a social club, but as a system architecture project. The results were quantifiable, record-breaking, and undeniable. But as I learned the hard way, in some organizations, "optimization" is interpreted as "disruption." Here is the story of how I built a high-velocity machine in a low-velocity environment, and why we ultimately parted ways.',
    label: "Life Story",
    author: "Seif Zakaria",
    published: "2025-9-28",
    url: "/logs/osc",
    image: "/logthumb.webp",
    tags: ["Storytelling", "Work Culture", "Growth"],
  },
  {
    id: "post-5",
    title: "Rebuilding MSP for a High-Velocity Future",
    summary:
      "The story of how I led the complete structural and cultural rebuild of the MSP chapter, installing professional engineering standards (Unix/GitHub mandate) to foster technical excellence, culminating in the launch of the high-velocity Audio AI committee, Resonance.",
    label: "Leadership & Strategy",
    author: "Seif Zakaria",
    published: "2025-11-20",
    url: "/logs/msp",
    image: "/logthumb.webp",
    tags: ["Leadership", "Audio AI", "Strategy"],
  },
  {
    id: "post-4",
    title: 'Building world\'s first ITE "Integrated Thinking Environment"',
    summary:
      "A proposal for a local-first Markdown editor that uses real-time Sentiment Analysis to dynamically adjust its AI assistant's persona, featuring a multi-agent debate system ('The Council') and personalized memory recall.",
    label: "Graduation Project Concept",
    author: "Seif Zakaria",
    published: "2025-11-28",
    url: "/logs/gp-idea",
    image: "/logthumb.webp",
    tags: ["AI", "Project Pitch", "NLP"],
    pinned: true,
  },
  {
    id: "post-3",
    title: "How I Misread Productivity and Learned the Hard Way",
    summary:
      "A reflective look at how I once thought doing more meant leading better. I share the mistakes that got me fired, how I misunderstood boundaries and alignment, and the lessons I now carry forward about leadership, teamwork, and growth.",
    label: "Blog",
    author: "Seif Zakaria",
    published: "2025-9-8",
    url: "/logs/misread-productivity",
    image: "/logthumb.webp",
    tags: ["Storytelling", "Work Culture", "Growth"],
    pinned: false,
    hidden: true,
  },
  {
    id: "post-2",
    title:
      "So, You Wanna Be a Head? A Practical Guide to Building Your Leadership Plan",
    summary:
      "Becoming a head at OSC isn’t just about the title—it’s about leading with vision, structure, and resilience. This guide breaks down how to craft a Head Plan that actually works: from setting SMART goals and timelines to managing risks, budgets, and team dynamics. If you’re stepping up to lead, this is your roadmap.",
    label: "Leadership",
    author: "Seif Zakaria",
    published: "2025-9-1",
    url: "/logs/wbh",
    image: "/logthumb.webp",
    tags: ["Leadership", "OSC", "Planning"],
    pinned: false,
  },
  {
    id: "post-1",
    title: "Rafiqi: Our Journey Building Egypt's Mental Health Companion",
    summary:
      "How we built Rafiqi, an AI-powered mental health companion designed for Egyptians. From tackling cultural stigma to building tech that speaks Egyptian Arabic, here's the story of creating a platform rooted in accessibility, cultural respect, and real impact.",
    label: "Case Study",
    author: "Seif Zakaria",
    published: "2025-5-20",
    url: "https://wearemasons.com/en/case-studies/rafiqi",
    image: "/logthumb.webp",
    tags: ["Mental Health", "AI", "Case Study"],
    pinned: true,
  },
];
