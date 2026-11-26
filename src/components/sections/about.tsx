"use client";

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useReveal } from "@/hooks/use-reveal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const PROFILE_ROWS = [
  { label: "Name", value: "Seif Zakaria · @seifzellaban" },
  { label: "Based in", value: "Cairo, Egypt" },
  {
    label: "Studio",
    value: "Masons · Founder",
    href: "https://wearemasons.com",
  },
  { label: "Also at", value: "Concentrix · Technical Support" },
  { label: "Daily driver", value: "Fedora Linux (full-time, no regrets)" },
  { label: "Studying", value: "CS & Statistics · Ain Shams University" },
  { label: "Off the clock", value: "Short fiction, pipe organs, Valorant" },
] as const;

const SIDE_QUESTS = [
  {
    index: "01",
    title: "Linux & tinkering",
    detail:
      "Full-time Linux desktop, local-first apps, and a habit of patching upstream tooling whenever something breaks on my machine.",
  },
  {
    index: "02",
    title: "Sound & fiction",
    detail:
      "Modeled a German pipe organ from pure sine waves in Python and draft short stories between coding sessions to unwind.",
  },
  {
    index: "03",
    title: "Chronically online",
    detail:
      "Queueing Valorant with questionable confidence, hoarding sharp UI references, and still replying to emails within 24 hours.",
  },
] as const;

const STATS = [
  { number: "10M+", label: "EGP/mo client volume" },
  { number: "20+", label: "Happy Clients" },
  { number: "2020", label: "Masons founded" },
  { number: "24h", label: "Direct reply time" },
] as const;

export function About() {
  const headingRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const { handleNav } = useSmoothScroll();

  return (
    <section
      id="about"
      className="border-t border-border/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div ref={headingRef} className="reveal">
          <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>About</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>The human behind the repo</span>
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:text-6xl">
                Hi, I&apos;m{" "}
                <span className="font-light italic text-primary">
                  Seif Zakaria.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
              Software engineer, Masons founder, full-time Linux enjoyer, and
              the guy who built a pipe organ in Python because Egypt barely has
              any.
            </p>
          </header>
        </div>

        {/* 12-col editorial body (story first on mobile, field-notes sidebar left on desktop) */}
        <div
          ref={bodyRef}
          className="reveal reveal-delay-1 mt-10 grid grid-cols-1 items-start gap-10 sm:mt-14 md:mt-20 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left on desktop, second on mobile: Field notes card */}
          <aside className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border/60 bg-card/55 p-5 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Quick dossier
              </p>

              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-border/50">
                {PROFILE_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="border-t border-border/40 pt-3 first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 lg:border-t lg:py-3.5 lg:first:pt-0 lg:last:pb-0"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">
                      {"href" in row ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 transition-colors hover:text-primary"
                        >
                          {row.value}
                          <IconArrowUpRight
                            size={13}
                            className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          />
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          {/* Right on desktop, first on mobile: Personal story & side quests */}
          <div className="order-1 lg:order-2 lg:col-span-8">
                      <p className="font-serif text-xl font-medium leading-[1.35] tracking-tight text-foreground sm:text-2xl lg:text-3xl lg:leading-[1.28]">
                        I ship commercial software, fall down technical rabbit holes, and will build an entire app the moment an
                        existing tool annoys me enough.
                      </p>

                      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:mt-8 sm:space-y-5 sm:text-lg">
                        <p>
                          I co-founded{" "}
                          <a
                            href="https://wearemasons.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            Masons
                          </a>
                          , a Cairo software studio shipping production web apps,
                          internal tools, and our own products like Rafiqi and Agency
                          Kit. I lead engineering, mostly in Go, TypeScript, Next.js and
                          Postgres. That&apos;s 20+ shipped builds so far, including
                          real-time systems like Safety Source&apos;s Convex dashboard,
                          which tracks 7M+ EGP in monthly sales. I&apos;m also finishing
                          a CS &amp; Statistics degree at Ain Shams, and I work night
                          shifts on a live US consumer electronics queue at Concentrix,
                          which keeps my troubleshooting instincts sharp and the studio
                          funded.
                        </p>

                        <p>
                          Then there&apos;s the stuff nobody asked for. Egypt has maybe
                          three pipe organs, so I went deep into acoustic physics and
                          built{" "}
                          <Link
                            href="/logs/organum"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            Organum
                          </Link>{" "}
                          in Python, which synthesizes a Hamburg cathedral organ live from
                          pure sine waves. I write supernatural fiction to unwind. When AI
                          kept giving my 3,000-word chapters polite participation
                          trophies, I paused my own local-first AI notebook,{" "}
                          <Link
                            href="/logs/tesseract"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            Tesseract
                          </Link>
                          , for a week to build{" "}
                          <Link
                            href="/logs/the-manuscript"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            The Manuscript
                          </Link>{" "}
                          so something would finally critique my pacing honestly.
                        </p>

                        <p>
                          I run Linux full-time (and shipped AppImage packaging upstream
                          to{" "}
                          <Link
                            href="/logs/neverwrite"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            NeverWrite
                          </Link>
                          ). On campus I led HR at{" "}
                          <Link
                            href="/logs/osc"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            OSC
                          </Link>{" "}
                          and now lead the Resonance and AI committees while rebuilding{" "}
                          <Link
                            href="/logs/msp"
                            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                          >
                            MSP ASU
                          </Link>
                          . On weekends I still convince myself I&apos;m good at
                          Valorant.
                        </p>
                      </div>

            {/* Side quests & personality strip */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
              {SIDE_QUESTS.map((item) => (
                <div
                  key={item.index}
                  className="rounded-xl border border-border/60 bg-card/45 p-4 sm:p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {item.index}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Proof metrics — balanced 2x2 on mobile, 4-up on desktop */}
            <dl className="mt-9 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-border/50 py-6 sm:mt-12 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border/50 sm:py-8">
              {STATS.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={
                    idx === 0
                      ? "sm:pr-5"
                      : idx === STATS.length - 1
                        ? "sm:pl-5"
                        : "sm:px-5"
                  }
                >
                  <dd className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {stat.number}
                  </dd>
                  <dt className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-muted-foreground sm:mt-2">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            {/* Quick paths */}
            <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.16em] sm:mt-8">
              <button
                type="button"
                onClick={() => handleNav("contact")}
                className="group inline-flex min-h-[40px] items-center gap-1.5 text-foreground transition-colors hover:text-primary"
              >
                Say hello
                <IconArrowUpRight
                  size={14}
                  className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <Link
                href="/logs"
                className="group inline-flex min-h-[40px] items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                Read my logs
                <IconArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/links"
                className="group inline-flex min-h-[40px] items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                All links
                <IconArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
