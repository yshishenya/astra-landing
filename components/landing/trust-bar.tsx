import { type FC } from 'react';
import { CheckCircle, Star, Users } from 'lucide-react';
import { STATS } from '@/lib/constants';

interface TrustStatProps {
  icon: React.ReactNode;
  text: string;
}

const TrustStat: FC<TrustStatProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="text-primary">{icon}</div>
      <span className="text-sm font-medium text-slate-700 md:text-base">{text}</span>
    </div>
  );
};

export const TrustBar: FC = () => {
  const trustStats = [
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: `${STATS.companies} компаний используют Астру`,
    },
    {
      icon: <Star className="h-5 w-5" />,
      text: `${STATS.quality} анализов оценены как качественные`,
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: `${STATS.analyses} сотрудников получили рекомендации`,
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="container-custom">
        <p className="mb-8 text-center text-sm uppercase tracking-wide text-slate-500">
          Доверяют лидеры российского бизнеса
        </p>

        {/* Trust Stats */}
        <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-8 lg:gap-12">
          {trustStats.map((stat, idx) => (
            <TrustStat key={idx} icon={stat.icon} text={stat.text} />
          ))}
        </div>
      </div>
    </section>
  );
};
