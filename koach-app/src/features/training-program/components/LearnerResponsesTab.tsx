import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Inbox } from 'lucide-react';
import { DataTable, type Column } from '@/components/organisms/DataTable';
import { StatusPill } from '@/components/atoms/StatusPill';
import { SearchInput } from '@/components/atoms/SearchInput';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useLearnerResponses } from '../hooks/useTrainingProgram';
import type { LearnerResponse, ResponseStatus } from '../types/training-program.types';

const searchSchema = z.object({ q: z.string() });
type SearchValues = z.infer<typeof searchSchema>;

const statusTone: Readonly<Record<ResponseStatus, 'success' | 'warning' | 'neutral'>> = {
  Completed: 'success',
  'In progress': 'warning',
  'Not started': 'neutral',
};

const columns: ReadonlyArray<Column<LearnerResponse>> = [
  { key: 'learner', header: 'Learner', render: (r) => <span className="font-medium">{r.learnerName}</span> },
  { key: 'employeeId', header: 'Employee ID', render: (r) => r.employeeId },
  { key: 'department', header: 'Department', render: (r) => r.department },
  { key: 'score', header: 'Score', align: 'right', render: (r) => r.score },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <StatusPill label={r.status} tone={statusTone[r.status]} />,
  },
  { key: 'attempts', header: 'Attempts', align: 'right', render: (r) => r.attempts },
  { key: 'submittedAt', header: 'Submitted at', render: (r) => r.submittedAt },
];

export function LearnerResponsesTab() {
  const { data, isLoading } = useLearnerResponses();
  const { register, watch } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { q: '' },
  });
  const term = watch('q').trim().toLowerCase();

  const rows = useMemo<ReadonlyArray<LearnerResponse>>(() => {
    const items = data ?? [];
    if (!term) return items;
    return items.filter(
      (r) =>
        r.learnerName.toLowerCase().includes(term) ||
        r.employeeId.includes(term) ||
        r.department.toLowerCase().includes(term),
    );
  }, [data, term]);

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  return (
    <div className="space-y-4">
      <form role="search" className="max-w-xs" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="learner-search" className="sr-only">
          Search learner responses
        </label>
        <SearchInput id="learner-search" placeholder="Search learners…" {...register('q')} />
      </form>

      {rows.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No learner responses"
          description="No learners match your search, or responses have not been submitted yet."
        />
      ) : (
        <DataTable caption="Learner responses" columns={columns} rows={rows} />
      )}
    </div>
  );
}
