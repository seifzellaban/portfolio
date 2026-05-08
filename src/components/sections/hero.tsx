"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";
import ShinyText from "../ShinyText";
import Image from "next/image";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleNav } = useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-background"
    >
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
          style={{ opacity: 0.25 }}
        />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-blob" />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] animate-blob"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Left: Typography — takes 3 of 5 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h1 className="select-none">
              <motion.span
                className="block font-serif text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-light tracking-tight text-muted-foreground/50 leading-[0.85]"
                variants={itemVariants}
              >
                Fullstack
              </motion.span>
              <motion.span
                className="block font-serif text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-bold tracking-tighter text-foreground leading-[0.9] mt-1"
                variants={itemVariants}
              >
                Developer
              </motion.span>
              <motion.span
                className="block font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light italic text-primary leading-[1] mt-2"
                variants={itemVariants}
              >
                &amp; Founder
              </motion.span>
            </h1>

            <motion.p
              className="mt-8 font-mono text-sm md:text-base text-muted-foreground/60 tracking-widest uppercase"
              variants={itemVariants}
            >
              Seif Zakaria — Cairo, Egypt
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <motion.button
                onClick={() => handleNav("projects")}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground/5 backdrop-blur-sm border border-primary/20 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShinyText
                  text="EXPLORE MY WORK"
                  speed={3}
                  className="font-mono text-xs tracking-[0.2em] uppercase font-medium"
                />
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Photo — takes 2 of 5 cols */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block lg:col-span-2"
          >
            <div className="relative w-full aspect-[3/4] max-w-sm ml-auto rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-primary/10 z-10" />
              <Image
                src="/seif.jpg"
                alt="Seif Zakaria"
                fill
                sizes="(max-width: 1024px) 0vw, 350px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-primary/80"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      />
    </section>
  );
}
