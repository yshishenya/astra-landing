'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FORM_CONTENT } from '@/lib/constants';

// Validation schema (matching API validation)
const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  company: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  companySize: z.string().optional(),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  /**
   * Custom trigger button (optional)
   * If not provided, default trigger button will be used
   */
  trigger?: React.ReactNode;
  /**
   * Button variant for default trigger
   */
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Contact Form Component with Dialog
 *
 * Features:
 * - React Hook Form for state management
 * - Zod validation matching API schema
 * - Success/error message handling
 * - Loading state during submission
 * - Rate limiting handled by API
 *
 * @example
 * ```tsx
 * <ContactForm variant="primary" />
 * <ContactForm trigger={<Button>Custom Trigger</Button>} />
 * ```
 */
export const ContactForm: FC<ContactFormProps> = ({ trigger, variant = 'primary' }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Сообщение успешно отправлено!',
        });
        reset(); // Clear form
        // Close dialog after 2 seconds
        setTimeout(() => {
          setOpen(false);
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Произошла ошибка при отправке',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Произошла ошибка при отправке. Попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={variant} size="lg">
            {FORM_CONTENT.contact.trigger}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{FORM_CONTENT.contact.title}</DialogTitle>
          <DialogDescription>
            {FORM_CONTENT.contact.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              {FORM_CONTENT.contact.fields.name.label}{' '}
              {FORM_CONTENT.contact.fields.name.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder={FORM_CONTENT.contact.fields.name.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              {FORM_CONTENT.contact.fields.email.label}{' '}
              {FORM_CONTENT.contact.fields.email.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder={FORM_CONTENT.contact.fields.email.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <Label htmlFor="company">
              {FORM_CONTENT.contact.fields.company.label}{' '}
              {FORM_CONTENT.contact.fields.company.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="company"
              {...register('company')}
              placeholder={FORM_CONTENT.contact.fields.company.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.company ? 'true' : 'false'}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          {/* Company Size Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="companySize">{FORM_CONTENT.contact.fields.companySize.label}</Label>
            <Input
              id="companySize"
              {...register('companySize')}
              placeholder={FORM_CONTENT.contact.fields.companySize.placeholder}
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {FORM_CONTENT.contact.fields.message.label}{' '}
              {FORM_CONTENT.contact.fields.message.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder={FORM_CONTENT.contact.fields.message.placeholder}
              rows={4}
              disabled={isSubmitting}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Status Message */}
          {submitStatus.type && (
            <div
              className={`rounded-lg p-4 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
              role="alert"
            >
              {submitStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? FORM_CONTENT.contact.buttons.submitting : FORM_CONTENT.contact.buttons.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
