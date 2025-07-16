"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function ScrollHandler() {
  const searchParams = useSearchParams();
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        scrollToSection(scrollTo);
      }, 100);
    }
  }, [searchParams, scrollToSection]);

  return null;
}
