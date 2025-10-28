import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

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
  title: 'Astra — AI-карьерный помощник для развития сотрудников',
  description:
    'Выявить потенциал сотрудника за 90 секунд. 6 методов анализа, 99.9% качество, 162x ROI. Снизьте текучку на 5-10% и сэкономьте до 20M рублей в год.',
  keywords: [
    'карьерный консультант',
    'AI карьера',
    'HR Tech',
    'развитие сотрудников',
    'карьерное планирование',
    'анализ резюме',
    'ИПР',
    'SWOT анализ',
  ],
  authors: [{ name: 'Astra' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Astra',
    title: 'Astra — AI-карьерный помощник для развития сотрудников',
    description: 'Выявить потенциал сотрудника за 90 секунд. 162x ROI.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Astra — AI-карьерный помощник',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astra — AI-карьерный помощник для развития сотрудников',
    description: 'Выявить потенциал сотрудника за 90 секунд. 162x ROI.',
    images: ['/og-image.svg'], // TODO: Replace with PNG (1200x630px) for better social media support
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}
