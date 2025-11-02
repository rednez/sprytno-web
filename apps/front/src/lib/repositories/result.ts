import { RepositoryResult } from '@/types';
import { ResultError } from './result-error';

export class Result {
  static ok<T>(data: T): RepositoryResult<T> {
    return {
      ok: true,
      error: null,
      data,
    };
  }

  static error<T>(message: string, type?: string): RepositoryResult<T> {
    return {
      ok: false,
      error: new ResultError(message, type),
      data: null,
    };
  }

  static fromError<T>(error: unknown): RepositoryResult<T> {
    return {
      ok: false,
      error: ResultError.fromError(error),
      data: null,
    };
  }
}
