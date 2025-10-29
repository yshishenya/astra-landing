'use client';

import { type FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building, UserPlus, Check } from 'lucide-react';
import { USE_CASES, USE_CASES_SECTION } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useParallax, useScrollTrigger } from '@/hooks/use-parallax';

type ColorTheme = 'green' | 'blue' | 'purple' | 'orange';

interface UseCaseCardProps {
  title: string;
  problem: string;
  solution: readonly string[];
  result: string;
  icon: React.ReactNode;
  illustration: string;
  color: ColorTheme;
  index: number;
}

const colorClasses: Record<
  ColorTheme,
  {
    bg: string;
    text: string;
    iconBg: string;
    resultBg: string;
    resultText: string;
    checkBg: string;
    checkText: string;
    border: string;
  }
> = {
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    iconBg: 'bg-green-100',
    resultBg: 'bg-green-100',
    resultText: 'text-green-700',
    checkBg: 'bg-green-100',
    checkText: 'text-green-600',
    border: 'border-green-200',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    iconBg: 'bg-blue-100',
    resultBg: 'bg-blue-100',
    resultText: 'text-blue-700',
    checkBg: 'bg-blue-100',
    checkText: 'text-blue-600',
    border: 'border-blue-200',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    iconBg: 'bg-purple-100',
    resultBg: 'bg-purple-100',
    resultText: 'text-purple-700',
    checkBg: 'bg-purple-100',
    checkText: 'text-purple-600',
    border: 'border-purple-200',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    iconBg: 'bg-orange-100',
    resultBg: 'bg-orange-100',
    resultText: 'text-orange-700',
    checkBg: 'bg-orange-100',
    checkText: 'text-orange-600',
    border: 'border-orange-200',
  },
};

const UseCaseCard: FC<UseCaseCardProps> = ({
  title,
  problem,
  solution,
  result,
  icon,
  illustration,
  color,
  index,
}) => {
  const colors = colorClasses[color];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.15 }}
      whileHover={prefersReducedMotion ? {} : { y: -12, scale: 1.02 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 ${colors.border} bg-white shadow-lg transition-all hover:shadow-2xl`}
    >
      {/* Background Illustration */}
      <div className="absolute right-0 top-0 h-48 w-48 opacity-5 transition-opacity group-hover:opacity-10">
        <Image
          src={illustration}
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Icon Container */}
      <div className={`relative p-8 pb-0`}>
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0, rotate: -180 }}
          whileInView={prefersReducedMotion ? {} : { scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : index * 0.15 + 0.2,
            type: prefersReducedMotion ? undefined : 'spring',
            stiffness: prefersReducedMotion ? undefined : 200,
          }}
          className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl ${colors.iconBg} transition-transform group-hover:scale-110`}
        >
          <div className={colors.text}>{icon}</div>
        </motion.div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-bold text-slate-900">{title}</h3>

        {/* Problem */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {USE_CASES_SECTION.labels.problem}
          </h4>
          <p className="leading-relaxed text-slate-700">{problem}</p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {USE_CASES_SECTION.labels.solution}
          </h4>
          <ul className="space-y-3" role="list">
            {solution.map((item, idx) => (
              <motion.li
                key={idx}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.15 + 0.3 + idx * 0.1,
                }}
                className="flex items-start gap-3"
              >
                <div
                  className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${colors.checkBg}`}
                >
                  <Check className={`h-4 w-4 ${colors.checkText}`} strokeWidth={3} aria-hidden="true" />
                </div>
                <span className="text-slate-700">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Result - at bottom */}
      <div className={`mt-auto rounded-b-2xl ${colors.resultBg} p-6`}>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-700">
          {USE_CASES_SECTION.labels.result}
        </h4>
        <p className={`font-semibold ${colors.resultText}`}>{result}</p>
      </div>

      {/* Decorative gradient overlay */}
      <div
        aria-hidden="true"
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-30 ${colors.bg}`}
      />
    </motion.article>
  );
};

export const UseCasesSection: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Parallax effects for background decorative elements
  const bgParallax1 = useParallax({ speed: 0.25, enableOnMobile: false });
  const bgParallax2 = useParallax({ speed: 0.45, enableOnMobile: false });

  // Scroll-triggered animation for the entire section
  const { ref: sectionRef, isInView } = useScrollTrigger({ threshold: 0.1, triggerOnce: true });

  const iconComponents = {
    TrendingUp: TrendingUp,
    Users: Users,
    Building: Building,
    UserPlus: UserPlus,
  };

  const useCaseIcons = USE_CASES_SECTION.icons.map((iconName) => {
    const IconComponent = iconComponents[iconName];
    return <IconComponent key={iconName.toLowerCase()} className="h-8 w-8" />;
  });

  const useCaseIllustrations = USE_CASES_SECTION.illustrations;

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="relative overflow-hidden bg-slate-50 py-20"
    >
      {/* Decorative Background Elements with Parallax */}
      <div className="absolute inset-0 opacity-25" aria-hidden="true">
        <div
          ref={bgParallax1.ref}
          className="absolute right-0 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200 to-blue-200 blur-3xl"
          style={{ transform: bgParallax1.transform }}
        />
        <div
          ref={bgParallax2.ref}
          className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-green-200 to-teal-200 blur-3xl"
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
            id="use-cases-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            {USE_CASES_SECTION.heading}
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            {USE_CASES_SECTION.subheading}
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {USE_CASES.map((useCase, index) => (
            <UseCaseCard
              key={useCase.id}
              title={useCase.title}
              problem={useCase.problem}
              solution={useCase.solution}
              result={useCase.result}
              icon={useCaseIcons[index]}
              illustration={useCaseIllustrations[index] || ''}
              color={useCase.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
