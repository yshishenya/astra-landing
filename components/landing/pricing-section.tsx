'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface PricingCardProps {
  id: string;
  name: string;
  price: number | null;
  period: string;
  description: string;
  recommended: boolean;
  features: readonly string[];
  cta: string;
  index: number;
}

const PricingCard: FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  recommended,
  features,
  cta,
  index,
}) => {
  const isEnterprise = price === null;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.15 }}
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: recommended ? -12 : -8, scale: recommended ? 1.03 : 1.02 }
      }
      className={cn(
        'relative flex h-full flex-col rounded-lg bg-white shadow-md transition-all',
        recommended
          ? 'border-2 border-primary shadow-xl md:scale-105'
          : 'border border-slate-200 hover:shadow-lg'
      )}
    >
      {/* Recommended Badge */}
      {recommended && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : index * 0.15 + 0.2,
          }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 transform"
        >
          <div className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-sm font-bold text-white shadow-md">
            Рекомендуется
          </div>
        </motion.div>
      )}

      <div className="flex flex-1 flex-col p-8">
        {/* Plan Name */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-slate-900">{name}</h3>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          {isEnterprise ? (
            <div className="text-4xl font-bold text-slate-900">Custom</div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-slate-900">
                {formatCurrency(price, 'RUB')}
              </span>
              <span className="ml-2 text-slate-600">/ {period}</span>
            </div>
          )}
        </div>

        {/* Features List */}
        <ul className="mb-8 flex-1 space-y-4" role="list">
          {features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : index * 0.15 + featureIndex * 0.05,
              }}
              className="flex items-start gap-3"
            >
              <Check
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  recommended ? 'text-primary' : 'text-green-600'
                )}
                aria-hidden="true"
              />
              <span className="text-slate-700">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={recommended ? 'primary' : 'outline'}
          size="lg"
          className="w-full"
          aria-label={`${cta} - План ${name}`}
        >
          {cta}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </motion.div>
  );
};

export const PricingSection: FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-slate-50 py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            id="pricing-heading"
            className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Выберите свой план
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="mx-auto max-w-3xl text-xl text-slate-600"
          >
            Прозрачные цены без скрытых платежей. Начните бесплатно, масштабируйтесь по мере
            роста
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              recommended={plan.recommended}
              features={plan.features}
              cta={plan.cta}
              index={index}
            />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="mx-auto max-w-2xl"
        >
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-md sm:flex-row">
            <Shield className="h-12 w-12 text-green-600" aria-hidden="true" />
            <div className="text-center sm:text-left">
              <div className="font-bold text-slate-900">30-дневная гарантия возврата денег</div>
              <div className="text-sm text-slate-600">
                Если Астра вам не подойдёт, мы вернём деньги без вопросов
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
