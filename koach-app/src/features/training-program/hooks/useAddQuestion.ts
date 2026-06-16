import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuestion, type NewQuestionPayload } from '../services/training-program.service';
import { trainingProgramKeys } from './useTrainingProgram';
import { useToastStore } from '@/store/useToastStore';

/** Mutation hook: every mutation surfaces a success AND an error toast. */
export function useAddQuestion() {
  const queryClient = useQueryClient();
  const push = useToastStore((s) => s.push);

  return useMutation({
    mutationFn: (payload: NewQuestionPayload) => createQuestion(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: trainingProgramKeys.questions });
      push('success', 'Question added successfully.');
    },
    onError: () => {
      push('error', 'Could not add the question. Please try again.');
    },
  });
}
