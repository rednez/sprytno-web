import { RepositoryResult } from '@/types';
import * as z from 'zod';

export class Result {
  static ok<T>(data: T): RepositoryResult<T> {
    return {
      ok: true,
      error: null,
      data,
    };
  }

  static error<T>(message: string): RepositoryResult<T> {
    return {
      ok: false,
      error: message,
      data: null,
    };
  }

  static fromError<T>(error: unknown): RepositoryResult<T> {
    if (error instanceof z.ZodError) {
      return Result.error(`Parser: ${JSON.stringify(error.issues)}`);
    } else {
      return Result.error(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
