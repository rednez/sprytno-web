import { expect, test } from 'vitest';
import { distance } from '../distance';

test.each([
  [100, '100 m'],
  [1000, '1,000 m'],
  [5000, '5 km'],
  [25300, '25.3 km'],
])('distance(%s) -> %s', (input, expected) => {
  expect(distance(input)).toBe(expected);
});
