import { ResultError, ResultOk } from '@/types';

export const resultOk = <T>(data: T): ResultOk<T> => ({
  ok: true,
  data,
  error: null,
});

export const resultError = <E = Error>(error: E): ResultError<E> => ({
  ok: false,
  error,
  data: null,
});
