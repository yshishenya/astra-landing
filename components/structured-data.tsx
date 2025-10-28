import { type FC } from 'react';
import Script from 'next/script';
import { FEATURES, STATS } from '@/lib/constants';

/**
 * Structured Data Component
 * Adds JSON-LD schema.org markup for SEO and rich snippets
 */
export const StructuredData: FC = () => {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Astra',
    description:
      'AI-powered career counseling assistant providing comprehensive professional analysis in minutes',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai'}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@astra.ai',
    },
    sameAs: [
      // Social media profiles would go here
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Astra - AI Career Counseling',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai',
    description:
      'Transform your career in 10 minutes with AI-powered analysis. 6 comprehensive methods in one click.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Product/Service Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Astra AI Career Analysis',
    description:
      'Comprehensive AI-powered career analysis including career insights, transferable skills mapping, life balance check, growth roadmap, market positioning, and cultural fit assessment',
    brand: {
      '@type': 'Brand',
      name: 'Astra',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/OnlineOnly',
      priceCurrency: 'RUB',
      description: 'AI-powered career counseling service',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: parseInt(STATS.companies.replace(/[^\d]/g, ''), 10),
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Analysis Time',
        value: STATS.analysisTime,
      },
      {
        '@type': 'PropertyValue',
        name: 'Accuracy Rate',
        value: STATS.quality,
      },
    ],
  };

  // ItemList Schema for Features
  const featuresListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '6 Methods of Career Analysis',
    description: 'Comprehensive analysis methods provided by Astra AI',
    numberOfItems: FEATURES.length,
    itemListElement: FEATURES.map((feature, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: feature.title,
        description: feature.description,
        provider: {
          '@type': 'Organization',
          name: 'Astra',
        },
      },
    })),
  };

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Astra - AI Career Counseling Landing Page',
    description:
      'Discover your career path with AI-powered analysis. Get insights, skills mapping, and personalized guidance in minutes.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai',
    mainEntity: {
      '@type': 'Service',
      serviceType: 'Career Counseling',
      provider: {
        '@type': 'Organization',
        name: 'Astra',
      },
    },
  };

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* WebSite Schema */}
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Product Schema */}
      <Script
        id="schema-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {/* Features List Schema */}
      <Script
        id="schema-features-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuresListSchema),
        }}
      />

      {/* WebPage Schema */}
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  );
};
