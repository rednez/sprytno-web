import { PostgrestError } from '@supabase/supabase-js';
import { expect, test } from 'vitest';
import { ErrorParser } from '../error-parser';
import * as z from 'zod';
import { FormDataValidationError } from '../form-data-validation-error';

test('should return Postgres error', () => {
  const error = new PostgrestError({
    message: 'message',
    details: 'details',
    hint: 'hint',
    code: 'code',
  });

  const parser = new ErrorParser(error);

  expect(parser.parse()).toEqual({
    name: 'PostgrestError',
    message: 'message',
    details: {
      hasFields: false,
      fields: null,
    },
  });
});

test('should return Zod error', () => {
  const error = new z.ZodError([
    {
      code: 'custom',
      message: 'message',
      path: [],
    },
  ]);

  const parser = new ErrorParser(error);

  expect(parser.parse()).toEqual({
    name: 'ZodError',
    message: 'Unknown validation error',
    details: {
      hasFields: true,
      fields: {},
    },
  });
});

test('should return FormDataValidation error', () => {
  const error = new FormDataValidationError({
    field1: ['error1', 'error2'],
    field2: ['error3'],
  });

  const parser = new ErrorParser(error);

  expect(parser.parse()).toEqual({
    name: 'FormDataValidationError',
    message: 'error1,error2',
    details: {
      hasFields: true,
      fields: {
        field1: ['error1', 'error2'],
        field2: ['error3'],
      },
    },
  });
});
