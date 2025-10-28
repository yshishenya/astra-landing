'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Users } from 'lucide-react';
import { STATS } from '@/lib/constants';

interface TrustStatProps {
  icon: React.ReactNode;
  text: string;
  index: number;
}

const TrustStat: FC<TrustStatProps> = ({ icon, text, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center justify-center gap-2"
    >
      <div className="text-primary">{icon}</div>
      <span className="text-sm font-medium text-slate-700 md:text-base">{text}</span>
    </motion.div>
  );
};

export const TrustBar: FC = () => {
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
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          id="trust-bar-heading"
          className="mb-8 text-center text-sm uppercase tracking-wide text-slate-500"
        >
          Доверяют лидеры российского бизнеса
        </motion.p>

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
