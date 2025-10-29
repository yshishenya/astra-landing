'use client';

import { type FC, useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { RESULTS_METRICS } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type ColorTheme = 'green' | 'blue' | 'purple' | 'orange' | 'teal' | 'indigo';

interface MetricCardProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: ColorTheme;
  index: number;
}

interface CounterProps {
  from: number;
  to: number;
  duration: number;
  suffix: string;
  inView: boolean;
}

interface CircularProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  inView: boolean;
  delay: number;
}

const colorClasses: Record<ColorTheme, { bg: string; text: string; border: string; glow: string }> =
  {
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      glow: 'shadow-green-200/50',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      glow: 'shadow-blue-200/50',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      glow: 'shadow-purple-200/50',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200',
      glow: 'shadow-orange-200/50',
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-50 to-teal-100',
      text: 'text-teal-600',
      border: 'border-teal-200',
      glow: 'shadow-teal-200/50',
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      glow: 'shadow-indigo-200/50',
    },
  };

// Hex color mapping for CircularProgress SVG elements
const CIRCULAR_PROGRESS_COLORS: Record<ColorTheme, string> = {
  green: '#22c55e',
  blue: '#3b82f6',
  purple: '#a855f7',
  orange: '#f97316',
  teal: '#14b8a6',
  indigo: '#6366f1',
} as const;

/**
 * Renders a circular progress indicator (radial progress bar).
 */
const CircularProgress: FC<CircularProgressProps> = ({
  percentage,
  size,
  strokeWidth,
  color,
  inView,
  delay,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      setProgress(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, percentage, delay]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 2s ease-in-out',
        }}
      />
    </svg>
  );
};

/**
 * Animated counter component using requestAnimationFrame for smooth counting
 */
const Counter: FC<CounterProps> = ({ from, to, duration, suffix, inView }) => {
  const [count, setCount] = useState<number>(from);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    const animate = (currentTime: number): void => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease-out cubic easing for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(from + (to - from) * easeProgress);

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [from, to, duration, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

/**
 * Renders a metric card component with animated visuals.
 *
 * The MetricCard component displays a value with an optional suffix, a label, and a description. It utilizes motion effects for entrance and hover states, and includes a radial progress indicator. The component adapts to user preferences for reduced motion and handles visibility using the useInView hook.
 *
 * @param value - The numeric value to be displayed on the card.
 * @param suffix - An optional suffix for the value, such as a percentage sign.
 * @param label - The label text for the metric card.
 * @param description - A description providing additional context for the metric.
 * @param color - The color scheme to be applied to the card.
 * @param index - The index of the card, used for animation delays.
 * @returns A JSX element representing the metric card.
 */
const MetricCard: FC<MetricCardProps> = ({
  value,
  suffix,
  label,
  description,
  color,
  index,
}) => {
  const colors = colorClasses[color];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50, scale: 0.9 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        type: prefersReducedMotion ? undefined : 'spring',
        stiffness: prefersReducedMotion ? undefined : 100,
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -8,
              scale: 1.02,
              transition: { duration: 0.2 },
            }
      }
      className={`group relative overflow-hidden rounded-2xl border-2 ${colors.border} bg-white p-8 shadow-lg transition-all hover:shadow-2xl ${colors.glow}`}
    >
      {/* Background gradient overlay */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${colors.bg}`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Radial Progress Indicator with Value */}
        <div className="relative mx-auto mb-6 flex h-48 w-48 items-center justify-center">
          {/* Background circle for radial progress */}
          <CircularProgress
            percentage={suffix === '%' ? value : Math.min(value, 100)}
            size={192}
            strokeWidth={12}
            color={CIRCULAR_PROGRESS_COLORS[color]}
            inView={isInView}
            delay={index * 100 + 200}
          />

          {/* Counter in the center */}
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0.5, opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : index * 0.1 + 0.2,
            }}
            className={`absolute text-5xl font-bold ${colors.text}`}
          >
            <Counter
              from={0}
              to={value}
              duration={prefersReducedMotion ? 0 : 2}
              suffix={suffix}
              inView={isInView}
            />
          </motion.div>
        </div>

        {/* Label */}
        <h3 className="mb-3 text-xl font-bold text-slate-900">{label}</h3>

        {/* Description */}
        <p className="leading-relaxed text-slate-600">{description}</p>
      </div>

      {/* Decorative element */}
      <div
        aria-hidden="true"
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-all duration-300 group-hover:scale-150 ${colors.bg}`}
      />
    </motion.div>
  );
};

export const ResultsSection: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="bg-gradient-to-b from-white to-slate-50 py-20"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            id="results-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Результаты и Метрики
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            Реальные показатели эффективности от компаний, которые уже используют Astra
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {RESULTS_METRICS.map((metric, index) => (
            <MetricCard
              key={metric.id}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              description={metric.description}
              color={metric.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
