'use client';

import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Upload, Brain, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOLUTION_STEPS, SOLUTION_SECTION } from '@/lib/constants';
import { useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  screenshot: string;
}

const StepCard: FC<StepCardProps> = ({ number, icon, title, description, screenshot }) => {
  const { ref: cardRef, isInView: cardInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: badgeRef, isInView: badgeInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: iconRef, isInView: iconInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: imageRef, isInView: imageInView } = useScrollTrigger({ threshold: 0.1 });

  // Stagger delays based on step number (1-4)
  const cardDelay = number === 1 ? '' : `animate-delay-${(number - 1) * 150}`;
  const badgeDelay = number === 1 ? 'animate-delay-200' : `animate-delay-${(number - 1) * 150 + 200}`;
  const iconDelay = number === 1 ? 'animate-delay-300' : `animate-delay-${(number - 1) * 150 + 300}`;
  const imageDelay = number === 1 ? 'animate-delay-400' : `animate-delay-${(number - 1) * 150 + 400}`;

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative flex flex-col gap-6 overflow-hidden rounded-xl bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md',
        'animate-on-scroll',
        cardInView && 'animate-fade-in-up',
        cardInView && cardDelay
      )}
      role="listitem"
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* Number Badge */}
      <div className="flex items-start gap-4">
        <div
          ref={badgeRef}
          className={cn(
            'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10',
            'animate-on-scroll',
            badgeInView && 'animate-scale-rotate-in',
            badgeInView && badgeDelay
          )}
          aria-label={`Шаг ${number}`}
        >
          <span className="text-2xl font-bold text-primary">{number}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <div
              ref={iconRef}
              className={cn(
                'text-primary',
                'animate-on-scroll',
                iconInView && 'animate-scale-in',
                iconInView && iconDelay
              )}
              aria-hidden="true"
            >
              {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          </div>

          <p className="leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>

      {/* Screenshot/Illustration */}
      <div
        ref={imageRef}
        className={cn(
          'relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white shadow-sm',
          'animate-on-scroll',
          imageInView && 'animate-scale-in',
          imageInView && imageDelay
        )}
      >
        <Image
          src={screenshot}
          alt={`${title} - скриншот интерфейса`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export const SolutionSection: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: subheadingRef, isInView: subheadingInView } = useScrollTrigger({ threshold: 0.1 });

  const iconComponents = {
    Upload: Upload,
    Brain: Brain,
    FileText: FileText,
    MessageCircle: MessageCircle,
  };

  const stepIcons = SOLUTION_SECTION.icons.map((iconName) => {
    const IconComponent = iconComponents[iconName];
    return <IconComponent key={iconName.toLowerCase()} className="h-6 w-6" />;
  });

  const stepScreenshots = SOLUTION_SECTION.screenshots;

  return (
    <section id="solution" aria-labelledby="solution-heading" className="bg-white py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            id="solution-heading"
            className={cn(
              'mb-4 text-4xl font-bold text-slate-900 md:text-5xl',
              'animate-on-scroll',
              headingInView && 'animate-fade-in-up'
            )}
          >
            {SOLUTION_SECTION.heading}
          </h2>
          <p
            ref={subheadingRef}
            className={cn(
              'mx-auto max-w-3xl text-xl text-slate-600',
              'animate-on-scroll',
              subheadingInView && 'animate-fade-in-up animate-delay-100'
            )}
          >
            {SOLUTION_SECTION.subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2" role="list">
          {SOLUTION_STEPS.map((step, idx) => (
            <StepCard
              key={step.number}
              number={step.number}
              icon={stepIcons[idx]}
              title={step.title}
              description={step.description}
              screenshot={stepScreenshots[idx] || ''}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="#contact">
            <Button variant="primary" size="lg">
              {SOLUTION_SECTION.cta}
            </Button>
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            {SOLUTION_SECTION.ctaSubtext}
          </p>
        </div>
      </div>
    </section>
  );
};
