import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly leadingIcon?: ReactNode;
  readonly children: ReactNode;
}

const variantClasses: Readonly<Record<ButtonVariant, string>> = {
  primary: 'bg-brand text-white hover:bg-brand-700',
  secondary: 'border border-grey-300 bg-white text-ink-primary hover:bg-grey-100',
  ghost: 'text-ink-secondary hover:bg-grey-100',
};

const sizeClasses: Readonly<Record<ButtonSize, string>> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
