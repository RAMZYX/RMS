/**
 * Mock API client. Stands in for a real REST backend so the data-flow
 * (UI -> Hook -> Service -> API -> Hook -> UI) is exercised exactly as in
 * production. Services call `api.get(...)`; they never reshape the payload.
 */
import { db } from './fixtures';

const NETWORK_DELAY_MS = 450;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export interface ApiError {
  readonly status: number;
  readonly message: string;
}

const routes: Readonly<Record<string, () => unknown>> = {
  '/training-programs/current': () => db.unit,
  '/training-programs/current/overview': () => db.overview,
  '/training-programs/current/questions': () => db.questions,
  '/training-programs/current/feedback': () => db.feedback,
  '/training-programs/current/learner-responses': () => db.learnerResponses,
  '/training-programs/current/feedback-responses': () => db.feedbackResponses,
};

export async function apiGet<T>(path: string): Promise<T> {
  await delay(NETWORK_DELAY_MS);
  const resolver = routes[path];
  if (!resolver) {
    const error: ApiError = { status: 404, message: `Not found: ${path}` };
    throw error;
  }
  return resolver() as T;
}

export async function apiMutate<T>(path: string, body: unknown): Promise<T> {
  await delay(NETWORK_DELAY_MS);
  return { ok: true, path, body } as T;
}
