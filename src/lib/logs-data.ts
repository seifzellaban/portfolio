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
}

export const posts: Post[] = [
  {
    id: "post-1",
    title: "Rafiqi: Our Journey Building Egypt's Mental Health Companion",
    summary:
      "How we built Rafiqi, an AI-powered mental health companion designed for Egyptians. From tackling cultural stigma to building tech that speaks Egyptian Arabic, here's the story of creating a platform rooted in accessibility, cultural respect, and real impact.",
    label: "Case Study",
    author: "Seif Zakaria",
    published: "20 May 2025",
    url: "https://wearemasons.com/en/case-studies/rafiqi",
    image: "/logthumb.webp",
    tags: ["Mental Health", "AI", "Culture", "Case Study"],
    pinned: true,
  },
  {
    id: "post-3",
    title: "How I Misread Productivity and Learned the Hard Way",
    summary:
      "A reflective look at how I once thought doing more meant leading better. I share the mistakes that got me fired, how I misunderstood boundaries and alignment, and the lessons I now carry forward about leadership, teamwork, and growth.",
    label: "Blog",
    author: "Seif Zakaria",
    published: "8 September 2025",
    url: "/logs/misread-productivity",
    image: "/logthumb.webp",
    tags: ["Storytelling", "Work Culture", "Lessons Learned", "Growth"],
    pinned: false,
  },
  {
    id: "post-2",
    title:
      "So, You Wanna Be a Head? A Practical Guide to Building Your Leadership Plan",
    summary:
      "Becoming a head at OSC isn’t just about the title—it’s about leading with vision, structure, and resilience. This guide breaks down how to craft a Head Plan that actually works: from setting SMART goals and timelines to managing risks, budgets, and team dynamics. If you’re stepping up to lead, this is your roadmap.",
    label: "Leadership",
    author: "Seif Zakaria",
    published: "1 Sep 2025",
    url: "/logs/wbh",
    image: "/logthumb.webp",
    tags: ["Leadership", "OSC", "Planning", "Student Life"],
    pinned: false,
  },
];
