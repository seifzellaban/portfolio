"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";
import ShinyText from "../ShinyText";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleNav } = useSmoothScroll();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
          style={{ opacity: 0.4 }}
        />
        {/* Gradient Orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[-0.02em] leading-[0.9] highlight select-none">
            <motion.span
              className="block text-muted-foreground/60 font-light tracking-tight"
              variants={textVariants}
            >
              Fullstack
            </motion.span>
            <motion.span
              className="block font-semibold text-foreground tracking-tighter"
              variants={textVariants}
              transition={{ delay: 0.1 }}
            >
              Developer
            </motion.span>
            <motion.div
              className="block mt-2 overflow-hidden py-2"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block font-serif italic font-light text-muted-foreground/80 leading-0">
                & Founder
              </span>
            </motion.div>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
            I build{" "}
            <span className="text-foreground font-medium decoration-primary/30 underline decoration-2 underline-offset-4">
              products that ship
            </span>
            , solve{" "}
            <span className="text-foreground font-medium decoration-primary/30 underline decoration-2 underline-offset-4">
              real problems
            </span>
            , and make users happy.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            onClick={() => handleNav("projects")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-background/50 backdrop-blur-sm border border-border/50 rounded-full hover:bg-accent/5 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShinyText
              text="EXPLORE MY WORK"
              speed={3}
              className="font-mono text-sm tracking-widest uppercase font-medium"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-foreground/50"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      />
    </section>
  );
}
