import { expect, test } from 'vitest';
import { fullDate } from '../full-date';

test.each([
  ['1982-01-10T00:00:00', '10.01.1982, 00:00'],
  ['1982-01-10T04:30:00', '10.01.1982, 04:30'],
])('fullDate(%s) -> %s', (input, expected) => {
  expect(fullDate(new Date(input))).toBe(expected);
});
