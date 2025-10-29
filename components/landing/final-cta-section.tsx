'use client';

import { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { FINAL_CTA, STATS } from '@/lib/constants';
import { useScrollTrigger } from '@/hooks/use-parallax';
import { DemoForm } from './demo-form';
import { ContactForm } from './contact-form';
import { trackCTAClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Trust badge item interface
 */
interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
  index: number;
}

/**
 * Trust Badge Component
 * Displays a trust indicator with icon and text
 */
const TrustBadge: FC<TrustBadgeProps> = ({ icon, text, index }) => {
  const { ref, isInView } = useScrollTrigger({ threshold: 0.1 });

  // Stagger delays: 0ms, 100ms, 200ms (3 badges)
  const delay = index === 0 ? '' : `animate-delay-${index * 100}`;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3',
        'animate-on-scroll',
        isInView && 'animate-fade-in-left',
        isInView && delay
      )}
    >
      <div className="flex-shrink-0 text-white/90" aria-hidden="true">
        {icon}
      </div>
      <span className="text-base font-medium text-white/90 md:text-lg">{text}</span>
    </div>
  );
};

/**
 * Final CTA Section Component
 * Ultimate conversion section with gradient background and multiple call-to-actions
 * Includes trust badges and compelling copy to drive conversions
 */
export const FinalCTASection: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: subheadingRef, isInView: subheadingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: buttonsRef, isInView: buttonsInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: badgesRef, isInView: badgesInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: statsRef, isInView: statsInView } = useScrollTrigger({ threshold: 0.1 });

  const trustBadges = FINAL_CTA.trustBadges.map((badge) => ({
    icon: <CheckCircle2 className="h-6 w-6" />,
    text: badge.text,
  }));

  return (
    <section
      id="cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 md:py-24 lg:py-32"
    >
      {/* Background Pattern/Effects */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      {/* Animated gradient orbs with CSS infinite animation */}
      <div
        className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-white blur-3xl animate-pulse-orb"
        aria-hidden="true"
      />
      <div
        className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-white blur-3xl animate-pulse-orb-delayed"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Headline */}
          <h2
            ref={headingRef}
            id="final-cta-heading"
            className={cn(
              'mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl',
              'animate-on-scroll',
              headingInView && 'animate-fade-in-up'
            )}
          >
            {FINAL_CTA.headline}
          </h2>

          {/* Subheadline */}
          <p
            ref={subheadingRef}
            className={cn(
              'mb-12 text-xl text-white/90 md:text-2xl',
              'animate-on-scroll',
              subheadingInView && 'animate-fade-in-up animate-delay-100'
            )}
          >
            {FINAL_CTA.subheadline}
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className={cn(
              'mb-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6',
              'animate-on-scroll',
              buttonsInView && 'animate-fade-in-up animate-delay-200'
            )}
          >
            {/* Primary CTA - Demo Form */}
            <div className="rounded-lg animate-pulse-shadow">
              <DemoForm
                trigger={
                  <Button
                    size="lg"
                    variant="accent"
                    className="group relative overflow-hidden bg-white text-lg font-bold text-primary shadow-2xl hover:bg-white/95 hover:scale-105 active:scale-95 transition-transform"
                    onClick={() => trackCTAClick('start_trial', 'final_cta', { button_text: FINAL_CTA.buttons.primary.text })}
                  >
                    {FINAL_CTA.buttons.primary.text}
                    <ArrowRight
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                }
              />
            </div>

            {/* Secondary CTA - Demo Form */}
            <div>
              <DemoForm
                trigger={
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white bg-transparent text-lg font-semibold text-white hover:bg-white hover:text-primary hover:scale-105 active:scale-95 transition-transform"
                    onClick={() => trackCTAClick('book_demo', 'final_cta', { button_text: FINAL_CTA.buttons.secondary.text })}
                  >
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    {FINAL_CTA.buttons.secondary.text}
                  </Button>
                }
              />
            </div>

            {/* Tertiary CTA - Contact Form */}
            <div>
              <ContactForm
                trigger={
                  <Button
                    size="lg"
                    variant="link"
                    className="text-lg font-semibold text-white underline-offset-4 hover:text-white/90 hover:scale-105 active:scale-95 transition-transform"
                    onClick={() => trackCTAClick('contact_us', 'final_cta', { button_text: FINAL_CTA.buttons.tertiary.text })}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                    {FINAL_CTA.buttons.tertiary.text}
                  </Button>
                }
              />
            </div>
          </div>

          {/* Trust Badges */}
          <div
            ref={badgesRef}
            className={cn(
              'flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12',
              'animate-on-scroll',
              badgesInView && 'animate-fade-in-up animate-delay-300'
            )}
          >
            {trustBadges.map((badge, index) => (
              <TrustBadge key={index} icon={badge.icon} text={badge.text} index={index} />
            ))}
          </div>

          {/* Social Proof Stats */}
          <div
            ref={statsRef}
            className={cn(
              'mt-12 border-t border-white/20 pt-8',
              'animate-on-scroll',
              statsInView && 'animate-fade-in-up animate-delay-400'
            )}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <div className="mb-2 text-4xl font-bold text-white">{STATS.companies}</div>
                <div className="text-base text-white/80">Компаний доверяют нам</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-white">{STATS.analyses}</div>
                <div className="text-base text-white/80">Анализов проведено</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-white">{STATS.roi}</div>
                <div className="text-base text-white/80">Возврат инвестиций</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
