import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Button = forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md hover:-translate-y-[1px]',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:-translate-y-[1px]',
      outline: 'border-2 border-border bg-background hover:border-primary/50 hover:bg-muted/30 text-foreground',
      ghost: 'hover:bg-muted text-foreground',
      danger: 'bg-danger text-danger-foreground hover:bg-danger/90 shadow-sm hover:shadow-md hover:-translate-y-[1px]',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
      icon: 'h-10 w-10 flex items-center justify-center p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
