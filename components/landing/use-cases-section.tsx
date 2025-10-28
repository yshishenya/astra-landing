'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building, UserPlus, Check } from 'lucide-react';
import { USE_CASES } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type ColorTheme = 'green' | 'blue' | 'purple' | 'orange';

interface UseCaseCardProps {
  title: string;
  problem: string;
  solution: readonly string[];
  result: string;
  icon: React.ReactNode;
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
      {/* Icon Container */}
      <div className={`p-8 pb-0`}>
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
            Проблема
          </h4>
          <p className="leading-relaxed text-slate-700">{problem}</p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Решение Astra
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
          Результат
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
  const useCaseIcons = [
    <TrendingUp key="trending" className="h-8 w-8" />,
    <Users key="users" className="h-8 w-8" />,
    <Building key="building" className="h-8 w-8" />,
    <UserPlus key="userplus" className="h-8 w-8" />,
  ];

  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="bg-slate-50 py-20"
    >
      <div className="container-custom">
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
            Реальные Сценарии Применения
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            Как компании используют Astra для решения типичных HR-задач
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
              color={useCase.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
