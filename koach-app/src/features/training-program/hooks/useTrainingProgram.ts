/**
 * TanStack Query hooks. These are the ONLY place that calls services.
 * Server data is never stored in Zustand and never fetched via useEffect.
 */
import { useQuery } from '@tanstack/react-query';
import {
  getUnitOverview,
  getProgramOverview,
  getQuestions,
  getFeedbackItems,
  getLearnerResponses,
  getFeedbackResponses,
} from '../services/training-program.service';

export const trainingProgramKeys = {
  root: ['training-program'] as const,
  unit: ['training-program', 'unit'] as const,
  overview: ['training-program', 'overview'] as const,
  questions: ['training-program', 'questions'] as const,
  feedback: ['training-program', 'feedback'] as const,
  learnerResponses: ['training-program', 'learner-responses'] as const,
  feedbackResponses: ['training-program', 'feedback-responses'] as const,
};

export function useUnitOverview() {
  return useQuery({ queryKey: trainingProgramKeys.unit, queryFn: getUnitOverview });
}

export function useProgramOverview() {
  return useQuery({ queryKey: trainingProgramKeys.overview, queryFn: getProgramOverview });
}

export function useQuestions() {
  return useQuery({ queryKey: trainingProgramKeys.questions, queryFn: getQuestions });
}

export function useFeedbackItems() {
  return useQuery({ queryKey: trainingProgramKeys.feedback, queryFn: getFeedbackItems });
}

export function useLearnerResponses() {
  return useQuery({ queryKey: trainingProgramKeys.learnerResponses, queryFn: getLearnerResponses });
}

export function useFeedbackResponses() {
  return useQuery({ queryKey: trainingProgramKeys.feedbackResponses, queryFn: getFeedbackResponses });
}
