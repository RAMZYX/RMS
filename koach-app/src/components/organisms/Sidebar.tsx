import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FolderOpen,
  ListChecks,
  HelpCircle,
  FileText,
  ClipboardList,
  SquarePen,
  Award,
  Radio,
  Settings,
  Cog,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUiStore } from '@/store/useUiStore';
import { cn } from '@/lib/cn';

interface NavEntry {
  readonly label: string;
  readonly icon: LucideIcon;
}

const topItems: ReadonlyArray<NavEntry> = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'User management', icon: Users },
];

const trainingItems: ReadonlyArray<NavEntry> = [
  { label: 'Repository', icon: FolderOpen },
  { label: 'Checklists', icon: ListChecks },
  { label: 'Quizzes', icon: HelpCircle },
  { label: 'Documents', icon: FileText },
  { label: 'Forms', icon: ClipboardList },
  { label: 'Assignment', icon: SquarePen },
  { label: 'Certificates', icon: Award },
  { label: 'Broadcast', icon: Radio },
];

const bottomItems: ReadonlyArray<NavEntry> = [
  { label: 'Account settings', icon: Settings },
  { label: 'System settings', icon: Cog },
];

function DecorativeItem({ entry, collapsed }: { entry: NavEntry; collapsed: boolean }) {
  const { icon: Icon, label } = entry;
  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      className={cn(
        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-ink-secondary transition-colors hover:bg-brand-50 hover:text-brand-600',
        collapsed && 'justify-center px-0',
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggle = useUiStore((s) => s.toggleSidebar);

  return (
    <aside
      className={cn(
        'flex h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200',
        collapsed ? 'w-[72px]' : 'w-60',
      )}
    >
      <div className={cn('flex items-center gap-2 px-4 py-4', collapsed && 'justify-center px-0')}>
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-sm font-bold text-white">
          k
        </span>
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight text-brand">kauvery</span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {topItems.map((entry) => (
          <DecorativeItem key={entry.label} entry={entry} collapsed={collapsed} />
        ))}

        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-brand-600">
          <GraduationCap className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && <span className="truncate">Training management</span>}
        </div>

        <div className={cn('space-y-1', !collapsed && 'pl-3')}>
          <NavLink
            to="/training-program"
            title={collapsed ? 'Training program curation' : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive ? 'bg-brand text-white' : 'text-ink-secondary hover:bg-brand-50 hover:text-brand-600',
              )
            }
          >
            <BookOpen className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {!collapsed && <span className="truncate">Training program curation</span>}
          </NavLink>
          {trainingItems.map((entry) => (
            <DecorativeItem key={entry.label} entry={entry} collapsed={collapsed} />
          ))}
        </div>

        <div className="my-2 border-t border-line" />
        {bottomItems.map((entry) => (
          <DecorativeItem key={entry.label} entry={entry} collapsed={collapsed} />
        ))}
      </nav>

      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'flex items-center gap-3 border-t border-line px-4 py-3 text-sm font-medium text-ink-secondary hover:bg-grey-100',
          collapsed && 'justify-center px-0',
        )}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <PanelLeftClose className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
        {!collapsed && <span>Collapse sidebar</span>}
      </button>
    </aside>
  );
}
