'use client';

import { type FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/lib/constants';
import { useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

/**
 * FAQ Section Component
 * Displays frequently asked questions in an accessible accordion format
 * Uses shadcn/ui Accordion with Radix UI primitives for full keyboard navigation
 */
export const FAQSection: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: subheadingRef, isInView: subheadingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: accordionRef, isInView: accordionInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: ctaRef, isInView: ctaInView } = useScrollTrigger({ threshold: 0.1 });

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-20 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2
            ref={headingRef}
            id="faq-heading"
            className={cn(
              'mb-4 text-4xl font-bold text-slate-900 md:text-5xl',
              'animate-on-scroll',
              headingInView && 'animate-fade-in-up'
            )}
          >
            Часто задаваемые вопросы
          </h2>
          <p
            ref={subheadingRef}
            className={cn(
              'mx-auto max-w-3xl text-lg text-slate-600 md:text-xl',
              'animate-on-scroll',
              subheadingInView && 'animate-fade-in-up animate-delay-100'
            )}
          >
            Всё, что нужно знать о работе с Astra
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          ref={accordionRef}
          className={cn(
            'mx-auto max-w-4xl',
            'animate-on-scroll',
            accordionInView && 'animate-fade-in-up animate-delay-200'
          )}
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
        </div>

        {/* Additional CTA */}
        <div
          ref={ctaRef}
          className={cn(
            'mt-12 text-center md:mt-16',
            'animate-on-scroll',
            ctaInView && 'animate-fade-in-up animate-delay-300'
          )}
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
        </div>
      </div>
    </section>
  );
};
