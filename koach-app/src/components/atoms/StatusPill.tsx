import { cn } from '@/lib/cn';

type StatusTone = 'success' | 'warning' | 'neutral' | 'danger';

interface StatusPillProps {
  readonly label: string;
  readonly tone: StatusTone;
}

const toneClasses: Readonly<Record<StatusTone, string>> = {
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  neutral: 'bg-grey-100 text-ink-secondary',
  danger: 'bg-danger-bg text-danger',
};

export function StatusPill({ label, tone }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        toneClasses[tone],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
