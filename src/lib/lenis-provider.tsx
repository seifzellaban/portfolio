"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={
        reduceMotion
          ? { smoothWheel: false, syncTouch: false, duration: 0 }
          : { lerp: 0.1, duration: 1.5 }
      }
    >
      {children}
    </ReactLenis>
  );
}
