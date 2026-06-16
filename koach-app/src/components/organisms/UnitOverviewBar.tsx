import {
  BookText,
  Tag as TagIcon,
  LayoutGrid,
  Presentation,
  Clock,
  User,
  Calendar,
  UserCog,
  CalendarClock,
  type LucideIcon,
} from 'lucide-react';
import { FieldValue } from '@/components/molecules/FieldValue';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useUnitOverview } from '@/features/training-program/hooks/useTrainingProgram';

const iconClass = 'h-3.5 w-3.5 text-brand';

function Icon({ icon: I }: { icon: LucideIcon }) {
  return <I className={iconClass} aria-hidden="true" />;
}

export function UnitOverviewBar() {
  const { data, isLoading, isError } = useUnitOverview();

  if (isLoading || !data) {
    return (
      <div className="rounded-lg border border-line bg-surface-card p-4 shadow-sm">
        <Skeleton className="mb-4 h-4 w-28" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={`u-${i}`} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-danger/30 bg-danger-bg p-4 text-sm text-danger">
        Failed to load unit overview.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-surface-card p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-ink-primary">Unit overview</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-5">
        <FieldValue label="Unit name" icon={<Icon icon={BookText} />}>{data.unitName}</FieldValue>
        <FieldValue label="Topic" icon={<Icon icon={TagIcon} />}>{data.topic}</FieldValue>
        <FieldValue label="Area" icon={<Icon icon={LayoutGrid} />}>{data.area}</FieldValue>
        <FieldValue label="Unit type" icon={<Icon icon={Presentation} />}>{data.unitType}</FieldValue>
        <FieldValue label="Duration (hh:mm)" icon={<Icon icon={Clock} />}>{data.duration}</FieldValue>
        <FieldValue label="Created by" icon={<Icon icon={User} />}>{data.createdBy}</FieldValue>
        <FieldValue label="Created date & time" icon={<Icon icon={Calendar} />}>{data.createdAt}</FieldValue>
        <FieldValue label="Updated by" icon={<Icon icon={UserCog} />}>{data.updatedBy}</FieldValue>
        <FieldValue label="Updated date & time" icon={<Icon icon={CalendarClock} />}>{data.updatedAt}</FieldValue>
      </div>
    </div>
  );
}
