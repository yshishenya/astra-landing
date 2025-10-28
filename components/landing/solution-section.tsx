'use client';

import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Upload, Brain, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOLUTION_STEPS, SOLUTION_SECTION } from '@/lib/constants';

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  screenshot: string;
}

const StepCard: FC<StepCardProps> = ({ number, icon, title, description, screenshot }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: (number - 1) * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col gap-6 overflow-hidden rounded-xl bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md"
      role="listitem"
    >
      {/* Number Badge */}
      <div className="flex items-start gap-4">
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
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          </div>

          <p className="leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>

      {/* Screenshot/Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: (number - 1) * 0.15 + 0.4 }}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white shadow-sm"
      >
        <Image
          src={screenshot}
          alt={`${title} - скриншот интерфейса`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </motion.div>
  );
};

export const SolutionSection: FC = () => {
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            id="solution-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            {SOLUTION_SECTION.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            {SOLUTION_SECTION.subheading}
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
