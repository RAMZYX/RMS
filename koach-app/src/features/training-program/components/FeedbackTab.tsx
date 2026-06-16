import { MessagesSquare } from 'lucide-react';
import { DataTable, type Column } from '@/components/organisms/DataTable';
import { Tag } from '@/components/atoms/Tag';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useFeedbackItems } from '../hooks/useTrainingProgram';
import type { FeedbackItem } from '../types/training-program.types';

const columns: ReadonlyArray<Column<FeedbackItem>> = [
  { key: 'order', header: '#', align: 'left', render: (r) => <span className="font-semibold text-ink-secondary">{r.order}</span> },
  { key: 'question', header: 'Feedback question', render: (r) => <span className="font-medium">{r.question}</span> },
  { key: 'responseType', header: 'Response type', render: (r) => <Tag tone="neutral">{r.responseType}</Tag> },
  {
    key: 'required',
    header: 'Required',
    render: (r) => (r.required ? <Tag tone="brand">Required</Tag> : <Tag tone="neutral">Optional</Tag>),
  },
];

export function FeedbackTab() {
  const { data, isLoading } = useFeedbackItems();

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  const items = data ?? [];

  if (items.length === 0) {
    return (
      <EmptyState
        icon={MessagesSquare}
        title="No feedback questions"
        description="Add feedback questions to gather learner sentiment after this program."
      />
    );
  }

  return <DataTable caption="Feedback questions" columns={columns} rows={items} />;
}
