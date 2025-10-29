'use client';

import { type FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, STATS, TESTIMONIALS_SECTION } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useParallax, useScrollTrigger } from '@/hooks/use-parallax';

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.15 }}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      className="flex h-full flex-col rounded-lg bg-white p-8 shadow-md transition-all hover:shadow-xl"
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
    </motion.div>
  );
};

/**
 * Renders the testimonials section with parallax effects and scroll-triggered animations.
 *
 * This component utilizes the useReducedMotion hook to adjust animations based on user preferences.
 * It implements parallax effects for background elements and triggers animations when the section comes into view.
 * The section includes a header, a stats bar, and a grid of testimonials rendered from the TESTIMONIALS array.
 *
 * @returns A JSX element representing the testimonials section.
 */
export const TestimonialsSection: FC = () => {
  const prefersReducedMotion = useReducedMotion();

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
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            id="testimonials-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            {TESTIMONIALS_SECTION.heading}
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mx-auto mb-8 max-w-3xl text-xl text-slate-600"
          >
            {TESTIMONIALS_SECTION.subheading}
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 p-6"
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
          </motion.div>
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
