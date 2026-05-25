// lib/gsap.ts — GSAP setup and reusable hooks
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins once at module load
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Global defaults
  gsap.defaults({
    ease: 'expo.out',
    duration: 0.8,
  });
}

export { gsap, ScrollTrigger, SplitText };

/**
 * useGSAP — hook to run a GSAP setup function once on mount.
 *
 * Usage:
 *   useGSAP((gsap, ScrollTrigger, SplitText) => {
 *     const ctx = gsap.context(() => {
 *       gsap.to(...);
 *     }, scopeRef);
 *     return () => ctx.revert();
 *   });
 */
export function useGSAP(
  setup: (
    g: typeof gsap,
    st: typeof ScrollTrigger,
    split: typeof SplitText,
  ) => void | (() => void),
) {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    cleanupRef.current = setup(gsap, ScrollTrigger, SplitText);
    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
