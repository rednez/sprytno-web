export type RepositoryResult<T> =
  | { data: T; error: null; ok: true }
  | { data: null; error: string; ok: false };
