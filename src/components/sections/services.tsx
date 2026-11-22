"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { services, type Service } from "@/lib/services-data";
import { site } from "@/lib/site";
import { useReveal } from "@/hooks/use-reveal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const SERVICE_ORDER = [
  "web-development",
  "ui-ux-design",
  "api-bot-ai-automation",
  "seo-digital-marketing",
] as const;

const PRACTICE_STANDARDS = [
  {
    index: "01",
    title: "Direct work",
    body: "You talk to the person designing the screens and writing the code. No account managers or handoffs.",
  },
  {
    index: "02",
    title: "Scoped to fit",
    body: "Stack, milestones, and deliverables are set around what you actually need to ship.",
  },
  {
    index: "03",
    title: "Small client load",
    body: "Taking on two projects at once leaves room for fast replies and careful engineering.",
  },
] as const;

const pad = (n: number) => n.toString().padStart(2, "0");

const metaClasses =
  "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

function ServiceDossier({
  service,
  index,
  onInquire,
}: {
  service: Service;
  index: number;
  onInquire: (projectType: string) => void;
}) {
  const featuredDeliverables = service.deliverables.slice(0, 4);
  const remainingCount = Math.max(
    0,
    service.deliverables.length - featuredDeliverables.length
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Dossier top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-5">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-foreground">{pad(index + 1)}</span>
            <span aria-hidden className="h-px w-5 bg-border" />
            <span>{service.theme.eyebrow}</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {service.timeRange}
          </span>
        </div>

        {/* Thesis & context */}
        <div className="mt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {service.engagementStyle}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-3xl">
            {service.heroTitle}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {service.heroLead}
          </p>
        </div>

        {/* Fit */}
        <div className="mt-7 border-l-2 border-primary/70 py-0.5 pl-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Best for
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 sm:text-base">
            {service.idealFor}
          </p>
        </div>

        {/* Engagement metadata strip */}
        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border/50 py-4 sm:mt-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border/50 sm:py-5">
          {service.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className={
                idx === 0
                  ? "sm:pr-5"
                  : idx === service.metrics.length - 1
                    ? "col-span-2 border-t border-border/40 pt-3 sm:col-span-1 sm:border-t-0 sm:pt-0 sm:pl-5"
                    : "sm:px-5"
              }
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:tracking-[0.18em]">
                {metric.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground sm:mt-1.5">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Curated scope */}
        <div className="mt-6 sm:mt-7">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Selected scope
            </p>
            {remainingCount > 0 ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/75">
                +{remainingCount} more in full brief
              </span>
            ) : null}
          </div>

          <ul className="mt-3.5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-y-3">
            {featuredDeliverables.map((item, itemIndex) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
              >
                <span className="mt-0.5 shrink-0 font-mono text-[10px] text-muted-foreground">
                  {pad(itemIndex + 1)}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3 border-t border-border/50 pt-5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
        <button
          type="button"
          onClick={() => onInquire(service.contactProjectType)}
          className="group inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
        >
          {service.ctaLabel}
          <IconArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        <Link
          href={`/services/${service.id}`}
          className="group inline-flex min-h-[40px] items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:justify-start"
        >
          Full scope &amp; process
          <IconArrowUpRight
            size={14}
            className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

export function Services() {
  const orderedServices = SERVICE_ORDER.map((id) =>
    services.find((s) => s.id === id)
  ).filter((s): s is Service => Boolean(s));

  const [activeId, setActiveId] = useState<string>(
    orderedServices[0]?.id ?? ""
  );
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const { handleNav } = useSmoothScroll();

  const headingRef = useReveal<HTMLDivElement>();
  const standardsRef = useReveal<HTMLDivElement>();
  const dossierRef = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const conciergeRef = useReveal<HTMLDivElement>();

  const activeIndex = Math.max(
    0,
    orderedServices.findIndex((service) => service.id === activeId)
  );
  const mobileOpenIndex = orderedServices.findIndex(
    (service) => service.id === mobileOpenId
  );
  const activeService = orderedServices[activeIndex];

  if (!activeService) return null;

  const handleInquire = (projectType?: string) => {
    if (projectType) {
      window.dispatchEvent(
        new CustomEvent("select-project-type", { detail: { projectType } })
      );
    }
    handleNav("contact");
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const count = orderedServices.length;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % count;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextService = orderedServices[nextIndex];
      if (nextService) {
        setActiveId(nextService.id);
        setMobileOpenId(nextService.id);
        tabRefs.current[nextIndex]?.focus();
      }
    }
  };

  return (
    <section
      id="services"
      className="border-t border-border/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div ref={headingRef} className="reveal">
          <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className={metaClasses}>
                <span>Services</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>{pad(orderedServices.length)}</span>
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:text-6xl">
                Selected{" "}
                <span className="font-light italic text-primary">
                  services.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
              I take on two client projects at a time and do the work myself,
              from early scoping to production launch.
            </p>
          </header>
        </div>

        {/* Practice standards ribbon */}
        <div
          ref={standardsRef}
          className="reveal reveal-delay-1 mt-10 grid grid-cols-1 divide-y divide-border/50 border-y border-border/50 sm:mt-14 md:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {PRACTICE_STANDARDS.map((item, idx) => (
            <div
              key={item.index}
              className={`py-5 md:py-7 ${
                idx === 0
                  ? "md:pr-8"
                  : idx === 1
                    ? "md:px-8"
                    : "md:pl-8"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {item.index}
                </span>
                <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-2.5">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Master-Detail Engagement Dossier */}
        <div
          ref={dossierRef}
          className="reveal reveal-delay-2 mt-10 grid grid-cols-1 items-start gap-8 sm:mt-14 lg:mt-20 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left column: Discipline index */}
          <div className="lg:col-span-5">
            <div className="mb-3.5 flex items-center justify-between sm:mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Select a discipline
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 lg:hidden">
                {mobileOpenIndex >= 0
                  ? `${pad(mobileOpenIndex + 1)} / ${pad(orderedServices.length)}`
                  : `${pad(orderedServices.length)} disciplines`}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 lg:inline">
                {pad(activeIndex + 1)} / {pad(orderedServices.length)}
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Service disciplines"
              aria-orientation="vertical"
              className="divide-y divide-border/50 border-y border-border/50"
            >
              {orderedServices.map((service, index) => {
                const isDesktopActive = service.id === activeService.id;
                const isMobileOpen = service.id === mobileOpenId;
                const tabId = `service-tab-${service.id}`;
                const panelId = `service-panel-${service.id}`;

                return (
                  <div key={service.id}>
                    <button
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      id={tabId}
                      type="button"
                      role="tab"
                      aria-selected={isDesktopActive}
                      aria-expanded={isMobileOpen}
                      aria-controls={panelId}
                      tabIndex={isDesktopActive ? 0 : -1}
                      onClick={() => {
                        setActiveId(service.id);
                        setMobileOpenId((prev) =>
                          prev === service.id ? null : service.id
                        );
                      }}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={`group relative w-full py-5 pl-4 pr-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:py-6 sm:pl-5 sm:pr-4 ${
                        isMobileOpen
                          ? "bg-card/75"
                          : "bg-transparent hover:bg-card/35"
                      } ${
                        isDesktopActive
                          ? "lg:bg-card/75"
                          : "lg:bg-transparent lg:hover:bg-card/35"
                      }`}
                    >
                      {/* Active left hairline indicator */}
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${
                          isMobileOpen
                            ? "bg-primary"
                            : "bg-transparent group-hover:bg-border"
                        } ${
                          isDesktopActive
                            ? "lg:bg-primary"
                            : "lg:bg-transparent lg:group-hover:bg-border"
                        }`}
                      />

                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:gap-3 sm:tracking-[0.2em]">
                          <span
                            className={`${
                              isMobileOpen
                                ? "text-foreground"
                                : "text-muted-foreground"
                            } ${
                              isDesktopActive
                                ? "lg:text-foreground"
                                : "lg:text-muted-foreground"
                            }`}
                          >
                            {pad(index + 1)}
                          </span>
                          <span>{service.theme.eyebrow}</span>
                        </span>

                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/75">
                          {service.timeRange}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3 sm:mt-2.5 sm:gap-4">
                        <span
                          className={`font-serif text-xl tracking-tight transition-colors duration-300 sm:text-2xl ${
                            isMobileOpen
                              ? "font-bold text-foreground"
                              : "font-semibold text-foreground/65 group-hover:text-foreground"
                          } ${
                            isDesktopActive
                              ? "lg:font-bold lg:text-foreground"
                              : "lg:font-semibold lg:text-foreground/65 lg:group-hover:text-foreground"
                          }`}
                        >
                          {service.title}
                        </span>

                        <IconChevronDown
                          aria-hidden
                          size={18}
                          className={`shrink-0 transition-transform duration-300 lg:hidden ${
                            isMobileOpen
                              ? "rotate-180 text-primary"
                              : "text-muted-foreground"
                          }`}
                        />

                        <IconArrowRight
                          aria-hidden
                          size={16}
                          className={`hidden shrink-0 transition-all duration-300 lg:inline-block ${
                            isDesktopActive
                              ? "translate-x-0 text-primary opacity-100"
                              : "-translate-x-1 text-muted-foreground opacity-40 group-hover:translate-x-0 group-hover:opacity-80"
                          }`}
                        />
                      </div>

                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:mt-2">
                        {service.description}
                      </p>
                    </button>

                    {/* Mobile / Tablet inline dossier */}
                    {isMobileOpen ? (
                      <div
                        id={`${panelId}-mobile`}
                        role="region"
                        aria-labelledby={tabId}
                        className="border-t border-border/40 bg-card/50 px-4 py-6 sm:px-5 sm:py-7 lg:hidden"
                      >
                        <ServiceDossier
                          service={service}
                          index={index}
                          onInquire={handleInquire}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Scoped per project
              </p>
              <Link
                href="/services"
                className="group inline-flex min-h-[36px] items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
              >
                All services
                <IconArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Right column: Desktop engagement dossier */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/65 p-8 xl:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.id}
                  id={`service-panel-${activeService.id}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${activeService.id}`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -8 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.26,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ServiceDossier
                    service={activeService}
                    index={activeIndex}
                    onInquire={handleInquire}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Direct Consultation Band */}
        <div
          ref={conciergeRef}
          className="reveal reveal-delay-3 relative mt-10 overflow-hidden rounded-2xl border border-foreground/15 bg-foreground p-6 text-background sm:mt-14 sm:p-10 md:mt-20 lg:p-12"
        >
          {/* Subtle architectural grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.05]"
          />

          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-8">
              <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-background/70 sm:tracking-[0.2em]">
                <span className="inline-flex items-center gap-2 text-background">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-background"
                  />
                  {site.availability}
                </span>
                <span aria-hidden className="text-background/35">
                  /
                </span>
                <span>{site.responseTime}</span>
              </p>

              <h3 className="mt-3.5 font-serif text-2xl font-bold leading-[1.08] tracking-tight text-background sm:mt-4 sm:text-3xl">
                Got something specific in mind?
              </h3>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75 lg:text-lg">
                Send a short email with what you&apos;re building, where things
                stand, and when you want it live. I read everything myself and
                reply with a straight answer.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-end">
              <button
                type="button"
                onClick={() => handleInquire()}
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-background px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:w-auto"
              >
                Send an inquiry
                <IconArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <Link
                href="/services"
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-background/70 transition-colors hover:text-background sm:justify-start"
              >
                View all services
                <IconArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
