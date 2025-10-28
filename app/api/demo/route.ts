import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import {
  demoBookingEmailToTeam,
  demoBookingEmailToTeamPlainText,
  demoBookingConfirmationEmail,
  demoBookingConfirmationEmailPlainText,
} from '@/lib/email-templates';
import { rateLimit, getClientIdentifier, RateLimitPresets } from '@/lib/rate-limit';
import { sendEmailsWithTimeout, EmailTimeoutError } from '@/lib/email';

// Validation schema for demo booking form
const demoSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  company: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Некорректный номер телефона').optional(),
  preferredTime: z.string().optional(),
  companySize: z.string().optional(),
});

// Initialize Resend (only if API key is provided)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per hour per IP (stricter for demo bookings)
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, RateLimitPresets.STRICT);

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
            'X-RateLimit-Limit': String(RateLimitPresets.STRICT.maxRequests),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetAt),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = demoSchema.parse(body);

    // If Resend is configured, send email
    if (resend && process.env.RESEND_FROM_EMAIL) {
      const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@astra.example.com';
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://astra.example.com';

      // Send both emails with timeout protection
      const emailResult = await sendEmailsWithTimeout(
        resend,
        [
          // Send notification to team
          {
            from: process.env.RESEND_FROM_EMAIL,
            to: contactEmail,
            subject: `Запрос на демо от ${validatedData.name} (${validatedData.company})`,
            html: demoBookingEmailToTeam(validatedData),
            text: demoBookingEmailToTeamPlainText(validatedData),
          },
          // Send confirmation email to the user
          {
            from: process.env.RESEND_FROM_EMAIL,
            to: validatedData.email,
            subject: 'Запрос на демо Astra получен',
            html: demoBookingConfirmationEmail(validatedData, contactEmail, appUrl),
            text: demoBookingConfirmationEmailPlainText(validatedData, contactEmail, appUrl),
          },
        ],
        10000 // 10 second timeout per email
      );

      // Log if any emails failed
      if (emailResult.failed > 0) {
        console.warn('Some demo booking emails failed:', emailResult.results);
      }
    } else {
      // Log to console if email is not configured (development mode)
      console.warn('Demo booking submission (email not configured):', validatedData);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Запрос на демо успешно отправлен! Мы свяжемся с вами в течение 24 часов.',
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
      console.error('Demo booking email timeout:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Время ожидания отправки истекло. Попробуйте позже.',
        },
        { status: 504 }
      );
    }

    // Handle other errors
    console.error('Demo booking error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Произошла ошибка при отправке запроса. Попробуйте позже.',
      },
      { status: 500 }
    );
  }
}
