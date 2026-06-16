import { ArrowLeft, Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { useAuthStore } from '@/store/useAuthStore';

interface TopBarProps {
  readonly section: string;
  readonly highlight: string;
  readonly onBack?: () => void;
}

export function TopBar({ section, highlight, onBack }: TopBarProps) {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-14 items-center justify-between border-b border-line bg-white px-5">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 rounded-md px-2 py-1 font-medium text-ink-secondary hover:bg-grey-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </button>
        <span className="text-grey-300" aria-hidden="true">
          /
        </span>
        <span className="truncate text-ink-secondary">{section}</span>
        <span className="text-grey-300" aria-hidden="true">
          /
        </span>
        <span className="truncate font-semibold text-brand-600">{highlight}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-md p-2 text-ink-secondary hover:bg-grey-100"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
        </button>
        <div className="flex items-center gap-2">
          <Avatar name={user.name} color={user.avatarColor} />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-ink-primary">{user.name}</p>
            <p className="text-xs text-ink-secondary">{user.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-ink-secondary" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
