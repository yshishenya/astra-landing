import { escapeHtml } from './utils';

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  companySize?: string;
  message: string;
}

/**
 * Demo booking form data interface
 */
export interface DemoFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  preferredTime?: string;
  companySize?: string;
}

/**
 * Generate HTML email template for contact form submission (sent to team)
 * All user input is escaped to prevent XSS attacks
 */
export function contactFormEmailToTeam(data: ContactFormData): string {
  return `
    <h2>Новое обращение с сайта Astra</h2>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Компания:</strong> ${escapeHtml(data.company)}</p>
    ${data.companySize ? `<p><strong>Размер компании:</strong> ${escapeHtml(data.companySize)}</p>` : ''}
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
  `;
}

/**
 * Generate HTML email template for demo booking (sent to team)
 * All user input is escaped to prevent XSS attacks
 */
export function demoBookingEmailToTeam(data: DemoFormData): string {
  return `
    <h2>Новый запрос на демонстрацию Astra</h2>
    <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Компания:</strong> ${escapeHtml(data.company)}</p>
    ${data.phone ? `<p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>` : ''}
    ${data.companySize ? `<p><strong>Размер компании:</strong> ${escapeHtml(data.companySize)}</p>` : ''}
    ${data.preferredTime ? `<p><strong>Предпочтительное время:</strong> ${escapeHtml(data.preferredTime)}</p>` : ''}
    <hr>
    <p><em>Срочность: Высокая - клиент заинтересован в демонстрации продукта</em></p>
  `;
}

/**
 * Generate HTML email template for demo booking confirmation (sent to user)
 * All user input is escaped to prevent XSS attacks
 */
export function demoBookingConfirmationEmail(
  data: DemoFormData,
  contactEmail: string,
  appUrl: string
): string {
  return `
    <h2>Спасибо за интерес к Astra!</h2>
    <p>Здравствуйте, ${escapeHtml(data.name)}!</p>
    <p>Мы получили ваш запрос на демонстрацию нашего AI-карьерного помощника.</p>
    <p>Наш менеджер свяжется с вами в ближайшее время для согласования удобного времени.</p>
    <p>Если у вас возникли вопросы, вы можете связаться с нами:</p>
    <ul>
      <li>Email: ${escapeHtml(contactEmail)}</li>
      <li>Сайт: ${escapeHtml(appUrl)}</li>
    </ul>
    <p>С уважением,<br>Команда Astra</p>
  `;
}

/**
 * Plain text versions for email clients that don't support HTML
 */
export function contactFormEmailToTeamPlainText(data: ContactFormData): string {
  return `
Новое обращение с сайта Astra

Имя: ${data.name}
Email: ${data.email}
Компания: ${data.company}
${data.companySize ? `Размер компании: ${data.companySize}\n` : ''}
Сообщение:
${data.message}
  `.trim();
}

export function demoBookingEmailToTeamPlainText(data: DemoFormData): string {
  return `
Новый запрос на демонстрацию Astra

Имя: ${data.name}
Email: ${data.email}
Компания: ${data.company}
${data.phone ? `Телефон: ${data.phone}\n` : ''}
${data.companySize ? `Размер компании: ${data.companySize}\n` : ''}
${data.preferredTime ? `Предпочтительное время: ${data.preferredTime}\n` : ''}

Срочность: Высокая - клиент заинтересован в демонстрации продукта
  `.trim();
}

export function demoBookingConfirmationEmailPlainText(
  data: DemoFormData,
  contactEmail: string,
  appUrl: string
): string {
  return `
Спасибо за интерес к Astra!

Здравствуйте, ${data.name}!

Мы получили ваш запрос на демонстрацию нашего AI-карьерного помощника.
Наш менеджер свяжется с вами в ближайшее время для согласования удобного времени.

Если у вас возникли вопросы, вы можете связаться с нами:
- Email: ${contactEmail}
- Сайт: ${appUrl}

С уважением,
Команда Astra
  `.trim();
}
