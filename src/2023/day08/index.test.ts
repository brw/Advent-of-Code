import { expect, test } from 'bun:test';
import { part1, part2 } from './index.js';

const input1 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const input2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

test('part1', () => {
  expect(part1(input1)).toEqual(6);
});

test('part2', () => {
  expect(part2(input2)).toEqual(6);
});
