import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Seif Zakaria handles email correspondence and aggregate analytics data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back home
        </Link>

        <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Privacy
        </h1>
        <div className="mt-3 h-0.5 w-16 bg-primary" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Last updated: 21 November 2026
        </p>

        <div className="mt-12 space-y-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            This is a personal site. There are no tracking cookies, no
            newsletter signups, and no on-site contact forms. I don&apos;t sell
            or share data with advertisers.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Email correspondence
            </h2>
            <p>
              If you write to{" "}
              <a
                href={`mailto:${site.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary"
              >
                {site.email}
              </a>
              , your message is received directly in my inbox via Gmail and used
              only to reply to your inquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Analytics
            </h2>
            <p>
              The site uses Vercel Analytics, which measures aggregate page
              views without cookies or cross-site tracking. No personally
              identifying information is collected.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Third parties
            </h2>
            <p>
              This site is hosted on Vercel. Links to external sites, demos, and
              repositories are governed by their own privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Your rights
            </h2>
            <p>
              Email me and I&apos;ll delete any past correspondence or records I
              hold about you, usually within a few days.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
