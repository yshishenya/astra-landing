'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Upload, Brain, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOLUTION_STEPS } from '@/lib/constants';

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: FC<StepCardProps> = ({ number, icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: (number - 1) * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
      role="listitem"
    >
      <div className="flex items-start gap-6">
        {/* Number Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: (number - 1) * 0.15 + 0.2, type: 'spring' }}
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
          aria-label={`Шаг ${number}`}
        >
          <span className="text-2xl font-bold text-primary">{number}</span>
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (number - 1) * 0.15 + 0.3 }}
              className="text-primary"
              aria-hidden="true"
            >
              {icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          </div>

          <p className="leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const SolutionSection: FC = () => {
  const stepIcons = [
    <Upload key="upload" className="h-6 w-6" />,
    <Brain key="brain" className="h-6 w-6" />,
    <FileText key="filetext" className="h-6 w-6" />,
    <MessageCircle key="message" className="h-6 w-6" />,
  ];

  return (
    <section id="solution" aria-labelledby="solution-heading" className="bg-white py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            id="solution-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Как Астра Выявляет Потенциал
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            Четыре простых шага от загрузки резюме до готового плана развития
          </motion.p>
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
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="#contact">
            <Button variant="primary" size="lg">
              Начать Анализ
            </Button>
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            Первый анализ бесплатно • Без кредитной карты
          </p>
        </div>
      </div>
    </section>
  );
};
