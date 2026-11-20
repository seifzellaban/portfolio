import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Seif Zakaria handles contact form submissions, newsletter signups, and analytics data.",
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

        <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy
        </h1>
        <div className="mt-3 h-0.5 w-16 bg-primary" />
        <p className="mt-6 text-sm font-mono uppercase tracking-[0.16em] text-muted-foreground">
          Last updated: 20 November 2026
        </p>

        <div className="mt-12 space-y-8 text-lg leading-relaxed text-muted-foreground">
          <p>
            This is a personal site. I collect the minimum needed to reply to
            you and to run the newsletter, and I don&apos;t sell or share data
            with advertisers.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Contact form
            </h2>
            <p>
              When you submit the contact form, I receive your name, email
              address, project type, and message. Submissions are stored in a
              private Google Sheet and sent to my inbox via Gmail. I use them
              only to reply to your inquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Newsletter
            </h2>
            <p>
              If you subscribe, I store your email address in the same private
              Google Sheet. You can remove it at any time on the{" "}
              <Link
                href="/unsubscribe"
                className="text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary"
              >
                unsubscribe page
              </Link>{" "}
              or by emailing{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary"
              >
                {site.email}
              </a>
              .
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
              Data is processed by Google (Sheets, Gmail) and hosted on Vercel.
              Links to external sites, demos, and repositories are governed by
              their own privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Your rights
            </h2>
            <p>
              Email me and I&apos;ll delete any data I hold about you, usually
              within a few days. That includes contact form entries and
              newsletter records.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
