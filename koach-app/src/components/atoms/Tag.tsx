import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TagTone = 'brand' | 'neutral' | 'success' | 'danger' | 'warning';

interface TagProps {
  readonly children: ReactNode;
  readonly tone?: TagTone;
}

const toneClasses: Readonly<Record<TagTone, string>> = {
  brand: 'bg-brand-50 text-brand-600',
  neutral: 'bg-grey-100 text-ink-secondary',
  success: 'bg-success-bg text-success',
  danger: 'bg-danger-bg text-danger',
  warning: 'bg-warning-bg text-warning',
};

export function Tag({ children, tone = 'neutral' }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
