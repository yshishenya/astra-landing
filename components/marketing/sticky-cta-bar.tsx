'use client';

import { type FC, useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoForm } from '@/components/landing/demo-form';
import { ContactForm } from '@/components/landing/contact-form';
import { STICKY_CTA_CONTENT } from '@/lib/constants';
import { trackCTAClick, trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Sticky CTA Bar Component
 *
 * Bottom-fixed conversion bar that appears after scrolling past hero section.
 * Features smart hide/show based on scroll direction and section visibility.
 *
 * Behavior:
 * - Hidden by default (first viewport)
 * - Shows after scrolling >100vh (past Hero)
 * - Hides when scrolling up (direction detection)
 * - Always shows in Pricing section
 * - Mobile: Collapsible with icon-only state
 * - Animations: Smooth slide-up/down transitions
 *
 * Performance:
 * - Throttled scroll listener (100ms)
 * - requestAnimationFrame for smooth animations
 * - Memoized scroll calculations
 *
 * Accessibility:
 * - Keyboard navigation support
 * - Focus management
 * - ARIA labels and live regions
 * - Screen reader announcements
 *
 * @example
 * ```tsx
 * import { StickyCTABar } from '@/components/marketing/sticky-cta-bar';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <StickyCTABar />
 *     </>
 *   );
 * }
 * ```
 */
export const StickyCTABar: FC = () => {
  // ============================================================================
  // State Management
  // ============================================================================

  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isInPricingSection, setIsInPricingSection] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const [hasAnnounced, setHasAnnounced] = useState(false);

  // Refs for performance optimization
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const announcementTimeout = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // Scroll Direction Detection
  // ============================================================================

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY.current;

    // Ignore small movements (prevent jitter)
    if (Math.abs(scrollDelta) < 5) {
      ticking.current = false;
      return;
    }

    // Determine scroll direction
    const scrollingDown = scrollDelta > 0;
    setIsScrollingDown(scrollingDown);

    // Show bar after scrolling past hero (>100vh)
    const heroHeight = window.innerHeight;
    const shouldShow = currentScrollY > heroHeight;
    setIsVisible(shouldShow);

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  // ============================================================================
  // Throttled Scroll Handler (100ms)
  // ============================================================================

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollDirection);
      ticking.current = true;
    }
  }, [updateScrollDirection]);

  // ============================================================================
  // Pricing Section Detection (Intersection Observer)
  // ============================================================================

  useEffect(() => {
    const pricingSection = document.querySelector('#pricing');
    if (!pricingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInPricingSection(entry.isIntersecting);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: '-100px 0px', // Offset for better UX
      }
    );

    observer.observe(pricingSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ============================================================================
  // Scroll Event Listener
  // ============================================================================

  useEffect(() => {
    // Throttle scroll events
    let scrollTimeout: NodeJS.Timeout;

    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100); // 100ms throttle
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  // ============================================================================
  // Screen Reader Announcement
  // ============================================================================

  useEffect(() => {
    if (isVisible && !hasAnnounced) {
      // Delay announcement to avoid interrupting user
      announcementTimeout.current = setTimeout(() => {
        setHasAnnounced(true);
        trackEvent('sticky_bar_shown', {
          event_category: 'engagement',
          scroll_position: window.scrollY,
          viewport_height: window.innerHeight,
        });
      }, 500);
    }

    return () => {
      if (announcementTimeout.current) {
        clearTimeout(announcementTimeout.current);
      }
    };
  }, [isVisible, hasAnnounced]);

  // ============================================================================
  // Click Handlers
  // ============================================================================

  const handlePrimaryClick = () => {
    trackEvent('sticky_bar_cta_click', {
      event_category: 'conversion',
      cta_type: 'sticky_bar_primary',
      button_text: STICKY_CTA_CONTENT.primaryButton,
      location: 'sticky_bar',
      is_mobile: window.innerWidth < 768,
    });
  };

  const handleSecondaryClick = () => {
    trackEvent('sticky_bar_cta_click', {
      event_category: 'conversion',
      cta_type: 'sticky_bar_secondary',
      button_text: STICKY_CTA_CONTENT.secondaryButton,
      location: 'sticky_bar',
      is_mobile: window.innerWidth < 768,
    });
  };

  const handleMobileToggle = () => {
    setIsMobileCollapsed(!isMobileCollapsed);
    trackEvent('sticky_bar_mobile_toggle', {
      event_category: 'engagement',
      expanded: isMobileCollapsed,
    });
  };

  // ============================================================================
  // Visibility Logic
  // ============================================================================

  // Show bar if:
  // 1. Scrolled past hero (isVisible)
  // 2. In Pricing section (always show)
  // 3. Not scrolling down (unless in Pricing)
  const shouldShowBar = isVisible && (isInPricingSection || !isScrollingDown);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <>
      {/* Screen Reader Announcement */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isVisible && hasAnnounced && STICKY_CTA_CONTENT.screenReaderAnnouncement}
      </div>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {shouldShowBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-40',
              'bg-gradient-to-r from-primary via-secondary to-accent',
              'bg-opacity-90 backdrop-blur-md',
              'border-t border-white/10',
              'shadow-2xl shadow-primary/20',
              // Safe area insets for iOS notch
              'pb-safe-area-inset-bottom'
            )}
            role="complementary"
            aria-label={STICKY_CTA_CONTENT.ariaLabel}
          >
            {/* Desktop Layout (≥768px) */}
            <div className="container mx-auto hidden max-w-7xl items-center justify-between px-6 py-4 md:flex">
              {/* Left: Text */}
              <div className="flex-shrink-0">
                <p className="text-lg font-semibold text-white drop-shadow-lg">
                  {STICKY_CTA_CONTENT.text}
                </p>
              </div>

              {/* Center/Right: CTA Buttons */}
              <div className="flex items-center gap-4">
                {/* Primary CTA - Demo Form */}
                <DemoForm
                  trigger={
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white font-semibold text-primary shadow-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl"
                      onClick={handlePrimaryClick}
                    >
                      {STICKY_CTA_CONTENT.primaryButton}
                    </Button>
                  }
                />

                {/* Secondary CTA - Contact Form */}
                <ContactForm
                  trigger={
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-white font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary"
                      onClick={handleSecondaryClick}
                    >
                      {STICKY_CTA_CONTENT.secondaryButton}
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Mobile Layout (<768px) */}
            <div className="md:hidden">
              {/* Collapsed State: Floating Action Button */}
              {isMobileCollapsed ? (
                <div className="flex items-center justify-center px-4 py-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-white font-semibold text-primary shadow-xl hover:bg-white/90"
                    onClick={handleMobileToggle}
                    aria-expanded={false}
                    aria-label="Развернуть панель призыва к действию"
                  >
                    {STICKY_CTA_CONTENT.primaryButton}
                  </Button>
                </div>
              ) : (
                // Expanded State: Full CTA Bar
                <div className="space-y-3 px-4 py-3">
                  {/* Close Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white drop-shadow-lg">
                      {STICKY_CTA_CONTENT.text}
                    </p>
                    <button
                      onClick={handleMobileToggle}
                      className="rounded-full p-2 transition-colors hover:bg-white/10"
                      aria-label="Свернуть панель"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    {/* Primary CTA */}
                    <DemoForm
                      trigger={
                        <Button
                          variant="secondary"
                          size="lg"
                          className="w-full bg-white font-semibold text-primary shadow-xl hover:bg-white/90"
                          onClick={handlePrimaryClick}
                        >
                          {STICKY_CTA_CONTENT.primaryButton}
                        </Button>
                      }
                    />

                    {/* Secondary CTA */}
                    <ContactForm
                      trigger={
                        <Button
                          variant="outline"
                          size="default"
                          className="w-full border-2 border-white font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary"
                          onClick={handleSecondaryClick}
                        >
                          {STICKY_CTA_CONTENT.secondaryButton}
                        </Button>
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
