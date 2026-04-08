"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { services } from "@/lib/services-data";
import Link from "next/link";
import { useReveal, useRevealGroup } from "@/hooks/use-reveal";

// Which service IDs get the "big" (2-col) treatment
const BIG_SERVICE_IDS = new Set(["web-development", "api-bot-ai-automation"]);

// Display order for the bento grid:
// Row 1: small (ui-ux), big (web-dev)
// Row 2: big (api-bot), small (seo)
const BENTO_ORDER = [
  "ui-ux-design",
  "web-development",
  "api-bot-ai-automation",
  "seo-digital-marketing",
];

function ServiceCard({
  service,
  index,
  isBig,
  revealRef,
}: {
  service: (typeof services)[0];
  index: number;
  isBig: boolean;
  revealRef: (el: HTMLElement | null) => void;
}) {
  return (
    <div
      ref={revealRef}
      className={`reveal reveal-delay-${index + 1} group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 ${
        isBig ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* Service number */}
      <div className="absolute top-4 left-4 font-mono text-xs text-foreground/30 tracking-widest">
        {(index + 1).toString().padStart(2, "0")}
      </div>

      {/* Background icon watermark */}
      <div className="absolute bottom-[-20px] right-[-20px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
        <div className="scale-[8]">{service.icon}</div>
      </div>

      {/* Card content */}
      <div
        className={`relative z-10 p-8 flex ${
          isBig
            ? "flex-col sm:flex-row sm:items-center gap-6 min-h-[280px]"
            : "flex-col justify-between min-h-[320px]"
        }`}
      >
        <div className={`pt-4 ${isBig ? "shrink-0" : ""}`}>
          <div className="mb-6 p-4 bg-primary/10 w-fit rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
            {service.icon}
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>

          {isBig && (
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              {service.description}
            </p>
          )}

          <Link
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
          >
            Learn More
            <IconArrowRight
              size={16}
              className="group-hover/link:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const headingRef = useReveal();
  const ctaRef = useReveal();
  const cardRevealRef = useRevealGroup();

  // Sort services into bento order
  const orderedServices = BENTO_ORDER.map((id) =>
    services.find((s) => s.id === id)
  ).filter(Boolean) as typeof services;

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial heading */}
        <div ref={headingRef} className="reveal mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Services
          </h2>
          <div className="mt-3 h-[2px] w-16 bg-primary" />
          <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
            Comprehensive solutions to help you build, design, and grow your
            digital presence with precision and purpose.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {orderedServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isBig={BIG_SERVICE_IDS.has(service.id)}
              revealRef={cardRevealRef}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="reveal text-center p-12 rounded-2xl bg-card/50 border border-border/50"
        >
          <h3 className="font-serif text-3xl font-bold mb-4">
            Ready to bring your vision to life?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and explore how we can work together
            to create something exceptional.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/30 text-sm font-mono uppercase tracking-widest text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            Get in Touch <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
