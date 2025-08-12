"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleNav } = useSmoothScroll();

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.02] to-transparent" />

      {/* Floating elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/20 rounded-full" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary/10 rounded-full" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-5xl px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Main heading */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[-0.02em] leading-[0.85] highlight">
            <motion.span
              className="block text-muted-foreground/50 font-light"
              variants={textVariants}
            >
              Fullstack
            </motion.span>
            <motion.span
              className="block font-medium text-foreground"
              variants={textVariants}
              transition={{ delay: 0.1 }}
            >
              Developer
            </motion.span>
            <motion.span
              className="block text-muted-foreground/70 font-light"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              & Founder
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xl md:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
            Crafting digital experiences that blend{" "}
            <span className="text-foreground font-medium">innovation</span> with{" "}
            <span className="text-foreground font-medium">
              intuitive design
            </span>
          </p>
        </motion.div>

        {/* Minimal CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            onClick={() => handleNav("projects")}
            className="group relative inline-flex items-center gap-3 text-base font-medium text-muted-foreground/60 hover:text-foreground transition-all duration-500 tracking-wider uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore my work</span>
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      />
    </section>
  );
}
