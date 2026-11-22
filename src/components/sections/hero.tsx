"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconDownload,
} from "@tabler/icons-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { ResumeTrigger } from "@/components/resume-modal";
import { site } from "@/lib/site";

export default function Hero() {
  const [cairoTime, setCairoTime] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const { handleNav } = useSmoothScroll();

  useEffect(() => {
    const updateTime = () => {
      setCairoTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    updateTime();
    const id = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.08,
            delayChildren: 0.08,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          },
    },
  };

  return (
    <section
      id="home"
      className="relative flex w-full items-center overflow-hidden bg-background pt-8 pb-20 sm:pt-14 sm:pb-28 lg:min-h-screen lg:pt-16 lg:pb-32"
    >
      {/* Subtle architectural dot field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_60%,transparent_100%)] opacity-30 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Editorial masthead strip */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border/50 pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:mb-10 sm:tracking-[0.2em] lg:mb-14"
          >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="text-foreground">{site.name}</span>
              <span aria-hidden className="text-border">
                /
              </span>
              <span>
                {site.location}
                {cairoTime ? (
                  <span className="ml-1.5 text-foreground">{cairoTime}</span>
                ) : null}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 text-foreground">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              <span>{site.availability}</span>
            </div>
          </motion.div>

          {/* Main 12-col split */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Display typography & actions */}
            <div className="lg:col-span-7">
              <h1 className="select-none">
                <motion.span
                  variants={itemVariants}
                  className="block font-serif text-[3.1rem] font-light leading-[0.88] tracking-tight text-muted-foreground/55 sm:text-7xl md:text-8xl xl:text-[8.25rem]"
                >
                  Fullstack
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="mt-1 block font-serif text-[3.1rem] font-bold leading-[0.9] tracking-tighter text-foreground sm:text-7xl md:text-8xl xl:text-[8.25rem]"
                >
                  Developer
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="mt-1.5 block font-serif text-[2.55rem] font-light italic leading-[0.98] text-primary sm:mt-2 sm:text-6xl md:text-7xl xl:text-[6.25rem]"
                >
                  &amp; Founder.
                </motion.span>
              </h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg"
              >
                I design and build web products, run{" "}
                <a
                  href="https://wearemasons.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Masons
                </a>
                , and work directly with founders and product teams from first
                draft to launch.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
              >
                <button
                  type="button"
                  onClick={() => handleNav("projects")}
                  className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                >
                  View selected work
                  <IconArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <div className="grid grid-cols-2 gap-2.5 sm:contents">
                  <button
                    type="button"
                    onClick={() => handleNav("contact")}
                    className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/70 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:tracking-[0.16em]"
                  >
                    Email me
                    <IconArrowUpRight
                      size={14}
                      className="text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>

                  <ResumeTrigger className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/50 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:border-transparent sm:px-3 sm:tracking-[0.16em]">
                    <IconDownload size={14} />
                    Résumé
                  </ResumeTrigger>
                </div>
              </motion.div>
            </div>

            {/* Right: Editorial portrait frame */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <figure className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card/55 lg:ml-auto lg:mr-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-[4/5]">
                  <Image
                    src="/seifmirror.webp"
                    alt="Seif Zakaria"
                    fill
                    sizes="(max-width: 1024px) 100vw, 448px"
                    className="object-cover object-[50%_28%] lg:object-top"
                    priority
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:px-5 sm:py-3.5 sm:tracking-[0.18em]">
                  <span className="text-foreground">Founder, Masons</span>
                  <span>CS &amp; Statistics · ASU</span>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
