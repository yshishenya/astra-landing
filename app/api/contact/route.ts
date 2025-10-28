import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { contactFormEmailToTeam, contactFormEmailToTeamPlainText } from '@/lib/email-templates';
import { rateLimit, getClientIdentifier, RateLimitPresets } from '@/lib/rate-limit';
import { sendEmailWithTimeout, EmailTimeoutError } from '@/lib/email';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  company: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  companySize: z.string().optional(),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

// Initialize Resend (only if API key is provided)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    // Rate limiting: 10 requests per hour per IP
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, RateLimitPresets.MODERATE);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Слишком много запросов. Попробуйте снова через ${rateLimitResult.retryAfter} секунд.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
            'X-RateLimit-Limit': String(RateLimitPresets.MODERATE.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetAt),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = contactSchema.parse(body);

    // If Resend is configured, send email
    if (resend && process.env.RESEND_FROM_EMAIL) {
      await sendEmailWithTimeout(
        resend,
        {
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@astra.example.com',
          subject: `Новое сообщение от ${validatedData.name} (${validatedData.company})`,
          html: contactFormEmailToTeam(validatedData),
          text: contactFormEmailToTeamPlainText(validatedData),
        },
        10000 // 10 second timeout
      );
    } else {
      // Log to console if email is not configured (development mode)
      console.warn('Contact form submission (email not configured):', validatedData);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ошибка валидации данных',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle timeout errors
    if (error instanceof EmailTimeoutError) {
      console.error('Contact form email timeout:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Время ожидания отправки истекло. Попробуйте позже.',
        },
        { status: 504 }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Произошла ошибка при отправке сообщения. Попробуйте позже.',
      },
      { status: 500 }
    );
  }
}
