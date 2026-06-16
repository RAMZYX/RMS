/**
 * Services are pure async functions. They call the API and return the
 * response AS-IS — no reshaping, no transformation, no hooks.
 */
import { apiGet, apiMutate } from '@/lib/api/client';
import type {
  UnitOverview,
  ProgramOverview,
  Question,
  FeedbackItem,
  LearnerResponse,
  FeedbackResponse,
} from '../types/training-program.types';

export interface NewQuestionPayload {
  readonly text: string;
  readonly type: string;
  readonly difficulty: string;
  readonly marks: number;
}

export interface MutationResult {
  readonly ok: boolean;
}

export function getUnitOverview(): Promise<UnitOverview> {
  return apiGet<UnitOverview>('/training-programs/current');
}

export function getProgramOverview(): Promise<ProgramOverview> {
  return apiGet<ProgramOverview>('/training-programs/current/overview');
}

export function getQuestions(): Promise<ReadonlyArray<Question>> {
  return apiGet<ReadonlyArray<Question>>('/training-programs/current/questions');
}

export function getFeedbackItems(): Promise<ReadonlyArray<FeedbackItem>> {
  return apiGet<ReadonlyArray<FeedbackItem>>('/training-programs/current/feedback');
}

export function getLearnerResponses(): Promise<ReadonlyArray<LearnerResponse>> {
  return apiGet<ReadonlyArray<LearnerResponse>>('/training-programs/current/learner-responses');
}

export function getFeedbackResponses(): Promise<ReadonlyArray<FeedbackResponse>> {
  return apiGet<ReadonlyArray<FeedbackResponse>>('/training-programs/current/feedback-responses');
}

export function createQuestion(payload: NewQuestionPayload): Promise<MutationResult> {
  return apiMutate<MutationResult>('/training-programs/current/questions', payload);
}
