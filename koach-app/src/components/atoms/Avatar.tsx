import { cn } from '@/lib/cn';

interface AvatarProps {
  readonly name: string;
  readonly color: string;
  readonly size?: 'sm' | 'md';
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.charAt(0) ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, color, size = 'md' }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: color }}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold text-white',
        size === 'sm' ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm',
      )}
    >
      {initials(name)}
    </span>
  );
}
