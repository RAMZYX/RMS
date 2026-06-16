import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly action?: ReactNode;
  readonly children: ReactNode;
}

/** Bordered content section with an icon + title header. */
export function SectionCard({ title, icon: Icon, action, children }: SectionCardProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm">
      <header className="flex items-center justify-between border-b border-line bg-grey-50 px-4 py-2.5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-primary">
          <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
          {title}
        </h2>
        {action}
      </header>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}
