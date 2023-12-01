import { part1, part2 } from './index.js';

const input = `draai 90
loop 6
spring 2
draai -45
loop 2`;

test('part1', () => {
  expect(part1(input)).toEqual(12);
});
