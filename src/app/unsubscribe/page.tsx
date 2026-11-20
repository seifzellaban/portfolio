import type { Metadata } from "next";
import Link from "next/link";
import { UnsubscribeForm } from "@/components/unsubscribe-form";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Remove your email address from the Seif Zakaria newsletter.",
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-6 py-24 md:py-32">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back home
        </Link>

        <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight">
          Unsubscribe
        </h1>
        <div className="mt-3 h-0.5 w-16 bg-primary" />
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Enter the email you subscribed with and I&apos;ll remove it from the
          list. If it isn&apos;t found, nothing happens.
        </p>

        <div className="mt-10">
          <UnsubscribeForm />
        </div>
      </div>
    </main>
  );
}
