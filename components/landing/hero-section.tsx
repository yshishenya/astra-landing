'use client';

import { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { DemoForm } from './demo-form';
import { ContactForm } from './contact-form';
import { HERO_HEADLINES, HERO_SUBHEADLINE, CTA_BUTTONS, STATS, STATS_LABELS } from '@/lib/constants';
import { trackCTAClick } from '@/lib/analytics';

/**
 * Hero Section Component
 *
 * The main landing section with headline, CTAs, and stats
 *
 * Features:
 * - Primary and secondary CTA buttons with analytics tracking
 * - 3 key stats (analysis time, quality, ROI)
 * - Gradient background with animated patterns
 * - Glassmorphism effects on stat cards
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 */
export const HeroSection: FC = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="gradient-hero section-spacing relative overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={(e) => {
            // Hide video element if it fails to load, gradient background will show
            e.currentTarget.style.display = 'none';
            console.warn('Hero background video failed to load, using gradient fallback');
          }}
          className="h-full w-full object-cover opacity-20"
          poster="/images/screenshots/pdf-preview.svg"
        >
          <source src="/videos/hero-demo-optimized.mp4" type="video/mp4" />
          <source src="/videos/hero-demo-optimized.webm" type="video/webm" />
          {/* Fallback gradient background if video fails to load */}
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/80" />
      </div>

      {/* AI Network Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.15)_0%,transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex min-h-[85vh] flex-col items-center justify-center text-center">
          {/* Headline */}
          <h1
            id="hero-heading"
            className="mb-6 font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          >
            {HERO_HEADLINES[0]}
          </h1>
          <p className="mb-10 max-w-3xl text-xl text-white/90 md:text-2xl">{HERO_SUBHEADLINE}</p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col gap-4 sm:flex-row">
            <DemoForm
              variant="primary"
              trigger={
                <Button
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                  onClick={() =>
                    trackCTAClick('start_trial', 'hero', { button_text: CTA_BUTTONS.primary })
                  }
                >
                  {CTA_BUTTONS.primary}
                </Button>
              }
            />
            <ContactForm
              variant="outline"
              trigger={
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg"
                  onClick={() =>
                    trackCTAClick('contact_us', 'hero', { button_text: CTA_BUTTONS.secondary })
                  }
                >
                  {CTA_BUTTONS.secondary}
                </Button>
              }
            />
          </div>

          {/* Stats with Glassmorphism */}
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="glass-card ai-glow-cyan p-8 text-center transition-all hover:scale-105">
              <div className="text-5xl font-bold text-white">{STATS.analysisTime}</div>
              <div className="mt-3 text-lg text-white/80">{STATS_LABELS.analysisTime}</div>
            </div>
            <div className="glass-card ai-glow-blue p-8 text-center transition-all hover:scale-105">
              <div className="text-5xl font-bold text-white">{STATS.quality}</div>
              <div className="mt-3 text-lg text-white/80">{STATS_LABELS.quality}</div>
            </div>
            <div className="glass-card ai-glow-purple p-8 text-center transition-all hover:scale-105">
              <div className="text-5xl font-bold text-white">{STATS.roi}</div>
              <div className="mt-3 text-lg text-white/80">{STATS_LABELS.roi}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
