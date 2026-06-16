import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';

export interface TabItem {
  readonly to: string;
  readonly label: string;
  readonly end?: boolean;
}

interface TabBarProps {
  readonly tabs: ReadonlyArray<TabItem>;
}

export function TabBar({ tabs }: TabBarProps) {
  return (
    <nav aria-label="Training program sections" className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-ink-primary text-white'
                : 'text-ink-secondary hover:bg-grey-100',
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
