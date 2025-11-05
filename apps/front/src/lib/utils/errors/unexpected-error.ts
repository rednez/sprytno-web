export class UnexpectedError extends Error {
  constructor(error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    super(message);

    this.name = 'UnexpectedError';
  }
}
