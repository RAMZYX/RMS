import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface SidebarItemProps {
  readonly to: string;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly collapsed: boolean;
  readonly end?: boolean;
}

export function SidebarItem({ to, label, icon: Icon, collapsed, end = false }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          collapsed && 'justify-center px-0',
          isActive
            ? 'bg-brand text-white'
            : 'text-ink-secondary hover:bg-brand-50 hover:text-brand-600',
        )
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
