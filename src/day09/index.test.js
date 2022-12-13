import { part1, part2 } from './index.js';

const input1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

test('part1', () => {
  expect(part1(input1)).toEqual(13);
});

test('part2', () => {
  expect(part2(input2)).toEqual(36);
});
