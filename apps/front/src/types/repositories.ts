export interface RepositoryResultError {
  type: string;
  message: string;
  isType: (checkedType: string) => boolean;
  toObject: () => { [key: string]: string; message: string };
}

export type RepositoryResult<T, E extends string = any> =
  | { data: T; error: null; ok: true }
  | { data: null; error: RepositoryResultError; ok: false };
