import { RepositoryResultError } from '@/types';
import * as z from 'zod';

export class ResultError implements RepositoryResultError {
  constructor(
    private _message: string,
    private _type = 'common',
  ) {}

  static fromError(error: unknown): RepositoryResultError {
    if (error instanceof z.ZodError) {
      return new ResultError(JSON.stringify(error.issues), 'parser');
    } else {
      return new ResultError(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }

  get message(): string {
    return this._message;
  }

  get type(): string {
    return this._type;
  }

  isType(checkedType: string): boolean {
    return this._type === checkedType;
  }

  toString(): string {
    return `[${this._type}]: ${this._message}`;
  }

  toObject(): { [key: string]: string; message: string } {
    return {
      [this._type]: this._message,
      message: this.toString(),
    };
  }
}
