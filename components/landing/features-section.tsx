'use client';

import { type FC } from 'react';
import { Target, Grid3x3, Users, Calendar, Star, Brain } from 'lucide-react';
import { FEATURES } from '@/lib/constants';
import { useParallax, useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

type ColorTheme = 'green' | 'blue' | 'purple' | 'orange' | 'teal' | 'indigo';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  color: ColorTheme;
  index: number;
}

const colorClasses: Record<ColorTheme, { bg: string; text: string; iconBg: string }> = {
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    iconBg: 'bg-purple-100',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    iconBg: 'bg-orange-100',
  },
  teal: {
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    iconBg: 'bg-teal-100',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
  },
};

const FeatureCard: FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  example,
  color,
  index,
}) => {
  const { ref: cardRef, isInView: cardInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: iconRef, isInView: iconInView } = useScrollTrigger({ threshold: 0.1 });
  const colors = colorClasses[color];

  // Stagger delays: 0ms, 100ms, 200ms, 300ms, 400ms, 500ms (6 cards)
  const cardDelay = index === 0 ? '' : `animate-delay-${index * 100}`;
  const iconDelay = index === 0 ? 'animate-delay-200' : `animate-delay-${index * 100 + 200}`;

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-xl',
        'hover-lift animate-on-scroll',
        cardInView && 'animate-fade-in-up',
        cardInView && cardDelay
      )}
    >
      {/* Icon Container */}
      <div
        ref={iconRef}
        className={cn(
          `mb-6 flex h-20 w-20 items-center justify-center rounded-lg ${colors.iconBg}`,
          'animate-on-scroll',
          iconInView && 'animate-scale-rotate-in',
          iconInView && iconDelay
        )}
      >
        <div className={colors.text} aria-hidden="true">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-bold text-slate-900">{title}</h3>

      {/* Description */}
      <p className="mb-4 leading-relaxed text-slate-600">{description}</p>

      {/* Example */}
      <div className={`rounded-lg ${colors.bg} p-4`}>
        <p className={`text-sm font-semibold ${colors.text}`}>
          <span className="font-normal text-slate-600">Пример: </span>
          {example}
        </p>
      </div>
    </div>
  );
};

const FEATURE_ICONS = [
  <Target key="target" className="h-12 w-12" />,
  <Grid3x3 key="grid" className="h-12 w-12" />,
  <Users key="users" className="h-12 w-12" />,
  <Calendar key="calendar" className="h-12 w-12" />,
  <Star key="star" className="h-12 w-12" />,
  <Brain key="brain" className="h-12 w-12" />,
] as const;

export const FeaturesSection: FC = () => {
  // Parallax effects for background decorative elements
  const bgParallax1 = useParallax({ speed: 0.2, enableOnMobile: false });
  const bgParallax2 = useParallax({ speed: 0.4, enableOnMobile: false });

  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: subheadingRef, isInView: subheadingInView } = useScrollTrigger({ threshold: 0.1 });

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative overflow-hidden bg-slate-50 py-20"
    >
      {/* Decorative Background Elements with Parallax */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div
          ref={bgParallax1.ref}
          className="absolute left-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl"
          style={{ transform: bgParallax1.transform }}
        />
        <div
          ref={bgParallax2.ref}
          className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-teal-200 to-green-200 blur-3xl"
          style={{ transform: bgParallax2.transform }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            id="features-heading"
            className={cn(
              'mb-4 text-4xl font-bold text-slate-900 md:text-5xl',
              'animate-on-scroll',
              headingInView && 'animate-fade-in-up'
            )}
          >
            6 Методов Анализа в Один Клик
          </h2>
          <p
            ref={subheadingRef}
            className={cn(
              'mx-auto max-w-3xl text-xl text-slate-600',
              'animate-on-scroll',
              subheadingInView && 'animate-fade-in-up animate-delay-100'
            )}
          >
            Комплексный анализ, который обычно требует недель работы с психологами и
            карьерными консультантами
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={FEATURE_ICONS[index]}
              title={feature.title}
              description={feature.description}
              example={feature.example}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
