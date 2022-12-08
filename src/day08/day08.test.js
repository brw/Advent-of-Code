import { part1, part2 } from './day08.js';

const input = `30373
25512
65332
33549
35390`;

test('part1', () => {
  expect(part1(input)).toEqual(21);
});

test('part2', () => {
  expect(part2(input)).toEqual(8);
});
