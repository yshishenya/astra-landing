'use client';

import { useEffect, type FC, type ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Smooth Scroll Provider Component
 *
 * Implements Lenis smooth scrolling globally for premium feel.
 *
 * Features:
 * - Smooth scroll with easing
 * - Performance optimized with RAF (requestAnimationFrame)
 * - Respects prefers-reduced-motion
 * - Auto-cleanup on unmount
 *
 * @example
 * ```tsx
 * <SmoothScrollProvider>
 *   <App />
 * </SmoothScrollProvider>
 * ```
 */
export const SmoothScrollProvider: FC<SmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Don't enable smooth scroll if user prefers reduced motion
      return;
    }

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easeout expo
      smoothWheel: true, // Smooth wheel scrolling
      wheelMultiplier: 1, // Scroll speed multiplier
      touchMultiplier: 2, // Touch scroll multiplier
    });

    // Request Animation Frame for smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
