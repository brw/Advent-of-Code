import { getInput } from '../../util.js';

function compare(left, right) {
  if (typeof left === 'number' && typeof right === 'number') {
    return Math.sign(left - right);
  }

  if (!Array.isArray(left)) {
    left = [left];
  } else if (!Array.isArray(right)) {
    right = [right];
  }

  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const res = compare(left[i], right[i]);
    if (res !== 0) {
      return res;
    }
  }

  return Math.sign(left.length - right.length);
}

export function part1(data) {
  const packets = data
    .trim()
    .split('\n\n')
    .map((pair) => pair.split('\n').map(JSON.parse));
  const correct = [];

  for (const [index, pairs] of packets.entries()) {
    if (compare(pairs[0], pairs[1]) === -1) {
      correct.push(index + 1);
    }
  }

  return correct.reduce((a, b) => a + b);
}

export function part2(data) {
  const packets = data
    .trim()
    .split('\n')
    .filter((line) => line !== '')
    .map(JSON.parse);

  const two = [[2]];
  const six = [[6]];
  packets.push(two, six);
  packets.sort(compare);

  const idxTwo = packets.indexOf(two) + 1;
  const idxSix = packets.indexOf(six) + 1;
  return idxTwo * idxSix;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
