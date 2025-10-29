import { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { TrustBar } from '@/components/landing/trust-bar';
import { AboutAstraSection } from '@/components/landing/about-astra-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { ResultsSection } from '@/components/landing/results-section';
import { UseCasesSection } from '@/components/landing/use-cases-section';
import { ROICalculatorSection } from '@/components/landing/roi-calculator';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { FinalCTASection } from '@/components/landing/final-cta-section';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'Astra — Выявить потенциал сотрудника за 90 секунд',
  description:
    'AI-карьерный помощник для внутреннего развития сотрудников. 6 методов анализа резюме за 90 секунд. 162x ROI, 99.9% качество.',
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData />

      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Trust Bar */}
        <TrustBar />

        {/* About Astra */}
        <AboutAstraSection />

        {/* Problem Statement */}
        <ProblemSection />

        {/* Solution Overview */}
        <SolutionSection />

        {/* Key Features */}
        <FeaturesSection />

        {/* Results & Metrics */}
        <ResultsSection />

        {/* Use Cases */}
        <UseCasesSection />

        {/* ROI Calculator */}
        <ROICalculatorSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
