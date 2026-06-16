import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FieldValueProps {
  readonly label: string;
  readonly icon?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}

/** Label-over-value pair used throughout the detail sections. */
export function FieldValue({ label, icon, children, className }: FieldValueProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="flex items-center gap-1.5 text-xs text-ink-secondary">
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium text-ink-primary">{children}</span>
    </div>
  );
}
