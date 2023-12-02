import { part1, part2 } from './index.js';

const input1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

test('part1', () => {
  expect(part1(input1)).toEqual(142);
});

const input2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

test('part2', () => {
  expect(part2(input2)).toEqual(281);
});
