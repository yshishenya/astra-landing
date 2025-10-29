'use client';

import { type FC } from 'react';
import Image from 'next/image';
import { Sparkles, Brain, Zap, Target } from 'lucide-react';
import { useScrollTrigger } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

/**
 * Feature highlight interface
 */
interface FeatureHighlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * About Astra Section Component
 *
 * Introduces Astra AI character and highlights key capabilities
 *
 * Features:
 * - Large centered Astra image
 * - Character introduction
 * - 4 key capability highlights with icons
 * - Scroll-triggered animations
 *
 * @example
 * ```tsx
 * <AboutAstraSection />
 * ```
 */
export const AboutAstraSection: FC = () => {
  const { ref: headingRef, isInView: headingInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: imageRef, isInView: imageInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: descRef, isInView: descInView } = useScrollTrigger({ threshold: 0.1 });
  const { ref: featuresRef, isInView: featuresInView } = useScrollTrigger({ threshold: 0.1 });

  const features: FeatureHighlight[] = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: '6 методов анализа',
      description: 'SWOT, Holland RIASEC, Soft Skills, психометрия и карьерные инсайты',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: '90 секунд',
      description: 'Мгновенный анализ резюме с глубоким пониманием кандидата',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: '99.9% точность',
      description: 'Проверенная точность анализа на тысячах резюме',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI-рекомендации',
      description: 'Персонализированный план развития для каждого сотрудника',
    },
  ];

  return (
    <section
      id="about-astra"
      aria-labelledby="about-astra-heading"
      className="section-spacing relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cyan-50"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Heading */}
        <div
          ref={headingRef}
          className={cn(
            'mb-16 text-center',
            'animate-on-scroll',
            headingInView && 'animate-fade-in-up'
          )}
        >
          <h2
            id="about-astra-heading"
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
          >
            Знакомьтесь, это{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Astra
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Ваш AI-карьерный консультант нового поколения
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Astra Image */}
          <div
            ref={imageRef}
            className={cn(
              'relative',
              'animate-on-scroll',
              imageInView && 'animate-scale-in'
            )}
          >
            <div className="relative mx-auto max-w-lg">
              {/* Glow effect */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-3xl" />

              {/* Main Image */}
              <div className="relative">
                <Image
                  src="/astra.png"
                  alt="Astra - AI-карьерный консультант"
                  width={500}
                  height={500}
                  className="relative z-10 animate-float drop-shadow-2xl"
                />

                {/* Floating particles */}
                <div className="absolute -right-8 top-1/4 h-24 w-24 animate-pulse rounded-full bg-cyan-400/30 blur-2xl" />
                <div className="absolute -left-8 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-purple-600/30 blur-2xl animation-delay-1000" />
              </div>
            </div>
          </div>

          {/* Right: Description and Features */}
          <div className="space-y-8">
            {/* Introduction */}
            <div
              ref={descRef}
              className={cn(
                'animate-on-scroll',
                descInView && 'animate-fade-in-right'
              )}
            >
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                Искусственный интеллект на службе HR
              </h3>
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                Astra — это не просто программа. Это ваш персональный AI-помощник, который понимает
                людей, их потенциал и карьерные амбиции.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Обучена на тысячах успешных карьерных траекторий, Astra помогает компаниям раскрывать
                потенциал каждого сотрудника и строить культуру развития.
              </p>
            </div>

            {/* Features Grid */}
            <div
              ref={featuresRef}
              className={cn(
                'grid grid-cols-1 gap-6 sm:grid-cols-2',
                'animate-on-scroll',
                featuresInView && 'animate-fade-in-up'
              )}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    'group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-xl',
                    index === 0 && 'sm:col-span-2'
                  )}
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg transition-all group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
