# Полная Структура Landing Page для Astra
## AI-ассистент карьерного консультирования

**Версия:** 1.0
**Дата:** 2025-10-28
**Статус:** Production Ready
**Для:** Разработчики, дизайнеры, маркетологи

---

## Оглавление

1. [Hero Section](#1-hero-section)
2. [Trust Bar](#2-trust-bar)
3. [Problem Statement (Pain Section)](#3-problem-statement-pain-section)
4. [Solution Overview (How It Works)](#4-solution-overview-how-it-works)
5. [Key Features (6 методов анализа)](#5-key-features-6-методов-анализа)
6. [Results & Metrics](#6-results--metrics)
7. [Use Cases](#7-use-cases)
8. [Social Proof (Testimonials)](#8-social-proof-testimonials)
9. [Pricing Table](#9-pricing-table)
10. [FAQ](#10-faq)
11. [Final CTA](#11-final-cta)
12. [Footer](#12-footer)

---

## 1. Hero Section

### Purpose
Захватить внимание за 5 секунд, показать ценность продукта, побудить к действию.

### Elements

#### 1.1 Main Headline (H1)
```tsx
// components/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Выявить Потенциал Сотрудника
            <span className="text-green-600"> за 90 Секунд</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI анализирует резюме, видит скрытые суперсилы, предлагает конкретные
            пути развития в вашей компании. Вместо часов консультирования — PDF
            с готовыми рекомендациями.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="primary" size="large" icon={<Rocket />}>
              Попробовать Бесплатно
              <span className="block text-sm font-normal mt-1">
                5 анализов, 14 дней, карта не требуется
              </span>
            </Button>

            <Button variant="secondary" size="large" icon={<Video />}>
              Получить Демо
              <span className="block text-sm font-normal mt-1">
                15 минут с экспертом
              </span>
            </Button>

            <Button variant="tertiary" size="large" icon={<Phone />}>
              Говорить с Клиентом
              <span className="block text-sm font-normal mt-1">
                Reference call с похожей компанией
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <StatCard number="90 сек" label="вместо 2-3 часов" />
            <StatCard number="99.9%" label="качество анализов" />
            <StatCard number="162x" label="ROI в первый год" />
          </div>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 hidden lg:block">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg shadow-2xl"
          src="/videos/demo-90sec.mp4"
        />
      </div>
    </section>
  );
}
```

### Visual Style

**Typography:**
- H1: 60px (desktop), 36px (mobile), font-weight: 700
- Subheading: 20px (desktop), 16px (mobile), font-weight: 400
- Color: Gray-900 for main text, Green-600 for accent

**Colors:**
- Background: Gradient from blue-50 to green-50
- Text: Gray-900 (primary), Gray-600 (secondary)
- Accent: Green-600 (#22c55e)

**Animations:**
```tsx
// utils/animations.ts
export const heroAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};
```

### Copy (Final)

**Основной заголовок (выбран Вариант 2):**
> "Выявить Потенциал Сотрудника за 90 Секунд"

**Подзаголовок:**
> "AI анализирует резюме, видит скрытые суперсилы, предлагает конкретные пути развития в вашей компании. Вместо часов консультирования — PDF с готовыми рекомендациями."

**CTAs:**
1. Primary: "Попробовать Бесплатно" → 5 анализов, 14 дней, карта не требуется
2. Secondary: "Получить Демо" → 15 минут с экспертом
3. Tertiary: "Говорить с Клиентом" → Reference call

### Layout Details

**Responsive:**
- Desktop (1200px+): Hero text left, video right (50/50 split)
- Tablet (768-1199px): Centered text, video below
- Mobile (<768px): Stacked, video hidden

**Spacing:**
- Container: max-w-7xl, px-4 (mobile), px-8 (desktop)
- Section padding: py-20 (desktop), py-12 (mobile)
- Gap between elements: mb-6 to mb-12

---

## 2. Trust Bar

### Purpose
Создать доверие через логотипы клиентов и социальные доказательства.

### Elements

```tsx
// components/TrustBar.tsx
export function TrustBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wide">
          Доверяют лидеры российского бизнеса
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {clientLogos.map((logo, idx) => (
            <div key={idx} className="flex justify-center opacity-60 hover:opacity-100 transition-opacity">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 object-contain grayscale"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="text-green-600" />
            <span className="text-gray-700">120+ компаний используют Астру</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="text-green-600" />
            <span className="text-gray-700">99.9% анализов оценены как качественные</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="text-green-600" />
            <span className="text-gray-700">5,000+ сотрудников получили рекомендации</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Visual Style

**Layout:**
- Full width, white background
- Logos: grayscale, 60% opacity (100% on hover)
- Border top and bottom: 1px solid gray-200

**Spacing:**
- py-12 for section
- gap-8 between logos

---

## 3. Problem Statement (Pain Section)

### Purpose
Резонировать с болями целевой аудитории (HR-директора), создать ощущение "это о нас".

### Elements

```tsx
// components/PainSection.tsx
export function PainSection() {
  const painPoints = [
    {
      icon: <Users className="w-16 h-16 text-orange-500" />,
      stat: "71% молодых",
      headline: "говорят 'нет пути развития' при уходе",
      body: "Они не видят, как расти в компании. Видят вакансию на LinkedIn и думают: 'А дома такого нет?' Компания теряет талант потому что... он не знал, что он талант.",
      cost: "250,000 рублей стоит один уход",
      cta: {
        text: "Посчитать ваши потери",
        href: "#roi-calculator"
      }
    },
    {
      icon: <Clock className="w-16 h-16 text-orange-500" />,
      stat: "2-3 часа",
      headline: "занимает анализ одного резюме",
      body: "HR встречается с сотрудником, анализирует резюме, советуется с менеджером, создаёт план развития. Это не масштабируется. При 100 запросах в год = 200-300 часов потеряно.",
      cost: "1-1.5 FTE потеряно в год на карьерные консультации",
      cta: {
        text: "Как Астра это решает",
        href: "#solution"
      }
    },
    {
      icon: <DollarSign className="w-16 h-16 text-orange-500" />,
      stat: "31.25M рублей",
      headline: "потеря в год на текучку (компания 500 чел)",
      body: "Компания 500 человек с 25% текучкой теряет 31.25M рублей в год (при средней зарплате 250k). Это стоимость рекрутинга, адаптации, потери продуктивности. Астра стоит 30k. ROI: 162x.",
      cost: "это почти как потеря целого отдела",
      cta: {
        text: "Калькулятор потерь",
        href: "#roi-calculator"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Почему Ваши Лучшие Люди Уходят
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HR-директора тратят сотни часов на карьерные запросы, но всё равно
            теряют топ-таланты. Вот почему.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((pain, idx) => (
            <PainCard key={idx} {...pain} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" size="large" href="#roi-calculator">
            Запустить Калькулятор Потерь
          </Button>
        </div>
      </div>
    </section>
  );
}

function PainCard({ icon, stat, headline, body, cost, cta }) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-6">
        {icon}
      </div>

      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-orange-600 mb-2">{stat}</div>
        <h3 className="text-xl font-semibold text-gray-900">{headline}</h3>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{body}</p>

      <div className="bg-orange-50 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-orange-900">{cost}</p>
      </div>

      <a
        href={cta.href}
        className="text-green-600 font-semibold flex items-center justify-center gap-2 hover:gap-3 transition-all"
      >
        {cta.text} <ArrowRight />
      </a>
    </div>
  );
}
```

### Visual Style

**Typography:**
- H2: 48px (desktop), 32px (mobile), font-weight: 700
- Pain stat: 28px, font-weight: 700, color: orange-600
- Pain headline: 20px, font-weight: 600
- Body: 16px, line-height: 1.7

**Colors:**
- Background: gray-50
- Cards: white with shadow
- Icons: orange-500
- Stats: orange-600
- CTA links: green-600

**Layout:**
- 3-column grid on desktop
- 1-column stack on mobile
- Card padding: p-8
- Card gap: gap-8

### Copy (Final)

**Pain Point 1:**
- Stat: "71% молодых"
- Headline: "говорят 'нет пути развития' при уходе"
- Body: "Они не видят, как расти в компании. Видят вакансию на LinkedIn и думают: 'А дома такого нет?' Компания теряет талант потому что... он не знал, что он талант."
- Cost: "250,000 рублей стоит один уход"

**Pain Point 2:**
- Stat: "2-3 часа"
- Headline: "занимает анализ одного резюме"
- Body: "HR встречается с сотрудником, анализирует резюме, советуется с менеджером, создаёт план развития. Это не масштабируется. При 100 запросах в год = 200-300 часов потеряно."
- Cost: "1-1.5 FTE потеряно в год"

**Pain Point 3:**
- Stat: "31.25M рублей"
- Headline: "потеря в год на текучку (компания 500 чел)"
- Body: "Компания 500 человек с 25% текучкой теряет 31.25M рублей в год. Это стоимость рекрутинга, адаптации, потери продуктивности. Астра стоит 30k. ROI: 162x."
- Cost: "это почти как потеря целого отдела"

---

## 4. Solution Overview (How It Works)

### Purpose
Показать простоту использования, снять страх перед AI, продемонстрировать workflow.

### Elements

```tsx
// components/SolutionSection.tsx
export function SolutionSection() {
  const steps = [
    {
      number: 1,
      icon: <Upload />,
      title: "Загрузить",
      copy: "Любой формат (PDF, DOCX, TXT). Одна загрузка = один сотрудник. Данные зашифрованы.",
      visual: "/images/screenshots/upload-interface.png"
    },
    {
      number: 2,
      icon: <Brain />,
      title: "AI Анализирует (90 сек)",
      copy: "Google Gemini 2.5 Flash + специализированные промпты. 6 методов одновременно. Результат: 99.9% качество.",
      visual: "/images/screenshots/analysis-progress.png"
    },
    {
      number: 3,
      icon: <FileText />,
      title: "Получить PDF",
      copy: "Красивый отчет с рекомендациями. Содержит: сильные стороны, 3 роли, план на 365 дней. Готов к использованию на карьерной беседе.",
      visual: "/images/screenshots/pdf-preview.png"
    },
    {
      number: 4,
      icon: <MessageCircle />,
      title: "Провести Консультацию",
      copy: "Показать результат сотруднику. Обсудить план развития. Результат: мотивированный человек на 12+ месяцев.",
      visual: "/images/illustrations/consultation.svg"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Как Астра Выявляет Потенциал
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Четыре простых шага от загрузки резюме до готового плана развития
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, idx) => (
            <StepCard key={idx} {...step} showArrow={idx < steps.length - 1} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="primary" size="large">
            Начать Анализ
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Первый анализ бесплатно • Без кредитной карты
          </p>
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, icon, title, copy, visual, showArrow }) {
  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        {/* Number Badge */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">{number}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-green-600">{icon}</div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{copy}</p>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src={visual} alt={title} className="w-full" />
          </div>
        </div>
      </div>

      {/* Arrow (desktop only) */}
      {showArrow && (
        <div className="hidden md:block absolute -right-6 top-8">
          <ArrowRight className="text-gray-300 w-12 h-12" />
        </div>
      )}
    </div>
  );
}
```

### Visual Style

**Layout:**
- 2x2 grid on desktop
- 1 column on mobile
- Numbered badges: 64px circle, green-100 background
- Icons: green-600 color

**Typography:**
- Step title: 24px, font-weight: 700
- Step copy: 16px, line-height: 1.7

**Animations:**
- Fade in on scroll
- Hover effect on cards (subtle shadow increase)

### Copy (Final)

**Step 1: Загрузить**
> "Любой формат (PDF, DOCX, TXT). Одна загрузка = один сотрудник. Данные зашифрованы."

**Step 2: AI Анализирует (90 сек)**
> "Google Gemini 2.5 Flash + специализированные промпты. 6 методов одновременно. Результат: 99.9% качество."

**Step 3: Получить PDF**
> "Красивый отчет с рекомендациями. Содержит: сильные стороны, 3 роли, план на 365 дней. Готов к использованию на карьерной беседе."

**Step 4: Провести Консультацию**
> "Показать результат сотруднику. Обсудить план развития. Результат: мотивированный человек на 12+ месяцев."

---

## 5. Key Features (6 методов анализа)

### Purpose
Показать глубину и комплексность анализа, обосновать техническую ценность.

### Elements

```tsx
// components/FeaturesSection.tsx
export function FeaturesSection() {
  const features = [
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Карьерные Инсайты",
      description: "Выявляет 3-5 суперсил, 3-4 потенциальные роли, области развития.",
      example: "Например: 'Стратегическое повествование через данные → PM / Product Lead'",
      color: "green"
    },
    {
      icon: <Grid className="w-12 h-12" />,
      title: "SWOT-анализ",
      description: "Strengths, Weaknesses, Opportunities, Threats.",
      example: "Результат: полная картина потенциала и рисков.",
      color: "blue"
    },
    {
      icon: <Puzzle className="w-12 h-12" />,
      title: "Holland Personality (RIASEC)",
      description: "Измеряет 6 аспектов: R-I-A-S-E-C.",
      example: "Результат: какие роли подходят психологически.",
      color: "purple"
    },
    {
      icon: <Map className="w-12 h-12" />,
      title: "IDP План Развития",
      description: "План на 30/90/180/365 дней с конкретными действиями.",
      example: "Результат: человек знает, что делать в следующие 12 месяцев.",
      color: "orange"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Soft Skills Assessment",
      description: "Коммуникация, лидерство, teamwork, критическое мышление.",
      example: "Результат: какие навыки укреплять для следующей роли.",
      color: "teal"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Психометрический Профиль",
      description: "Эмоциональная интеллектность, логическое мышление, стрессоустойчивость.",
      example: "Результат: научное понимание когнитивного профиля.",
      color: "indigo"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            6 Методов Анализа в Один Клик
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Комплексный анализ, который обычно требует недель работы
            с психологами и карьерными консультантами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, example, color }) {
  const colorClasses = {
    green: "text-green-600 bg-green-100",
    blue: "text-blue-600 bg-blue-100",
    purple: "text-purple-600 bg-purple-100",
    orange: "text-orange-600 bg-orange-100",
    teal: "text-teal-600 bg-teal-100",
    indigo: "text-indigo-600 bg-indigo-100"
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
      <div className={`w-20 h-20 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-6`}>
        <div className={colorClasses[color].split(' ')[0]}>{icon}</div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-700 italic">{example}</p>
      </div>
    </div>
  );
}
```

### Visual Style

**Layout:**
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- Card padding: p-8

**Colors:**
- Icon backgrounds: Each feature has unique color (green, blue, purple, orange, teal, indigo)
- Icons: 48px × 48px
- Icon container: 80px × 80px rounded square

**Typography:**
- Feature title: 24px, font-weight: 700
- Description: 16px, line-height: 1.7
- Example: 14px, italic, gray-700

### Copy (Final)

**Метод 1: Карьерные Инсайты**
> Выявляет 3-5 суперсил, 3-4 потенциальные роли, области развития.
> Например: "Стратегическое повествование через данные → PM / Product Lead"

**Метод 2: SWOT-анализ**
> Strengths, Weaknesses, Opportunities, Threats.
> Результат: полная картина потенциала и рисков.

**Метод 3: Holland Personality (RIASEC)**
> Измеряет 6 аспектов: R-I-A-S-E-C.
> Результат: какие роли подходят психологически.

**Метод 4: IDP План Развития**
> План на 30/90/180/365 дней с конкретными действиями.
> Результат: человек знает, что делать в следующие 12 месяцев.

**Метод 5: Soft Skills Assessment**
> Коммуникация, лидерство, teamwork, критическое мышление.
> Результат: какие навыки укреплять для следующей роли.

**Метод 6: Психометрический Профиль**
> Эмоциональная интеллектность, логическое мышление, стрессоустойчивость.
> Результат: научное понимание когнитивного профиля.

---

## 6. Results & Metrics

### Purpose
Показать конкретные, измеримые результаты для обоснования ROI.

### Elements

```tsx
// components/ResultsSection.tsx
export function ResultsSection() {
  const metrics = [
    {
      number: "85%",
      label: "Снижение времени на анализ",
      detail: "Вместо 5-10 дней консультаций → 90 секунд анализа",
      impact: "Экономия: HR-специалист получает 10+ часов в неделю"
    },
    {
      number: "23%",
      label: "Рост удержания топ-талантов",
      detail: "Видимость карьерного роста предотвращает уход в конкурента",
      impact: "Экономия затрат на рекрутинг и адаптацию"
    },
    {
      number: "70%",
      label: "Снижение затрат на консультации",
      detail: "Нет нужды привлекать коучей и психологов для анализа",
      impact: "Экономия: ~50-100k в год на компанию из 500 человек"
    },
    {
      number: "40%",
      label: "Ускорение закрытия позиций",
      detail: "Быстрее находим внутренних кандидатов на повышение",
      impact: "Сокращается время поиска с 3 месяцев до 6-8 недель"
    },
    {
      number: "31%",
      label: "Увеличение вовлечённости",
      detail: "Сотрудники видят, что компания инвестирует в их развитие",
      impact: "Улучшение морального климата и производительности"
    },
    {
      number: "25x",
      label: "Масштабируемость без найма",
      detail: "Один человек анализирует 500+ сотрудников в год",
      impact: "Вместо 15-20 при ручном подходе"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Измеримые Результаты для Вашего Бизнеса
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Не просто обещания — конкретные метрики от клиентов Астры
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>

        <div className="mt-16 bg-green-50 rounded-xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Хотите увидеть ROI для вашей компании?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Используйте наш калькулятор, чтобы посчитать потенциальную экономию
            </p>
            <Button variant="primary" size="large" href="#roi-calculator">
              Запустить Калькулятор
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ number, label, detail, impact }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
      <div className="text-5xl font-bold text-green-600 mb-3">{number}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{label}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{detail}</p>
      <div className="border-t border-green-200 pt-4">
        <p className="text-sm font-semibold text-green-700">{impact}</p>
      </div>
    </div>
  );
}
```

### Visual Style

**Layout:**
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile

**Colors:**
- Card background: gradient from green-50 to blue-50
- Border: green-200
- Number: 48px, font-weight: 700, green-600

**Typography:**
- Metric number: 48px, bold
- Label: 20px, bold
- Detail: 16px, regular
- Impact: 14px, semibold, green-700

### Copy (Final)

Все метрики с детализацией включены в компонент выше.

---

## 7. Use Cases

### Purpose
Показать реальные ситуации применения, создать релевантность для разных сегментов HR.

### Elements

```tsx
// components/UseCasesSection.tsx
export function UseCasesSection() {
  const cases = [
    {
      title: "Карьерный запрос от амбициозного разработчика",
      company: "Tech Company (250 чел)",
      situation: "Разработчик с 3 годами опыта просит повышение, но совершенно не подходит для мидл-позиции.",
      problem: "HR часами совещается с техлидами и менеджерами, не зная, как корректно отказать и при этом удержать таланта.",
      solution: [
        "Астра анализирует резюме, показывает:",
        "✓ Текущие сильные стороны",
        "✓ Что нужно развивать ещё 6-12 месяцев",
        "✓ Реалистичный план с конкретными проектами",
        "✓ Альтернативный путь (специализированная роль без управления)"
      ],
      result: "Сотрудник понимает, видит путь развития, остаётся в компании.",
      metrics: {
        retention: "+1 талант",
        time_saved: "4 часа",
        cost_avoided: "250k рублей"
      }
    },
    {
      title: "Поиск замены уходящему руководителю",
      company: "Finance Company (400 чел)",
      situation: "Начальник отдела уходит, нужно найти замену внутри компании. Но кто готов? Неясно.",
      problem: "Ручной поиск и интервьюирование 5-10 кандидатов = 2-3 недели. Неэффективный процесс, можем пропустить лучшего кандидата.",
      solution: [
        "Астра быстро анализирует резюме 5-10 потенциальных кандидатов:",
        "✓ Выделяет лучших по компетенциям",
        "✓ Показывает, какие зоны развития подтянуть",
        "✓ Генерирует ИПР для ускоренной подготовки"
      ],
      result: "Решение за 1-2 дня вместо 2-3 недель.",
      metrics: {
        time_saved: "2 недели",
        internal_hire: "100%",
        cost_avoided: "500k рублей"
      }
    },
    {
      title: "Массовое проектирование развития",
      company: "Retail Company (300 чел)",
      situation: "Компания из 300 человек хочет создать культуру развития. Нужны планы развития для каждого, но ресурсов нет.",
      problem: "Нанять 3 коучей на такую задачу = 500k-1M в год. Ручной анализ: 1-2 человека в день = 150-300 дней работы.",
      solution: [
        "Один HR-специалист, Астра, 2 недели:",
        "✓ Загружает все резюме",
        "✓ Запускает массовый анализ",
        "✓ Получает отчёты для всех",
        "✓ Обсуждает с менеджерами уточнения"
      ],
      result: "Культура развития, удержание талантов, затраты на 80% ниже.",
      metrics: {
        employees_analyzed: "300",
        time_taken: "2 недели",
        cost_saved: "800k рублей"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Кейсы от Реальных Компаний
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Когда Астра наиболее ценна
          </p>
        </div>

        <div className="space-y-12">
          {cases.map((useCase, idx) => (
            <UseCaseCard key={idx} {...useCase} isReversed={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ title, company, situation, problem, solution, result, metrics, isReversed }) {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 bg-white rounded-xl shadow-lg overflow-hidden`}>
      {/* Visual */}
      <div className="lg:w-1/3 bg-gradient-to-br from-green-100 to-blue-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="font-semibold text-gray-700">{company}</p>
        </div>
      </div>

      {/* Content */}
      <div className="lg:w-2/3 p-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">{title}</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Ситуация:</h4>
            <p className="text-gray-600">{situation}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Проблема:</h4>
            <p className="text-gray-600">{problem}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Решение:</h4>
            <ul className="space-y-1">
              {solution.map((item, idx) => (
                <li key={idx} className="text-gray-600">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Результат:</h4>
            <p className="text-green-800">{result}</p>
          </div>

          <div className="flex gap-6 mt-4">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-green-600">{value}</div>
                <div className="text-sm text-gray-500">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Visual Style

**Layout:**
- Alternating left/right layout (zigzag pattern)
- Visual (1/3) + Content (2/3)
- White cards with shadow on gray-50 background

**Colors:**
- Card: white with shadow-lg
- Visual area: gradient green-100 to blue-100
- Result box: green-50 background

### Copy (Final)

Все кейсы детально описаны в компоненте выше.

---

## 8. Social Proof (Testimonials)

### Purpose
Создать доверие через отзывы реальных пользователей и клиентские логотипы.

### Elements

```tsx
// components/TestimonialsSection.tsx
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Мы провели 100 анализов в течение месяца. Раньше это заняло бы 3-4 месяца работы. Текучка упала на 8%, внутренний найм вырос на 15%.",
      author: "Мария Сидорова",
      role: "HR Director",
      company: "Tech Co (250)",
      avatar: "/images/avatars/maria.jpg",
      rating: 5
    },
    {
      quote: "ROI был простой: мы сэкономили 1.5M на текучке. 50x возврат. Для CFO это no-brainer решение.",
      author: "Алексей Петров",
      role: "CFO",
      company: "Finance Co (400)",
      avatar: "/images/avatars/alexey.jpg",
      rating: 5
    },
    {
      quote: "Когда я получил анализ, я был поражен. Они видели во мне лидера, который я не видел в себе. Я остался в компании вместо поиска работы вовне.",
      author: "Иван Иванов",
      role: "Senior Engineer",
      company: "Tech Co",
      avatar: "/images/avatars/ivan.jpg",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Доверяют Лидеры Российского Бизнеса
          </h2>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-col md:flex-row justify-center gap-12 mb-16 text-center">
          <Stat icon={<Building />} text="120+ компаний используют Астру" />
          <Stat icon={<Star />} text="99.9% анализов оценены как качественные" />
          <Stat icon={<Users />} text="5,000+ сотрудников получили рекомендации" />
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, role, company, avatar, rating }) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">{role}</div>
          <div className="text-sm text-gray-500">{company}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-green-600">{icon}</div>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
}
```

### Visual Style

**Layout:**
- 3-column grid for testimonials
- Stats bar above testimonials (horizontal flex)

**Colors:**
- Cards: white with border-gray-200 and shadow-lg
- Stars: yellow-400
- Icons: green-600

**Typography:**
- Quote: 16px, line-height: 1.7
- Author: 16px, font-weight: 600
- Role/Company: 14px, gray-600

### Copy (Final)

Все отзывы включены в компонент выше.

---

## 9. Pricing Table

### Purpose
Показать прозрачные цены, помочь клиентам выбрать подходящий пакет.

### Elements

```tsx
// components/PricingSection.tsx
export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "30,000",
      period: "руб/год",
      description: "Для компаний до 500 человек, начинающие использование",
      features: [
        "До 500 анализов в год",
        "Все 6 методов анализа",
        "Email поддержка (24/5)",
        "Базовый API доступ",
        "PDF отчеты"
      ],
      cta: "Выбрать Basic",
      highlighted: false
    },
    {
      name: "Pro",
      price: "60,000",
      period: "руб/год",
      description: "Для компаний 500-2000 человек, активное использование",
      badge: "Рекомендуем",
      features: [
        "UNLIMITED анализы",
        "Все 6 методов + advanced analytics",
        "Priority поддержка (телефон)",
        "Полный API доступ",
        "Интеграции (ATS, HR systems)",
        "Bulk upload (CSV)",
        "Analytics дашборд"
      ],
      cta: "Выбрать Pro",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "руб/год",
      description: "Для крупных компаний 2000+ чел, комплексные потребности",
      features: [
        "UNLIMITED все",
        "Dedicated account manager",
        "Custom промпты под вашу компанию",
        "White-label option",
        "SLA гарантии (99.9% uptime)",
        "Premium поддержка (24/7)",
        "Consultations на внедрение"
      ],
      cta: "Связаться с Sales",
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Простые Цены
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Нет скрытых платежей. Отмена в любой момент.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>Нужна консультация? <a href="#contact" className="text-green-600 font-semibold hover:underline">Напишите нам</a></p>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ name, price, period, description, badge, features, cta, highlighted }) {
  return (
    <div className={`
      relative bg-white rounded-xl p-8 shadow-md
      ${highlighted ? 'ring-4 ring-green-500 scale-105' : ''}
      hover:shadow-xl transition-all
    `}>
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {badge}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="text-5xl font-bold text-gray-900 mb-2">{price}</div>
        <div className="text-gray-600">{period}</div>
      </div>

      <p className="text-gray-600 text-center mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "primary" : "secondary"}
        className="w-full"
      >
        {cta}
      </Button>
    </div>
  );
}
```

### Visual Style

**Layout:**
- 3-column grid on desktop
- 1-column stack on mobile
- Middle card (Pro) highlighted with ring and scale

**Colors:**
- Cards: white background with shadow
- Highlighted: ring-4 ring-green-500
- Badge: green-600 background
- Checkmarks: green-600

**Typography:**
- Plan name: 24px, bold
- Price: 48px, bold
- Features: 16px, regular

### Copy (Final)

Все пакеты детально описаны в компоненте выше.

---

## 10. FAQ

### Purpose
Ответить на возражения, закрыть сомнения, предоставить детальную информацию.

### Elements

```tsx
// components/FAQSection.tsx
export function FAQSection() {
  const faqs = [
    {
      question: "Как это работает?",
      answer: "Загружаете резюме → AI анализирует (90 сек) → получаете PDF. 6 методов одновременно: карьерные инсайты, SWOT, Holland, IDP, soft skills, психометрия."
    },
    {
      question: "Это заменяет HR консультанта?",
      answer: "Нет, это помощник. HR проводит консультацию, но на основе AI анализа. Результат: HR-ная производительность в 3 раза выше."
    },
    {
      question: "Какое время внедрения?",
      answer: "1 день. 30 минут на настройку, 30 минут на обучение, день 2 полностью готовы к работе."
    },
    {
      question: "Как это интегрируется с нашей системой?",
      answer: "Работает standalone или по API. Поддерживаем: Bitrix24, iCloud HR, Persco, 1C, SAP SuccessFactors. Если нужна кастом интеграция - поможем."
    },
    {
      question: "Что с GDPR / ФЗ-152?",
      answer: "Полностью compliant. Все данные зашифрованы (Fernet AES-128). Мы не продаём и не делимся данными. Audit logs для всего."
    },
    {
      question: "Какая будет поддержка?",
      answer: "Email (24/5, ответ за 24 часа), Chat (15 минут response). Pro+Enterprise: phone support и dedicated manager."
    },
    {
      question: "Я хочу попробовать, не платя?",
      answer: "Конечно! 5 бесплатных анализов, 14 дней доступа. Карта не требуется."
    },
    {
      question: "Сколько стоит на самом деле?",
      answer: "Basic: 30k/год. Pro: 60k/год. Enterprise: custom. Нет скрытых платежей. Всё включено."
    },
    {
      question: "Что если результаты не понравятся?",
      answer: "30 дней гарантия возврата денег. Никаких вопросов. На практике conversion очень высокий (25-30%)."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Часто Задаваемые Вопросы
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />

          <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
            <p className="text-gray-700 mb-4">Не нашли ответ?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary">Напишите в чат</Button>
              <Button variant="secondary">Email нам</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === idx}
          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-lg">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
```

### Visual Style

**Layout:**
- Centered, max-width: 768px
- Accordion pattern with expand/collapse

**Colors:**
- Question background: white
- Answer background: gray-50
- Border: gray-200

**Typography:**
- Question: 18px, font-weight: 600
- Answer: 16px, line-height: 1.7

**Animations:**
- Chevron rotates 180° when open
- Smooth expand/collapse transition

### Copy (Final)

Все вопросы и ответы включены в компонент выше.

---

## 11. Final CTA

### Purpose
Последний шанс конвертировать посетителя в лида или клиента.

### Elements

```tsx
// components/FinalCTASection.tsx
export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            Готовы к Революции в Карьерном Развитии?
          </h2>

          <p className="text-xl mb-12 opacity-90">
            Выберите свой путь
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CTAOption
              icon={<Zap />}
              title="Хотите быстро протестировать?"
              description="5 бесплатных анализов, 14 дней доступа"
              cta="Бесплатный Анализ"
              href="#trial"
            />

            <CTAOption
              icon={<Video />}
              title="Нужна полная картина?"
              description="15-минутная демонстрация с экспертом"
              cta="Запросить Демо"
              href="#demo"
              highlighted
            />

            <CTAOption
              icon={<Building />}
              title="Готовы внедрить по всей компании?"
              description="Обсудим интеграцию и enterprise план"
              cta="Обсудить Интеграцию"
              href="#enterprise"
            />
          </div>

          <div className="mt-12 text-sm opacity-80">
            Нужна только электронная почта. Без привязки карты.
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAOption({ icon, title, description, cta, href, highlighted = false }) {
  return (
    <div className={`
      bg-white rounded-lg p-8 text-gray-900
      ${highlighted ? 'ring-4 ring-yellow-400 scale-105' : ''}
      hover:shadow-2xl transition-all
    `}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-3">{title}</h3>

      <p className="text-gray-600 mb-6">{description}</p>

      <Button
        variant={highlighted ? "primary" : "secondary"}
        className="w-full"
        href={href}
      >
        {cta}
      </Button>
    </div>
  );
}
```

### Visual Style

**Layout:**
- Full-width gradient background
- 3-column grid for CTA options
- Middle option highlighted

**Colors:**
- Background: gradient from green-600 to blue-600
- Cards: white
- Highlighted ring: yellow-400

**Typography:**
- H2: 48px, bold, white
- Card title: 20px, bold
- Description: 16px

### Copy (Final)

**Заголовок:**
> "Готовы к Революции в Карьерном Развитии?"

**Опция 1: Быстрый тест**
> Хотите быстро протестировать?
> 5 бесплатных анализов, 14 дней доступа
> CTA: "Бесплатный Анализ"

**Опция 2: Демо (рекомендуем)**
> Нужна полная картина?
> 15-минутная демонстрация с экспертом
> CTA: "Запросить Демо"

**Опция 3: Enterprise**
> Готовы внедрить по всей компании?
> Обсудим интеграцию и enterprise план
> CTA: "Обсудить Интеграцию"

---

## 12. Footer

### Purpose
Навигация, легальная информация, контакты, социальные сети.

### Elements

```tsx
// components/Footer.tsx
export function Footer() {
  const footerLinks = {
    company: [
      { label: "О компании", href: "/about" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/contact" },
      { label: "Карьера", href: "/careers" }
    ],
    product: [
      { label: "Возможности", href: "#features" },
      { label: "Цены", href: "#pricing" },
      { label: "Демо", href: "#demo" },
      { label: "API", href: "/api-docs" }
    ],
    resources: [
      { label: "Блог", href: "/blog" },
      { label: "Документация", href: "/docs" },
      { label: "FAQ", href: "#faq" },
      { label: "Кейсы", href: "/case-studies" }
    ],
    legal: [
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Условия использования", href: "/terms" },
      { label: "Статус системы", href: "/status" }
    ]
  };

  const socialLinks = [
    { icon: <LinkedIn />, href: "https://linkedin.com/company/astra", label: "LinkedIn" },
    { icon: <Twitter />, href: "https://twitter.com/astra_ai", label: "Twitter" },
    { icon: <Github />, href: "https://github.com/astra-ai", label: "GitHub" },
    { icon: <Youtube />, href: "https://youtube.com/@astra", label: "YouTube" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Astra</span>
            </div>
            <p className="text-sm text-gray-400">
              AI для выявления потенциала и внутреннего развития
            </p>
          </div>

          {/* Links */}
          <FooterColumn title="Компания" links={footerLinks.company} />
          <FooterColumn title="Продукт" links={footerLinks.product} />
          <FooterColumn title="Ресурсы" links={footerLinks.resources} />
          <FooterColumn title="Легальное" links={footerLinks.legal} />
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8 pb-8 border-b border-gray-800">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Astra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:support@astra.ai" className="hover:text-white transition-colors">
              support@astra.ai
            </a>
            <a href="tel:+7XXXXXXXXXX" className="hover:text-white transition-colors">
              +7-XXX-XXX-XXXX
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className="text-sm hover:text-white transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Visual Style

**Layout:**
- 5-column grid on desktop (Brand + 4 link columns)
- Stacked on mobile
- Dark background (gray-900)

**Colors:**
- Background: gray-900
- Text: gray-300
- Links hover: white
- Social icons: gray-400 → white on hover

**Typography:**
- Column title: 16px, font-weight: 600, white
- Links: 14px, gray-300

---

## Design System Reference

### Colors

```tsx
// tailwind.config.ts
export const colors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',  // Main green
    600: '#16a34a',
    700: '#15803d'
  },
  secondary: {
    500: '#0066cc',  // Main blue
    600: '#1e40af',
    700: '#1e3a8a'
  },
  accent: {
    orange: '#f59e0b',
    yellow: '#fbbf24'
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    700: '#374151',
    900: '#111827'
  }
};
```

### Typography

```tsx
// Design tokens
export const typography = {
  h1: {
    desktop: '60px',
    mobile: '36px',
    fontWeight: '700',
    lineHeight: '1.1'
  },
  h2: {
    desktop: '48px',
    mobile: '32px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  h3: {
    desktop: '36px',
    mobile: '24px',
    fontWeight: '700',
    lineHeight: '1.3'
  },
  body: {
    desktop: '18px',
    mobile: '16px',
    fontWeight: '400',
    lineHeight: '1.7'
  },
  small: {
    desktop: '14px',
    mobile: '12px',
    fontWeight: '400',
    lineHeight: '1.5'
  }
};
```

### Spacing

```tsx
// Spacing system (based on 8px grid)
export const spacing = {
  section: {
    desktop: '80px',  // py-20
    tablet: '60px',   // py-15
    mobile: '40px'    // py-10
  },
  container: {
    maxWidth: '1280px',  // max-w-7xl
    padding: {
      desktop: '32px',   // px-8
      mobile: '16px'     // px-4
    }
  },
  gap: {
    large: '48px',   // gap-12
    medium: '32px',  // gap-8
    small: '16px'    // gap-4
  }
};
```

### Breakpoints

```tsx
// tailwind.config.ts
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

### Components

#### Button Component

```tsx
// components/ui/Button.tsx
export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  icon,
  href,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all";

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    tertiary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const className = `${baseClasses} ${variants[variant]} ${sizes[size]}`;

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
```

---

## Performance Checklist

### Image Optimization

- [ ] Use WebP format for all images
- [ ] Implement lazy loading for below-fold images
- [ ] Responsive images with srcset
- [ ] Optimize image sizes (max 200KB per image)
- [ ] Use CDN for image delivery

### Code Optimization

- [ ] Code splitting for routes
- [ ] Tree shaking for unused code
- [ ] Minify CSS and JS
- [ ] Enable Gzip/Brotli compression
- [ ] Critical CSS inline

### Loading Performance

- [ ] Target First Contentful Paint < 1.5s
- [ ] Target Largest Contentful Paint < 2.5s
- [ ] Target Time to Interactive < 3.5s
- [ ] Implement service worker for caching
- [ ] Preload critical resources

### SEO & Meta

- [ ] Meta title and description for each section
- [ ] Open Graph tags for social sharing
- [ ] Structured data (Schema.org)
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Canonical URLs

### Analytics & Tracking

- [ ] Google Analytics 4 integration
- [ ] Goal tracking for CTAs
- [ ] Heatmap tracking (Hotjar)
- [ ] A/B testing setup
- [ ] Conversion funnel tracking

### Accessibility

- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Color contrast ratio > 4.5:1
- [ ] Alt text for all images
- [ ] Focus indicators visible

---

## Implementation Roadmap

### Phase 1: Core Sections (Week 1)
1. Hero Section with CTAs
2. Pain Section with 3 pain points
3. Solution Section with 4 steps
4. Basic Footer

### Phase 2: Features & Social Proof (Week 2)
5. Features Section with 6 methods
6. Results & Metrics
7. Testimonials Section
8. Trust Bar

### Phase 3: Conversion Optimization (Week 3)
9. ROI Calculator (interactive)
10. Pricing Table
11. FAQ Section
12. Final CTA

### Phase 4: Polish & Launch (Week 4)
13. Use Cases section
14. Mobile optimization
15. Performance optimization
16. Analytics integration
17. A/B testing setup

---

## Sources

### Documentation
- `/home/yan/astra_landing/docs/marketing-strategy/LANDING_PAGE_STRUCTURE.md` - Маркетинговая стратегия и структура контента
- `/home/yan/astra_landing/docs/guides/LANDING_PAGE_QUICK_REFERENCE.md` - Готовые шаблоны и копирайтинг
- `/home/yan/astra_landing/docs/ux-design/LANDING_PAGE_VISUAL_STRUCTURE.txt` - Визуальная структура и дизайн

### Tech Stack
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion (для анимаций)
- Radix UI (для компонентов)

---

**Последнее обновление:** 2025-10-28
**Статус:** Ready for Development
**Следующие шаги:** Начать разработку с Hero Section
