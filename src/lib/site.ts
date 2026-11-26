export const site = {
  name: "Seif Zakaria",
  handle: "seifzellaban",
  alternateNames: ["seifzellaban", "@seifzellaban"],
  title: "Seif Zakaria — Full-Stack Software Engineer & Founder",
  description:
    "Seif Zakaria is a full-stack software engineer in Cairo, Egypt and founder of Masons. Portfolio, case studies, and engineering logs.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://seifzellaban.com"
  ).replace(/\/$/, ""),
  portrait: "/seifmirror.webp",
  email: "seifzellaban@gmail.com",
  location: "Cairo, Egypt",
  timeZone: "Africa/Cairo",
  availability: "Available for freelance work",
  organization: {
    name: "Masons",
    alternateName: "Masons Studio",
    url: "https://wearemasons.com",
    description:
      "Cairo software studio building production web applications, internal business systems, and AI products.",
  },
  /** Optional scheduling link (Cal.com, Calendly, …). Buttons hide when empty. */
  bookingUrl: "",
  /** Optional WhatsApp number in international format, digits only. */
  whatsapp: "",
  responseTime: "Replies within 24 hours",
  resume: {
    path: "/files/Seif Zakaria - Fullstack Software Engineer.pdf",
    name: "Seif Zakaria - Fullstack Software Engineer.pdf",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/seifzellaban" },
    { label: "LinkedIn", href: "https://linkedin.com/in/seifzellaban" },
    { label: "X", href: "https://x.com/seifzellaban" },
    { label: "Instagram", href: "https://instagram.com/seifzellaban" },
  ],
  keywords: [
    "Seif Zakaria",
    "seifzellaban",
    "Seif Zakaria Cairo",
    "Seif Zakaria software engineer",
    "Seif Zakaria Ain Shams",
    "Full-stack Software Engineer",
    "Masons founder",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "Go developer",
    "Python developer",
    "Convex",
    "AI integration",
    "Organum",
    "Tesseract",
    "NASA Space Apps Challenge",
    "GDG Cairo",
    "freelance developer Egypt",
  ],
} as const;
