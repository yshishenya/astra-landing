import { type Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Book, Code, Plug, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Документация — Astra',
  description: 'Документация и руководства по использованию Astra',
};

export default function DocsPage() {
  const docSections = [
    {
      icon: Book,
      title: 'Руководство пользователя',
      description: 'Пошаговые инструкции по использованию Astra',
      links: [
        { label: 'Быстрый старт', href: '#quickstart' },
        { label: 'Загрузка резюме', href: '#upload' },
        { label: 'Чтение отчетов', href: '#reports' },
        { label: 'Экспорт данных', href: '#export' },
      ],
    },
    {
      icon: Code,
      title: 'API Документация',
      description: 'REST API для интеграции с вашими системами',
      links: [
        { label: 'Аутентификация', href: '#auth' },
        { label: 'Endpoints', href: '#endpoints' },
        { label: 'Примеры кода', href: '#examples' },
        { label: 'Rate Limits', href: '#limits' },
      ],
    },
    {
      icon: Plug,
      title: 'Интеграции',
      description: 'Подключение к HRIS и другим системам',
      links: [
        { label: 'SAP SuccessFactors', href: '#sap' },
        { label: 'BambooHR', href: '#bamboo' },
        { label: '1C', href: '#1c' },
        { label: 'Bitrix24', href: '#bitrix' },
      ],
    },
    {
      icon: FileText,
      title: 'Ресурсы',
      description: 'Полезные материалы и FAQ',
      links: [
        { label: 'FAQ', href: '/#faq' },
        { label: 'Видео уроки', href: '#videos' },
        { label: 'Кейсы', href: '/#use-cases' },
        { label: 'Блог', href: '#blog' },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-4 text-5xl font-bold gradient-text">Документация</h1>
            <p className="text-xl text-slate-600 mb-16">
              Все что нужно знать для работы с Astra
            </p>

            <div className="grid gap-8 md:grid-cols-2 mb-16">
              {docSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="card-hover p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                        <p className="text-slate-600">{section.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 ml-16">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-primary hover:underline"
                          >
                            {link.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="card p-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="text-2xl font-bold mb-4">🚧 Раздел в разработке</h2>
              <p className="text-lg mb-6">
                Мы активно работаем над полной документацией. Если у вас есть вопросы,
                свяжитесь с нами:
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="text-primary hover:underline font-medium"
                >
                  Написать в поддержку →
                </Link>
                <Link
                  href="/#demo"
                  className="text-secondary hover:underline font-medium"
                >
                  Запросить демо →
                </Link>
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
