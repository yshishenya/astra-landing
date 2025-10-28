import { type FC } from 'react';
import Link from 'next/link';
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
    <div className="relative" role="listitem">
      <div className="flex items-start gap-6">
        {/* Number Badge */}
        <div
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
          aria-label={`Шаг ${number}`}
        >
          <span className="text-2xl font-bold text-primary">{number}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-primary" aria-hidden="true">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          </div>

          <p className="leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>
    </div>
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
          <h2 id="solution-heading" className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Как Астра Выявляет Потенциал
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            Четыре простых шага от загрузки резюме до готового плана развития
          </p>
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
