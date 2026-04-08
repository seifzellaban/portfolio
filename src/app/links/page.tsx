"use client";

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

const links = [
  {
    title: "Website",
    url: "https://seifzellaban.wiki",
    icon: <IconWorldWww className="w-5 h-5" />,
  },
  {
    title: "My Startup",
    url: "https://wearemasons.com",
    icon: (
      <LogoSvg className="h-5 w-5 text-muted-foreground dark:text-foreground/80 scale-150 fill-current" />
    ),
  },
  {
    title: "X",
    url: "https://x.com/seifzellaban",
    icon: <IconBrandX className="w-5 h-5" />,
  },
  {
    title: "Instagram",
    url: "https://instagram.com/seifzellaban",
    icon: <IconBrandInstagram className="w-5 h-5" />,
  },
  {
    title: "GitHub",
    url: "https://github.com/seifzellaban",
    icon: <IconBrandGithub className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/seifzellaban",
    icon: <IconBrandLinkedin className="w-5 h-5" />,
  },
  {
    title: "Email",
    url: "mailto:seifzellaban@gmail.com",
    icon: <IconMail className="w-5 h-5" />,
  },
];

export default function Linktree() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 mt-4 mb-14">
      {/* Profile Section */}
      <Card className="w-full max-w-sm border-border/50 text-center">
        <CardContent className="flex flex-col items-center gap-4">
          <Image
            src="/seifalt.jpg"
            alt="avatar"
            width={150}
            height={150}
            className="w-36 h-36 rounded-full border border-primary/30"
          />
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Seif Zakaria Ellaban
            </h1>
            <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mt-1">
              Software Engineer
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground max-w-xs font-sans">
              building way too many side projects ✦ full-time linux enjoyer 🐧 ✦
              good at Valorant (or so I tell myself) ✦ chronically online
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <div className="w-full max-w-sm my-6 flex flex-col gap-3">
        {links.map((link, i) => (
          <Button
            key={i}
            variant="outline"
            className="w-full justify-start gap-3 border-border/50 text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            asChild
          >
            <Link href={link.url} target="_blank">
              {link.icon}
              <span className="font-medium">{link.title}</span>
            </Link>
          </Button>
        ))}
        <DownloadResumeButton variant="outline" size="sm" />
      </div>
    </div>
  );
}
