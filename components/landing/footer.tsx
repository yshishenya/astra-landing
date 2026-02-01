import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

/**
 * Renders the footer component with links to products, resources, company information, and legal documents.
 */
export function Footer() {
  const footerLinks = {
    product: [
      { label: 'Возможности', href: '#features' },
      { label: 'Цены', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Демо', href: '#demo' },
    ],
    resources: [
      { label: 'Документация', href: '#' }, // TODO: Create /docs page
      { label: 'API', href: '#' }, // TODO: Create /api page
      { label: 'Интеграции', href: '#' }, // TODO: Create /integrations page
      { label: 'Блог', href: '#' }, // TODO: Create /blog page
    ],
    company: [
      { label: 'О нас', href: '#' }, // TODO: Create /about page
      { label: 'Кейсы', href: '/case-studies' },
      { label: 'Карьера', href: '#' }, // TODO: Create /careers page
      { label: 'Контакты', href: '#contact' },
      { label: 'Партнёры', href: '#' }, // TODO: Create /partners page
    ],
    legal: [
      { label: 'Политика конфиденциальности', href: '#' }, // TODO: Create /privacy page
      { label: 'Условия использования', href: '#' }, // TODO: Create /terms page
      { label: 'Cookies', href: '#' }, // TODO: Create /cookies page
      { label: 'GDPR', href: '#' }, // TODO: Create /gdpr page
    ],
  };

  const socialLinks = [
    { icon: Mail, href: `mailto:${APP_CONFIG.email}`, label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com/company/astra', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/astra', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/astra', label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-custom py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                <Image
                  src="/astra.png"
                  alt="Astra"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">Astra</span>
            </Link>
            <p className="text-sm text-slate-600 mb-6 max-w-xs">
              AI-ассистент для внутрикорпоративного карьерного развития. Анализ резюме за 90
              секунд.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-white hover:text-primary"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Продукт</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Ресурсы</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Компания</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Документы</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 lg:flex-row">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Astra. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-slate-600 transition-colors hover:text-primary"
            >
              Конфиденциальность
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-600 transition-colors hover:text-primary"
            >
              Условия
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-600 transition-colors hover:text-primary"
            >
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
