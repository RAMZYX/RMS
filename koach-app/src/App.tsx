import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AppRouter } from '@/routes/AppRouter';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';
import { Toaster } from '@/components/organisms/Toaster';

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
