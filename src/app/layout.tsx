import type { Metadata } from "next";
import { Space_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Dock from "@/components/dock";
import ScrollHandler from "@/components/scroll-handler";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Seif",
  description:
    "Seif Zakaria - Full-stack Software Engineer from Cairo, Egypt. Founder of Masons building AI-driven mental health platform Rafiqi. Specializing in React, Next.js, TypeScript, and Python with expertise in fintech, AI integration, and real-time applications. NASA Space Apps finalist and hackathon winner.",
  keywords: [
    "Seif Zakaria",
    "Full-stack Software Engineer",
    "Cairo Egypt developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Python developer",
    "AI integration",
    "Mental health platform",
    "Rafiqi",
    "Masons founder",
    "MERN stack",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Socket.io",
    "Real-time applications",
    "Fintech developer",
    "GenAI",
    "NASA Space Apps Challenge",
    "Hackathon winner",
    "GDG Cairo",
    "Three.js",
    "3D web development",
    "TailwindCSS",
    "CI/CD pipelines",
    "DevOps",
    "Open source",
    "Web development",
    "Software engineering",
    "Computer science",
    "Startup founder",
    "Technical mentoring",
    "Arabic developer",
    "Middle East tech",
  ],
  icons: {
    icon: "/logo.svg",
  },
};

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: "400",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${spaceMono.variable} ${ibmPlexSansArabic.variable}`}
      >
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Dock />
          <Suspense fallback={null}>
            <ScrollHandler />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
