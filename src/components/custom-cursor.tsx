"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash on mobile

  useEffect(() => {
    // Check if we're on mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Use pageX/pageY to account for scroll, but for fixed positioning we want clientX/clientY
      // Try a small offset adjustment to align with actual click position
      setPosition({
        x: e.clientX,
        y: e.clientY - 2, // Small adjustment to account for potential offset
      });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document
        .querySelectorAll("a, button, input, textarea, highlight")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setLinkHovered(true));
          el.addEventListener("mouseleave", () => setLinkHovered(false));
        });
      Array.from(document.getElementsByClassName("highlight")).forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    // Only add event listeners if not on mobile
    if (!isMobile) {
      addEventListeners();
      handleLinkHoverEvents();
    }

    return () => {
      removeEventListeners();
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Calculate scale values
  const dotScale = clicked ? 0.8 : linkHovered ? 2.4 : 1.2;
  const outlineScale = clicked ? 0.8 : linkHovered ? 2.4 : 1.2;

  // Base sizes (assuming 8px dot and 32px outline)
  const dotSize = 8;
  const outlineSize = 32;

  // Calculate actual sizes with scaling
  const actualDotSize = dotSize * dotScale;
  const actualOutlineSize = outlineSize * outlineScale;

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x - actualDotSize / 2,
          y: position.y - actualDotSize / 2,
          scale: dotScale,
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
        className="cursor-outline"
        animate={{
          x: position.x - actualOutlineSize / 2,
          y: position.y - actualOutlineSize / 2,
          scale: outlineScale,
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
