import { expect, test } from 'vitest';
import { UnexpectedError } from '../unexpected-error';

test(`has name 'UnexpectedError'`, () => {
  const error = new UnexpectedError(null);
  expect(error.name).toBe('UnexpectedError');
});

test(`has message 'some error'`, () => {
  const error = new UnexpectedError(new Error('some error'));
  expect(error.message).toBe('some error');
});

test(`has message 'An unexpected error occurred'`, () => {
  const error = new UnexpectedError({ error: 'some unknown object' });
  expect(error.message).toBe('An unexpected error occurred');
});
