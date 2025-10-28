'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * FAQ Section Component
 * Displays frequently asked questions in an accessible accordion format
 * Uses shadcn/ui Accordion with Radix UI primitives for full keyboard navigation
 */
export const FAQSection: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-20 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            id="faq-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Часто задаваемые вопросы
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl"
          >
            Всё, что нужно знать о работе с Astra
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            aria-label="Frequently Asked Questions"
          >
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="rounded-lg border border-slate-200 bg-white px-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-semibold text-slate-900 hover:no-underline md:text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2 text-base leading-relaxed text-slate-600 md:text-lg">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="mt-12 text-center md:mt-16"
        >
          <p className="text-lg text-slate-600">
            Остались вопросы?{' '}
            <a
              href="#contact"
              className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Свяжитесь с нами
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
