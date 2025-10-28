import { type FC } from 'react';
import Link from 'next/link';
import { Users, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PAIN_POINTS } from '@/lib/constants';

interface PainCardProps {
  icon: React.ReactNode;
  stat: string;
  title: string;
  description: string;
  cost: string;
  ctaHref: string;
  ctaText: string;
}

const PainCard: FC<PainCardProps> = ({
  icon,
  stat,
  title,
  description,
  cost,
  ctaHref,
  ctaText,
}) => {
  return (
    <div className="group rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-xl">
      {/* Icon */}
      <div className="mb-6 flex justify-center">{icon}</div>

      {/* Stat and Title */}
      <div className="mb-4 text-center">
        <div className="mb-2 text-3xl font-bold text-orange-600">{stat}</div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Description */}
      <p className="mb-6 leading-relaxed text-slate-600">{description}</p>

      {/* Cost Box */}
      <div className="mb-6 rounded-lg bg-orange-50 p-4">
        <p className="text-sm font-semibold text-orange-900">{cost}</p>
      </div>

      {/* CTA Link */}
      <Link
        href={ctaHref}
        className="flex items-center justify-center gap-2 font-semibold text-primary transition-all hover:gap-3"
      >
        {ctaText} <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
};

export const ProblemSection: FC = () => {
  const painCards = [
    {
      icon: <Users className="h-16 w-16 text-orange-500" />,
      stat: PAIN_POINTS[0].stat,
      title: PAIN_POINTS[0].title,
      description: PAIN_POINTS[0].description,
      cost: PAIN_POINTS[0].cost,
      ctaHref: '#roi-calculator',
      ctaText: 'Посчитать ваши потери',
    },
    {
      icon: <Clock className="h-16 w-16 text-orange-500" />,
      stat: PAIN_POINTS[1].stat,
      title: PAIN_POINTS[1].title,
      description: PAIN_POINTS[1].description,
      cost: PAIN_POINTS[1].cost,
      ctaHref: '#solution',
      ctaText: 'Как Астра это решает',
    },
    {
      icon: <DollarSign className="h-16 w-16 text-orange-500" />,
      stat: PAIN_POINTS[2].stat,
      title: PAIN_POINTS[2].title,
      description: PAIN_POINTS[2].description,
      cost: PAIN_POINTS[2].cost,
      ctaHref: '#roi-calculator',
      ctaText: 'Калькулятор потерь',
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Почему Ваши Лучшие Люди Уходят
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            HR-директора тратят сотни часов на карьерные запросы, но всё равно теряют
            топ-таланты. Вот почему.
          </p>
        </div>

        {/* Pain Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {painCards.map((pain, idx) => (
            <PainCard key={idx} {...pain} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="#roi-calculator">
            <Button variant="primary" size="lg">
              Запустить Калькулятор Потерь
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
