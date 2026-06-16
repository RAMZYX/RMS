import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, CheckCircle2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import { Skeleton } from '@/components/atoms/Skeleton';
import { EmptyState } from '@/components/molecules/EmptyState';
import { useQuestions } from '../hooks/useTrainingProgram';
import { useAddQuestion } from '../hooks/useAddQuestion';
import type { Question, QuestionDifficulty } from '../types/training-program.types';

const difficultyTone: Readonly<Record<QuestionDifficulty, 'success' | 'warning' | 'danger'>> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const questionSchema = z.object({
  text: z.string().min(8, 'Enter at least 8 characters'),
  type: z.string().min(1, 'Select a question type'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  marks: z.coerce.number().int().min(1, 'Min 1').max(10, 'Max 10'),
});
type QuestionFormValues = z.infer<typeof questionSchema>;

const fieldClass =
  'h-9 w-full rounded-md border border-grey-300 bg-white px-3 text-sm text-ink-primary focus:border-brand';

function AddQuestionForm({ onDone }: { onDone: () => void }) {
  const { mutate, isPending } = useAddQuestion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: { text: '', type: 'Single choice', difficulty: 'Medium', marks: 1 },
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        onDone();
      },
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-line bg-surface-card p-4 shadow-sm"
    >
      <div className="space-y-1">
        <label htmlFor="q-text" className="text-xs font-medium text-ink-secondary">
          Question
        </label>
        <textarea
          id="q-text"
          rows={2}
          className="w-full rounded-md border border-grey-300 bg-white px-3 py-2 text-sm text-ink-primary focus:border-brand"
          placeholder="Enter the question text…"
          {...register('text')}
        />
        {errors.text && <p className="text-xs text-danger">{errors.text.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label htmlFor="q-type" className="text-xs font-medium text-ink-secondary">
            Type
          </label>
          <select id="q-type" className={fieldClass} {...register('type')}>
            <option>Single choice</option>
            <option>Multiple choice</option>
            <option>True / False</option>
          </select>
          {errors.type && <p className="text-xs text-danger">{errors.type.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="q-difficulty" className="text-xs font-medium text-ink-secondary">
            Difficulty
          </label>
          <select id="q-difficulty" className={fieldClass} {...register('difficulty')}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {errors.difficulty && <p className="text-xs text-danger">{errors.difficulty.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="q-marks" className="text-xs font-medium text-ink-secondary">
            Marks
          </label>
          <input id="q-marks" type="number" min={1} max={10} className={fieldClass} {...register('marks')} />
          {errors.marks && <p className="text-xs text-danger">{errors.marks.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={onDone} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? 'Saving…' : 'Save question'}
        </Button>
      </div>
    </form>
  );
}

function QuestionCard({ question }: { question: Question }) {
  return (
    <article className="rounded-lg border border-line bg-surface-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
            {question.order}
          </span>
          <div>
            <p className="text-sm font-medium text-ink-primary">{question.text}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Tag tone="neutral">{question.type}</Tag>
              <Tag tone={difficultyTone[question.difficulty]}>{question.difficulty}</Tag>
              <Tag tone="brand">{question.marks} marks</Tag>
            </div>
          </div>
        </div>
      </div>
      <ul className="mt-3 grid gap-2 pl-10 sm:grid-cols-2">
        {question.options.map((opt) => {
          const isCorrect = question.correctAnswer.includes(opt);
          return (
            <li
              key={opt}
              className="flex items-center gap-2 rounded-md border border-line bg-grey-50 px-3 py-1.5 text-sm"
            >
              {isCorrect && <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />}
              <span className={isCorrect ? 'font-medium text-ink-primary' : 'text-ink-secondary'}>
                {opt}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function QuestionsTab() {
  const { data, isLoading } = useQuestions();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`q-sk-${i}`} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  const questions = data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-secondary">{questions.length} questions in this assessment</p>
        {!showForm && (
          <Button size="sm" leadingIcon={<Plus className="h-4 w-4" />} onClick={() => setShowForm(true)}>
            Add question
          </Button>
        )}
      </div>

      {showForm && <AddQuestionForm onDone={() => setShowForm(false)} />}

      {questions.length === 0 && !showForm ? (
        <EmptyState
          icon={HelpCircle}
          title="No questions yet"
          description="Add questions to build the assessment for this training program."
          action={
            <Button size="sm" leadingIcon={<Plus className="h-4 w-4" />} onClick={() => setShowForm(true)}>
              Add question
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}
