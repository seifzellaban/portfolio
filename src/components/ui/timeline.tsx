"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { DownloadResumeButton } from "@/components/download-resume";
import { RESUMES } from "@/lib/resumes";

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  current?: boolean;
  content: React.ReactNode;
}

const pad = (n: number) => n.toString().padStart(2, "0");

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const updateHeight = () => {
      setHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(node);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <section
      id="experience"
      className="border-t border-border/50 bg-background py-16 sm:py-24 lg:py-32"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Experience</span>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>{pad(data.length)} chapters</span>
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:text-6xl">
              Experience &amp;{" "}
              <span className="font-light italic text-primary">journey.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end md:text-right lg:text-lg">
            Production client systems, live US technical operations, startup
            builds, internships, and computer science foundations.
          </p>
        </header>

        <div ref={ref} className="relative mt-10 pb-10 sm:mt-16 md:pb-16">
          {data.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="flex justify-start pt-8 first:pt-2 sm:pt-12 md:gap-10 md:pt-16 md:first:pt-4"
            >
              {/* Sticky left rail */}
              <div className="sticky top-28 z-30 flex self-start flex-col items-start md:top-36 md:w-72 md:shrink-0 lg:w-80">
                <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-background md:left-2.5 md:top-1.5 md:h-9 md:w-9">
                  <div
                    className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${
                      item.current
                        ? "bg-primary shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
                        : "border border-primary/60 bg-primary/25"
                    }`}
                  />
                </div>

                <div className="hidden pl-16 md:block">
                  <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{pad(idx + 1)}</span>
                    {item.current ? (
                      <>
                        <span aria-hidden className="text-border">
                          /
                        </span>
                        <span className="text-primary">Active</span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl">
                    {item.title}
                  </h3>
                  {item.subtitle ? (
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {item.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Right milestone card */}
              <div className="relative w-full min-w-0 pl-10 pr-0 sm:pl-12 md:pl-0">
                <div className="mb-2.5 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary md:hidden">
                  <span className="text-muted-foreground">{pad(idx + 1)}</span>
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span>{item.title}</span>
                </div>
                {item.content}
              </div>
            </div>
          ))}

          {/* Animated scroll spine */}
          <div
            style={{ height: height + "px" }}
            className="absolute left-[13px] top-0 w-px overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-border to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] md:left-[27px] md:w-0.5"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-full rounded-full bg-linear-to-t from-foreground via-primary/60 from-0% via-20% to-transparent"
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border/60 bg-card/55 p-6 sm:mt-8 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-foreground">Résumé</span>
                <span aria-hidden className="text-border">
                  /
                </span>
                <span>
                  {pad(RESUMES.length)}{" "}
                  {RESUMES.length === 1 ? "version" : "versions"}
                </span>
              </p>
              <h3 className="mt-2.5 font-serif text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                Need the full printable CV?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Pick the version tailored to your context and open or download
                the PDF in a new tab.
              </p>
            </div>

            <DownloadResumeButton />
          </div>
        </div>
      </div>
    </section>
  );
};
