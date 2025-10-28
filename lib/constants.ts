/**
 * Application constants and copywriting assets
 * Content sourced from .memory_bank/copywriting_assets.md
 */

export const APP_CONFIG = {
  name: 'Astra',
  description: 'AI-карьерный помощник для развития сотрудников',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@astra.example.com',
} as const;

export const STATS = {
  analysisTime: '90 сек',
  quality: '99.9%',
  roi: '162x',
  companies: '120+',
  analyses: '5000+',
  timeReduction: '85%',
  retentionIncrease: '23%',
  costReduction: '70%',
  positionSpeedup: '40%',
  engagementIncrease: '31%',
  scalability: '500+',
} as const;

export const HERO_HEADLINES = [
  'Выявить потенциал сотрудника за 90 секунд',
  'Лучшие люди уходят потому что не видят путей развития',
  'Снизить затраты на текучку на 5-10M рублей в год',
  'Построить культуру развития на AI',
] as const;

export const CTA_BUTTONS = {
  primary: 'Начать бесплатно',
  secondary: 'Запланировать демо',
  tertiary: 'Рассчитать ROI',
} as const;

export const PAIN_POINTS = [
  {
    stat: '71%',
    title: 'молодых уходят из-за отсутствия пути развития',
    description:
      'LinkedIn Career Report 2024: 71% молодых специалистов уходят, потому что не видят пути роста.',
    cost: '31.25M руб потери в год (500 человек)',
  },
  {
    stat: '2-3 часа',
    title: 'карьерный консультант тратит на один анализ',
    description:
      'Обычный консультант тратит 2-3 часа на анализ одного сотрудника, ограничивая масштабирование до 15-20 человек в месяц.',
    cost: '1-1.5 FTE в год',
  },
  {
    stat: '250k руб',
    title: 'стоимость замены одного сотрудника',
    description:
      'Рекрутинг, адаптация и время до полной продуктивности стоят компании 250,000 рублей на каждую замену.',
    cost: '31.25M руб потери в год (125 замен)',
  },
] as const;

export const FEATURES = [
  {
    id: 1,
    title: 'Карьерные инсайты',
    description: 'Определяет 3-5 суперсил и 3-4 реалистичных пути карьеры внутри компании',
    icon: 'Target',
  },
  {
    id: 2,
    title: 'SWOT-анализ',
    description: 'Сильные стороны, слабости, возможности и угрозы для карьерного роста',
    icon: 'Grid',
  },
  {
    id: 3,
    title: 'Holland Personality (RIASEC)',
    description: 'Психологический тип для идеального соответствия роли',
    icon: 'Users',
  },
  {
    id: 4,
    title: 'Индивидуальный план развития (ИПР)',
    description: 'Конкретный план на 30/90/180/365 дней с навыками и проектами',
    icon: 'Calendar',
  },
  {
    id: 5,
    title: 'Soft Skills Assessment',
    description: 'Оценка коммуникации, лидерства, командной работы и адаптивности',
    icon: 'Star',
  },
  {
    id: 6,
    title: 'Психометрический профиль',
    description: 'Когнитивные характеристики, EQ, стиль работы и мотивация',
    icon: 'Brain',
  },
] as const;

export const SOLUTION_STEPS = [
  {
    number: 1,
    title: 'Загрузить',
    description:
      'Любой формат (PDF, DOCX, TXT). Одна загрузка = один сотрудник. Данные зашифрованы.',
  },
  {
    number: 2,
    title: 'AI Анализирует (90 сек)',
    description:
      'Google Gemini 2.5 Flash + специализированные промпты. 6 методов одновременно. Результат: 99.9% качество.',
  },
  {
    number: 3,
    title: 'Получить PDF',
    description:
      'Красивый отчет с рекомендациями. Содержит: сильные стороны, 3 роли, план на 365 дней. Готов к использованию на карьерной беседе.',
  },
  {
    number: 4,
    title: 'Провести Консультацию',
    description:
      'Показать результат сотруднику. Обсудить план развития. Результат: мотивированный человек на 12+ месяцев.',
  },
] as const;

export const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 30000,
    period: 'год',
    description: 'Для начинающих компаний',
    recommended: false,
    features: [
      '500 анализов в год',
      '6 методов анализа',
      'PDF экспорт',
      'Email поддержка',
      'База знаний компании',
    ],
    cta: 'Начать бесплатно',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 60000,
    period: 'год',
    description: 'Для растущих компаний',
    recommended: true,
    features: [
      'Unlimited анализы',
      '6 методов анализа',
      'PDF + DOCX + JSON экспорт',
      'Priority поддержка',
      'API интеграция',
      'Bulk upload',
      'Кастомные промпты',
    ],
    cta: 'Начать бесплатно',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    period: 'Custom',
    description: 'Для крупных организаций',
    recommended: false,
    features: [
      'Всё из Pro',
      'Dedicated Account Manager',
      'SLA 99.9%',
      'On-premise опция',
      'Кастомные интеграции',
      'Тренинги и воркшопы',
      'White-label опция',
    ],
    cta: 'Связаться с нами',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Как работает Астра?',
    answer:
      'Загрузите резюме в формате PDF, DOCX или TXT. Наш AI (Google Gemini 2.5 Flash) проанализирует его за 90 секунд и создаст подробный отчет в PDF с 6 методами анализа: карьерные инсайты, SWOT, Holland personality, ИПР, Soft Skills и психометрический профиль.',
  },
  {
    question: 'Заменяет ли Астра HR-специалиста или карьерного консультанта?',
    answer:
      'Нет, Астра — это инструмент для HR и карьерных консультантов, который ускоряет процесс анализа с 2-3 часов до 90 секунд. Астра предоставляет данные и рекомендации, но окончательное решение и консультация остаются за человеком.',
  },
  {
    question: 'Безопасны ли мои данные?',
    answer:
      'Да. Мы используем TLS 1.3 для передачи данных и AES-256 для хранения. Мы НЕ тренируем модели на ваших данных. Мы соблюдаем GDPR и готовимся к SOC 2 Type II сертификации. Для Enterprise клиентов доступен on-premise вариант.',
  },
  {
    question: 'Какие форматы резюме поддерживаются?',
    answer:
      'PDF, DOCX, TXT, MD. Мы также планируем добавить поддержку CSV для bulk upload и интеграцию с HRIS системами (SAP SuccessFactors, BambooHR, 1C, Bitrix24).',
  },
  {
    question: 'Сколько времени занимает внедрение?',
    answer:
      'Basic план: 1 день. Pro план с API: 1-2 недели. Enterprise с кастомными интеграциями: 4-8 недель. Мы предоставляем полную документацию и поддержку для быстрого старта.',
  },
  {
    question: 'Можно ли попробовать бесплатно?',
    answer:
      'Да! Мы предлагаем 14-дневный бесплатный trial для всех планов. Кредитная карта не требуется. Вы можете отменить подписку в любой момент.',
  },
  {
    question: 'Какие интеграции доступны?',
    answer:
      'REST API, webhooks, CSV import/export. В планах: SAP SuccessFactors, BambooHR, 1C, Bitrix24, Workday, ADP. Enterprise клиенты могут запросить кастомные интеграции.',
  },
] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/astra',
  twitter: 'https://twitter.com/astra',
  github: 'https://github.com/astra',
  email: 'contact@astra.example.com',
} as const;

export const NAVIGATION_LINKS = [
  { label: 'Возможности', href: '#features' },
  { label: 'Результаты', href: '#results' },
  { label: 'Кейсы', href: '#use-cases' },
  { label: 'Цены', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
] as const;
