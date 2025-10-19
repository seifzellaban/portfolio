"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";
import LiquidEther from "@/components/ui/LiquidEther";
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={1.7}
          autoRampDuration={0.6}
        />
      </div>
      <motion.div
        className="relative z-10 max-w-5xl px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
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

        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xl md:text-2xl text-muted-foreground/70 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
            Crafting digital experiences that blend{" "}
            <span className="text-foreground font-medium">innovation</span> with{" "}
            <span className="text-foreground font-medium">
              intuitive design
            </span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            onClick={() => handleNav("projects")}
            className="group relative inline-flex items-center gap-3 text-base font-medium text-muted-foreground/60 hover:text-foreground transition-all duration-500 tracking-wider uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShinyText
              text="EXPLORE MY WORK"
              speed={3}
              className="animate-shine"
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

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      />
    </section>
  );
}
