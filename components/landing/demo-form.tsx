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
import type { DemoFormData } from '@/lib/email-templates';

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
   * If not provided, default "Заказать демо" button will be used
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
    } catch (error) {
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
            Заказать демо
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Заказать демонстрацию Astra</DialogTitle>
          <DialogDescription>
            Заполните форму, и наш менеджер свяжется с вами для согласования удобного времени
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="demo-name">
              Имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="demo-name"
              {...register('name')}
              placeholder="Иван Иванов"
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
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="demo-email"
              type="email"
              {...register('email')}
              placeholder="ivan@company.com"
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
              Компания <span className="text-destructive">*</span>
            </Label>
            <Input
              id="demo-company"
              {...register('company')}
              placeholder="ООО Компания"
              disabled={isSubmitting}
              aria-invalid={errors.company ? 'true' : 'false'}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="demo-phone">Телефон (опционально)</Label>
            <Input
              id="demo-phone"
              type="tel"
              {...register('phone')}
              placeholder="+7 (999) 123-45-67"
              disabled={isSubmitting}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Company Size Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="demo-companySize">Размер компании (опционально)</Label>
            <Input
              id="demo-companySize"
              {...register('companySize')}
              placeholder="50-200 сотрудников"
              disabled={isSubmitting}
            />
          </div>

          {/* Preferred Time Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="demo-preferredTime">Предпочтительное время (опционально)</Label>
            <Input
              id="demo-preferredTime"
              {...register('preferredTime')}
              placeholder="Понедельник, 14:00"
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
            {isSubmitting ? 'Отправка...' : 'Заказать демо'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
