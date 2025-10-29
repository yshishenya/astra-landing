'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { Users, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PAIN_POINTS } from '@/lib/constants';
import { useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

interface PainCardProps {
  icon: React.ReactNode;
  stat: string;
  title: string;
  description: string;
  cost: string;
  ctaHref: string;
  ctaText: string;
  index: number;
}

const PainCard: FC<PainCardProps> = ({
  icon,
  stat,
  title,
  description,
  cost,
  ctaHref,
  ctaText,
  index,
}) => {
  const { ref: cardRef, isInView: cardInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: iconRef, isInView: iconInView } = useScrollTrigger({ threshold: 0.1 });

  // Animation: enter from left for even indices, right for odd
  const enterAnimation = index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right';

  // Stagger delays: 0ms, 150ms, 300ms
  const cardDelay = index === 0 ? '' : index === 1 ? 'animate-delay-150' : 'animate-delay-300';
  const iconDelay = index === 0 ? 'animate-delay-200' : index === 1 ? 'animate-delay-350' : 'animate-delay-450';

  return (
    <div
      ref={cardRef}
      className={cn(
        'group rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-xl',
        'hover-lift animate-on-scroll',
        cardInView && enterAnimation,
        cardInView && cardDelay
      )}
    >
      {/* Icon */}
      <div
        ref={iconRef}
        className={cn(
          'mb-6 flex justify-center',
          'animate-on-scroll',
          iconInView && 'animate-scale-in',
          iconInView && iconDelay
        )}
      >
        {icon}
      </div>

      {/* Stat and Title */}
      <div className="mb-4 text-center">
        <div className="mb-2 text-3xl font-bold text-orange-600">{stat}</div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Description */}
      <p className="mb-6 leading-relaxed text-slate-600">{description}</p>

      {/* Cost Box */}
      <div className="mb-6 rounded-lg bg-orange-50 p-4">
        <p className="text-sm font-semibold text-orange-900">{cost}</p>
      </div>

      {/* CTA Link */}
      <Link
        href={ctaHref}
        className="flex items-center justify-center gap-2 font-semibold text-primary transition-all hover:gap-3"
        aria-label={`${ctaText} для проблемы: ${title}`}
      >
        {ctaText} <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
};

export const ProblemSection: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: subheadingRef, isInView: subheadingInView } = useScrollTrigger({ threshold: 0.1 });

  const painCards = [
    {
      id: 'turnover',
      icon: <Users className="h-16 w-16 text-orange-500" />,
      stat: PAIN_POINTS[0].stat,
      title: PAIN_POINTS[0].title,
      description: PAIN_POINTS[0].description,
      cost: PAIN_POINTS[0].cost,
      ctaHref: '#roi-calculator',
      ctaText: 'Посчитать ваши потери',
    },
    {
      id: 'time-consuming',
      icon: <Clock className="h-16 w-16 text-orange-500" />,
      stat: PAIN_POINTS[1].stat,
      title: PAIN_POINTS[1].title,
      description: PAIN_POINTS[1].description,
      cost: PAIN_POINTS[1].cost,
      ctaHref: '#solution',
      ctaText: 'Как Астра это решает',
    },
    {
      id: 'cost',
      icon: <DollarSign className="h-16 w-16 text-orange-500" />,
      stat: PAIN_POINTS[2].stat,
      title: PAIN_POINTS[2].title,
      description: PAIN_POINTS[2].description,
      cost: PAIN_POINTS[2].cost,
      ctaHref: '#roi-calculator',
      ctaText: 'Калькулятор потерь',
    },
  ];

  return (
    <section aria-labelledby="problem-heading" className="bg-slate-50 py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            id="problem-heading"
            className={cn(
              'mb-4 text-4xl font-bold text-slate-900 md:text-5xl',
              'animate-on-scroll',
              headingInView && 'animate-fade-in-up'
            )}
          >
            Почему Ваши Лучшие Люди Уходят
          </h2>
          <p
            ref={subheadingRef}
            className={cn(
              'mx-auto max-w-3xl text-xl text-slate-600',
              'animate-on-scroll',
              subheadingInView && 'animate-fade-in-up animate-delay-100'
            )}
          >
            HR-директора тратят сотни часов на карьерные запросы, но всё равно теряют
            топ-таланты. Вот почему.
          </p>
        </div>

        {/* Pain Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {painCards.map((pain, index) => (
            <PainCard key={pain.id} {...pain} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="#roi-calculator">
            <Button variant="primary" size="lg">
              Запустить Калькулятор Потерь
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
