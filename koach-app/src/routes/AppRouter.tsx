import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '@/components/templates/DashboardLayout';

// All route components are code-split via React.lazy.
const CurationPage = lazy(() => import('@/pages/CurationPage'));
const OverviewPage = lazy(() => import('@/pages/OverviewPage'));
const QuestionsPage = lazy(() => import('@/pages/QuestionsPage'));
const FeedbackPage = lazy(() => import('@/pages/FeedbackPage'));
const LearnerResponsesPage = lazy(() => import('@/pages/LearnerResponsesPage'));
const FeedbackResponsesPage = lazy(() => import('@/pages/FeedbackResponsesPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/training-program/overview" replace /> },
      {
        path: 'training-program',
        element: <CurationPage />,
        children: [
          { index: true, element: <Navigate to="/training-program/overview" replace /> },
          { path: 'overview', element: <OverviewPage /> },
          { path: 'questions', element: <QuestionsPage /> },
          { path: 'feedback', element: <FeedbackPage /> },
          { path: 'learner-responses', element: <LearnerResponsesPage /> },
          { path: 'feedback-responses', element: <FeedbackResponsesPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/training-program/overview" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
