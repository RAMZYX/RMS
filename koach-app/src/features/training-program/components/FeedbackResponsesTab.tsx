import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageSquareDashed } from 'lucide-react';
import { DataTable, type Column } from '@/components/organisms/DataTable';
import { StatusPill } from '@/components/atoms/StatusPill';
import { SearchInput } from '@/components/atoms/SearchInput';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useFeedbackResponses } from '../hooks/useTrainingProgram';
import type { FeedbackResponse } from '../types/training-program.types';

const searchSchema = z.object({ q: z.string() });
type SearchValues = z.infer<typeof searchSchema>;

type Sentiment = FeedbackResponse['sentiment'];
const sentimentTone: Readonly<Record<Sentiment, 'success' | 'neutral' | 'danger'>> = {
  Positive: 'success',
  Neutral: 'neutral',
  Negative: 'danger',
};

const columns: ReadonlyArray<Column<FeedbackResponse>> = [
  { key: 'learner', header: 'Learner', render: (r) => <span className="font-medium">{r.learnerName}</span> },
  { key: 'employeeId', header: 'Employee ID', render: (r) => r.employeeId },
  { key: 'rating', header: 'Rating', align: 'right', render: (r) => <span className="font-semibold text-success">{r.rating}</span> },
  {
    key: 'sentiment',
    header: 'Sentiment',
    render: (r) => <StatusPill label={r.sentiment} tone={sentimentTone[r.sentiment]} />,
  },
  { key: 'comment', header: 'Comment', render: (r) => <span className="text-ink-secondary">{r.comment}</span> },
  { key: 'submittedAt', header: 'Submitted at', render: (r) => r.submittedAt },
];

export function FeedbackResponsesTab() {
  const { data, isLoading } = useFeedbackResponses();
  const { register, watch } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { q: '' },
  });
  const term = watch('q').trim().toLowerCase();

  const rows = useMemo<ReadonlyArray<FeedbackResponse>>(() => {
    const items = data ?? [];
    if (!term) return items;
    return items.filter(
      (r) => r.learnerName.toLowerCase().includes(term) || r.employeeId.includes(term),
    );
  }, [data, term]);

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  return (
    <div className="space-y-4">
      <form role="search" className="max-w-xs" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="feedback-search" className="sr-only">
          Search feedback responses
        </label>
        <SearchInput id="feedback-search" placeholder="Search learners…" {...register('q')} />
      </form>

      {rows.length === 0 ? (
        <EmptyState
          icon={MessageSquareDashed}
          title="No feedback responses"
          description="No feedback matches your search, or no feedback has been submitted yet."
        />
      ) : (
        <DataTable caption="Feedback responses" columns={columns} rows={rows} />
      )}
    </div>
  );
}
