'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Target, Grid3x3, Users, Calendar, Star, Brain } from 'lucide-react';
import { FEATURES } from '@/lib/constants';

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
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Icon Container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-lg ${colors.iconBg}`}
      >
        <div className={colors.text} aria-hidden="true">
          {icon}
        </div>
      </motion.div>

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
    </motion.div>
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
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-slate-50 py-20"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            id="features-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            6 Методов Анализа в Один Клик
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            Комплексный анализ, который обычно требует недель работы с психологами и
            карьерными консультантами
          </motion.p>
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
