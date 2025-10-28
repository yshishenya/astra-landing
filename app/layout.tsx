import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics-provider';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai'),
  title: {
    default: 'Astra - AI-карьерный консультант для удержания сотрудников',
    template: '%s | Astra',
  },
  description:
    'Выявить потенциал сотрудника за 90 секунд. 6 методов анализа резюме: карьерные инсайты, SWOT, Holland, ИПР, Soft Skills, психометрия. 99.9% качество, 162x ROI. Снизьте текучку на 5-10% и сэкономьте до 20M рублей в год.',
  keywords: [
    'AI карьерный консультант',
    'удержание сотрудников',
    'текучесть кадров',
    'HR Tech',
    'анализ резюме',
    'карьерное развитие',
    'ИПР',
    'SWOT анализ',
    'Holland RIASEC',
    'Soft Skills Assessment',
    'психометрический профиль',
    'HR аналитика',
    'развитие талантов',
    'внутренний найм',
    'карьерная консультация',
  ],
  authors: [{ name: 'Astra', url: process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai' }],
  creator: 'Astra',
  publisher: 'Astra',
  applicationName: 'Astra',
  category: 'HR Technology',
  classification: 'Business',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai',
    siteName: 'Astra',
    title: 'Astra - AI-карьерный консультант для удержания сотрудников',
    description:
      'Выявить потенциал сотрудника за 90 секунд. 6 методов анализа: карьерные инсайты, SWOT, Holland, ИПР, Soft Skills, психометрия. 99.9% качество, 162x ROI. Снизьте текучку на 5-10%.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Astra - AI-карьерный консультант для удержания сотрудников',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astra - AI-карьерный консультант для удержания сотрудников',
    description:
      'Выявить потенциал сотрудника за 90 секунд. 6 методов анализа. 99.9% качество, 162x ROI.',
    images: ['/og-image.svg'], // TODO: Replace with PNG (1200x630px) for better social media support
    creator: '@astra',
    site: '@astra',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://astra.ai',
  },
  verification: {
    // Add when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
