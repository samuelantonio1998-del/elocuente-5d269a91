import { useEffect } from "react";

/**
 * Desktop-only, non-intrusive smooth scroll using Lenis.
 * - Disabled on mobile / touch devices (native scroll preserved).
 * - Disabled when prefers-reduced-motion is set.
 * - Fails silently: if Lenis fails to load, native scroll continues to work.
 * - The user is never trapped: Lenis only smooths the wheel, it never locks scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 1023px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isSmallScreen || prefersReduced) return;

    let lenis: import("lenis").default | null = null;
    let rafId = 0;
    let cancelled = false;

    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        lenis = new Lenis({
          duration: 1.05,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // fall back to native scroll
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
