"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isCoarse, setIsCoarse] = useState(true); // avoid flash on touch devices
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: coarse), (max-width: 767px)"
    );
    const update = () => setIsCoarse(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isCoarse || reduceMotion) return;

    const interactiveSelector =
      "a, button, input, textarea, select, [class*='cursor-link'], .highlight";

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Event delegation keeps hover state correct for links added after mount.
    const onMouseOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.(interactiveSelector)) {
        setLinkHovered(true);
      }
    };
    const onMouseOut = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.(interactiveSelector)) {
        setLinkHovered(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isCoarse, reduceMotion]);

  if (
    isCoarse ||
    reduceMotion ||
    pathname?.startsWith("/logs") ||
    pathname?.startsWith("/projects")
  ) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-dot fixed left-0 top-0"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : linkHovered ? 2.4 : 1.2,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 30,
        }}
      />

      <motion.div
        aria-hidden
        className="cursor-outline fixed left-0 top-0"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : linkHovered ? 2.4 : 1.2,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 200,
          damping: 30,
        }}
      />
    </>
  );
}
