import { type Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export const metadata: Metadata = {
  title: 'Условия использования — Astra',
  description: 'Условия использования сервиса Astra',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-5xl font-bold">Условия использования</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-slate-600 mb-8">
                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">1. Принятие условий</h2>
                <p>
                  Используя сервис Astra (далее — «Сервис»), вы соглашаетесь с настоящими
                  Условиями использования. Если вы не согласны с данными условиями,
                  пожалуйста, не используйте Сервис.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">2. Описание сервиса</h2>
                <p>
                  Astra — это AI-powered платформа для карьерного консультирования и развития
                  сотрудников внутри компании. Сервис предоставляет:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Анализ резюме и профилей сотрудников</li>
                  <li>Карьерные рекомендации и пути развития</li>
                  <li>SWOT-анализ, Holland Personality Test, ИПР</li>
                  <li>Оценку soft skills и психометрический профиль</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">3. Регистрация и аккаунт</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Для использования Сервиса необходима регистрация</li>
                  <li>Вы обязаны предоставлять точную информацию</li>
                  <li>Вы несете ответственность за безопасность своего аккаунта</li>
                  <li>Один аккаунт не может использоваться несколькими лицами</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">4. Использование сервиса</h2>
                <p><strong>Разрешенное использование:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Анализ резюме сотрудников для внутреннего развития</li>
                  <li>Создание планов развития (ИПР)</li>
                  <li>Карьерное консультирование внутри компании</li>
                </ul>

                <p className="mt-6"><strong>Запрещенное использование:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Использование для рекрутинга конкурентов</li>
                  <li>Продажа или передача данных третьим лицам</li>
                  <li>Реверс-инжиниринг или копирование алгоритмов</li>
                  <li>Автоматизированный сбор данных (scraping)</li>
                  <li>Любые незаконные действия</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">5. Тарифы и оплата</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Цены указаны на сайте и могут быть изменены</li>
                  <li>Оплата производится до начала использования</li>
                  <li>Возврат средств возможен в течение 14 дней (пробный период)</li>
                  <li>Автоматическое продление подписки (можно отключить)</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">6. Интеллектуальная собственность</h2>
                <p>
                  Все права на Сервис, включая код, дизайн, алгоритмы и контент,
                  принадлежат владельцам Astra. Вы получаете только лицензию на использование.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">7. Ограничение ответственности</h2>
                <p>
                  Сервис предоставляется «как есть». Мы не гарантируем:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Абсолютную точность AI-анализа (рекомендуем проверку специалистом)</li>
                  <li>Бесперебойную работу 100% времени</li>
                  <li>Полное отсутствие ошибок</li>
                </ul>
                <p className="mt-4">
                  <strong>Важно:</strong> Astra — это инструмент для HR-специалистов,
                  а не замена человеческой экспертизы. Окончательные решения принимает человек.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">8. Прекращение использования</h2>
                <p>
                  Мы можем приостановить или прекратить ваш доступ в случае:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Нарушения условий использования</li>
                  <li>Неоплаты подписки</li>
                  <li>Незаконных действий</li>
                  <li>По вашему запросу</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">9. Изменение условий</h2>
                <p>
                  Мы можем изменять условия. О существенных изменениях мы уведомим за 30 дней.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">10. Применимое право</h2>
                <p>
                  Настоящие условия регулируются законодательством Российской Федерации.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">11. Контакты</h2>
                <p>
                  По вопросам условий использования:
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@astra.example.com" className="text-primary hover:underline">
                    legal@astra.example.com
                  </a>
                </p>
              </section>

              <div className="mt-16 p-6 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  Используя Сервис, вы подтверждаете, что прочитали и согласны с настоящими
                  Условиями использования и Политикой конфиденциальности.
                </p>
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
