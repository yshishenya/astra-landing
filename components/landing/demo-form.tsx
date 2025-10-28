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
import { FORM_CONTENT } from '@/lib/constants';

// Validation schema (matching API validation)
const demoSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  company: z.string().min(2, 'Название компании должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Некорректный номер телефона').optional().or(z.literal('')),
  preferredTime: z.string().optional(),
  companySize: z.string().optional(),
});

type DemoFormValues = z.infer<typeof demoSchema>;

interface DemoFormProps {
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
 * Demo Booking Form Component with Dialog
 *
 * Features:
 * - React Hook Form for state management
 * - Zod validation matching API schema
 * - Success/error message handling
 * - Loading state during submission
 * - Rate limiting handled by API
 * - Sends 2 emails: team notification + user confirmation
 *
 * @example
 * ```tsx
 * <DemoForm variant="primary" />
 * <DemoForm trigger={<Button>Custom Trigger</Button>} />
 * ```
 */
export const DemoForm: FC<DemoFormProps> = ({ trigger, variant = 'primary' }) => {
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
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = async (data: DemoFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/demo', {
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
          message: result.message || 'Запрос на демо успешно отправлен!',
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
            {FORM_CONTENT.demo.trigger}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{FORM_CONTENT.demo.title}</DialogTitle>
          <DialogDescription>
            {FORM_CONTENT.demo.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="demo-name">
              {FORM_CONTENT.demo.fields.name.label}{' '}
              {FORM_CONTENT.demo.fields.name.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="demo-name"
              {...register('name')}
              placeholder={FORM_CONTENT.demo.fields.name.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="demo-email">
              {FORM_CONTENT.demo.fields.email.label}{' '}
              {FORM_CONTENT.demo.fields.email.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="demo-email"
              type="email"
              {...register('email')}
              placeholder={FORM_CONTENT.demo.fields.email.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <Label htmlFor="demo-company">
              {FORM_CONTENT.demo.fields.company.label}{' '}
              {FORM_CONTENT.demo.fields.company.required && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="demo-company"
              {...register('company')}
              placeholder={FORM_CONTENT.demo.fields.company.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.company ? 'true' : 'false'}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="demo-phone">{FORM_CONTENT.demo.fields.phone.label}</Label>
            <Input
              id="demo-phone"
              type="tel"
              {...register('phone')}
              placeholder={FORM_CONTENT.demo.fields.phone.placeholder}
              disabled={isSubmitting}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Company Size Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="demo-companySize">{FORM_CONTENT.demo.fields.companySize.label}</Label>
            <Input
              id="demo-companySize"
              {...register('companySize')}
              placeholder={FORM_CONTENT.demo.fields.companySize.placeholder}
              disabled={isSubmitting}
            />
          </div>

          {/* Preferred Time Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="demo-preferredTime">{FORM_CONTENT.demo.fields.preferredTime.label}</Label>
            <Input
              id="demo-preferredTime"
              {...register('preferredTime')}
              placeholder={FORM_CONTENT.demo.fields.preferredTime.placeholder}
              disabled={isSubmitting}
            />
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
            {isSubmitting ? FORM_CONTENT.demo.buttons.submitting : FORM_CONTENT.demo.buttons.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
