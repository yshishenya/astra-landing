'use client';

import { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { DemoForm } from './demo-form';
import { ContactForm } from './contact-form';
import { HERO_HEADLINES, CTA_BUTTONS, STATS } from '@/lib/constants';
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
      {/* AI Network Background Pattern */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.1)_0%,transparent_50%)]" />
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
          <p className="mb-10 max-w-3xl text-xl text-white/90 md:text-2xl">
            AI-карьерный помощник для развития сотрудников. 6 методов анализа одновременно. 99.9%
            качество, 162x ROI.
          </p>

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
              <div className="mt-3 text-lg text-white/80">время анализа</div>
            </div>
            <div className="glass-card ai-glow-blue p-8 text-center transition-all hover:scale-105">
              <div className="text-5xl font-bold text-white">{STATS.quality}</div>
              <div className="mt-3 text-lg text-white/80">качество</div>
            </div>
            <div className="glass-card ai-glow-purple p-8 text-center transition-all hover:scale-105">
              <div className="text-5xl font-bold text-white">{STATS.roi}</div>
              <div className="mt-3 text-lg text-white/80">ROI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
