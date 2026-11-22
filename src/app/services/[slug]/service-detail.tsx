"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconMail,
} from "@tabler/icons-react";
import type { Service } from "@/lib/services-data";
import { site } from "@/lib/site";

interface AdjacentService {
  id: string;
  title: string;
}

interface ServiceDetailProps {
  service: Service;
  index: number;
  total: number;
  previous?: AdjacentService;
  next?: AdjacentService;
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function ServiceDetail({
  service,
  index,
  total,
  previous,
  next,
}: ServiceDetailProps) {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    service.emailSubject
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(mailtoHref, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background text-foreground"
    >
      {/* 01 · Editorial Hero + Scope Dossier */}
      <section className="relative overflow-hidden border-b border-border/50 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.16]"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Top navigation bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-5">
            <Link
              href="/services"
              className="group inline-flex min-h-[36px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <IconArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All services
            </Link>

            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Service / {pad(index + 1)} of {pad(total)}
            </span>
          </div>

          {/* 12-col asymmetric hero */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Left thesis */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-primary">{service.title}</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{service.engagementStyle}</span>
              </div>

              <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {service.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                {service.heroLead}
              </p>

              {/* Best for callout */}
              <div className="mt-8 max-w-2xl border-l-2 border-primary/70 py-1 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Best fit
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {service.idealFor}
                </p>
              </div>
            </div>

            {/* Right engagement scope card */}
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-border/75 bg-card/70 p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/80">
                      {service.icon}
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {service.theme.eyebrow}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {service.theme.identity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline + Starting range */}
                <dl className="grid grid-cols-1 gap-5 border-b border-border/50 py-6 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-border/50">
                  <div className="sm:pr-5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Typical timeline
                    </dt>
                    <dd className="mt-1.5 font-serif text-xl font-bold text-foreground sm:text-2xl">
                      {service.timeRange}
                    </dd>
                  </div>
                  <div className="border-t border-border/40 pt-4 sm:border-t-0 sm:pl-5 sm:pt-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Starting range
                    </dt>
                    <dd className="mt-1.5 font-serif text-xl font-bold text-foreground sm:text-2xl">
                      {service.priceRange}
                    </dd>
                  </div>
                </dl>

                {/* 3 engagement specs */}
                <dl className="divide-y divide-border/40 py-2">
                  {service.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-baseline justify-between gap-4 py-3 text-sm"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {metric.label}
                      </dt>
                      <dd className="text-right font-medium text-foreground">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Direct email CTAs */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={mailtoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <IconMail size={15} />
                    {service.ctaLabel}
                    <IconArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    {copied ? (
                      <>
                        <IconCheck size={14} className="text-primary" />
                        Copied {site.email}
                      </>
                    ) : (
                      <>
                        <IconCopy size={14} className="text-muted-foreground" />
                        Copy {site.email}
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {site.responseTime} · Direct 1-on-1 work
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 · Fit / Diagnostic */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Fit / Diagnostic
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
              {service.diagnostics.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {service.diagnostics.body}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-border/50 rounded-2xl border border-border/60 bg-card/45 px-5 sm:px-7">
              {service.diagnostics.items.map((item, idx) => (
                <div
                  key={item}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-5 sm:gap-6 sm:py-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {pad(idx + 1)}
                  </span>
                  <p className="text-base leading-relaxed text-foreground/90">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 · Scope & Deliverables */}
      <section className="border-y border-border/50 bg-card/25 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Scope / {pad(service.deliverables.length)} Deliverables
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
                What you actually get at handoff.
              </h2>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap gap-2">
                {service.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border/70 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((deliverable, idx) => (
              <div
                key={deliverable}
                className="flex flex-col justify-between gap-6 bg-background p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {pad(idx + 1)}
                  </span>
                  <IconCheck size={16} className="text-primary" />
                </div>
                <p className="text-base font-medium leading-relaxed text-foreground">
                  {deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · System Blueprint & Proof Standards */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Blueprint / {service.blueprint.kicker}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
                {service.blueprint.title}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground lg:col-span-6">
              {service.blueprint.body}
            </p>
          </div>

          {/* Connected pipeline / layer blueprint */}
          <ol
            className={`mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
              service.visualNodes.length === 4
                ? "lg:grid-cols-4"
                : "lg:grid-cols-5"
            }`}
          >
            {service.visualNodes.map((node, idx) => (
              <li
                key={node.label}
                className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card/45 p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                      {pad(idx + 1)}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {node.value}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold tracking-tight text-foreground">
                    {node.label}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {node.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Operating standards */}
          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-4">
            {service.proofPoints.map((point, idx) => (
              <div key={point} className="bg-background p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Standard {pad(idx + 1)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · Process */}
      <section className="border-y border-border/50 bg-card/25 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Process / {pad(service.process.length)} Phases
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
              From first email to production handoff.
            </h2>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <li
                key={step.label}
                className="flex flex-col justify-between rounded-2xl border border-border/60 bg-background p-6 sm:p-7"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  Phase {step.label}
                </span>
                <div className="mt-8">
                  <h3 className="font-serif text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 · Practical FAQ + Related Work */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              FAQ / Common questions
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
              Straight answers before you email.
            </h2>

            {service.relatedWork ? (
              <div className="mt-8 rounded-2xl border border-border/60 bg-card/45 p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Related case study
                </p>
                <h3 className="mt-2 font-serif text-xl font-bold text-foreground">
                  {service.relatedWork.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.relatedWork.summary}
                </p>
                <Link
                  href={`/projects/${service.relatedWork.slug}`}
                  className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:text-primary"
                >
                  Read case study
                  <IconArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-border/50 rounded-2xl border border-border/60 bg-card/45">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:text-primary sm:px-7"
                    >
                      <span className="font-serif text-lg font-semibold leading-snug text-foreground sm:text-xl">
                        {faq.question}
                      </span>
                      <IconChevronDown
                        size={18}
                        aria-hidden
                        className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-6 sm:px-7">
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 07 · Direct Email CTA + Adjacent Service Navigation */}
      <section className="border-t border-border/50 pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/75 bg-card/65 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Start the conversation
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl">
                  {service.ctaTitle}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {service.ctaBody}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
                <a
                  href={mailtoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                >
                  <IconMail size={15} />
                  {service.ctaLabel}
                  <IconArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border/80 bg-background/60 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 sm:w-auto"
                >
                  {copied ? (
                    <>
                      <IconCheck size={14} className="text-primary" />
                      Copied {site.email}
                    </>
                  ) : (
                    <>
                      <IconCopy size={14} className="text-muted-foreground" />
                      {site.email}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Adjacent services nav */}
          <nav
            aria-label="Other services"
            className="mt-10 grid grid-cols-1 gap-4 border-t border-border/50 pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/services/${previous.id}`}
                className="group flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-card/35 p-5 transition-colors hover:border-primary/40"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <IconArrowLeft
                    size={13}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />
                  Previous service
                </span>
                <span className="font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/services"
                className="group flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-card/35 p-5 transition-colors hover:border-primary/40"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <IconArrowLeft
                    size={13}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />
                  Overview
                </span>
                <span className="font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  All services
                </span>
              </Link>
            )}

            {next ? (
              <Link
                href={`/services/${next.id}`}
                className="group flex flex-col items-start gap-1.5 rounded-2xl border border-border/60 bg-card/35 p-5 text-left transition-colors hover:border-primary/40 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Next service
                  <IconArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/services"
                className="group flex flex-col items-start gap-1.5 rounded-2xl border border-border/60 bg-card/35 p-5 text-left transition-colors hover:border-primary/40 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Browse all
                  <IconArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  All services
                </span>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </main>
  );
}
