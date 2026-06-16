import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/organisms/TopBar';
import { UnitOverviewBar } from '@/components/organisms/UnitOverviewBar';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';
import { TabBar, type TabItem } from '@/components/molecules/TabBar';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useUnitOverview } from '@/features/training-program';

const tabs: ReadonlyArray<TabItem> = [
  { to: '/training-program/overview', label: 'Overview' },
  { to: '/training-program/questions', label: 'Questions' },
  { to: '/training-program/feedback', label: 'Feedback' },
  { to: '/training-program/learner-responses', label: 'Learner responses' },
  { to: '/training-program/feedback-responses', label: 'Feedback responses' },
];

/** Thin page: composes the shell pieces and routes tab content. */
export default function CurationPage() {
  const navigate = useNavigate();
  const { data } = useUnitOverview();

  return (
    <>
      <TopBar
        section="Training program curation"
        highlight={data?.programTitle ?? 'Cell Growth and Tumor Formation'}
        onBack={() => navigate(-1)}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] space-y-5 p-5">
          <UnitOverviewBar />
          <div className="rounded-lg border border-line bg-surface-card p-2 shadow-sm">
            <TabBar tabs={tabs} />
          </div>
          <ErrorBoundary>
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
}
