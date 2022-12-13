import { part1, part2 } from './index.js';

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

test('part1', () => {
  expect(part1(input)).toEqual(31);
});

test('part2', () => {
  expect(part2(input)).toEqual(29);
});
