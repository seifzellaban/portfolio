import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorldWww,
  IconMail,
  IconBrandX,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { LogoSvg } from "@/components/logo";
import { DownloadResumeButton } from "@/components/download-resume";
import { JsonLd } from "@/components/json-ld";
import { personJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Links",
  description:
    "All of Seif Zakaria's links in one place: website, startup, socials, GitHub, email, and resume.",
  alternates: { canonical: "/links" },
};

const links = [
  {
    title: "Website",
    url: "https://seifzellaban.com",
    icon: <IconWorldWww className="h-5 w-5" />,
  },
  {
    title: "My Startup",
    url: "https://wearemasons.com",
    icon: (
      <LogoSvg className="h-5 w-5 scale-150 fill-current text-muted-foreground dark:text-foreground/80" />
    ),
  },
  {
    title: "X",
    url: "https://x.com/seifzellaban",
    icon: <IconBrandX className="h-5 w-5" />,
  },
  {
    title: "Instagram",
    url: "https://instagram.com/seifzellaban",
    icon: <IconBrandInstagram className="h-5 w-5" />,
  },
  {
    title: "GitHub",
    url: "https://github.com/seifzellaban",
    icon: <IconBrandGithub className="h-5 w-5" />,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/seifzellaban",
    icon: <IconBrandLinkedin className="h-5 w-5" />,
  },
  {
    title: "Email",
    url: "mailto:seifzellaban@gmail.com",
    icon: <IconMail className="h-5 w-5" />,
  },
];

export default function Linktree() {
  return (
    <main
      id="main-content"
      className="mb-14 mt-4 flex min-h-screen flex-col items-center justify-center bg-background px-4"
    >
      <JsonLd data={personJsonLd()} />

      <Card className="w-full max-w-sm border-border/50 text-center">
        <CardContent className="flex flex-col items-center gap-4">
          <Image
            src="/seifalt.jpg"
            alt="Portrait of Seif Zakaria"
            width={150}
            height={150}
            className="h-36 w-36 rounded-full border border-primary/30"
          />
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Seif Zakaria Ellaban
            </h1>
            <p className="mt-1 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              Software Engineer
            </p>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-foreground">
              building way too many side projects ✦ full-time linux enjoyer 🐧 ✦
              good at Valorant (or so I tell myself) ✦ chronically online
            </p>
          </div>
        </CardContent>
      </Card>

      <nav aria-label="Links" className="my-6 flex w-full max-w-sm flex-col gap-3">
        {links.map((link) => {
          const external = link.url.startsWith("http");

          return (
            <Button
              key={link.title}
              variant="outline"
              className="w-full justify-start gap-3 border-border/50 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
              asChild
            >
              <Link
                href={link.url}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {link.icon}
                <span className="font-medium">{link.title}</span>
              </Link>
            </Button>
          );
        })}
        <DownloadResumeButton variant="outline" size="sm" />
      </nav>
    </main>
  );
}
