import Link from 'next/link';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Home, Search, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            {/* 404 Animation */}
            <div className="mb-12">
              <h1 className="text-9xl font-bold gradient-text animate-pulse">404</h1>
            </div>

            {/* Message */}
            <h2 className="mb-6 text-4xl font-bold">Страница не найдена</h2>
            <p className="text-xl text-slate-600 mb-12">
              К сожалению, страница, которую вы ищете, не существует или была перемещена.
            </p>

            {/* Navigation Options */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <Link href="/" className="block">
                <div className="card-hover p-6 text-center h-full">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Главная</h3>
                  <p className="text-sm text-slate-600">Вернуться на главную страницу</p>
                </div>
              </Link>

              <Link href="/#features" className="block">
                <div className="card-hover p-6 text-center h-full">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Search className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Возможности</h3>
                  <p className="text-sm text-slate-600">Узнать о функциях Astra</p>
                </div>
              </Link>

              <Link href="/#contact" className="block">
                <div className="card-hover p-6 text-center h-full">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Контакты</h3>
                  <p className="text-sm text-slate-600">Связаться с нами</p>
                </div>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button variant="primary" size="lg">
                  Вернуться на главную
                </Button>
              </Link>
              <Link href="/#demo">
                <Button variant="outline" size="lg">
                  Запланировать демо
                </Button>
              </Link>
            </div>

            {/* Search Suggestion */}
            <div className="mt-16 p-6 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                Возможно, вы искали:{' '}
                <Link href="/#features" className="text-primary hover:underline">
                  Возможности
                </Link>
                ,{' '}
                <Link href="/#pricing" className="text-primary hover:underline">
                  Цены
                </Link>
                ,{' '}
                <Link href="/#faq" className="text-primary hover:underline">
                  FAQ
                </Link>
                , или{' '}
                <Link href="/about" className="text-primary hover:underline">
                  О нас
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
