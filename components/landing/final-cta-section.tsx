'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { FINAL_CTA, STATS } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
      className="flex items-center gap-3"
    >
      <div className="flex-shrink-0 text-white/90" aria-hidden="true">
        {icon}
      </div>
      <span className="text-base font-medium text-white/90 md:text-lg">{text}</span>
    </motion.div>
  );
};

/**
 * Final CTA Section Component
 * Ultimate conversion section with gradient background and multiple call-to-actions
 * Includes trust badges and compelling copy to drive conversions
 */
export const FinalCTASection: FC = () => {
  const prefersReducedMotion = useReducedMotion();
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

      {/* Animated gradient orbs */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={prefersReducedMotion ? {} : { opacity: 0.1, scale: 1 }}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 2, repeat: Infinity, repeatType: 'reverse' }
        }
        className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-white blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={prefersReducedMotion ? {} : { opacity: 0.1, scale: 1 }}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 2, delay: 1, repeat: Infinity, repeatType: 'reverse' }
        }
        className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-white blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Headline */}
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            id="final-cta-heading"
            className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            {FINAL_CTA.headline}
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mb-12 text-xl text-white/90 md:text-2xl"
          >
            {FINAL_CTA.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="mb-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      boxShadow: [
                        '0 0 20px rgba(255, 255, 255, 0.3)',
                        '0 0 40px rgba(255, 255, 255, 0.5)',
                        '0 0 20px rgba(255, 255, 255, 0.3)',
                      ],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      boxShadow: { duration: 2, repeat: Infinity },
                      scale: { duration: 0.2 },
                    }
              }
              className="rounded-lg"
            >
              <a href={FINAL_CTA.buttons.primary.href}>
                <Button
                  size="lg"
                  variant="accent"
                  className="group relative overflow-hidden bg-white text-lg font-bold text-primary shadow-2xl hover:bg-white/95"
                >
                  {FINAL_CTA.buttons.primary.text}
                  <ArrowRight
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <a href={FINAL_CTA.buttons.secondary.href}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-lg font-semibold text-white hover:bg-white hover:text-primary"
                >
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  {FINAL_CTA.buttons.secondary.text}
                </Button>
              </a>
            </motion.div>

            {/* Tertiary CTA */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <a href={FINAL_CTA.buttons.tertiary.href}>
                <Button
                  size="lg"
                  variant="link"
                  className="text-lg font-semibold text-white underline-offset-4 hover:text-white/90"
                >
                  <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                  {FINAL_CTA.buttons.tertiary.text}
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12"
          >
            {trustBadges.map((badge, index) => (
              <TrustBadge key={index} icon={badge.icon} text={badge.text} index={index} />
            ))}
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
            className="mt-12 border-t border-white/20 pt-8"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
