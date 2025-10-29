import { type Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Building, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CASE_STUDIES, CASE_STUDIES_PAGE } from '@/lib/constants';
import { DemoForm } from '@/components/landing/demo-form';

export const metadata: Metadata = {
  title: CASE_STUDIES_PAGE.meta.title,
  description: CASE_STUDIES_PAGE.meta.description,
};

/**
 * Case Studies Page
 *
 * Comprehensive showcase of real customer success stories
 * Demonstrates ROI, retention improvements, and time savings
 */
export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            {CASE_STUDIES_PAGE.hero.headline}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl">
            {CASE_STUDIES_PAGE.hero.subheadline}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
            {CASE_STUDIES_PAGE.stats.title}
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {CASE_STUDIES_PAGE.stats.metrics.map((metric, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {CASE_STUDIES.map((caseStudy, idx) => (
              <article
                key={caseStudy.id}
                id={caseStudy.id}
                className={`flex flex-col gap-8 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Image */}
                <div className="lg:w-2/5">
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                      {/* Placeholder gradient with icon */}
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <Building className="mx-auto mb-4 h-16 w-16 text-primary opacity-50" />
                          <p className="text-lg font-semibold text-gray-700">
                            {caseStudy.company.name}
                          </p>
                          <p className="text-sm text-gray-600">{caseStudy.company.industry}</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Company Info Card */}
                  <Card className="mt-4 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <Building className="h-5 w-5 text-primary" />О компании
                    </h3>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="font-semibold text-gray-700">Индустрия:</dt>
                        <dd className="text-gray-600">{caseStudy.company.industry}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700">Размер:</dt>
                        <dd className="text-gray-600">{caseStudy.company.size} сотрудников</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-gray-700">Локация:</dt>
                        <dd className="text-gray-600">{caseStudy.company.location}</dd>
                      </div>
                    </dl>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Content */}
                <div className="lg:w-3/5">
                  <Card className="p-8">
                    <h2 className="mb-6 text-3xl font-bold text-gray-900">
                      {caseStudy.title}
                    </h2>

                    {/* Challenge */}
                    <div className="mb-8">
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        {caseStudy.challenge.title}
                      </h3>
                      <p className="mb-2 text-gray-700">{caseStudy.challenge.description}</p>
                      <div className="mt-4 rounded-lg bg-red-50 p-4">
                        <p className="text-sm font-semibold text-red-900">Проблема:</p>
                        <p className="mt-1 text-sm text-red-800">{caseStudy.challenge.problem}</p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="mb-8">
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        {caseStudy.solution.title}
                      </h3>
                      <ul className="space-y-2">
                        {caseStudy.solution.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 rounded-lg bg-blue-50 p-4">
                        <p className="text-sm font-semibold text-blue-900">Время реализации:</p>
                        <p className="mt-1 text-sm text-blue-800">{caseStudy.solution.timeline}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h3 className="mb-3 text-xl font-bold text-gray-900">
                        {caseStudy.results.title}
                      </h3>
                      <p className="mb-4 text-gray-700">{caseStudy.results.description}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {caseStudy.results.metrics.map((metric, metricIdx) => (
                          <div
                            key={metricIdx}
                            className={`rounded-lg p-4 text-center ${
                              metric.highlight
                                ? 'bg-gradient-to-br from-green-50 to-green-100 ring-2 ring-green-500'
                                : 'bg-gray-50'
                            }`}
                          >
                            <div
                              className={`mb-2 text-2xl font-bold ${
                                metric.highlight ? 'text-green-700' : 'text-gray-900'
                              }`}
                            >
                              {metric.value}
                            </div>
                            <div
                              className={`text-sm ${
                                metric.highlight ? 'text-green-700' : 'text-gray-600'
                              }`}
                            >
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {caseStudy.testimonial.author}
                          </p>
                          <p className="text-sm text-gray-600">{caseStudy.testimonial.role}</p>
                        </div>
                      </div>
                      <blockquote className="text-gray-700">
                        "{caseStudy.testimonial.quote}"
                      </blockquote>
                    </div>
                  </Card>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <TrendingUp className="mx-auto mb-6 h-16 w-16 text-white" aria-hidden="true" />
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {CASE_STUDIES_PAGE.cta.headline}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            {CASE_STUDIES_PAGE.cta.subheadline}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <DemoForm
              trigger={
                <Button
                  size="lg"
                  variant="accent"
                  className="bg-white text-lg font-bold text-primary shadow-2xl hover:bg-white/95"
                >
                  {CASE_STUDIES_PAGE.cta.primaryButton}
                </Button>
              }
            />

            <Link href="/#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-lg font-semibold text-white hover:bg-white hover:text-primary"
              >
                {CASE_STUDIES_PAGE.cta.secondaryButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
