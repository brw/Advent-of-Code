import { expect, test } from 'bun:test';
import { part1, part2 } from './index.js';

const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

test('part1', () => {
  expect(part1(input)).toEqual(6);
});

test('part2', () => {
  expect(part2(input)).toEqual(6);
});
