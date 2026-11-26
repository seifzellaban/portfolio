"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBriefcase,
  IconCheck,
  IconCopy,
  IconDownload,
  IconMail,
  IconMusic,
  IconWorldWww,
} from "@tabler/icons-react";
import { LogoSvg } from "@/components/logo";
import { ResumeTrigger } from "@/components/resume-modal";
import { site } from "@/lib/site";

const INTEREST_TAGS = [
  "Linux full-time",
  "Next.js & Convex",
  "Pipe organs",
  "Short fiction",
  "Valorant",
] as const;

const FEATURED_LINKS = [
  {
    title: "Masons Studio",
    subtitle: "My Cairo software studio — client builds, dashboards & AI systems",
    meta: "wearemasons.com",
    href: "https://wearemasons.com",
    external: true,
    featured: true,
    icon: (
      <LogoSvg className="h-5 w-5 scale-125 fill-current text-foreground" />
    ),
  },
  {
    title: "Portfolio & Selected Work",
    subtitle: "Case studies, experience, and engineering logs",
    meta: "seifzellaban.com",
    href: "/",
    external: false,
    featured: false,
    icon: <IconWorldWww size={20} className="text-primary" />,
  },
  {
    title: "Services & Scope",
    subtitle: "Web apps, UI/UX sprints, API & AI automation, technical SEO",
    meta: "/services",
    href: "/services",
    external: false,
    featured: false,
    icon: <IconBriefcase size={20} className="text-primary" />,
  },
] as const;

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "@seifzellaban",
    note: "Code & open source",
    href: "https://github.com/seifzellaban",
    icon: <IconBrandGithub size={19} />,
  },
  {
    name: "X",
    handle: "@seifzellaban",
    note: "Builds & thoughts",
    href: "https://x.com/seifzellaban",
    icon: <IconBrandX size={19} />,
  },
  {
    name: "LinkedIn",
    handle: "in/seifzellaban",
    note: "Work & career",
    href: "https://linkedin.com/in/seifzellaban",
    icon: <IconBrandLinkedin size={19} />,
  },
  {
    name: "Instagram",
    handle: "@seifzellaban",
    note: "Cairo & life",
    href: "https://instagram.com/seifzellaban",
    icon: <IconBrandInstagram size={19} />,
  },
] as const;

export function LinksHub() {
  const [copied, setCopied] = useState(false);
  const [cairoTime, setCairoTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: site.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setCairoTime(formatted);
      } catch {
        setCairoTime("");
      }
    };
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(`mailto:${site.email}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-background pb-20 pt-8 text-foreground sm:pb-28 sm:pt-12"
    >
      {/* Subtle architectural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.16]"
      />

      <div className="mx-auto max-w-xl px-5 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group inline-flex min-h-[36px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <IconArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Portfolio
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Cairo{cairoTime ? ` · ${cairoTime}` : ""}</span>
          </div>
        </div>

        {/* Profile card */}
        <section className="mt-6 rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm sm:mt-8 sm:p-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-muted sm:h-28 sm:w-28">
              <Image
                src="/seifalt.jpg"
                alt="Portrait of Seif Zakaria"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-4 min-w-0 sm:mt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Software Engineer · Founder, Masons
              </p>
              <h1 className="mt-1.5 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                Seif Zakaria
              </h1>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Building way too many side projects, running Masons, living on
                Linux full-time, and still telling myself I&apos;m good at
                Valorant.
              </p>
            </div>
          </div>

          {/* Personality tags */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 border-t border-border/50 pt-4 sm:justify-start">
            {INTEREST_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Direct contact + resume quick actions */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={`mailto:${site.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <IconMail size={15} />
              Email me
              <IconArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-border/80 bg-background/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              {copied ? (
                <>
                  <IconCheck size={14} className="text-primary" />
                  Copied email
                </>
              ) : (
                <>
                  <IconCopy size={14} className="text-muted-foreground" />
                  Copy email
                </>
              )}
            </button>
          </div>
        </section>

        {/* Primary destinations */}
        <section aria-label="Featured links" className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Start here
          </p>

          <div className="mt-3 flex flex-col gap-3">
            {FEATURED_LINKS.map((item) => {
              const cardClasses = `group flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
                item.featured
                  ? "border-primary/40 bg-card/85 hover:border-primary"
                  : "border-border/60 bg-card/45 hover:border-primary/40 hover:bg-card/75"
              }`;

              const inner = (
                <>
                  <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/85">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          {item.meta}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <IconArrowUpRight
                    size={18}
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </>
              );

              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  {inner}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className={cardClasses}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Social profiles 2x2 grid */}
        <section aria-label="Social profiles" className="mt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere online
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card/45 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 sm:p-5"
              >
                <div className="flex items-center justify-between gap-2 text-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-background/80 transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    {social.icon}
                  </span>
                  <IconArrowUpRight
                    size={15}
                    className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>

                <div className="mt-4">
                  <p className="font-serif text-lg font-semibold leading-tight text-foreground group-hover:text-primary">
                    {social.name}
                  </p>
                  <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {social.handle}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {social.note}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Pinned favorite read + Resume row */}
        <section aria-label="Featured log and resume" className="mt-7 space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Favorite rabbit hole
          </p>

          <Link
            href="/logs/organum"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/45 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-card/75 sm:p-5"
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/85 text-primary">
                <IconMusic size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  Pinned log · Audio DSP
                </p>
                <p className="mt-0.5 font-serif text-base font-semibold leading-snug text-foreground group-hover:text-primary sm:text-lg">
                  I Built a Pipe Organ Synthesizer From Scratch Because Egypt
                  Has None
                </p>
              </div>
            </div>
            <IconArrowUpRight
              size={17}
              className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>

          <ResumeTrigger className="group flex min-h-[50px] w-full items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/60 px-5 py-3.5 text-left font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
            <span className="inline-flex items-center gap-2.5">
              <IconDownload size={15} className="text-primary" />
              Download Résumé (PDF)
            </span>
            <span className="text-[10px] text-muted-foreground/80">
              Choose version
            </span>
          </ResumeTrigger>
        </section>
      </div>
    </main>
  );
}
