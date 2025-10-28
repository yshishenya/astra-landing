import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary shadow-md hover:shadow-lg',
        secondary:
          'bg-secondary text-white hover:bg-secondary/90 focus-visible:outline-secondary shadow-md hover:shadow-lg',
        accent:
          'bg-accent text-white hover:bg-accent/90 focus-visible:outline-accent shadow-md hover:shadow-lg',
        outline:
          'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:outline-primary',
        ghost: 'hover:bg-slate-100 text-slate-900',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
