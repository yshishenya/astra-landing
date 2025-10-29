'use client';

import { type FC } from 'react';
import { CheckCircle, Star, Users } from 'lucide-react';
import { STATS } from '@/lib/constants';
import { useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

interface TrustStatProps {
  icon: React.ReactNode;
  text: string;
  index: number;
}

const TrustStat: FC<TrustStatProps> = ({ icon, text, index }) => {
  const { ref, isInView } = useScrollTrigger({ threshold: 0.1 });

  // Map index to delay class
  const delayClass = index === 0 ? 'animate-delay-100' : index === 1 ? 'animate-delay-200' : 'animate-delay-300';

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-2',
        'animate-on-scroll',
        isInView && 'animate-fade-in-up',
        isInView && delayClass
      )}
    >
      <div className="text-primary">{icon}</div>
      <span className="text-sm font-medium text-slate-700 md:text-base">{text}</span>
    </div>
  );
};

export const TrustBar: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });

  const trustStats = [
    {
      id: 'companies',
      icon: <CheckCircle className="h-5 w-5" />,
      text: `${STATS.companies} компаний используют Астру`,
    },
    {
      id: 'quality',
      icon: <Star className="h-5 w-5" />,
      text: `${STATS.quality} анализов оценены как качественные`,
    },
    {
      id: 'analyses',
      icon: <Users className="h-5 w-5" />,
      text: `${STATS.analyses} сотрудников получили рекомендации`,
    },
  ];

  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="border-y border-slate-200 bg-white py-12"
    >
      <div className="container-custom">
        <p
          ref={headingRef}
          id="trust-bar-heading"
          className={cn(
            'mb-8 text-center text-sm uppercase tracking-wide text-slate-500',
            'animate-on-scroll',
            headingInView && 'animate-fade-in-down'
          )}
        >
          Доверяют лидеры российского бизнеса
        </p>

        {/* Trust Stats */}
        <div
          role="list"
          className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-8 lg:gap-12"
        >
          {trustStats.map((stat, index) => (
            <TrustStat key={stat.id} icon={stat.icon} text={stat.text} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
