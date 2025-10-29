'use client';

import { type FC } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, STATS, TESTIMONIALS_SECTION } from '@/lib/constants';
import { useParallax, useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  companySize: string;
  rating: number;
  avatar: string;
  index: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  companySize,
  rating,
  avatar,
  index,
}) => {
  const { ref: cardRef, isInView: cardInView } = useScrollTrigger({ threshold: 0.1 });

  // Stagger delays for 3 cards: 0ms, 150ms, 300ms
  const cardDelay = index === 0 ? '' : `animate-delay-${index * 150}`;

  return (
    <div
      ref={cardRef}
      className={cn(
        'flex h-full flex-col rounded-lg bg-white p-8 shadow-md transition-all hover:shadow-xl',
        'hover-lift-small animate-on-scroll',
        cardInView && 'animate-fade-in-up',
        cardInView && cardDelay
      )}
    >
      {/* Quote Icon */}
      <div className="mb-4 flex items-start justify-between">
        <Quote className="h-10 w-10 text-primary/20" aria-hidden="true" />

        {/* Rating Stars */}
        <div className="flex gap-1" role="img" aria-label={`Рейтинг: ${rating} из 5 звёзд`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Quote Text */}
      <blockquote className="mb-6 flex-1">
        <p className="text-lg leading-relaxed text-slate-700">{quote}</p>
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
        {/* Avatar Photo */}
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
          <Image
            src={avatar}
            alt={`Фотография ${author}`}
            width={56}
            height={56}
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Author Details */}
        <div className="flex-1">
          <div className="font-bold text-slate-900">{author}</div>
          <div className="text-sm text-slate-600">
            {role} в {company}
          </div>
          <div className="text-xs text-slate-500">{companySize}</div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: subheadingRef, isInView: subheadingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: statsRef, isInView: statsInView } = useScrollTrigger({ threshold: 0.1 });

  // Parallax effects for background decorative elements
  const bgParallax1 = useParallax({ speed: 0.15, enableOnMobile: false });
  const bgParallax2 = useParallax({ speed: 0.35, enableOnMobile: false });

  // Scroll-triggered animation for the entire section
  const { ref: sectionRef, isInView } = useScrollTrigger({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-white py-20"
    >
      {/* Decorative Background Elements with Parallax */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          ref={bgParallax1.ref}
          className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 blur-3xl"
          style={{ transform: bgParallax1.transform }}
        />
        <div
          ref={bgParallax2.ref}
          className="absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 blur-3xl"
          style={{ transform: bgParallax2.transform }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            id="testimonials-heading"
            className={cn(
              'mb-4 text-4xl font-bold text-slate-900 md:text-5xl',
              'animate-on-scroll',
              headingInView && 'animate-fade-in-up'
            )}
          >
            {TESTIMONIALS_SECTION.heading}
          </h2>

          <p
            ref={subheadingRef}
            className={cn(
              'mx-auto mb-8 max-w-3xl text-xl text-slate-600',
              'animate-on-scroll',
              subheadingInView && 'animate-fade-in-up animate-delay-100'
            )}
          >
            {TESTIMONIALS_SECTION.subheading}
          </p>

          {/* Stats Bar */}
          <div
            ref={statsRef}
            className={cn(
              'mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 p-6',
              'animate-on-scroll',
              statsInView && 'animate-fade-in-up animate-delay-200'
            )}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{STATS.companies}</div>
              <div className="text-sm text-slate-600">{TESTIMONIALS_SECTION.statsLabels.companies}</div>
            </div>
            <div className="h-12 w-px bg-slate-300" aria-hidden="true" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{STATS.analyses}</div>
              <div className="text-sm text-slate-600">{TESTIMONIALS_SECTION.statsLabels.analyses}</div>
            </div>
            <div className="h-12 w-px bg-slate-300" aria-hidden="true" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{STATS.quality}</div>
              <div className="text-sm text-slate-600">{TESTIMONIALS_SECTION.statsLabels.quality}</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              companySize={testimonial.companySize}
              rating={testimonial.rating}
              avatar={testimonial.avatar}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
