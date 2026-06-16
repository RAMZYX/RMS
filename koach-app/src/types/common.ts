/** Shared, app-wide types. Feature-specific types live under each feature. */

export type ID = string;

export interface FieldIcon {
  readonly name: string;
}

export interface KeyValue {
  readonly label: string;
  readonly value: string;
}

export interface AuthUser {
  readonly id: ID;
  readonly name: string;
  readonly role: string;
  readonly avatarColor: string;
}

export type LoadState = 'idle' | 'loading' | 'success' | 'error';

export interface ListResponse<T> {
  readonly items: ReadonlyArray<T>;
  readonly total: number;
}
