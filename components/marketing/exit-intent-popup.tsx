'use client';

import { type FC, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EXIT_POPUP_CONTENT } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

// Constants
const COOKIE_NAME = 'exit-popup-dismissed';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
const EXIT_THRESHOLD_Y = 10; // pixels from top

// Validation schema
const emailSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа').optional(),
  email: z.string().email('Некорректный email адрес'),
});

type EmailFormValues = z.infer<typeof emailSchema>;

/**
 * Exit Intent Popup Component
 *
 * Detects when user's mouse leaves viewport (desktop only) and shows a lead magnet popup.
 *
 * Features:
 * - Mouse exit detection (top of viewport only)
 * - Desktop only (not shown on mobile/tablet)
 * - Cookie-based persistence (don't show for 7 days if dismissed)
 * - Only shows once per session
 * - Email capture with validation
 * - Focus trap and ESC key support
 * - WCAG 2.1 AA compliant
 *
 * Excludes:
 * - Form pages (pathname check)
 * - Mobile devices (screen width check)
 * - Already dismissed (cookie check)
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <ExitIntentPopup />
 * ```
 */
export const ExitIntentPopup: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasShownRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  // Check if popup should be shown
  const shouldShowPopup = (): boolean => {
    // Check if already shown in this session
    if (hasShownRef.current) {
      return false;
    }

    // Check cookie
    if (Cookies.get(COOKIE_NAME)) {
      return false;
    }

    // Check if mobile (< 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return false;
    }

    // Exclude form pages
    const excludedPaths = ['/contact', '/demo', '/trial', '/calculator'];
    if (excludedPaths.some((path) => pathname.includes(path))) {
      return false;
    }

    return true;
  };

  // Handle mouse leave event
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseLeave = (event: MouseEvent) => {
      // Only trigger when leaving from top of viewport
      if (event.clientY < EXIT_THRESHOLD_Y && shouldShowPopup()) {
        setIsOpen(true);
        hasShownRef.current = true;

        // Calculate time on page
        const pageLoadTime = (window as Window & { __pageLoadTime?: number }).__pageLoadTime;
        const timeOnPage = pageLoadTime ? Date.now() - pageLoadTime : 0;

        // Track exit intent detected
        trackEvent('exit_intent_detected', {
          pathname,
          time_on_page: timeOnPage,
        });
      }
    };

    // Track page load time for analytics
    (window as Window & { __pageLoadTime?: number }).__pageLoadTime = Date.now();

    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [pathname]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => dialog.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Handle close and set cookie
  const handleClose = () => {
    setIsOpen(false);
    Cookies.set(COOKIE_NAME, 'true', { expires: 7 });

    // Track dismissal
    trackEvent('exit_popup_dismissed', {
      submitted: isSubmitted,
      pathname,
    });
  };

  // Handle form submission
  const onSubmit = async (data: EmailFormValues) => {
    setIsSubmitting(true);

    try {
      // Track submission attempt
      trackEvent('exit_intent_popup_submit', {
        email: data.email,
        pathname,
      });

      // TODO: Send to your email service (Resend)
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      setIsSubmitted(true);
      reset();

      // Track success
      trackEvent('exit_intent_popup_success', {
        email: data.email,
        pathname,
      });

      // Close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      // Track error
      trackEvent('exit_intent_popup_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        pathname,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
            aria-describedby="exit-popup-description"
          >
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:hover:bg-gray-800"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Headline */}
                  <h2
                    id="exit-popup-title"
                    className="mb-3 text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {EXIT_POPUP_CONTENT.headline}
                  </h2>

                  {/* Subheadline */}
                  <p
                    id="exit-popup-description"
                    className="mb-6 text-base text-gray-600 dark:text-gray-300"
                  >
                    {EXIT_POPUP_CONTENT.subheadline}
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field (Optional) */}
                    <div className="space-y-2">
                      <Label htmlFor="exit-popup-name">Имя (опционально)</Label>
                      <Input
                        id="exit-popup-name"
                        {...register('name')}
                        placeholder="Иван Иванов"
                        disabled={isSubmitting}
                        className="h-11"
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="exit-popup-email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exit-popup-email"
                        type="email"
                        {...register('email')}
                        placeholder={EXIT_POPUP_CONTENT.emailPlaceholder}
                        disabled={isSubmitting}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        className="h-11"
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Отправка...' : EXIT_POPUP_CONTENT.buttonText}
                    </Button>

                    {/* Privacy Note */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {EXIT_POPUP_CONTENT.privacyNote}
                    </p>
                  </form>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <svg
                        className="h-8 w-8 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {EXIT_POPUP_CONTENT.successMessage}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Мы отправили вам чеклист на указанный email адрес
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
