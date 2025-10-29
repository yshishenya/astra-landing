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

    // Store RAF ID for cleanup and pause/resume
    let rafId: number;

    // Request Animation Frame for smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    // Pause RAF when page is hidden to save battery and CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs) - cancel RAF to save resources
        cancelAnimationFrame(rafId);
      } else {
        // Page is visible again - resume RAF loop
        rafId = requestAnimationFrame(raf);
      }
    };

    // Start RAF loop
    rafId = requestAnimationFrame(raf);

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
