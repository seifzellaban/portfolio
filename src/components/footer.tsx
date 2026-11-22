import Link from "next/link";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconDownload,
  IconMail,
  IconRss,
} from "@tabler/icons-react";
import { CairoTime } from "@/components/cairo-time";
import { ResumeTrigger } from "@/components/resume-modal";
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
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-32 sm:px-6 sm:pt-16 md:pb-36 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Seif Zakaria
            </p>
            <p className="mt-3.5 max-w-sm font-serif text-xl leading-snug text-foreground sm:mt-4 sm:text-2xl sm:leading-tight">
              Building products that ship, solve real problems, and make users
              happy.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:mt-6">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              {site.availability}
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Index
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:mt-5 md:grid-cols-1 md:space-y-2.5 md:gap-y-0">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[36px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground sm:min-h-0 sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <p className="mt-3.5 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mt-4">
              Have a project in mind or want to talk through an idea? Write
              directly.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project Inquiry")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-border/70 bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 sm:w-auto sm:justify-start"
            >
              <IconMail size={15} className="text-primary" />
              <span>{site.email}</span>
              <IconArrowUpRight
                size={14}
                className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </a>
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
            <ResumeTrigger className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground">
              <IconDownload size={13} /> Resume
            </ResumeTrigger>
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
