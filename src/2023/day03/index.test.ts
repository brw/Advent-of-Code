import { expect, test } from 'bun:test';
import { part1, part2 } from './index.js';

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test('part1', () => {
  expect(part1(input)).toEqual(4361);
});

test('part2', () => {
  expect(part2(input)).toEqual(467835);
});
