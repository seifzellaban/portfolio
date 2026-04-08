"use client";

import React from "react";
import { Service } from "@/lib/services-data";
import {
  ArrowLeft,
  Check,
  Clock,
  Banknote,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useReveal, useRevealGroup } from "@/hooks/use-reveal";

const ProcessSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We start by understanding your goals, target audience, and project requirements through detailed consultations.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description:
      "Creating wireframes, mockups, and interactive prototypes to visualize the solution before development begins.",
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "Building the solution using modern technologies with rigorous testing at every stage to ensure quality.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Deploying your project and providing ongoing maintenance, monitoring, and optimization to ensure continued success.",
  },
];

export default function ServiceDetail({ service }: { service: Service }) {
  const heroRef = useReveal();
  const overviewRef = useReveal();
  const featuresHeadingRef = useReveal();
  const processHeadingRef = useReveal();
  const ctaRef = useReveal();
  const featureRevealRef = useRevealGroup();
  const processRevealRef = useRevealGroup();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={heroRef} className="reveal">
            <Link
              href="/#services"
              className="inline-flex items-center text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left: Title & Description */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    {service.icon}
                  </div>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  {service.title}
                </h1>
                <div className="h-[2px] w-20 bg-primary mb-8" />
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right: Quick Info */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                      Quick Info
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Timeline
                          </div>
                          <div className="font-semibold">
                            {service.timeRange}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Banknote className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Investment
                          </div>
                          <div className="font-semibold">
                            {service.priceRange}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/#contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors group/button"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={overviewRef} className="reveal max-w-4xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-8">
              Overview
            </h2>
            <div className="h-[2px] w-16 bg-primary mb-8" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 bg-card/30 border-y border-border/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={featuresHeadingRef} className="reveal">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              What&apos;s Included
            </h2>
            <div className="h-[2px] w-16 bg-primary mb-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                ref={featureRevealRef}
                className={`reveal reveal-delay-${Math.min(idx + 1, 5)} group p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold text-base">{feature}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div ref={processHeadingRef} className="reveal">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Our Process
            </h2>
            <div className="h-[2px] w-16 bg-primary mb-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ProcessSteps.map((step, idx) => (
              <div
                key={idx}
                ref={processRevealRef}
                className={`reveal reveal-delay-${Math.min(idx + 1, 5)} relative p-8 rounded-2xl bg-card border border-border/50`}
              >
                <div className="absolute -top-3 -left-3 h-12 w-12 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {step.step}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 mt-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-card/30 border-t border-border/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div
            ref={ctaRef}
            className="reveal text-center p-12 sm:p-16 rounded-3xl bg-background border border-border/50"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-6">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <div className="h-[2px] w-16 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our {service.title.toLowerCase()} services
              can help your business grow. Book a free consultation to explore
              your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors group/button"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-medium hover:bg-foreground/5 transition-colors"
              >
                View Other Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
