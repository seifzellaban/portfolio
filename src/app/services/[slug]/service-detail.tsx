"use client";

import { Service } from "@/lib/services-data";
import { useReveal, useRevealGroup } from "@/hooks/use-reveal";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  Clock,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { RefObject } from "react";

const motifLabels = {
  architecture: "Build readiness",
  interface: "Experience map",
  growth: "Growth system",
  automation: "Workflow circuit",
} as const;

export default function ServiceDetail({ service }: { service: Service }) {
  const heroRef = useReveal();
  const deliverablesRef = useReveal();
  const diagnosticsRef = useReveal();
  const processRef = useReveal();
  const ctaRef = useReveal();
  const deliverableRevealRef = useRevealGroup();
  const processRevealRef = useRevealGroup();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/50 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size:[80px_80px] opacity-[0.25]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={heroRef} className="reveal">
            <Link
              href="/#services"
              className="group mb-10 inline-flex items-center text-sm font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>

            <ServiceHero service={service} />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div ref={diagnosticsRef} className="reveal">
            <SectionKicker label="Diagnostic" />
            <h2 className="mt-4 max-w-xl font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {service.diagnostics.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {service.diagnostics.body}
            </p>
          </div>

          <DiagnosticPanel service={service} />
        </div>
      </section>

      <section className="border-y border-border/40 bg-card/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={deliverablesRef} className="reveal mb-12">
            <SectionKicker label="What's included" />
            <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Deliverables shaped for this kind of project.
              </h2>
              <p className="text-muted-foreground">
                The service is scoped around outcomes and handoff quality, not a
                loose pile of tasks.
              </p>
            </div>
          </div>

          <DeliverablesGrid
            service={service}
            revealRef={deliverableRevealRef}
          />
        </div>
      </section>

      <MotifSection service={service} />

      <section className="border-y border-border/40 bg-card/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={processRef} className="reveal mb-12">
            <SectionKicker label="Process" />
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              A clear path from first conversation to handoff.
            </h2>
          </div>

          <ProcessSection service={service} revealRef={processRevealRef} />
        </div>
      </section>

      <ServiceCTA service={service} ctaRef={ctaRef} />
    </main>
  );
}

function ServiceHero({ service }: { service: Service }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
      <div>
        <div className="mb-7 flex flex-wrap items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl border ${service.theme.accentClass}`}
          >
            {service.icon}
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {service.theme.eyebrow}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {service.theme.identity}
            </p>
          </div>
        </div>

        <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
          {service.heroTitle}
        </h1>
        <div className="mt-8 h-px w-24 bg-primary" />
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {service.heroLead}
        </p>
      </div>

      <div className="grid gap-5">
        <QuickInfoPanel service={service} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {service.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/60 bg-card/70 p-4"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-3 text-sm font-semibold leading-snug">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/#contact"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {service.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function QuickInfoPanel({ service }: { service: Service }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Quick Info
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Timeline</p>
            <p className="mt-1 font-semibold">{service.timeRange}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Investment</p>
            <p className="mt-1 font-semibold">{service.priceRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagnosticPanel({ service }: { service: Service }) {
  return (
    <div
      className={`rounded-xl border border-border/60 p-5 sm:p-7 ${service.theme.surfaceClass}`}
    >
      <div className="grid gap-4">
        {service.diagnostics.items.map((item, index) => (
          <div
            key={item}
            className="grid grid-cols-[auto_1fr] gap-4 border-b border-border/40 pb-4 last:border-b-0 last:pb-0"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <p className="leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliverablesGrid({
  service,
  revealRef,
}: {
  service: Service;
  revealRef: (el: HTMLElement | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {service.deliverables.map((deliverable, index) => (
        <div
          key={deliverable}
          ref={revealRef}
          className={`reveal reveal-delay-${Math.min(
            index + 1,
            5,
          )} group min-h-36 rounded-xl border border-border/60 bg-background p-6 transition-colors hover:border-primary/40`}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <Check className="h-5 w-5 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>
          <p className="font-medium leading-relaxed">{deliverable}</p>
        </div>
      ))}
    </div>
  );
}

function MotifSection({ service }: { service: Service }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <SectionKicker label={motifLabels[service.theme.motif]} />
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              The working model for this engagement.
            </h2>
          </div>
          <p className="text-muted-foreground">
            Each page uses a service-specific visual model so the offer is
            understandable before the visitor reaches the contact form.
          </p>
        </div>

        {service.theme.motif === "architecture" ? (
          <ArchitectureLedgerVisual service={service} />
        ) : null}
        {service.theme.motif === "interface" ? (
          <InterfaceStudioVisual service={service} />
        ) : null}
        {service.theme.motif === "growth" ? (
          <GrowthObservatoryVisual service={service} />
        ) : null}
        {service.theme.motif === "automation" ? (
          <AutomationCircuitVisual service={service} />
        ) : null}

        <ProofPoints service={service} />
      </div>
    </section>
  );
}

function ArchitectureLedgerVisual({ service }: { service: Service }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
      <div className="rounded-xl border border-border/70 bg-card p-6 lg:col-span-2">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Product Stack
        </p>
        <div className="mt-8 grid gap-3">
          {service.visualNodes.map((node) => (
            <div
              key={node.label}
              className="flex items-center justify-between gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0"
            >
              <span className="font-semibold">{node.label}</span>
              <span className="text-right text-sm text-muted-foreground">
                {node.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border/70 bg-background p-4 lg:col-span-3">
        <div className="grid min-h-85 grid-cols-1 gap-3 sm:grid-cols-3">
          {service.visualNodes.slice(0, 3).map((node, index) => (
            <div
              key={node.label}
              className="flex flex-col justify-between rounded-lg border border-border/70 bg-card/70 p-5"
            >
              <span className="font-mono text-xs text-muted-foreground">
                Layer 0{index + 1}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold">{node.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {node.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InterfaceStudioVisual({ service }: { service: Service }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-4">
        {service.visualNodes.map((node, index) => (
          <div
            key={node.label}
            className="rounded-xl border border-border/60 bg-card p-5"
            style={{ marginLeft: `${Math.min(index, 2) * 18}px` }}
          >
            <p className="font-mono text-xs text-muted-foreground">
              {(index + 1).toString().padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold">{node.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{node.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border/70 bg-background p-4">
        <div className="rounded-lg border border-border/60 bg-card p-4">
          <div className="mb-4 flex gap-2">
            <span className="h-2 w-2 rounded-full bg-primary/50" />
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span className="h-2 w-2 rounded-full bg-muted" />
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.75fr_1fr]">
            <div className="space-y-3">
              <div className="h-9 rounded-md bg-foreground/10" />
              <div className="h-9 w-4/5 rounded-md bg-foreground/10" />
              <div className="h-9 w-3/5 rounded-md bg-foreground/10" />
            </div>
            <div className="rounded-lg border border-border/60 bg-background p-4">
              <div className="h-28 rounded-md bg-foreground/10" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-12 rounded-md bg-foreground/10" />
                <div className="h-12 rounded-md bg-primary/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowthObservatoryVisual({ service }: { service: Service }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-5 sm:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:items-end">
        {service.visualNodes.map((node, index) => (
          <div key={node.label} className="min-w-0">
            <div className="mb-4 flex h-48 items-end rounded-lg border border-border/60 bg-background p-3">
              <div
                className="w-full rounded-md bg-primary/70"
                style={{ height: `${34 + index * 12}%` }}
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {node.label}
            </p>
            <p className="mt-2 text-sm font-medium">{node.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationCircuitVisual({ service }: { service: Service }) {
  return (
    <div className="rounded-xl border border-foreground bg-foreground p-5 text-background sm:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {service.visualNodes.map((node, index) => (
          <div key={node.label} className="relative">
            <div className="min-h-40 rounded-lg border border-background/25 bg-background/10 p-5">
              <p className="font-mono text-xs text-background/60">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-serif text-2xl font-bold">
                {node.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-background/70">
                {node.value}
              </p>
            </div>
            {index < service.visualNodes.length - 1 ? (
              <div className="hidden xl:block absolute left-full top-1/2 h-px w-4 -translate-y-1/2 bg-background/45" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProofPoints({ service }: { service: Service }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-4">
      {service.proofPoints.map((point, index) => (
        <div key={point} className="bg-background p-5">
          <p className="font-mono text-xs text-muted-foreground">
            Proof 0{index + 1}
          </p>
          <p className="mt-5 text-sm font-medium leading-relaxed">{point}</p>
        </div>
      ))}
    </div>
  );
}

function ProcessSection({
  service,
  revealRef,
}: {
  service: Service;
  revealRef: (el: HTMLElement | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {service.process.map((step, index) => (
        <div
          key={step.label}
          ref={revealRef}
          className={`reveal reveal-delay-${Math.min(
            index + 1,
            5,
          )} relative min-h-72 rounded-xl border border-border/60 bg-background p-6`}
        >
          <p className="font-mono text-sm text-muted-foreground">
            {step.label}
          </p>
          <h3 className="mt-10 font-serif text-2xl font-bold leading-tight">
            {step.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function ServiceCTA({
  service,
  ctaRef,
}: {
  service: Service;
  ctaRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="py-20 sm:py-24 mb-8">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div
          ref={ctaRef}
          className="reveal grid grid-cols-1 gap-8 rounded-xl border border-border/60 bg-card p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border/60 bg-background text-primary">
            <MessageSquare className="h-8 w-8" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {service.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {service.ctaBody}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {service.ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-4 text-sm font-semibold transition-colors hover:bg-foreground/5"
              >
                View Other Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionKicker({ label }: { label: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
      {label}
    </p>
  );
}
