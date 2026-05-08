"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Lightweight scroll-reveal hook using IntersectionObserver.
 * Adds the `.revealed` class to the element when it enters the viewport.
 *
 * Combined with the `.reveal` CSS class (defined in globals.css),
 * this gives flicker-free entry animations because:
 * - CSS hides the element (opacity:0) from the very first paint
 * - No JS sets opacity at hydration time (unlike motion/react)
 * - IntersectionObserver callback simply adds a class to trigger CSS transition
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      {
        threshold: threshold ?? 0.1,
        rootMargin: rootMargin ?? "-40px",
        root,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return ref;
}

/**
 * Observe multiple elements at once for reveal.
 * Returns a callback ref to attach to each element.
 *
 * Elements are buffered in a Set so that refs called before
 * the useEffect (React's commit phase) are still observed
 * once the IntersectionObserver is created.
 */
export function useRevealGroup(options?: IntersectionObserverInit) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pendingRef = useRef<Set<HTMLElement>>(new Set());
  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: threshold ?? 0.1,
        rootMargin: rootMargin ?? "-40px",
        root,
      }
    );

    observerRef.current = observer;

    // Observe any elements that registered before the effect ran
    for (const el of pendingRef.current) {
      observer.observe(el);
    }
    pendingRef.current.clear();

    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  const attachRef = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    if (observerRef.current) {
      // Observer is ready — observe immediately
      observerRef.current.observe(el);
    } else {
      // Observer not yet created — buffer for later
      pendingRef.current.add(el);
    }
  }, []);

  return attachRef;
}
