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
    example: 'Стратегическое повествование через данные → PM / Product Lead',
    icon: 'Target',
    color: 'green' as const,
  },
  {
    id: 2,
    title: 'SWOT-анализ',
    description: 'Сильные стороны, слабости, возможности и угрозы для карьерного роста',
    example: 'Полная картина потенциала и рисков для развития',
    icon: 'Grid',
    color: 'blue' as const,
  },
  {
    id: 3,
    title: 'Holland Personality (RIASEC)',
    description: 'Психологический тип для идеального соответствия роли',
    example: 'Какие роли подходят психологически по 6 аспектам R-I-A-S-E-C',
    icon: 'Users',
    color: 'purple' as const,
  },
  {
    id: 4,
    title: 'Индивидуальный план развития (ИПР)',
    description: 'Конкретный план на 30/90/180/365 дней с навыками и проектами',
    example: 'Человек знает, что делать в следующие 12 месяцев',
    icon: 'Calendar',
    color: 'orange' as const,
  },
  {
    id: 5,
    title: 'Soft Skills Assessment',
    description: 'Оценка коммуникации, лидерства, командной работы и адаптивности',
    example: 'Какие навыки укреплять для следующей роли',
    icon: 'Star',
    color: 'teal' as const,
  },
  {
    id: 6,
    title: 'Психометрический профиль',
    description: 'Когнитивные характеристики, EQ, стиль работы и мотивация',
    example: 'Научное понимание когнитивного профиля',
    icon: 'Brain',
    color: 'indigo' as const,
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

export const RESULTS_METRICS = [
  {
    id: 1,
    value: 85,
    suffix: '%',
    label: 'Снижение времени на анализ',
    description: 'Вместо 5-10 дней консультаций → 5 минут анализа. HR получает 10+ часов в неделю.',
    color: 'green' as const,
  },
  {
    id: 2,
    value: 23,
    suffix: '%',
    label: 'Рост удержания талантов',
    description: 'Видимость карьерного роста внутри компании предотвращает уход. Экономия на рекрутинге.',
    color: 'blue' as const,
  },
  {
    id: 3,
    value: 70,
    suffix: '%',
    label: 'Снижение затрат на консультантов',
    description: 'Нет нужды привлекать коучей и психологов. Экономия: ~50-100k в год.',
    color: 'purple' as const,
  },
  {
    id: 4,
    value: 40,
    suffix: '%',
    label: 'Ускорение закрытия позиций',
    description: 'Быстрее находим внутренних кандидатов. Сокращение с 3 месяцев до 6-8 недель.',
    color: 'orange' as const,
  },
  {
    id: 5,
    value: 31,
    suffix: '%',
    label: 'Увеличение вовлечённости',
    description: 'Сотрудники видят, что компания инвестирует в их развитие. Улучшение морального климата.',
    color: 'teal' as const,
  },
  {
    id: 6,
    value: 500,
    suffix: '+',
    label: 'Масштабируемость без найма',
    description: 'Один человек анализирует 500+ сотрудников в год. Масштабирование без затрат.',
    color: 'indigo' as const,
  },
] as const;

export const USE_CASES = [
  {
    id: 1,
    title: 'Амбициозный разработчик просит повышение',
    problem:
      'Разработчик с 3 годами опыта просит повышение, но совершенно не подходит. HR часами совещается, не зная как корректно отказать и удержать таланта.',
    solution: [
      'Текущие сильные стороны',
      'Что нужно развивать еще 6-12 месяцев',
      'Реалистичный план с конкретными проектами',
      'Альтернативный путь (специализированная роль)',
    ],
    result: 'Сотрудник видит путь развития, остается в компании.',
    icon: 'TrendingUp',
    color: 'green' as const,
  },
  {
    id: 2,
    title: 'Нужно найти замену руководителю внутри компании',
    problem:
      'Начальник отдела уходит, нужна замена. Ручной поиск и интервьюирование = 2-3 недели.',
    solution: [
      'Выделяет лучших по компетенциям',
      'Показывает зоны развития',
      'Генерирует ИПР для ускоренной подготовки',
    ],
    result: 'Решение за 1-2 дня вместо 2-3 недель.',
    icon: 'Users',
    color: 'blue' as const,
  },
  {
    id: 3,
    title: 'Компания из 300 человек хочет культуру развития',
    problem:
      'Нужны планы развития для каждого, но ресурсов нет. Нанять 3 коучей = 500k-1M в год. Ручной анализ = 150-300 дней работы.',
    solution: [
      'Загружает все резюме',
      'Запускает массовый анализ',
      'Получает отчеты для всех',
      'Обсуждает с менеджерами уточнения',
    ],
    result: 'Культура развития, удержание талантов, затраты на 80% ниже.',
    icon: 'Building',
    color: 'purple' as const,
  },
  {
    id: 4,
    title: 'Новый сотрудник приходит на позицию',
    problem:
      'HR хочет понять потенциал новичка и спроектировать путь на год вперед. Обычно оценку делают через 3-6 месяцев и на глаз.',
    solution: [
      'Определяет текущий уровень и потенциал',
      'Рекомендует проекты для адаптации',
      'Проектирует путь на 12 месяцев',
      'Выделяет нужное менторство и обучение',
    ],
    result: 'Быстрая адаптация, правильная траектория, высокая вовлеченность.',
    icon: 'UserPlus',
    color: 'orange' as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Мы провели 100 анализов в течение месяца. Раньше это заняло бы 3-4 месяца работы консультанта. Теперь каждый сотрудник знает, куда может расти. Текучка упала с 30% на 22%, внутренний найм вырос на 15%.',
    author: 'Мария Сидорова',
    role: 'HR Директор',
    company: 'Tech Company',
    companySize: '250 сотрудников',
    rating: 5,
    avatar: '/images/testimonials/maria.jpg',
  },
  {
    id: 2,
    quote:
      'ROI был простой: 30k потратили, 6.25M сэкономили на текучке. Это 200x возврат. Для CFO это очевидное решение.',
    author: 'Алексей Петров',
    role: 'CFO',
    company: 'Finance Company',
    companySize: '400 сотрудников',
    rating: 5,
    avatar: '/images/testimonials/alexey.jpg',
  },
  {
    id: 3,
    quote:
      'Когда я получил анализ, я был поражен. Они видели во мне лидера, который я не видел в себе. Это изменило мою перспективу. Я остался в компании вместо поиска работы вовне.',
    author: 'Иван Иванов',
    role: 'Senior Engineer',
    company: 'Tech Company',
    companySize: 'остался',
    rating: 5,
    avatar: '/images/testimonials/ivan.jpg',
  },
] as const;

export const FINAL_CTA = {
  headline: 'Готовы построить культуру развития?',
  subheadline: 'Присоединяйтесь к 120+ компаниям, которые используют AI для удержания талантов и ускорения карьерного роста',
  trustBadges: [
    { text: 'Без кредитной карты' },
    { text: '14 дней бесплатно' },
    { text: 'Отменить в любой момент' },
  ],
  buttons: {
    primary: { text: 'Попробовать Бесплатно', href: '#trial' },
    secondary: { text: 'Запланировать Демо', href: '#demo' },
    tertiary: { text: 'Связаться с Нами', href: '#contact' },
  },
} as const;

export const NAVIGATION_LINKS = [
  { label: 'Возможности', href: '#features' },
  { label: 'Результаты', href: '#results' },
  { label: 'Кейсы', href: '#use-cases' },
  { label: 'Цены', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
] as const;

/**
 * Form Content - All form-related copy
 * Includes contact form, demo booking, and ROI calculator
 */
export const FORM_CONTENT = {
  contact: {
    trigger: 'Связаться с нами',
    title: 'Связаться с нами',
    description: 'Заполните форму, и наш менеджер свяжется с вами в ближайшее время',
    fields: {
      name: {
        label: 'Имя',
        placeholder: 'Иван Иванов',
        required: true,
      },
      email: {
        label: 'Email',
        placeholder: 'ivan@company.com',
        required: true,
      },
      company: {
        label: 'Компания',
        placeholder: 'ООО Компания',
        required: true,
      },
      companySize: {
        label: 'Размер компании (опционально)',
        placeholder: '50-200 сотрудников',
        required: false,
      },
      message: {
        label: 'Сообщение',
        placeholder: 'Расскажите о вашем запросе...',
        required: true,
      },
    },
    buttons: {
      submit: 'Отправить',
      submitting: 'Отправка...',
    },
  },
  demo: {
    trigger: 'Заказать демо',
    title: 'Заказать демонстрацию Astra',
    description: 'Заполните форму, и наш менеджер свяжется с вами для согласования удобного времени',
    fields: {
      name: {
        label: 'Имя',
        placeholder: 'Иван Иванов',
        required: true,
      },
      email: {
        label: 'Email',
        placeholder: 'ivan@company.com',
        required: true,
      },
      company: {
        label: 'Компания',
        placeholder: 'ООО Компания',
        required: true,
      },
      phone: {
        label: 'Телефон (опционально)',
        placeholder: '+7 (999) 123-45-67',
        required: false,
      },
      companySize: {
        label: 'Размер компании (опционально)',
        placeholder: '50-200 сотрудников',
        required: false,
      },
      preferredTime: {
        label: 'Предпочтительное время (опционально)',
        placeholder: 'Понедельник, 14:00',
        required: false,
      },
    },
    buttons: {
      submit: 'Заказать демо',
      submitting: 'Отправка...',
    },
  },
  roiCalculator: {
    title: 'Калькулятор ROI',
    description: 'Рассчитайте экономическую выгоду от внедрения Astra в вашей компании',
    sectionTitle: 'Параметры компании',
    fields: {
      companySize: {
        label: 'Количество сотрудников',
        placeholder: '100',
        required: true,
      },
      currentTurnover: {
        label: 'Текущая текучесть кадров (%)',
        placeholder: '15',
        hint: 'Средняя по России: 15-20%',
        required: true,
      },
      averageSalary: {
        label: 'Средняя зарплата (руб/месяц)',
        placeholder: '100000',
        required: false,
      },
      currentHireTime: {
        label: 'Время найма (дней)',
        placeholder: '30',
        required: false,
      },
    },
    results: {
      title: 'Детальный расчет',
      emptyState: 'Заполните форму, чтобы увидеть расчет ROI',
      metrics: {
        roi: 'ROI',
        roiDescription: 'Возврат инвестиций',
        payback: 'Окупаемость',
        paybackUnit: 'дн.',
        paybackWeeks: 'недель',
        savings: 'Экономия',
        savingsDescription: 'В год',
        timeSaved: 'Время',
        timeSavedUnit: 'ч',
        timeSavedDescription: 'Сэкономлено HR',
      },
      breakdown: {
        currentSituation: 'Текущая ситуация:',
        turnovers: 'Увольнений в год',
        replacementCost: 'Стоимость найма',
        annualLoss: 'Потери в год',
        withAstra: 'С Astra:',
        turnoverReduction: 'Снижение текучести',
        hiringSavings: 'Экономия на найме',
        timeSavings: 'Экономия времени HR',
        recommendedPlan: 'Рекомендуемый план',
        cost: 'Стоимость',
        netProfit: 'Чистая прибыль',
        threeYearTitle: 'Прогноз на 3 года:',
        threeYearSavings: 'Общая экономия',
      },
    },
    buttons: {
      calculate: 'Рассчитать ROI',
      calculating: 'Расчет...',
    },
  },
  validation: {
    required: 'Это поле обязательно',
    invalidEmail: 'Некорректный email адрес',
    minLength: 'Минимум {min} символов',
    maxLength: 'Максимум {max} символов',
  },
  messages: {
    success: 'Успешно отправлено!',
    error: 'Произошла ошибка при отправке. Попробуйте позже.',
    loading: 'Отправка...',
  },
} as const;
