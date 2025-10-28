import { type Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'О нас — Astra',
  description: 'О компании Astra и нашей миссии по развитию карьеры сотрудников',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-5xl font-bold gradient-text">О проекте Astra</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-slate-600 mb-12">
                AI-powered платформа для карьерного развития сотрудников внутри компании
              </p>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
                <p className="text-lg leading-relaxed">
                  Мы создали Astra, чтобы решить главную проблему современных компаний —
                  <strong> 71% молодых специалистов уходят из-за отсутствия путей развития</strong>.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Наша цель — сделать карьерное консультирование доступным для каждого
                  сотрудника, сократив время анализа с 2-3 часов до 90 секунд с помощью AI.
                </p>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Почему Astra?</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="card-hover p-6">
                    <h3 className="text-xl font-bold mb-3 text-primary">⚡ Скорость</h3>
                    <p>90 секунд вместо 2-3 часов на анализ одного сотрудника</p>
                  </div>
                  <div className="card-hover p-6">
                    <h3 className="text-xl font-bold mb-3 text-secondary">🎯 Глубина</h3>
                    <p>6 методов анализа одновременно: SWOT, Holland, ИПР, Soft Skills и др.</p>
                  </div>
                  <div className="card-hover p-6">
                    <h3 className="text-xl font-bold mb-3 text-accent">📊 Точность</h3>
                    <p>99.9% качество благодаря Google Gemini 2.5 Flash</p>
                  </div>
                  <div className="card-hover p-6">
                    <h3 className="text-xl font-bold mb-3 text-purple">💰 ROI</h3>
                    <p>162x окупаемость, срок возврата инвестиций: 2-3 дня</p>
                  </div>
                </div>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Как мы это делаем</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  <li className="text-lg">
                    <strong>AI-анализ резюме:</strong> Загрузите резюме сотрудника в любом
                    формате (PDF, DOCX, TXT)
                  </li>
                  <li className="text-lg">
                    <strong>Комплексная оценка:</strong> Наш AI проводит 6 видов анализа
                    за 90 секунд
                  </li>
                  <li className="text-lg">
                    <strong>Подробный отчет:</strong> Получите PDF с карьерными инсайтами,
                    SWOT, ИПР на 30/90/180/365 дней
                  </li>
                  <li className="text-lg">
                    <strong>Консультация HR:</strong> Отчет — это основа для беседы с HR,
                    а не замена человека
                  </li>
                </ol>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Наш подход</h2>
                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Retention, не Recruitment</h3>
                  <p className="text-lg mb-4">
                    В отличие от рекрутинговых инструментов (LinkedIn, HeadHunter),
                    мы фокусируемся на <strong>внутреннем развитии</strong> существующих
                    сотрудников.
                  </p>
                  <p className="text-lg">
                    Результат: снижение текучки на 5-10%, экономия до 20M рублей в год
                    на замене сотрудников.
                  </p>
                </div>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Для кого мы?</h2>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                  <li><strong>HR-директора:</strong> автоматизация рутинной работы,
                  масштабирование карьерного консультирования</li>
                  <li><strong>CFO:</strong> измеримый ROI, снижение затрат на текучку</li>
                  <li><strong>CEO:</strong> культура развития, удержание талантов,
                  конкурентное преимущество</li>
                  <li><strong>Карьерные консультанты:</strong> инструмент для ускорения
                  анализа и расширения клиентской базы</li>
                </ul>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Технологии</h2>
                <p className="text-lg mb-4">
                  Мы используем передовые AI-технологии:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg">
                  <li><strong>Google Gemini 2.5 Flash</strong> — для анализа резюме</li>
                  <li><strong>Python + FastAPI</strong> — для backend</li>
                  <li><strong>React + Next.js</strong> — для frontend</li>
                  <li><strong>PostgreSQL</strong> — для хранения данных</li>
                  <li><strong>TLS 1.3 + AES-256</strong> — для безопасности</li>
                </ul>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Наши ценности</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">🔒 Конфиденциальность</h3>
                    <p>Мы НЕ обучаем модели на ваших данных. GDPR-compliant.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">🤝 Прозрачность</h3>
                    <p>Мы объясняем, как работают наши AI-алгоритмы.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">👥 Человечность</h3>
                    <p>AI — это инструмент для HR, не замена человека.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">📈 Результативность</h3>
                    <p>Мы измеряем наш успех по вашим результатам.</p>
                  </div>
                </div>
              </section>

              <div className="mt-16 p-8 bg-gradient-to-r from-primary to-accent rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
                <p className="text-xl mb-6">
                  Попробуйте Astra бесплатно в течение 14 дней. Кредитная карта не требуется.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/#demo">
                    <Button variant="secondary" size="lg">
                      Запланировать демо
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                      Связаться с нами
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/"
                className="text-primary hover:underline font-medium"
              >
                ← Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
