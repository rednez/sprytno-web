import { expect, test, beforeEach } from 'vitest';
import { FormDataValidationError } from '../form-data-validation-error';
import { fi } from '@faker-js/faker';

let error: FormDataValidationError;

beforeEach(() => {
  error = new FormDataValidationError({
    field1: ['error1', 'error2'],
    field2: ['error3'],
  });
});

test(`has name 'FormDataValidationError'`, () => {
  expect(error.name).toBe('FormDataValidationError');
});

test('has fields object', () => {
  expect(error.fields).toEqual({
    field1: ['error1', 'error2'],
    field2: ['error3'],
  });
});
