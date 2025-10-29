'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for parallax scrolling effects
 *
 * @param speed - Parallax speed multiplier (default: 0.5)
 * @param enableOnMobile - Enable parallax on mobile devices (default: false for performance)
 * @returns Object with parallax transform value and element ref
 *
 * @example
 * ```tsx
 * const { ref, transform } = useParallax({ speed: 0.5 });
 * return <div ref={ref} style={{ transform }}></div>
 * ```
 */
interface UseParallaxOptions {
  speed?: number;
  enableOnMobile?: boolean;
}

export function useParallax({ speed = 0.5, enableOnMobile = false }: UseParallaxOptions = {}) {
  const [transform, setTransform] = useState<string>('translateY(0px)');
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if mobile and parallax is disabled on mobile
    if (!enableOnMobile && window.innerWidth < 768) return;

    // PERFORMANCE: Throttle parallax updates to 20fps (50ms) instead of 60fps
    const THROTTLE_MS = 50;
    let ticking = false;

    const updateTransform = () => {
      if (!ref.current) return;

      const now = performance.now();
      const timeSinceLastUpdate = now - lastUpdateRef.current;

      // Throttle: Only update every THROTTLE_MS
      if (timeSinceLastUpdate < THROTTLE_MS) {
        ticking = false;
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      // Only apply parallax when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (scrolled - elementTop + windowHeight) * speed;
        setTransform(`translateY(${offset}px)`);
      }

      lastUpdateRef.current = now;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(updateTransform);
      }
    };

    // Initial calculation
    updateTransform();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, enableOnMobile]);

  return { ref, transform };
}

/**
 * Hook for scroll-triggered animations (fade in, slide up, etc.)
 *
 * @param threshold - Intersection observer threshold (default: 0.1)
 * @param triggerOnce - Trigger animation only once (default: true)
 * @returns Object with ref and isInView state
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useScrollTrigger();
 * return <div ref={ref} className={isInView ? 'animate-fade-in' : ''}></div>
 * ```
 */
interface UseScrollTriggerOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollTrigger({
  threshold = 0.1,
  triggerOnce = true,
}: UseScrollTriggerOptions = {}) {
  const [isInView, setIsInView] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true); // Always show content if reduced motion
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, isInView };
}

/**
 * Hook for mouse parallax effect (elements follow mouse movement)
 *
 * @param strength - Movement strength multiplier (default: 20)
 * @returns Object with ref and transform value
 *
 * @example
 * ```tsx
 * const { ref, transform } = useMouseParallax({ strength: 30 });
 * return <div ref={ref} style={{ transform }}></div>
 * ```
 */
interface UseMouseParallaxOptions {
  strength?: number;
}

export function useMouseParallax({ strength = 20 }: UseMouseParallaxOptions = {}) {
  const [transform, setTransform] = useState<string>('translate(0px, 0px)');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Only on desktop
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) / rect.width;
      const deltaY = (event.clientY - centerY) / rect.height;

      const moveX = deltaX * strength;
      const moveY = deltaY * strength;

      setTransform(`translate(${moveX}px, ${moveY}px)`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);

  return { ref, transform };
}
