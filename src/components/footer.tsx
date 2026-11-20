import Link from "next/link";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconDownload,
  IconRss,
} from "@tabler/icons-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { CairoTime } from "@/components/cairo-time";
import { site } from "@/lib/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "Logs", href: "/logs" },
  { label: "Contact", href: "/#contact" },
  { label: "Links", href: "/links" },
];

const socialIcons = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  X: IconBrandX,
  Instagram: IconBrandInstagram,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border/50" data-footer>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Seif Zakaria
            </p>
            <p className="mt-4 max-w-sm font-serif text-2xl leading-tight text-foreground">
              Building products that ship, solve real problems, and make users
              happy.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              {site.availability}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block w-fit text-base text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              {site.email}
            </a>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Index
            </p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Stay in the loop
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Occasional notes on engineering, products, and what I&apos;m
              building. No spam.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {site.responseTime}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
            <span>© {new Date().getFullYear()} Seif Zakaria</span>
            <span aria-hidden>/</span>
            <span>
              {site.location} <CairoTime className="text-foreground/70" />
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {site.socials.map((social) => {
              const Icon =
                socialIcons[social.label as keyof typeof socialIcons] ??
                IconArrowUpRight;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon size={17} stroke={1.5} />
                </a>
              );
            })}
            <span aria-hidden className="h-4 w-px bg-border" />
            <a
              href={site.resume.path}
              download={site.resume.name}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconDownload size={13} /> Resume
            </a>
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconRss size={13} /> RSS
            </a>
            <Link
              href="/privacy"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
