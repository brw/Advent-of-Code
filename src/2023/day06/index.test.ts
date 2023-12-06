import { expect, test } from 'bun:test';
import { part1, part2 } from './index.js';

const input = `Time:      7  15   30
Distance:  9  40  200`;

test('part1', () => {
  expect(part1(input)).toEqual(288);
});

test('part2', () => {
  expect(part2(input)).toEqual(71503);
});
