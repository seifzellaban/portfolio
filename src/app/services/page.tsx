import type { Metadata } from "next";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconClock,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { services } from "@/lib/services-data";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, UI/UX design, SEO, and AI automation services for founders and teams. Clear scope, fixed timelines, and launch-ready delivery.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
          ]),
          ...services.map((service) => serviceJsonLd(service)),
        ]}
      />

      <section className="border-b border-border/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <IconArrowLeft size={14} /> Back home
          </Link>

          <p className="mt-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-primary" />
            What I do
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Design, build, and launch support for web products. Each engagement
            is scoped around outcomes, with clear pricing and a defined handoff.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="divide-y divide-border/50 border-y border-border/50">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="group relative grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-start md:gap-10 md:py-14"
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="md:col-span-6">
                  <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                    <Link
                      href={`/services/${service.id}`}
                      className="decoration-primary/40 decoration-1 underline-offset-[6px] after:absolute after:inset-0 after:content-[''] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background group-hover:underline"
                    >
                      {service.title}
                      <IconArrowUpRight
                        aria-hidden
                        className="ml-2 inline-block h-4 w-4 -translate-y-0.5 text-primary transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-1"
                      />
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 md:col-span-5 md:justify-end">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <IconClock size={14} /> {service.timeRange}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                    <IconCurrencyDollar size={14} /> {service.priceRange}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/50 bg-card/40 p-8 sm:flex-row sm:items-center md:p-10">
            <div>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                Not sure which one fits?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tell me what you&apos;re building and I&apos;ll suggest a scope.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 px-7 py-3 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              Start a project <IconArrowUpRight size={14} />
            </Link>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
            {site.responseTime}
          </p>
        </div>
      </section>
    </main>
  );
}
