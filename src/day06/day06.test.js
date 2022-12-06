import { part1, part2 } from './day06.js';

const part1Inputs = [
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
];
const part1Markers = [5, 6, 10, 11];

const part2Inputs = ['mjqjpqmgbljsphdztnvjfqwrcgsmlb'].concat(part1Inputs);
const part2Markers = [19, 23, 23, 29, 26];

test('part1', () => {
  for (let i = 0; i < part1Inputs.length; i++) {
    expect(part1(part1Inputs[i])).toEqual(part1Markers[i]);
  }
});

test('part2', () => {
  for (let i = 0; i < part2Inputs.length; i++) {
    expect(part2(part2Inputs[i])).toEqual(part2Markers[i]);
  }
});
