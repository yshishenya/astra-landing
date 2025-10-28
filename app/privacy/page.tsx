import { type Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Astra',
  description: 'Политика конфиденциальности и обработки персональных данных Astra',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-5xl font-bold">Политика конфиденциальности</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-slate-600 mb-8">
                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">1. Общие положения</h2>
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты
                  персональных данных пользователей сервиса Astra (далее — «Сервис»).
                </p>
                <p>
                  Используя Сервис, вы соглашаетесь с условиями настоящей Политики
                  конфиденциальности.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">2. Какие данные мы собираем</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Контактные данные:</strong> имя, email, телефон, название компании</li>
                  <li><strong>Данные использования:</strong> информация о взаимодействии с сайтом</li>
                  <li><strong>Технические данные:</strong> IP-адрес, браузер, устройство</li>
                  <li><strong>Файлы резюме:</strong> данные из загруженных резюме для анализа</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">3. Как мы используем данные</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Предоставление и улучшение Сервиса</li>
                  <li>Связь с пользователями по вопросам использования</li>
                  <li>Анализ и улучшение работы платформы</li>
                  <li>Соблюдение законодательства РФ</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">4. Защита данных</h2>
                <p>
                  Мы применяем современные технологии защиты данных:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Шифрование TLS 1.3 для передачи данных</li>
                  <li>Шифрование AES-256 для хранения</li>
                  <li>Регулярные аудиты безопасности</li>
                  <li>Ограниченный доступ к данным</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">5. Ваши права</h2>
                <p>Вы имеете право:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Получить доступ к своим персональным данным</li>
                  <li>Исправить неточные данные</li>
                  <li>Удалить свои данные</li>
                  <li>Ограничить обработку данных</li>
                  <li>Возразить против обработки</li>
                  <li>Получить данные в переносимом формате</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">6. Cookies</h2>
                <p>
                  Мы используем cookies для улучшения работы сайта. Вы можете управлять cookies
                  в настройках браузера.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4">7. Контакты</h2>
                <p>
                  По вопросам обработки персональных данных обращайтесь:
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@astra.example.com" className="text-primary hover:underline">
                    privacy@astra.example.com
                  </a>
                </p>
              </section>

              <div className="mt-16 p-6 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  Настоящая политика может быть изменена. Актуальная версия всегда доступна
                  на этой странице.
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
